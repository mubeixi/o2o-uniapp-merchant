<template>
  <view class="myall">
    <view class="img-div">
      <image :src="'/static/client/free/paySuccess.png'|domain" style="width: 100%;height: 100%;"></image>
    </view>
    <view class="pay-succ">
      支付成功
    </view>
    <view class="pay-button">
      <view @click="$linkTo('/pages/index')" class="button-all button-goon">继续购买</view>
      <view @click="goOrder" class="button-all button-next">查看订单</view>
    </view>
    <block>
      <block>
        <view class="pay-succ-last">
          本次购物可享权益
        </view>
        <view class="youhuijuan">
          <image class="allImg" :src="'/static/client/free/mbxcoupon.png'|domain"></image>
          <view class="infoImg">
            <image class="image" :src="'/static/client/free/mbxcoupon.png'|domain"></image>
          </view>
          <view class="storeTitle">
            11
          </view>
          <view class="times">
            有效期：3213
          </view>
          <view class="limit">
            232
          </view>
          <!--          <view class="prices" v-if="item.Coupon_Discount<=0">-->
          <!--            ¥<text>3213</text>-->
          <!--          </view>-->
          <!--          <view class="prices" v-else>-->
          <!--            {{item.Coupon_Discount*10}}折优惠-->
          <!--          </view>-->
          <!--          <view class="man" v-if="item.Coupon_Subject">-->
          <!--            满{{item.Coupon_Condition}}可用-->
          <!--          </view>-->
          <view class="button">
            去使用
          </view>
        </view>
      </block>
      <block>
        <!-- 猜你喜欢 -->
        <div class=" container">
          <div class="fenge"><span class="red"></span><span class="caini">猜你喜欢</span><span class="red"></span></div>
          <div class="prolist">
            <div class="pro-item" v-for="(prod,idx) in prodList" :key="idx">
              <img class="pro-cover" :src="prod.ImgPath" alt="">
              <div class="item-name">{{prod.Products_Name}}</div>
              <div class="price">
                <span class="n_price"><span>￥</span>{{prod.Products_PriceX}}</span>
                <span class="o_price"><span>￥</span>{{prod.Products_PriceX}}</span>
              </div>
            </div>
          </div>
        </div>
      </block>
    </block>

    <div v-if="showMain && free_money>0">
      <div class="popup-layer">
      </div>
      <div class="popup-content">
        <image :src="'/static/client/free/free.png'|domain" class="img-full"></image>
        <div class="popup-title">
          恭喜您！
        </div>
        <div class="popup-co fz-10 c3">
          获得<span class="fz-13" style="color: #FE3841;">免单特权!</span>该订单将为您免除{{free_money}}元，免除的金额将直接存入您的会员余额，请注意查收。
        </div>
        <div class="popup-btn" @click="goOrder">
          立即查看
        </div>
        <div class="flex flex-justify-c flex-vertical-c popup-del" @click="showMain=false">
          <layout-icon type="icondel" size="20" color="#c4bfbf"></layout-icon>
        </div>

      </div>

    </div>

  </view>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductList
} from '@/api/product'
import {
  getPayCoupons
} from '@/api/order'

export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      free_money: 0,
      checked: 0, // 选中
      couponList: [],
      Order_Type: '',
      OrderId: '',
      prodList: [],
      prod_arg: {
        page: 1,
        pageSize: 4
      },
      showMain: false
    }
  },
  onLoad (option) {
    this.pro = []
    this.Order_Type = option.Order_Type
    this.OrderId = option.OrderId

    this.getUserReceivedCoupon()
    this.getProd()
  },
  onShow () {

  },
  // 上拉触底
  onReachBottom () {
    if (this.hasMore) {
      this.getProd()
    }
  },
  methods: {
    getProd () {
      this.prod_arg.Users_ID = this.Users_ID
      const oldlist = this.prodList
      getProductList(this.prod_arg).then(res => {
        this.prodList = oldlist.concat(res.data)
        this.hasMore = (res.totalCount / this.prod_arg.pageSize) > this.prod_arg.page
        this.prod_arg.page += 1
      }).catch(e => {})
    },
    goOrder () {
      // 去订单列表
      uni.redirectTo({
        url: '/pages/order/OrderList?index=2&type=' + this.Order_Type
      })
    },
    // 获取用户已领取可使用的优惠券
    getUserReceivedCoupon () {
      const data = {
        order_id: this.OrderId
      }
      getPayCoupons(data).then(res => {
        // for (const item of res.data) {
        //   this.couponList.push(item)
        // }
        this.free_money = res.data.free_money
        this.showMain = true
      }).catch(e => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .popup-content {
    position: fixed;
    z-index: 100;
    top: 260rpx;
    left: 40rpx;
    width: 710rpx;
    height: 600rpx;

    .popup-title {
      font-size: 72rpx;
      color: #FE3841;
      line-height: 80rpx;
      position: absolute;
      top: 54rpx;
      left: 196rpx;
    }

    .popup-co {
      width: 298rpx;
      position: absolute;
      top: 146rpx;
      left: 180rpx;
    }

    .popup-btn {
      width: 280rpx;
      height: 74rpx;
      text-align: center;
      line-height: 74rpx;
      background: linear-gradient(0deg, rgba(255, 203, 109, 1), rgba(249, 216, 158, 1));
      box-shadow: 0px 4rpx 14rpx 1px rgba(222, 36, 36, 0.24);
      border-radius: 38rpx;
      font-size: 19px;
      color: #FE3841;
      position: absolute;
      top: 356rpx;
      left: 180rpx;
    }

    .popup-del {
      width: 690rpx;
      position: absolute;
      top: 508rpx;
      left: 0rpx;
    }
  }

  .popup-layer {
    position: fixed;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

  .img-div {
    width: 132px;
    height: 132px;
    margin: 0 auto;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  .pay-succ {
    height: 36rpx;
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    line-height: 36rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-succ-last {
    height: 26rpx;
    font-size: 13px;
    color: #999999;
    line-height: 26rpx;
    width: 100%;
    text-align: center;
    margin-bottom: 18px;
  }

  .pay-button {
    display: flex;
    height: 35px;
    width: 100%;
    padding-left: 64rpx;
    padding-right: 64rpx;
    box-sizing: border-box;
    margin-bottom: 18px;
  }

  .button-all {
    width: 290rpx;
    height: 35px;
    font-size: 15px;
    text-align: center;
    line-height: 35px;
    border-radius: 35px;
  }

  .button-goon {
    background: linear-gradient(90deg, rgba(255, 150, 87, 1), rgba(253, 84, 90, 1));
    color: #FFFFFF;
    margin-right: 40rpx;
  }

  .button-next {
    border: 1px solid rgba(245, 54, 54, 1);
    color: #F53636;
  }

  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
    padding-top: 18px;
  }

  .titless {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    z-index: 999;
  }

  .nav {
    z-index: 999;
    position: fixed;
    top: 86rpx;
    left: 0rpx;
    width: 750rpx;
    margin: 0 auto;
    margin: 20rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333333;

    .views {
      width: 236rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      position: relative;

      &.checked {
        color: #F43131;

        &:after {
          content: '';
          display: flex;
          width: 135rpx;
          height: 3rpx;
          background-color: #F43131;
          position: absolute;
          bottom: 0rpx;
          left: 50rpx;
        }
      }
    }
  }

  .youhuijuan {
    width: 709rpx;
    height: 206rpx;
    margin-left: 20rpx;
    margin-bottom: 30rpx;
    position: relative;

    .allImg {
      width: 100%;
      height: 100%;
    }

    .infoImg {
      width: 89rpx;
      height: 89rpx;
      border-radius: 50%;
      position: absolute;
      top: 56rpx;
      left: 44rpx;
      overflow: hidden;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .storeTitle {
      font-size: 28rpx;
      color: #333333;
      line-height: 28rpx;
      position: absolute;
      top: 62rpx;
      left: 150rpx;
    }

    .times {
      font-size: 20rpx;
      color: #666666;
      position: absolute;
      top: 105rpx;
      left: 148rpx;
    }

    .limit {
      font-size: 16rpx;
      color: #FF565F;
      position: absolute;
      left: 148rpx;
      top: 140rpx;
    }

    .all-coupon {
      font-size: 10px;
      color: #FF565F;
      position: absolute;
      top: 140rpx;
      left: 148rpx;
    }

    .prices {
      width: 110rpx;
      height: 40rpx;
      line-height: 40rpx;
      padding-left: 12rpx;
      padding-right: 13rpx;
      color: #333333;
      font-size: 30rpx;
      position: absolute;
      top: 41rpx;
      left: 534rpx;

      text {
        margin-left: 11rpx;
        font-size: 52rpx;
      }
    }

    .man {
      height: 19rpx;
      font-size: 20rpx;
      color: #666666;
      position: absolute;
      top: 95rpx;
      left: 534rpx;
    }

    .button {
      width: 125rpx;
      height: 44rpx;
      line-height: 44rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 44rpx;
      font-size: 22rpx;
      color: #F43131;
      text-align: center;
      position: absolute;
      top: 133rpx;
      left: 527rpx;
    }

    .yishiyong {
      position: absolute;
      width: 106rpx;
      height: 106rpx;
      top: 47rpx;
      left: 455rpx;
    }
  }

  .lasts {
    font-size: 14px;
    padding-top: 30rpx;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;

    .lefts {
      color: #666666;
    }

    .rights {
      margin-left: 10rpx;
      color: #F43131;
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }

  /* 猜你喜欢 */
  .container {
    margin-top: 30rpx;
    padding: 0 20rpx;
  }

  .fenge {
    text-align: center;
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caini {
    font-size: 30rpx;
    margin-left: 13rpx;
    margin-right: 13rpx;
  }

  .prolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .pro-item {
    width: 48%;
    margin-bottom: 15px;
    background: #fff;
  }

  .pro-item img {
    width: 345rpx;
    height: 345rpx;
  }

  .item-name {
    font-size: 24rpx;
    padding: 0 10rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .red {
    background-color: #F43131;
    display: inline-block;
    height: 3rpx;
    width: 44rpx;
  }

  .price {
    margin-top: 20rpx;
    padding: 0 10rpx 20rpx;
  }

  .n_price {
    color: #ff0000;
    font-size: 34rpx;

    span {
      font-size: 24rpx;
    }
  }

  .o_price {
    margin-left: 15rpx;
    color: #afafaf;
    font-size: 24rpx;
    text-decoration: line-through;
  }

</style>
