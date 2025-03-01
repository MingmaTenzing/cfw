<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, provide, ref, watch } from 'vue'

const theme = ref('dark')

function changeTheme() {
  if (theme.value == 'dark') {
    theme.value = 'light'
  } else {
    theme.value = 'dark'
  }
}

provide('theme', {
  theme,
  changeTheme,
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
