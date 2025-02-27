<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { fuel_data_parser } from '../../../utils/fuel_data_parser'
import type { fuel_detail_item } from '../../../types'
import { useRoute } from 'vue-router'

const route = useRoute()
const lat = route.params.id
const show_description = ref<boolean>(false)
const show_station_feature = ref<boolean>(false)

const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
const months = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])
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

<template class="">
  <main class="overflow-y-scroll h-[100%] scrollbar-hide">
    <div class="border-b border-border p-4 space-y-6">
      <!-- back button -->

      <div class="flex items-center space-x-2 text-sm">
        <i class="pi pi-arrow-left"></i>
        <p>Back</p>
      </div>
      <!-- trading name and image -->
      <div class="">
        <p class="font-semibold text-3xl text-center text-primary">{{ site.trading_name }}</p>
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
    <section class="grid grid-cols-2 gap-4 place-content-evenly place-items-center p-4">
      <!-- ulp price -->
      <div
        class="w-[180px] h-[170px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-300 flex justify-center gap-4 p-4 items-center flex-col bg-accent text-accent-foreground rounded-lg"
      >
        <div class="flex items-center gap-1">
          <p class="font-medium text-3xl">ULP</p>
          <img
            src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
            class="dark:invert"
          />
        </div>
        <div class="">
          <p class="text-card-foreground text-4xl font-bold">${{ site.price }}</p>
        </div>
      </div>

      <!-- date -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-300 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-accent text-accent-foreground text-center rounded-lg"
      >
        <div class="flex items-center space-x-1">
          <p class="font-extralight">{{ new Date(site.date).getFullYear() }}</p>
          <p class="">{{ months[new Date(site.date).getMonth()] }}</p>
        </div>
        <div>
          <p class="font-bold text-4xl">{{ new Date(site.date).getDate() }}</p>
          <p class="font-bold text-3xl">{{ days[new Date(site.date).getDay()] }}</p>
        </div>
      </div>

      <!-- brand image -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-300 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-accent text-accent-foreground text-center rounded-lg"
      >
        <img :src="site.brand_image" />
      </div>

      <!-- location -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-300 items-center flex flex-col justify-center space-y-2 h-[170px] bg-accent text-accent-foreground text-center rounded-lg"
      >
        <div class="relative">
          <i class="pi pi-map-marker absolute -top-6 left-1/2 -translate-x-1/2 text-2xl"></i>
          <i class="pi pi-map text-3xl"></i>
        </div>
        <p class="font-semibold text-accent-foreground text-xl">{{ site.location }}</p>
      </div>
    </section>

    <!-- description -->
    <div class="border-b border-border p-4 text-sm space-y-4">
      <!-- toggle description -->
      <div
        @click="show_description = !show_description"
        class="flex justify-between group cursor-pointer"
      >
        <div class="flex gap-2 items-center">
          <i class="pi pi-info-circle"></i>
          <p>Site Description</p>
        </div>
        <div :class="[show_description ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
      <!-- content -->
      <Transition>
        <div v-if="show_description">
          <p class="font-extralight text-xs text-secondary-foreground tracking-wider">
            {{ site.description }}
          </p>
        </div>
      </Transition>
    </div>

    <!-- station features -->
    <div class="border-b border-border p-4 text-sm space-y-4">
      <!-- toggle station_feature -->
      <div
        @click="show_station_feature = !show_station_feature"
        class="flex justify-between group cursor-pointer"
      >
        <div class="flex gap-2 items-center">
          <i class="pi pi-info-circle"></i>
          <p>Site Features</p>
        </div>
        <div :class="[show_station_feature ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
      <!-- content -->
      <Transition>
        <div v-if="show_station_feature">
          <p class="font-extralight text-xs text-secondary-foreground tracking-wider">
            {{ site.site_features }}
          </p>
        </div>
      </Transition>
    </div>

    <!-- bottom margin to avoid content cutoff -->
    <div class="mb-[100px] h-[40px]"></div>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: transform 100ms ease-in-out;
}

.v-enter-from {
  transform: translateY(-8px);
}
.v-leave-to {
  transform: translateY(-8px);
}
</style>
