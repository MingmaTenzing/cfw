<script setup lang="ts">
import DropDown from '@/components/main_components/Drop-down.vue'
import { inject, ref } from 'vue'
import { fuel_brands } from '../../../../utils/fuel_brands'
import { type queryFilter_context, type queryFilterModalContext } from '../../../../types'
const fuel_type_options = ref(['ULP', 'PUP', 'DSL', 'BDL', 'LPG', '98R', 'E85'])

// service injections
const { filter_modal_open_close, toggle_modal } =
  inject<queryFilterModalContext>('search_filter_modal')!

const { search_details, apply_search_filter } =
  inject<queryFilter_context>('map_view_search_filters')!
// ------------------------------------------------------

// options that will be provided to the service
const query_brands = ref<string[]>([])
const fuelType = ref<string>('')
// --------------------------------

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

// this function run when the dropdown child component selects a fueltype
function emmited_value_from_dropdown(selected_option: string) {
  fuelType.value = selected_option
  console.log(fuelType.value)
}

function apply_filter() {
  apply_search_filter({
    fuelType: fuelType.value || 'ULP',
    brands: query_brands.value,
  })
}

function clear_filter() {
  query_brands.value = []
  fuelType.value = 'ULP'
  apply_search_filter({
    fuelType: fuelType.value || 'ULP',
    brands: query_brands.value,
  })
}
</script>

<template>
  <section class="p-4 w-full md:w-[500px] rounded-lg">
    <div class="flex items-center space-x-2">
      <input
        class="border bg-background border-ring/20 py-4 px-4 rounded-xl w-full outline-none text-accent-foreground"
        type="text"
        placeholder="Search Sububor or postcode"
      />
      <div
        class="h-[58px] border border-ring/20 bg-background p-4 rounded-xl"
        v-on:click="toggle_modal"
      >
        <i class="pi pi-filter text-accent-foreground"></i>
      </div>
    </div>

    <!-- filter modal -->
    <Transition name="filter_transition">
      <div
        v-if="filter_modal_open_close"
        class="absolute left-1/2 -translate-x-1/2 md:bottom-[100px] space-y-4 bottom-0 p-6 w-full md:w-[500px] text-card-foreground bg-background"
      >
        <div class="flex justify-between">
          <div></div>
          <p class="font-bold text-lg md:text-xl">Filter Options</p>
          <div v-on:click="toggle_modal">
            <i class="pi pi-times"></i>
          </div>
        </div>

        <!-- FUEL TYPE dropdown -->
        <div class="space-y-2">
          <p class="font-semibold">Fuel Type</p>
          <DropDown
            :default_option="fuel_type_options[0]"
            :dropdown-options="fuel_type_options"
            @selected_fuelType="emmited_value_from_dropdown"
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

        <!-- test -->

        <div>
          {{ search_details.fuelType }}
          <div v-for="(sites, index) in search_details.brands" :key="index">
            {{ sites }}
          </div>
        </div>
        <!-- apply filter button -->

        <div class="justify-between flex">
          <button v-on:click="clear_filter()" class="border px-6 py-2 rounded-lg font-semibold">
            Clear All
          </button>
          <button
            v-on:click="apply_filter()"
            class="border px-6 py-2 rounded-lg font-semibold bg-foreground text-background"
          >
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
