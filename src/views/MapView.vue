<script lang="ts" setup>
import { CustomMarker, GoogleMap, MarkerCluster } from 'vue3-google-map'
import { computed, inject, onMounted, ref } from 'vue'
import axios from 'axios'
import type { fuel_detail_item } from '../../types'
import { fuel_data_parser } from '../../utils/fuel_data_parser'
import { nightModeStyles } from '../../utils/map_styles'
import type { themeContext } from '../../utils/theme_type'

const center = { lat: -31.953512, lng: 115.857048 }
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const api_key = import.meta.env.VITE_API_KEY

const theme = ref(inject_theme)
const mapStyle = computed(() => (theme.value.theme == 'dark' ? nightModeStyles : []))

const locations = ref<fuel_detail_item[]>([])

onMounted(async () => {
  const response = await axios.get('fuelwatch/fuelWatchRSS')
  const xmlText = await response.data
  locations.value = fuel_data_parser(xmlText)
})

function checkClick(event: google.maps.MapMouseEvent) {
  if (event.latLng) {
    const lat = event.latLng!.lat()
    const lng = event.latLng!.lng()
    console.log(lat, lng)
    console.log('working')
  }
}
</script>

<template>
  <GoogleMap
    :api-key="api_key"
    :center="center"
    :zoom="15"
    :styles="mapStyle"
    style="width: 100%; height: 100vh"
    @click="checkClick"
  >
    <MarkerCluster>
      <CustomMarker
        :options="{ position: { lat: fuel_station.latitude, lng: fuel_station.longitude } }"
        v-for="(fuel_station, i) in locations"
        v-bind:key="i"
      >
        <div class="w-[56px] rounded-lg bg-zinc-50 group">
          <div
            class="bg-zinc-500 group-hover:bg-red-500 text-white rounded-t-lg flex justify-center items-center px-2 py-1"
          >
            <p class="font-semibold">{{ fuel_station.price }}</p>
          </div>
          <div class="flex justify-center p-1">
            <img :src="fuel_station.brand_image" width="30" />
          </div>
        </div>
      </CustomMarker>
    </MarkerCluster>
  </GoogleMap>
</template>
