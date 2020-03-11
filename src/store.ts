import Vue from 'vue';
import Vuex from 'vuex';
import state from './store/state';
import * as actions from './store/actions';
import * as mutations from './store/mutations';
import system from './store/modules/system';
import menu from './store/modules/menu';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    system,
    menu
  },
  state,
  mutations,
  actions,
});
