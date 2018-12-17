import Vue from 'vue'
import axois from './assets/api'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.styl'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axois

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
