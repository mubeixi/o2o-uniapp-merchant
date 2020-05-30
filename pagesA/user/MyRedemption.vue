<template>
  <view @click="commonClick" class="all">
    <!-- <page-title title="我的兑换" bgcolor="#ffffff"></page-title> -->
    <view style="height: 10rpx;width: 100%;"></view>
    <template v-if="prod_list.length > 0">
      <view :key="index" class="myHa" v-for="(item,index) in prod_list">
        <view class="tops">
          <view class="views">
            兑换单号：{{item.Orders_ID}}
          </view>
          <view class="views times">
            <image :src="'/static/client/check/time.png'|domain" class="imgs"></image>
            {{item.Orders_CreateTime}}
<!--             | formatTime-->
          </view>
        </view>
        <view class="last">
          <image :src="item.Gift_Info.Gift_ImgPath" class="image"></image>
          <view class="myRight">
            <view class="titles">
              <view class="leftM">
                {{item.Gift_Info.Gift_Name}}
              </view>
              <view
                :class="[(item.Orders_Status == 2 || item.Orders_Status == 3)? 'payed': '',item.Orders_Status == 4 ? 'complated': '','rightM']"
                @click="toBuy(item)"
                class="rightM">
                {{item.Orders_Status|status_desc}}
              </view>
            </view>
            <view class="rty">
              <view class="leftM">
                <image :src="'/static/client/check/ji.png'|domain" class="image" mode=""></image>
                <text class="texts">{{item.Gift_Info.Gift_Integral}}</text>
              </view>
              <view @click.stop="cancelJifenProdOrder(item)" class="rightM complated" v-if="item.Orders_Status == 1">
                取消兑换
              </view>
            </view>
            <view @click.stop="confirmJifenProdOrder(item)" class="rty confirm" v-if="item.Orders_Status == 3">
              <view class="rightM payed" style="float: right;">确认收货</view>
            </view>
          </view>
        </view>

      </view>
    </template>
    <template v-else>
      <div class="defaults">
        <image :src="'/static/client/defaultImg.png'|domain"></image>
      </div>
    </template>
  </view>
</template>

<script>
import { cancelJifenProdOrder, confirmJifenProdOrder, jifenProdOrder } from '@/api/customer'
import { modal } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      prod_list: [],
      hasMore: false
    }
  },
  onShow () {
    this.prod_list = []
    this.get_jifen_order()
  },
  filters: {
    status_desc (status) {
      switch (status) {
        case 1 :
          return '待支付'
          break
        case 2 :
          return '已付款'
          break
        case 3 :
          return '已发货'
          break
        case 4 :
          return '已完成'
          break
      }
    }
   // formatTime: formatTime
  },
  methods: {
    get_jifen_order () {
      jifenProdOrder({ errtip: false }).then(res => {
        const old = this.prod_list
        this.prod_list = old.concat(res.data)
        if (this.prod_list.length < res.totalCount) {
          this.hasMore = true
        }
      }).catch(err => {
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
      })
    },
    // 待支付的可以去支付
    toBuy (item) {
      if (item.Orders_Status == 1) {
        uni.navigateTo({
          url: '/pagesA/user/IntegralCheck?gift_id=' + item.Gift_ID
        })
      }

      // 已发货物流追踪
      if (item.Orders_Status == 3) {
        uni.navigateTo({
          url: '/pages/order/logistics?shipping_id=' + item.Orders_ShippingID + '&express=' + item.Orders_Shipping + '&prod_img=' + item.Gift_Info.Gift_ImgPath
        })
      }
    },
    // 取消订单
    cancelJifenProdOrder (item) {
      cancelJifenProdOrder({ Order_ID: item.Orders_ID }).then(res => {
        uni.showToast({
          title: res.msg
        })
        this.prod_list = []
        this.get_jifen_order()
      }).catch(() => {
        modal('操作失败')
      })
    },
    //	确认订单
    confirmJifenProdOrder (item) {
      confirmJifenProdOrder({ Order_ID: item.Orders_ID }).then(res => {
        uni.showToast({
          title: res.msg
        })
        this.prod_list = []
        this.get_jifen_order()
      }).catch(() => {
        modal('操作失败')
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  view {
    box-sizing: border-box;
  }

  .all {
    background-color: #F8F8F8;
    min-height: 100vh;
    text-align: center;
  }

  .myHa {
    width: 700rpx;
    height: 320rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 40rpx;
    margin: 0 auto;
    margin-top: 25rpx;

    .tops {
      padding: 34rpx 22rpx 0rpx 21rpx;
      height: 60rpx;
      display: flex;
      justify-content: space-between;
      font-size: 26rpx;
      color: #888888;

      .views {
        height: 25rpx;
        line-height: 25rpx;
      }

      .times {
        height: 19rpx;
        line-height: 19rpx;
        margin-top: 6rpx;
      }

      .imgs {
        width: 17rpx;
        height: 17rpx;
        margin-right: 10rpx;
      }
    }

    .last {
      margin-top: 59rpx;
      margin-left: 20rpx;
      width: 680rpx;
      height: 176rpx;
      display: flex;

      .image {
        width: 176rpx;
        height: 176rpx;
      }

      .myRight {
        width: 504rpx;
        padding-left: 15rpx;
        padding-top: 16rpx;

        .rty {
          margin-top: 30rpx;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .image {
            width: 16rpx;
            height: 17rpx;
          }

          .texts {
            margin-left: 6rpx;
            color: #FE6444;
            font-size: 32rpx;
          }
        }

        .rty.confirm {
          justify-content: flex-end;
        }

        .titles {
          height: 42rpx;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .leftM {
          height: 27rpx;
          overflow: hidden;
          font-size: 28rpx;
          line-height: 27rpx;
          color: #333333;
          font-weight: 300;
        }

        .rightM {
          width: 114rpx;
          height: 42rpx;
          line-height: 42rpx;
          text-align: center;
          font-size: 24rpx;
          color: #FFFFFF;
          background-color: #cdcdcd; //#FF5C33已发货颜色  #f8e9e8已完成颜色
          border-top-left-radius: 114rpx;
          border-bottom-left-radius: 114rpx;
        }

        .payed {
          background-color: #FF5C33
        }

        .complated {
          background-color: #f8e9e8;
        }

      }
    }
  }

  .nodata {
    text-align: center;
    color: #666;
    font-size: 28rpx;
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
</style>
