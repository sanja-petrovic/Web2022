Vue.component('buyer-profile-page', {
    data: function () {
        return {
            username: window.localStorage.getItem("username"),
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
                        <input readonly class="text-box" type="text" id="username" name="username" v-model="username">
                        <label for="name">Ime</label>
                        <input readonly class="text-box" type="text" id="name" name="name" v-model="user.Name" >
                        <label for="surname">Prezime</label>
                        <input class="text-box" type="text" id="surname" name="surname" v-model="user.Surname" >
                        <label for="gender">Pol</label>
                        <input class="text-box" readonly type="text" id="gender" name="gender" v-model="user.Gender">
                        <label for="date">Datum rođenja</label>
                        <input class="text-box" readonly type="date" id="dob" name="dob" v-model="user.DateOfBirth">
                    </div>
                    <div class="membership">
                        <label for="points">Broj sakupljenih bodova</label>
                        <input class="text-box" readonly type="number" id="points" name="points" v-model="user.Points">
                        <label for="type">Tip kupca</label>
                        <input class="text-box" readonly type="text" value="Zlatni" id="type" name="type">
                        <label>Trenutna članarina</label>
                        <div class="membership-card">

                        </div>
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
        axios.get(`/rest/users/${this.username}`)
            .then(response => (this.user = response.data))
            .catch(error => console.log(error));
        if(this.user.Gender === "Female") {
            this.user.Gender = "Ženski";
        }
    }
});