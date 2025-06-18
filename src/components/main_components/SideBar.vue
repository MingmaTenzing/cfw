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
          <RouterLink
            to="/dashboard/overview"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-home"></i>

            <p>Overview</p>
          </RouterLink>
          <RouterLink
            to="/sites"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-map"></i>

            <p>Price Map</p>
          </RouterLink>
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
          <p class="text-xs text-accent-foreground opacity-50">Fuel Types (Demo)</p>

          <router-link
            to="/dashboard/prices/unleaded"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>
            <p>Unleaded 91</p>
          </router-link>

          <router-link
            to="/dashboard/prices/diesel"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-truck"></i>

            <p>Diesel</p>
          </router-link>
          <router-link
            to="/dashboard/prices/premium unleaded"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>

            <p>Premium Unleaded</p>
          </router-link>
          <router-link
            to="/dashboard/prices/98 Ron"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>

            <p>98 Ron</p>
          </router-link>
          <router-link
            to="/dashboard/prices/e85"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>

            <p>E85</p>
          </router-link>
          <router-link
            to="/dashboard/prices/brand diesel"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>

            <p>Brand Diesel</p>
          </router-link>
          <router-link
            to="/dashboard/prices/lpg"
            class="flex space-x-2 items-center p-1 hover:bg-accent rounded-lg text-sm"
          >
            <i class="pi pi-car"></i>

            <p>LPG</p>
          </router-link>
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
