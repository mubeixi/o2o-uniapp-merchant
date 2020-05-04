<template>
  <view class="all" v-if="pro.agent_rate">
    <view class="top">
      <view class="person" v-if="pro.disInfo">
        <image class="image" :src="pro.disInfo.Shop_Logo"></image>
      </view>
      <view class="nickName">
        <view class="tops" v-if="pro.disInfo">
          {{pro.disInfo.Shop_Name}}
        </view>
        <view class="bottoms" v-if="pro.agent_identity">
          <image class="image" :src="'/static/client/distributor/vip.png'|domain"></image>
          <view class="flexMbx">
            <block v-for="(item,index) of  pro.agent_identity" :key="index">
              <span style="margin-right: 4px;height: 30rpx;line-height: 30rpx;">{{item.area_name}}</span>
            </block>
          </view>
        </view>
      </view>
      <block v-if="pro.waiting_pay_apply">
        <view v-if="pro.waiting_pay_apply.Order_ID" @click="goPay(pro.waiting_pay_apply.Order_ID)" class="juewei">
          立即支付
        </view>
      </block>
      
      <view
        v-else-if="pro.agent_rate.Agentenable==1&&(pro.agent_rate.tow.is_apply||pro.agent_rate.pro.is_apply||pro.agent_rate.cit.is_apply||pro.agent_rate.cou.is_apply)"
        class="juewei" @click="goAddInfo">
        立即申请
      </view>
      <view v-else class="juewei">
        暂不可申请
      </view>
    </view>
    <view class="moneySum">
      <view class="money">
        <view class="m-view">
          <view class="moneyTop m-view">
            总佣金
          </view>
          <view class="moneyBottom m-view">
            ￥
            <text class="text">{{pro.total_agent}}</text>
          </view>
        </view>
        <view class="m-view">
          <view class="moneyTop m-view">
            已发放佣金{{pro.total_agent}}
          </view>
          <view class="moneyBottom m-view">
            ￥
            <text class="text">{{pro.total_agent}}</text>
          </view>
        </view>
      </view>
      <view class="chakan" @click="goFinance">
        查看明细
        <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
      </view>
    </view>
    <circle-title title="区域代理条件说明"></circle-title>
    
    <view class="xiang" v-for="(item,index) of pro.agent_rate" :key="index" v-if="item.title">
      <view class="xiangTop">
        {{item.title}}
      </view>
      <view class="xiangCenter">
        <view class="xiangLeft">
          申请条件:
        </view>
        <view class="xiangRight">
          <view v-if="item.Level>0" class="view">
            {{commi_rename.commi}}等级:{{item.Level_name}}
          </view>
          <view v-if="item.Protitle>0" class="view">
            爵位等级:{{item.Level_name}}
          </view>
          <view class="view">
            个人消费额:{{item.Selfpro}}
          </view>
          <view class="view">
            团队业绩:{{item.Teampro}}
          </view>
        </view>
      </view>
      <view class="xiangBottom">
        <view class="xiangBottomT">
          所需金额:
        </view>
        <view class="xiangBottomB">
          ¥
          <text class="text">{{item.Provincepro}}</text>
          (
          <block v-if="!item.is_apply">暂未达到申请条件</block>
          <block v-if="item.is_apply">已达到申请条件</block>
          )
        </view>
      </view>
    </view>
    
    <view style="height: 20rpx;width: 100%;"></view>
    <circle-title title="收益介绍"></circle-title>
    
    <view class="shouyi">
      <view class="tt">
        <view class="view">
          省
        </view>
        <view class="view">
          市
        </view>
        <view class="view">
          县/区
        </view>
        <view class="rightZ view">
          乡/镇
        </view>
      </view>
      <view class="tt ts">
        <view class="view">
          {{pro.agent_rate.pro.Province}}%
        </view>
        <view class="view">
          {{pro.agent_rate.cit.Province}}%
        </view>
        <view class="view">
          {{pro.agent_rate.cou.Province}}%
        </view>
        <view class="rightZ view">
          {{pro.agent_rate.tow.Province}}%
        </view>
      </view>
    </view>
    <view class="guize">
      <text class="text">*</text>
      当平台设置区域代理发放的总佣金为100元时，
      <block v-if="item.title" v-for="(item,index) of agent_rate_arr" :key="index">{{item.title}}
        <block v-if="index!==agent_rate_arr.length-1">、</block>
      </block>
      分别获得
      <block v-if="item.title" v-for="(item,index) of agent_rate_arr" :key="index">{{item.Province}}元
        <block v-if="index!==agent_rate_arr.length-1">、</block>
      </block>
      收益。
    </view>
  </view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'

import { agentInfo } from '@/api/customer'
import CircleTitle from '@/componets/circle-title/circle-title'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      agent_rate_arr: {},
      pro: {
        waiting_pay_apply: {},
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
  watch: {
    pro: {
      deep: true,
      handler (val) {
        const agent_rate_arr = []
        for (var i in this.pro.agent_rate) {
          if (typeof this.pro.agent_rate[i] === 'object') {
            agent_rate_arr.push(this.pro.agent_rate[i])
          }
        }
        this.agent_rate_arr = agent_rate_arr
      },
    },
  },
  
  onShow () {
    this.agentInfo()
  },
  methods: {
    goPay (id) {
      uni.navigateTo({
        url: '/pagesA/distributor/RegionPay?id=' + id,
      })
    },
    goFinance () {
      uni.navigateTo({
        url: '/pagesA/distributor/Finance?index=3',
      })
    },
    agentInfo () {
      agentInfo().then(res => {
        this.pro = res.data
      }).catch(err => {
      
      })
    },
    goAddInfo () {
      let pro = 0
      let cit = 0
      let cou = 0
      let tow = 0
      if (this.pro.agent_rate.pro.is_apply) {
        pro = 1
      }
      if (this.pro.agent_rate.cit.is_apply) {
        cit = 1
      }
      if (this.pro.agent_rate.cou.is_apply) {
        cou = 1
      }
      if (this.pro.agent_rate.tow.is_apply) {
        tow = 1
      }
      
      uni.navigateTo({
        url: '/pagesA/distributor/AddInformation?pro=' + pro + '&cit=' + cit + '&cou=' + cou + '&tow=' + tow,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #f8f8f8;
  }
  
  .top {
    margin: 30 rpx 0 rpx 30 rpx 20 rpx;
    height: 83 rpx;
    display: flex;
    margin-top: 0 rpx;
    padding-top: 30 rpx;
    position: relative;
    
    .person {
      width: 83 rpx;
      height: 83 rpx;
      border-radius: 50%;
      overflow: hidden;
      
      .image {
        width: 100%;
        height: 100%;
      }
    }
    
    .nickName {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: center;
      margin-left: 15 rpx;
      font-size: 30 rpx;
      height: 83 rpx;
      color: #333333;
      
      .tops {
        margin-top: 10 rpx;
        margin-left: 1 rpx;
        height: 28 rpx;
        line-height: 28 rpx;
      }
      
      .bottoms {
        margin-top: 14 rpx;
        font-size: 22 rpx;
        color: #666666;
        display: flex;
        align-items: center;
        
        .flexMbx {
          width: 400 rpx;
          height: 30 rpx;
          line-height: 30 rpx;
          white-space: nowrap;
          overflow-x: scroll;
          visibility: middle;
          overflow-y: hidden;
        }
        
        .image {
          width: 25 rpx;
          height: 23 rpx;
          margin-right: 6 rpx;
        }
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
      bottom: 20 rpx;
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
    margin-bottom: 36 rpx;
    
    .money {
      height: 104 rpx;
      width: 710 rpx;
      display: flex;
      padding-top: 30 rpx;
      box-sizing: border-box;
      
      & .m-view:first-child {
        border-right: 1 rpx solid #E7E7E7;
      }
      
      .m-view {
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
          
          .text {
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
      height: 95 rpx;
      display: flex;
      background-color: #E3E2E2;
      
      .view {
        width: 177 rpx;
        height: 95 rpx;
        line-height: 95 rpx;
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
