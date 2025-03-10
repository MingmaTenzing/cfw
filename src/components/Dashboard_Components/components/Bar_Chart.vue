<script lang="ts" setup>
import axios from 'axios'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { onMounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import { fuelwatch_xml } from '../../../../types'
import { fuel_data_parser } from '../../../../utils/xml_fuel_data_parser'
import { region_fuel_average_calculator } from '../../../../utils/region_fuel_average'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Metro_fuel = ref<fuelwatch_xml[]>([])

const data = ref({
  labels: [
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
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#ffffff',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
})

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
  const data = await region_fuel_average_calculator()
  console.log(data)
})
// const xmlparser = fuel_data_parser(Metro_fuel.value)
// console.log(xmlparser)
</script>

<template>
  <div class="h-[324px] md:w-[384px] lg:w-[470px]">
    <Bar :data="data" :options="chartOptions"></Bar>
  </div>
</template>
