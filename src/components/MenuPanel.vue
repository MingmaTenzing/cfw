<script lang="ts" setup>
import axios from 'axios'
import { inject, onMounted, ref } from 'vue'

import type { fuel_detail_item } from '../../types'
import { fuel_data_parser } from '../../utils/fuel_data_parser'
import { type themeContext } from '../../utils/theme_type'

const fuelData = ref<fuel_detail_item[]>([])

// asserted that theme will always be provided from the root app level
const { theme, changeTheme } = inject<themeContext>('theme')!

onMounted(async () => {
  const response = await axios.get('fuelwatch/fuelWatchRSS')
  const xmlText = await response.data

  // calls the fuel-data_parser function in utils that converts the xml string into array
  fuelData.value = fuel_data_parser(xmlText)
})
</script>

<template>
  <main class="text-primary bg-background w-full h-full md:w-[412px]">
    <div class="p-2 flex justify-center">
      <img
        src="../assets/cfw_white_logo.png"
        width="160"
        height="60"
        class="invert dark:invert-0"
      />
      {{ theme }}

      <button @click="changeTheme">
        <i class="pi pi-moon text-foreground"></i>
      </button>
    </div>
    <!-- header -->
    <div class="text-sm md:text-base border-t border-b">
      <div class="p-4 text-center">
        <p class="text-xs">
          ULP prices from 6am
          <span class="bg-primary text-primary-foreground py-[0.5px] px-2 rounded-lg">Today</span>
          and
          <span class="bg-secondary text-secondary-foreground py-[0.5px] px-2 rounded-lg"
            >Tomorrow</span
          >
        </p>
      </div>
    </div>

    <div class="p-4 border-b border-border dark:border-border">
      <div class="flex items-center space-x-2 text-md">
        <i class="pi pi-list"></i>
        <p>Today's price</p>
      </div>
    </div>
    <!-- prices list -->

    <main class="overflow-y-scroll h-full scrollbar-hide">
      <section>
        <!-- prices today list -->
        <section
          v-for="item in fuelData"
          v-bind:key="item.phone"
          id="price-list-item"
          class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary flex justify-between items-center"
        >
          <div class="space-y-2">
            <!-- price -->
            <div>
              <p class="font-semibold">{{ item.price }}</p>
              <p class="text-secondary-foreground dark:text-secondary-foreground text-xs">Today</p>
            </div>
            <div>
              <p class="font-semibold text-zinc-400">{{ item.price }}</p>
              <p class="text-zinc-400 text-xs">Tomorrow</p>
            </div>
            <!-- price -->
          </div>
          <div>
            <!-- details -->
            <p class="font-bold text-center text-primary dark:text-primary">
              {{ item.trading_name }}
            </p>
            <p class="text-zinc-500 text-center text-xs">{{ item.address }}</p>
          </div>
          <div>
            <!-- logo -->
            <img
              :src="item.brand_image"
              class="rounded-lg w-[40px] h-[40px] object-contain"
              width="40"
              height="40"
            />
          </div>
        </section>
      </section>
    </main>
  </main>
</template>
