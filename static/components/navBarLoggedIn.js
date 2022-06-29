Vue.component('navBarLoggedIn', {
    data: function () {
        return {
            name: "",
            surname: "",
            userType: "",
        }
    }, template: `
        <nav class="navbar navbar-default sticky-top navbar-expand-lg navbar-dark" style="width: 100%">
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
                        <router-link class="nav-link" to="/dodaj-trenera">Dodaj trenera</router-link>
                    </li>
                     <li class="nav-item">
                        <router-link class="nav-link" to="/dodaj-sadrzaj" v-if="this.userType === 'Manager'">Dodaj sadržaj</router-link>
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
                            <li><router-link to="/profil" class="dropdown-item">Profil</router-link></li>
                            <li><a class="dropdown-item" href="#">Članarina</a></li>
                            <li><router-link class="dropdown-item" to="/dodaj-objekat">Istorija treninga</router-link></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#" v-on:click="logOut">Odjavi se</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        </nav>
    `, 
    mounted() {
        axios.get(`/rest/loggedInUser`)
            .then(response => {
                this.name = response.data.Name;
                this.surname = response.data.Surname;
                let username = response.data.Username;
               	this.getUserTypeByUserName(username);
            })
            .catch(error => console.log(error));
    },
    methods: {
        getUserTypeByUserName: function(username) {
			 axios.get(`/rest/users/${username}`, {
						name: username
				})
                .then(resp => {
					this.userType = resp.data.UserType;
					console.log(this.userType);
				});
		},
        logOut: async function () {
            this.$router.replace("/");
            event.preventDefault();
            await axios.post('/rest/logout', {
                username: this.username, password: this.password
            })
                .then(function response(resp) {
                    window.location.href = "/";
                })
                .catch(function error(err) {
                    window.location.href = "/";
                    console.log(err);
                });
        }
    }
});