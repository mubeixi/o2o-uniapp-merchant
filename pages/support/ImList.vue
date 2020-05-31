<template>
  <div class="page-wrap"  @click="commonClick">
    <div class="chat-list" v-if="chatList.length>0">
      <div class="chat-item flex" @click="toRoom(idx)" v-for="(chat,idx) in chatList" :key="idx">
        <div class="left">
          <div class="cover" :style="{backgroundImage:'url('+chat.avatar+')'}"></div>
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
    </div>
    <div class="none" v-else>
      <image :src="'/static/client/box.png'|domain" class="img" />
      <div class="m-t-15"><span>信箱是空的</span></div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getChatList } from '@/common/Im/Fetch'
import { modal } from '@/common/fun'
import IM from '@/common/Im/Im'
import Storage from '@/common/Storage'
import { checkIsLogin } from '@/common/helper'
import eventHub from '@/common/eventHub'
let imInstance = null
export default {
  mixins: [BaseMixin],
  data () {
    return {
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
    toRoom (idx) {
      const chatItem = this.chatList[idx]
      // 客户得找商家聊
      const str = chatItem.to_uid.indexOf('biz') !== -1 ? chatItem.to_uid : chatItem.from_uid
      const breakStrIdx = str.indexOf('_')
      if (breakStrIdx === -1) {
        modal('进入聊天室失败')
        return
      }
      const type = str.substr(0, breakStrIdx)
      const id = str.substr(breakStrIdx + 1)
      this.$linkTo(`/pagesA/support/Im?type=${type}&tid=${id}`)
    },
    async _init_func () {
      await imInstance._getAccessToken() // 等拿token
      const chatList = await getChatList({ page: this.paginate.page, page_size: this.paginate.page_size, out_uid: this.out_uid }).then(res => {
        this.paginate.totalCount = res.totalCount
        return res.data
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
      getChatList({ page: this.paginate.page, page_size: this.paginate.page_size, out_uid: this.out_uid }).then(res => {
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
    imInstance.setSendInfo({ type: 'user', id: Storage.get('user_id') })
    this.out_uid = imInstance.getOutUid()

    this._init_func()
  },
  onShow () {

  }
}
</script>
<style lang="scss" scoped>
.page-wrap{
  min-height: 100vh;
  background: #fff;
}
.chat-item{
  height: 140rpx;
  .left{
    width: 160rpx;
    .cover{
      margin: 22rpx 32rpx;
      width: 96rpx;
      height: 96rpx;
      @include cover-img(cover,0,none);
    }
  }
  .right{
      width: 590rpx;
      padding: 30rpx 30rpx 30rpx 0;
      box-sizing: border-box;
    border-bottom: 1px solid #ECECEC;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .nickname{
      max-width: 400rpx;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .msg{
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
