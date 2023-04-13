import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true, 

  state: {
    Items: [],
  },

  getters: {
    Items(state){
      return state.Items;
    }
  },

  mutations: {
    llenarItems(state, data){
      state.Items = data;
    }
  },

  actions: {

    cargarClientes: async function({commit}) {
      try {
          const settings = {
              method: 'GET',
          }
          const url = 'http://localhost:4000/api/clientes';
          const data =  await fetch(url, settings);
          const json =  await data.json();
          commit('llenarItems', json);
      } catch(err) {
          console.log(err);
      }
  },

  agregarClientes: async function({commit, dispatch}, datos) {
    try {
        const settings = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        }
        const url = 'http://localhost:4000/api/clientes';
        const data =  await fetch(url, settings);
        const json =  await data.json();
        dispatch('cargarClientes')
    } catch(err) {
        console.log(err);
    }
  },

  eliminarClientes: async function({commit, dispatch}, datos) {
    try {
        const settings = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos),
        }
        const url = 'http://localhost:4000/api/clientes';
        const data =  await fetch(url, settings);
        const json =  await data.json();
        dispatch('cargarClientes')
    } catch(err) {
        console.log(err);
    }
  }
  },

  modules: {

  }
}
