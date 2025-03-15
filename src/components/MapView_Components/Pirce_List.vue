<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { type FuelStation } from '../../../types'
import axios from 'axios'
import { fuel_brands } from '../../../utils/fuel_brands'
import type { map_props } from '../../../utils/map_props'
import { useRouter } from 'vue-router'

const fuelData = ref<FuelStation[]>([])

const loading = ref<boolean>(false)

// assigned a random length 10 array to loop in the template for loading skeleton

const random_loading_Array = ref<Number[]>([...Array(10)].map((number) => Math.random()*40))


const router = useRouter()
// inject the map_center to redirect to the site when clicked
const { update_center } = inject<map_props>('map_center', {
  center: { lat: -31.953512, lng: 115.857048 },
  update_center: () => undefined,
})

function go_to_site(site: FuelStation) {
  update_center(site.address.latitude, site.address.longitude)
  router.push(`/sites/${site.id}`)
}

onMounted(async () => {
  loading.value = true
  const response = await axios.get<FuelStation[]>(
    'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP',
  )

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
  loading.value = false
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

      <section v-if="!loading"
        v-for="item in fuelData"
        v-bind:key="item.id"
        id="price-list-item"
        class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary"
      >
        <div v-on:click="go_to_site(item)" class="flex justify-between items-center h-[94px]">
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
        </div>
      </section>

      <!-- loading -->
         <section  v-else
     v-for="(item, index) in random_loading_Array" :key="index"
        id="price-list-item"
        class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary"
      >
        <div  class="flex justify-between items-center h-[94px]">
          <div class="space-y-2">
            <!-- price -->

              <div class="font-semibold text-center bg-accent animate-pulse rounded-lg w-[36px] h-[24px]"></div>
              <div
                class="text-secondary-foreground text-center dark:text-secondary-foreground text-xs w-[36px] h-[16px] bg-accent animate-pulse rounded-lg"
              >


            </div>

          </div>
          <div class="space-y-2">
            <!-- details -->
            <div class=" w-[178.2px] h-[24px] bg-accent animate-pulse rounded-lg font-bold text-center text-primary dark:text-primary">
              {{ }}
            </div>
            <div class="w-[178.2px] h-[16px] bg-accent animate-pulse rounded-lg  text-zinc-500 text-center text-xs">

            </div>
          </div>
          <div>
            <!-- logo -->
            <div class=" w-[40px] h-[40px] bg-accent animate-pulse rounded-lg">

            </div>


          </div>
        </div>
      </section>

    </section>
  </section>
</template>
