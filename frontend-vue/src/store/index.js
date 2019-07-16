import Vue from 'vue'
import Vuex from 'vuex'
import { RestApi } from '../apis/api'
import { apiUrls } from '../resources/urls'
import { keycloak } from '../main'
import { Inventory } from '../models/inventory'

Vue.use(Vuex);
const state = {
  info: null,
  selectedInfo: null
}

const getters = {
    getInfo(state) {
      return state.info;
    },
    getSelectedInfo(state) {
      return state.selectedInfo
    }
}

const mutations = {
    setInfo(state, info) {
      state.info = info
    },
    selectInfo(state, info) {
      state.selectedInfo = info
    }
}

const actions = {
  fetchInfo (context) {
    keycloak.updateToken(30).success(() => {
      new RestApi(apiUrls['demo'], Inventory).list(keycloak.token).then((result)=>{
        context.commit('setInfo', result);
      })
    })
  },
  saveInventory (context, inventory) {
    keycloak.updateToken(30).success(() => {
      new RestApi(apiUrls['demo'], Inventory).save(inventory, keycloak.token).then((result)=>{
        context.commit('selectInfo', result)
      })
    })
  },
  deleteInventory ({}, inventory) {
    keycloak.updateToken(30).success(() => {
      new RestApi(apiUrls['demo'], Inventory).delete(inventory, keycloak.token).then((result)=>{
        console.log('deleted', result)
      })
    })
  },
  selectInventory (context, inventory) {
    context.commit('selectInfo', inventory)
  }
}

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});