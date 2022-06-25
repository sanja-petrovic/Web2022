Vue.component('create-sports-object', {
    data: function () {
        return {
            managerOptions: ["Registruj menadžera..."],
            title: "",
            type: "",
            location: "",
            logo: null,
            manager: "Menadžer",
            errorExists: false,
            errorMessage: "",
        }
    },

    template: `
        <div>
            <nav-bar-logged-out></nav-bar-logged-out>
            <div class="create-divs">
                <div class="register-container">
                    <div class="register-div">
                        <div class="register-content">
                            <h3 class="myHeading">Novi sportski objekat</h3>
                            <form class="myForm" action="">
                                <input class="text-box create-input" type="text" v-model="title" placeholder="Naziv"
                                       required>
                                <input class="text-box create-input" v-model="type" type="text"
                                       placeholder="Tip" required>
                                <!--<div class="input-group">
                                    <span class="input-group-text">Ulica i broj</span>
                                    <input type="text" placeholder="Ulica" class="form-control text-box" required>
                                    <input type="text" placeholder="Broj" class="form-control text-box" required>
                                </div>-->
                                <input class="text-box create-input form-control custom-file-input" id="fileUpload" accept="image/*" ref="myFile" type="file" @change="previewFile">

                                <select v-model="manager" required>
                                    <option disabled selected hidden>Menadžer</option>
                                    <option v-for="item in this.managerOptions" :value="item"> {{ item.Name + " " + item.Surname }}</option>
                                </select>
                                <label class="invalid-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                <input class="submit-button create-input"  type="submit" :disabled="errorExists" v-on:click="createSportsObject"
                                       value="Dodaj objekat">
                            </form>
                        </div>
                    </div>
                </div>
                <div class="register-container">
                    <div class="register-div">
                        <div class="register-content">
                            <!--<h3 class="myHeading">Novi menadžer</h3>
                            <form class="myForm" action="">
                                <input class="text-box" type="text" id="name" name="name" v-model="name" placeholder="Ime"
                                       required>
                                <input class="text-box" type="text" id="surname" name="surname" v-model="surname"
                                       placeholder="Prezime" required>
                                <select name="gender" v-model="gender" id="gender" required>
                                    <option value="" disabled selected>Pol</option>
                                    <option value="Muški">Muški</option>
                                    <option value="Ženski">Ženski</option>
                                </select>
                                <input class="text-box" type="date" id="dob" name="dob" v-model="dob"
                                       placeholder="Datum rođenja" required>
                                <input class="text-box" type="text" id="username" name="username" v-model="username"
                                       v-on:blur="usernameUniqueCheck" placeholder="Korisničko ime" required>
                                <input class="text-box" type="password" id="password" v-on:blur="passwordMatchCheck"
                                       name="password" placeholder="Šifra" v-model="passwordFirst" required>
                                <input class="text-box" type="password" id="passwordcheck" v-on:blur="passwordMatchCheck"
                                       name="passwordcheck" v-model="passwordSecond" placeholder="Potvrdi šifru" required>
                                <label class="invalid-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                <input class="submit-button" type="submit" :disabled="errorExists" v-on:click="register"
                                       value="Registruj menadžera">
                            </form>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    mounted() {
        axios.get('rest/unassigned-managers')
            .then(response => {
                this.managerOptions = response.data;
            })
            .catch(error => console.log(error));
    },

    methods: {
        previewFile: function () {
            //var preview = document.querySelector('#preview');
            var file    = document.querySelector('input[type=file]').files[0];
            var reader  = new FileReader();

            /*reader.onloadend = function () {
                preview.src = reader.result;
            }*/

            if (file) {
                reader.readAsDataURL(file);
                $('#preview').show();
            } else {
                preview.src = "";
                $('#preview').hide();
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
                        name: this.title, manager: this.manager.Id, type: this.type, imgData: picturePath.result, fileName: fileName
                    })
                        .then(function response(resp){
                            location.reload();
                            oopsie = false;
                        }).catch(function error(err) {
                        alert(err.response.data);
                        oopsie = true;
                    });
                }
            })

            /*axios.post('/rest/createSportsObject', {
                name: this.title, manager: this.manager.Id, type: this.type, imgData: picturePath.result, fileName: fileName
            })
                .then(function response(resp) {
                    oopsie = false;
                })
                .catch(function error(err) {
                    oopsie = true;
                });*/

            /*if(oopsie) {
                this.$router.replace("/dodaj-objekat");
            } else {
                this.$router.replace("/");
            }
            this.errorExists = oopsie;*/
        },

        registerManager: function () {
            if(this.manager === "Registruj menadžera...") {

            }
        },

        addFile: async function () {
            this.logo = this.$refs.myFile.files[0];
            event.preventDefault();
            await axios.post('/rest/uploadPhoto', this.logo)
                .then(function response(resp) {
                    oopsie = false;
                })
                .catch(function error(err) {
                    oopsie = true;
                });
        },

        saveFile: async function (formData) {
            let oopsie = false;

        },

        okaci: function() {
            var picturePath  = new FileReader();
                var file   = this.$refs.myFile.files[0];
                var fileName = this.$refs.myFile.files[0].name;
                picturePath.readAsDataURL(file);
                let image = $('#fileUpload')[0];
                pictureSend = true;


            if(pictureSend){
                picturePath.onloadend = function ()
                {
                    axios.
                    post("/rest/uploadPhoto",
                        JSON.stringify({
                            'imgData' : picturePath.result,
                            'fileName' : fileName
                        }))
                        .then(function response(resp){
                            location.reload();
                        }).catch(function error(err) {
                        alert(err.response.data);
                    });
                }
            }
        }
    }
})