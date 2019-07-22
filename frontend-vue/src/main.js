import Vue from 'vue'
import App from './App.vue'
import { router } from './routers'
import Keycloak from 'keycloak-js'
import { store } from './store'
import InventoryForm from './components/inventory/Form.vue'


Vue.config.productionTip = false

let initOptions = {
  url: 'http://192.168.99.100:32768/auth',
  realm: 'keycloak-demo',
  clientId: 'frontend-client'
}

export let keycloak = Keycloak(initOptions)

keycloak.init({ onLoad:'login-required' }).success((auth) => {
    if(!auth) {
      window.location.reload();
    }

    Vue.component('inventory-form', InventoryForm)

    new Vue({
      store: store,
      router,
      render: h => h(App),
    }).$mount('#app')

    console.log(keycloak)

}).error(() =>{
  window.location.reload()
})