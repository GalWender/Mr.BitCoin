<template>
    <header class="app-header main-layout" v-if="loggedinUser">
        <h1 class="logo">Mr.BitCoin<span class="logo-span">.</span></h1>
        <nav class="nav-list">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/contact">Contacts</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/statistic">Statistics</RouterLink>
            <a v-if="loggedinUser" @click="onLogout()">Logout</a>
        </nav>
    </header>
</template>

<script>
export default {
    methods:{
        onLogout(){
            this.$store.dispatch({type:'logout'})
            this.$router.push('/')
        }
    },
    computed:{
        loggedinUser(){ return this.$store.getters.loggedinUser }
    }
}
</script>

