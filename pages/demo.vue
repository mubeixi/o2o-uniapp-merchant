<template>
  <div class="">
    <div class="im-card-box">
    <wzw-im-card
      v-for="(chat,idx) in chatList"
      :key="idx"
      :message="chat"
    />
    </div>
    <div class="im-bottom-action">
      <div class="input-box">
        <input class="input-ele"  v-model="tempText" />
      </div>
      <div class="submit-btn" @click="sendMsg">发送</div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { checkIsLogin, setNavigationBarTitle } from '@/common/helper'
import IM from '@/common/Im/Im'
import { error } from '@/common/fun'
import Storage from '@/common/Storage'
import WzwImCard from '@/componets/wzw-im-card/wzw-im-card'
let imInstance = null
export default {
  mixins: [BaseMixin],
  components: {
    WzwImCard

  },
  data () {
    return {
      imInstance: null,
      imReady: false,
      tempText: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
    chatList () {
      try {
        const list = this.imInstance.chatList
        return list || []
      } catch (e) {
        return []
      }
    }
  },
  onLoad (options) {
    if (!checkIsLogin(1, 0)) return
    this._init_func(options)
  },
  created () {

  },
  onShow () {

  },
  methods: {
    async _init_func (options) {
      const { productId, orderId, origin } = options

      setNavigationBarTitle('Im')
      this.imInstance = imInstance = new IM({ productId, orderId, origin })
      // 设置本地用户信息
      imInstance.setSendInfo({ type: 'user', id: Storage.get('user_id') })
      // 设置接收的信息
      imInstance.setReceiveInfo({})
      await imInstance.start() // 等拿token
      this.imReady = true
    },
    sendMsg () {
      if (!this.tempText) {
        error('请输入内容')
        return
      }
      imInstance.sendMessage(this.tempText)
      this.tempText = ''
    },
    bindInputChange (e) {
      this.tempText = e.detail.value
    }
  }
}
</script>
<style lang="scss" scoped>
  .im-card-box{
    position: fixed;
    top: 0;
    bottom: 44px;
    overflow-y: scroll;
    width: 750rpx;
    background: #e5e5e5;
  }
  .im-bottom-action{
    position: fixed;
    width: 750rpx;
    left: 0;
    height: 44px;
    bottom: 0;
    background: #fff;
    display: flex;
    align-items: center;
    .input-box{
      flex: 1;
      display: flex;
      align-items: center;
      .input-ele{
        flex: 1;
        margin: 0 10px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 2px;
        height: 32px;
        line-height: 32px;
        padding: 0 6px;
        font-size: 14px;
      }
    }
    .submit-btn{
      width: 120rpx;
      text-align: center;
      line-height: 44px;
      background: $fun-primary-color;
      color: #fff;
      font-size: 14px;
    }
  }
</style>
