import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import ErrorPage from './views/ErrorPage.vue'
import Inventory from './views/inventory/Inventory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/inventory',
    component: Inventory
  },
  {
    path: '/*',
    name: 'error',
    component: ErrorPage
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes: routes
})