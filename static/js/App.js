let NavBarLoggedIn = Vue.component('navBarLoggedIn', {
	data: function() {
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
		logOut: function() {
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
                        <router-link to="/login" class="nav-link" href="#">Prijava</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link" href="#">Registracija</router-link>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    `
})

let LoginPage = Vue.component('login-page', {
	data: function() {
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
                        <router-link to="/register">Registruj se</router-link>
                    </p>
                </div>
            </div>
        </div>
        </div>`, methods: {
		login: async function() {
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
					router.replace("/login");
				});
			this.errorExists = oopsie;
		}, clearError: function() {
			this.errorExists = false;
		}
	}, mounted() {
	}
})
let RegisterPage = Vue.component('register-page', {
	data: function() {
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
                        <router-link :to="'/login'">Prijavi se</router-link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    `, methods: {
		register: async function() {
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
					router.replace("/register");
				});

		}, passwordMatchCheck: function() {
			if (this.usernameIsUnique) {
				this.errorMessage = "Šifre se ne poklapaju.";
				this.errorExists = this.passwordFirst !== this.passwordSecond;
			}
		}, usernameUniqueCheck: async function() {
			let error = false;
			await axios.get("/rest/user", { params: { "username": this.username } })
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

let SportsObjectPage = Vue.component('sports-object-page', {});

let HomePage = Vue.component('home-page', {
	data: function() {
		return {
			loggedIn: window.localStorage.getItem("username") !== null,
			sportsObjects: null,
			isOpen: false,
			searchParam: {
				searchName: "",
				searchLocation: "",
				searchGrade: 0.0,
				searchType: ""
			}
		}
	}, template: `
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
                    <select class="form-select" v-model="searchParam.searchType">
                    	<optgroup label="Tip objekta">
	                        <option>Teretana</option>
	                        <option>Fitnes centar</option>
	                        <option>Teniski centar</option>
	                    	<option>Plesni studio</option>
	                    	<option>Joga studio</option>
	                    	<option>Zatvoreni bazeni</option>
	                    </optgroup>
                    </select>
                    <input type="text" class="form-control" placeholder="Lokacija objekta" v-model="searchParam.searchLocation">
                    <input type="text" class="form-control" placeholder="Naziv objekta" v-model="searchParam.searchName">
                    <select class="form-select" style="max-width: 20em" v-model = "searchParam.searchGrade">
                        <optgroup label="Prosečna ocena">
	                        <option value="1">4.1 – 5.0</option>
	                        <option value="2">3.1 – 4.0</option>
	                        <option value="3">2.1 – 3.0</option>
	                        <option value="4">1.0 – 2.0</option>
	                        <option value="5">Neocenjeni</option>
                        </optgroup>
                    </select>
                    <div class="search-button" type="button" v-on:click="search">
                    	<i class="fa fa-search"></i>
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
                                    <input class="form-check-input" type="checkbox">Fitnes centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Teniski centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Plesni studio
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Joga studio
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Zatvoreni bazeni
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
                <ul class="cards" v-for="item in this.sportsObjects">
                 	<li>
					    <a class="card">
					        <img src="{{ item.logoIcon }}" class="card__image" alt="" />
					        <div class="card__overlay">
					            <div class="card__header">
					                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
					                    <path />
					                </svg>
					                <img class="card__thumb" v-bind:src="item.logoIcon" alt="" />
					                <div class="card__header-text">
					                    <h3 class="card__title"> {{ item.name }}
					                    	<span class="badge rounded-pill badge-open" v-if="openCheck(item.status)">Otvoreno</span>
					                    	<span class="badge rounded-pill badge-closed" v-if="!openCheck(item.status)">Zatvoreno</span>
					                    </h3>
					                    <span class="card__status">{{ item.type }}</span><br>
					                </div>
					            </div>
					            <p class="card__description">
					                <span class="d-inline-block"><i class="fa fa-business-time"
					                        style="margin-right: 0.4em; color: #91D0F7"></i><span class="d-inline-block">{{
					                        item.businessHours.startTime }}-{{ item.businessHours.endTime }}</span></span><br>
					                <span class="d-inline-block"><i class="fa fa-map-location-dot"
					                        style="margin-right: 0.4em; color: #9BE3C3"></i><span class="d-inline-block">{{
					                        item.location.address.street }} {{ item.location.address.number }}, {{
					                        item.location.address.city }} {{item.location.address.postcode }}</span></span><br>
					                <span class="d-inline-block"><i class="fa fa-star" style="margin-right: 0.4em; color: #ADE9AA"></i><span
					                        class="d-inline-block">{{ item.averageGrade }}</span></span>
					            </p>
					        </div>
					    </a>
					</li>
       			 </ul>
                </div>
            </div>
        </div>
        </div>
    `,
	mounted() {
		axios.get('rest/sportsobjects')
			.then(response => {

				this.sportsObjects = response.data;
				console.log(response.data);
			})
			.catch(error => console.log(error));
	},
	methods:
	{
		openCheck: function(status) {
			if (status == 'WORKING')
				return true;
			else
				return false;
		},
		search: function() {
			if (this.searchParam.searchType !== '') {
				axios.get('rest/getSportsObjectByType', {
					params: {
						type: this.searchParam.searchType
					}
				})
				.then(response => {
					this.sportsObjects = response.data;
				})
				.catch(error => console.log(error));
			} 
			else if (this.searchParam.searchName !== '') {
				axios.get('rest/getSportsObjectByName', {
					params: {
						name: this.searchParam.searchName
					}
				})
				.then(response => {
					console.log(this.searchParam.searchName);
					this.sportsObjects = response.data;
					console.log(this.sportsObjects);
				})
				.catch(error => console.log(error));
			}
		}
	}
})

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{ path: '/', component: HomePage, alias: '/home' },
		{ path: '/login', component: LoginPage },
		{ path: '/register', component: RegisterPage }
	]
});

const app = new Vue({
	el: "#app", components: {
		HomePage
	}, router
});

