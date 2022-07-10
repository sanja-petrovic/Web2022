Vue.component('manager-sports-object', {
	data: function() {
		return {
			loggedIn: false,
			sportsObject: null,
			
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
                            class="d-inline-block">Prosečna ocena: {{sportsObject.averageGrade}}</span></span><br>
                    </p>
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
                    this.logo = this.sportsObject.logoIcon;
                    this.displayContents(this.sportsObject.name);
                });
        },
        openCheck: function (status) {
            if (status == 'WORKING')
                return true;
            else
                return false;
        },
		
	}	
})