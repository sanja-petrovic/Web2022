Vue.component('contents-admin', {
    data: function () {
        return {
            user: null,
            contents: null,
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
                                    <h1>Obriši sadržaj</h1>
                                    <select class="form-select" v-model="selected">
                                        <option disabled selected hidden>Sadržaji</option>
                                        <option v-for="item in this.contents" :value="item">{{ item.Name }}</option>
                                    </select>
                                    <button class="btn btn-primary" v-on:click="deleteContent">Confirm</button></div>
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
        axios.get(`/rest/contents`)
            .then(response => {
                if (response.data != null) {
                    this.contents = response.data.filter( c => c.ContentType !== 'trening');
                    this.loggedInCheck();
                    console.log(response.data);
                }
            })
            .catch(error => console.log(error));
    },
    methods: {
        deleteContent: function () {
            if(this.selected != null) {
                axios.post(`/rest/contents/${this.selected.Id}/delete`)
                    .then(response => {
                        console.log(response.data);
                        this.$router.replace("/");
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                alert("Nije izabran nijedan sadržaj.");
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