<template>
  <div class="page-wrap">
    <div class="navs">
      <div class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">全部</div>
      <div class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">
        待付款
        <div class="jiaobiao">1</div>
      </div>
      <div class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">
        待发货
        <div class="jiaobiao">2</div>
      </div>
      <div class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">
        待收货
        <div class="jiaobiao">3</div>
      </div>
      <div class="nav-item" :class="index==4?'active':''" @click="changIndex(4)">
        待评价
        <div class="jiaobiao">4</div>
      </div>
    </div>

    <div class="order" @click="goDetail">
      <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
      <div style="height: 20rpx;"></div>
      <div class="bizinfo">
        <img class="img" src="static/copyright.png" alt="" />
        <span class="bizname">网中网公司</span>
        <span class="status">待付款</span>
      </div>
      <div class="pro">
        <div class="pro-div">
          <img class="pro-img" src="static/comment.png" />
        </div>
        <div class="pro-msg">
          <div class="pro-name">测试产品</div>
          <div class="attr"><span>属性</span></div>
          <div class="pro-price fz-12"><span>￥</span>100 <span class="amount">x5</span></div>
        </div>
      </div>
      <div class="text-right total">共1件商品 实付：<span class="price"><span>￥</span> 100 (含运费10元)</span></div>
      <div class="btn-group">
        <span>取消订单</span>
        <span class="active">立即付款</span>
      </div>
    </div>
<!--    <div class="order" v-for="(item,index) of data" :key="index" @click="goDetail(item)">-->
<!--      <template v-if="item.prod_list.length>0">-->
<!--        <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>-->
<!--        <div style="height: 20rpx;"></div>-->
<!--        <div class="bizinfo">-->
<!--          <img class="img" :src="item.ShopLogo|domain" alt="">-->
<!--          <span class="bizname">{{item.ShopName}}</span>-->
<!--          <span class="status">{{item.Order_Status_desc}}</span>-->
<!--        </div>-->
<!--        <block v-for="(i,k) of item.prod_list" :key="k">-->
<!--          <div class="pro">-->
<!--            <div class="pro-div">-->
<!--              <img class="pro-img" :src="i.prod_img">-->
<!--            </div>-->
<!--            <div class="pro-msg">-->
<!--              <div class="pro-name">{{i.prod_name}}</div>-->
<!--              <div class="attr" v-if="i.attr_info"><span>{{i.attr_info.attr_name}}</span></div>-->
<!--              <div class="attr" v-else style="background-color: #FFFFFF;"><span></span></div>-->
<!--              <div class="pro-price"><span>￥</span>{{i.prod_price}} <span class="amount">x{{i.prod_count}}</span></div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </block>-->
<!--        <div class="text-right total">共{{item.prod_list.length}}件商品 实付：<span class="price"><span>￥</span> {{item.Order_TotalPrice}} <block-->
<!--          v-if="item.Order_Shipping.Price>0">(含运费{{item.Order_Shipping.Price}}元)</block></span></div>-->
<!--        <div class="btn-group" v-if="item.Order_Status==-1">-->
<!--          <span @click.stop="delOrder(item.prod_list,index)">删除订单</span>-->
<!--        </div>-->
<!--        <div class="btn-group" v-if="item.Order_Status==0">-->
<!--          <span @click.stop="cancelOrder(item.prod_list,index)">取消订单</span>-->
<!--        </div>-->
<!--        <div class="btn-group" v-if="item.Order_Status==1">-->
<!--          <span @click.stop="cancelOrder(item.prod_list,index)">取消订单</span>-->
<!--          <span class="active" @click.stop="goPay(item)">立即付款</span>-->
<!--        </div>-->
<!--        <div class="btn-group" v-else-if="item.Order_Status==2&&item.Order_Type != 'gift'">-->
<!--          <span class="active" @click.stop="goPay(item)">申请退款</span>-->
<!--        </div>-->
<!--        <div class="btn-group" v-else-if="item.Order_Status==3">-->
<!--          <div v-if="item.allow_extend_receipt" @click.stop="openExtendReceiptFn(item)" class="extend_receipt">-->
<!--            <div class="funicon icon-more1 icon font22 " style="color: #777;"></div>-->
<!--            <div @click.stop="extendReceiptFn(item)" v-if="item.extend" class="tooltip">确认延迟</div>-->
<!--          </div>-->
<!--          <span @click.stop="goLogistics(item)" v-if="item.Order_Shipping.shipping_id!=2">查看物流</span>-->
<!--          <span @click.stop="goPay(item)" style="margin-left: 15rpx;"-->
<!--                v-if="item.Order_Shipping.shipping_id!=2">申请退款退货</span>-->
<!--          <span class="active" @click.stop="confirmOrder(item,index)">确认收货</span>-->
<!--        </div>-->
<!--        <div class="btn-group" v-else-if="item.Order_Status==4 && item.Is_Commit == 0 && item.Is_Backup == 0">-->
<!--          <span class="active" @click.stop="goPay(item)">立即评价</span>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-if="item.prod_list.length>0">-->
<!--        <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>-->
<!--      </template>-->
<!--    </div>-->
    <div class="defaults">
      <image :src="'/static/client/empty.png'|domain"></image>
    </div>
  </div>

</template>
<script>

export default {
  data () {
    return {
      index: 0
    }
  },
  methods: {
    changIndex (num) {
      this.index = num
    },
    goDetail (id) {
      this.$linkTo('/pages/order/OrderDetail')
    }
  }
}
</script>
<style scoped lang="scss">
  .extend_receipt {
    flex: 1;
    display: inline-block;
    text-align: left;
    font-size: 14px;
    color: #999;
    margin-right: 10px;
    /*position:relative;*/
    z-index: 3;

    .tooltip {
      position: absolute;
      background: #fff;
      bottom: 0px;
      transform: translateY(56px);
      padding: 0px 20px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      /*border: 1px solid #e7e7e7;*/
      box-shadow: rgba(0, 0, 0, .1) 0px 0px 2px 2px;
      border-radius: 5px;
      color: #444;
      font-size: 15px;

      &::after {

        content: " ";
        position: absolute;
        bottom: 100%; /* 提示工具头部 */
        left: 10px;
        margin-left: -5px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
        /*box-shadow: rgba(0,0,0,.1) 0px 0px 2px 2px ;*/
      }
    }
  }

  .page-wrap {
    background-color: #ffffff !important;
    min-height: 100vh;
    padding-bottom: 50px;
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
    // top: var(--status-bar-height);
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

  .order {
    padding: 0rpx 20rpx;
    background: #fff;
    position: relative;

    .bizinfo {
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .img {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        margin-right: 21rpx;
      }

      .bizname {
        flex: 1;
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


    .amount {
      font-size: 30rpx;
      float: right;
      color: #333;
    }

    .total {
      font-size: 24rpx;
      padding: 40rpx 0rpx;
      margin-right: 15rpx;

      .price {
        color: red;
        font-size: 30rpx;

        span {
          font-size: 24rpx;
        }
      }
    }

    .btn-group {
      display: flex;
      /*text-align: right;*/
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 30rpx;

      span {
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
    margin-top: 100rpx;
  }

  .refuseApplyDialog {
    width: 560rpx;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;

    .reason {
      font-size: 14px;
      min-height: 200px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      height: auto;
      width: auto;
      padding: 10px;
    }

    .inputs {
      font-size: 14px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      padding: 10px;
      height: auto;
      width: auto;
      margin-bottom: 10px;
    }

    .reasons {
      min-height: 20px;
    }

  }

  .control {
    width: 100%;
    margin-top: 15px;
    display: flex;
    border-top: 1px solid #e4e4e4;

    .action-btn {
      flex: 1;
      font-size: 16px;
      height: 40px;
      color: #999;
      line-height: 40px;
      text-align: center;
    }

  }

  .my-huo {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #333333;
    font-weight: 800;
    width: 100%;
    text-align: center;
  }

  .my-content {
    font-size: 14px;
    width: 100%;
    text-align: center;
    color: #a1a1a1;
  }

  .page-wrap /deep/ .popup-content {
    padding: 0px;
  }
</style>
