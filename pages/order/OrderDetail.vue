<template>
  <div class="myall"  @click="commonClick">
    <view class="address bgwhite line10 order-id">
      <view>订单号：123456</view>
      <view>下单时间: 2020-1-4 20:30:30</view>
    </view>
    <div class="address bgwhite line10">
      <image class="loc_icon" :src="'/static/client/location.png'|domain" alt="" />
      <div class="add_msg">
        <div class="name">收货人：李嘉诚 <span>1313131</span></div>
        <div class="location">收货地址：河南郑州管城区1号</div>
      </div>
    </div>
    <div class="order_msg bgwhite">
      <div class="biz_msg">
        <image :src="'/static/client/copyright.png'|domain" class="biz_logo" alt="" />
        <span class="biz_name">网中网</span>
      </div>
      <div class="pro">
        <image class="pro-img" :src="'/static/client/comment.png'|domain" alt="" />
        <div class="pro-msg">
          <div class="pro-name">产品名称</div>
          <div class="attr"><span>产品属性</span></div>
          <div class="pro-price"><span>￥</span>20 <span class="amount">x<span class="num">5</span></span></div>
        </div>
      </div>
    </div>
    <div style="height:50px;"></div>
    <div class="order_total">
      <div class="totalinfo">
        <div class="info">共2件商品 总计：<span class="mbxa">￥<span>30</span></span></div>
        <view class="tips">描述的东西</view>
      </div>
      <div class="btn-group">
        <span @click="cancelOrder(orderInfo.Order_ID)">取消订单</span>
        <span class="active" @click="submit">立即付款</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {

  },
  methods: {},
}
</script>

<style scoped lang="scss">
  .checkinfo-box {
    display: flex;
    align-items: center;
    background: white;

    .check-orderno {
      flex: 1;
    }

    .icon-qroce {
      width: 40px;
      height: 40px;
    }
  }

  .myall {
    /*background-color: #f8f8f8;*/
  }

  .mxdetail {
    font-size: 28rpx;
    line-height: 80rpx;
    padding: 20rpx 30rpx;
    padding-bottom: 100rpx;

    .mxtitle {
      font-size: 28rpx;
      text-align: center;
    }

    .mxitem {
      border-bottom: 1px solid #eaeaea;

      .num {
        float: right;
      }
    }
  }

  .state {
    padding: 20rpx 28rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    border-top: 30rpx solid #F3F3F3;

    .img {
      width: 60rpx;
      height: 60rpx;
    }
  }

  .state-desc {
    margin-left: 24rpx;
  }

  .c8 {
    color: #888;
    font-size: 26rpx;
  }

  /* 收货地址 start */
  .address {
    /* margin: 15px 0 10px; */
    display: flex;
    align-items: center;
    padding: 40rpx 38rpx 40rpx 28rpx;
    /*border-top: 30rpx solid #F3F3F3;*/
    font-size: 28rpx;
  }

  // 订单号
  .order-id {
    border-bottom: none;
    justify-content: space-between;
  }

  .loc_icon {
    width: 41rpx;
    height: 51rpx;
    margin-right: 30rpx;
  }

  .right {
    width: 18rpx;
    height: 27rpx;
    margin-left: 28rpx;
  }

  .name {
    margin-bottom: 30rpx;
    font-size: 26rpx;
  }

  .name > span {
    margin-left: 10rpx;
  }

  .location {
    font-size: 24rpx;
    color: #444;
  }

  /* 收货地址 end */
  /* 订单信息 start */
  .order_msg {
    padding: 20rpx 30rpx 0px;
  }

  .biz_msg {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
  }

  .biz_logo {
    width: 70rpx;
    height: 70rpx;
    border-radius: 35rpx;
    margin-right: 20rpx;
  }

  .biz_name {
    font-size: 28rpx;
  }

  .pro {
    display: flex;
    margin-bottom: 50rpx;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .pro-msg {
    margin-left: 27rpx;
    width: 451rpx;
  }

  .pro-div {
    width: 200rpx;
    height: 200rpx;
  }

  .pro-img {
    width: 200rpx;
    height: 200rpx;
    margin-right: 28rpx;
  }

  .pro-name {
    font-size: 26rpx;
    margin-bottom: 20rpx;
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

  /* 订单信息 end */
  /* 订单其他信息 start */
  .other {
    padding: 34rpx 45rpx 0rpx 31rpx;
    font-size: 28rpx;
  }

  .other .bd {
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid $fun-border-color;
  }

  .o_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
  }

  .o_title .van-switch {
    float: right;
  }

  .o_desc {
    margin-top: 10rpx;
    font-size: 24rpx;
  }

  .msg {
    margin-left: 20rpx;
    font-size: 24rpx;
  }

  .words {
    justify-content: flex-start;
  }

  .words {
    .inpu {
      border: 0;
      margin-left: 20rpx;
      flex: 1;
    }
  }

  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40rpx 0;
    font-size: 24rpx;
    padding-right: 44rpx;
  }

  i {
    font-style: normal;
  }

  .total .money {
    font-size: 30rpx;
    color: #F43131;
  }

  /* 订单其他信息 end */
  /* 提交订单 */
  .order_total {
    min-height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    z-index: 9999999;
    justify-content: space-around;

    .mx {
      font-size: 22rpx;
      margin-right: 10rpx;

      .image {
        width: 20rpx;
        height: 20rpx;
        margin-left: 10rpx;
      }

      .slidedown {
        transform: rotate(180deg);
      }
    }
  }

  .submit {
    width: 230rpx;
    background: #F43131;
    text-align: center;
    color: #fff;
    line-height: 50px;
  }

  .totalinfo {
    // flex: 1;
    text-align: center;
    width: 260rpx;
  }

  .btn-group {
    //flex: 1;
    span {
      display: inline-block;
      //width: 150rpx;
      padding: 0rpx 24rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border: 1px solid $fun-border-color;
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

  .info {
    font-size: 24rpx;
  }

  .tips {
    font-size: 20rpx;
    color: #979797;
  }

  .iMbx {
    text-align: center;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #333;

    .c_method {
      padding: 37rpx 0;
      border-bottom: 2rpx solid $fun-border-color;
    }

    & .c_method:first-child {
      color: #F43131;
    }

    & .c_method:nth-last-child(1) {
      border: none;
    }
  }

  .zhezhao {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 1000;

    .input-wrap {
      background: #fff;
      color: #000;
      text-align: center;
      width: 90%;
      margin: 400rpx auto;
      padding: 40rpx 50rpx 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx;

      .input {
        margin: 40rpx 0;
        border: 1px solid $fun-border-color;
        height: 80rpx;
        line-height: 80rpx;
      }

      .btns {
        display: flex;
        justify-content: space-around;
        height: 60rpx;
        line-height: 60rpx;

        .btn {
          flex: 1;
        }
      }
    }
  }
</style>
