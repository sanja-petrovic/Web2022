

Vue.component('login-page'), {
    data: function () {
        return {
        username: "",
        password: "",
        isValid: false
        }
    },
    template: `
        <div class="login-div">
            <div class="login-content">
                <h1>Prijava</h1>
                <form action="">
                    <input v-model="username" class="text-box" type="text" id="username" name="username" placeholder="Korisničko ime">
                    <input v-model="password" class="text-box" type="password" id="lname" name="lastname" placeholder="Šifra">
                    <input class="submit-button" type="submit" value="Prijavi se">
                </form>
                <p>Nemaš nalog? <router-link to="/register">Registruj se</router-link> </p>
            </div>
        </div>`,
    methods: {

    }
}
