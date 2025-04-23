<script lang="ts" setup>
import DropDown from '@/components/main_components/Drop-down.vue'
import { computed, reactive, ref } from 'vue'
import axios from 'axios'
import { fuelBrands, locations, fuelProducts } from '../../../../utils/search_options'
import SearchOptionDropdown from '../components/SearchOptionDropdown.vue'
import type { fuelwatch_xml, search_props } from '../../../../types'
import Search_Result_Card from '../components/Search_Result_Card.vue'

// const brands = fuelBrands.map((data) => data.name)
// const regions = locations.map((data) => data.name)

// const product = fuelProducts.map((data) = >)

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

async function apply_search_filters() {
  console.log(show_search_options)
  const response = await axios.post('http://localhost:3000/xml', api_search_option.value)
  search_results.value = response.data
}

function emitted_fuel_type(value: search_props) {
  search_options.Product = value
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
    class="bg-background text-primary p-4 min-h-[100vh] space-y-20 xl:w-[1200px] 2xl:w-[1600px] m-auto"
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
            :default_option="fuelProducts[0]"
            :dropdown-options="fuelProducts"
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
            default_option="Today"
            @selected_value="emitted_day"
            :dropdown-options="['Today', 'Tomorrow', 'Yesterday']"
          ></DropDown>
        </div>

        <button
          type="submit"
          class="bg-foreground text-secondary flex justify-center items-center gap-4 py-3 rounded-lg w-full"
        >
          <i class="pi-filter pi"> </i>
          <p>Search</p>
        </button>
      </form>
    </section>

    <!-- search options show cards -->

    <section class="space-y-2">
      <p class="">Filters</p>
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
    <section class="space-y-4">
      <p class="text-primary/75">{{ search_results?.length }} stations found</p>

      <div v-for="(item, index) in search_results" :key="index">
        <Search_Result_Card :station="item"></Search_Result_Card>
      </div>
    </section>
  </main>
</template>
