import {
  IM_APPID, IM_APPSECRET, IM_WSS_URL
} from '@/common/env'
import { bindUid, getAccessToken, sendMsg } from '@/common/Im/Fetch'
import moment from 'moment'
import Promisify from '@/common/Promisify'
import { Exception } from '@/common/Exception'
import Storage from '@/common/Storage'

// 消息类,就先不用继承了吧
/**
 * @type text image video prod
 *
 */
class Message {
  constructor ({ content = '', type }) {
    if (!type) throw Error('type必须指定')
    this.content = content
    this.type = type
  }

  getContent () {
    let rt = null
    switch (this.type) {
      case 'text':
        rt = this.content
        break
      case 'image':
        rt = this.content
        break
      case 'video':
        rt = this.content
        break
      case 'prod':
        rt = JSON.stringify(this.content)
        break
    }
    return rt
  }
}

class IM {
  /**
   * 初始化Im类
   * @param productId 产品id
   * @param orderId 订单id
   * @param origin 来源
   * @param extConf 额外配置
   * @param identityType 身份信息
   * @param dentityId信息id
   */
  constructor ({ productId, orderId, origin, ...extConf } = {}) {
    // this.createInstance = false
    this.productId = productId
    this.orderId = orderId
    this.origin = origin
    this.extConf = extConf

    this.chatList = []

    // 队列
    this.msgQueue = []
    this.socketOpen = false

    // 注意销毁
    this.task = null
    // console.log(extConf)
    // if (extConf.hasOwnProperty('identityType') && extConf.hasOwnProperty('identityId')) {
    //   this.setIdentity({ type: extConf.identityType, id: extConf.identityId })
    // }
  }

  /**
   * 设置本地用户信息
   * @param type
   * @param id
   * @param ext
   */
  setSendInfo ({ type, id, ...ext }) {
    this.setIdentity({ type, id })
  }

  /**
   * 设置接受人信息
   * @param type
   * @param id
   * @param ext
   */
  setReceiveInfo ({ type, id, ...ext }) {

  }

  /**
   *
   * @param type system user biz store 分别代表系统 用户、商家、门店
   * @param id 身份id
   */
  setIdentity ({ type = 'user', id }) {
    this.identity = type
    this.identityId = id
  }

  setClientId (val) {
    this.clientId = val
  }

  getClientId () {
    if (!this.clientId) throw Error('获取client_id失败')
    return this.clientId
  }

  /**
   * 获取发送消息的id
   * 用户、商家、门店分别用前缀+id的方式来拼凑 user_xxx  biz_xxx store_xxx
   * system 平台，直接使用平台的appid值
   * @returns {string}
   */
  getOutUidByBind () {
    if (this.identity === 'system') {
      return this.appid
    } else {
      if (!this.identity || !this.identityId) throw Error('获取out_uid失败')
      return this.identity + '_' + this.identityId
    }
  }

  getOutUid () {
    if (this.identity === 'system') {
      return this.appid
    } else {
      if (!this.identity || !this.identityId) throw Error('获取out_uid失败')
      return this.identityId
    }
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
    await this._craeteSocket()
  }

  close () {
    this.task.close()
  }

  /**
   * 发送之前，需要先检查token是否过期，过期则刷新token
   * @param content
   * @param type
   */
  async sendMessage (content, type = 'text') {
    const message = new Message({ content, type })

    if (this.socketOpen) {
      this.chatList.push({ ...message, direction: 'to', sendStatus: 0 })
      const chatIdx = this.chatList.length - 1
      sendMsg({ type, content: message.getContent(), out_uid: this.getOutUid() }).then(res => {
        console.log('发送成功', res)
        this.chatList[chatIdx].sendStatus = 1 // 标记成功
        return res.data
      }).catch(err => {
        console.log('消息发送失败')
        this.chatList[chatIdx].sendStatus = -1 // 标记失败
        Exception.handle(err)
      })
    } else {
      this.msgQueue.push(message)
    }
  }

  _takeMessage (messageObj) {
    const { type, content, from } = messageObj

    // 需要绑定
    if (type === 'login') {
      this.setClientId(from)
      bindUid({
        client_id: this.getClientId(),
        out_uid: this.getOutUidByBind()
      }).catch(res => {}).catch(e => { throw Error('绑定用户失败') })
      return
    }

    this.chatList.push({ ...messageObj, direction: 'from' })
  }

  // 建立连接
  async _craeteSocket () {
    /** add event listen **/

    // 好像对异步的uni.connectSocket没什么作用
    let SocketTask = null
    await new Promise(resolve => {
      SocketTask = uni.connectSocket({
        url: IM_WSS_URL,
        complete: () => {
          // this.createInstance = true // 标记为创建成功
          resolve(true)
        }
      })
    })

    console.log(SocketTask)

    SocketTask.onOpen((res) => {
      console.log('WebSocket连接已打开！')
      this.socketOpen = true
      for (var i = 0; i < this.msgQueue.length; i++) {
        this.sendMessage(this.msgQueue[i])
      }
      this.msgQueue = []
    })
    SocketTask.onMessage((res) => {
      console.log('WebSocket收到消息', res)
      this._takeMessage(JSON.parse(res.data))
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

    return SocketTask
    /** add event listen end **/
  }

  async _getAccessToken () {
    const tokenRT = await getAccessToken({
      appid: this.appid,
      appsecret: this.appsecret
    }).then(res => {
      return res.data
    }).catch(error => { throw Error(error.msg || '获取token失败') })
    this.accessToken = tokenRT
    Storage.set('IM_ACCESS_TOKEN', tokenRT.token)
    return tokenRT
  }
}

// 还是放到类上面，这样就每个项目用工程文件就好了
IM.prototype.appid = IM_APPID
IM.prototype.appsecret = IM_APPSECRET

// 1.创建实例
// 2.拿到token(阻塞操作，带mask的全屏loading)
// 3.获取最近的20条信息
// 4.建立socket连接
// 5.显示推荐信息（从某个订单或者某个商品进来)
// 6.各种响应（客户主动发信息、客服回复消息)

export default IM
