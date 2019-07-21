import { RestApi } from '../../apis/api'
import { apiUrls } from '../../resources/urls'
import { Inventory } from '../../models/inventory'

const state = {
  restApi: new RestApi(apiUrls.demo, Inventory),
  allInventories: null
}

const getters = {
  list (state) {
    return state.allInventories
  }
}

const mutations = {
  updateAll (state, inventories) {
    state.allInventories = inventories
  }
}

const actions = {
  async load ({ state, commit }) {
    const allInventories = await state.restApi.list()
    commit('updateAll', allInventories)
  },
  async save({ state, dispatch }, inventory) {
    await state.restApi.save(inventory)
    inventory.reset()
    dispatch('load')
  },
  async destroy({ state, dispatch }, inventory) {
    await state.restApi.delete(inventory)
    dispatch('load')
  }
}

export const inventory = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}