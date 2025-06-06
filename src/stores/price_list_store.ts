import { defineStore } from 'pinia'
import type { FuelStation } from '../../types'
import { ref } from 'vue'

export const fuel_prices_store = defineStore('maps_polyline', () => {
  const fuel_prices_list = ref<FuelStation[]>([])

  function update_fuel_prices_list(data: FuelStation[]) {
    fuel_prices_list.value = data
  }

  return { fuel_prices_list, update_fuel_prices_list }
})
