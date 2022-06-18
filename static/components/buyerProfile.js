
Vue.component('buyer-profile-page', {
    data: function () {
        return {
            loggedIn: window.localStorage.getItem("username") !== null
        }
    },
    template: `
        <div>
            <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
            <nav-bar-logged-out v-else></nav-bar-logged-out>
            <div class="profile">
                <div class="about-wrapper">
                    <h4>Profil</h4>
                    <div class="about-section">
                        <div class="info">
                            <label for="username">Korisničko ime</label>
                            <input readonly class="text-box" type="text" id="username" name="username" value="hello">
                            <label for="name">Ime</label>
                            <input readonly class="text-box" type="text" id="name" name="name" value="Hello" >
                            <label for="surname">Prezime</label>
                            <input class="text-box" type="text" id="surname" name="surname"  value="Hello" >
                            <label for="gender">Pol</label>
                            <select name="gender" readonly id="gender">
                                <option disabled value="Muški">Muški</option>
                                <option disabled selected value="Ženski">Ženski</option>
                            </select>
                            <label for="date">Datum rođenja</label>
                            <input class="text-box" readonly type="date" value="2000-06-18" id="dob" name="dob">
                        </div>
                        <div class="membership">
                            <label for="points">Broj sakupljenih bodova</label>
                            <input class="text-box" readonly type="number" value="2343" id="points" name="points">
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
        `
});