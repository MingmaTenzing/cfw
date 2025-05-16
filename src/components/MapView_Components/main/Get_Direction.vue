<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import polyline from 'google-polyline'
import data from '../../../../example.json'
import { maps_polyline } from '@/stores/polyline'
const router = useRouter()
const route = useRoute()

const polyline_store = maps_polyline()

const api_response = data.routes
console.log(api_response)

const navigation_steps = api_response[0].legs[0].steps
console.log(navigation_steps)
const starting_position = '111 Broun Avenue'

const polyline_encoded = api_response[0].polyline.encodedPolyline
console.log(polyline_encoded)

const decoded_polyline = polyline.decode(polyline_encoded)
console.log(decoded_polyline)

const lat_lng_poly = decoded_polyline.map((data) => ({
  lat: data[0],
  lng: data[1],
}))

console.log(lat_lng_poly)

const site_address = route.params.address

function get_user_geo_location() {
  console.log('geo')
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('dddd')
      console.log(position.coords.latitude, position.coords.longitude)
    },
    // (error) => {
    //   window.alert(error.TIMEOUT)
    // },
  )
}
</script>

<template>
  <main class="">
    <!-- directions header -->
    <div class="p-4 border-b border-border flex justify-between">
      <p class="font-medium">Directions</p>
      <i class="pi pi-times"></i>
    </div>

    <form @submit.prevent="" class="space-y-4 p-4">
      <!-- directions from -->
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="space-y-2">
          <p class="text-primary/70">From</p>
          <input
            type="text"
            placeholder="Enter Address"
            class="outline-none border border-border w-[300px] p-2 rounded-lg"
          />
          <p>or</p>
          <div class="">
            <button
              v-on:click="get_user_geo_location"
              class="font-semibold cursor-pointer w-full border border-border p-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-accent transition-all ease-linear"
            >
              Use your Location
            </button>
          </div>
        </div>
      </div>
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="">
          <p class="text-primary/70">To</p>
          <p class="font-semibold">{{ site_address }}</p>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="font-semibold cursor-pointer w-full border border-border p-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-accent transition-all ease-linear"
        >
          Get Directions <i class="pi pi-directions"></i>
        </button>
      </div>
    </form>

    <div class="border border-border p-4">
      <!-- distance and duration details -->
      <div class="flex justify-between">
        <div class="space-y-2">
          <p class="text-primary/70">Distance</p>
          <div class="flex items-center space-x-2">
            <i class="pi pi-map"></i>
            <p class="font-semibold">12.5 km</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-primary/70">Duration</p>
          <div class="flex items-center space-x-2">
            <i class="pi pi-clock"></i>
            <p class="font-semibold">18mins</p>
          </div>
        </div>
      </div>
    </div>

    <!-- steps -->
    <div class="p-4 space-y-6 overflow-y-scroll md:h-[500px] lg:h-[400px] scrollbar-hide">
      <div class="flex relative space-x-4" v-for="(step, index) in navigation_steps" :key="index">
        <div class="relative">
          <p class="px-[6px] bg-primary text-secondary rounded-full text-sm z-20">{{ index }}</p>
          <div
            class="h-[100%] w-[2px] bg-primary absolute top-0 left-1/2 -z-10 -translate-x-1/2"
          ></div>
        </div>
        <div class="">
          <p>{{ step.navigationInstruction.instructions }}</p>
          <p class="text-primary/70">
            {{ step.localizedValues.distance.text }} |
            {{ step.localizedValues.staticDuration.text }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
