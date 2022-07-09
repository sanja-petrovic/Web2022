Vue.component('membership-buyer', {
	data: function() {
		return {
			buyer: null,
			buyerId: "",
			membership: null,
			expirationDate: ""
			
		}
		
		
	},
	
	template: `
		<div>
			<nav-bar-logged-in></nav-bar-logged-in>
			<div class="main-content">
			<div class="create-divs justify-content-center">
                <div class="bla">
                    <div class="register-container">
  			        	<div class="register-content center-container">
  			        	<div class="info center-container">
						<label for="name">Ime Članarine</label>
						<input class="text-box" type="text" id="name" v-model="this.membership.Name" disabled>
						<label for="sportsObject">Članarina za sportski objekat</label>
						<input class="text-box" type="text" id="sportsObject" v-model="this.membership.SportsObject.name" disabled>
						<label for="status">Status članarine</label>
						<input class="text-box" type="text" id="status" v-model="this.membership.Status" disabled>
						<label for="date">Članarina važi do</label>
						<input class="text-box" type="text" id="date" v-model="this.membership.DateTimeOfExpiration" disabled>
						<label for="used">Iskorišćen broj termina</label>
						<input class="text-box" type="text" id="used" v-model="this.membership.UsedTerms" disabled>
						<label for="terms">Ukupan broj termina</label>
						<input class="text-box" type="text" id="terms" v-model="this.membership.NumberOfTerms" disabled>
						<label for="limit">Dozvoljen broj dnevnih termina</label>
						<input class="text-box" type="text" id="limit" v-model="this.membership.DailyLimit" disabled>
						<label for="points">Ukupan broj poena</label>
						<input class="text-box" type="text" id="points" v-model="this.buyer.Points" disabled>
						<label for="tier">Vaš rang kupca</label>
						<input class="text-box" type="text" id="tier" v-model="this.buyer.BuyerType.Tier" disabled>
						</div>
						</div>					
					</div>
				</div>
			</div>
			</div>
	</div>			
	
	`,
	
	mounted() {
		axios.get(`/rest/loggedInUser`)
            .then(response => {
             	this.buyer = response.data;
                this.buyerId = response.data.Id;
                this.findMembership();
            })
            .catch(error => console.log(error));
		
	},
	methods: {
		findMembership: async function() {
			await axios.get(`/rest/buyersmemberships/${this.buyerId}`)
                .then(response => {
					this.membership = response.data;
		
                }).catch(error => console.log(error));
		}		
		
	}	
})