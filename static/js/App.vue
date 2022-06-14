<template>
</template>

<script>
import LoginPage from "../components/login.vue"
const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage}
    ]
});
export default {
    name: "App"
}
</script>

<style scoped>

</style>