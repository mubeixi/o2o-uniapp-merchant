<template>
  <view @click="commonClick" class="profitSum">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <view class="titleClass">
      <view class="titleLeft">
        时间：
      </view>
      <view class="titleCenter">
        <picker @change="bindDateChange" class="picker" mode="date">
          <view class="uni-input" v-if="beginTime">{{beginTime}}</view>
          <view class="uni-input" v-if="!beginTime">开始时间</view>
          <image class="img" src="/static/salestime.png"></image>
        </picker>
        <view class="centerPicker">
          —
        </view>
        <picker @change="bindDateChanges" class="picker" mode="date">
          <view class="uni-input" v-if="endTime">{{endTime}}</view>
          <view class="uni-input" v-if="!endTime">结束时间</view>
          <image class="img" src="/static/salestime.png"></image>
        </picker>
      </view>
      <view @click="getDetail('search')" class="titleButton">
        搜索
      </view>
    </view>
    
    <view style="height: 90rpx;"></view>
    <view :key="i" class="order" v-for="(item,i) of resData ">
      <view class="view">
        订单号：
        <text>{{item.order_id}}</text>
      </view>
      <view class="view">
        订单价格：
        <text style="color: #F43131">{{item.Order_TotalPrice}}元</text>
      </view>
      <view class="view">
        订单业绩：
        <text style="color: #F43131">{{item.sales}}元</text>
      </view>
      <view class="view">
        描述信息：
        <text>{{item.descr}}</text>
      </view>
      <view class="view">
        创建时间：
        <text>{{item.create_time}}</text>
      </view>
    </view>
    <div class="defaults" v-if="resData.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
  </view>
</template>

<script>

import { getTeamSalesList } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      totalCount: 0,
      page: 1,
      pageSize: 10,
      resData: [],
      beginTime: '',
      endTime: '',
    }
  },
  onShow () {
  
  },
  onLoad (options) {
    this.getDetail()
  },
  onReachBottom () {
    if (this.resData.length < this.totalCount) {
      this.page++
      this.getDetail()
    }
  },
  methods: {
    bindDateChange (e) {
      this.beginTime = e.target.value
    },
    bindDateChanges (e) {
      this.endTime = e.target.value
    },
    getDetail (item) {
      const data = {
        page: this.page,
        pageSzie: this.pageSize,
        begin_time: this.beginTime,
        end_time: this.endTime,
      }
      if (this.beginTime && this.endTime) {
        var startTmp = this.beginTime.split('-')
        var endTmp = this.endTime.split('-')
        var sd = new Date(startTmp[0], startTmp[1], startTmp[2])
        var ed = new Date(endTmp[0], endTmp[1], endTmp[2])
        if (sd.getTime() > ed.getTime()) {
          uni.showToast({
            title: '开始时间不得大于结束时间',
            icon: 'none',
          })
          return
        }
      }
      getTeamSalesList(data).then(res => {
        if (item === 'search') {
          this.resData = res.data.list
        } else {
          this.resData = this.resData.concat(res.data.list)
        }
        
        this.totalCount = res.totalCount
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .profitSum {
    background-color: #F8F8F8;
    padding-bottom: 40rpx;
  }
  
  .order-status {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #F6F6F6;
    // height: 90rpx;
    display: flex;
    align-items: center;
    // justify-content: center;
    text-align: center;
    
    .status {
      display: inline-block;
      width: 150rpx;
      /*margin-right: 30rpx;*/
      line-height: 80rpx;
      
      &.active {
        color: $fun-red-color;
        border-bottom: 2px solid $fun-red-color;
      }
    }
    
    & .status:nth-last-child(1) {
      margin-right: 0;
    }
  }
  
  .status {
    display: inline-block;
    width: 138rpx;
    /*margin-right: 30rpx;*/
    line-height: 80rpx;
    text-align: center;
    
    &.active {
      color: $fun-red-color;
      border-bottom: 2px solid $fun-red-color;
    }
  }
  
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #F6F6F6;
  }
  
  .order {
    width: 710rpx;
    margin: 0 auto;
    padding: 35rpx 0rpx 40rpx 34rpx;
    background-color: #FFFFFF;
    font-size: 26rpx;
    color: #333333;
    box-sizing: border-box;
    border-radius: 20rpx;
    padding-bottom: 30rpx;
    margin-bottom: 20rpx;
    
    .view {
      //height: 50rpx;
      line-height: 50rpx;
      
      text {
        color: #666666;
      }
      
      .price {
        color: #F43131;
      }
    }
  }
  
  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
  
  /deep/ .uni-scroll-view::-webkit-scrollbar {
    /* 隐藏滚动条，但依旧具备可以滚动的功能 */
    display: none
  }
  
  .titleClass {
    height: 90rpx;
    font-size: 14px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 10px;
    position: fixed;
    width: 750rpx;
    top: 0px;
    left: 0px;
    background-color: #F8F8F8;
    z-index: 99;
    padding-left: 20rpx;
    padding-right: 20rpx;
    
    .titleButton {
      width: 100rpx;
      height: 60rpx;
      line-height: 60rpx;
      color: #ffffff;
      text-align: center;
      background-color: #F43131;
      border-radius: 10rpx;
    }
    
    .titleLeft {
      width: 100rpx;
    }
    
    .titleCenter {
      width: 550rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      
      .centerPicker {
        margin-left: 20rpx;
        margin-right: 20rpx;
      }
      
      .picker {
        width: 200rpx;
        height: 60rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        padding-left: 10rpx;
        position: relative;
        border: 1px solid #cccccc;
        
        .img {
          width: 30rpx;
          height: 30rpx;
          position: absolute;
          top: 15rpx;
          right: 10rpx;
        }
      }
    }
    
  }
</style>
