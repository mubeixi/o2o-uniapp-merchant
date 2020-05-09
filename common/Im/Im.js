import {
  IM_APPID, IM_APPSECRET, IM_WSS_URL
} from '@/common/env'
import { getAccessToken } from '@/common/Im/Fetch'

class Im {
  /**
   * 初始化Im类
   * @param productId 产品id
   * @param orderId 订单id
   * @param origin 来源
   * @param extConf 额外配置
   */
  constructor ({ productId, orderId, origin, extConf = {} } = {}) {
    this.productId = productId
    this.orderId = orderId
    this.origin = origin
    this.extConf = extConf

    // 注意销毁
    this.task = null
  }

  get accessToken () {
    return this.accessToken
  }

  set accessToken (token) {
    this.accessToken = token
  }

  // 启动
  async starat () {
    // 获取token
    await this._getAccessToken()
    
    await this._craeteSocket()
  }

  //建立连接
  _craeteSocket () {
    return new Promise((resolve, reject) => {
      this.task = uni.connectSocket({
        url: IM_WSS_URL,
        complete: () => {} // 让他返回task
      })
      uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！')
        resolve('WebSocket连接已打开!')
      })
    })
  }

  async _getAccessToken () {
    const token = await getAccessToken().catch(error => { throw Error(error.msg || '获取token失败') })
    this.accessToken = token
    return token
  }
}

// 还是放到类上面，这样就每个项目用工程文件就好了
Im.appid = IM_APPID
Im.appsecret = IM_APPSECRET

// 1.创建实例
// 2.拿到token(阻塞操作，带mask的全屏loading)
// 3.获取最近的20条信息
// 4.建立socket连接
// 5.显示推荐信息（从某个订单或者某个商品进来)
// 6.各种响应（客户主动发信息、客服回复消息)

export default Im
