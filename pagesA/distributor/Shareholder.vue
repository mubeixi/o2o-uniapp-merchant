<template>
  <view class="myall" v-show="isLoad">
    
    <view class="top">
      <view class="person">
        <image class="headimg" :src="pro.disInfo.Shop_Logo"></image>
      </view>
      <view class="nickName">
        <view class="tops" v-if="pro.disInfo">
          {{pro.disInfo.Shop_Name}}
        </view>
        <view class="bottoms">
          {{pro.disInfo.sha_level_name}}
        </view>
      </view>
      
      <view v-if="pro.waiting_pay_apply" class="juewei" @click="goGudongPay(pro.waiting_pay_apply.Order_ID)">
        立即支付
      </view>
      <view v-else-if="pro.sha_config.Sha_Agent_Type==1&&pro.is_apply" class="juewei" @click="goGudong">
        立即申请
      </view>
      <view v-else class="juewei">
        暂不可申请
      </view>
      <!-- <view  v-else-if="pro.disInfo.sha_level_id>0" class="juewei">
        {{pro.disInfo.sha_level_name}}
      </view> -->
      
      <!-- <view  v-else-if="" class="juewei" >
        暂不可申请
      </view> -->
    
    </view>
    <view class="moneySum">
      <view class="money">
        <view>
          <view class="moneyTop">
            {{(pro.total_sales || pro.total_sales==0)?'累计业绩':'总佣金'}}
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.total_sales||pro.total_sha}}</text>
          </view>
        </view>
        <view>
          <view class="moneyTop">
            {{(pro.month_sales || pro.month_sales==0)?'本月业绩':'已发放佣金'}}
          </view>
          <view class="moneyBottom">
            ￥
            <text>{{pro.month_sales||pro.sha_send_money}}</text>
          </view>
        </view>
      </view>
      <view class="chakan" @click="goFinance" v-if="!pro.total_sales && pro.total_sales!==0">
        查看明细
        <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
      </view>
    </view>
    <circle-title title="股东条件说明"></circle-title>
    <view class="xiang" v-for="(item,index) of pro.sha_config.Sha_Rate" :key="index" v-if="item.sha_name">
      <view class="xiangTop">
        {{item.sha_name}}
      </view>
      <view class="xiangCenter">
        <view class="xiangLeft">
          申请条件:
        </view>
        <view class="xiangRight">
          <view class="view" v-if="item.Level_name">
            {{commi_rename.commi}}等级:{{item.Level_name}}
          </view>
          <view class="view" v-if="item.nobi_level">
            爵位等级:{{item.nobi_level}}
          </view>
          <view class="view">
            个人消费额:{{item.self_pay}}
          </view>
          <view class="view">
            团队业绩:{{item.team_sales}}
          </view>
        </view>
      </view>
      <view class="xiangBottom">
        <view class="xiangBottomT">
          所需金额:
        </view>
        <view class="xiangBottomB">
          ¥
          <text class="text">{{item.price}}</text>
          <block v-if="item.is_apply">(已达到申请条件)</block>
        </view>
      </view>
    </view>
    
    <view style="height: 20rpx;width: 100%;"></view>
    <circle-title title="收益介绍"></circle-title>
    
    <view class="shouyi">
      <view class="tt">
        <view class="view" :class="{rightZ:index==pro.sha_config.Sha_Rate.length-1}"
              v-for="(item,index) of pro.sha_config.Sha_Rate" :key="index">
          {{item.sha_name}}
        </view>
      </view>
      <view class="tt ts">
        <view class="view" :class="{rightZ:index==pro.sha_config.Sha_Rate.length-1}"
              v-for="(item,index) of pro.sha_config.Sha_Rate" :key="index">
          {{item.sha_commi_scale}}%
        </view>
      </view>
    </view>
    <view class="guize">
      <text class="text">*</text>
      当平台设置股东发放的总佣金为100元时，
      <block :key="index" v-for="(item,index) of pro.sha_config.Sha_Rate">{{item.sha_name}}
        <block v-if="index!==pro.sha_config.Sha_Rate.length-1">、</block>
      </block>
      分别获得
      <block v-for="(item,index) of pro.sha_config.Sha_Rate" :key="index">{{item.sha_commi_scale}}元
        <block v-if="index!==pro.sha_config.Sha_Rate.length-1">、</block>
      </block>
      收益。
    </view>
  
  </view>
</template>

<script>

import { shaInit } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import CircleTitle from '@/componets/circle-title/circle-title'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      isLoad: false,
      pro: {
        sha_config: { sha: {} },
        disInfo: {},
      },
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    commi_rename () {
      try {
        return this.initData.commi_rename
      } catch (e) {
        return {}
      }
    },
  },
  components: {
    CircleTitle,
    
  },
  onLoad () {
  
  },
  onShow () {
    this.shaInit()
  },
  methods: {
    goGudongPay (index) {
      uni.navigateTo({
        url: '/pagesA/distributor/ShareholderPay?id=' + index,
      })
    },
    goGudong () {
      uni.navigateTo({
        url: '/pagesA/distributor/AddShareholder',
      })
    },
    goFinance () {
      uni.navigateTo({
        url: '/pagesA/distributor/Finance?index=2',
      })
    },
    shaInit () {
      shaInit().then(res => {
        this.pro = res.data
        this.isLoad = true
      }).catch(e => {
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #F8F8F8 !important;
    min-height: 100vh;
  }
  
  .top {
    margin: 30rpx 0rpx 30rpx 20rpx;
    margin-top: 0rpx;
    padding-top: 30rpx;
    height: 75rpx;
    display: flex;
    position: relative;
    
    .person {
      width: 75rpx;
      height: 75rpx;
      border-radius: 50%;
      
      .headimg {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    
    .nickName {
      margin-left: 19rpx;
      font-size: 30rpx;
      height: 75rpx;
      line-height: 75rpx;
      color: #333333;
      
      .tops {
        margin-top: 10rpx;
        margin-left: 1rpx;
        height: 28rpx;
        font-size: 30rpx;
        line-height: 28rpx;
      }
      
      .bottoms {
        font-size: 22rpx;
        color: #666666;
        height: 21rpx;
        line-height: 21rpx;
        margin-top: 20rpx;
      }
    }
    
    .juewei {
      width: 125rpx;
      height: 46rpx;
      line-height: 46rpx;
      text-align: center;
      font-size: 24rpx;
      color: #FFFFFF;
      background-color: #F43131;
      border-top-left-radius: 125rpx;
      border-bottom-left-radius: 125rpx;
      position: absolute;
      bottom: 12rpx;
      right: 0rpx;
      font-weight: 500;
    }
  }
  
  .moneySum {
    width: 710rpx;
    height: 191rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 16rpx 0px rgba(244, 49, 49, 0.32);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-bottom: 34rpx;
    
    .money {
      height: 104rpx;
      width: 710rpx;
      display: flex;
      padding-top: 30rpx;
      box-sizing: border-box;
      
      & view:first-child {
        border-right: 1rpx solid #E7E7E7;
      }
      
      view {
        height: 74rpx;
        width: 355rpx;
        text-align: center;
        color: #333333;
        
        .moneyTop {
          height: 25rpx;
          line-height: 25rpx;
          font-size: 26rpx;
          margin-bottom: 21rpx;
        }
        
        .moneyBottom {
          height: 28rpx;
          line-height: 28rpx;
          font-size: 24rpx;
          color: #F43131;
          
          text {
            font-size: 36rpx;
            font-weight: bold;
          }
        }
      }
    }
    
    .chakan {
      height: 87rpx;
      line-height: 87rpx;
      text-align: center;
      font-size: 24rpx;
      color: #999999;
      
      .image {
        width: 12rpx;
        height: 20rpx;
        margin-left: 14rpx;
      }
    }
  }
  
  .myData {
    border: 1rpx solid #E7E7E7;
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 20rpx;
    
    .myDataTop {
      width: 710rpx;
      height: 95rpx;
      background-color: #F4F4F4;
      display: flex;
      
      .td {
        width: 236rpx;
        height: 95rpx;
        line-height: 95rpx;
        text-align: center;
        font-size: 26rpx;
        color: #333333;
      }
      
      .shu {
        width: 1rpx;
        height: 95rpx;
        background-color: #E7E7E7;
      }
    }
    
    .myDataBottom {
      background-color: #FFFFFF;
      
      .td {
        font-size: 24rpx !important;
        color: #F43131 !important;
        
        text {
          font-size: 30rpx !important;
        }
      }
    }
  }
  
  .description {
    border: 1rpx solid #E7E7E7;
    border-bottom: 0rpx;
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 29rpx;
    font-size: 24rpx;
    color: #333333;
    
    .t1 {
      height: 80rpx;
      width: 710rpx;
      background-color: #F4F4F4;
      display: flex;
      
      .names {
        width: 98rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }
      
      .zishen {
        width: 153rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-right: 1px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
      }
      
      .rightZ {
        border-right: 0rpx;
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
    width: 710rpx;
    margin-left: 21rpx;
    margin-right: 19rpx;
    margin-bottom: 50rpx;
    
    .viewq {
      font-size: 26rpx;
      color: #666666;
      line-height: 50rpx;
    }
  }
  
  .xiang {
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 25rpx;
    border-radius: 20rpx;
    padding: 25rpx 34rpx 33rpx 34rpx;
    background-color: #FFFFFF;
    box-sizing: border-box;
    
    .xiangTop {
      width: 186rpx;
      height: 56rpx;
      line-height: 56rpx;
      background: rgba(255, 242, 242, 1);
      border-radius: 28rpx;
      margin: 0 auto;
      font-size: 30rpx;
      color: #333333;
      text-align: center;
    }
    
    .xiangCenter {
      width: 642rpx;
      display: flex;
      margin-top: 24rpx;
      
      .xiangLeft {
        font-size: 28rpx;
        color: #333333;
        margin-right: 10rpx;
        height: 50rpx;
        line-height: 50rpx;
      }
      
      .xiangRight {
        .view {
          font-size: 24rpx;
          color: #666666;
          height: 50rpx;
          line-height: 50rpx;
        }
      }
    }
    
    .xiangBottom {
      display: flex;
      margin-top: 34rpx;
      height: 27rpx;
      line-height: 27rpx;
      
      .xiangBottomT {
        font-size: 28rpx;
        color: #333333;
        margin-right: 10rpx;
      }
      
      .xiangBottomB {
        font-size: 24rpx;
        color: #F43131;
        
        .text {
          font-size: 32rpx;
        }
      }
    }
  }
  
  .shouyi {
    width: 710rpx;
    margin: 0 auto;
    margin-bottom: 25rpx;
    border-top: 2rpx solid #eee;
    border-left: 2rpx solid #eee;
    
    .tt {
      width: 710rpx;
      /*height: 95rpx;*/
      display: flex;
      background-color: #E3E2E2;
      
      .view {
        flex: 1;
        /*width: 177rpx;*/
        /*height: 95rpx;*/
        padding: 10rpx 0;
        line-height: 40rpx;
        word-wrap: break-word;
        text-align: center;
        font-size: 26rpx;
        color: #333333;
        border-right: 2rpx solid #eee;
        border-bottom: 2rpx solid #eee;
      }
      
      .rightZ {
        /*border-right: 0rpx;*/
      }
    }
    
    .ts {
      background-color: #FFFFFF;
      
      .view {
        font-size: 30rpx !important;
        color: #F43131 !important;
        font-weight: bold;
      }
    }
  }
  
  .guize {
    width: 677rpx;
    margin-left: 21rpx;
    margin-right: 52rpx;
    font-size: 24rpx;
    color: #666666;
    padding-bottom: 100rpx;
    
    .text {
      color: #F43131;
    }
  }
</style>
