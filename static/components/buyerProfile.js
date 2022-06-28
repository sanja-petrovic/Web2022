
Vue.component('buyer-profile-page', {
    data: function () {
        return {
            user: null
        }
    },
    template: `
        <div>
        <nav-bar-logged-in></nav-bar-logged-in>
        <div class="profile">
            <div class="about-wrapper">
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
            </div>
            <div class="trainings-wrapper">
                <h4>Istorija treninga</h4>
                <div class="trainings-section">

                </div>
            </div>
        </div>
        </div>
    `,
    mounted() {
        axios.get(`/rest/loggedInUser`)
            .then(response => (this.user = response.data))
            .catch(error => console.log(error));
    }
    
});