// import Vue from 'vue';
// import Vuex from 'vuex';
//
// import state from './state';
// import * as actions from './actions';
// import * as mutations from './mutations';
// import {toast} from "../common";
// import * as getters from './getters';
//
// Vue.use(Vuex);
//
// export default new Vuex.Store({
//     state,
//     getters,
//     mutations,
//     actions,
// });
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user
    },
    getters
})

export default store
