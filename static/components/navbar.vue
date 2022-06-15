<template>
    <div class="navbar">
        <nav>
            <ul>
                <li v-bind:class="{ active: isActive('login') }">
                    <router-link to="/login">Log in</router-link>
                </li>
                <li v-bind:class="{ active: isActive('signup') }">
                    <a href="/register">Sign up</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data () {
        return {
            path: window.location.pathname
        }
    },
    methods: {
        isActive (page) {
            return this.currentPage === page
        }
    },
    computed: {
        currentPage () {
            if (this.path.length === 1) return ''
            const endIndex = this.path.indexOf('/', 1)
            return (endIndex === -1)
                ? this.path.substring(1)
                : this.path.substring(1, endIndex)
        }
    }
}
</script>