import * as ENV from './env'
// import store from '../store'
import {
  error
} from './fun'

export const ajax = (url, method, data, options) => {
  if (!options) options = {}
  if (!data) data = {}

  let {tip = '', mask = false, timelen = 2000, timeout = 1000, errtip = true} = options

  if (tip) {
    wx.showLoading({
      title: tip,
      mask: mask,
      timelen
    })
  }

  // let token
  var header = {
    // 'Authorization': 'Bearer ' + token,
    'content-type': 'application/x-www-form-urlencoded'
  }
  // if (wx.getStorageSync('cookie')) {
  //   header.Cookie = wx.getStorageSync('cookie')
  // }
  let URL = ''
  URL = ENV.apiBaseUrl + url
  const hookErrorCode = [0]

  return new Promise((resolve, reject) => {
    wx.request({
      header,
      url: URL,
      method,
      data,
      success: (ret) => {
        if (ret.statusCode !== 200 || typeof ret.data !== 'object') {
          error('服务器去旅行了')
        }
        let res = ret.data

        if (res.hasOwnProperty('errorCode') && hookErrorCode.indexOf(res.errorCode) != -1) {
          // if (res.errorCode === 66001) {
          //   error(res.msg)
          //   //重置用户信息
          //   let users_id = ls.get('users_id');
          //   ls.clear();
          //   ls.set('users_id', users_id);
          //   // #ifdef H5
          //   sessionStorage.removeItem('is_send_usrlog')
          //   // #endif
          //   store.commit('SET_USER_INFO', {})
          //   store.commit('SET_STORES_ID', null)
          //
          //   setTimeout(() => {
          //     uni.navigateTo({
          //       url: '/pages/login/login'
          //     })
          //   }, 1000)
          //   return;
          // }
          resolve(res)
        } else {
          if (res.hasOwnProperty('errorCode') && res.msg) {
            if (errtip) error(res.msg)
          } else {
            error('请求未成功')
          }
          reject(res)
        }
      },
      fail: (e) => {
        reject(e)
      },
      complete: () => {
        // console.log(res)
        if (tip) {
          setTimeout(function () {
            wx.hideLoading()
          }, timeout)
        }
      }
    })
  })
}

export const post = (url, data, options) => {
  return ajax(url, 'post', data, options)
}

export const get = (url, data, options) => {
  return ajax(url, 'get', data, options)
}

export const fetch = function ({act, param, options = false, url = '/api/little_program/shopconfig.php', method = 'post'}) {
  const data = {...param}
  return ajax(url, method, data, options)
}

module.exports = {
  post, get, ajax,fetch
}
