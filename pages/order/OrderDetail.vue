<template>
  <div @click="commonClick" class="myall">
    <block v-if="2">
      <div class="checkinfo-box p-15 m-b-10" v-if="orderInfo.Order_IsVirtual == 1 && (orderInfo.Order_Status==2)">
        <div class="check-orderno ">
          <div style="color: #555;font-weight: 300;font-size: 36px;">{{orderInfo.Order_Code}}</div>
          <div class="c9 fz-12">兑换码</div>
        </div>
        <div @click="showQrImg" class="check-qrcode text-right" v-if="qrVal">
          <wzw-qrcode
            :loadMake="loadMake"
            :size="100"
            :usingComponents="true"
            :val="qrVal"
            @result="qrR"
            cid="qrcode2"
            class="line6"
            ref="qrcode2"
            unit="px"
          />
          <div class="c9 fz-12">请出示此二维码核销</div>
        </div>
      </div>
    </block>
    <div class="zhezhao" v-if="password_input">
      <div class="input-wrap">
        <div>请输入余额支付密码</div>
        <input @blur="user_password" class="input" placeholder="请输入密码" type="password">
        <div class="btns">
          <div @click="cancelInput" class="btn">取消</div>
          <div @click="confirmInput" class="btn">确定</div>
        </div>
      </div>
    </div>
    <div class="state  bg-white" v-if="orderInfo.Order_Status == 1">
      <layout-icon type="icontime" size="24"></layout-icon>
      <span class="state-desc">等待买家付款</span>
    </div>
    <view class="address  bg-white m-b-10 order-id">
      <view>订单号：{{orderInfo.Order_ID}}</view>
      <view>下单时间: {{orderInfo.Order_CreateTime | formatTime('YYYY-MM-DD hh:mm:ss',1)}}</view>
    </view>
    <div class="address bg-white m-b-10" v-if="orderInfo.Order_IsVirtual == 0 ">
      <layout-icon class="m-r-15" type="iconicon-address" size="24"></layout-icon>
      <div class="add_msg">
        <div class="name">收货人：{{orderInfo.Address_Name}} <span>{{orderInfo.Address_Mobile}}</span></div>
        <div class="location">
          收货地址：{{orderInfo.Address_Province_name}}{{orderInfo.Address_City_name}}{{orderInfo.Address_Area_name}}
          <block v-if="orderInfo.Address_Town_name">{{orderInfo.Address_Town_name}}</block>
        </div>
      </div>
    </div>
    <div class="order_msg bg-white">
      <div class="biz_msg">
        <image :src="orderInfo.ShopLogo|domain" alt="" class="biz_logo" />
        <span class="biz_name">{{orderInfo.ShopName}}</span>
      </div>
      <div :key="pro_id" class="pro" v-for="(pro,pro_id) in orderInfo.prod_list">
        <image :src="pro.prod_img" alt="" class="pro-img" />
        <div class="pro-msg">
          <div class="pro-name">{{pro.prod_name}}</div>
          <div class="attr" v-if="pro.attr_info"><span>{{pro.attr_info.attr_name}}</span></div>
          <div class="pro-price"><span>￥</span>{{pro.prod_price}} <span class="amount">x<span class="num">{{pro.prod_count}}</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="other  bg-white" v-if="orderInfo.Order_IsVirtual == 0">
      <div class="bd">
        <div class="o_title">
          <span>运费选择</span>
          <span class="c8" style="text-align:right;" v-if="orderInfo.Order_Shipping">
            <span>{{orderInfo.Order_Shipping.Express}}</span>
            <span> {{orderInfo.Order_Shipping.Price > 0 ? (' 运费：' + orderInfo.Order_Shipping.Price) : ' 免运费'}}</span>
          </span>
        </div>
      </div>
    </div>
    <view class="other bg-white" v-if="orderInfo.Order_IsRecieve == 1">
      <view class="bd">
        <view class="o_title">
          <span>卡密</span>
          <span class="c8">{{orderInfo.Order_Virtual_Cards}}</span>
        </view>
      </view>
    </view>
    <view class="other  bg-white" v-if="orderInfo.Order_IsVirtual == 1">
      <view class="bd">
        <view class="o_title">
          <span>购买人姓名</span>
          <span class="c8">{{user_name}}</span>
        </view>
      </view>
    </view>
    <view class="other  bg-white" v-if="orderInfo.Order_IsVirtual == 1">
      <view class="bd">
        <view class="o_title">
          <span>购买人手机号</span>
          <span class="c8">{{user_mobile}}</span>
        </view>
      </view>
    </view>
    <div class="other  bg-white" v-if="orderInfo.Order_Type=='pintuan'||orderInfo.Order_Type=='shop'">
      <div class="bd">
        <div class="o_title">
          <span>优惠券选择</span>
          <span class="c8">{{orderInfo.Coupon_Money}}元优惠券</span>
        </div>
      </div>
    </div>
    <div class="other  bg-white">
      <div class="bd">
        <div class="o_title">
          <span>积分抵扣</span>
          <span class="c8">{{orderInfo.Integral_Money}}</span>
        </div>
      </div>
    </div>
    <block v-if="orderInfo.Order_Status == 1">
      <div class="other  bg-white" v-if="orderInfo.is_use_money && orderInfo.is_use_money == 1">
        <div class="bd">
          <div class="o_title">
            <span>是否使用余额</span>
            <switch :checked="moneyChecked" @change="moneyChange" color="#04B600" size='25px' />
          </div>
          <!-- <div class="o_desc c8">{{orderInfo.Order_Yebc}}</div> -->
          <input :disabled="!openMoney" :placeholder="orderInfo.Order_Yebc" @blur="moneyInputHandle" type="number"
                 v-if="openMoney"
                 v-model="user_money" />
        </div>
      </div>
      <div class="other  bg-white" v-if="initData.invoice_switch == 1">
        <div class="bd">
          <div class="o_title">
            <span>是否开具发票</span>
            <switch :checked="invoiceChecked" @change="invoiceChange" color="#04B600" size='25px' />
          </div>
          <!-- <div class="o_desc c8">{{orderInfo.Order_InvoiceInfo}}</div> -->
          <input :disabled="!openInvoice" :placeholder="orderInfo.Order_InvoiceInfo" :value="invoice_info"
                 @blur="invoiceHandle"
                 type="text"
                 v-if="openInvoice" />
        </div>
      </div>
      <div class="other  bg-white">
        <div class="bd" style="border-bottom: none">
          <div class="o_title  words">
            <span>买家留言</span>
            <input :placeholder="orderInfo.Order_Remark" @blur="remarkHandle" class="inpu msg c8">
          </div>
        </div>
      </div>
    </block>
    <block v-else>
      <div class="other  bg-white" v-if="orderInfo.Order_Yebc > 0">
        <div class="bd">
          <div class="o_title">
            <span>使用余额:</span>
            <span style="color: #888;">{{orderInfo.Order_Yebc}}元</span>
          </div>
        </div>
      </div>
      <div class="other  bg-white" v-if="orderInfo.Order_NeedInvoice == 1">
        <div class="bd">
          <div class="o_title">
            <span>发票信息</span>
            <span>{{orderInfo.Order_InvoiceInfo}}</span>
          </div>
        </div>
      </div>
      <div class="other  bg-white">
        <div class="bd" style="border-bottom: none">
          <div class="o_title  words">
            <span>买家留言</span>
            <span>{{orderInfo.Order_Remark}}</span>
          </div>
        </div>
      </div>
    </block>
    <!-- <div class="total">
      <span>共<span>{{orderInfo.prod_list.length}}</span>件商品</span>
      <span class="mbx">小计：<span class="money moneys">￥</span><span class="money">{{orderInfo.Order_Fyepay}}</span></span>
    </div> -->
    <div style="height:50px;"></div>
    <layout-layer :bottomHeight="50" :direction="'top'" @maskClicked="handClicked" ref="popupMX">
      <view class="mxdetail">
        <view class="mxtitle">明细</view>
        <view class="mxitem">产品
          <text class="num">+{{orderInfo.Order_TotalAmount}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.user_curagio_money > 0">会员折扣
          <text class="num">-{{orderInfo.user_curagio_money}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Manjian_Cash > 0">满减
          <text class="num">-{{orderInfo.Manjian_Cash}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Coupon_Money > 0">优惠券
          <text class="num">-{{orderInfo.Coupon_Money}}</text>
        </view>
        <view class="mxitem" v-if="orderInfo.Integral_Money > 0">积分抵用
          <text class="num">-{{orderInfo.Integral_Money}}</text>
        </view>
        <view class="mxitem" v-if="user_money > 0">余额
          <text class="num">-{{user_money}}</text>
        </view>
        <block v-if="orderInfo.Order_Shipping">
          <view class="mxitem" v-if="orderInfo.Order_Shipping.Price > 0">运费
            <text class="num">+{{orderInfo.Order_Shipping.Price}}</text>
          </view>
        </block>

      </view>
    </layout-layer>
    <div class="order_total">
      <div class="totalinfo" v-if="orderInfo.prod_list">
        <div class="info">共{{orderInfo.prod_list.length}}件商品 总计：<span
          class="mbxa">￥<span>{{orderInfo.Order_TotalPrice}}</span></span></div>
        <view class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</view>
      </div>
      <view @click="seeDetail" class="mx">明细
        <layout-icon class="p-l-4" :type="isSlide?'iconicon-arrow-down':'iconicon-arrow-top'" color="#999" display="inline"></layout-icon>
      </view>
      <div class="btn-group" v-if="orderInfo.Order_Status==0">
        <span @click="cancelOrder(orderInfo.Order_ID)">取消订单</span>
      </div>
      <div class="btn-group" v-if="orderInfo.Order_Status==1">
        <span @click="cancelOrder(orderInfo.Order_ID)">取消订单</span>
        <span @click="submit" class="active">立即付款</span>
      </div>
      <div class="btn-group" v-else-if="orderInfo.Order_Status==2">
        <span class="active" v-if="orderInfo.teamstatus==0">拼团中</span>
        <block v-else>
          <span @click="goPay(orderInfo.Order_ID)" class="active" v-if="orderInfo.Order_Type != 'gift'">申请退款</span>
        </block>
      </div>
      <div class="btn-group" v-else-if="orderInfo.Order_Status==3">
        <span @click="goLogistics(orderInfo)" v-if="orderInfo.Order_Shipping.shipping_id!=2">查看物流</span>
        <!-- <span @click="goPay(orderInfo.Order_ID)" style="margin-left: 14rpx;">申请退款退货</span> -->
        <span @click="confirmOrder(orderInfo.Order_ID)" class="active">确认收货</span>
      </div>
      <div class="btn-group" v-else-if="orderInfo.Order_Status==4 && orderInfo.Is_Commit == 0">
        <span @click="goPay(orderInfo.Order_ID)" class="active">立即评价</span>
      </div>
    </div>

    <layout-layer :direction="'top'" ref="popupLayer">
      <div class="iMbx">
        <div :key="index" @click="chooseType(index)" class="c_method" v-for="(item,index) in pay_arr">
          {{item}}
          <text>￥{{orderInfo.Order_Fyepay}}</text>
        </div>
      </div>
    </layout-layer>

    <wzw-pay
      :Order_ID="Order_ID"
      :invoice_info="invoice_info"
      :isOpen="isOpen"
      :need_invoice="need_invoice"
      :order_remark="order_remark"
      :payErrorCall="payFailCall"
      :paySuccessCall="paySuccessCall"
      :pay_money="pay_money"
      :use_money="user_money"
      ref="payLayer"
    >
    </wzw-pay>
  </div>
</template>

<script>

import wzwQrcode from '@/componets/wzw-qrcode/wzw-qrcode'
import { cancelOrder, confirmOrder, getOrderDetail } from '@/api/order'
import BaseMixin from '@/mixins/BaseMixin'
import { GetQueryByString, isWeiXin } from '@/common/helper'
import Storage from '@/common/Storage'
import { modal, toast } from '@/common/fun'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import WzwPay from '@/componets/wzw-pay/wzw-pay'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    WzwPay,
    LayoutLayer,
    wzwQrcode
  },
  data () {
    return {
      lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
      loadMake: true, // 组件加载完成后自动生成二维码
      qrsrc: '',
      code: '',
      qrVal: '',
      JSSDK_INIT: false,
      show: false, // 遮罩层
      wl_show: false, // 物流选择
      postData: {},
      orderInfo: {},
      addressInfo: '',
      Order_ID: 0,
      totalMoney: 0, // 应支付金额
      pay_money: 0, // 开启余额支付，表示余额支付的钱，pay_type 为 balance , 先提交一次order_pay,此时pay_money变成剩余应该支付的钱 .不开启余额支付，是应该支付的钱
      pay_type: 'balance', // balance余额支付，余额补差    wechat 微信支付  ali 支付宝支付
      user_pay_password: '', // 余额补差，支付密码
      cate: 'method',
      password_input: false,
      openMoney: true, // 是否开启了余额功能
      openInvoice: true, // 是否开启了发票
      order_remark: '', // 留言
      need_invoice: 0, // 是否需要发票
      showDirect: false, // 是否直接显示付款方式
      pay_arr: [], // 支付方式
      isOpen: false, // 是否自动弹出
      user_money: 0,
      user_name: '',
      user_mobile: '',
      isSlide: false,
      invoice_info: ''
    }
  },
  onLoad (options) {
    if (options.Order_ID) {
      this.Order_ID = options.Order_ID
    }
    if (options.pagefrom === 'check') {
      this.showDirect = true
    }
    if (options.pagefrom === 'order') {
      // 来自订单列表页
      this.pageFromOrder = true
    }
    // 获取支付方式
    this.pay_arr = Storage.get('initData').pay_arr
  },
  onShow () {
    this.getOrderDetail()
    // this.get_user_info();// 获取用于可用余额
  },
  computed: {
    invoiceChecked () {
      return this.openInvoice
    },
    moneyChecked () {
      return this.openMoney
    },
    initData () {
      return this.$store.getters['system/initData']
    }
  },
  created () {
    // #ifdef MP-TOUTIAO
    this.$store.commit('SET_PAY_TEMP_OBJ', this)
    // #endif

    // #ifdef H5

    if (isWeiXin()) {
      this.code = GetQueryByString(location.href, 'code')
      if (this.code) {
        // Storage.set('code',this.code)
        this.wechatPay()
      }
    }
    // #endif
  },
  methods: {
    showQrImg () {
      uni.previewImage({
        urls: [this.qrsrc]
      })
    },
    qrR (res) {
      this.qrsrc = res
    },
    // 查看明细
    seeDetail () {
      if (!this.isSlide) {
        this.$refs.popupMX.show()
      } else {
        this.$refs.popupMX.close()
      }
      this.isSlide = !this.isSlide
    },
    handClicked () {
      this.isSlide = false
    },
    // 物流追踪
    goLogistics (orderInfo) {
      const {
        shipping_id,
        express,
        prod_img
      } = {
        shipping_id: orderInfo.Order_ShippingID,
        express: orderInfo.Order_Shipping.Express,
        prod_img: orderInfo.prod_list[0].prod_img
      }
      // 跳转物流追踪
      uni.navigateTo({
        url: '/pages/order/logistics?shipping_id=' + shipping_id + '&express=' + express + '&prod_img=' + prod_img + '&order_id=' + orderInfo.Order_ID
      })
    },
    // 取消订单
    cancelOrder (Order_ID) {
      if (Order_ID) {
        cancelOrder({ Order_ID }).then(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateBack({
              delta: 1
            })
          }, 1000)
        }).catch(e => {
          this.isLoading = false
        })
      }
    },
    // 确认收货
    confirmOrder (Order_ID) {
      confirmOrder({ Order_ID: Order_ID }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 1000)
      }).catch(e => {
      })
    },
    // 跳转申请退款  发表评论
    goPay (Order_ID) {
      if (this.orderInfo.Order_Status === 2 || this.orderInfo.Order_Status === 3) {
        uni.navigateTo({
          url: '/pagesA/person/refund?Order_ID=' + Order_ID
        })
      } else if (this.orderInfo.Order_Status === 4) {
        uni.navigateTo({
          url: '/pages/order/publishComment?Order_ID=' + Order_ID
        })
      }
    },
    // 获取用户支付方式
    chooseType (name) {
      this.pay_type = name
      this.$refs.popupLayer.close()
      // 判断是否使用了余额，
      if (this.user_money > 0 || name === 'remainder_pay') {
        // 使用了 余额支付
        this.password_input = true
      } else {
        // 未使用余额支付, 直接调用
        this.self_orderPay()
      }
    },
    // 订单详情
    async getOrderDetail () {
      const _self = this
      getOrderDetail({
        Order_ID: this.Order_ID
      }).then(res => {
        const orderInfo = res.data

        this.orderInfo = res.data

        // pay_money 应该支付的钱
        // user_money 使用的余额
        this.pay_money = this.orderInfo.Order_Fyepay
        this.user_money = this.orderInfo.Order_Yebc
        this.openMoney = this.orderInfo.Order_Yebc > 0
        this.need_invoice = this.orderInfo.Order_NeedInvoice
        this.openInvoice = this.orderInfo.Order_NeedInvoice > 0
        this.invoice_info = this.orderInfo.Order_InvoiceInfo
        this.order_remark = this.orderInfo.Order_Remark
        this.user_name = this.orderInfo.Address_Name
        this.user_mobile = this.orderInfo.Address_Mobile

        if (orderInfo.Order_IsVirtual) {
          this.qrVal = `IsVirtualOrderCheck##Order_Code::${orderInfo.Order_Code}`
        }

        if (this.showDirect && this.orderInfo.Order_Fyepay > 0) {
          // 需要支付的金额大于0 ，直接弹出支付方式，简化支付流程
          _self.$nextTick().then(() => {
            // _self.$refs.popupLayer.show();
          })
        }
      }).catch(err => {
        modal(err.message)
        this.$back()
      })
    },
    // 用户重新更改了余额
    moneyInputHandle (e) {
      // #ifdef H5
      // #endif
      var money = e.detail.value
      this.user_money = Number(money).toFixed(2)
      if (this.user_money < 0 || isNaN(this.user_money)) {
        uni.showToast({
          title: '您输入的金额有误',
          icon: 'none'
        })
        this.user_money = 0
        this.submit_flag = false
        return
      }
      if (this.orderInfo.Order_TotalPrice - money < 0) {
        uni.showToast({
          title: '最大金额不能超过订单金额',
          icon: 'none'
        })
        this.user_money = this.orderInfo.Order_TotalPrice
        // this.orderInfo.Order_TotalPrice = money;
        this.orderInfo.Order_Fyepay = 0.00
        return
      }
      this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2)
      this.pay_money = Number(this.orderInfo.Order_TotalPrice - money).toFixed(2)
    },
    // 余额支付开关
    moneyChange (e) {
      var checked = e.detail.value
      if (checked) {
        this.openMoney = true
        this.user_money = Number(this.orderInfo.Order_Yebc).toFixed(2)
        this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice - this.user_money).toFixed(2)
        this.pay_money = Number(this.orderInfo.Order_TotalPrice - this.user_money).toFixed(2)
      } else {
        this.openMoney = false
        this.orderInfo.Order_Fyepay = Number(this.orderInfo.Order_TotalPrice).toFixed(2)
        this.pay_money = Number(this.orderInfo.Order_TotalPrice).toFixed(2)
        this.user_money = 0
      }
    },
    // 留言
    remarkHandle (e) {
      // #ifdef H5
      // #endif
      const remark = e.detail.value
      this.order_remark = remark
    },
    // 发票信息修改
    invoiceHandle (e) {
      // #ifdef H5
      // #endif
      const invoice = e.detail.value
      this.invoice_info = invoice
      if (this.openInvoice) {
        this.invoice_info = invoice
      }
    },
    // 发票开关
    invoiceChange (e) {
      var checked = e.detail.value
      if (checked) {
        this.need_invoice = 1
        this.openInvoice = true
        this.invoice_info = this.orderInfo.Order_InvoiceInfo
      } else {
        this.openInvoice = false
        this.need_invoice = 0
      }
    },
    // 点击遮罩
    showOverlay () {
      this.show = false
      this.wl_show = false
    },
    // 去支付
    submit () {
      this.$refs.payLayer.show()
    },

    payFailCall () {
      uni.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 2000
      })
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

      if (res && res.code && res.code === 9) {
        uni.showModal({
          title: '提示',
          content: '是否完成支付',
          cancelText: '未完成',
          confirmText: '已支付',
          success: function (res) {
            if (res.confirm) {
              uni.redirectTo({
                url: '/pages/order/order?index=2'
              })
            } else if (res.cancel) {

            }
          }
        })
        return
      }

      // 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取

      if (res && res.code && res.code === 4) {
        toast('用户取消支付', 'none')
        return
      }

      uni.redirectTo({
        url: '/pages/order/OrderList?index=2'
      })
    },
    // 取消输入支付密码
    cancelInput () {
      this.password_input = false
    },
    // 用户输入密码完毕
    user_password (e) {
      this.user_pay_password = e.detail.value
    },
    // 确定输入支付密码
    confirmInput (e) {
      this.self_orderPay()
      this.password_input = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
    min-height: 100vh;
    background-color: #f8f8f8;
  }

  .mxdetail {
    width: 750rpx;
    box-sizing: border-box;
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
      &:last-child{
        border-bottom: none;
      }
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
    border-bottom: 2rpx solid #eee;
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
    z-index: 102;
    justify-content: space-around;
    border-top: 1px solid #eee;

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
      border: 1px solid #eee;
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
      border-bottom: 2rpx solid #eee;
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
        border: 1px solid #eee;
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
