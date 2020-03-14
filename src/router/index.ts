import Vue from 'vue';
import Router from 'vue-router';


import route_list from './menuConf';

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push;
// @ts-ignore
Router.prototype.push = function push(location) {
  // @ts-ignore
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(Router);

const createRouter = () => new Router({
  routes: route_list,
});

const routerInstance = createRouter();

export default routerInstance;
