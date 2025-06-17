<script setup lang="ts">
import DropDown from '@/components/main_components/Drop-down.vue'
import Search_Result_Card_Loading from '../components/Search_Result_Card_Loading.vue'
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { type fuelwatch_xml } from '../../../../types'
import Search_Result_Card from '../components/Search_Result_Card.vue'

const route = useRoute()
const search_options = reactive({
  Product: '',
  Day: 'Today',
})
const search_results = ref<fuelwatch_xml[]>()
const result_loading = ref<boolean>(false)

const loading_arrays = ref(Array(10).fill(2))
console.log(loading_arrays.value)
async function fetchData() {
  result_loading.value = true
  const response = await axios.post('http://localhost:3000/xml', search_options)
  const data = await response.data

  search_results.value = data
  result_loading.value = false
}

onMounted(() => {
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

    default:
      console.log('unknown fuel type ')
  }

  console.log(search_options)
  fetchData()
})
</script>
<template>
  <main class="bg-background min-h-[100vh] text-primary p-4 flex gap-8 flex-col">
    <div>
      <h1 class="text-3xl font-semibold">Unleaded Fuel Prices</h1>
      <div class="flex space-x-2 text-primary/50 text-sm items-center">
        <p>436 stations found</p>
        <p>Last update: 17 June 2013</p>
      </div>
    </div>

    <!-- price cards -->
    <section class="flex flex-col md:flex-row gap-4">
      <!-- average price -->
      <div class="border w-full p-4 rounded-lg border-border space-y-2">
        <p class="text-lg font-semibold text-primary/60">Average Price</p>
        <p class="text-3xl font-bold">$1.56</p>
        <p class="text-primary/80">Average price across all stations</p>
      </div>

      <!-- best price -->
      <div
        class="border w-full p-4 rounded-lg shadow-lg shadow-green-900 not-dark:shadow-green-100 border-green-500 space-y-2"
      >
        <p class="text-lg font-semibold text-primary/60">Lowest Price</p>
        <p class="text-3xl font-bold">$1.56</p>
        <p class="font-semibold">Burk Mount Lawley</p>

        <p class="text-primary/80">Average price across all stations</p>
      </div>

      <!-- highest price -->
      <div class="border w-full p-4 rounded-lg border-border space-y-2">
        <p class="text-lg font-semibold text-primary/60">Average Price</p>
        <p class="text-3xl font-bold">$1.56</p>
        <p class="font-semibold">Burk Mount Lawley</p>
        <p class="text-primary/80">Average price across all stations</p>
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
                :dropdown-options="['Today', 'Yesterday', 'Tomorrow']"
                default_option="Today"
              ></DropDown>
            </div>
            <div class="w-[120px]">
              <DropDown
                :dropdown-options="['Low-High', 'High-Low']"
                default_option="Low-High"
              ></DropDown>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="result_loading" class="flex flex-col gap-4">
      <section v-for="(item, index) in loading_arrays" :key="index">
        <Search_Result_Card_Loading></Search_Result_Card_Loading>
      </section>
    </div>

    <!-- results -->
    <div v-else class="flex flex-col gap-4">
      <div v-for="(station, index) in search_results" :key="index" class="">
        <Search_Result_Card :station="station"></Search_Result_Card>
      </div>
    </div>
  </main>
</template>
