const NavBarLoggedIn = { template: '<nav-bar-logged-in></nav-bar-logged-in>' }
const NavBarLoggedOut = { template: '<nav-bar-logged-out></nav-bar-logged-out>' }
const LoginPage = { template: '<login-page></login-page>' }
const RegisterPage = { template: '<register-page></register-page>' }
const BuyerProfilePage = { template: '<buyer-profile-page></buyer-profile-page>' }
let SingleSportsObjectCard = Vue.component('single-sports-object-card', {
    /*data: function () {
        return {
            title: "",
            logo: "",
            type: "",
            businessHours: "",
            location: "",
            rating: 0.0,
            isOpen: false
        }
    },*/
    props: ['title', 'logo', 'type', 'businessHours', 'location', 'rating'], template: `
        <li>
        <a href="" class="card">
            <img src="../images/gym6.png" class="card__image" alt=""/>
            <div class="card__overlay">
                <div class="card__header">
                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                        <path/>
                    </svg>
                    <img class="card__thumb" v-bind:src="logo" alt=""/>
                    <div class="card__header-text">
                        <h3 class="card__title"> {{ this.title }}<span class="badge rounded-pill badge-open"
                                                                       v-if="isOpen">Otvoreno</span>
                            <span class="badge rounded-pill badge-closed" v-else>Zatvoreno</span></h3>
                        <span class="card__status">{{ this.type }}</span><br>
                    </div>
                </div>
                <p class="card__description">
                    <span class="d-inline-block"><i class="fa fa-business-time"
                                                    style="margin-right: 0.4em; color: #91D0F7"></i><span
                        class="d-inline-block">{{ this.businessHours }}</span></span><br>
                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                        class="d-inline-block">{{ this.location }}</span></span><br>
                    <span class="d-inline-block"><i class="fa fa-star"
                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                        class="d-inline-block">{{ this.rating }}</span></span>
                </p>
            </div>
        </a>
        </li>
    `, methods: {
        openCheck: function () {
            //if currentTime is before opening time or after closing time => isOpen = false, else => isOpen = true*/
        }
    }, mounted() {
        this.openCheck();
    }
})

let SportsObjectCards = Vue.component('sports-object-cards', {
    data: function () {
        return {
            sportsObjects: null
        }
    },
    template: `
        <ul class="cards">
        <single-sports-object-card></single-sports-object-card>
        <!--
        remove the others and replace them with <single-sports-object-card></single-sports-object-card>
        -->
        <li is="single-sports-object-card"
            v-for="(object, index) in this.sportsObjects"
            v-bind:key="object.id"
            v-bind:title="object.name"
            v-bind:type="object.type"
            v-bind:location="object.location"
            v-bind:logo="object.logoIcon"
            v-bind:rating="object.averageGrade"
            v-bind:businessHours="object.businessHours"
        >
        </li>

        <li>
            <router-link :to="{ name: 'sportsObject', params: { title: 'sdance' }}"  target="_blank" class="card">
                <img src="../images/gym6.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/dance.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SDance <span class="badge rounded-pill badge-open">Otvoreno</span>
                            </h3>
                            <span class="card__status">Plesni studio</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </router-link>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym7.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/pool.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SPool <span class="badge rounded-pill badge-closed">Zatvoreno</span>
                            </h3>
                            <span class="card__status">Zatvoreni bazeni</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/gym2.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SGym Two <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Teretana</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/stadion.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SSport One <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Sportski centar</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/sport.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">SSport Two <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Sportski centar</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        <li>
            <a href="" class="card">
                <img src="../images/gym3.png" class="card__image" alt=""/>
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                            <path/>
                        </svg>
                        <img class="card__thumb" src="../images/tennis.png" alt=""/>
                        <div class="card__header-text">
                            <h3 class="card__title">STennis <span
                                class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                            <span class="card__status">Teniski tereni</span><br>
                        </div>
                    </div>
                    <p class="card__description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span>
                    </p>
                </div>
            </a>
        </li>
        </ul>
    `,
    methods: {
        search: function (type, location, name, rating) {

        },
        filter: function (type, isOpened) {

        },
        sortByTitle: function (asc = false) {

        },
        sortByLocation: function (asc = false) {

        },
        sortByRating: function (asc = false) {

        },
        sortByOpenStatus: function (asc = false) {
            //default sort
        }
    }
});

let SportsObjectPage = Vue.component('sports-object-page', {
    data: function () {
        return {
            loggedIn: window.localStorage.getItem("username") !== null
        }
    },
    template: `
        <div>
        <nav-bar-logged-in v-if="this.loggedIn"></nav-bar-logged-in>
        <nav-bar-logged-out v-else></nav-bar-logged-out>
        <div class="main-content">
            <div class="sports-object-header">
                <img class="sports-object-logo" src="../images/dance.png">
                <div class="sports-object-info">
                    <h1>SDance</h1>
                    <p class="sports-object-subtitle">Plesni studio</p>
                    <p class="sports-object-description">
                        <span class="d-inline-block"><i class="fa fa-business-time"
                                                        style="margin-right: 0.4em; color: #91D0F7"></i><span
                            class="d-inline-block">08:00-12:00</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                        style="margin-right: 0.4em; color: #9BE3C3"></i><span
                            class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-star"
                                                        style="margin-right: 0.4em; color: #ADE9AA"></i><span
                            class="d-inline-block">9.4</span></span><br>
                        <span class="d-inline-block"><i class="fa fa-arrow-circle-right"
                                                        style="margin-right: 0.4em; color: #9BA1FF"></i><span
                            class="d-inline-block">grupni treninzi, personalni treninzi</span></span>
                    </p>
                </div>
                <div class="sports-object-map">
                </div>
            </div>
            <div class="sports-object-trainings">
                <h4>Treninzi u ponudi</h4>
                <ul class="cards">
                    <li>
                        <div class="card">
                            <img src="../images/casplesa.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/dance.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">Čas modernog plesa
                                        </h3>
                                        <span class="card__status">Petar Petrović, 17:30-19:00</span><br>
                                    </div>
                                </div>
                                <p class="card__description">                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa2.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/pool.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SPool <span class="badge rounded-pill badge-closed">Zatvoreno</span>
                                        </h3>
                                        <span class="card__status">Zatvoreni bazeni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/casplesa3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/gym2.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SGym Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teretana</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/stadion.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport One <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/sport.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">SSport Two <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Sportski centar</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="" class="card">
                            <img src="../images/gym3.png" class="card__image" alt=""/>
                            <div class="card__overlay">
                                <div class="card__header">
                                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                                        <path/>
                                    </svg>
                                    <img class="card__thumb" src="../images/tennis.png" alt=""/>
                                    <div class="card__header-text">
                                        <h3 class="card__title">STennis <span
                                            class="badge rounded-pill badge-closed">Zatvoreno</span></h3>
                                        <span class="card__status">Teniski tereni</span><br>
                                    </div>
                                </div>
                                <p class="card__description">
                            <span class="d-inline-block"><i class="fa fa-business-time"
                                                            style="margin-right: 0.4em; color: #91D0F7"></i><span
                                class="d-inline-block">08:00-12:00</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-map-location-dot"
                                                                    style="margin-right: 0.4em; color: #9BE3C3"></i><span
                                        class="d-inline-block">Lasla Gala 15, Novi Sad</span></span><br>
                                    <span class="d-inline-block"><i class="fa fa-star"
                                                                    style="margin-right: 0.4em; color: #ADE9AA"></i><span
                                        class="d-inline-block">9.4</span></span>
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sports-object-comments">
                <h4>Komentari</h4>
                <div class="comment-section">
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed accumsan risus. Aliquam erat volutpat. Sed ut est eros. Phasellus et orci sapien.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                    <div class="comment">
                        <div class="comment-header">
                            <img src="../images/logo.jpg" style="border-radius: 50%" width="60px" height="60px">
                            <div class="title">
                                <h5>Marko Marković</h5>
                                <div><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i> </div>
                            </div>
                        </div>
                        <div class="comment-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                        <div class="comment-footer">
                            <p>24.04.2022. 17:32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    `
});

let HomePage = Vue.component('home-page', {
	data: function() {
		return {
			loggedIn: window.localStorage.getItem("username") !== null,
			sportsObjects: null,
			typesOfObjects: [],
			displayedObjects: null,
			searchResult: null,
			openStatus: "",
			typeObject: "",
			searchParam: {
				searchName: "",
				searchLocation: "",
				searchGrade: "Prosečna ocena",
				searchType: "Tip objekta"
			}
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
                    <select class="form-select" v-model="searchParam.searchType">
						<option disabled selected hidden>Tip objekta</option>
						<option>Svi</option>
						<option v-for="item in this.typesOfObjects" :value="item">{{ item }}</option>
                    </select>
                    <input type="text" class="form-control" placeholder="Lokacija objekta" v-model="searchParam.searchLocation">
                    <input type="text" class="form-control" placeholder="Naziv objekta" v-model="searchParam.searchName">
                    <select class="form-select" style="max-width: 20em" v-model = "searchParam.searchGrade">
						<option disabled selected hidden>Prosečna ocena</option>
						<option>Svi</option>
						<option>4.1 – 5.0</option>
						<option>3.1 – 4.0</option>
						<option>2.1 – 3.0</option>
						<option>1.0 – 2.0</option>
						<option>Neocenjeni</option>
                    </select>
                    <div class="search-button" type="button" v-on:click="combinedSearch">
                    	<i class="fa fa-search"></i>
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
                                <li><button class="dropdown-item" type="button" v-on:click="sortByNameDesc">Nazivu (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByNameAsc">Nazivu (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByLocationDesc">Lokaciji (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByLocationAsc">Lokaciji (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByRatingDesc">Prosečnoj oceni (opadajuće)</button></li>
                                <li><button class="dropdown-item" type="button"v-on:click="sortByRatingAsc">Prosečnoj oceni (rastuće)</button></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><button class="dropdown-item" type="button" v-on:click="sortByStatus">Otvoreni prvo</button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="collapse" id="filters">
                        <div class="card card-body">
                            <p>Tip objekta</p>
							<ul class="filter-list">
								<li v-for="item in this.typesOfObjects">
									<label class="form-check-label">
										<input class="form-check-input filter" name="type" type="radio" v-bind:value="item" v-on:change="filterSportsObjects" v-model="typeObject">{{ item }}
									</label>
								</li>
							</ul>
                            <p>Status</p>
                            <div class="checkbox-list">
                                <label class="form-check-label">
                                    <input class="form-check-input filter" name="status" v-model="openStatus" v-on:change="filterSportsObjects" value="WORKING" type="radio">Otvoreno
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" name="status" v-model="openStatus" v-on:change="filterSportsObjects" value="NOT_WORKING" type="radio">Zatvoreno
                                </label>
                            </div>
                            <div class="checkbox-list">
                            <button type="button" v-on:click="cancelFilter" class="clear-button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="d-inline-block"><i class="fa-regular fa-circle-xmark" style="margin-right: 0.4em;"></i><span class="d-inline-block">Poništi sve filtere</span></span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="cards" style="width: 100vw;">
                 	<li v-for="item in this.displayedObjects">
					    <a class="card">
					        <img v-bind:src="item.logoIcon" class="card__image" alt="" />
					        <div class="card__overlay">
					            <div class="card__header">
					                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
					                    <path />
					                </svg>
					                <img class="card__thumb" v-bind:src="item.logoIcon" alt="" />
					                <div class="card__header-text">
					                    <h3 class="card__title"> {{ item.name }}
					                    	<span class="badge rounded-pill badge-open" v-if="openCheck(item.status)">Otvoreno</span>
					                    	<span class="badge rounded-pill badge-closed" v-if="!openCheck(item.status)">Zatvoreno</span>
					                    </h3>
					                    <span class="card__status">{{ item.type }}</span><br>
					                </div>
					            </div>
					            <p class="card__description">
					                <span class="d-inline-block"><i class="fa fa-business-time"
					                        style="margin-right: 0.4em; color: #91D0F7"></i><span class="d-inline-block">{{
					                        item.businessHours.startTime }}-{{ item.businessHours.endTime }}</span></span><br>
					                <span class="d-inline-block"><i class="fa fa-map-location-dot"
					                        style="margin-right: 0.4em; color: #9BE3C3"></i>{{
					                        item.location.address.street }} {{ item.location.address.number }}, {{
					                        item.location.address.city }} {{item.location.address.postcode }}, {{item.location.address.country}}</span><br>
					                <span class="d-inline-block"><i class="fa fa-star" style="margin-right: 0.4em; color: #ADE9AA"></i><span
					                        class="d-inline-block">{{ item.averageGrade }}</span></span>
					            </p>
					        </div>
					    </a>
					</li>
       			 </ul>
                </div>
            </div>
        </div>
        </div>
    `,
	mounted() {
		this.displaySportsObjects();
	},
	methods:
	{
		displaySportsObjects: function() {
			axios.get('rest/sportsobjects')
			.then(response => {
				this.sportsObjects = response.data;
				this.sportsObjects.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
				this.displayedObjects = this.sportsObjects;
				this.searchResult = this.sportsObjects;
				this.getAllTypesOfObjects();
			})
			.catch(error => console.log(error));
		},
		openCheck: function(status) {
			if (status == 'WORKING')
				return true;
			else
				return false;
		},
		search: function() {
			if (this.searchParam.searchType !== 'Tip objekta') {
				axios.get('rest/getSportsObjectByType', {
					params: {
						type: this.searchParam.searchType
					}
				})
				.then(response => {
					this.displayedObjects = response.data;
				})
				.catch(error => console.log(error));
			}
			else if (this.searchParam.searchName !== '') {
				axios.get('rest/getSportsObjectByName', {
					params: {
						name: this.searchParam.searchName.toLowerCase()
					}
				})
				.then(response => {
					console.log(this.searchParam.searchName);
					this.displayedObjects = response.data;
				})
				.catch(error => console.log(error));
			}
			else if(this.searchParam.searchLocation !== '') {
				axios.get('rest/getSportsObjectByLocation', {
					params: {
						location: this.searchParam.searchLocation.toLowerCase()
					}
				})
				.then(response => {
					this.displayedObjects = response.data;
				})
				.catch(error => console.log(error));
			}
			else if(this.searchParam.searchGrade !== 'Prosečna ocena') {

				if (this.searchParam.searchGrade === 'Neocenjeni') {
					axios.get('rest/getSportsObjectByRatingInterval', {
						params: {
							minRating: '0.0',
							maxRating: '0.0',
						}
					})
					.then(response => {
						this.displayedObjects = response.data;
					})
					.catch(error => console.log(error));
				}
				else {
					let ratingInterval = this.searchParam.searchGrade.replace(/\s/g,'').split('–');
					console.log(ratingInterval[0]);
					axios.get('rest/getSportsObjectByRatingInterval', {
						params: {
							minRating: ratingInterval[0],
							maxRating: ratingInterval[1],
						}
					})
					.then(response => {
						this.displayedObjects = response.data;
					})
					.catch(error => console.log(error));
				}
			}
		},
		combinedSearch: function () {
			let searchResult = [];
			let ratingInterval = [0, 5];
			if(this.searchParam.searchGrade !== "Prosečna ocena" && this.searchParam.searchGrade !== "Svi") {
				if(this.searchParam.searchGrade === "Neocenjeni") {
					ratingInterval = [0, 0];
				} else {
					ratingInterval = this.searchParam.searchGrade.replace(/\s/g,'').split('–');
				}
			}
			for(let i = 0; i < this.sportsObjects.length; i++) {
				let invalidCount = 0;

				if(this.sportsObjects[i].name.toLowerCase().includes(this.searchParam.searchName.toLowerCase().trim())
				&& (this.sportsObjects[i].type.toLowerCase().includes(this.searchParam.searchType.toLowerCase().trim()) || this.searchParam.searchType === "Tip objekta" || this.searchParam.searchType === "Svi")
				&& (this.sportsObjects[i].location.address.city.toLowerCase().includes(this.searchParam.searchLocation.toLowerCase().trim())
						|| this.sportsObjects[i].location.address.country.toLowerCase().includes(this.searchParam.searchLocation.toLowerCase().trim()))
				&& (this.sportsObjects[i].averageGrade >= ratingInterval[0] && this.sportsObjects[i].averageGrade <= ratingInterval[1])
				) {
					searchResult.push(this.sportsObjects[i]);
				} else {
					invalidCount += 1;
				}
			}
			this.displayedObjects = searchResult;
			this.searchResult = searchResult;
			this.cancelFilter();
		},
		cancelSearch: function() {
			this.searchParam.searchType = "";
			this.searchParam.searchLocation = "";
			this.searchParam.searchName = "";
			this.searchParam.searchGrade = "Prosečna ocena";
			this.displayedObjects = this.sportsObjects;
			this.searchResult = this.sportsObjects;
		},
		getAllTypesOfObjects: function () {
			for(let i = 0; i < this.sportsObjects.length; i++) {
					this.typesOfObjects.push(this.sportsObjects[i].type);
			}
			this.typesOfObjects = this.typesOfObjects.filter( function( item, index, inputArray ) {
				return inputArray.indexOf(item) == index;
			});
			this.typesOfObjects.sort((b, a) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		},
		sortByNameDesc: function() {
			this.displayedObjects.sort((b, a) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		},
		sortByNameAsc: function() {
			this.displayedObjects.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
		},
		sortByLocationAsc: function() {
			this.displayedObjects.sort((a, b) => (a.location.address.city > b.location.address.city) ? 1 : ((b.location.address.city > a.location.address.city) ? -1 : 0));
		},
		sortByLocationDesc: function() {
			this.displayedObjects.sort((b, a) => (a.location.address.city > b.location.address.city) ? 1 : ((b.location.address.city > a.location.address.city) ? -1 : 0));
		},
		sortByRatingDesc: function() {
			this.displayedObjects.sort((b, a) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0));
		},
		sortByRatingAsc: function() {
			this.displayedObjects.sort((a, b) => (a.averageGrade > b.averageGrade) ? 1 : ((b.averageGrade > a.averageGrade) ? -1 : 0));
		},
		sortByStatus: function() {
			this.displayedObjects.sort((b, a) => (a.status > b.status) ? 1 : ((b.status > a.status) ? -1 : 0));
		},
		filterSportsObjects: function() {
			let filteredObjects = [];
			console.log(this.openStatus);
			console.log(this.typeObject);
			if (this.openStatus !== "" && this.typeObject !== "") {
				for (let i = 0; i < this.searchResult.length; i++) {
					if(this.searchResult[i].type === this.typeObject && this.searchResult[i].status === this.openStatus) {
	 					filteredObjects.push(this.searchResult[i]);
	 				}
 				}
			}
			else if (this.openStatus !== "") {
				for (let i = 0; i < this.searchResult.length; i++) {
					if(this.searchResult[i].status === this.openStatus) {
	 					filteredObjects.push(this.searchResult[i]);

	 				}
	 			}
			} else {
				for (let i = 0; i < this.searchResult.length; i++) {
					if(this.searchResult[i].type === this.typeObject) {
	 					filteredObjects.push(this.searchResult[i]);

	 				}
 				}
			}
			this.displayedObjects = filteredObjects;
		},
		cancelFilter: function() {
			event.preventDefault();
			let radioButtons = document.getElementsByClassName("filter");
			this.typeObject = "";
			this.openStatus = "";
			for(let i = 0; i < radioButtons.length; i++) {
				radioButtons[i].checked = false;
			}
			this.displayedObjects = this.searchResult;
		}

	}
});

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: HomePage, name: 'home', alias: '/home'},
        {path: '/prijava', component: LoginPage},
        {path: '/registracija', component: RegisterPage},
        {path: '/objekti/:title', name: 'sportsObject', component: SportsObjectPage},
        {path: '/profil', name: 'buyerProfile', component: BuyerProfilePage }
    ]
});

const app = new Vue({
	el: "#app", components: {
		HomePage
	}, router
});

export default app;