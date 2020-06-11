import Vue from 'vue'
import App from './App.vue'

import router from './routes.js'
import './bootstrap'
import './filters'
import './forms'
import './httpClient'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
