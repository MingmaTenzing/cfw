<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { fuel_data_parser } from '../../../../utils/xml_fuel_data_parser'
import { type fuelwatch_xml } from '../../../../types'

const cheapest_stations = ref<fuelwatch_xml[]>([])
onMounted(async () => {
  const response = await axios.get(
    'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25',
  )
  const fuel_prices = fuel_data_parser(response.data)
  const sorted_fuel_prices = fuel_prices
    .sort((a, b) => Number(a.price) - Number(b.price))
    .slice(0, 5)

  cheapest_stations.value = sorted_fuel_prices
})
</script>
<template>
  <div class="p-4 border border-border rounded-lg space-y-4 lg:w-full">
    <div>
      <p class="font-bold text-xl xl:text-2xl">Cheapest Stations</p>
      <p class="text-primary/60 text-sm xl:text-base">Lowest UNLEADED91 prices in Perth</p>
    </div>
    <div class="p-2 text-sm w-full">
      <table class="">
        <thead class="">
          <tr class="text-primary/50">
            <th class="font-medium">Station</th>
            <th class="">Location</th>
            <th>Price</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b hover:bg-accent"
            v-for="(station, index) in cheapest_stations"
            :key="index"
          >
            <td class="w-[40%] text-center p-4">
              {{ station.trading_name }}
            </td>
            <td class="w-[20%] p-4 text-center">
              {{ station.address }}
            </td>
            <td class="w-[20%] p-4 text-center text-green-600">
              {{ station.price }}
            </td>
            <td class="w-[20%] p-4 text-center">
              {{
                new Date(station.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                })
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
