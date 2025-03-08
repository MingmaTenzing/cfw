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
import { computed, inject, ref } from 'vue'
import { type themeContext } from '../../../../utils/theme_type'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const { theme } = inject<themeContext>('theme')!

const chart_border_color = computed(() => {
  return theme == 'dark' ? '#ffffff' : '#3b82f6'
})

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',

      borderColor: chart_border_color.value,

      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  scales: {
    x: {
      grid: {
        color: ' #27272a',
      },
    },
    y: {
      grid: {
        color: ' #27272a',
      },
    },
  },
})
</script>

<template>
  <Line :options="chartOptions" :data="chartData" />
</template>
