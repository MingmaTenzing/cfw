<script lang="ts" setup>
import GoogleMaps from '@/components/main_components/GoogleMaps.vue'
</script>

<template>
  <div class="p-4 border border-border rounded-lg space-y-4 lg:w-full">
    <div class="flex justify-between">
      <div>
        <p class="font-bold text-xl xl:text-2xl">Price Map</p>
        <p class="text-primary/60 text-sm xl:text-base">UNLEADED91 prices across Perth Metro</p>
      </div>
    </div>
    <GoogleMaps class="md:min-w-[320px] lg:w-full max-h-[400px] rounded-lg"></GoogleMaps>
  </div>
</template>
