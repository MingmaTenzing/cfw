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
import { computed, inject, onMounted, ref } from 'vue'
import { type themeContext } from '../../../../utils/theme_type'
import axios from 'axios'
import { type price_trend } from '../../../../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const { theme } = inject<themeContext>('theme')!

const price_trend_data = ref<price_trend[]>([])
const average_Prices = computed(() => {
  return price_trend_data.value.length > 0
    ? price_trend_data.value.map((price) => price.averagePrice)
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

const chart_border_color = ref('oklch(0.627 0.194 149.214)')

// chartoptions computed value where it changes the grid color howerver choose to not show grid at all
//but left it here just in case for future use
const chartOptions = computed(() => {
  return theme == 'dark' ? lightGrid_options : darkGrid_options
})

// lightgrid styling
const lightGrid_options = {
  responsive: true,
  forceOverride: true,
  scales: {
    x: {
      grid: {
        color: ' #27272a',
        display: false,
      },
    },
    y: {
      grid: {
        color: ' #27272a',
        display: false,
      },
    },
  },
}
//darkgrid styling
const darkGrid_options = {
  responsive: true,
  forceOverride: true,
  scales: {
    x: {
      grid: {
        color: ' #ffffff',
        display: false,
      },
    },
    y: {
      grid: {
        color: ' #ffffff',
        display: false,
      },
    },
  },
}
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

console.log(average_Prices, price_dates)
onMounted(async () => {
  const fetch_price_trend = await axios.get<price_trend[]>(
    '/fuelwatch/report/price-trends?region=Metro&fuelType=ULP',
  )
  price_trend_data.value = fetch_price_trend.data
  console.log(price_trend_data.value)
})
</script>

<template>
  <Line :options="chartOptions" :data="chartData" />
</template>
