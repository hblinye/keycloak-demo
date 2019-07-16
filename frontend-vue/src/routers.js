import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ErrorVue from './components/ErrorVue.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HelloWorld
  }, {
    path: '/error',
    name: 'error',
    component: ErrorVue
  }
]

export const router = new VueRouter({
  mode: 'history',
  routes: routes
})