<template>
  <view class="page-wrap">
    
    <image @click="preFn(current_url)" :src="current_url|domain" style="width: 750rpx" mode="widthFix" />
    
    <div class="swiper">
      <div class="swiper-item" @click="setSelect(poster)" v-for="(poster,idx) in poster_list">
        <image class="swiper-itm-img" :src="poster.img|domain" mode="widthFix"></image>
      </div>
    </div>
    
    <!--		<div class="share-btn" @click="shareFn">-->
    <!--			分享-->
    <!--		</div>-->
    
    <!--		<canvas style="width: 404px; height: 718px;" canvas-id="firstCanvas"></canvas>-->
  </view>
</template>
<script>

import { mapActions } from 'vuex'

import { getDistributeWxQrcode, getPosterDetail, getPosterList } from '@/api/common'
import { error } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      type: '',
      again: '',
      current_url: '',
      current_poster: null,
      currentIdx: 0,
      is_build: false,
      qrimg: '',
      poster_list: [],
      // userInfo:{},
      disInfo: {},
      info: {
        dis_config: {},
        total_sales: '',
        total_income: '',
        balance: '',
      },//
      
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  onReady () {
    var context = uni.createCanvasContext('firstCanvas')
    
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
  },
  onShow () {
  
  },
  onLoad (options) {
    const { type, again } = options
    this.type = type
    this.again = again
    this.initFunc(type, again)
  },
  methods: {
    setSelect (poster) {
      this.current_poster = poster
      getDistributeWxQrcode({
        type: this.type,
        again: this.again,
        owner_id: this.userInfo.User_ID,
        poster_id: poster.id,
      }, { tip: '生成中' }).then(res => {
        this.current_url = res.data.img_url
      })
      // this.current_url = poster.img
    },
    preFn () {
      if (!this.current_url) {
        error('请选择模板')
        return
      }
      uni.previewImage({
        urls: [this.current_url],
      })
    },
    async shareFn () {
      if (this.is_build) return// 防止太快点击
      this.is_build = true
      const getPosterDataResult = await getPosterDetail({ id: this.poster_list[this.currentIdx].id })
      const posterConf = JSON.parse(getPosterDataResult.data.data)
    },
    handleChange (e) {
      this.currentIdx = e.detail.current
    },
    ...mapActions(['getUserInfo']),
    async initFunc (type, again) {
      try {
        // 先获取二维码
        // let qrRet = await getDistributeWxQrcode({type,again,owner_id:this.userInfo.User_ID},{tip:'生成中'})
        // this.qrimg = qrRet.data.img_url;
        
        const getPosterListResult = await getPosterList({ pageSize: 999 })
        const lists = getPosterListResult.data
        this.poster_list = lists.map(item => {
          item.img += '-r200'
          return item
        })
        
        if (this.poster_list.length > 0) {
          getDistributeWxQrcode({
            type,
            again,
            owner_id: this.userInfo.User_ID,
            poster_id: this.poster_list[0].id,
          }, { tip: '生成中' }).then(res => {
            this.current_url = res.data.img_url
          })
          // = this.poster_list[0].img
        }
      } catch (e) {
        error(e.msg || '获取海报模板失败')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .page-wrap {
    
    .swiper {
      z-index: 9;
      width: 750rpx;
      height: 244rpx;
      background: white;
      position: fixed;
      bottom: 0px;
      left: 0;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      z-index: 3;
      
      .swiper-item {
        display: inline-block;
        width: 116rpx;
        height: 244rpx;
        margin-left: 30rpx;
        position: relative;
        
        .swiper-itm-img {
          width: 116rpx;
          height: 116rpx;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          border: 1px solid #e7e7e7;
        }
      }
    }
    
    .share-btn {
      position: absolute;
      bottom: 0;
      width: 750rpx;
      text-align: center;
      height: 50px;
      line-height: 50px;
      background: $fun-red-color;
      color: white;
    }
  }
</style>
