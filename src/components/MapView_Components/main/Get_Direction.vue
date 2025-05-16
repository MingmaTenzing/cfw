<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import polyline from 'google-polyline'
import data from '../../../../example.json'
import { maps_polyline } from '@/stores/polyline'
import axios from 'axios'
const router = useRouter()
const route = useRoute()

const api_key: string = import.meta.env.VITE_API_KEY_MAPS

const polyline_store = maps_polyline()

const starting_address = ref()
const site_address = route.params.address

console.log(typeof site_address)

const api_response = data.routes

const navigation_steps = api_response[0].legs[0].steps

const polyline_encoded = api_response[0].polyline.encodedPolyline

const decoded_polyline = polyline.decode(polyline_encoded)

const lat_lng_poly = decoded_polyline.map((data) => ({
  lat: data[0],
  lng: data[1],
}))

async function get_route() {
  let data = JSON.stringify({
    origin: {
      address: starting_address.value,
    },
    destination: {
      address: site_address,
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE',
  })
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://routes.googleapis.com/directions/v2:computeRoutes',
    headers: {
      'X-Goog-Api-Key': api_key,
      'X-Goog-FieldMask':
        'routes.legs,routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
      'Content-Type': 'application/json',
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <main class="">
    <!-- directions header -->
    <div class="p-4 border-b border-border flex justify-between">
      <p class="font-medium">Directions</p>
      <i class="pi pi-times"></i>
    </div>

    <form @submit.prevent="get_route" class="space-y-4 p-4">
      <!-- directions from -->
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="space-y-2">
          <p class="text-primary/70">From</p>
          <input
            type="text"
            v-model="starting_address"
            placeholder="Enter Address"
            class="outline-none border border-border w-[300px] p-2 rounded-lg"
          />
          {{ starting_address }}
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
