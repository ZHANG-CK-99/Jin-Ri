import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
const TOKEN_KEY = 'TOUTIAO_USER'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user
      setItem(TOKEN_KEY, user)
    }
  },
  actions: {},
  modules: {}
})
