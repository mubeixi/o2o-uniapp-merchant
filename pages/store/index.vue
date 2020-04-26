<template>
  <div class="page-wrap">

    <div class="store-info">
      <div class="base">
        <div class="logo"
             :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}"></div>
        <div class="title">{{storeInfo.biz_shop_name}}</div>
      </div>
      <div class="actions">
        <div class="action-item">
          <layout-icon size="26" type="iconicon-address" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item">
          <layout-icon size="26" type="iconicon-phone" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item">
          <layout-icon size="26" type="iconicon-favorite" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item">
          <layout-icon size="26" type="iconicon-timeline" color="#26C78D"></layout-icon>
        </div>
        <div class="action-item">
          <layout-icon size="26" type="iconicon-share" color="#26C78D"></layout-icon>
        </div>
        <!--        <image mode="widthFix" class="action-item" src="/static/store/address.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/phone.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/favorite.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/timeline.png"></image>-->
        <!--        <image mode="widthFix" class="action-item" src="/static/store/share.png"></image>-->
      </div>
    </div>
    <!--占位-->
    <div style="height:15px;border-top-right-radius: 15px;border-top-left-radius: 15px;background: white;"></div>
    <div class="head" :class="{isStickly:headTabSticky}" id="stickyTab">
      <ul class="tab-box sticky">
        <li @click="headTabIndex=0" class="tab-item" :class="{active:headTabIndex === 0}">首页<span
          v-if="headTabIndex === 0" class="underline"></span></li>
        <li @click="headTabIndex=1" class="tab-item" :class="{active:headTabIndex === 1}">介绍<span
          v-if="headTabIndex === 1" class="underline"></span></li>
        <li @click="headTabIndex=2" class="tab-item" :class="{active:headTabIndex === 2}">相册<span
          v-if="headTabIndex === 2" class="underline"></span></li>
        <li @click="headTabIndex=3" class="tab-item" :class="{active:headTabIndex === 3}">门店<span
          v-if="headTabIndex === 3" class="underline"></span></li>
        <li @click="headTabIndex=4" class="tab-item" :class="{active:headTabIndex === 4}">点评<span
          v-if="headTabIndex === 4" class="underline"></span></li>
      </ul>
    </div>
    <!--  占位-->
    <!--    <div class="h50 bg-white" v-if="headTabSticky"></div>-->

    <swiper
      :current="headTabIndex"
      @change="indexChangeEvent"
      class="tab-container"
      :style="{height:childSwiperHeight}">
      <swiper-item class="tab-page">
        <div id="scrollView1" class="tab-page-wrap">

          <!--优惠券-->
          <scroll-view class="coupon-section" scroll-x>
            <div class="coupon-item" v-for="(coupon,idx) in couponList" :key="idx">
              <div class="containier">
                <div class="price">
                  <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
                  <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                </div>
                <div class="info">
                  <span class="condition">满{{coupon.Coupon_Condition}}元可使用</span>
                  <span class="use-end-item">有效期至{{coupon.Coupon_EndTime|formatTime('YYYY.mm.dd')}}</span>
                </div>
              </div>
            </div>
          </scroll-view>

          <!--限时抢购-->
          <div class="activity-list">
            <div class="activity-item" v-for="(item,idx) in activityList" :key="idx">{{item.name}}</div>
          </div>

          <!--便捷操作-->
          <div class="feature-list">
            <image mode="scaleToFill" class="feature-item" :src="'/static/client/store/send.png'|domain"></image>
            <image mode="scaleToFill" class="feature-item" :src="'/static/client/store/pay.png'|domain"></image>
            <image mode="scaleToFill" class="feature-item" :src="'/static/client/store/join.png'|domain"></image>
            <image mode="scaleToFill" class="feature-item" :src="'/static/client/store/member.png'|domain"></image>
          </div>

          <!--虚拟产品-->
          <div class="block coupon-goods-list" v-if="virtuaGoodsLsit.length>0">
            <div class="block-title">
              <div class="block-title-text">到店券</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="goods-list">
                <div class="goods-item" v-for="(item,idx) in virtuaGoodsLsit" :key="idx"
                     @click="$linkTo('/pages/product/detail?prod_id='+item.Products_ID)">
                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                  </div>
                  <div class="right">
                    <h5 class="title"><span>{{item.Products_Name}}</span></h5>
                    <div class="flex flex-justify-between flex-vertical-center">
                      <div class="flex1">
                        <div class="tags" v-if="item.tags && item.tags.length>0">
                          <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                        </div>
                        <div class="price-box">
                          <div class="selling-price">
                            <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="action">
                        <image class="img" :src="'/static/client/store/cart.png'|domain"></image>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--评论列表-->
          <div class="block comment-box" v-if="comments.length>0">

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

          <!--产品专区-->
          <div class="block goods-box">
            <ul class="nav-list">
              <li class="nav-item" @click="goodsNavIndex=0" :class="{active:goodsNavIndex === 0}">推荐产品</li>
              <li class="nav-item" @click="goodsNavIndex=1" :class="{active:goodsNavIndex === 1}">产品分类</li>
              <li class="nav-item" @click="goodsNavIndex=2" :class="{active:goodsNavIndex === 2}">全部产品</li>
            </ul>
            <swiper
              :style="{height:systemInfo.windowHeight+'px'}"
              @change="prodIndexChangeEvent"
              :current="goodsNavIndex">
              <swiper-item style="overflow-y: scroll">
                <div class="goods-list">
                  <div class="goods-item" @click="$linkTo('/pages/product/detail?prod_id='+item.Products_ID)"
                       style="height: 220rpx;margin-bottom: 18rpx;" v-for="(item,idx) in recommends" :key="idx">
                    <image class="goods-item-cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></image>
                    <div class="goods-item-right">
                      <div class="title">{{item.Products_Name}}</div>
                      <div class="c8" style="line-height: 16px;max-height: 32px;overflow: hidden;">
                        {{item.Products_BriefDescription}}
                      </div>
                      <div class="flex flex-justify-between flex-vertical-c m-t-10">
                        <div class="selling-price">
                          <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                        </div>
                        <div class="btn">购买</div>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-item>
              <swiper-item class="tab-page" style="overflow-y: scroll">
                <div style="width: 700rpx;background: #F7F7F7;box-sizing: border-box;"
                     class="p-t-20 p-l-15 p-b-20 p-r-15">
                  <block v-for="(row,idx1) in bizCateList" :key="idx1">
                    <div class="row p-b-15" v-if="row.child" >
                      <div class="fz-14 c3 ">{{row.cate_name}}</div>
                      <span class="column fz-12 c6 p-9 m-r-10 m-t-10" style="background: #FFFFFF;display: inline-block;"
                            v-for="(column,idx2) in row.child" :key="idx2">{{column.cate_name}}</span>
                    </div>
                  </block>
                </div>
              </swiper-item>
              <swiper-item class="tab-page" style="overflow-y: scroll">
                <div class="flex" style="flex-wrap: wrap;width: 710rpx;">
                  <div
                    style="width: 345rpx;border-radius: 8rpx;overflow: hidden;height: 450rpx;margin-bottom: 20rpx;"
                    @click="$toGoodsDetail(item.Products_ID)"
                    v-for="(item,idx) in goodsList" :style="{marginRight:idx%2===0?'20rpx':'0rpx'}"
                    :key="idx">
                    <div class="img-cover" style="width: 345rpx;height: 345rpx"
                         :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                    <div class="c3 fz-13" style="line-height: 36rpx;height: 72rpx;">{{item.Products_Name}}</div>
                    <div class="flex flex-vertical-c" style="height: 32rpx;">
                      <div class="price-selling"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceX}}</span>
                      </div>
                      <div class="p-l-10 text-through price-market"><span class="fz-10">￥</span><span class="fz-12">{{item.Products_PriceY}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-item>
            </swiper>

          </div>

          <!--发布评论-->
          <!--          <view class="commtent-add section">-->
          <!--            <textarea class="textarea" @blur="bindTextAreaBlur" auto-height placeholder="发表你的评论..." />-->
          <!--          </view>-->

          <layout-copyright></layout-copyright>

        </div>
      </swiper-item>

      <swiper-item class="tab-page">
        <div id="scrollView2" class="tab-page-wrap p-t-15">
          <div class="p-10">地址:<span class="p-l-10">{{storeInfo.biz_address}}</span></div>
          <div class="hr h15"></div>
          <div class="p-10">电话:<span class="p-l-10">{{storeInfo.biz_mobile}}</span></div>
          <div class="hr h15"></div>
          <div class="p-10">简介:<span class="p-l-10 fz-14 c6">{{storeInfo.intro}}</span></div>
        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView3" class="tab-page-wrap">

            <!--只显示有照片的相册 v-if="imgs.photo && imgs.photo.length>0"-->
            <div class="photo-section"  v-for="(imgs,idx1) in photoList" :key="idx1" >
              <div class="php-section-title m-b-10 flex flex-vertical-c">
                <div class="label"></div>
                <div class="text flex1 c3">{{imgs.cate_name}}</div>
                <div class="flex flex-vertical-c" @click="$linkTo('/pages/store/photo?bid='+bid+'&tab='+idx1)">
                  <span class="c9 fz-12">查看更多</span>
                  <layout-icon size="14" color="#999" type="iconicon-arrow-right"></layout-icon>
                </div>
              </div>
              <div class="photo-list">
                <div class="photo-item" @click="priviewFn(imgs)" v-for="(img,idx2) in imgs.photo" :key="idx2" :style="{backgroundImage:'url('+img.photo_img+')'}"></div>
              </div>
            </div>
          
        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView4" class="tab-page-wrap">
          门店
        </div>
      </swiper-item>
      <swiper-item class="tab-page">
        <div id="scrollView5" class="tab-page-wrap">
          点评
        </div>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getBizInfo, getBizSpikeList, getCategoryList, getStoreList } from '@/api/store'
import { hideLoading, modal, showLoading } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { getProductList, getBizProdCateList } from '@/api/product'
import { getCouponList, getCommitList } from '@/api/common'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import { getArrColumn } from '@/common/helper'

export default {
  name: 'StoreIndex',
  components: {
    LayoutCopyright,
    LayoutComment,
    LayoutIcon
  },
  mixins: [BaseMixin],
  computed: {},
  data () {
    return {
      childSwiperHeight: 'auto',
      bid: null,
      scrollHeightS: [0, 0, 0, 0],
      storeList: [],
      storeInfo: {},
      couponList: [],
      activityList: [],
      comments: [],
      goodsNavIndex: 0,
      recommends: [],
      bizCateList: [],
      virtuaGoodsLsit: [],
      goodsList: [],
      slide: {
        imgs: [
          'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003221654033886.png',
          'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/695d1d409a77d695/ffd56752966467a7.jpg',
          'https://qingclouds-server.oss-cn-shanghai.aliyuncs.com/db51fa901ed2c3b9/5514f2e17bbaf475.jpg']
      },
      headTabIndex: 0,
      navs: [
        {
          title: '限时抢',
          name: 'iconxianshi',
          size: 44,
          color: '#26C78D'
        },
        {
          title: '1小时达',
          name: 'iconqiandao',
          size: 44,
          color: '#ae48c7'
        },
        {
          title: '享免单',
          name: 'iconsong',
          size: 44,
          color: '#3345c7'
        },
        {
          title: '分享赚',
          name: 'iconmiandan',
          size: 44,
          color: '#3bc734'
        },
        {
          title: '签到',
          name: 'iconfenxiang1',
          size: 44,
          color: '#c7596c'
        }
      ],
      photoList: [],
      pageScrollTop: 0,
      headTabTop: 0,
      chidScrollTop: 0,
      headTabSticky: false,
      scrollList: [
        {
          scrollTop: 0,
          name: '首页'
        },
        {
          scrollTop: 0,
          name: '介绍'
        },
        {
          scrollTop: 0,
          name: '相册'
        },
        {
          scrollTop: 0,
          name: '门店'
        },
        {
          scrollTop: 0,
          name: '点评'
        }
      ]
    }
  },
  methods: {
    priviewFn (imgs) {
      const urls = getArrColumn(imgs.photo, 'photo_img')
      uni.previewImage({
        urls
      })
    },
    testFun (e) {
      console.log(e)
    },
    bindChildScroll (e) {
      console.log(e.detail)
      this.chidScrollTop = e.detail.scrollTop
    },
    bindTextAreaBlur (e) {
      const { value } = e.detail
      console.log(value)
    },
    prodIndexChangeEvent (event) {
      const { current } = event.detail
      this.goodsNavIndex = current
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
      this.upSwiperHeight()
    },
    async _init_func () {
      try {
        showLoading('加载中')
        const storeInfoData = await getBizInfo({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error(e.msg || '商品信息失败')
        })
        this.storeInfo = storeInfoData[0]

        const base = { biz_ids: this.bid }
        this.recommends = await getProductList({
          pageSize: 5,
          Is_Recommend: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })

        this.goodsList = await getProductList({ pageSize: 4, ...base }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })

        this.virtuaGoodsLsit = await getProductList({
          pageSize: 3,
          prod_order_type: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取虚拟商品列表错误')
        })

        this.bizCateList = await getBizProdCateList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        this.couponList = await getCouponList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取优惠券失败')
        })

        this.activityList = await getBizSpikeList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        this.comments = await getCommitList({
          biz_id: this.bid,
          pageSize: 3
        }, { onlyData: true }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.storeList = await getStoreList({
          biz_id: this.bid,
          pageSize: 999
        }, { onlyData: true }).catch((e) => {
          throw Error('获取门店列表数据失败')
        })

        this.photoList = await getCategoryList({ biz_id: this.bid, get_photo: 4 }, { onlyData: 1 }).catch(e => { throw Error(e.msg || '获取相册信息失败') })

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery()
          query.select('#scrollView1').boundingClientRect(data => {
            this.scrollHeightS[0] = data.height
            this.headTabIndex === 0 && this.upSwiperHeight()
          })
          query.select('#scrollView2').boundingClientRect(data => {
            this.scrollHeightS[1] = data.height
            this.headTabIndex === 1 && this.upSwiperHeight()
          })
          query.select('#scrollView3').boundingClientRect(data => {
            this.scrollHeightS[2] = data.height
            this.headTabIndex === 2 && this.upSwiperHeight()
          })
          query.select('#scrollView4').boundingClientRect(data => {
            this.scrollHeightS[3] = data.height
            this.headTabIndex === 3 && this.upSwiperHeight()
          })
          query.select('#scrollView5').boundingClientRect(data => {
            this.scrollHeightS[4] = data.height
            this.headTabIndex === 4 && this.upSwiperHeight()
          })
          query.exec()
        })
        hideLoading()
      } catch (e) {
        hideLoading()
        modal(e.message)
      }
    },
    upSwiperHeight () {
      try {
        const num = this.scrollHeightS[this.headTabIndex]
        if (num < 1 || num < this.systemInfo.windowHeight) throw Error('高度无效或者低于屏幕，直接设置为屏幕高度好了')
        this.childSwiperHeight = num + 'px'
      } catch (e) {
        if (this.systemInfo.windowHeight) this.childSwiperHeight = this.systemInfo.windowHeight + 'px'
      }
    }
  },

  onPageScroll (e) {
    const { scrollTop } = e
    this.pageScrollTop = scrollTop
    this.headTabSticky = scrollTop > this.headTabTop
  },
  onShow () {

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

  },
  onReady () {
    const query = uni.createSelectorQuery()
    query.select('#stickyTab').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.headTabTop = res[0].top
    })
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #f2f2f2;
  }

  .coupon-section {
    width: 750rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    height: 123rpx;
    margin-bottom: 20rpx;
    background: white;

    .coupon-item {
      display: inline-block;
      vertical-align: top;
      width: 363rpx;
      height: 123rpx;
      margin-left: 30rpx;
      background: #fff;
      color: #fff;
      background-image: url("/assets/img/coupon.jpg");
      @include cover-img();

      .containier {
        vertical-align: top;
        width: 248rpx;
        padding-left: 10rpx;
        height: 123rpx;
        overflow: hidden;
        display: flex;
        align-items: center;

        .price {
          height: 46rpx;
          display: flex;
          align-items: flex-end;

          .sign {
            font-size: 24rpx;
          }

          .num {
            font-size: 40rpx;
          }
        }

        .info {
          font-size: 10px;
          padding-left: 4px;

          .condition {
            margin-bottom: 10rpx;
            display: block;
          }

          .use-end-item {

          }
        }
      }
    }
  }

  .activity {
    &-list {
      padding: 0 0 10rpx 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-item {
      margin-right: 6px;
      padding: 4px;
      border-radius: 4px;
      font-size: 10px;
      color: $fun-red-color;
      border: 1px solid #FF9090;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .feature {
    &-list {
      display: flex;
      padding: 30rpx 0;
      justify-content: center;
    }

    &-item {
      margin-right: 14rpx;
      width: 165rpx;
      height: 144rpx;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .store-info {
    .actions {
      width: 750rpx;
      box-sizing: border-box;
      padding: 30rpx 40rpx;
      display: flex;
      justify-content: center;
      align-items: center;

      .action-item {
        flex: 1;
        text-align: center;
        /*width: 40rpx;*/
        /*height: auto;*/
        //padding: 0 40rpx;
      }
    }

    .base {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 30rpx;

      .logo {
        width: 74rpx;
        height: 74rpx;
        background: #f2f2f2;
        /*border-radius: 50%;*/
        /*overflow: hidden;*/
      }

      .title {
        color: #333;
        font-size: 18px;
        font-weight: bold;
        margin-left: 20rpx;
      }
    }
  }

  .tab-container {
    background: #fff;
    position: relative;
    .tab-page-wrap {
      position: absolute;
      width: 750rpx;
      height: 100%;

    }

  }

  .photo-section{
    margin: 10rpx 10rpx 40rpx;
    .php-section-title{
      .label{
        width: 6rpx;
        height: 30rpx;
        background: #26C78D;
        margin-right: 8px;
      }
      .text{
        font-size: 15px;
        font-weight: bold;
      }
    }
    .photo-list{
      display: flex;
      flex-wrap: wrap;
    }
    .photo-item{
      width: 350rpx;
      height: 350rpx;
      margin-bottom: 10rpx;
      margin-right: 10rpx;
      @include cover-img();
      &:nth-child(even){
        margin-right: 0;
      }
    }
  }

  .coupon-goods-list {
    padding: 0 25rpx;
    background: white;

    .block-title {
      padding: 20px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .goods-list {
      .goods-item {
        width: 700rpx;
        padding: 0 0 10rpx;
        margin-bottom: 20rpx;
        font-size: 14px;
        /*border-bottom: 1px dashed #eee;*/
        display: flex;

        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .left {
          .cover {
            width: 160rpx;
            height: 160rpx;
            @include cover-img()
          }

        }

        .right {
          margin-left: 25rpx;
          font-size: 12px;

          .title {
            font-size: 14px;
            margin-bottom: 10px;
            color: #333;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;

          }

          .price-box {
            display: flex;
            margin-bottom: 6px;

            .selling-price {
              color: $fun-red-color;

              .num {
                font-size: 14px;
              }
            }

            .market-price {
              display: flex;
              align-items: flex-end;
              text-decoration: line-through;
              color: #999;
            }
          }

          .sale-count {
            margin-bottom: 6px;
            color: #999;
          }

          .tags {
            margin-bottom: 6px;

            .tag {
              display: inline-block;
              margin-right: 4px;
              border-radius: 4px;
              text-align: center;
              background: #fff;
              color: $fun-red-color;
              padding: 0 4px;
              font-size: 10px;
              height: 16px;
              line-height: 16px;
              border: 1px solid #FF9090;
            }
          }

          .action {
            display: flex;
            justify-content: center;

            .img {
              width: 57rpx;
              height: 57rpx;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }

  .goods-box {
    padding: 40rpx 25rpx;
    background: white;

    .nav-list {
      padding-bottom: 40rpx;
      color: #666666;
      display: flex;
      justify-content: center;
      align-items: center;

      .nav-item {
        font-weight: bold;
        padding: 0;
        margin-right: 40rpx;
        height: 32px;
        line-height: 32px;
        display: inline-block;
        color: #333;

        &.active {
          color: $fun-green-color;
          border-bottom: 2px solid $fun-green-color;
        }
      }
    }

    .block-title {
      padding: 25px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .goods-list {

      .goods-item {
        display: flex;

        &:last-child {
          margin-bottom: 0;
        }

        .goods-item-cover {
          width: 220rpx;
          height: 220rpx;
          background-color: red;
          @include cover-img();
        }

        .goods-item-right {
          width: 480rpx;
          padding-left: 30rpx;
          box-sizing: border-box;
          overflow: hidden;
          font-size: 12px;

          .title {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: bold;
            color: #333;
            line-height: 20px;
            max-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .desc {
            color: #888;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .selling-price {
            color: $fun-red-color;

            .num {
              font-size: 14px;
            }
          }

          .btn {
            background: $fun-red-color;
            color: #fff;
            width: 102rpx;
            height: 48rpx;
            line-height: 48rpx;
            text-align: center;
            border-radius: 24rpx;
          }
        }
      }
    }
  }

  .comment-box {
    border-top: 30rpx solid #f2f2f2;
    border-bottom: 30rpx solid #f2f2f2;
    padding: 0 25rpx;
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

  .nav {
    background: white;
    /*margin: 15px 0;*/
    &-list {

    }

    &-item {
      padding: 10px 0;
      text-align: center;

      .title {
        margin-top: 10px;
        font-size: 14px;
        color: #444;
      }
    }
  }

  .head {
    position: sticky;
    z-index: 999;
    top: 0;
    height: 50px;
    width: 750rpx;
    box-sizing: border-box;
    background: white;
    padding: 10px 50rpx;
    align-items: center;
    color: #333;

    &.isStickly {
      border-bottom: 1px solid #eee;
    }

    .tab-box {

      display: flex;
      align-items: center;

      .tab-item {
        flex: 1;
        text-align: center;
        margin-right: 40rpx;
        padding-bottom: 8px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        .underline {
          visibility: hidden;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          width: 18px;
          background: $fun-green-color;
        }

        &.active {
          color: $fun-green-color;

          .underline {
            visibility: visible;
          }
        }
      }
    }

    .search-box {
      position: relative;
      margin-right: 20rpx;
      width: 120rpx;
      text-align: right;
      background: rgba(255, 255, 255, .5);

      .iconsearch {
        color: white;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
