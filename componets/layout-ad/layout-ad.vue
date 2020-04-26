<style scoped lang="scss">
  .wrap {
    position: relative;

    .swiper {
      &-item {
        position: relative;

        &-img {
          width: 100%;
        }

        &-cover {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          @include cover-img(contain);
        }
      }

    }

    .dot-list {
      display: flex;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      .dot-item {
        width: 30rpx;
        height: 4rpx;
        margin-right: 6rpx;

        &:last-child {
          margin-right: 0;
        }

        &.active {
          //background: $fun-primary-color;
        }
      }
    }
  }
</style>
<template>
  <div class="wrap">
    <swiper
      :style="{width:w,height:h}"
      class="swiper"
      @change="indexChangeEvent"
      :indicator-dots="indicatorDots==='circle'"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration">
      <swiper-item class="swiper-item" v-for="(img,idx) in imgList" :key="idx" @click="bindClick(idx)">
        <image @load="handleImgLoad" :id="'img'+idx" mode="widthFix" class="swiper-item-img" :src="img"></image>
        <!--          <div class="swiper-item-cover" :style="{width:itemwidth,height:itemheight,backgroundImage:'url('+img+')'}"></div>-->
      </swiper-item>
    </swiper>
    <div class="dot-list" v-if="indicatorDots==='line'">
        <span
          v-for="(img,idx) in imgList"
          :key="idx"
          class="dot-item"
          :class="{active:current===idx}"
          :style="{backgroundColor:current===idx?dotsActiveColor:dotsColor}"></span>
    </div>
  </div>
</template>
<script>
import { getAdvertList } from '@/api/common'
import { getArrColumn, getDomain } from '@/common/helper'
import { linkToEasy } from '@/common/fun'
import { Exception } from '@/common/Exception'

export default {
  name: 'LayoutAd',
  props: {
    imgs: {
      type: Array,
      default: () => []
    },
    width: {
      default: '750rpx',
      type: String
    },
    height: {
      default: '250rpx',
      type: String
    },
    itemwidth: {
      default: '750rpx',
      type: String
    },
    itemheight: {
      default: '250rpx',
      type: String
    },
    indicatorDots: {
      type: [Boolean, String],
      default: false
    },
    circular: {
      default: true,
      type: Boolean
    },
    vertical: {
      default: false
    },
    autoplay: {
      default: false
    },
    dotsColor: {
      default: 'rgba(0,0,0,.3)'
    },
    dotsActiveColor: {
      default: '#26C78D'
    },
    interval: {
      default: 2000
    },
    duration: {
      default: 500
    },
    code: {
      type: String
    }
  },
  computed: {
    w () {
      try {
        return this.boxw[this.current]
      } catch (e) {
        return this.width
      }
    },
    h () {
      try {
        return this.boxh[this.current]
      } catch (e) {
        return this.height
      }
    }
  },
  data () {
    return {
      boxw: [],
      boxh: [],
      urls: [],
      imgList: [],
      current: 0
    }
  },
  async created () {
    if (this.code) {
      try {
        const imgs = await getAdvertList({ ad_code: this.code }, { onlyData: true }).catch(err => { throw Error(err.msg || '初始化广告组件失败') })
        const tempimgs = getArrColumn(imgs, 'image')
        this.imgList = tempimgs.map(imgsrc => getDomain(imgsrc))
        this.urls = getArrColumn(imgs, 'link')
      } catch (e) {
        Exception.handle(e)
      }
    } else {
      this.imgList = this.imgs
    }
  },
  methods: {
    bindClick (idx) {
      if (!this.code) return
      if (this.urls[idx]) {
        const { link } = this.urls[idx]
        if (link) linkToEasy(link)
      }
    },
    handleImgLoad (e) {
      const { width, height } = e.detail

      const idx = e.target.id.replace('img', '')

      this.$set(this.boxw, idx, 750 + 'rpx')
      this.$set(this.boxh, idx, 750 * height / width + 'rpx')

      // console.log(this.boxh, this.boxw)
    },
    indexChangeEvent (event) {
      const { current } = event.detail

      this.current = current
      // const query = uni.createSelectorQuery().in(this)
      // query.select('#img' + current).boundingClientRect(data => {
      //   const { width, height } = data
      //   this.boxw[current] = width + 'px'
      //   this.boxh[current] = height + 'px'
      //
      //   console.log(this.boxw,this.boxh)
      // }).exec()
    }
  }
}
</script>
