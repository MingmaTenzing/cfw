<script setup lang="ts">
import { inject, ref } from 'vue'
const fuel_type_toggle = ref<boolean>(false)

const { toggle_side_bar } = inject('toggle_side_bar', {
  show_side_bar: false,
  toggle_side_bar: () => undefined,
})
</script>

<template>
  <main class="bg-background text-primary w-full min-h-[100vh] p-4 border">
    <!-- header -->

    <section class="flex justify-between border-b pb-4">
      <!-- left side menus -->
      <div class="flex items-center space-x-4">
        <i v-on:click="toggle_side_bar" class="pi pi-bars"></i>

        <h2 class="font-semibold text-lg">WA Fuel Price Dashboard</h2>
      </div>

      <!-- right side menus -->
      <div class="flex items-center space-x-4">
        <div class="rounded-lg border text-xs p-2 relative w-[140px]">
          <div
            v-on:click="fuel_type_toggle = !fuel_type_toggle"
            class="flex items-center justify-between"
          >
            <p>Unleaded 91</p>
            <i class="pi pi-chevron-down"></i>
          </div>
          <Transition class="fuel-type">
            <div
              v-if="fuel_type_toggle"
              class="absolute -bottom-32 left-0 border-b border-l border-r rounded-lg w-[140px]"
            >
              <div class="p-2 hover:bg-accent bg-background cursor-pointer">
                <p>Unleaded 91</p>
              </div>
              <div class="p-2 hover:bg-accent bg-background cursor-pointer">
                <p>Premium 95</p>
              </div>
              <div class="p-2 hover:bg-accent bg-background cursor-pointer">
                <p>Premium 98</p>
              </div>
              <div class="p-2 hover:bg-accent bg-background cursor-pointer">
                <p>Diesel</p>
              </div>
            </div>
          </Transition>
        </div>
        <p class="text-sm text-primary/50">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </div>
    </section>

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
  </main>
</template>

<style>
.fuel-type-enter-active,
.fuel-type-leave-active {
  transition: all 200ms ease-in-out;
}

.fuel-type-enter-from {
  transform: translateY(-8px);
}
.fuel-type-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
