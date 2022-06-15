let loggedInUser;

const store = new Vuex.Store({
    state: {
        user: null,
        userType: null,
    },
    mutations: {
        logIn(user) {
            this.user = user;
            this.userType = user.userType;
        },
        logOut() {
            this.user = null;
            this.userType = null;
        }
    }
})

let NavBarLoggedIn = Vue.component('navBarLoggedIn', {
    data: function () {
        return {
            username: window.localStorage.getItem("username"),
            name: window.localStorage.getItem("name"),
            surname: window.localStorage.getItem("surname"),
        }
    },
    template: `
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../images/sfitness.png" alt="" height="35px"></a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active" aria-current="page">Početna stranica</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="#">Treninzi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="#">Članarine</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" style="color: white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ this.name + " " + this.surname }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Profil</a></li>
                            <li><a class="dropdown-item" href="#">Članarina</a></li>
                            <li><a class="dropdown-item" href="#">Istorija treninga</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" v-on:click="this.logOut">Odjavi se</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    `,
    methods: {
        logOut: function () {
            window.localStorage.clear();
            window.location.href = "/";
            router.replace("/");
        }
    }
})
let NavBarLoggedOut = Vue.component('navBarLoggedOut', {
    template: `
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark" style="width: 100%">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../images/sfitness.png" alt="" height="35px"></a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active" aria-current="page">Početna stranica</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="#">Treninzi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="color: white" href="#">Članarine</a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link" style="color: white" href="#">Prijava</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link" style="color: white" href="#">Registracija</router-link>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    `
})

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
        <nav-bar-logged-out></nav-bar-logged-out>
        <div class="login-container">
            <div class="login-div">
                <div class="login-content">
                    <h1>Prijava</h1>
                    <form @submit="login">
                        <input v-model="username" class="text-box" type="text" id="username" name="username" placeholder="Korisničko ime">
                        <input v-model="password" class="text-box" type="password" id="password" name="password" placeholder="Šifra">
                        <input class="submit-button" type="submit" value="Prijavi se">
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
                .then(function response(resp) {
                    window.location.href = "/";
                    router.replace("/");
                    window.localStorage.clear();
                    window.localStorage.setItem("username", resp.data.Username);
                    window.localStorage.setItem("name", resp.data.Name);
                    window.localStorage.setItem("surname", resp.data.Surname);
                    window.localStorage.setItem("type", resp.data.UserType);
                })
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
    data: function () {
        return {
            loggedIn: window.localStorage.getItem("username") !== null
        }
    },
    template: `
    <div>
    <nav-bar-logged-in v-if="this.loggedIn" ></nav-bar-logged-in>
    <nav-bar-logged-out v-else ></nav-bar-logged-out>
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
    methods: {
    },
    mounted() {
    }
});

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: HomePage, alias: '/home' },
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

