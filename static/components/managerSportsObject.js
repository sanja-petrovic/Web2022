Vue.component('manager-sports-object', {
	data: function() {
		return {
			loggedIn: false,
			sportsObject: null,
			trainers: null,
			buyers: null,
			trainersTabActive: true,
			
		}
		
		
	},
	
	template: `
		<div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="main-content">
            <div class="sports-object-header justify-content-center">
                <img class="sports-object-logo" :src="sportsObject.logoIcon">
                <div class="sports-object-info">
                    <h1>{{sportsObject.name}}</h1>
                    <p class="sports-object-subtitle">{{sportsObject.type}}
                        <span class="badge rounded-pill badge-open"
                            v-if="openCheck(sportsObject.status)">Otvoreno</span>
                        <span class="badge rounded-pill badge-closed"
                            v-if="!openCheck(sportsObject.status)">Zatvoreno</span>
                    </p>
                    <p class="sports-object-description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                style="margin-right: 0.4em; color: #91D0F7"></i><span class="d-inline-block">Radno
                                vreme: {{sportsObject.businessHours.startTime }}-{{ sportsObject.businessHours.endTime
                                }}</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                class="d-inline-block">Lokacija:</span></span><br>
                        <span class="d-inline-block"><i style="margin-right: 1.5em; color: #9BE3C3"></i><span
                                class="d-inline-block">{{sportsObject.location.address.street}}
                                {{sportsObject.location.address.number}}</span></span><br>
                        <span class="d-inline-block"><i style="margin-right: 1.5em; color: #9BE3C3"></i><span
                                class="d-inline-block">{{sportsObject.location.address.city}},
                                {{sportsObject.location.address.postcode}}</span></span><br>
                        <span class="d-inline-block"><i style="margin-right: 1.5em; color: #9BE3C3"></i><span
                                class="d-inline-block">{{sportsObject.location.latitude.toFixed(5)}},
                                {{sportsObject.location.longitude.toFixed(5)}}</span></span><br>

                        <span class="d-inline-block"><i class="fa fa-star"
                                style="margin-right: 0.4em; color: #ADE9AA"></i><span class="d-inline-block">Prosečna
                                ocena: {{sportsObject.averageGrade}}</span></span><br>
                    </p>
                </div>
            </div>
            <div class="profile">
                <div class="tab-panel about-wrapper">
                    <ul class="nav nav-pills me-3" id="pills-tab" role="tablist">
                        <li v-on:click="setTrainersTabActivity" class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-user-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-trainers" type="button" role="tab">Treneri u sportskom objektu
                            </button>
                        </li>
                        <li v-on:click="setBuyersTabActivity" class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-buyer-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-buyers" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Kupci koji su posetili objekat
                            </button>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent" style="margin-top: 1em">
                        <div class="tab-pane fade show active" id="pills-trainings" role="tabpanel"
                            aria-labelledby="pills-home-tab" v-if="trainersTabActive === true">
                            <div class="center-container">
                                <div class="users-table">
                                    <table class="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col" class="border-0 font-medium">Ime</th>
                                                <th scope="col" class="border-0 font-medium">Prezime</th>                                                
                                                <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                                <th scope="col" class="border-0 font-medium">Pol</th>
                                                <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="trainer in this.trainers">
                                                <td>
                                                    <span class="text-muted">{{ trainer.Name }}</span><br>
                                                </td>
                                                <td>
                                                    <span class="text-muted">{{ trainer.Surname }}</span><br>
                                                </td>                                                
                                                <td>
                                                    <span class="text-muted">{{ trainer.DateOfBirth }}</span><br>
                                                </td>
                                                <td>
                                                    <span class="text-muted">{{ trainer.Gender }}</span><br>
                                                </td>
                                                <td>
                                                    <span class="text-muted">{{ trainer.Username }}</span><br>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade show active" id="pills-buyers" role="tabpanel" aria-labelledby="pills-home-tab" v-if="trainersTabActive === false">
					        <div class="center-container">
					            <div class="users-table">
					                <table class="table table-borderless">
					                    <thead>
					                        <tr>
					                            <th scope="col" class="border-0 font-medium">Ime kupca</th>
					                            <th scope="col" class="border-0 font-medium">Prezime kupca</th>
					                            <th scope="col" class="border-0 font-medium">Datum rođenja</th>
					                            <th scope="col" class="border-0 font-medium">Pol</th>
					                            <th scope="col" class="border-0 font-medium">Korisničko ime</th>
					                            <th scope="col" class="border-0 font-medium">Tip kupca</th>
					                        </tr>
					                    </thead>
					                    <tbody>
					                        <tr v-for="buyer in this.buyers">
					                            <td>
					                                <span class="text-muted">{{ buyer.Name }}</span><br>
					                            </td>
					                            <td>
					                                <span class="text-muted">{{ buyer.Surname }}</span><br>
					                            </td>
					                            <td>
					                                <span class="text-muted">{{ buyer.DateOfBirth }}</span><br>
					                            </td>
					                            <td>
					                                <span class="text-muted">{{ buyer.Gender }}</span><br>
					                            </td>
					                            <td>
					                                <span class="text-muted">{{ buyer.Username }}</span><br>
					                            </td>
					                            <td>
					                                <span class="text-muted">{{ buyer.BuyerType.Tier }}</span><br>
					                            </td>						                            
					                        </tr>
					                    </tbody>
					                </table>
					            </div>
					        </div>
					    </div>
                               
                    </div>
                </div>
            </div>
        </div>
    </div>
	
	`,
	
	mounted() {
		this.loggedInCheck();
		
	},
	methods: {
		loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
                    if (response.data != null) {
                        this.loggedIn = true;
                        let id = response.data.Id;
                        this.getSportsObjectByManagerId(id);
                    }
                })
                .catch(error => console.log(error));
        },
        getSportsObjectByManagerId: function (id) {
            axios.get(`rest/managers/${id}`, {
                name: id
            })
                .then(response => {
                    this.sportsObject = response.data;
                    console.log(response.data);
                    this.name = this.sportsObject.name;
                    this.getTrainers(this.sportsObject.name);
                    this.getBuyers(this.sportsObject.name);
                    
                });
        },
        openCheck: function (status) {
            if (status == 'WORKING')
                return true;
            else
                return false;
        },
        getTrainers: function(name) {
			axios.get('rest/getTrainersForObject', {
			params: {
				name: name
			}
			}).then(response => {
				console.log(response.data);
				this.trainers = response.data;	
				console.log(this.displayTrainers);
			
				
			}).catch(error => console.log(error));
		
		},
		getBuyers: function(name) {
			axios.get('rest/getBuyersByVisitedObject', {
			params: {
				name: name
			}
			}).then(response => {
				console.log(response.data);
				this.buyers = response.data;
				
			}).catch(err => console.log(err));
		
		},
		setTrainersTabActivity: function() {
			this.trainersTabActive = true;
		},
		setBuyersTabActivity: function() {
			this.trainersTabActive = false;
		}
	}	
})