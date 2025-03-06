import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/MapView.vue'
import Pirce_List from '@/components/MapView_Components/Pirce_List.vue'
import Site_Detail from '@/components/MapView_Components/Site_Detail.vue'
import Dashboard_View from '@/views/Dashboard_View.vue'
import Overview from '@/components/Dashboard_Components/OverView.vue'

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
          component: Overview,
          name: 'Dashboard Overview',
        },
      ],
    },
  ],
})

export default router
