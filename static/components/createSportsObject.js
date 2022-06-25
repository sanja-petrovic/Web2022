Vue.component('create-sports-object', {
    data: function () {
        return {
            managerOptions: ["Registruj menadžera..."],
            title: "",
            type: "",
            location: "",
            logo: "",
            manager: "Menadžer",
            errorExists: false,
            errorMessage: "",
        }
    },

    template: `
        <div>
            <nav-bar-logged-out></nav-bar-logged-out>
            <div class="create-divs">
                <div class="register-container">
                    <div class="register-div">
                        <div class="register-content">
                            <h3 class="myHeading">Novi sportski objekat</h3>
                            <form class="myForm" action="">
                                <input class="text-box create-input" type="text" placeholder="Naziv"
                                       required>
                                <input class="text-box create-input" type="text"
                                       placeholder="Tip" required>
                                <input class="text-box create-input" type="text" placeholder="Lokacija"
                                       required>
                                <input class="text-box create-input form-control custom-file-input" accept="image/*" type="file" v-bind:value="logo">

                                <select v-model="manager" required>
                                    <option disabled selected hidden>Menadžer</option>
                                    <option v-for="item in this.managerOptions" :value="item"> {{ item.Name + " " + item.Surname }}</option>
                                </select>
                                <label class="invalid-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                <input class="submit-button create-input"  type="submit" :disabled="errorExists" v-on:click="add"
                                       value="Dodaj objekat">
                            </form>
                        </div>
                    </div>
                </div>
                <div class="register-container">
                    <div class="register-div">
                        <div class="register-content">
                            <!--<h3 class="myHeading">Novi menadžer</h3>
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
                                       value="Registruj menadžera">
                            </form>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    mounted() {
        axios.get('rest/unassigned-managers')
            .then(response => {
                this.managerOptions = response.data;
            })
            .catch(error => console.log(error));
    },

    methods: {
        add: function () {

        },

        registerManager: function () {
            if(this.manager === "Registruj menadžera...") {

            }
        }
    }
})