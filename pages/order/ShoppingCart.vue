<template>
  <div>
    <div class="status-title">
    </div>
    <div style="width: 750rpx;height: 86rpx"></div>
    <div class="cart-title flex flex-vertical-c flex-justify-c fz-16 c3">
      <div>
        购物车
      </div>
      <div @click="isDel=!isDel" class="cart-title-right" v-if="!manage">
        {{isDel?'取消':'管理'}}
      </div>
    </div>

    <div class="content">
      <div class="cartbox" v-if="total_count>0">
        <div :key="index" class="order_msg" v-for="(biz,index) in CartList">
          <div class="biz_msg">
            <div @click="selectBiz(index)" class="item-cart">
              <layout-icon color="#F43131" size="20" type="iconicon-check" v-if="bizCheck[index]"></layout-icon>
              <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
            </div>
            <img :src="bizList[index].biz_logo" class="biz_logo" />
            <text class="biz_name">{{bizList[index].biz_name}}</text>
          </div>
          <block :key="ind" v-for="(proList,ind) in biz">
            <block>
              <div :key="indx" class="pro" v-for="(item,indx) in proList">
                <div @click="selectItem(index,ind,indx)" class="item-cart">
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
                      <span :class="item.Qty===1?'disabled':''" @click="updateCart(ind,indx,-1,index)" class="plus">-</span>
                      <input @blur="inputQty(ind,indx,$event,index,item.Qty)" @focus="getQty(item.Qty)" class="attr_num" min="1" type="number" v-model="item.Qty" />
                      <span @click="updateCart(ind,indx,1,index)" class="plus">+</span>
                    </span>
                  </div>
                </div>
              </div>
            </block>
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
        v-for="(item,idx) in proList"
        :key="idx"
        :prod_id="item.Products_ID"
        :pro_src="item.ImgPath"
        :pro_name="item.Products_Name"
        :pro_price="item.Products_PriceX"
        :pro_price_old="item.Products_PriceY"
      />

    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { CartList, DelCart } from '@/api/customer'
import { updateCart } from '@/api/order'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import Storage from '@/common/Storage'
import { getProductList } from '@/api/product'
import { error } from '@/common/fun'
import ProTag from '@/componets/pro-tag/pro-tag'
import { objTranslate } from '@/common/helper'

export default {
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    ProTag
  },
  data () {
    return {
      CartList: [],
      bizList: [],
      total_count: '',
      total_price: '',
      allCheck: false,
      bizCheck: {}, // 商家的选择
      totalPrice: 0, // 选中总计
      isDel: false,
      fan: false,
      qty: 0,
      proList: []
    }
  },
  computed: {
    manage () {
      return this.CartList.length === 0
    }
  },
  watch: {
    // CartList: {
    //   handler (newValue, oldValue) {
    //     console.log(oldValue, newValue, 'ss')
    //   },
    //   deep: true
    // }
  },
  methods: {
    gotoBuy () {
      this.$linkTo('/pages/search/result')
    },
    submit () {
      const obj = {}
      // 删除
      for (const i in this.CartList) {
        Storage.remove(i)
        obj[i] = {}
        for (const j in this.CartList[i]) {
          obj[i][j] = []
          for (const k in this.CartList[i][j]) {
            if (this.CartList[i][j][k].checked) {
              obj[i][j].push(k)
              Storage.remove(j + ';' + k)
            }
          }
        }
      }
      Storage.remove('allCheck')
      // const cart_buy = JSON.stringify(obj)
      const url = '/pages/order/OrderBooking?cart_key=CartList'
      this.$store.state.cart_buy = obj

      this.isDel = false
      this.$linkTo(url)
    },
    DelCart () {
      const obj = {}
      // 删除
      for (const i in this.CartList) {
        Storage.remove(i)
        obj[i] = {}
        for (const j in this.CartList[i]) {
          obj[i][j] = []
          for (const k in this.CartList[i][j]) {
            if (this.CartList[i][j][k].checked) {
              obj[i][j].push(k)
              Storage.remove(j + ';' + k)
            }
          }
        }
      }
      Storage.remove('allCheck')
      const data = {
        cart_key: 'CartList',
        prod_attr: JSON.stringify(obj)
      }
      DelCart(data).then(res => {
        this.init()
      }).catch(e => {
      })
    },
    getQty (qty) {
      this.qty = qty
    },
    inputQty (pid, attrId, e, bizId, qty) {
      const num = e.detail.value
      if (num <= 1) {
        this.CartList[bizId][pid][attrId].Qty = this.qty
        error('数量最少为1件')
        return
      }
      this.updateCart(pid, attrId, qty - num, bizId)
    },
    // 全选
    selectAll () {
      let boo = true
      if (this.allCheck) {
        boo = false
      }
      for (const i in this.CartList) {
        for (const j in this.CartList[i]) {
          for (const k in this.CartList[i][j]) {
            this.CartList[i][j][k].checked = boo
            Storage.set((j + ';' + k), boo)
          }
        }
      }

      for (const it in this.bizCheck) {
        this.bizCheck[it] = boo
        Storage.set(it, boo)
      }
      this.allCheck = boo
      Storage.set('allCheck', boo)

      this.SumPrice()
      this.fan = !this.fan
    },
    selectBiz (bizId) {
      const rt = !this.bizCheck[bizId]

      this.$set(this.bizCheck, bizId, rt)
      // this.bizCheck[bizId] = rt
      console.log(objTranslate(this.bizCheck))

      for (const it in this.bizCheck) {
        Storage.set(it, this.bizCheck[it])
      }

      for (var goods_idx in this.CartList[bizId]) {
        for (var sku_idx in this.CartList[bizId][goods_idx]) {
          console.log(bizId, goods_idx, sku_idx)
          // 把所有产品checked都为true
          Storage.set((goods_idx + ';' + sku_idx), rt)
          this.CartList[bizId][goods_idx][sku_idx].checked = rt
        }
      }
    },
    async updateCart (pid, attrId, skuQty, bizId) {
      if (this.CartList[bizId][pid][attrId].Qty === 1 && skuQty <= 0) {
        error('数量最少为1件')
        return
      }

      const data = {
        cart_key: 'CartList',
        prod_id: pid,
        attr_id: attrId,
        qty: skuQty
      }
      const cart = await updateCart(data, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        throw Error(e.msg || '修改失败')
      })
      this.total_count = cart.total_count
      this.total_price = cart.total_price
      this.CartList = cart.CartList
      this.bizList = cart.biz_list
      this.initCheck()
    },
    selectItem (bizId, pid, attr_id) {
      console.log(!Storage.get((pid + ';' + attr_id)), 'ss')

      Storage.set((pid + ';' + attr_id), !Storage.get((pid + ';' + attr_id)))
      this.CartList[bizId][pid][attr_id].checked = Storage.get((pid + ';' + attr_id))

      // 商家的选择
      this.bizCheck[bizId] = true

      for (const j in this.CartList[bizId]) {
        for (const k in this.CartList[bizId][j]) {
          if (!this.CartList[bizId][j][k].checked) {
            this.bizCheck[bizId] = false
          }
        }
      }

      for (const it in this.bizCheck) {
        Storage.set(it, this.bizCheck[it])
      }

      // 每次来改变全选
      this.allCheck = true
      for (const i in this.CartList) {
        for (const j in this.CartList[i]) {
          for (const k in this.CartList[i][j]) {
            if (!this.CartList[i][j][k].checked) {
              this.allCheck = false
            }
          }
        }
      }
      Storage.set('allCheck', this.allCheck)

      this.SumPrice()
      this.fan = !this.fan
    },
    // 初始化 选中状态
    initCheck () {
      this.allCheck = true
      for (const i in this.CartList) {
        const biz_check = Storage.get(i)
        const itemCheck = biz_check || false
        this.$set(this.bizCheck, i, itemCheck)
        for (const j in this.CartList[i]) {
          for (const k in this.CartList[i][j]) {
            const attr_id = Storage.get((j + ';' + k))
            this.CartList[i][j][k].checked = attr_id || false
            if (!this.CartList[i][j][k].checked) {
              this.allCheck = false
            }
          }
        }
      }
      const all = Storage.get('allCheck')
      this.allCheck = all || false
      this.SumPrice()
    },
    // 计算总价格
    SumPrice () {
      let total = 0
      this.totalPrice = 0
      for (const i in this.CartList) {
        for (const j in this.CartList[i]) {
          for (const k in this.CartList[i][j]) {
            const attr_id = Storage.get((j + ';' + k))
            const result = attr_id || false
            this.CartList[i][j][k].checked = result
            if (this.CartList[i][j][k].checked) {
              total += this.CartList[i][j][k].ProductsPriceX * this.CartList[i][j][k].Qty
            }
          }
        }
      }
      console.log(total, 'ss')
      this.totalPrice = Number(total).toFixed(2)
    },
    async init () {
      const cart = await CartList({ cart_key: 'CartList' }, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        throw Error(e.msg || '获取购物车产品失败')
      })
      this.total_count = cart.total_count
      this.total_price = cart.total_price
      this.CartList = cart.CartList
      this.bizList = cart.biz_list
      this.initCheck()

      this.proList = await getProductList({}, { onlyData: true }).catch(e => {
        throw Error(e.msg || '获取推荐商品信息失败')
      })
    }
  },
  onShow () {
    this.init()
  }

}
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #F8F8F8 !important;
    min-height: 100%;
    /* #ifdef APP-PLUS */
    //padding-top: var(--status-bar-height);
    /* #endif */
  }

  .status-title {
    height: var(--status-bar-height);
    width: 750rpx;
    background-color: #FFFFFF;
  }

  .cart-title {
    padding-top: var(--status-bar-height);
    height: 86rpx;
    width: 750rpx;
    background-color: #FFFFFF;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;

    &-right {
      position: absolute;
      bottom: 20rpx;
      left: 20rpx;
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
  }

  .biz_logo {
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
    border-radius: 35rpx;
  }

  .biz_name {
    font-size: 28rpx;
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
    bottom: 0;
  }

  // #endif
  // #ifdef APP-PLUS
  .checkout {
    bottom: 0;
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
    justify-content: space-around;
  }
</style>
