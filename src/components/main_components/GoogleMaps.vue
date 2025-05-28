<script lang="ts" setup>
/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

import { computed, inject, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { themeContext } from '../../../utils/theme_type'
import type { map_props } from '../../../utils/map_props'
import { nightModeStyles, simple_grey_map } from '../../../utils/map_styles'
import type { FuelStation, latlng, queryFilterModalContext } from '../../../types'
import axios from 'axios'
import { CustomMarker, GoogleMap, MarkerCluster, Polyline } from 'vue3-google-map'
import { maps_polyline } from '@/stores/polyline'
import example from '../../../example'

const router = useRouter()
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const { center, update_center } = inject<map_props>('map_center', {
  center: { lat: -31.953512, lng: 115.857048 },
  update_center: () => undefined,
})

const polyline_store = maps_polyline()

const api_key = import.meta.env.VITE_API_KEY_MAPS

const loading_map = ref<boolean>(false)
const theme = ref(inject_theme)
const mapStyle = computed(() => (theme.value.theme == 'dark' ? nightModeStyles : simple_grey_map))

const locations = ref<FuelStation[]>([])

const { filter_modal_open_close } = inject<queryFilterModalContext>('search_filter_modal')!

const navigation_route = ref<google.maps.PolylineOptions>({
  path: [],
  geodesic: true,
  strokeColor: '#ff0000',
  strokeOpacity: 1.0,
  strokeWeight: 5,
})
onMounted(async () => {
  loading_map.value = true
  const response = await axios.get<FuelStation[]>('http://localhost:3000')
  locations.value = response.data
})

function route_to_station_details(site: FuelStation) {
  router.push(`/sites/${site.id}`)
}

function map_is_ready() {
  loading_map.value = false

  console.log('sdfd')
  console.log(`maps have loaded,  loading map value is ${loading_map.value} `)
}

function polyline_center_calculator(path: { lat: number; lng: number }[]) {
  let total_lat = 0
  let total_lang = 0
  path.forEach((value) => {
    total_lang += value.lng
    total_lat += value.lat
  })
  let avg_lat = Number((total_lat / path.length).toFixed(5))
  let avg_lng = Number((total_lang / path.length).toFixed(5))

  return { avg_lat, avg_lng }
}
watch(
  () => polyline_store.navigation_route,
  (new_route) => {
    navigation_route.value = new_route
    if (new_route.path) {
      let center_lat_lang = polyline_center_calculator(new_route.path)
      update_center(center_lat_lang.avg_lat, center_lat_lang.avg_lng)
    }
  },
)
</script>

<template>
  <div
    :class="[
      filter_modal_open_close
        ? 'w-full blur-xs brightness-90    h-[100vh] relative'
        : 'w-full h-[100vh] relative',
    ]"
  >
    <GoogleMap
      :api-key="api_key"
      :center="center"
      :zoom="15"
      @tilesloaded="map_is_ready"
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
            v-on:click="route_to_station_details(fuel_station)"
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
      <Polyline ref="polylineref" :options="navigation_route" />
    </GoogleMap>

    <!-- blurrrr -->
    <!-- <div class="absolute w-full h-full bg-background opacity-90 top-0 left-0"></div> -->
  </div>
</template>
