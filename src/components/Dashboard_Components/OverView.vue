<script setup lang="ts">
import { ref } from 'vue'
const fuel_type_toggle = ref<boolean>(false)
</script>

<template>
  <main class="text-primary bg-background w-full p-4">
    <!-- header -->

    <section class="flex justify-between border-b pb-4">
      <!-- left side menus -->
      <div class="flex items-center space-x-4">
        <i class="pi pi-bars"></i>

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
          <Transition>
            <div
              v-if="fuel_type_toggle"
              class="absolute -bottom-32 left-0 border-b border-l border-r rounded-lg w-[140px]"
            >
              <div class="p-2 hover:bg-accent cursor-pointer">
                <p>Unleaded 91</p>
              </div>
              <div class="p-2 hover:bg-accent cursor-pointer">
                <p>Premium 95</p>
              </div>
              <div class="p-2 hover:bg-accent cursor-pointer">
                <p>Premium 98</p>
              </div>
              <div class="p-2 hover:bg-accent cursor-pointer">
                <p>Diesel</p>
              </div>
            </div>
          </Transition>
        </div>
        <p class="text-sm text-primary/50">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </div>
    </section>
  </main>
</template>
