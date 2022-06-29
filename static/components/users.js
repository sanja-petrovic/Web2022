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
            }
        }
    },

    template: `
        <div class="user-page">
        <nav-bar-logged-in></nav-bar-logged-in>
            <div class="tabs">
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
        }
    }
});