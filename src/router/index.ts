import OverView from '@/components/Dashboard/main/OverView.vue'
import Search from '@/components/Dashboard/main/Search.vue'
import Unleaded from '@/components/Dashboard/main/Unleaded.vue'
import Get_Direction from '@/components/MapOverview/main/Get_Direction.vue'
import Pirce_List from '@/components/MapOverview/main/Pirce_List.vue'
import Site_Detail from '@/components/MapOverview/main/Site_Detail.vue'
import Dashboard_View from '@/views/Dashboard_View.vue'
import MapView from '@/views/MapView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MapView,
      redirect: 'sites',
      children: [
        {
          path: 'sites',
          component: Pirce_List,
          name: 'Fuel Prices',
        },
        {
          path: 'sites/:id',
          component: Site_Detail,
          name: 'Site Details',
        },
        {
          path: 'sites/get-directions/:address',
          component: Get_Direction,
          name: 'Get Directions',
        },
      ],
    },
    {
      path: '/dashboard',
      component: Dashboard_View,
      name: 'Dashboard',
      children: [
        {
          path: 'overview',
          component: OverView,
          name: 'Dashboard Overview',
        },
        {
          path: 'search',
          component: Search,
          name: 'Search',
        },
        {
          path: 'prices/:fueltype',
          component: Unleaded,
          name: 'Unleaded Fuel',
        },
      ],
    },
  ],
})

export default router
