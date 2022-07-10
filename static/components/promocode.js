Vue.component('promocode', {
	data: function() {
		return {
			user: null,
			loggedIn: false,
			id: "",
			discount: "",
			maximumUses: "",
			expirationDateTime: new Date(),
			errorMessage: "",
			errorExists: false
					
		}
		
		
	},
	
	template: `
	<div>
		<div v-if="user != null && user.UserType === 'Admin'">
			<nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
			<nav-bar-logged-out v-else></nav-bar-logged-out>
			<div class="main-content">
				<div class="create-divs justify-content-center">
					<div class="bla">
						<div class="register-container">
							<div class="">
								<div class="register-content">
									<h3 class="heading" style="font-weight: 500">Novi promokod</h3>
									<form class="myForm" action="">
										<input class="text-box create-input" type="text" v-on:blur="idUniqueCheck" name="id" id="id" v-model="id" placeholder="Id"
											   required>
										<input class="text-box create-input" type="number" min=0 name="discount" v-model="discount" placeholder="Procenat popusta"
											   required>
										<input class="text-box create-input" type="number" min=0 name="maximumUses" v-model="maximumUses" placeholder="Maksimalan broj korišćenja"
											   required>
										<input class="text-box create-input" type="date" id="expirationDateTime" name="expirationDateTime" v-model="expirationDateTime" placeholder="Datum do kojeg promo kod važi"
											   required>
										<label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
									</form>
								</div>
							</div>

						</div>
					</div>
				</div>
				<button class="search-button mb-5 mt-3" id="theButton" v-on:click="definePromocode">Dodaj promo kod</button>
			</div>
		</div>
		<div v-else>
			<unauthorized-access></unauthorized-access>
		</div>
	</div>
	
	`,
	
	mounted() {
		this.loggedInCheck();
		
	},
	
	methods:  {
		 loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
                    if (response.data != null) {
                        this.loggedIn = true;
						this.user = response.data;
                    }
                })
                .catch(error => console.log(error));
        },
        idUniqueCheck: async function() {
			let error = false;
            	await axios.get(`/rest/promocodes/${this.id}`)
                .then(function response(resp) {
                    if (resp.data) {
                        error = true;
                    }
                }).catch(function error(err) {
                    console.log(err);
                });

            if (error) {
                this.errorExists = true;
                this.errorMessage ="Uneli ste id koji već postoji!";
                document.getElementById("theButton").disabled = true;
            } else {
                document.getElementById("theButton").disabled = false;
                this.errorExists = false;
            }
            event.preventDefault();
		},
        definePromocode: async function() {
			 await axios.post('/rest/createPromocode', {
                id: this.id,
                discount: this.discount,
                maximumUses: this.maximumUses,
                expirationDateTime: this.expirationDateTime
            })
            	.then(response => {
					console.log(response);
					  this.$router.replace("/");
					  alert("Uspešno ste kreirali novi promo kod!");
				})
				.catch(err => {
                	alert(err.response.data);
                    this.$router.replace("/dodaj-promokod");          
			})
		
		
		}
	}

	
})