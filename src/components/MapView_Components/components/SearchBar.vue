<script setup lang="ts">
import DropDown from '@/components/main_components/Drop-down.vue'
import { ref } from 'vue'
import { fuel_brands } from '../../../../utils/fuel_brands'
import type { fuel_brand } from '../../../../types'
const fuel_type_options = ref(['ULP', 'PULP', 'Diesel', 'Brand Diesel', 'LPG', '98 RON', 'E85'])

const brands = ref(fuel_brands)

const query_brands = ref<string[]>([])
function openFilterModal() {
  const element = document.getElementById('blur_selector')
  element?.classList.add('blur_background')
}

function isSelected(brand: fuel_brand) {
  return query_brands.value.includes(brand.name)
}

function selected_brands(brand: fuel_brand) {
  const check_brand_exists = query_brands.value.find((site) => brand.name == site)
  if (!check_brand_exists) {
    query_brands.value.push(brand.name)
  }
  console.log(query_brands.value)
  return
}
</script>

<template>
  <section class="p-4 bg-accent w-full md:w-[500px] rounded-lg">
    <div class="flex space-x-2">
      <input
        class="border p-2 py-1 rounded-lg w-full outline-none text-accent-foreground"
        type="text"
        placeholder="Search Sububor or postcode"
      />
      <div class="" v-on:click="openFilterModal()">
        <i class="pi pi-filter p-4 border-border border rounded-lg text-accent-foreground"></i>
      </div>
    </div>

    <!-- <div
      class="p-4 border w-[288px] space-y-4 absolute right-0 bg-background shadow-2xl inset-shadow-accent-foreground"
    >
      <p>Filter</p>

      <div class="space-y-2">
        <p>Region</p>
        <DropDown :dropdown-options="['hello', 'how', 'are', 'your']"></DropDown>
      </div>
    </div> -->

    <div
      class="absolute space-y-4 bottom-[200px] p-6 w-full md:w-[500px] text-card-foreground bg-background"
    >
      <div class="flex justify-between">
        <div></div>
        <p>Filter Options</p>
        <i class="pi pi-times"></i>
      </div>

      <!-- FUEL TYPE dropdown -->
      <div class="space-y-4">
        <p>Fuel Type</p>
        <DropDown
          :default_option="fuel_type_options[0]"
          :dropdown-options="fuel_type_options"
        ></DropDown>
      </div>

      <!-- fuel brands -->
      <div>
        <p>Brand</p>
        <div
          class="space-y-4 h-[400px] overflow-y-scroll grid gap-2 scrollbar-hide grid-cols-2 place-i"
        >
          <div v-for="(brand, index) in brands" :key="index">
            <div
              v-on:click="selected_brands(brand!)"
              class="border p-4 rounded-lg flex justify-between items-center"
            >
              <div class="space-x-2 flex justify-center items-center">
                <img
                  class="w-[34px] h-[34px] object-contain"
                  :src="`https://www.fuelwatch.wa.gov.au/assets/images/${brand?.svgLogoFileName}`"
                  width="34"
                />
                <p class="text-sm lg:text-base font-light">{{ brand?.description }}</p>
              </div>
              <div>
                <i
                  :class="{
                    'pi pi-check-square text-green-700': isSelected(brand!),
                    'pi pi-check-square': !isSelected(brand!),
                  }"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
    </div>
  </section>
</template>
