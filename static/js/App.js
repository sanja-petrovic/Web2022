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
const CreateContent = { template: '<create-content></create-content>'}
const ManagerContents = { template: '<manager-contents></manager-contents>'}
const ManagerTrainings = { template: '<manager-trainings></manager-trainings>'}
const TrainerTrainings =  { template: '<trainer-trainings></trainer-trainings>'}
const HomePage = { template: '<home-page></home-page>' }
const Memberships = { template: '<memberships></memberships>' }
const MembershipBuyer = { template: '<membership-buyer></membership-buyer>'}
const PromoCode = { template: '<promocode></promocode>' }
const MembershipsAdmin = { template: '<memberships-admin></memberships-admin>' }
const TrainingsAdmin = { template: '<trainings-admin></trainings-admin>' }
const ContentsAdmin = { template: '<contents-admin></contents-admin>'}
const UnauthorizedAccess = { template: '<unauthorized-access></unauthorized-access>'}


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
        { path: '/dodaj-sadrzaj', component: CreateContent },
        { path: '/sadrzaji', component: ManagerContents },
        { path: '/treninzi-menadzer', component: ManagerTrainings },
        { path: '/treninzi-trener', component: TrainerTrainings },
        { path: '/dodaj-menadzera', component: CreateManager },
        { path: '/korisnici', name: 'users', component: UserList },
        { path: '/clanarine', component: Memberships },
        { path: '/clanarina-kupac', component: MembershipBuyer },
        { path: '/dodaj-promokod', component: PromoCode },
        { path: '/obrisi-clanarinu', component: MembershipsAdmin },
        { path: '/obrisi-trening', component: TrainingsAdmin },
        { path: '/obrisi-sadrzaj', component: ContentsAdmin }
        
      
    ]
});

const app = new Vue({
	el: "#app", components: {
		HomePage
	}, router
});

export default app;