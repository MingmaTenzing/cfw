<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import data from '../../../../example'
import { maps_polyline } from '@/stores/polyline'
import polyline from 'google-polyline'
import axios from 'axios'
import { type RoutesResponse } from '../../../../route_steps_types'
import type { latlng } from '../../../../types'
const route = useRoute()

const api_key: string = import.meta.env.VITE_API_KEY_MAPS

// polyline_store
const polyline_store = maps_polyline()

const route_steps = ref<RoutesResponse>(data)

const starting_address = ref()
const site_address = route.params.address

async function get_route() {
  let data = {
    origin: {
      address: starting_address.value,
    },
    destination: {
      address: site_address,
    },
    travelMode: 'DRIVE',
    routingPreference: 'TRAFFIC_AWARE',
  }
  let header_config = {
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
  const response = await axios.post(
    'https://routes.googleapis.com/directions/v2:computeRoutes',
    data,
    header_config,
  )

  if (response.data.routes) {
    route_steps.value = response.data
    console.log(route_steps.value)

    let encodedPolyline = route_steps.value.routes[0].polyline.encodedPolyline

    decode_polyline(encodedPolyline)
  }
}

function decode_polyline(econdedPolyline: string) {
  const decoded_polyline = polyline.decode(econdedPolyline)

  const lat_lng_poly = decoded_polyline.map((data) => ({
    lat: data[0],
    lng: data[1],
  }))
  console.log(lat_lng_poly)

  polyline_store.update_polyline(lat_lng_poly)
}

decode_polyline(route_steps.value.routes[0].polyline.encodedPolyline)
</script>

<template>
  <main class="">
    <!-- directions header -->
    <div class="p-4 border-b border-border flex justify-between">
      <p class="font-medium">Directions</p>

      <i class="pi pi-times"></i>
    </div>
    <div></div>
    <form @submit.prevent="get_route" class="space-y-4 p-4">
      <!-- directions from -->
      <div class="flex space-x-2 items-baseline">
        <i class="pi pi-map-marker"></i>
        <div class="space-y-2">
          <p class="text-primary/70">From</p>
          <input
            type="text"
            v-model="starting_address"
            required
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

    <section>
      <div class="border-y border-border p-4">
        <!-- distance and duration details -->
        <div class="flex justify-between">
          <div class="space-y-2">
            <p class="text-primary/70">Distance</p>
            <div class="flex items-center space-x-2">
              <i class="pi pi-map"></i>
              <p class="font-semibold">
                {{ route_steps.routes[0].legs[0]?.localizedValues?.distance?.text }}
              </p>
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-primary/70">Duration</p>
            <div class="flex items-center space-x-2">
              <i class="pi pi-clock"></i>
              <p class="font-semibold">
                {{ route_steps.routes[0].legs[0].localizedValues?.staticDuration?.text }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- steps -->
      <div class="p-4 space-y-6 overflow-y-scroll md:h-[500px] lg:h-[400px] scrollbar-hide">
        <div
          class="flex relative space-x-4"
          v-for="(step, index) in route_steps.routes[0].legs[0].steps"
          :key="index"
        >
          <div class="relative">
            <p class="px-[6px] bg-primary text-secondary rounded-full text-sm z-20">{{ index }}</p>
            <div
              class="h-[100%] w-[2px] bg-primary absolute top-0 left-1/2 -z-10 -translate-x-1/2"
            ></div>
          </div>
          <div class="">
            <p>{{ step.navigationInstruction?.instructions }}</p>
            <p class="text-primary/70">
              {{ step.localizedValues?.distance?.text }} |
              {{ step.localizedValues?.staticDuration?.text }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
