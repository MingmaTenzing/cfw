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

import { region_fuel_average_calculator } from '../../../../utils/region_fuel_average'
import { type themeContext } from '../../../../utils/theme_type'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const average_fuel_prices = ref<number[]>([])
const { theme } = inject<themeContext>('theme')!

const current_theme = ref(theme)

const data = computed(() =>
  current_theme.value == 'dark'
    ? {
        labels: ['Metro', 'Margaret', 'Albany', 'Bunbury'],
        datasets: [
          {
            label: 'Regional Average Price',
            backgroundColor: '#ffffff',
            data: average_fuel_prices.value,
          },
        ],
      }
    : {
        labels: ['Metro', 'Margaret', 'Albany', 'Bunbury'],
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
  const fetch_data = await region_fuel_average_calculator()
  average_fuel_prices.value = fetch_data
})
// const xmlparser = fuel_data_parser(Metro_fuel.value)
// console.log(xmlparser)
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
    <div class="h-[324px] md:w-[340px] lg:w-full">
      <Bar :data="data" :options="chartOptions"></Bar>
    </div>
  </div>
</template>
