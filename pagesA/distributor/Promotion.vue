<template>
  <view class="myall">
    
    <view class="top">
      <view class="person">
        <image class="image" :src="data.disInfo.Shop_Logo"></image>
      </view>
      <view class="nickName">
        {{data.disInfo.Shop_Name}}
      </view>
      <view class="juewei">
        {{pro.pro_title_name}}爵位
      </view>
    </view>
    <view class="moneySum">
      <view class="money">
        <view>
          <view class="moneyTop">
            总佣金
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.total_nobi}}</text>
          </view>
        </view>
        <view>
          <view class="moneyTop">
            已发放佣金
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.total_nobi_send}}</text>
          </view>
        </view>
      </view>
      <view class="chakan" @click="goFinance">
        查看明细
        <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
      </view>
    </view>
    <circle-title title="我的数据"></circle-title>
    <view class="myData">
      <view class="myDataTop">
        <view class="td">
          自身消费额
        </view>
        <view class="shu"></view>
        <view class="td">
          自身业绩
        </view>
        <view class="shu"></view>
        <view class="td">
          团队业绩
        </view>
      </view>
      <view class="myDataTop myDataBottom">
        <view class="td">
          ¥
          <text>{{pro.self_buy}}</text>
        </view>
        <view class="shu"></view>
        <view class="td">
          ¥
          <text>{{pro.self_sales}}</text>
        </view>
        <view class="shu"></view>
        <view class="td">
          ¥
          <text>{{pro.team_sales}}</text>
        </view>
      </view>
    </view>
    <circle-title title="爵位晋升说明"></circle-title>
    <view class="description">
      <view class="t1">
        <view class="names">
          名称
        </view>
        <view class="zishen">
          自身消费额
        </view>
        <view class="zishen">
          自身业绩
        </view>
        <view class="zishen">
          团队业绩
        </view>
        <view class="zishen rightZ">
          奖励百分比
        </view>
      </view>
      <view class="t1 t2" v-for="(item,index) of pro.Pro_Title_Level" :key="item">
        <view class="names">
          {{item.Name}}
        </view>
        <view class="zishen">
          ￥{{item.Consume}}
        </view>
        <view class="zishen">
          ￥{{item.Sales_Self}}
        </view>
        <view class="zishen">
          ￥{{item.Sales_Group}}
        </view>
        <view class="zishen rightZ">
          {{item.Bonus}}%
        </view>
      </view>
    </view>
    <circle-title title="名词解释"></circle-title>
    <view class="noun">
      <view class="vivi" v-for="(i,j) of pro.noun_desc" :key="j">
        {{j+1}}、{{i}}
      </view>
    </view>
  </view>
</template>

<script>

import { getDisInit, nobiInfo } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import CircleTitle from '@/componets/circle-title/circle-title'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      pro: [],
      data: [],
    }
  },
  components: {
    CircleTitle,
    
  },
  onLoad () {
  
  },
  onShow () {
    this.nobiInfo()
    this.getDisInit()
  },
  methods: {
    getDisInit () {
      getDisInit().then(res => {
        this.data = res.data
      }, err => {
      
      })
    },
    goFinance () {
      uni.navigateTo({
        url: '/pagesA/distributor/Finance?index=1',
      })
    },
    nobiInfo () {
      nobiInfo().then(res => {
        this.pro = res.data
      }).catch(e => {
      
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  .top {
    margin: 30 rpx 0 rpx 30 rpx 20 rpx;
    margin-top: 0 rpx;
    padding-top: 30 rpx;
    height: 75 rpx;
    display: flex;
    position: relative;
    
    .person {
      width: 75 rpx;
      height: 75 rpx;
      border-radius: 50%;
      overflow: hidden;
      
      .image {
        width: 100%;
        height: 100%;
      }
    }
    
    .nickName {
      margin-left: 19 rpx;
      font-size: 30 rpx;
      height: 75 rpx;
      line-height: 75 rpx;
      color: #333333;
    }
    
    .juewei {
      width: 125 rpx;
      height: 46 rpx;
      line-height: 46 rpx;
      text-align: center;
      font-size: 24 rpx;
      color: #FFFFFF;
      background-color: #F43131;
      border-top-left-radius: 125 rpx;
      border-bottom-left-radius: 125 rpx;
      position: absolute;
      bottom: 12 rpx;
      right: 0 rpx;
      font-weight: 500;
    }
  }
  
  .moneySum {
    width: 710 rpx;
    height: 191 rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16 rpx 0px rgba(244, 49, 49, 0.32);
    border-radius: 10 rpx;
    margin: 0 auto;
    margin-bottom: 34 rpx;
    
    .money {
      height: 104 rpx;
      width: 710 rpx;
      display: flex;
      padding-top: 30 rpx;
      box-sizing: border-box;
      
      & view:first-child {
        border-right: 1 rpx solid #E7E7E7;
      }
      
      view {
        height: 74 rpx;
        width: 355 rpx;
        text-align: center;
        color: #333333;
        
        .moneyTop {
          height: 25 rpx;
          line-height: 25 rpx;
          font-size: 26 rpx;
          margin-bottom: 21 rpx;
        }
        
        .moneyBottom {
          height: 28 rpx;
          line-height: 28 rpx;
          font-size: 24 rpx;
          color: #F43131;
          
          text {
            font-size: 36 rpx;
            font-weight: bold;
          }
        }
      }
    }
    
    .chakan {
      height: 87 rpx;
      line-height: 87 rpx;
      text-align: center;
      font-size: 24 rpx;
      color: #999999;
      
      .image {
        width: 12 rpx;
        height: 20 rpx;
        margin-left: 14 rpx;
      }
    }
  }
  
  .myData {
    border: 1 rpx solid #E7E7E7;
    width: 710 rpx;
    margin-left: 21 rpx;
    margin-right: 19 rpx;
    margin-bottom: 20 rpx;
    
    .myDataTop {
      width: 710 rpx;
      height: 95 rpx;
      background-color: #F4F4F4;
      display: flex;
      
      .td {
        width: 236 rpx;
        height: 95 rpx;
        line-height: 95 rpx;
        text-align: center;
        font-size: 26 rpx;
        color: #333333;
      }
      
      .shu {
        width: 1px;
        height: 95 rpx;
        background-color: #E7E7E7;
      }
    }
    
    .myDataBottom {
      background-color: #FFFFFF;
      
      .td {
        font-size: 24 rpx !important;
        color: #F43131 !important;
        
        text {
          font-size: 30 rpx !important;
        }
      }
    }
  }
  
  .description {
    border: 1 rpx solid #E7E7E7;
    border-bottom: 0 rpx;
    width: 710 rpx;
    margin-left: 21 rpx;
    margin-right: 19 rpx;
    margin-bottom: 29 rpx;
    font-size: 24 rpx;
    color: #333333;
    
    .t1 {
      height: 80 rpx;
      width: 710 rpx;
      background-color: #F4F4F4;
      display: flex;
      
      .names {
        width: 98 rpx;
        height: 80 rpx;
        line-height: 80 rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }
      
      .zishen {
        width: 153 rpx;
        height: 80 rpx;
        line-height: 80 rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }
      
      .rightZ {
        border-right: 0 rpx;
      }
    }
    
    .t2 {
      background-color: #FFFFFF;
      
      .zishen {
        color: #F43131 !important;
      }
    }
  }
  
  .noun {
    width: 710 rpx;
    margin-left: 21 rpx;
    margin-right: 19 rpx;
    padding-bottom: 50 rpx;
    
    .vivi {
      font-size: 26 rpx;
      color: #666666;
      line-height: 50 rpx;
    }
  }
</style>
