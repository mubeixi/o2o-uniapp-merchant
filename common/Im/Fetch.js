import { ajax } from '@/common/request'
import { IM_API_URL } from '@/common/env'
import Storage from '@/common/Storage'

export const Fetch = function ({ url, param = {}, options = false, method = 'post' }) {
  try {
    const data = { ...param }
    return ajax({
      url: IM_API_URL + url,
      method,
      data,
      options,
      headerExt: { token: Storage.get('IM_ACCESS_TOKEN') || '' },
      isAddHost: false // 不需要加host
    })
  } catch (e) {
    console.log('request error :' + JSON.stringify(e))
  }
}

// 生成、查询token
export const getAccessToken = (param, options) => Fetch({ url: '/token/getAccessToken', param, options })

// 绑定用户
export const bindUid = (param, options) => Fetch({ url: '/chat/bindUid', param, options })

// 发送消息
export const sendMsg = (param, options) => Fetch({ url: '/chat/sendMsg', param, options })

// 获取更多消息
export const getMsgList = (param, options) => Fetch({ url: '/chat/getMsgList', param, options })
