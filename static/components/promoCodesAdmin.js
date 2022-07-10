Vue.component('promocodes-admin', {
    data: function () {
        return {
            user: null,
            promoCodes: null,
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
                                    <h1>Obriši promo kod</h1>
                                    <select class="form-select" v-model="selected">
                                        <option disabled selected hidden>Promo kodovi</option>
                                        <option v-for="item in this.promoCodes" :value="item">{{ item.Id }}</option>
                                    </select>
                                    <button class="btn btn-primary" v-on:click="deleteCode">Confirm</button></div>
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
        axios.get(`/rest/promocodes`)
            .then(response => {
                if (response.data != null) {
                    this.promoCodes = response.data;
                    this.loggedInCheck();
                    console.log(response.data);
                }
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteCode: function () {
            if(this.selected != null) {
                axios.post(`/rest/promocodes/${this.selected.Id}/delete`)
                    .then(response => {
                        console.log(response.data);
                        this.$router.replace("/");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                alert("Nije izabran nijedan kod.");
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