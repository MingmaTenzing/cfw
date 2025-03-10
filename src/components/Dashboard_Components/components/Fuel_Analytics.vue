<script lang="ts" setup>
import Line_Chart from './Line_Chart.vue'
</script>

<template>
  <main class="text-primary bg-background">
    <!-- section toggler -->

    <section class="bg-primary/5 rounded-lg p-2 text-xs flex w-full md:w-[340px]">
      <!-- need to add active classs -->
      <div class="px-4 py-2 bg-background rounded-lg">
        <p class="">Overview</p>
      </div>
      <div class="px-4 py-2 hover:bg-background rounded-lg">
        <p>Analytics</p>
      </div>
      <div class="px-4 py-2 hover:bg-background rounded-lg">
        <p>Regions</p>
      </div>
      <div class="px-4 py-2 hover:bg-background rounded-lg">
        <p>Stations</p>
      </div>
    </section>

    <!-- fuel analytics -->
    <section class="flex">
      <div class="border rounded-lg p-4 space-y-4">
        <div>
          <p class="font-bold text-xl">Price Trends</p>
          <p class="text-primary/60 text-xs">Average ULP Price past 31 days</p>
        </div>
        <div class="h-[324px] md:w-[384px] lg:w-[470px]">
          <Line_Chart></Line_Chart>
        </div>
      </div>
      <div class="border rounded-lg p-4 space-y-4">
        <div>
          <p class="font-bold text-xl">Price Trends</p>
          <p class="text-primary/60 text-xs">Average ULP Price past 31 days</p>
        </div>
        <div class="h-[324px] md:w-[384px] lg:w-[470px]">
          <Line_Chart></Line_Chart>
        </div>
      </div>
    </section>
  </main>
</template>
