import { createRouter, createWebHistory } from 'vue-router'
import routes from '/@router/routes.js'

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})
