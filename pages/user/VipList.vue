<template>
  <div class="vip-all">
    <div class="top">
      <image :src="'/static/client/vip/vip-bg.png'|domain" class="img-full"></image>
      <swiper class="center" :indicator-dots="false" :autoplay="false" :duration="1000" :current="inds"
              @change="change">
        <swiper-item class="vipFir"  v-for="(item,index) of vipData"
                     :key="index">
					<!-- :style="vipData.length==1?'margin-left:43rpx;':''" -->
          <image :src="'/static/client/vip/vip.png'|domain" class="img-full"></image>
          <div class="vip-title">
            {{item.level_name}}
          </div>
        </swiper-item>
      </swiper>
    </div>

    <div class="vip-has">
      <div class="vip-has-title fz-17 c3">
        会员享特权
      </div>
      <scroll-view class="vip-has-content flex " scroll-x="true">
        <block v-for="(item,index) in vipData[inds].basic_rights" :key="index">
          <div class="vip-has-item">
            <image :src="item.img_url" class="vip-has-content-img"></image>
            <div class="fz-12 c3 m-t-5">
              {{item.name}}
            </div>
          </div>
        </block>
      </scroll-view>
    </div>

    <div class="vip-has" style="height: auto;" v-if="coupon.length>0">
      <div class="vip-has-title fz-17 c3">
        赠送优惠卷
      </div>
      <div class="p-l-20 p-r-20 p-b-20">
        <div class="vip-coupon" v-for="(item,index) of coupon" :key="index">
          <image :src="'/static/client/vip/coupon.png'|domain" class="img-full"></image>
          <div class="vip-coupon-title">满{{item.Coupon_Condition}}可用</div>
          <div class="vip-coupon-price">{{item.Coupon_Cash}}</div>
        </div>
      </div>
    </div>

    <div class="vip-pro" v-if="pro.length>0">
      <div class="vip-pro-title fz-17 c3">
        赠送商品
      </div>
      <div class="vip-pro-list">
        <div class="vip-pro-item" v-for="(pr,ind) of pro" :key="ind">
          <div class="vip-pro-item-img">
            <image :src="pr.img_url" class="img-full"></image>
          </div>
          <div class="vip-pro-item-title fz-13 c3 m-t-11 m-b-10">
            {{pr.Products_Name}}
          </div>
          <div class=" flex flex-vertical-c">
            <div class="fz-12 cr">
              ¥ <span class="fz-17 m-l-5">{{pr.Products_PriceX}}</span>
            </div>
            <div class="fz-12 priceY  m-l-10">
              ¥{{pr.Products_PriceY}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 750rpx;height: 100rpx"></div>
    <div class="fz-12 submit">
      ¥<span class="fz-16">{{vipData[inds].price}}直接购买</span>
    </div>

  </div>
</template>

<script>

import { getUserLevel, getShopGiftList, getCouponList } from '@/api/common'
import BaseMixin from '@/mixins/BaseMixin'
export default {
  name: 'VipList',
  mixins: [BaseMixin],
  data () {
    return {
      vipData: [{ basic_rights: '' }],
      inds: 0,
      coupon: [],
      pro: [],
	  biz_id:''
    }
  },
  methods: {
    async change (e) {
      this.inds = e.mp.detail.current

      if (this.vipData[this.inds].upgrade_rights && this.vipData[this.inds].upgrade_rights.coupon) {
        const id = this.vipData[this.inds].upgrade_rights.coupon.value
        this.coupon = await getCouponList({ coupon_id: id }, {
          onlyData: true,
          tip: '加载中'
        }).catch(e => {
          throw Error(e.msg || '获取优惠券信息失败')
        })
      } else {
        this.coupon = []
      }
      if (this.vipData[this.inds].upgrade_rights && this.vipData[this.inds].upgrade_rights.product) {
        const id = this.vipData[this.inds].upgrade_rights.product.value
        this.pro = await getShopGiftList({ ids: id }, {
          onlyData: true,
          tip: '加载中'
        }).catch(e => {
          throw Error(e.msg || '获取赠送商品信息失败')
        })
      } else {
        this.pro = []
      }
    },
    async init () {
      try {
        const arr = await getUserLevel({ biz_id: this.biz_id }, {
          onlyData: true,
          tip: '加载中'
        }).catch(e => {
          throw Error(e.msg || '获取会员信息失败')
        })
        this.vipData = arr
        if (this.vipData[this.inds].upgrade_rights && this.vipData[this.inds].upgrade_rights.coupon) {
          const id = this.vipData[this.inds].upgrade_rights.coupon.value
          this.coupon = await getCouponList({ coupon_id: id }, {
            onlyData: true,
            tip: '加载中'
          }).catch(e => {
            throw Error(e.msg || '获取优惠券信息失败')
          })
        }
        if (this.vipData[this.inds].upgrade_rights && this.vipData[this.inds].upgrade_rights.product) {
          const id = this.vipData[this.inds].upgrade_rights.product.value
          this.pro = await getShopGiftList({ ids: id }, {
            onlyData: true,
            tip: '加载中'
          }).catch(e => {
            throw Error(e.msg || '获取赠送商品信息失败')
          })
        }
      } catch (e) {
        this.$modal(e.message)
      }
    }
  },
  onShow () {
    this.init()
  },
  onLoad(options) {
  	this.biz_id=options.bid
  }
}
</script>

<style scoped lang="scss">
  .vip-all {
    background-color: #f1f1f1;
    min-height: 100vh;
  }

  .top {
    width: 750rpx;
    height: 454rpx;
    position: relative;

    .goBack {
      width: 20rpx;
      height: 30rpx;
      position: absolute;
      top: 29rpx;
      left: 20rpx;
    }

    .titles {
      color: #FFFFFF;
      font-size: 32rpx;
      position: absolute;
      top: 28rpx;
      left: 310rpx;
      height: 31rpx;
      line-height: 31rpx;
    }

    .center {
      position: absolute;
      top: 60rpx;
      left: 3rpx;
      width: 750rpx;
      height: 332rpx;
      white-space: nowrap;

      .vipFir {
        width: 662rpx !important;
        height: 332rpx !important;
        display: inline-block;
        position: relative;
        padding-right: 30rpx;
      }
    }
  }

  .vip-title {
    height: 46rpx;
    line-height: 46rpx;
    font-weight: bold;
    color: #f1f1f1;
    text-shadow: 0px 6rpx 0px rgba(77, 60, 28, 0.6);
    position: absolute;
    top: 90rpx;
    left: 340rpx;
  }

  .vip-has {
    width: 710rpx;
    height: 290rpx;
    border-right: 10rpx;
    margin: 50rpx auto 0;
    background-color: #FFFFFF;
    white-space: nowrap;

    &-title {
      width: 100%;
      height: 114rpx;
      line-height: 32rpx;
      text-align: center;
      padding: 32rpx 0rpx 50rpx 0rpx;
      box-sizing: border-box;
    }

    &-content {
      width: 710rpx;
      padding: 0rpx 50rpx;
      box-sizing: border-box;

      &-img {
        width: 88rpx;
        height: 88rpx;
      }
    }
  }

  .vip-has-item {
    text-align: center;
    margin-right: 86rpx;
    display: inline-block;

    &:last-child {
      margin-right: 0rpx;
    }
  }

  .vip-pro {
    width: 710rpx;
    border-radius: 10rpx;
    background-color: #FFFFFF;
    margin: 30rpx auto;

    &-title {
      width: 710rpx;
      height: 102rpx;
      line-height: 32rpx;
      text-align: center;
      padding: 30rpx 0rpx 40rpx 0rpx;
      box-sizing: border-box;
    }
  }

  .vip-pro-list {
    width: 710rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    flex-wrap: wrap;
    display: flex;
  }

  .vip-pro-item {
    width: 310rpx;
    margin-right: 32rpx;
    margin-bottom: 48rpx;

    &-img {
      width: 310rpx;
      height: 310rpx;
    }

    &-title {
      width: 310rpx;
      overflow: hidden;
      height: 60rpx;
      line-height: 30rpx;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .cr {
      color: #f00;
    }

    .priceY {
      color: #afafaf;
      text-decoration: line-through;
    }
  }

  .submit {
    width: 750rpx;
    text-align: center;
    height: 86rpx;
    line-height: 86rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #26C78D;
    color: #FFFFFF;
  }

  .vip-coupon {
    width: 168rpx;
    height: 184rpx;
    position: relative;

    &-title {
      position: absolute;
      left: 0rpx;
      top: 18rpx;
      width: 168rpx;
      text-align: center;
      font-size: 10px;
      color: #FD3E16;
    }

    &-price {
      font-size: 72rpx;
      color: #FD3E16;
      position: absolute;
      left: 0rpx;
      top: 54rpx;
      width: 168rpx;
      line-height: 60rpx;
      text-align: center;
    }
  }

</style>
