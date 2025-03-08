<script lang="ts" setup></script>

<template>
  <!-- main cards -->
  <section class="flex flex-wrap space-x-4 mt-8">
    <!-- cheapest price today in perth-->
    <div class="border w-[325px] p-4 rounded-lg space-y-2 flex justify-between items-center">
      <div class="space-y-4">
        <div>
          <p class="font-semibold text-lg">Today's Cheapest Price</p>
          <p class="text-xs text-primary/50">Updated Hourly</p>
        </div>

        <div class="flex items-center space-x-2">
          <div>
            <p class="text-sm font-semibold">Unleaded 91</p>
            <p class="text-xs text-primary/50">Coles Express Perth CBD</p>
          </div>
          <img src="https://www.fuelwatch.wa.gov.au/assets/images/logo_shell.svg" width="32" />
        </div>
      </div>
      <p class="font-bold text-3xl text-green-600">$1.79/L</p>
    </div>

    <!-- Average Fuel price today -->
    <div class="w-[208px] lg:w-[300px] p-4 border rounded-lg space-y-2">
      <p class="">Average UNLEADED 91</p>
      <p class="font-bold text-xl">$1.65</p>
      <div class="text-green-600 flex items-center space-x-1 text-xs">
        <i class="pi pi-arrow-down"></i>
        <p>2.3%</p>
        <p class="text-primary/50">from last week</p>
      </div>
    </div>

    <!-- Next Cycling order -->
    <div class="w-[208px] lg:w-[300px] p-4 border rounded-lg space-y-2">
      <p class="">Price Cycle</p>
      <p class="font-bold text-xl">Falling</p>
      <div class="text-green-600 flex items-center space-x-1 text-xs">
        <i class="pi pi-arrow-down"></i>
        <p>2.3%</p>
        <p class="text-primary/50">from last week</p>
      </div>
    </div>
  </section>
</template>
