<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import polyline from 'google-polyline'
import data from '../../../../example.json'
const router = useRouter()
const route = useRoute()

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

const directions = [
  {
    step: 'Start at Point A',
    distance: '0 m',
    duration: '0 min',
  },
  {
    step: 'Head north on Main Street',
    distance: '300 m',
    duration: '4 min',
  },
  {
    step: 'Turn right onto 2nd Avenue',
    distance: '500 m',
    duration: '6 min',
  },
  {
    step: 'Turn left onto Manning Rd/State Route 26\nDestination will be on the left Turn left onto Manning Rd/State Route 26\nDestination will be on the left Turn left onto Manning Rd/State Route 26\nDestination will be on the left ',
    distance: '200 m',
    duration: '2 min',
  },
  {
    step: 'Turn left onto Oak Street',
    distance: '400 m',
    duration: '5 min',
  },
  {
    step: 'Arrive at Point B on the right',
    distance: '0 m',
    duration: '0 min',
  },
  {
    step: 'Arrive at Point B on the right',
    distance: '0 m',
    duration: '0 min',
  },
]

const site_address = route.params.address

// navigator.geolocation.getCurrentPosition((position) => {
//   console.log(position)
// })
onMounted(() => {})
</script>

<template>
  <main class="">
    <!-- directions header -->
    <div class="p-4 border-b border-border flex justify-between">
      <p class="font-medium">Directions</p>
      <i class="pi pi-times"></i>
    </div>

    <form class="space-y-4 p-4">
      <!-- directions from -->
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="">
          <p class="text-primary/70">From</p>
          <p class="font-semibold">Your Current Location</p>
        </div>
      </div>
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="">
          <p class="text-primary/70">To</p>
          <p class="font-semibold">{{ site_address }}</p>
        </div>
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
