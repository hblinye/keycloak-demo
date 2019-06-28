import Vue from 'vue'
import App from './App.vue'
import Keycloak from 'keycloak-js'
import { store } from './store'

Vue.config.productionTip = false

let initOptions = {
  url: 'http://192.168.99.100:32768/auth',
  realm: 'keycloak-demo',
  clientId: 'frontend-client',
  onLoad:'login-required'
}

export let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) =>{
    console.log(auth)
    if(!auth) {
      window.location.reload();
    } else {
      console.log("Authenticated");
    }

    new Vue({
      store: store,
      render: h => h(App),
    }).$mount('#app')
  
    
    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

}).error(() =>{
  console.log("Authenticated Failed");
});