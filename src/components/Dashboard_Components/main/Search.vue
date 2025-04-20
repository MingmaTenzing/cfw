<script lang="ts" setup>
import DropDown from '@/components/main_components/Drop-down.vue'
import { fuel_brands } from '../../../../utils/fuel_brands'
import { reactive } from 'vue'

const regions = [
  'Metro: North of River',
  'Metro: South of River',
  'Metro: East/Hills',
  'Albany',
  'Augusta / Margaret River',
  'Bridgetown / Greenbushes',
  'Boulder',
  'Broome',
  'Bunbury',
  'Busselton (Townsite)',
  'Busselton (Shire)',
  'Capel',
  'Carnarvon',
  'Cataby',
  'Collie',
  'Coolgardie',
  'Cunderdin',
  'Donnybrook / Balingup',
  'Dalwallinu',
  'Dampier',
  'Dardanup',
  'Denmark',
  'Derby',
  'Dongara',
  'Esperance',
  'Exmouth',
  'Fitzroy Crossing',
  'Geraldton',
  'Greenough',
  'Harvey',
  'Jurien',
  'Kalgoorlie',
  'Kambalda',
  'Karratha',
  'Kellerberrin',
  'Kojonup',
  'Kununurra',
  'Mandurah',
  'Manjimup',
  'Meckering',
  'Meekatharra',
  'Moora',
  'Mount Barker',
  'Munglinup',
  'Murray',
  'Narrogin',
  'Newman',
  'Norseman',
  'North Bannister',
  'Northam',
  'Northam (Shire)',
  'Port Hedland',
  'Ravensthorpe',
  'Regans Ford',
  'South Hedland',
  'Tammin',
  'Waroona',
  'Williams',
  'Wubin',
  'Wundowie',
  'York',
]

const brands = fuel_brands.map((data) => data.name)

const search_options = reactive({
  suburb: '',
  fuelType: '',
  region: '',
  fuel_brand: '',
  day: '',
})

function apply_search_filters() {}

function emitted_fuel_type(value: string) {
  search_options.fuelType = value
}

function emitted_region(value: string) {
  search_options.region = value
}

function emitted_fuel_brand(value: string) {
  search_options.fuel_brand = value
}

function emitted_day(value: string) {
  search_options.day = value
}
</script>
<template>
  <main
    class="bg-background text-primary p-4 min-h-[100vh] space-y-20 xl:w-[1200px] 2xl:w-[1600px] m-auto"
  >
    <!-- search input and filters -->
    <section class="border p-4 rounded-lg">
      <form v-on:submit="apply_search_filters" class="space-y-4">
        <!-- suburb -->
        <div class="gap-2 flex flex-col w-full">
          <p class="text-sm">Suburb</p>
          <input
            v-model="search_options.suburb"
            class="border-border outline-none border w-full py-2 px-2 text-sm rounded-lg"
            placeholder="Suburb"
          />
        </div>

        <!-- fueltype -->
        <div class="gap-2 flex flex-col w-full">
          <p class="text-sm">Fuel Type</p>
          <DropDown
            @selected_value="emitted_fuel_type"
            default_option="ULP"
            :dropdown-options="['ULP', 'PUP', 'DSL', '98RON']"
          ></DropDown>
        </div>

        <!-- region -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Region</p>
          <DropDown
            :default_option="regions[0]"
            @selected_value="emitted_region"
            :dropdown-options="regions"
          ></DropDown>
        </div>

        <!-- fuelbrand -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Fuel Brand</p>
          <DropDown
            :default_option="brands[0]"
            @selected_value="emitted_fuel_brand"
            :dropdown-options="brands"
          ></DropDown>
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
