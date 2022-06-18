

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: HomePage, alias: '/home'},
        {path: '/prijava', component: LoginPage},
        {path: '/registracija', component: RegisterPage},
        {path: '/objekti/:title', name: 'sportsObject', component: SportsObjectPage},
        {path: '/profil', name: 'userProfile', component: UserProfilePage }
    ]
});

export default router;