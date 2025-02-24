<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuPanel from './components/MenuPanel.vue'
import { provide, ref } from 'vue'

const darkMode = ref(true)

function updateTheme() {
  darkMode.value = !darkMode.value
}
provide('darkMode', {
  darkMode,
  updateTheme,
})
</script>

<template>
  <MenuPanel class="fixed right-10 left-0 z-10"></MenuPanel>
  <RouterView />
</template>
