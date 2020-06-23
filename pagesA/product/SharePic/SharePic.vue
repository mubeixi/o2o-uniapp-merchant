<template>
  <div class="wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="bg"></div>
    <div :style="{backgroundImage:'url('+$getDomain('/static/client/moneybox.png')+')'}" class="moneybox font14">
      分销佣金<span class="font14" style="color: #f43838">￥</span><span
      class="money">{{info.product.share_commission}}</span>
    </div>
    <div @click="preview" class="imgbox">
      <image :src="info.img_url" class="img"></image>
    </div>
  </div>
</template>

<script>
import Storage from '@/common/Storage'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      info: {},
    }
  },
  methods: {
    preview () {
      uni.previewImage({
        urls: [this.info.img_url],
        indicator: 'default',
        current: 0,
      })
    },
  },
  created () {
    this.info = Storage.get('temp_sharepic_info')
    
    uni.showToast({
      position: 'top',
      icon: 'none',
      title: '点击图片后,长按保存',
    })
  },
}
</script>

<style lang="scss" scoped>
  .wrap {
    padding: 20rpx;
    position: relative;
    
    .bg {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 0;
      background-image: url("https://new401.bafangka.com/uploadfiles/wkbq6nc2kc/image/5daa7f9be1.jpg");
    }
    
    .moneybox {
      position: relative;
      z-index: 2;
      height: 180rpx;
      line-height: 180rpx;
      text-align: center;
      color: #555;
      border-radius: 6px;
      overflow: hidden;
      
      .money {
        color: #f43838;
        font-size: 18px;
      }
    }
    
    .imgbox {
      position: relative;
      z-index: 2;
      margin-top: 40rpx;
      
      .img {
        width: 710rpx;
        /*height:1100rpx;*/
      }
    }
  }
</style>
