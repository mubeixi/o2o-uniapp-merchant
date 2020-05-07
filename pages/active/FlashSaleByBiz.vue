<template>
  <div class="flashSale-all" :style="{backgroundImage:'url('+$getDomain('/static/client/flash-sale-bg.jpg')+')'}">
    <div class="flex flex-vertical-c seckill-title" :style="{marginTop:menuButtonInfo.top+'px'}">
      <layout-icon type="iconicon-arrow-left" size="20" color="#fff" class="back-icon m-r-2" @click="$back"></layout-icon>
      <image class="seckill-title-img m-r-10" :src="bizInfo[0].biz_logo"></image>
      <span class="seckill-title-text" :style="{width:(menuButtonInfo.left-80)+'px'}">{{bizInfo[0].biz_shop_name}}（{{bizInfo[0].biz_address}}）</span>
    </div>

    <div class="flashSale-time flex flex-justify-c flex-vertical-c m-b-44">
      <block v-if="!countdown.is_end">
        距{{countdown.is_start?'结束':'开始'}}还有： {{countdown.d}}天 <span class="span-time m-l-6">{{countdown.h}}</span>：<span
        class="span-time">{{countdown.m}}</span>：<span class="span-time">{{countdown.s}}</span>
      </block>
      <block v-else>
        已经结束
      </block>
    </div>

    <div class="flashSale-item flex flex-vertical-c" v-for="(item,index) of produtList" @click="$toGoodsDetail(item)" :key="index">
      <div class="flashSale-item-left">
        <image class="img-full" :src="item.ImgPath"></image>
      </div>
      <div class="flashSale-item-right">
        <div class="item-title">
          {{item.Products_Name}}
        </div>
        <div class="flex flex-vertical-c flex-justify-between">
          <div class="fz-10 item-price">
            <span class="fz-11 ">¥<span class="fz-18 m-l-2">{{item.price}}</span></span>
            <span class="priceY fz-14"><span class="fz-10 m-r-2">¥</span>{{item.Products_PriceX}}</span>
          </div>
          <div class="now-buy">
            马上抢
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin.js'
import { getBizSpikeDetail, getSpikeProd } from '@/api/product'
import { getBizInfo } from '@/api/store'
import { getCountdownFunc } from '@/common/helper'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

let countdownInstance = null
export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      biz_id: null,
      bizInfo: [],
      postData: {
        page: 1,
        pageSize: 999
      },
      activeId: null,
      activeInfo: {},
      produtList: [],
      countdown: {
        h: 0,
        s: 0,
        m: 0,
        d: 0
      }
    }
  },
  methods: {
    async getBiz () {
      this.bizInfo = await getBizInfo({ biz_id: this.biz_id }, { onlyData: true }).catch(e => {
        throw Error(e.msg || '获取商家信息错误')
      })
    },
    async init () {
      this.postData.biz_id = this.biz_id
  
      this.activeInfo = await getBizSpikeDetail({
        ...this.postData,
        spike_id: this.activeId
      }, { onlyData: true }).catch(e => {
        throw Error(e.msg || '获取抢购活动信息失败')
      })
  
      countdownInstance = setInterval(this.stampFunc, 1000)
      
      this.produtList = await getSpikeProd({
        ...this.postData,
        spike_id: this.activeId
      }, {
        tip: '加载中',
        onlyData: true
      }).catch(e => {
        throw Error(e.msg || '获取抢购商品列表失败')
      })

      
    },
    stampFunc () {
      const data = getCountdownFunc({
        start_timeStamp: this.activeInfo.start_time,
        end_timeStamp: this.activeInfo.end_time
      })
      if (data) {
        this.countdown = data
      } else {
        clearInterval(countdownInstance)
      }
    }
  },
  onLoad (options) {
    // this.biz_id=options.biz_id
    this.activeId = options.spike_id
    this.biz_id = options.biz_id
    this.getBiz()
  },
  onShow () {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .flashSale-all {
    width: 750rpx;
    overflow-x: hidden;
    min-height: 100vh;
    height: auto;
    background-size: 100%;
  }

  .seckill-title {
    padding-left: 5px;
    height: 80rpx;
    line-height: 80rpx;
    box-sizing: border-box;
    color: #FFFFFF;
    font-weight: bold;

    &-text {
      display: inline-block;
      height: 80rpx;
      line-height: 80rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-img {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
  }

  .flashSale-time {
    width: 508rpx;
    height: 66rpx;
    margin: 158rpx auto;
    background: rgba(255, 195, 34, 1);
    box-shadow: 0px 8rpx 0px 0px rgba(0, 0, 0, 0.15);
    border-radius: 16rpx;
    font-size: 30rpx;
    color: #6B1000;

    .span-time {
      display: inline-block;
      height: 46rpx;
      line-height: 46rpx;
      width: 46rpx;
      text-align: center;
      color: #FFFFFF;
      background-color: #6B1000;
    }
  }

  .flashSale-item {
    width: 710rpx;
    height: 232rpx;
    box-sizing: border-box;
    padding: 16rpx 20rpx;
    background-color: #FFFFFF;
    margin: 0 auto 24rpx;
    border-radius: 16rpx;

    &-left {
      width: 200rpx;
      height: 200rpx;
      margin-right: 24rpx;
    }

    &-right {
      height: 200rpx;
      width: 446rpx;
    }

  }

  .item-title {
    height: 70rpx;
    width: 446rpx;
    font-size: 14px;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    margin-top: 16rpx;
    margin-bottom: 44rpx;
  }

  .item-price {
    color: #FF0000;
  }

  .priceY {
    text-decoration: line-through;
    color: #bfbfbf;
    margin-left: 12rpx;
  }

  .now-buy {
    width: 144rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    font-size: 30rpx;
    color: #FFFFFF;
    background: linear-gradient(90deg, rgba(245, 49, 47, 1) 0%, rgba(240, 132, 47, 1) 100%);
    border-radius: 30rpx;
  }

</style>
