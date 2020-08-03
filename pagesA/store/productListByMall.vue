<template>
  <div class="page-wrap">
    <div :style="{height:menuButtonInfo.bottom+10+'px'}"
         style="position: fixed;left: 0;top:0;width:750rpx;background-color: #f5f5f5">
      <!--状态栏-->
      <div :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}" class="status-bar"></div>
      <!--导航栏-->
      <div :style="{height:menuButtonInfo.bottom+10-menuButtonInfo.top+'px',backgroundColor:menuButtonBgColor}"
           class="navigation-bar flex flex-vertical-c">
        <layout-icon @click="$back" class="left-icon" color="#333" size="18"
                     type="iconicon-arrow-left"></layout-icon>
        <div class="search-input flex-vertical-c flex flex-justify-c" @click="toSearch">
          <layout-icon class="left-icon" color="#333" size="18"
                       type="iconicon-search"></layout-icon>
          <span class="fz-12 search-text">{{bizSearchKeyWord}}</span>
        </div>
        <div class="navigation-title">全部商品</div>
      </div>
    </div>
    <div :style="{height:menuButtonInfo.bottom+10+'px'}"></div>
    <div class="container" :style="{top:menuButtonInfo.bottom+10+'px'}">
      <div class="cate">
        <div :class="{active:cateActiveIdx===idx}" :key="idx" @click="setCateActuveIdx(idx)" class="cate-item"
             v-for="(item,idx) in cateList">
          <div class="avtiveLine"></div>
          <block v-if="idx===0">
            <layout-icon color="#FF0000" display="inline" type="iconicon-fire"></layout-icon>
            <span class="p-l-4">{{item.cate_name}}</span>
          </block>
          <block v-else>{{item.cate_name}}</block>
        </div>

      </div>
      <scroll-view class="list" scroll-y="true">
        <div class="cate-second" v-if="cateList[cateActiveIdx].child.length>0">
          <block v-for="(item,index) of cateList[cateActiveIdx].child" :key="index">
            <div class="cate-second-item" :class="cateIndex==index?'checkCate':''" @click="changeCate(index)">
              {{item.cate_name}}
            </div>
          </block>
        </div>
        <div style="height: 50rpx;"></div>
        <div :key="idx" class="goods-item" v-for="(goods,idx) in showList">
          <div :style="{backgroundImage:'url('+$getDomain(goods.ImgPath)+')'}" @click="toDetail(goods)"
               class="cover"></div>
          <div>
            <div @click="toDetail(goods)" class="info">
              <div class="title">
                <wzw-live-tag :room_id="goods.room_id" :product-info="goods" />
                {{goods.Products_Name}}
              </div>
              <div class="title-money" v-if="goods.Products_PriceY>goods.Products_PriceX">
                已省{{$filterPrice(goods.Products_PriceY-goods.Products_PriceX)}}元
              </div>
              <div>
                <span class="price-selling fz-10">￥</span>
                <span class="price-selling fz-15">{{goods.Products_PriceX}}</span>
                <span class="product-priceY fz-11">￥ {{goods.Products_PriceY}}</span>
              </div>
              <div class="number-all">
                <div class="fz-11 c9 p-t-6 p-b-6 cA">月销{{goods.Products_Sales}}件</div>
                <div @click.stop="$noop" class="action ">

                  <block v-if="goods.order_temp_id||goods.Products_IsVirtual==1">
                    <div @click.stop="toDetail(goods)" class="btn-open-attr m-r-10">立即下单</div>
                  </block>
                  <block v-else>
                    <div @click.stop="openAttrLayer(goods.Products_ID)" class="btn-open-attr " v-if="goods.skujosn">
                      选规格
                      <div class="goods-num-tag" v-if="goods.num>0">{{goods.num}}</div>
                    </div>
                    <div @click="setActiveGoodsIdx(idx)" class="flex flex-vertical-c" v-else>
                      <block v-if="CartList[goods.biz_id][goods.Products_ID][0].Qty>0">
                        <layout-icon @click.stop="updateCartFn(goods.biz_id,goods.Products_ID,0,-1,goods)" color="#e64239"
                                     size="20"
                                     type="iconicon-minus "></layout-icon>
                        <input :value="CartList[goods.biz_id][goods.Products_ID][0].Qty"
                               @blur="changeGoodsNum($event,goods.biz_id,goods.Products_ID,0,1,goods)" @focus="getQty($event)"
                               class="input-num text-center fz-12" />
                        <layout-icon @click.stop="updateCartFn(goods.biz_id,goods.Products_ID,0,1,goods)" color="#e64239"
                                     size="20"
                                     type="iconicon-plus "></layout-icon>
                      </block>
                      <block v-else>
                        <layout-icon @click.stop="updateCartFn(goods.biz_id,goods.Products_ID,0,1,goods)"
                                     color="#e64239" size="25"
                                     type="iconicon-plus "></layout-icon>
                      </block>

                    </div>
                  </block>
                </div>
              </div>

            </div>

          </div>

        </div>
      </scroll-view>
    </div>

    <!--    <div  class="icon-wrap" @click="goCart">-->
    <!--      <layout-icon class="cart-icon" color="#fff" size="24" type="iconicon-cart"></layout-icon>-->
    <!--      <div class="tag">-->
    <!--        {{totalNum}}-->
    <!--      </div>-->
    <!--    </div>-->

    <layout-layer positions="center" ref="attr">
      <div class="attr-form-wrap">
        <div class="attr-head">
          <span class="title">{{product.Products_Name}}</span>
          <layout-icon @click="$closePop('attr')" class="close" type="icondelete"></layout-icon>
        </div>
        <div class="form cart-attr-box">
          <div :key="i" class="cartAttr" v-for="(item,i) of product.skujosn_new">
            <div class="sku-title c3">{{item.sku==='mobile_prod_attr_name'?'规格':item.sku}}</div>
            <div class="sku-val-list">
              <div
                :class="check_attr[item.sku]==index?'checked':''"
                :key="index"
                @click="selectAttr(index,item.sku)"
                class="sku-val-item"
                v-for="(text,index) of item.val"
              >{{text}}
              </div>
            </div>
          </div>
        </div>
        <div class="p-10">
          <block v-if="attrInfo.price">
            <span class="fz-12 p-r-4 c9">已选择:</span>
            <span class="price-selling fz-12">￥</span>
            <span class="price-selling fz-14 c3">{{attrInfo.price}}</span>
            <span class="c9 fz-12 p-l-4">{{attrInfo.attr_text}}</span>
          </block>
        </div>
        <div class="actions">
          <div class="flex1"></div>
          <div>
            <div :class="{disabled:!submitFlag}" @click="confirmAdd" class="confirm-btn" v-if="attrInfo.num<1">加入购物车
            </div>
            <div class="flex flex-vertical-c" style="width: 120px" v-else>
              <block v-if="attrInfo.num>0">
                <layout-icon @click.stop="delNum" color="#26C78D" size="24" type="iconicon-minus p-10"></layout-icon>
                <input @blur="changeNum" @focus="getQty($event)" class="input-num text-center fz-12"
                       :value="attrInfo.num" />
              </block>
              <layout-icon @click.stop="addNum" color="#26C78D" size="24" type="iconicon-plus p-10"></layout-icon>
            </div>
          </div>

        </div>
      </div>
    </layout-layer>

    <layout-layer @maskClicked="bindCartsPopClose" :bottomStr="storeBottomActionHeight" positions="bottom" ref="carts">
      <div class="carts-box">
        <div class="carts-action flex flex-vertical-c flex-justify-between">
          <div class="check-all flex flex-vertical-c" @click="selectBiz">
            <layout-icon color="#E64239" size="20" type="iconicon-check" v-if="allCheck"></layout-icon>
            <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
            <span class="p-l-6 fz-14 c3">全选</span></div>
          <div class="flex flex-vertical-c" @click="clearCart">
            <layout-icon size="14" type="iconshanchu"></layout-icon>
            <span class="c6 fz-12 p-l-3">清空购物车</span></div>
        </div>
        <scroll-view scroll-y :style="{height:systemInfo.windowHeight*0.6+'px'}" class="carts-list">
          <div :key="idx" class="carts-item" v-for="(row,idx) in carts">
            <div class="check-item flex flex-vertical-c" @click="selectItem(row)">
              <layout-icon color="#E64239" size="20" type="iconicon-check" v-if="row.checked"></layout-icon>
              <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
            </div>
            <div :style="{backgroundImage:'url('+row.pic+')'}" class="carts-item-cover"></div>
            <div class="carts-item-info">
              <div class="title">{{row.name}}</div>
              <div class="attr-text">{{row.attr_text||''}}</div>
              <div class="actions">
                <div class="price-box fz-10 flex1">
                  <span class="price-selling">￥</span><span class="price-selling fz-15">{{row.price_selling}}</span>
                  <span class="p-l-7 price-market text-through">￥{{row.price_market}}</span>
                </div>
                <div class="action flex flex-vertical-c">
                  <block v-if="row.num>0">
                    <layout-icon @click.stop="attrNumMinus(row)" color="#B2B1B1" size="24"
                                 type="iconicon-minus"></layout-icon>
                    <input style="width: 54rpx;" v-model="row.num" @focus="getQty(row.num)"
                           @blur="changeAttrNum($event,idx,row)" class="input-num text-center fz-13" />
                  </block>
                  <layout-icon @click.stop="attrNumPlus(row)" color="#E64239" size="24"
                               type="iconicon-plus"></layout-icon>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
        <!--底部安全区域，然后高度是50+25-->
        <!-- p-b-safe-area-->
        <div class="h75"></div>
      </div>
    </layout-layer>

    <!-- m-b-safe-area-->
    <div class="mall-tabbar-wrap" v-if="isUserLogin" :animation="animationData">

      <!--右侧内容区域-->
      <div class="cart-box" :animation="animationData2">
        <!--图标区域-->
        <div class="icon-box" :class="{expand:cartExpand}" @click.stop="taggleCartListExpand">
          <layout-icon class="cart-icon" color="#fff" size="24" type="iconicon-cart"></layout-icon>
          <div class="tag" :class="{aircle:total_count<100}">{{total_count}}</div>
        </div>
        <div class="total-info flex flex-column flex-justify-c" @click.stop="taggleCartListExpand">
          <div class="color-white flex flex-vertical-b"><span class="fz-11">￥</span><span class="fz-16 text-nowrap">{{total_price}}</span>
          </div>
          <div class="c9 fz-10 text-nowrap">已减{{$filterPrice(totalPriceByMarket-totalPrice)}}元</div>
        </div>
        <div class="go-btn text-nowrap" @click.stop="submit">去结算</div>
        <div class="user-btn" @click.stop="$linkTo('/pages/user/index')">
          <layout-icon display="inline" size="23" type="iconyonghu" color="#fff"></layout-icon>
          <div class="fz-10 color-white text-center text-nowrap">个人中心</div>
        </div>
      </div>

      <div class="close-btn" @click.stop="taggkeCartShow">
        <div v-if="!cartExpand" class="plus-tag" :class="{aircle:total_count<100,zero:total_count<10}">{{total_count}}</div>
<!--        <layout-icon v-if="!cartExpand" size="23" type="iconicon_plus" color="#fff"></layout-icon>-->
        <layout-icon v-if="cartExpand" size="23" type="iconxingzhuang" color="#fff"></layout-icon>
      </div>

    </div>

  </div>
</template>
<script>
import BaseMixin from '@/mixins/BaseMixin'
import { Exception } from '@/common/Exception'
import { confirm, error, modal } from '@/common/fun'
import { getBizProdCateList, getProductDetail, getProductList } from '@/api/product'
import { checkIsLogin, mergeObject, numberSort } from '@/common/helper'
import { CartList as getCartList } from '@/api/customer'
import LayoutLayer from '@/components/layout-layer/layout-layer'
import LayoutIcon from '@/components/layout-icon/layout-icon'

const attrInfoTmpl = {
  Products_ID: 0,
  num: 0,
  attr_id: '', // 规格id
  attr_text: '',
  price: '', // 价格
  count: 0// 库存
}
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
export default {
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    LayoutLayer
  },
  data () {
    return {
      isUserLogin: false,
      storeBottomActionHeight: '0px',
      listExpand: false,
      cartExpand: false,
      cartExpandLoading: false,
      total_count: 0,
      total_price: 0,
      qty: 0,
      allCheck: false,
      animation: {},
      animationData: {},
      animationData2: {},

      oldQty: 0,
      pageSize: 999,
      cateIndex: 0,
      bizSearchKeyWord: '',

      bid: '',
      cateActiveIdx: 0,
      showList: [],
      CartList: [],
      product: {},
      check_attr: {},
      bizList: [],
      submitFlag: false,
      attrInfo: {
        Products_ID: 0,
        num: 0,
        attr_id: '', // 规格id
        attr_text: '',
        price: '', // 价格
        count: 0// 库存
      },
      isAjax: false,
      cateList: [
        {
          cate_name: '热销',
          id: '',
          finish: false,
          list: [],
          totalCount: 0,
          page: 1
        }
      ]
    }
  },
  methods: {
    async submit () {
      const obj = {}
      // 删除
      for (const row of this.carts) {
        const { biz_id, prod_id, attr_id } = row
        if (row.checked) {
          // 有需需要才创建
          if (!obj.hasOwnProperty(biz_id)) obj[biz_id] = {}
          if (!obj[biz_id].hasOwnProperty(prod_id)) obj[biz_id][prod_id] = []
          obj[biz_id][prod_id].push(attr_id)
        }
      }
      if (JSON.stringify(obj) === '{}') {
        error('请至少选择一个商品')
        return
      }
      const url = '/pages/order/OrderBooking?cart_key=CartList'
      this.$store.state.cart_buy = obj
      this.$linkTo(url)
    },
    refreshFn () {
      this.refreshInfoByIsLogin()
    },
    // 不然点击无法正常
    bindCartsPopClose () {
      this.listExpand = false
    },
    taggleCartListExpand () {
      if (this.listExpand) {
        this.$closePop('carts')
        this.listExpand = false
        return
      }
      if (!this.listExpand) {
        this.$openPop('carts')
        this.listExpand = true
      }
    },
    clearCart () {
      confirm({
        title: '操作确认',
        content: '该操作会清空购物车中当前商家商品，操作不可逆，确认继续操作？'
      }).then(() => {
        this.$store.dispatch('cart/removeGoods', { biz_id: this.bid }).then(() => {
          this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
          this.refreshCount()
          // 更新数量
          this.initCart()
        }).catch(() => {
        })
      }).catch(() => {
      })
    },
    // 单个商家
    async selectBiz () {
      await this.$store.dispatch('cart/taggleCheckStatus', { biz_id: Number(this.bid) })

      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
      this.refreshCount()
    },
    getQty (qty) {
      this.qty = qty
    },
    // 单行
    async selectItem (row) {
      const { prod_id, attr_id } = row
      await this.$store.dispatch('cart/taggleCheckStatus', {
        attr_id: Number(attr_id),
        prod_id: Number(prod_id)
      })
      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
      this.refreshCount()
    },
    async changeAttrNum (e, idx, row) {
      const amount = parseInt(e.detail.value)
      const qty = parseInt(this.qty)
      if (isNaN(amount)) {
        error('数量必须为数量')
        return
      }

      if (amount === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: row.prod_id,
          attr_id: row.attr_id
        })

        // 没有规格的商品，直接搞事,同步库存
        if (row.attr_id === 0) {
          // const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          // if (idx !== false) {
          //   this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
          // }
        }

        this.refreshCount()
        // 更新数量
        this.initCart()

        return
      }
      if (amount <= 1) {
        this.$set(row, 'num', qty)
        error('数量最少为1件')
        return
      }
      if ((qty - amount) === 0) return
      var num = amount - qty

      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        prod_id: row.prod_id,
        attr_id: row.attr_id
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num,
        product: { ...productInfo }
      })
      if (cart !== false) {
        // 没有规格的商品，直接搞事,同步库存
        if (row.attr_id === 0) {
          // const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          // if (idx !== false) {
          //   this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
          // }
        }
        this.refreshCount()
        // 更新数量
        this.initCart()
      } else {
        this.$set(row, 'num', qty)
      }
    },
    async attrNumMinus (row) {
      const num = row.num ? row.num - 1 : 0

      if (num === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: row.prod_id,
          attr_id: row.attr_id
        })

        // 没有规格的商品，直接搞事,同步库存
        if (row.attr_id === 0) {
          // const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          // if (idx !== false) {
          //   this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          // }
        }

        this.refreshCount()
        // 更新数量
        this.initCart()

        return
      }

      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        prod_id: row.prod_id,
        attr_id: row.attr_id
      }
      const cart = await this.$store.dispatch('cart/addNum', {
        num: -1,
        product: { ...productInfo }
      })
      if (cart !== false) {
        // 没有规格的商品，直接搞事,同步库存
        if (row.attr_id === 0) {
          // const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          // if (idx !== false) {
          //   this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          // }
        }

        this.refreshCount()
        // 更新数量
        this.initCart()
      }
    },
    async attrNumPlus (row) {
      const num = row.num ? row.num + 1 : 1
      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        prod_id: row.prod_id,
        attr_id: row.attr_id
      }
      const cart = await this.$store.dispatch('cart/addNum', {
        num: 1,
        product: { ...productInfo }
      })
      if (cart !== false) {
        // 没有规格的商品，直接搞事,同步库存
        if (row.attr_id === 0) {
          // const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          // if (idx !== false) {
          //   this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          // }
        }

        this.refreshCount()
        // 更新数量
        this.initCart()
      }
    },
    refreshCount () {
      this.total_count = this.$store.getters['cart/getTotalNum'](Number(this.bid))
      this.total_price = this.$store.getters['cart/getTotalMoney'](Number(this.bid))
      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
      
      // this.refreshShowListNum()
    },
    taggkeCartShow () {
      console.log(this.cartExpandLoading)
      // 不允许快速多次点击
      if (this.cartExpandLoading === true) return
      const duration = 600
      this.cartExpandLoading = true
      var animation = uni.createAnimation({
        duration,
        timingFunction: 'ease'
      })

      var animation2 = uni.createAnimation({
        duration,
        timingFunction: 'ease'
      })
      this.animation = animation

      if (this.cartExpand) {
        // 左右各是10px
        const wrapWidth = 50

        animation.width(wrapWidth).step()
        this.animationData = animation.export()

        animation2.opacity(0).step()
        this.animationData2 = animation2.export()

        this.cartExpand = false
        setTimeout(() => {
          this.cartExpandLoading = false
        }, duration)
        return
      }

      if (!this.cartExpand) {
        // 左右各是10px
        const wrapWidth = this.systemInfo.windowWidth - 20 * 2

        animation.width(wrapWidth).step()
        this.animationData = animation.export()

        animation2.opacity(1).step()
        this.animationData2 = animation2.export()

        this.cartExpand = true
        setTimeout(() => {
          this.cartExpandLoading = false
        }, duration)
      }
    },
    /**
     * 用来做登陆后的一些数据初始化，和其他数据分开，是为了如果登陆后可以刷新
     */
    async refreshInfoByIsLogin () {
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
      const attrList = []
      for (const biz_id in CartList) {
        for (const prod_id in CartList[biz_id]) {
          for (const attr_id in CartList[biz_id][prod_id]) {
            // 初始化为false，方便后面触发响应
            CartList[biz_id][prod_id][attr_id].checked = this.$store.getters['cart/getRowCheckStatus']({
              attr_id: Number(attr_id),
              prod_id: Number(prod_id)
            })

            const attr_value = CartList[biz_id][prod_id][attr_id]

            const { ImgPath, ProductsName, ProductsPriceX, ProductsPriceY, Qty, Productsattrstrval } = attr_value
            attrList.push({
              // ...attr_value,
              biz_id: Number(biz_id),
              prod_id: Number(prod_id),
              attr_id: Number(attr_id),
              attr_text: Productsattrstrval,
              checked: attr_value.checked, // 能保留上次的结果
              num: Number(Qty),
              pic: ImgPath,
              name: ProductsName,
              price_selling: Number(ProductsPriceX),
              price_market: Number(ProductsPriceY)
            })
          }
        }
      }
      this.carts = attrList // computed set
      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
      this.refreshCount()
    },
    async changeGoodsNum (e, biz_id, prod_id, attr_id, num, storeIsSaleTime) {
      const amount = parseInt(e.detail.value)

      const qty = parseInt(this.oldQty)
      if (isNaN(amount)) {
        error('数量必须为数量')
        return
      }

      if (amount === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: prod_id,
          attr_id: attr_id
        })
        this.$set(this.CartList[biz_id][prod_id][attr_id], 'Qty', amount)
        return
      }

      if (amount <= 1) {
        this.$set(this.CartList[biz_id][prod_id][attr_id], 'Qty', amount)
        error('数量不能小于0')
        return
      }
      if ((qty - amount) === 0) return
      var nums = amount - qty

      // 拼接一下
      const productInfo = {
        biz_id: biz_id,
        prod_id: prod_id,
        attr_id: attr_id
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num: nums,
        product: { ...productInfo }
      })
      if (cart !== false) {
        this.$set(this.CartList[biz_id][prod_id][attr_id], 'Qty', amount)
      }
    },
    toSearch () {
      this.$linkTo('/pages/search/result?biz_id=' + this.bid)
    },
    changeCate (index) {
      this.cateIndex = index
      this.cateList[this.cateActiveIdx].page = 1
      this.cateList[this.cateActiveIdx].list = []
      this.changeTab(this.cateActiveIdx)
    },
    toDetail (goodsInfo) {
      this.$linkTo('/pages/product/detail?prod_id=' + goodsInfo.Products_ID)
    },
    goCart () {
      this.$linkTo('/pages/order/ShoppingCart')
    },
    setActiveGoodsIdx (idx) {
      this.activeGoodsIdx = idx
    },
    async confirmAdd () {
      if (!this.submitFlag) return
      this.attrInfo.num++
      this.product.prod_id = this.product.Products_ID
  
      const pro = {
        ...this.product,
        ...this.attrInfo,
        attr_text: this.attrInfo.attr_text
      }
      const { ImgPath: pic, Products_PriceX: price_selling, Products_PriceY: price_market, Products_Name: name } = pro
      
      const cart = await this.$store.dispatch('cart/addNum', {
        product:{
          ...pro,
          checked:true,
          pic,
          price_selling,
          price_market,
          name
        },
        num: 1
      })
      if (!cart) {
        this.attrInfo.num = 0
      }
      if (cart !== false) {
        this.refreshCount()
        // 更新数量
        this.initCart()
      }

      // this.$closePop('attr')
    },
    selectAttr (index, i) {
      const value_index = index // 选择的属性值索引
      const attr_index = i // 选择的属性索引
      // 记录选择的属性
      const check_attr = Object.assign(this.check_attr, { [attr_index]: value_index }) // 记录选择的属性  attr_index外的[]必须
      // 属性处理
      let check_attrid = []
      const check_attrname = []
      let check_attrnames = []
      for (const i in check_attr) {
        var attr_id = check_attr[i]
        check_attrid.push(attr_id)
        check_attrname[attr_id] = i
      }
      // 数组排序  按从小到大排
      const check_attrid_arr = check_attrid
      check_attrid = numberSort(check_attrid)
      // 获取对应的属性名称
      for (let i = 0; i < check_attrid.length; i++) {
        const attr_id = check_attrid[i]
        const attr_name = check_attrname[attr_id]
        check_attrnames.push(attr_name + ':' + this.product.skujosn[attr_name][attr_id])
      }
      check_attrid = check_attrid.join(';')
      const attr_val = this.product.skuvaljosn[check_attrid] // 选择属性对应的属性值
      // 数组转化为字符串
      check_attrnames = check_attrnames.join(';')
      // 更改第一个规格显示图片
      for (const mbx in this.product.skuvaljosn) {
        const arr = mbx.split(';')
        if (arr[0] === index) {
          // this.imgIndex=index
          this.skuImg = this.product.skuvaljosn[mbx].Attr_Image
          break
        }
      }
      console.log(attr_val)
      // 属性判断
      if (attr_val) {
        this.attrInfo.Products_ID = attr_val.Products_ID
        this.attrInfo.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.attrInfo.attr_text = attr_val.Attr_Value_text
        this.attrInfo.count = attr_val.Property_count // 选择属性的库存
        this.attrInfo.price = attr_val.Attr_Price ? attr_val.Attr_Price : this.product.Products_PriceX // 选择属性的价格
        console.log('attrInfo', this.attrInfo)
        this.submitFlag = !(!this.check_attr)

        const atrr_id = attr_val.Product_Attr_ID
        const isCartHas = this.$store.getters['cart/getRow'](atrr_id)
        console.log(isCartHas, attr_val)
        // 如果已经存在
        if (isCartHas !== false) {
          this.attrInfo = mergeObject(this.attrInfo, isCartHas, true)
        } else {
          this.attrInfo.num = 0// 新增的时候，数量为0
        }
      } else {
        this.attrInfo = { ...attrInfoTmpl }
      }
      if (this.CartList[this.bid] && this.CartList[this.bid][this.attrInfo.Products_ID] && this.CartList[this.bid][this.attrInfo.Products_ID][this.attrInfo.attr_id]) {
        this.attrInfo.num = this.CartList[this.bid][this.attrInfo.Products_ID][this.attrInfo.attr_id].Qty
      }

      console.log(attr_val)
      // 判断属性库存
      if (attr_val && attr_val.Property_count <= 0) {
        this.submitFlag = false
        return false
      }
      this.check_attr = check_attr
      this.submitFlag = !((!this.check_attr || Object.keys(this.check_attr).length !== Object.keys(this.product.skujosn_new).length))

      // 购买数量处理  大于最高时赋值最高值
      if (this.attrInfo.num > this.attrInfo.count) {
        this.attrInfo.num = this.attrInfo.count
      }
    },
    async updateCartFn (biz_id, prod_id, attr_id, num, pro) {
      if (this.isAjax) return
      if (this.CartList[biz_id] && this.CartList[biz_id][prod_id] && this.CartList[biz_id][prod_id][attr_id] && this.CartList[biz_id][prod_id][attr_id].Qty === 1 && num <= 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: prod_id,
          attr_id: attr_id
        })

        // 没有规格的商品，直接搞事,同步库存
        if (attr_id === 0) {
          this.$set(this.CartList[biz_id][prod_id][attr_id], 'Qty', num)
        }
  
        this.refreshCount()
        return
      }

      this.isAjax = true
      console.log(pro)
      const { ImgPath: pic, Products_PriceX: price_selling, Products_PriceY: price_market, Products_Name: name } = pro
      // price_selling, price_market, name, pic,attr_text
      const product = {
        prod_id: Number(prod_id),
        attr_id: Number(attr_id),
        biz_id: Number(biz_id),
        checked: true,
        pic,
        price_selling,
        price_market,
        name
      }
      

      const cart = await this.$store.dispatch('cart/addNum', {
        product,
        num
      })
      if (cart !== false) {
        
        this.refreshCount()
        // 更新数量
        await this.initCart()
        // const { CartList } = cart
        // for (const biz_id in CartList) {
        //   for (const prod_id in CartList[biz_id]) {
        //     for (const attr_id in CartList[biz_id][prod_id]) {
        //       this.CartList[biz_id][prod_id][attr_id].Qty = CartList[biz_id][prod_id][attr_id].Qty
        //     }
        //   }
        // }
      }

      this.isAjax = false
    },
    async addNum () {
      if (this.isAjax) return
      this.isAjax = true
      if (this.attrInfo.num < this.attrInfo.count) {
        this.attrInfo.num = Number(this.attrInfo.num) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.attrInfo.num = this.attrInfo.count
      }
      this.product.prod_id = this.product.Products_ID
      const carts = await this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        num: 1
      })
      this.refreshCount()
      // 更新数量
      this.initCart()
      
      this.isAjax = false
    },
    async delNum () {
      if (this.isAjax) return
      this.isAjax = true
      if (this.attrInfo.num > 1) {
        this.attrInfo.num -= 1
        this.product.prod_id = this.product.Products_ID
        await this.$store.dispatch('cart/addNum', {
          product: { ...this.product, ...this.attrInfo },
          num: -1
        })
      } else {
        const cart = await this.$store.dispatch('cart/removeGoods', {
          prod_id: this.attrInfo.Products_ID,
          attr_id: this.attrInfo.attr_id
        })
        if (cart !== false) {
          this.$set(this.attrInfo, 'num', 0)
        }
      }
      this.refreshCount()
      // 更新数量
      this.initCart()
      this.isAjax = false
    },
    async changeNum (e) {
      const amount = parseInt(e.detail.value)

      const qty = parseInt(this.oldQty)
      if (isNaN(amount)) {
        error('数量必须为数量')
        return
      }

      if (amount === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: this.attrInfo.Products_ID,
          attr_id: this.attrInfo.attr_id
        })
        this.$set(this.attrInfo, 'num', amount)
        this.refreshCount()
        // 更新数量
        this.initCart()
        return
      }

      if (amount <= 1) {
        this.$set(this.attrInfo, 'num', amount)
        error('数量不能小于0')
        return
      }
      if ((qty - amount) === 0) return
      var nums = amount - qty

      // 拼接一下
      const productInfo = {
        biz_id: this.bid,
        prod_id: this.attrInfo.Products_ID,
        attr_id: this.attrInfo.attr_id
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num: nums,
        product: { ...productInfo }
      })
      this.refreshCount()
      // 更新数量
      this.initCart()
      if (cart !== false) {
        this.$set(this.attrInfo, 'num', amount)
      }
    },
    // 用户手动输入数量
    setCount (e) {
      const amount = parseInt(e.detail.value)
      if (this.attrInfo.num === amount) return
      const action = this.attrInfo.num > amount ? 'minus' : 'add'
      if (amount < 0) {
        this.attrInfo.num = 0
        error('至少购买一件')
        return
      }
      if (amount > this.attrInfo.count) {
        this.attrInfo.num = this.attrInfo.count
        error('购买数量不能超过库存量')
        return
      }

      // 实际也是加减的意思
      if (action === 'add') {
        this.product.prod_id = this.product.Products_ID
        this.$store.dispatch('cart/addNum', {
          product: { ...this.product, ...this.attrInfo },
          num: amount - this.attrInfo.num
        })
      }
      if (action === 'minus') {
        this.product.prod_id = this.product.Products_ID
        this.$store.dispatch('cart/addNum', {
          num: this.attrInfo.num - amount,
          product: { ...this.product, ...this.attrInfo }
        })
      }
    },
    async openAttrLayer (prod_id) {
      const goodsInfo = await getProductDetail({ prod_id }, {
        onlyData: true,
        tip: 'loading',
        mask: true
      }).catch(e => {
        throw Error(e.msg || '获取商品详情失败')
      })

      this.attrInfo = { ...attrInfoTmpl } // 重置
      this.check_attr = {}// 重置
      this.product = goodsInfo

      if (goodsInfo.skujosn) {
        let skujosn_new = []
        for (const i in goodsInfo.skujosn) {
          skujosn_new.push({
            sku: i,
            val: goodsInfo.skujosn[i]
          })
        }

        // 新增如果有手机的规格
        for (const i in goodsInfo.skujosn) {
          if (i === 'mobile_prod_attr_name') {
            skujosn_new = [{
              sku: i,
              val: goodsInfo.skujosn[i]
            }]
          }
        }
        // 结束

        this.product.skujosn_new = skujosn_new
        this.product.skuvaljosn = goodsInfo.skuvaljosn
      }
      this.$openPop('attr')
    },
    refreshShowListNum () {
      for (var idx in this.showList) {
        this.$set(this.showList[idx], 'num', this.$store.getters['delivery/getGoodsTotalById'](this.showList[idx].Products_ID))
      }
    },
    setCateActuveIdx (idx) {
      this.cateActiveIdx = idx
      this.changeTab(idx)
    },
    async changeTab (idx) {
      try {
        let { list = [], page = 1, id: biz_cate_id } = this.cateList[idx]
        const commParam = {
          biz_id: this.bid // 限定商家
        }
        if (this.cateList[idx].child && this.cateList[idx].child.length > 0) {
          biz_cate_id = this.cateList[idx].child[this.cateIndex].id
        }
        // 第一次
        if (list.length === 0 && page === 1) {
          const ret = await getProductList({
            pageSize: this.pageSize,
            biz_cate_id, // 如果点击的是热门，那么就是不传参数，获得所有
            ...commParam,
            page
          }).catch(e => {
            throw Error(e.msg || '获取商品列表失败')
          })
          const list = ret.data.map(goods => {
            return {
              ...goods,
              num: 0 // 不管有没有规格，都给数量。但是有规格的商品，数量仅仅作为展示而已
            }
          })
          this.$set(this.cateList[idx], 'list', list)
          this.$set(this.cateList[idx], 'page', page + 1)
          this.$set(this.cateList[idx], 'totalCount', ret.totalCount)
        }
        this.showList = this.cateList[idx].list
        // 每次都更新一下
        this.refreshShowListNum()
      } catch (e) {
        this.showList = []
      }
    },
    async _init_func () {
      try {
        const cateList = await getBizProdCateList({
          pageSize: 999,
          biz_id: this.bid
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商家自定义分类失败')
        })
        this.cateList = this.cateList.concat(cateList)

        this.changeTab(0)
      } catch (e) {
        Exception.handle(e)
      }
    },
    async initCart () {
      if (!this.$checkIsLogin(0)) return
      const cart = await getCartList({ cart_key: 'CartList' }, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        throw Error(e.msg || '获取购物车产品失败')
      })
      const { CartList, biz_list } = cart

      const bizList = {}
      for (var i in biz_list) {
        const key = parseInt(i)
        bizList[key] = Object.assign(biz_list[i], { isSaleTime: checkStoreStatus(biz_list[i]) })
      }

      this.$store.commit('cart/SET_BIZLIST', bizList)
      this.$set(this, 'bizList', bizList)

      for (const biz_id in CartList) {
        for (const prod_id in CartList[biz_id]) {
          for (const attr_id in CartList[biz_id][prod_id]) {
            // 初始化为false，方便后面触发响应
            CartList[biz_id][prod_id][attr_id].checked = this.$store.getters['cart/getRowCheckStatus']({
              attr_id: Number(attr_id),
              prod_id: Number(prod_id)
            })
            if (!this.bizList[biz_id].isSaleTime) {
              CartList[biz_id][prod_id][attr_id].checked = false
            }
            
          }
        }
      }

      this.$set(this, 'CartList', CartList)
    }

  },
  computed: {
    carts: {
      get () {
        return this.$store.getters['cart/getCartList'](this.bid)
      },
      set (val) {
        this.$store.commit('cart/ASYNC_DATA', val)
      }
    },
    totalNum () {
      return this.$store.getters['cart/getTotalNum'](this.bid)
    },
    totalPrice () {
      return this.$store.getters['cart/getTotalMoney'](this.bid)
    },
    totalPriceByMarket () {
      return this.$store.getters['cart/getTotalMoneyByMarket'](this.bid)
    }
  },
  onLoad (options) {
    if (!options.biz_id) {
      modal('店铺id缺失')
      return
    }
    this.bid = parseInt(options.biz_id)
    this._init_func()
  },
  onShow () {
    this.initCart()

    // 这个就不要等了吧
    if (checkIsLogin(0, 0)) {
      this.refreshInfoByIsLogin()
    }
  },
  onReady () {
    this.isUserLogin = checkIsLogin(0, 0)
  }
}
</script>
<style lang="scss" scoped>

  .mall-tabbar-wrap {
    position: fixed;
    z-index: 102;
    bottom: 25px;
    right: 20px;
    height: 50px;
    width: 50px;
    border-radius: 50px;
    background: #262626;
    overflow: hidden;
    display: flex;

    .user-btn {
      height: 50px;
      width: 50px;
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  
    .plus-tag {
    
      background-color: #FF0000;
      border-radius: 8px;
      font-size: 12px;
      color: #FFFFff;
      padding: 2px 6px;
      text-align: center;
      &.aircle {
        border-radius: 50%;
        padding: 0;
        width: 24px;
        height: 24px;
        line-height: 24px;
        &.zero{
          font-size: 14px;
        }
      }
    
    }
    
    .close-btn {
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .go-btn {
      height: 50px;
      width: 70px;
      text-align: center;
      line-height: 50px;
      color: #fff;
      background: #E64239;
      font-size: 14px;
    }

    .cart-box {
      flex: 1;
      display: flex;
      overflow: hidden;

      .total-info {
        flex: 1;
      }

    }

    .icon-box {
      position: relative;
      width: 50px;
      height: 50px;
      background: #666666;

      &.expand {
        background: #262626;
      }

      .cart-icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .tag {
        top: 6px;
        right: 4px;
        position: absolute;
        background-color: #FF0000;
        border-radius: 5px;
        font-size: 10px;
        color: #FFFFff;
        padding: 2px 4px;
        text-align: center;

        &.aircle {
          border-radius: 50%;
          padding: 0;
          width: 14px;
          height: 14px;
          line-height: 14px;
        }

      }
    }

  }

  .carts {
    &-action {
      height: 80rpx;
      padding: 0 20rpx 0 36rpx;
      border-bottom: 1px solid #EDEDED;

    }

    &-box {
      width: 750rpx;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    &-list {
      padding: 20rpx 20rpx 60rpx 0;
      width: 750rpx;
      box-sizing: border-box;
    }

    &-item {
      height: 160rpx;
      display: flex;
      align-items: center;

      .check-item {
        padding-left: 36rpx;
        padding-right: 22rpx;
      }

      &-cover {
        @include cover-img();
        width: 100rpx;
        height: 100rpx;
        border-radius: 5rpx;
        margin-right: 30rpx;
      }

      &-info {
        width: 500rpx;
        height: 160rpx;
        box-sizing: border-box;

        border-bottom: 1px solid #EDEDED;

        .title {
          font-size: 14px;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 480rpx;
        }

        .attr-text {
          font-size: 12px;
          color: #999;
          margin-top: 10rpx;
        }

        .actions {
          margin: 20rpx 0 0;
          height: 54rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

  .navigation-bar {
    position: relative;
    background-color: #F5F5F5;
    padding-left: 10px;
    box-sizing: border-box;

    .search-input {
      width: 160rpx;
      height: 56rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 10rpx;
      margin-left: 40rpx;
    }

    .navigation-title {
      color: #333333;
      font-size: 17px;
      margin-left: 70rpx;
    }

    .left-icon {

    }

    .title {
      text-align: center;
      font-size: 16px;
    }
  }

  .container {
    position: absolute;
    bottom: 0rpx;
    width: 750rpx;
    padding-top: 40rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .cate {
      width: 160rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      background: #F8F8F8;

      .cate-item {
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        padding: 0 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid #fff;
        font-size: 13px;
        color: #333;
        position: relative;

        .avtiveLine {
          display: none;
          width: 6rpx;
          height: 50rpx;
          background: rgba(230, 66, 57, 1);
          position: absolute;
          top: 24rpx;
          left: 0rpx;
        }

        &.active {
          background: #fff;
          color: #E64239;

          .avtiveLine {
            display: block !important;
          }
        }
      }
    }

    .list {
      width: 590rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      padding: 0rpx 20rpx 40rpx 20rpx;
      box-sizing: border-box;
      position: relative;

      .goods-item {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        height: 178rpx;
        margin-bottom: 60rpx;

        .cover {
          width: 178rpx;
          height: 178rpx;
          background: #f2f2f2;
          @include cover-img();
        }

        .info {
          flex: 1;
          padding-left: 20rpx;
          height: 178rpx;

          .title {
            font-size: 26rpx;
            width: 340rpx;
            height: 28rpx;
            line-height: 28rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            margin-bottom: 14rpx;
          }

          .title-money {
            /*width: 124rpx;*/
            padding: 0 18rpx;
            height: 44rpx;
            font-size: 22rpx;
            color: #E64239;
            text-align: center;
            line-height: 44rpx;
            background: rgba(255, 244, 244, 1);
            border-radius: 6rpx;
            margin-bottom: 16rpx;
          }

          .product-priceY {
            margin-left: 14rpx;
            color: #AAAAAA;
            text-decoration: line-through;
          }

          .number-all {
            height: 50rpx;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .action {
          .input-num {
            display: inline;
            width: 50rpx;
          }

          .btn-open-attr {
            background: #e64239;
            font-size: 10px;
            color: #fff;
            width: 110rpx;
            height: 38rpx;
            line-height: 38rpx;
            border-radius: 19rpx;
            text-align: center;
            position: relative;

            .goods-num-tag {
              position: absolute;
              right: -10px;
              top: -10px;
              background: $fun-red-color;
              border-radius: 50%;
              overflow: hidden;
              height: 20px;
              width: 20px;
              font-size: 10px;
              line-height: 20px;
              text-align: center;
            }
          }
        }
      }
    }
  }

  .attr-form-wrap {
    width: 660rpx;
    background: #fff;
    border-radius: 10rpx;

    .actions {
      display: flex;
      height: 90rpx;
      background: #EAEAEA;
      align-items: center;
      justify-content: space-between;
      padding: 0 30rpx;

      .confirm-btn {
        width: 145rpx;
        height: 50rpx;
        background: $fun-primary-color;
        text-align: center;
        line-height: 50rpx;
        border-radius: 5rpx;
        border: none;
        font-size: 12px;
        color: #fff;

        &.disabled {
          background: #999;
        }
      }
    }

    .attr-head {
      padding: 14px;
      text-align: center;
      position: relative;

      .close {
        position: absolute;
        right: 10px;
        top: 14;
      }
    }

    .form {

    }

    .cart-attr-box {
      padding-bottom: 15px;
      max-height: 400px;
      overflow-y: scroll;
    }

    .cartAttr {
      padding: 15px 15px 0;

      .sku-title {
        margin-bottom: 12px;
      }

      .sku-val-list {
        display: flex;
        flex-wrap: wrap;

        .sku-val-item {
          padding: 4px 6px;
          font-size: 12px;
          color: #888;
          border: 1px solid #999;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
          box-sizing: border-box;

          &.checked {
            border: 1px solid $fun-primary-color;
            color: $fun-primary-color;
            background: #E9FFF7;
          }
        }
      }
    }
  }

  .icon-wrap {
    position: fixed;
    width: 86rpx;
    height: 86rpx;
    border-radius: 50%;
    background-color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 50rpx;
    right: 12rpx;

    .tag {
      width: 30rpx;
      height: 30rpx;
      display: flex;
      background-color: #FF0000;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 11px;
      position: absolute;
      color: #FFFFff;
      top: 12rpx;
      right: 8rpx;
    }
  }

  .cate-second {
    height: 50rpx;
    width: 550rpx;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    overflow-x: scroll;

    &-item {
      width: fit-content;
      background-color: #F7F8F8;
      border-radius: 6rpx;
      height: 50rpx;
      padding: 0rpx 24rpx;
      font-size: 24rpx;
      color: #666666;
      text-align: center;
      line-height: 50rpx;
      margin-right: 14rpx;
    }

    .checkCate {
      background-color: #FFE9E8 !important;
    }
  }

  .search-text {
    font-style: 12px;
    color: #ADADAD;
    margin-left: 24rpx;
  }

  .cA {
    color: #AAAAAA;
  }
</style>
