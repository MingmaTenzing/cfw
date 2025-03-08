<script setup lang="ts">
import Fuel_Analytics from './components/Fuel_Analytics.vue'
import Header_Component from './components/Header_Component.vue'
import Price_Cards from './components/Price_Cards.vue'
</script>

<template>
  <main class="bg-background text-primary w-full min-h-[100vh] p-4 border">
    <!-- header -->

    <Header_Component></Header_Component>

    <!-- main cards -->
    <Price_Cards></Price_Cards>
    <Fuel_Analytics></Fuel_Analytics>
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
