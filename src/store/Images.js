import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
  namespaced: true,

  state: {
    Items: [],
  },

  getters: {
    Items(state) {
      return state.Items;
    },
  },

  mutations: {
    LlenarItems(state, data) {
      state.Items = data;
    },
  },

  actions: {
    cargarImagenes: async function ({ commit }) {
      try {
        const settings = {
          method: "GET",
        };
        const url = "https://picsum.photos/v2/list?page=2&limit=100";
        const data = await fetch(url, settings);
        const json = await data.json();
        commit("LlenarItems", json);
      } catch (err) {
        console.log(err);
      }
    },
  },

  modules: {},
};
