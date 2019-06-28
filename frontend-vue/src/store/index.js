import Vue from 'vue';
import Vuex from 'vuex';
import { RestApi } from '../resources/api';
import { urls } from '../resources/urls';
import { keycloak } from '../main';

Vue.use(Vuex);
const state = {
    info: null
}

const getters = {
    getInfo(state) {
        return state.info;
    }
}

const mutations = {
    setInfo(state, info) {
        state.info = info
        console.log(state.info)
    }
}

const actions = {
    fetchInfo (context) {
        keycloak.updateToken(30).success(() => {
            new RestApi(urls.inventoryInfoApi).list().then((result)=>{
                console.log(result.data)
                context.commit('setInfo', result.data);
            })
        })
    },
    createInventory (context, name) {
        keycloak.updateToken(30).success(() => {
            new RestApi(urls.inventoryInfoApi).save({name: name}).then((result)=>{
                alert("successed")
            }).catch(error => {
                try {
                    alert(JSON.stringify(error.response.data))
                } catch (error) {
                    alert("failured")
                }
            })
        })
    }
}

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});