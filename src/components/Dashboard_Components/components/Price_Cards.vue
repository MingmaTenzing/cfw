<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { type fuelwatch_xml } from '../../../../types';
import { cheapest_fuel_station } from '../../../../utils/cheapest_fuel_station';

const cheapest_site = ref<fuelwatch_xml>()
const site_loading = ref<boolean>(false)

onMounted(async () => {


  const data = await cheapest_fuel_station()

  cheapest_site.value = data

})</script>

<template>
  <!-- main cards -->
  <section class="flex flex-wrap md:flex-nowrap gap-4 mt-8">
    <!-- cheapest price today in perth-->
    <div
      class="border w-[325px] lg:w-1/3 p-4 rounded-lg space-y-2 flex justify-between items-center"
    >
      <div class="space-y-4">
        <div>
          <p class="font-semibold text-xl xl:text-2xl">Today's Cheapest Price</p>
          <p class="text-sm xl:text-base text-primary/50">Updated Hourly</p>
        </div>

        <div class="flex items-center space-x-2">
          <div>
            <p class="text-sm font-semibold">Unleaded 91</p>
            <p class="text-sm xl:text-base text-primary/50">{{cheapest_site?.trading_name}}</p>
          </div>
          <img :src="cheapest_site?.brand_image" width="32" />
        </div>
      </div>
      <p class="font-bold text-3xl xl:text-4xl text-green-600">${{((cheapest_site?.price)/100).toFixed(2)}}/L</p>
    </div>

    <!-- Average Fuel price today -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <p class="text-xl">Average UNLEADED 91</p>
      <p class="font-bold text-xl xl:text-2xl">$1.65</p>
      <div class="text-green-600 flex items-center space-x-1 text-sm xl:text-base">
        <i class="pi pi-arrow-down"></i>
        <p>2.3%</p>
        <p class="text-primary/50">from last week</p>
      </div>
    </div>

    <!-- Next Cycling order -->
    <div class="w-[208px] lg:w-1/3 p-4 border rounded-lg space-y-2">
      <p class="text-xl">Price Cycle</p>
      <p class="font-bold text-xl xl:text-2xl">Falling</p>
      <div class="text-green-600 flex items-center space-x-1 text-sm xl:text-base">
        <i class="pi pi-arrow-down"></i>
        <p>2.3%</p>
        <p class="text-primary/50">from last week</p>
      </div>
    </div>
  </section>
</template>
