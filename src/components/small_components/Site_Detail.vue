<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { fuel_data_parser } from '../../../utils/fuel_data_parser'
import type { fuel_detail_item } from '../../../types'
import { useRoute } from 'vue-router'

const route = useRoute()
const lat = route.params.id
console.log(typeof lat)

// const fuelData = ref<fuel_detail_item[]>([])

const site = ref<fuel_detail_item>({
  title: '160.7: Costco Perth Airport',
  description:
    'Address: 142 Dunreath Dr, PERTH AIRPORT, Phone: (08) 9311 4700, Site features: Membership Based Retailer, EFTPOS, Open Mon-Fri: 6:00-21:30, Sat: 6:00-19:30, Sun: 7:00-19:00',
  date: '2025-02-20',
  trading_name: 'Costco Perth Airport',
  price: '160.7',
  location: 'PERTH AIRPORT',
  address: '142 Dunreath Dr',
  latitude: '31.940377',
  longitude: '115.951869',
  site_features:
    'Membership Based Retailer, EFTPOS, Open Mon-Fri: 6:00-21:30, Sat: 6:00-19:30, Sun: 7:00-19:00',
  phone: '(08) 9311 4700',
  brand: 'Costco',
  brand_image: 'https://www.fuelwatch.wa.gov.au/assets/images/logo_Costco.svg',
})

onMounted(async () => {
  // const response = await axios.get(import.meta.env.VITE_API_URL)
  // const xmlText = await response.data
  // fuelData.value = fuel_data_parser(xmlText)
  // console.log(fuelData.value)
  // if (fuelData.value.length > 0) {
  //   site.value = fuelData.value.filter((station) => station.latitude == lat)
  // }
})
</script>

<template>
  <main class="">
    <div class="border-b border-border p-4 space-y-4">
      <!-- back button -->

      <div class="flex items-center space-x-2 text-sm">
        <i class="pi pi-arrow-left"></i>
        <p>Back</p>
      </div>
      <!-- trading name and image -->
      <div class="flex justify-between items-center">
        <p class="font-semibold text-xl text-primary">{{ site.trading_name }}</p>
        <div class="bg-accent w-[60px] h-[54px] rounded-lg p-2 flex justify-center items-center">
          <img :src="site.brand_image" class="" />
        </div>
      </div>
    </div>
    <!-- address -->

    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-map-marker"></i>
      <p class="font-light text-sm text-secondary-foreground">
        {{ site.address }}, {{ site.location }}
      </p>
    </div>

    <!-- phone number -->
    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-phone"></i>
      <p class="font-light text-sm text-secondary-foreground">{{ site.phone }}</p>
    </div>

    <!-- boxes with details -->
    <section>
      <div class="w-[150px] h-[170px] bg-card border-border border rounded-lg">
        <p class="font-medium text-3xl">ULP</p>
        <div>
          <img
            src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
            class="dark:invert"
          />
        </div>
      </div>
    </section>

    <!-- description -->
    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-info-circle"></i>
      <p class="font-extralight text-xs text-secondary-foreground tracking-wider">
        {{ site.description }}
      </p>
    </div>
  </main>
</template>
