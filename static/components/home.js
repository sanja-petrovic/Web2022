Vue.component('home-page', {
    data: function () {
        return {
            loggedIn: false
        }
    },
    template: `
        <div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="message-container">
            <div class="message">
                <div class="text-message">
                    <h1>Dobrodošli u <span class="outlined-text">SFitness!</span></h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis
                        aliquet, lacus ipsum volutpat urna, id ullamcorper neque elit sit amet turpis.
                    </p>
                </div>
                <div class="image-message">
                    <img src="images/mainpic.png" width="600px" height="600px"/>
                </div>
            </div>
        </div>
        <div class="main-container">
            <div class="main-div">
                <div class="main-content">
                    <h1>Sportski objekti</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus, ipsum a lobortis
                        aliquet!</p>
                    <div class="input-group mb-3" style="max-width: 80vw">
                    <select class="form-select" >
                        <option selected>Tip objekta</option>
                        <option value="1">Teretana</option>
                        <option value="2">Sportski centar</option>
                        <option value="3">Zatvoreni bazeni</option>
                    </select>
                    <input type="text" class="form-control" placeholder="Lokacija objekta">
                    <input type="text" class="form-control" placeholder="Naziv objekta">
                    <select class="form-select" style="max-width: 20em">
                        <option selected>Prosečna ocena</option>
                        <option value="1">4.1 – 5.0</option>
                        <option value="2">3.1 – 4.0</option>
                        <option value="3">2.1 – 3.0</option>
                        <option value="4">1.1 – 2.0</option>
                        <option value="10">Neocenjeni</option>
                    </select>
                    <div class="search-button" type="button"><i class="fa fa-search"></i>
                    </div>
                </div>
                    <div class="filter-div">
                    <div class="buttons">
                        <div class="filter-button" data-bs-toggle="collapse" data-bs-target="#filters" aria-expanded="false"><span class="d-inline-block"><i class="fa fa-filter" style="margin-right: 0.4em;"></i><span class="d-inline-block">Filteri</span></span>
                        </div>
                        <div class="dropdown">
                            <button class="sort-button" type="button" id="sort-button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="d-inline-block"><i class="fa-solid fa-chevron-down" style="margin-right: 0.4em;"></i><span class="d-inline-block">Sortiraj po...</span></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="sort-button">
                                <li><button class="dropdown-item" type="button">Nazivu (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Nazivu (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Lokaciji (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Lokaciji (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Prosečnoj oceni (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button">Prosečnoj oceni (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button">Otvoreni prvo</button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="collapse" id="filters">
                        <div class="card card-body">
                            <p>Tip objekta</p>
                            <div class="checkbox-list">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Teretana
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Sportski centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Zatvoreni bazeni
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Plesni studio
                                </label>
                                <button type="button" class="clear-button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="d-inline-block"><i class="fa-regular fa-circle-xmark" style="margin-right: 0.4em;"></i><span class="d-inline-block">Obriši filter</span></span>
                                </button>
                            </div>
                            <p>Status</p>
                            <div class="checkbox-list">
                                <label class="form-check-label">
                                    <input class="form-check-input" name="status" type="radio">Otvoreno
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" name="status" type="radio">Zatvoreno
                                </label>
                                <button type="button" class="clear-button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="d-inline-block"><i class="fa-regular fa-circle-xmark" style="margin-right: 0.4em;"></i><span class="d-inline-block">Obriši filter</span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                    
                    <sports-object-cards></sports-object-cards>

                </div>
            </div>
        </div>
        </div>
    `, methods: {},
    mounted() {
        axios.get(`/rest/loggedInUser}`)
            .then(response => (this.loggedIn = response.data && response.data.length))
            .catch(error => console.log(error));
    }
});