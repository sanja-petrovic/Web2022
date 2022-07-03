Vue.component('buyer-profile-page', {
    data: function () {
        return {
            user: null,
            trainingHistory: null
        }
    },
    template: `
        <div>
        <nav-bar-logged-in></nav-bar-logged-in>
        <div class="profile">
            <!--<div class="about-wrapper">
                <h4>Profil</h4>
                <div class="about-section">
                    <div class="info">
                        <label for="username">Korisničko ime</label>
                        <input readonly class="text-box" type="text" id="username" name="username" v-model="user.Username">
                        <label for="name">Ime</label>
                        <input readonly class="text-box" type="text" id="name" name="name" v-model="user.Name" >
                        <label for="surname">Prezime</label>
                        <input class="text-box" type="text" id="surname" name="surname" v-model="user.Surname" >
                        <label for="gender">Pol</label>
                        <input class="text-box" readonly type="text" id="gender" name="gender" v-model="user.Gender">
                        <label for="date">Datum rođenja</label>
                        <input class="text-box" readonly type="date" id="dob" name="dob" v-model="user.DateOfBirth">
                    </div>
                </div>
            </div>-->

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
                            <div class="info">
                                <label for="username">Korisničko ime</label>
                                <input readonly class="text-box" type="text" id="username" name="username"
                                       v-model="user.Username">
                                <label for="name">Ime</label>
                                <input readonly class="text-box" type="text" id="name" name="name" v-model="user.Name">
                                <label for="surname">Prezime</label>
                                <input class="text-box" type="text" id="surname" name="surname" v-model="user.Surname">
                                <label for="gender">Pol</label>
                                <input class="text-box" readonly type="text" id="gender" name="gender"
                                       v-model="user.Gender">
                                <label for="date">Datum rođenja</label>
                                <input class="text-box" readonly type="date" id="dob" name="dob"
                                       v-model="user.DateOfBirth">
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-trainings" v-if="this.user.UserType === 'Kupac'" role="tabpanel" aria-labelledby="pills-home-tab">
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
                                <tr v-for="training in this.trainingHistory">
                                    <td>
                                        <span class="font-medium mb-0">{{ training.Training.Name }}</span><br>
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
                .then(response => (this.trainingHistory = response.data))
                .catch(error => console.log(error));
        },
        formatTrainingDate: function (date) {
            return date.toLocaleDateString();
        }
    }

});