import OverView from '@/components/Dashboard_Components/main/OverView.vue'
import Search from '@/components/Dashboard_Components/main/Search.vue'
import Pirce_List from '@/components/MapView_Components/main/Pirce_List.vue'
import Site_Detail from '@/components/MapView_Components/main/Site_Detail.vue'
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
      ],
    },
  ],
})

export default router
