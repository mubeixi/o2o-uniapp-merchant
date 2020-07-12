<template>
  <div :class="selectStore?'over':''" @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <fun-err-msg :errs.sync="formCheckResult" ref="refMsg"></fun-err-msg>
    <block v-if="orderInfo.is_virtual===0">
      <div @click="goAddressList" class="address bg-white">

        <layout-icon class="loc_icon" color="#F53636" size="24" type="iconicon-address"></layout-icon>
        <div class="add_msg" v-if="addressinfo.Address_Name">
          <div class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span>
          </div>
          <div class="location">
            收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}{{addressinfo.Address_Detailed}}
          </div>
        </div>
        <div class="add_msg" v-else>
          <div>暂无收货地址，去添加</div>
        </div>
        <layout-icon class="right" type="iconicon-arrow-right"></layout-icon>
      </div>

      <div class="remind-wrap" v-if="!addressinfo.Address_Name">
        <div class="remind-add">
          <div class="text-align-center mb20">新建收货地址</div>
          <div class="remind_desc">
            您还没有收货地址，请先添加一个新的收货地址
          </div>
          <div class="remind_btns text-align-center">
            <div @click="$back" class="text-align-center fl1">返回</div>
            <div @click="goEditAdd" class="text-align-center fl1 confirm">
              新建
            </div>
          </div>
        </div>
      </div>

    </block>

    <div class="container p-t-15" v-if="orderInfo.is_virtual === 1">
      <div class="section-box bg-white" style="margin-bottom: 0">
        <div class="other">
          <div class="bd">
            <div class="o_title p-10  words">
              <span>购买人姓名</span>
              <input class="inputs" placeholder="请填写姓名" type="text" v-model="user_name">
            </div>
          </div>
        </div>
        <div class="other">
          <div class="bd">
            <div class="o_title p-10  words">
              <span>购买人手机号</span>
              <input class="inputs" placeholder="请填写手机号码" type="text" v-model="user_mobile">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="CartListReady && bizListReady">

      <!--这行代码特别关键 bind click="activeBizId=biz_id"-->
      <div :key="biz_id" @click="setActiveBizId(biz_id)" class="section-box store-item" v-for="(bizData,biz_id) in CartList">
        <div class="biz-info  bg-white">
          <div style="display: flex;align-items: center;">
            <image :src="bizList[biz_id].biz_logo" class="biz_logo" />
            <span class="biz_name">{{bizList[biz_id].biz_shop_name}}</span>
          </div>
        </div>
        <div class="biz-goods-list bg-white">
          <block :key="pro_id" v-for="(pro,pro_id) in bizData">
            <div class="pro-box" :key="attr_id" v-for="(attr,attr_id) in pro">
              <div class="pro">
                <img :src="attr.ImgPath" alt="" class="pro-img">
                <div class="pro-msg">
                  <div class="pro-name">{{attr.ProductsName}}</div>
                  <div class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></div>
                  <div class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span>
                  </div>
                </div>
              </div>
              <div class="goods-hr"></div>
            </div>
          </block>
        </div>
        <div class="bd bg-f8" style="border-bottom: none;width: 680rpx;margin: 0 40rpx;box-sizing: border-box;" v-if="bizList[biz_id].is_virtual === 0 && bizList[biz_id].shipping_company" >
          <div class="o_title">
            <span class="fz-16 c3">配送</span>
            <span class="flex flex-vertical-c fz-13" style="text-align:right; color: #888;">

                      <!--只有允许商家发货情况下，才显示-->
                      <block v-if="bizList[biz_id].bizSendByMerchat">
                        <div @click="changeShpping(biz_id)" class="flex flex-vertical-c ">
                          <div class="unchecked m-r-8" v-if="postData.shipping_id[biz_id]=='is_self_get'"></div>
                          <div class="checked m-r-8" v-else><div class="checked-radio"></div></div>
                        <span>商家发货</span>
                      </div>
                      </block>

                      <div @click="changeIsSelft(biz_id)" class="flex flex-vertical-c m-l-20 " v-if="bizList[biz_id].shipping_company.is_self_get">
                          <div class="checked m-r-8" v-if="postData.shipping_id[biz_id]=='is_self_get'">
                            <div class="checked-radio"></div>
                          </div>
                          <div class="unchecked m-r-8" v-else>
                          </div>
                          <span>到店自提</span>
                      </div>

              </span>
          </div>
        </div>
        <div class="express-box">
          <div class="bd" v-if="bizList[biz_id].is_virtual === 0&&postData.shipping_id[biz_id]!='is_self_get'">
            <div class="o_title">
              <span class="">配送方式</span>
              <div class="flex flex-vertical-c" style="text-align:right; color: #888;">
                <div :key="shipid" v-for="(ship,shipid) in bizList[biz_id].shipping_company">
                  <!--要允许显示同城配送-->
                  <block v-if="shipid!='is_self_get' && (ship!='同城配送' || bizList[biz_id].shippingStatus.isSameCity)">
                    <div  @click="ShipRadioChange(shipid,biz_id)" class="row flex flex-justify-between flex-vertical-b m-l-15" >
                      <div class="checked m-r-8" v-if="shipid==postData.shipping_id[biz_id]">
                        <div class="checked-radio"></div>
                      </div>
                      <div class="unchecked m-r-8" v-else></div>
                      <span class="flex1">{{ship}}</span>
                    </div>
                  </block>

                </div>
              </div>
            </div>
          </div>
          <div class="bd" v-if="bizList[biz_id].is_virtual === 0&&postData.shipping_id[biz_id]!='is_self_get'">
            <div class="o_title">
              <span>配送价格</span>
              <div class="flex flex-vertical-c" style="text-align:right; color: #888;">
                <block v-if="bizList[biz_id]['Order_Shipping']['Price']==0">
                    免运费
                </block>
                <block v-else>
                  ￥{{bizList[biz_id]['Order_Shipping']['Price']}}
                </block>
              </div>
            </div>
          </div>
          <div class="bd" v-if="bizList[biz_id].is_virtual === 0&&postData.shipping_id[biz_id]!='is_self_get' && postData.shipping_name[biz_id]==='同城配送'">
            <div class="o_title">
              <span>配送时间</span>
              <div class="flex flex-vertical-c" style="text-align:right; color: #888;">
                <radio-group @change="citySendTypeChange($event,biz_id)" v-if="bizList[biz_id].shippingStatus.isNow || bizList[biz_id].shippingStatus.isAppoint">
                  <div class="flex flex-vertical-c">
                    <label class="row flex flex-justify-between flex-vertical-b m-l-15" v-if="bizList[biz_id].shippingStatus.isNow">
                      <radio style="transform: scale(0.8)" :checked="'now'===postData.appoint_time_type[biz_id]" value="now" class="radio" color="#F43131" />
                      <span class="flex1">立即送出</span>
                    </label>
                    <!--需要开关打开才可以-->
                    <label class="row flex flex-justify-between flex-vertical-b m-l-15" v-if="bizList[biz_id].shippingStatus.isAppoint">
                      <radio style="transform: scale(0.8)" :checked="'appoint'===postData.appoint_time_type[biz_id]" value="appoint" class="radio" color="#F43131" />
                      <span class="flex1">预约送达</span>
                    </label>
                  </div>
                </radio-group>
                <span v-else>
                  当前商家打烊或不支持预约配送
                </span>

              </div>
            </div>
          </div>
          <div class="bd" v-if="bizList[biz_id].is_virtual === 0&&postData.shipping_id[biz_id]!='is_self_get' && postData.shipping_name[biz_id]==='同城配送' && postData.appoint_time_type[biz_id]==='appoint' && bizList[biz_id].shippingStatus.isAppoint">
            <div class="o_title">
              <span>预约送达时间</span>
              <div class="flex flex-vertical-c" style="text-align:right; color: #888;" @click="citySendTypeOpen(biz_id)">
                <block v-if="postData.appoint_time[biz_id]">
                  {{toDay}} <sapn class="m-l-6">{{postData.appoint_time[biz_id]}}</sapn>
                </block>
                <block v-else>
                  请设置时间
                </block>
              </div>
            </div>
          </div>
        </div>

        <div class="other bg-white">
          <div class="bd" v-if="bizList[biz_id].coupon_list.length > 0">
            <div @click="changeCoupon(biz_id)" class="o_title">
              <span>优惠券选择</span>
              <span style="text-align: right; color: #888;display: flex;align-items: center;">
              <span>{{bizList[biz_id].coupon_list.length>0?(postData.coupon_desc[biz_id]?postData.coupon_desc[biz_id]:'您有优惠券使用'): '暂无可用优惠券'}}</span>
              <layout-icon class="right" color="#999" type="iconicon-arrow-right"></layout-icon>
            </span>
            </div>
          </div>

          <div @click="focusInvoice(biz_id)" class="bd" v-if="bizList[biz_id].invoice_switch === 1">
            <div class="o_title">
              <span>是否开具发票</span>
              <switch :checked="postData.need_invoice[biz_id]" @change="faPiaoChange($event,biz_id)"
                      color="#04B600" style="transform: scale(0.8)" />
            </div>
            <input @blur="faPiaoConfirm($event,biz_id)" class="o_desc" placeholder="点此输入发票抬头和纳税人识别号"
                   type="text" v-if="postData.need_invoice[biz_id]" v-model="postData.invoice_info[biz_id]" />
          </div>

          <div class="bd">
            <div class="o_title">
              <span>是否参与积分抵扣</span>
              <switch :checked="postData.intergralChecked[biz_id]" @change="intergralSwitchChange($event,biz_id)"
                      color="#04B600" style="transform: scale(0.8)" />
            </div>
            <div class="o_de" v-if="postData.intergralChecked[biz_id]">您当前共有
              <text>{{userInfo.User_Integral}}</text>
              积分，每
              <text>{{bizList[biz_id].Integral_Buy}}</text>
              积分可以抵扣
              <text>1</text>
              元，本次可使用
              <text>{{bizList[biz_id].max_diyong_intergral}}</text>
              积分,总共可抵
              <text>{{bizList[biz_id].max_Integral_Money}}</text>
              元
            </div>
          </div>

          <div class="bd" v-if="bizList[biz_id].is_use_money === 1">
            <div class="o_title">
              <span>是否使用余额</span>
              <switch :checked="postData.use_money_conf[biz_id]" @change="userMoneyChange($event,biz_id)" color="#04B600" style="transform: scale(0.8)" />
            </div>
            <block v-if="cash_from === 1">
              <div class="o_de">
                <span>您当前最多使用余额:</span>
                <span class="price-selling">{{userInfo.User_Money>bizList[biz_id].Order_TotalPrice ? bizList[biz_id].Order_TotalPrice : userInfo.User_Money}}</span>
              </div>
              <input @blur="confirm_user_money($event,biz_id)" class="o_desc" placeholder="点此输入金额" type="digit" v-if="postData.use_money_conf[biz_id]" v-model="postData.use_money[biz_id]" />
            </block>
            <block v-if="cash_from === 2">
              <div class="o_de">
                <span>您当前最多使用余额:</span>
                <span class="price-selling">{{bizList[biz_id].biz_user_money>bizList[biz_id].Order_TotalPrice ? bizList[biz_id].Order_TotalPrice : bizList[biz_id].biz_user_money}}</span>
              </div>
              <input @blur="confirm_user_money_bybiz($event,biz_id)" class="o_desc" placeholder="点此输入金额" type="digit" v-if="postData.use_money_conf[biz_id]" v-model="postData.use_money[biz_id]" />
            </block>

          </div>

          <div class="bd" >
            <div class="o_title  words">
              <span>买家留言</span>
              <input @input="remarkConfirm($event,biz_id)" class="inputs" placeholder="点此填写留言内容" type="text">
            </div>
          </div>

          <div class="text-right fz-14" style="padding: 20rpx 20rpx 50rpx">
            共{{bizList[biz_id].prod_count}}件商品，小计<span class="price-selling">￥{{bizList[biz_id].Order_TotalPrice}}</span>
          </div>

          <div class="expired-box" style="padding-bottom: 30rpx" v-if="bizList[biz_id].expired_cart_prod_count>0">
            <div class="expired-hr" style="border-top: 1px dashed #e7e7e7;padding: 0rpx 0 40rpx 0"></div>
            <div class="expired-total c3 fz-18">
              共失效<span class="price-selling">{{bizList[biz_id].expired_cart_prod_count}}</span>件商品
            </div>
            <div class="expired-goods-list bg-white">
              <block :key="pro_id" v-for="(pro,pro_id) in bizList[biz_id].expired_cart_prod">
                <div :key="attr_id" v-for="(attr,attr_id) in pro">
                  <div class="pro">
                    <img :src="attr.ImgPath" alt="" class="pro-img">
                    <div class="pro-msg">
                      <div class="pro-name" style="color: #777;">{{attr.ProductsName}}</div>
                      <div class="flex flex-vertical-c flex-justify-between" style="margin: 26rpx 0">
                        <div class="attr"  style="background-color: #f5f5f5;color: #777;"><span style="background-color: #f5f5f5;color: #777;" v-if="attr.Productsattrstrval">{{attr.Productsattrstrval}}</span></div>
                        <div class="pro-price flex flex-vertical-b fz-18" style="color: #888"><span class="fz-10">￥</span >{{attr.ProductsPriceX}}</div>
                      </div>
                      <div class="expired-reason fz-12" style="color: #f53333">失效原因:配送方式不统一，需分开单独结算</div>
                    </div>
                  </div>
                  <div class="goods-hr"></div>
                </div>
              </block>

            </div>
          </div>

        </div>
      </div>

      <div class="section-box bg-white" v-if="tmplFromList.length>0">
        <diy-form :forms="tmplFromList" @update="upOrderTmplData" eid="material" ref="material"></diy-form>
      </div>

    </div>

    <div :style="{'z-index':zIndex}" class="order_total">
      <div class="totalinfo">
        <div class="info">共{{prodCount}}件商品 合计：
          <text class="money">
            <text class="m_icon">￥</text>
            {{Order_Fyepay|formatMoeny}}
          </text>
        </div>
        <div class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</div>
      </div>
      <div @click="seeDetail" class="mx">明细
        <layout-icon :type="isSlide?'iconicon-arrow-down':'iconicon-arrow-top'" class="p-l-4" color="#999"
                     display="inline"></layout-icon>
      </div>
      <button @click="submitFn" class="submit">提交订单</button>
    </div>

    <div class="space-box"></div>
    <div class="safearea-box fixed"></div>

    <layout-layer @maskClicked="handClicked" bottomStr="50px" ref="popupMX" title="明细">
      <div class="mxdetail">
        <!--有问题要搞-->
        <div class="mxitem">产品
          <text class="num">{{allGoodsPrice|formatMoeny}}</text>
        </div>
<!--        <div class="mxitem" v-if="checkfrom">{{active_name}}-->
<!--          <text class="num">{{Order_Fyepay|formatMoeny}}</text>-->
<!--        </div>-->
        <view class="mxitem" v-if="allUserCuragioMoney > 0">会员折扣
          <text class="num">-{{allUserCuragioMoney|formatMoeny}}</text>
        </view>
        <view class="mxitem" v-if="allManjianCash > 0">满减
          <text class="num">-{{allManjianCash|formatMoeny}}</text>
        </view>
        <view class="mxitem" v-if="allCouponMoney > 0">优惠券
          <text class="num">-{{allCouponMoney|formatMoeny}}</text>
        </view>
        <view class="mxitem" v-if="allIntegralMoney > 0">积分抵用
          <text class="num">-{{allIntegralMoney|formatMoeny}}</text>
        </view>
        <div class="mxitem" v-if="useMoneyCount > 0">余额
          <text class="num">-{{useMoneyCount|formatMoeny}}</text>
        </div>
        <div class="mxitem" v-if="allOrderShipping > 0">运费
          <text class="num">+{{allOrderShipping|formatMoeny}}</text>
        </div>
      </div>
    </layout-layer>
    <layout-layer ref="citySendTime" @maskClicked="cancelCurrentBizSendTime">
      <div slot="title" class="p-10 text-center" style="position: relative" @click="setCurrentBizSendTime">
        预约时间
        <div class="time-popup-confirmbtn" style="position: absolute;right: 15px;top: 50%;transform: translateY(-50%)">确认</div>
      </div>
      <div style="width: 750rpx;height: 375rpx;">
        <picker-view style="height: 375rpx;" indicator-style="height:40px" :value="citySendTimePicker" @change="bindCitySendTimeChange">
          <picker-view-column>
            <view style="line-height:40px;text-align:center;" class="item" v-for="(item,index) in appointTimeTypes" :key="index">{{item.time_str}}</view>
          </picker-view-column>
        </picker-view>
      </div>
    </layout-layer>
<!--    <layout-layer ref="freightPop" title="选择快递">-->
<!--      <div class="freight-popup-wrap popup-wrap">-->
<!--        <radio-group @change="ShipRadioChange">-->
<!--          <block :key="shipid" v-for="(ship,shipid) in popupExpressCompanys">-->
<!--            <label class="row flex flex-justify-between flex-vertical-b p-10"-->
<!--                   v-if="shipid!='is_self_get'">-->
<!--              <span class="flex1">{{ship}}</span>-->
<!--              <radio :checked="shipid==postData.shipping_id[activeBizId]" :value="shipid" class="radio"-->
<!--                     color="#F43131" />-->
<!--            </label>-->
<!--          </block>-->
<!--        </radio-group>-->
<!--        <div @click="$closePop('freightPop')" class="submit-btn">确定</div>-->
<!--      </div>-->
<!--    </layout-layer>-->
    <layout-layer ref="couponPop">
      <div class="coupon-popup-wrap popup-wrap">
        <radio-group @change="CouponRadioChange">
          <label :key="i" class="row flex flex-justify-between flex-vertical-b p-10" v-for="(coupon,i) in popupCoupons">
            <span class="flex1">满{{coupon.Coupon_Condition}} - {{coupon.Coupon_Cash > 0 ? coupon.Coupon_Cash : coupon.Coupon_Discount}}</span>
            <radio :checked="i==postData.coupon_current[activeBizId]" :value="i" class="radio" color="#F43131" />
          </label>
          <label class="row flex flex-justify-between flex-vertical-b p-10">
            <span class="flex1">不使用优惠</span>
            <radio :checked="'nouse'==postData.coupon_current[activeBizId]" class="radio" color="#F43131"
                   value="nouse" />
          </label>
        </radio-group>
        <div @click="$closePop('couponPop')" class="submit-btn">确定</div>
      </div>
    </layout-layer>
    <!--    <store-list-components style="z-index: 10000;" :pageEl="selfObj" direction="top" ref="stroeComp" @callFn="bindStores" @change="selectStore=false" catchtouchmove />-->
  </div>
</template>

<script>

import BaseMixin from '@/mixins/BaseMixin'
import { createOrder, createOrderCheck, getBizOrderTemplateList } from '@/api/order'
import { getAddressList } from '@/api/customer'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import { confirm, error, hideLoading, modal, showLoading } from '@/common/fun'
import Storage from '@/common/Storage'
import { findArrayIdx, getObjectAttrNum, objTranslate } from '@/common/helper'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import FunErrMsg from '@/componets/fun-err-msg/fun-err-msg'
import { Exception } from '@/common/Exception'
import DiyForm from '@/componets/diy-form/diy-form'
import { mapGetters } from 'vuex'
import { computeArrayColumnSum } from '@/pages/order/pay'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    DiyForm,
    FunErrMsg,
    LayoutIcon,
    LayoutLayer
  },
  data () {
    return {
      cash_from: 1, // 使用余额模式
      allowUseMoney: 0,
      toDay: '', // 当前年月日
      delivery_biz_id: '', // 外卖的时候才有
      gift: false,
      bid: null,
      tmplFromList: [], // 订单模板
      order_temp_id: null,
      formCheckResult: [],
      selfObj: null,
      selectStore: false,
      tabIdx: 0,

      addressinfo: {}, // 收货地址信息

      activeBizId: null, // 活跃的商户id,很多操作之前都需要先改变这个
      CartList: {},
      bizList: {},
      CartListReady: false,
      bizListReady: false,

      orderInfo: {
        is_use_money: 0,
        prod_count: 0,
        Order_Fyepay: 0
      },
      type: 'shipping',
      cart_buy: '',
      current: '',
      couponlist: [], // 优惠券列表,
      coupon_current: null, // coupon_id: '', // 优惠券id  coupon_desc: '', // 优惠券选择描述
      use_integral: 0, // 用于抵扣的积分数
      use_money: 0, // 余额支付金额
      intergralChecked: false,
      userMoneyChecked: false,
      faPiaoChecked: {},
      ship_current: 0,
      deliveryCartList: [], // 外卖的数据接口
      order_temp_data: [], // 特殊传，下单模版产品必传，指定下单模版的产品的必填数据，json
      modelUserMoney: '', // 双向绑定用的
      citySendTimePicker: [],
      appointTimeTypes: [],
      postData: {
        cart_key: '',
        cart_buy: '',
        address_id: '',
        shipping_name: {}, // 对应名称,不过不需要提交到后台
        appoint_time_type: {},
        appoint_time: {}, // ，同城配送时有效，同城配送的预约时间，0|不填=立即配送
        shipping_id: {},
        coupon_id: {},
        coupon_current: {},
        coupon_desc: {}, // 优惠券描述
        intergralChecked: {}, // 积分抵扣
        use_integral: {}, // 用于抵扣的积分数
        use_money: {}, // 余额支付金额
        use_money_conf: {}, // 用来控制配置的，不提交
        need_invoice: {},
        invoice_info: {}, // 发票抬头
        order_remark: {} // 买家留言
      },
      Order_ID: 0,
      addressLoading: false, // 收货地址信息是否加载完
      orderLoading: false, // 订单信息是否加载完
      userLoading: false, // 个人信息是否加载完
      submited: false, // 是否已经提交过，防止重复提交
      back_address_id: 0,
      user_name: '',
      user_mobile: '',
      isSlide: false, // 查看明细是否已经弹出
      bottomHeight: 0, // 弹出层从哪里开始弹出，默认是0，明细从提交按钮上部50px
      zIndex: 3,
      setStoreMode: '',
      idD: '',
      checkfrom: '', // 支付订单的来源页面，用于展示明细活动价，spike,秒杀，limit限时抢购，group 拼团，
      shipping_store_id: '' // 选择的门店id
    }
  },
  computed: {
    allTotalAmount () {
      try {
        return computeArrayColumnSum(this.bizList, 'Order_TotalAmount')
      } catch (e) {
        return 0
      }
    },
    allGoodsPrice () {
      try {
        return computeArrayColumnSum(this.bizList, 'Order_ProdAmount')
      } catch (e) {
        return 0
      }
      // try {
      //   let count = 0
      //   for (var biz_id in this.CartList) {
      //     for (var pro_id in this.CartList[biz_id]) {
      //       for (var attr_id in this.CartList[biz_id][pro_id]) {
      //         count += this.CartList[biz_id][pro_id][attr_id].ProductsPriceX * this.CartList[biz_id][pro_id][attr_id].Qty
      //       }
      //     }
      //   }
      //   return parseInt(count * 100) / 100
      // } catch (e) {
      //   console.log(e)
      //   return 0
      // }
    },
    allUserCuragioMoney () {
      try {
        return computeArrayColumnSum(this.bizList, 'user_curagio_money')
      } catch (e) {
        return 0
      }
    },
    allCouponMoney () {
      try {
        return computeArrayColumnSum(this.bizList, 'Coupon_Money')
      } catch (e) {
        return 0
      }
    },
    allManjianCash () {
      try {
        return computeArrayColumnSum(this.bizList, 'Manjian_Cash')
      } catch (e) {
        0
      }
    },
    allIntegralMoney () {
      try {
        return computeArrayColumnSum(this.bizList, 'Integral_Money')
      } catch (e) {
        return 0
      }
    },
    allOrderShipping () {
      // 用...来代表子属性
      try {
        return computeArrayColumnSum(this.bizList, 'Order_Shipping...Price')
      } catch (e) {
        return 0
      }
    },

    isAllowUseMoney () {
      try {
        return parseFloat(this.userInfo.User_Money) < parseFloat(this.bizList[this.activeBizId].Order_TotalPrice)
      } catch (e) {
        return false
      }
    },
    useMoneyCount () {
      try {
        const moneyList = Object.values(this.postData.use_money)
        let count = 0
        for (var num of moneyList) {
          if (num) count += parseFloat(num)
        }
        return count
      } catch (e) {
        return 0
      }
    },
    prodCount () {
      try {
        let count = 0
        for (var biz_id in this.CartList) {
          // 第二个是产品
          for (var prod_id in this.CartList[biz_id]) {
            count += Object.keys(this.CartList[biz_id][prod_id]).length
          }
        }
        return count
      } catch (e) {
        return 0
      }
    },
    Order_Fyepay () {
      try {
        let num = 0
        for (const i in this.bizList) {
          num += this.bizList[i].Order_Fyepay
        }
        return num
      } catch (e) {
        return 0
      }
    },
    // 根据当前活跃商家id，展示对应的优惠券
    popupCoupons () {
      try {
        return this.bizList[this.activeBizId].coupon_list
      } catch (e) {
        return {}
      }
    },
    // 根据当前活跃商家id，展示对应的物流方式
    popupExpressCompanys () {
      try {
        return this.bizList[this.activeBizId].shipping_company
      } catch (e) {
        return {}
      }
    },
    loading: function () {
      return this.addressLoading && this.orderLoading
    },
    active_name () {
      let rt = ''
      switch (this.checkfrom) {
        case 'seckill' :
          rt = '秒杀价'
          break
        case 'spike' :
          rt = '限时抢购价'
          break
        case 'group' :
          rt = '拼团价'
      }
      return rt
    },
    initData () {
      return this.$store.getters['system/initData']
    },
    ...mapGetters({
      userInfo: 'user/userInfo'
    })
  },
  methods: {
    upOrderTmplData (data) {
      this.order_temp_data = objTranslate(data)
    },
    setActiveBizId (biz_id) {
      this.activeBizId = biz_id
    },
    async _init_func () {
      if (!this.$checkIsLogin(1, 1)) return

      const addressList = await getAddressList({}, { onlyData: true }).catch(() => {
      })
      if (Array.isArray(addressList) && addressList.length > 0) {
        if (this.back_address_id > 0) {
          for (const item of addressList) {
            // eslint-disable-next-line no-unused-expressions
            Number(item.Address_ID) === Number(this.back_address_id) ? this.addressinfo = item : ''
          }
        } else {
          this.addressinfo = addressList[0]
        }
      }
      this.postData.address_id = this.addressinfo.Address_ID

      // 获取用户收货地址，获取订单信息，后台判断运费信息
      await this.checkOrderParam({ isInit: true })
      if (this.order_temp_id && this.bid) {
        const { temp_info: temp_infoStr = '' } = await getBizOrderTemplateList({
          id: this.order_temp_id,
          biz_id: this.bid
        }, { onlyData: true }).catch(err => {
          modal(err.msg)
        })
        if (temp_infoStr) {
          const temp_info = JSON.parse(temp_infoStr)
          this.tmplFromList = temp_info.formData
        }
      }
    },
    changgeTabIdx (index) {
      this.tabIdx = index
      if (index === 0) {
        this.postData.shipping_id = this.idD
      } else if (index === 1) {
        this.idD = this.postData.shipping_id
        this.postData.shipping_id = 'is_store'
      }
    },
    bindStores (storeInfo) {
      if (this.tabIdx === 1) {
        this.selectStore = false
        this.postData.shipping_id = 'is_store'
      } else if (this.orderInfo.is_virtual === 1) {
        this.postData.shipping_id = ''
      } else {
        // 为了选择门店的时候的用户体验
        this.postData.shipping_id = '1'
      }
      this.shipping_store_id = storeInfo.Stores_ID
      // 新增
      this.postData.shipping_store_id = this.shipping_store_id
      if (this.setStoreMode === 'all') {
        // 居然是对象醉了
        for (var i in this.orderInfo.CartList) {
          for (var j in this.orderInfo.CartList[i]) {
            this.orderInfo.CartList[i][j].store = storeInfo
          }
        }

        this.orderInfo.Stores_Name = storeInfo.Stores_Name
      } else {
        const tempArr = this.setStoreMode.split('::')
        const prod_id = tempArr[0]
        const attr_id = tempArr[1]
        this.orderInfo.CartList[prod_id][attr_id].store = storeInfo
        this.orderInfo.Stores_Name = storeInfo.Stores_Name
      }
      this.$refs.stroeComp.close()

      if (this.postData.shipping_id === 'is_store') {
        const obj = {}
        for (const it in this.orderInfo.CartList) {
          for (const iq in this.orderInfo.CartList[it]) {
            obj[it] = {
              [iq]: this.orderInfo.CartList[it][iq].store.Stores_ID
            }
          }
        }
        this.postData.self_pick_store_id = JSON.stringify(obj)
      }

      // 新增
      // if(this.tabIdx===0){
      this.checkOrderParam()
      // }

      this.zIndex = 88
    },
    multipleSelectStore () {
      this.zIndex = 9
      this.selectStore = true
      this.setStoreMode = 'all'
      // let ids = Object.keys(this.orderInfo.CartList)
      const ids = {}
      for (const iq in this.orderInfo.CartList) {
        const arr = []
        for (const iw in this.orderInfo.CartList[iq]) {
          arr.push(iw)
        }
        ids[iq] = arr
      }
      this.$refs.stroeComp.show(ids)
    },
    openStores (prod_id, attr_id, store) {
      this.zIndex = 9
      this.selectStore = true
      this.setStoreMode = prod_id + '::' + attr_id
      const ids = { [prod_id]: [attr_id] }
      if (store) {
        this.$refs.stroeComp.show(ids, store.Stores_ID)
      } else {
        this.$refs.stroeComp.show(ids)
      }
    },

    // 查看明细
    seeDetail () {
      if (!this.isSlide) {
        this.bottomHeight = 50
        this.zIndex = 9
        this.$refs.popupMX.show()
      } else {
        this.$refs.popupMX.close()
        setTimeout(() => {
          this.zIndex = 9
          this.bottomHeight = 0
        }, 500)
      }
      this.isSlide = !this.isSlide
    },
    handClicked () {
      this.isSlide = false
      setTimeout(() => {
        this.zIndex = 88
        this.bottomHeight = 0
      }, 500)
    },
    // 跳转地址列表页
    goAddressList () {
      uni.navigateTo({
        url: '/pagesA/user/AddressList?from=checkout&addressid=' + this.postData.address_id
      })
    },
    // 跳转新增地址页面
    goEditAdd () {
      this.$linkTo('/pagesA/user/EditAddress?from=checkout')
    },

    // 积分抵扣开关
    intergralSwitchChange (e, biz_id) {
      console.log(e)
      this.postData.intergralChecked[biz_id] = !!e.detail.value

      if (!this.postData.intergralChecked[biz_id]) {
        this.postData.use_integral[biz_id] = 0
      } else {
        this.postData.use_integral[biz_id] = this.bizList[biz_id].max_diyong_intergral
      }

      this.checkOrderParam()
    },
    // 余额支付开关
    userMoneyChange (e, biz_id) {
      const open = e.detail.value
      this.postData.use_money_conf[biz_id] = open ? 1 : 0
      this.checkOrderParam()
    },
    // 发票开关
    // 利用这种方式传参
    faPiaoChange (e, biz_id) {
      const open = e.detail.value
      if (open) {
        this.postData.need_invoice[biz_id] = 1
      } else {
        this.postData.need_invoice[biz_id] = 0
      }
    },
    // 发票抬头输入完成
    faPiaoConfirm (e, biz_id) {
      const invoice_info = e.detail.value
      this.postData.invoice_info[biz_id] = invoice_info
    },
    // 余额处理，走商家的版本
    confirm_user_money_bybiz (e, biz_id) {
      try {
        const currentBizInfo = this.bizList[biz_id]
        const val = e.detail.value

        const input_money = parseFloat(Number(val).toFixed(2))

        if (input_money < 0 || isNaN(input_money)) {
          throw Error('您输入的金额格式有误')
        }

        // 如果价格过大
        if (input_money > parseFloat(this.bizList[biz_id].Order_TotalPrice)) {
          throw Error('输入金额超过订单总支付金额')
        }

        console.log(input_money, input_money + this.useMoneyCount, parseFloat(currentBizInfo.biz_user_money))

        if (input_money + this.useMoneyCount > parseFloat(currentBizInfo.biz_user_money)) {
          throw Error('已超出可用余额范围')
        }

        if (input_money + this.useMoneyCount <= parseFloat(currentBizInfo.biz_user_money)) {
          this.postData.use_money[biz_id] = input_money
        }
      } catch (e) {
        this.postData.use_money[biz_id] = 0
        Exception.handle(e)
      } finally {
        this.checkOrderParam()
      }
    },
    // 余额支付输入完成
    confirm_user_money (e, biz_id) {
      try {
        const val = e.detail.value

        const input_money = parseFloat(Number(val).toFixed(2))

        if (input_money < 0 || isNaN(input_money)) {
          throw Error('您输入的金额格式有误')
        }

        // 如果价格过大
        if (input_money > parseFloat(this.bizList[biz_id].Order_TotalPrice)) {
          throw Error('输入金额超过订单总支付金额')
        }

        console.log(input_money, input_money + this.useMoneyCount, parseFloat(this.userInfo.User_Money))

        if (input_money + this.useMoneyCount > parseFloat(this.userInfo.User_Money)) {
          throw Error('已超出可用余额范围')
        }

        if (input_money + this.useMoneyCount <= parseFloat(this.userInfo.User_Money)) {
          this.postData.use_money[biz_id] = input_money
        }
      } catch (e) {
        this.postData.use_money[biz_id] = 0
        Exception.handle(e)
      } finally {
        this.checkOrderParam()
      }
    },
    // 留言
    remarkConfirm (e, biz_id) {
      this.postData.order_remark[biz_id] = e.detail.value
    },
    // 优惠券改变
    radioChange (e) {
      var couponlist = this.orderInfo.coupon_list
      for (var i = 0; i < couponlist.length; i++) {
        if (couponlist[i].Coupon_ID === e.target.value) {
          this.current = i
          break
        }
      }

      this.postData.coupon_id = e.target.value
    },
    changeShpping (bizId) {
      this.activeBizId = bizId
      this.ship_current = this.postData.shipping_id[bizId]

      for (const it in this.popupExpressCompanys) {
        if (it !== 'is_self_get') {
          this.postData.shipping_id[this.activeBizId] = it
          this.postData.shipping_name[this.activeBizId] = this.popupExpressCompanys[it]
          break
        }
      }

      // 更改物流，需要重新获取信息，计算运费
      this.checkOrderParam()
    },
    // 到店自提
    changeIsSelft (bizId) {
      this.activeBizId = bizId
      this.ship_current = this.postData.shipping_id[bizId]
      this.postData.shipping_id[bizId] = 'is_self_get'
      this.postData.shipping_name[bizId] = '到店自提'
      // 更改物流，需要重新获取信息，计算运费
      this.checkOrderParam()
    },
    // 修改同城配送方式
    citySendTypeChange (e, bizId) {
      this.activeBizId = bizId
      const val = e.detail.value
      this.postData.appoint_time_type[bizId] = val
    },
    citySendTypeOpen (bizId) {
      this.activeBizId = bizId
      if (this.postData.appoint_time_type[bizId] !== 'appoint') {
        error('请先设置为预约配送')
        return
      }

      const appointTimeTypes = this.bizList[bizId].appoint_time_list
      // 初始化选择的值
      const selectIdx = findArrayIdx(appointTimeTypes, { time_str: this.postData.appoint_time[bizId] })
      console.log(appointTimeTypes, { time_str: this.postData.appoint_time[bizId] }, selectIdx)
      if (selectIdx !== false) {
        this.citySendTimePicker = [parseInt(selectIdx)]
      } else {
        this.citySendTimePicker = [0]
      }
      this.appointTimeTypes = appointTimeTypes
      this.$openPop('citySendTime')
    },
    // 取消事件设置，那么就切换回立即配送 目前需求不要
    cancelCurrentBizSendTime () {
      // this.postData.appoint_time_type[this.activeBizId] = 'now'
      // this.appointTimeTypes = []
    },
    setCurrentBizSendTime () {
      const selectIdx = this.citySendTimePicker[0]
      if (isNaN(selectIdx)) {
        error('请设置正确的时间段')
        return
      }
      this.postData.appoint_time[this.activeBizId] = this.appointTimeTypes[selectIdx].time_str
      this.$closePop('citySendTime')
    },
    bindCitySendTimeChange (e) {
      console.log('预约配送时间段更新', e)
      this.citySendTimePicker = e.detail.value
    },
    // 物流改变
    async ShipRadioChange (e, bizId) {
      const val = e
      // this.ship_current = isNaN(val) ? val : parseInt(val)

      const currentBizInfo = this.bizList[bizId]
      const { business_status = 0, business_time_status = 0, out_business_time_order = 0 } = currentBizInfo
      const shippingName = currentBizInfo.shipping_company[val]
      if (shippingName === '同城配送') {
        // 在营业时间内，但店铺状态为关闭
        if (business_time_status) {
          if (!business_status) {
            await confirm({
              title: '操作确认',
              content: '当前商家非营业状态，配送可能会推迟，请确认是否继续使用同城配送?'
            }).then(res => {
              this.postData.shipping_id[bizId] = val
              this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[val] // 也要设置下name

              // 还在预约时间内，这个咋办啊
              // 默认设置成预约时间的

              if (this.checkfrom != 'group') this.postData.appoint_time_type[bizId] = 'appoint'
            }).catch(() => {
              console.log(currentBizInfo, currentBizInfo.Order_Shipping.shipping_id)
              this.$set(this.postData.shipping_id, bizId, currentBizInfo.Order_Shipping.shipping_id)
              // this.postData.shipping_id[bizId] = currentBizInfo.Order_Shipping.shipping_id
              this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[currentBizInfo.Order_Shipping.shipping_id] // 也要设置下name
              console.log(this.postData)
            })
            // const city_express_appoint_send = currentBizInfo.city_express_appoint_send
            this.checkOrderParam()
            return
          }
        }

        // 非营业时间内
        if (!business_time_status) {
          await confirm({
            title: '操作确认',
            content: '当前商家不在营业时间，商家会在营业开始后安排配送，请确认是否继续使用同城配送?'
          }).then(() => {
            // 如果支持在营业时间外预约，就默认设置为允许预约
            if (this.bizList[bizId].city_express_appoint_send) {
              this.postData.shipping_id[bizId] = val
              this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[val] // 也要设置下name
              this.toDay = uni.$moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
              if (this.checkfrom != 'group') this.postData.appoint_time_type[bizId] = 'appoint'
            } else {
              error('该商家当前时段不支持同城配送')
              this.$set(this.postData.shipping_id, bizId, currentBizInfo.Order_Shipping.shipping_id)
              // this.postData.shipping_id[bizId] = currentBizInfo.Order_Shipping.shipping_id
              this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[currentBizInfo.Order_Shipping.shipping_id] // 也要设置下name
            }
          }).catch(() => {
            this.$set(this.postData.shipping_id, bizId, currentBizInfo.Order_Shipping.shipping_id)
            // this.postData.shipping_id[bizId] = currentBizInfo.Order_Shipping.shipping_id
            this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[currentBizInfo.Order_Shipping.shipping_id] // 也要设置下name
          })

          // const city_express_appoint_send = currentBizInfo.city_express_appoint_send
          this.checkOrderParam()
          return
        }
      }
      this.postData.shipping_id[bizId] = val
      this.postData.shipping_name[bizId] = currentBizInfo.shipping_company[val] // 也要设置下name
      // 更改物流，需要重新获取信息，计算运费
      this.checkOrderParam()
    },
    CouponRadioChange (e) {
      const idx = e.detail.value
      this.postData.coupon_current[this.activeBizId] = idx
      if (idx === 'nouse') {
        this.postData.coupon_desc[this.activeBizId] = '暂不使用优惠'
        this.postData.coupon_id[this.activeBizId] = ''
      } else {
        this.postData.coupon_id[this.activeBizId] = this.popupCoupons[idx].Coupon_ID
        const descStr = `满${this.popupCoupons[idx].Coupon_Condition} - ` + (this.popupCoupons[idx].Coupon_Cash > 0 ? this.popupCoupons[idx].Coupon_Cash : this.popupCoupons[idx].Coupon_Discount)
        this.postData.coupon_desc[this.activeBizId] = descStr
      }

      // 优惠券更改
      this.checkOrderParam()
    },
    // 唤起选择优惠券
    changeCoupon (biz_id) {
      this.activeBizId = biz_id
      this.coupon_current = this.postData.coupon_id[biz_id]
      this.$openPop('couponPop')
    },
    focusInvoice (biz_id) {
      this.activeBizId = biz_id
    },
    // 唤起选择运费
    changeShip (biz_id) {
      this.activeBizId = biz_id
      this.ship_current = this.postData.shipping_id[biz_id]
      this.$openPop('freightPop')
    },
    /**
     * 更新下单信息
     * @param isInit 初次请求需要标记为true,因为有些操作只有第一次的时候才做
     */
    async checkOrderParam ({ isInit = false } = {}) {
      try {
        const oldOrderInfo = { ...this.orderInfo }

        let params = {}
        // 初始化的时候只有这个必传（也就是说默认的时候不算运费，毕竟运费可以通过选择运费后实时计算)
        if (isInit) {
          params = {
            cart_key: this.postData.cart_key,
            address_id: this.postData.address_id
          }
        } else {
          const { shipping_id, coupon_id, use_integral, need_invoice, invoice_info, use_money, order_remark, ..._params } = objTranslate(this.postData)

          params = Object.assign({}, _params, {
            shipping_id: JSON.stringify(shipping_id),
            coupon_id: JSON.stringify(coupon_id),
            use_integral: JSON.stringify(use_integral),
            need_invoice: JSON.stringify(need_invoice),
            invoice_info: JSON.stringify(invoice_info),
            use_money: JSON.stringify(use_money),
            order_remark: JSON.stringify(order_remark)
          })

          // 来自购物车和外卖，需要加上这个
          if (['CartList', 'waimai'].includes(this.postData.cart_key)) {
            params.cart_buy = JSON.stringify(params.cart_buy)
          }
        }

        // 来自购物车和外卖，需要加上这个
        if (['CartList', 'waimai'].includes(params.cart_key)) {
          params.cart_buy = JSON.stringify(this.postData.cart_buy)
        }

        const preOrderData = await createOrderCheck({ ...params }, { onlyData: true }).catch(e => {
          throw Error(e.msg)
        })

        // CartList数据不能覆盖吧，毕竟后台不会储存我的
        const { CartList, biz_list: bizList, ...orderInfo } = preOrderData

        // 第一层是商户
        // for (var biz_id in CartList) {
        //   // 第二个是产品
        //   for (var prod_id in CartList[biz_id]) {
        //     // 同一个产品可能同时多个规格
        //     for (var attr in CartList[biz_id][prod_id]) {
        //
        //
        //     }
        //   }
        // }

        // console.log(bizList)
        // 初始化的时候搞一下
        if (isInit) {
          for (var biz_id in CartList) {
            this.$set(this.postData.shipping_id, biz_id, 0)// 初始化对应数量的物流方式，默认全是0.如果是实物订单，则在提交的时候校验就好了
            this.$set(this.postData.shipping_name, biz_id, '')// 初始化对应数量的物流方式，默认全是0.如果是实物订单，则在提交的时候校验就好了
            this.$set(this.postData.appoint_time_type, biz_id, 'now')// 默认现在 now和appoint两个可选值
            this.$set(this.postData.appoint_time, biz_id, 0) // 同城配送时有效，同城配送的预约时间,默认立即配送
            for (var bid in bizList) {
              if (bid === biz_id) {
                // console.log(bid, biz_id, bizList[bid].Order_Shipping, bizList[bid].shipping_company)
                // 如果该商户有选择，那么就设置上
                if (bizList[bid].Order_Shipping.shipping_id) {
                  this.$set(this, 'ship_current', bizList[bid].Order_Shipping.shipping_id)
                  this.$set(this.postData.shipping_id, biz_id, bizList[bid].Order_Shipping.shipping_id)
                  this.$set(this.postData.shipping_name, biz_id, bizList[bid].shipping_company[bizList[bid].Order_Shipping.shipping_id])
                }
              }
            }

            if (!this.postData.coupon_desc.hasOwnProperty(biz_id)) {
              this.$set(this.postData.coupon_desc, biz_id, '')// 优惠券描述
            }
            if (!this.postData.coupon_current.hasOwnProperty(biz_id)) {
              this.$set(this.postData.coupon_current, biz_id, 'nouse')
            }

            this.$set(this.postData.coupon_id, biz_id, '')// 优惠券

            this.$set(this.postData.use_integral, biz_id, 0)// 积分抵扣

            this.$set(this.postData.intergralChecked, biz_id, false)// 积分抵扣

            this.$set(this.postData.need_invoice, biz_id, 0)// 是否需要发票
            this.$set(this.postData.invoice_info, biz_id, '')// 发票信息
            this.$set(this.postData.use_money, biz_id, '')// 使用余额
            this.$set(this.postData.use_money_conf, biz_id, 0)// 使用余额
            this.$set(this.postData.order_remark, biz_id, '')// 订单备注
          }
        }

        var bizListUpShiping = {}
        const allTotalPrice = computeArrayColumnSum(bizList, 'Order_TotalPrice') // computeArrayColumnSum()
        console.log(allTotalPrice)
        this.allowUseMoney = Math.min(parseFloat(this.userInfo.User_Money), parseFloat(allTotalPrice))

        for (var bizId in bizList) {
          var bizInfo = bizList[bizId]
          var expired_prod_count = 0
          for (var i in bizInfo.expired_cart_prod) {
            expired_prod_count += bizInfo.expired_cart_prod[i].length
          }

          // 是否允许商家自己发货
          var bizSendByMerchat = false
          for (var key in bizInfo.shipping_company) {
            if (key !== 'is_self_get')bizSendByMerchat = true
          }

          bizInfo.expired_prod_count = expired_prod_count

          var shippingStatus = {
            isOrder: false, // 允许下单
            isSameCity: false, // 同城配送
            isNow: false, // 立即配送
            isAppoint: false// 预约诶送
          }
          const { business_status = 0, business_time_status = 0, out_business_time_order = 0, city_express_appoint_send = 0 } = bizInfo
          // 1.营业状态关闭，任何情况，任何物流都不能下单
          if (!business_status) {

          }

          // 2.营业状态打开，在营业时间，正常下单
          if (business_status && business_time_status && city_express_appoint_send) {
            shippingStatus.isOrder = true
            shippingStatus.isSameCity = true
            shippingStatus.isNow = true
            shippingStatus.isAppoint = true
          }

          // 3.营业状态打开，不在营业时间，允许营业外下单，同城配送只能预约，不能立即送达，普通物流不受影响
          if (business_status && !business_time_status && out_business_time_order && city_express_appoint_send) {
            shippingStatus.isOrder = true
            shippingStatus.isSameCity = true
            shippingStatus.isAppoint = true
          }

          // 4.营业状态打开，不在营业时间，不允许营业外下单，提交订单不会出现同城配送
          if (business_status && !business_time_status && !out_business_time_order) {
            shippingStatus.isOrder = true
            shippingStatus.isSameCity = false
          }

          // 团购无法用同城配送的预约功能
          if (this.checkfrom === 'group') {
            shippingStatus.isAppoint = false
          }
          
          bizInfo.biz_user_money = Number(bizInfo.biz_user_money)

          bizListUpShiping[bizId] = Object.assign({}, { shippingStatus: { ...shippingStatus }, bizSendByMerchat }, bizInfo)
        }

        this.$set(this, 'bizList', bizListUpShiping)

        var tempCartList = {}
        // for (var biz_id in CartList) {
        //   var biz_total = 0
        //   for (var prod_id in CartList[biz_id]) {
        //     // 同一个产品可能同时多个规格
        //     for (var attr in CartList[biz_id][prod_id]) {
        //       biz_total += CartList[biz_id][prod_id][attr].ProductsPriceX * CartList[biz_id][prod_id][attr].Qty
        //     }
        //   }
        //
        //   var bizInfo = CartList[biz_id]
        //   bizInfo.biz_total = biz_total
        //
        //   tempCartList[bizId] = Object.assign({}, bizInfo)
        // }
        this.$set(this, 'CartList', CartList)

        this.CartListReady = true
        this.bizListReady = true

        // console.log(orderInfo)
        // 更新订单总价这些信息
        this.orderInfo = Object.assign(oldOrderInfo, orderInfo)
        // if (Array.isArray(this.orderInfo.coupon_list) && this.orderInfo.coupon_list.length > 0) {
        //   this.orderInfo.coupon_list.push({ Coupon_ID: '' })
        // }
        // this.couponlist = orderInfo.coupon_list

        // 如果该规格有门店 就优先后台设置的
        // if (this.orderInfo.all_has_stores === 1 && isInit === true && this.orderInfo.is_virtual !== 1) {
        //   this.tabIdx = this.initData.order_submit_first
        // }

        // if (orderInfo.Order_Shipping && orderInfo.Order_Shipping.shipping_id) this.postData.shipping_id = orderInfo.Order_Shipping.shipping_id
        // this.idD = this.postData.shipping_id
        // for (var k in this.orderInfo.shipping_company) {
        //   if (k === this.postData.shipping_id) {
        //     this.shipping_name = `${this.orderInfo.shipping_company[k]}`
        //   }
        // }
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.orderLoading = true
      }
    },
    // 提交订单
    async submitFn () {
      try {
        this.formCheckResult = []
        const bizListLen = getObjectAttrNum(this.bizList) // 获得当前订单中有多少个商家，用来比较一些必填项的数量是否正确

        const {
          shipping_id,
          coupon_id,
          use_integral,
          need_invoice,
          invoice_info,
          use_money,
          order_remark,
          appoint_time,
          ...params
        } = objTranslate(this.postData)

        if (this.orderInfo.is_virtual === 0 && Object.values(shipping_id).filter(val => val === 0 || val === '0').length > 0) {
          throw Error('实体商品物流必须设置')
        }

        if (getObjectAttrNum(shipping_id) !== bizListLen) {
          throw Error('每个商家都请设置物流')
        }

        if (Object.values(use_integral).filter(num => (num < 0 || isNaN(num)) && num !== '').length > 0) {
          throw Error('每个商家积分抵扣数值都为大于等于0的数')
        }
        if (Object.values(use_money).filter(num => (num < 0 || isNaN(num)) && num !== '').length > 0) {
          throw Error('每个商家使用余额数值都为大于等于0的数')
        }

        // 是否是预约时间
        if (JSON.stringify(this.postData.appoint_time_type) !== '{}') {
          for (const time in this.postData.appoint_time_type) {
            if (this.postData.appoint_time_type[time] === 'appoint' && !this.postData.appoint_time[time]) {
              throw Error('请选择预约送达时间')
            }
          }
        }

        Object.assign(params, {
          shipping_id: JSON.stringify(shipping_id),
          coupon_id: JSON.stringify(coupon_id),
          use_integral: JSON.stringify(use_integral),
          need_invoice: JSON.stringify(need_invoice),
          invoice_info: JSON.stringify(invoice_info),
          use_money: JSON.stringify(use_money),
          order_remark: JSON.stringify(order_remark),
          appoint_time: JSON.stringify(appoint_time)
        })

        // 来自购物车和外卖，需要加上这个
        if (['CartList', 'waimai'].includes(this.postData.cart_key)) {
          params.cart_buy = JSON.stringify(params.cart_buy)
        }

        // 校验自定义表单
        if (this.order_temp_id) {
          for (const item of this.order_temp_data) {
            if (item.require && !item.value) {
              throw Error(`订单模板-${item.label}必填`)
            }
          }
          params.order_temp_data = JSON.stringify(this.order_temp_data)
        }

        // 虚拟商品
        if (this.orderInfo.is_virtual === 1 || this.postData.shipping_id === 'is_store') {
          // if (!this.user_name) {
          //   uni.showToast({
          //     title: '请填写购买人姓名',
          //     icon: 'none',
          //   })
          //   this.submited = false
          //   return
          // }
          //
          // if (!this.user_mobile) {
          //   uni.showToast({
          //     title: '请填写购买人手机号',
          //     icon: 'none',
          //   })
          //   this.submited = false
          //   return
          // }

          this.postData.user_name = this.user_name
          this.postData.user_mobile = this.user_mobile
        }

        showLoading()

        const createOrderResult = await createOrder(params, { onlyData: true }).catch(e => {
          throw Error(e.msg || '下单失败')
        })

        if (['waimai'].includes(this.postData.cart_key) && this.delivery_biz_id) {
          this.$store.dispatch('delivery/remove_goods_by_biz', this.delivery_biz_id)
        }

        // 订单的分销信息，在成功下单后就清除
        if (Storage.get('owner_id')) {
          Storage.remove('owner_id')
        }
        // 如果order_totalPrice <= 0  直接跳转 订单列表页
        if (createOrderResult.Order_Status !== 1) {
          if (this.gift) {
            this.$linkTo('/pagesA/user/MyGift?checked=1')
            return
          }
          // 直接跳转订单列表页
          this.$linkTo('/pages/order/OrderList')
          return
        }

        const url = '/pages/order/OrderPay?Order_ID=' + createOrderResult.Order_ID + '&pagefrom=check'
        uni.redirectTo({
          url: url
        })
      } catch (e) {
        console.log(e)
        this.formCheckResult = [e.message]
        this.$refs.refMsg.show()
        setTimeout(() => {
          this.formCheckResult = []
        }, 4000)
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    }
    // ...mapActions(['getUserInfo','setUserInfo']),
  },

  onShow () {
    this._init_func()
  },
  async created () {
    // #ifdef H5
    this.selfObj = this
    // #endif

    const initData = await this.$store.dispatch('system/loadInitData')
    const { cash_from = 1 } = initData
    this.cash_from = Number(cash_from)
  },
  onLoad (options) {
    this.toDay = uni.$moment(new Date()).add(0, 'year').format('YYYY-MM-DD')
    this.postData.cart_key = options.cart_key
    if (options.cart_buy) {
      this.postData.cart_buy = options.cart_buy
    }
    if (options.checkfrom) {
      this.checkfrom = options.checkfrom

      switch (this.checkfrom) {
        case 'seckill' :
          uni.setNavigationBarTitle({
            title: '秒杀订单确认'
          })
          break
        case 'spike' :
          uni.setNavigationBarTitle({
            title: '限时抢购订单确认'
          })
          break
        case 'group' :
          uni.setNavigationBarTitle({
            title: '拼团订单确认'
          })
        default:
          break
      }
    }

    if (options.gift) {
      this.gift = true
      uni.setNavigationBarTitle({
        title: '赠品订单确认'
      })
    }

    // 如果有物流模板，必须要有biz_id
    if (options.order_temp_id) {
      this.order_temp_id = options.order_temp_id
      if (!options.biz_id) {
        modal('biz_id必传')
        return
      }
      this.bid = options.biz_id
    }

    if (['waimai'].includes(options.cart_key)) {
      if (!options.biz_id) {
        modal('biz_id必传')
        return
      }
    }

    if (options.cart_key === 'CartList') {
      const cart_buy = this.$store.state.cart_buy
      for (var i in cart_buy) {
        for (var j in cart_buy[i]) {
          if (Array.isArray(cart_buy[i][j]) && cart_buy[i][j].length === 0) {
            delete cart_buy[i][j]
          }
        }
      }
      this.postData.cart_buy = cart_buy
    }

    // cart_key==waimai：{"biz_id_1":{"prod_id_1":{"attr_id_1":"购买数量","attr_id_2":"购买数量"},"prod_id_2":["购买数量"]}}，例如：{"1":{"1561":{"2125":"1"},"1564":["2"]}}
    if (options.cart_key === 'waimai') {
      uni.setNavigationBarTitle({
        title: '外卖订单确认'
      })

      const cart_buy = {}
      const deliveryCartList = this.$store.getters['delivery/getCartList'](options.biz_id)
      this.delivery_biz_id = options.biz_id
      console.log(deliveryCartList)
      for (var row of deliveryCartList) {
        // 创建biz_id
        if (!cart_buy.hasOwnProperty(row.biz_id)) cart_buy[row.biz_id] = {}
        // 创建product_id
        if (!cart_buy[row.biz_id].hasOwnProperty(row.Products_ID)) cart_buy[row.biz_id][row.Products_ID] = {}

        // 根据是否有属性，来做不同的事情
        if (isNaN(row.attr_id) && row.attr_id.indexOf('noattr') !== -1) {
          cart_buy[row.biz_id][row.Products_ID] = [row.num]
        } else {
          cart_buy[row.biz_id][row.Products_ID][row.attr_id] = row.num
        }
      }
      this.postData.cart_buy = cart_buy

      // this.deliveryCartList = deliveryCartList
    }

    // 页面直接传值很方便，为什么这么难受
    uni.$on('bind_select_address', (data) => {
      this.back_address_id = data.Address_ID
      this.addressinfo = data

      this.checkOrderParam()
    })
  }
}
</script>

<style lang="scss" scoped>
  .nobor{
    border: none !important;
  }
  .page-wrap {
    background: #f8f8f8;
    min-height: 100vh;

    /* #ifdef MP */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    /* #endif */
  }

  //底部占位
  .space-box {
    height: 50px;
  }

  .top {
    padding: 10px 0;

    .tabs {
      display: flex;
      justify-content: center;
      font-size: 14px;

      .tabs-item {
        width: 170rpx;
        padding: 6px 0;
        margin-right: 70rpx;
        color: #333;
        text-align: center;

        &.active {
          color: $fun-primary-color;
          border-bottom: 2px solid $fun-primary-color;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .mxdetail {
    width: 750rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    line-height: 80rpx;
    padding: 20rpx 30rpx;
    /* #ifndef APP-PLUS */
    padding-bottom: 100rpx;
    /* #endif */
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

  /* 收货地址 start */
  .address {
    /* margin: 15px 0 10px; */
    display: flex;
    align-items: center;
    padding: 44rpx 38rpx 45rpx;
    border-bottom: 20rpx solid #f8f8f8;

    .add_msg {
      flex: 1;
      font-size: 28rpx;
    }

    .right {
      width: 18rpx;
      height: 27rpx;
      margin-left: 34rpx;
    }
  }

  .container {
    padding-bottom: 60rpx;

    .section-box {
      margin: 0 0 30rpx;
      border-radius: 8rpx;
      overflow: hidden;
    }

    .store-item {

    }
  }

  .loc_icon {
    width: 41rpx;
    height: 51rpx;
    margin-right: 31rpx;
  }

  .name {
    margin-bottom: 30rpx;
    font-size: 28rpx;
    color: #333;
    line-height: 22rpx;
  }

  .name > span {
    margin-left: 10rpx;
  }

  .location {
    font-size: 24rpx;
    color: #333;
    line-height: 32rpx;
  }

  /* 收货地址 end */
  /* 订单信息 start */

  .biz-info {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 20rpx 30rpx;
  }

  .biz_logo {
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
    border-radius: 35rpx;
  }

  .biz_name {
    font-size: 28rpx;
    color: #333;
    line-height: 30rpx;
  }

  .pro {
    display: flex;

  }

  .expired-box{
    padding: 0 30rpx;
  }
  .expired-goods-list{
    padding: 30rpx 40rpx 30rpx 0;

    .pro{
      .pro-img{
        width: 200rpx;
        height: 200rpx;
      }
    }

    .pro:last-child {
      margin-bottom: 17rpx
    }

    .goods-hr {
      height: 15px;

      //background: #eee;
    }
  }

  .biz-goods-list {

    padding: 30rpx 40rpx 30rpx 30rpx;

    .pro:last-child {
      margin-bottom: 17rpx
    }

    .store-box {
      padding: 15px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #555;

      .store-name {

      }

      .icon-fanhui {
        font-size: 14px;
        transform: rotate(180deg);
      }

    }

    .goods-hr {
      height: 15px;

      //background: #eee;
    }
  }

  .pro-img {
    width: 200rpx;
    height: 200rpx;
    margin-right: 28rpx;
  }

  .pro-name {
    font-size: 26rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-height: 30rpx;
    height: 61rpx
  }

  .pro-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .attr {
    display: inline-block;
    height: 50rpx;
    line-height: 50rpx;

    color: #666;
    font-size: 24rpx;
    // padding: 0 20rpx;
    // margin: 25rpx 0 24rpx;
    span {
      padding: 14rpx 20rpx;
      margin: 25rpx 0 24rpx;
      background: #FFF5F5;
    }
  }

  .pro-price {
    color: #F43131;
    font-size: 36rpx;

    span {
      font-size: 24rpx;
      font-style: normal;
    }

    .amount {
      float: right;
      color: #333;
      font-size: 22rpx;

      .num {
        font-size: 30rpx;
      }
    }
  }

  /* 订单信息 end */
  /* 订单其他信息 start */
  .other {
    /*padding: 0 40rpx 0 30rpx;*/
    font-size: 22rpx;

    .right {
      margin-left: 18rpx;
      width: 15rpx;
      height: 23rpx;
    }
  }

  .store-item{
    .bd {
      /*margin-top: 30rpx;*/
      /*padding-bottom: 30rpx;*/
      padding: 30rpx 40rpx 30rpx 30rpx;
      border-bottom: 2rpx solid #efefef;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .o_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;

    .inputs {
      font-size: 24rpx;
    }
  }

  .o_title .van-switch {
    float: right;
  }

  .o_desc,
  .o_de {
    font-size: 22rpx;
    margin-top: 10rpx;

    text {
      color: #F43131;
    }
  }

  .o_de {
    color: #999;
  }

  .words {
    justify-content: flex-start;
  }

  .words .inputs {
    border: 0;
    margin-left: 20rpx;
    flex: 1;
  }

  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40rpx 0;
    font-size: 24rpx;
    padding-right: 30rpx;
  }

  .total .money {
    font-size: 30rpx;
    color: #F43131;
  }

  /* 订单其他信息 end */
  /* 提交订单 */
  .order_total {
    position: fixed;
    bottom: 0;
    height: 50px;
    /* #ifdef MP */
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    /* #endif */
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;

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
    width: 270rpx;
    background: #F43131;
    text-align: center;
    color: #fff;
    line-height: 50px;
    font-size: 34rpx;
    border-radius: 0;
    border: none;
  }

  .totalinfo {
    flex: 1;
    text-align: center;
    line-height: 30rpx;
  }

  .info {
    font-size: 24rpx;

    .money {
      color: #F43131;
      font-size: 30rpx;

      .m_icon {
        font-size: 24rpx;
      }
    }
  }

  .tips {
    font-size: 20rpx;
    color: #979797;
  }

  .popup-wrap {
    width: 750rpx;

    .row {
      border-bottom: 1px solid $fun-border-color;

      &:last-child {
        border-bottom: none;
      }
    }

    .submit-btn {
      height: 90rpx;
      width: 100%;
      background-color: #F43131;
      color: #fff;
      font-size: 32rpx;
      margin-top: 40rpx;
      line-height: 90rpx;
      text-align: center;
    }
  }

  .bMbx {
    padding: 0rpx 20rpx;
    width: 710rpx;

    .fMbx {
      font-size: 32rpx;
      height: 30rpx;
      line-height: 30rpx;
      text-align: center;
      padding: 36rpx 0rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28rpx;
    }
  }

  .sure {
    height: 90rpx;
    width: 100%;
    background-color: #F43131;
    color: #fff;
    font-size: 32rpx;
    margin-top: 96rpx;
    line-height: 90rpx;
    text-align: center;
  }

  // 提醒用户添加收货地址信息
  .remind-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .remind-add {
      background: #fff;
      width: 90%;
      padding: 50rpx 0 0;
      border-radius: 20rpx;
      overflow: hidden;

      .text-align-center {
        text-align: center;
      }

      .mb20 {
        margin-bottom: 20rpx;
      }

      .remind_desc {
        padding: 0 20rpx;
        font-size: 30rpx;
        margin: 40rpx 0;
        color: #666;
      }

      .remind_btns {
        display: flex;
        border-top: 1rpx solid #efefef;
        line-height: 90rpx;

        .fl1 {
          flex: 1;
        }

        .confirm {
          background: #F43131;
          color: #fff;
        }
      }
    }
  }

  .over {
    position: fixed;
    width: 750rpx;
    z-index: 90;
    height: 100%;
    overflow: hidden;
  }

  .bg-f8 {
    background-color: #F8F8F8 !important;
  }

  .checked {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 1px solid #F43131;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checked-radio {
    width: 14rpx;
    height: 14rpx;
    border-radius: 50%;
    background-color: #F43131;
  }

  .unchecked {
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 1px solid #B5B5B5;
  }

  .time-popup-confirmbtn{
    background: $fun-primary-color;
    color: #fff;
    text-align: center;
    font-size: 12px;
    padding: 4px 8px;

  }

  .express-box{
    width: 690rpx;
    background: #fff;
    margin: 0 30rpx 30rpx;
    border-radius: 15rpx;
    overflow: hidden;
  }
</style>
