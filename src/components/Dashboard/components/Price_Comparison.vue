<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { type fuelwatch_xml } from '../../../../types'

const cheapest_stations = ref<fuelwatch_xml[]>([])
onMounted(async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/xml/perth-cheapest`)

  cheapest_stations.value = response.data
})
</script>
<template>
  <div
    v-if="cheapest_stations.length > 0"
    class="p-4 border border-border rounded-lg space-y-4 lg:w-full"
  >
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

  <!-- loading skeleton -->
  <section v-else>
    <div class="p-4 border border-border rounded-lg space-y-4 lg:w-full">
      <div>
        <div class="h-6 xl:h-8 bg-accent rounded animate-pulse w-40"></div>
        <div class="h-4 xl:h-5 bg-accent rounded animate-pulse w-56 mt-1"></div>
      </div>
      <div class="p-2 text-sm w-full">
        <table class="w-full">
          <thead>
            <tr class="text-primary/50">
              <th class="font-medium">
                <div class="h-4 bg-accent rounded animate-pulse w-16 mx-auto"></div>
              </th>
              <th>
                <div class="h-4 bg-accent rounded animate-pulse w-16 mx-auto"></div>
              </th>
              <th>
                <div class="h-4 bg-accent rounded animate-pulse w-12 mx-auto"></div>
              </th>
              <th>
                <div class="h-4 bg-accent rounded animate-pulse w-16 mx-auto"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b" v-for="row in 8" :key="row">
              <td class="w-[40%] text-center p-4">
                <div class="h-4 bg-accent rounded animate-pulse w-32 mx-auto"></div>
              </td>
              <td class="w-[20%] p-4 text-center">
                <div class="h-4 bg-accent rounded animate-pulse w-24 mx-auto"></div>
              </td>
              <td class="w-[20%] p-4 text-center">
                <div class="h-4 bg-accent rounded animate-pulse w-16 mx-auto"></div>
              </td>
              <td class="w-[20%] p-4 text-center">
                <div class="h-4 bg-accent rounded animate-pulse w-20 mx-auto"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
