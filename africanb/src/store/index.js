import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAuthentified : {
      compagnieTransportId: null,
      email: null,
      login: null,
      nom: null,
      prenoms: null,
      roleCode: null,
      roleLibelle: null,
      token:null,
    }, 
    isAuthentified : false,
  },

  getters: {

  },

  mutations: {

    LOGIN_USER(state) {
      state.isAuthentified = true ; 
    },

    UPDATE_USER_PROFIL(state , data) {
      state.userAuthentified = data
    },

    SET_USER_AUTHENTIFIED(state , data) {
      state.userAuthentified = data ; 
    },

    DESTROY_SESSION_USER(state) {
      state.isAuthentified = false ;
      state.userAuthentified = {} ;
    },


  },
  actions: {

  },
  modules: {
    
  }
})
