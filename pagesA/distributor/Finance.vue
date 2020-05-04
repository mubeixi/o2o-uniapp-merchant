<template>
  <view class="team">
    
    <view class="nav">
      <view class="views" :class="index==0?'checked':''" @click="change(0)">
        分销
      </view>
      <view class="views" :class="index==1?'checked':''" @click="change(1)">
        爵位
      </view>
      <view class="views" :class="index==4?'checked':''" @click="change(4)">
        管理
      </view>
      <view class="views" :class="index==2?'checked':''" @click="change(2)">
        股东
      </view>
      <view class="views" :class="index==3?'checked':''" @click="change(3)">
        区域代理
      </view>
    </view>
    <view style="width: 100%;height: 105rpx;background-color: #FFFFFF;"></view>
    <block v-if="pro.length > 0">
      <view class="order" v-for="(item,i) of pro " :key="i">
        <view>
          订单号：
          <text>{{index === 4 ? item.order_id : item.Order_ID}}</text>
        </view>
        <view>
          佣金金额：
          <text class="price" v-if="index==2 || index === 4||index==3">￥{{(index === 2||index==3) ?item.Record_Money :
            item.record_money}}
          </text>
          <text class="price" v-else>￥{{item.money}}</text>
        </view>
        <view>
          描述：
          <text v-if="index==2||index==3">{{item.Record_Type_desc}}</text>
          <text v-else>{{index === 4 ? item.descr :item.desc}}</text>
        </view>
        <view>
          时间：
          <text>{{item.Record_CreateTime}}</text>
        </view>
      </view>
    </block>
    <div class="defaults" v-else>
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
  </view>
</template>

<script>

import {
  getAgentRecordList,
  getDisRecordList,
  getManageRecordList,
  getNobiRecordList,
  getShaRecordList,
} from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      page: 1,
      pageSize: 5,
      pro: [],
      index: -1,
      totalCount: 0,
    }
  },
  onShow () {
    this.change(this.index)
  },
  onLoad (options) {
    const that = this
    if (options.index) {
      this.index = options.index
    } else {
      this.index = 0
    }
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.geDetail()
    }
  },
  methods: {
    change (item) {
      // if(item==this.index) return
      this.pro = []
      this.page = 1
      this.index = item
      this.geDetail()
    },
    geDetail () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
      }
      if (this.index === 0) {
        getDisRecordList(data).then(res => {
          for (const item of res.data) {
            this.pro.push(item)
          }
          this.totalCount = res.totalCount
        }).catch(e => {
        
        })
      } else if (this.index === 1) {
        getNobiRecordList(data).then(res => {
          for (const item of res.data) {
            this.pro.push(item)
          }
          this.totalCount = res.totalCount
        }).catch(e => {
        
        })
      } else if (this.index === 2) {
        getShaRecordList(data).then(res => {
          for (const item of res.data) {
            this.pro.push(item)
          }
          this.totalCount = res.totalCount
        }).catch(e => {
        
        })
      } else if (this.index === 4) {
        getManageRecordList(data).then(res => {
          for (const item of res.data) {
            this.pro.push(item)
          }
          this.totalCount = res.totalCount
        })
      } else {
        getAgentRecordList(data).then(res => {
          for (const item of res.data) {
            this.pro.push(item)
          }
          this.totalCount = res.totalCount
        }).catch(e => {
        
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .team {
    background-color: #F8F8F8 !important;
    min-height: 100vh;
    box-sizing: border-box;
    
    .nav {
      padding: 0 rpx 70 rpx;
      padding-left: 0 rpx;
      padding-right: 0 rpx;
      height: 104 rpx;
      line-height: 104 rpx;
      align-items: center;
      box-sizing: border-box;
      width: 750 rpx;
      display: flex;
      position: fixed;
      background-color: #F8F8F8;
      justify-content: space-around;
      z-index: 999;
      top: 0 rpx;
      left: 0 rpx;
      
      .views {
        width: 150 rpx;
        height: 65 rpx;
        line-height: 65 rpx;
        font-size: 30 rpx;
        color: #333333;
        text-align: center;
        position: relative;
      }
      
      .checked {
        &:after {
          content: '';
          position: absolute;
          bottom: 0 rpx;
          right: 0 rpx;
          height: 4 rpx;
          width: 132 rpx;
          background-color: #F43131;
        }
      }
      
      .marginLeft {
        margin-left: 107 rpx;
        margin-right: 107 rpx;
      }
    }
    
    .order {
      width: 710 rpx;
      margin: 0 auto;
      padding: 35 rpx 0 rpx 40 rpx 34 rpx;
      background-color: #FFFFFF;
      font-size: 26 rpx;
      color: #333333;
      box-sizing: border-box;
      border-radius: 20 rpx;
      padding-bottom: 30 rpx;
      margin-bottom: 10px;
      
      & > view {
        //height: 50rpx;
        line-height: 50 rpx;
        
        text {
          color: #666666;
        }
        
        .price {
          color: #F43131;
        }
      }
    }
  }
  
  .defaults {
    margin: 0 auto;
    width: 640 rpx;
    height: 480 rpx;
    margin-top: 100 rpx;
  }
</style>
