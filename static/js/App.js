let NavBarLoggedIn = Vue.component('navBarLoggedIn', {
    data: function () {
        return {
            username: window.localStorage.getItem("username"),
            name: window.localStorage.getItem("name"),
            surname: window.localStorage.getItem("surname"),
        }
    }, template: `
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../images/s.png" alt="SFitness" height="25px"></a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" aria-current="page">Početna stranica</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Treninzi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Članarine</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-bs-toggle="dropdown" aria-expanded="false">
                            {{ this.name + " " + this.surname }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Profil</a></li>
                            <li><a class="dropdown-item" href="#">Članarina</a></li>
                            <li><a class="dropdown-item" href="#">Istorija treninga</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" v-on:click="this.logOut">Odjavi se</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    `, methods: {
        logOut: function () {
            window.localStorage.clear();
            window.location.href = "/";
            router.replace("/");
        }
    }
})
let NavBarLoggedOut = Vue.component('navBarLoggedOut', {
    template: `
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark" style="width: 100%;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../images/s.png" alt="SFitness" height="25px"></a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0" v-if="">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" aria-current="page">Početna stranica</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Treninzi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Članarine</a>
                    </li>
                    <li class="nav-item">
                        <router-link to="/prijava" class="nav-link" href="#">Prijava</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/registracija" class="nav-link" href="#">Registracija</router-link>
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
        </div>`, methods: {
        login: async function () {
            let oopsie = false;
            event.preventDefault();
            await axios.post('/rest/login', {
                username: this.username, password: this.password
            })
                .then(function response(resp) {
                    window.localStorage.clear();
                    router.replace("/");
                    window.localStorage.setItem("username", resp.data.Username);
                    window.localStorage.setItem("name", resp.data.Name);
                    window.localStorage.setItem("surname", resp.data.Surname);
                    window.localStorage.setItem("type", resp.data.UserType);
                })
                .catch(function error(err) {
                    oopsie = true;
                    router.replace("/prijava");
                });
            this.errorExists = oopsie;
        }, clearError: function () {
            this.errorExists = false;
        }
    }, mounted() {
    }
})
let RegisterPage = Vue.component('register-page', {
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
            await axios.post('/rest/register', {
                username: this.username,
                password: this.passwordSecond,
                name: this.name,
                surname: this.surname,
                gender: this.gender,
                dob: this.dob
            })
                .then(function response(resp) {
                    window.localStorage.clear();
                    router.replace("/");
                    window.localStorage.setItem("username", resp.data.Username);
                    window.localStorage.setItem("name", resp.data.Name);
                    window.localStorage.setItem("surname", resp.data.Surname);
                    window.localStorage.setItem("type", resp.data.UserType);
                })
                .catch(function error(err) {
                    oopsie = true;
                    router.replace("/registracija");
                });

        }, passwordMatchCheck: function () {
            if (this.usernameIsUnique) {
                this.errorMessage = "Šifre se ne poklapaju.";
                this.errorExists = this.passwordFirst !== this.passwordSecond;
            }
        }, usernameUniqueCheck: async function () {
            let error = false;
            await axios.get("/rest/user", {params: {"username": this.username}})
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

let SingleSportsObjectCard = Vue.component('single-sports-object-card', {
    /*data: function () {
        return {
            title: "",
            logo: "",
            type: "",
            businessHours: "",
            location: "",
            rating: 0.0,
            isOpen: false
        }
    },*/
    props: ['title', 'logo', 'type', 'businessHours', 'location', 'rating'], template: `
        <li>
        <a href="" class="card">
            <img src="../images/gym6.png" class="card__image" alt=""/>
            <div class="card__overlay">
                <div class="card__header">
                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path/>
                    </svg>
                    <img class="card__thumb" v-bind:src="logo" alt=""/>
                    <div class="card__header-text">
                        <h3 class="card__title"> {{ this.title }}<span class="badge rounded-pill badge-open"
                                                                       v-if="isOpen">Otvoreno</span>
                            <span class="badge rounded-pill badge-closed" v-else>Zatvoreno</span></h3>
                        <span class="card__status">{{ this.type }}</span><br>
                    </div>
                </div>
                <p class="card__description">
                    <span class="d-inline-block"><i class="fa fa-business-time"
                                                    style="margin-right: 0.4em; color: #91D0F7"></i><span
                        class="d-inline-block">{{ this.businessHours }}</span></span><br>
                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                        class="d-inline-block">{{ this.location }}</span></span><br>
                    <span class="d-inline-block"><i class="fa fa-star"
                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                        class="d-inline-block">{{ this.rating }}</span></span>
                </p>
            </div>
        </a>
        </li>
    `, methods: {
        openCheck: function () {
            //if currentTime is before opening time or after closing time => isOpen = false, else => isOpen = true*/
        }
    }, mounted() {
        this.openCheck();
    }
})

let SportsObjectCards = Vue.component('sports-object-cards', {
    data: function () {
        return {
            sportsObjects: null
        }
    },
    template: `
        <ul class="cards">
        <single-sports-object-card></single-sports-object-card>
        <!--
        remove the others and replace them with <single-sports-object-card></single-sports-object-card>
        -->
        <li is="single-sports-object-card"
            v-for="(object, index) in this.sportsObjects"
            v-bind:key="object.id"
            v-bind:title="object.name"
            v-bind:type="object.type"
            v-bind:location="object.location"
            v-bind:logo="object.logoIcon"
            v-bind:rating="object.averageGrade"
            v-bind:businessHours="object.businessHours"
        >
        </li>

        <li>
            <router-link :to="{ name: 'sportsObject', params: { title: 'sdance' }}"  target="_blank" class="card">
                <img src="../images/gym6.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/dance.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SDance <span class="badge rounded-pill badge-open">Otvoreno</span>
                            </h3>
                            <span class="card__status">Plesni studio</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </router-link>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym7.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/pool.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SPool <span class="badge rounded-pill badge-closed">Zatvoreno</span>
                            </h3>
                            <span class="card__status">Zatvoreni bazeni</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/gym2.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SGym Two <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Teretana</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/stadion.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SSport One <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Sportski centar</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/sport.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SSport Two <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Sportski centar</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/tennis.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">STennis <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Teniski tereni</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        </ul>
    `,
    methods: {
        search: function (type, location, name, rating) {

        },
        filter: function (type, isOpened) {

        },
        sortByTitle: function (asc = false) {

        },
        sortByLocation: function (asc = false) {

        },
        sortByRating: function (asc = false) {

        },
        sortByOpenStatus: function (asc = false) {
            //default sort
        }
    }
});

let SportsObjectPage = Vue.component('sports-object-page', {
    data: function () {
        return {
            loggedIn: window.localStorage.getItem("username") !== null
        }
    },
    template: `
        <div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="main-content">
            <div class="sports-object-header">
                <img class="sports-object-logo" src="../images/dance.png">
                <div class="sports-object-info">
                    <h1>SDance</h1>
                    <p class="sports-object-subtitle">Plesni studio</p>
                    <p class="sports-object-description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-arrow-circle-right"
                                                        style="margin-right: 0.4em; color: #9BA1FF"></i><span
                            class="d-inline-block">grupni treninzi, personalni treninzi</span></span>
                    </p>
                </div>
                <div class="sports-object-map">

                </div>
            </div>
            <div class="sports-object-trainings">
                <h4>Treninzi u ponudi</h4>

                <ul class="cards">
                    <li>
                        <div class="card">
                            <img src="../images/casplesa.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/dance.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">Čas modernog plesa
                                        </h3>
                                        <span class="card__status">Petar Petrović, 17:30-19:00</span><br>
                                    </div>
                                </div>
                                <p class="card__description">                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.

                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa2.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/pool.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SPool <span class="badge rounded-pill badge-closed">Zatvoreno</span>
                                        </h3>
                                        <span class="card__status">Zatvoreni bazeni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/gym2.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SGym Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teretana</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/stadion.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport One <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/sport.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/tennis.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">STennis <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teniski tereni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sports-object-comments">
                <h4>Komentari</h4>
                <div class="comment-section">
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `

});
/*<ul class="cards">
                <li>
                    <a href="" class="card">
                        <img src="../images/danceclass2.png" class="card__image" alt=""/>
                        <div class="card__overlay">
                            <div class="card__header">
                                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path/>
                                </svg>
                                <img class="card__thumb" src="../images/dance.png" alt=""/>
                                <div class="card__header-text">
                                    <h3 class="card__title">Čas plesa</h3>
                                    <span class="card__status">Jana Janković</span><br>
                                </div>
                            </div>
                            <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                                <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                    class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                <span class="d-inline-block"><i class="fa fa-star"
                                                                style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                    class="d-inline-block">9.4</span></span>
                            </p>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="" class="card">
                        <img src="../images/dance.png" class="card__image" alt=""/>
                        <div class="card__overlay">
                            <div class="card__header">
                                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                    <path/>
                                </svg>
                                <img class="card__thumb" src="../images/tennis.png" alt=""/>
                                <div class="card__header-text">
                                    <h3 class="card__title">STennis</h3>
                                    <span class="card__status">Teniski tereni</span><br>
                                </div>
                            </div>
                            <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                                <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                    class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                <span class="d-inline-block"><i class="fa fa-star"
                                                                style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                    class="d-inline-block">9.4</span></span>
                            </p>
                        </div>
                    </a>
                </li>
            </ul>*/
let HomePage = Vue.component('home-page', {
    data: function () {
        return {
            loggedIn: window.localStorage.getItem("username") !== null
        }
    },
    template: `
        <div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="message-container">
            <div class="message">
                <div class="text-message">
                    <h1>Dobrodošli u <span class="outlined-text">SFitness!</span></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis
                        aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
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
                    <h1>Sportski objekti</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis
                        aliquet!</p>
                    <div class="input-group mb-3" style="max-width: 80vw">
                    <select class="form-select" >
                        <option selected>Tip objekta</option>
                        <option value="1">Teretana</option>
                        <option value="2">Sportski centar</option>
                        <option value="3">Zatvoreni bazeni</option>
                    </select>
                    <input type="text" class="form-control" placeholder="Lokacija objekta">
                    <input type="text" class="form-control" placeholder="Naziv objekta">
                    <select class="form-select" style="max-width: 20em">
                        <option selected>Prosečna ocena</option>
                        <option value="1">9.1 – 10.0</option>
                        <option value="2">8.1 – 9.0</option>
                        <option value="3">7.1 – 8.0</option>
                        <option value="4">6.1 – 7.0</option>
                        <option value="5">5.1 – 6.0</option>
                        <option value="6">4.1 – 5.0</option>
                        <option value="7">3.1 – 4.0</option>
                        <option value="8">2.1 – 3.0</option>
                        <option value="9">1.1 – 2.0</option>
                        <option value="10">Neocenjeni</option>
                    </select>
                    <div class="search-button" type="button"><i class="fa fa-search"></i>
                    </div>
                </div>
                    <div class="filter-div">
                    <div class="buttons">
                        <div class="filter-button" data-bs-toggle="collapse" data-bs-target="#filters" aria-expanded="false"><span class="d-inline-block"><i class="fa fa-filter" style="margin-right: 0.4em;"></i><span class="d-inline-block">Filteri</span></span>
                        </div>
                        <div class="dropdown">
                            <button class="sort-button" type="button" id="sort-button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="d-inline-block"><i class="fa-solid fa-chevron-down" style="margin-right: 0.4em;"></i><span class="d-inline-block">Sortiraj po...</span></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sort-button">
                                <li><button class="dropdown-item" type="button">Nazivu (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Nazivu (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Lokaciji (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Lokaciji (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Prosečnoj oceni (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Prosečnoj oceni (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Otvoreni prvo</button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="collapse" id="filters">
                        <div class="card card-body">
                            <p>Tip objekta</p>
                            <div class="checkbox-list">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Teretana
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Sportski centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Zatvoreni bazeni
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Plesni studio
                                </label>
                                <button type="button" class="clear-button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="d-inline-block"><i class="fa-regular fa-circle-xmark" style="margin-right: 0.4em;"></i><span class="d-inline-block">Obriši filter</span></span>
                                </button>
                            </div>
                            <p>Status</p>
                            <div class="checkbox-list">
                                <label class="form-check-label">
                                    <input class="form-check-input" name="status" type="radio">Otvoreno
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" name="status" type="radio">Zatvoreno
                                </label>
                                <button type="button" class="clear-button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="d-inline-block"><i class="fa-regular fa-circle-xmark" style="margin-right: 0.4em;"></i><span class="d-inline-block">Obriši filter</span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                    
                    <sports-object-cards></sports-object-cards>

                </div>
            </div>
        </div>
        </div>
    `, methods: {}, mounted() {
    }
});

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: HomePage, alias: '/home'},
        {path: '/prijava', component: LoginPage},
        {path: '/registracija', component: RegisterPage},
        {path: '/objekti/:title', name: 'sportsObject', component: SportsObjectPage}
    ]
});

const app = new Vue({
    el: "#app", components: {
        HomePage
    }, router
});

