Vue.component('manager-trainings', {
	data: function () {
		return {
			loggedIn: false,
			user: null,
			trainingHistory: [],
			pastTrainings: [],
			scheduledTrainings: [],
			displayedPastTrainings: [],
			displayedScheduledTrainings: [],
			searchParam: {
				priceMin: null,
				priceMax: null,
				checkInMin: null,
				checkInMax: null
			},
			filterParam: {
				trainingType: []
			},
			selectedTab: 'PAST',
			searchResult: {
				past: [],
				scheduled: []
			}
		}


	},
	template: `
		<div>
		<nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
		<nav-bar-logged-out v-else></nav-bar-logged-out>
		<div class="profile">
			<div class="tab-panel about-wrapper">
				<ul class="nav nav-pills me-3" id="pills-tab" role="tablist">
					<li v-on:click="selectedTab = 'PAST'"  class="nav-item" role="presentation">
						<button class="nav-link active" id="pills-user-tab"
								data-bs-toggle="pill" data-bs-target="#pills-trainings"
								type="button"role="tab">Istorija treninga
						</button>
					</li>
					<li v-on:click="selectedTab = 'SCHEDULED'" class="nav-item" role="presentation">
						<button class="nav-link" id="pills-buyer-tab"
								data-bs-toggle="pill" data-bs-target="#pills-scheduled-trainings"
								type="button" role="tab"  aria-controls="pills-contact" aria-selected="false">Zakazani
							treninzi
						</button>
					</li>
				</ul>
				<div class="tab-content" id="pills-tabContent" style="margin-top: 1em">
					<div class="tab-pane fade show active" id="pills-trainings" role="tabpanel"
						 aria-labelledby="pills-home-tab">
						<div class="center-container">
							<div class="buttons-galore" style="max-width: 100%; padding: 2em; margin: 0">
								<div class="filter-and-sort">
									<div class="dropdown">
										<button class="sort-button" type="button" id="sort-button"
												data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="d-inline-block"><i class="fa-solid fa-chevron-down"
																			style="margin-right: 0.4em;"></i><span
												class="d-inline-block">Sortiraj po...</span></span>
										</button>
										<ul class="dropdown-menu" aria-labelledby="sort-button">
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByNameAsc">
													Nazivu sportskog objekta (rastuće)
												</button>
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByNameDesc">
													Nazivu sportskog objekta (opadajuće)
												</button>
											</li>
											<li>
												<hr class="dropdown-divider">
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByPriceAsc">
													Ceni (rastuće)
												</button>
											</li>
											<li>
												<button class="dropdown-item" type="button"
														v-on:click="sortByPriceDesc">Ceni (opadajuće)
												</button>
											</li>
											<li>
												<hr class="dropdown-divider">
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByDateAsc">
													Datumu prijave (rastuće)
												</button>
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByDateDesc">
													Datumu prijave (opadajuće)
												</button>
											</li>
										</ul>
									</div>
									<div class="dropdown">
										<button type="button" class="dropdown-toggle filter-button"
												data-bs-toggle="dropdown" aria-expanded="false"
												data-bs-auto-close="outside">
											Filteri
										</button>
										<div class="dropdown-menu p-4">
											<div class="mb-3">
												<p style="font-weight: 600;">Tip treninga</p>
												<div class="form-check">
													<input class="form-check-input filter-checks-training-type"
														   type="checkbox" value="" v-on:change="filterTrainings"
														   id="personalni">
													<label class="form-check-label" for="personal">
														Personalni
													</label>
												</div>
												<div class="form-check">
													<input class="form-check-input filter-checks-training-type"
														   type="checkbox" value="" v-on:change="filterTrainings"
														   id="grupni">
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
								<input type="number" class="form-control" v-model="searchParam.priceMin"
									   placeholder="Cena (min)">
								<input type="number" class="form-control" v-model="searchParam.priceMax"
									   placeholder="Cena (max)">
								<input type="date" class="form-control" v-model="searchParam.checkInMin"
									   placeholder="Datum prijave od...">
								<input type="date" class="form-control" v-model="searchParam.checkInMax"
									   placeholder="Datum prijave do...">
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
										<th scope="col" class="border-0 font-medium">Kupac</th>
										<th scope="col" class="border-0 font-medium">Cena</th>
										<th scope="col" class="border-0 font-medium">Datum treniranja</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="training in this.displayedPastTrainings">
										<td>
											<span class="text-muted">{{ training.Training.Name }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.Training.TrainingType }}</span><br>
										</td>
										<td>
                                            <span
												class="text-muted">{{ training.Training.SportsObject.name }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.Buyer.Name + " " + training.Buyer.Surname }}</span><br>
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

					<div class="tab-pane fade" id="pills-scheduled-trainings" role="tabpanel"
						 aria-labelledby="pills-home-tab">
						<div class="center-container">
							<div class="buttons-galore" style="max-width: 100%; padding: 2em; margin: 0">
								<div class="filter-and-sort">
									<div class="dropdown">
										<button class="sort-button" type="button" id="sort-button"
												data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="d-inline-block"><i class="fa-solid fa-chevron-down"
																			style="margin-right: 0.4em;"></i><span
												class="d-inline-block">Sortiraj po...</span></span>
										</button>
										<ul class="dropdown-menu" aria-labelledby="sort-button">
											<li>
												<hr class="dropdown-divider">
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByPriceAsc">
													Ceni (rastuće)
												</button>
											</li>
											<li>
												<button class="dropdown-item" type="button"
														v-on:click="sortByPriceDesc">Ceni (opadajuće)
												</button>
											</li>
											<li>
												<hr class="dropdown-divider">
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByDateAsc">
													Datumu prijave (rastuće)
												</button>
											</li>
											<li>
												<button class="dropdown-item" type="button" v-on:click="sortByDateDesc">
													Datumu prijave (opadajuće)
												</button>
											</li>
										</ul>
									</div>
									<div class="dropdown">
										<button type="button" class="dropdown-toggle filter-button"
												data-bs-toggle="dropdown" aria-expanded="false"
												data-bs-auto-close="outside">
											Filteri
										</button>
										<div class="dropdown-menu p-4">
											<div class="mb-3">
												<p style="font-weight: 600;">Tip treninga</p>
												<div class="form-check">
													<input class="form-check-input filter-checks-training-type"
														   type="checkbox" value="" v-on:change="filterTrainings"
														   id="personalni">
													<label class="form-check-label" for="personal">
														Personalni
													</label>
												</div>
												<div class="form-check">
													<input class="form-check-input filter-checks-training-type"
														   type="checkbox" value="" v-on:change="filterTrainings"
														   id="grupni">
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
								<input type="number" class="form-control" v-model="searchParam.priceMin"
									   placeholder="Cena (min)">
								<input type="number" class="form-control" v-model="searchParam.priceMax"
									   placeholder="Cena (max)">
								<input type="date" class="form-control" v-model="searchParam.checkInMin"
									   placeholder="Datum prijave od...">
								<input type="date" class="form-control" v-model="searchParam.checkInMax"
									   placeholder="Datum prijave do...">
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
										<th scope="col" class="border-0 font-medium">Kupac</th>
										<th scope="col" class="border-0 font-medium">Cena</th>
										<th scope="col" class="border-0 font-medium">Zakazani termin</th>
										<th scope="col" class="border-0 font-medium">Otkazivanje</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="training in this.displayedScheduledTrainings">
										<td>
											<span class="text-muted">{{ training.Training.Name }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.Training.TrainingType }}</span><br>
										</td>
										<td>
                                            <span
												class="text-muted">{{ training.Training.SportsObject.name }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.Buyer.Name + " " + training.Buyer.Surname }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.Training.Price }}</span><br>
										</td>
										<td>
											<span class="text-muted">{{ training.ScheduledFor }}</span><br>
										</td>
										<td>
                                            <span class="search-button" type="button"
												  v-if="training.Training.TrainingType === 'Personalni'">Otkaži</span><br>
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
					this.splitTrainings();
                })
                .catch(error => console.log(error));
			},
		splitTrainings: function () {
			for(let i = 0; i < this.trainingHistory.length; i++) {
				if (this.trainingHistory[i].ScheduledFor != null && this.convertDate(this.trainingHistory[i].ScheduledFor) >= Date.now()) {
					this.scheduledTrainings.push(this.trainingHistory[i]);
				} else {
					this.pastTrainings.push(this.trainingHistory[i]);
				}
			}
			this.displayedPastTrainings = this.pastTrainings;
			this.searchResult.past = this.displayedPastTrainings;
			this.displayedScheduledTrainings = this.scheduledTrainings;
			this.searchResult.scheduled = this.displayedScheduledTrainings;
		},
		getSportsObjectTypes: function () {
			let types = [];
			for (let i = 0; i < this.trainingHistory.length; i++) {
				this.sportsObjectTypes.push(this.trainingHistory[i].Training.SportsObject.type);
			}
			this.sportsObjectTypes = this.sportsObjectTypes.filter(function (item, index, inputArray) {
				return inputArray.indexOf(item) == index;
			});

			return types;
		},

		combinedSearch: function () {
			let searchResult = [];
			let priceMin;
			let priceMax;
			let checkInMin;
			let checkInMax;
			if (this.searchParam.priceMin === null || this.searchParam.priceMin === "") {
				priceMin = 0;
			} else {
				priceMin = this.searchParam.priceMin;
			}

			if (this.searchParam.priceMax == null || this.searchParam.priceMax.length === 0) {
				priceMax = Number.MAX_VALUE;
			} else {
				priceMax = this.searchParam.priceMax;
			}

			if (this.searchParam.checkInMin == null || this.searchParam.checkInMin === "") {
				checkInMin = new Date(1970, 1, 1, 0, 0, 0);
			} else {
				checkInMin = this.searchParam.checkInMin;
			}

			if (this.searchParam.checkInMax == null || this.searchParam.checkInMax === "") {
				checkInMax = new Date(2023, 1, 1);
			} else {
				checkInMax = this.searchParam.checkInMax;
			}

			if(this.selectedTab === 'PAST') {
				for (let i = 0; i < this.pastTrainings.length; i++) {
					let invalidCount = 0;
					if (this.comparePrices(this.pastTrainings[i].Training.Price, priceMin, priceMax) &&
						this.compareDates(this.pastTrainings[i].CheckIn, checkInMin, checkInMax)) {
						searchResult.push(this.pastTrainings[i]);
					} else {
						invalidCount += 1;
					}
				}
				this.displayedPastTrainings = searchResult;
				this.searchResult.past = searchResult;
			} else {
				for (let i = 0; i < this.scheduledTrainings.length; i++) {
					let invalidCount = 0;
					if (this.comparePrices(this.scheduledTrainings[i].Training.Price, priceMin, priceMax) &&
						this.compareDates(this.scheduledTrainings[i].ScheduledFor, checkInMin, checkInMax)) {
						searchResult.push(this.scheduledTrainings[i]);
					} else {
						invalidCount += 1;
					}
				}
				this.displayedScheduledTrainings = searchResult;
				this.searchResult.scheduled = searchResult;
			}
		},
		compareNames: function (name, searchParameter) {
			return name.toLowerCase().trim().includes(searchParameter);
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
		sortByNameDesc: function() {
			if(this.selectedTab === 'PAST')
				this.displayedPastTrainings.sort((b, a) => (a.Training.SportsObject.name > b.Training.SportsObject.name) ? 1 : ((b.Training.SportsObject.name > a.Training.SportsObject.name) ? -1 : 0));
			else
				this.displayedScheduledTrainings.sort((b, a) => (a.Training.SportsObject.name > b.Training.SportsObject.name) ? 1 : ((b.Training.SportsObject.name > a.Training.SportsObject.name) ? -1 : 0));
		},
		sortByNameAsc: function() {
			if(this.selectedTab === 'PAST')
				this.displayedPastTrainings.sort((a, b) => (a.Training.SportsObject.name > b.Training.SportsObject.name) ? 1 : ((b.Training.SportsObject.name > a.Training.SportsObject.name) ? -1 : 0));
			else
				this.displayedScheduledTrainings.sort((a, b) => (a.Training.SportsObject.name > b.Training.SportsObject.name) ? 1 : ((b.Training.SportsObject.name > a.Training.SportsObject.name) ? -1 : 0));

		},
		sortByPriceDesc : function () {
			if(this.selectedTab === 'PAST')
				this.displayedPastTrainings.sort((a, b) => b.Training.Price - a.Training.Price);
			else
				this.displayedScheduledTrainings.sort((a, b) => b.Training.Price - a.Training.Price);
		},
		sortByPriceAsc: function () {
			if(this.selectedTab === 'PAST')
				this.displayedPastTrainings.sort((a, b) => a.Training.Price - b.Training.Price);
			else
				this.displayedScheduledTrainings.sort((a, b) => a.Training.Price - b.Training.Price);
		},
		sortByDateAsc : function () {
			if(this.selectedTab === 'PAST') {
				this.displayedPastTrainings.sort((a, b) => {
					let newA = this.convertDate(a.CheckIn).getTime();
					let newB = this.convertDate(b.CheckIn).getTime();
					return newA - newB;
				});
			} else {
				this.displayedScheduledTrainings.sort((a, b) => {
					let newA = this.convertDate(a.ScheduledFor).getTime();
					let newB = this.convertDate(b.ScheduledFor).getTime();
					return newA - newB;
				});
			}
		},
		sortByDateDesc : function () {
			if(this.selectedTab === 'PAST') {
				this.displayedPastTrainings.sort((a, b) => {
					let newA = this.convertDate(a.CheckIn).getTime();
					let newB = this.convertDate(b.CheckIn).getTime();
					return newB - newA;
				});
			} else {
				this.displayedScheduledTrainings.sort((a, b) => {
					let newA = this.convertDate(a.ScheduledFor).getTime();
					let newB = this.convertDate(b.ScheduledFor).getTime();
					return newB - newA;
				});
			}
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
		filterTrainings: function () {
			let filterResult = [];
			let filtersTrainingType = document.getElementsByClassName("filter-checks-training-type");
			let filtersSportsObjectType = document.getElementsByClassName("filter-checks-sports-object-type");
			let checkedTraining = [];
			let checkedSportsObject = []
			for (let i = 0; i < filtersTrainingType.length; i++) {
				if (filtersTrainingType[i].checked) {
					checkedTraining.push(filtersTrainingType[i]);
				}
			}
			for (let i = 0; i < filtersSportsObjectType.length; i++) {
				if (filtersSportsObjectType[i].checked) {
					checkedSportsObject.push(filtersSportsObjectType[i]);
				}
			}

			if(this.selectedTab === 'PAST') {
				if ((checkedTraining.length === 0 || checkedTraining.length === 2) && (checkedSportsObject.length === 0 || checkedSportsObject.length === this.sportsObjectTypes.length)) {
					this.displayedPastTrainings = this.searchResult.past;
					return;
				}

				for (let i = 0; i < this.searchResult.past.length; i++) {
					for (let j = 0; j < checkedTraining.length; j++) {
						if (this.searchResult.past[i].Training.TrainingType.toLowerCase() === checkedTraining[j].id.toLowerCase()) {
							filterResult.push(this.searchResult.past[i]);
							break;
						}
					}
					for (let j = 0; j < checkedSportsObject.length; j++) {
						if (this.searchResult.past[i].Training.SportsObject.type.toLowerCase() === checkedSportsObject[j].id.toLowerCase()) {
							filterResult.push(this.searchResult.past[i]);
							break;
						}
					}
				}

				filterResult = filterResult.filter(function (item, index, inputArray) {
					return inputArray.indexOf(item) == index;
				});

				this.displayedPastTrainings = filterResult;
			} else {
				if ((checkedTraining.length === 0 || checkedTraining.length === 2) && (checkedSportsObject.length === 0 || checkedSportsObject.length === this.sportsObjectTypes.length)) {
					this.displayedScheduledTrainings = this.searchResult.scheduled;
					return;
				}
				for (let i = 0; i < this.this.searchResult.scheduled.length; i++) {
					for (let j = 0; j < checkedTraining.length; j++) {
						if (this.searchResult.scheduled[i].Training.TrainingType.toLowerCase() === checkedTraining[j].id.toLowerCase()) {
							filterResult.push(this.searchResult.scheduled[i]);
							break;
						}
					}
					for (let j = 0; j < checkedSportsObject.length; j++) {
						if (this.searchResult.scheduled[i].Training.SportsObject.type.toLowerCase() === checkedSportsObject[j].id.toLowerCase()) {
							filterResult.push(this.searchResult.scheduled[i]);
							break;
						}
					}
				}

				filterResult = filterResult.filter(function (item, index, inputArray) {
					return inputArray.indexOf(item) == index;
				});

				this.displayedScheduledTrainings = filterResult;
			}
		}
	}

})