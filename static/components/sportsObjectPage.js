Vue.component('sports-object-page', {
    data: function () {
        return {
            loggedIn: false,
            sportsObject: null,
            sportsObjectContents: null,
            logo: null,
			comments: null,
			loggedInUserRole: "",
			approvedComments: []
        }
    },
    template: `
        <div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="main-content">
            <div class="sports-object-header">
                <img class="sports-object-logo" :src="sportsObject.logoIcon">
                <div class="sports-object-info">
                    <h1>{{sportsObject.name}}</h1>
                    <p class="sports-object-subtitle">{{sportsObject.type}}
                    <span class="badge rounded-pill badge-open" v-if="openCheck(sportsObject.status)">Otvoreno</span>
                    <span class="badge rounded-pill badge-closed" v-if="!openCheck(sportsObject.status)">Zatvoreno</span>
                    </p>
                    <p class="sports-object-description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">Radno vreme: {{sportsObject.businessHours.startTime }}-{{ sportsObject.businessHours.endTime }}</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lokacija:</span></span><br>
                        <span class="d-inline-block"><i style="margin-right: 1.5em; color: #9BE3C3"></i><span
                            class="d-inline-block">{{sportsObject.location.address.street}} {{sportsObject.location.address.number}}</span></span><br>
                        <span class="d-inline-block"><i
                                                        style="margin-right: 1.5em; color: #9BE3C3"></i><span
                            class="d-inline-block">{{sportsObject.location.address.city}}, {{sportsObject.location.address.postcode}}</span></span><br>
                        <span class="d-inline-block"><i 
                                                        style="margin-right: 1.5em; color: #9BE3C3"></i><span
                            class="d-inline-block">{{sportsObject.location.latitude}}, {{sportsObject.location.longitude}}</span></span><br>
                        
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">Prosečna ocena: {{sportsObject.averageGrade}}</span></span><br>
                    </p>
                </div>
                <div class="sports-object-map">
                </div>
            </div>
            <div class="sports-object-trainings">
                <h4>U ponudi:</h4>
                <ul class="cards" style="width: 100vw; margin-bottom: 20vh;">
                    <li v-for="item in this.sportsObjectContents">
                        <div class="card">
                            <img :src="item.Picture" class="card__image" alt="" />
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" :src="logo" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">{{item.Name}}
                                        </h3>
                                        <span class="card__status">Petar Petrović, 17:30-19:00</span><br>
                                        <span class="card__status">Trajanje: {{item.Duration}}min</span><br>
                                    </div>
                                </div>
                                <p class="card__description"> 
                                	{{item.Description}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
                
            <div class="sports-object-comments"  v-if="this.loggedInUserRole === 'Admin'">
                <h4>Komentari</h4>
                <ul class="comment-section">
                    <li class="comment" v-for="item in this.comments">
                        <div class="comment-header">
							<div class="left-side">
								<div class="title">
									<h5>{{ item.Buyer.Name + " " + item.Buyer.Surname }}</h5>
									<div><i class="fa fa-star" v-for="i in item.Grade"></i><i class="fa-regular fa-star" v-for="i in (5 - item.Grade)"></i></div>
								</div>
							</div>
							<div v-if="item.Status === 'Na čekanju'" class="right-side">
								<button class="comment-button" v-on:click="approveComment(item.Id)">Odobri</button>
								<button class="comment-button" v-on:click="denyComment(item.Id)">Odbij</button>
							</div>
                        </div>
                        <div class="comment-content">
                            <p>{{ item.Content }}</p>
                        </div>
                        <div class="comment-footer">
                            <p><span class="badge rounded-pill badge-open" v-if="item.Status === 'Na čekanju'">Na čekanju</span>
								<span class="badge rounded-pill badge-closed" v-else-if="item.Status === 'Odbijen'">Odbijen</span>
								<span v-else></span>
							</p>
                        </div>
                    </li>
                </ul>
            </div>
			<div class="sports-object-comments"  v-else-if="this.loggedInUserRole === 'Menadžer'">
				<h4>Komentari</h4>
				<ul class="comment-section">
					<li class="comment" v-for="item in this.comments">
						<div class="comment-header">
							<div class="left-side">
								<div class="title">
									<h5>{{ item.Buyer.Name + " " + item.Buyer.Surname }}</h5>
									<div><i class="fa fa-star" v-for="i in item.Grade"></i><i class="fa-regular fa-star" v-for="i in (5 - item.Grade)"></i></div>
								</div>
							</div>
						</div>
						<div class="comment-content">
							<p>{{ item.Content }}</p>
						</div>
						<div class="comment-footer">
							<p><span class="badge rounded-pill badge-open" v-if="item.Status === 'Na čekanju'">Na čekanju</span>
								<span class="badge rounded-pill badge-closed" v-else-if="item.Status === 'Odbijen'">Odbijen</span>
								<span v-else></span>
							</p>
						</div>
					</li>
				</ul>
			</div>

			<div class="sports-object-comments"  v-else>
				<h4>Komentari</h4>
				<ul class="comment-section">
					<li class="comment" v-for="item in this.approvedComments">
						<div class="comment-header">
							<div class="left-side">
								<div class="title">
									<h5>{{ item.Buyer.Name + " " + item.Buyer.Surname }}</h5>
									<div><i class="fa fa-star" v-for="i in item.Grade"></i><i class="fa-regular fa-star" v-for="i in (5 - item.Grade)"></i></div>
								</div>
							</div>
						</div>
						<div class="comment-content">
							<p>{{ item.Content }}</p>
						</div>
						<div class="comment-footer">
							<p><span class="badge rounded-pill badge-open" v-if="item.Status === 'Na čekanju'">Na čekanju</span>
								<span class="badge rounded-pill badge-closed" v-else-if="item.Status === 'Odbijen'">Odbijen</span>
								<span v-else></span>
							</p>
						</div>
					</li>
				</ul>
			</div>
        </div>
        </div>
    `,
    mounted() {
		this.loggedInCheck();
		var path = window.location.href;
		var sportsObjectName = path.split('/objekti/')[1];
		var name = sportsObjectName.replaceAll('%20', ' ');
		axios.get('rest/getSportsObjectByName', {
			params: {
				name: name
			}
		})
		.then(response => {
			this.sportsObject = response.data;
			this.logo = this.sportsObject.logoIcon;
		});
		this.displayContents(name);
		this.getComments(name);
	},
    methods: {
        loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
					if(response.data != null) {
						this.loggedIn = true;
						this.loggedInUserRole = response.data.UserType;
					}

                })
                .catch(error => console.log(error));
        },
        openCheck: function(status) {
                if (status == 'WORKING')
                    return true;
                else
                    return false;
       },
       
       displayContents: function(name) {
			axios.get('rest/getContentsForSportsObject', {
			params: {
				name: name
			}
			}).then(response => {
				console.log(response.data);
				this.sportsObjectContents = response.data;
			}).catch(error => console.log(error));
		},

		getComments: function (sportsObject) {
			axios.get(`/rest/comments/${sportsObject}`, {
				name: sportsObject
			}).then(response => { this.comments = response.data; this.getApprovedComments();
				})
				.catch(error => console.log(error));

		},
		getApprovedComments: function () {
			for(let i = 0; i < this.comments.length; i++) {
				if(this.comments[i].Status === 'Odobren') {
					this.approvedComments.push(this.comments[i]);
				}
			}
		},

		approveComment: function (id) {
			let oopsie = false;
			axios.post(`/rest/comments/${id}/approve`, {
			})
				.then(response => {
					oopsie = false;
					this.approvedComments.push(response.data);
					this.$router.go();
				})
				.catch(function error(err) {
					oopsie = true;
				});
		},
		denyComment: function (id) {
			let oopsie = false;
			axios.post(`/rest/comments/${id}/deny`, {
			})
				.then(response => {
					oopsie = false;
					this.$router.go();
				})
				.catch(function error(err) {
					oopsie = true;
				});
		}

    }
    
});