<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'

import { useRoute } from 'vue-router'
import { type FuelStation, type fuelwatch_site_details, type site_details } from '../../../types'

const route = useRoute()
const site_id = ref(route.params.id)
const show_trading_hours = ref<boolean>(false)
const show_station_features = ref<boolean>(false)
const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
const months = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
])

const site_details = ref<site_details>()
const site_price_details = ref<FuelStation>()

async function fetch_station_price_and_details(id: string | string[]) {
  const response = await axios.get<fuelwatch_site_details>(`http://localhost:3000/site/${id}`)
  console.log(response.data.site_price_details)
  site_price_details.value = response.data.site_price_details[0]
  site_details.value = response.data.site_details
}

onMounted(() => {
  fetch_station_price_and_details(site_id.value)
})

watch(
  () => route.params.id,

  (new_station_id) => {
    fetch_station_price_and_details(new_station_id)
  },
)
</script>

<template class="">
  <main class="overflow-y-scroll h-[100%] scrollbar-hide">
    <div class="border-b border-border p-4 space-y-6">
      <!-- back button -->

      <router-link to="/sites" class="flex items-center space-x-2 text-sm">
        <i class="pi pi-arrow-left"></i>
        <p>Back</p>
      </router-link>

      <!-- trading name and image -->
      <div class="">
        <p v-if="site_details" class="font-semibold text-3xl text-center text-primary">
          {{ site_details.client.tradingName }}
        </p>
        <!-- loading name -->
        <div v-else class="h-[36px] w-[60%] m-auto bg-accent rounded-lg animate-pulse"></div>
      </div>
    </div>
    <!-- address -->

    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-map-marker"></i>
      <p v-if="site_details" class="font-light text-sm text-secondary-foreground">
        {{ site_details.address.line1 }}, {{ site_details.address.location }}
      </p>
      <div v-else class="w-[216px] h-[20px] rounded-lg bg-accent animate-pulse"></div>
    </div>

    <!-- phone number -->
    <div class="border-b border-border p-4 flex gap-2 items-center">
      <i class="pi pi-phone"></i>
      <p v-if="site_details" class="font-light text-sm text-secondary-foreground">
        {{ site_details.client.clientContactDetails[0].phone }}
      </p>

      <div v-else class="bg-accent w-[98px] h-[20px] rounded-lg animate animate-pulse"></div>
    </div>

    <!-- trading hours -->
    <div class="border-b border-border p-4 text-sm space-y-4">
      <!-- toggle trading hours -->
      <div
        @click="show_trading_hours = !show_trading_hours"
        class="flex justify-between group cursor-pointer"
      >
        <div class="flex gap-2 items-center">
          <i class="pi pi-calendar-clock"></i>
          <p>Trading Hours</p>
        </div>
        <div :class="[show_trading_hours ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>
      <!-- content -->

      <!-- if trades 24 hours -->
      <section v-if="site_price_details?.operates247 == true">
        <Transition name="dropdown">
          <div v-if="show_trading_hours" class="p-2 text-primary font-light text-xs">
            <table class="table-auto">
              <thead class=""></thead>
              <tbody class="space-y-1">
                <tr
                  class="flex justify-between w-[230px]"
                  v-for="(business_days, index) in days"
                  :key="index"
                >
                  <td>{{ business_days }}</td>
                  <td class="">
                    <p>Open 24 hours</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Transition>
      </section>

      <!-- if has specific trading hours -->
      <section v-else class="">
        <Transition name="dropdown">
          <div v-if="show_trading_hours" class="p-2 text-primary font-light text-xs">
            <table class="table-fixed">
              <thead class=""></thead>
              <tbody class="">
                <tr
                  class=""
                  v-for="(business_days, index) in site_details?.tradingHours"
                  :key="index"
                >
                  <td class="text-left py-1">{{ business_days.day }}</td>
                  <td class="text-left pl-10">
                    {{ business_days.startTime }} - {{ business_days.endTime }}
                    <span v-if="business_days.stationClosedForTrading == true">(Closed)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Transition>
      </section>
    </div>

    <!-- boxes with details -->
    <section class="grid grid-cols-2 gap-4 place-content-evenly place-items-center p-4">
      <!-- ulp price -->
      <div
        class="w-[180px] h-[170px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 flex justify-center gap-4 p-4 items-center flex-col bg-card border-border border text-card-foreground rounded-lg"
      >
        <div class="flex items-center gap-1">
          <p class="font-medium text-3xl">ULP</p>
          <img
            src="../../assets/local_gas_station_100dp_000000_FILL0_wght400_GRAD0_opsz48.svg"
            class="dark:invert"
          />
        </div>
        <div v-if="site_details" class="">
          <p class="text-card-foreground text-4xl font-bold">
            ${{ site_price_details?.product.priceToday }}
          </p>
        </div>
        <div v-else class="w-[117px] h-[40px] bg-accent animate-pulse rounded-xl"></div>
      </div>

      <!-- date -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-4 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <div v-if="site_details" class="flex items-center space-x-1">
          <p class="font-extralight">{{ new Date().getFullYear() }}</p>
          <p class="">{{ months[new Date().getMonth()] }}</p>
        </div>
        <div v-else class="w-[80px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div v-if="site_details">
          <p class="font-bold text-4xl">{{ new Date().getDate() }}</p>
          <p class="font-bold text-3xl">{{ days[new Date().getDay()] }}</p>
        </div>
        <div v-else class="w-[40px] h-[14px] bg-accent animate-pulse rounded-xl"></div>
        <div
          v-if="!site_details"
          class="w-[128px] h-[14px] bg-accent animate-pulse rounded-xl"
        ></div>
      </div>

      <!-- brand image -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 p-6 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-card-foreground text-center rounded-lg"
      >
        <img
          v-if="site_details"
          :src="`https://www.fuelwatch.wa.gov.au/assets/images/${site_details.brand.svgLogoFileName}`"
        />
        <div v-else class="w-full h-full bg-accent animate-pulse rounded-xl"></div>
      </div>

      <!-- tommorow's price -->
      <div
        class="w-[180px] hover:scale-110 hover:-translate-y-1 delay-150 transition-transform ease-in-out duration-200 items-center flex flex-col justify-center space-y-2 h-[170px] bg-card border-border border text-muted-foreground text-center rounded-lg"
      >
        <div v-if="site_price_details?.product.priceTomorrow" class="p-4">
          <p class="text-3xl font-bold">{{ site_price_details.product.priceTomorrow }}</p>
          <p class="font-semibold text-lg">Tomorrow's Price</p>
        </div>
        <div v-else class="p-4">
          <p class="font-light text-sm">Tomorrow's price available after 2:30pm</p>
        </div>
      </div>
    </section>

    <!-- station features -->

    <div class="border-b border-border p-4 text-sm space-y-4">
      <!-- toggle station features -->
      <div
        @click="show_station_features = !show_station_features"
        class="flex justify-between group cursor-pointer"
      >
        <div class="flex gap-2 items-center">
          <i class="pi pi-list-check"></i>
          <p>Station Features</p>
        </div>
        <div :class="[show_station_features ? 'rotate-180 transition-all ease-linear ' : '']">
          <i class="pi pi-chevron-down"></i>
        </div>
      </div>

      <section class="">
        <Transition name="dropdown">
          <div v-if="show_station_features" class="p-2 text-primary font-light text-xs">
            <table class="table-auto">
              <thead class=""></thead>
              <tbody class="">
                <tr
                  class="flex justify-between w-[230px] border-b py-2"
                  v-for="(feature, index) in site_details?.features"
                  :key="index"
                >
                  <td>{{ feature.featureName }}</td>
                  <td class="">
                    <div v-if="feature.isAvailable">
                      <i class="pi pi-check text-green-500"></i>
                    </div>
                    <div v-else>
                      <i class="pi pi-times text-destructive"> </i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Transition>
      </section>
    </div>
    <!-- bottom margin to avoid content cutoff -->
    <div class="mb-[100px] h-[40px]"></div>
  </main>
</template>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 200ms ease-in-out;
}

.dropdown-enter-from {
  transform: translateY(-8px);
}
.dropdown-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
