<template>
  <div @click="commonClick" class="page-wrap">
    <div class="chat-list" v-if="chatList.length>0">
      <div :key="idx"
           @click="toRoom(idx)"
           @touchend="touchE($event,idx)"
           @touchmove="touchM($event,idx)"
           @touchstart="touchS($event,idx)"
           class="chat-item-box"
           v-for="(chat,idx) in chatList"
      >
        <div :style="chat.txtStyle" class="chat-item flex">
          <div class="left">
            <div :style="{backgroundImage:'url('+chat.avatar+')'}" class="cover"></div>
            <div :class="{circle:chat.no_read<10}" class="item-tag" v-if="chat.no_read>0">{{chat.no_read}}</div>
          </div>
          <div class="right">
            <div class="info flex flex-vertical-c flex-justify-between">
              <div class="nickname c3 fz-17">{{chat.name}}</div>
              <div class="time c9 fz-13">{{chat.time}}</div>
            </div>
            <div class="msg c9 fz-13">
              <block v-if="chat.type==='text'">
                {{chat.content}}
              </block>
              <block v-if="chat.type==='prod'">
                商品:[{{chat.content.prod_name}}]
              </block>
              <block v-if="chat.type==='img'">
                发送了一张图片
              </block>
            </div>
          </div>
        </div>
        <div @click.stop="delMsgItem(chat,idx)" class="inner-del">删除</div>
      </div>

    </div>
    <div class="none" v-else>
      <image :src="'/static/client/box.png'|domain" class="img" />
      <div class="m-t-15"><span>信箱是空的</span></div>
    </div>

  </div>
</template>

<script>
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import { delChat, getChatList } from '@/common/Im/Fetch'
import { modal } from '@/common/fun'
import IM from '@/common/Im/Im'
import Storage from '@/common/Storage'
import { checkIsLogin, findArrayIdx } from '@/common/helper'
import eventHub from '@/common/eventHub'
import { Exception } from '@/common/Exception'

let imInstance = null
export default {
  components: {},
  mixins: [BaseMixin, tabbarMixin],
  data () {
    return {
      delBtnWidth: 40,
      startX: '',
      imInstance: null,
      out_uid: '',
      chatList: [],
      paginate: {
        page: 1,
        page_size: 20,
        totalCount: 0
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    async delMsgItem (chat, idx) {
      try {
        // showLoading()
        // chatItem.to_uid : chatItem.from_uid
        // uid一定是对方
        const { uid: to_uid } = chat
        const out_uid = `user_${this.userInfo.User_ID}`
        await delChat({
          out_uid,
          to_uid
        }).catch(err => {
          throw Error(err.msg || '删除失败')
        })
        this.chatList.splice(idx, 1)
      } catch (e) {
        Exception.handle(e)
      } finally {
        // hideLoading()
      }
    },
    touchS (e, idx) {
      if (e.touches.length === 1) {
        this.startX = e.touches[0].clientX
      }
    },
    touchM (e, idx) {
      if (e.touches.length === 1) {
        // 手指移动时水平方向位置
        var moveX = e.touches[0].clientX
        // 手指起始点位置与移动期间的差值
        var disX = this.startX - moveX
        var delBtnWidth = this.delBtnWidth
        var txtStyle = ''
        if (disX === 0 || disX < 0) { // 如果移动距离小于等于0，说明向右滑动，文本层位置不变
          txtStyle = 'left:0px'
        } else if (disX > 0) { // 移动距离大于0，文本层left值等于手指移动距离
          txtStyle = 'left:-' + disX + 'px'
          if (disX >= delBtnWidth) {
            // 控制手指移动距离最大值为删除按钮的宽度
            txtStyle = 'left:-' + delBtnWidth + 'px'
          }
        }
        // 获取手指触摸的是哪一项
        this.$set(this.chatList[idx], 'txtStyle', txtStyle)
      }
    },
    touchE (e, idx) {
      if (e.changedTouches.length === 1) {
        // 手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX
        // 触摸开始与结束，手指移动的距离
        var disX = this.startX - endX
        var delBtnWidth = this.delBtnWidth
        // 如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 2 ? 'left:-' + delBtnWidth + 'px' : 'left:0px'
        // 获取手指触摸的是哪一项
        this.$set(this.chatList[idx], 'txtStyle', txtStyle)
      }
    },
    // 获取元素自适应后的实际宽度
    getEleWidth: function (w) {
      var real = 0
      try {
        var res = uni.getSystemInfoSync().windowWidth
        var scale = (750 / 2) / (w / 2)// 以宽度750px设计稿做宽度的自适应
        real = Math.floor(res / scale)
        return real
      } catch (e) {
        return 90
        // Do something when catch error
      }
    },
    toRoom (idx) {
      const chatItem = this.chatList[idx]
      chatItem.no_read = 0
      // 客户得找商家聊
      const str = chatItem.to_uid.indexOf('biz') !== -1 ? chatItem.to_uid : chatItem.from_uid
      const breakStrIdx = str.indexOf('_')
      if (breakStrIdx === -1) {
        modal('进入聊天室失败')
        return
      }
      const type = str.substr(0, breakStrIdx)
      const id = str.substr(breakStrIdx + 1)
      this.$linkTo(`/pagesA/support/Im?type=${type}&tid=${id}&room_title=${chatItem.name}`)
    },
    async _init_func () {
      await imInstance._getAccessToken() // 等拿token
      const chatList = await getChatList({
        page: this.paginate.page,
        page_size: this.paginate.page_size,
        out_uid: this.out_uid
      }).then(res => {
        this.paginate.totalCount = res.totalCount
        const list = res.data.map(row => {
          return {
            ...row,
            txtStyle: ''
          }
        })
        console.log(list)
        return list
        // const _list = res.data.map(chat => {
        //   chat.timeText = uni.$moment(chat.created_at * 1000).startOf('day').fromNow()
        //   return chat
        // })
        // return _list
      }).catch(err => {
        modal(err.msg || '获取消息列表失败')
      })
      this.paginate.page++
      this.chatList = this.chatList.concat(chatList)
    }
  },
  onReachBottom () {
    if (this.chatList.length < this.totalCount) {
      getChatList({
        page: this.paginate.page,
        page_size: this.paginate.page_size,
        out_uid: this.out_uid
      }).then(res => {
        this.paginate.page++
        // const _list = res.data.map(chat => {
        //   chat.timeText = uni.$moment(chat.created_at * 1000).startOf('day').fromNow()
        //   return chat
        // })

        this.chatList = this.chatList.concat(res.data)
        this.paginate.totalCount = res.totalCount
      }).catch(err => {
        modal(err.msg || '获取消息列表失败')
      })
    }
  },
  onLoad () {
    if (!checkIsLogin(0, 0)) return

    if (eventHub.imInstance) {
      this.imInstance = imInstance = eventHub.imInstance
    } else {
      this.imInstance = imInstance = new IM()
    }

    // 设置本地用户信息
    imInstance.setSendInfo({
      type: 'user',
      id: Storage.get('user_id')
    })
    this.out_uid = imInstance.getOutUid()

    this._init_func()
  },
  onReady () {
    this.delBtnWidth = this.getEleWidth(180)
    // 给单个的行记录也累加数量
    eventHub.$on('IM_TAKE_MSG', (res) => {
      // 只有当前页面响应

      console.log(res)

      if (eventHub.imInstance) {
        const idx = findArrayIdx(this.chatList, { uid: res.from_uid })
        console.log(idx)
        if (idx !== false) {
          const tempNoReadCount = this.chatList[idx].no_read
          // 得自己拼接，不容易啊
          res.no_read = tempNoReadCount + 1
          res.uid = res.from_uid
          res.to_uid = this.out_uid
          res.time = uni.$moment().format('YYYY-MM-DD hh:mm')
          this.$set(this.chatList, idx, res)
        }
      }
    })
  },
  onShow () {
    this.setTabBarIndex(1)
    this.$store.dispatch('system/setTabActiveIdx', 1)
    this.refreshTabTag()
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    min-height: 100vh;
    background: #fff;
    padding-bottom: 0;
  }

  .chat-item-box {
    position: relative;
    height: 140rpx;
    width: 750rpx;
    overflow: hidden;
  }

  .inner-del {
    position: absolute;
    background: $fun-red-color;
    width: 180rpx;
    text-align: center;
    z-index: 2;
    height: 140rpx;
    line-height: 140rpx;
    right: 0;
    color: #fff
  }

  .chat-item {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 140rpx;
    z-index: 3;
    background: #fff;
    transition: left 0.2s ease-in-out;

    .left {
      width: 160rpx;
      position: relative;

      .cover {
        margin: 22rpx 32rpx;
        width: 96rpx;
        height: 96rpx;
        @include cover-img();

      }

      .item-tag {
        position: absolute;
        right: 32rpx;
        top: 22rpx;
        transform: translate(50%, -50%);
        background: #F53636;
        height: 14px;
        text-align: center;
        line-height: 14px;
        padding: 0 3px;
        border-radius: 7px;
        color: #fff;
        font-size: 10px;

        &.circle {
          width: 14px;
          padding: 0px 0px 0px 0px;
          border-radius: 50%;
        }
      }
    }

    .right {
      width: 590rpx;
      padding: 30rpx 30rpx 30rpx 0;
      box-sizing: border-box;
      border-bottom: 1px solid #ECECEC;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .nickname {
        max-width: 400rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .msg {
        max-width: 600rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .none {
    text-align: center;
    padding: 60rpx 0;
    color: #B0B0B0;
    font-size: 26rpx;
  }

  .none .img {
    height: 220rpx;
    width: 200rpx;
  }
</style>
