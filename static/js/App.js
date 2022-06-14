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
                <router-link to="/register">Registracija</router-link>
            </div>
        </div>
        <div class="login-container">
            <div class="login-div">
                <div class="login-content">
                    <h1>Prijava</h1>
                    <form action="">
                        <input v-model="username" class="text-box" type="text" id="username" name="username" placeholder="Korisničko ime">
                        <input v-model="password" class="text-box" type="password" id="password" name="password" placeholder="Šifra">
                        <input class="submit-button" type="submit" v-on:click="login()" value="Prijavi se">
                    </form>
                    <p>Nemaš nalog? <router-link to="/register">Registruj se</router-link> </p>
                </div>
            </div>
        </div>
    </div>`,
    methods: {
        notEmptyCheck: function () {
            if(this.username.length === 0 || this.password.length === 0) {
                return false;
            } else {
                return true;
            }
        },
        login: function () {
            axios.post('/rest/login', {
                username: this.username,
                password: this.password
            })
                .then(response => (router.push(`/`)))
                .catch(function error(err) {
                    alert(err.response.data);
                });
        }
    },
    mounted() {
    }
})
let RegisterPage = Vue.component('register-page', {
    template:
    `
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
        </div>
    </div>
    <div class="register-container">
        <div class="register-div">
            <div class="register-content">
                <h1 class="myHeading">Registracija</h1>
                <form class="myForm" action="">
                    <input class="text-box" type="text" id="name" name="name" placeholder="Ime">
                    <input class="text-box" type="text" id="surname" name="surname" placeholder="Prezime">
                    <select name="gender" id="gender">
                        <option value="" disabled selected>Pol</option>
                        <option value="Muški">Muški</option>
                        <option value="Ženski">Ženski</option>
                    </select>
                    <input class="text-box" type="date" id="dob" name="dob" placeholder="Datum rođenja">
                    <input class="text-box" type="text" id="username" name="username" placeholder="Korisničko ime">
                    <input class="text-box" type="password" id="password" name="password" placeholder="Šifra">
                    <input class="text-box" type="password" id="passwordcheck" name="passwordcheck" placeholder="Potvrdi šifru">
                    <input class="submit-button" type="submit" value="Registruj se">
                </form>
                <p>Imaš nalog? <router-link :to="'/login'">Prijavi se</router-link> </p>
            </div>
        </div>
    </div>
</div>
    `
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
                <router-link to="/register">Registracija</router-link>
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
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage }
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

