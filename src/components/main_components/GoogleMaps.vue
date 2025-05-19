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
import { maps_polyline } from '@/stores/polyline'

const router = useRouter()
const inject_theme = inject<themeContext>('theme', {
  theme: 'dark',
  changeTheme: () => undefined,
})

const { center } = inject<map_props>('map_center', {
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


const cords_example = [
    {
        "lat": -31.98664,
        "lng": 115.90445
    },
    {
        "lat": -31.98757,
        "lng": 115.90507
    },
    {
        "lat": -31.98788,
        "lng": 115.90524
    },
    {
        "lat": -31.988,
        "lng": 115.90527
    },
    {
        "lat": -31.98843,
        "lng": 115.90557
    },
    {
        "lat": -31.98862,
        "lng": 115.90573
    },
    {
        "lat": -31.98906,
        "lng": 115.90625
    },
    {
        "lat": -31.99013,
        "lng": 115.9077
    },
    {
        "lat": -31.99071,
        "lng": 115.90853
    },
    {
        "lat": -31.99152,
        "lng": 115.90965
    },
    {
        "lat": -31.99203,
        "lng": 115.91037
    },
    {
        "lat": -31.99263,
        "lng": 115.91118
    },
    {
        "lat": -31.99305,
        "lng": 115.91176
    },
    {
        "lat": -31.99308,
        "lng": 115.91184
    },
    {
        "lat": -31.99362,
        "lng": 115.91257
    },
    {
        "lat": -31.99372,
        "lng": 115.9128
    },
    {
        "lat": -31.99374,
        "lng": 115.91293
    },
    {
        "lat": -31.9938,
        "lng": 115.91343
    },
    {
        "lat": -31.99383,
        "lng": 115.91354
    },
    {
        "lat": -31.9939,
        "lng": 115.91588
    },
    {
        "lat": -31.99394,
        "lng": 115.91755
    },
    {
        "lat": -31.99401,
        "lng": 115.91975
    },
    {
        "lat": -31.994,
        "lng": 115.92051
    },
    {
        "lat": -31.99397,
        "lng": 115.92069
    },
    {
        "lat": -31.99404,
        "lng": 115.92347
    },
    {
        "lat": -31.9941,
        "lng": 115.92553
    },
    {
        "lat": -31.99417,
        "lng": 115.92713
    },
    {
        "lat": -31.99419,
        "lng": 115.92887
    },
    {
        "lat": -31.99416,
        "lng": 115.92911
    },
    {
        "lat": -31.99409,
        "lng": 115.92917
    },
    {
        "lat": -31.99392,
        "lng": 115.92927
    },
    {
        "lat": -31.99379,
        "lng": 115.9293
    },
    {
        "lat": -31.99358,
        "lng": 115.92931
    },
    {
        "lat": -31.99172,
        "lng": 115.92928
    },
    {
        "lat": -31.99108,
        "lng": 115.92936
    },
    {
        "lat": -31.99082,
        "lng": 115.92943
    },
    {
        "lat": -31.99078,
        "lng": 115.92948
    },
    {
        "lat": -31.99048,
        "lng": 115.92956
    },
    {
        "lat": -31.98996,
        "lng": 115.92979
    },
    {
        "lat": -31.98958,
        "lng": 115.93003
    },
    {
        "lat": -31.98923,
        "lng": 115.93032
    },
    {
        "lat": -31.98886,
        "lng": 115.93069
    },
    {
        "lat": -31.98864,
        "lng": 115.93096
    },
    {
        "lat": -31.98744,
        "lng": 115.93234
    },
    {
        "lat": -31.98659,
        "lng": 115.93333
    },
    {
        "lat": -31.9858,
        "lng": 115.93433
    },
    {
        "lat": -31.98306,
        "lng": 115.93749
    },
    {
        "lat": -31.98264,
        "lng": 115.93799
    },
    {
        "lat": -31.98189,
        "lng": 115.939
    },
    {
        "lat": -31.98152,
        "lng": 115.93958
    },
    {
        "lat": -31.98109,
        "lng": 115.94029
    },
    {
        "lat": -31.98019,
        "lng": 115.94174
    },
    {
        "lat": -31.97956,
        "lng": 115.94268
    },
    {
        "lat": -31.97891,
        "lng": 115.94357
    },
    {
        "lat": -31.97854,
        "lng": 115.94403
    },
    {
        "lat": -31.97802,
        "lng": 115.94464
    },
    {
        "lat": -31.97617,
        "lng": 115.94658
    },
    {
        "lat": -31.97426,
        "lng": 115.94858
    },
    {
        "lat": -31.97337,
        "lng": 115.94944
    },
    {
        "lat": -31.97266,
        "lng": 115.95
    },
    {
        "lat": -31.97053,
        "lng": 115.95145
    },
    {
        "lat": -31.97008,
        "lng": 115.95173
    },
    {
        "lat": -31.96952,
        "lng": 115.95213
    },
    {
        "lat": -31.96905,
        "lng": 115.95244
    },
    {
        "lat": -31.96881,
        "lng": 115.95258
    },
    {
        "lat": -31.96838,
        "lng": 115.95276
    },
    {
        "lat": -31.96792,
        "lng": 115.95289
    },
    {
        "lat": -31.96551,
        "lng": 115.95292
    },
    {
        "lat": -31.96125,
        "lng": 115.95295
    },
    {
        "lat": -31.96064,
        "lng": 115.95298
    },
    {
        "lat": -31.96029,
        "lng": 115.95302
    },
    {
        "lat": -31.95959,
        "lng": 115.95317
    },
    {
        "lat": -31.95889,
        "lng": 115.95337
    },
    {
        "lat": -31.95884,
        "lng": 115.95347
    },
    {
        "lat": -31.95641,
        "lng": 115.95414
    },
    {
        "lat": -31.95399,
        "lng": 115.95487
    },
    {
        "lat": -31.95321,
        "lng": 115.95504
    },
    {
        "lat": -31.95275,
        "lng": 115.95508
    },
    {
        "lat": -31.95234,
        "lng": 115.95511
    },
    {
        "lat": -31.95169,
        "lng": 115.95506
    },
    {
        "lat": -31.95134,
        "lng": 115.95502
    },
    {
        "lat": -31.95068,
        "lng": 115.95488
    },
    {
        "lat": -31.95035,
        "lng": 115.9548
    },
    {
        "lat": -31.94983,
        "lng": 115.9546
    },
    {
        "lat": -31.94945,
        "lng": 115.95446
    },
    {
        "lat": -31.94874,
        "lng": 115.95408
    },
    {
        "lat": -31.94817,
        "lng": 115.95371
    },
    {
        "lat": -31.94773,
        "lng": 115.95336
    },
    {
        "lat": -31.94689,
        "lng": 115.95265
    },
    {
        "lat": -31.9464,
        "lng": 115.95219
    },
    {
        "lat": -31.94472,
        "lng": 115.95081
    },
    {
        "lat": -31.94365,
        "lng": 115.94998
    },
    {
        "lat": -31.94282,
        "lng": 115.94937
    },
    {
        "lat": -31.9412,
        "lng": 115.9483
    },
    {
        "lat": -31.93917,
        "lng": 115.947
    },
    {
        "lat": -31.93865,
        "lng": 115.94658
    },
    {
        "lat": -31.93807,
        "lng": 115.94608
    },
    {
        "lat": -31.93737,
        "lng": 115.94538
    },
    {
        "lat": -31.93726,
        "lng": 115.94525
    },
    {
        "lat": -31.9372,
        "lng": 115.94509
    },
    {
        "lat": -31.93677,
        "lng": 115.94452
    },
    {
        "lat": -31.93585,
        "lng": 115.94325
    },
    {
        "lat": -31.93503,
        "lng": 115.94209
    },
    {
        "lat": -31.9347,
        "lng": 115.9416
    },
    {
        "lat": -31.93453,
        "lng": 115.94118
    },
    {
        "lat": -31.93447,
        "lng": 115.94084
    },
    {
        "lat": -31.93451,
        "lng": 115.93997
    },
    {
        "lat": -31.93447,
        "lng": 115.9397
    },
    {
        "lat": -31.93443,
        "lng": 115.93958
    },
    {
        "lat": -31.93432,
        "lng": 115.9394
    },
    {
        "lat": -31.93423,
        "lng": 115.93932
    },
    {
        "lat": -31.93395,
        "lng": 115.93918
    },
    {
        "lat": -31.9338,
        "lng": 115.93914
    },
    {
        "lat": -31.93373,
        "lng": 115.93916
    },
    {
        "lat": -31.93357,
        "lng": 115.93914
    },
    {
        "lat": -31.93345,
        "lng": 115.93932
    },
    {
        "lat": -31.93276,
        "lng": 115.94026
    },
    {
        "lat": -31.93201,
        "lng": 115.94145
    },
    {
        "lat": -31.93171,
        "lng": 115.94206
    },
    {
        "lat": -31.93156,
        "lng": 115.94241
    },
    {
        "lat": -31.93104,
        "lng": 115.94338
    },
    {
        "lat": -31.93099,
        "lng": 115.94354
    },
    {
        "lat": -31.93045,
        "lng": 115.94435
    },
    {
        "lat": -31.92976,
        "lng": 115.94529
    },
    {
        "lat": -31.92958,
        "lng": 115.94543
    },
    {
        "lat": -31.92889,
        "lng": 115.94638
    },
    {
        "lat": -31.92851,
        "lng": 115.94709
    },
    {
        "lat": -31.92803,
        "lng": 115.94816
    },
    {
        "lat": -31.92764,
        "lng": 115.94893
    },
    {
        "lat": -31.927,
        "lng": 115.94999
    },
    {
        "lat": -31.92636,
        "lng": 115.95102
    },
    {
        "lat": -31.92584,
        "lng": 115.95172
    },
    {
        "lat": -31.92549,
        "lng": 115.95216
    }
]


const navigation_route = ref<google.maps.PolylineOptions>({
  path: cords_example,
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
      <Polyline ref="polylineref" :options="navigation_route" />
    </GoogleMap>

    <!-- blurrrr -->
    <!-- <div class="absolute w-full h-full bg-background opacity-90 top-0 left-0"></div> -->
  </div>
</template>
