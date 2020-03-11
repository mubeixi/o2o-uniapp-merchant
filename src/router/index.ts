import Vue from 'vue';
import Router from 'vue-router';


import route_list from './menuConf';

Vue.use(Router);

const createRouter = () => new Router({
  routes: route_list,
});

const routerInstance = createRouter();

export default routerInstance;
