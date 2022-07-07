Vue.component('memberships', {
	data: function() {
		return {
			loggedIn: false,
			username: "",
			memberships: null,
			membership: null,
			tier: null,
			discount: null,
			price: null,
			viewClicked: false
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
                                        <h3 class="heading" style="font-weight: 500">Kreiraj članarinu</h3>
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
											<button class="search-button" style="width: 320px" id="button" v-on:click="viewMembership(membership.Price)">Pregled članarine</button><br>			
											<div class="info center-container" v-if="this.viewClicked === true">
											<label for="price">Cena za kupca {{this.tier}}</label>
											<input class="text-box" type="text" id="price"  v-model="this.price" disabled><br>
											</div>
											</div>
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
		viewMembership: function(membershipPrice) {
			this.viewClicked = true;
			this.price = membershipPrice - membershipPrice * this.discount/100;
			
		},
		createBuyersMembership: async function() {
			event.preventDefault();
			console.log(this.username);
			console.log(this.membership);
			await axios.post('/rest/createBuyersMembership', {
				buyerUsername: this.username, 
				membershipId: this.membership.Id,
				price: this.price
			})
				.then(function response(resp){
	            	console.log(resp.data); 
	            	alert("Uspešno!");            
	            })
	            .catch(function error(err) {
	               alert("Greška na serveru!");
				});
			
		}
		
	}
	
	
});