import {
  IM_APPID, IM_APPSECRET, IM_WSS_URL
} from '@/common/env'
import { getAccessToken } from '@/common/Im/Fetch'
import moment from 'moment'

class Im {
  /**
   * 初始化Im类
   * @param productId 产品id
   * @param orderId 订单id
   * @param origin 来源
   * @param extConf 额外配置
   */
  constructor ({ productId, orderId, origin, ...extConf } = {}) {
    this.productId = productId
    this.orderId = orderId
    this.origin = origin
    this.extConf = extConf

    // 队列
    this.msgQueue = []
    this.socketOpen = false

    // 注意销毁
    this.task = null
  }

  get token () {
    const { expires_at, token } = this.accessToken
    // 看是否过期
    if (expires_at && moment(expires_at * 1000).isAfter()) {
      return token
    }

    return false
  }

  set token (val) {
    const { expires_at, token } = val
    if (!token) return
    this.accessToken = { expires_at, token }
  }

  // 启动的
  async start () {
    // 获取token时候阻塞一下，问题不大吧。
    await this._getAccessToken()

    // 对于发消息就不要阻塞了
    this._craeteSocket()
  }

  close () {
    this.task.close()
  }

  sendMessage (msg) {
    if (this.socketOpen) {
      this.task.send({
        data: msg
      })
    } else {
      this.msgQueue.push(msg)
    }
  }

  // 建立连接
  _craeteSocket () {
    /** add event listen **/
    const SocketTask = uni.connectSocket({
      url: IM_WSS_URL,
      complete: () => {} // 让他返回task
    })

    SocketTask.onOpen((res) => {
      console.log('WebSocket连接已打开！')
      this.socketOpen = true
      for (var i = 0; i < this.msgQueue.length; i++) {
        this.sendMessage(this.msgQueue[i])
      }
      this.msgQueue = []
    })
    SocketTask.onMessage((res) => {
      console.log('WebSocket收到消息')
      console.log(res)
    })
    SocketTask.onError((error) => {
      console.log('WebSocket错误')
      console.log(error)
    })
    SocketTask.onClose((res) => {
      console.log('WebSocket关闭')
      console.log(res)
    })

    this.task = SocketTask
    /** add event listen end **/
  }

  async _getAccessToken () {
    const token = await getAccessToken({
      appid: this.appid,
      appsecret: this.appsecret
    }).catch(res => {
      return res.data
    }).catch(error => { throw Error(error.msg || '获取token失败') })
    this.accessToken = token
    return token
  }
}

// 还是放到类上面，这样就每个项目用工程文件就好了
Im.prototype.appid = IM_APPID
Im.prototype.appsecret = IM_APPSECRET

// 1.创建实例
// 2.拿到token(阻塞操作，带mask的全屏loading)
// 3.获取最近的20条信息
// 4.建立socket连接
// 5.显示推荐信息（从某个订单或者某个商品进来)
// 6.各种响应（客户主动发信息、客服回复消息)

export default Im
