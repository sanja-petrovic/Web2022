
Vue.component('login-page', {
    data: function () {
        return {
            username: "", password: "", errorExists: false
        }
    }, template: `
        <div class="login-wrapper">
        <nav-bar-logged-out></nav-bar-logged-out>
        <div class="login-container">
            <div class="login-div">
                <div class="login-content">
                    <h1>Prijava</h1>
                    <form>
                        <input v-model="username" class="text-box" type="text" id="username" name="username"
                               placeholder="Korisničko ime">
                        <input v-model="password" class="text-box" type="password" id="password" name="password"
                               placeholder="Šifra" v-on:input="clearError">
                        <label class="invalid-input" v-if="errorExists">Pogrešno korisničko ime i/ili šifra.</label>
                        <input class="submit-button" type="submit" v-on:click="login" value="Prijavi se">
                    </form>
                    <p>Nemaš nalog?
                        <router-link to="/registracija">Registruj se</router-link>
                    </p>
                </div>
            </div>
        </div>
        </div>`,

    methods: {
        login: async function () {
            let oopsie = false;
            event.preventDefault();
            await axios.post('/rest/login', {
                username: this.username, password: this.password
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
                this.$router.replace("/prijava");
            } else {
                this.$router.replace("/");
            }
            this.errorExists = oopsie;
        },

        clearError: function () {
            this.errorExists = false;
        }
    }, mounted() {
    }
})
