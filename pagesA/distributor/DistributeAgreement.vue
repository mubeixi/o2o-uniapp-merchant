<template>
  <view @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="pro_detail">
      <!-- #ifdef H5||APP-PLUS -->
      <div class="p_detail_des" v-html="formatRichTexts(pro.dis_config.Distribute_Agreement)"></div>
      <!-- #endif -->
      
      <!-- #ifdef MP -->
      <rich-text :nodes="pro.dis_config.Distribute_Agreement|formatRichText" class="p_detail_des"></rich-text>
      <!-- #endif -->
    
    </div>
  </view>
</template>

<script>
import { disApplyInit } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      pro: [],
    }
  },
  onLoad () {
    this.disApplyInit()
  },
  methods: {
    disApplyInit () {
      disApplyInit().then(res => {
        this.pro = res.data
      }).catch(e => {
      
      })
    },
    formatRichTexts (html) {
      if (!html) return
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        
        // 图片app不支持
        // #ifdef APP-PLUS
        match = match.replace(/!*.webp/gi, '')
        // #endif
        
        return match
      })
      newContent = newContent.replace(/<div[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        return match
      })
      newContent = newContent.replace(/<p[^>]*>/gi, '')
      newContent = newContent.replace(/<[/]p[^>]*>/gi, '')
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;')
        return match
      })
      
      newContent = newContent.replace(/<br[^>]*\/>/gi, '')
      newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"')
      newContent = newContent.replace(/src="\/\//gi, 'src="http://')
      // newContent = newContent.replace(/>[\s]*</gi, "><");
      
      return newContent
    },
  },
  filters: {
    formatRichText (html) { // 控制小程序中图片大小
      if (!html) return
      let newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        return match
      })
      newContent = newContent.replace(/<div[^>]*>/gi, function (match, capture) {
        match = match.replace(/style="[^"]+"/gi, '')// .replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '')// .replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '')// .replace(/height='[^']+'/gi, '');
        return match
      })
      newContent = newContent.replace(/<p[^>]*>/gi, '')
      newContent = newContent.replace(/<[/]p[^>]*>/gi, '')
      newContent = newContent.replace(/style="[^"]+"/gi, function (match, capture) {
        match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;')
        return match
      })
      
      newContent = newContent.replace(/<br[^>]*\/>/gi, '')
      newContent = newContent.replace(/\<img/gi, '<img style="width:100%;float:left;"')
      // newContent = newContent.replace(/>[\s]*</gi, "><");
      
      return newContent
    },
  },
}
</script>

<style lang="scss" scoped>
  .pro_detail {
    .p_detail_des {
      width: 100%;
      font-size: 28rpx;
      color: #999;
      
      img {
        width: 100% !important;
      }
    }
  }
  
  .p_detail_title {
    padding: 30rpx 20rpx;
    color: #333;
    font-size: 30rpx;
  }
  
  /* 商品详情 end */
  /* 遮罩层 */
  .modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 1000;
  }
</style>
