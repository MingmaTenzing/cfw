<script lang="ts" setup>
import Bar_Chart from '../components/Bar_Chart.vue'
import Line_Chart from './Line_Chart.vue'
</script>

<template>
  <main class="text-primary bg-background">
    <!-- section toggler  -->
    <!-- thinking about keeping or removing it so need to decide once i build further see how it looks and serves a purpose -->

    <!-- <section class="bg-primary/5 rounded-lg p-2 text-xs flex w-full md:w-[340px]">

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
    </section> -->

    <!-- fuel analytics -->
    <section class="md:flex space-y-4 md:space-y-0 md:gap-4">
      <Line_Chart></Line_Chart>
      <Bar_Chart></Bar_Chart>
    </section>
  </main>
</template>
