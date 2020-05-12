<template>
  <view class="myall">
    <view class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </view>
    <block>
      <view class="youhuijuan" v-for="(item,index) of pro" :key="index">
        <image class="allImg" :src="'/static/client/mbxcoupon.png'|domain"></image>
        <view class="infoImg">
          <image class="image" :src="item.Coupon_PhotoPath"></image>
        </view>
        <view class="storeTitle">
          {{item.Coupon_Subject}}
        </view>
        <view class="times">
          有效期：{{item.Coupon_StartTime.substring(0,10)}}至{{item.Coupon_EndTime.substring(0,10)}}
        </view>
        <view class="subject">
          {{item.limit_txt}}
        </view>
        <view class="prices" v-if="item.Coupon_Discount<=0">
          ¥
          <text>{{item.Coupon_Cash}}</text>
        </view>
        <view class="prices" v-else>
          {{item.Coupon_Discount*10}}折优惠
        </view>
        <view class="man">
          满{{item.Coupon_Condition}}可用
        </view>
        <view class="button" @click="goIndex(item.coupon_prod)">
          去使用
        </view>
      </view>
    
    </block>
    <view class="lasts">
      <view class="lefts">
        没有更多可用券 |
      </view>
      <view class="rights" @click="goExpired">
        查看已失效的券 >
      </view>
    </view>
    <view style="height: 30rpx;"></view>
  </view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getCouponList } from '@/api/common'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      checked: 0, // 选中
      page: 1,
      pageSize: 6,
      pro: [],
      totalCount: 0,
    }
  },
  onShow () {
    this.pro = []
    this.page = 1
    this.getUserReceivedCoupon()
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getUserReceivedCoupon()
    }
  },
  onPullDownRefresh () {
    this.page = 1
    this.pro = []
  },
  methods: {
    goExpired () {
      uni.navigateTo({
        url: '/pagesA/person/expiredCoupon',
      })
    },
    // 获取用户已领取可使用的优惠券
    getUserReceivedCoupon () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        User_ID: 49,
        status: 1,
      }
      getCouponList(data).then(res => {
        this.totalCount = res.totalCount
        for (const item of res.data) {
          this.pro.push(item)
        }
      }).catch(e => {
      })
    },
    goIndex (i) {
      if (i === '0') {
        uni.switchTab({
          url: '/pages/index/index',
        })
      } else {
        uni.redirectTo({
          url: '/pages/classify/result?pid=' + i,
        })
      }
    },
    // 	change(item){
    // 		this.checked=item;
    
    // 	}
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
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
      top: 48rpx;
      left: 150rpx;
    }
    
    .times {
      font-size: 20rpx;
      color: #666666;
      position: absolute;
      top: 92rpx;
      left: 148rpx;
    }
    
    .subject {
      font-size: 16rpx;
      color: #FF565F;
      position: absolute;
      left: 148rpx;
      top: 130rpx;
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

</style>
