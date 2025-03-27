<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, provide, ref, watch } from 'vue'

// theme
const theme = ref('dark')

// default location to center the map
const center = ref({ lat: -31.953512, lng: 115.857048 })

// toggle for filter popup modal
const filter_modal_open_close = ref<boolean>(false)

function changeTheme() {
  if (theme.value == 'dark') {
    theme.value = 'light'
  } else {
    theme.value = 'dark'
  }
}

function toggle_modal() {
  filter_modal_open_close.value = !filter_modal_open_close.value
}

function update_center(lat: number, lng: number) {
  center.value = { lat: lat, lng: lng }
}

// provides
provide('theme', {
  theme,
  changeTheme,
})

provide('map_center', {
  center,
  update_center,
})

provide('search_filter_modal', {
  filter_modal_open_close,
  toggle_modal,
})

onMounted(() => {
  document.documentElement.classList.add(theme.value)
})
watch(theme, (update_theme, old_theme) => {
  document.documentElement.classList.remove(old_theme)
  document.documentElement.classList.add(update_theme)
})
</script>
<template>
  <RouterView />
</template>
