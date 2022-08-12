import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userAuthentication from "./modules/userAuthentication/index";
import signatures from "./modules/signatures/index";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    userAuthentication,
    signatures
  }
});
