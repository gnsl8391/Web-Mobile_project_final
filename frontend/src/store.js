import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    accessToken: "",
    user: [],
    uid: ""
  },
  getters: {
    isLogin: (state) => {
      return state.user == "";
    }
  },
  mutations: {
    logout() {
      this.state.accessToken = "";
      this.state.user = "";
      this.state.uid = "";
    },
    authChk(user) {
      this.state.accessToken = user.accessToken;
      this.state.user = user.user;
      this.state.uid = user.uid;
    }
  }
});
