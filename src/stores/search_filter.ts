import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { map_view_search_query } from '../../types'

export const map_view_search_filter = defineStore('map_view_search_filter', () => {
  const search_details = reactive<map_view_search_query>({
    suburb: '',
    brands: [],
    fuelType: 'ULP',
  })

  function update_search_filter(data: map_view_search_query) {
    ;(search_details.brands = data.brands),
      (search_details.fuelType = data.fuelType),
      (search_details.suburb = data.suburb)
  }

  function clear_search_filter() {
    ;(search_details.brands = []), (search_details.fuelType = 'ULP'), (search_details.suburb = '')
  }

  return { search_details, update_search_filter, clear_search_filter }
})
