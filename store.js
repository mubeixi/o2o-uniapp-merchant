import Vue from 'vue'
import Vuex from 'vuex'
import state from './store/state'
// import * as actions from './store/actions'
import * as mutations from './store/mutations'
// import * as getters from './store/getters'
import system from './store/modules/system'
import theme from './store/modules/theme'
import user from './store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    system,
    theme,
    user
  },
  state,
  mutations
  // actions,
  // getters
})
