<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { fuel_data_parser } from '../../../utils/fuel_data_parser'
import type { fuel_detail_item } from '../../../types'
import { useRoute } from 'vue-router'

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
const fuelData = ref<fuel_detail_item[]>([])

const site = ref<fuel_detail_item[]>([])

onMounted(async () => {
  const lat = route.params.id
  console.log(lat)
  const response = await axios.get(import.meta.env.VITE_API_URL)
  const xmlText = await response.data
  fuelData.value = fuel_data_parser(xmlText)

  site.value = fuelData.value.filter((station) => station.latitude == lat)
  console.log(site.value)
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
        <p v-if="site.length > 0" class="font-semibold text-3xl text-center text-primary">
          {{ site[0]?.trading_name }}
        </p>
        <!-- loading name -->
        <div v-else class="h-[36px] w-[60%] m-auto bg-accent rounded-lg animate-pulse"></div>
      </div>
    </div>
    <!-- address -->

    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-map-marker"></i>
      <p v-if="site.length > 0" class="font-light text-sm text-secondary-foreground">
        {{ site[0].address }}, {{ site[0].location }}
      </p>
      <div v-else class="w-[216px] h-[20px] rounded-lg bg-accent animate-pulse"></div>
    </div>

    <!-- phone number -->
    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-phone"></i>
      <p v-if="site.length > 0" class="font-light text-sm text-secondary-foreground">
        {{ site[0]?.phone }}
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
        <div v-if="site.length > 0" class="">
          <p class="text-card-foreground text-4xl font-bold">${{ site[0]?.price }}</p>
        </div>
        <div v-else class="w-[117px] h-[40px] bg-accent animate-pulse rounded-xl"></div>
      </div>

      <!-- date -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <div v-if="site.length > 0" class="flex items-center space-x-1">
          <p class="font-extralight">{{ new Date(site[0]?.date).getFullYear() }}</p>
          <p class="">{{ months[new Date(site[0]?.date).getMonth()] }}</p>
        </div>
        <div v-else class="w-[80px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div v-if="site.length > 0">
          <p class="font-bold text-4xl">{{ new Date(site[0]?.date).getDate() }}</p>
          <p class="font-bold text-3xl">{{ days[new Date(site[0]?.date).getDay()] }}</p>
        </div>
        <div v-else class="w-[40px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div
          v-if="site.length <= 0"
          class="w-[128px] h-[14px] bg-accent animate-pulse rounded-xl"
        ></div>
      </div>

      <!-- brand image -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <img v-if="site.length > 0" :src="site[0]?.brand_image" />
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
        <p v-if="site.length > 0" class="font-semibold text-accent-foreground text-xl">
          {{ site[0]?.location }}
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
            {{ site[0]?.description }}
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
            {{ site[0]?.site_features }}
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
