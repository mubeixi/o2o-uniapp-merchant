<template>
  <div class="page-wrap">
    <!--,opacity:headTabOpacity-->
    <div class="fixed-top-box" :style="{zIndex:headTabOpacity>0?5:-5,opacity:headTabOpacity}">
      <layout-page-title :letf-icon-size="18" :letfFn="true" :pageTitle="'店铺详情'" @clickLeft="$back"></layout-page-title>
      <div class="h10"></div>
      <!--      <div v-show="headTabSticky==1" class="fixed-top-search flex flex-vertical-c">-->
      <!--        <div class="fixed-search-input flex flex-vertical-c" @click="toSearch">-->
      <!--          <layout-icon size="18" color="#ADADAD" type="iconsearch"></layout-icon>-->
      <!--          <div class="placeholder">请输入商品关键词</div>-->
      <!--        </div>-->
      <!--        <image @click="toVip" class="fixed-top-vip" :src="$getDomain('/static/client/store/theme-three/vip.png')"></image>-->
      <!--      </div>-->
    </div>

    <scroll-view class="store-comp-wrap"
                 @touchstart="touchPageStart"
                 @touchmove="touchPageMove"
                 @touchend="touchPageEnd"
                 @scroll="bindScroll" :scroll-y="pageScrollEnable">
      <div id="topBox" class="top-box">
        <image class="top-box-bg" :src="$getDomain('/static/client/store/theme-three/top-bg.png')"></image>
        <layout-page-title letf-icon-color="#fff" status-bg-color="none" menu-button-bg-color="none"
                           :letf-icon-size="18" :letfFn="true" @clickLeft="$back"></layout-page-title>
        <div class="h10"></div>
        <div class="store-info">
          <div class="flex">
            <div class="store-info-logo" :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}" @click="toPicture">
              <div class="thumbCount">{{storePhotoTotal}}张照片</div>
            </div>
            <div class="store-info-more">
              <div class="store-info-row flex-vertical-c flex-justify-between">
                <div style="max-width: 360rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                     class="store-title c3 fz-b">{{storeInfo.biz_shop_name}}
                </div>
                <div class="actions flex flex-vertical-c">
                  <layout-icon :color="isFavourite?'#E64239':'#999'" @click.stop="taggleFavorite" :plain="false"
                               wrap-bg="#FFECEB" wrap-padding="10rpx" type="iconicon-favorite"></layout-icon>
                  <layout-icon color="#E64239" @click.stop="$cellPhone(storeInfo.biz_mobile)" style="margin-left: 25rpx"
                               :plain="false" wrap-bg="#FFECEB" wrap-padding="10rpx"
                               type="iconicon-phone"></layout-icon>
                </div>
              </div>
              <div class="store-info-row flex-vertical-c" style="margin: 20rpx 0">
                <layout-icon color="#999" size="14" type="iconicon-address"></layout-icon>
                <div class="c9 fz-12">地址:{{storeInfo.biz_address}}</div>
              </div>
              <div class="store-info-row flex-vertical-c">
                <div class="fz-12 c9">营业时间:{{storeInfo.business_start}}-{{storeInfo.business_end}}</div>
              </div>
            </div>
          </div>
          <div class="activity-info">
            <div class="store-follow">
              <image class="store-follow-bg"
                     :src="$getDomain('/static/client/store/theme-three/follow-num.png')"></image>
              <span class="store-follow-text">{{storeInfo.follow}}人关注</span>
            </div>
            <div class="store-activity">
              <div v-for="(item,idx) in flashActivityList" :key="idx" @click="toActivity(item)" class="activity-item">
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div class="section-item coupon-list" v-if="couponList.length>0">
          <div v-for="(coupon,idx) in couponList" :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item">
            <div class="flex flex-vertical-c">
              <div class="coupon-item-l">
                <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
              </div>
              <div class="coupon-item-r">领取</div>
            </div>
          </div>
        </div>

        <div v-if="headTabSticky==1" class="top-search-space"></div>
        <div class="top-search flex flex-vertical-c" :class="{sticky:headTabSticky==1}"
             :style="{top:headTabSticky==1?(menuButtonInfo.bottom+10+'px'):'0px'}">
          <div class="search-input flex flex-vertical-c" @click="toSearch">
            <layout-icon size="18" color="#ADADAD" type="iconsearch"></layout-icon>
            <div class="placeholder">请输入商品关键词</div>
          </div>
          <image @click="toVip" class="top-vip" :src="$getDomain('/static/client/store/theme-three/vip.png')"></image>
        </div>
      </div>

      <div class="container" :style="{height:systemInfo.windowHeight-diyHeadHeight+'px'}"
           :class="{sticky:headTabSticky==1}">
        <scroll-view class="container-l"
                     :upper-threshold="5"
                     @touchstart="touchLeftStart"
                     @touchmove="touchLeftMove"
                     @touchend="touchLeftEnd"
                     @scrolltoupper="bindScrollLeftTop"
                     @scroll="bindContainerLeftScroll"
                     :scroll-y="leftScrollEnable">
          <div :class="{active:bizCateNavIndex===-2}" @click="setCateActuveIdx(-2,0)" class="cate-item">
            <div class="cate-underline"></div>
            <div class="cate-title">限时抢购</div>
          </div>
          <div :class="{active:bizCateNavIndex===-1}" @click="setCateActuveIdx(-1,0)" class="cate-item">
            <div class="cate-underline"></div>
            <div class="cate-title">秒杀</div>
          </div>
          <div :class="{active:bizCateNavIndex===idx}" :key="idx" @click="setCateActuveIdx(idx,0)" class="cate-item"
               v-for="(item,idx) in bizCateList">
            <div class="cate-underline"></div>
            <div class="cate-title">{{item.cate_name}}</div>
          </div>
          <div v-if="bizCateList.length>0" class="p-b-safe-area" style="height: 96rpx"></div>

        </scroll-view>
        <scroll-view
          :scroll-y="rightScrollEnable"
          class="container-r"
          :upper-threshold="5"
          @touchstart="touchRightStart"
          @touchmove="touchRightMove"
          @touchend="touchRightEnd"
          @scrolltoupper="bindScrollRightTop"
          @scroll="bindContainerRightScroll"
        >
          <div class="goods-box" v-if="showMode==='goods'">
            <div class="cate-child-list">
              <div
                v-for="(item,cidx) in bizCateList[bizCateNavIndex].child"
                :key="cidx"
                @click="setCateActuveIdx(bizCateNavIndex,cidx)"
                :class="{active:bizCateChildNavIndex===cidx}"
                class="cate-item"
              >
                <div class="cate-title">{{item.cate_name}}</div>
              </div>
            </div>
            <div class="goods-list">
              <div :key="idx" class="goods-item" v-for="(goods,idx) in showList">
                <div @click="$toGoodsDetail(goods)" :style="{backgroundImage:'url('+$getDomain(goods.ImgPath)+')'}"
                     class="cover"></div>
                <div class="info">
                  <div class="title fz-13 c3">
                    <wzw-live-tag :room_id="goods.room_id" :product-info="goods" />
                    {{goods.Products_Name}}
                  </div>
                  <div class="flex flex-vertical-c" style="margin: 20rpx 0">
                    <div class="price-num">已减{{$filterPrice(goods.Products_PriceY-goods.Products_PriceX)}}元</div>
                    <div class="c9 fz-12">已售{{goods.Products_Sales}}份</div>
                  </div>
                  <div class="flex flex-vertical-c flex-justify-between">
                    <div class="flex flex-vertical-c">
                      <span class="price-selling fz-12">￥</span><span class="price-selling fz-14">{{goods.Products_PriceX}}</span>
                      <!--<div class="text-through price-market fz-12 m-l-6">￥{{goods.Products_PriceY}}</div>-->
                    </div>
                    <div @click.stop="$noop" class="action goods-item-action">
                      <!--有下单模板的-->
                      <block v-if="goods.order_temp_id||goods.Products_IsVirtual==1">
                        <div @click.stop="goodsNumPlus(goods)" class="btn-open-attr m-r-10">
                          立即下单
                        </div>
                      </block>
                      <block v-else>
                        <div @click.stop="openAttrLayer(goods.Products_ID)" class="btn-open-attr m-r-10"
                             v-if="goods.skujosn">
                          选规格
                          <div class="goods-num-tag" v-if="goods.num>0">{{goods.num}}</div>
                        </div>
                        <div class="flex flex-vertical-c" v-else>
                          <block v-if="goods.num>0">
                            <layout-icon @click.stop="goodsNumMinus(goods)" color="#B2B1B1" size="20"
                                         type="iconicon-minus"></layout-icon>
                            <input v-model="goods.num" @focus="getQty(goods.num)"
                                   @blur="changeGoodsNum($event,idx,goods)" class="input-num text-center fz-12" />
                          </block>
                          <layout-icon @click.stop="goodsNumPlus(goods)" color="#E64239" size="20"
                                       type="iconicon-plus"></layout-icon>
                        </div>
                      </block>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="p-b-safe-area" style="height: 96rpx"></div>
          </div>
          <div class="spike-box" v-if="showMode==='spike'">
            <div class="spike-list">
              <div class="flash-act-item" v-for="(activity,idx1) in flashActivityList" :key="idx1">
                <div class="flash-act-title c3 fz-b fz-15"
                     @click.stop="$linkTo('/pagesA/active/FlashSaleByBiz?biz_id='+bid+'&spike_id='+activity.id)">
                  {{activity.name}}
                </div>
                <div class="flash-act-countdown">
                  <block v-if="!activity.countdown.is_end">
                    <span style="color: #E64239;" class="fz-12 m-r-6">距{{activity.countdown.is_start?'结束':'开始'}}:</span>
                    <span class="countdown-tag">{{activity.countdown.d}}</span>
                    <span class="countdown-delimiter">天</span>
                    <span class="countdown-tag">{{activity.countdown.h}}</span>
                    <span class="countdown-delimiter">时</span>
                    <span class="countdown-tag">{{activity.countdown.m}}</span>
                    <span class="countdown-delimiter">分</span>
                    <span class="countdown-tag">{{activity.countdown.s}}</span>
                    <span class="countdown-delimiter">秒</span>
                  </block>
                </div>

                <div class="act-goods-list">
                  <div class="act-goods-item flex" v-for="(pro,idx) in activity.spike_goods" :key="idx"
                       @click.stop="toGoodsDetailFn(pro,activity)">
                    <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
                    <div class="item-info flex1">
                      <div class="act-goods-item-title fz-12 c3 m-t-14 m-b-8">
                        <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
                        {{pro.Products_Name}}
                      </div>
                      <div class="flex flex-vertical-c" style="margin: 20rpx 0">
                        <div class="price-num">已减{{$filterPrice(pro.Products_PriceX-pro.price)}}元</div>
                        <div class="c9 fz-12" v-if="activity.limits>0">限购{{activity.limits}}份</div>
                        <div class="c9 fz-12" v-else>不限购</div>
                      </div>
                      <div class="flex flex-vertical-b">
                        <div class="price-box price-selling ">
                          <span class="sign fz-10">￥</span><span class="num fz-14">{{pro.price}}</span>
                        </div>
                        <div class="m-l-6 fz-11 price-market text-through">
                          <span class="sign">￥</span><span class="num">{{pro.Products_PriceX}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-b-safe-area" style="height: 96rpx"></div>
          </div>
          <div class="kill-box" v-if="showMode==='kill'">
            <div class="kill-goods-list">
              <div class="kill-goods-item flex" v-for="(pro,idx) in killList" :key="idx" @click="$toGoodsDetail(pro)">
                <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
                <div class="item-info flex1">
                  <div class="act-goods-item-title fz-12 c3 m-t-14 m-b-8">
                    <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
                    {{pro.Products_Name}}
                  </div>
                  <div class="flex flex-vertical-c" style="margin: 20rpx 0">
                    <div class="price-num">已减{{$filterPrice(pro.Products_PriceX-pro.price)}}元</div>
                    <div class="c9 fz-12" v-if="pro.limits>0">限购{{pro.limits}}份</div>
                    <div class="c9 fz-12" v-else>不限购</div>
                  </div>
                  <div class="flex flex-vertical-b">
                    <div class="price-box price-selling ">
                      <span class="sign fz-10">￥</span><span class="num fz-14">{{pro.price}}</span>
                    </div>
                    <div class="m-l-6 fz-11 price-market text-through">
                      <span class="sign">￥</span><span class="num">{{pro.Products_PriceX}}</span>
                    </div>
                  </div>
                  <div class="kill-countdown">
                    <block v-if="!pro.countdown.is_end">
                      <!--<span style="color: #E64239;" class="fz-10">距{{pro.countdown.is_start?'结束':'开始'}}:</span>-->
                      <span class="countdown-tag">{{pro.countdown.h}}</span>
                      <span class="countdown-delimiter">时</span>
                      <span class="countdown-tag">{{pro.countdown.m}}</span>
                      <span class="countdown-delimiter">分</span>
                      <span class="countdown-tag">{{pro.countdown.s}}</span>
                      <span class="countdown-delimiter">秒</span>
                    </block>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-b-safe-area" style="height: 96rpx"></div>
          </div>

        </scroll-view>
      </div>
    </scroll-view>

    <layout-layer :bottomStr="storeBottomActionHeight" positions="bottom" ref="carts">
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
      </div>
    </layout-layer>

    <div id="store-bottom-action" class="store-bottom-action">
      <div class="cart-box" @click="$openPop('carts')">
        <div class="cart-icon-box">
          <layout-icon type="iconicon-cart" size="22" color="#fff"></layout-icon>
          <div class="total-num" :class="{aircle:total_count<100}">{{total_count}}</div>
        </div>
      </div>
      <div class="total-info flex flex-column flex-justify-c">
        <div class="color-white flex flex-vertical-b"><span class="fz-11">￥</span><span
          class="fz-16">{{total_price}}</span></div>
        <div class="c9 fz-10">已减{{$filterPrice(totalPriceByMarket-totalPrice)}}元</div>
      </div>
      <div class="go-btn" @click="submit">去结算</div>
    </div>

    <layout-layer positions="center" ref="attr">
      <div class="attr-form-wrap">
        <div class="attr-head">
          <div class="title">{{product.Products_Name}}</div>
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
                <input @focus="getQty(attrInfo.num)" @blur="changeNum" class="input-num text-center fz-12"
                       v-model="attrInfo.num" />
              </block>
              <layout-icon @click.stop="addNum" color="#26C78D" size="24" type="iconicon-plus p-10"></layout-icon>
            </div>
          </div>

        </div>
      </div>
    </layout-layer>

    <!--用到这里的，都是有模板的地方，不需要加入购物车-->
    <!--    <product-sku-->
    <!--      :hasCart="false"-->
    <!--      :product-info="product"-->
    <!--      @submitSure="submitSure"-->
    <!--      ref="mySku"-->
    <!--    ></product-sku>-->

    <div class="safearea-box fixed" style="z-index: 5"></div>

  </div>
</template>

<script>
import { componetMixin } from '@/mixins/BaseMixin'
import { checkIsExpire, confirm, error, hideLoading, showLoading, toast } from '@/common/fun'
import { getAlbumList, getBizInfo, getBizSpikeList } from '@/api/store'
import { getBizProdCateList, getFlashsaleList, getProductDetail, getProductList } from '@/api/product'
import { getCouponList } from '@/api/common'
import {
  checkIsLogin,
  findArrayIdx, getArrColumn,
  getCountdownFunc,
  getTouchEventInfo,
  mergeObject,
  numberSort,
  objTranslate
} from '@/common/helper'
import { addFavourite, cancelFavourite, CartList as getCartList, checkFavourite, getUserCoupon } from '@/api/customer'
import { Exception } from '@/common/Exception'
import LayoutPageTitle from '@/componets/layout-page-title/layout-page-title'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import WzwLiveTag from '@/componets/wzw-live-tag/wzw-live-tag'
import LayoutLayer from '@/componets/layout-layer/layout-layer'

var countdownInstance = null
var countdownInstanceByFlash = null
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
/**
 * 倒计时的模板
 * @type {{s: number, d: number, h: number, is_end: boolean, m: number}}
 */
const countdownTpml = {
  h: 0,
  s: 0,
  m: 0,
  d: 0,
  is_end: false,
  is_start: false
}

const attrInfoTmpl = {
  num: 0,
  attr_id: '', // 规格id
  attr_text: '',
  price: '', // 价格
  count: 0// 库存
}

export default {
  name: 'store-theme-three',
  components: {

    LayoutLayer,
    WzwLiveTag,
    LayoutIcon,
    LayoutPageTitle
  },
  mixins: [componetMixin],
  props: {
    bid: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      scrollTopNum: 0,
      toViewIdx: '',
      pixelRatio: 1,
      headTabTop: 100,
      pageScrollTop: 0,
      containerRightScrollTop: 0,
      containerLeftScrollTop: 0,
      moveStartYByRight: 0,
      moveStartYByLeft: 0,
      moveStartYByPage: 0,
      moveDirectionByPage: '--',
      storeBottomActionHeight: '52px',
      pageScrollEnable: false,
      leftScrollEnable: false,
      rightScrollEnable: false,
      product: {
        skuvaljosn: {}
      },
      check_attr: {},
      submitFlag: false,
      attrInfo: {
        Products_ID: 0,
        num: 0,
        attr_id: '', // 规格id
        attr_text: '',
        price: '', // 价格
        count: 0// 库存
      },
      total_count: 0,
      total_price: 0,
      qty: 0,
      allCheck: false,
      // scrollTopHeight: 0,
      showMode: 'goods',
      commentModalPlaceholder: '请输入内容',
      anchorTop: 0,
      commentModalShow: false,
      bizCateList: [],
      bizCateNavIndex: 0,
      bizCateChildNavIndex: 0,
      headTabIndex: 0,
      isFavourite: false,
      headTabOpacity: 0,
      headTabSticky: false,
      storeInfo: {
        biz_logo: ''
      },
      storeGoodsTotal: 0,
      killList: [],
      flashActivityList: [],
      couponList: [],
      storeList: [],
      photoList: [],
      storePhotoTotal: 0,
      spikeList: [],
      activeAttrIdx: 0,
      activeGoodsIdx: 0
    }
  },
  computed: {
    totalNum () {
      return this.$store.getters['cart/getTotalNum'](this.bid)
    },
    totalPrice () {
      return this.$store.getters['cart/getTotalMoney'](this.bid)
    },
    totalPriceByMarket () {
      return this.$store.getters['cart/getTotalMoneyByMarket'](this.bid)
    },
    carts: {
      get () {
        return this.$store.getters['cart/getCartList'](this.bid)
      },
      set (val) {
        this.$store.commit('cart/ASYNC_DATA', val)
      }
    },
    showList () {
      try {
        if (this.bizCateList.length < 1) return []
        const listData = this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList
        for (var j in listData) {
          listData[j].num = 0
          for (var k in this.carts) {
            // 只管没有规格的，有规格的在后面
            if (Number(listData[j].Products_ID) === Number(this.carts[k].prod_id) && this.carts[k].attr_id === 0) {
              listData[j].num = this.carts[k].num
            }
          }
        }

        return listData
      } catch (e) {
        return []
      }
    }
  },
  watch: {
    headTabSticky: {
      immediate: true,
      handler (val) {
        console.log('headTabSticky value is', val)
      }
    },
    bid: {
      immediate: true,
      handler (nval) {
        if (nval) this._init_func()
      }
    }
  },
  methods: {
    async addNum () {
      if (this.attrInfo.num >= this.attrInfo.count) {
        toast('购买数量不能大于库存量', 'none')
        return
      }

      const cartRT = await this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        num: 1
      })
      this.refreshCount()
      if (cartRT !== false) {
        this.attrInfo.num = Number(this.attrInfo.num) + 1
      }
    },
    async delNum () {
      if (this.attrInfo.num < 1) {
        error('购买数量不能小于0')
        return
      }

      this.attrInfo.num -= 1
      const num = this.attrInfo.num
      if (num === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          attr_id: this.attrInfo.attr_id,
          prod_id: this.attrInfo.prod_id
        })

        // 没有规格的商品，直接搞事,同步库存
        // 全是有库存的，在openAttrPop的时候初始化规格就好了
        // if (this.attrInfo.attr_id === 0) {
        //   const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: this.attrInfo.prod_id })
        //   if (idx !== false) {
        //     this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
        //   }
        // }

        this.refreshCount()

        return
      }

      this.product.prod_id = this.product.Products_ID
      this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        num: -1
      })
      this.refreshCount()
    },
    async changeNum (e) {
      const amount = parseInt(e.detail.value)

      const qty = parseInt(this.qty)
      if (isNaN(amount)) {
        error('数量必须为数量')
        this.attrInfo.num = 0
        return
      }

      const currentAttrInfo = this.attrInfo
      if (currentAttrInfo.num === amount) return

      if (amount < 0) {
        this.attrInfo.num = 0
        error('至少购买一件')
        return
      }

      if (amount > currentAttrInfo.count) {
        this.attrInfo.num = qty
        error('购买数量不能超过库存量')
        return
      }

      if (amount === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          attr_id: this.attrInfo.attr_id,
          prod_id: this.attrInfo.prod_id
        })

        // 没有规格的商品，直接搞事,同步库存
        // 全是有库存的，在openAttrPop的时候初始化规格就好了
        // if (currentAttrInfo.attr_id === 0) {
        //   const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: currentAttrInfo.prod_id })
        //   if (idx !== false) {
        //     this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
        //   }
        // }

        this.refreshCount()

        return
      }

      if ((qty - amount) === 0) return
      var num = amount - qty

      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        attr_id: this.attrInfo.attr_id,
        prod_id: this.attrInfo.prod_id
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num,
        product: { ...productInfo }
      })
      if (cart !== false) {
        // 没有规格的商品，直接搞事,同步库存
        // 全是有规格的
        // if (currentAttrInfo.attr_id === 0) {
        //   const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: currentAttrInfo.prod_id })
        //   if (idx !== false) {
        //     this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
        //   }
        // }
        this.refreshCount()
      } else {
        this.$set(this.attrInfo, 'num', qty)
      }
    },
    async confirmAdd () {
      if (!this.submitFlag) return

      const cart = await this.$store.dispatch('cart/addNum', {
        product: { ...this.product, ...this.attrInfo },
        attr_text: this.attrInfo.attr_text,
        checked: true,
        num: 1
      })
      if (cart !== false) {
        this.attrInfo.num++
      }
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
        const { ImgPath, Products_Name, Products_PriceX, Products_PriceY } = this.product

        this.attrInfo.Products_ID = attr_val.Products_ID
        this.attrInfo.attr_id = attr_val.Product_Attr_ID // 选择属性的id
        this.attrInfo.attr_text = attr_val.Attr_Value_text
        this.attrInfo.count = attr_val.Property_count // 选择属性的库存
        this.attrInfo.price = attr_val.Attr_Price ? attr_val.Attr_Price : this.product.Products_PriceX // 选择属性的价格

        Object.assign(this.attrInfo, {
          biz_id: Number(this.bid),
          prod_id: Number(attr_val.Products_ID),
          attr_id: Number(attr_val.Product_Attr_ID),
          pic: ImgPath,
          name: Products_Name,
          checked: false,
          price_selling: Number(Products_PriceX),
          price_market: Number(Products_PriceY)
        })

        this.submitFlag = !(!this.check_attr)

        const { attr_id, prod_id } = this.attrInfo
        const isCartHas = this.$store.getters['cart/getRow']({
          attr_id,
          prod_id
        })
        console.log('isCartHas', isCartHas, attr_val)
        // 如果已经存在
        if (isCartHas !== false) {
          this.attrInfo = mergeObject(this.attrInfo, isCartHas, true)
        } else {
          this.attrInfo.num = 0// 新增的时候，数量为0
        }
      } else {
        this.attrInfo = { ...attrInfoTmpl }
      }
      // 如果在接口中获取的数值
      // if (this.CartList[this.bid] && this.CartList[this.bid][this.attrInfo.Products_ID] && this.CartList[this.bid][this.attrInfo.Products_ID][this.attrInfo.attr_id]) {
      //   this.attrInfo.num = this.CartList[this.bid][this.attrInfo.Products_ID][this.attrInfo.attr_id].Qty
      // }

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
    async openAttrLayer (prod_id) {
      if (!checkIsLogin(1, 1)) return
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
    toSearch () {
      // inputValue=' + this.bizSearchKeyWord + '&
      this.$linkTo('/pages/search/result?biz_id=' + this.bid)
    },
    toVip () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pagesA/user/VipList?bid=' + this.bid)
      }
    },
    getCoupon (coupon, idx) {
      console.log(coupon)
      getUserCoupon({ coupon_id: coupon.Coupon_ID }).then(() => {
        toast('领取成功')
        this.couponList.splice(idx, 1)
      }).catch((err) => {
        error(err.msg)
      })
    },
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
    clearCart () {
      confirm({
        title: '操作确认',
        content: '该操作会清空购物车中当前商家商品，操作不可逆，确认继续操作？'
      }).then(() => {
        this.$store.dispatch('cart/removeGoods', { biz_id: this.bid }).then(() => {
          this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
          this.refreshCount()
        }).catch(() => {
        })
      }).catch(() => {
      })
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
          const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          if (idx !== false) {
            this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
          }
        }

        this.refreshCount()

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
          const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          if (idx !== false) {
            this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', amount)
          }
        }
        this.refreshCount()
      } else {
        this.$set(row, 'num', qty)
      }
    },
    refreshCount () {
      this.total_count = this.$store.getters['cart/getTotalNum'](Number(this.bid))
      this.total_price = this.$store.getters['cart/getTotalMoney'](Number(this.bid))
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
          const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          if (idx !== false) {
            this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          }
        }

        this.refreshCount()

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
          const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          if (idx !== false) {
            this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          }
        }

        this.refreshCount()
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
          const idx = findArrayIdx(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList, { Products_ID: row.prod_id })
          if (idx !== false) {
            this.$set(this.bizCateList[this.bizCateNavIndex].child[this.bizCateChildNavIndex].productList[idx], 'num', num)
          }
        }

        this.refreshCount()
      }
    },
    // 商品是没有规格的，所以统一用noattr_xxx，加上商品id来标识attr_id.
    async goodsNumMinus (goodsInfo) {
      console.log('goodsNumMinus', goodsInfo)
      const num = goodsInfo.num ? goodsInfo.num - 1 : 0

      if (num === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: goodsInfo.Products_ID,
          attr_id: 0
        })
        this.$set(goodsInfo, 'num', num)
        this.refreshCount()
        return
      }

      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        prod_id: goodsInfo.Products_ID,
        attr_id: 0
      }
      const cart = await this.$store.dispatch('cart/addNum', {
        num: -1,
        product: { ...productInfo }
      })
      if (cart !== false) {
        this.$set(goodsInfo, 'num', num)
        this.refreshCount()
      }
    },
    async goodsNumPlus (goodsInfo) {
      if (!checkIsLogin(1, 1)) return
      // 有订单模板的话，应该直接去购买
      if (goodsInfo.order_temp_id || goodsInfo.Products_IsVirtual == 1) {
        this.$toGoodsDetail(goodsInfo)
        return
      }
      const num = goodsInfo.num ? goodsInfo.num + 1 : 1

      // 拼接一下
      var productInfo = {
        ...attrInfoTmpl,
        prod_id: goodsInfo.Products_ID,
        attr_id: 0

      }

      // 兼容第一次添加的情况
      if (num === 1) {
        const { ImgPath, Products_Name, Products_PriceX, Products_PriceY } = goodsInfo
        Object.assign(productInfo, {
          biz_id: Number(this.bid),
          checked: true,
          pic: ImgPath,
          name: Products_Name,
          price_selling: Number(Products_PriceX),
          price_market: Number(Products_PriceY)
        })
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num: 1,
        product: { ...productInfo }
      })
      if (cart !== false) {
        this.$set(goodsInfo, 'num', num)
        this.refreshCount()
      }
    },
    getQty (qty) {
      this.qty = qty
    },
    async changeGoodsNum (e, idx, goodsInfo) {
      this.activeGoodsIdx = idx
      const amount = parseInt(e.detail.value)

      const qty = parseInt(this.qty)
      if (isNaN(amount)) {
        error('数量必须为数量')
        return
      }

      if (amount === 0) {
        await this.$store.dispatch('cart/removeGoods', {
          prod_id: goodsInfo.Products_ID,
          attr_id: 0
        })
        this.$set(goodsInfo, 'num', amount)
        this.refreshCount()
        return
      }

      if (amount <= 1) {
        this.$set(goodsInfo, 'num', qty)
        error('数量最少为1件')
        return
      }
      if ((qty - amount) === 0) return
      var num = amount - qty

      // 拼接一下
      const productInfo = {
        ...attrInfoTmpl,
        prod_id: goodsInfo.Products_ID,
        attr_id: 0
      }

      const cart = await this.$store.dispatch('cart/addNum', {
        num,
        product: { ...productInfo }
      })
      if (cart !== false) {
        this.$set(goodsInfo, 'num', amount)
      } else {
        this.$set(goodsInfo, 'num', qty)
      }

      this.refreshCount()
    },
    toGoodsDetailFn (pro, activity) {
      this.$linkTo(`/pages/product/detail?prod_id=${pro.Products_ID}&mode=spike&spike_good_id=${pro.id}`)
    },
    touchPageStart (e) {
      const { x, y, type } = getTouchEventInfo(e)
      console.log(x, y, type)
      this.moveStartYByPage = y
    },
    touchPageMove (e) {
      const { x, y, type } = getTouchEventInfo(e)
      // console.log('touchPageMove', y, this.moveStartYByPage)
      // if (y > this.moveStartYByPage && this.containerRightScrollTop <= 10) {
      //
      //   this.pageScrollEnable = true
      //   this.leftScrollEnable = false
      //   this.rightScrollEnable = false
      // }
      // 向上拖动,页面向下滚动
      // if (y < this.moveStartYByPage) {
      //   this.moveDirectionByPage = 'top to bottom'
      // }
      // // 向下拖动
      // if (y > this.moveStartYByPage) {
      //   // this.headTabSticky = false
      //   this.moveDirectionByPage = 'bottom to top'
      // }
    },
    touchPageEnd (e) {
      console.log('touchPageEnd', this.pageScrollEnable)
      // 下面可以滑动的时候，他不可以滑动
      if (this.leftScrollEnable || this.rightScrollEnable) {
        return
      }

      const { x, y, type } = getTouchEventInfo(e)
      // console.log(x, y, type, this.pageScrollTop, this.headTabTop)
      console.log('touchPageEnd', this.pageScrollTop, this.headTabTop)

      // 向上拖动,页面向下滚动
      if (y < this.moveStartYByPage) {
        this.moveDirectionByPage = 'top'
      }
      // 向下拖动
      if (y > this.moveStartYByPage) {
        // this.headTabSticky = false
        this.moveDirectionByPage = 'bottom'
      }
    },
    bindScroll (e) {
      const { scrollTop } = e.detail

      console.log('wrap bindScroll', scrollTop, this.moveDirectionByPage)
      this.pageScrollTop = scrollTop

      // 多给20的空间
      if (this.pageScrollTop + 20 >= this.headTabTop) {
        this.headTabSticky = true
      }
      if (this.pageScrollTop < this.headTabTop) {
        this.headTabSticky = false
      }

      if (this.pageScrollTop + 20 > this.headTabTop) {
        this.rightScrollEnable = true
        this.leftScrollEnable = true

        // this.pageScrollEnable = false
      }

      if (this.pageScrollTop < this.headTabTop) {
        this.rightScrollEnable = false
        this.leftScrollEnable = false
      }

      this.headTabOpacity = this.pageScrollTop < this.headTabTop ? this.pageScrollTop / this.headTabTop : 1
    },
    touchLeftStart (e) {
      const { x, y, type } = getTouchEventInfo(e)
      console.log(x, y, type)
      this.moveStartYByLeft = y

      // 在右边滚动后，才禁用
      if (this.pageScrollTop > this.headTabTop && this.pageScrollEnable) {
        // this.pageScrollEnable = false
      }
    },
    touchLeftMove (e) {

    },
    touchLeftEnd (e) {
      const { x, y, type } = getTouchEventInfo(e)
      // 向上滑动,恢复顶部
      if (y > this.moveStartYByLeft && this.containerLeftScrollTop <= 50) {
        // this.pageScrollEnable = true
        // this.leftScrollEnable = false
        // this.rightScrollEnable = false
      }
    },
    touchRightStart (e) {
      const { x, y, type } = getTouchEventInfo(e)
      console.log(x, y, type)
      this.moveStartYByRight = y
      // 在右边滚动后，才禁用
      if (this.pageScrollTop > this.headTabTop && this.pageScrollEnable) {
        // this.pageScrollEnable = false
      }
    },
    touchRightMove (e) {

    },
    touchRightEnd (e) {
      console.log('touchRightEnd', this.rightScrollEnable)
      const { x, y, type } = getTouchEventInfo(e)
      console.log(x, y)
      // 向下拖动,恢复顶部
      if (y > this.moveStartYByRight && this.containerRightScrollTop <= 50) {
        // this.pageScrollEnable = true
        // this.leftScrollEnable = false
        // this.rightScrollEnable = false
      }
    },
    bindContainerLeftScroll (e) {
      const { scrollTop } = e.detail
      this.containerLeftScrollTop = scrollTop
    },
    bindContainerRightScroll (e) {
      const { scrollTop } = e.detail
      this.containerRightScrollTop = scrollTop
    },
    bindScrollLeftTop () {
      this.leftScrollEnable = false
    },
    bindScrollRightTop () {
      this.rightScrollEnable = false
      // this.headTabSticky = false
      // this.pageScrollEnable = true
      // this.leftScrollEnable = false
      // this.rightScrollEnable = false
      // console.log('emit event bindScrollRightTop')
      // this.headTabSticky = false
    },
    // 单个商家
    async selectBiz () {
      await this.$store.dispatch('cart/taggleCheckStatus', { biz_id: Number(this.bid) })

      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
      this.refreshCount()
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
    /**
     * 用来做登陆后的一些数据初始化，和其他数据分开，是为了如果登陆后可以刷新
     */
    async refreshInfoByIsLogin () {
      if (this.bid) {
        checkFavourite({ biz_id: this.bid }, { onlyData: true }).then(res => {
          const { is_favourite = 0 } = res
          this.isFavourite = is_favourite
        }).catch(() => {
        })
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
            console.log(attr_value)
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
    refreshFn () {
      this.refreshInfoByIsLogin()
    },
    async _init_func () {
      try {
        showLoading('加载中')
        const storeInfoData = await getBizInfo({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error(e.msg || '商品信息失败')
        })
        this.storeInfo = storeInfoData[0]
        checkIsExpire(this.storeInfo.biz_expires)
        this.$emit('upStoreInfo', this.storeInfo)

        const base = { biz_ids: this.bid }

        // getProductList({ ...base, pageSize: 1 }).then(({ totalCount }) => {
        //   this.storeGoodsTotal = totalCount
        // }).catch((err) => { throw Error(err.msg) })

        const flashActivitys = await getBizSpikeList({
          biz_id: this.bid,
          status: 1
        }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        this.flashActivityList = flashActivitys.map(row => {
          // 句柄也加上
          return {
            ...row,
            countdown: { ...countdownTpml }
          }
        })
        console.log(this.flashActivityList)
        // 启动限时抢购倒计时，牛逼啊霸哥
        countdownInstanceByFlash = setInterval(this.stampFuncByFlash, 1000)

        const killList = await getFlashsaleList({ biz_id: this.bid }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取秒杀列表失败')
        })

        this.killList = killList.map(row => {
          // 句柄也加上
          return {
            ...row,
            countdown: { ...countdownTpml }
          }
        })

        // 启动倒计时，牛逼啊霸哥
        countdownInstance = setInterval(this.stampFuncByKill, 1000)

        const bizCateList = await getBizProdCateList({
          biz_id: this.bid,
          pageSize: 999
        }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        // 添加一个全部
        bizCateList.unshift({
          cate_img: '',
          cate_name: '全部分类',
          child: [],
          id: '',
          pid: 0
        })

        const bizCateListData = []
        for (var key in bizCateList) {
          var tempRow = objTranslate(bizCateList[key])
          // 每一行有个特殊的id,就是all
          tempRow.child = [{
            id: 'all',
            cate_img: '',
            cate_name: '全部',
            load: false,
            page: 1,
            // 没有二级，只能用一级啦
            filterObj: {
              biz_cate_id: bizCateList[key].id
            },
            pageSize: 10,
            total: 0,
            finish: false,
            productList: [] // 商品列表
          }]
          for (var ckey in bizCateList[key].child) {
            const crow = Object.assign({}, bizCateList[key].child[ckey], {
              load: false,
              // 可以精确到二级
              filterObj: {
                biz_cate_id: bizCateList[key].child[ckey].id
              },
              page: 1,
              pageSize: 10,
              total: 0,
              finish: false,
              productList: [] // 商品列表
            })
            tempRow.child.push(crow)
          }
          bizCateListData.push(tempRow)
        }

        this.bizCateList = bizCateListData

        if (this.flashActivityList.length > 0) {
          this.changeCateIdx(-2, 0, true)
        } else if (this.killList.length > 0) {
          this.changeCateIdx(-1, 0, true)
        } else {
          this.changeCateIdx(0, 0, true)
        }

        // 不要赠送的优惠券
        const couponList = await getCouponList({
          biz_id: this.bid,
          front_show: 1,
          status: 3
        }).then(res => {
          return [...res.data]
        }).catch((e) => {
          throw Error('获取优惠券失败')
        })
        this.$set(this, 'couponList', couponList)

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery().in(this)
          query.select('#topBox').boundingClientRect(data => {
            const { windowWidth } = this.systemInfo
            const pixelRatio = windowWidth / 750

            this.pixelRatio = pixelRatio

            // + 60 * pixelRatio
            // 以后不再怕顶部有rpx了
            this.diyHeadHeight = this.menuButtonInfo.bottom + 10 + 60 * pixelRatio
            console.log(this.diyHeadHeight, this.systemInfo.windowHeight, this.systemInfo.windowHeight - this.diyHeadHeight)

            this.headTabTop = data.height - this.diyHeadHeight
            console.log(this.headTabTop)
          })
          query.exec()
        })

        this.photoList = await getAlbumList({
          biz_id: this.bid,
          get_photo: 4
        }).then(res => {
          const { data, totalCount } = res
          if (data.length > 0) {
            var picNum = 0
            for (var key in data) {
              picNum += data[key].photo_total
            }
          }
          this.storePhotoTotal = picNum
          return data
        }).catch(e => {
          throw Error(e.msg || '获取相册信息失败')
        })

        // 这个就不要等了吧
        if (!checkIsLogin(0, 0)) {
          throw Error('nocare')
        }

        this.refreshInfoByIsLogin()

        hideLoading()
      } catch (e) {
        console.log(e)
        hideLoading()
        Exception.handle(e)
      }
    },
    toPicture () {
      this.$linkTo('/pagesA/store/photo?bid=' + this.bid)
    },
    taggleFavorite () {
      if (!checkIsLogin(1, 1)) return
      this.isFavourite = !this.isFavourite
      const Action = this.isFavourite ? addFavourite : cancelFavourite
      Action({ biz_id: this.bid }).then(res => {
        toast(res.msg)
        // 关注加一
        if (this.isFavourite) {
          this.storeInfo.follow++
        } else {
          this.storeInfo.follow--
        }
      }).catch((e) => {
        Exception.handle(e)
      })
    },
    setActiveGoodsIdx (idx) {
      this.activeGoodsIdx = idx
    },
    setActiveAttrIdx (idx) {
      this.activeAttrIdx = idx
    },
    toActivity (item) {
      this.$linkTo('/pagesA/active/FlashSaleByBiz?biz_id=' + this.bid + '&spike_id=' + item.id)
    },
    setCateActuveIdx (idx, cidx) {
      if (idx === this.bizCateNavIndex && cidx === this.bizCateChildNavIndex) return// 重复点击不要了
      this.bizCateNavIndex = idx
      this.bizCateChildNavIndex = cidx
      this.changeCateIdx(idx, cidx, true)
    },
    // async getCateGoodsList (idx, cidx) {
    //   // 牛逼啊
    //   this.changeCateIdx(idx, cidx, true)
    // },
    /**
     *
     * @param idx 父类id
     * @param cidx 子类id
     * @param more
     * @returns {Promise<void>}
     */
    async changeCateIdx (idx, cidx, more = false) {
      if (idx === -1) {
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = 0
        this.showMode = 'kill'
        return
      }

      if (idx === -2) {
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = 0
        this.showMode = 'spike'
        return
      }

      this.showMode = 'goods'

      if (!more) {
        if (idx === this.bizCateNavIndex && cidx === this.bizCateChildNavIndex) return// 重复点击不要了
        this.bizCateNavIndex = idx
        this.bizCateChildNavIndex = cidx
      }

      if (this.bizCateList[idx].child[cidx].finish) return // 到底了
      const base = { biz_ids: this.bid }
      const ext = { ...this.bizCateList[idx].child[cidx].filterObj } // biz_cate_id: biz_cate.id,

      try {
        const biz_cate = this.bizCateList[idx].child[cidx]
        this.bizCateList[idx].child[cidx].load = true
        const { data: newList, totalCount } = await getProductList({
          ...base,
          ...ext,

          page: biz_cate.page,
          pageSize: biz_cate.pageSize
        }).catch(err => {
          throw Error(err.msg)
        })

        this.bizCateList[idx].child[cidx].page++
        this.bizCateList[idx].child[cidx].productList = biz_cate.productList.concat(newList)

        this.bizCateList[idx].child[cidx].finish = this.bizCateList[idx].child[cidx].productList.length >= totalCount
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.bizCateList[idx].child[cidx].load = false
      }
    },
    stampFuncByKill () {
      for (var idx in this.killList) {
        const data = getCountdownFunc({
          start_timeStamp: this.killList[idx].start_time,
          end_timeStamp: this.killList[idx].end_time,
          getDay: false
        })
        if (data) {
          this.$set(this.killList[idx], 'countdown', { ...data })
        }
      }
    },
    stampFuncByFlash () {
      for (var idx in this.flashActivityList) {
        const data = getCountdownFunc({
          start_timeStamp: this.flashActivityList[idx].start_time,
          end_timeStamp: this.flashActivityList[idx].end_time
        })

        if (data) {
          this.$set(this.flashActivityList[idx], 'countdown', { ...data })
        }
      }
    }
  },
  // 关闭前要禁止
  beforeDestroy () {
    clearInterval(countdownInstanceByFlash)
    clearInterval(countdownInstance)
  },
  onReady () {
    this.pageScrollEnable = true

    this.$nextTick().then(() => {
      const query = uni.createSelectorQuery().in(this)
      query.select('#store-bottom-action').boundingClientRect(data => {
        console.log(data)
        this.storeBottomActionHeight = (this.systemInfo.windowHeight - data.top) + 'px'
      })
      query.exec()
    })
  }
}
</script>
<style lang="scss" scoped>
  /*隐藏滚动条*/
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
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
      position: relative;

      .title {
        width: 560rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .close {
        position: absolute;
        right: 10px;
        top: 14px;
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

  .page-wrap {

  }

  .kill-goods-list {
    .kill-goods-item {
      padding: 30rpx 0;
      width: 550rpx;

      .item-cover {
        width: 170rpx;
        height: 170rpx;
        @include cover-img();
        margin-right: 20rpx;
      }

      .price-num {
        background: #FFF4F4;
        font-size: 22rpx;
        color: #E64239;
        font-weight: 500;
        margin-right: 18rpx;
        padding: 10rpx 18rpx;
      }

      .act-goods-item-title {
        width: 350rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .kill-countdown {
        margin-top: 20rpx;
        display: flex;
        align-items: center;

        .countdown-tag {
          background: #E64239;
          color: #fff;
          font-size: 24rpx;
          padding: 6rpx;
          border-radius: 6rpx;
          text-align: center;
        }

        .countdown-delimiter {
          text-align: center;
          font-size: 24rpx;
          color: #E64239;
          padding: 0 8rpx;
        }
      }
    }
  }

  .spike-list {
    padding-bottom: 20rpx;

    .flash-act-item {
      width: 550rpx;
      box-sizing: border-box;
      margin: 0 auto 30rpx;
      border-radius: 15rpx;
      padding: 0rpx 0rpx 30rpx 0rpx;
      background: #fff;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }

      .flash-act-title {
        width: 550rpx;
        padding: 30rpx 0;

      }

      .flash-act-countdown {
        width: 550rpx;
        height: 64rpx;

        background: rgba(255, 244, 243, 1);
        display: flex;
        align-items: center;
        justify-content: center;

        .countdown-tag {
          background: #E64239;
          color: #fff;
          font-size: 26rpx;
          height: 26rpx;
          line-height: 26rpx;
          padding: 6rpx;
          border-radius: 6rpx;
          text-align: center;
        }

        .countdown-delimiter {
          text-align: center;
          font-size: 24rpx;
          color: #E64239;
          padding: 0 8rpx;
        }
      }
    }

    .act-goods-list {

    }

    .act-goods-item {
      padding: 30rpx 0;
      width: 550rpx;

      .item-cover {
        width: 170rpx;
        height: 170rpx;
        @include cover-img();
        margin-right: 20rpx;
      }

      .price-num {
        background: #FFF4F4;
        font-size: 22rpx;
        color: #E64239;
        font-weight: 500;
        margin-right: 18rpx;
        padding: 10rpx 18rpx;
      }

      .act-goods-item-title {
        width: 350rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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

  .store-bottom-action {
    position: fixed;
    display: flex;
    background: #262626;
    height: 96rpx;
    width: 750rpx;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    left: 0;
    z-index: 6;

    .cart-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160rpx;
      height: 96rpx;
      border-right: 1px solid #656565;

      .cart-icon-box {
        position: relative;

        .total-num {
          position: absolute;
          right: 0;
          top: 0;
          transform: translate(50%, -50%);
          background: #E64239;
          color: #fff;
          border-radius: 10rpx;
          font-size: 20rpx;
          padding: 4rpx 8rpx;
          text-align: center;

          &.aircle {
            border-radius: 50%;
            padding: 0;
            width: 40rpx;
            height: 40rpx;
            line-height: 40rpx;
          }
        }
      }
    }

    .total-info {
      flex: 1;
      padding-left: 58rpx;
    }

    .go-btn {
      height: 96rpx;
      width: 180rpx;
      text-align: center;
      line-height: 96rpx;
      color: #fff;
      background: #E64239;
      font-size: 32rpx;
    }
  }

  .store-comp-wrap {
    position: absolute;
    width: 750rpx;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 1;
    overflow-x: hidden;
    background: #fff;

    .container-l {
      position: absolute;
      bottom: 0;
      left: 0;
      top: 20px;
      overflow-x: hidden;
      overflow-y: scroll;
      width: 160rpx;
      background: #f6f6f6;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }

      .cate-item {
        width: 160rpx;
        height: 97rpx;
        position: relative;

        .cate-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 26rpx;
          width: 120rpx;
          margin: 0 20rpx;
          height: 97rpx;
          line-height: 97rpx;
          text-align: center;
        }

        .cate-underline {
          width: 5rpx;
          height: 50rpx;
          background: #E64239;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          visibility: hidden;
        }

        &.active {
          color: #E64239;
          background: #fff;

          .cate-underline {
            visibility: visible;
          }
        }
      }
    }

    .container-r {
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }

      width: 550rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      position: absolute;
      bottom: 0;
      right: 0;
      top: 20px;
      overflow-x: hidden;
      overflow-y: scroll;

    }

    .goods-box {
      .cate-child-list {
        overflow-y: hidden;
        overflow-x: scroll;
        width: 550rpx;
        margin-bottom: 30rpx;
        white-space: nowrap;

        .cate-item {
          display: inline-block;
          margin-right: 15rpx;
          padding: 12rpx 22rpx;
          height: 50rpx;
          box-sizing: border-box;
          background: #F7F8F8;
          border-radius: 6rpx;
          color: #666666;
          font-size: 24rpx;

          &.active {
            color: #444;
            background: #FFE9E8;
          }
        }
      }

      .goods-list {
        .goods-item {
          display: flex;
          align-items: center;
          margin: 30rpx 0;

          .goods-item-action {
            .btn-open-attr {
              background: #E64239;
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
                background: #E64239;
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

          .cover {
            width: 170rpx;
            height: 170rpx;
            @include cover-img();
          }

          .info {
            width: 360rpx;
            overflow-x: hidden;
            padding-left: 20rpx;

            .title {
              line-height: 16px;
              height: 16px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .price-num {
              background: #FFF4F4;
              font-size: 22rpx;
              color: #E64239;
              font-weight: 500;
              margin-right: 18rpx;
              padding: 10rpx 18rpx;
            }

            .input-num {
              width: 32px;
            }
          }
        }
      }
    }
  }

  .container {
    position: relative;
    left: 0;
    bottom: 0;
    width: 750rpx;
    z-index: 4;

  }

  .top-box {
    position: relative;

    .top-box-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 750rpx;
      height: 230rpx;
    }

    .store-info {
      position: relative;
      z-index: 5;
      width: 710rpx;
      margin: 0 20rpx 30rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 14rpx 0px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      box-sizing: border-box;
      padding: 30rpx 20rpx;

      .store-info-logo {
        width: 105rpx;
        height: 105rpx;
        border-radius: 6rpx;
        overflow: hidden;
        @include cover-img();
        position: relative;
        .thumbCount{
          position: absolute;
          bottom: 0;
          width: 105rpx;
          height: 16px;
          text-align: center;
          line-height: 16px;
          font-size: 10px;
          background: rgba(0,0,0,.6);
          color: #fff;
        }
      }

      .store-info-more {
        width: 545rpx;
        padding: 0 20rpx;

        .store-info-row {
          display: flex;
        }
      }

      .activity-info {
        display: flex;
        align-items: center;
        margin-top: 25rpx;

        .store-activity {
          margin-left: 20rpx;
          width: 480rpx;
          white-space: nowrap;
          overflow-y: hidden;
          overflow-x: scroll;

          .activity-item {
            display: inline-block;
            font-size: 20rpx;
            color: #E64239;
            line-height: 20rpx;
            text-align: center;
            padding: 8rpx 10rpx;
            margin-right: 20rpx;
            height: 20rpx;
            border: 1px solid rgba(230, 66, 57, 1);
            border-radius: 6rpx;
          }
        }

        .store-follow {
          width: 162rpx;
          height: 42rpx;
          position: relative;

          .store-follow-bg {
            width: 162rpx;
            height: 42rpx;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
          }

          .store-follow-text {
            z-index: 3;
            width: 162rpx;
            height: 42rpx;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            line-height: 42rpx;
            color: #fff;
            font-size: 22rpx;
          }
        }
      }
    }

  }

  .top-search-space {
    height: 60rpx;

  }

  .top-search {

    padding: 0 20rpx;
    position: relative;

    &.sticky {
      position: fixed;
      z-index: 6;
      background: #fff;
    }

    .search-input {
      width: 540rpx;
      height: 60rpx;
      background: #f2f2f2;
      border-radius: 10rpx;
      padding-left: 32rpx;
      box-sizing: border-box;

      .placeholder {
        color: #ADADAD;
        font-size: 12px;
        margin-left: 18rpx;
      }
    }

    .top-vip {
      width: 150rpx;
      height: 60rpx;
      opacity: 0.9;
      border-radius: 5rpx;
      margin-left: 20rpx;
    }
  }

  .fixed-top-box {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    width: 750rpx;

    .fixed-top-search {
      padding: 0 20rpx;
    }

    .fixed-search-input {
      width: 540rpx;
      height: 60rpx;
      background: #f2f2f2;
      border-radius: 10rpx;
      padding-left: 32rpx;
      box-sizing: border-box;

      .placeholder {
        color: #ADADAD;
        font-size: 12px;
        margin-left: 18rpx;
      }
    }

    .fixed-top-vip {
      width: 150rpx;
      height: 60rpx;
      opacity: 0.9;
      border-radius: 5rpx;
      margin-left: 20rpx;
    }
  }

  .coupon-list {
    margin: 0 0 30rpx 0;
    width: 750rpx;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;

    .coupon-item {
      position: relative;
      display: inline-block;
      margin-left: 20rpx;
      height: 40rpx;
      color: #fff;

      align-items: center;

      &:last-child {
        margin-right: 20rpx;
      }

      .coupon-item-r {
        line-height: 40rpx;
        width: 79rpx;
        text-align: center;
        padding: 0 15rpx;
        font-size: 22rpx;
        background-image: url("/static/store/theme-three/coupon-r.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }

      .coupon-item-l {
        background-color: #E64239;
        display: flex;
        align-items: center;
        font-size: 22rpx;
        line-height: 40rpx;
        justify-content: center;
        padding: 0 15rpx;
        border-top-left-radius: 5rpx;
        border-bottom-left-radius: 5rpx;

        .sign {

        }

        .num {

        }
      }

    }
  }
</style>
