<script lang="ts" setup>
import GoogleMaps from '@/components/main_components/GoogleMaps.vue'
import SearchBar from '@/components/MapView_Components/components/SearchBar.vue'
import MenuPanel from '@/components/main_components/MenuPanel.vue'
</script>

<template>
  <MenuPanel id="blur_selector" class="fixed left-0 z-10"></MenuPanel>

  <SearchBar class="fixed z-10 bottom-10 left-1/2 -translate-x-1/2"></SearchBar>

  <GoogleMaps></GoogleMaps>
</template>
