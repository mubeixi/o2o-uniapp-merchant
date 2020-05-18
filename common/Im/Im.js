import {
  IM_APPID, IM_APPSECRET, IM_WSS_URL
} from '@/common/env'
import { bindUid, getAccessToken, getMsgList, sendMsg } from '@/common/Im/Fetch'
import Promisify from '@/common/Promisify'
import { Exception } from '@/common/Exception'
import Storage from '@/common/Storage'
import { modal } from '@/common/fun'
import { createUpTaskArr, getDomain, uploadImages } from '@/common/helper'

// 消息类,就先不用继承了吧
/**
 * @type text image video prod
 *
 */
class Message {
  constructor (type, content = '', ext) {
    if (!type) throw Error('type必须指定')
    this.content = content
    this.type = type

    this.ext = ext
  }

  async getContent () {
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

Message.prototype.imgWidthMax = 120 // px
Message.prototype.imgHeightMax = 160 // px

/**
 * 图片类，会额外用到加载进度、以及本地临时路径（加快显示，然后方便显示进度)
 */
class Image extends Message {
  constructor (type = 'image', content = '', ext) {
    super(type, content)
    const { tempPath } = ext
    this.tempPath = tempPath
    this.taskList = createUpTaskArr()
    this.styleObj = { width: 0, height: 0, mode: 'widthFix' }
    // 本地图片，所以获取图片信息非常快
    Promisify('getImageInfo', { src: tempPath }).then(res => {
      const { height, width } = res

      this.styleObj.mode = height > width ? 'heightFix' : 'widthFix'// 横还是竖直

      const widthScale = width / this.imgWidthMax
      const heightScale = height / this.imgHeightMax

      var imgScale = 1

      if (height >= width) {
        if (widthScale > 1) {
          imgScale = widthScale
        }
        // 长边优先，覆盖掉
        if (heightScale > 1) {
          imgScale = heightScale
        }
      } else {
        if (heightScale > 1) {
          imgScale = heightScale
        }
        // 长边优先，覆盖掉
        if (widthScale > 1) {
          imgScale = widthScale
        }
      }

      this.styleObj.width = width / imgScale
      this.styleObj.height = height / imgScale
    })
  }

  async getContent (chatIdx, chatList) {
    const ossUrls = await uploadImages({ imgs: [this.tempPath], progressList: this.taskList }).catch(msg => { throw Error(msg) })

    for (var i = 0; i < ossUrls.length; i++) {
      ossUrls[i] = getDomain(ossUrls[i])
    }
    const imgurl = ossUrls[0]

    // 这是真实的content
    this.content = imgurl
    // 设置到list中
    chatList[chatIdx].content = imgurl
    return imgurl
  }
}

class Product extends Message {
  constructor (type = 'prod', content = {}, ext) {
    super(type, content)
    const { isTip = 0 } = ext
    this.isTip = isTip // 如果为1则不需要发送，代表仅仅是显示产品信息
  }

  async getContent () {
    // {"prod_name":"商品一","img":"图片路径","price":"100","url":"商品卡片点击跳转的URL"}

    const content = {
      prod_name: this.content.Products_Name,
      price: this.content.Products_PriceX,
      img: this.content.ImgPath,
      url: `/pages/product/detail?prod_id=${this.content.Products_ID}`
    }
    return JSON.stringify(content)
  }
}

// const voiceInstance = new Voice()

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
    // this.productId = productId
    // this.orderId = orderId
    this.origin = origin
    this.extConf = extConf
    this.page = 1 // 初始化页码

    this.chatList = []

    // 队列
    this.msgQueue = []
    this.socketOpen = false

    // 注意销毁
    this.task = null

    this.intervalInstance = null
    this.heartBeatFailNum = 0 // 心跳丢失次数
    this.connectFailNum = 0// 连接失败次数
    // console.log(extConf)
  }

  /**
   * 获取以往信息
   */
  async getHistory () {
    const pageSize = this.historyPageSize
    const page = this.page

    const out_uid = this.getOutUid()
    const historyList = await getMsgList({ page_size: pageSize, page, out_uid, to: this.getToUid() }).then(res => {
      return res.data.map(row => {
        row.direction = row.from_uid === out_uid ? 'to' : 'accept' // 标记哪些是自己的
        return row
      })
    }).catch(err => { throw Error(err.msg || '获取历史消息失败') })

    if (historyList.length > 0) {
      this.chatList = historyList.concat(this.chatList)
      this.page++
    }
    return true
  }

  /**
   * 设置本地用户信息
   * @param type
   * @param id
   * @param ext
   */
  setSendInfo ({ type, id, ...ext }) {
    // 获取发送人的信息要用的
    this.setIdentity({ type, id })
  }

  /**
   * 设置接受人信息
   * @param type
   * @param id
   * @param ext
   */
  setReceiveInfo ({ type, id, ...ext }) {
    this.receiveIdentity = type
    this.receiveId = id
  }

  /**
   *
   * @param type system user biz store 分别代表系统 用户、商家、门店
   * @param id 身份id
   */
  setIdentity ({ type = 'user', id }) {
    this.sendIdentity = type
    this.sendId = id
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
  getOutUid () {
    if (this.sendIdentity === 'system') {
      return this.appid
    } else {
      if (!this.sendIdentity || !this.sendId) throw Error('获取out_uid失败')
      return this.sendIdentity + '_' + this.sendId
    }
  }

  /**
   * 获取接收人
   * @returns {string}
   */
  getToUid () {
    if (this.receiveIdentity === 'system') {
      return this.appid
    } else {
      if (!this.receiveIdentity || !this.receiveId) throw Error('获取out_uid失败')
      return this.receiveIdentity + '_' + this.receiveId
    }
  }

  get token () {
    const { expires_at, token } = this.accessToken
    // 看是否过期
    if (expires_at && uni.$moment(expires_at * 1000).isAfter()) {
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

    // 心跳
    this.intervalInstance = setInterval(this._holdHeartBeat.bind(this), this.heartBeatTimout)
  }

  close () {
    this.task.close()
  }

  /**
   * 发送之前，需要先检查token是否过期，过期则刷新token
   * @param content
   * @param type
   */
  async sendImMessage ({ content, type = 'text', ...ext }) {
    var message = null
    switch (type) {
      case 'image':
        message = new Image(type, content, ext)
        break
      case 'prod':
        message = new Product(type, content, ext)
        break
      default:
        message = new Message(type, content, ext)
        break
    }

    if (this.socketOpen) {
      this.chatList.push({ ...message, direction: 'to', sendStatus: 0 })
      // 不需要发送
      if (message.type === 'prod' && message.isTip) return

      const chatIdx = this.chatList.length - 1

      // 为了预防有需要异步上传的情况
      const content = await message.getContent(chatIdx, this.chatList)

      sendMsg({ type, content, out_uid: this.getOutUid(), to: this.getToUid() }).then(res => {
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

  /**
   * 维持心跳
   * @private
   */
  _holdHeartBeat () {
    const message = JSON.stringify({ type: 'heartbeat' })
    this.task.send({
      data: message,
      success: () => {
        this.heartBeatFailNum = 0// 重置心跳错误次数
        console.log('心跳保持成功')
      },
      fail: () => {
        console.log('心跳请求错误')
        this.heartBeatFailNum++
        // 丢失心跳达到最大次数之后需要重连
        if (this.heartBeatFailNum > this.heartBeatFailMax) {
          console.log('心跳请求超过三次错误')
          clearInterval(this.intervalInstance)
          // 重连吧
          this.start()
        }
      }
    })
  }

  _takeMessage (messageObj) {
    const { type, content, from } = messageObj

    // 需要绑定
    if (type === 'login') {
      this.setClientId(from)
      bindUid({
        client_id: this.getClientId(),
        out_uid: this.getOutUid()
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
      this.connectFailNum = 0 // 重置错误次数
      console.log('WebSocket收到消息', res)
      this._takeMessage(JSON.parse(res.data))
    })
    SocketTask.onError((error) => {
      this.connectFailNum++ // 累计错误次数
      if (this.connectFailNum > this.tryRequestMax) {
        modal('建立通讯失败')
      }
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
IM.prototype.heartBeatTimout = 30 * 1000 // 心跳保持时间，默认三十秒
IM.prototype.heartBeatFailMax = 3 // 最大心跳丢失次数，错误3次重新建立socket请求
IM.prototype.tryRequestMax = 5 // 最大重连次数，重连超过5次不成功，就直接报错提醒用户洗洗睡
IM.prototype.historyPageSize = 20 // 一次加载以往消息20条
// 1.创建实例
// 2.拿到token(阻塞操作，带mask的全屏loading)
// 3.获取最近的20条信息
// 4.建立socket连接
// 5.显示推荐信息（从某个订单或者某个商品进来)
// 6.各种响应（客户主动发信息、客服回复消息)

export default IM