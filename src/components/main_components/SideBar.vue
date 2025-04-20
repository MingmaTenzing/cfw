<script setup lang="ts">
import { inject } from 'vue'
import type { themeContext } from '../../../utils/theme_type'

const { changeTheme } = inject<themeContext>('theme')!
const { toggle_side_bar } = inject('toggle_side_bar', {
  show_side_bar: false,
  toggle_side_bar: () => undefined,
})
</script>

<template>
  <main
    class="bg-zinc-50 dark:bg-zinc-900 text-primary w-[240px] p-4 h-[100vh] flex flex-col justify-between"
  >
    <!-- logo + dashboard and feul types -->

    <div class="space-y-4">
      <!-- logo -->
      <div>
        <div v-on:click="toggle_side_bar" class="flex justify-end">
          <i class="pi pi-times"></i>
        </div>
        <div class="flex justify-center">
          <img
            src="../../assets/cfw_white_logo.png"
            width="140"
            height="60"
            class="invert dark:invert-0"
          />
        </div>
      </div>

      <!-- dashboard and fuel types -->
      <section class="space-y-8">
        <!-- dashboard -->

        <section class="space-y-2">
          <p class="text-xs text-accent-foreground opacity-50">Dashboard</p>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <i class="pi pi-home"></i>

            <p>Overview</p>
          </div>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <i class="pi pi-map"></i>

            <p>Price Map</p>
          </div>
          <RouterLink to="/dashboard/search">
            <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
              <i class="pi pi-search"></i>

              <p>Search</p>
            </div>
          </RouterLink>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <i class="pi pi-chart-bar"></i>

            <p>Analytics</p>
          </div>
        </section>

        <!-- fuel  types -->
        <section class="space-y-2">
          <p class="text-xs text-accent-foreground opacity-50">Fuel Types</p>

          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <img
              src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
              class="dark:invert w-[16px] object-fill"
            />

            <p>Unleaded 91</p>
          </div>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <img
              src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
              class="dark:invert w-[16px] object-fill"
            />

            <p>Premium 95</p>
          </div>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <img
              src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
              class="dark:invert w-[16px] object-fill"
            />

            <p>Premium 98</p>
          </div>
          <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
            <img
              src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
              class="dark:invert w-[16px] object-fill"
            />

            <p>Diesel</p>
          </div>
        </section>
      </section>
    </div>

    <!-- setting and profile -->
    <section class="space-y-2">
      <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
        <i class="pi pi-cog"></i>
        <p>Settings</p>
      </div>

      <div class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm">
        <i class="pi pi-user"></i>
        <p>Profile</p>
      </div>

      <div class="flex justify-end">
        <div
          v-on:click="changeTheme"
          class="border p-2 w-[40px] flex justify-center items-center rounded-lg"
        >
          <i class="pi pi-moon"></i>
        </div>
      </div>
    </section>
  </main>
</template>
