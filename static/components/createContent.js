Vue.component('create-content', {
    data: function () {
        return {
            loggedIn: false,
            sportsObject: null,
            logo: null,
            name: "",
            contentType: "",
            type: "",
            trainingType: "",
            trainers: null,
            trainer: "",
            price: "",
            picture: null,
            description: "",
            durationMinutes: "",
            nameIsUnique: true,
            errorExists: false,
            errorMessage: "",
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
            <div class="create-divs justify-content-center">
                <div class="bla">
                    <div class="register-container">
                        <div class="">
                                <div class="register-content">
                                        <h3 class="heading" style="font-weight: 500">Novi sadržaj</h3>
                                        <form class="myForm" action="">
                                            <input class="text-box create-input" type="text" v-on:blur="nameUniqueCheck" name="name" v-model="name" placeholder="Naziv"
                                                   required>
                                            <div class="input-group create-input">
                                                <span class="input-group-text" style="width: 5em">Tip</span>
                                                <input type="radio" class="btn-check" v-model="type" value="trening" name="type" id="trening" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="trening">Trening</label>
                                                <input type="radio" class="btn-check" v-model="type" value="ostalo" name="type"  id="ostalo" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="ostalo">Drugi sadržaj</label>
                                            </div>
                                            <input class="text-box create-input" type="text" v-model="contentType" v-if="type === 'ostalo'" name="contentType"
                                                   placeholder="Tip drugog sadržaja" required>
                                            <input class="text-box create-input form-control custom-file-input" id="fileUpload" accept="image/*" ref="myFile" type="file" @change="previewFile" required>
                                             <div class="input-group create-input" v-if="type === 'trening'">
                                                <span class="input-group-text" style="width: 5em">Trening</span>
                                                <input type="radio" class="btn-check" v-model="trainingType" value="grupni" name="trainingType" id="grupni" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="grupni">Grupni</label>
                                                <input type="radio" class="btn-check" v-model="trainingType" value="personalni" name="trainingType"  id="personalni" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="personalni">Personalni</label>
                                            </div>
                                            <div class="input-group create-input" v-if="type === 'trening'">
                                              <label class="input-group-text" style="width: 10em" for="trainers">Izaberi trenera</label>
												  <select name="trainers" id="trainers" style="width: 15em" v-model="trainer">
												    <option v-for="t in this.trainers" :value="t">{{t.Name}} {{t.Surname}}</option>
												  </select>
											</div>
                                            <input class="text-box create-input" v-if="type === 'trening'" type="number" v-model="price" id="price" name="price" 
                                                   placeholder="Cena treninga" min=0>
                                            <textarea class="text-box create-input" v-model="description" placeholder="Unesi opis"></textarea> 
                                            <input class="text-box create-input" type="number" v-model="durationMinutes" id="dm" name="dm" 
                                                   placeholder="Trajanje u minutima" min=0>
                                            <label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                        </form>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
                <button class="search-button mb-5 mt-3" id="theButton" v-on:click="createContent">Dodaj sadržaj</button>
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
        openCheck: function (status) {
            if (status == 'WORKING')
                return true;
            else
                return false;
        },
        getSportsObjectByManagerId: function (id) {
            axios.get(`rest/managers/${id}`, {
                name: id
            })
                .then(response => {
                    this.sportsObject = response.data;
                    console.log(response.data);
                    this.logo = this.sportsObject.logoIcon;
                });
        },
        previewFile: function () {
            let file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();

            if (file) {
                reader.readAsDataURL(file);
            }
        },
        nameUniqueCheck: async function () {
            let error = false;
            await axios.get(`/rest/contents/${this.name}`)
                .then(function response(resp) {
                    if (resp.data) {
                        error = true;
                    }
                }).catch(function error(err) {
                    console.log(err);
                });

            if (error) {
                this.errorExists = true;
                this.nameIsUnique = false;
                this.errorMessage = "Već postoji sadržaj sa tim imenom.";
                document.getElementById("theButton").disabled = true;
            } else {
                this.nameIsUnique = true;
                document.getElementById("theButton").disabled = false;
                this.errorExists = false;
            }
            event.preventDefault();
        },
        getTrainers: function() {
			  axios.get('/rest/trainers')
                .then(response => {
                    this.trainers = response.data;
                    console.log(response.data);
                }).catch(error => console.log(error)) 
                    
        },
	
        createContent: function() {
			
            return new Promise((resolve, reject) => {
                let oopsie = false;
                let message = "Uspešno ste dodali novi sadržaj u " + this.sportsObject.name + "!";
                if (this.name == "") {
					this.errorExists = true;
					this.errorMessage = "Niste uneli naziv sadržaja.";
				} else if(this.contentType == "" && this.type !== "trening") {
					this.errorExists = true;
					this.errorMessage = "Niste uneli tip sadržaja.";
				}
				else {
					this.errorExists = false;
				}
				if(this.durationMinutes == "") {
					this.durationMinutes = 0;
				}
				if(this.price == ""){
					this.price = 0;
				}
                var picturePath = new FileReader();
                var file   = this.$refs.myFile.files[0];
                var fileName = this.$refs.myFile.files[0].name;
                picturePath.readAsDataURL(file);

                picturePath.onloadend = () =>
                {
                    if(this.type !== 'trening') {
                        axios.post('/rest/createContent', {
                            name: this.name, sportsObjectName: this.sportsObject.name, contentType: this.contentType, imgData: picturePath.result, fileName: fileName,
                            description: this.description, durationMinutes: this.durationMinutes
                        })
                            .then(resp => {
                                oopsie = false;
                                console.log(resp.data);
                                alert(message);
                                this.$router.replace("/sadrzaji");
                            }).catch(err => {
                            alert("Greška na serveru!");
                            this.$router.replace("/dodaj-sadrzaj");
                            oopsie = true;
                        });
                    } else {
                        axios.post('/rest/createTraining', {
                            name: this.name, sportsObjectName: this.sportsObject.name, contentType: "trening", imgData: picturePath.result, fileName: fileName,
                            description: this.description, durationMinutes: this.durationMinutes, trainer: this.trainer, price: this.price, trainingType: this.trainingType
                        })
                            .then(resp => {
                                oopsie = false;
                                console.log(resp.data);
                                this.$router.replace("/sadrzaji");

                            }).catch(err => {
                            alert("Greška na serveru!");

                            this.$router.replace("/dodaj-sadrzaj");
                            oopsie = true;
                        });
                    }
                }
                this.errorExists = oopsie;
                
            })
            
    	}
    }
});