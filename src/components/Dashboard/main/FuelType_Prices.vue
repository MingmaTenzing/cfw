<script setup lang="ts">
import DropDown from '@/components/main_components/Drop-down.vue'
import Search_Result_Card_Loading from '../components/Search_Result_Card_Loading.vue'
import axios, { AxiosError } from 'axios'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { type fuelwatch_xml } from '../../../../types'
import Search_Result_Card from '../components/Search_Result_Card.vue'

const date = new Date()

const current_date = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate(),
}

const route = useRoute()
const search_options = reactive({
  Product: '',
  Day: 'Today',
})

const no_data_found = ref<boolean>(false)

const average_fuel_price = ref()
const search_results = ref<fuelwatch_xml[]>()
const result_loading = ref<boolean>(false)

const loading_arrays = ref(Array(10).fill(2))

const lowest_priced_station = ref<fuelwatch_xml>()
const highest_priced_station = ref<fuelwatch_xml>()

async function fetchData() {
  let fuelType = route.params.fueltype

  switch (fuelType) {
    case 'unleaded':
      search_options.Product = '1'
      break

    case 'premium unleaded':
      search_options.Product = '2'
      break
    case 'diesel':
      search_options.Product = '4'
      break

    case 'lpg':
      search_options.Product = '5'
      break

    case '98 ron':
      search_options.Product = '6'
      break

    case 'e85':
      search_options.Product = '10'
      break

    case 'Brand Diesel':
      search_options.Product = '11'
      break
  }

  try {
    no_data_found.value = false
    result_loading.value = true
    const response = await axios.post('https://fuelwatchapi-1.onrender.com/xml', search_options)
    const data = await response.data

    search_results.value = data
    result_loading.value = false
    if (search_results.value) {
      let fuel_average =
        search_results.value?.reduce((acc, current) => current.price + acc, 0) /
        search_results.value.length

      average_fuel_price.value = (fuel_average / 100).toFixed(2)
      lowest_priced_station.value = search_results.value[0]
      highest_priced_station.value = search_results.value[search_results.value.length - 1]
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status == 404) {
        return (no_data_found.value = true)
      }
    }
  }
}

function fetch_by_day(day: string) {
  if (day) {
    search_options.Day = day
  }
  fetchData()
}

function sort_fuel_prices(sortby: string) {
  if (sortby == 'High-Low') {
    search_results.value?.sort((a, b) => b.price - a.price)
  } else {
    search_results.value?.sort((a, b) => a.price - b.price)
  }
}

onMounted(() => {
  fetchData()
})

watch(
  () => route.params.fueltype,
  (route) => {
    fetchData()
  },
)
</script>
<template>
  <main class="bg-background min-h-[100vh] text-primary p-4 flex gap-8 flex-col">
    <div>
      <h1 class="text-3xl uppercase font-semibold">{{ route.params.fueltype }} Prices</h1>
      <div class="flex space-x-2 text-primary/50 text-sm items-center">
        <p>{{ search_results?.length }} stations found</p>
        <p>
          Last update: {{ current_date.year }} / {{ current_date.month }} /{{ current_date.day }}
        </p>
      </div>
    </div>

    <section>
      <!-- price cards -->
      <div v-if="!result_loading" class="flex flex-col md:flex-row gap-4">
        <!-- average price -->
        <div class="border w-full p-4 rounded-lg border-border space-y-2">
          <p class="text-lg font-semibold text-primary/60">Average Price</p>
          <p class="text-3xl font-bold">$ {{ average_fuel_price }}</p>
          <p class="text-primary/80">Average price across all stations</p>
        </div>

        <!-- best price -->
        <div
          v-if="lowest_priced_station"
          class="border w-full p-4 rounded-lg shadow-lg shadow-green-900 not-dark:shadow-green-100 border-green-500 space-y-2"
        >
          <p class="text-lg font-semibold text-primary/60">Lowest Price</p>
          <p class="text-3xl font-bold">${{ (lowest_priced_station.price / 100).toFixed(2) }}</p>
          <div>
            <p class="font-semibold">{{ lowest_priced_station.brand }}</p>
            <p class="font-light text-sm text-primary/60">{{ lowest_priced_station.address }}</p>
          </div>

          <p class="text-primary/80">Lowest price across all stations</p>
        </div>

        <!-- highest price -->
        <div
          v-if="highest_priced_station"
          class="border w-full p-4 rounded-lg border-border space-y-2"
        >
          <p class="text-lg font-semibold text-primary/60">Highest Price</p>

          <p class="text-3xl font-bold">$ {{ (highest_priced_station.price / 100).toFixed(2) }}</p>
          <div class="">
            <p class="font-semibold">{{ highest_priced_station.brand }}</p>
            <p class="font-light text-sm text-primary/60">
              {{ highest_priced_station.address }}
            </p>
          </div>
          <p class="text-primary/80">Most expensive price across all stations</p>
        </div>
      </div>

      <!-- price cards loading -->
      <div v-if="result_loading" class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="border h-[214px] w-full p-4 rounded-lg border-border space-y-2">
            <div class="h-[24px] w-1/4 bg-accent animate-pulse"></div>
            <div class="h-[36px] w-1/5 bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
          </div>
          <div class="border h-[214px] w-full p-4 rounded-lg border-border space-y-2">
            <div class="h-[24px] w-1/4 bg-accent animate-pulse"></div>
            <div class="h-[36px] w-1/5 bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
          </div>
          <div class="border h-[214px] w-full p-4 rounded-lg border-border space-y-2">
            <div class="h-[24px] w-1/4 bg-accent animate-pulse"></div>
            <div class="h-[36px] w-1/5 bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
            <div class="h-[24px] w-full bg-accent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- result header -->

    <section>
      <div class="flex relative justify-between w-[100%]">
        <div>
          <p>Results</p>
        </div>

        <div class="">
          <div class="flex absolute top-0 right-0">
            <div class="w-[120px]">
              <DropDown
                @selected_value="fetch_by_day"
                :dropdown-options="['Today', 'Yesterday', 'Tomorrow']"
                default_option="Today"
              ></DropDown>
            </div>
            <div class="w-[120px]">
              <DropDown
                :dropdown-options="['Low-High', 'High-Low']"
                default_option="Low-High"
                @selected_value="sort_fuel_prices"
              ></DropDown>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- result -->
    <section v-if="!no_data_found" class="flex flex-col gap-4">
      <div v-if="result_loading" v-for="(item, index) in loading_arrays" :key="index">
        <Search_Result_Card_Loading></Search_Result_Card_Loading>
      </div>

      <!-- results -->
      <div v-else class="flex flex-col gap-4">
        <div v-for="(station, index) in search_results" :key="index" class="">
          <Search_Result_Card :station="station"></Search_Result_Card>
        </div>
      </div>
    </section>

    <section v-if="no_data_found">
      <div class="flex justify-center items-center h-[50vh]">
        <p class="text-3xl font-bold">No Result Found</p>
      </div>
    </section>
  </main>
</template>
