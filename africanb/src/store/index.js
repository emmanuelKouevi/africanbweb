import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAuthentified: {
      compagnieTransportId: null,
      compagnieTransportRaisonSociale: null,
      gareDesignation: null,
      email: null,
      login: null,
      nom: null,
      prenoms: null,
      lastConnection: null,
      roleCode: null,
      roleLibelle: null,
      token: null,
    },

    ticket: {},

    isAuthentified: false,

    pictureProfilUser: null,
  },

  getters: {},

  mutations: {
    STORE_TICKET(state, data) {
      state.ticket = data;
    },

    LOGIN_USER(state) {
      state.isAuthentified = true;
    },

    UPDATE_USER_PROFIL(state, data) {
      state.userAuthentified = data;
    },

    SET_USER_AUTHENTIFIED(state, data) {
      state.userAuthentified = data;
    },

    DESTROY_SESSION_USER(state) {
      state.isAuthentified = false;
      state.userAuthentified = {};
    },

    UPDATE_PICTURE_PROFIL(state, data) {
      state.pictureProfilUser = data;
    },
  },
  actions: {},
  modules: {},
});
