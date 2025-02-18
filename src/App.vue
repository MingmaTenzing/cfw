<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuPanel from './components/MenuPanel.vue'
</script>

<template>
  <MenuPanel class="fixed right-10 left-0 z-10"></MenuPanel>
  <RouterView />
</template>
