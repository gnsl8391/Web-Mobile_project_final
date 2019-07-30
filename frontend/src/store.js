import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    user: "",
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
  },
  actions: {
    login({commit}, list) {
      commit("authChk", list);
    },
    logout({commit}) {
      commit("logout");
    },
    authChk({commit}, user) {
      commit("authChk", user);
    }
  }
});
