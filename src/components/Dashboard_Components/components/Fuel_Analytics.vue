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
    <section class="w-[800px]">
      <Line_Chart></Line_Chart>
    </section>
  </main>
</template>
