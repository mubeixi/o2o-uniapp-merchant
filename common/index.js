import Vue from 'vue'
import store from '@/store'

require('./Promisify')
require('./filter')

// 所有的页面和组件都可用了
Vue.prototype.getPimaryColor = () => {
  return store.getters['theme/pimaryColor']
}

export const lazyImgUrl = 'https://new401.bafangka.com/uploadfiles/wkbq6nc2kc/image/20191112154310111.jpg'
