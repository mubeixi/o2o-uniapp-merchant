import Vue from 'vue'
import App from './App'

import T from './common/langue/i18n'
import locales from './common/langue/locales'

import './common'
import store from '@/store'

Vue.config.productionTip = false

App.mpType = 'app'

// 设置语言
T.registerLocale(locales)
T.setLocale()

const app = new Vue({
  ...App,
  store
})
app.$mount()
