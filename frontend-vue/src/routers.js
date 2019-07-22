import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import ErrorPage from './views/ErrorPage.vue'
import Inventory from './views/Inventory.vue'
import { InventoryEdit, InventoryIndex, InventoryNew, InventoryShow } from './views/inventory/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
    children: [
      {
        path: '/',
        name: 'inventory_index',
        component: InventoryIndex
      },
      {
        path: 'new/',
        name: 'inventory_new',
        component: InventoryNew
      },
      {
        path: ':id/',
        name: 'inventory_show',
        component: InventoryShow
      },
      {
        path: ':id/edit',
        name: 'inventory_edit',
        component: InventoryEdit
      }
    ]
  },
  {
    path: '/*',
    name: 'error',
    component: ErrorPage
  }
]

export const router = new VueRouter({
  mode: 'hash',
  routes: routes
})