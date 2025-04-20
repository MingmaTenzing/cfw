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
  <main class="bg-background text-primary p-4">
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
        <div>
          <p>Region</p>
          <p>All Region</p>
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
  </main>
</template>
