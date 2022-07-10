Vue.component('membershipsAdmin', {
    data: function () {
        return {
            user: null,
            memberships: null,
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
                                    <h1>Obriši članarinu</h1>
                                    <select class="form-select" v-model="selected">
                                        <option disabled selected hidden>Članarine</option>
                                        <option v-for="item in this.memberships" :value="item">{{ item.Name }}</option>
                                    </select>
                                    <button class="btn btn-primary" v-on:click="deleteMembership">Confirm</button></div>
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
        axios.get(`/rest/memberships`)
            .then(response => {
                if (response.data != null) {
                    this.memberships = response.data;
                    this.loggedInCheck();
                    console.log(response.data);
                }
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteMembership: function () {
            if(this.selected != null) {
                axios.post(`/rest/memberships/${this.selected.Id}/delete`)
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