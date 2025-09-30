<script lang="ts" setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed, inject, onMounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'

import { type themeContext } from '../../../../utils/theme_type'
import axios from 'axios'
import { type region_average } from '../../../../types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const average_fuel_prices = ref<number[]>([])
const { theme } = inject<themeContext>('theme')!

const current_theme = ref(theme)

const data = computed(() =>
  current_theme.value == 'dark'
    ? {
        labels: ['Metro North', 'Metro South', 'Margaret', 'Albany', 'Bunbury'],
        datasets: [
          {
            label: 'Regional Average Price',
            backgroundColor: '#ffffff',
            data: average_fuel_prices.value,
          },
        ],
      }
    : {
        labels: ['Metro North', 'Metro South', 'Margaret', 'Albany', 'Bunbury'],
        datasets: [
          {
            label: 'Regional Average Price',
            backgroundColor: '#3f3f46',
            data: average_fuel_prices.value,
          },
        ],
      },
)

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
})

onMounted(async () => {
  let prices: number[] = []
  const response = await axios.get<region_average[]>(
    `${import.meta.env.VITE_API_URL}/xml/region-average`,
  )
  const data = response.data

  for (let i = 0; i < data.length; i++) {
    prices.push(data[i].average_price)
  }

  average_fuel_prices.value = prices
})
</script>

<template>
  <div class="border rounded-lg p-4 space-y-4 w-full md:w-1/2">
    <div class="flex justify-between">
      <div>
        <p class="font-bold text-xl">Regional Comparison</p>
        <p class="text-primary/60 text-sm xl:text-base">Current UNLEADED91 prices by region</p>
      </div>
      <div>
        <p>{{ new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) }}</p>
      </div>
    </div>
    <div v-if="average_fuel_prices.length > 0" class="h-[324px] md:w-[340px] lg:w-full">
      <Bar :data="data" :options="chartOptions"></Bar>
    </div>
    <div v-else class="h-[324px] md:w-[340px] lg:w-full bg-accent animate-pulse rounded-lg"></div>
  </div>
</template>
