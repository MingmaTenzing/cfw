<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import {
  type apply_filter_boolean_context,
  type FuelStation,
  type map_view_search_query,
  type queryFilter_context,
} from '../../../../types'
import axios from 'axios'
import type { map_props } from '../../../../utils/map_props'
import { useRouter } from 'vue-router'
import PriceList_Loading from '../components/Price-List_Loading.vue'
import { map_view_search_filter } from '@/stores/search_filter'

const fuelData = ref<FuelStation[]>([])

const loading = ref<boolean>(false)

// assigned a random length 10 array to loop in the template for loading skeleton

const router = useRouter()
// inject the map_center to redirect to the site when clicked
const { update_center } = inject<map_props>('map_center', {
  center: { lat: -31.953512, lng: 115.857048 },
  update_center: () => undefined,
})

const { is_apply_search_filter, toggle_apply_filter } =
  inject<apply_filter_boolean_context>('toogle_apply_filter')!

const search_details_store = map_view_search_filter()

function go_to_site(site: FuelStation) {
  update_center(site.address.latitude, site.address.longitude)
  router.push(`/sites/${site.id}`)

}

async function initial_data_fetch() {
  loading.value = true
  const response = await axios.get<FuelStation[]>('http://localhost:3000')

  fuelData.value = response.data
  loading.value = false
}

async function search_fetch_data(search_filters: map_view_search_query) {
  loading.value = true
  const response = await axios.post<FuelStation[]>(`http://localhost:3000/search`, search_filters)
  fuelData.value = response.data
  loading.value = false
}

onMounted(async () => {
  initial_data_fetch()
})

watch(is_apply_search_filter, (newvalue) => {
  console.log(newvalue)

  search_fetch_data(search_details_store.search_details)
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

  <section class="overflow-y-scroll h-full scrollbar-hide">
    <section>
      <!-- prices today list -->
      <div v-if="!loading">
        <section
          v-for="item in fuelData"
          v-bind:key="item.id"
          id="price-list-item"
          class="border-b border-t border-border dark:border-border p-4 hover:bg-secondary"
        >
          <div v-on:click="go_to_site(item)" class="flex justify-between items-center h-[94px]">
            <div class="space-y-2">
              <!-- price -->
              <div>
                <p class="font-semibold xl:text-lg text-center">{{ item.product.priceToday }}</p>
                <p
                  class="text-secondary-foreground text-center dark:text-secondary-foreground text-xs xl:text-sm"
                >
                  Today
                </p>
              </div>
              <div v-if="item.product.priceTomorrow">
                <p class="font-semibold text-muted-foreground text-center xl:text-lg">
                  {{ item.product.priceTomorrow }}
                </p>
                <p class="text-muted-foreground text-center text-xs xl:text-sm">Tomorrow</p>
              </div>

              <!-- price -->
            </div>
            <div class="space-y-1">
              <!-- details -->
              <p class="font-bold text-center text-primary dark:text-primary lg:text-lg">
                {{ item.siteName }}
              </p>
              <p class="text-zinc-500 text-center text-xs lg:text-sm">
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
      </div>

      <!-- loading -->
      <div v-else>
        <PriceList_Loading></PriceList_Loading>
      </div>
    </section>
  </section>
</template>
