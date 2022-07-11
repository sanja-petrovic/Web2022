Vue.component('create-trainer', {
    data: function () {
        return {
            user: null,
            name: "",
            surname: "",
            gender: "",
            dob: new Date(),
            username: "",
            passwordFirst: "",
            passwordSecond: "",
            usernameIsUnique: true,
            passwordsMatch: true,
            errorExists: false,
            errorMessage: "",
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
                                        <h3 class="heading" style="font-weight: 500">Novi trener</h3>
                                        <form class="myForm" action="">
                                            <input class="text-box create-input" type="text" id="name" name="name" v-model="name" placeholder="Ime"
                                                   required>
                                            <input class="text-box create-input" type="text" id="surname" v-model="surname" name="surname"
                                                   placeholder="Prezime" required>
                                            <div class="input-group create-input">
                                                <span class="input-group-text" style="width: 5em">Pol</span>
                                                <input type="radio" class="btn-check" value="Muški" v-model="gender" name="gender" id="male" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="male">Muški</label>
                                                <input type="radio" class="btn-check" value="Ženski" name="gender" v-model="gender" id="female" autocomplete="off">
                                                <label class="btn btn-primary flex-grow-1" for="female">Ženski</label>
                                            </div>
                                            <input class="text-box create-input" v-model="dob" type="date" id="dob" name="dob"
                                                   placeholder="Datum rođenja" required>
                                            <input class="text-box create-input" v-on:blur="usernameUniqueCheck" v-model="username" type="text" id="username" name="username"
                                                   placeholder="Korisničko ime" required>
                                            <input class="text-box create-input" v-on:blur="passwordMatchCheck" v-model="passwordFirst" type="password" id="password"
                                                   name="password" placeholder="Šifra" required>
                                            <input class="text-box create-input" v-on:blur="passwordMatchCheck" v-model="passwordSecond" type="password" id="passwordcheck"
                                                   name="passwordcheck" placeholder="Potvrdi šifru" required>
                                            <label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button v-on:click="registerTrainer" class="search-button">Dodaj trenera</button>
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
        registerTrainer: async function () {
            event.preventDefault();
            this.passwordMatchCheck();
            let oopsie = this.errorExists;
            if(this.username !== "" && this.passwordFirst !== "" && this.passwordSecond !== "" && this.name !== "" && this.surname !== "" && this.gender !== "") {
                await axios.post('/rest/create-trainer', {
                    username: this.username,
                    password: this.passwordSecond,
                    name: this.name,
                    surname: this.surname,
                    gender: this.gender,
                    dob: this.dob
                })
                    .then(function response(resp) {
                        oopsie = false;
                    })
                    .catch(function error(err) {
                        oopsie = true;
                    });

                if(oopsie) {
                    this.$router.replace("/dodaj-trenera");
                } else {
                    this.$router.replace("/");
                }
            } else {
                alert("Invalid input!");
            }

        },
        passwordMatchCheck: function () {
            if (this.usernameIsUnique) {
                this.errorMessage = "Šifre se ne poklapaju.";
                this.errorExists = this.passwordFirst !== this.passwordSecond;
            }
        },
        usernameUniqueCheck: async function () {
            let error = false;
            await axios.get(`/rest/users/${this.username}`)
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