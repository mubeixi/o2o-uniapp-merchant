<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div style="height: 100rpx;width: 750rpx"></div>
    <div class="navs">
      <div :class="index==0?'active':''" @click="changIndex(0)" class="nav-item">全部</div>
      <div :class="index==1?'active':''" @click="changIndex(1)" class="nav-item">
        待付款
        <div class="jiaobiao" v-if="orderNum.waitpay">{{orderNum.waitpay}}</div>
      </div>
      <div :class="index==2?'active':''" @click="changIndex(2)" class="nav-item">
        待发货
        <div class="jiaobiao" v-if="orderNum.waitsend">{{orderNum.waitsend}}</div>
      </div>
      <div :class="index==3?'active':''" @click="changIndex(3)" class="nav-item">
        待收货
        <div class="jiaobiao" v-if="orderNum.waitconfirm">{{orderNum.waitconfirm}}</div>
      </div>
      <div :class="index==4?'active':''" @click="changIndex(4)" class="nav-item">
        待评价
        <div class="jiaobiao" v-if="orderNum.waitcomment">{{orderNum.waitcomment}}</div>
      </div>
    </div>
    <block v-if="orderList.length>0">
      <div :key="index" @click="goDetail(order)" class="order" v-for="(order,index) of orderList">
        <div style="background-color: #F3F3F3;height: 20rpx;width: 100%;position: absolute;left: 0rpx;"></div>
        <div style="height: 20rpx;"></div>
        <div class="bizinfo">
          <img :src="order.ShopLogo" alt="" class="img" />
          <span class="bizname">{{order.ShopName}}</span>
          <span class="status">{{order.Order_Status_desc}}</span>
        </div>
        <div :key="ind" class="pro" v-for="(pro,ind) of order.prod_list">
          <div class="pro-div">
            <img :src="pro.prod_img" class="pro-img" />
          </div>
          <div class="pro-msg flex flex-column">
            <div class="flex1">
              <div class="pro-msg-row fz-14 c3 flex flex-justify-between">
                <div style="width: 380rpx;word-break: break-all;"><span class="order-type-tag">{{order.Order_Type_text}}</span>{{pro.prod_name}}</div>
                <div>￥{{pro.prod_price}}</div>
              </div>
              <div class="pro-msg-row fz-12 c9 flex flex-justify-between">
                <div>{{pro.attr_info.attr_name||''}}</div>
                <div>x{{pro.prod_count}}</div>
              </div>
            </div>
            <div class="pro-price fz-12" style="margin-top: 10px">
              <span v-if="pro.is_back_num>0" class="m-l-10 fz-14">
                (申请退{{pro.is_back_num}}件)
              </span>
              <div class="btn-group" style="margin-bottom: 0;">
                <span @click.stop="goPay(order,pro)" class="btn-group-item" v-if="order.Order_Status==2&&order.Order_Type !== 'gift'">退款</span>
                <span @click.stop="goPay(order,pro)" class="btn-group-item" v-else-if="order.Order_Status==3&&order.Order_Shipping.shipping_id!==2">退货退款</span>
              </div>
              
              <div class="fz-14 c7"
                   v-if="(Number(pro.prod_count)-Number(pro.is_back_num))*Number(pro.single_free_money)>0">
                免单金额({{(Number(pro.prod_count)-Number(pro.is_back_num))*Number(pro.single_free_money)}}元)
              </div>
            </div>
          </div>
        </div>
        <div v-if="order.city_express_appoint_time>0" class="text-right fz-14 c9 p-t-15">预约配送:<span class="c4 p-l-3">预计{{order.city_express_appoint_time_desc}}</span></div>
        <div v-if="order.Order_Shipping&&order.Order_Shipping.shipping_id=='is_self_get'" class="text-right fz-14 c9 p-t-15">自提地点:<span class="c4 p-l-3">{{order.biz_address}}</span></div>
        <div class="total flex flex-justify-between">
          <view @click.stop="goPintuan(order)" class="ptdesc" v-if="order.Order_Type ==='pintuan' && order.teamstatus_desc">
            <span>{{order.teamstatus_desc}}</span>
            <layout-icon color="#fff" display="inline" size="13" type="iconicon-arrow-right m-l-4"></layout-icon>
          </view>
          <div class="text-right flex1">
            共{{order.order_total_prod_count}}件商品 实付：<span class="price"><span>￥</span> {{order.Order_TotalPrice}} <block
            v-if="item.Order_Shipping.Price>0">(含运费{{item.Order_Shipping.Price}}元)</block></span>
          </div>
        </div>
        <div class="btn-group" v-if="order.Order_Status==-1">
          <span class="btn-group-item" @click.stop="delOrder(order.prod_list,index)">删除订单</span>
        </div>
        <div class="btn-group" v-if="order.Order_Status==0">
          <span class="btn-group-item" @click.stop="cancelOrder(order.prod_list,index)">取消订单</span>
        </div>
        <div class="btn-group" v-if="order.Order_Status==1">
          <span class="btn-group-item" @click.stop="cancelOrder(order.prod_list,index)">取消订单</span>
          <span class="btn-group-item active" @click.stop="goPay(order)">立即付款</span>
        </div>
        <!--订单中只有一个商品的时候，可以不显示退款-->
        <div class="btn-group" v-else-if="order.prod_list.length>1 && order.Order_Status==2&&order.Order_Type !== 'gift'">
          <span class="btn-group-item active" @click.stop="goPay(order)">申请退款</span>
        </div>
        <div class="btn-group" v-else-if="order.Order_Status==3">
          <div @click.stop="openExtendReceiptFn(order)" class="extend_receipt" v-if="order.allow_extend_receipt">
            <div class="funicon icon-more1 icon font22 " style="color: #777;"></div>
            <div @click.stop="extendReceiptFn(order)" class="tooltip" v-if="item.extend">确认延迟</div>
          </div>
          <span class="btn-group-item" @click.stop="goLogistics(order)" v-if="order.Order_Shipping.shipping_id!=2">查看物流</span>
          <span class="btn-group-item" @click.stop="goLogisticsByLocal(order)" v-if="order.Order_Shipping.shipping_id==2">配送进度</span>
          <span class="btn-group-item" @click.stop="goPay(order)" style="margin-left: 15rpx;" v-if="order.Order_Shipping.shipping_id!==2">退款退货</span>
          <span class="btn-group-item active" @click.stop="confirmOrder(order,index)">确认收货</span>
          <!-- @click="goPay(item)"跳转退款 -->
        </div>
        <div class="btn-group" v-else-if="order.Order_Status==4 && order.Is_Commit === 0 && order.Is_Backup === 0">
          <span @click.stop="goPay(order)" class="btn-group-item active">立即评价</span>
        </div>
      </div>
    </block>
    
    <div class="defaults" v-else>
      <image :src="'/static/client/empty.png'|domain"></image>
    </div>
    
    <layout-modal ref="sureReason">
      <div class="refuseApplyDialog">
        <div style="width: 110px;height: 110px;margin: 0 auto;">
          <image :src="prod_img" style="width: 100%;height: 100%;"></image>
        </div>
        <div class="my-huo">
          确认收到货了吗?
        </div>
        <div class="my-content">
          为保障您的售后权益,请收到货确认无误后,再确认收货哦!
        </div>
      </div>
      <div class="control">
        <div @click="cancelReason" class="action-btn" style="border-right: 1px solid #e4e4e4; box-sizing: border-box;">
          取消
        </div>
        <div @click="sureReason" class="action-btn" style="color: #F43131;">确定</div>
      </div>
    </layout-modal>
    <div class="h50" style="background: #f8f8f8;"></div>
  </div>

</template>
<script>
import { cancelOrder, confirmOrder, delOrder, getOrderList, getOrderNum } from '@/api/order'
import BaseMixin from '@/mixins/BaseMixin'
import { error } from '@/common/fun'
import LayoutModal from '@/components/layout-modal/layout-modal'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import LayoutIcon from '@/components/layout-icon/layout-icon'

export default {
  components: {
    LayoutIcon,
    WzwImTip,
    LayoutModal
  },
  mixins: [BaseMixin],
  data () {
    return {
      index: 0,
      type: '',
      prod_img: '',
      page: 1,
      pageSize: 5,
      totalCount: 0,
      orderList: [],
      orderNum: {}
    }
  },
  methods: {
    goLogisticsByLocal (item) {
      // 处理物流名称
      let express = {}
      if (typeof item.Order_Shipping === 'object') {
        express = item.Order_Shipping.Express
      } else {
        express = JSON.parse(item.Order_Shipping).Express
      }
      console.log(express)
      uni.navigateTo({
        url: '/pagesA/order/logisticsByLocation?order_id=' + item.Order_ID
      })
    },
    goLogistics (item) {
      // 处理物流名称
      let express = {}
      if (typeof item.Order_Shipping === 'object') {
        express = item.Order_Shipping.Express
      } else {
        express = JSON.parse(item.Order_Shipping).Express
      }
      console.log(item)
      // 跳转物流追踪
      uni.navigateTo({
        url: '/pagesA/order/logistics?shipping_id=' + item.Order_ShippingID + '&express=' + express + '&prod_img=' + item.prod_list[0].prod_img + '&order_id=' + item.Order_ID
      })
    },
    sureReason () {
      const data = {
        Order_ID: this.Order_ID
      }
      const that = this
      confirmOrder(data).then(res => {
        this.orderList.splice(this.orderIndex, 1)
        this.$refs.sureReason.close()
        that.getOrderNum()
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
      }).catch(e => {
        this.$refs.sureReason.close()
      })
    },
    cancelReason () {
      this.$refs.sureReason.close()
    },
    // 确认收货
    confirmOrder (item, index) {
      this.orderIndex = index
      this.prod_img = item.prod_list[0].prod_img
      this.Order_ID = item.Order_ID
      this.$refs.sureReason.show()
    },
    goPintuan (item) {
      if (item.teamstatus === 0) {
        uni.navigateTo({
          url: '/pagesA/order/GroupSuccess?Team_ID=' + item.teamid + '&Products_ID=' + item.prod_list[0].prod_id + '&OrderId=' + item.Order_ID
        })
      }
    },
    // 跳转申请退款 支付   发表评论
    goPay (item, pro) {
      if (item.Order_Status === 1) {
        uni.navigateTo({
          url: '/pages/order/OrderPay?Order_ID=' + item.Order_ID
        })
      } else if (item.Order_Status === 2 || item.Order_Status === 3) {
        let url = '/pagesA/order/Refund?Order_ID=' + item.Order_ID
        if (pro) {
          url += '&prod_id=' + pro.prod_id + '&attr_id=' + pro.attr_id
        }
        uni.navigateTo({
          url
        })
      } else if (item.Order_Status === 4) {
        uni.navigateTo({
          url: '/pagesA/order/PublishComment?Order_ID=' + item.Order_ID
        })
      }
    },
    // 取消订单
    cancelOrder (item, index) {
      if (this.isLoading) return
      this.isLoading = true
      let Order_ID
      for (const i in item) {
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
            icon: 'none'
          })
        }).catch(e => {
          this.isLoading = false
        })
      }
    },
    delOrder (item, index) {
      if (this.isLoading) return
      this.isLoading = true
      let Order_ID
      for (const i in item) {
        if (item[i].Order_ID) {
          Order_ID = item[i].Order_ID
        }
      }
      if (Order_ID) {
        delOrder({ Order_ID }).then(res => {
          this.isLoading = false
          this.orderList.splice(index, 1)
          this.getOrderNum()
          uni.showToast({
            title: res.msg,
            icon: 'none'
          })
        }).catch(e => {
          this.isLoading = false
        })
      }
    },
    // 获取订单角标数
    getOrderNum () {
      getOrderNum({ Order_Type: this.type }).then(res => {
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
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        // Order_Type: this.type
      }
      if (this.index > 0) {
        data.Order_Status = this.index
      }
      if (Number(this.index) === 4) {
        data.Is_Commit = 0
      }
      const orderLsit = await getOrderList(data).catch(e => {
        error(e.msg || '获取订单列表失败')
      })
      orderLsit.data.map(item => {
        item.Order_Shipping = JSON.parse(item.Order_Shipping)
      })
      
      this.totalCount = orderLsit.totalCount
      if (item === 'init') {
        this.orderList = orderLsit.data
      } else {
        orderLsit.data.map(item => {
          this.orderList.push(item)
        })
      }
    },
    goDetail (item) {
      this.$linkTo('/pages/order/OrderDetail?Order_ID=' + item.Order_ID + '&pagefrom=order')
    }
  },
  onShow () {
    this.page = 1
    this.getOrder('init')
    this.getOrderNum()
  },
  onLoad (options) {
    // 默认普通订单
    const { type = 'shop', index } = options
    this.type = type
    this.index = index
    let pageTitle = '订单列表'
    // switch (type) {
    //   case 'spike':
    //     pageTitle = '限时抢购订单'
    //     break
    //   case 'waimai':
    //     pageTitle = '外卖订单'
    //     break
    //   case 'flashsale':
    //     pageTitle = '秒杀订单'
    //     break
    //   case 'pintuan':
    //     pageTitle = '拼团订单'
    //     break
    // }
    uni.setNavigationBarTitle({
      title: pageTitle
    })
  },
  onReachBottom () {
    if (this.orderList.length < this.totalCount) {
      this.page++
      this.getOrder()
    }
  }
}
</script>
<style lang="scss" scoped>
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
      margin-bottom: 0rpx;
      margin-top: 30rpx;
    }
    
    .pro-msg {
      margin-left: 24rpx;
      width: 520rpx;
    }
    
    .pro-div {
      width: 166rpx;
      height: 166rpx;
    }
    
    .pro-img {
      width: 100%;
      height: 100%;
    }
    
    .order-type-tag{
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      padding: 0px 4px;
      border-radius: 2px;
      background: $fun-red-color;
      color: #fff;
      margin-right: 4px;
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
      
      .ptdesc {
        background: #F43131;
        padding: 10rpx;
        color: #fff;
        border-top-right-radius: 20rpx;
        border-bottom-right-radius: 20rpx;
        padding-left: 20rpx;
        padding-right: 20rpx;
      }
      
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
      
      .btn-group-item {
        display: inline-block;
        padding: 0px 10px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #eee;
        border-radius: 14px;
        color: #777;
        font-size: 13px;
        
        &:last-child {
          margin-left: 14rpx;
        }
        
        &.active {
          /*color: #fff;*/
          /*background: #F43131;*/
          /*border: none;*/
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
