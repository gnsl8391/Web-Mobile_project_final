import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    user: "",
    uid: ""
  },
  mutations: {
    login(list) {
      this.state.accessToken = list.accessToken;
      this.state.user = list.user;
      this.state.uid = list.uid;
    },
    logout() {
      this.state.accessToken = "";
      this.state.user = "";
      this.state.uid = "";
    },
    authChk(list) {
      this.state.accessToken = list.accessToken;
      this.state.user = list.user;
      this.state.uid = list.uid;
    }
  },
  actions: {
    login({commit}, list) {
      commit("login", list);
    },
    logout({commit}) {
      commit("logout");
    },
    authChk({commit}, list) {
      commit("authChk", list);
    }
  }
});
