import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: localStorage.getItem('eleToken') || '',
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
}
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo
}
const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setUserInfo: (state, info) => {
    state.userInfo = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
