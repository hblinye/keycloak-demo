import Vue from 'vue'
import Vuex from 'vuex'
import { inventory } from './inventory'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    inventory
  }
});