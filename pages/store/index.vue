<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>

    <store-theme-default ref="childDefault" @upStoreInfo="bindUpStoreInfo" :bid="bid" v-if="skin_id===0"></store-theme-default>
    <store-theme-one ref="childOne" @upStoreInfo="bindUpStoreInfo" :bid="bid" v-if="skin_id===1"></store-theme-one>
    <store-theme-two ref="childTwo" @upStoreInfo="bindUpStoreInfo" :bid="bid" v-if="skin_id===2"></store-theme-two>
    <store-theme-three ref="childThree" @upStoreInfo="bindUpStoreInfo" :bid="bid" v-if="skin_id===3"></store-theme-three>

    <!--101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期-->
<!--    <div @click="toRoom" class="live-status-box" v-if="liveStatus == 101 || liveStatus == 105 || liveStatus == 102">-->
<!--      <image class="icon" src="/static/live/live-pre.png" v-if="liveStatus ==102"></image>-->
<!--      <image class="icon" src="/static/live/live-ing.png" v-if="liveStatus ==101 || liveStatus ==105"></image>-->
<!--    </div>-->

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { modal } from '@/common/fun'
import { buildSharePath, checkIsLogin } from '@/common/helper'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import StoreThemeDefault from '@/pages/store/components/store-theme-default'
import StoreThemeOne from '@/pages/store/components/store-theme-one'
import StoreThemeTwo from '@/pages/store/components/store-theme-two'
import StoreThemeThree from '@/pages/store/components/store-theme-three'
import { getBizInfo } from '@/api/store'
// #ifdef MP-WEIXIN
// const livePlayer = requirePlugin('live-player-plugin')
// #endif
export default {
  name: 'StoreIndex',
  components: {
    StoreThemeThree,
    StoreThemeTwo,
    StoreThemeOne,
    StoreThemeDefault,
    WzwImTip
  },
  mixins: [BaseMixin],
  computed: {},
  data () {
    return {
      mode: 'default',
      bid: '',
      skin_id: -1,
      storeInfo: {}
    }
  },
  methods: {
    init () {
      if (this.mode === 'preview') return// 自己上了
      getBizInfo({ biz_id: this.bid }).then(res => {
        this.skin_id = Number(res.data[0].skin_id)
      })
    },
    bindUpStoreInfo (storeInfo) {
      this.storeInfo = storeInfo
      // const { room_id, live_end_time, live_start_time } = this.storeInfo
      // if (room_id) {
      //   const nowTimeStamp = uni.$moment().unix()
      //   // console.log(nowTimeStamp)
      //   if (live_end_time && live_start_time) {
      //     if (nowTimeStamp > live_start_time && nowTimeStamp < live_end_time) {
      //       this.liveStatus = 101
      //     }
      //
      //     if (nowTimeStamp < live_start_time) {
      //       this.liveStatus = 102
      //     }
      //   }
      //
      //   // 首次获取立马返回直播状态
      //   const roomId = room_id // 房间 id
      //   livePlayer.getLiveStatus({ room_id: roomId })
      //     .then(res => {
      //       // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
      //       this.liveStatus = res.liveStatus
      //
      //       console.log('get live status', res.liveStatus)
      //     })
      //     .catch(err => {
      //       console.log('get live status', err)
      //     })
      // }
    }
  },

  // onPageScroll (e) {
  //   const { scrollTop } = e
  //   this.pageScrollTop = scrollTop
  //   this.headTabSticky = scrollTop > this.headTabTop
  // },
  onShow () {
    // #ifdef MP-WEIXIN
    wx.hideHomeButton()
    // #endif

    // 登陆后
    if (checkIsLogin(0, 0)) {
      if (this.skin_id === 3) this.$refs.childThree && this.$refs.childThree.refreshFn()
      if (this.skin_id === 2) this.$refs.childTwo && this.$refs.childTwo.refreshFn()
      if (this.skin_id === 1) this.$refs.childOne && this.$refs.childOne.refreshFn()
      if (this.skin_id === 0) this.$refs.childDefault && this.$refs.childDefault.refreshFn()
    }
  },
  mounted () {

  },
  onLoad (options) {
    if (!options.biz_id) {
      modal('店铺id缺失')
      return
    }
    this.bid = parseInt(options.biz_id)
    // biz_id=2&origin=merchat&action=preview&skin_id=1
    const { origin = '', action = '', skin_id = null } = options
    if (origin === 'merchat' && action === 'preview' && skin_id) {
      this.mode = 'preview'
      this.skin_id = Number(skin_id)
    }

    this.init()
  },
  created () {

  },
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pages/store/index?biz_id=' + this.bid
    const shareObj = {
      title: this.storeInfo.biz_shop_name,
      desc: this.storeInfo.intro,
      imageUrl: this.storeInfo.biz_logo,
      path: buildSharePath(path)
    }
    return shareObj
  },
  onReady () {

  }
}
</script>
<style lang="scss" scoped>
  .live-status-box {
    position: fixed;
    z-index: 999;
    right: 15px;
    bottom: 25px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);

    .icon {
      margin: 7px;
      width: 46px;
      height: 46px;
    }
  }

  .page-wrap {
    background: #f2f2f2;
    position: absolute;
    width: 750rpx;
    left: 0;
    top: 0;
    z-index: 1;
    height: 100vh;
    overflow: hidden;
  }

</style>
