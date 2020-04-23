<style lang="scss" scoped>
  .page-wrap {
    background-color: #ffffff;
    width: 750rpx;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .end-time {
    width: 750rpx;
    height: 58rpx;
    line-height: 58rpx;
    padding-left: 22rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    background-color: #F2FFFA;
  }

  .end-time-block {
    width: 36rpx;
    height: 36rpx;
    background: rgba(68, 68, 68, 1);
    border-radius: 6rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 36rpx;
    display: inline-block;
    color: #ffffff;
    margin: 0px 4rpx;
  }

  .end-time-day {
    margin: 0px 4rpx;
  }

  .product-price {
    background-color: #ffffff;
    display: flex;
    height: 108rpx;
    width: 750rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    align-items: center;
    justify-content: space-between;
    color: #ABABAB;
  }

  .product-price-red {
    font-size: 20px;
    color: #F53636;
  }

  .product-price-right {
    width: 168rpx;
    height: 70rpx;
    position: relative;
  }

  .product-share {
    height: 20rpx;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 20rpx;
    position: absolute;
    top: 12rpx;
    left: 84rpx;
  }

  .product-title {
    width: 698rpx;
    line-height: 40rpx;
    height: 80rpx;
    padding: 0rpx 30rpx 0rpx 22rpx;
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .line-f8 {
    width: 750rpx;
    height: 20rpx;
    background: rgba(248, 248, 248, 1);
  }

  .full-img {
    width: 100% !important;
    height: 100% !important;
  }

  .product-price-share {
    font-size: 13px;
    height: 20rpx;
    line-height: 20rpx;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    bottom: 12rpx;
    left: 74rpx;

    .price-q {
      font-size: 10px;
    }
  }

  .product-activity {
    width: 750rpx;
    padding: 30rpx 20rpx 0rpx 20rpx;
    box-sizing: border-box;
  }

  .product-activity-title {
    width: 134rpx;
    height: 34rpx;
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 30rpx;
  }

  .activity-item {
    width: 104rpx;
    height: 34rpx;
    line-height: 34rpx;
    text-align: center;
    font-size: 9px;
    color: #21B37E;
    margin-right: 20rpx;
    position: relative;
  }

  .activity-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 104rpx;
    height: 34rpx
  }

  .activity-second {
    margin-top: 20rpx;

    .color-first {
      color: #1CA272;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      padding: 8rpx;
      background: rgba(235, 255, 248, 1);
      border-radius: 3px;
      margin-right: 16rpx;
      font-size: 10px;
    }

    .color-second {
      color: #333333;
      height: 22rpx;
      font-size: 22rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22rpx;
    }
  }

  .vip-img {
    width: 710rpx;
    margin: 0 auto;
    height: 96rpx;
  }

  .shouhou {
    width: 750rpx;
    box-sizing: border-box;
    height: 86rpx;
    padding: 30rpx 20rpx;
  }

  .shouhou-item {
    display: flex;
    height: 28rpx;
    align-items: center;
    color: #333333;
    font-size: 12px;
    line-height: 28rpx;
    margin-right: 36rpx;
  }

  .shouhou-img {
    width: 28rpx;
    height: 28rpx;
    margin-right: 10rpx
  }

  .store {
    position: sticky;
    z-index: 8;
    top: 0;
    width: 750rpx;
    background-color: #ffffff;
    height: 82rpx;
    box-sizing: border-box;
    padding: 26rpx 72rpx;
    justify-content: space-between;

    .li-item {
      width: 60rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      position: relative;
    }

    .color-store {
      color: #26C78D;
    }

    .active {
      width: 36rpx;
      height: 6rpx;
      background: #26C78D;
      border-radius: 3px;
      position: absolute;
      left: 12rpx;
      bottom: -24rpx;
    }
  }

  .tab-containers {
    border-top: 1px solid #f1f1f1;
  }

  .store-info {
    width: 750rpx;
    box-sizing: border-box;
    padding: 52rpx 20rpx 20rpx 30rpx;
  }

  .store-info-title {
    width: 540rpx;
    height: 30rpx;
    overflow: hidden;
    line-height: 30rpx;
    font-size: 30rpx;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 30rpx;
    margin-bottom: 24rpx;
  }

  .store-info-call {
    height: 28rpx;
    line-height: 28rpx;
    display: flex;
    font-size: 13px;
    color: #999999;
  }

  .store-list {
    width: 710rpx;
    margin: 0 auto;
    padding-top: 30rpx;
    padding-bottom: 10rpx;
  }

  .store-list-top {
    height: 32rpx;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
  }

  .block-div {
    background-color: #26C78D;
    width: 8rpx;
    height: 32rpx;
    margin-right: 16rpx;
    display: inline-block;
  }

  .store-list-item {
    width: 710rpx;
    padding: 30rpx 24rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEBEB;
  }

  .store-list-title {
    width: 600rpx;
    height: 28px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-bottom: 10rpx;
  }

  .isStickly {
    border-bottom: 1px solid #eee;
  }

  .store-list-address {
    width: 100%;
    box-sizing: border-box;
    padding-left: 2rpx;
    height: 34rpx;
    line-height: 34rpx;
    align-items: center;
  }

  .store-list-font {
    color: #999999;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
  }

  .store-su {
    width: 1px;
    height: 34rpx;
    background-color: #EBEBEB;
    margin: 0px 24rpx;
    display: inline-block;
  }

  .over {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  ul li {
    list-style: none;
  }

  .comment-box {
    border-top: 1px solid #f2f2f2;
    border-bottom: 1px solid #f2f2f2;
    padding: 30rpx 25rpx;
    background: white;

    .block-title {
      padding: 20px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .comment-list {

    }
  }

  .commtent-add {
    margin: 50rpx 25rpx;
    background: #F7F7F7;
    min-height: 150rpx;
    padding: 20rpx;

    .textarea {
      font-size: 14px;
      line-height: 1.4;

      &::placeholder {
        color: #999;
      }
    }
  }

  .wzw-goods-action {
    position: fixed;
    left: 0px;
    bottom: 0px;
    z-index: 10;
  }

</style>

<template>
  <div class="page-wrap">
    <swiper style="height:750rpx;width: 750rpx;" indicator-dots="true" indicator-active-color="#26C78D"
            indicator-color="#ffffff" autoplay="true" interval="3000" duration="500" circular="true">
      <swiper-item v-for="(item,index) of detailData.Products_JSON.ImgPath" :key="index">
        <image :src="item" class="full-img" />
      </swiper-item>
    </swiper>
    <div class="end-time">
      距结束还有：<span class="end-time-day">1天</span><span class="end-time-block">01</span>：<span
      class="end-time-block">01</span>：<span class="end-time-block">01</span>
    </div>
    <div class="product-price fz-14">
      <div class="product-price-left">
            <span class="product-price-red">
              <span class="fz-13">¥</span>{{detailData.Products_PriceX}}
            </span>
        <span style="text-decoration:line-through;" class="m-l-5">
              ¥{{detailData.Products_PriceY}}
            </span>
      </div>
      <div class="product-price-right" @click="toBooking">
        <image :src="'/static/client/product/product_share.png'|domain" class="full-img" style="width: 130% !important;"></image>
        <div class="product-share">
          分享赚
        </div>
        <div class="product-price-share">
          <span class="price-q">¥</span>
          28.90
        </div>
      </div>
    </div>
    <div class="product-title">
      {{detailData.Products_Name}}
    </div>
    <div class="line-f8" style="margin-top: 30rpx" v-if="active.length>0"></div>
    <div class="product-activity">
      <div class="flex" style="padding-bottom: 30rpx" v-if="active.length>0">
        <div class="product-activity-title">
          优惠活动
        </div>
        <div class="flex1">
          <div class="flex">
            <div class="activity-item" v-for="(item,index) of active" :key="index">
              <image :src="'/static/client/product/activity.png'|domain" class="activity-img"></image>
              满{{item.reach}}减{{item.award}}
            </div>
          </div>
          <!--          <div class="flex flex-vertical-center  activity-second">-->
          <!--            <div class="color-first">-->
          <!--              多买优惠-->
          <!--            </div>-->
          <!--            <div class="color-second">-->
          <!--              满2件打8.8折-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="flex flex-vertical-center  activity-second">-->
          <!--            <div class="color-first">-->
          <!--              多买优惠-->
          <!--            </div>-->
          <!--            <div class="color-second">-->
          <!--              满2件打8.8折-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>

      <div class="vip-img">
        <image :src="'/static/client/product/vip.png'|domain" class="full-img"></image>
      </div>

    </div>

    <!-- 服务保障   -->
    <div class="shouhou flex flex-vertical-center" v-if="detailData.Products_Promise.length>0">
      <div class="shouhou-item" v-for="(item,index) in detailData.Products_Promise" v-if="item.name" :key="index">
        <image :src="'/static/client/product/checked.png'|domain" class="shouhou-img"></image>
        {{item.name}}
      </div>

    </div>
    <div class="line-f8"></div>
    <!--  店铺信息  -->
    <ul class="store flex flex-vertical-center" id="tabs" :class="{isStickly:headTabSticky}">
      <li class="li-item" :class="{'color-store':tabIndex===0}" @click="tabIndex=0">
        介绍
        <span class="active" v-if="tabIndex==0"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===1}" @click="tabIndex=1">
        评价
        <span class="active" v-if="tabIndex==1"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===2}" @click="tabIndex=2">
        须知
        <span class="active" v-if="tabIndex==2"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===3}" @click="tabIndex=3">
        门店
        <span class="active" v-if="tabIndex==3"></span>
      </li>
    </ul>
    <swiper
      :current="tabIndex"
      :style="{height:(systemInfo.windowHeight+'px')}"
      @change="changeTabIndex"
      class="tab-containers"
    >
      <swiper-item class="tab-pages">
        <div :style="{height:(systemInfo.windowHeight+'px')}" class="over">
          <!--          <u-parse :content="detailData.Products_Description"></u-parse>-->
        </div>
      </swiper-item>
      <swiper-item class="tab-pages">

        <!--评论列表-->
        <div class="block comment-box over" v-if="comments.length>0" :style="{height:(systemInfo.windowHeight+'px')}">

          <div class="block-title">
            <div class="block-title-text">留言评论</div>
            <div class="block-title-more flex flex-vertical-center c9 fz-12">
              <span>查看全部</span>
              <icon class="iconright" type="iconright" size="14" color="#999"></icon>
            </div>
          </div>
          <div class="block-content">
            <div class="comment-list">
              <div v-for="(item,idx) in comments" :key="idx">
                <layout-comment :isLast="comments.length-1===idx" :comment="item"></layout-comment>
              </div>

            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item class="tab-pages">
        须知
      </swiper-item>
      <swiper-item class="tab-pages">
        <div :style="{height:(systemInfo.windowHeight+'px')}" class="over">
          <div class="store-info flex">
            <div style="width: 96rpx;height: 96rpx;margin-right: 28rpx">
              <image :src="store[0].biz_logo" class="full-img"></image>
            </div>
            <div v-if="store[0].biz_shop_name">
              <div class="store-info-title">
                {{store[0].biz_shop_name}}
              </div>
              <div class="store-info-call m-b-10">
                <layout-icon type="icontime" size="14" color="#999"></layout-icon>
                <span style="margin: 0rpx 26rpx 0rpx 16rpx"> {{store[0].biz_account}}</span>
                <layout-icon type="iconicon-phone" size="14" color="#26C78D"></layout-icon>
              </div>
              <div class="store-info-call">
                <layout-icon type="iconicon-address" size="14" color="#999"></layout-icon>
                <span style="margin: 0rpx 20rpx 0rpx 16rpx">{{store[0].area_address}}</span>
                <layout-icon type="iconicon-address" size="14" color="#26C78D"></layout-icon>
              </div>
            </div>
          </div>
          <div class="line-f8" style="height: 10rpx !important;"></div>
          <div class="store-list">
            <div class="flex flex-justify-between">
              <div class="store-list-top fz-15" style="color: #333333;font-weight: bold">
                <span class="block-div"></span>
                其他门店
              </div>
              <div class="store-list-top">
                {{storeList.length}}家
                <layout-icon type="iconicon-arrow-right" size="15" color="#999"></layout-icon>
              </div>
            </div>
            <div class="store-list-item" v-for="(st,ind) of storeList" :key="ind">
              <div class="store-list-title">
                {{st.biz_shop_name}}
              </div>
              <div class="flex flex-justify-between store-list-address">
                <div class="store-list-font">
                  {{st.area_address}}
                </div>
                <div class="flex flex-vertical-center">
                  <layout-icon type="iconicon-address" size="17" color="#26C78D"></layout-icon>
                  <span class="store-su"></span>
                  <layout-icon type="iconicon-phone" size="17" color="#26C78D"></layout-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <product-sku ref="mySku" @sureSku="save" :hasCart="hasCart" @updaCart="updaCart" @buyNow="buyNow"
                 :proList="detailData"></product-sku>
    <wzw-goods-action class="wzw-goods-action" @myPay="myPay" @allPay="allPay">
      <span slot="leftText">单买¥</span>
      <span slot="leftPrice">100.00</span>
      <span slot="rightText">拼团购¥</span>
      <span slot="rightPrice">100.00</span>
    </wzw-goods-action>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getProductDetail, getActiveInfo, getBizInfo, getStoreList } from '@/api/product'
import { getCommitList } from '@/api/common'
import ProductSku from '@/componets/product-sku/product-sku'
import { updateCart } from '@/api/order'
import { formatRichTextByUparseFn } from '@/common/filter'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import WzwGoodsAction from '@/componets/wzw-goods-action/wzw-goods-action'
import {
  showLoading, hideLoading
} from '@/common/fun'
import { checkIsLogin } from '@/common/helper'

export default {
  name: 'ProductDetail',
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    LayoutComment,
    ProductSku,
    WzwGoodsAction
  },
  data () {
    return {
      hasCart: false, // 是否有购物车
      tabIndex: 3,
      headTabSticky: false,
      prod_id: '1613', // 商品id
      detailData: {
        Products_JSON: {},
        Products_Promise: []
      }, // 商品数据
      active: [], // 满减活动列表
      store: [{ biz_go: '' }], // 门店
      storeList: [],
      comments: []
    }
  },
  onPageScroll (e) {
    const { scrollTop } = e
    console.log(scrollTop, this.headTabTop, 'ss')
    this.headTabSticky = scrollTop > this.headTabTop
  },
  methods: {
    async toBooking () {
      // try {
      //   showLoading()
      //   // HUAWEI Mate 30 Pro
      //   const postData = {
      //     prod_id: 877, // 产品ID  在 onLoad中赋值
      //     attr_id: 999, // 选择属性id
      //     count: 555, // 选择属性的库存
      //     qty: 1, // 购买数量
      //     cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
      //     productDetail_price: 11790
      //   }
      //   await updateCart(postData).catch(e => { throw Error(e.msg || '下单失败') })
      //   this.$linkTo('/pages/order/OrderBooking?cart_key=DirectBuy')
      // } catch (e) {
      //   this.$modal(e.message)
      // } finally {
      //   hideLoading()
      // }
    },
    myPay () {
      if (!checkIsLogin(1, 1)) return
      this.hasCart = true
      this.$refs.mySku.show()
    },
    allPay () {
      if (!checkIsLogin(1, 1)) return
      this.hasCart = false
      this.$refs.mySku.show()
    },
    async updaCart (sku) {
      // 加入购物车
      const data = {
        User_ID: '48',
        cart_key: 'CartList',
        prod_id: this.detailData.Products_ID,
        qty: sku.qty,
        attr_id: sku.id
      }
      const arr = await updateCart(data).catch(e => {
        throw Error(e.msg || '加入购物车失败')
      })
    },
    async buyNow (sku) {
      // console.log(sku)
      // 立即购买
      try {
        showLoading()
        // HUAWEI Mate 30 Pro

        // count: 553
        // id: 990
        // price: 11790
        // qty: 1
        const postData = {
          prod_id: this.prod_id, // 产品ID  在 onLoad中赋值
          attr_id: sku.id, // 选择属性id
          count: sku.count, // 选择属性的库存
          qty: sku.qty, // 购买数量
          cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          productDetail_price: sku.price
        }
        await updateCart(postData).catch(e => { throw Error(e.msg || '下单失败') })
        this.$linkTo('/pages/order/OrderBooking?cart_key=DirectBuy')
      } catch (e) {
        this.$modal(e.message)
      } finally {
        hideLoading()
      }
    },
    async getProductDetail () {
      try {
        const data = {
          prod_id: this.prod_id
        }
        this.detailData = await getProductDetail(data, {
          onlyData: true,
          tip: '加载中',
          mask: true
        }).catch(e => {
          throw Error(e.msg || '获取商品详情失败')
        })
        this.detailData.Products_Description = formatRichTextByUparseFn(this.detailData.Products_Description)

        this.store = await getBizInfo({ biz_id: this.detailData.biz_id }, {
          onlyData: true,
          tip: '加载中',
          mask: true
        }).catch(e => {
          throw Error(e.msg || '获取店铺信息失败')
        })
        this.comments = await getCommitList({
          biz_id: this.detailData.biz_id,
          pageSize: 3
        }, {
          onlyData: true,
          tip: '加载中',
          mask: true
        }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.storeList = await getStoreList({ biz_id: this.detailData.biz_id }, {
          onlyData: true,
          tip: '加载中',
          mask: true
        }).catch(e => {
          throw Error(e.msg || '获取店铺列表失败')
        })

        const res = await getActiveInfo({
          biz_id: this.detailData.biz_id,
          type: 'manjian'
        }, { onlyData: true }).catch(e => {
        })
        if (res != null && res.active_info) {
          this.active = res.active_info
        }

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery()
          query.select('#tabs').boundingClientRect()
          query.selectViewport().scrollOffset()
          query.exec((res) => {
            console.log(res, 'ss')
            this.headTabTop = res[0].top
          })
        })
      } catch (e) {
        this.$modal(e.message)
      }
    },
    changeTabIndex (event) {
      const { current, source } = event.detail
      this.tabIndex = current
    }
  },
  onShow () {
    this.getProductDetail()
  },
  onLoad (options) {
    this.prod_id = options.prod_id
  },
  onReady () {
    // const query = uni.createSelectorQuery().in(this)
    // query.select('#tabs').boundingClientRect(data => {
    //   console.log(data,"sss")
    //   this.headTabTop = data.top
    // }).exec();

  }
}
</script>
