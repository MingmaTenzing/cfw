<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { type price_change_predict, type fuelwatch_xml } from '../../../../types'
import { cheapest_fuel_station } from '../../../../utils/cheapest_fuel_station'
import { region_fuel_average_calculator } from '../../../../utils/region_fuel_average'
import { change_and_prediction } from '../../../../utils/price_prediction'
const cheapest_site = ref<fuelwatch_xml[]>([])
const average_unleaded = ref<number>()
const prediction_and_cycle = ref<price_change_predict>()

onMounted(async () => {
  const [cheapest_station, average_data, probability_change] = await Promise.all([
    cheapest_fuel_station(),
    region_fuel_average_calculator(),
    change_and_prediction(),
  ])

  cheapest_site.value = cheapest_station
  average_unleaded.value = average_data[0]
  prediction_and_cycle.value = probability_change

  console.log(cheapest_site.value, average_unleaded.value, prediction_and_cycle.value)
})
</script>

<template>
  <!-- main cards -->
  <section class="flex flex-wrap md:flex-nowrap gap-4 mt-8">
    <!-- cheapest price today in perth metro north-->
    <div class="border w-[325px] lg:w-1/3 p-4 rounded-lg space-y-2">
      <div class="space-y-4">
        <div>
          <p class="font-semibold text-xl xl:text-2xl">North of Perth</p>
          <p class="text-sm xl:text-base text-primary/50">Today's Cheapest Price</p>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold">Unleaded 91</p>
            <p class="text-sm xl:text-base text-primary/50">{{ cheapest_site[0]?.trading_name }}</p>
          </div>
          <img :src="cheapest_site[0]?.brand_image" class="w-[80px] h-[60px] object-contain" />
        </div>
        <div class="text-end">
          <p class="font-bold text-3xl xl:text-4xl text-green-600">
            ${{ (cheapest_site[0]?.price / 100).toFixed(2) }}/L
          </p>
        </div>
      </div>
    </div>

    <!-- cheapest price today perth metro south -->
    <div class="border w-[325px] lg:w-1/3 p-4 rounded-lg space-y-2">
      <div class="space-y-4">
        <div>
          <p class="font-semibold text-xl xl:text-2xl">South of Perth</p>
          <p class="text-sm xl:text-base text-primary/50">Today's Cheapest Price</p>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold">Unleaded 91</p>
            <p class="text-sm xl:text-base text-primary/50">{{ cheapest_site[1]?.trading_name }}</p>
          </div>
          <img :src="cheapest_site[1]?.brand_image" class="w-[80px] h-[60px] object-contain" />
        </div>
        <div class="text-end">
          <p class="font-bold text-3xl xl:text-4xl text-green-600">
            ${{ (cheapest_site[1]?.price / 100).toFixed(2) }}/L
          </p>
        </div>
      </div>
    </div>

    <!-- Average Fuel price today -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <p class="text-xl">Average UNLEADED 91</p>
      <p class="font-bold text-xl xl:text-2xl">${{ average_unleaded }}</p>
      <div class="text-green-600 flex items-center space-x-1 text-sm xl:text-base">
        <p class="text-primary/50">Across the Perth Metro North Region</p>
      </div>
    </div>

    <!-- Next Cycling order -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <p class="text-xl">Price Cycle</p>
      <p class="font-bold text-xl xl:text-2xl">Falling</p>
      <div
        v-if="prediction_and_cycle"
        class="text-green-600 flex items-center space-x-1 text-sm xl:text-base"
      >
        <i v-if="prediction_and_cycle!.percentage_change < 0" class="pi pi-arrow-down"></i>
        <i v-else class="pi pi-arrow-up"></i>
        <p>{{ Math.round(Math.abs(prediction_and_cycle!.percentage_change)) }}%</p>
        <p class="text-primary/50">from last week</p>
      </div>
    </div>
  </section>
</template>
