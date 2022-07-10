Vue.component('trainings-admin', {
    data: function () {
        return {
            user: null,
            trainings: null,
            selected: null
        }
    },
    template:
        `
        <div>

        <div v-if="user != null && user.UserType === 'Admin'">
            <nav-bar-logged-in></nav-bar-logged-in>
            <div class="main-content">
                <div class="create-divs justify-content-center">
                    <div class="bla">
                        <div class="register-container">
                            <div class="register-content center-container">
                                <div class="info center-container">
                                    <h1>Obriši trening</h1>
                                    <select class="form-select" v-model="selected">
                                        <option disabled selected hidden>Treninzi</option>
                                        <option v-for="item in this.trainings" :value="item">{{ item.Name }}</option>
                                    </select>
                                    <button class="btn btn-primary" v-on:click="deleteTraining">Confirm</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <unauthorized-access></unauthorized-access>
        </div>
        </div>
        
    `,
    mounted() {
        axios.get(`/rest/trainings`)
            .then(response => {
                if (response.data != null) {
                    this.trainings = response.data;
                    this.loggedInCheck();
                    console.log(response.data);
                }
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteTraining: function () {
            if(this.selected != null) {
                axios.post(`/rest/trainings/${this.selected.Id}/delete`)
                    .then(response => {
                        console.log(response.data);
                        this.$router.replace("/");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                alert("No membership selected.");
            }
        },
        loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
                    if(response.data != null) {
                        this.user = response.data;
                        console.log(this.user);
                    }

                })
                .catch(error => console.log(error));
        }
    }
})