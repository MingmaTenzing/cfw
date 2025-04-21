<script lang="ts" setup>
import DropDown from '@/components/main_components/Drop-down.vue'
import { reactive } from 'vue'
import axios from 'axios'
import { fuelBrands, locations, fuelProducts } from '../../../../utils/search_options'
import SearchOptionDropdown from '../components/SearchOptionDropdown.vue'
import type { search_props } from '../../../../types'

// const brands = fuelBrands.map((data) => data.name)
// const regions = locations.map((data) => data.name)

// const product = fuelProducts.map((data) = >)
const search_options = reactive({
  Suburb: '',
  Product: '',
  Region: '',
  Brand: '',
  Day: '',
})

async function apply_search_filters() {
  const response = await axios.post('http://localhost:3000/xml', search_options)
  console.log(response.data)
}

function emitted_fuel_type(value: search_props) {
  search_options.Product = value.id.toString()
}

function emitted_region(value: search_props) {
  search_options.Region = value.id.toString()
}

function emitted_fuel_brand(value: search_props) {
  search_options.Brand = value.id.toString()
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
    {{ search_options }}
    <!-- search results -->
    <section class="space-y-4">
      <p class="text-primary/75">4 stations found</p>

      <div class="p-4 border flex flex-col gap-4 lg:flex-row lg:space-x-20">
        <div class="flex space-x-4 items-center">
          <img src="../../../assets/shell.png" class="w-[40px] h-[40px] object-contain" />
          <div>
            <p class="text-xl font-semibold">Better Choice Como</p>
            <div class="flex space-x-2 items-center text-primary/85 text-sm">
              <i class="pi pi-map-marker"></i>
              <p>25 Preston St, COMO, WA 6152</p>
            </div>
          </div>
        </div>

        <!-- price -->
        <div class="gap-2 flex flex-col md:flex-row md:gap-6 lg:justify-between">
          <div>
            <p class="text-sm font-light">ULP . Today</p>
            <p class="font-bold text-xl">$1.53</p>
          </div>

          <div>
            <p class="text-sm font-light">Brand</p>
            <p class="font-bold text-xl">Costco</p>
          </div>
          <div>
            <p class="text-sm font-light">Address</p>
            <p class="font-bold text-xl">Airport Dr (Cnr Paltridge Rd)</p>
          </div>
          <div>
            <p class="text-sm font-light">Phone</p>
            <p class="font-bold text-xl">0420668774</p>
          </div>
          <div>
            <p class="text-sm font-light">Date</p>
            <p class="font-bold text-xl">12/04/2025</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
