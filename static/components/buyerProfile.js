Vue.component('buyer-profile-page', {
    data: function () {
        return {
            user: null,
            trainingHistory: null,
            displayedTrainings: null,
            editable: false,
            searchParam: {
                sportsObject: "",
                priceMin: 0,
                priceMax: Number.POSITIVE_INFINITY,
                checkInMin: new Date(1970, 1, 1),
                checkInMax: Date.now()
            },
            filterParam: {
                sportsObjectType: [],
                trainingType: []
            },
        }
    },
    template: `
        <div>
        <nav-bar-logged-in></nav-bar-logged-in>
        <div class="profile">

            <div class="tab-panel about-wrapper">
                <ul class="nav nav-pills me-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" v-on:click="checkedTab = 'profile'" id="pills-user-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-profile"
                                type="button" role="tab">Korisnički profil
                        </button>
                    </li>
                    <li v-if="this.user.UserType === 'Kupac'" class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-buyer-tab" v-on:click="checkedTab = 'trainings'"
                                data-bs-toggle="pill" data-bs-target="#pills-trainings"
                                type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Istorija
                            treninga
                        </button>
                    </li>

                </ul>
                <div class="tab-content" id="pills-tabContent" style="margin-top: 1em">
                    <div class="tab-pane fade show active" id="pills-profile" role="tabpanel"
                         aria-labelledby="pills-home-tab">
                        <div class="about-section">
                            <div class="profile-button-div">
                                <button class="sort-button" v-if="!editable" v-on:click="allowEdit">Izmeni</button>
                            </div>
                            <div class="info">
                                <label for="username">Korisničko ime</label>
                                <input readonly class="text-box" type="text" id="username" name="username"
                                       v-model="user.Username">
                                <label for="name">Ime</label>
                                <input readonly class="text-box" type="text" id="name" name="name" v-model="user.Name">
                                <label for="surname">Prezime</label>
                                <input class="text-box" type="text" id="surname" name="surname" v-model="user.Surname">
                                <label v-if="!editable" for="gender">Pol</label>
                                <input v-if="!editable" class="text-box" readonly type="text" id="gender" name="gender"
                                       v-model="user.Gender">
                                <div v-if="editable" class="input-group create-input" style="width: 100%;">
                                    <span class="input-group-text" style="height: 43px">Pol</span>
                                    <input type="radio" class="btn-check" value="Muški" v-model="user.gender" name="gender" id="male" autocomplete="off">
                                    <label class="btn btn-primary flex-grow-1" style="color: white; padding: 10px;" for="male">Muški</label>
                                    <input type="radio" class="btn-check" value="Ženski" name="gender" v-model="user.gender" id="female" autocomplete="off">
                                    <label class="btn btn-primary flex-grow-1" style="color: white; padding: 10px" for="female">Ženski</label>
                                </div>
                                <label for="date">Datum rođenja</label>
                                <input class="text-box" readonly type="date" id="dob" name="dob"
                                       v-model="user.DateOfBirth">
                                <button v-if="editable" v-on:click="edit" class="submit-button">Potvrdi</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-trainings" v-if="this.user.UserType === 'Kupac'" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div class="center-container">
                            <div class="buttons-galore" style="margin-left: 0;">
                                <div class="filter-and-sort">
                                    <div class="dropdown">
                                        <button class="sort-button" type="button" id="sort-button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span class="d-inline-block"><i class="fa-solid fa-chevron-down" style="margin-right: 0.4em;"></i><span class="d-inline-block">Sortiraj po...</span></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="sort-button">
                                            <li><button class="dropdown-item" type="button" v-on:click="sortByNameAsc">Nazivu sportskog objekta (rastuće)</button></li>
                                            <li><button class="dropdown-item" type="button" v-on:click="sortByNameDesc">Nazivu sportskog objekta (opadajuće)</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button class="dropdown-item" type="button" v-on:click="">Ceni (rastuće)</button></li>
                                            <li><button class="dropdown-item" type="button" v-on:click="">Ceni (opadajuće)</button></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><button class="dropdown-item" type="button"v-on:click="">Datumu prijave (rastuće)</button></li>
                                            <li><button class="dropdown-item" type="button" v-on:click="">Datumu prijave (opadajuće)</button></li>
                                        </ul>
                                    </div>
                                    <div class="dropdown">
                                        <button type="button" class="dropdown-toggle filter-button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                            Filteri
                                        </button>
                                        <div class="dropdown-menu p-4">
                                            <div class="mb-3">
                                                <p style="font-weight: 600;">Tip sportskog objekta</p>
                                                <div class="form-check">
                                                    <input class="form-check-input filter-checks-buyer" type="checkbox" value="" v-on:change="filterTrainings" id="bronzani">
                                                    <label class="form-check-label" for="bronze">
                                                        Bronzani
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <p style="font-weight: 600;">Tip treninga</p>
                                                <div class="form-check">
                                                    <input class="form-check-input filter-checks-roles" type="checkbox" value="" v-on:change="filterTrainings" id="kupac">
                                                    <label class="form-check-label" for="kupac">
                                                        Personalni
                                                    </label>
                                                </div>
                                                <div class="form-check">
                                                    <input class="form-check-input filter-checks-roles" type="checkbox" value="" v-on:change="filterTrainings" id="kupac">
                                                    <label class="form-check-label" for="kupac">
                                                        Grupni
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" v-model="searchParam.sportsObject" placeholder="Sportski objekat">
                                <input type="number" class="form-control" v-model="searchParam.priceMin" placeholder="Cena (min)">
                                <input type="number" class="form-control" v-model="searchParam.priceMax" placeholder="Cena (max)">
                                <input type="date" class="form-control" v-model="searchParam.checkInMin" placeholder="Datum prijave od...">
                                <input type="date" class="form-control" v-model="searchParam.checkInMax" placeholder="Datum prijave do...">
                                <div class="search-button" v-on:click="combinedSearch" type="button">
                                    <i class="fa fa-search"></i>
                                </div>
                            </div>
                            <div class="users-table">
                                <table class="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col" class="border-0 font-medium">Naziv treninga</th>
                                        <th scope="col" class="border-0 font-medium">Sportski objekat</th>
                                        <th scope="col" class="border-0 font-medium">Datum treniranja</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="training in this.displayedTrainings">
                                        <td>
                                            <span class="text-muted">{{ training.Training.Name }}</span><br>
                                        </td>
                                        <td>
                                            <span class="text-muted">{{ training.Training.SportsObject.name }}</span><br>
                                        </td>
                                        <td>
                                            <span class="text-muted">{{ training.CheckIn }}</span><br>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        </div>
    `,
    mounted() {
        axios.get(`/rest/loggedInUser`)
            .then(response =>
                {
                    this.user = response.data;
                    if(this.user.UserType === 'Kupac') {
                        this.getTrainingHistoryForBuyer();
                    }
                })
            .catch(error => console.log(error));
    },

    methods: {
        getTrainingHistoryForBuyer: function () {
            axios.get(`/rest/users/${this.user.Username}/trainings`)
                .then(response => {
                    this.trainingHistory = response.data;
                    this.displayedTrainings = response.data;
                })
                .catch(error => console.log(error));
        },
        formatTrainingDate: function (date) {
            return date.toLocaleDateString();
        },
        allowEdit: function () {
            let inputs = document.getElementsByClassName('text-box');
            for(let i = 1; i < inputs.length; i++) {
                inputs[i].removeAttribute('readonly');
            }
            this.editable = true;
        },
        edit: async function () {
            await axios.put(`/rest/updateProfile`, {
                name: this.user.Name,
                surname: this.user.Surname,
                username: this.user.Username,
                gender: this.user.Gender,
                dob: this.user.DateOfBirth,
                id: this.user.Id
            })
                .then(response => this.$router.go())
                .catch(error => console.log(error));
        },
        combinedSearch : function () {

        },
        filterTrainings: function () {

        },
        sortByNameDesc: function() {
            this.displayedTrainings.sort((b, a) => (a.SportsObject.name > b.SportsObject.name) ? 1 : ((b.SportsObject.name > a.SportsObject.name) ? -1 : 0));
        },
        sortByNameAsc: function() {
            this.displayedTrainings.sort((a, b) => (a.SportsObject.name > b.SportsObject.name) ? 1 : ((b.SportsObject.name > a.SportsObject.name) ? -1 : 0));
        }
    }

});