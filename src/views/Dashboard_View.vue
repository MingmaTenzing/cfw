<script setup lang="ts">
import SideBar from '@/components/main_components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="flex">
    <SideBar> </SideBar>
    <RouterView></RouterView>
  </main>
</template>
