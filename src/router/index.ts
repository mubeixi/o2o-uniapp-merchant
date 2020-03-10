import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);


import route_list from './menuConf'

const createRouter = () => new Router({
  routes: route_list
})

const routerInstance = createRouter()

export default routerInstance
