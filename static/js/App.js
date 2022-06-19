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
			isOpen: false,
			searchParam: {
				searchName: "",
				searchLocation: "",
				searchGrade: "",
				searchType: ""
			}
		}
	}, template: `
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
						<option selected disabled hidden>Tip objekta</option>
                    	<optgroup label="Tip objekta">
	                        <option>Teretana</option>
	                        <option>Fitnes centar</option>
	                        <option>Teniski centar</option>
	                    	<option>Plesni studio</option>
	                    	<option>Joga studio</option>
	                    	<option>Zatvoreni bazeni</option>
	                    </optgroup>
                    </select>
                    <input type="text" class="form-control" placeholder="Lokacija objekta" v-model="searchParam.searchLocation">
                    <input type="text" class="form-control" placeholder="Naziv objekta" v-model="searchParam.searchName">
                    <select class="form-select" style="max-width: 20em" v-model = "searchParam.searchGrade">
						<option selected disabled hidden>Prosečna ocena</option>
						<optgroup label="Prosečna ocena">
							<option>4.1 – 5.0</option>
	                        <option>3.1 – 4.0</option>
	                        <option>2.1 – 3.0</option>
	                        <option>1.0 – 2.0</option>
	                        <option>Neocenjeni</option>
                        </optgroup>
                    </select>
                    <div class="search-button" type="button" v-on:click="search">
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
                                    <input class="form-check-input" type="checkbox">Fitnes centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Teniski centar
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Plesni studio
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Joga studio
                                </label>
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox">Zatvoreni bazeni
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
                <ul class="cards" style="width: 100vw;">
                 	<li v-for="item in this.sportsObjects">
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
					                        style="margin-right: 0.4em; color: #9BE3C3"></i><span class="d-inline-block">{{
					                        item.location.address.street }} {{ item.location.address.number }}, {{
					                        item.location.address.city }} {{item.location.address.postcode }}</span></span><br>
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
		axios.get('rest/sportsobjects')
			.then(response => {

				this.sportsObjects = response.data;
				console.log(response.data);
			})
			.catch(error => console.log(error));
	},
	methods:
	{
		openCheck: function(status) {
			if (status == 'WORKING')
				return true;
			else
				return false;
		},
		search: function() {
			if (this.searchParam.searchType !== '') {
				axios.get('rest/getSportsObjectByType', {
					params: {
						type: this.searchParam.searchType
					}
				})
				.then(response => {
					this.sportsObjects = response.data;
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
					this.sportsObjects = response.data;
					console.log(this.sportsObjects);
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
					console.log(this.searchParam.searchLocation);
					this.sportsObjects = response.data;
					console.log(this.sportsObjects);
				})
				.catch(error => console.log(error));
			}
			else if(this.searchParam.searchGrade !== '') {

				if (this.searchParam.searchGrade === 'Neocenjeni') {
					axios.get('rest/getSportsObjectByRatingInterval', {
						params: {
							minRating: '0.0',
							maxRating: '0.0',
						}
					})
					.then(response => {

						this.sportsObjects = response.data;

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

						this.sportsObjects = response.data;

					})
					.catch(error => console.log(error));
				}
			}
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