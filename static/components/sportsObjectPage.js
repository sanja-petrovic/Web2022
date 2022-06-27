Vue.component('sports-object-page', {
    data: function () {
        return {
            loggedIn: false,
            sportsObject: null
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
                    <p class="sports-object-subtitle">{{sportsObject.type}}</p>
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
                        <span class="d-inline-block"><i class="fa fa-arrow-circle-right"
                                                        style="margin-right: 0.4em; color: #9BA1FF"></i><span
                            class="d-inline-block">grupni treninzi, personalni treninzi</span></span>
                    </p>
                </div>
                <div class="sports-object-map">
                </div>
            </div>
            <div class="sports-object-trainings">
                <h4>Treninzi u ponudi</h4>
                <ul class="cards">
                    <li>
                        <div class="card">
                            <img src="../images/casplesa.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/dance.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">Čas modernog plesa
                                        </h3>
                                        <span class="card__status">Petar Petrović, 17:30-19:00</span><br>
                                    </div>
                                </div>
                                <p class="card__description">                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa2.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/pool.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SPool <span class="badge rounded-pill badge-closed">Zatvoreno</span>
                                        </h3>
                                        <span class="card__status">Zatvoreni bazeni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/gym2.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SGym Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teretana</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/stadion.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport One <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/sport.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/tennis.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">STennis <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teniski tereni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sports-object-comments">
                <h4>Komentari</h4>
                <div class="comment-section">
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                </div>
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
				
			});
	
	},
    methods: {
        loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
					if(response.data != null) 
                	   this.loggedIn = true;
                })
                .catch(error => console.log(error));
        }
    }
});