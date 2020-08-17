<template>
  <div @click="commonClick" class="shopping-cart">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div :style="{height:diyHeadHeight+'px'}" class="bg-white"></div>
    <layout-page-loading :show="isShowFullLoading"></layout-page-loading>
    <div :style="{height:diyHeadHeight+'px'}" class="top-box bg-white">
      <div :style="{height:menuButtonInfo.top+'px'}" class="bg-white" style="position: fixed;top: 0;width: 750rpx;z-index: 99;"></div>
      <div :style="{height:menuButtonInfo.height+'px',top:systemInfo.statusBarHeight+'px'}" class="cart-title fz-16 c3">
        <div :style="{height:menuButtonInfo.height+'px'}" style="position: relative" class="flex flex-vertical-c flex-justify-c ">
          <div>
            购物车
          </div>
          <div @click="isDel=!isDel" class="cart-title-right" v-if="!manage">
            {{isDel?'取消':'管理'}}
          </div>
        </div>
      </div>
    </div>

    <block v-if="!isShowFullLoading">
      <div class="content">
        <div class="cartbox" v-if="total_count>0">
          <div :key="biz_id" class="order_msg" v-for="(biz,biz_id) in CartList">
            <div @click="selectBiz(bizList[biz_id].id,bizList[biz_id].isSaleTime)" class="biz_msg flex">
              <div class="flex1 flex flex-vertical-c">
                <div class="item-cart">
                  <layout-icon color="#F43131" size="20" type="iconicon-check" v-if="bizCheck[biz_id]"></layout-icon>
                  <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
                </div>
                <img :src="bizList[biz_id].biz_logo" class="biz_logo" />
                <span class="biz_name">{{bizList[biz_id].biz_name}}{{biz_id}}</span>
              </div>
              <span class="is-sale-time" v-if="!bizList[biz_id].isSaleTime">
              该商家已打烊
            </span>
            </div>
            <block :key="prod_id" v-for="(proList,prod_id) in biz">
              <div :key="attr_id" class="pro" v-for="(item,attr_id) in proList">
                <div @click="selectItem(biz_id,prod_id,attr_id,bizList[biz_id].isSaleTime)" class="item-cart">
                  <layout-icon color="#F43131" size="20" type="iconicon-check" v-if="item.checked"></layout-icon>
                  <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
                </div>
                <img :src="item.ImgPath" class="pro-img" />
                <div class="pro-msg">
                  <div class="pro-name">{{item.ProductsName}}</div>
                  <div class="attr" v-if="item.Productsattrstrval">
                    <span>{{item.Productsattrstrval}}</span>
                  </div>
                  <div class="pro-price">
                    <span class="span">￥</span>{{item.ProductsPriceX}}
                    <span class="amount">
                      <span :class="item.Qty===1?'disabled':''" @click="updateCartFn(biz_id,prod_id,attr_id,-1,bizList[biz_id].isSaleTime)"
                            class="plus">-</span>
                      <input @blur="inputQty($event,biz_id,prod_id,attr_id,bizList[biz_id].isSaleTime)" @focus="getQty(item.Qty)" class="attr_num"
                             min="1" type="number" v-model="item.Qty" />
                      <span @click="updateCartFn(biz_id,prod_id,attr_id,1,bizList[biz_id].isSaleTime)" class="plus">+</span>
                    </span>
                  </div>
                </div>
              </div>
            </block>
          </div>
        </div>
        <div class="none" v-else>
          <image :src="'/static/client/box.png'|domain" class="img" />
          <div><span>购物车空空如也</span><span @click="gotoBuy" class="tobuy">去逛逛</span></div>
        </div>

      </div>

      <div class="checkout" v-if="!manage">
        <div @click="selectAll" class="item-cart ">
          <layout-icon class="m-r-5" color="#F43131" size="20" type="iconicon-check" v-if="allCheck"></layout-icon>
          <layout-icon class="m-r-5" color="#ccc" size="20" type="iconradio" v-else></layout-icon>
          <span>全选</span>
        </div>
        <block v-if="!isDel">
          <div class="total">合计：<span>￥<span>{{totalPrice}}</span></span></div>
          <div @click="submit" class="checkbtn">结算</div>
        </block>
        <block v-else>
          <div @click="DelCart" class="checkbtn">删除</div>
        </block>
      </div>

      <div class="intro">为你推荐</div>
      <div class="product-list flex">

        <pro-tag
          :index="idx"
          :key="idx"
          :product-info="item"
          :pro_name="item.Products_Name"
          :pro_price="item.Products_PriceX"
          :pro_price_old="item.Products_PriceY"
          :pro_src="item.ImgPath"
          :prod_id="item.Products_ID"
          v-for="(item,idx) in proList"
        />

      </div>
    </block>

    <div class="h50"></div>
    <div class="safearea-box" style="background-color: #f8f8f8!important;"></div>

  </div>
</template>

<script>
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import { mapActions } from 'vuex'
import { CartList as getCartList, DelCart } from '@/api/customer'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import Storage from '@/common/Storage'
import { getProductList } from '@/api/product'
import { error } from '@/common/fun'
import ProTag from '@/components/pro-tag/pro-tag'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import LayoutPageLoading from '@/components/layout-page-loading/layout-page-loading'
import { hideLoading, showLoading } from '../../common/fun'
/**
 * 检查店铺的状态
 * 1.要么在营业时间内
 * 2.要么不在营业时间内，但是开启了非营业时间可以下单
 * 3.不在营业时间内，不允许下单
 */
const checkStoreStatus = (bizInfo) => {
  const { business_status = 0, business_time_status = 0, out_business_time_order = 0 } = bizInfo
  // 1.营业状态关闭，任何情况，任何物流都不能下单
  if (!business_status) return false

  // 2.营业状态打开，在营业时间，正常下单
  if (business_status && business_time_status) return true

  // 3.营业状态打开，不在营业时间，允许营业外下单，同城配送只能预约，不能立即送达，普通物流不受影响
  if (business_status && !business_time_status && out_business_time_order) return true

  // 4.营业状态打开，不在营业时间，不允许营业外下单，提交订单不会出现同城配送
  if (business_status && !business_time_status && !out_business_time_order) return true

}
let timeShow=null
export default {
  mixins: [BaseMixin, tabbarMixin],
  components: {

    WzwImTip,
    LayoutIcon,
    ProTag,
    LayoutPageLoading
  },
  data () {
    return {
      isShowFullLoading:true,
      isAjax: false,
      CartList: [],
      bizList: [],
      total_count: 0,
      total_price: '',
      allCheck: false,
      pageInitDone: false,
      bizCheck: {}, // 商家的选择
      totalPrice: 0, // 选中总计
      isDel: false,
      qty: 0,
      proList: [],
      isHavCheck: false,
      productTotal: 0,
      page: 1
    }
  },
  computed: {
    shopCartList: {
      get () {
        return this.$store.state.cart.cartList
      },
      set (val) {
        this.$store.commit('cart/ASYNC_DATA', val)
      }
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
    manage () {
      return this.CartList.length === 0
    }
  },
  watch: {
  },
  methods: {
    gotoBuy () {
      this.$linkTo('/pages/search/result')
    },
    async submit () {
      this.SumPrice()
      if (!this.isHavCheck) {
        error('请选择商品')
        return
      }
      const obj = {}
      const attrList = []
      // 删除
      for (const biz_id in this.CartList) {
        for (const prod_id in this.CartList[biz_id]) {
          for (const attr_id in this.CartList[biz_id][prod_id]) {
            if (this.CartList[biz_id][prod_id][attr_id].checked) {
              // 有需需要才创建
              if (!obj.hasOwnProperty(biz_id))obj[biz_id] = {}
              if (!obj[biz_id].hasOwnProperty(prod_id))obj[biz_id][prod_id] = []

              obj[biz_id][prod_id].push(attr_id)

              const attr_value = this.CartList[biz_id][prod_id][attr_id]
              attrList.push({
                // ...attr_value,
                biz_id: Number(biz_id),
                prod_id: Number(prod_id),
                attr_id: Number(attr_id),
                checked: attr_value.checked, // 能保留上次的结果
                num: attr_value.Qty
              })
            }
          }
        }
      }

      // 先重置本地的，然后可以防止状态没了
      this.shopCartList = attrList

      const url = '/pages/order/OrderBooking?cart_key=CartList'
      this.$store.state.cart_buy = obj

      this.isDel = false
      this.$linkTo(url)
    },
    async DelCart () {
      const obj = {}
      const attrList = []
      // 删除
      for (const biz_id in this.CartList) {
        for (const prod_id in this.CartList[biz_id]) {
          for (const attr_id in this.CartList[biz_id][prod_id]) {
            if (this.CartList[biz_id][prod_id][attr_id].checked) {
              // 有需需要才创建
              if (!obj.hasOwnProperty(biz_id))obj[biz_id] = {}
              if (!obj[biz_id].hasOwnProperty(prod_id))obj[biz_id][prod_id] = []
              obj[biz_id][prod_id].push(attr_id)

              const attr_value = this.CartList[biz_id][prod_id][attr_id]
              attrList.push({
                // ...attr_value,
                biz_id: Number(biz_id),
                prod_id: Number(prod_id),
                attr_id: Number(attr_id),
                checked: attr_value.checked, // 能保留上次的结果
                num: attr_value.Qty
              })
            }
          }
        }
      }

      const data = {
        cart_key: 'CartList',
        prod_attr: JSON.stringify(obj)
      }
      await DelCart(data).catch(e => {})

      // 先重置本地的，然后可以防止状态没了
      this.shopCartList = attrList
      this.isDel = false
      this._int_func()
    },
    getQty (qty) {
      this.qty = qty
    },
    async inputQty (e, biz_id, prod_id, attr_id, storeIsSaleTime) {
      if (!storeIsSaleTime) {
        error('该商家已打烊')
        return
      }
      const qty = this.qty
      console.log(e, biz_id, prod_id, attr_id, qty)
      const inputNum = e.detail.value
      if (isNaN(inputNum)) {
        error('数量必须为数量')
        return
      }
      if (inputNum <= 1) {
        this.CartList[biz_id][prod_id][attr_id].Qty = this.qty
        error('数量最少为1件')
        return
      }
      if ((qty - inputNum) === 0) return
      const num = inputNum - qty

      if (this.isAjax) return
      this.isAjax = true
      const product = { prod_id: Number(prod_id), attr_id: Number(attr_id), biz_id: Number(biz_id) }
      const cart = await this.$store.dispatch('cart/addNum', { product, num })
      console.log(cart)
      if (cart !== false) {
        this.total_count = cart.total_count
        this.total_price = cart.total_price
        // 更新数量
        const { CartList } = cart
        for (const biz_id in CartList) {
          for (const prod_id in CartList[biz_id]) {
            for (const attr_id in CartList[biz_id][prod_id]) {
              this.CartList[biz_id][prod_id][attr_id].Qty = CartList[biz_id][prod_id][attr_id].Qty
            }
          }
        }
      } else {
        // 需要更正数字
        this.CartList[biz_id][prod_id][attr_id].Qty = this.qty
      }
      this.SumPrice()
      this.isAjax = false
    },
    // 全选
    async selectAll () {
      var isNoSaleTimeStoreCount = 0
      for (var i in this.bizList) {
        if (!this.bizList[i].isSaleTime)isNoSaleTimeStoreCount++
      }
      if (isNoSaleTimeStoreCount > 0) {
        error('有商家打烊无法全选')
        return
      }

      this.allCheck = await this.$store.dispatch('cart/taggleCheckStatus')
      this.initCheck()
      this.SumPrice()
    },
    // 单个商家
    async selectBiz (biz_id, isSaleTime) {
      if (!isSaleTime) {
        error('该商家已打烊')
        return
      }

      console.log(biz_id)
      await this.$store.dispatch('cart/taggleCheckStatus', { biz_id: Number(biz_id) })
      this.initCheck()
      this.SumPrice()
    },
    // 单行
    async selectItem (biz_id, prod_id, attr_id, storeIsSaleTime) {
      if (!storeIsSaleTime) {
        error('该商家已打烊')
        return
      }
      await this.$store.dispatch('cart/taggleCheckStatus', { attr_id: Number(attr_id), prod_id: Number(prod_id) })
      this.initCheck()
      this.SumPrice()
    },
    async updateCartFn (biz_id, prod_id, attr_id, num, storeIsSaleTime) {
      if (!storeIsSaleTime) {
        error('该商家已打烊')
        return
      }
      if (this.CartList[biz_id][prod_id][attr_id].Qty === 1 && num <= 0) {
        error('数量最少为1件')
        return
      }

      if (this.isAjax) return

      this.isAjax = true
      const product = { prod_id: Number(prod_id), attr_id: Number(attr_id), biz_id: Number(biz_id) }
      const cart = await this.$store.dispatch('cart/addNum', { product, num })
      console.log(cart)
      if (cart !== false) {
        this.total_count = cart.total_count
        this.total_price = cart.total_price
        // 更新数量
        const { CartList } = cart
        for (const biz_id in CartList) {
          for (const prod_id in CartList[biz_id]) {
            for (const attr_id in CartList[biz_id][prod_id]) {
              this.CartList[biz_id][prod_id][attr_id].Qty = CartList[biz_id][prod_id][attr_id].Qty
            }
          }
        }
      }

      this.SumPrice()
      this.isAjax = false
    },
    // 初始化 选中状态
    initCheck () {
      var noCheckCount = 0

      for (const biz_id in this.CartList) {
        var bizCheckStatus = this.$store.getters['cart/getListCheckStatus'](Number(biz_id))
        if (!this.bizList[biz_id].isSaleTime) {
          bizCheckStatus = false
        }
        this.$set(this.bizCheck, biz_id, bizCheckStatus)
        for (const prod_id in this.CartList[biz_id]) {
          for (const attr_id in this.CartList[biz_id][prod_id]) {
            var checkStatus = this.$store.getters['cart/getRowCheckStatus']({ attr_id: Number(attr_id), prod_id: Number(prod_id) })
            if (!this.bizList[biz_id].isSaleTime) {
              checkStatus = false
            }
            this.$set(this.CartList[biz_id][prod_id][attr_id], 'checked', checkStatus)
            if (!checkStatus)noCheckCount++
          }
        }
      }
      this.allCheck = noCheckCount === 0
    },
    // 计算总价格
    SumPrice () {
      let total = 0
      this.totalPrice = 0
      for (const biz_id in this.CartList) {
        for (const prod_id in this.CartList[biz_id]) {
          for (const attr_id in this.CartList[biz_id][prod_id]) {
            if (this.CartList[biz_id][prod_id][attr_id].checked) {
              total += this.CartList[biz_id][prod_id][attr_id].ProductsPriceX * this.CartList[biz_id][prod_id][attr_id].Qty
            }
          }
        }
      }
      if (total === 0) {
        this.isHavCheck = false
      } else {
        this.isHavCheck = true
      }
      this.totalPrice = Number(total).toFixed(2)
    },
    async _int_func (init) {
      this.pageInitDone = false

      if (!this.$checkIsLogin(0)){
        timeShow=null
        this.isShowFullLoading=false
        return
      }
      if(init=='init'){
        this.isShowFullLoading=true
      }else{
        showLoading('加载中')
      }

      const cart = await getCartList({ cart_key: 'CartList' }, {
        onlyData: true
      }).catch(e => {
        throw Error(e.msg || '获取购物车产品失败')
      })
      const { total_count, total_price, CartList, biz_list } = cart

      const bizList = {}
      for (var i in biz_list) {
        const key = parseInt(i)
        bizList[key] = Object.assign(biz_list[i], { isSaleTime: checkStoreStatus(biz_list[i]) })
      }

      this.$store.commit('cart/SET_BIZLIST', bizList)
      this.$set(this, 'bizList', bizList)

      if(init=='init'){
        setTimeout(()=>{
          this.isShowFullLoading=false
        },500)
      }else{
        hideLoading()
      }



      const attrList = []
      for (const biz_id in CartList) {
        for (const prod_id in CartList[biz_id]) {
          for (const attr_id in CartList[biz_id][prod_id]) {
            // 初始化为false，方便后面触发响应
            CartList[biz_id][prod_id][attr_id].checked = this.$store.getters['cart/getRowCheckStatus']({ attr_id: Number(attr_id), prod_id: Number(prod_id) })
            if (!this.bizList[biz_id].isSaleTime) {
              CartList[biz_id][prod_id][attr_id].checked = false
            }
            const attr_value = CartList[biz_id][prod_id][attr_id]
            attrList.push({
              // ...attr_value,
              biz_id: Number(biz_id),
              prod_id: Number(prod_id),
              attr_id: Number(attr_id),
              checked: attr_value.checked, // 能保留上次的结果
              num: attr_value.Qty
            })
          }
        }
      }
      this.shopCartList = attrList // computed set

      this.total_count = total_count
      this.total_price = total_price
      this.$set(this, 'CartList', CartList)

      this.initCheck()
      this.SumPrice()
      this.pageInitDone = true
    },
    ...mapActions({
    })
  },
  async created () {

    const { data, totalCount } = await getProductList({ page: this.page }).catch(e => {
      throw Error(e.msg || '获取推荐商品信息失败')
    })

    this.proList = data
    this.productTotal = totalCount
    this.page++
  },
  async onReachBottom () {
    if (this.proList.length >= this.productTotal) {
      // error('到底了')
      return
    }
    const proList = await getProductList({ page: this.page }, { onlyData: true }).catch(e => {
      throw Error(e.msg || '获取推荐商品信息失败')
    })

    this.page++
    this.proList = this.proList.concat(proList)
  },
  onHide(){
    timeShow= setTimeout(()=>{
      this.isShowFullLoading=true
    },100)

  },
  onShow () {

    this.setTabBarIndex(3)
    this.$store.dispatch('system/setTabActiveIdx', 3)
    this.refreshTabTag()

    this._int_func('init')

  }

}
</script>

<style lang="scss" scoped>
  .shopping-cart {
    width: 750rpx;
    overflow-x: hidden;
    padding-bottom: 100rpx;
  }

  .wrap {
    background-color: #F8F8F8 !important;
    min-height: 100%;
    /* #ifdef APP-PLUS */
    //padding-top: var(--status-bar-height);
    /* #endif */
  }

  .top-box {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 750rpx;
  }

  .cart-title {
    width: 750rpx;
    background-color: #FFFFFF;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;

    &-right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 30rpx;
    }
  }

  .status_bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 750rpx;
    background: white;
  }

  .nav-title {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 999;
    width: 100%;
    /* #ifdef APP-PLUS */
    top: var(--status-bar-height);
    /* #endif */
  }

  .space-div {
    padding-top: var(--status-bar-height);
    height: 86rpx;
    background: white;
  }

  .spaceDiv {
    height: 86rpx;
    background: #f8f8f8;
  }

  .content {
    /* #ifndef H5 */
    /*margin-top: 86rpx;*/
    /* #endif */
    padding-top: 30rpx;
    padding-bottom: 160rpx;

  }

  .cartbox {
    margin: 0 30rpx;
  }

  .van-checkbox {
    margin-right: 5px;
  }

  /* 订单信息 start */
  .order_msg {
    padding: 20rpx 19rpx 0px;
    background: #fff;
    overflow: hidden;
    margin-bottom: 30rpx;
  }

  .biz_msg {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    .is-sale-time{
      color: $fun-red-color;
      font-size: 12px;
    }
  }

  .biz_logo {
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
    border-radius: 35rpx;
  }

  .biz_name {
    font-size: 28rpx;
    max-width: 300rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pro {
    display: flex;
    margin-bottom: 50rpx;
  }

  .pro-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pro-img {
    width: 200rpx;
    height: 200rpx;
    margin-right: 32rpx;
  }

  .pro-name {
    font-size: 26rpx;
    margin-bottom: 18rpx;
    width: 390rpx;
    line-height: 28rpx;
    height: 56rpx;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
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
  }

  .pro-price .span {
    font-size: 24rpx;
    font-style: normal;
  }

  .amount {
    float: right;
    display: flex;
    color: #666;
    height: 50rpx;
    width: 168rpx;
  }

  .amount {
    .attr_num {
      width: 72rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 28rpx;
      text-align: center;
      border: 1px solid #D1D1D1 {
        left: 0;
        right: 0;
      };
      box-sizing: border-box;
      min-height: 0;
    }
  }

  .plus {
    width: 48rpx;
    height: 50rpx;
    border: 1px solid #D1D1D1;
    text-align: center;
    line-height: 50rpx;
    box-sizing: border-box;

    &.disabled {
      background: #efefef;
    }
  }

  /* 订单信息 end */
  /* 猜你喜欢 */
  .container {
    margin-top: 30rpx;
    padding: 0 20rpx;
  }

  .fenge {
    text-align: center;
    padding: 30rpx 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .caini {
    font-size: 30rpx;
    margin-left: 13rpx;
    margin-right: 13rpx;
  }

  .prolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .pro-item {
    width: 48%;
    margin-bottom: 15px;
    background: #fff;
  }

  .pro-item img {
    width: 345rpx;
    height: 345rpx;
  }

  .item-name {
    font-size: 24rpx;
    padding: 0 10rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .red {
    background-color: #F43131;
    display: inline-block;
    height: 3rpx;
    width: 44rpx;
  }

  .price {
    margin-top: 20rpx;
    padding: 0 10rpx 20rpx;
  }

  .n_price {
    color: #ff0000;
    font-size: 34rpx;

    span {
      font-size: 24rpx;
    }
  }

  .o_price {
    margin-left: 15rpx;
    color: #afafaf;
    font-size: 24rpx;
    text-decoration: line-through;
  }

  /* 购物车为空 */
  .none {
    text-align: center;
    margin-bottom: 40rpx;
    color: #B0B0B0;
    font-size: 26rpx;
  }

  .none .img {
    height: 220rpx;
    width: 200rpx;
  }

  .tobuy {
    color: #F43131;
    border: 2rpx solid #F43131;
    height: 50rpx;
    line-height: 50rpx;
    padding: 4rpx 20rpx;
    border-radius: 20rpx;
    margin-left: 20rpx;
  }

  /* 结算 */
  .checkout {
    position: fixed;
    z-index: 3;
    bottom: 50px;
    width: 100%;
    height: 100rpx;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    box-sizing: border-box;
  }

  // #ifdef  MP
  .checkout {
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    bottom: 48px;
  }

  // #endif

  // #ifdef APP-PLUS
  .checkout {
    bottom: 0rpx;
  }

  // #endif
  .checkbtn {
    background: #F43131;
    color: #fff;
    width: 126rpx;
    text-align: center;
    height: 54rpx;
    line-height: 54rpx;
    font-size: 28rpx;
    border-radius: 8px;
  }

  .total {
    flex: 1;
    text-align: right;
    margin-right: 40rpx;
    font-size: 26rpx;
  }

  .total > span {
    color: #F43131;
    font-size: 26rpx;
  }

  .total > span > span {
    font-style: normal;
    font-size: 32rpx;
  }

  .item-cart {
    display: flex;
    align-items: center;
    margin-right: 17rpx;
    font-size: 28rpx;

    .img {
      width: 34rpx;
      height: 34rpx;
    }
  }

  .intro {
    text-align: center;
    margin: 60rpx 0 32rpx;
    font-size: 34rpx;
  }

  .product-list {
    flex-wrap: wrap;
    margin: 0 40rpx;
  }
</style>
