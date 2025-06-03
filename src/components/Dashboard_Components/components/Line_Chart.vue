<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { type themeContext } from '../../../../utils/theme_type'
import axios from 'axios'
import { type price_trend } from '../../../../types'
import { darkGrid_options, lightGrid_options } from '../../../../utils/chart_utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const { theme } = inject<themeContext>('theme')!

const price_trend_data = ref<price_trend[]>([])
const average_Prices = computed(() => {
  return price_trend_data.value.length > 0
    ? price_trend_data.value.map((price) => price.averagePrice / 100)
    : []
})
const price_dates = computed(() =>
  price_trend_data.value.length > 0
    ? price_trend_data.value.map((price) => {
        const date = new Date(price.publishDate)
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
      })
    : [],
)
const fuel_type_toggle = ref<boolean>(false)

const current_fuel_type = ref('ULP')

const chart_border_color = ref('oklch(0.627 0.194 149.214)')

// chartoptions computed value where it changes the grid color howerver choose to not show grid at all
//but left it here just in case for future use
const chartOptions = computed(() => {
  return theme == 'dark' ? lightGrid_options : darkGrid_options
})

const chartData = computed(() => ({
  labels: price_dates.value,

  datasets: [
    {
      label: 'Average ULP Price for metro region',

      borderColor: chart_border_color.value,

      data: average_Prices.value,
    },
  ],
}))

async function fetchData(fuelType: string) {
  const fetch_price_trend = await axios.get<price_trend[]>(
    `http://localhost:3000/trend?fuelType=${fuelType}`,
  )
  price_trend_data.value = fetch_price_trend.data
}

onMounted(async () => {
  fetchData(current_fuel_type.value)
})

watch(current_fuel_type, (newFuelType) => {
  fetchData(newFuelType)
})
</script>

<template>
  <div class="border rounded-lg p-4 space-y-4 w-full md:w-1/2">
    <div class="flex justify-between">
      <div>
        <p class="font-bold text-xl xl:text-2xl">Price Trends</p>
        <p class="text-primary/60 text-sm xl:text-base">Average ULP Price past 31 days</p>
      </div>

      <!-- dropdown menu -->
      <div>
        <div class="rounded-lg border text-xs p-2 relative w-[140px]">
          <div
            v-on:click="fuel_type_toggle = !fuel_type_toggle"
            class="flex justify-between items-center"
          >
            <p>{{ current_fuel_type }}</p>
            <i class="pi pi-chevron-down"></i>
          </div>
          <Transition name="dropdown">
            <div
              v-if="fuel_type_toggle"
              class="absolute -bottom-48 left-0 border-b border-l border-r rounded-lg w-[140px]"
            >
              <div
                v-on:click="current_fuel_type = 'ULP'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>ULP</p>
              </div>
              <div
                v-on:click="current_fuel_type = 'PULP'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>PULP</p>
              </div>
              <div
                v-on:click="current_fuel_type = 'Diesel'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>Diesel</p>
              </div>
              <div
                v-on:click="current_fuel_type = 'LPG'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>LPG</p>
              </div>
              <div
                v-on:click="current_fuel_type = '98 RON'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>98 RON</p>
              </div>
              <div
                v-on:click="current_fuel_type = 'E85'"
                class="p-2 hover:bg-accent bg-background cursor-pointer"
              >
                <p>E85</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <div v-if="price_trend_data.length > 0" class="h-[324px] md:w-[340px] lg:w-full">
      <Line :options="chartOptions" :data="chartData" />
    </div>
    <!-- skeleton loading -->
    <div v-else class=" h-[324px] md:w-[340px] lg:w-full bg-accent animate-pulse rounded-lg">

    </div>
  </div>
</template>
