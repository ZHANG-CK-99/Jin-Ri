import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
import registerPlugins from './plugins'

Vue.use(Vant)
Vue.use(registerPlugins)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
