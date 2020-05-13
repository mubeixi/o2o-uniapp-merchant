<template>
  <div class="">
<!--   :scroll-top="toViewPosition"   :scroll-into-view='toViewIdx'-->
    <scroll-view
      scroll-y
      class="im-card-box"
      :scroll-into-view='toViewIdx'
      :style="{paddingBottom:'110rpx'}"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      @refresherrestore="onRestore"
      @refresherrefresh="onRefresh"
    >
      <block v-for="(chat,idx) in chatList" :key="idx">
        <div class="im-item-box">
          <wzw-im-card
            :msg-id="'msg-'+idx"
            :message="chat"
          />
          <!--用来搞事的-->
          <div class="div-line h10" :id="'msg-'+idx"></div>
        </div>
      </block>
      <div :style="{height:'426rpx'}" v-if="showOnther"></div>
    </scroll-view>
    <div class="im-bottom-action">
      <div class="text">
        <div class="input-box">
          <input type="text" confirm-type="发送" @confirm="sendMsg" @focus="mode='text'" @blur="inputBlur" class="input-ele"  v-model="tempText" />
        </div>
        <div class="submit-btn">
          <image class="img-btn" @click="taggleMore" src="/static/im/im-action-more.png"></image>
        </div>
      </div>
      <div class="onther" v-if="showOnther">
        <div class="onther-item" @click="sendImg">
          <image src="/static/im/im-action-img.png" class="icon-box"></image>
          <div class="label">图片</div>
        </div>
        <div class="onther-item" @click="sendCamera">
          <image src="/static/im/im-action-camera.png" class="icon-box"></image>
          <div class="label">拍照</div>
        </div>
      </div>
      <div class="safearea-space"></div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  checkIsLogin,
  chooseImageByPromise, createUpTaskArr,
  getArrColumn,
  getDomain,
  setNavigationBarTitle,
  uploadImages
} from '@/common/helper'
import IM from '@/common/Im/Im'
import { error } from '@/common/fun'
import Storage from '@/common/Storage'
import WzwImCard from '@/componets/wzw-im-card/wzw-im-card'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { Exception } from '@/common/Exception'
let imInstance = null
const progressList = []
export default {
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    WzwImCard

  },
  data () {
    return {
      isFreshing: false,
      triggered: false,
      mode: '',
      showOnther: false,
      imInstance: null,
      imReady: false,
      tempText: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
    toViewPosition () {
      try {
        // - 1指向最后一个占位的就好了
        return this.imInstance.chatList.length * 1000
      } catch (e) {
        return 0
      }
    },
    toViewIdx () {
      try {
        // - 1指向最后一个占位的就好了
        return 'msg-' + (this.imInstance.chatList.length - 1)
      } catch (e) {
        return ''
      }
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
  /**
   * 下拉加载更多
   */
  onPullDownRefresh () {

  },
  methods: {
    onRefresh () {
      if (this.isFreshing) return
      this.isFreshing = true
      // 不论成功还是失败
      this.imInstance.getHistory().finally(() => {
        this.triggered = false
        this.isFreshing = false
      })
    },
    onRestore () {
      this.triggered = 'restore' // 需要重置
    },
    async sendImg () {
      try {
        const files = await chooseImageByPromise({ sizeType: 1, sourceType: ['album'] }).catch(err => { throw Error(err.errMsg || '选择照片失败') })
        const imgs = getArrColumn(files, 'path')

        imInstance.sendImMessage({ content: '', type: 'image', tempPath: imgs[0] })
      } catch (e) {
        Exception.handle(e)
      }
    },
    async sendCamera () {
      try {
        const files = await chooseImageByPromise({ sizeType: 1, sourceType: ['camera'] }).catch(err => { throw Error(err.errMsg || '选择照片失败') })
        const imgs = getArrColumn(files, 'path')
        imInstance.sendImMessage({ content: '', type: 'image', tempPath: imgs[0] })
      } catch (e) {
        Exception.handle(e)
      }
    },
    inputBlur () {
      if (!this.tempText) {
        this.mode = ''
      }
    },
    taggleMore () {
      this.showOnther = !this.showOnther
    },
    async _init_func (options) {
      const { productId, orderId, origin } = options

      setNavigationBarTitle('Im')
      this.imInstance = imInstance = new IM({ productId, orderId, origin })
      // 设置本地用户信息
      imInstance.setSendInfo({ type: 'user', id: Storage.get('user_id') })
      // 设置接收人的信息
      imInstance.setReceiveInfo({ type: 'biz', id: 3 })

      await imInstance.start() // 等拿token
      this.imReady = true
    },
    sendMsg () {
      if (!this.tempText) {
        error('请输入内容')
        return
      }
      imInstance.sendImMessage({ content: this.tempText })
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
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    overflow-y: scroll;
    width: 750rpx;
    background: #e5e5e5;
  }
  .im-bottom-action{
    position: fixed;
    width: 750rpx;
    left: 0;
    bottom: 0;
    background: #f2f2f2;
    .safearea-space{
      height: constant(safe-area-inset-bottom);
      height: env(safe-area-inset-bottom);
    }
    .onther{
      padding: 40rpx 0;
      display: flex;
      .onther-item{
        width: 96rpx;
        height: 126rpx;
        margin-left: 70rpx;
        text-align: center;
        .label{
          font-size: 28rpx;
          height: 30rpx;
          line-height: 30rpx;
          color: #666;
        }
        .icon-box{
          width: 96rpx;
          height: 96rpx;
        }

      }
    }
    .text{
      display: flex;
      align-items: center;
      width: 750rpx;
      height: 110rpx;
      border-bottom: 1px solid #E2E2E2;
      .input-box{
        margin-left: 20rpx;
        flex: 1;
        display: flex;
        align-items: center;
        .input-ele{
          flex: 1;
          margin-right: 20rpx;
          padding: 0 20rpx;
          background: #fff;
          border: 1px solid #eee;
          height: 70rpx;
          line-height: 70rpx;
          border-radius: 70rpx;
          font-size: 28rpx;
        }
      }
      .submit-btn{
        margin-right: 20rpx;
        .img-btn{
          width: 48rpx;
          height: 48rpx;
        }
       .btn{
         width: 120rpx;
         text-align: center;
         line-height: 70rpx;
         height: 70rpx;
         border-radius: 70rpx;
         background: $fun-primary-color;
         color: #fff;
         font-size: 28rpx;
       }
      }
    }

  }
</style>
