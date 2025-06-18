<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { provide, ref, watch } from 'vue'
import MenuPanel from '@/components/main_components/MenuPanel.vue'
import SearchBar from '@/components/MapOverview/components/SearchBar.vue'
import GoogleMaps from '@/components/main_components/GoogleMaps.vue'

const route = useRoute()
const show_search_bar = ref<boolean>(true)

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute == 'Site Details' || newRoute == 'Get Directions') {
      show_search_bar.value = false
    } else show_search_bar.value = true
  },
)
</script>

<template>
  <MenuPanel id="blur_selector" class="fixed left-0 z-10"></MenuPanel>

  <SearchBar
    v-if="show_search_bar == true"
    class="fixed z-10 bottom-0 md:bottom-8 left-1/2 -translate-x-1/2"
  ></SearchBar>

  <GoogleMaps></GoogleMaps>
</template>
