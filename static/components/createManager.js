Vue.component('create-manager', {
    data: function () {
        return {
            user: null,
            managerParams: {
                name: "",
                surname: "",
                username: "",
                passwordFirst: "",
                passwordSecond: "",
                dob: new Date(),
                gender: ""
            },
            errorExists: false,
            errorMessage: "",
            nameIsUnique: true,
            usernameIsUnique: true,
            passwordsMatch: true,
            manager: null
        }
    },
    template: `
    <div>
        <div v-if="user != null && user.UserType === 'Admin'">
            <nav-bar-logged-in></nav-bar-logged-in>
            <div class="outer-container">
                <div class="create-divs">
                    <div class="bla">
                        <div class="register-container">
                            <div class="">
                                <div class="register-content">
                                    <h3 class="heading" style="font-weight: 500">Novi menadžer</h3>
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
                                        <label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button v-on:click="registerManager" class="search-button">Dodaj menadžera</button>
            </div>
        </div>
        <div v-else>
            <unauthorized-access></unauthorized-access>
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
                        this.user = response.data;
                        console.log(this.user);
                    }

                })
                .catch(error => console.log(error));
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
            if(oopsie) {
                this.$router.replace("/dodaj-menadzera");
            } else {
                this.$router.replace("/korisnici");
            }
            this.errorExists = oopsie;

        }, passwordMatchCheck: function () {
            if (this.usernameIsUnique) {
                this.errorMessage = "Šifre se ne poklapaju.";
                this.errorExists = this.managerParams.passwordFirst !== this.managerParams.passwordSecond;
            }
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
        }
    }
})