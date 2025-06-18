import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { type googlePolyline_options, type latlng, type map_view_search_query } from '../../types'

export const maps_polyline_store = defineStore('maps_polyline', () => {
  const navigation_route = ref<googlePolyline_options>({
    path: [],
    geodesic: true,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 5,
  })

  function update_polyline(polyLine_path: latlng[]) {
    navigation_route.value = {
      path: polyLine_path,
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    }
  }

  function remove_polyline() {
    navigation_route.value = {
      path: [],
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    }
  }
  return { navigation_route, remove_polyline, update_polyline }
})
