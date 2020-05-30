<template>
  <div class="page-wrap"  @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div style="position: fixed;left: 0;top:0;width:750rpx;"
         :style="{height:menuButtonInfo.top+menuButtonInfo.height+'px'}">
      <!--状态栏-->
      <div class="status-bar" :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}"></div>
      <!--导航栏-->
      <div class="navigation-bar" :style="{height:menuButtonInfo.height+'px',backgroundColor:menuButtonBgColor}">
        <layout-icon color="#fff" @click="$back" class="left-icon" size="18"
                     type="iconicon-arrow-left"></layout-icon>
        <div class="title color-white" :style="{lineHeight:menuButtonInfo.height+'px'}">外卖</div>
      </div>
    </div>
    <div class="head" :style="{backgroundImage: 'url('+$getDomain('/static/client/delivery/desktop_top_bg.jpg')+')'}">
      <div :style="{height:menuButtonInfo.top+menuButtonInfo.height+15+'px'}"></div>
      <div class="store-info flex-vertical-c flex flex-justify-c">
        <image class="store-logo" :src="bizInfo.biz_logo"></image>
        <span class="store-title fz-16 p-l-8">{{bizInfo.biz_shop_name}}</span>
      </div>
    </div>
    <div class="bg-white" style="height: 60rpx;"></div>
    <div class="container">
      <div class="cate">
        <div v-for="(item,idx) in cateList" :key="idx" class="cate-item" :class="{active:cateActiveIdx===idx}"
             @click="setCateActuveIdx(idx)">
          <block v-if="idx===0">
            <layout-icon display="inline" type="iconicon-fire" color="#FF0000"></layout-icon>
            <span class="p-l-4">{{item.cate_name}}</span>
          </block>
          <block v-else>{{item.cate_name}}</block>
        </div>

      </div>
      <scroll-view scroll-y="true" class="list">
        <div class="goods-item" v-for="(goods,idx) in showList" :key="idx" >
          <div class="cover" @click="toDetail(goods)" :style="{backgroundImage:'url('+$getDomain(goods.ImgPath)+')'}"></div>
          <div class="info" @click="toDetail(goods)">
            <div class="title">{{goods.Products_Name}}</div>
            <div class="fz-12 c9 p-t-6 p-b-6">销量：{{goods.Products_Sales}}</div>
            <div><span class="price-selling fz-12">￥</span><span
              class="price-selling fz-14">{{goods.Products_PriceX}}</span></div>
          </div>
          <div class="action m-r-10" @click.stop="$noop">
            <div class="btn-open-attr m-r-10" @click.stop="openAttrLayer(goods.Products_ID)" v-if="goods.skujosn">
              选规格
              <div class="goods-num-tag" v-if="goods.num>0">{{goods.num}}</div>
            </div>
            <div v-else class="flex flex-vertical-c" @click="setActiveGoodsIdx(idx)">
              <block v-if="goods.num>0">
                <layout-icon @click.stop="goodsNumMinus(goods)" size="24" color="#26C78D" type="iconicon-minus p-10"></layout-icon>
                <input :value="goods.num" @input="changeGoodsNum" class="input-num text-center fz-12" />
              </block>
              <layout-icon @click.stop="goodsNumPlus(goods)" size="24" color="#26C78D" type="iconicon-plus p-10"></layout-icon>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="goods-bottom-action">
      <div class="cart">
        <div class="icon-wrap" @click="$openPop('carts')">
          <layout-icon class="cart-icon" size="18" color="#fff" type="iconicon-cart"></layout-icon>
          <div class="tag">{{totalNum}}</div>
        </div>
      </div>
      <div class="box">
        <div class="prompt">￥{{totalPrice}}</div>
        <div class="buy" @click="buyNow">
          <block v-if="totalPrice>bizInfo.city_express_config.limit_config.start_send_money">下单</block>
          <block v-else>
            ￥{{bizInfo.city_express_config.limit_config.start_send_money}}元起送
          </block>
        </div>
      </div>
    </div>

    <layout-layer ref="carts" radius="20rpx" positions="bottom" bottomStr="85rpx">
      <div class="carts-box" :style="{height:systemInfo.windowHeight*0.6+'px'}">
        <div class="carts-list">
          <div class="carts-item" v-for="(row,idx) in carts" :key="idx">
            <div class="carts-item-cover" :style="{backgroundImage:'url('+row.ImgPath+')'}"></div>
            <div class="carts-item-info">
              <div class="title">{{row.Products_Name}}</div>
              <div class="attr-text">{{row.attr_text}}</div>
              <div class="actions">
                <div class="price-box fz-12 flex1">
                  <span class="price-selling">￥</span><span
                  class="price-selling fz-14">{{row.Products_PriceX}}</span><span
                  class="p-l-4 price-market text-through">￥{{row.Products_PriceY}}</span>
                </div>
                <div style="width: 120px" class="action flex flex-vertical-c" @click="setActiveAttrIdx(idx)">
                  <block v-if="row.num>0">
                    <layout-icon @click.stop="attrNumMinus(row)" size="24" color="#26C78D" type="iconicon-minus p-10"></layout-icon>
                    <input @input="changeAttrNum" :value="row.num" class="input-num text-center fz-12" />
                  </block>
                  <layout-icon @click.stop="attrNumPlus(row)" size="24" color="#26C78D" type="iconicon-plus p-10"></layout-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </layout-layer>

    <layout-layer ref="attr" positions="center">
      <div class="attr-form-wrap">
        <div class="attr-head">
          <span class="title">{{product.Products_Name}}</span>
          <layout-icon @click="$closePop('attr')" class="close" type="icondelete"></layout-icon>
        </div>
        <div class="form cart-attr-box">
          <div class="cartAttr" v-for="(item,i) of product.skujosn_new" :key="i">
            <div class="sku-title c3">{{item.sku==='mobile_prod_attr_name'?'规格':item.sku}}</div>
            <div class="sku-val-list">
              <div
                class="sku-val-item"
                :class="check_attr[item.sku]==index?'checked':''"
                @click="selectAttr(index,item.sku)"
                v-for="(text,index) of item.val"
                :key="index"
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
            <span class="c9 fz-12 p-l-4">
              {{attrInfo.attr_text}}
              </span>
          </block>
        </div>
        <div class="actions">
          <div class="flex1">

          </div>
          <div>
            <div v-if="attrInfo.num<1" @click="confirmAdd" class="confirm-btn" :class="{disabled:!submitFlag}">加入购物车
            </div>
            <div v-else class="flex flex-vertical-c" style="width: 120px">
              <block v-if="attrInfo.num>0">
                <layout-icon @click.stop="delNum" size="24" color="#26C78D" type="iconicon-minus p-10"></layout-icon>
                <input @input="changeNum" v-model="attrInfo.num" class="input-num text-center fz-12" />
              </block>
              <layout-icon @click.stop="addNum" size="24" color="#26C78D" type="iconicon-plus p-10"></layout-icon>
            </div>
          </div>

        </div>
      </div>
    </layout-layer>

  </div>

</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { getBizProdCateList, getProductDetail, getProductList } from '@/api/product'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import { error, modal } from '@/common/fun'
import { Exception } from '@/common/Exception'
import { getBizInfo } from '@/api/store'
import { mergeObject, numberSort, checkIsLogin, findArrayIdx } from '@/common/helper'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
const attrInfoTmpl = {
  num: 0,
  attr_id: '', // 规格id
  attr_text: '',
  price: '', // 价格
  count: 0// 库存
}
export default {
  name: 'DeliveryDesktop',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutLayer,
    LayoutIcon
  },
  data () {
    return {
      activeAttrIdx: 0,
      activeGoodsIdx: 0,
      skujosn_new: null,
      skuvaljosn: null,
      check_attr: {},
      submitFlag: false,
      attrInfo: {
        num: 0,
        attr_id: '', // 规格id
        attr_text: '',
        price: '', // 价格
        count: 0// 库存
      },
      product: {},
      bid: null,
      bizInfo: {},
      cateActiveIdx: 0,
      showList: [],
      pageSize: 999,
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
  computed: {
    totalNum () {
      return this.$store.getters['delivery/getTotalNum'](this.bid)
    },
    totalPrice () {
      return this.$store.getters['delivery/getTotalMoney'](this.bid)
    },
    carts () {
      return this.$store.getters['delivery/getCartList'](this.bid)
    }
  },
  watch: {
    carts: {
      deep: true,
      handler (list) {
        this.refreshShowListNum()
      }
    }
    // cateActiveIdx: {
    //   immediate: true,
    //   handler(val){
    //     console.log(val)
    //     this.changeTab(val)
    //   }
    // }
  },
  methods: {
    refreshShowListNum () {
      for (var idx in this.showList) {
        this.$set(this.showList[idx], 'num', this.$store.getters['delivery/getGoodsTotalById'](this.showList[idx].Products_ID))
      }
      // for (const row of this.carts) {
      //   const { Products_ID } = row
      //   const chagneProductIndex = findArrayIdx(this.showList, { Products_ID })
      //   console.log(chagneProductIndex)
      //   if (this.showList.length > 0 && chagneProductIndex !== false) {
      //     const oldNum = this.showList[chagneProductIndex].num
      //     this.$set(this.showList[chagneProductIndex], 'num', oldNum + row.num)
      //   }
      // }
    },
    buyNow () {
      if (!checkIsLogin(1, 1)) return
      if (this.totalPrice > 0 && this.totalPrice > this.bizInfo.city_express_config.limit_config.start_send_money) {
        this.$linkTo('/pages/order/OrderBooking?cart_key=waimai&biz_id=' + this.bid)
      } else {
        modal('未达到配送价')
      }
    },
    setActiveGoodsIdx (idx) {
      this.activeGoodsIdx = idx
    },
    setActiveAttrIdx (idx) {
      this.activeAttrIdx = idx
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
        this.attrInfo.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.attrInfo.attr_text = attr_val.Attr_Value_text
        this.attrInfo.count = attr_val.Property_count // 选择属性的库存
        this.attrInfo.price = attr_val.Attr_Price ? attr_val.Attr_Price : this.product.Products_PriceX // 选择属性的价格

        this.submitFlag = !(!this.check_attr)

        const atrr_id = attr_val.Product_Attr_ID
        const isCartHas = this.$store.getters['delivery/getRow'](atrr_id)
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
    addNum () {
      if (this.attrInfo.num < this.attrInfo.count) {
        this.attrInfo.num = Number(this.attrInfo.num) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.attrInfo.num = this.attrInfo.count
      }

      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...this.product, ...this.attrInfo }
      })
    },
    delNum () {
      if (this.attrInfo.num > 0) {
        this.attrInfo.num -= 1

        this.$store.commit('delivery/MINUS_GOODS', {
          num: 1,
          product: { attr_id: this.attrInfo.attr_id }
        })
      } else {
        uni.showToast({
          title: '购买数量不能小于0',
          icon: 'none'
        })
        // this.attrInfo.num = 0
      }
    },
    changeNum (e) {
      let amount = parseInt(e.detail.value)
      const currentAttrInfo = this.attrInfo
      if (currentAttrInfo.num === amount) return
      if (amount < 0) {
        amount = currentAttrInfo.num
        error('至少购买一件')
      }
      if (amount > currentAttrInfo.count) {
        amount = currentAttrInfo.count
        error('购买数量不能超过库存量')
      }

      this.$store.commit('delivery/SET_GOODS_NUM', {
        num: amount,
        product: { attr_id: currentAttrInfo.attr_id }
      })
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
        this.$store.commit('delivery/ADD_GOODS', {
          num: amount - this.attrInfo.num,
          product: { ...this.product, ...this.attrInfo }
        })
      }
      if (action === 'minus') {
        this.$store.commit('delivery/MINUS_GOODS', {
          num: this.attrInfo.num - amount,
          product: { ...this.product, ...this.attrInfo }
        })
      }
    },
    toDetail (goodsInfo) {
      this.$linkTo('/pagesA/delivery/detail?bid=' + this.bid + '&prod_id=' + goodsInfo.Products_ID)
    },
    attrNumMinus (attr) {
      console.log(attr)
      this.$store.commit('delivery/MINUS_GOODS', {
        num: 1,
        product: { attr_id: attr.attr_id }
      })
    },
    attrNumPlus (attr) {
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { attr_id: attr.attr_id }
      })
    },
    changeAttrNum (e) {
      let amount = parseInt(e.detail.value)
      const currentAttrInfo = this.carts[this.activeAttrIdx]
      if (currentAttrInfo.num === amount) return
      if (amount < 0) {
        amount = currentAttrInfo.num
        error('至少购买一件')
      }
      if (amount > currentAttrInfo.count) {
        amount = currentAttrInfo.count
        error('购买数量不能超过库存量')
      }

      this.$store.commit('delivery/SET_GOODS_NUM', {
        num: amount,
        product: { attr_id: currentAttrInfo.attr_id }
      })
    },
    // 商品是没有规格的，所以同意用noattr_xxx，加上商品id来标识attr_id.
    goodsNumMinus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num - 1 : 0
      this.$set(goodsInfo, 'num', num)
      this.$store.commit('delivery/MINUS_GOODS', {
        num: 1,
        product: { attr_id: 'noattr_' + goodsInfo.Products_ID }
      })
    },
    goodsNumPlus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num + 1 : 1
      this.$set(goodsInfo, 'num', num)

      // const attrInfoTmpl = {
      //   num: 0,
      //   attr_id: '', // 规格id
      //   attr_text: '',
      //   price: '', // 价格
      //   count: 0// 库存
      // }
      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        attr_id: 'noattr_' + goodsInfo.Products_ID,
        attr_text: '无规格',
        price: goodsInfo.Products_PriceX,
        count: goodsInfo.Products_Count
      }
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...goodsInfo, ...productInfo }
      })
    },
    changeGoodsNum (e) {
      let amount = parseInt(e.detail.value)
      const currentGoods = this.showList[this.activeGoodsIdx]
      if (currentGoods.num === amount) return
      if (amount < 0) {
        amount = currentGoods.num
        error('至少购买一件')
      }
      if (amount > currentGoods.count) {
        amount = currentGoods.count
        error('购买数量不能超过库存量')
      }

      this.$store.commit('delivery/SET_GOODS_NUM', {
        num: amount,
        product: { attr_id: 'noattr_' + currentGoods.Products_ID }
      })
    },

    confirmAdd () {
      if (!this.submitFlag) return
      this.attrInfo.num++
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...this.product, ...this.attrInfo }
      })
      // this.$closePop('attr')
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
    setCateActuveIdx (idx) {
      this.cateActiveIdx = idx
      this.changeTab(idx)
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

        this.bizInfo = await getBizInfo({ biz_id: this.bid }).then(res => {
          return res.data[0]
        }).catch(e => {
          throw Error(e.msg || '获取店铺信息失败')
        })
      } catch (e) {
        Exception.handle(e)
      }
    },
    async changeTab (idx) {
      try {
        const { list = [], page = 1, id: biz_cate_id } = this.cateList[idx]
        const commParam = {
          biz_id: this.bid, // 限定商家
          is_waimai: 1// 外卖
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
    }
    // async loadGoods () {
    //   try {
    //     const newData = await getProductList({ pageSize: 999 }, { onlyData: true }).catch(e => { throw Error(e.msg || '获取商品列表失败') })
    //     this.showList = newData
    //   } catch (e) {
    //     this.showList = []
    //   }
    // }
  },
  onLoad (options) {
    if (!options.bid) {
      modal('店铺id缺失')
      return
    }
    this.bid = options.bid
    this._init_func()
  },
  created () {

  }
}
</script>
<style lang="scss" scoped>

  .carts {
    &-box {
      width: 750rpx;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    &-list {
      padding: 30rpx 30rpx 60rpx;
      width: 750rpx;
      box-sizing: border-box;
    }

    &-item {
      height: 186rpx;
      display: flex;
      align-items: center;

      &-cover {
        @include cover-img();
        width: 122rpx;
        height: 122rpx;
        border-radius: 4rpx;
        margin-right: 22rpx;
      }

      &-info {
        width: 546rpx;

        .title {
          font-size: 16px;
          color: #333;
        }

        .attr-text {
          font-size: 12px;
          color: #999;
          margin-top: 10rpx;
        }

        .actions {
          margin: 18rpx 0;
          height: 54rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }

  .goods-bottom-action {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 95rpx;
    color: #fff;
    font-size: 12px;
    z-index: 103;

    .cart {
      position: absolute;
      top: -8rpx;
      left: 48rpx;
      width: 85rpx;
      height: 85rpx;
      border-radius: 50%;
      overflow: hidden;
      background: #5B5B5B;
      z-index: 4;

      .icon-wrap {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .tag {
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

    .box {
      position: absolute;
      bottom: 0;
      width: 750rpx;

      background: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;

      .prompt {
        flex: 1;
        padding-left: 158rpx;
      }

      .buy {
        width: 200rpx;
        background: $fun-primary-color;
        height: 85rpx;
        line-height: 85rpx;
        text-align: center;

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

  .navigation-bar {
    position: relative;

    .left-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .title {
      text-align: center;
      font-size: 16px;
    }
  }

  .head {
    background-color: #fff;
    height: 280rpx;
    @include cover-img();
  }

  .store-info {

    .store-logo {
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    .store-title {
      color: #fff;
    }

  }

  .container {
    position: fixed;
    top: 340rpx;
    bottom: 85rpx;
    width: 750rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .cate {
      width: 150rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      background: #F8F8F8;

      .cate-item {
        height: 38px;
        line-height: 38px;
        text-align: center;
        padding: 0 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid #fff;
        font-size: 14px;
        color: #333;

        &.active {
          background: #fff;
        }
      }
    }

    .list {
      width: 585rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;

      .goods-item {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        border-bottom: 1px solid #E1E1E1;

        .cover {
          width: 118rpx;
          height: 118rpx;
          background: #f2f2f2;
          @include cover-img();
        }

        .info {
          flex: 1;
          padding-left: 20rpx;

          .title {
            font-size: 13px;
            color: #333;
          }
        }

        .action {
          .input-num {
            display: inline;
            width: 50rpx;
          }

          .btn-open-attr {
            background: $fun-primary-color;
            font-size: 10px;
            color: #fff;
            width: 110rpx;
            height: 38rpx;
            line-height: 38rpx;
            border-radius: 19rpx;
            text-align: center;
            position: relative;
            .goods-num-tag{
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
</style>
