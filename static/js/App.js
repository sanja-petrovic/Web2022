const NavBarLoggedIn = { template: '<nav-bar-logged-in></nav-bar-logged-in>' }
const NavBarLoggedOut = { template: '<nav-bar-logged-out></nav-bar-logged-out>' }
const LoginPage = { template: '<login-page></login-page>' }
const RegisterPage = { template: '<register-page></register-page>' }
const BuyerProfilePage = { template: '<buyer-profile-page></buyer-profile-page>' }
const CreateSportsObject = { template: '<create-sports-object></create-sports-object>' }
const SportsObjectPage = { template: '<sports-object-page></sports-object-page>' }
const UserList = { template: '<users></users>' }
const CreateTrainer = { template: '<create-trainer></create-trainer>' }
const CreateManager = { template: '<create-manager></create-manager>' }
const HomePage = { template: '<home-page></home-page>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: HomePage, name: 'home', alias: '/pocetna' },
        { path: '/prijava', component: LoginPage },
        { path: '/registracija', component: RegisterPage },
        { path: '/objekti/:title', name: 'sportsObject', component: SportsObjectPage },
        { path: '/profil', name: 'buyerProfile', component: BuyerProfilePage },
		{ path: '/dodaj-objekat', component: CreateSportsObject },
        { path: '/dodaj-trenera', component: CreateTrainer },
        { path: '/dodaj-menadzera', component: CreateManager },
        { path: '/korisnici', name: 'users', component: UserList }
    ]
});

const app = new Vue({
	el: "#app", components: {
		HomePage
	}, router
});

export default app;