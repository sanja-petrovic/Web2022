Vue.component('create-content', {
    data: function () {
        return {
            loggedIn: false,
            sportsObject: null,
            logo: null,
            name: "",
            contentType: "",
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
            </div>
        </div>
        <div class="outer-container">
            <div class="create-divs">
                <div class="bla">
                    <div class="register-container">
                        <div class="">
                                <div class="register-content">
                                        <h3 class="heading" style="font-weight: 500">Novi sadržaj</h3>
                                        <form class="myForm" action="">
                                            <input class="text-box create-input" type="text" v-on:blur="nameUniqueCheck" name="name" v-model="name" placeholder="Naziv"
                                                   required>
                                            <input class="text-box create-input" type="text" v-model="contentType" name="contentType"
                                                   placeholder="Tip sadržaja" required>
                                            <input class="text-box create-input form-control custom-file-input" id="fileUpload" accept="image/*" ref="myFile" type="file" @change="previewFile" required>
                                            
                                            <textarea class="text-box create-input" v-model="description" placeholder="Unesi opis"></textarea> 
                                            <input class="text-box create-input" type="number" v-model="durationMinutes" id="dob" name="dob" 
                                                   placeholder="Trajanje u minutima" min=0>
                                            <label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                        </form>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
                <button class="search-button" id="theButton" v-on:click="createContent">Dodaj sadržaj</button>
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
        createContent: function() {
            return new Promise((resolve, reject) => {
                let oopsie = false;
                let message = "Uspešno ste dodali novi sadržaj u " + this.sportsObject.name + "!";
                if (this.name == "") {
					this.errorExists = true;
					this.errorMessage = "Niste uneli naziv sadržaja.";
				} else if(this.contentType == "") {
					this.errorExists = true;
					this.errorMessage = "Niste uneli tip sadržaja.";
				}
				else {
					this.errorExists = false;
				}
				if(this.durationMinutes == ""){
					this.durationMinutes = 0;
				}
                event.preventDefault();
                var picturePath = new FileReader();
                var file   = this.$refs.myFile.files[0];
                var fileName = this.$refs.myFile.files[0].name;
                picturePath.readAsDataURL(file); 
                console.log(picturePath);
                picturePath.onloadend = () =>
                {
                    axios.post('/rest/createContent', {
                        name: this.name, sportsObjectName: this.sportsObject.name, contentType: this.contentType, imgData: picturePath.result, fileName: fileName, 
                        description: this.description, durationMinutes: this.durationMinutes
                    })
                        .then(function response(resp){
                            oopsie = false;
                            console.log(resp.data); 
                            alert(message);
                        }).catch(function error(err) {
                            alert("Greška na serveru!");
                            oopsie = true;
                        });
                }
            
                if(oopsie) {
                    this.$router.replace("/dodaj-sadrzaj");
                } else {
                    this.$router.replace("/");
                }
                this.errorExists = oopsie;
                
            })
            
    	}
    }
});