<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <AppHeader/>
  <main>
    <RouterView />
  </main>
</template>

<style>

</style>
