<template>
  <view @click="commonClick" class="overflow">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <view class="tops" v-if="show">
      <view class="imgs box-sizing">
        <image :src="prod_list.prod_img" class="image"></image>
      </view>
      <view class="textRight box-sizing">
        <view class="topText">
          {{prod_list.prod_name}}
        </view>
        <view class="bottomText">
          <view>
            ¥{{prod_list.prod_price}}
          </view>
          <view>
            ×{{prod_list.prod_count}}
          </view>
        </view>
      </view>
    </view>

    <view class="centers" v-if="pro">
      <view class="td">
        退款编号：{{pro.Back_Sn}}
      </view>
      <view class="td">
        退款时间：{{pro.Back_CreateTime}}
      </view>
      <view class="td">
        退款数量：
        <text style="font-weight: bold;">{{pro.Back_Qty}}件</text>
      </view>
      <view class="td">
        退款总价：
        <span>退回余额<span class="font16 danger-color"><span class="span font12">￥</span>{{pro.refund_money_fee}} </span>,</span>
        <span>原路退回 <span class="danger-color"><span class="span font12 ">￥</span>{{pro.refund_pay_fee}} </span></span>
      </view>
      <view class="td">
        退款状态：
        <text style="color: #FF6600;">{{pro.Back_Status_desc}}</text>
      </view>
      <view class="address" v-if="pro.shop_address">
        商家收货地址：{{pro.shop_address.RecieveProvince_name}}{{pro.shop_address.RecieveCity_name}}{{pro.shop_address.RecieveArea_name}}{{pro.shop_address.RecieveName}}
        手机号码:{{pro.shop_address.RecieveMobile}}{{pro.shop_address.RecieveAddress}}收
      </view>
      <block v-if="isFahuo">
        <view class="fahuo" v-if="pro.Back_Status==1">
          <view @click="isFahuo=false" class="fahuoSubmit">
            我要发货
          </view>
        </view>
        <view class="lines">

        </view>
        <block :key="index" v-for="(item,index) of pro.back_detail">
          <view class="reason">
            <text style="margin-right: 10rpx;">{{item.createtime}}</text>
            {{item.detail}}
          </view>
        </block>
      </block>
    </view>
    <block v-if="!isFahuo">
      <view class="orderFa" style="margin-top: 40rpx;">
        <view class="inputs">
          <input class="input" placeholder="请输入物流名称" type="text" v-model="shipping">
        </view>
        <view class="inputs" style="margin-top: 30rpx;">
          <input class="input" placeholder="请输入物流单号" type="text" v-model="shippingID">
        </view>
        <view @click="refundSend" class="submits">
          确认发货
        </view>
      </view>
    </block>
  </view>
</template>

<script>

import { getBackOrderDetail, refundSend } from '@/api/order'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      Back_ID: 0,//退款单ID
      pro: [],
      prod_list: {},
      isFahuo: true,
      shipping: '',
      shippingID: '',
      store_id: '',
      show:false
    }
  },
  onLoad (options) {
    this.Back_ID = options.Back_ID
    if (!options.store_id) return
    this.store_id = options.store_id
  },
  onShow () {
    this.getBackOrderDetail()
  },
  methods: {
    refundSend () {
      if (!this.shipping) {
        uni.showToast({
          title: '物流名称不能为空',
        })
        return
      }
      if (!this.shippingID) {
        uni.showToast({
          title: '物流单号不能为空',
        })
        return
      }
      let data = {
        Back_ID: this.pro.Back_ID,
        shipping: this.shipping,
        shippingID: this.shippingID,
      }
      refundSend(data).then(res => {
        uni.showToast({
          title: res.msg,
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pagesA/order/RefundList',
          })
        }, 2000)
      }).catch(e => {

      })
    },
    async getBackOrderDetail () {
      let data = { Back_ID: this.Back_ID }
      if (this.store_id) {
        data.store_id = this.store_id
      }


      await getBackOrderDetail(data).then(res => {
        this.pro = res.data
        this.prod_list = res.data.prod_list[0]
      }).catch(e => {
      })
      this.show=true
    },
  },
}
</script>

<style lang="scss" scoped>
  .overflow {
    background-color: #FFFFFF;
    height: 100vh;

    .tops {
      box-sizing: border-box;
      width: 750rpx;
      height: 240rpx;
      background-color: #FFFFFF;
      padding: 20rpx;
      display: flex;
      align-items: center;

      .imgs {
        width: 200rpx;
        height: 200rpx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .textRight {
        margin-left: 20rpx;
        width: 480rpx;
        height: 200rpx;

        .topText {
          font-size: 30rpx;
          color: #333333;
          line-height: 30rpx;
          height: 60rpx;
          overflow: hidden;
          padding-top: 20rpx;
        }

        .bottomText {
          margin-top: 40rpx;
          color: red;
          font-size: 30rpx;
          display: flex;
          justify-content: space-between;
        }
      }

    }

    .centers {
      width: 710rpx;
      box-sizing: border-box;
      margin-left: 20rpx;
      margin-top: 15rpx;
      background-color: #FFFFFF;

      .td {
        font-size: 28rpx;
        color: #555555;
        font-weight: 400;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 1rpx solid #EEEEEE;
        padding-left: 20rpx;
      }

      .fahuo {
        height: 80rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1rpx solid #EEEEEE;

        .fahuoSubmit {
          width: 200rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          background-color: #FF6600;
          border-radius: 10rpx;
          color: #FFFFFF;
          font-size: 28rpx;
        }
      }

      .address {
        font-size: 28rpx;
        color: #555555;
        font-weight: 400;
        line-height: 40rpx;
        border-bottom: 1rpx solid #EEEEEE;
        padding-left: 20rpx;
        padding-top: 20rpx;
        padding-bottom: 20rpx;
      }

      .lines {
        border-bottom: 1rpx solid #EEEEEE;
        height: 40rpx;
        width: 100%;
        padding-left: 20rpx;
      }

      .reason {
        font-size: 28rpx;
        color: #555555;
        font-weight: 400;
        border-bottom: 1rpx solid #EEEEEE;
        padding: 10rpx 20rpx 10rpx 20rpx;
        line-height: 60rpx;
      }


    }

    .orderFa {
      width: 710rpx;
      box-sizing: border-box;
      margin-left: 20rpx;
      background-color: #FFFFFF;
      padding-top: 30rpx;
      padding-bottom: 20rpx;

      .inputs {
        width: 500rpx;
        height: 60rpx;
        box-sizing: border-box;
        margin: 0 auto;

        .input {
          width: 100%;
          height: 40rpx;
          border: 1rpx solid #CCCCCC;
          font-size: 28rpx;
        }
      }
    }

    .submits {
      width: 550rpx;
      height: 60rpx;
      line-height: 60rpx;
      margin-left: 80rpx;
      margin-top: 30rpx;
      background-color: red;
      text-align: center;
      line-height: 60rpx;
      color: #FFFFFF;
    }
  }


</style>
