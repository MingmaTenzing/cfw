<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  type price_change_predict,
  type fuelwatch_xml,
  type region_average,
} from '../../../../types'

import axios from 'axios'

const north_cheapest = ref<fuelwatch_xml>()
const south_cheapest = ref<fuelwatch_xml>()
const five_region_average = ref<number>()
const prediction_and_cycle = ref<price_change_predict>({
  percentage_change: 10,
  tomorrow_predicted_price: 178,
})

onMounted(async () => {
  let region_average_price = 0
  const [north_metro_cheapest, south_metro_cheapest, region_average] = await Promise.all([
    axios.get('http://localhost:3000/xml/region-cheapest?Region=25'),
    axios.get('http://localhost:3000/xml/region-cheapest?Region=26'),
    axios.get('http://localhost:3000/xml/region-average'),
  ])
  const data: region_average[] = region_average.data
  data.map((value) => {
    region_average_price += value.average_price
  })
  five_region_average.value = region_average_price / 5
  north_cheapest.value = north_metro_cheapest.data
  south_cheapest.value = south_metro_cheapest.data
})
</script>

<template>
  <!-- main cards -->
  <section v-if="south_cheapest && north_cheapest && five_region_average" class="flex flex-wrap md:flex-nowrap gap-4 mt-8">
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
            <p class="text-sm xl:text-base text-primary/50">{{ south_cheapest?.trading_name }}</p>
          </div>
          <img :src="south_cheapest?.brand_image" class="w-[80px] h-[60px] object-contain" />
        </div>
        <div class="text-end">
          <p v-if="south_cheapest" class="font-bold text-3xl xl:text-4xl text-green-600">
            ${{ (south_cheapest.price / 100).toFixed(2) }}/L
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
            <p class="text-sm xl:text-base text-primary/50">{{ north_cheapest?.trading_name }}</p>
          </div>
          <img :src="north_cheapest?.brand_image" class="w-[80px] h-[60px] object-contain" />
        </div>
        <div class="text-end">
          <p v-if="north_cheapest" class="font-bold text-3xl xl:text-4xl text-green-600">
            ${{ (north_cheapest?.price / 100).toFixed(2) }}/L
          </p>
        </div>
      </div>
    </div>

    <!-- Average Fuel price today -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <p class="text-xl">Average UNLEADED 91</p>
      <p class="font-bold text-xl xl:text-2xl">${{ five_region_average?.toFixed(2) }}</p>
      <div class="text-green-600 flex items-center space-x-1 text-sm xl:text-base">
        <p class="text-primary/50">
          Across 5 regions including North, South, Margaret, Albany, and Bunbury
        </p>
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

  <!-- main cards skeleton -->
  <section v-else class="flex flex-wrap md:flex-nowrap gap-4 mt-8">
    <!-- cheapest price today in perth metro north skeleton -->
    <div class="border w-[325px] lg:w-1/3 p-4 rounded-lg space-y-2">
      <div class="space-y-4">
        <div>
          <div class="h-6 xl:h-8  bg-accent rounded animate-pulse w-32"></div>
          <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-40 mt-1"></div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <div class="h-4  bg-accent rounded animate-pulse w-20"></div>
            <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-24 mt-1"></div>
          </div>
          <div class="w-[80px] h-[60px]  bg-accent rounded animate-pulse"></div>
        </div>
        <div class="text-end">
          <div class="h-8 xl:h-10  bg-accent rounded animate-pulse w-28 ml-auto"></div>
        </div>
      </div>
    </div>

    <!-- cheapest price today perth metro south skeleton -->
    <div class="border w-[325px] lg:w-1/3 p-4 rounded-lg space-y-2">
      <div class="space-y-4">
        <div>
          <div class="h-6 xl:h-8  bg-accent rounded animate-pulse w-32"></div>
          <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-40 mt-1"></div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <div class="h-4  bg-accent rounded animate-pulse w-20"></div>
            <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-24 mt-1"></div>
          </div>
          <div class="w-[80px] h-[60px]  bg-accent rounded animate-pulse"></div>
        </div>
        <div class="text-end">
          <div class="h-8 xl:h-10  bg-accent rounded animate-pulse w-28 ml-auto"></div>
        </div>
      </div>
    </div>

    <!-- Average Fuel price today skeleton -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <div class="h-6  bg-accent rounded animate-pulse w-36"></div>
      <div class="h-6 xl:h-8  bg-accent rounded animate-pulse w-20"></div>
      <div class="space-y-1">
        <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-full"></div>
        <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-3/4"></div>
      </div>
    </div>

    <!-- Next Cycling order skeleton -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <div class="h-6  bg-accent rounded animate-pulse w-24"></div>
      <div class="h-6 xl:h-8  bg-accent rounded animate-pulse w-16"></div>
      <div class="flex items-center space-x-1">
        <div class="h-4 w-4  bg-accent rounded animate-pulse"></div>
        <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-8"></div>
        <div class="h-4 xl:h-5  bg-accent rounded animate-pulse w-20"></div>
      </div>
    </div>
  </section>

</template>
