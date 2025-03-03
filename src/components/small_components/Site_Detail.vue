<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'
import { FuelStation, type site_details } from '../../../types'

const route = useRoute()

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

const site_details = ref<site_details>()
const site_price_details = ref<FuelStation>()

onMounted(async () => {
  const id = route.params.id as string

  const fuel_prices = await axios.get<FuelStation[]>('/fuelwatch/sites')
  const find_station_price = fuel_prices.data.find((station) => station.id == parseInt(id))
  site_price_details.value = find_station_price
  console.log(site_price_details)

  const response = await axios.get(`/fuelwatch/sites/${id}`)
  site_details.value = response.data
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
        <p v-if="site_details" class="font-semibold text-3xl text-center text-primary">
          {{ site_details.client.clientName }}
        </p>
        <!-- loading name -->
        <div v-else class="h-[36px] w-[60%] m-auto bg-accent rounded-lg animate-pulse"></div>
      </div>
    </div>
    <!-- address -->

    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-map-marker"></i>
      <p v-if="site_details" class="font-light text-sm text-secondary-foreground">
        {{ site_details.address.line1 }}, {{ site_details.address.location }}
      </p>
      <div v-else class="w-[216px] h-[20px] rounded-lg bg-accent animate-pulse"></div>
    </div>

    <!-- phone number -->
    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-phone"></i>
      <p v-if="site_details" class="font-light text-sm text-secondary-foreground">
        {{ site_details.client.clientContactDetails[0].phone }}
      </p>

      <div v-else class="bg-accent w-[98px] h-[20px] rounded-lg animate animate-pulse"></div>
    </div>

    <!-- boxes with details -->
    <section class="grid grid-cols-2 gap-4 place-content-evenly place-items-center p-4">
      <!-- ulp price -->
      <div
        class="w-[180px] h-[170px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 flex justify-center gap-4 p-4 items-center flex-col bg-card border-border border text-card-foreground rounded-lg"
      >
        <div class="flex items-center gap-1">
          <p class="font-medium text-3xl">ULP</p>
          <img
            src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
            class="dark:invert"
          />
        </div>
        <div v-if="site_details" class="">
          <p class="text-card-foreground text-4xl font-bold">${{ site_details.id }}</p>
        </div>
        <div v-else class="w-[117px] h-[40px] bg-accent animate-pulse rounded-xl"></div>
      </div>

      <!-- date -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <div v-if="site_details" class="flex items-center space-x-1">
          <p class="font-extralight">{{ new Date().getFullYear() }}</p>
          <p class="">{{ months[new Date().getMonth()] }}</p>
        </div>
        <div v-else class="w-[80px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div v-if="site_details">
          <p class="font-bold text-4xl">{{ new Date().getDate() }}</p>
          <p class="font-bold text-3xl">{{ days[new Date().getDay()] }}</p>
        </div>
        <div v-else class="w-[40px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div
          v-if="site_details"
          class="w-[128px] h-[14px] bg-accent animate-pulse rounded-xl"
        ></div>
      </div>

      <!-- brand image -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <img
          v-if="site_details"
          :src="`https://www.fuelwatch.wa.gov.au/assets/images/${site_details.brand.svgLogoFileName}`"
        />
        <div v-else class="w-full h-full bg-accent animate-pulse rounded-xl"></div>
      </div>

      <!-- location -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <div class="relative">
          <i class="pi pi-map-marker absolute -top-6 left-1/2 -translate-x-1/2 text-2xl"></i>
          <i class="pi pi-map text-3xl"></i>
        </div>
        <p v-if="site_details" class="font-semibold text-accent-foreground text-xl">
          {{ site_details.address.location }}
        </p>
        <div v-else class="w-[153px] h-[20px] bg-accent animate-pulse rounded-xl"></div>
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
          <p>site_details Description</p>
        </div>
        <div :class="[show_description ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
      <!-- content -->
      <Transition>
        <div v-if="show_description">
          <p class="font-extralight text-xs text-secondary-foreground tracking-wider">
            {{ site_details?.brand.description }}
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
          <p>site_details Features</p>
        </div>
        <div :class="[show_station_feature ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
      <!-- content  need to work on features-->
      <!-- <Transition>
        <div v-if="show_station_feature">
          <p class="font-extralight text-xs text-secondary-foreground tracking-wider">
            {{ site_details.site_features }}
          </p>
        </div>
      </Transition> -->
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
