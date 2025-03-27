<script setup lang="ts">
import DropDown from '@/components/main_components/Drop-down.vue'
import { ref } from 'vue'
import { fuel_brands } from '../../../../utils/fuel_brands'
const fuel_type_options = ref(['ULP', 'PULP', 'Diesel', 'Brand Diesel', 'LPG', '98 RON', 'E85'])

const query_brands = ref<string[]>([])

const toggle_filter = ref<boolean>(false)

function isSelected(brand: string) {
  return query_brands.value.includes(brand)
}

function selected_brands(brand_name: string) {
  const check_brand_exists = query_brands.value.find((site) => brand_name == site)
  if (!check_brand_exists) {
    query_brands.value.push(brand_name)
  } else {
    query_brands.value = query_brands.value.filter((site) => brand_name != site)
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
      <div class="" v-on:click="toggle_filter = !toggle_filter">
        <i class="pi pi-filter p-4 border-border border rounded-lg text-accent-foreground"></i>
      </div>
    </div>

    <!-- filter modal -->
    <Transition name="filter_transition">
      <div
        v-if="toggle_filter"
        class="absolute left-1/2 -translate-x-1/2 md:bottom-[100px] space-y-4 bottom-0 p-6 w-full md:w-[500px] text-card-foreground bg-background"
      >
        <div class="flex justify-between">
          <div></div>
          <p class="font-bold text-lg md:text-xl">Filter Options</p>
          <div v-on:click="toggle_filter = !toggle_filter">
            <i class="pi pi-times"></i>
          </div>
        </div>

        <!-- FUEL TYPE dropdown -->
        <div class="space-y-2">
          <p class="font-semibold">Fuel Type</p>
          <DropDown
            :default_option="fuel_type_options[0]"
            :dropdown-options="fuel_type_options"
          ></DropDown>
        </div>

        <!-- fuel brands -->
        <div class="space-y-2">
          <p class="font-semibold">Brand</p>
          <div
            class="space-y-4 h-[280px] overflow-y-scroll grid gap-2 scrollbar-hide grid-cols-2 place-i"
          >
            <div v-for="(brand, index) in fuel_brands" :key="index">
              <div
                v-on:click="selected_brands(brand?.name || '')"
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
                      'pi pi-check-square text-green-700 transition-all ease-linear': isSelected(
                        brand?.name || '',
                      ),
                      'pi pi-check-square transition-all ease-linear': !isSelected(
                        brand?.name || '',
                      ),
                    }"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- apply filter button -->

        <div class="justify-between flex">
          <button class="border px-6 py-2 rounded-lg font-semibold">Clear All</button>
          <button class="border px-6 py-2 rounded-lg font-semibold bg-foreground text-background">
            Apply Filter
          </button>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style>
.filter_transition-enter-active,
.filter_transition-leave-active {
  transition: all 0.3s ease-in-out;
}
.filter_transition-enter-from {
  transform: scale(0);
  opacity: 0;
}
.filter_transition-leave-to {
  opacity: 0;
}
</style>
