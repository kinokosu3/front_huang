import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app_bar: false
  },
  mutations: {
      changeLogin (state, user){
        state.Authorization = user.Authorization;
        localStorage.setItem('Authorization', user.Authorization);
      }
  },
  actions: {
  },
  modules: {
  }
})
