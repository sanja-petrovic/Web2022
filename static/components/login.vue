Vue.component('login-page', {

    data: function () {
        return {
            username: "",
            password: "",
            isValid: false
        }
    },
    template: `
        <div class="login-wrapper">
        <div class="navBar">
            <div>
                <img src="images/s.png" width="24px" height="24px">
                <div>
                    <a href="">Test1</a>
                    <a href="">Test2</a>
                    <a href="">Test3</a>
                </div>
            </div>
            <div>
                <a href="">Prijava</a>
                <a href="">Registracija</a>
            </div>
        </div>
        <div class="login-container">
            <div class="login-div">
                <div class="login-content">
                    <h1>Prijava</h1>
                    <form action="">
                        <input v-model="username" class="text-box" type="text" id="username" name="username" placeholder="Korisničko ime">
                        <input v-model="password" class="text-box" type="password" id="password" name="password" placeholder="Šifra">
                        <input class="submit-button" type="submit" value="Prijavi se">
                    </form>
                    <p>Nemaš nalog? <router-link to="'/register'">Registruj se</router-link> </p>
                </div>
            </div>
        </div>
    </div>`,
    methods: {

    },
    mounted() {
    }
});
