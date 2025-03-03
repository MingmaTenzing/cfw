<script lang="ts" setup>
import { CustomMarker, GoogleMap, MarkerCluster } from 'vue3-google-map'
import { computed, inject, onMounted, ref } from 'vue'
import axios from 'axios'
import type { FuelStation } from '../../types'
import { nightModeStyles, simple_grey_map } from '../../utils/map_styles'
import type { themeContext } from '../../utils/theme_type'
import MenuPanel from '@/components/main_components/MenuPanel.vue'
import { fuel_station_image_mapper } from '../../utils/fuel_station_with_images'

const center = { lat: -31.953512, lng: 115.857048 }
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const api_key = import.meta.env.VITE_API_KEY

const theme = ref(inject_theme)
const mapStyle = computed(() => (theme.value.theme == 'dark' ? nightModeStyles : simple_grey_map))

const locations = ref<FuelStation[]>([])

onMounted(async () => {
  const response = await axios.get<FuelStation[]>('/fuelwatch/sites')
  const fuel_stations_with_image = fuel_station_image_mapper(response.data)
  locations.value = fuel_stations_with_image
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
  <MenuPanel class="fixed left-0 z-10"></MenuPanel>

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
        :options="{
          position: {
            lat: fuel_station.address.latitude,
            lng: fuel_station.address.longitude,
          },
        }"
        v-for="(fuel_station, i) in locations"
        v-bind:key="i"
      >
        <div class="w-[56px] rounded-lg bg-background group">
          <div
            class="bg-zinc-500 group-hover:bg-red-500 text-white rounded-t-lg flex justify-center items-center px-2 py-1"
          >
            <p class="font-semibold">{{ fuel_station.product.priceToday }}</p>
          </div>
          <div
            v-if="fuel_station.product.priceTomorrow > 0"
            class="bg-secondary text-muted-foreground flex justify-center items-center px-2 py-1"
          >
            <p class="font-semibold">{{ fuel_station.product?.priceTomorrow || 0 }}</p>
          </div>
          <div class="flex justify-center p-1">
            <img :src="fuel_station.brand_image" width="30" />
          </div>
        </div>
      </CustomMarker>
    </MarkerCluster>
  </GoogleMap>
</template>
