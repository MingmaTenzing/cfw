import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { map_view_search_query } from '../../types'

export const maps_polyline = defineStore('maps_polyline', () => {
  const decoded_polyline_path = ref<google.maps.LatLng[]>([])

  function update_polyline(polyLine_path: google.maps.LatLng[]) {
    decoded_polyline_path.value = polyLine_path
  }
  return { decoded_polyline_path, update_polyline }
})
