<template>
  <view class="all">
    <view class="top">
      <swiper class="center" :indicator-dots="false" :autoplay="false" :duration="1000" :current="inds"
              @change="change">
        <swiper-item class="vipFir" v-for="(item,index) of dis_level" :key="index"
                     :style="dis_level.length==1?'margin-left:43rpx;':''">
          <block v-if="item.Level_BackImg">
            <image :src='item.Level_BackImg' class="allImg"></image>
          </block>
          <block v-else>
            <image src='/static/vipBgColor.png' class="allImg"></image>
          </block>
          
          <view class="vipGrade" v-if="item.Level_ID==pro.user_info.Level_ID&&userInfo.Is_Distribute==1">
            当前等级
          </view>
          <view class="mmp" v-if="dis_level.length>0">
            <image :src="item.Level_Icon" class="myImgs"></image>
            {{item.Level_Name}}
          </view>
        </swiper-item>
      </swiper>
    </view>
    <view style="height: 220rpx;"></view>
    <circle-title title="级别简介"></circle-title>
    
    <view class="level-description">
      {{Level_Description}}
    </view>
    <view style="height: 20rpx;background-color: #F8F8F8;"></view>
    
    <circle-title title="级别条件"></circle-title>
    
    <view class="titleMy" v-if="dis_level.length>0">
      <image src="/static/procurement/error.png" style="height: 25rpx;width: 25rpx;margin-right: 12rpx;"></image>
      注意：以下条件需{{dis_level[inds].arrive_limit_desc}}才能达到条件
    </view>
    <view class="ruhe">
      <block v-if="dis_level[inds].level_rules_edit.pay_money">
        <view class="td" v-if="dis_level[inds].level_rules_edit.pay_money.checked=='1'">
          <image class="image" src="/static/distributor/storeSum.png"></image>
          <view class="mbx">
            <view class="tops">
              <block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='1'">
                商城总消费{{dis_level[inds].level_rules_edit.pay_money.value.money}}元
              </block>
              <block v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='2'">
                一次性消费{{dis_level[inds].level_rules_edit.pay_money.value.money}}元
              </block>
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.pay_money.value.type=='1'">
              已消费{{dis_level[inds].level_rules_edit.pay_money.user_data}}元
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.pay_money.user_data>=dis_level[inds].level_rules_edit.pay_money.value.money">
            已完成
          </view>
          <view class="submit" @click="goIndex" v-else>
            去消费
          </view>
        
        </view>
      </block>
      <block v-if="dis_level[inds].level_rules_edit.buy_prod">
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.buy_prod.checked=='1'">
          <view class="td" style="border-bottom: 0px;">
            <image class="image" src="/static/distributor/buyPro.png"></image>
            <view class="mbx">
              <view class="tops">
                <block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='1'">购买任意商品</block>
                <block v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='2'">购买特定商品</block>
              </view>
              <view class="bottoms" v-if="dis_level[inds].level_rules_edit.buy_prod.user_data>0">
                已完成
              </view>
              <view class="bottoms" v-else-if="dis_level[inds].level_rules_edit.buy_prod.value.arrive_status=='2'">
                订单付款后计入
              </view>
              <view class="bottoms" v-else>
                订单确认收货后计入
              </view>
            
            </view>
            <view class="submit submitMbx" v-if="dis_level[inds].level_rules_edit.buy_prod.user_data>0">
              已完成
            </view>
            <view @click="goIndex" class="submit"
                  v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='1'&&dis_level[inds].level_rules_edit.buy_prod.user_data<=0">
              去购买
            </view>
          </view>
          
          <view class="productList" v-if="dis_level[inds].level_rules_edit.buy_prod.value.type=='2'">
            <block v-for="(item,index) in dis_level[inds].level_rules_edit.buy_prod.data" :key="index">
              <view class="myProduct" @click="goDetail(item.Products_ID)">
                <image class="imgPro" :src="item.ImgPath"></image>
                <view class="proText">
                  {{item.Products_Name}}
                </view>
                <view class="buttonLast">
                  <view class="priceAll">
                    <text class="priceText">¥</text>
                    {{item.Products_PriceX}}
                  </view>
                  <view class="proDetail">
                    去购买
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </block>
      
      <block v-if="dis_level[inds].level_rules_edit.buy_times">
        <!-- 商品购买几次 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.buy_times.checked=='1'">
          <image class="image" src="/static/distributor/proCount.png"></image>
          <view class="mbx">
            <view class="tops">
              商品购买{{dis_level[inds].level_rules_edit.buy_times.value}}次
            </view>
            <view class="bottoms">
              已购买{{dis_level[inds].level_rules_edit.buy_times.user_data}}次
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.buy_times.user_data>=dis_level[inds].level_rules_edit.buy_times.value">
            已完成
          </view>
          <view class="submit" @click="goIndex" v-else>
            去购买
          </view>
        
        </view>
      </block>
      
      <block v-if="dis_level[inds].level_rules_edit.team_sales">
        <!-- 团队业绩 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.team_sales.checked=='1'">
          <image class="image" src="/static/distributor/teanSum.png"></image>
          <view class="mbx">
            <view class="tops">
              团队业绩达{{dis_level[inds].level_rules_edit.team_sales.value}}元
            </view>
            <view class="bottoms">
              已销售{{dis_level[inds].level_rules_edit.team_sales.user_data}}元
            </view>
          </view>
          <view class="submit submitMbx"
                v-if="dis_level[inds].level_rules_edit.team_sales.user_data>=dis_level[inds].level_rules_edit.team_sales.value">
            已完成
          </view>
          <view class="submit" v-else @click="goFenxiao()">
            去完成
          </view>
        
        </view>
      </block>
      
      <block v-if="dis_level[inds].level_rules_edit.direct_buy">
        <!-- 直接购买 -->
        <view class="td" v-if="dis_level[inds].level_rules_edit.direct_buy.checked=='1'">
          <image class="image" src="/static/distributor/disBuy.png"></image>
          <view class="mbx">
            <view class="tops">
              直接购买{{dis_level[inds].level_rules_edit.direct_buy.value.money}}元
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='1'">
              直接购买
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='2'">
              送赠品({{dis_level[inds].level_rules_edit.direct_buy.data.gift_name}})
            </view>
            <view class="bottoms" v-if="dis_level[inds].level_rules_edit.direct_buy.value.type=='3'">
              送余额({{dis_level[inds].level_rules_edit.direct_buy.value.present}}元)
            </view>
          </view>
          <view class="submit submitMbx" v-if="dis_level[inds].buy_order.Order_Status==4">
            已完成
          </view>
          <view class="submit" @click="buyDis(dis_level[inds].Level_ID)" v-else>
            去购买
          </view>
        </view>
      </block>
      <block v-if="dis_level[inds]">
        <!-- 去申请 -->
        <view class="td" v-if="dis_level[inds].arrive_limit=='2'">
          <image class="image" src="/static/distributor/editS.png"></image>
          <view class="mbx">
            <view class="tops">
              直接申请
            </view>
            <view class="bottoms">
              去申请
            </view>
          </view>
          <block v-if="dis_level[inds].apply_order">
            <block v-if="dis_level[inds].apply_order.status">
              <view class="submit submitMbx" v-if="dis_level[inds].apply_order.status==2">
                已完成
              </view>
              <view class="submit submitMbx" v-else-if="dis_level[inds].apply_order.status==1">
                待审核
              </view>
              <view class="submit" v-else @click="edit(dis_level[inds].Level_ID)">
                已驳回({{dis_level[inds].apply_order.reason}})
              </view>
            </block>
          </block>
          <block v-else>
            <view class="submit" @click="edit(dis_level[inds].Level_ID)">
              去申请
            </view>
          </block>
        </view>
      </block>
      
      <block v-if="dis_level[inds].level_rules_edit.direct_sons">
        <!-- 直邀请 -->
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.direct_sons.checked=='1'">
          <view class="td" style="border-bottom: 0px;"
                v-for="(it,ind) of dis_level[inds].level_rules_edit.direct_sons.value" :key="ind">
            <image class="image" src="/static/distributor/zhiyao.png"></image>
            <view class="mbx">
              <view class="tops">
                直邀{{it.count}}人{{it.level_name}}
              </view>
              <view class="bottoms">
                已邀{{dis_level[inds].level_rules_edit.direct_sons.user_data[it.level_id]||0}}人
              </view>
            </view>
            <block v-if="ind==0">
              <view class="submit submitMbx"
                    v-if="dis_level[inds].level_rules_edit.direct_sons.user_data.is_completed==1">
                已完成
              </view>
              <view class="submit" @click="goFenxiao">
                去邀请
              </view>
            </block>
          </view>
        </view>
      
      </block>
      
      <block v-if="dis_level[inds].level_rules_edit.team_sons">
        <!-- 团队 -->
        <view class="td" style="display: block;height: auto;"
              v-if="dis_level[inds].level_rules_edit.team_sons.checked=='1'">
          <view class="td" style="border-bottom: 0px;"
                v-for="(it,ind) of dis_level[inds].level_rules_edit.team_sons.value" :key="ind">
            <image class="image" src="/static/distributor/teamLast.png"></image>
            <view class="mbx">
              <view class="tops">
                团队{{it.level_name}}达{{it.count}}人
              </view>
              <view class="bottoms">
                已邀{{dis_level[inds].level_rules_edit.team_sons.user_data[it.level_id]||0}}人
              </view>
            </view>
            <block v-if="ind==0">
              <view class="submit submitMbx"
                    v-if="dis_level[inds].level_rules_edit.team_sons.user_data.is_completed==1">
                已完成
              </view>
              <view class="submit" @click="goFenxiao">
                去邀请
              </view>
            </block>
          </view>
        </view>
      </block>
    
    </view>
  
  </view>
</template>

<script>

import { disApplyInit } from '@/api/customer'
import { mapActions } from 'vuex'
import BaseMixin from '@/mixins/BaseMixin'
import CircleTitle from '@/componets/circle-title/circle-title'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      index: 0, // 第几个会员等级
      pro: {},
      Level_Description: '',
      inds: 0,
      dis_level: [],
    }
  },
  components: {
    CircleTitle,
    
  },
  onLoad () {
  
  },
  onShow () {
    this.disApplyInit()
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
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
  methods: {
    goFenxiao () {
      uni.navigateTo({
        url: '/pages/distributor/Main',
      })
    },
    // 申请成为分销商
    edit (id) {
      uni.navigateTo({
        url: '/pagesA/distributor/DistributorCenter?id=' + id + '&&type=edit',
      })
    },
    // 去购买分销商
    buyDis (id) {
      uni.navigateTo({
        url: '/pagesA/distributor/DistributorCenter?id=' + id,
      })
    },
    goIndex () {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
    goDetail (id) {
      uni.navigateTo({
        url: '/pages/detail/detail?Products_ID=' + id,
      })
    },
    change (e) {
      this.inds = e.detail.current
      this.Level_Description = this.dis_level[this.inds].Level_Description
    },
    disApplyInit () {
      disApplyInit({}, {
        tip: '正在加载中',
        mask: true,
      }).then(res => {
        this.pro = res.data
        this.dis_level = res.data.dis_level
        if (this.pro.user_info.Level_ID === '0') {
          this.Level_Description = this.pro.dis_level[0].Level_Description
        } else {
          for (const item of this.pro.dis_level) {
            if (item.Level_ID === this.pro.user_info.Level_ID) {
              this.Level_Description = item.Level_Description
            }
          }
        }
      }).catch(e => {
      })
    },
    ...mapActions({
      getInitData: 'system/loadInitData',
    }),
  },
  async created () {
    const initData = await this.getInitData()
    uni.setNavigationBarTitle({
      title: initData.commi_rename.commi + '等级',
    })
  },
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #FFFFFF;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  
  .top {
    width: 750 rpx;
    height: 200 rpx;
    background: rgba(64, 61, 61, 1);
    position: relative;
    
    .goBack {
      width: 20 rpx;
      height: 30 rpx;
      position: absolute;
      top: 29 rpx;
      left: 20 rpx;
    }
    
    .titles {
      color: #FFFFFF;
      font-size: 32 rpx;
      position: absolute;
      top: 28 rpx;
      left: 310 rpx;
      height: 31 rpx;
      line-height: 31 rpx;
    }
    
    .center {
      position: absolute;
      top: 60 rpx;
      left: 3 rpx;
      width: 750 rpx;
      height: 325 rpx;
      white-space: nowrap;
      
      .vipFir {
        width: 665 rpx !important;
        height: 325 rpx !important;
        display: inline-block;
        position: relative;
        
        .allImg {
          width: 100%;
          height: 100%;
        }
        
        .vipGrade {
          height: 24 rpx;
          font-size: 11px;
          color: #4D4D58;
          font-weight: normal;
          color: rgba(77, 77, 88, 1);
          line-height: 24 rpx;
          position: absolute;
          top: 28 rpx;
          left: 36 rpx;
        }
        
      }
    }
    
  }
  
  .mmp {
    position: absolute;
    top: 128 rpx; //84rpx;
    left: 205 rpx;
    width: 230 rpx;
    height: 36 rpx;
    text-align: center;
    display: flex;
    align-items: center;
  }
  
  .level-description {
    font-size: 24 rpx;
    color: #666666;
    margin-top: 20 rpx;
    width: 750 rpx;
    box-sizing: border-box;
    padding: 0 rpx 34 rpx 36 rpx 20 rpx;
  }
  
  .ruhe {
    width: 710 rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12 rpx 0px rgba(0, 0, 0, 0.25);
    border-radius: 10 rpx;
    margin: 0 auto;
    margin-top: 10 rpx;
    margin-bottom: 60 rpx;
    
    .td {
      width: 690 rpx;
      margin: 0 auto;
      height: 124 rpx;
      border-bottom: 1 rpx solid #ECE8E8;
      display: flex;
      align-items: center;
      
      &:last-child {
        border-bottom: 0 rpx;
      }
      
      .image {
        width: 65 rpx;
        height: 65 rpx;
        margin-left: 21 rpx;
      }
      
      .mbx {
        height: 65 rpx;
        margin-left: 24 rpx;
        
        .tops {
          height: 27 rpx;
          line-height: 27 rpx;
          color: #333333;
          font-weight: bold;
          font-size: 28 rpx;
        }
        
        .bottoms {
          margin-top: 15 rpx;
          height: 23 rpx;
          line-height: 23 rpx;
          font-size: 24 rpx;
          color: #999999;
        }
      }
      
      .submit {
        width: 110 rpx;
        height: 45 rpx;
        line-height: 45 rpx;
        background: rgba(244, 49, 49, 1);
        border-radius: 8 rpx;
        font-size: 24 rpx;
        color: #FFFFFF;
        text-align: center;
        margin-left: auto;
        margin-right: 20 rpx;
      }
      
      .submitMbx {
        background-color: #dedede !important;
      }
    }
  }
  
  .productList {
    width: 710 rpx;
    box-sizing: border-box;
    padding-left: 25 rpx;
    padding-right: 25 rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    .myProduct {
      width: 310 rpx;
      
      .imgPro {
        width: 310 rpx;
        height: 310 rpx;
        margin-bottom: 16 rpx;
      }
      
      .proText {
        width: 300 rpx;
        height: 52 rpx;
        line-height: 26 rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 12px;
        color: #333333;
        margin-bottom: 12 rpx;
      }
      
      .buttonLast {
        width: 310 rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45 rpx;
        margin-bottom: 22 rpx;
        
        .priceAll {
          color: #F43131;
          font-size: 30 rpx;
          
          .priceText {
            font-size: 24 rpx;
            margin-right: 8 rpx;
          }
        }
        
        .proDetail {
          width: 105 rpx;
          height: 45 rpx;
          line-height: 45 rpx;
          text-align: center;
          background: rgba(244, 49, 49, 1);
          border-radius: 8 rpx;
          font-size: 24 rpx;
          color: #FFFFFF;
        }
      }
    }
  }
  
  .myImgs {
    width: 36 rpx;
    height: 36 rpx;
    margin-right: 12 rpx;
  }
  
  .titleMy {
    padding-left: 20 rpx;
    padding-right: 35 rpx;
    margin-bottom: 30 rpx;
    font-size: 11px;
    color: #999999;
    height: 30 rpx;
    display: flex;
    align-items: center;
  }
</style>
