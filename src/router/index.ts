import { createRouter, createWebHistory } from 'vue-router'
import MapView from '@/views/MapView.vue'
import Pirce_List from '@/components/small_components/Pirce_List.vue'
import Site_Detail from '@/components/small_components/Site_Detail.vue'

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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
