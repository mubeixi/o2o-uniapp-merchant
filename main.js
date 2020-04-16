import Vue from 'vue'
import App from './App'

import T from './common/langue/i18n'
import locales from './common/langue/locales'

Vue.config.productionTip = false

App.mpType = 'app'

// 设置语言
T.registerLocale(locales)
T.setLocale()

const app = new Vue({
  ...App
})
app.$mount()
