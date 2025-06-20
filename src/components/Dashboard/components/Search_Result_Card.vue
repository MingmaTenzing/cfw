<script setup lang="ts">
import { type fuelwatch_xml } from '../../../../types'
const props = defineProps<{
  station: fuelwatch_xml
}>()
</script>

<template>
  <div class="p-4 border flex flex-col gap-4 md:gap-6 lg:flex-row hover:ring lg:space-x-20">
    <div class="flex space-x-4 items-center lg:w-[30%]">
      <img :src="station.brand_image" class="w-[40px] h-[40px] object-contain" />
      <div>
        <p class="text-xl font-semibold">{{ station.trading_name }}</p>
        <div class="flex space-x-2 items-center text-primary/85 text-sm">
          <i class="pi pi-map-marker"></i>
          <p>{{ station.location }}</p>
        </div>
      </div>
    </div>

    <!-- price -->
    <div class="gap-2 flex flex-col md:flex-row md:w-full md:justify-between">
      <div>
        <p class="text-sm font-light">¢ Price</p>
        <p class="font-semibold">{{ station.price }}</p>
      </div>

      <div>
        <p class="text-sm font-light">Brand</p>
        <p class="font-semibold">{{ station.brand }}</p>
      </div>
      <div>
        <p class="text-sm font-light">Address</p>
        <p class="font-semibold">{{ station.address }}</p>
      </div>
      <div>
        <p class="text-sm font-light">Phone</p>
        <p class="font-semibold">{{ station.phone || 'Not Available' }}</p>
      </div>
      <div>
        <p class="text-sm font-light">Date</p>
        <p class="font-semibold">{{ station.date }}</p>
      </div>
      <router-link
        class="flex flex-col md:items-center gap-2"
        :to="`/sites/get-directions/${station?.address},${station?.location}`"
      >
        <p class="text-sm font-light">Get Direction</p>
        <i class="pi pi-directions text-xl"> </i>
      </router-link>
    </div>
  </div>
</template>
