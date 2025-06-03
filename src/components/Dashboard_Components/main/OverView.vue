<script setup lang="ts">
import Bar_Chart from '../components/Bar_Chart.vue'
import Header_Component from '../components/Header_Component.vue'
import Line_Chart from '../components/Line_Chart.vue'
import Price_Cards from '../components/Price_Cards.vue'
import Price_Comparison from '../components/Price_Comparison.vue'
import Price_Map from '../components/Price_Map.vue'
</script>

<template>
  <main class="bg-background text-primary w-full min-h-[100vh] p-4 space-y-4">
    <!-- header -->

    <!-- main cards -->
    <Price_Cards></Price_Cards>

    <!-- fuel analytics -->
    <section class="md:flex space-y-4 md:space-y-0 md:gap-4">

      <Line_Chart></Line_Chart>
      <Bar_Chart></Bar_Chart>
    </section>

    <!-- price map and cheapest stations list -->
    <section class="md:flex md:gap-4 w-full">
      <div class=" md:w-1/2">
        <Price_Map ></Price_Map>

      </div>
      <div class=" md:w-1/2">
        <Price_Comparison   ></Price_Comparison>

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
