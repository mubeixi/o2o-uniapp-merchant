<template>
  <div class="myall" @click="commonClick">

    <div class="order" v-for="(item,index) of data" :key="index">
      <template v-if="item.prod_list.length>0">
        <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
        <div style="height: 20rpx;"></div>
        <div class="bizinfo">
          <span class="bizname">订单编号:</span>
          <span class="status">{{item.Back_Sn}}</span>
        </div>
        <block v-for="(i,k) of item.prod_list" :key="k">
          <div class="pro" @click="goDetail(item)">
            <div class="pro-div">
              <img class="pro-img" :src="i.prod_img">
            </div>
            <div class="pro-msg">
              <div class="pro-name">{{i.prod_name}}</div>
              <div class="attr" v-if="i.attr_info"><span>{{i.attr_info.attr_name}}</span></div>
              <div class="attr" v-else style="background-color: #FFFFFF;"><span></span></div>
              <div class="pro-price"><span>￥</span>{{i.prod_price}} <span class="amount">x{{i.prod_count}}</span></div>
            </div>
          </div>
        </block>
        <div class="text-right fz-14 m-b-10 c9">
          共<span class="c5">{{item.prod_list.length}}</span>件商品,
          <span>退回余额:<span class="fz-16 danger-color"><span class="span fz-12">￥</span>{{item.refund_money_fee}} </span>,</span>
          <span>原路退回:<span class="fz-16 danger-color"><span
            class="span fz-12">￥</span>{{item.refund_pay_fee}} </span></span>
        </div>
        <div class="btn-group">
          <span class="span" style="border: 0rpx;color: red;">{{item.Back_Status_desc}}</span>
          <span class="span" v-if="item.Back_Status==0" @click="cancelRefund(item,index)">取消退款</span>
          <span class="span" v-else-if="item.Back_Status==1" @click="goDetail(item)">买家发货</span>
        </div>
      </template>
    </div>
    <div class="defaults" v-if="data.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
  </div>

</template>

<script>

import { cancelRefund, getBackOrder } from '@/api/order'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      index: 0,
      data: [],
      pageSize: 5,
      page: 1,
      totalCount: 0,
      isLoading: false,
    }
  },
  onShow () {
    this.data = []
    this.page = 1
    this.getBackOrder()
  },
  onLoad (option) {
    this.index = option.index
  },
  onReachBottom () {
    if (this.data.length < this.totalCount) {
      this.page++
      this.getBackOrder()
    }
  },
  methods: {
    //取消退款
    cancelRefund (item, index) {
      if (this.isLoading) return
      this.isLoading = true
      cancelRefund({ Back_ID: item.Back_ID }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
        this.data.splice(index, 1)
      }).catch(e => {
      })
      this.isLoading = false
    },
    getBackOrder () {
      getBackOrder().then(res => {
        this.data = res.data
        this.totalCount = res.totalCount
      }).catch(e => {
      })
    },
    goDetail (item) {
      let url = '/pagesA/order/RefundDetail?Back_ID=' + item.Back_ID
      this.$linkTo(url)

    },
    //跳转申请退款 支付   发表评论
    goPay (item) {
      if (item.Order_Status === 1) {
        uni.navigateTo({
          url: '/pages/pay/pay?Order_ID=' + item.Order_ID,
        })
      } else if (item.Order_Status === 2 || item.Order_Status === 3) {
        uni.navigateTo({
          url: '/pagesA/person/refund?Order_ID=' + item.Order_ID,
        })
      } else if (item.Order_Status === 4) {
        uni.navigateTo({
          url: '/pages/order/publishComment?Order_ID=' + item.Order_ID,
        })
      }

    },

  },
}
</script>

<style scoped lang="scss">
  .myall {
    min-height: 100vh;
    background-color: #FFFFFF !important;
  }

  .titless {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    z-index: 999;
  }

  .navs {
    z-index: 999;
    position: fixed;
    top: 0rpx;
    /* #ifdef APP-PLUS */
    top: var(--status-bar-height); //86rpx;
    /* #endif */

    left: 0rpx;
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100rpx;
    line-height: 100rpx;
    background: #fff;
    font-size: 28rpx;
    padding: 0 10px;

    .nav-item {
      flex: 1;
      box-sizing: border-box;
      text-align: center;
      position: relative;

      .jiaobiao {
        position: absolute;
        top: 24rpx;
        right: 20rpx;
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background-color: #FFFFFF;
        border: 1px solid #F43131;
        font-size: 15rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #F43131;
      }
    }

    .nav-item.active {
      color: red;
      border-bottom: 2px solid red;
    }
  }

  .space {
    /* #ifdef APP-PLUS */
    margin-top: var(--status-bar-height);
    /* #endif */

  }

  .order {
    padding: 0rpx 20rpx;
    background: #fff;
    position: relative;

    .bizinfo {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      width: 100%;
      // img {
      //     width: 70rpx;
      //     height: 70rpx;
      //     border-radius: 50%;
      //     margin-right: 21rpx;
      // }
      .bizname {
        // flex: 1;
        font-size: 28rpx;
      }

      .status {
        color: red;
        font-size: 26rpx;
      }
    }

    .pro {
      display: flex;
      margin-bottom: 50rpx;
      margin-top: 30rpx;
    }

    .pro-msg {
      margin-left: 27rpx;
      width: 476rpx;
    }

    .pro-div {
      width: 200rpx;
      height: 200rpx;
    }

    .pro-img {
      width: 100%;
      height: 100%;
    }

    .pro-name {
      font-size: 26rpx;
      margin-bottom: 20rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .attr {
      display: inline-block;
      height: 50rpx;
      line-height: 50rpx;
      background: #FFF5F5;
      color: #666;
      font-size: 24rpx;
      padding: 0 20rpx;
      margin-bottom: 20rpx;
    }

    .pro-price {
      color: #F43131;
      font-size: 36rpx;
    }

    .pro-price span {
      font-size: 24rpx;
      font-style: normal;
    }

    .amount {
      font-size: 30rpx;
      float: right;
      color: #333;
    }

    .total {
      font-size: 24rpx;
      margin: 40rpx 0rpx;
      margin-right: 15rpx;

      .price {
        color: red;
        font-size: 30rpx;

        .p-span {
          font-size: 24rpx;
        }
      }
    }

    .btn-group {
      text-align: right;
      padding-bottom: 30rpx;

      .span {
        display: inline-block;
        //width: 150rpx;
        padding: 0rpx 24rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        border: 1px solid #999;
        border-radius: 10rpx;
        color: #999;
        font-size: 26rpx;

        &:last-child {
          margin-left: 14rpx;
        }

        &.active {
          color: #fff;
          background: #F43131;
          border: none;
        }
      }
    }
  }

  .text-right {
    text-align: right;
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    padding-top: 100rpx;
  }

  .danger-color {
    color: #f43131;
  }
</style>
