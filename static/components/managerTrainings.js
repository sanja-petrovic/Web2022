Vue.component('manager-trainings', {
	data: function () {
        return {
			loggedIn: false,
			sportsObject: null,
			trainingHistory: null,
            displayedTrainings: null,
             searchParam: {
                priceMin: null,
                priceMax: null,
                checkInMin: null,
                checkInMax: null
            },
            filterParam: {
                trainingType: []
            },
        }
	},
	
	template: `
	<div>
		<nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="profile">
       		<div class="tab-content" id="pills-tabContent" style="margin-top: 1em">	  
            	<div class="center-container">
                            <div class="buttons-galore" style="max-width: 100%; padding: 2em; margin: 0" >
                                <div class="filter-and-sort">
                                    <div class="dropdown">
                                        <button class="sort-button" type="button" id="sort-button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="d-inline-block"><i class="fa-solid fa-chevron-down" style="margin-right: 0.4em;"></i><span class="d-inline-block">Sortiraj po...</span></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="sort-button">
                                            <li><button class="dropdown-item" type="button">Ceni (rastuće)</button></li>
                                            <li><button class="dropdown-item" type="button">Ceni (opadajuće)</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button class="dropdown-item" type="button">Datumu prijave (rastuće)</button></li>
                                            <li><button class="dropdown-item" type="button">Datumu prijave (opadajuće)</button></li>
                                        </ul>
                                    </div>
                                    <div class="dropdown">
                                        <button type="button" class="dropdown-toggle filter-button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                            Filteri
                                        </button>
                                        <div class="dropdown-menu p-4">
                                            <div class="mb-3">
                                                <p style="font-weight: 600;">Tip treninga</p>
                                                <div class="form-check">
                                                    <input class="form-check-input filter-checks-training-type" type="checkbox" value="" id="personalni">
                                                    <label class="form-check-label" for="personal">
                                                        Personalni
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input filter-checks-training-type" type="checkbox" value="" id="grupni">
                                                    <label class="form-check-label" for="group">
                                                        Grupni
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3" style="max-width: 100%; padding: 0 2em">
                                <input type="number" class="form-control" v-model="searchParam.priceMin" placeholder="Cena (min)">
                                <input type="number" class="form-control" v-model="searchParam.priceMax" placeholder="Cena (max)">
                                <input type="date" class="form-control" v-model="searchParam.checkInMin" placeholder="Datum prijave od...">
                                <input type="date" class="form-control" v-model="searchParam.checkInMax" placeholder="Datum prijave do...">
                                <div class="search-button" type="button" v-on:click="combinedSearch">
                                    <i class="fa fa-search"></i>
                                </div>
                            </div>
                    <hr>
					<div class="users-table">
        				<table class="table table-borderless">
                			<thead>
                    		<tr>
	                        	<th scope="col" class="border-0 font-medium">Naziv treninga</th>
	                            <th scope="col" class="border-0 font-medium">Tip treninga</th>
	                            <th scope="col" class="border-0 font-medium">Sportski objekat</th>
	                            <th scope="col" class="border-0 font-medium">Cena</th>
	                            <th scope="col" class="border-0 font-medium">Datum treniranja</th>
                       		 </tr>
                    		</thead>
                    		<tbody>
			                    <tr v-for="training in this.displayedTrainings">
				                    <td>
				                    <span class="text-muted">{{ training.Training.Name }}</span><br>
				                    </td>
				                    <td>
				                    <span class="text-muted">{{ training.Training.TrainingType }}</span><br>
				                    </td>
				                    <td>
				                    <span class="text-muted">{{ training.Training.SportsObject.name }}</span><br>
				                    </td>
				                    <td>
				                    <span class="text-muted">{{ training.Training.Price }}</span><br>
				                    </td>
				                    <td>
				                    <span class="text-muted">{{ training.CheckIn }}</span><br>
			                    	</td>
			                    </tr>
                    		</tbody>
                    	</table>
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
                    this.getTrainingHistory();
                });
        	},
        	getTrainingHistory: function() {
				axios.get(`/rest/sportsobjects/${this.sportsObject.name}/trainings`)
                .then(response => {
                    this.trainingHistory = response.data;
                    this.displayedTrainings = response.data;
                })
                .catch(error => console.log(error));
			},
			combinedSearch : function () {
	            let searchResult = [];
	            let priceMin;
	            let priceMax;
	            let checkInMin;
	            let checkInMax;
	            
	            if(this.searchParam.priceMin === null || this.searchParam.priceMin === "") {
                	priceMin = 0;
	            } else {
	                priceMin = this.searchParam.priceMin;
	            }
	            
	            if(this.searchParam.priceMax == null || this.searchParam.priceMax === "") {
	                priceMax = Number.MAX_VALUE;
	            } else {
	                priceMax = this.searchParam.priceMax;
	            }
	            if(this.searchParam.checkInMin == null || this.searchParam.checkInMin === "") {
                	checkInMin = new Date(1970, 1, 1, 0, 0, 0);
	            } else {
	                checkInMin = this.searchParam.checkInMin;
	            }

            	if(this.searchParam.checkInMax == null || this.searchParam.checkInMax === "") {
                	checkInMax = new Date(2023, 1, 1);
	            } else {
	                checkInMax = this.searchParam.checkInMax;
	            }
	            
	            for(let i = 0; i < this.trainingHistory.length; i++) {
	                let invalidCount = 0;
	                if(this.comparePrices(this.trainingHistory[i].Training.Price, priceMin, priceMax) 
	                   && this.compareDates(this.trainingHistory[i].CheckIn, checkInMin, checkInMax)) {
	                    searchResult.push(this.trainingHistory[i]);
	                } else {
	                    invalidCount += 1;
	                }
            	}
            	
            	this.displayedTrainings = searchResult;
            	
            	},
      
			comparePrices: function (price, min, max) {
          		return price >= min && price <= max;
        	},
		    compareDates: function (date, min, max) {
		    	let actualDate = this.convertDate(date);
		        let minDate = new Date(min);
		        let maxDate = new Date(max);
		        let x = actualDate >= minDate;
		        let y = actualDate <= maxDate;
		        return actualDate >= minDate && actualDate <= maxDate;
		     },
		    convertDate: function (formattedDate) {
	            let dateAndTime = formattedDate.split(' ');
	            let date = dateAndTime[0];
	            let time = dateAndTime[1];
	            let dateSplitted = date.split('.');
	            let timeSplitted = time.split(':');
	            let actualDate = new Date(dateSplitted[2], dateSplitted[1] - 1, dateSplitted[0], timeSplitted[0], timeSplitted[1]);
	            return actualDate;
        	},
			
			
			}


	});