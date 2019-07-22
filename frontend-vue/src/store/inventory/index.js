import { RestApi } from '../../apis/api'
import { apiUrls } from '../../resources/urls'
import { Inventory } from '../../models/inventory'
import { router } from '../../routers'

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
  async save({ state }, inventory) {
    const result = await state.restApi.save(inventory)
    router.push({name: 'inventory_show', params: { id: result.id }})
    inventory.reset()
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