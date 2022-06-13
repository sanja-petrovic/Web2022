let LoginPage = Vue.component('login-page', {
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
})

let HomePage = Vue.component('home-page', {
    template: `
    <div>
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
                <router-link :to="'/login'">Prijava</router-link>
                <a href="">Registracija</a>
            </div>
        </div>
        <div class="message-container">
            <div class="message">
                <div class="text-message">
                    <h1>Welcome to SFitness!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    </p>
                </div>
                <div class="image-message">
                    <img src="images/mainpic.png" width="600px" height="600px"/>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="main-div">
                <div class="main-content">
                    <h1>This is a header</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    <h1>This is a header</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    <h1>This is a header</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    <h1>This is a header</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    <h1>This is a header</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                </div>
            </div>
        </div>
</div>
        `,
    methods: {},
    mounted() {
    }
});

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage}
    ]
});

const app = new Vue(
    {
        el: "#app",
        components: {
            HomePage
        },
        router
    }
);

