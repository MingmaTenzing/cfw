<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, provide, reactive, ref, watch } from 'vue'
import type { map_view_search_query } from '../types'

// theme
const theme = ref('dark')

// default location to center the map
const center = ref({ lat: -31.953512, lng: 115.857048 })

// toggle for filter popup modal
const filter_modal_open_close = ref<boolean>(false)

// toggle for applying filter boolean
const is_apply_search_filter = ref<boolean>(false)

const show_side_bar = ref<boolean>(false)

function toggle_apply_filter() {
  is_apply_search_filter.value = !is_apply_search_filter.value
}

const alert_modal = ref<boolean>(false)

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
function toggle_side_bar() {
  show_side_bar.value = !show_side_bar.value
}

function close_alert_modal() {
  alert_modal.value = false
}

provide('toggle_side_bar', {
  show_side_bar,
  toggle_side_bar,
})

provide('toogle_apply_filter', {
  is_apply_search_filter,
  toggle_apply_filter,
})
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
  setTimeout(() => {
    window.alert(
      'The server might take upto a minute to respond at first. Please be patient. Thank You. Mingma',
    )
  }, 4000)
})
watch(theme, (update_theme, old_theme) => {
  document.documentElement.classList.remove(old_theme)
  document.documentElement.classList.add(update_theme)
})
</script>
<template>
  <RouterView />
</template>
