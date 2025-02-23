<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import type { fuel_detail_item } from '../../types'
import { fuel_data_parser } from '../../utils/fuel_data_parser'

const fuelData = ref<fuel_detail_item[]>([])

onMounted(async () => {
  const response = await axios.get('fuelwatch/fuelWatchRSS')
  const xmlText = await response.data
  const parser = new DOMParser()

  const xmlDoc = parser.parseFromString(xmlText, 'text/xml')

  const items = [...xmlDoc.getElementsByTagName('item')]
  // console.log(items)

  //   // console.log(items)

  fuelData.value = fuel_data_parser(items)
  console.log(fuelData.value)
})
</script>

<template>
  <main class="bg-zinc-950 text-white w-full h-full md:w-[412px]">
    <div class="p-2 flex justify-center">
      <img src="../assets/cfw_white_logo.png" width="160" height="60" />
    </div>
    <!-- header -->
    <div class="text-sm md:text-base border-zinc-600 border-t border-b">
      <div class="p-4 text-center">
        <p class="text-xs">
          ULP prices from 6am <span class="bg-zinc-500 text-white px-2 rounded-lg">Today</span> and
          <span class="bg-zinc-700 text-white px-2 rounded-lg">Tomorrow</span>
        </p>
      </div>
    </div>

    <div class="p-4 border-b border-zinc-600">
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
          class="border-b border-t border-zinc-800 p-4 hover:bg-zinc-900 flex justify-between items-center"
        >
          <div class="space-y-2">
            <!-- price -->
            <div>
              <p class="font-semibold">{{ item.price }}</p>
              <p class="text-zinc-200 text-xs">Today</p>
            </div>
            <div>
              <p class="font-semibold text-zinc-400">{{ item.price }}</p>
              <p class="text-zinc-400 text-xs">Tomorrow</p>
            </div>
            <!-- price -->
          </div>
          <div>
            <!-- details -->
            <p class="font-bold">{{ item.trading_name }}</p>
            <p class="text-zinc-500">{{ item.address }}</p>
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
