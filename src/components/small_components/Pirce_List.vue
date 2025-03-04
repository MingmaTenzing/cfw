<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type FuelStation } from '../../../types'
import axios from 'axios'
import { fuel_brands } from '../../../utils/fuel_brands'

const fuelData = ref<FuelStation[]>([])

onMounted(async () => {
  const response = await axios.get<FuelStation[]>('/fuelwatch/sites')

  const fuel_prices = response.data.map((item) => {
    const find_brand = fuel_brands.find((brand) => brand!.name == item.brandName)
    if (find_brand) {
      return {
        ...item,
        brand_image: 'https://www.fuelwatch.wa.gov.au/assets/images/' + find_brand.svgLogoFileName,
      }
    }
    return item
  })
  fuelData.value = fuel_prices
})
</script>

<template>
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

  <section class="overflow-y-scroll h-full scrollbar-hide">
    <section>
      <!-- prices today list -->

      <section
        v-for="item in fuelData"
        v-bind:key="item.id"
        id="price-list-item"
        class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary"
      >
        <router-link :to="'/sites/' + item.id" class="flex justify-between items-center h-[94px]">
          <div class="space-y-2">
            <!-- price -->
            <div>
              <p class="font-semibold text-center">{{ item.product.priceToday }}</p>
              <p
                class="text-secondary-foreground text-center dark:text-secondary-foreground text-xs"
              >
                Today
              </p>
            </div>
            <div v-if="item.product.priceTomorrow">
              <p class="font-semibold text-muted-foreground text-center">
                {{ item.product.priceTomorrow }}
              </p>
              <p class="text-muted-foreground text-center text-xs">Tomorrow</p>
            </div>

            <!-- price -->
          </div>
          <div>
            <!-- details -->
            <p class="font-bold text-center text-primary dark:text-primary">
              {{ item.siteName }}
            </p>
            <p class="text-zinc-500 text-center text-xs">
              {{ item.address.line1 }}, {{ item.address.location }}
            </p>
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
        </router-link>
      </section>

      <!-- loading -->
    </section>
  </section>
</template>
