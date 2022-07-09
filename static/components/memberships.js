Vue.component('memberships', {
	data: function() {
		return {
			loggedIn: false,
			username: "",
			memberships: null,
			membership: null,
			sportsObjectName: "",
			tier: null,
			discount: null,
			price: null,
			newPrice: null,
			id: "",
			promoCodeId: "",
			viewClicked: false,
			validCode: false,
			errorMessage: "",
			errorExists: false
		}
	},
	
	template: `
		<div>
		  <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
		  <nav-bar-logged-out v-else></nav-bar-logged-out>
		  <div class="main-content">
			<div class="create-divs justify-content-center">
                <div class="bla">
                    <div class="register-container">
  			        	<div class="register-content center-container">
                                        <h3 class="heading" style="font-weight: 500">Nova članarina</h3>
                                        <form class="myForm" action="">
                                            <div class="input-group create-input">
                                              <label class="input-group-text" style="width: 10em" for="memberships">Izaberi članiranu</label>
												  <select name="memberships" id="memberships" style="width: 15em" v-model="membership">
												    <option v-for="m in this.memberships" :value="m">{{m.Name}}</option>
												  </select>
											</div>
											<div class="info center-container" v-if="this.membership !== null">
											<label for="name">Ime Članarine</label>
											<input class="text-box" type="text" id="name" v-model="this.membership.Name" disabled>
											<label for="type">Tip članarine</label>
											<input class="text-box" type="text" id="type" v-model="this.membership.MembershipType" disabled>
											<label for="sportsObject">Članarina za sportski objekat</label>
											<input class="text-box" type="text" id="sportsObject" v-model="this.membership.SportsObject.name" disabled>
											<label for="terms">Ukupan broj termina</label>
											<input class="text-box" type="text" id="terms" v-model="this.membership.NumberOfTerms" disabled>
											<label for="limit">Dnevni broj termina</label>
											<input class="text-box" type="text" id="limit" v-model="this.membership.DailyLimit" disabled>
											<label for="price">Cena</label>
											<input class="text-box" type="text" id="price"  v-model="this.membership.Price" disabled>
											<button class="search-button" style="width: 320px" id="button" v-on:click="viewMembership">Pregled članarine</button><br>			
											<div class="info center-container" v-if="viewClicked === true">
											<label for="price">Cena za kupca {{this.tier}}</label>
											<input class="text-box" type="text" id="price" v-model="this.price" disabled><br>
											<input class="text-box create-input" type="text" v-on:blur="validatePromoCode" name="id" id="id" v-model="id" placeholder="Unesite promo kod:">
											<label for="newPrice" v-if="validCode === true">Kod je prihvaćen! Nova cena:</label>
											<input class="text-box" v-if="validCode === true" type="text" id="newPrice" v-model="this.newPrice" disabled><br>
											</div>
											</div>
											<label class="invalid-input create-input" v-if="errorExists">{{ this.errorMessage }}</label>
                                        </form>
                                </div>         
                    </div>
                </div>
                </div>
                <button class="search-button mb-5 mt-3" id="theButton" v-on:click="createBuyersMembership">Dodaj članarinu</button>
          </div>
          </div>
     
	`,
	
	mounted() {
		 this.loggedInCheck();
		 this.getMemberships();
	},
	
	methods: {
		 loggedInCheck: function () {
            axios.get(`/rest/loggedInUser`)
                .then(response => {
                    if (response.data != null) {
                        this.loggedIn = true;    
                        this.username = response.data.Username;  
                        this.tier = response.data.BuyerType.Tier;
                        this.discount = response.data.BuyerType.Discount;
                        console.log(this.discount);          
                    }
                })
                .catch(error => console.log(error));
        },
        
		getMemberships: function() {
	 		axios.get(`/rest/memberships`)
                .then(response => {
                    if (response.data != null) {
                        this.memberships = response.data;
                        console.log(response.data);
                    }
                })
                .catch(error => console.log(error));
		},
		viewMembership: function() {
			this.viewClicked = true;
			this.price = this.membership.Price - this.membership.Price * this.discount/100;
			event.preventDefault();
			
		},
		validatePromoCode: async function() {
			console.log(this.id);
			let promoCodeExists = false;
			let promoCode;
			var today = new Date();
			var todayDate = today.toISOString().split('T')[0];
			console.log(todayDate);
            	await axios.get(`/rest/promocodes/${this.id}`)
                .then(function response(resp) {
					console.log(resp.data)
                    if (resp.data) {
						promoCode = resp.data;
                        promoCodeExists = true;
                    }
                }).catch(function error(err) {
                    console.log(err);
                });

            if (promoCodeExists) {
				if(promoCode.ExpirationDateTime >= todayDate){
					this.validCode = true;
					this.errorExists = false;	
				}
				else {
					this.errorMessage ="Istekao je rok važenja promo koda!";
                	this.errorExists = true;
                	this.validCode = false;
				}
				if(promoCode.MaximumUses > 0) {
                	this.errorExists = false;
                	this.validCode = true;
                	this.promoCodeId = promoCode.Id;
                	this.calculateNewPrice(this.price, promoCode.Discount);       	
                } else {
					this.errorMessage ="Promo kod je iskorišćen maksimalan broj puta!";
                	this.errorExists = true;
                	this.validCode = false;
				}
		
            } else {
				this.errorMessage ="Uneli ste nepostojeći id!";
                this.errorExists = true;
            }
            event.preventDefault();
		},
		calculateNewPrice: function(oldPrice, discount) {
			console.log(discount);
			console.log(oldPrice);
			this.newPrice = oldPrice - oldPrice * discount/100;
		},
		createBuyersMembership: async function() {
			if(this.newPrice == null) {
				this.newPrice = this.price;
			}
			event.preventDefault();
			console.log(this.username);
			console.log(this.membership);
			await axios.post('/rest/createBuyersMembership', {
				buyerUsername: this.username, 
				membershipId: this.membership.Id,
				price: this.newPrice,
				promocodeId: this.promoCodeId
			})
				.then(response => {
					console.log(response.data);
					this.$router.replace("/");
	            	alert("Uspešno ste dodali novu članarinu!");            
	            })
	            .catch(err => {
                	alert(err.response.data);
                    this.$router.replace("/clanarine");          
				});
			
		}
		
	}
	
	
});