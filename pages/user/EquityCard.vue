<template>
  <div>
    <div class="equity-card">
      <swiper class="center" :indicator-dots="false" :autoplay="false" :duration="1000" :current="inds"
              @change="change">
        <swiper-item class="vipFir" v-for="(item,index) of rightCard" :key="index">
          <image :src="'/static/client/rightCard.png'|domain" class="img-full"></image>
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
            <block v-for="(item,index) of rightCard" :key="index">
              <div class="div-block-active" v-if="index==inds"></div>
              <div class="div-block" v-else></div>
            </block>
          </div>
        </swiper-item>
      </swiper>
      
      <div class="flex flex-vertical-c score-coupon">
        <div class="score-coupon-item" v-if="rightCard[inds].card_content.score">
          <image src="/static/rightCardScore.png" class="score-img"></image>
          <div class="fz-12 score-text">
            赠送积分
          </div>
        </div>
        <div class="score-coupon-item" v-if="rightCard[inds].card_content.coupon">
          <image src="/static/rightCardCoupon.png" class="score-img"></image>
          <div class="fz-12 score-text">
            赠送优惠券
          </div>
        </div>
      
      </div>
    
    </div>
    
    <div class="buy-know m-t-29 fz-17 c3 m-b-20">
      购买须知
    </div>
    <div class="buy-know-list fz-13 c8">
      {{rightCard[inds].descr}}
    
    </div>
    
    <div style="width: 750rpx;height: 90rpx"></div>
    <div class="submit fz-17" @click="submit">
      <span class="fz-12">¥</span>{{rightCard[inds].price}} 立即购买
    </div>
    
    <wzw-pay
      ref="payLayer"
      :isOpen='false'
      :is_use_order_pay="false"
      :pay_money="rightCard[inds].price"
      :paySuccessCall="paySuccessCall"
      :payFailCall="payFailCall"
      @payMehtod="payMehtod"
    />
  
  
  </div>
</template>

<script>
import { createRightsCardOrder, getRightsCard, rightsCardPay } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import { error } from '@/common/fun'
import WzwPay from '@/componets/wzw-pay/wzw-pay'
import Pay from '@/common/Pay'

export default {
  mixins: { BaseMixin },
  components: { WzwPay },
  data () {
    return {
      inds: 0,
      rightCard: [],
      order_id: '',
      pay_type: '',
    }
  },
  methods: {
    async payMehtod (item) {
      console.log(item, 'ss')
      let data = {
        order_id: this.order_id,
        pay_method: item.pay_type,
      }
      let payCan = await rightsCardPay(data, { tip: '加载中' }).catch(e => {
        error(e.msg || '创建订单失败')
      })
      Pay(this, item.pay_type, payCan)
    },
    payFailCall (err) {
      uni.showToast({
        title: err.msg ? err.msg : '支付失败',
        icon: 'none',
        duration: 2000,
      })
      
      // uni.redirectTo({
      // 	url: '/pages/order/order?index=1'
      // })
      // setTimeout(function(){
      // 	uni.redirectTo({
      // 		url: '/pages/order/order?index=1'
      // 	})
      // },1000)
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
          },
        })
        return
      }
      
      // 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取
      
      if (res && res.code && res.code === 4) {
        toast('用户取消支付', 'none')
        return
      }
      
      toast('支付成功')
      
      uni.redirectTo({
        url: '/pages/user/index',
      })
      
    },
    async submit () {
      let order = await createRightsCardOrder({ card_id: this.rightCard[this.inds].id }, {
        onlyData: true,
        tip: '加载中',
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
      let arr = await getRightsCard({ status: 1 }, {
        onlyData: true,
        tip: '加载中',
      }).catch(e => {
        error(e.msg || '获取权益卡错误')
      })
      this.rightCard = arr
    },
  },
  onLoad () {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
  .equity-card {
    background-color: #3A3731;
    height: 566rpx;
    width: 750rpx;
    padding-top: 50rpx;
    box-sizing: border-box;
    
    &-title {
      color: #4E4436;
      height: 38rpx;
      line-height: 38rpx;
      position: absolute;
      top: 48rpx;
      left: 320rpx;
    }
    
    &-coupon {
      height: 22rpx;
      line-height: 22rpx;
      color: #5C533D;
      position: absolute;
      top: 158rpx;
      left: 26rpx;
    }
    
    &-no {
      color: #5C533D;
      height: 18rpx;
      line-height: 18rpx;
      position: absolute;
      top: 160rpx;
      right: 18rpx;
    }
    
  }
  
  .center {
    width: 700rpx;
    height: 400rpx;
    margin: 0 auto;
    white-space: nowrap;
    
    .vipFir {
      width: 700rpx !important;
      height: 400rpx !important;
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
    top: 236rpx;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .score-coupon {
    width: 700rpx;
    height: 120rpx;
    position: absolute;
    top: 350rpx;
    left: 24rpx;
    padding: 0rpx 30rpx;
    box-sizing: border-box;
    
    &-item {
      margin-right: 74rpx;
      text-align: center;
    }
    
    .score-img {
      width: 80rpx;
      height: 80rpx;
      margin: 0 auto;
    }
    
    .score-text {
      color: #FEF1C6;
      height: 24rpx;
      margin-top: 10rpx;
      line-height: 24rpx;
      text-align: center;
    }
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

</style>
