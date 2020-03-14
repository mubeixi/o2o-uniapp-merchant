import Home from '../views/Home.vue';
import FirstTmpl from '../views/layout/FirstTmpl.vue';
import SecondTmpl from '../views/layout/SecondTmpl.vue';
import EmptyTmpl from '../views/layout/EmptyTmpl.vue';

import Diy from '../views/Diy.vue';

import Empty from '../views/Empty.vue';

import NotFound from '../views/NotFound.vue';
import Login from '../views/register/Login.vue';
import Register from '../views/register/Register.vue';

import Setting from '../views/register/Setting.vue';
import SettledAgreement from '../views/register/SettledAgreement.vue';
import PersonApprove from '../views/register/PersonApprove.vue';
import CompanyApprove from '../views/register/CompanyApprove.vue';
import Pay from '../views/register/Pay.vue';

import SettlementInformation from '../views/register/SettlementInformation.vue';
import AddIndustryCate from '../views/register/AddIndustryCate.vue';



import UpdatePassword from '../views/info/UpdatePassword.vue';
import ProductList from '../views/product/ProductList.vue';
import ProductTmplBase from '../views/product/ProductTmplBase.vue';
import ProductTmplDiy from '../views/product/ProductTmplDiy.vue';
import BindVip from '../views/info/BindVip.vue';
import ShippingAddress from '../views/info/ShippingAddress.vue';
import Settlement from '../views/info/Settlement.vue';

import  CollectionCode from  '../views/info/CollectionCode.vue';
import  ExpressTemplate from  '../views/info/ExpressTemplate.vue';


export default [
  {
    path: '/app',
    name: 'LayoutPage',
    component: FirstTmpl,
    redirect: {name: 'dashboard'},
    children: [
      {
        path: 'dashboard',
        name:'dashboard',
        meta: {
          title: '概览',
        },
      },

      {
        path: 'invalidate',
        name:'invalidate',
        meta: {
          title: '商家认证',
        }
      },
      {
        path: 'info',
        name:'info',
        meta: {
          title: '商家资料',
        },
        component: SecondTmpl,
        redirect: {name: 'UpdatePassword'},
        children: [
          {
            path: 'UpdatePassword',
            name: 'UpdatePassword',
            component: UpdatePassword,
            meta: {
              title: '修改密码',
            },
          },
          {
            path: 'BindVip',
            name: 'BindVip',
            component: BindVip,
            meta: {
              title: '绑定会员',
            },
          },
          {
            path: 'ShippingAddress',
            name: 'ShippingAddress',
            component: ShippingAddress,
            meta: {
              title: '收货地址',
            },
          },
          {
            path: 'Settlement',
            name: 'Settlement',
            component: Settlement,
            meta: {
              title: '结算配置',
            },
          },
          {
            path: 'CollectionCode',
            name: 'CollectionCode',
            component: CollectionCode,
            meta: {
              title: '收款二维码',
            },
          },
          {
            path: 'ExpressTemplate',
            name: 'ExpressTemplate',
            component: ExpressTemplate,
            meta: {
              title: '快递模板',
            },
          }

        ],
      },
      {
        path: 'store',
        name:'store',
        meta: {
          title: '店铺管理',
        },
      },
      {
        path: 'product',
        name:'product',
        meta: {
          title: '产品管理',
        },
        component: SecondTmpl,
        redirect: {name: 'ProductList'},
        children: [
          {
            path: 'list',
            name:'ProductList',
            component: ProductList,
            meta: {
              title: '全部商品',
            },
          },
          {
            path: 'group',
            name: 'ProductGroup',
            component: Empty,
            meta: {
              title: '商品分组',
            },
          },
          {
            path: 'tag',
            name:'ProductTag',
            component: Empty,
            meta: {
              title: '商品标签',
            },
          },
          {
            path: 'tmpl',
            name:'ProductTmpl',
            meta: {
              title: '商品模板',
            },
            component: EmptyTmpl,
            redirect: {name: 'ProductTmplBase'},
            children:[
              {
                path: 'base',
                name:'ProductTmplBase',
                component: ProductTmplBase,
                meta: {
                  title: '通用模板',
                },
              },
              {
                path: 'diy',
                name:'ProductTmplDiy',
                component: ProductTmplDiy,
                meta: {
                  title: '自定义模板',
                },
              },
            ]
          },
          {
            path: 'specs',
            component: Empty,
            meta: {
              title: '商品属性',
            },
          },
          {
            path: 'comment',
            component: Empty,
            meta: {
              title: '商品评论',
            },
          },
        ],
      },
      {
        path: 'coupon',
        component: Empty,
        meta: {
          title: '优惠券管理',
        },
        children: [],
      },
      {
        path: 'send',
        component: Empty,
        meta: {
          title: '第三方配送',
        },
        children: [],
      },
      {
        path: 'order',
        component: Empty,
        meta: {
          title: '订单管理',
        },
        children: [],
      },
      {
        path: 'activity',
        component: Empty,
        meta: {
          title: '活动管理',
        },
        children: [],
      },
      {
        path: 'finance',
        component: Empty,
        meta: {
          title: '财务结算',
        },
        children: [],
      },
      {
        path: 'postage',
        component: Empty,
        meta: {
          title: '运费管理',
        },
        children: [],
      },
      {
        path: '/diy',
        name: 'LayoutPage',
        component: Diy,
        hide: true,
        meta: {
          title: '页面diy',
          auth: false,
        },
      },
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '模板装修',
        },
        component: Home,
      },
    ],
  },

  // {
  //   path: '/diy',
  //   name: 'DIY',
  //   component: Diy,
  // },
  {
    path: '/empty',
    name: 'empty',
    component: Empty,
  },
  {
    path: '/NotFound',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'NotFound',
    },
  },
  // {
  //   path: '*',
  //   redirect: '/NotFound'
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
    },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: {
      title: '商家入驻',
    },
  },
  {
    path: '/SettledAgreement',
    name: 'SettledAgreement',
    component: SettledAgreement,
    meta: {
      title: '签署协议',
    },
  },
  {
    path: '/PersonApprove',
    name: 'PersonApprove',
    component: PersonApprove,
    meta: {
      title: '个人认证',
    },
  },
  {
    path: '/CompanyApprove',
    name: 'CompanyApprove',
    component: CompanyApprove,
    meta: {
      title: '个人认证',
    },
  },
  {
    path: '/Pay',
    name: 'Pay',
    component: Pay,
    meta: {
      title: '付款',
    },
  },
  {
    path: '/SettlementInformation',
    name: 'SettlementInformation',
    component: SettlementInformation,
    meta: {
      title: '入驻资料设置',
    },
  },
  {
    path: '/AddIndustryCate',
    name: 'AddIndustryCate',
    component: AddIndustryCate,
    meta: {
      title: '添加行业分类',
    },
  },

];
