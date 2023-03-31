<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import LeftPanel from './components/LeftPanel.vue';
import HeaderBar from './components/HeaderBar.vue';
</script>

<template>
  <NavBar />
  <LeftPanel />
  <HeaderBar />
  <RouterView />
</template>

<style scoped>
</style>
