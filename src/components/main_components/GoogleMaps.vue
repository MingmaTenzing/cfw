<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { themeContext } from '../../../utils/theme_type'
import type { map_props } from '../../../utils/map_props'
import { nightModeStyles, simple_grey_map } from '../../../utils/map_styles'
import type { FuelStation } from '../../../types'
import axios from 'axios'
import { fuel_station_image_mapper } from '../../../utils/fuel_station_with_images'
import { CustomMarker, GoogleMap, MarkerCluster } from 'vue3-google-map'

const router = useRouter()
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const { center } = inject<map_props>('map_center', {
  center: { lat: -31.953512, lng: 115.857048 },
  update_center: () => undefined,
})

const api_key = import.meta.env.VITE_API_KEY

const theme = ref(inject_theme)
const mapStyle = computed(() => (theme.value.theme == 'dark' ? nightModeStyles : simple_grey_map))

const locations = ref<FuelStation[]>([])

onMounted(async () => {
  const response = await axios.get<FuelStation[]>(
    'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP',
  )
  const fuel_stations_with_image = fuel_station_image_mapper(response.data)
  locations.value = fuel_stations_with_image
})

function checkClick(site: FuelStation) {
  router.push(`/sites/${site.id}`)
}
</script>

<template>
  <div class="w-full h-[100vh]">
    <GoogleMap
      :api-key="api_key"
      :center="center"
      :zoom="15"
      :styles="mapStyle"
      style="width: 100%; height: 100%"
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
          <div
            v-on:click="checkClick(fuel_station)"
            class="w-[56px] rounded-lg bg-background group"
          >
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
  </div>
</template>
