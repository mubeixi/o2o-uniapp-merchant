import { ajax } from '@/common/request'
import { IM_API_URL } from '@/common/env'

export const Fetch = function ({ url, param = {}, options = false, method = 'post' }) {
  try {
    const data = { ...param }
    return ajax({
      url: IM_API_URL + url,
      method,
      data,
      options
    })
  } catch (e) {
    console.log('request error :' + JSON.stringify(e))
  }
}

// 生成、查询token
export const getAccessToken = (param, options) => Fetch({ url: '/token/getAccessToken', param, options })
