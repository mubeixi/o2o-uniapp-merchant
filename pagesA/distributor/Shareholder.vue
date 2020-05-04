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
      
      .headimg {
        border-radius: 50%;
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
      
      .tops {
        margin-top: 10 rpx;
        margin-left: 1 rpx;
        height: 28 rpx;
        font-size: 30 rpx;
        line-height: 28 rpx;
      }
      
      .bottoms {
        font-size: 22 rpx;
        color: #666666;
        height: 21 rpx;
        line-height: 21 rpx;
        margin-top: 20 rpx;
      }
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
        width: 1 rpx;
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
    margin-bottom: 50 rpx;
    
    .viewq {
      font-size: 26 rpx;
      color: #666666;
      line-height: 50 rpx;
    }
  }
  
  .xiang {
    width: 710 rpx;
    margin: 0 auto;
    margin-bottom: 25 rpx;
    border-radius: 20 rpx;
    padding: 25 rpx 34 rpx 33 rpx 34 rpx;
    background-color: #FFFFFF;
    box-sizing: border-box;
    
    .xiangTop {
      width: 186 rpx;
      height: 56 rpx;
      line-height: 56 rpx;
      background: rgba(255, 242, 242, 1);
      border-radius: 28 rpx;
      margin: 0 auto;
      font-size: 30 rpx;
      color: #333333;
      text-align: center;
    }
    
    .xiangCenter {
      width: 642 rpx;
      display: flex;
      margin-top: 24 rpx;
      
      .xiangLeft {
        font-size: 28 rpx;
        color: #333333;
        margin-right: 10 rpx;
        height: 50 rpx;
        line-height: 50 rpx;
      }
      
      .xiangRight {
        .view {
          font-size: 24 rpx;
          color: #666666;
          height: 50 rpx;
          line-height: 50 rpx;
        }
      }
    }
    
    .xiangBottom {
      display: flex;
      margin-top: 34 rpx;
      height: 27 rpx;
      line-height: 27 rpx;
      
      .xiangBottomT {
        font-size: 28 rpx;
        color: #333333;
        margin-right: 10 rpx;
      }
      
      .xiangBottomB {
        font-size: 24 rpx;
        color: #F43131;
        
        .text {
          font-size: 32 rpx;
        }
      }
    }
  }
  
  .shouyi {
    width: 710 rpx;
    margin: 0 auto;
    margin-bottom: 25 rpx;
    border-top: 2 rpx solid #eee;
    border-left: 2 rpx solid #eee;
    
    .tt {
      width: 710 rpx;
      /*height: 95rpx;*/
      display: flex;
      background-color: #E3E2E2;
      
      .view {
        flex: 1;
        /*width: 177rpx;*/
        /*height: 95rpx;*/
        padding: 10 rpx 0;
        line-height: 40 rpx;
        word-wrap: break-word;
        text-align: center;
        font-size: 26 rpx;
        color: #333333;
        border-right: 2 rpx solid #eee;
        border-bottom: 2 rpx solid #eee;
      }
      
      .rightZ {
        /*border-right: 0rpx;*/
      }
    }
    
    .ts {
      background-color: #FFFFFF;
      
      .view {
        font-size: 30 rpx !important;
        color: #F43131 !important;
        font-weight: bold;
      }
    }
  }
  
  .guize {
    width: 677 rpx;
    margin-left: 21 rpx;
    margin-right: 52 rpx;
    font-size: 24 rpx;
    color: #666666;
    padding-bottom: 100 rpx;
    
    .text {
      color: #F43131;
    }
  }
</style>
