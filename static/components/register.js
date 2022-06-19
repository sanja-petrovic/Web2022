Vue.component('register-page', {
    data: function () {
        return {
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
    }, template: `
        <div>
        <nav-bar-logged-out></nav-bar-logged-out>
        <div class="register-container">
            <div class="register-div">
                <div class="register-content">
                    <h1 class="myHeading">Registracija</h1>
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
                               value="Registruj se">
                    </form>
                    <p>Imaš nalog?
                        <router-link :to="'/prijava'">Prijavi se</router-link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    `, methods: {
        register: async function () {
            event.preventDefault();
            this.passwordMatchCheck();
            let oopsie = this.errorExists;
            await axios.post('/rest/register', {
                username: this.username,
                password: this.passwordSecond,
                name: this.name,
                surname: this.surname,
                gender: this.gender,
                dob: this.dob
            })
                .then(function response(resp) {
                    oopsie = false;
                    window.localStorage.clear();
                    window.localStorage.setItem("username", resp.data.Username);
                    window.localStorage.setItem("name", resp.data.Name);
                    window.localStorage.setItem("surname", resp.data.Surname);
                    window.localStorage.setItem("type", resp.data.UserType);
                })
                .catch(function error(err) {
                    oopsie = true;
                });

            if(oopsie) {
                this.$router.replace("/registracija");
            } else {
                this.$router.replace("/");
            }

        }, passwordMatchCheck: function () {
            if (this.usernameIsUnique) {
                this.errorMessage = "Šifre se ne poklapaju.";
                this.errorExists = this.passwordFirst !== this.passwordSecond;
            }
        }, usernameUniqueCheck: async function () {
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