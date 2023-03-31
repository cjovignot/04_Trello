import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Lists from '../components/Lists.vue'
import card from '../views/Card.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/card/:id',
      name: 'card',
      component: card
    },

    {
      path: '/lists',
      name: 'Lists',
      component: Lists
    }
  ]
})

export default router
