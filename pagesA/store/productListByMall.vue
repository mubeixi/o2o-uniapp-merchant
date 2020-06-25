<template>
  <div class="page-wrap">
          <div :style="{height:menuButtonInfo.bottom+10+'px'}"
               style="position: fixed;left: 0;top:0;width:750rpx;background-color: #f5f5f5">
            <!--状态栏-->
            <div :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}" class="status-bar"></div>
            <!--导航栏-->
            <div :style="{height:menuButtonInfo.bottom+10-menuButtonInfo.top+'px',backgroundColor:menuButtonBgColor}" class="navigation-bar flex flex-vertical-c">
              <layout-icon @click="$back" class="left-icon" color="#333" size="18"
                           type="iconicon-arrow-left"></layout-icon>
                  <div class="search-input">

                  </div>
                  <div class="navigation-title">全部商品</div>
            </div>
          </div>
          <div :style="{height:menuButtonInfo.bottom+10+'px'}"></div>
          <div class="container"  :style="{top:menuButtonInfo.bottom+10+'px'}">
            <div class="cate">
              <div :class="{active:cateActiveIdx===idx}" :key="idx" @click="setCateActuveIdx(idx)" class="cate-item"
                   v-for="(item,idx) in cateList">
                <block v-if="idx===0">
                  <layout-icon color="#FF0000" display="inline" type="iconicon-fire"></layout-icon>
                  <span class="p-l-4">{{item.cate_name}}</span>
                </block>
                <block v-else>{{item.cate_name}}</block>
              </div>

            </div>
            <scroll-view class="list" scroll-y="true">
              <div :key="idx" class="goods-item" v-for="(goods,idx) in showList">
                <div :style="{backgroundImage:'url('+$getDomain(goods.ImgPath)+')'}" @click="toDetail(goods)"
                     class="cover"></div>
                <div @click="toDetail(goods)" class="info">
                  <div class="title"><wzw-live-tag :room_id="goods.room_id" :product-info="goods" />{{goods.Products_Name}}</div>
                  <div class="fz-12 c9 p-t-6 p-b-6">销量：{{goods.Products_Sales}}</div>
                  <div><span class="price-selling fz-12">￥</span><span
                    class="price-selling fz-14">{{goods.Products_PriceX}}</span></div>
                </div>
                <div @click.stop="$noop" class="action m-r-10">
                  <div @click.stop="openAttrLayer(goods.Products_ID)" class="btn-open-attr m-r-10" v-if="goods.skujosn">
                    选规格
                    <div class="goods-num-tag" v-if="goods.num>0">{{goods.num}}</div>
                  </div>
                  <div @click="setActiveGoodsIdx(idx)" class="flex flex-vertical-c" v-else>
                    <block v-if="goods.num>0">
                      <layout-icon @click.stop="goodsNumMinus(goods)" color="#26C78D" size="24"
                                   type="iconicon-minus p-10"></layout-icon>
                      <input :value="goods.num" @input="changeGoodsNum" class="input-num text-center fz-12" />
                    </block>
                    <layout-icon @click.stop="goodsNumPlus(goods)" color="#26C78D" size="24"
                                 type="iconicon-plus p-10"></layout-icon>
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>

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
            <span class="c9 fz-12 p-l-4">
              {{attrInfo.attr_text}}
              </span>
          </block>
        </div>
        <div class="actions">
          <div class="flex1">

          </div>
          <div>
            <div :class="{disabled:!submitFlag}" @click="confirmAdd" class="confirm-btn" v-if="attrInfo.num<1">加入购物车
            </div>
            <div class="flex flex-vertical-c" style="width: 120px" v-else>
              <block v-if="attrInfo.num>0">
                <layout-icon @click.stop="delNum" color="#26C78D" size="24" type="iconicon-minus p-10"></layout-icon>
                <input @input="changeNum" class="input-num text-center fz-12" v-model="attrInfo.num" />
              </block>
              <layout-icon @click.stop="addNum" color="#26C78D" size="24" type="iconicon-plus p-10"></layout-icon>
            </div>
          </div>

        </div>
      </div>
    </layout-layer>

  </div>
</template>
<script>
import BaseMixin from '@/mixins/BaseMixin'
import { Exception } from '@/common/Exception'
import { error, modal } from '@/common/fun'
import { getBizProdCateList, getProductDetail, getProductList } from '@/api/product'
import { checkIsLogin, mergeObject, numberSort } from '@/common/helper'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { mapActions } from 'vuex'
const attrInfoTmpl = {
  num: 0,
  attr_id: '', // 规格id
  attr_text: '',
  price: '', // 价格
  count: 0// 库存
}
export default {
  mixins: [BaseMixin],
  components: { LayoutIcon, LayoutLayer },
  data () {
    return {
      bid: '',
      cateActiveIdx: 0,
      showList: [],
      product: {},
      submitFlag: false,
      attrInfo: {
        num: 0,
        attr_id: '', // 规格id
        attr_text: '',
        price: '', // 价格
        count: 0// 库存
      },
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
    ...mapActions({
    }),
    confirmAdd () {
      if (!this.submitFlag) return
      this.attrInfo.num++
      this.product.prod_id = this.product.Products_ID
      this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        num: 1
      })
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
    goodsNumMinus (goodsInfo) {
      const num = goodsInfo.num ? goodsInfo.num - 1 : 0
      this.$set(goodsInfo, 'num', num)
      this.$store.dispatch('cart/addNum', {
        product: { prod_id:goodsInfo.Products_ID,biz_id:goodsInfo.biz_id},
        num: -1
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
        count: goodsInfo.Products_Count,
      }
      this.$store.dispatch('cart/addNum', {
        product: { prod_id:goodsInfo.Products_ID,biz_id:goodsInfo.biz_id},
        num: 1
      })
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
      this.product.prod_id=this.product.Products_ID
      this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        num: 1
      })
    },
    delNum () {
      if (this.attrInfo.num > 0) {
        this.attrInfo.num -= 1
        this.product.prod_id=this.product.Products_ID
        this.$store.dispatch('cart/addNum', {
          product: { ...this.product, ...this.attrInfo },
          num: -1
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

      this.$store.commit('cart/SET_GOODS_NUM', {
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
        this.product.prod_id=this.product.Products_ID
        this.$store.dispatch('cart/addNum', {
          product: { ...this.product, ...this.attrInfo },
          num: amount - this.attrInfo.num
        })
      }
      if (action === 'minus') {

        this.product.prod_id=this.product.Products_ID
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
        const { list = [], page = 1, id: biz_cate_id } = this.cateList[idx]
        const commParam = {
          biz_id: this.bid // 限定商家
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
  created () {

  }
}
</script>
<style lang="scss" scoped>
  .navigation-bar {
    position: relative;
    background-color: #F5F5F5;
    padding-left: 10px;
    box-sizing: border-box;
    .search-input{
      width:160rpx;
      height:56rpx;
      background:rgba(255,255,255,1);
      border-radius:10rpx;
      margin-left: 40rpx;
    }
    .navigation-title{
      color:#333333;
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

</style>
