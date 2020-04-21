import Vue from 'vue'
import store from '@/store'
require('./Promisify')
require('./filter')

// 所有的页面和组件都可用了
Vue.prototype.getPimaryColor = () => {
  return store.getters['theme/pimaryColor']
}
