<template>
  <div :class="selectStore?'over':''" class="page-wrap">

    <block v-if="orderInfo.is_virtual===0">
      <div @click="goAddressList" class="address bg-white">
        <image :src="'/static/client/location.png'|domain" alt="" class="loc_icon"></image>
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
        <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
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
    <div class="container" v-if="orderInfo.is_virtual === 1">
      <div class="other">
        <div class="bd">
          <div class="o_title  words">
            <span>购买人姓名</span>
            <input class="inputs" placeholder="请填写姓名" type="text" v-model="user_name">
          </div>
        </div>
      </div>
      <div class="other">
        <div class="bd">
          <div class="o_title  words">
            <span>购买人手机号</span>
            <input class="inputs" placeholder="请填写手机号码" type="text" v-model="user_mobile">
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="CartList">

      <!--这行代码特别关键 bind click="activeBizId=biz_id"-->
      <div :key="biz_id" class="store-item bg-white" v-for="(bizData,biz_id) in CartList" @click="activeBizId=biz_id">
        <div class="biz-info bor-b">
          <div style="display: flex;align-items: center;">
            <image :src="('https://newo2o.bafangka.com/static/member/images/login/loginWeixin.png'||biz_list[biz_id].biz_logo)|domain" class="biz_logo" />
            <span class="biz_name">{{biz_list[biz_id].biz_name}}</span>
          </div>
        </div>
        <div class="biz-goods-list">
          <block :key="pro_id" v-for="(pro,pro_id) in bizData">
            <div :key="attr_id" v-for="(attr,attr_id) in pro">
              <div class="pro">
                <img :src="attr.ImgPath" alt="" class="pro-img">
                <div class="pro-msg">
                  <div class="pro-name">{{attr.ProductsName}}</div>
                  <div class="attr" v-if="attr.Productsattrstrval"><span>{{attr.Productsattrstrval}}</span></div>
                  <div class="pro-price"><span>￥</span>{{attr.ProductsPriceX}} <span class="amount">x<span class="num">{{attr.Qty}}</span></span>
                  </div>
                </div>
              </div>
<!--              <div @click="openStores(pro_id,attr_id,attr.store)" class="store-box" v-if="tabIdx===1">-->
<!--                <div class="store-name">{{attr.store.Stores_Name||'选择门店'}}</div>-->
<!--                <div class="funicon icon-fanhui icon"></div>-->
<!--              </div>-->
              <div class="goods-hr"></div>
            </div>
          </block>
        </div>
        <div class="other">
          <div class="bd"  v-if="biz_list[biz_id].is_virtual === 0">
            <div @click="changeShip(biz_id)" class="o_title">
              <span>运费选择</span>
              <span style="text-align:right; color: #888;" class="flex flex-vertical-c">
                <span>
                  <block v-if="postData.shipping_name[biz_id]">
                    {{postData.shipping_name[biz_id]}} {{(' ' + (orderInfo.Order_Shipping.Price > 0 ? '￥'+orderInfo.Order_Shipping.Price : '免运费'))}}
                  </block>
                  <block v-else>请选择物流</block>
                </span>
                <layout-icon type="iconicon-arrow-right" class="right" color="#999"></layout-icon>
              </span>
            </div>
          </div>

          <div class="bd" v-if="couponlist.length > 0">
            <div @click="changeCoupon" class="o_title">
              <span>优惠券选择</span>
              <span style="text-align: right; color: #888;display: flex;align-items: center;">
              <span>{{couponlist.length>0?(coupon_desc?coupon_desc:'您有优惠券使用'): '暂无可用优惠券'}}</span>
              <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
            </span>
            </div>
          </div>

          <div class="bd" v-if="initData.invoice_switch === 1">
            <div class="o_title">
              <span>是否开具发票</span>
              <switch :checked="faPiaoChecked" @change="faPiaoChange" color="#04B600" />
            </div>
            <input @blur="faPiaoConfirm" class="o_desc" placeholder="请输入发票抬头和纳税人识别号" type="text" v-if="faPiaoChecked" />
          </div>

          <div class="bd">
            <div class="o_title  words">
              <span>买家留言</span>
              <input @input="remarkConfirm" class="inputs" placeholder="请填写留言内容" type="text">
            </div>
          </div>

          <div class="bd" v-if="orderInfo.max_diyong_intergral > 0">
            <div class="o_title">
              <span>是否参与积分抵扣</span>
              <switch :checked="intergralChecked" @change="intergralSwitchChange" color="#04B600" />
            </div>
            <div class="o_de" v-if="intergralChecked">您当前共有
              <text>{{userInfo.User_Integral}}</text>
              积分，每
              <text>{{orderInfo.Integral_Buy}}</text>
              积分可以抵扣
              <text>1</text>
              元，本次可使用
              <text>{{orderInfo.max_diyong_intergral}}</text>
              积分,总共可抵
              <text>{{orderInfo.max_Integral_Money}}</text>
              元
            </div>
          </div>

          <div class="bd" v-if="orderInfo.is_use_money === 1">
            <div class="o_title">
              <span>是否使用余额</span>
              <switch :checked="userMoneyChecked" @change="userMoneyChange" color="#04B600" />
            </div>
            <div class="o_de">您当前最多使用余额:
              <text>{{userInfo.User_Money < orderInfo.Order_TotalPrice ? userInfo.User_Money :
                orderInfo.Order_TotalPrice}}
              </text>
            </div>
            <input @blur="confirm_user_money" @focus="postData.use_money = 0" class="o_desc"
                   placeholder="请输入金额" type="number" v-if="userMoneyChecked" v-model.number="postData.use_money">
          </div>

        </div>
      </div>

    </div>

    <div :style="{'z-index':zIndex}" class="order_total">
      <div class="totalinfo">
        <div class="info">共{{orderInfo.prod_count||0}}件商品 总计：
          <text class="money">
            <text class="m_icon">￥</text>
            {{orderInfo.Order_Fyepay||0}}
          </text>
        </div>
        <div class="tips" v-if="orderInfo.obtain_desc">{{orderInfo.obtain_desc}}</div>
      </div>
      <div @click="seeDetail" class="mx">明细
        <image :class="isSlide?'slidedown': ''" class="image" src="/static/top.png"></image>
      </div>

      <button class="submit" @click="form_submit">提交订单</button>

    </div>

    <div class="safearea-box"></div>

    <layout-layer :bottomHeight="bottomHeight" title="运费选择"  @maskClicked="handClicked" ref="popupMX">
      <div class="mxdetail">
        <div class="mxtitle">明细</div>
        <div class="mxitem">产品原价
          <text class="num">{{orderInfo.Order_TotalAmount-orderInfo.Order_Shipping.Price}}</text>
        </div>
        <div class="mxitem" v-if="checkfrom">{{active_name}}
          <text class="num">{{orderInfo.Order_Fyepay}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.user_curagio_money > 0">会员折扣
          <text class="num">-{{orderInfo.user_curagio_money}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.Manjian_Cash > 0">满减
          <text class="num">-{{orderInfo.Manjian_Cash}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.Coupon_Money > 0">优惠券
          <text class="num">-{{orderInfo.Coupon_Money}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.Integral_Money > 0">积分抵用
          <text class="num">-{{orderInfo.Integral_Money}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.Order_Yebc > 0">余额
          <text class="num">-{{orderInfo.Order_Yebc}}</text>
        </div>
        <div class="mxitem" v-if="orderInfo.Order_Shipping.Price > 0">运费
          <text class="num">+{{orderInfo.Order_Shipping.Price}}</text>
        </div>
      </div>
    </layout-layer>
    <layout-layer ref="freightPop" title="选择快递">
      <div class="freight-popup-wrap" v-if="type==='shipping'">
        <radio-group @change="ShipRadioChange">
          <label class="row flex flex-justify-between flex-vertical-b p-10" :key="shipid"  v-for="(ship,shipid) in popupExpressCompanys">
            <span class="flex1">{{ship}}</span>
            <radio :checked="shipid===ship_current" :value="shipid" class="radio" color="#F43131"/>
          </label>
        </radio-group>
        <div @click="$closePop('freightPop')" class="submit-btn">确定</div>
      </div>

    </layout-layer>

    <layout-layer ref="couponPop">
      <div class="bMbx freight-wrap" v-if="type==='shipping'">
        <div class="fMbx">运费选择</div>
        <scroll-div class="bMbx" scroll-y="true" style="height:430rpx;width:95%;" v-if="type==='coupon'">
          <div class="fMbx scroll-div-item">优惠券选择</div>
          <radio-group @change="radioChange">
            <label :key="i" class="iMbx scroll-div-item" v-for="(coupon,i) in orderInfo.coupon_list">
              <block v-if="coupon.Coupon_ID">
                满{{coupon.Coupon_Condition}} - {{coupon.Coupon_Cash > 0 ? coupon.Coupon_Cash : coupon.Coupon_Discount}}
              </block>
              <block v-else>
                不使用优惠
              </block>

              <radio :checked="i===current" :value="''+coupon.Coupon_ID" color="#F43131" style="float:right;" />

            </label>
          </radio-group>
        </scroll-div>
        <div @click="closeMethod" class="sure">
          确定
        </div>
      </div>
    </layout-layer>
    <!--    <store-list-components style="z-index: 10000;" :pageEl="selfObj" direction="top" ref="stroeComp" @callFn="bindStores" @change="selectStore=false" catchtouchmove />-->
  </div>
</template>

<script>

// import StoreListComponents from "../../components/StoreListComponents";

import BaseMixin from '@/mixins/BaseMixin'
import { createOrder, createOrderCheck } from '@/api/order'
import { getAddressList } from '@/api/customer'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import { modal } from '@/common/fun'

import Helper from '@/common/helper'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

const ObjectMap = Helper.Object.mapList

export default {
  mixins: [BaseMixin],
  components: { LayoutIcon, LayoutLayer },
  data () {
    return {
      selfObj: null,
      selectStore: false,
      tabIdx: 0,
      show: false, // 遮罩层
      wl_show: false, // 物流选择
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      addressinfo: {}, // 收货地址信息

      activeBizId: null, // 活跃的商户id,很多操作之前都需要先改变这个
      CartList: false,
      biz_list: false,

      orderInfo: {
        is_use_money: 0,
        prod_count: 0,
        Order_Fyepay: 0
      },
      type: 'shipping',
      cart_buy: '',
      current: '',
      couponlist: [], // 优惠券列表,
      coupon_id: '', // 优惠券id
      coupon_desc: '', // 优惠券选择描述
      use_integral: 0, // 用于抵扣的积分数
      use_money: 0, // 余额支付金额
      intergralChecked: false,
      userMoneyChecked: false,
      faPiaoChecked: false,
      ship_current: 0,

      postData: {
        cart_key: '',
        cart_buy: '',
        address_id: '',
        shipping_name: {}, // 对应名称,不过不需要提交到后台
        shipping_id: {},
        coupon_id: {},
        use_integral: {}, // 用于抵扣的积分数
        use_money: {}, // 余额支付金额
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
    // 根据当前活跃商家id，展示对应的优惠券
    popupCoupons () {
      try {
        return this.biz_list[this.activeBizId].coupon_list
      } catch (e) {
        return {}
      }
    },
    // 根据当前活跃商家id，展示对应的物流方式
    popupExpressCompanys () {
      try {
        return this.biz_list[this.activeBizId].shipping_company
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
        case 'spike' :
          rt = '秒杀价'
          break
        case 'limit' :
          rt = '限时抢购价'
          break
        case 'group' :
          rt = '拼团价'
      }
      return rt
    }
    // ...mapGetters(['userInfo','initData'])
  },
  methods: {
    async _init_func () {
      if (!this.$checkIsLogin(1, 1)) return
      // if (JSON.stringify(this.userInfo) !== '{}') {
      //   getUserInfo().then(res => {
      //     this.setUserInfo(res.data)
      //   }).catch(e => {
      //   })
      // }
      const addressList = await getAddressList({}, { onlyData: true }).catch(() => {})
      if (Array.isArray(addressList) && addressList.length > 0) {
        this.addressinfo = addressList[0]
      }
      this.postData.address_id = this.addressinfo.Address_ID

      // 获取用户收货地址，获取订单信息，后台判断运费信息
      this.checkOrderParam({ isInit: true })
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

      this.zIndex = 999999
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
        this.zIndex = 99999
        this.bottomHeight = 0
      }, 500)
    },
    // 跳转地址列表页
    goAddressList () {
      uni.navigateTo({
        url: '/pages/addressList/addressList?from=checkout&addressid=' + this.postData.address_id
      })
    },
    // 跳转新增地址页面
    goEditAdd () {
      uni.navigateTo({
        url: '/pagesA/editAddress/editAddress?from=checkout'
      })
    },
    // 提交订单
    form_submit (e) {
      if (!this.submited) {
        this.submited = true
        if (this.postData.need_invoice === 1 && this.postData.invoice_info === '' && this.initData.invoice_switch === 1) {
          this.submited = false
          if (this.postData.invoice_info === '') {
            uni.showToast({
              title: '发票信息不能为空',
              icon: 'none'
            })
            return
          }
        }

        if (this.tabIdx === 1 && this.postData.shipping_id !== 'is_store') {
          this.submited = false
          uni.showToast({
            title: '请选择门店',
            icon: 'none'
          })
          return
        }
        if (this.orderInfo.is_virtual === 0) {
          if (!this.postData.shipping_id) {
            uni.showToast({
              title: '请选择物流',
              icon: 'none'
            })
            this.submited = false
            return
          }
        }

        if (this.orderInfo.is_virtual === 1 || this.postData.shipping_id === 'is_store') {
          // if (!this.user_name) {
          //   uni.showToast({
          //     title: '请填写购买人姓名',
          //     icon: 'none'
          //   })
          //   this.submited = false
          //   return
          // }
          //
          // if (!this.user_mobile) {
          //   uni.showToast({
          //     title: '请填写购买人手机号',
          //     icon: 'none'
          //   })
          //   this.submited = false
          //   return
          // }

          this.postData.user_name = this.user_name
          this.postData.user_mobile = this.user_mobile
        }

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

        if (this.shipping_store_id) {
          this.postData.shipping_store_id = this.shipping_store_id
        }
        createOrder(this.postData).then(res => {
          // 如果order_totalPrice <= 0  直接跳转 订单列表页
          if (res.data.Order_Status !== 1) {
            // 直接跳转订单列表页
            uni.redirectTo({
              url: '/pages/order/order'
            })
            return
          }
          this.Order_ID = res.data.Order_ID
          uni.redirectTo({
            url: '/pages/pay/pay?Order_ID=' + res.data.Order_ID + '&pagefrom=check'
          })
        }).catch(e => {
          uni.showToast({
            title: e.msg,
            icon: 'none'
          })
          this.submited = false
        })
      }
    },
    // 积分抵扣开关
    intergralSwitchChange (e) {
      this.intergralChecked = e.detail.value
      this.postData.use_integral = this.orderInfo.max_diyong_intergral
      if (!this.intergralChecked) {
        this.postData.use_integral = 0
      }

      this.checkOrderParam()
    },
    // 余额支付开关
    userMoneyChange (e) {
      this.userMoneyChecked = e.detail.value
      if (!this.userMoneyChecked) {
        this.postData.use_money = 0
      }
      this.checkOrderParam()
    },
    // 发票开关
    faPiaoChange (e) {
      this.faPiaoChecked = e.detail.value
      if (this.faPiaoChecked) {
        this.postData.need_invoice = 1
      } else {
        this.postData.need_invoice = 0
      }
    },
    // 发票抬头输入完成
    faPiaoConfirm (e) {
      const invoice_info = e.detail.value
      this.postData.invoice_info = invoice_info
    },
    // 余额支付输入完成
    confirm_user_money (e) {
      const input_money = e.detail.value
      // let user_money = this.userInfo.User_Money;
      // 用户的金额和订单金额比较，取较小的那个与用户输入金额比较
      const user_money = (this.userInfo.User_Money < this.orderInfo.Order_TotalPrice) ? this.userInfo.User_Money : this.orderInfo.Order_TotalPrice
      if (input_money < 0 || isNaN(input_money)) {
        uni.showToast({
          title: '输入金额有误',
          icon: 'none'
        })
        this.postData.use_money = 0
        return
      }
      if (input_money - user_money > 0) {
        uni.showModal({
          title: '提示',
          content: '金额大于最大使用余额',
          icon: 'none',
          showCancel: false
        })
        this.postData.use_money = user_money
        this.checkOrderParam()
        return
      }
      this.postData.use_money = Number(input_money).toFixed(2)
      this.checkOrderParam()
    },
    // 留言
    remarkConfirm (e) {
      this.postData.order_remark[this.activeBizId] = e.detail.value
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
    // 物流改变
    ShipRadioChange (e) {
      const val = e.detail.value
      this.ship_current = val
      this.postData.shipping_id[this.activeBizId] = val
    },
    changeCoupon () {
      this.type = 'coupon'
      if (this.couponlist.length === 0) {

      }
      // this.$openPop('freightPop')
    },
    // 选择运费
    changeShip (biz_id) {
      this.activeBizId = biz_id
      this.ship_current = this.postData.shipping_id[biz_id]
      this.$openPop('freightPop')
    },
    closeMethod () {
      if (this.type === 'coupon') {
        // 不使用优惠
        if (!this.postData.coupon_id) {
          this.coupon_desc = '暂不使用优惠'
          this.checkOrderParam()
          this.$refs.freight.close()
          return
        }
        for (var i in this.couponlist) {
          if (this.couponlist[i].Coupon_ID === this.postData.coupon_id) {
            this.coupon_desc = `满${this.couponlist[i].Coupon_Condition} - ${this.couponlist[i].Coupon_Cash > 0 ? this.couponlist[i].Coupon_Cash : this.couponlist[i].Coupon_Discount}`
          }
        }
      } else {
        for (var i in this.orderInfo.shipping_company) {
          if (i === this.postData.shipping_id) {
            this.shipping_name = `${this.orderInfo.shipping_company[i]}`
          }
        }
      }

      this.checkOrderParam()
      this.$refs.freight.close()
    },
    getAddress () {

      // // 添加、选择收获地址返回
      // // 有收获地址，则更新（防止收获地址编辑后返回）
      // const Address_ID = this.back_address_id || this.addressinfo.Address_ID
      //
      // return new Promise((resolve, reject) => {
      //
      //
      // })

    },
    /**
     * 更新下单信息
     * @param isInit 初次请求需要标记为true,因为有些操作只有第一次的时候才做
     */
    checkOrderParam ({ isInit = false }) {
      const oldOrderInfo = { ...this.orderInfo }

      // 初始化的时候只有这个必传（也就是说默认的时候不算运费，毕竟运费可以通过选择运费后实时计算)
      const params = isInit ? { cart_key: this.postData.cart_key } : this.postData
      createOrderCheck(params).then(res => {
        const { CartList, biz_list, ...orderInfo } = res.data

        console.log(orderInfo)

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

        for (var biz_id in CartList) {
          this.$set(this.postData.shipping_id, biz_id, 0)// 初始化对应数量的物流方式，默认全是0.如果是实物订单，则在提交的时候校验就好了
          this.$set(this.postData.shipping_name, biz_id, '')// 初始化对应数量的物流方式，默认全是0.如果是实物订单，则在提交的时候校验就好了

          this.$set(this.postData.coupon_id, biz_id, '')// 优惠券
          this.$set(this.postData.use_integral, biz_id, 0)// 积分抵扣
          this.$set(this.postData.need_invoice, biz_id, 0)// 是否需要发票
          this.$set(this.postData.invoice_info, biz_id, '')// 发票信息
          this.$set(this.postData.use_money, biz_id, '')// 使用余额
          this.$set(this.postData.order_remark, biz_id, '')// 订单备注
        }

        this.$set(this, 'biz_list', biz_list)
        this.$set(this, 'CartList', CartList)

        this.orderInfo = Object.assign(oldOrderInfo, orderInfo)
        if (this.orderInfo.coupon_list.length > 0) {
          this.orderInfo.coupon_list.push({ Coupon_ID: '' })
        }

        // 如果该规格有门店 就优先后台设置的
        if (this.orderInfo.all_has_stores === 1 && isInit === true && this.orderInfo.is_virtual !== 1) {
          this.tabIdx = this.initData.order_submit_first
        }

        this.couponlist = orderInfo.coupon_list

        this.orderLoading = true
        this.postData.shipping_id = orderInfo.Order_Shipping.shipping_id
        this.idD = this.postData.shipping_id
        for (var k in this.orderInfo.shipping_company) {
          if (k === this.postData.shipping_id) {
            this.shipping_name = `${this.orderInfo.shipping_company[k]}`
          }
        }
      }).catch(e => {
        uni.showToast({
          title: e.msg,
          icon: 'none'
        })
      })
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
  },
  onLoad (options) {
    this.postData.cart_key = options.cart_key
    if (options.cart_buy) {
      this.postData.cart_buy = options.cart_buy
    }
    if (options.checkfrom) {
      this.checkfrom = options.checkfrom
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
  .page-wrap {
    background: #f8f8f8;
    min-height: 100vh;
    /* #ifdef MP */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    /* #endif */
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
    padding-bottom: 60px;

    .store-item {
      margin-bottom: 15px;
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
    margin-bottom: 30rpx;
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

  .biz-goods-list {

    padding: 0 40rpx 0 30rpx;
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
      margin: 15px 0;
      height: 1px;
      background: #eee;
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
    padding: 0 40rpx 0 30rpx;
    font-size: 22rpx;

    .right {
      margin-left: 18rpx;
      width: 15rpx;
      height: 23rpx;
    }
  }

  .other .bd {
    margin-top: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid #efefef;
    &:last-child{
      border-bottom: none;
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

  .freight-popup-wrap{
    width: 750rpx;
    .row{
      border-bottom: 1px solid $fun-border-color;
      &:last-child{
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

  .disMbx {
    display: flex;
    align-items: center;
  }

  .zhouri {
    width: 9px;
    height: 14px;
    margin-left: 5px;
  }

  .mbx-mbx {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
  }

  .mbxs {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 100%;
  }
</style>
