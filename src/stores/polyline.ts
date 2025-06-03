import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { type googlePolyline_options, type latlng, type map_view_search_query } from '../../types'

export const maps_polyline = defineStore('maps_polyline', () => {
  const navigation_route = ref<googlePolyline_options>({
    path: [],
    geodesic: true,
    strokeColor: '#ff0000',
    strokeOpacity: 1.0,
    strokeWeight: 5,
  })

  function update_polyline(polyLine_path: latlng[]) {
    let new_navigation_route = ref<googlePolyline_options>({
      path: polyLine_path,
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    })
    navigation_route.value = new_navigation_route.value
  }

  function remove_polyline() {
    let empty_route = ref<googlePolyline_options>({
      path: [],
      geodesic: true,
      strokeColor: '#ff0000',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    })

    navigation_route.value = empty_route.value
  }
  return { navigation_route, remove_polyline, update_polyline }
})
