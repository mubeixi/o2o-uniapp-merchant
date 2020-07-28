<template>
  <view v-if="isShow">
    <layout-popup ref="productSku" :showPop="true" @maskClicked="closePro">
      <div class="cartSku" @touchmove.prevent.stop="noop">
        <div class="cartTop">
          <image class="image" @click="showImgDetal"
                 :src="imgShow?imgShow+'-r200':(list.Products_JSON.ImgPath[0]?list.Products_JSON.ImgPath[0]+'-r200':'')"></image>
          <div class="cartTitle">
            <div class="cartTitles">{{list.Products_Name}}</div>
            <div class="addInfo">
              <div class="addPrice">{{postData.price}}元</div>
              <div class="proSale">库存{{postData.count}}</div>
            </div>
          </div>
        </div>
        <div class="cartCenter">
          <div class="cartAttr" v-for="(item,i) of list.skujosn_new" :key="i">
            <div class="sku">
              {{item.sku=='mobile_prod_attr_name'?'规格':item.sku}}
            </div>
            <div class="skuValue" v-if="gift === 0">
              <div class="skuview" :class="check_attr[item.sku]==index?'skuCheck':''" @click="selectAttr(index,item.sku)"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
            </div>
            <div class="skuValue" v-else>
              <div class="skuview" :class="skuval[i]==index?'skuCheck':'unablechoose'"  v-for="(mbx,index) of item.val" :key="index">{{mbx}}</div>
            </div>
          </div>
        </div>
        <div class="numBer" v-if="gift === 0">
          <div class="numBers">
            数量
          </div>
          <div class="inputNumber">
            <div class="clicks" @click="delNum">-</div>
            <input class="inputq" type="number" v-model="postData.qty" @blur="setCount">
            <div class="clicks" @click="addNum">+</div>
          </div>
        </div>
        <div class="numBer" v-else>
          <div class="numBers">
            数量
          </div>
          <div class="inputNumber">
            <div class="clicks">-</div>
            <input class="inputq" type="number" value="1" disabled>
            <div class="clicks">+</div>
          </div>
        </div>
      </div>

      <div v-if="hasCart" class="skuBtn">
        <div class="sku-btn cart" @click="updaCart">
          加入购物车
        </div>
        <div class="sku-btn buyNow" @click="buyNow">
          直接购买
        </div>
      </div>
      <button v-else @click="submit" class="cartSub" :class="submitFlag?'':'disabled'">
        确定
      </button>
    </layout-popup>
  </view>
</template>

<script>

import layoutPopup from '@/componets/layout-popup/layout-popup.vue'
import { error } from '@/common/fun.js'
import { numberSort } from '@/common/helper'
import Storage from '@/common/Storage'

export default {
  components: { layoutPopup },
  props: {
    mode: {
      type: String,
      default: 'default'
    },
    hasCart: {
      type: Boolean,
      default: false
    },
    productInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    gift: {
      type: Number,
      default: 0
    }
  },
  watch: {
    productInfo: {
      deep: true,
      handler (newVal, oldVal) {
        console.log(newVal)
        this.list = newVal
        this.init()
      }
    }
  },
  data () {
    return {
      isShow: false,
      list: {}, // 商品数据
      imgShow: '',
      ind: '',
      submitFlag: false, // 是否可以提交
      postData: {
        qty: 1,
        id: '', // 规格id
        price: '', // 价格
        count: 0// 库存
      },
      check_attr: {}
    }
  },
  methods: {
    noop () {

    },
    showImgDetal () {
      const arr = []
      let str
      if (this.imgShow) {
        str = this.imgShow + '-r420'
      } else {
        str = this.list.Products_JSON.ImgPath[0] + '-r420'
      }
      arr.push(str)
      uni.previewImage({
        urls: arr,
        indicator: 'default',
        current: 0
      })
    },
    updaCart () {
      if (this.productInfo.skuvaljosn) {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }

      this.close()
      this.$emit('updaCart', this.postData)
    },
    submit () {
      if (this.productInfo.skuvaljosn) {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }
      this.close()
      console.log('pro')
      this.$emit('submitSure', this.postData)
    },
    buyNow () {
      console.log(this.productInfo.skuvaljosn, this.submitFlag)
      if (this.productInfo.skuvaljosn && JSON.stringify(this.productInfo.skuvaljosn) !== '{}') {
        if (!this.submitFlag) {
          uni.showToast({
            title: '请选择正确的规格和数量',
            icon: 'none'
          })
          return
        }
      }
      this.close()
      this.$emit('buyNow', this.postData)
    },
    skuSub () {
      if (!this.submitFlag) return
      this.close()
      this.$emit('sureSku', this.postData)
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
        check_attrnames.push(attr_name + ':' + this.list.skujosn[attr_name][attr_id])
      }
      check_attrid = check_attrid.join(';')
      const attr_val = this.list.skuvaljosn[check_attrid] // 选择属性对应的属性值
      // 数组转化为字符串
      check_attrnames = check_attrnames.join(';')
      // 更改第一个规格显示图片
      for (const mbx in this.list.skuvaljosn) {
        const arr = mbx.split(';')
        if (arr[0] === index) {
          // this.imgIndex=index
          this.skuImg = this.list.skuvaljosn[mbx].Attr_Image
          break
        }
      }

      // 属性判断
      if (attr_val) {
        console.log(attr_val, 'attr_val', this.productInfo)
        this.postData.id = attr_val.Product_Attr_ID // 选择属性的id
        this.postData.count = attr_val.Property_count // 选择属性的库存
        if (this.productInfo.active === 'pintuan') {
          this.postData.price = attr_val.pt_pricex ? attr_val.pt_pricex : this.list.Products_PriceX // 选择属性的价格
        } else {
          this.postData.price = attr_val.Attr_Price ? attr_val.Attr_Price : this.list.Products_PriceX // 选择属性的价格
        }

        this.submitFlag = !(!this.check_attr)
        // this.submitFlag = (!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length !== Object.getOwnPropertyNames(this.list.skujosn).length) ? false : true;
      }
      // 判断属性库存
      if (attr_val && attr_val.Property_count <= 0) {
        this.submitFlag = false
        return false
      }
      this.check_attr = {}
      this.check_attr = check_attr
      this.check_attrid_arr = check_attrid_arr
      this.submit_flag = !((!this.check_attr || Object.getOwnPropertyNames(this.check_attr).length !== Object.getOwnPropertyNames(this.list.skujosn).length))
      // 购买数量处理  大于最高时赋值最高值
      if (this.postData.qty > this.postData.count) {
        this.postData.qty = this.postData.count
      }

      Storage.set('value_index', value_index)
      Storage.set('attr_index', attr_index)
    },
    addNum () {
      if (this.postData.qty < this.postData.count) {
        this.postData.qty = Number(this.postData.qty) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none'
        })
        this.postData.qty = this.postData.count
      }
    },
    delNum () {
      if (this.postData.qty > 1) {
        this.postData.qty -= 1
      } else {
        uni.showToast({
          title: '购买数量不能小于1',
          icon: 'none'
        })
        this.postData.qty = 1
      }
    },
    // 用户手动输入数量
    setCount (e) {
      const amount = e.detail.value
      if (amount <= 0) {
        this.postData.qty = 1
        error('至少购买一件')
        return
      }
      if (amount > this.postData.count) {
        this.postData.qty = this.postData.count
        error('购买数量不能超过库存量')
      }
    },
    init () {
      this.postData.price = this.list.minPrice
      this.postData.count = this.list.Products_Count
      console.log(this.list.skujosn)
      if (this.list.skujosn) {
        let skujosn_new = []
        for (const i in this.list.skujosn) {
          skujosn_new.push({
            sku: i,
            val: this.list.skujosn[i]
          })
        }
        // 新增如果有手机的规格
        for (const i in this.list.skujosn) {
          if (i === 'mobile_prod_attr_name') {
            skujosn_new = [{
              sku: i,
              val: this.list.skujosn[i]
            }]
          }
        }
        // 结束

        this.submitFlag = false
        this.list.skujosn_new = skujosn_new
        this.list.skuvaljosn = this.list.skuvaljosn
      } else {
        // 没有规格就随意了
        this.submitFlag = true
      }
    },
    async show () {
      this.isShow = true
      await this.init()

      const value_index = Storage.get('value_index')
      const attr_index = Storage.get('attr_index')
      if (value_index && attr_index) {
        await this.selectAttr(value_index, attr_index)
      }
    },
    closePro () {
      this.submitFlag = false
      this.postData.id = ''
      this.check_attr = {}
      this.isShow = false
    },
    close () {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartSku {
    padding: 0rpx 20rpx;
    z-index: 100;

    .cartTop {
      position: relative;
      display: flex;
      padding-top: 20rpx;

      .image {
        width: 220rpx;
        height: 220rpx;
      }

      .cartTitle {
        margin-left: 20rpx;
        font-size: 32rpx;
        //width: 420rpx;
        flex: 1;

        .cartTitles {
          height: 80rpx;
          overflow: hidden;
          margin-top: 20rpx;
          line-height: 40rpx;
        }

        .addInfo {
          width: 450rpx;
          margin-top: 70rpx;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: flex-end;

          .addPrice {
            font-size: 42rpx;
            color: #ff4200;
          }

          .proSale {
            font-size: 24rpx;
            color: #999;
            justify-content: flex-end;
          }
        }
      }
    }

    .cartCenter {
      margin-top: 20rpx;
      max-height: 300px;
      overflow: scroll;

      .cartAttr {
        //display: flex;
        padding: 15rpx 0rpx;

        .sku {
          font-size: 28rpx;
          height: 70rpx;
          line-height: 70rpx;
          width: 140rpx;
          padding-left: 10px;
          margin-bottom: 5px;
        }

        .skuValue {
          display: flex;
          //flex:1;
          flex-wrap: wrap;

          .skuview {
            margin-bottom: 10px;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 14px;
            border-radius: 10rpx;
            color: #000;
            background-color: #F2F2F2;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 20rpx;
            //border: 1px solid #ccc;
          }

          .unablechoose {
            background: #ddd;
          }
        }
      }
    }

    .numBer {
      margin-top: 20rpx;
      display: flex;
      padding: 15rpx 0rpx;
      justify-content: space-between;

      .numBers {
        font-size: 28rpx;
        height: 70rpx;
        line-height: 70rpx;
        width: 140rpx;
      }

      .inputNumber {
        border: 1px solid #ccc;
        border-radius: 6rpx;
        height: 50rpx;
        //margin-right: 50rpx;
        display: flex;

        .inputq {
          color: black;
          margin: 0 auto;
          width: 80rpx;
          height: 50rpx;
          text-align: center;
          font-size: 24rpx;
          border-left: 2rpx solid #ccc;
          border-right: 2rpx solid #ccc;
        }

        .clicks {
          height: 50rpx;
          line-height: 50rpx;
          width: 60rpx;
          text-align: center;
        }
      }
    }
  }

  .cartSub {
    width: 100%;
    height: 90rpx;
    background-color: #F43131;
    font-size: 20px;
    line-height: 90rpx;
    text-align: center;
    color: #FFFFFF;
    margin-top: 30rpx;
    border-radius: 0;
    border: none;

    &.disabled {
      background: #999;
    }
  }

  .skuBtn {
    margin-top: 30rpx;
    width: 100%;
    display: flex;
    align-items: center;
    height: 90rpx;

    .sku-btn {
      flex: 1;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      font-size: 20px;
      color: #FFFFFF;
    }

    .disabled {
      background: #999 !important;
    }

    .cart {
      background: linear-gradient(to right, #f6ca44, #f19b38);
      /*border-bottom-left-radius: 375rpx;*/
      /*border-top-left-radius: 375rpx;*/
    }

    .buyNow {
      background: linear-gradient(to right, #ee7e30, #eb5928);
      /*border-bottom-right-radius: 375rpx;*/
      /*border-top-right-radius: 375rpx;*/
    }
  }

  .skuCheck {
    color: #fff !important;
    background-color: #ff4200 !important;
  }

</style>
