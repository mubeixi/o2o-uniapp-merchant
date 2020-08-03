<template>
  <div class="page-wrap">
    <layout-page-title extStyle="position:fixed;top:0;width:750rpx;left:0;z-index:5;background:#fff;color:#333;"
                       :letfFn="true" :pageTitle="'店铺详情'" @clickLeft="bindBackFn"></layout-page-title>
    <div class="store-info-space bg-white" :style="{height: menuButtonInfo.bottom+'px'}"></div>
    <div class="store-info-toolbar">
      <div class="actions">
        <div @click="goTo" class="action-item">
          <layout-icon weight="bold" color="#333" size="22" type="iconicon-address"></layout-icon>
        </div>
        <!--        <div class="action-item-space"></div>-->
        <div @click.stop="taggleFavorite" class="action-item">
          <layout-icon :color="isFavourite?'#26C78D':'#333333'" size="22" type="iconicon-favorite"></layout-icon>
          <!--          <layout-icon weight="bold" color="#333" size="22" type="iconicon-phone"></layout-icon>-->
        </div>
      </div>
      <div class="toolbar-search" @click="toSearch">
        <div class="toolbar-search-input flex flex-vertical-c">
          <layout-icon type="iconsearch" color="#fff"></layout-icon>
          <span class="m-l-10 color-white fz-12">{{bizSearchKeyWord}}</span>
        </div>
      </div>
      <image @click="toVip" class="toolbar-vip" :src="$getDomain('/static/client/store/theme_two/vip.png')"></image>
    </div>
    <scroll-view :style="{top:headTabTop+'px'}" class="store-comp-wrap" @scrolltolower="bindScrolltolower" scroll-y>
      <!--      <layout-page-title></layout-page-title>-->

      <div class="store-info flex flex-vertical-c" v-if="storeInfo.biz_logo">
        <div @click="toPicture" :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}" class="base-logo">
          <div class="thumbCount" v-if="storePhotoTotal>0">{{storePhotoTotal}}张照片</div>
        </div>
        <div class="info-box flex1">
          <div class="store-name fz-15 m-b-8">{{storeInfo.biz_shop_name}}</div>
          <div class="store-activity-list m-b-8" v-if="flashActivityList.length>0">
            <div class="store-activity-item fz-10" v-for="(item,idx) in flashActivityList" :key="idx"
                 @click="toActivity(item.id)">{{item.name}}
            </div>
          </div>
          <!--<div class="like fz-11">{{storeInfo.follow}}人关注</div>-->
        </div>
        <div class="activity-go">
          <!--          <span class="c7 fz-14">活动详情</span>-->
          <!--          <layout-icon class="fz-10 c4" display="inline" type="iconicon-arrow-right"></layout-icon>-->
        </div>
      </div>

      <div class="section-item coupon-list" :class="couponClassName">
        <div v-for="(coupon,idx) in couponList" :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item">
          <div style="height: 70rpx;" class="coupon-item-bg flex">
            <image mode="heightFix" style="height: 70rpx;"
                   :src="$getDomain('/static/client/store/theme_two/conpon-l.png')"></image>
            <div style="height: 70rpx;" class="flex1 coupon-item-bg-c"
                 :style="{backgroundImage:'url('+$getDomain('/static/client/store/theme_two/coupon-c.png')+')'}">
              <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
              <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
            </div>
            <image mode="heightFix" style="height: 70rpx;"
                   :src="$getDomain('/static/client/store/theme_two/coupon-r.png')"></image>
          </div>
        </div>
      </div>
      <!--便捷操作-->
      <div class="section-item feature-list">
        <div class="feature-item" @click="toOffinePay">
          <image :src="$getDomain('/static/client/store/theme_two/pay.png')" class="feature-item-img"
                 mode="scaleToFill"></image>
        </div>
        <div class="feature-item" @click="toAllProduct">
          <image :src="$getDomain('/static/client/store/theme_two/prod.png')" class="feature-item-img"
                 mode="scaleToFill"></image>
        </div>

      </div>
      <!--秒杀-->
      <div class="section-item kill-box bg-white" v-if="killList.length>0">
        <div class="title p-t-20 p-l-10 p-r-10 flex flex-vertical-c flex-justify-between">
          <div class="fz-20 c3 fz-b">全民秒杀日</div>
          <div class="more flex flex-vertical-c" @click.stop="$linkTo('/pagesA/active/SeckillByBiz?biz_id='+bid)">
            <span class="c3  fz-12">查看更多</span>
            <layout-icon type="iconicon-arrow-right" size="14" color="#333"></layout-icon>
          </div>
        </div>
        <div class="kill-list">
          <div :key="ind" @click="$toGoodsDetail(pro)" class="kill-list-item" v-for="(pro,ind) of killList">
            <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
            <div class="pro-title c3" style="margin-top: 14rpx">
              <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
              {{pro.Products_Name}}
            </div>
            <div class="price-discount" style="padding: 20rpx 0 20rpx 20rpx">
              <div class="price-box" style="color: #FE2C4D">
                <span class="sign" style="font-size: 24rpx;">￥</span><span class="num" style="font-size: 34rpx;">{{pro.price}}</span>
              </div>
              <div class="m-l-6 price-market text-through" style="font-size: 22rpx;">
                <span class="sign">￥</span><span class="num">{{pro.Products_PriceX}}</span>
              </div>

            </div>
            <div class="kill-action">
              <div class="kill-action-reduce">已减{{$filterPrice((pro.Products_PriceX-pro.price))}}元</div>
              <image :src="$getDomain('/static/client/store/theme_two/go-btn-icon.png')" class="kill-action-go"></image>
            </div>
            <div class="kill-countdown">
              <block v-if="!pro.countdown.is_end">
                <span style="color: #E64239;" class="fz-10">距{{pro.countdown.is_start?'结束':'开始'}}:</span>
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
      <!--限时抢购-->
      <div class="section-item flash-box" v-if="activity.spike_goods.length>0||flashActivityList.length>0">
        <div class="title p-15" style="background: #F6F6F6;text-align: center;">
          <image style="width: 294rpx;height: 34rpx;"
                 :src="$getDomain('/static/client/store/theme_two/spkie-title-bg.png')"></image>
        </div>
        <div class="flash-act-list">
          <div class="flash-act-item" v-for="(activity,idx1) in flashActivityList" :key="idx1">
            <div class="flash-act-title flex flex-vertical-c flex-justify-between"
                 :style="{backgroundImage:'url('+$getDomain('/static/client/store/theme_two/spkie-item-top-bg.png')+')'}">
              <div class="title-text">{{activity.name}}</div>
              <div class="more flex flex-vertical-c"
                   @click.stop="$linkTo('/pagesA/active/FlashSaleByBiz?biz_id='+bid+'&spike_id='+activity.id)">
                <span class="fz-12">查看更多</span>
                <layout-icon display="inline" type="iconicon-arrow-right" size="14" color="#fff"></layout-icon>
              </div>
            </div>
            <div class="flash-act-countdown">
              <block v-if="!activity.countdown.is_end">

                <span style="color: #E64239;" class="fz-12 m-r-3">距{{activity.countdown.is_start?'结束':'开始'}}:</span>
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
              <div class="act-goods-item" v-for="(pro,idx) in activity.spike_goods" :key="idx"
                   @click="toGoodsDetailFn(pro,activity)">
                <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
                <div class="act-goods-item-title fz-12 c3 m-t-14 m-b-8">
                  <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
                  {{pro.Products_Name}}
                </div>
                <div class="flex flex-vertical-b">
                  <div class="price-box price-selling ">
                    <span class="sign fz-12">￥</span><span class="num fz-17">{{pro.price}}</span>
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

      <div class="h15" style="background: #f8f8f8"></div>
      <div class="section-item cate-box">
        <div id="section-sale" class="section-anchor" :style="{top:anchorTop+'px'}"></div>
        <div class="title p-t-20 p-b-0" style="text-align: center;">
          <image style="width: 258rpx;height: 34rpx;"
                 :src="$getDomain('/static/client/store/theme_two/sale-top-bg.png')"></image>
        </div>
        <div class="cate-goods-list">
          <div class="fun-goods-col" style="padding: 0 9rpx 0 0rpx">
            <block v-for="(pro,idx) in bizCateList[bizCateNavIndex].productList" :key="idx">
              <div class="fun-goods-item" v-if="idx%2===0" @click="$toGoodsDetail(pro)">
                <div class="product-cover" :style="{backgroundImage:'url('+$getDomain(pro.ImgPath)+')'}"></div>
                <div class="p-t-8 fz-13 c3" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                  {{pro.Products_Name}}
                </div>
                <div class="price-discount flex flex-vertical-c" style="padding: 20rpx 0 20rpx 20rpx">
                  <div class="price-box" style="color: #FE2C4D">
                    <span class="sign" style="font-size: 24rpx;">￥</span><span class="num" style="font-size: 34rpx;">{{pro.Products_PriceX}}</span>
                  </div>
                  <div class="m-l-6 price-market text-through" style="font-size: 22rpx;">
                    <span class="sign">￥</span><span class="num">{{pro.Products_PriceY}}</span>
                  </div>
                </div>
                <div slot="ext" class="goods-action">
                  <div class="goods-action-reduce">已减{{$filterPrice(pro.Products_PriceY-pro.Products_PriceX)}}元</div>
                  <image :src="$getDomain('/static/client/store/theme_two/go-btn-icon.png')"
                         class="goods-action-go"></image>
                </div>
              </div>
            </block>
          </div>
          <div class="fun-goods-col" style="padding: 0 0rpx 0 9rpx">
            <block v-for="(pro,idx) in bizCateList[bizCateNavIndex].productList" :key="idx">
              <div class="fun-goods-item" v-if="idx%2===1" @click="$toGoodsDetail(pro)">
                <div class="product-cover" :style="{backgroundImage:'url('+$getDomain(pro.ImgPath)+')'}"></div>
                <div class="p-t-8 fz-13 c3" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis">
                  {{pro.Products_Name}}
                </div>
                <div class="price-discount flex flex-vertical-c" style="padding: 20rpx 0 20rpx 20rpx">
                  <div class="price-box" style="color: #FE2C4D">
                    <span class="sign" style="font-size: 24rpx;">￥</span><span class="num" style="font-size: 34rpx;">{{pro.Products_PriceX}}</span>
                  </div>
                  <div class="m-l-6 price-market text-through" style="font-size: 22rpx;">
                    <span class="sign">￥</span><span class="num">{{pro.Products_PriceY}}</span>
                  </div>
                </div>
                <div slot="ext" class="goods-action">
                  <div class="goods-action-reduce">已减{{$filterPrice(pro.Products_PriceY-pro.Products_PriceX)}}元</div>
                  <image :src="$getDomain('/static/client/store/theme_two/go-btn-icon.png')"
                         class="goods-action-go"></image>
                </div>
              </div>
            </block>
          </div>
        </div>
        <layout-loading v-if="bizCateList[bizCateNavIndex].load"></layout-loading>
        <!--        <div @click="getCateGoodsList" class="get-more flex flex-justify-c flex-vertical-c" v-if="!bizCateList[bizCateNavIndex].finish">-->
        <!--          <span class="c9 fz-13 m-r-4">查看更多</span>-->
        <!--          <layout-icon type="iconright1" color="#999" size="12"></layout-icon>-->
        <!--        </div>-->
        <div class="h10"></div>
      </div>
      <div class="h15" style="background: #f8f8f8"></div>
      <!--      <div class="section-item store-box">-->
      <!--        <div id="section-store" class="section-anchor" :style="{top:anchorTop+'px'}"></div>-->
      <!--        <div class="title p-15" style="text-align: center;">-->
      <!--          <image style="width: 254rpx;height: 63rpx;" :src="$getDomain('/static/client/store/theme_one/store-list.png')"></image>-->
      <!--        </div>-->
      <!--        <div class="store-list">-->

      <!--          <div class="store-list-item flex flex-vertical-c" v-for="(st,ind) of storeList" :key="ind" >-->
      <!--            <div class="flex1">-->
      <!--              <div @click.stop="goStore(st.biz_id)" class="c3 fz-14 m-b-8">{{st.store_name}}</div>-->
      <!--              <div class="flex flex-vertical-c" @click="$openLocation(st.store_lat,st.store_lon,st.store_name)">-->
      <!--                <layout-icon @click="$openLocation(st.store_lat,st.store_lon,st.store_name)" color="#999" size="15" type="iconicon-address"></layout-icon>-->
      <!--                <span class="c9 fz-11 m-l-4">{{st.area_address}}</span>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <layout-icon @click.stop="$cellPhone(st.store_mobile)" color="#26C78D" size="22" type="iconicon-phone"></layout-icon>-->
      <!--          </div>-->

      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="h15" style="background: #f8f8f8"></div>-->
      <!--评论列表-->
      <!--      <div class="section-item comment-box">-->
      <!--        <div id="section-comment" class="section-anchor" :style="{top:anchorTop+'px'}"></div>-->
      <!--        <div class="block-title">-->
      <!--          留言评论-->
      <!--        </div>-->
      <!--        <div class="comment-list">-->
      <!--          <div class="comment-item" :key="idx" v-for="(item,idx) in comments">-->
      <!--            <layout-comment :comment="item" :isLast="comments.length-1===idx" @comment="clickComment"></layout-comment>-->
      <!--            <div class="comment-send" v-if="item.child.length>0">-->
      <!--              <block :key="ind" v-for="(com,ind) of item.child">-->
      <!--                <block :key="indx" v-for="(co,indx) of com">-->
      <!--                  <block v-if="co.touserid==item.User_ID">-->
      <!--                    <div @click.stop="clickCommentSend(item,co.groupid,co.userid,co)" class="fz-12 c3 comment-send-item">-->
      <!--                      <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}-->
      <!--                    </div>-->
      <!--                  </block>-->
      <!--                  <block v-else>-->
      <!--                    <div  class="fz-12 c3 comment-send-item p-l-10">-->
      <!--                      <span @click.stop="clickCommentSend(item,co.groupid,co.userid,co)" class="color-comment p-r-2">{{co.user_nickname}}</span>-->
      <!--                      <span class="p-l-3 p-r-3">回复</span>-->
      <!--                      &lt;!&ndash;同一行记录里面，点击不同的人名，可以分别回复两个人&ndash;&gt;-->
      <!--                      <span @click.stop="clickCommentSend(item,co.groupid,co.touserid,co,true)" class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}-->
      <!--                    </div>-->
      <!--                  </block>-->

      <!--                </block>-->

      <!--              </block>-->
      <!--            </div>-->
      <!--          </div>-->

      <!--        </div>-->
      <!--        <layout-loading v-if="commentPaginate.load"></layout-loading>-->
      <!--      </div>-->
    </scroll-view>

    <!--    <layout-modal ref="commentModal" @maskClicked="cancelComent">-->
    <!--      <div class="replay-comment-wrap">-->
    <!--        <textarea :disabled="!commentModalShow" :value="commentValue" @input="bindReplyInput" auto-height class="reason" :placeholder="commentModalPlaceholder" placeholder-style="color:#999" />-->
    <!--        <div class="control">-->
    <!--          <div @click="cancelComent" class="action-btn btn-cancel">取消</div>-->
    <!--          <div @click="sureComment" class="btn-sub action-btn">确定</div>-->
    <!--        </div>-->

    <!--      </div>-->
    <!--    </layout-modal>-->

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
import { componetMixin } from '@/mixins/BaseMixin'
import { checkIsExpire, confirm, error, hideLoading, showLoading, toast } from '@/common/fun'
import { getAlbumList, getBizInfo, getBizSpikeList } from '@/api/store'
import { getFlashsaleList, getProductList } from '@/api/product'
import { getCommitList, getCouponList } from '@/api/common'
import { checkIsLogin, getCountdownFunc } from '@/common/helper'
import {
  addFavourite,
  cancelFavourite,
  CartList as getCartList,
  checkFavourite,
  commentReply,
  getUserCoupon
} from '@/api/customer'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import { Exception } from '@/common/Exception'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'
import LayoutLoading from '@/components/layout-loading/layout-loading'
import LayoutPageTitle from '@/components/layout-page-title/layout-page-title'
import LayoutLayer from '@/components/layout-layer/layout-layer'

var countdownInstance = null
var countdownInstanceByFlash = null
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
  name: 'store-theme-two',
  components: {
    LayoutLayer,
    LayoutPageTitle,
    LayoutLoading,
    WzwLiveTag,
    LayoutIcon
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
      isLoading: false,
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
      isFavourite: false,
      commentModalPlaceholder: '请输入内容',
      anchorTop: 0,
      commentModalShow: false,
      bizCateList: [
        {
          load: false,
          page: 1,
          pageSize: 4,
          total: 0,
          finish: false,
          productList: [] // 商品列表
        }
      ],
      bizCateNavIndex: 0,
      scrollTopNum: 0,
      toViewIdx: '',
      pixelRatio: 1,
      bizSearchKeyWord: '请输入商品关键词',
      headTabTop: 100,
      pageScrollTop: 0,
      headTabIndex: 0,
      headTabSticky: false,
      storeInfo: {
        biz_logo: ''
      },
      storeGoodsTotal: 0,
      killList: [],
      flashActivityList: [],
      virtualGoodsLsit: [],
      virtualPaginate: {
        finish: false,
        load: false,
        page: 1,
        pageSize: 3,
        total: 0
      },
      commentItem: {},
      commentValue: '',
      comments: [],
      commentPaginate: {
        finish: false,
        load: false,
        page: 1,
        pageSize: 2,
        total: 0
      },
      couponClassName: '',
      couponList: [],
      storeList: [],
      photoList: [],
      storePhotoTotal: 0,
      spikeList: []
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
  watch: {
    bid: {
      immediate: true,
      handler (nval) {
        if (nval) this._init_func()
      }
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
      }
    },
    refreshCount () {
      this.total_count = this.$store.getters['cart/getTotalNum'](Number(this.bid))
      this.total_price = this.$store.getters['cart/getTotalMoney'](Number(this.bid))
      this.allCheck = this.$store.getters['cart/getListCheckStatus'](Number(this.bid))
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
    bindBackFn () {
      this.$back()
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

            var attr_value = CartList[biz_id][prod_id][attr_id]
            attr_value.checked = true // 手动加上
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

        getProductList({
          ...base,
          pageSize: 1
        }).then(({ totalCount }) => {
          this.storeGoodsTotal = totalCount
        }).catch((err) => {
          throw Error(err.msg)
        })

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
        // 启动限时抢购倒计时，牛逼啊霸哥
        countdownInstanceByFlash = setInterval(this.stampFuncByFlash, 1000)

        // this.goodsList = await getProductList({ pageSize: 2, ...base }, { onlyData: true }).catch(e => {
        //   throw Error(e.msg || '获取商品列表错误')
        // })
        // 虚拟商品
        // this.virtualPaginate.load = true
        // this.virtualGoodsLsit = await getProductList({
        //   pageSize: this.virtualPaginate.page,
        //   page: this.virtualPaginate.page,
        //   prod_order_type: 1,
        //   ...base
        // }).then(res => {
        //   this.virtualPaginate.total = res.totalCount
        //   this.virtualPaginate.page++
        //   this.virtualPaginate.load = false
        //
        //   this.virtualPaginate.finish = (this.virtualGoodsLsit.length + res.data.length) >= res.totalCount
        //   return res.data
        // }).catch(e => {
        //   this.virtualPaginate.load = false
        //   throw Error(e.msg || '获取虚拟商品列表错误')
        // })
        // console.log(this.virtualGoodsLsit, this.virtualPaginate)

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

        // const bizCateList = await getBizProdCateList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
        //   throw Error('获取商家自定义分类失败')
        // })
        //
        // this.bizCateList = bizCateList.map(row => {
        //   return {
        //     ...row,
        //     load: false,
        //     page: 1,
        //     pageSize: 6,
        //     total: 0,
        //     finish: false,
        //     productList: [] // 商品列表
        //   }
        // })

        // console.log('this.bizCateList', this.bizCateList)
        this.changeCateIdx(0)

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
        this.couponClassName = 'iswrap'
        console.log(this.couponList)

        // const { data: commentList, totalCount: commentTotal } = await getCommitList({
        //   biz_id: this.bid,
        //   page: this.commentPaginate.page,
        //   pageSize: this.commentPaginate.pageSize
        // }).catch((e) => {
        //   throw Error('获取评论数据失败')
        // })
        //
        // this.comments = commentList
        // this.commentPaginate.page++
        // this.commentPaginate.total = this.comments
        // this.commentPaginate.finish = this.comments.length >= commentTotal
        //
        // this.storeList = await getStoreList({
        //   biz_id: this.bid,
        //   pageSize: 999
        // }, { onlyData: true }).catch((e) => {
        //   throw Error('获取门店列表数据失败')
        // })
        //
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
		
		
		hideLoading()
        if (checkIsLogin(0, 0)) {
          const { is_favourite = 0 } = await checkFavourite({ biz_id: this.bid }, { onlyData: true }).catch(() => {
            
          })
          this.isFavourite = is_favourite
        }

        // 这个就不要等了吧
        if (!checkIsLogin(0, 0)) {
          throw Error('nocare')
        }

        this.refreshInfoByIsLogin()
        
      } catch (e) {
		hideLoading()
        Exception.handle(e)
      }
    },
    toGoodsDetailFn (pro, activity) {
      this.$linkTo(`/pages/product/detail?prod_id=${pro.Products_ID}&mode=spike&spike_good_id=${pro.id}`)
    },
    toAllProduct () {
      this.$linkTo(`/pagesA/store/productListByMall?biz_id=${this.bid}`)
    },
    toOffinePay () {
      this.$linkTo(`/pagesA/store/offlinePay?biz_id=${this.bid}`)
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
    toSearch () {
      this.$linkTo('/pages/search/result?biz_id=' + this.bid)
    },
    toVip () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pagesA/user/VipList?bid=' + this.bid)
      }
    },
    toApply () {
      this.$linkTo('/pages/product/apply?bid=' + this.bid)
    },
    bindHeadTabClick (idx, viewId) {
      this.headTabIndex = idx
      this.setViewIdx(viewId)
    },
    async getCateGoodsList () {
      // 牛逼啊
      this.changeCateIdx(this.bizCateNavIndex, true)
    },
    async getCommentList () {
      if (this.commentPaginate.finish) {
        toast('没有更多啦', 'none')
        return
      }
      const { data: commentList, totalCount: commentTotal } = await getCommitList({
        biz_id: this.bid,
        page: this.commentPaginate.page,
        pageSize: this.commentPaginate.pageSize
      }).catch((e) => {
        throw Error('获取评论数据失败')
      })

      this.comments = this.comments.concat(commentList)
      this.commentPaginate.page++
      this.commentPaginate.total = this.comments
      this.commentPaginate.finish = this.comments.length >= commentTotal
    },
    async bindScrolltolower () {
      console.log('isToLower')

      this.getCateGoodsList()
    },
    setViewIdx (eleId) {
      this.toViewIdx = eleId
    },
    bindReplyInput (e) {
      this.commentValue = e.detail.value
    },
    cancelComent () {
      this.commentModalShow = false
      this.commentItem = {}
      this.commentValue = ''
      this.commentItem.groupid = ''
      this.commentItem.User_ID = ''
      this.commentModalPlaceholder = '请输入内容'
      this.$closePop('commentModal')
    },
    async sureComment () {
      if (!this.commentValue) {
        error('评论内容不能为空')
        return
      }
      const data = {
        touserid: this.commentItem.User_ID,
        commit_id: this.commentItem.Item_ID,
        content: this.commentValue
      }
      if (this.commentItem.groupid) {
        data.groupid = this.commentItem.groupid
      }
      commentReply(data).then(res => {
        toast('评论成功')
        this.commentValue = ''
        getCommitList({
          biz_id: this.bid,
          pageSize: 3
        }, { onlyData: true }).then(res => {
          this.comments = res
        }).catch((e) => {
          error(e.msg || '获取评论数据失败')
        })
        this.commentModalShow = false
        this.$closePop('commentModal')
      }).catch(e => {
        error(e.msg || '评论失败')
        this.commentItem = {}
        this.commentValue = ''
        this.commentModalShow = false
        this.$closePop('commentModal')
      })
    },
    clickComment (item) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = Object.assign({}, item)
      this.commentItem.groupid = ''
      this.commentModalPlaceholder = `回复${item.User_NickName}`
      this.commentModalShow = true
      this.$refs.commentModal.show()
    },
    clickCommentSend (item, goupId, userId, co, secondReply = false) {
      console.log(co)
      if (!checkIsLogin(1, 1)) return
      this.commentItem = Object.assign({}, item)
      this.commentItem.groupid = goupId
      this.commentItem.User_ID = userId
      if (!secondReply) {
        this.commentModalPlaceholder = `回复${co.user_nickname}`
      } else {
        this.commentModalPlaceholder = `回复${co.to_user_nickname}`
      }
      this.commentModalShow = true
      this.$refs.commentModal.show()
    },
    async changeCateIdx (idx, more = false) {
      // 多次触发
      if (this.isLoading) return
      this.isLoading = true
      if (!more) {
        // if (idx === this.bizCateNavIndex) return// 重复点击不要了
        this.bizCateNavIndex = idx
      }

      if (this.bizCateList[this.bizCateNavIndex].finish) return // 到底了
      const base = { biz_ids: this.bid }
      try {
        const biz_cate = this.bizCateList[this.bizCateNavIndex]
        this.bizCateList[this.bizCateNavIndex].load = true
        const { data: newList, totalCount } = await getProductList({
          ...base,
          page: biz_cate.page,
          pageSize: biz_cate.pageSize
        }).catch(err => {
          throw Error(err.msg)
        })

        this.bizCateList[this.bizCateNavIndex].page++
        this.bizCateList[this.bizCateNavIndex].productList = biz_cate.productList.concat(newList)

        this.bizCateList[this.bizCateNavIndex].finish = this.bizCateList[this.bizCateNavIndex].productList.length >= totalCount
        console.log(this.bizCateList[this.bizCateNavIndex])
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.bizCateList[this.bizCateNavIndex].load = false
        this.isLoading = false
      }
    },
    async getMoreByVirtual () {
      if (this.virtualPaginate.finish) return
      try {
        this.virtualPaginate.load = true
        const base = { biz_ids: this.bid }
        // 虚拟商品
        const tempList = await getProductList({
          pageSize: this.virtualPaginate.pageSize,
          page: this.virtualPaginate.page,
          prod_order_type: 1,
          ...base
        }).then(res => res.data).catch(e => {
          throw Error(e.msg || '获取虚拟商品列表错误')
        })
        this.virtualPaginate.page++
        this.virtualGoodsLsit = this.virtualGoodsLsit.concat(tempList)

        this.virtualPaginate.finish = this.virtualGoodsLsit.length >= this.virtualPaginate.total
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.virtualPaginate.load = false
      }
    },
    toPicture () {
      if (this.storePhotoTotal > 0) this.$linkTo('/pagesA/store/photo?bid=' + this.bid)
    },
    taggleFavorite () {
      if (!checkIsLogin(1, 1)) return
      this.isFavourite = !this.isFavourite
      const Action = this.isFavourite ? addFavourite : cancelFavourite
      Action({ biz_id: this.bid }).then(res => {
        toast(res.msg)
      }).catch((e) => {
        Exception.handle(e)
      })
    },
    bindScroll (e) {
      const { scrollTop } = e.detail
      this.pageScrollTop = scrollTop

      // this.headTabSticky = scrollTop >= this.headTabTop
    },
    toActivity (aid) {
      this.$linkTo('/pagesA/active/FlashSaleByBiz?biz_id=' + this.bid + '&spike_id=' + aid)
    },
    goTo () {
      this.$openLocation(this.storeInfo.biz_lat_gd, this.storeInfo.biz_lon_gd, this.storeInfo.biz_shop_name, this.storeInfo.biz_address)
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
  created () {

  },
  onReady () {
    console.log('readyreadyreadyreadyreadyreadyreadyready')
    const { windowWidth } = this.systemInfo
    const pixelRatio = windowWidth / 750
    console.log(windowWidth / 750)
    this.pixelRatio = pixelRatio

    // 以后不再怕顶部有rpx了
    this.headTabTop = this.menuButtonInfo.bottom + 116 * pixelRatio
    console.log(this.headTabTop)

    this.isUserLogin = checkIsLogin(0, 0)

    // var animation = uni.createAnimation({
    //   duration: 100,
    //   timingFunction: 'ease'
    // })

    // animation.width(0).opacity(0).step()
    // this.animationData = animation.export()

    // setTimeout(function() {
    //   animation.translate(30).step()
    //   this.animationData = animation.export()
    // }.bind(this), 1000)

    // 锚点要向上偏移的距离
    // this.anchorTop = (this.menuButtonInfo.bottom + 10 + 55) * -1
  }
}
</script>
<style lang="scss" scoped>
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

  .store-info-toolbar {
    display: flex;
    align-items: center;
    padding: 30rpx 20rpx;
    height: 116rpx;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #eee;

    .actions {
      width: 150rpx;
      box-sizing: border-box;
      padding: 0 30rpx 0 0;
      display: flex;
      align-items: center;

      .action-item {
        flex: 1;
        text-align: center;
      }
    }

    .toolbar-search {
      flex: 1;

      .toolbar-search-input {
        box-sizing: border-box;
        background: rgba(198, 198, 198, 1);
        width: 410rpx;
        height: 56rpx;
        border-radius: 28rpx;
        padding-left: 30rpx;
      }
    }

    .toolbar-vip {
      width: 126rpx;
      height: 54rpx;
    }
  }

  .section-item {
    position: relative;

    .section-anchor {
      position: absolute;
      z-index: -6;
      visibility: hidden;
      width: 1px;
      height: 1px;
    }
  }

  .store-comp-wrap {
    position: absolute;
    width: 750rpx;

    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .top-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 750rpx;
    /*height: 314rpx;*/
    /*z-index: -3;*/
    @include cover-img();

  }

  .navigator-bar {
    position: fixed;
    z-index: 9;
    width: 750rpx;
    left: 0;
    display: flex;
    align-items: center;
  }

  .store-info {
    height: 65px;
    padding: 36rpx 20rpx 0;
    color: #333;

    .base-logo {
      position: relative;
      width: 65px;
      height: 65px;
      background: #f2f2f2;
      border-radius: 50%;
      overflow: hidden;
      @include cover-img();

      .thumbCount {
        position: absolute;
        bottom: 0;
        width: 65px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        font-size: 10px;
        background: rgba(0, 0, 0, .6);
        color: #FFFFff;
      }
    }

    .info-box {
      padding: 0 20rpx;

      .store-name {

      }

      .store-activity-list {
        display: flex;
        align-items: center;
      }

      .store-activity-item {
        overflow: hidden;
        display: inline-block;
        margin-right: 6px;
        height: 18px;
        line-height: 18px;
        padding: 0px 6px;
        border-radius: 4px;
        border: 1px solid $fun-red-color;
        color: $fun-red-color;
      }

    }

    .activity-go {
      display: flex;
      align-items: center;
    }

  }

  .sticky-space {
    position: fixed;
    width: 750rpx;
    top: 0;
    z-index: 3;
    background: #fff;
    //@include cover-img();
  }

  .coupon-list {
    margin: 30rpx 0;
    width: 750rpx;

    &.iswrap {
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;

      .coupon-item {
        display: inline-block;
        margin-left: 20rpx;

        &:last-child {
          margin-right: 20rpx;
        }

        .coupon-item-info {
          bottom: 33rpx;
          left: 16rpx;
          top: 36rpx;

        }

      }
    }

    .coupon-item {
      position: relative;

      .coupon-item-bg {
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .coupon-item-bg-c {
        height: 70rpx;
        margin: 0;
        padding: 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-color: red;
        display: flex;
        align-items: flex-end;

        .sign {
          color: #fff;
          font-size: 22rpx;
          margin-bottom: 10rpx;
        }

        .num {
          font-weight: bold;
          color: #fff;
          font-size: 50rpx;
          height: 50rpx;
          line-height: 50rpx;
          margin-bottom: 10rpx;
        }
      }

      .coupon-item-info {
        position: absolute;
        left: 0;
        top: 0;
        botttom: 0;
        right: 0;
        z-index: 2;
      }
    }
  }

  .feature-list {

    display: flex;
    padding: 0rpx 0 40rpx 0;
    justify-content: center;

    .feature-item {
      flex: 1;
      text-align: center;

      .feature-item-img {
        width: 340rpx;
        height: 120rpx;
        vertical-align: top;
      }

      &:last-child {
        margin-right: 0;
      }
    }

  }

  .kill-list {
    padding: 40rpx 0 50rpx;
    width: 750rpx;
    background: #fff;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;

    .kill-list-item {
      display: inline-block;
      width: 260rpx;
      padding-top: 20rpx;
      margin-left: 20rpx;
      font-size: 24rpx;
      border-radius: 12rpx;
      overflow: hidden;
      box-shadow: 0px 0px 38rpx 0px rgba(166, 4, 39, 0.49);

      &:last-child {
        margin-right: 20rpx;
      }

      .pro-title {
        text-align: center;
        width: 260rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .item-cover {

        width: 173rpx;
        height: 173rpx;
        margin: auto;
        @include cover-img();
      }

      .kill-action {
        height: 50rpx;
        padding: 0 20rpx;
        margin-bottom: 10rpx;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .kill-action-reduce {
          height: 33rpx;
          line-height: 33rpx;
          font-size: 20rpx;
          padding: 0rpx 20rpx;
          box-sizing: border-box;
          color: #fff;
          background: linear-gradient(180deg, rgba(252, 109, 136, 1), rgba(254, 43, 75, 1));
          border-radius: 6rpx;
        }

        .kill-action-go {
          width: 50rpx;
          height: 50rpx;
        }
      }

      .kill-countdown {
        height: 70rpx;
        background: rgba(255, 237, 237, 1);
        display: flex;
        align-items: center;
        justify-content: center;

        .countdown-tag {
          background: #FE2B4B;
          color: #fff;
          font-size: 20rpx;
          padding: 6rpx;
          border-radius: 6rpx;
          text-align: center;
        }

        .countdown-delimiter {
          text-align: center;
          font-size: 20rpx;
          color: #E64239;
          padding: 0 2rpx;
        }
      }

      .price-discount {
        display: flex;
        align-items: flex-end;

        .price-box {
          .sign {
            font-size: 18rpx;
          }

          .num {
            font-size: 24rpx;
          }
        }

        .discount {
          background: $fun-red-color;
          color: #fff;
        }
      }
    }
  }

  .flash-box {
    background: #f8f8f8;

    .flash-act-list {
      padding-bottom: 20rpx;
    }

    .flash-act-item {
      width: 710rpx;
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
        width: 710rpx;
        height: 100rpx;
        color: #fff;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        .more {
          margin-right: 20rpx;
        }

        .title-text {
          margin-left: 30rpx;
        }
      }

      .flash-act-countdown {
        width: 658rpx;
        height: 70rpx;
        margin: 20rpx auto 40rpx;
        background: rgba(255, 244, 243, 1);
        display: flex;
        align-items: center;
        justify-content: center;

        .countdown-tag {
          background: #E64239;
          color: #fff;
          font-size: 28rpx;
          padding: 6rpx;
          border-radius: 6rpx;
          text-align: center;
        }

        .countdown-delimiter {
          text-align: center;
          font-size: 24rpx;
          color: #E64239;
          padding: 0 2rpx;
        }
      }
    }

    .act-goods-list {
      overflow-y: hidden;
      overflow-x: scroll;
      white-space: nowrap;
    }

    .act-goods-item {
      display: inline-block;
      width: 200rpx;
      margin-left: 20rpx;

      .act-goods-item-title {
        width: 200rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .item-cover {
        margin: 0 auto;
        width: 154rpx;
        height: 154rpx;
        @include cover-img();
      }
    }
  }

  .virtual-box {
    background: #fff;

    .virtual-list {
      padding: 20rpx;
      width: 710rpx;

      .virtual-item {
        margin-bottom: 30rpx;
        height: 160rpx;

        .item-cover {
          width: 160rpx;
          height: 160rpx;
          margin-right: 25rpx;
          @include cover-img();
        }

        .product-title {
          font-size: 26rpx;
          line-height: 30rpx;
          max-height: 60rpx;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .btn-buy {
          font-size: 28rpx;
          width: 140rpx;
          height: 58rpx;
          background: rgba(245, 54, 54, 1);
          border-radius: 5rpx;
          text-align: center;
          color: #fff;
          line-height: 58rpx;
        }
      }
    }
  }

  .store-box {
    background: #fff;

    .store-list {
      padding: 0 20rpx 20rpx;
      width: 710rpx;

      .store-list-item {
        padding: 30rpx 24rpx;
        box-sizing: border-box;
        border-bottom: 1px solid #e3e3e3;

        &:first-child {
          padding-top: 10rpx;
        }

        &:last-child {
          border-bottom: none;
        }

        .store-item-address {
          width: 100%;
          box-sizing: border-box;
          padding-left: 2rpx;
          height: 34rpx;
          line-height: 34rpx;
          align-items: center;
        }

        .store-item-font {
          color: #999999;
          font-size: 12px;
          height: 12px;
          line-height: 12px;
        }
      }
    }
  }

  .cate-box {
    background: #fff;

    .cate-goods-list {
      padding: 30rpx 20rpx;
      display: flex;

      .fun-goods-col {
        width: 355rpx;
        box-sizing: border-box;

        .fun-goods-item {
          margin-bottom: 40rpx;

          .product-cover {
            width: 345rpx;
            height: 345rpx;
            border-radius: 8rpx;
            @include cover-img();
          }
        }
      }

      .goods-action {
        height: 58rpx;
        padding: 0 20rpx;
        margin-bottom: 10rpx;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .goods-action-reduce {
          height: 33rpx;
          line-height: 33rpx;
          font-size: 20rpx;
          padding: 0rpx 20rpx;
          box-sizing: border-box;
          color: #fff;
          background: linear-gradient(180deg, rgba(252, 109, 136, 1), rgba(254, 43, 75, 1));
          border-radius: 6rpx;
        }

        .goods-action-go {
          width: 58rpx;
          height: 58rpx;
        }
      }
    }

    .cate-nav {
      width: 750rpx;
      padding: 40rpx 0 20rpx;
      color: #333;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;

      .cate-nav-item {
        position: relative;
        padding: 0;
        margin-right: 40rpx;
        font-size: 15px;
        padding-bottom: 8px;
        display: inline-block;
        color: #333;

        &:first-child {
          margin-left: 40rpx;
        }

        .sale-underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 36rpx;
          height: 4rpx;
          background: $fun-green-color;
        }
      }
    }
  }

  .replay-comment-wrap {
    width: 560rpx;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;

    .reason {
      font-size: 14px;
      min-height: 200px;
      border: 1px solid #E3E3E3;
      line-height: 1.4;
      height: auto;
      width: auto;
      padding: 10px;
    }

    .control {
      margin-top: 15px;
      display: flex;
      justify-content: center;

      .action-btn {
        width: 70px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        text-align: center;
        color: #666;
        background: #e9e9e9;

        &.btn-sub {
          background: #f43131;
          color: white;
          margin-left: 10px;
        }
      }
    }
  }

  .comment-box {
    background: #fff;

    .block-title {
      padding: 20px;
      font-weight: bold;
    }

    .comment-list {
      width: 710rpx;
      padding: 20rpx;

      .comment-item {
        padding: 30rpx 0;
        border-bottom: 1px solid #e8e8e8;

        &:last-child {
          border-bottom: none;
        }
      }

      .comment-send-item {
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }

    .comment-send {
      width: 700rpx;
      box-sizing: border-box;
      padding: 30rpx 20rpx;
      background-color: #F6F6F6;
      border-radius: 6rpx;
      margin-top: 10px;

      &-item {
        width: 600rpx;
        line-height: 40rpx;
      }
    }

    .comment-section {

      padding: 30rpx 25rpx;
      box-sizing: border-box;
      background: white;

    }

    .color-comment {
      color: #476DB9;
      line-height: 50rpx;
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
  }
</style>
