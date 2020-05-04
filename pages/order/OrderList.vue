<template>
  <div class="page-wrap">
    <div class="navs">
      <div class="nav-item" :class="index==0?'active':''" @click="changIndex(0)">全部</div>
      <div class="nav-item" :class="index==1?'active':''" @click="changIndex(1)">
        待付款
        <div class="jiaobiao" v-if="orderNum.waitpay">{{orderNum.waitpay}}</div>
      </div>
      <div class="nav-item" :class="index==2?'active':''" @click="changIndex(2)">
        待发货
        <div class="jiaobiao" v-if="orderNum.waitsend">{{orderNum.waitsend}}</div>
      </div>
      <div class="nav-item" :class="index==3?'active':''" @click="changIndex(3)">
        待收货
        <div class="jiaobiao" v-if="orderNum.waitconfirm">{{orderNum.waitconfirm}}</div>
      </div>
      <div class="nav-item" :class="index==4?'active':''" @click="changIndex(4)">
        待评价
        <div class="jiaobiao" v-if="orderNum.waitcomment">{{orderNum.waitcomment}}</div>
      </div>
    </div>
    <block v-if="orderList.length>0">
      <div class="order" v-for="(order,index) of orderList" :key="index">
        <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
        <div style="height: 20rpx;"></div>
        <div class="bizinfo">
          <img class="img" :src="order.ShopLogo" alt=""/>
          <span class="bizname">{{order.ShopName}}</span>
          <span class="status">{{order.Order_Status_desc}}</span>
        </div>
        <div class="pro" v-for="(pro,ind) of order.prod_list" :key="ind">
          <div class="pro-div">
            <img class="pro-img" :src="pro.prod_img"/>
          </div>
          <div class="pro-msg">
            <div class="pro-name">{{pro.prod_name}}</div>
            <div class="attr" v-if="pro.attr_info.attr_name"><span>{{pro.attr_info.attr_name}}</span></div>
            <div class="attrs" v-else></div>
            <div class="pro-price fz-12"><span>￥</span>{{pro.prod_price}} <span
              class="amount">x{{pro.prod_count}}</span></div>
          </div>
        </div>
        <div class="text-right total">共{{order.prod_list.length}}件商品 实付：<span class="price"><span>￥</span> {{order.Order_TotalPrice}} <block
          v-if="item.Order_Shipping.Price>0">(含运费{{item.Order_Shipping.Price}}元)</block></span></div>
        <div class="btn-group" v-if="order.Order_Status==-1">
          <span @click.stop="delOrder(order.prod_list,index)">删除订单</span>
        </div>
        <div class="btn-group" v-if="order.Order_Status==0">
          <span @click.stop="cancelOrder(order.prod_list,index)">取消订单</span>
        </div>
        <div class="btn-group" v-if="order.Order_Status==1">
          <span @click.stop="cancelOrder(order.prod_list,index)">取消订单</span>
          <span class="active" @click.stop="goPay(order)">立即付款</span>
        </div>
        <div class="btn-group" v-else-if="order.Order_Status==2&&order.Order_Type != 'gift'">
          <span class="active" @click.stop="goPay(order)">申请退款</span>
        </div>
        <div class="btn-group" v-else-if="order.Order_Status==3">
          <div v-if="order.allow_extend_receipt" @click.stop="openExtendReceiptFn(order)" class="extend_receipt">
            <div class="funicon icon-more1 icon font22 " style="color: #777;"></div>
            <div @click.stop="extendReceiptFn(order)" v-if="item.extend" class="tooltip">确认延迟</div>
          </div>
          <span @click.stop="goLogistics(order)" v-if="order.Order_Shipping.shipping_id!=2">查看物流</span>
          <span @click.stop="goPay(order)" style="margin-left: 15rpx;"
                v-if="order.Order_Shipping.shipping_id!=2">申请退款退货</span>
          <span class="active" @click.stop="confirmOrder(order,index)">确认收货</span>
          <!-- @click="goPay(item)"跳转退款 -->
        </div>
        <div class="btn-group" v-else-if="order.Order_Status==4 && order.Is_Commit == 0 && order.Is_Backup == 0">
          <span class="active" @click.stop="goPay(order)">立即评价</span>
        </div>
      </div>
    </block>


    <div class="defaults" v-else>
      <image :src="'/static/client/empty.png'|domain"></image>
    </div>
  </div>

</template>
<script>
import { getOrderList, cancelOrder, getOrderNum,delOrder } from '@/api/order'
import BaseMixin from '@/mixins/BaseMixin'
import { error, toast } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      index: 0,
      type: '',
      page: 1,
      pageSize: 5,
      totalCount: 0,
      orderList: [],
      orderNum: {},
    }
  },
  methods: {
    //跳转申请退款 支付   发表评论
    goPay(item){
      if(item.Order_Status==1){
        uni.navigateTo({
          url:"/pages/order/OrderPay?Order_ID="+item.Order_ID
        })
      }else if(item.Order_Status==2||item.Order_Status==3){
        uni.navigateTo({
          url:'/pagesA/order/Refund?Order_ID='+item.Order_ID
        })
      }else if(item.Order_Status==4){
        uni.navigateTo({
          url:'/pagesA/order/PublishComment?Order_ID='+item.Order_ID
        })
      }

    },
    //取消订单
    cancelOrder (item, index) {
      if (this.isLoading) return
      this.isLoading = true
      let Order_ID
      for (let i in item) {
        if (item[i].Order_ID) {
          Order_ID = item[i].Order_ID
        }
      }
      if (Order_ID) {
        cancelOrder({ Order_ID }).then(res => {
          this.isLoading = false
          // 取消订单，仅改变了订单的状态
          this.orderList[index].Order_Status = -1
          this.getOrderNum()
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
        }).catch(e => {
          this.isLoading = false
        })
      }
    },
    delOrder(item,index){
      if(this.isLoading)return
      this.isLoading=true;
      let Order_ID;
      for(let i in item){
        if(item[i].Order_ID){
          Order_ID=item[i].Order_ID;
        }
      }
      if(Order_ID){
        delOrder({Order_ID}).then(res=>{
          this.isLoading=false;
          this.orderList.splice(index,1);
          this.getOrderNum();
          uni.showToast({
            title:res.msg,
            icon:"none"
          })
        }).catch(e=>{
          this.isLoading=false;
        })
      }
    },
    //获取订单角标数
    getOrderNum () {
      getOrderNum({ Order_Type: this.Order_Type }).then(res => {
        this.orderNum = res.data
      }).catch(e => {
      })
    },
    changIndex (num) {
      this.index = num
      this.page = 1
      this.orderList = []
      this.getOrder()
    },
    async getOrder (item) {
      let data = {
        page: this.page,
        pageSize: this.pageSize,
        Order_Type: this.type,
      }
      if (this.index > 0) {
        data.Order_Status = this.index
      }
      let orderLsit = await getOrderList(data).catch(e => {
        error(e.msg || '获取订单列表失败')
      })
      orderLsit.data.map(item => {
        item.Order_Shipping = JSON.parse(item.Order_Shipping)
      })

      this.totalCount = orderLsit.totalCount
      if (item == 'init') {
        this.orderList = orderLsit.data
      } else {
        orderLsit.data.map(item => {
          this.orderList.push(item)
        })
      }
    },
    goDetail (id) {
      this.$linkTo('/pages/order/OrderDetail')
    },
  },
  onShow () {
    this.page = 1
    this.getOrder('init')
    this.getOrderNum()
  },
  onLoad (options) {
    this.type = options.type
    this.index = options.index
  },
  onReachBottom () {
    if (this.orderList.length < this.totalCount) {
      this.page++
      this.getOrder()
    }
  },
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

    .attrs {
      display: inline-block;
      height: 50rpx;
      line-height: 50rpx;
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
