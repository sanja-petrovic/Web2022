Vue.component('create-sports-object', {
    data: function () {
        return {
            managerOptions: [],
            title: "",
            type: "",
            location: {
                address: {
                    street: "",
                    number: "",
                    city: "",
                    postCode: "",
                    country: ""
                },
                longitude: null,
                latitude: null

            },
            logo: null,
            businessHours: {
                start: null,
                end: null
            },
            createManager: false,
            manager: "Menadžer",
            errorExists: false,
            errorMessage: "",
            nameIsUnique: true,
            usernameIsUnique: true,
            passwordsMatch: true,
            managerParams: {
                name: "",
                surname: "",
                username: "",
                passwordFirst: "",
                passwordSecond: "",
                dob: new Date(),
                gender: ""
            }
        }
    },

    template: `
        <div>
            <nav-bar-logged-out></nav-bar-logged-out>
                <div class="outer-container">
                    <div class="create-divs">
                        <div class="bla">
                            <div class="register-container">
                                <div class="register-content">
                                    <h3 class="heading">Sportski objekat</h3>
                                    <form class="myForm" action="">
                                        <input class="text-box create-input" v-on:blur="nameUniqueCheck" type="text" v-model="title" placeholder="Naziv"
                                               required>
                                        <input class="text-box create-input" v-model="type" type="text"
                                               placeholder="Tip" required>
                                        <div class="input-group">
                                            <span class="input-group-text ">Radno vreme</span>
                                            <input type="time" placeholder="Početak" v-model="businessHours.start" class="form-control text-box" required>
                                            <input type="time" placeholder="Kraj" v-model="businessHours.end" class="form-control text-box" required>
                                        </div>
                                        <div class="input-group">
                                            <input type="text" placeholder="Ulica" v-model="location.address.street" class="form-control text-box" required>
                                            <input type="text" style="max-width: 5em" placeholder="Broj" v-model="location.address.number" class="form-control text-box" required>
                                        </div>
                                        <div class="input-group">
                                            <input type="text" placeholder="Grad" v-model="location.address.city" class="form-control text-box" required>
                                            <input type="text" placeholder="Poštanski broj" style="max-width: 9em" v-model="location.address.postCode" class="form-control text-box" required>
                                        </div>
                                        <div class="map" id="map-create"></div>
                                        <input class="text-box create-input form-control custom-file-input" id="fileUpload" accept="image/*" ref="myFile" type="file" @change="previewFile">

                                        <select v-if="this.managerOptions.length > 0" v-model="manager" required>
                                            <option selected hidden>Menadžer</option>
                                            <option v-for="item in this.managerOptions" :value="item"> {{ item.Name + " " + item.Surname }}</option>
                                        </select>
                                        <label class="invalid-input" v-if="errorExists && managerOptions.length > 0">{{ this.errorMessage }}</label>
                                        <input v-if="this.managerOptions.length > 0" class="submit-button create-input"  type="submit" :disabled="errorExists" v-on:click="createSportsObject"
                                               value="Dodaj sportski objekat">
                                    </form>
                                </div>
                            </div>
                            <div v-if="this.managerOptions.length === 0" class="register-container">
                                <div class="">
                                    <div class="register-content">
                                        <h3 class="heading" style="font-weight: 500">Menadžer</h3>
                                        <form class="myForm" action="">
                                            <input class="text-box create-input" type="text" id="name" name="name" v-model="managerParams.name" placeholder="Ime"
                                                   required>
                                            <input class="text-box create-input" type="text" id="surname" v-model="managerParams.surname" name="surname"
                                                   placeholder="Prezime" required>
                                            <div class="input-group create-input">
                                                <span class="input-group-text" style="width: 5em">Pol</span>
                                                <input type="radio" class="btn-check" value="Muški" v-model="managerParams.gender" name="gender" id="male" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="male">Muški</label>
                                                <input type="radio" class="btn-check" value="Ženski" name="gender" v-model="managerParams.gender" id="female" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="female">Ženski</label>
                                            </div>
                                            <input class="text-box create-input" v-model="managerParams.dob" type="date" id="dob" name="dob" 
                                                   placeholder="Datum rođenja" required>
                                            <input class="text-box create-input" v-on:blur="usernameUniqueCheck" v-model="managerParams.username" type="text" id="username" name="username" 
                                                    placeholder="Korisničko ime" required>
                                            <input class="text-box create-input" v-on:blur="passwordMatchCheck" v-model="managerParams.passwordFirst" type="password" id="password" 
                                                   name="password" placeholder="Šifra" required>
                                            <input class="text-box create-input" v-on:blur="passwordMatchCheck" v-model="managerParams.passwordSecond" type="password" id="passwordcheck" 
                                                   name="passwordcheck" placeholder="Potvrdi šifru" required>
                                            <label class="invalid-input create-input" v-if="errorExists && managerOptions.length === 0">{{ this.errorMessage }}</label>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button v-if="this.managerOptions.length === 0" v-on:click="createObjectAndManager" class="search-button">Dodaj sportski objekat</button>
                </div>
        </div>
    `,

    mounted() {
        axios.get('rest/unassigned-managers')
            .then(response => {
                this.createManager = response.data === null || response.data.length === 0;
                this.managerOptions = response.data;
                this.displayMap();
            })
            .catch(error => console.log(error));

    },

    methods: {
        previewFile: function () {
            let file    = document.querySelector('input[type=file]').files[0];
            let reader  = new FileReader();

            if(file) {
                reader.readAsDataURL(file);
            }
        },

        createSportsObject: function () {
            return new Promise((resolve, reject) => {
                let oopsie = false;
                event.preventDefault();
                var picturePath  = new FileReader();
                var file   = this.$refs.myFile.files[0];
                var fileName = this.$refs.myFile.files[0].name;
                picturePath.readAsDataURL(file);
                let image = $('#fileUpload')[0];
                picturePath.onloadend = () =>
                {
                    axios.post('/rest/createSportsObject', {
                        name: this.title, manager: this.manager.Id, type: this.type, imgData: picturePath.result, fileName: fileName, businessHoursStart: this.businessHours.start, businessHoursEnd: this.businessHours.end
                    })
                        .then(function response(resp){
                            location.reload();
                            oopsie = false;
                        }).catch(function error(err) {
                        alert(err.response.data);
                        oopsie = true;
                    });
                }
                if(oopsie) {
                    this.$router.replace("/dodaj-objekat");
                } else {
                    this.$router.replace("/");
                }
                this.errorExists = oopsie;
            })

        },

        createObjectAndManager: function () {

            return new Promise((resolve, reject) => {
                this.registerManager().then(response => {

                    //alert(this.manager.Id);
                    let oopsie = false;
                    event.preventDefault();
                    var picturePath  = new FileReader();
                    var file   = this.$refs.myFile.files[0];
                    var fileName = this.$refs.myFile.files[0].name;
                    picturePath.readAsDataURL(file);
                    let image = $('#fileUpload')[0];
                    picturePath.onloadend = () =>
                    {
                        axios.post('/rest/createSportsObject', {
                            name: this.title, manager: this.manager.Id, type: this.type, imgData: picturePath.result, fileName: fileName, businessHoursStart: this.businessHours.start, businessHoursEnd: this.businessHours.end, street: this.location.address.street, number: this.location.address.number, city: this.location.address.city, postCode: this.longitude.address.postCode, country: "Srbija", latitude: this.location.latitude, longitude: this.location.longitude
                        })
                            .then(function response(resp){
                                location.reload();
                                oopsie = false;
                            }).catch(function error(err) {
                            alert(err.response.data);
                            oopsie = true;
                        });
                    }
                    if(oopsie) {
                        this.$router.replace("/dodaj-objekat");
                    } else {
                        this.$router.replace("/");
                    }
                    this.errorExists = oopsie;
                });
            })
        },
        registerManager: async function () {
            event.preventDefault();
            this.passwordMatchCheck();
            let oopsie = this.errorExists;
            await axios.post('/rest/create-manager', {
                username: this.managerParams.username,
                password: this.managerParams.passwordSecond,
                name: this.managerParams.name,
                surname: this.managerParams.surname,
                gender: this.managerParams.gender,
                dob: this.managerParams.dob
            })
                .then(response => {
                    oopsie = false;
                    this.manager = response.data;
                })
                .catch(function error(err) {
                    oopsie = true;
                });

        }, passwordMatchCheck: function () {
            if (this.usernameIsUnique) {
                this.errorMessage = "Šifre se ne poklapaju.";
                this.errorExists = this.managerParams.passwordFirst !== this.managerParams.passwordSecond;
            }
        },
        nameUniqueCheck: async function () {
            let error = false;
            await axios.get(`/rest/sportsobjects/${this.title}`)
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
                this.errorMessage = "Već postoji sportski objekat sa tim imenom.";
            } else {
                this.nameIsUnique = true;
                this.errorExists = false;
            }
            event.preventDefault();
        },
        usernameUniqueCheck: async function () {
            let error = false;
            await axios.get(`/rest/users/${this.managerParams.username}`)
                .then(function response(resp) {
                    if (resp.data) {
                        error = true;
                    }
                }).catch(function error(err) {
                    console.log(err);
                });

            if (error) {
                this.errorExists = true;
                this.usernameIsUnique = false;
                this.errorMessage = "Korisničko ime je zauzeto.";
            } else {
                this.usernameIsUnique = true;
                this.errorExists = false;
            }
            event.preventDefault();
        },
        displayMap: function () {

            let lat = 45.2396;
            let lon = 19.8227;
            let map = new ol.Map({
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([lon, lat]),
                    zoom: 10
                })
            });

            setTimeout(() => {
                if (map) {
                    map.setTarget("map-create");
                    let c = document.getElementById("map-create").childNodes;
                    c[0].style.borderRadius  = '15px';
                }
            }, 50);

            map.on('click', evt => {
                let coord = ol.proj.toLonLat(evt.coordinate);
                alert(coord);
                this.reverseGeocode(coord);

            })
        },
        reverseGeocode: function (coords) {
            fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
                .then(function (response) {
                    return response.json();
                }).then(json => {
                    console.log(coords);
                    this.location.longitude = coords[0];
                    this.location.latitude = coords[1];
                    console.log(json.address);
                    if (json.address.city) {
                        this.location.address.city = json.address.city;
                    } else if (json.address.city_district) {
                        this.location.address.city = json.address.city_district;
                    }

                    if (json.address.road) {
                        this.location.address.street = json.address.road;
                    }

                    if (json.address.house_number) {
                        this.location.address.number = json.address.house_number;
                    }

                    if(json.address.postcode){
                        this.location.address.postCode = json.address.postcode;
                    }

                });
        }
    }
})