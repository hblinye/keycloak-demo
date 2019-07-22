import { RestApi } from '../../apis/api'
import { apiUrls } from '../../resources/urls'
import { Inventory } from '../../models/inventory'
import { router } from '../../routers'

const state = {
  api: new RestApi(apiUrls.demo, Inventory),
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
    const allInventories = await state.api.list()
    commit('updateAll', allInventories)
  },
  async save({ state }, inventory) {
    const result = await state.api.save(inventory)
    router.push({name: 'inventory_show', params: { id: result.id }})
    inventory.reset()
  },
  async destroy({ state }, inventory) {
    await state.api.delete(inventory)
    router.push({name: 'inventory_index'})
  },
  async getDetail({ state }, id) {
    const detail = await state.api.show(new Inventory(id))
    return detail
  }
}

export const inventory = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}