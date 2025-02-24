<script lang="ts" setup>
import { CustomMarker, GoogleMap, MarkerCluster } from 'vue3-google-map'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { fuel_detail_item } from '../../types'
import { fuel_data_parser } from '../../utils/fuel_data_parser'
// let maps = google.maps.event.addListener

const center = { lat: -31.953512, lng: 115.857048 }

const nightModeStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
]

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

// function bounds_changed(event: google.maps.LatLngBounds) {
//   console.log(event.contains)
// }
</script>

<template>
  <GoogleMap
    api-key="AIzaSyAdIUHime3Nw1U6ZaBtw_QtrbmV5Es_A1Y"
    :center="center"
    :zoom="15"
    :styles="nightModeStyles"
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
