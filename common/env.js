// #ifdef H5
import wx from 'weixin-js-sdk'
import { getJsSign } from '@/api/common'
import { isWeiXin } from '@/common/helper'
// #endif
export const isCustom = false
export const isDev = process.env.NODE_ENV !== 'production'

// export const apiBaseUrl = 'https://newo2o.netcnnet.net'
export const apiBaseUrl = 'https://newo2o.bafangka.com'
export const staticUrl = 'https://newo2o.bafangka.com'
export const users_id = 'wkbq6nc2kc'

// O2O正式版IM
//appid : dkujHdxulyJkmxh
//appsecret : b1935ddee886db0a9877876051b42846
// O2O测试版IM
//appid : uLwqowvvkHAUmq5
//appsecret : 4MJB9wQDO3EpxSdIPzLn6kejsqnv5d6e

//测试appid   wxfe5d2621576cf895  域名 https://newo2o.bafangka.com
//正式appid   wx28e6e80223bd5f0f  域名 https://newo2o.netcnnet.net

// Im相关配置
export const IM_WSS_URL = 'wss://newjdtravel.bafangka.com/cus/'
export const IM_API_URL = 'https://chat.bafangka.com'
export const IM_APPID = 'uLwqowvvkHAUmq5'
export const IM_APPSECRET = '4MJB9wQDO3EpxSdIPzLn6kejsqnv5d6e'

// #ifdef H5
function setWxConfig (config) {
  wx.config(config)
}

export const WX_JSSDK_INIT = (vm, jsApiListList) => new Promise((resolve, reject) => {
  if (!isWeiXin()) reject(new Error(false))

  if (vm.JSSDK_READY) {
    resolve(wx)
    return
  }

  // let {origin,pathname} = location
  // `${origin}${pathname}`,//
  getJsSign({
    url: location.href.split('#')[0]
    // debug : process.env.NODE_ENV === 'production' ? false : true
  }, { errtip: false }).then((res) => {
    const config = res.data
    // 线上环境，听服务器的，本地的一律调试
    const debug = !!res.data.debug// process.env.NODE_ENV === 'production'?config.debug?true:false:true
    const jsApiList = jsApiListList || ['onMenuShareAppMessage', 'onMenuShareTimeline', 'openLocation', 'getLocation', 'scanQRCode', 'chooseImage', 'previewImage', 'uploadImage']
    // ['chooseImage', 'previewImage', 'uploadImage', 'openLocation','getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];
    if (debug) {
      Storage.set('jssdk_debug', 1)
    } else {
      Storage.set('jssdk_debug', 0)
    }
    const { noncestr, timestamp, appId, signature } = config

    setWxConfig({ debug, appId, timestamp, nonceStr: noncestr, signature, jsApiList })

    wx.ready(function () {
      vm.JSSDK_READY = true
      // 将微信这个变量传进去，所以在页面就不需要传了
      resolve(wx)
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    })
  }).catch(res => {
    reject(new Error(false))
  })
})
// #endif
