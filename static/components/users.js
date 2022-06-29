Vue.component('users', {
    data: function () {
        return {
            users: null,
            buyers: null,
            managers: null,
            trainers: null,
            admins: null,
            displayedUsers: null,
            displayedManagers: null,
            displayedBuyers: null,
            displayedTrainers: null,
            displayedAdmins: null,
            searchParam: {
                searchName: "",
                searchSurname: "",
                searchUsername: ""
            },
            filterParam: {
                userType: [],
                buyerType: []
            },
            checkedTab: ""
        }
    },

    template: `
        <div class="user-page">
        <nav-bar-logged-in></nav-bar-logged-in>
            <div class="tabs">

                <div class="buttons-galore">
                    <div class="filter-and-sort">
                        <div class="dropdown">
                            <button class="sort-button" type="button" id="sort-button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="d-inline-block"><i class="fa-solid fa-chevron-down" style="margin-right: 0.4em;"></i><span class="d-inline-block">Sortiraj po...</span></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sort-button">
                                <li><button class="dropdown-item" type="button" v-on:click="sortByNameAsc">Imenu (rastuće)</button></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByNameDesc">Imenu (opadajuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortBySurnameAsc">Prezimenu (rastuće)</button></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortBySurnameDesc">Prezimenu (opadajuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button"v-on:click="sortByUsernameAsc">Korisničkom imenu (rastuće)</button></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByUsernameDesc">Korisničkom imenu (opadajuće)</button></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <button type="button" class="dropdown-toggle filter-button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                Filteri
                            </button>
                            <div class="dropdown-menu p-4">
                                <div class="mb-3">
                                    <p style="font-weight: 600;">Tip kupca</p>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-buyer" type="checkbox" value="" v-on:change="filterBuyers" id="bronzani">
                                        <label class="form-check-label" for="bronze">
                                            Bronzani
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-buyer"  type="checkbox" v-on:change="filterBuyers" value="" id="srebrni">
                                        <label class="form-check-label" for="silver">
                                            Srebrni
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-buyer" type="checkbox" v-on:change="filterBuyers" value="" id="zlatni">
                                        <label class="form-check-label" for="gold">
                                            Zlatni
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <p style="font-weight: 600;">Uloga</p>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-roles" type="checkbox" value="" v-on:change="filterUsers" id="kupac">
                                        <label class="form-check-label" for="kupac">
                                            Kupac
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-roles"  type="checkbox" v-on:change="filterUsers" value="" id="menadžer">
                                        <label class="form-check-label" for="menadžer">
                                            Menadžer
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-roles" type="checkbox" v-on:change="filterUsers" value="" id="trener">
                                        <label class="form-check-label" for="trener">
                                            Trener
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input filter-checks-roles" type="checkbox" v-on:change="filterUsers" value="" id="admin">
                                        <label class="form-check-label" for="admin">
                                            Administrator
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="sort-button">Dodaj trenera</button>
                </div>
                
                <div class="input-group mb-3" style="max-width: 50vw; margin-left: 175px;">
                    <input type="text" class="form-control" v-model="searchParam.searchName" placeholder="Ime">
                    <input type="text" class="form-control" v-model="searchParam.searchSurname" placeholder="Prezime">
                    <input type="text" class="form-control" v-model="searchParam.searchUsername" placeholder="Korisničko ime">
                    <div class="search-button" v-on:click="combinedSearch" type="button">
                        <i class="fa fa-search"></i>
                    </div>
                </div>
                
               <div class="tab-panel">
                   <ul class="nav flex-column nav-pills me-3" id="pills-tab" role="tablist">
                       <li class="nav-item" role="presentation">
                           <button class="nav-link active" id="pills-user-tab" data-bs-toggle="pill" data-bs-target="#pills-users"
                                   type="button" role="tab" aria-controls="pills-home" aria-selected="true">Svi korisnici
                           </button>
                       </li>
                       <li class="nav-item" role="presentation">
                           <button class="nav-link" id="pills-buyer-tab" data-bs-toggle="pill" data-bs-target="#pills-buyers"
                                   type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Kupci
                           </button>
                       </li>
                       <li class="nav-item" role="presentation">
                           <button class="nav-link" id="pills-manager-tab" data-bs-toggle="pill" data-bs-target="#pills-managers"
                                   type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Menadžeri
                           </button>
                       </li>
                       <li class="nav-item" role="presentation">
                           <button class="nav-link" id="pills-trainer-tab" data-bs-toggle="pill" data-bs-target="#pills-trainers"
                                   type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Treneri
                           </button>
                       </li>
                       <li class="nav-item" role="presentation">
                           <button class="nav-link" id="pills-admin-tab" data-bs-toggle="pill" data-bs-target="#pills-admins"
                                   type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Administratori
                           </button>
                       </li>
                   </ul>
                   <div class="tab-content" id="pills-tabContent">
                       <div class="tab-pane fade show active" id="pills-users" role="tabpanel" aria-labelledby="pills-home-tab">
                           <div class="users-table">
                               <table class="table table-borderless">
                                   <thead>
                                   <tr>
                                       <th scope="col" class="border-0 font-medium">Ime i prezime</th>
                                       <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                       <th scope="col" class="border-0 font-medium">Pol</th>
                                       <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                       <th scope="col" class="border-0 font-medium">Uloga</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="user in this.displayedUsers">
                                       <td>
                                           <span class="font-medium mb-0">{{ user.Name + " " + user.Surname }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Username }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Gender }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.DateOfBirth }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.UserType }}</span><br>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade" id="pills-buyers" role="tabpanel" aria-labelledby="pills-profile-tab">
                           <div class="users-table">
                               <table class="table table-responsive table-borderless">
                                   <thead>
                                   <tr>
                                       <th scope="col" class="border-0 font-medium">Ime i prezime</th>
                                       <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                       <th scope="col" class="border-0 font-medium">Pol</th>
                                       <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                       <th scope="col" class="border-0 font-medium">Broj sakupljenih poena</th>
                                       <th scope="col" class="border-0 font-medium">Tip kupca</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="user in this.displayedBuyers">
                                       <td>
                                           <span class="font-medium mb-0">{{ user.Name + " " + user.Surname }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Username }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Gender }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.DateOfBirth }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Points }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.BuyerType.Tier }}</span><br>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade" id="pills-managers" role="tabpanel" aria-labelledby="pills-contact-tab">
                           <div class="users-table">
                               <table class="table table-responsive table-borderless">
                                   <thead>
                                   <tr>
                                       <th scope="col" class="border-0 font-medium">Ime i prezime</th>
                                       <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                       <th scope="col" class="border-0 font-medium">Pol</th>
                                       <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                       <th scope="col" class="border-0 font-medium">Sportski objekat</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="user in this.displayedManagers">
                                       <td>
                                           <span class="font-medium mb-0">{{ user.Name + " " + user.Surname }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Username }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Gender }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.DateOfBirth }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.SportsObject.name }}</span><br>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade" id="pills-trainers" role="tabpanel" aria-labelledby="pills-contact-tab">
                           <div class="users-table">
                               <table class="table table-responsive table-borderless">
                                   <thead>
                                   <tr>
                                       <th scope="col" class="border-0 font-medium">Ime i prezime</th>
                                       <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                       <th scope="col" class="border-0 font-medium">Pol</th>
                                       <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                       <th scope="col" class="border-0 font-medium">Broj treninga</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="user in this.displayedTrainers">
                                       <td>
                                           <span class="font-medium mb-0">{{ user.Name + " " + user.Surname }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Username }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Gender }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.DateOfBirth }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.TrainingHistory }}</span><br>
                                       </td>
                                   </tr>
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <div class="tab-pane fade" id="pills-admins" role="tabpanel" aria-labelledby="pills-contact-tab">
                           <div class="users-table">
                               <table class="table table-responsive table-borderless">
                                   <thead>
                                   <tr>
                                       <th scope="col" class="border-0 font-medium">Ime i prezime</th>
                                       <th scope="col" class="border-0 font-medium">Korisničko ime</th>
                                       <th scope="col" class="border-0 font-medium">Pol</th>
                                       <th scope="col" class="border-0 font-medium">Datum rođenja</th>
                                       <th scope="col" class="border-0 font-medium">Uloga</th>
                                   </tr>
                                   </thead>
                                   <tbody>
                                   <tr v-for="user in this.displayedAdmins">
                                       <td>
                                           <span class="font-medium mb-0">{{ user.Name + " " + user.Surname }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Username }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.Gender }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">{{ user.DateOfBirth }}</span><br>
                                       </td>
                                       <td>
                                           <span class="text-muted">Administrator</span><br>
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
    `,
    mounted() {
        axios.get('rest/users')
            .then(response => {
                this.users = response.data;
                this.displayedUsers = response.data;
                this.sortByRole();
            })
            .catch(error => console.log(error));
        axios.get('rest/buyers')
            .then(response => {
                this.buyers = response.data;
                this.displayedBuyers = response.data;
            })
            .catch(error => console.log(error));
        axios.get('rest/managers')
            .then(response => {
                this.managers = response.data;
                this.displayedManagers = response.data;
            })
            .catch(error => console.log(error));
        axios.get('rest/trainers')
            .then(response => {
                this.trainers = response.data;
                this.displayedTrainers = response.data;
            })
            .catch(error => console.log(error));
        axios.get('rest/admins')
            .then(response => {
                this.admins = response.data;
                this.displayedAdmins = response.data;
            })
            .catch(error => console.log(error));
    }
    ,
    methods: {
        combinedSearch() {
            let selected = document.getElementsByClassName('active')[0];
            let searchResult = [];
            switch(selected.id) {
                case "pills-user-tab":
                    searchResult = []
                    for(let i = 0; i < this.users.length; i++) {
                        let invalidCount = 0;
                        if(this.users[i].Name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
                            && (this.users[i].Surname.toLowerCase().includes(this.searchParam.searchSurname.toLowerCase().trim()))
                            && (this.users[i].Username.toLowerCase().includes(this.searchParam.searchUsername.toLowerCase().trim()))
                        ) {
                            searchResult.push(this.users[i]);
                        } else {
                            invalidCount += 1;
                        }
                    }
                    this.displayedUsers = searchResult;
                    break;
                case "pills-buyer-tab":
                    searchResult = [];
                    for(let i = 0; i < this.buyers.length; i++) {
                        let invalidCount = 0;
                        if(this.buyers[i].Name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
                            && (this.buyers[i].Surname.toLowerCase().includes(this.searchParam.searchSurname.toLowerCase().trim()))
                            && (this.buyers[i].Username.toLowerCase().includes(this.searchParam.searchUsername.toLowerCase().trim()))
                        ) {
                            searchResult.push(this.buyers[i]);
                        } else {
                            invalidCount += 1;
                        }
                    }
                    this.displayedBuyers = searchResult;
                    break;
                case "pills-manager-tab":
                    searchResult = [];
                    for(let i = 0; i < this.managers.length; i++) {
                        let invalidCount = 0;
                        if(this.managers[i].Name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
                            && (this.managers[i].Surname.toLowerCase().includes(this.searchParam.searchSurname.toLowerCase().trim()))
                            && (this.managers[i].Username.toLowerCase().includes(this.searchParam.searchUsername.toLowerCase().trim()))
                        ) {
                            searchResult.push(this.managers[i]);
                        } else {
                            invalidCount += 1;
                        }
                    }
                    this.displayedManagers = searchResult;
                    break;
                case "pills-trainer-tab":
                    searchResult = [];
                    for(let i = 0; i < this.trainers.length; i++) {
                        let invalidCount = 0;
                        if(this.trainers[i].Name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
                            && (this.trainers[i].Surname.toLowerCase().includes(this.searchParam.searchSurname.toLowerCase().trim()))
                            && (this.trainers[i].Username.toLowerCase().includes(this.searchParam.searchUsername.toLowerCase().trim()))
                        ) {
                            searchResult.push(this.trainers[i]);
                        } else {
                            invalidCount += 1;
                        }
                    }
                    this.displayedTrainers = searchResult;
                    break;
                case "pills-admin-tab":
                    searchResult = [];
                    for(let i = 0; i < this.admins.length; i++) {
                        let invalidCount = 0;
                        if(this.admins[i].Name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
                            && (this.admins[i].Surname.toLowerCase().includes(this.searchParam.searchSurname.toLowerCase().trim()))
                            && (this.admins[i].Username.toLowerCase().includes(this.searchParam.searchUsername.toLowerCase().trim()))
                        ) {
                            searchResult.push(this.admins[i]);
                        } else {
                            invalidCount += 1;
                        }
                    }
                    this.displayedAdmins = searchResult;
                    break;
            }
        },
        sortByNameDesc: function() {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((b, a) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((b, a) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((b, a) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((b, a) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((b, a) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
            }
        },
        sortByNameAsc: function() {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
                    break;
            }
        },
        sortBySurnameDesc: function () {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((b, a) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((b, a) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((b, a) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((b, a) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((b, a) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
            }
        },
        sortBySurnameAsc: function () {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((a, b) => (a.Surname > b.Surname) ? 1 : ((b.Surname > a.Surname) ? -1 : 0));
                    break;
            }
        },
        sortByUsernameDesc: function () {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((b, a) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((b, a) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((b, a) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((b, a) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((b, a) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
            }
        },
        sortByUsernameAsc: function () {
            let selected = document.getElementsByClassName('active')[0];
            switch (selected.id) {
                case "pills-user-tab":
                    this.displayedUsers.sort((a, b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-buyer-tab":
                    this.displayedBuyers.sort((a, b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-manager-tab":
                    this.displayedManagers.sort((a, b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-trainer-tab":
                    this.displayedTrainers.sort((a, b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
                case "pills-admin-tab":
                    this.displayedAdmins.sort((a, b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0));
                    break;
            }
        },
        sortByRole: function () {
            this.displayedUsers.sort((a, b) => (a.UserType > b.UserType) ? 1 : ((b.UserType > a.UserType) ? -1 : 0));
        },
        filterBuyers: function() {
            let filterResult = [];
            let selected = document.getElementsByClassName('active')[0];
            let filters = document.getElementsByClassName("filter-checks-buyer");
            let checked = [];
            for(let i = 0; i < filters.length; i++) {
                if(filters[i].checked) {
                    checked.push(filters[i]);
                }
            }
            if(checked.length === 0) {
                this.displayedBuyers = this.buyers;
                return;
            }
            for(let i = 0; i < this.buyers.length; i++) {
                for(let j = 0; j < checked.length; j++ ) {
                    if(this.buyers[i].BuyerType.Tier.toLowerCase() === checked[j].id) {
                        filterResult.push(this.buyers[i]);
                        break;
                    }
                }
            }
            this.displayedBuyers = filterResult;
            switch(selected.id) {
                case "pills-user-tab":
                    break;
                case "pills-buyer-tab":

                case "pills-manager-tab":
                    break;
                case "pills-trainer-tab":
                    break;
                case "pills-admin-tab":
                    break;
            }
        },
        filterUsers: function () {
            let filterResult = [];
            let filters = document.getElementsByClassName("filter-checks-roles");
            let checked = [];
            for(let i = 0; i < filters.length; i++) {
                if(filters[i].checked) {
                    checked.push(filters[i]);
                }
            }
            if(checked.length === 0) {
                this.displayedUsers = this.users;
                return;
            }
            console.log(checked[0].id);
            for(let i = 0; i < this.users.length; i++) {
                for(let j = 0; j < checked.length; j++ ) {
                    if(this.users[i].UserType.toLowerCase() === checked[j].id) {
                        filterResult.push(this.users[i]);
                        break;
                    }
                }
            }
            this.displayedUsers = filterResult;
        }
    }

});