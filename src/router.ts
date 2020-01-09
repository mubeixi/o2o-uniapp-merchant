import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Page from '@/views/PageTmpl.vue';
import Home from './views/Home';
import Diy from './views/Diy';
import Empty from './views/Empty';

import NotFound from '@/views/NotFound.vue';


export const route_list = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/diy',
      name: 'DIY',
      component: Diy,
    },
    {
      path: '/empty',
      name: 'empty',
      component: Empty,
    },
    {
      path: '/NotFound',
      name: 'NotFound',
      component: NotFound,
      meta:{
        title:'NotFound'
      }
    },
    {
      path: '*',
      redirect:'/NotFound'
    }
  ]





const createRouter = () => new Router({
  // mode: 'history', // require service support
  // @ts-ignore
  scrollBehavior: () => ({ y:0 }),
  routes: route_list
})

const routerInstance = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  routerInstance.matcher = newRouter.matcher // reset router
}



export default routerInstance
