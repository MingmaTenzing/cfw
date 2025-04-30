<script lang="ts" setup>
import DropDown from '@/components/main_components/Drop-down.vue'
import { computed, reactive, ref, useTemplateRef } from 'vue'
import axios, { AxiosError } from 'axios'
import { fuelBrands, locations, fuelProducts } from '../../../../utils/search_options'
import SearchOptionDropdown from '../components/SearchOptionDropdown.vue'
import type { fuelwatch_xml, search_props } from '../../../../types'
import Search_Result_Card from '../components/Search_Result_Card.vue'
import Search_Result_Card_Loading from '../components/Search_Result_Card_Loading.vue'

// const brands = fuelBrands.map((data) => data.name)
// const regions = locations.map((data) => data.name)

// const product = fuelProducts.map((data) = >)

const search_loading_random_array = Array(10)
  .fill(0)
  .map(() => Math.round(Math.random() * 10))

console.log(search_loading_random_array)

const fuelType = ref(fuelProducts)

const search_options = reactive({
  Suburb: '',
  Product: {
    name: '',
    id: '',
  },
  Region: {
    name: '',
    id: '',
  },
  Brand: {
    name: '',
    id: '',
  },
  Day: '',
})

const show_search_options = computed(() =>
  [
    { label: 'Suburb', value: search_options.Suburb },
    { label: 'Product', value: search_options.Product.name },
    { label: 'Region', value: search_options.Region.name },
    { label: 'Brand', value: search_options.Brand.name },
    { label: 'Day', value: search_options.Day },
  ].filter((option) => option.value !== ''),
)
const api_search_option = computed(() => ({
  Suburb: search_options.Suburb,
  Product: search_options.Product.id,
  Region: search_options.Region.id,
  Brand: search_options.Brand.id,
  Day: search_options.Day,
}))

const search_results = ref<fuelwatch_xml[]>()

const no_stations_found = ref<boolean>(false)

const search_result_loading = ref<boolean>(false)

const show_search_results = ref<boolean>(false)

const search_result_section = useTemplateRef('search_result')
async function apply_search_filters() {
  search_result_section.value?.scrollIntoView({ behavior: 'smooth' })
  try {
    no_stations_found.value = false
    search_result_loading.value = true
    const response = await axios.post('http://localhost:3000/xml', api_search_option.value)
    search_results.value = response.data
    show_search_results.value = true
    if (search_results.value) {
      no_stations_found.value = false
      search_result_loading.value = false
    }
  } catch (error) {
    show_search_results.value = true

    search_result_loading.value = false
    if (error instanceof AxiosError) {
      if (error.status == 404) {
        no_stations_found.value = true
        console.log(no_stations_found.value)
      }
    }
  }
}

function clearFilter_Options() {
  search_options.Suburb = ''
  search_options.Product.name = ''
  search_options.Product.id = ''
  search_options.Region.name = ''
  search_options.Region.id = ''
  search_options.Brand.name = ''
  search_options.Brand.id = ''
  search_options.Day = ''
}

function emitted_fuel_type(value: search_props) {
  if (value) {
    search_options.Product = value
  }
}

function emitted_region(value: search_props) {
  search_options.Region = value
}

function emitted_fuel_brand(value: search_props) {
  search_options.Brand = value
}

function emitted_day(value: string) {
  search_options.Day = value
}
</script>
<template>
  <main
    class="bg-background text-primary p-4 min-h-[100vh] space-y-8 xl:w-[1200px] 2xl:w-[1600px] m-auto"
  >
    <!-- search input and filters -->
    <section class="border p-4 rounded-lg">
      <form v-on:submit.prevent="apply_search_filters" class="space-y-4">
        <!-- Suburb -->
        <div class="gap-2 flex flex-col w-full">
          <p class="text-sm">Suburb</p>
          <input
            v-model="search_options.Suburb"
            class="border-border outline-none border w-full py-2 px-2 text-sm rounded-lg"
            placeholder="Suburb"
          />
        </div>

        <!-- fueltype -->
        <div class="gap-2 flex flex-col w-full">
          <p class="text-sm">Fuel Type</p>
          <SearchOptionDropdown
            @selected_value="emitted_fuel_type"
            :default_option="fuelType[0]"
            :dropdown-options="fuelType"
          ></SearchOptionDropdown>
        </div>

        <!-- region -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Region</p>
          <SearchOptionDropdown
            @selected_value="emitted_region"
            :default_option="locations[0]"
            :dropdown-options="locations"
          ></SearchOptionDropdown>
        </div>

        <!-- fuelbrand -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Fuel Brand</p>
          <SearchOptionDropdown
            @selected_value="emitted_fuel_brand"
            :default_option="fuelBrands[0]"
            :dropdown-options="fuelBrands"
          ></SearchOptionDropdown>
        </div>

        <!-- day -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Day</p>
          <DropDown
            :default_option="search_options.Day"
            @selected_value="emitted_day"
            :dropdown-options="['Today', 'Tomorrow', 'Yesterday']"
          ></DropDown>
        </div>
        <div class="flex items-center gap-4">
          <button
            type="button"
            v-on:click="clearFilter_Options"
            class="bg-accent text-accent-foreground flex justify-center items-center gap-4 py-3 rounded-lg w-full"
          >
            <i class="pi-filter-slash pi"> </i>
            <p>Clear Filter</p>
          </button>
          <button
            type="submit"
            class="bg-foreground text-secondary flex justify-center items-center gap-4 py-3 rounded-lg w-full"
          >
            <i class="pi-filter pi"> </i>
            <p>Search</p>
          </button>
        </div>
      </form>
    </section>

    <!-- search options show cards -->

    <section class="h-[80px]">
      <div class="flex flex-col gap-2 items-start md:flex-row md:items-center">
        <div
          class="border px-4 py-2 rounded-lg text-sm bg-foreground text-primary-foreground"
          v-for="(item, index) in show_search_options"
          :key="index"
        >
          {{ item.label }} : {{ item.value }}
        </div>
      </div>
    </section>

    <!-- search results -->
    <section ref="search_result">
      <div v-if="search_result_loading" class="space-y-4">
        <div v-for="(item, index) in search_loading_random_array" :key="index">
          <Search_Result_Card_Loading></Search_Result_Card_Loading>
        </div>
      </div>

      <section v-if="no_stations_found" class="h-[30vh] flex justify-center items-center">
        <div class="flex justify-center items-center space-x-4 text-2xl font-semibold">
          <i class="pi pi-ban"></i>
          <p>No Fuel Stations Found</p>
        </div>
      </section>
      <section v-else="no_stations_found" class="space-y-4">
        <p class="text-primary/75">{{ search_results?.length }} Stations Found</p>

        <div v-for="(item, index) in search_results" :key="index">
          <Search_Result_Card :station="item"></Search_Result_Card>
        </div>
      </section>
    </section>
  </main>
</template>
