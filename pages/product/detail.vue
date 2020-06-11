<style lang="scss" scoped>
  .live-status-box {
    position: fixed;
    z-index: 3;
    right: 15px;
    bottom: 75px;
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    box-shadow: 0px 0px 20rpx 0px rgba(0, 0, 0, 0.1);

    .icon {
      margin: 7px;
      width: 46px;
      height: 46px;
    }
  }

  .page-wrap {
    background-color: #ffffff;
    width: 750rpx;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .comment-list-drawer {
    transform: translateX(100%);
    position: fixed;
    left: 0;
    bottom: 110rpx;
    width: 100%;
    overflow: hidden;
    text-align: center;
    background: white;
    z-index: 11;
  }

  .share-btn {
    background: none;

    &::after {
      border: none;
    }
  }

  .lazy-box {
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
  }

  .container-wrap {
    position: fixed;
    width: 750rpx;
    top: 0;
    bottom: 60px;
    z-index: 1;
  }

  .head-box-default {
    position: fixed;
    z-index: 3;
    top: 0;
    width: 750rpx;
    background: none;
  }

  .head-box-active {
    position: fixed;
    z-index: 2;
    top: 0;
    width: 750rpx;
    background: #f2f2f2;

    .head-search {
      width: 200rpx;
      height: 32px;
      padding: 0 16px;
      border-radius: 16px;
      background: #fff;
    }
  }

  .head-tab-active {
    position: fixed;
    z-index: 9;
    background: #F2F2F2;
    width: 750rpx;
    height: 40px;
    box-sizing: border-box;
    padding: 10px 0;
    display: flex;

    .head-tab-item {
      flex: 1;
      text-align: center;

      &.active {
        color: $fun-primary-color;
      }
    }

    .head-tab-underline {
      position: absolute;
      bottom: 0;
      margin: 5px 0;
      height: 1px;
      width: 20px;
      background: $fun-primary-color;
    }

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
    background: #fff;
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
    background: #fff;
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
    z-index: 999;
    top: 0;
    width: 750rpx;
    background-color: #ffffff;
    height: 82rpx;
    box-sizing: border-box;
    padding: 0rpx 72rpx;
    justify-content: space-between;

    .li-item {
      width: 60rpx;
      height: 84rpx;
      line-height: 84rpx;
      flex: 1;
      text-align: center;
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
      left: 50%;
      transform: translateX(-50%);
      bottom: 0rpx;
    }
  }

  .tab-containers {
    border-top: 1px solid #f1f1f1;
  }

  .store-info {
    width: 710rpx;
    padding: 0 20rpx;
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

  .section-store {
    background: white;
    padding-bottom: 30rpx;
  }

  .store-list {
    width: 710rpx;
    padding: 0 20rpx;
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

    &:last-child {
    }

    border-bottom: none;
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

  .section-comment {
    background: white;

    .block-title {
    }

    .comment-list {
      padding: 0 25rpx;
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
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    z-index: 10;
  }

  .back-icon {
    position: fixed;
    top: 60rpx;
    left: 20rpx;
    //opacity: 0.5;
    z-index: 9;
  }

  /*分享开始*/
  .shareinfo {
    background: #fff;
    width: 100%;
    padding: 30rpx 0 60rpx;
    color: #333;
    z-index: 100;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
  }

  .shareinfo {
    padding-bottom: 0;
    color: #333;
    font-size: 24rpx;
  }

  .shareinfo > div {
    text-align: center;
  }

  .s_top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s_top .img {
    width: 76rpx;
    height: 76rpx;
    display: block;
    margin: 0 auto 10rpx;
  }

  .s_top > div:nth-child(1) {
    /*margin-right: 120rpx;*/
  }

  .s_bottom {
    position: relative;
    bottom: 0;
    width: 100%;
    background: #e8e8e8;
    color: #666;
    font-size: 26rpx;
    text-align: center;
    line-height: 60rpx;
    margin-top: 16rpx;
  }

  /*分享结束*/
  .refuseApplyDialog {
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

  .color-comment {
    color: #476DB9;
	line-height: 50rpx;
  }

  .comment-item {
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 30rpx;
  }

  /* 领券start */
  .coupon-box {
    padding: 30rpx 20rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-bottom: 20rpx solid #f8f8f8;
  }

  .coupon-box .btn {
    padding: 0 10rpx;
    color: #26C78D;
    border: 1px solid #26C78D;
  }

  .right {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #666666;
    font-weight: 500;
  }

  .right .img {
    width: 20rpx;
    height: 26rpx;
    margin-left: 20rpx;
  }

  /* 领券 end */
  .ticks {
    max-height: 1050rpx;
    position: relative;
    padding-top: 0rpx !important;
    // overflow: scroll;
  }

  .t_title {
    font-size: 30rpx;
    color: #333;
    text-align: center;
    position: relative;
    width: 100%;
    z-index: 999;
    height: 90rpx;
    line-height: 90rpx;
    background-color: #FFFFFF;
  }

  .t_title .delIcon {

    position: absolute;
    top: 0rpx;
    right: 20rpx;
  }

  .t_content {
    position: relative;
    width: 720rpx;
    height: 160rpx;
    background-color: #FDF1E5;
    background-size: cover;
    margin: 0 auto 30rpx;
    padding: 20rpx 0 28rpx 40rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    color: #F43131;
  }

  .t_left {
    float: left;
  }

  .t_left .t_left_t .money {
    font-size: 42rpx;
    margin-right: 10rpx;
  }

  .t_left .t_left_t {
    font-size: 24rpx;
    margin-bottom: 10rpx;
  }

  .t_left .t_left_b {
    margin-top: 6rpx;
  }

  .t_left .t_left_t i {
    font-size: 22rpx;
    font-style: normal;
  }

  .t_left .t_left_c, .t_left .t_left_b {
    font-size: 22rpx;
  }

  .t_right {
    float: right;
    height: 116rpx;
    line-height: 116rpx;
    padding: 0 36rpx;
    font-size: 30rpx;
    border-left: 2rpx dotted #999;
    //width: 124rpx;

    text-align: center;
  }

  .left-btn {
    font-size: 14px;
    padding: 0 20rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    color: #fff;
    border-radius: 42rpx;
    background: #85D4B8; //行内可以覆盖
  }

  .right-btn {
    font-size: 14px;
    margin-left: 10rpx;
    padding: 0 20rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    color: #fff;
    border-radius: 42rpx;
    background: #26C78D; //行内可以覆盖
  }
  .comment-send-item{
    overflow-x: hidden;
  }

</style>
<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div :style="{height:diyHeadHeight+'px',opacity:1-activeHeadOpacity}" class="head-box-default"
         v-show="1-activeHeadOpacity">
      <div :style="{height:menuButtonInfo.top+'px'}"></div>
      <div :style="{height:menuButtonInfo.height+'px',paddingRight:diyHeadRight+'px'}"
           class="flex flex-vertical-c flex-justify-between">
        <layout-icon :plain="false" @click="bindLeftBtnClick" class="m-l-10" color="#fff" size="18" type="iconback1"
                     wrap-padding="6px"></layout-icon>
        <div class="flex flex-vertical-c">
          <button class="action-item share-btn" open-type="share">
            <layout-icon :plain="false" color="#fff" size="18" type="iconshare" wrap-padding="6px"></layout-icon>
          </button>
          <layout-icon :plain="false" @click="$linkTo('/pages/order/ShoppingCart')" class="m-l-10 m-r-10" color="#fff" size="18" type="iconcart"
                       wrap-padding="6px"></layout-icon>
        </div>
      </div>
    </div>

    <div :style="{height:diyHeadHeight+'px',opacity:activeHeadOpacity}" class="head-box-active"
         v-show="activeHeadOpacity">
      <div :style="{height:menuButtonInfo.top+'px'}"></div>
      <div :style="{height:menuButtonInfo.height+'px',paddingRight:diyHeadRight+'px'}"
           class="flex flex-vertical-c flex-justify-between">
        <div class="flex flex-vertical-c">
          <layout-icon :plain="false" @click="bindLeftBtnClick" class="m-l-10" color="#606060" size="18" type="iconback1"
                       wrap-bg="none" wrap-padding="6px"></layout-icon>
          <div @click="$linkTo('/pages/search/index')" class="head-search flex flex-vertical-c">
            <layout-icon color="#606060" type="iconicon-search"></layout-icon>
            <span class="fz-12 c9 p-l-6">搜索商品</span>
          </div>
        </div>
        <div class="flex flex-vertical-c">
          <button class="share-btn" open-type="share">
            <layout-icon :plain="false" color="#606060" size="18" type="iconshare" wrap-bg="none"
                         wrap-padding="6px"></layout-icon>
          </button>
          <layout-icon :plain="false" @click="$linkTo('/pages/order/ShoppingCart')" class="m-l-10 m-r-10" color="#606060" size="18" type="iconcart"
                       wrap-bg="none" wrap-padding="6px"></layout-icon>
        </div>
      </div>
    </div>
    <div :style="{top:diyHeadHeight+'px',opacity:activeHeadOpacity}" class="head-tab-active fz-14 c3"
         v-show="activeHeadOpacity">
      <div :class="{active:headTabIndex===0}" @click="setAcitveTabIndx(0)" class="head-tab-item">宝贝</div>
      <div :class="{active:headTabIndex===1}" @click="setAcitveTabIndx(1)" class="head-tab-item">详情</div>
      <div :class="{active:headTabIndex===2}" @click="setAcitveTabIndx(2)" class="head-tab-item">评价</div>
      <div :class="{active:headTabIndex===3}" @click="setAcitveTabIndx(3)" class="head-tab-item">门店</div>
      <span :animation="tabUnderlineAnimationData" class="head-tab-underline"></span>
    </div>

    <scroll-view
      :scroll-into-view="currentEleId"
      :scroll-with-animation="true"
      :style="{top:scrollViewTop+'px'}"
      @scroll="bindScrollEvent"
      @scrolltolower="bindScrollLowerEvent"
      @scrolltoupper="bindScrollToupperEvent" @touchmove.stop.prevent="bindScrollTouchEvent" class="container-wrap" scroll-y>

      <div id="section0">
        <swiper autoplay="true" circular="true" duration="500"
                indicator-active-color="#26C78D" indicator-color="rgba(0,0,0,.16)" indicator-dots="true" interval="3000" style="height:750rpx;width: 750rpx;">
          <swiper-item :key="index" v-for="(item,index) of imgs">
            <image :src="item+'-r640'" @click="previewImg(index)" class="full-img" v-if="item" />
          </swiper-item>
        </swiper>

        <block v-show="isReady">
          <div class="end-time" v-if="mode==='spike' || mode==='seckill'">
            <block v-if="!countdown.is_end">
              <span>距{{countdown.is_start?'结束':'开始'}}还有：</span>
              <span class="end-time-day">{{countdown.d}}天</span>
              <span class="end-time-block">{{countdown.h}}</span>
              <span class="delimiter">：</span>
              <span class="end-time-block">{{countdown.m}}</span>
              <span class="delimiter">：</span>
              <span class="end-time-block">{{countdown.s}}</span>
            </block>
          </div>
          <div class="product-price fz-14">
            <div class="product-price-left">
              <span class="product-price-red">
                <span class="fz-13">¥</span>
                <span>
                  <block v-if="mode==='spike' || mode==='seckill'">{{productInfo.price}}</block>
                  <block v-else-if="productInfo.is_pintuan">{{productInfo.pintuan_pricex}}</block>
                  <block v-else>{{productInfo.Products_PriceX}}</block>
                </span>
              </span>
              <span class="m-l-5 text-through">
                <span>
                  ¥
                </span>
                <span>
                  <block v-if="mode==='spike' || mode==='seckill' || productInfo.is_pintuan">{{productInfo.Products_PriceX}}</block>
                  <block v-else>{{productInfo.Products_PriceY}}</block>
                </span>

              </span>
            </div>
            <!-- && productInfo.share_commission>0-->
            <div @click="toShare" class="product-price-right" v-if="mode!='gift'">
              <image :src="'/static/client/product/product_share.png'|domain" class="full-img"
                     style="width: 130% !important;"></image>
              <div class="product-share">
                分享赚
              </div>
              <div class="product-price-share">
                <span class="price-q">¥</span>
                {{productInfo.share_commission}}
              </div>
            </div>
          </div>
          <div class="product-title">
            {{productInfo.Products_Name}}
          </div>
          <!-- 领券 -->
          <div @click="$openPop('couponModal')" class="coupon-box" v-if="couponList.length>0">
            <div class="btn">领券</div>
            <div class="right">
              店铺优惠券
              <layout-icon size="20" type="iconicon-arrow-right"></layout-icon>
            </div>
          </div>

          <div class="product-activity m-t-10" v-if="userLevelList.length>0">
            <div class="flex" style="padding-bottom: 30rpx" v-if="active.length>0">
              <div class="product-activity-title">
                优惠活动
              </div>
              <div class="flex1">
                <div class="flex">
                  <div :key="index" class="activity-item" v-for="(item,index) of active">
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
            <div @click="goVipList" class="vip-img">
              <image :src="'/static/client/product/vip.png'|domain" class="full-img"></image>
            </div>
          </div>
          <!-- 服务保障   -->
          <div class="shouhou flex flex-vertical-center" v-if="productInfo.Products_Promise.length>0">
            <block :key="index" v-for="(item,index) in productInfo.Products_Promise">
              <div class="shouhou-item" v-if="item.name">
                <layout-icon class="p-r-4" color="#26C78D" display="inline" type="iconradio-check"></layout-icon>
                {{item.name}}
              </div>
            </block>
          </div>
        </block>
      </div>

      <div class="section-content" id="section1" v-show="isReady">
        <div class="block" style="padding:40rpx 25rpx">
          <div class="block-title">
            <div class="block-title-text fz-b">商品详情</div>
            <div class="block-title-more flex flex-vertical-center c9 fz-12"></div>
          </div>
        </div>
        <block v-if="richTextReady">
          <u-parse :content="richContent"></u-parse>
        </block>

      </div>

      <!--评论列表-->
      <div class="block section-comment" id="section2" v-show="isReady">

        <div class="block-title" style="padding:40rpx 25rpx">
          <div class="block-title-text fz-b">留言评论</div>
          <div @click="openCommentDrawer" class="block-title-more flex flex-vertical-center c9 fz-12">
            <span>查看全部</span>
            <icon class="iconright" color="#999" size="14" type="iconright"></icon>
          </div>
        </div>
        <div class="block-content">
          <div class="comment-list" v-if="comments.length>0">
            <div :key="idx" class="comment-item" v-for="(item,idx) in comments">
              <layout-comment :comment="item" :isLast="comments.length-1===idx"
                              @comment="clickComment"></layout-comment>
              <div class="comment-send" v-if="item.child.length>0">
                <block :key="ind" v-for="(com,ind) of item.child">
                  <block :key="indx" v-for="(co,indx) of com">

                      <block v-if="co.touserid==item.User_ID">
                        <div @click.stop="clickCommentSend(item,co.groupid,co.userid)" class="fz-12 c3 comment-send-item">
                        <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                        </div>
                      </block>
                      <block v-else>
                        <div @click.stop="clickCommentSend(item,co.groupid,co.userid)" class="fz-12 c3 comment-send-item p-l-10">
                        <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                        class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                        </div>
                      </block>

                  </block>

                </block>
              </div>
            </div>

          </div>
          <div class="fz-14 c9 text-center p-10" v-else>
            暂未评论
          </div>
        </div>
      </div>

      <div class="section-store" id="section3" v-show="isReady">
        <div class="block" style="padding:40rpx 25rpx">
          <div class="block-title">
            <div class="block-title-text fz-b">店铺信息</div>
            <div class="block-title-more flex flex-vertical-center c9 fz-12"></div>
          </div>
        </div>

        <div class="store-info flex">
          <div style="width: 96rpx;height: 96rpx;margin-right: 28rpx">
            <image :src="store[0].biz_logo" class="full-img" v-if="store[0].biz_logo"></image>
          </div>
          <div v-if="store[0].biz_shop_name">
            <div class="store-info-title">
              {{store[0].biz_shop_name}}
            </div>
            <div @click="$cellPhone(store[0].biz_account)" class="store-info-call m-b-10">
              <layout-icon color="#999" size="14" type="icontime"></layout-icon>
              <span style="margin: 0rpx 26rpx 0rpx 16rpx"> {{store[0].biz_account}}</span>
              <layout-icon color="#26C78D" size="14" type="iconicon-phone"></layout-icon>
            </div>
            <div @click="$openLocation(store[0].biz_lat_gd,store[0].biz_lon_gd,store[0].biz_shop_name)"
                 class="store-info-call">
              <layout-icon color="#999" size="14" type="iconicon-address"></layout-icon>
              <span style="margin: 0rpx 20rpx 0rpx 16rpx">{{store[0].area_address}}</span>
              <layout-icon color="#26C78D" size="14" type="iconicon-address"></layout-icon>
            </div>
          </div>
        </div>
        <div class="hr h1 m-b-15 m-t-15"></div>
        <div class="store-list">
          <div class="flex flex-justify-between">
            <div class="store-list-top fz-15" style="color: #333333;font-weight: bold">
              <span class="block-div"></span>
              其他门店
            </div>
            <div class="store-list-top">
              {{storeList.length}}家
              <layout-icon color="#999" size="15" type="iconicon-arrow-right"></layout-icon>
            </div>
          </div>
          <div :key="ind" class="store-list-item" v-for="(st,ind) of storeList">
            <div @click.stop="goStore(st.biz_id)" class="store-list-title">
              {{st.store_name}}
            </div>
            <div class="flex flex-justify-between store-list-address">
              <div @click.stop="goStore(st.biz_id)" class="store-list-font">
                {{st.area_address}}
              </div>
              <div class="flex flex-vertical-center">
                <layout-icon @click="$openLocation(st.store_lat,st.store_lon,st.store_name)" color="#26C78D" size="17"
                             type="iconicon-address"></layout-icon>
                <span class="store-su"></span>
                <layout-icon @click.stop="$cellPhone(st.store_mobile)" color="#26C78D" size="17"
                             type="iconicon-phone"></layout-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :style="{height:diyHeadHeight+40+'px'}"></div>

    </scroll-view>

    <!--    <div v-if="!isReady" class="lazy-box" style="position: fixed;top: 0rpx;width: 750rpx;z-index: 102;background: #f8f8f8;" @touchmove.stop.prevent>-->
    <!--      <div style="width: 750rpx;height: 750rpx;background: #f2f2f2;background-size: cover;background-repeat: no-repeat;background-position: center;" :style="{backgroundImage:'url('+thumbTempFilePath+')'}"></div>-->
    <!--      <image mode="widthFix" src="/static/goods/detail-lazy-1.png" style="width: 750rpx;"></image>-->
    <!--      <image mode="widthFix" src="/static/goods/detail-lazy-3.png" style="width: 750rpx;position: fixed;bottom: 0;left: 0;z-index: 102" class=""></image>-->
    <!--    </div>-->

    <div class="safearea-box fixed"></div>
    <product-sku
      :hasCart="hasCart"
      :mode="mode"
      :product-info="productInfo"
      @buyNow="buyNow"
      @submitSure="submitSure"
      @sureSku="save"
      @updaCart="updaCart"
      ref="mySku"
      v-if="productInfo.Products_ID"
    ></product-sku>

    <wzw-goods-action
      :isFavorite="isFavorite"
      @goIM="goIM"
      @goShare="toShare"
      @goStore="goStore(productInfo.biz_id)"
      @tofavorite="tofavorite"
      class="wzw-goods-action"
    >
      <block v-if="mode==='default'" v-slot:action>
        <div class="flex flex-vertical-c">
          <div @click="onePay" class="left-btn">
            <span class="fz-12">单买</span><span class="p-l-4">¥{{productInfo.Products_PriceX}}</span>
          </div>
          <div @click="allPay" class="right-btn" v-if="productInfo.is_pintuan">
            <span class="fz-12">拼团购</span><span class="p-l-4">¥{{productInfo.pintuan_pricex}}</span>
          </div>
        </div>
      </block>

      <block v-if="mode==='gift'" v-slot:action>
        <div @click="onePay" class="right-btn">立即领取</div>
      </block>

      <block v-if="mode==='seckill'" v-slot:action>
        <div @click="onePay" class="right-btn">立即秒杀</div>
      </block>

      <block v-if="mode==='spike'" v-slot:action>
        <div @click="onePay" class="right-btn">立即抢购</div>
      </block>

    </wzw-goods-action>

    <!--    分享 -->
    <!--    <layout-popup  ref="share">-->
    <!--      <div class="shareinfo" >-->
    <!--        <div class="s_top flex">-->
    <!--          <div class="flex1" @click="shareFunc('wx')">-->
    <!--            <image class='img' src="/static/share/share1.png" alt=""></image>-->
    <!--            <div>发送好友</div>-->
    <!--          </div>-->
    <!--          <div class="flex1" @click="shareFunc('wxtimeline')">-->
    <!--            <image class='img' src="/static/share/share3.png" alt=""></image>-->
    <!--            <div>朋友圈</div>-->
    <!--          </div>-->
    <!--          <div class="flex1" @click="shareFunc('wxmini')" >-->
    <!--            <img class='img' src="/static/share/share4.png" alt="">-->
    <!--            <div>微信小程序</div>-->
    <!--          </div>-->
    <!--          <div class="flex1" @click="shareFunc('pic')">-->
    <!--            <image class='img' src="/static/share/share2.png" alt=""></image>-->
    <!--            <div>分享海报</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="s_bottom" @click="cancel">取消</div>-->
    <!--      </div>-->
    <!--    </layout-popup>-->

    <div :animation="commentAnimationData" :style="{top:diyHeadHeight+'px'}" class="comment-list-drawer"
         id="commentList">
      <product-comment></product-comment>
    </div>

    <layout-modal ref="commentModal">
      <div class="refuseApplyDialog">
        <textarea :disabled="!commentModalShow" :value="commentValue" @input="bingReasonInput" auto-height
                  class="reason"
                  placeholder="请输入评论" placeholder-style="color:#999" />
        <div class="control">
          <div @click="cancelComent" class="action-btn btn-cancel">取消</div>
          <div @click="sureComment" class="btn-sub action-btn">确定</div>
        </div>
      </div>
    </layout-modal>

    <layout-popup ref="couponModal">
      <view>
        <div class="t_title ">
          领券
          <layout-icon @click="$closePop('couponModal')" class="delIcon" color="#999" size="14"
                       type="icondel"></layout-icon>
        </div>
        <scroll-view class="ticks" scroll-y=true>
          <div :key="i" class="t_content " v-for="(item,i) of couponList">
            <div class="t_left">
              <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>店铺优惠券<text
                v-if="item.Coupon_UseArea==0">(实体店)</text></span></div>
              <div class="t_left_c">{{item.Coupon_Subject}}</div>
              <div class="t_left_b">
                有效期{{item.Coupon_StartTime.substring(0,10)}}-{{item.Coupon_EndTime.substring(0,10)}}
              </div>
            </div>
            <div @click="getMyCoupon(item.Coupon_ID,i)" class="t_right">立即领取</div>
          </div>
        </scroll-view>
      </view>
    </layout-popup>


    <!--101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期-->
    <div @click="toRoom" class="live-status-box" v-if="liveStatus == 101 || liveStatus == 105 || liveStatus == 102">
      <image class="icon" src="/static/live/live-pre.png" v-if="liveStatus ==102"></image>
      <image class="icon" src="/static/live/live-ing.png" v-if="liveStatus ==101 || liveStatus ==105"></image>
    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  getFlashsaleDetail,
  getProductDetail,
  getProductSharePic,
  getStoreList,
  judgeReceiveGift,
  spikeProdDetail
} from '@/api/product'
import { getActiveInfo, getCommitList, getCouponList, getUserLevel } from '@/api/common'
import { getBizInfo } from '@/api/store'
import { addFavourite, cancelFavourite, checkFavourite, commentReply, getUserCoupon } from '@/api/customer'

import ProductSku from '@/componets/product-sku/product-sku'
import { updateCart } from '@/api/order'
import { formatRichTextByUparseFn } from '@/common/filter'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import WzwGoodsAction from '@/componets/wzw-goods-action/wzw-goods-action'
import LayoutPopup from '@/componets/layout-popup/layout-popup'

import { error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import { buildSharePath, checkIsLogin, getCountdownFunc, getProductThumb } from '@/common/helper'
import uParse from '@/componets/gaoyia-parse/parse'
import Storage from '@/common/Storage'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import { Exception } from '@/common/Exception'
import ProductComment from '@/pages/product/components/product-comment'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

let countdownInstance = null

// #ifdef MP-WEIXIN
const livePlayer = requirePlugin('live-player-plugin')
// #endif

export default {
  name: 'ProductDetail',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    ProductComment,
    LayoutModal,
    LayoutIcon,
    LayoutComment,
    ProductSku,
    WzwGoodsAction,
    uParse,
    LayoutPopup
  },
  data () {
    return {
      liveStatus: 0,
      userLevelList: [], // 是否有会员
      commentDrawerOpen: false,
      commentAnimationData: {},
      thumbTempFilePath: '', // 图片本地地址
      isReady: false,
      richTextReady: false,
      richContent: '',
      // 倒计时
      activeInfo: {
        start_time: '',
        end_time: ''
      },
      countdown: {
        h: 0,
        s: 0,
        m: 0,
        d: 0,
        is_end: true
      },
      mode: 'default',
      commentModalShow: false,
      flashsale_id: '',
      spike_good_id: '', // 限时抢购专用
      tabClick: false,
      scrollViewTop: 0,
      sectionTops: [0, 0, 0, 0], // 记录四个section的top
      currentEleId: '',
      activeHeadOpacity: 0, // 第二套head的透明度
      tabUnderlineAnimationData: {},
      headTabIndex: 0,
      hasCart: false, // 是否有购物车
      tabIndex: 0,
      headTabSticky: false,
      prod_id: '', // 商品id
      recieve: false,
      gift: null, // 赠品id
      gift_attr_id: null,
      isVirtual: 0,
      productInfo: {
        skuvaljosn: {},
        share_commission: 0,
        minPrice: '0', // sku选择框专用
        Products_Name: '',
        Products_PriceX: '0',
        Products_PriceY: '0',
        Products_JSON: {},
        Products_Description: '',
        Products_Promise: []
      }, // 商品数据
      active: [], // 满减活动列表
      store: [{ biz_go: '' }], // 门店
      bizInfo: {},
      storeList: [],
      comments: [],
      commentValue: '',
      couponList: [],
      checkfrom: '',
      postData: {
        prod_id: '',
        qty: 1 // 购买数量
      },
      commentItem: {}, // 要评论的对象
      isFavorite: false
    }
  },
  computed: {
    imgs () {
      try {
        return this.productInfo.Products_JSON.ImgPath
      } catch (e) {
        return []
      }
    },
    initData () {
      return this.$store.state.system.initData
    }
  },
  methods: {
    toRoom () {
      let path = '/pages/product/detail?prod_id=' + this.prod_id

      // 限时抢购
      if (this.mode === 'spike' && this.spike_good_id) {
        path += `&mode=spike&spike_good_id=${this.spike_good_id}`
      }
      // 秒杀
      if (this.mode === 'seckill' && this.flashsale_id) {
        path += `&mode=seckill&flashsale_id=${this.flashsale_id}`
      }
      const roomId = this.productInfo.room_id // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
      const customParams = encodeURIComponent(JSON.stringify({
        path: path,
        owner_id: this.$store.getters['user/getUserId']()// 公共参数
      }))
      // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，
      // 详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
      wx.navigateTo({
        url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
      })
    },
    // 收藏
    tofavorite () {
	  if (!checkIsLogin(1, 1)) return
      if (this.isFavorite) {
        cancelFavourite({ prod_id: this.prod_id }).then(res => {
          toast(res.msg)
          this.isFavorite = false
        }).catch(e => {
          error(e.msg || '取消收藏失败')
        })
      } else {
        addFavourite({ prod_id: this.prod_id }).then(res => {
          toast(res.msg)
          this.isFavorite = true
        }).catch(e => {
          error(e.msg || '收藏失败')
        })
      }
    },
    bindLeftBtnClick () {
      if (this.commentDrawerOpen) {
        this.closeCommentDrawer()
        return
      }
      this.$back()
    },
    openCommentDrawer () {
      this.commentDrawerOpen = true
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease'
      })
      animation.translateX(0).step()
      this.commentAnimationData = animation.export()
    },
    closeCommentDrawer () {
      this.commentDrawerOpen = false
      var animation = uni.createAnimation({
        duration: 400,
        timingFunction: 'ease'
      })
      animation.translateX(this.systemInfo.windowWidth).step()
      this.commentAnimationData = animation.export()
    },
    // 滚动到顶部
    bindScrollToupperEvent () {
      this.scrollViewTop = 0
      // this.setAcitveTabIndx(0, true)
    },
    // 滚动到底部
    // hack底部内容区域小，不够搞事
    bindScrollLowerEvent () {
      console.log('滚动到底部')
      // this.setAcitveTabIndx(3, true)
    },
    bindScrollTouchEvent (e) {
      // console.log('触发Touch')
      // this.tabClick = false // 手动滑动
    },
    bindScrollEvent (e) {
      const { scrollTop } = e.detail
      const h = this.diyHeadHeight + 40 // 滑到这里的时候,就透明度为1

      // this.scrollViewTop = scrollTop > h ? h : scrollTop

      const opacity = scrollTop / h
      this.activeHeadOpacity = opacity > 1 ? 1 : opacity

      // 生效一次，就取消掉
      if (this.tabClick) {
        this.tabClick = false
        return// 手动点击的别就别自作多情了
      }
      /** 根据滑动的位置切换tab start **/
      const currentScrollTop = scrollTop + 10// 顶部有部分是看不到的，所以要加上他 //额外给10算是精度吧

      if (currentScrollTop > this.sectionTops[3]) {
        this.setAcitveTabIndx(3, true)
        return
      }

      if (currentScrollTop > this.sectionTops[2]) {
        this.setAcitveTabIndx(2, true)
        return
      }

      if (currentScrollTop > this.sectionTops[1]) {
        this.setAcitveTabIndx(1, true)
        return
      }

      if (currentScrollTop > this.sectionTops[0]) {
        this.setAcitveTabIndx(0, true)
      }

      /** 根据滑动的位置切换tab end **/
    },
    /**
     * 切换tab
     * @param idx
     * @param stop 人为控制，则无需切换current-ele
     */
    setAcitveTabIndx (idx, stop = false) {
      this.tabClick = true// 标记为改动
      this.headTabIndex = idx

      var underlineAnimation = uni.createAnimation({
        duration: 200,
        timingFunction: 'ease'
      })

      const left = this.systemInfo.windowWidth / 4 * idx + this.systemInfo.windowWidth / 4 / 2 - 10 + 'px'

      // 正下方
      underlineAnimation.width('40px').left(left).step()
      underlineAnimation.width('20px').step()

      this.tabUnderlineAnimationData = underlineAnimation.export()
      this.scrollViewTop = idx > 0 ? 110 : 0
      if (!stop) {
        this.currentEleId = `section${idx}`
      }
    },
    // 领取优惠券
    getMyCoupon (item, i) {
      if (!checkIsLogin(1, 1)) return
      if (this.isLoading === true) return
      this.isLoading = true
      const data = {
        coupon_id: item
      }
      getUserCoupon(data, {
        tip: '领取中',
        mask: true
      }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none'
        })
        this.isLoading = false
        this.page = 1
        this.couponList.splice(i, 1)

        if (this.couponList.length <= 0) {
          this.$closePop('couponModal')
        }
      }).catch(e => {
        this.isLoading = false
      })
      // this.getCoupon();
    },

    goVipList () {
      const url = '/pagesA/user/VipList?bid=' + this.productInfo.biz_id
      this.$linkTo(url)
    },
    goIM () {
      if (!checkIsLogin(1, 1)) return
      this.$linkTo(`/pagesA/support/Im?type=biz&tid=${this.productInfo.biz_id}&productId=${this.prod_id}&room_title=${this.bizInfo.biz_shop_name}`)
    },
    goStore (bid) {
      const url = '/pages/store/index?biz_id=' + bid
      this.$linkTo(url)
    },
    bingReasonInput (e) {
      this.commentValue = e.detail.value
    },
    cancelComent () {
      this.commentValue = ''
      this.$closePop('commentModal')
      this.commentModalShow = false
    },
    async sureComment () {
      if (!checkIsLogin(1, 1)) return
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
      await commentReply(data).then(res => {
        toast('评论成功')
        this.commentValue = ''
        this.$closePop('commentModal')
        this.commentModalShow = false
        this.getCommit()
      }).catch(e => {
        error(e.msg || '评论失败')
        this.$closePop('commentModal')
        this.commentModalShow = false
      })
    },
    async getCommit () {
      this.comments = await getCommitList({
        Products_ID: this.productInfo.Products_ID,
        pageSize: 999,
        page: 1
      }, {
        onlyData: true
      }).catch((e) => {
        throw Error('获取评论数据失败')
      })
    },
    clickComment (item) {
      this.commentItem =Object.assign({}, item)
      this.$refs.commentModal.show()
      this.commentModalShow = true
      this.commentItem.groupid = ''
    },
    clickCommentSend (item, goupId, userId) {
      this.commentItem = Object.assign({}, item)
      this.commentItem.groupid = JSON.parse(JSON.stringify(goupId))
      this.commentItem.User_ID = JSON.parse(JSON.stringify(userId))
      this.$refs.commentModal.show()
      this.commentModalShow = true
    },
    toShare () {
      if (!checkIsLogin(1, 1)) return
      let url = '/pages/share/go?prod_id=' + this.prod_id

      // 限时抢购
      if (this.mode === 'spike' && this.spike_good_id) {
        url += `&mode=spike&spike_good_id=${this.spike_good_id}`
      }
      // 秒杀
      if (this.mode === 'seckill' && this.flashsale_id) {
        url += `&mode=seckill&flashsale_id=${this.flashsale_id}`
      }

      this.$linkTo(url)
    },
    onePay () {
      if (!checkIsLogin(1, 1)) return

      // 赠品
      if (this.mode === 'gift') {
        this.lingqu()
        return
      }
      // 重置参数，后面有需要再设置回来
      this.productInfo.minPrice = this.productInfo.Products_PriceX
      this.checkfrom = ''

      if (this.mode === 'default') {
        this.hasCart = true
      }

      if (this.mode === 'spike') {
        this.hasCart = false
        this.postData.active = 'spike' // 标记为是限时抢购
        this.checkfrom = 'spike'
        this.productInfo.minPrice = this.productInfo.price
      }

      if (this.mode === 'seckill') {
        this.hasCart = false
        this.postData.active_id = this.productInfo.id // 秒杀id
        this.checkfrom = 'seckill'
        this.postData.active = 'flashsale' // 标记为是秒杀
        this.productInfo.minPrice = this.productInfo.price
      }

      // 如果是有下单模板的商品,或者是虚拟商品，都不能加入购物车
      if (this.productInfo.order_temp_id || this.productInfo.Products_IsVirtual === 1) {
        this.hasCart = false
      }

      this.$refs.mySku.show()
    },
    allPay () {
      if (!checkIsLogin(1, 1)) return
      this.hasCart = false
      this.postData.active = 'pintuan' // 标记为是拼团
      this.checkfrom = 'group'

      // 限时抢购
      // if (this.mode === 'spike' && this.spike_good_id) {
      //   postData.active_id = this.spike_good_id
      // }
      this.productInfo.minPrice = this.productInfo.pintuan_pricex
      this.$refs.mySku.show()
    },
    async submitSure (sku) {
      try {
        console.log('derail')
        showLoading()
        const postData = {
          prod_id: this.prod_id, // 产品ID
          attr_id: sku.id, // 选择属性id
          // count: sku.count, // 选择属性的库存
          qty: sku.qty, // 购买数量
          cart_key: 'DirectBuy' // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          // productDetail_price: sku.price
        }
        // 拼团用的
        if (this.postData.active === 'pintuan') {
          postData.active = 'pintuan'
        }
        // 限时抢购
        if (this.mode === 'spike' && this.spike_good_id) {
          postData.active_id = this.spike_good_id
          postData.active = 'spike'
        }
        // 秒杀
        if (this.mode === 'seckill' && this.flashsale_id) {
          postData.active_id = this.flashsale_id
          postData.active = 'flashsale'
        }
        if (this.mode === 'seckill') {
          if (!this.postData.active_id) {
            modal('秒杀活动id错误')
            return
          }
          postData.active_id = this.postData.active_id
        }
        await updateCart(postData).catch(e => {
          throw Error(e.msg || '下单失败')
        })
        const { order_temp_id = '', biz_id = '' } = this.productInfo
        const url = `/pages/order/OrderBooking?cart_key=DirectBuy&order_temp_id=${order_temp_id}&biz_id=${biz_id}&checkfrom=${this.checkfrom}`
        this.$linkTo(url)
      } catch (e) {
        this.$modal(e.message)
      } finally {
        hideLoading()
      }
    },
    updaCart (sku) {
      // 加入购物车
      const data = {
        cart_key: 'CartList',
        prod_id: this.productInfo.Products_ID,
        qty: sku.qty,
        attr_id: sku.id
      }

      // 限时抢购
      if (this.mode === 'spike' && this.spike_good_id) {
        data.active_id = this.spike_good_id
        data.active = 'spike'
      }
      // 秒杀
      if (this.mode === 'seckill' && this.flashsale_id) {
        data.active_id = this.flashsale_id
        data.active = 'flashsale'
      }
      updateCart(data).then(res => {
        toast('加入购物车成功')
      }).catch(e => {
        error(e.msg || '加入购物车失败')
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
          prod_id: this.prod_id, // 产品ID
          attr_id: sku.id, // 选择属性id
          count: sku.count, // 选择属性的库存
          qty: sku.qty, // 购买数量
          cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          productDetail_price: sku.price
        }

        // 限时抢购
        if (this.mode === 'spike' && this.spike_good_id) {
          postData.active_id = this.spike_good_id
          postData.active = 'spike'
        }
        // 秒杀
        if (this.mode === 'seckill' && this.flashsale_id) {
          postData.active_id = this.flashsale_id
          postData.active = 'flashsale'
        }

        await updateCart(postData).catch(e => {
          throw Error(e.msg || '下单失败')
        })
        this.$linkTo('/pages/order/OrderBooking?cart_key=DirectBuy')
      } catch (e) {
        this.$modal(e.message)
      } finally {
        hideLoading()
      }
    },
    changeTabIndex (event) {
      const { current, source } = event.detail
      this.tabIndex = current
    },
    // 立即领取
    async lingqu () {
      if (this.isVirtual) {
        this.directBuy()
        return
      }

      try {
        showLoading()
        this.postData.cart_key = 'DirectBuy'
        // 领取礼物
        this.postData.attr_id = this.gift_attr_id
        this.postData.prod_id = this.prod_id
        await updateCart(this.postData).catch((e) => {
          throw Error(e.msg || '赠品加入购物车失败')
        })
        this.$linkTo('/pages/order/OrderBooking?cart_key=DirectBuy&gift=gift')
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
    async shareFunc (channel) {
      if (!checkIsLogin(1, 1)) return
      const _self = this
      const path = 'pages/product/detail?prod_id=' + this.prod_id
      const front_url = this.initData.front_url
      const shareObj = {
        title: this.productInfo.Products_Name,
        desc: this.productInfo.Products_BriefDescription,
        imageUrl: getProductThumb(this.productInfo.ImgPath),
        path: buildSharePath(path)
      }

      switch (channel) {
        case 'wx':
          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl,
            success: function (res) {
            },
            fail: function (err) {
            }
          })
          break
        case 'wxtimeline':
          uni.share({
            provider: 'weixin',
            scene: 'WXSenceTimeline',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl,
            success: function (res) {
            },
            fail: function (err) {
            }
          })
          break
        case 'wxmini':
          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 5,
            imageUrl: shareObj.imageUrl,
            title: shareObj.title,
            miniProgram: {
              id: _self.wxMiniOriginId,
              path: '/' + shareObj.path,
              type: 0,
              webUrl: 'http://uniapp.dcloud.io'
            },
            success: ret => {
            }
          })
          break
        case 'pic':
          // this.$toast('comming soon')
          const res = await getProductSharePic({ product_id: this.prod_id }, {
            tip: '努力加载中',
            mask: true
          })
          Storage.set('temp_sharepic_info', res.data)
          const sharePic = res.data.img_url
          if (!sharePic) {
            error('获取分享参数失败')
            return
          }
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/product/SharePic/SharePic'
            })
          }, 200)
          // uni.previewImage({
          // 	urls: [sharePic],
          // 	indicator:'default',
          // 	current:0
          // });
          break
      }
    },
    // 预览图片
    previewImg (index) {
      const imgs = this.imgs
      uni.previewImage({
        urls: imgs,
        indicator: 'default',
        current: index
      })
    },
    stampFunc () {
      const data = getCountdownFunc({
        start_timeStamp: this.activeInfo.start_time,
        end_timeStamp: this.activeInfo.end_time
      })
      if (data) {
        this.countdown = data
      } else {
        clearInterval(countdownInstance)
      }
    },
    async _init_func (options) {
      try {
        showLoading()

        if (options.gift) {
          this.gift = options.gift
          this.postData.active_id = options.gift
          this.postData.active = 'gift'

          if (!checkIsLogin()) {
            return
          }
          const giftInfo = await judgeReceiveGift({ gift: this.gift }, { onlyData: true }).catch(e => {
            throw Error(e.msg || '获取赠品详情失败')
          })
          this.gift_attr_id = giftInfo.attr_id
          this.skuval = giftInfo.skuval
          this.recieve = true
        }

        // 获取优惠券
        this.page = 1
        const data = {
          prod_id: this.prod_id
        }

        const productInfo = await getProductDetail(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品详情失败')
        })
        Object.assign(this.productInfo, productInfo)

        const { room_id } = productInfo
        if (room_id) {
          // 首次获取立马返回直播状态
          const roomId = room_id // 房间 id
          livePlayer.getLiveStatus({ room_id: roomId })
            .then(res => {
              // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
              this.liveStatus = res.liveStatus

              console.log('get live status', res.liveStatus)
            })
            .catch(err => {
              console.log('get live status', err)
            })
        }

        if (checkIsLogin(0, 0)) {
          const is_favourite = await checkFavourite(data, { onlyData: true }).catch(e => {
            throw Error(e.msg || '检查商品是否收藏失败')
          })
          this.isFavorite = Number(is_favourite.is_favourite) === 1
        }

        this.analysisExt.options.biz_id = productInfo.biz_id

        this.userLevelList = await getUserLevel({ biz_id: productInfo.biz_id }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品详情失败')
        })

        // 秒杀
        if (this.mode === 'seckill') {
          const seckillInfo = await getFlashsaleDetail({ flashsale_id: this.flashsale_id }).then(res => {
            return res.data
          }).catch(e => {
            throw Error(e.msg || '获取秒杀信息错误')
          })

          Object.assign(this.productInfo, seckillInfo)
          this.activeInfo.start_time = seckillInfo.start_time
          this.activeInfo.end_time = seckillInfo.end_time

          for (var i in this.productInfo.skuvaljosn) {
            for (var k in seckillInfo.attr_json) {
              if (this.productInfo.skuvaljosn[i].Attr_Value_text === seckillInfo.attr_json[k].name) {
                this.productInfo.skuvaljosn[i].Attr_Price = seckillInfo.attr_json[k].price
                this.productInfo.skuvaljosn[i].Property_count = seckillInfo.attr_json[k].count
              }
            }
          }
          countdownInstance = setInterval(this.stampFunc, 1000)
        }

        // 限时抢购
        if (this.mode === 'spike') {
          const spikeInfo = await spikeProdDetail({ spike_good_id: this.spike_good_id }).then(res => {
            return res.data
          }).catch(e => {
            throw Error(e.msg || '获取限时抢购详情错误')
          })
          console.log(spikeInfo)
          Object.assign(this.productInfo, spikeInfo)

          this.activeInfo.start_time = spikeInfo.start_time
          this.activeInfo.end_time = spikeInfo.end_time

          // 替换显示抢购的价格
          for (var j in this.productInfo.skuvaljosn) {
            this.productInfo.skuvaljosn[j].Attr_Price = this.productInfo.skuvaljosn[j].xs_pricex
          }
          countdownInstance = setInterval(this.stampFunc, 1000)
        }

        // this.productInfo.Products_Promise = [{ name: '随时退款' }, { name: '随时退款' }, { name: '随时退款' }, { name: '随时退款' }]
        // this.productInfo.Products_Description = formatRichTextByUparseFn(this.productInfo.Products_Description)

        this.richContent = formatRichTextByUparseFn(this.productInfo.Products_Description)
        this.richTextReady = true
        this.isVirtual = this.productInfo.Products_IsVirtual === 1

        this.isReady = true

        const couponParam = {
          pageSize: 999,
          page: 1,
          status: 3,
          front_show: 1,
          biz_id: this.productInfo.biz_id
        }

        this.couponList = await getCouponList(couponParam, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取优惠券失败')
        })

        this.comments = await getCommitList({
          Products_ID: this.productInfo.Products_ID,
          pageSize: 999,
          page: 1
        }, {
          onlyData: true
        }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.store = await getBizInfo({ biz_id: this.productInfo.biz_id }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取店铺信息失败')
        })

        this.bizInfo = this.store[0]

        this.storeList = await getStoreList({ biz_id: this.productInfo.biz_id }, {
          onlyData: true
        }).catch(e => {
          throw Error(e.msg || '获取店铺列表失败')
        })

        const res = await getActiveInfo({
          biz_id: this.productInfo.biz_id,
          type: 'manjian'
        }, { onlyData: true }).catch(e => {
        })
        if (res !== null && res.active_info) {
          this.active = res.active_info
        }

        hideLoading()

        await new Promise(resolve => {
          setTimeout(() => {
            resolve(true)
          }, 1000)
        })

        const query = uni.createSelectorQuery()
        this.$nextTick().then(() => {
          const task0 = new Promise(resolve => {
            query.select('#section0').boundingClientRect(data => {
              this.$set(this.sectionTops, 0, data.top)
              resolve()
            }).exec()
          })

          const task1 = new Promise(resolve => {
            query.select('#section1').boundingClientRect(data => {
              this.$set(this.sectionTops, 1, data.top)
              resolve()
            }).exec()
          })

          const task2 = new Promise(resolve => {
            query.select('#section2').boundingClientRect(data => {
              this.$set(this.sectionTops, 2, data.top)
              resolve()
            }).exec()
          })

          const task3 = new Promise(resolve => {
            query.select('#section3').boundingClientRect(data => {
              this.$set(this.sectionTops, 3, data.top)
              resolve()
            }).exec()
          })

          Promise.all([task0, task1, task2, task3]).then(res => {
            console.log('获取尺寸完毕')
          })
        })
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    }
  },
  onReady () {
    this.setAcitveTabIndx(0)
    // sectionTops
  },
  onPageScroll (e) {
    // console.log(e)

  },
  mounted () {

  },
  onLoad (options) {
    const { mode, spike_good_id, flashsale_id, prod_id } = options
    if (!prod_id) {
      modal('产品id必传')
      setTimeout(() => {
        this.$back()
      }, 1000)
    }
    this.prod_id = prod_id
    if (mode) this.mode = mode
    if (spike_good_id) this.spike_good_id = spike_good_id
    if (flashsale_id) this.flashsale_id = flashsale_id

    // 秒杀

    // if (Storage.get('thumbTempFilePath')) {
    //   this.thumbTempFilePath = Storage.get('thumbTempFilePath')
    // }

    this._init_func(options)
  },
  // 自定义小程序分享
  onShareAppMessage () {
    let path = '/pages/product/detail?prod_id=' + this.prod_id

    // 限时抢购
    if (this.mode === 'spike' && this.spike_good_id) {
      path += `&mode=spike&spike_good_id=${this.spike_good_id}`
    }
    // 秒杀
    if (this.mode === 'seckill' && this.flashsale_id) {
      path += `&mode=seckill&flashsale_id=${this.flashsale_id}`
    }

    const shareObj = {
      title: this.productInfo.Products_Name,
      desc: this.productInfo.Products_BriefDescription,
      imageUrl: this.productInfo.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  }
}
</script>
