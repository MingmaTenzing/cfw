<script lang="ts" setup>
import DropDown from '@/components/main_components/Drop-down.vue'
import { fuel_brands } from '../../../../utils/fuel_brands'

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
</script>
<template>
  <main class="bg-background text-primary p-4 min-h-[100vh]">
    <!-- search input and filters -->
    <section class="border p-4 rounded-lg">
      <form class="space-y-4">
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Suburb</p>
          <input
            class="border-border outline-none border w-full py-2 px-2 text-sm rounded-lg"
            placeholder="Suburb"
          />
        </div>
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Fuel Type</p>
          <DropDown
            default_option="ULP"
            :dropdown-options="['ULP', 'PUP', 'DSL', '98RON']"
          ></DropDown>
        </div>

        <!-- region -->
        <div class="gap-2 flex flex-col">
          <p class="text-sm">Region</p>
          <DropDown :default_option="regions[0]" :dropdown-options="regions"></DropDown>
        </div>

        <div class="gap-2 flex flex-col">
          <p class="text-sm">Fuel Brand</p>
          <DropDown :default_option="brands[0]" :dropdown-options="brands"></DropDown>
        </div>

        <div class="gap-2 flex flex-col">
          <p class="text-sm">Day</p>
          <DropDown
            default_option="Today"
            :dropdown-options="['Today', 'Tomorrow', 'Yesterday']"
          ></DropDown>
        </div>

        <div
          class="bg-foreground text-secondary flex justify-center items-center gap-4 py-3 rounded-lg"
        >
          <i class="pi-filter pi"> </i>
          <button>Search</button>
        </div>
      </form>
    </section>

    <!-- search results -->
    <section>
      <p>4 stations found</p>

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
        <div class="gap-2 flex flex-col md:flex-row md:gap-6 lg:gap-14">
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

          <div></div>
        </div>
      </div>
    </section>
  </main>
</template>
