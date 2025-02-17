<script lang="ts" setup>
import { GoogleMap, Marker } from 'vue3-google-map'
// let maps = google.maps.event.addListener

const center = { lat: -31.953512, lng: 115.857048 }
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
    api-key="AIzaSyAdIUHime3Nw1U6ZaBtw_QtrbmV5Es_A1Y"
    :center="center"
    :zoom="15"
    style="width: 100%; height: 100vh"
    @click="checkClick"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>
