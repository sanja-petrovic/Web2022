
Vue.component('sports-object-page', {
    data: function () {
        return {
            loggedIn: false,
            sportsObject: null,
            sportsObjectContents: null,
            list: [],
           	contentTrainer: null,
			sportsObjectRating: 0,
            logo: null,
            sportsObjectMembership: null,
            membershipIsValid: false,
            usedTerms: null,
            totalTerms: null,
            status: "",
            mode: "BROWSE",
            training: null,
			comments: null,
			scheduledFor: new Date(),
			loggedInUserRole: "",
			approvedComments: [],
			pendingComments: [],
			deniedComments: [],
			user: null,
			comment: {
				rating: 0,
				content: ""
			}
        }
    },
    template: `
		
        <div>
		<nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="main-content">
            <div class="sports-object-header-container">
                <div class="sports-object-header">
					<img class="sports-object-logo" :src="sportsObject.logoIcon">
					<div class="sports-object-info">
						<div><h1>{{sportsObject.name}}</h1> <i v-if="user.UserType === 'Admin'" v-on:click="deleteSportsObject" class="fa-solid fa-circle-minus delete-button"></i></div>
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
								class="d-inline-block">{{sportsObject.location.latitude.toFixed(5)}}, {{sportsObject.location.longitude.toFixed(5)}}</span></span><br>

							<span class="d-inline-block"><i class="fa fa-star"
															style="margin-right: 0.4em; color: #ADE9AA"></i><span
								class="d-inline-block" >Prosečna ocena: {{ sportsObject.averageGrade.toFixed(2) }}</span></span><br>
						</p>
					</div>
				</div>
				<div class="map" id="map-page" style="z-index: 5"></div>
                
            </div>
            <div class="sports-object-trainings">
                <h4>U ponudi:</h4>
                <ul class="cards" style="width: 100vw; margin-bottom: 20vh;">
                    <li v-for="item in this.list">
                        <div class="card">
                            <img :src="item.content.Picture" class="card__image" alt="" />
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" :src="logo" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">{{item.content.Name}}
                                        </h3>
                                        <span class="card__status">Trajanje: {{item.content.Duration}}min</span>
                                        <span v-if="item.content.ContentType==='trening'" class="card__status"><br>Trener: {{item.trainer.Name}} {{item.trainer.Surname}}</span><br>
                                        <span class="card__status" v-if="item.content.ContentType==='trening'">Tip treninga: {{item.type}}</span><br>
                                        <span class="card__status" v-if="item.content.ContentType==='trening' && item.price !== 0.0">Doplata za trening: {{item.price}} din</span>
                                        <span class="card__status" v-if="item.content.ContentType==='trening' && item.price === 0.0">nema doplate za trening</span><br>
                                    </div>
                                </div>
                                <p class="card__description"> 
                                	{{item.content.Description}}
                                </p>
                                <div class="d-flex align-items-center justify-content-center" v-if="loggedInUserRole === 'Kupac' && item.type === 'Grupni'">
                                	<div class="search-button mb-1" style="width: 150px" type="button" v-on:click="signIn(item)">
                                		Prijavi se
                                	</div>
                        		</div>
                        		<div class="d-flex align-items-center justify-content-center" v-if="loggedInUserRole === 'Kupac' && item.type === 'Personalni'">
                                	<div class="search-button mb-1" style="width: 220px" type="button" v-on:click="selectTraining(item)">
                                		Zakaži trening
                                	</div>
                        		</div>
                            </div>                          
                        </div>
                    </li>
                </ul>
            </div>
            <div class="create-divs justify-content-center" v-if="mode==='SCHEDULE'">
                <div class="bla">
                	<div class="register-container">
                    	<div class="register-content center-container">
                        	<div class="info center-container">
                            	<h3 class="heading" style="font-weight: 500">Zakaži personalni trening</h3>
                               	<form class="myForm" action="">
                                	<label for="contentName">Naziv treninga</label>
                                    <input class="text-box create-input" type="text" id="contentName" v-model="this.training.content.Name" disabled>
                                    <label for="type">Tip treninga</label>
                                    <input class="text-box create-input" type="text" id="type" v-model="this.training.type" disabled>
                                    <label for="trainer">Ime trenera</label>
                                    <input class="text-box create-input" type="text" v-model="this.training.trainer.Name" id="trainer" disabled>
                                    <label for="price">Cena treninga</label>
                                    <input class="text-box create-input" type="number" v-model="this.training.price" id="price" name="price" disabled>
                                    <label for="schedule">Izaberite datum i vreme termina:</label>
                                    <input class="text-box create-input" type="datetime-local" v-model="scheduledFor" id="schedule" required>
                                </form>
                           	</div>
				            <div>
				                <button class="search-button mt-3 mb-5" id="theButton" v-on:click="scheduleTraining">Zakaži</button>
				                <button class="search-button mt-3" v-on:click="cancelScheduling">Odustani</button>
		                	</div>
                    	</div>    
                	</div>
               	</div> 
            </div>
            <div class="sports-object-comments"  v-if="this.loggedInUserRole === 'Admin'">
                <h4>Komentari</h4>
                <ul class="comment-section">
                    <li class="comment" v-for="item in this.pendingComments">
                        <div class="comment-header" style="flex-direction: row;">
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

					<li class="comment" v-for="item in this.approvedComments">
						<div class="comment-header" style="flex-direction: row;">
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

					<li class="comment" v-for="item in this.deniedComments">
						<div class="comment-header" style="flex-direction: row;">
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
					<li class="comment" v-for="item in this.pendingComments">
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

					<li class="comment" v-for="item in this.deniedComments">
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
					<div v-if="this.loggedInUserRole === 'Kupac'" class="comment">
						<div class="comment-header">
							<h4 style="margin-left: 0; font-size: 20px">Utisak posle prve posete</h4>
							<div class="rating">
								<input type="radio" name="rating" v-model="comment.rating" value="5" id="5"><label for="5">☆</label>
								<input type="radio" name="rating" v-model="comment.rating" value="4" id="4"><label for="4">☆</label>
								<input type="radio" name="rating" v-model="comment.rating" value="3" id="3"><label for="3">☆</label>
								<input type="radio" name="rating" v-model="comment.rating" value="2" id="2"><label for="2">☆</label>
								<input type="radio" name="rating" v-model="comment.rating" value="1" id="1"><label for="1">☆</label>
							</div>
						</div>
						<div class="comment-content" style="padding: 0em 3.3em 1em 3.3em;">
							<textarea v-model="comment.content" class="form-control" rows="3"></textarea>
						</div>
						<div class="comment-footer">
							<button class="post-comment-button" v-on:click="postComment">Postavi</button>
						</div>
					</div>
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
		var path = window.location.href;
		var sportsObjectName = path.split('/objekti/')[1];
		var name = sportsObjectName.replaceAll('%20', ' ');
		this.loggedInCheck();
		axios.get('rest/getSportsObjectByName', {
			params: {
				name: name
			}
		})
		.then(response => {
			this.sportsObject = response.data;
			this.sportsObjectRating = response.data.averageGrade.toFixed(2);
			this.logo = this.sportsObject.logoIcon;
			this.displayMap();
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
						this.user = response.data;
						console.log(this.user);
						//this.canLeaveComment(response.data.Username, this.sportsObject.name)
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
				for (let i = 0; i < this.sportsObjectContents.length; i++) {
					let sportsObjectContent = this.sportsObjectContents[i];
					if(sportsObjectContent.ContentType === "trening") {
							this.getTrainer(sportsObjectContent);					
					} else {
						this.list.push({
							content: sportsObjectContent
						 })
					}
				}
			}).catch(error => console.log(error));
		},
		getTrainer: function(sportsObjectContent) {
			let id = sportsObjectContent.Id;
			axios.get(`/rest/trainings/${id}`, {
				name: id
			}).then(response => { 
				console.log(response.data);
				this.contentTrainer = response.data; 
				this.getPrice(sportsObjectContent, this.contentTrainer)
				
				}
			).catch(error => console.log(error));
		},
		getPrice: function(sportsObjectContent, contentTrainer) { 
			let id = sportsObjectContent.Id;
			axios.get(`/rest/trainings/price/${id}`, {
				name: id
			}).then(response => { 
				console.log(response.data);
				this.trainingPrice = response.data; 
				this.getTrainingType(sportsObjectContent, contentTrainer, this.trainingPrice);
				}
			).catch(error => console.log(error));
		},
		getTrainingType: function(sportsObjectContent, contentTrainer, trainingPrice) {
			let id = sportsObjectContent.Id;
			axios.get(`/rest/trainings/type/${id}`, {
				name: id
			}).then(response => { 
				console.log(response.data);
				this.trainingType = response.data; 
				this.list.push({
					content: sportsObjectContent,
					trainer: contentTrainer,
					price: trainingPrice,
					type: this.trainingType,
				})
				}
			).catch(error => console.log(error));
		},
		findMembership: function() {
			let id = this.user.Id;
			axios.get(`/rest/buyersmemberships/${id}`, {
				name: id
			}).then(response => { 
				console.log(response.data);
				this.sportsObjectMembership = response.data.SportsObject.name;
				this.usedTerms = response.data.UsedTerms;
				this.totalTerms = response.data.NumberOfTerms;
				this.status = response.data.Status;
				this.validateMembership(this.sportsObjectMembership, this.usedTerms, this.totalTerms, this.status);
				}
			).catch(error => console.log(error));
		},
		
		signIn: function(item) {
			this.findMembership();
			if(this.membershipIsValid) {
				this.addTrainingToHistory(item);
			}		
		},
		validateMembership: function(name, usedTerms, totalTerms, status) {
			if(name != this.sportsObject.name) {
				alert("Nemate članarinu u ovom sportskom objektu!")
				this.membershipIsValid = false;
			}
			else if(usedTerms == totalTerms) {
				alert("Iskoristili ste sve termine!");
				this.membershipIsValid = false;
			}
			else if(status != "Aktivna") {
				alert("Članarina nije aktivna! Kupite novu članarinu");
				this.$router.replace("/clanarine"); 
				this.membershipIsValid = false;
			}
			else {
				this.membershipIsValid = true;
			}
		},
		addTrainingToHistory: async function(item) {
			 await axios.post('/rest/addToHistory', {
                trainer: item.trainer,
                contentId: item.content.Id,
                buyerUsername: this.user.Username
            })
            	.then(response => {
					console.log(response);
					  this.$router.replace("/");
					  alert("Uspešno ste se prijavili na trening");
				})
				.catch(err => {
                	alert(err.response.data);     
			})
		},
		selectTraining: function(item) {
			this.findMembership();
			if(this.membershipIsValid) {
				this.mode = "SCHEDULE";
				this.training = item;
				console.log(item);
			}
		},
		cancelScheduling: function() {
			this.mode = "BROWSE";
		},
		scheduleTraining: async function() {
			await axios.post('/rest/scheduleTraining', {
                trainer: this.training.trainer,
                contentId: this.training.content.Id,
                buyerUsername: this.user.Username,
                scheduledFor: this.scheduledFor
            })
            	.then(response => {
					console.log(response);
					  alert("Uspešno ste zakazali personalni trening");
					  this.mode = "BROWSE";
				})
				.catch(err => {
                	alert(err.response.data);     
			})
		},
		getComments: function (sportsObject) {
			axios.get(`/rest/comments/${sportsObject}`, {
				name: sportsObject
			}).then(response => {
				this.comments = response.data;
				this.getApprovedComments();
				this.getDeniedComments();
				this.getPendingComments();
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

		getDeniedComments: function () {
			for(let i = 0; i < this.comments.length; i++) {
				if(this.comments[i].Status === 'Odbijen') {
					this.deniedComments.push(this.comments[i]);
				}
			}
		},

		getPendingComments: function () {
			for(let i = 0; i < this.comments.length; i++) {
				if(this.comments[i].Status === 'Na čekanju') {
					this.pendingComments.push(this.comments[i]);
				}
			}
		},

		approveComment: function (id) {
			let oopsie = false;
			axios.post(`/rest/comments/${id}/approve`, {
			})
				.then(response => {
					oopsie = false;
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
		},
		canLeaveComment: function (username, name) {
			axios.get(`/rest/buyer-comments/:${username}/${name}`, {
			}).then(response => {
				return true;
			}).catch(function error(err) {
				console.log(err);
				return false;
			})
		},
		postComment: function () {
			if(this.comment.rating != null && this.comment.rating !== 0 && this.comment.content != null && this.comment.content.match(/^ *$/) === null) {
				axios.post('/rest/post-comment', {
					buyer: this.user.Id,
					sportsObject: this.sportsObject.name,
					content: this.comment.content,
					grade: this.comment.rating,
				}).then(response => {
					alert("Comment posted!");
					this.$router.go();
				}).catch(function error(err) {
					console.log(err);
				})
			}
		},

		displayMap: function () {
			let lon = this.sportsObject.location.longitude;
			let lat = this.sportsObject.location.latitude;
			const iconFeature = new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
				name: "hellooo",
			});
			let map = new ol.Map({
				layers: [
					new ol.layer.Tile({
						source: new ol.source.OSM()
					}),
					new ol.layer.Vector({
						source: new ol.source.Vector({
							features: [iconFeature]
						}),
						style: new ol.style.Style({
							image: new ol.style.Icon({
								anchor: [lon, lat],
								anchorXUnits: 'pixels',
								anchorYUnits: 'pixels',
								src: '../images/pin.png'
							})
						})
					})
				],
				view: new ol.View({
					center: ol.proj.fromLonLat([lon, lat]),
					zoom: 18
				})
			});

			setTimeout(() => {
				if (map) {
					map.setTarget("map-page");
					let c = document.getElementById("map-page").childNodes;
					c[0].style.borderRadius  = '15px';
				}
			}, 50);


		},
		deleteSportsObject: function () {
			axios.post(`/rest/sportsobjects/${this.sportsObject.name}/delete`)
				.then(response => {
					console.log(response.data);
					this.$router.replace("/");
				})
				.catch(error => {
					console.log(error);
				})
		}
    }
    
});

