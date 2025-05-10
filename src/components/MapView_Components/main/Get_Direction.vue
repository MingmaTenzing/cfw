<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

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
  </main>
</template>
