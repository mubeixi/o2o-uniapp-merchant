import Vue from 'vue'
import { staticUrl } from './env'
import moment from 'moment'

Vue.filter('domain', (url) => {
  if (!url) return ''
  if (url.indexOf('http') === -1) return staticUrl + url
  return url
})

Vue.filter('couponTime', (str) => {
  return moment(str).format('YYYY.m.d')
})
