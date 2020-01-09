/* eslint-disable no-console */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import './common'

import './assets/js/icon'


//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/img/img-lazy.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('@/assets/img/goods-lazy.png')  //加载失败图片
});


Vue.config.productionTip = false;

//各种方法?
import {doLoginMixin} from "./common/mixin";
new Vue({
  mixins: [doLoginMixin],
  router,
  store,
  render: h => h(App),
}).$mount('#app');
