Vue.component('manager-contents', {
    data: function () {
        return {
			loggedIn: false,
			sportsObject: null,
			logo: null,
			sportsObjectContents: null,
            list: [],
            mode: "BROWSE",
            selectedContent: null,
        }
    },
    template: `
    <div>
    	<nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
    	<div class="main-content">
    		<div class="sports-object-trainings">
                <h4>Sadržaji za objekat {{sportsObject.name}}:</h4>
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
                                        <span v-if="item.content.ContentType==='trening'" class="card__status">Trener: {{item.trainer.Name}} {{item.trainer.Surname}}</span><br>
                                        <span class="card__status">Trajanje: {{item.content.Duration}}min</span><br>
                                        <span class="card__status" v-if="item.content.ContentType==='trening' && item.price !== 0.0">Doplata za trening: {{item.price}} din</span>
                                        <span class="card__status" v-if="item.content.ContentType==='trening' && item.price === 0.0">nema doplate za trening</span><br>
                                    </div>
                                </div>
                                <p class="card__description"> 
                                	{{item.content.Description}}
                                </p>
                                <div class="d-flex align-items-center justify-content-center">
                                	<div class="search-button mb-1" style="width: 120px" type="button" v-on:click="selectContent(item)">
                                		Izmeni
                        			</div>
                        		</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>	
               <div class="create-divs justify-content-center" v-if="mode=='EDIT'">
                <div class="bla">
                    <div class="register-container">
                        <div class="">
                                <div class="register-content">
                                        <h3 class="heading" style="font-weight: 500">Izmeni sadržaj</h3>
                                        <form class="myForm" action="">
                                            <input class="text-box create-input" type="text" v-on:blur="nameUniqueCheck" name="name" v-model="selectedContent.content.Name" placeholder="Naziv"
                                                   required>
                                            <input class="text-box create-input" type="text" v-model="selectedContent.content.ContentType" name="contentType"
                                                   placeholder="Tip drugog sadržaja" required>
                                            <input class="text-box create-input form-control custom-file-input" id="fileUpload" accept="image/*" ref="myFile" type="file" @change="previewFile" required>
                                             <div class="input-group create-input" v-if="selectedContent.content.ContentType === 'trening'">
                                                <span class="input-group-text" style="width: 5em">Trening</span>
                                                <input type="radio" class="btn-check" v-model="selectedContent.type" value="Grupni" name="trainingType" id="grupni" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="Grupni">Grupni</label>
                                                <input type="radio" class="btn-check" v-model="selectedContent.type" value="Personalni" name="trainingType"  id="personalni" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="Personalni">Personalni</label>
                                            </div>
                                            <div class="input-group create-input" v-if="selectedContent.content.ContentType === 'trening'">
                                              <label class="input-group-text" style="width: 10em" for="trainers">Izaberi trenera</label>
												  <select name="trainers" id="trainers" style="width: 15em" v-model="selectedContent.trainer">
												    <option v-for="t in this.trainers" :value="t">{{t.Name}} {{t.Surname}}</option>
												  </select>
											</div>
                                            <input class="text-box create-input" v-if="selectedContent.content.ContentType === 'trening'" type="number" v-model="selectedContent.price" id="price" name="price" 
                                                   placeholder="Cena treninga" min=0>
                                            <textarea class="text-box create-input" v-model="selectedContent.content.Description" placeholder="Unesi opis"></textarea> 
                                            <input class="text-box create-input" type="number" v-model="selectedContent.content.Duration" id="dm" name="dm" 
                                                   placeholder="Trajanje u minutima" min=0>
                                            <label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                        </form>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
                <div>
                <button class="search-button mt-3 mb-5" id="theButton" v-on:click="editContent" v-if="mode=='EDIT'">Izmeni</button>
                <button class="search-button mt-3" v-on:click="cancelEditContent" v-if="mode=='EDIT'">Odustani</button>
                </div>
          </div>
    
    </div>
    
    `, 
    mounted() {
		this.loggedInCheck();
		this.getTrainers();
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
        getTrainers: function() {
			  axios.get('/rest/trainers')
                .then(response => {
                    this.trainers = response.data;
                    console.log(response.data);
                }).catch(error => console.log(error)) 
                    
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
							content: sportsObjectContent,
							trainer: null,
							price: 0.0,
							type: null
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
		selectContent: function(item) {
			console.log(item);
			this.mode = "EDIT";
			this.selectedContent = item;
		},
		cancelEditContent: function() {
			this.mode = "BROWSE";
		}
		
	}
	});