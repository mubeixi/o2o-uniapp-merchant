<template>
  <div @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="equity-card">
      <div class="equity-top">
        <layout-icon @click="backNext" class="back-icon" color="#fff" size="24" type="iconback1"></layout-icon>
        <span>权益</span>
      </div>
      <swiper :autoplay="false" :current="inds" :duration="1000" :indicator-dots="false" @change="change"
              class="center">
        <swiper-item :key="index" class="vipFir" v-for="(item,index) of rightCard">
          <image class="img-full" src="/static/user/equitySwper.png"></image>
          <div class="fz-20 equity-card-title">
            {{item.card_name}}
          </div>
          <div class="fz-11 equity-card-coupon">
            海量积分赠送满立减优惠券
          </div>
          <div class="fz-11 equity-card-no">
            NO.8888888888
          </div>
          <div class="indicator-div flex flex-vertical-c flex-justify-c" v-if="index==inds">
            <block :key="index" v-for="(item,index) of rightCard">
              <div class="div-block-active" v-if="index==inds"></div>
              <div class="div-block" v-else></div>
            </block>
          </div>
        </swiper-item>
      </swiper>

    </div>

    <div class="score-List" v-if="rightCard[inds].card_content&&rightCard[inds].card_content.score">
      <div class="score-List-item flex flex-justify-c flex-vertical-c">
        <image class="title-img" src="/static/user/titleLeft.png"></image>
        <span class="m-l-10 m-r-10">
              赠送积分
            </span>
        <image class="title-img" src="/static/user/titleRight.png"></image>
      </div>

      <div class="flex flex-vertical-c score-List-detail">
        <image class="score-img" src="/static/user/scopeImg.png"></image>
        <span class="score-List-detail-test">
            购买此权益卡可享赠送<span class="score-List-color">{{rightCard[inds].card_content.score}}</span>积分特权
          </span>
      </div>

    </div>

    <div class="score-coupon flex flex-justify-c flex-vertical-c" v-if="rightCard[inds].coupons">
      <image class="title-img" src="/static/user/titleLeft.png"></image>
      <span class="m-l-10 m-r-10">
              赠送优惠券
            </span>
      <image class="title-img" src="/static/user/titleRight.png"></image>
    </div>
    <scroll-view class="score-coupon-list flex flex-vertical-c " scroll-x v-if="rightCard[inds].coupons">
      <div :key="index" class="score-coupon-list-div" v-for="(coupon,index) of rightCard[inds].coupons">
        <div class="Coupon_Cash">
          {{coupon.Coupon_Cash}}
        </div>
        <div class="Coupon_Condition">
          {{coupon.Coupon_Subject}}
        </div>
        <div class="coupon-use" v-if="coupon.coupon_prod==0">
          全店通用
        </div>
        <div class="coupon-use" v-else>
          指定商品可用
        </div>
      </div>
    </scroll-view>

    <div style="width: 750rpx;height: 20rpx;background-color: #f5f5f5" v-if="rightCard[inds].descr"></div>

    <div class="score-coupon flex flex-justify-c flex-vertical-c" v-if="rightCard[inds].descr">
      <image class="title-img" src="/static/user/titleLeft.png"></image>
      <span class="m-l-10 m-r-10">
              购买须知
            </span>
      <image class="title-img" src="/static/user/titleRight.png"></image>
    </div>
    <div class="buy-know-list fz-13 c8" v-if="rightCard[inds].descr">
      {{rightCard[inds].descr}}

    </div>

    <div style="width: 750rpx;height: 90rpx"></div>
    <div @click="submit" class="submit fz-17">
      <span class="fz-12">¥</span>{{rightCard[inds].price}} 立即购买
    </div>

    <wzw-pay
      :isOpen='false'
      :is_use_order_pay="false"
      :payFailCall="payFailCall"
      :paySuccessCall="paySuccessCall"
      :pay_money="rightCard[inds].price"
      @payMehtod="payMehtod"
      ref="payLayer"
    />

  </div>
</template>

<script>
import { createRightsCardOrder, getRightsCard, rightsCardPay } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import { error, toast } from '@/common/fun'
import WzwPay from '@/componets/wzw-pay/wzw-pay'
import Pay from '@/common/Pay'
import { checkIsLogin } from '@/common/helper'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    WzwPay,
    LayoutIcon
  },
  data () {
    return {
      inds: 0,
      rightCard: [],
      order_id: '',
      pay_type: ''
    }
  },
  methods: {
    backNext () {
      uni.navigateBack()
    },
    async payMehtod (item) {
      const data = {
        order_id: this.order_id,
        pay_method: item.pay_type
      }
      const payCan = await rightsCardPay(data, { tip: '加载中' }).catch(e => {
        error(e.msg || '创建订单失败')
      })
      if (payCan.data) {
        Pay(this, item.pay_type, payCan)
      } else {
        toast('支付成功')
        setTimeout(function () {
          uni.switchTab({
            url: '/pages/user/index'
          })
        }, 1000)
      }
    },
    payFailCall (err) {
      uni.showToast({
        title: err.msg ? err.msg : '支付失败',
        icon: 'none',
        duration: 2000
      })
    },
    paySuccessCall (res) {
      var _that = this
      if (res && res.code && res.code === 2) {
        _that.payFailCall()
        return
      }
      if (res && res.code && res.code === 1) {
        toast('用户取消支付', 'none')
        return
      }

      // 头条小程序
      if (res && res.code && res.code === 9) {
        uni.showModal({
          title: '提示',
          content: '是否完成支付',
          cancelText: '未完成',
          confirmText: '已支付',
          success: function (res) {
            if (res.confirm) {

            } else if (res.cancel) {

            }
          }
        })
        return
      }

      // 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取

      if (res && res.code && res.code === 4) {
        toast('用户取消支付', 'none')
        return
      }

      toast('支付成功')

      uni.switchTab({
        url: '/pages/user/index'
      })
    },
    async submit () {
      if (!checkIsLogin(1, 1)) return
      const order = await createRightsCardOrder({ card_id: this.rightCard[this.inds].id }, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        error(e.msg || '创建订单失败')
      })
      this.order_id = order.order_id
      this.$refs.payLayer.show()
    },
    change (e) {
      this.inds = e.mp.detail.current
    },
    async init () {
      const arr = await getRightsCard({ status: 1 }, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        error(e.msg || '获取权益卡错误')
      })
      // arr.map(item => {
      //   item.card_content = JSON.parse(item.card_content)
      // })
      this.rightCard = arr
    }
  },
  onLoad () {
    if (!checkIsLogin(1, 1)) return
    this.init()
  }
}
</script>

<style lang="scss" scoped>
  .equity-card {
    /*background-color: #3A3731;*/
    height: 434rpx;
    width: 750rpx;
    box-sizing: border-box;
    background-image: url("/static/user/equityCardBg.png");
    background-size: 100% 100%;
    padding-top: 150rpx;
    margin-bottom: 120rpx;

    &-title {
      color: #885E24;
      font-weight: bold;
      height: 44rpx;
      line-height: 44rpx;
      font-size: 46rpx;
      position: absolute;
      top: 46rpx;
      left: 40rpx;
    }

    &-coupon {
      /*width:360rpx;*/
      height: 60rpx;
      line-height: 60rpx;
      background: linear-gradient(90deg, rgba(97, 98, 107, 1) 0%, rgba(50, 51, 57, 1) 100%);
      border-radius: 30rpx;
      padding: 0px 24rpx;
      color: #FFE590;
      font-size: 24rpx;
      position: absolute;
      top: 132rpx;
      left: 48rpx;
    }

    &-no {
      color: #172B27;
      height: 20rpx;
      font-size: 24rpx;
      line-height: 20rpx;
      position: absolute;
      bottom: 80rpx;
      left: 48rpx;
    }

  }

  .equity-top {
    height: 34rpx;
    width: 750rpx;
    font-size: 36rpx;
    color: #FFFFFF;
    line-height: 34rpx;
    text-align: center;
    position: absolute;
    left: 0;
    top: 70rpx;
    box-sizing: border-box;
    padding: 0px 20rpx;
  }

  .back-icon {
    position: absolute;
    left: 10px;
    top: 0;
  }

  .center {
    width: 700rpx;
    height: 340rpx;
    margin: 0 auto;
    white-space: nowrap;

    .vipFir {
      width: 700rpx !important;
      height: 340rpx !important;
      display: inline-block;
      position: relative;
    }
  }

  .div-block {
    width: 20rpx;
    height: 4rpx;
    border-radius: 2rpx;
    background-color: #3A3731;
    margin-right: 8rpx;
  }

  .div-block-active {
    width: 20rpx;
    height: 4rpx;
    border-radius: 2rpx;
    background-color: #FFFFFF;
    margin-right: 8rpx;
  }

  .indicator-div {
    position: absolute;
    bottom: 40rpx;
    left: 50%;
    transform: translateX(-50%);
  }

  .score-List {
    width: 710rpx;
    height: 220rpx;
    padding: 0rpx 42rpx;
    box-sizing: border-box;
    margin: 0 auto;
    box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.11);
    border-radius: 10rpx;

    &-item {
      width: 100%;
      padding: 40rpx 0rpx;
      height: 112rpx;
      line-height: 32rpx;
      box-sizing: border-box;
    }

    &-detail {
      height: 44rpx;
      width: 100%;
      margin-top: 20rpx;
    }
  }

  .score-img {
    width: 46rpx;
    height: 44rpx;
    margin-right: 40rpx;
  }

  .buy-know {
    width: 750rpx;
    height: 28rpx;
    line-height: 28rpx;
    text-align: center;
  }

  .buy-know-list {
    width: 710rpx;
    margin: 0 auto;
    line-height: 52rpx;
  }

  .submit {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 750rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    color: #FFFFFF;
    background: rgba(38, 199, 141, 1);
  }

  .title-img {
    width: 106rpx;
    height: 16rpx;
  }

  .score-List-detail-test {
    height: 28rpx;
    line-height: 28rpx;
    color: #666666;
  }

  .score-List-color {
    color: #26C78D;
    font-size: 32rpx;
  }

  .score-coupon {
    width: 750rpx;
    height: 32rpx;
    line-height: 32rpx;
    padding: 54rpx 0rpx;
  }

  .score-coupon-list {
    height: 192rpx;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0rpx 14rpx 44rpx 14rpx;
    white-space: nowrap;
  }

  .score-coupon-list-div {
    display: inline-block;
    position: relative;
    width: 214rpx;
    height: 148rpx;
    background-image: url("/static/user/coupon.png");
    background-size: 100% 100%;
    margin-right: 40rpx;

    .Coupon_Cash {
      width: 96rpx;
      height: 44rpx;
      line-height: 44rpx;
      color: #FF0000;
      font-size: 60rpx;
      font-weight: 800;
      position: absolute;
      top: 30rpx;
      left: 46rpx;
    }

    .Coupon_Condition {
      height: 16rpx;
      line-height: 16rpx;
      color: #333333;
      font-size: 10px;
      width: 214rpx;
      text-align: center;
      position: absolute;
      left: 0;
      top: 84rpx;
    }

    .coupon-use {
      font-size: 10px;
      color: #F8F9F5;
      height: 18rpx;
      line-height: 18rpx;
      position: absolute;
      bottom: 18rpx;
      left: 0;
      width: 214rpx;
      text-align: center;
    }
  }
</style>
