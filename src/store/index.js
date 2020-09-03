import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
};

const getters = {
  userInfo: (state) => state.userInfo,
};

const mutations = {
  setUserInfo: (state, info) => {
    state.userInfo = info;
    localStorage.setItem("userInfo", JSON.stringify(info));
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
