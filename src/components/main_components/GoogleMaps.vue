<script lang="ts" setup>
/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { themeContext } from '../../../utils/theme_type'
import type { map_props } from '../../../utils/map_props'
import { nightModeStyles, simple_grey_map } from '../../../utils/map_styles'
import type { FuelStation, queryFilterModalContext } from '../../../types'
import axios from 'axios'
import { CustomMarker, GoogleMap, MarkerCluster, Polyline } from 'vue3-google-map'

const router = useRouter()
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const polylineref = ref<google.maps.Polyline>()

const { center } = inject<map_props>('map_center', {
  center: { lat: -31.953512, lng: 115.857048 },
  update_center: () => undefined,
})

const api_key = import.meta.env.VITE_API_KEY_MAPS

const loading_map = ref<boolean>(false)
const theme = ref(inject_theme)
const mapStyle = computed(() => (theme.value.theme == 'dark' ? nightModeStyles : simple_grey_map))

const locations = ref<FuelStation[]>([])

const { filter_modal_open_close } = inject<queryFilterModalContext>('search_filter_modal')!

// example
const flightPlanCoordinates = [
  {
    lat: -31.90033,
    lng: 115.9051,
  },
  {
    lat: -31.8998,
    lng: 115.90541,
  },
  {
    lat: -31.8991,
    lng: 115.90588,
  },
  {
    lat: -31.89882,
    lng: 115.90614,
  },
  {
    lat: -31.89813,
    lng: 115.90687,
  },
  {
    lat: -31.89768,
    lng: 115.90753,
  },
  {
    lat: -31.89751,
    lng: 115.9078,
  },
  {
    lat: -31.89732,
    lng: 115.90817,
  },
  {
    lat: -31.89709,
    lng: 115.9087,
  },
  {
    lat: -31.89683,
    lng: 115.90951,
  },
  {
    lat: -31.89663,
    lng: 115.91043,
  },
  {
    lat: -31.89652,
    lng: 115.91129,
  },
  {
    lat: -31.89644,
    lng: 115.91227,
  },
  {
    lat: -31.89645,
    lng: 115.91274,
  },
  {
    lat: -31.8967,
    lng: 115.91559,
  },
  {
    lat: -31.8967,
    lng: 115.91621,
  },
  {
    lat: -31.89666,
    lng: 115.91675,
  },
  {
    lat: -31.89665,
    lng: 115.91689,
  },
  {
    lat: -31.89697,
    lng: 115.91702,
  },
  {
    lat: -31.89812,
    lng: 115.91757,
  },
  {
    lat: -31.89842,
    lng: 115.91763,
  },
  {
    lat: -31.89865,
    lng: 115.91764,
  },
  {
    lat: -31.89876,
    lng: 115.91763,
  },
  {
    lat: -31.89936,
    lng: 115.91745,
  },
  {
    lat: -31.90071,
    lng: 115.91713,
  },
  {
    lat: -31.90194,
    lng: 115.91688,
  },
  {
    lat: -31.90246,
    lng: 115.91675,
  },
  {
    lat: -31.90301,
    lng: 115.91663,
  },
  {
    lat: -31.90388,
    lng: 115.91645,
  },
  {
    lat: -31.9041,
    lng: 115.91666,
  },
  {
    lat: -31.90425,
    lng: 115.91729,
  },
  {
    lat: -31.9044,
    lng: 115.91782,
  },
  {
    lat: -31.90454,
    lng: 115.9182,
  },
  {
    lat: -31.90558,
    lng: 115.92055,
  },
  {
    lat: -31.90574,
    lng: 115.92102,
  },
  {
    lat: -31.90593,
    lng: 115.92181,
  },
  {
    lat: -31.906,
    lng: 115.92243,
  },
  {
    lat: -31.906,
    lng: 115.92334,
  },
  {
    lat: -31.90598,
    lng: 115.92356,
  },
  {
    lat: -31.90616,
    lng: 115.92357,
  },
  {
    lat: -31.90639,
    lng: 115.92382,
  },
  {
    lat: -31.90662,
    lng: 115.92399,
  },
  {
    lat: -31.90686,
    lng: 115.92404,
  },
  {
    lat: -31.9078,
    lng: 115.92405,
  },
  {
    lat: -31.91007,
    lng: 115.92398,
  },
  {
    lat: -31.9107,
    lng: 115.9239,
  },
  {
    lat: -31.91097,
    lng: 115.92382,
  },
  {
    lat: -31.91135,
    lng: 115.92386,
  },
  {
    lat: -31.91243,
    lng: 115.92392,
  },
  {
    lat: -31.91421,
    lng: 115.92409,
  },
  {
    lat: -31.91458,
    lng: 115.92416,
  },
  {
    lat: -31.9159,
    lng: 115.92445,
  },
  {
    lat: -31.91693,
    lng: 115.92477,
  },
  {
    lat: -31.91751,
    lng: 115.92501,
  },
  {
    lat: -31.91809,
    lng: 115.92529,
  },
  {
    lat: -31.91842,
    lng: 115.92542,
  },
  {
    lat: -31.9196,
    lng: 115.92603,
  },
  {
    lat: -31.92016,
    lng: 115.92635,
  },
  {
    lat: -31.9205,
    lng: 115.92651,
  },
  {
    lat: -31.92095,
    lng: 115.9268,
  },
  {
    lat: -31.92121,
    lng: 115.92697,
  },
  {
    lat: -31.9224,
    lng: 115.9279,
  },
  {
    lat: -31.92274,
    lng: 115.92819,
  },
  {
    lat: -31.92379,
    lng: 115.92927,
  },
  {
    lat: -31.92447,
    lng: 115.93001,
  },
  {
    lat: -31.92482,
    lng: 115.93044,
  },
  {
    lat: -31.92586,
    lng: 115.9319,
  },
  {
    lat: -31.92659,
    lng: 115.93311,
  },
  {
    lat: -31.92702,
    lng: 115.93374,
  },
  {
    lat: -31.92743,
    lng: 115.93427,
  },
  {
    lat: -31.92796,
    lng: 115.9349,
  },
  {
    lat: -31.92961,
    lng: 115.93656,
  },
  {
    lat: -31.93039,
    lng: 115.93739,
  },
  {
    lat: -31.93055,
    lng: 115.93751,
  },
  {
    lat: -31.93119,
    lng: 115.9382,
  },
  {
    lat: -31.93164,
    lng: 115.93874,
  },
  {
    lat: -31.9322,
    lng: 115.93934,
  },
  {
    lat: -31.93318,
    lng: 115.9405,
  },
  {
    lat: -31.93441,
    lng: 115.94203,
  },
  {
    lat: -31.93578,
    lng: 115.94379,
  },
  {
    lat: -31.93692,
    lng: 115.9452,
  },
  {
    lat: -31.93731,
    lng: 115.94564,
  },
  {
    lat: -31.93793,
    lng: 115.94626,
  },
  {
    lat: -31.93854,
    lng: 115.9468,
  },
  {
    lat: -31.93897,
    lng: 115.94713,
  },
  {
    lat: -31.93985,
    lng: 115.94776,
  },
  {
    lat: -31.94181,
    lng: 115.94903,
  },
  {
    lat: -31.943,
    lng: 115.94983,
  },
  {
    lat: -31.94363,
    lng: 115.95029,
  },
  {
    lat: -31.94468,
    lng: 115.95112,
  },
  {
    lat: -31.94668,
    lng: 115.95281,
  },
  {
    lat: -31.94794,
    lng: 115.95388,
  },
  {
    lat: -31.94838,
    lng: 115.9542,
  },
  {
    lat: -31.94906,
    lng: 115.95459,
  },
  {
    lat: -31.94947,
    lng: 115.95478,
  },
  {
    lat: -31.95024,
    lng: 115.95507,
  },
  {
    lat: -31.95093,
    lng: 115.95526,
  },
  {
    lat: -31.95136,
    lng: 115.95534,
  },
  {
    lat: -31.9518,
    lng: 115.95537,
  },
  {
    lat: -31.95263,
    lng: 115.95537,
  },
  {
    lat: -31.95292,
    lng: 115.95535,
  },
  {
    lat: -31.95351,
    lng: 115.95525,
  },
  {
    lat: -31.95561,
    lng: 115.95466,
  },
  {
    lat: -31.95671,
    lng: 115.95434,
  },
  {
    lat: -31.9568,
    lng: 115.9544,
  },
  {
    lat: -31.95753,
    lng: 115.95421,
  },
  {
    lat: -31.95919,
    lng: 115.95385,
  },
  {
    lat: -31.95961,
    lng: 115.95381,
  },
  {
    lat: -31.95983,
    lng: 115.95381,
  },
  {
    lat: -31.95993,
    lng: 115.95386,
  },
  {
    lat: -31.96023,
    lng: 115.95388,
  },
  {
    lat: -31.96051,
    lng: 115.95394,
  },
  {
    lat: -31.96101,
    lng: 115.95416,
  },
  {
    lat: -31.96147,
    lng: 115.9545,
  },
  {
    lat: -31.96277,
    lng: 115.95553,
  },
  {
    lat: -31.9631,
    lng: 115.95578,
  },
  {
    lat: -31.96339,
    lng: 115.95596,
  },
  {
    lat: -31.9638,
    lng: 115.95617,
  },
  {
    lat: -31.96436,
    lng: 115.95632,
  },
  {
    lat: -31.96461,
    lng: 115.95634,
  },
  {
    lat: -31.96505,
    lng: 115.95633,
  },
  {
    lat: -31.96529,
    lng: 115.95628,
  },
  {
    lat: -31.9656,
    lng: 115.9562,
  },
  {
    lat: -31.96587,
    lng: 115.95609,
  },
  {
    lat: -31.96638,
    lng: 115.95579,
  },
  {
    lat: -31.96678,
    lng: 115.95546,
  },
  {
    lat: -31.96915,
    lng: 115.95279,
  },
  {
    lat: -31.96979,
    lng: 115.95219,
  },
  {
    lat: -31.97062,
    lng: 115.95156,
  },
  {
    lat: -31.97262,
    lng: 115.95019,
  },
  {
    lat: -31.97337,
    lng: 115.94961,
  },
  {
    lat: -31.97422,
    lng: 115.94883,
  },
  {
    lat: -31.97808,
    lng: 115.94478,
  },
  {
    lat: -31.97875,
    lng: 115.94399,
  },
  {
    lat: -31.97952,
    lng: 115.94296,
  },
  {
    lat: -31.98001,
    lng: 115.94224,
  },
  {
    lat: -31.98155,
    lng: 115.93977,
  },
  {
    lat: -31.98234,
    lng: 115.93861,
  },
  {
    lat: -31.98294,
    lng: 115.93785,
  },
  {
    lat: -31.98413,
    lng: 115.93642,
  },
  {
    lat: -31.98519,
    lng: 115.93519,
  },
  {
    lat: -31.98669,
    lng: 115.93339,
  },
  {
    lat: -31.9872,
    lng: 115.93278,
  },
  {
    lat: -31.98904,
    lng: 115.93075,
  },
  {
    lat: -31.9894,
    lng: 115.9304,
  },
  {
    lat: -31.98988,
    lng: 115.93006,
  },
  {
    lat: -31.99053,
    lng: 115.92975,
  },
  {
    lat: -31.99065,
    lng: 115.9298,
  },
  {
    lat: -31.99094,
    lng: 115.92974,
  },
  {
    lat: -31.99155,
    lng: 115.92974,
  },
  {
    lat: -31.9924,
    lng: 115.92985,
  },
  {
    lat: -31.99298,
    lng: 115.93,
  },
  {
    lat: -31.99317,
    lng: 115.93003,
  },
  {
    lat: -31.99369,
    lng: 115.92997,
  },
  {
    lat: -31.99414,
    lng: 115.92983,
  },
  {
    lat: -31.99423,
    lng: 115.92991,
  },
  {
    lat: -31.99436,
    lng: 115.92992,
  },
  {
    lat: -31.99451,
    lng: 115.92985,
  },
  {
    lat: -31.99458,
    lng: 115.92968,
  },
  {
    lat: -31.99459,
    lng: 115.9295,
  },
  {
    lat: -31.99455,
    lng: 115.92931,
  },
  {
    lat: -31.99446,
    lng: 115.92914,
  },
  {
    lat: -31.99438,
    lng: 115.92909,
  },
  {
    lat: -31.99431,
    lng: 115.92888,
  },
  {
    lat: -31.99429,
    lng: 115.92856,
  },
  {
    lat: -31.99429,
    lng: 115.92745,
  },
  {
    lat: -31.99426,
    lng: 115.92712,
  },
  {
    lat: -31.99414,
    lng: 115.92287,
  },
  {
    lat: -31.99406,
    lng: 115.92075,
  },
  {
    lat: -31.994,
    lng: 115.92051,
  },
  {
    lat: -31.994,
    lng: 115.91952,
  },
  {
    lat: -31.99392,
    lng: 115.91703,
  },
  {
    lat: -31.9939,
    lng: 115.91566,
  },
  {
    lat: -31.99383,
    lng: 115.91354,
  },
  {
    lat: -31.99386,
    lng: 115.91341,
  },
  {
    lat: -31.99384,
    lng: 115.91305,
  },
  {
    lat: -31.99383,
    lng: 115.91293,
  },
  {
    lat: -31.99369,
    lng: 115.91294,
  },
  {
    lat: -31.99326,
    lng: 115.913,
  },
  {
    lat: -31.99299,
    lng: 115.91301,
  },
  {
    lat: -31.99281,
    lng: 115.91298,
  },
  {
    lat: -31.99262,
    lng: 115.91289,
  },
  {
    lat: -31.99206,
    lng: 115.91255,
  },
  {
    lat: -31.99198,
    lng: 115.91247,
  },
  {
    lat: -31.99139,
    lng: 115.9121,
  },
  {
    lat: -31.99116,
    lng: 115.91194,
  },
  {
    lat: -31.99048,
    lng: 115.9115,
  },
  {
    lat: -31.98932,
    lng: 115.9107,
  },
  {
    lat: -31.98864,
    lng: 115.91028,
  },
  {
    lat: -31.98536,
    lng: 115.90811,
  },
  {
    lat: -31.98499,
    lng: 115.90789,
  },
  {
    lat: -31.98468,
    lng: 115.90765,
  },
  {
    lat: -31.98281,
    lng: 115.90641,
  },
  {
    lat: -31.98251,
    lng: 115.90623,
  },
  {
    lat: -31.9828,
    lng: 115.90588,
  },
  {
    lat: -31.98288,
    lng: 115.90575,
  },
  {
    lat: -31.98344,
    lng: 115.90461,
  },
  {
    lat: -31.9841,
    lng: 115.90322,
  },
  {
    lat: -31.98425,
    lng: 115.9029,
  },
  {
    lat: -31.98554,
    lng: 115.90371,
  },
  {
    lat: -31.98664,
    lng: 115.90445,
  },
]
const secondary_cord = [
  {
    lat: -31.945612,
    lng: 115.852438,
  },
  {
    lat: -31.945494,
    lng: 115.839719,
  },
  {
    lat: -31.952307,
    lng: 115.83115,
  },
]

const flightPath = ref<google.maps.PolylineOptions>({
  path: flightPlanCoordinates,
  geodesic: true,
  strokeColor: '#ff0000',
  strokeOpacity: 1.0,
  strokeWeight: 5,
})
const main_cords = ref(flightPath)

const second_flightPath = ref<google.maps.PolylineOptions>({
  path: secondary_cord,
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
  main_cords.value = second_flightPath.value
}

function map_is_ready() {
  loading_map.value = false
  console.log('sdfd')
  console.log(`maps have loaded,  loading map value is ${loading_map.value} `)
}

function addLine() {}
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
      <Polyline ref="polylineref" :options="main_cords" />
    </GoogleMap>

    <!-- blurrrr -->
    <!-- <div class="absolute w-full h-full bg-background opacity-90 top-0 left-0"></div> -->
  </div>
</template>
