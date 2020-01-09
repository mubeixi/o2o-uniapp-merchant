import Vue from "vue";
import {fun} from "./index";
import echarts from 'echarts'
import interceptorsConfig from "./interceptors";
// const i18n = require('i18n');

Vue.prototype.$fun = fun;
Vue.prototype.$echarts = echarts
Vue.http.interceptors.push(interceptorsConfig);
// Vue.prototype.$i18n = i18n
