import Vue from 'vue';
import {ajax, get, post} from './request.js';

// #ifdef H5
import wx from 'weixin-js-sdk';
// #endif

// const i18n = require('i18n');

//申明公共组件
import './init/pluginRegister';

//重写uni部分
import './init/uni';

//过滤器
import './filter.js';

//自定义的便捷操作
import fun from './init/fun'

export default {
    install() {
        Vue.prototype.$post = post;
        Vue.prototype.$get = get;
        Vue.prototype.$http = ajax;
        Vue.prototype.$toast = fun.toast;
        Vue.prototype.$error = fun.error;
        Vue.prototype.$vm = new Vue();
        Vue.prototype.$fun = fun;

        // #ifdef H5
        Vue.prototype.$wx = wx;
        // #endif
    },
};




