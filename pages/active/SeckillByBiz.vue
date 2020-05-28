<template>
  <div class="seckill-all" :style="{backgroundImage:'url('+$getDomain('/static/client/seckill-bg.png')+')'}"   @click="commonClick">

    <div class="flex flex-vertical-c seckill-title" :style="{marginTop:menuButtonInfo.top+'px'}">
      <layout-icon type="iconicon-arrow-left" size="20" color="#fff" class="back-icon m-r-2"
                   @click="$back()"></layout-icon>
      <block v-if="biz_id">
        <image class="seckill-title-img m-r-10" :src="bizInfo.biz_logo"></image>
        <span class="seckill-title-text" :style="{width:(menuButtonInfo.left-80)+'px'}">{{bizInfo.biz_shop_name}}（{{bizInfo.biz_address}}）</span>
      </block>
      <block v-else>
        <span class="seckill-title-text" :style="{width:(menuButtonInfo.left-80)+'px'}">秒杀活动</span>
      </block>
    </div>

    <scroll-view scroll-y class="seckill-list" :style="{top:menuButtonInfo.bottom+120+'px'}">
      <div class="seckill-list-item  flex m-b-20" v-for="(item,index) of seckillList" :key="index" @click="$toGoodsDetail(item)">
        <div class="seckill-item-left">

          <div class="item-cover" :style="{backgroundImage: 'url('+item.ImgPath+')'}"></div>
        </div>
        <div class="seckill-item-right">
          <div class="seckill-item-title m-t-4 c3">
            {{item.Products_Name}}
          </div>
          <div class="fz-10 seckill-item-price">
            <span class="fz-11 m-r-2">¥<span class="fz-16">{{item.price}}</span></span>
            <span class="priceY">{{item.Products_PriceX}}</span>
          </div>
          <block v-if="item.countdown">
            <div class="seckill-item-time c3 fz-12" v-if="!item.countdown.is_end">
              距{{item.countdown.is_start?'结束':'开始'}}还有：{{item.countdown.d}}天 <span class="span-time m-l-4">{{item.countdown.h}}</span>：<span
              class="span-time">{{item.countdown.m}}</span>：<span class="span-time">{{item.countdown.s}}</span>
            </div>
            <div class="seckill-item-time c3 fz-12" v-else>
              已经结束
            </div>
          </block>
        </div>
      </div>
    </scroll-view>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin.js'
import { bizFlashsaleList, getFlashsaleList } from '@/api/product'
import { getBizInfo } from '@/api/store'
import { getCountdownFunc } from '@/common/helper'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { hideLoading, modal, showLoading } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      biz_id: null,
      bizInfo: {},
      postData: {
        page: 1,
        pageSize: 999
      },
      activeId: null,
      start_time: '',
      end_time: '',
      activeInfo: {},
      page: 1,
      pageSize: 5,
      totalCount: 0,
      seckillList: []
    }
  },
  methods: {
    // 倒计时
    stampFunc () {
      for (const item of this.seckillList) {
        let start_time = item.start_time
        let end_time = item.end_time

        start_time = start_time.replace(/-/g, '/')
        start_time = new Date(start_time)
        start_time = start_time.getTime()
        start_time = start_time / 1000

        end_time = end_time.replace(/-/g, '/')
        end_time = new Date(end_time)
        end_time = end_time.getTime()
        end_time = end_time / 1000

        const data = getCountdownFunc({
          start_timeStamp: start_time,
          end_timeStamp: end_time
        })
        this.$set(item, 'countdown', data)
      }
    },
    async init () {
      try {
        showLoading()
        if (this.biz_id) {
          this.bizInfo = await getBizInfo({ biz_id: this.biz_id }).then(res => {
            return res.data[0]
          }).catch(e => {
            throw Error(e.msg || '获取商家信息错误')
          })
        }

        const data = {
          page: this.page,
          pageSize: this.pageSize
        }
        if (this.biz_id) {
          data.biz_id = this.biz_id
        }
        this.seckillList = await getFlashsaleList(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取秒杀列表失败')
        })

        // setInterval(this.stampFunc, 1000)
      } catch (e) {

      } finally {
        hideLoading()
      }
    }
  },
  onLoad (options) {
    const { activeId, biz_id } = options
    // if (!activeId) {
    //   modal('活动id缺失')
    //   return
    // }
    // if (!biz_id) {
    //   modal('商家id缺失')
    //   return
    // }
    this.activeId = activeId
    this.biz_id = biz_id
    this.postData.biz_id = biz_id

    this.init()
  },
  onShow () {
    // this.page = 1
    // this.init({ isInit: true })
  },
  onReachBottom () {
    // if (this.totalCount <= this.seckillList.length) return
    // this.page++
    // this.init({ isInit: false })
  }
}
</script>

<style lang="scss" scoped>
  .seckill-all {
    width: 750rpx;
    overflow-x: hidden;
    height: auto;
    min-height: 100vh;
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

  .seckill-list {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    border-top-right-radius: 40rpx;
    border-top-left-radius: 40rpx;
    box-sizing: border-box;
    padding: 40rpx;
    background-color: #FFFFFF;
  }

  .seckill-list-item {
    height: 230rpx;
  }

  .seckill-item-left {
    width: 230rpx;
    height: 230rpx;
    margin-right: 26rpx;
    .item-cover{
      width: 230rpx;
      height: 230rpx;
      @include cover-img();
    }
  }

  .seckill-item-title {
    height: 70rpx;
    width: 446rpx;
    font-size: 14px;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    margin-bottom: 38rpx;
  }

  .seckill-item-price {
    color: #FF0000;
    height: 26rpx;
    margin-bottom: 34rpx;

    .priceY {
      text-decoration: line-through;
      color: #bfbfbf;
      margin-left: 20rpx;
    }
  }

  .seckill-item-time {
    height: 38rpx;
    line-height: 38rpx;

    .span-time {
      display: inline-block;
      height: 38rpx;
      width: 38rpx;
      color: #FFFFFF;
      text-align: center;
      line-height: 38rpx;
      background-color: #EA2020;
      border-radius: 2rpx;
    }
  }

</style>
