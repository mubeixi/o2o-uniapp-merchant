import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Page from '@/views/PageTmpl.vue';
import Home from './views/Home';
import Diy from './views/Diy';
import Empty from './views/Empty';

import NotFound from '@/views/NotFound.vue';
import Login from '@/views/register/Login.vue';
import Register from '@/views/register/Register.vue';
import Setting from '@/views/register/Setting';
import SettledAgreement from '@/views/register/SettledAgreement';
import PersonApprove from '@/views/register/PersonApprove';
import CompanyApprove from '@/views/register/CompanyApprove';

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/SettledAgreement',
      name: 'SettledAgreement',
      component: SettledAgreement,
      meta: {
        title: '签署协议'
      }
    },
    {
      path: '/PersonApprove',
      name: 'PersonApprove',
      component: PersonApprove,
      meta: {
        title: '个人认证'
      }
    },
    {
      path: '/CompanyApprove',
      name: 'CompanyApprove',
      component: CompanyApprove,
      meta: {
        title: '个人认证'
      }
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
