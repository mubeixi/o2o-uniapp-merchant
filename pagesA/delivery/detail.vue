<style lang="scss" scoped>
  .page-wrap {
    background-color: #ffffff;
    width: 750rpx;
    overflow-x: hidden;
    overflow-y: hidden;
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
    width: 164rpx;
    height: 60rpx;
    margin-right: 20rpx;
    background: $fun-primary-color;
    border-radius: 10rpx;
    text-align: center;
    line-height: 60rpx;
    color: #fff;
  }
  
  .share-box {
    position: fixed;
    right: 0;
    bottom: 300rpx;
    z-index: 9;
    width: 168rpx;
    height: 70rpx;
    //position: relative;
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
  
  .section-store-info {
    margin: 40rpx 0;
    padding: 30rpx;
    background: #fff;
    
    .into-btn {
      width: 140rpx;
      height: 58rpx;
      line-height: 58rpx;
      text-align: center;
      border: 1px solid #b6b6b6;
      border-radius: 10rpx;
    }
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

</style>
<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div :style="{height:diyHeadHeight+'px',opacity:1-activeHeadOpacity}" class="head-box-default"
         v-show="1-activeHeadOpacity">
      <div :style="{height:menuButtonInfo.top+'px'}"></div>
      <div :style="{height:menuButtonInfo.height+'px',paddingRight:diyHeadRight+'px'}"
           class="flex flex-vertical-c flex-justify-between">
        <layout-icon :plain="false" @click="$back()" class="m-l-10" color="#fff" size="18" type="iconback1"
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
          <layout-icon :plain="false" @click="$back()" class="m-l-10" color="#606060" size="18" type="iconback1"
                       wrap-bg="none" wrap-padding="6px"></layout-icon>
          <div @click="$linkTo('/pages/search/index')" class="head-search flex flex-vertical-c">
            <layout-icon color="#606060" type="iconicon-search"></layout-icon>
            <span class="fz-12 c9 p-l-6">搜索商品</span>
          </div>
        </div>
        <div class="flex flex-vertical-c">
          <button class="action-item share-btn" open-type="share">
            <layout-icon :plain="false" color="#606060" size="18" type="iconshare" wrap-bg="none"
                         wrap-padding="6px"></layout-icon>
          </button>
          <layout-icon :plain="false" @click="$linkTo('/pages/order/ShoppingCart')" class="m-l-10 m-r-10" color="#606060" size="18" type="iconcart"
                       wrap-bg="none" wrap-padding="6px"></layout-icon>
        </div>
      </div>
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
            <image :src="item" @click="previewImg(index)" class="full-img" v-if="item" />
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
            <div @click="addCart" class="product-price-right">
              加入购物车
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
          
          <div class="product-activity m-t-10">
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
      
      <div @click="toShare" class="share-box">
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
      
      <!--评论列表-->
      <!--      <div id="section2" class="block section-comment"  v-show="isReady">-->
      <!--        -->
      <!--        <div class="block-title" style="padding:40rpx 25rpx">-->
      <!--          <div class="block-title-text fz-b">留言评论</div>-->
      <!--          <div class="block-title-more flex flex-vertical-center c9 fz-12">-->
      <!--            <span>查看全部</span>-->
      <!--            <icon class="iconright" type="iconright" size="14" color="#999"></icon>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="block-content">-->
      <!--          <div class="comment-list" v-if="comments.length>0">-->
      <!--            <div v-for="(item,idx) in comments" :key="idx" class="comment-item">-->
      <!--              <layout-comment :isLast="comments.length-1===idx" :comment="item"-->
      <!--                              @comment="clickComment"></layout-comment>-->
      <!--              <div class="comment-send" v-if="item.child.length>0">-->
      <!--                <block v-for="(com,ind) of item.child" :key="ind">-->
      <!--                  <block v-for="(co,indx) of com" :key="indx">-->
      <!--                    <div class="fz-12 c3 comment-send-item" @click.stop="clickCommentSend(item,co.groupid,co.userid)">-->
      <!--                      <block v-if="co.touserid==item.User_ID">-->
      <!--                        <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}-->
      <!--                      </block>-->
      <!--                      <block v-else>-->
      <!--                        <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span-->
      <!--                        class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}-->
      <!--                      </block>-->
      <!--                    </div>-->
      <!--                  </block>-->
      <!--                -->
      <!--                </block>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          -->
      <!--          </div>-->
      <!--          <div v-else class="fz-14 c9 text-center p-10">-->
      <!--            暂未评论-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      
      <div @click="$linkTo('/pages/store/index?biz_id='+productInfo.biz_id)" class="section-store-info flex flex-vertical-c" id="section3"
           v-show="isReady">
        <image :src="store[0].biz_logo" style="width: 96rpx;height: 96rpx;margin-right: 28rpx;border-radius: 50%;"
               v-if="store[0].biz_logo"></image>
        <div class="store-info-title">{{store[0].biz_shop_name}}</div>
        <div class="into-btn c9 fz-14">进店逛逛</div>
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
      
      <div :style="{height:diyHeadHeight+40+'px'}"></div>
    
    </scroll-view>
    
    <div @touchmove.stop.prevent class="lazy-box"
         style="position: fixed;top: 0rpx;width: 750rpx;z-index: 102;background: #f8f8f8;" v-if="!isReady">
      <div
        :style="{backgroundImage:'url('+thumbTempFilePath+')'}"
        style="width: 750rpx;height: 750rpx;background: #f2f2f2;background-size: cover;background-repeat: no-repeat;background-position: center;"></div>
      <image mode="widthFix" src="/static/goods/detail-lazy-1.png" style="width: 750rpx;"></image>
      <!--      <image mode="widthFix" src="/static/goods/detail-lazy-2.png" style="width: 750rpx;"></image>-->
      <image class="" mode="widthFix"
             src="/static/goods/detail-lazy-3.png" style="width: 750rpx;position: fixed;bottom: 0;left: 0;z-index: 102"></image>
    </div>
    
    <div class="goods-bottom-action">
      <div class="cart">
        <div @click="$openPop('carts')" class="icon-wrap">
          <layout-icon class="cart-icon" color="#fff" size="18" type="iconicon-cart"></layout-icon>
          <div class="tag">{{totalNum}}</div>
        </div>
      </div>
      <div class="box">
        <div class="prompt">￥{{totalPrice}}</div>
        <div @click="buyNow" class="buy">
          <block v-if="totalPrice>bizInfo.city_express_config.limit_config.start_send_money">下单</block>
          <block v-else>
            ￥{{bizInfo.city_express_config.limit_config.start_send_money}}元起送
          </block>
        </div>
      </div>
    </div>
    
    <layout-layer bottomStr="85rpx" positions="bottom" radius="20rpx" ref="carts">
      <div :style="{height:systemInfo.windowHeight*0.6+'px'}" class="carts-box">
        <div class="carts-list">
          <div :key="idx" class="carts-item" v-for="(row,idx) in carts">
            <div :style="{backgroundImage:'url('+row.ImgPath+')'}" class="carts-item-cover"></div>
            <div class="carts-item-info">
              <div class="title">{{row.Products_Name}}</div>
              <div class="attr-text">{{row.attr_text}}</div>
              <div class="actions">
                <div class="price-box fz-12 flex1">
                  <span class="price-selling">￥</span><span
                  class="price-selling fz-14">{{row.Products_PriceX}}</span><span
                  class="p-l-4 price-market text-through">￥{{row.Products_PriceY}}</span>
                </div>
                <div class="action flex flex-vertical-c" style="width: 150rpx">
                  <block v-if="row.num>0">
                    <layout-icon @click.stop="attrNumMinus(row,idx)" color="#26C78D" size="24"
                                 type="iconicon-minus"></layout-icon>
                    <input :value="row.num" @input="changeAttrNum($event,idx)" class="input-num text-center fz-12" />
                  </block>
                  <layout-icon @click.stop="attrNumPlus(row,idx)" color="#26C78D" size="24"
                               type="iconicon-plus"></layout-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </layout-layer>
    
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
          <div>
          
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
    
    <div class="safearea-box fixed"></div>
    
    <layout-popup ref="couponModal">
      <view style="max-height: 1050rpx;">
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
  
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getProductDetail, getProductSharePic, getStoreList } from '@/api/product'
import { getActiveInfo, getCommitList, getCouponList } from '@/api/common'
import { getBizInfo } from '@/api/store'
import { commentReply, getUserCoupon } from '@/api/customer'

import ProductSku from '@/componets/product-sku/product-sku'
import { updateCart } from '@/api/order'
import { formatRichTextByUparseFn } from '@/common/filter'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import WzwGoodsAction from '@/componets/wzw-goods-action/wzw-goods-action'
import LayoutPopup from '@/componets/layout-popup/layout-popup'

import { error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import {
  buildSharePath,
  checkIsLogin,
  getCountdownFunc,
  getProductThumb,
  mergeObject,
  numberSort,
} from '@/common/helper'
import uParse from '@/componets/gaoyia-parse/parse'
import Storage from '@/common/Storage'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import { Exception } from '@/common/Exception'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

const countdownInstance = null
const attrInfoTmpl = {
  num: 0,
  attr_id: '', // 规格id
  attr_text: '',
  price: '', // 价格
  count: 0,// 库存
}
export default {
  name: 'ProductDetail',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutLayer,
    LayoutModal,
    LayoutIcon,
    LayoutComment,
    ProductSku,
    WzwGoodsAction,
    uParse,
    LayoutPopup,
  },
  data () {
    return {
      activeAttrIdx: 0,
      activeGoodsIdx: 0,
      skujosn_new: null,
      skuvaljosn: null,
      check_attr: {},
      product: {},
      submitFlag: false,
      attrInfo: {
        num: 0,
        attr_id: '', // 规格id
        attr_text: '',
        price: '', // 价格
        count: 0,// 库存
      },
      
      thumbTempFilePath: '', // 图片本地地址
      isReady: false,
      richTextReady: false,
      richContent: '',
      // 倒计时
      activeInfo: {
        start_time: '',
        end_time: '',
      },
      countdown: {
        h: 0,
        s: 0,
        m: 0,
        d: 0,
        is_end: true,
      },
      mode: 'default',
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
      bid: '', // 店铺id
      recieve: false,
      gift: null, // 赠品id
      gift_attr_id: null,
      isVirtual: 0,
      productInfo: {
        minPrice: '0', // sku选择框专用
        Products_Name: '',
        Products_PriceX: '0',
        Products_PriceY: '0',
        Products_JSON: {},
        Products_Description: '',
        Products_Promise: [],
      }, // 商品数据
      active: [], // 满减活动列表
      bizInfo: {},
      store: [{ biz_go: '' }], // 门店
      storeList: [],
      comments: [],
      commentValue: '',
      couponList: [],
      checkfrom: '',
      postData: {
        prod_id: '',
        qty: 1, // 购买数量
      },
      commentItem: {},// 要评论的对象
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
    },
    imgs () {
      try {
        return this.productInfo.Products_JSON.ImgPath
      } catch (e) {
        return []
      }
    },
    initData () {
      return this.$store.state.system.initData
    },
  },
  methods: {
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
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...goodsInfo, ...productInfo },
      })
    },
    async openAttrLayer (goodsInfo) {
      this.attrInfo = { ...attrInfoTmpl } // 重置
      this.check_attr = {}// 重置
      this.product = goodsInfo
      
      if (goodsInfo.skujosn) {
        let skujosn_new = []
        for (const i in goodsInfo.skujosn) {
          skujosn_new.push({
            sku: i,
            val: goodsInfo.skujosn[i],
          })
        }
        
        // 新增如果有手机的规格
        for (const i in goodsInfo.skujosn) {
          if (i === 'mobile_prod_attr_name') {
            skujosn_new = [{
              sku: i,
              val: goodsInfo.skujosn[i],
            }]
          }
        }
        // 结束
        
        this.product.skujosn_new = skujosn_new
        this.product.skuvaljosn = goodsInfo.skuvaljosn
      }
      this.$openPop('attr')
    },
    addCart () {
      if (this.productInfo.skujosn) {
        this.openAttrLayer(this.productInfo)
      } else {
        this.goodsNumPlus(this.productInfo)
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
        product: { attr_id: currentAttrInfo.attr_id },
      })
    },
    addNum () {
      if (this.attrInfo.num < this.attrInfo.count) {
        this.attrInfo.num = Number(this.attrInfo.num) + 1
      } else {
        uni.showToast({
          title: '购买数量不能大于库存量',
          icon: 'none',
        })
        this.attrInfo.num = this.attrInfo.count
      }
      
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...this.product, ...this.attrInfo },
      })
    },
    delNum () {
      if (this.attrInfo.num > 0) {
        this.attrInfo.num -= 1
        
        this.$store.commit('delivery/MINUS_GOODS', {
          num: 1,
          product: { attr_id: this.attrInfo.attr_id },
        })
      } else {
        uni.showToast({
          title: '购买数量不能小于0',
          icon: 'none',
        })
        // this.attrInfo.num = 0
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
        this.$store.commit('delivery/ADD_GOODS', {
          num: amount - this.attrInfo.num,
          product: { ...this.product, ...this.attrInfo },
        })
      }
      if (action === 'minus') {
        this.$store.commit('delivery/MINUS_GOODS', {
          num: this.attrInfo.num - amount,
          product: { ...this.product, ...this.attrInfo },
        })
      }
    },
    confirmAdd () {
      if (!this.submitFlag) return
      this.attrInfo.num++
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { ...this.product, ...this.attrInfo },
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
    attrNumMinus (attr, idx) {
      this.$store.commit('delivery/MINUS_GOODS', {
        num: 1,
        product: { attr_id: attr.attr_id },
      })
    },
    attrNumPlus (attr, idx) {
      this.$store.commit('delivery/ADD_GOODS', {
        num: 1,
        product: { attr_id: attr.attr_id },
      })
    },
    changeAttrNum (e, idx) {
      let amount = parseInt(e.detail.value)
      this.activeAttrIdx = idx
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
        product: { attr_id: currentAttrInfo.attr_id },
      })
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
      const h = this.diyHeadHeight// 滑到这里的时候,就透明度为1
      
      // this.scrollViewTop = scrollTop > h ? h : scrollTop
      
      const opacity = scrollTop / h
      this.activeHeadOpacity = opacity > 1 ? 1 : opacity
      
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
        timingFunction: 'ease',
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
        coupon_id: item,
      }
      getUserCoupon(data, {
        tip: '领取中',
        mask: true,
      }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
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
    goStore (bid) {
      const url = '/pages/store/index?biz_id=' + bid
      this.$linkTo(url)
    },
    bingReasonInput (e) {
      this.commentValue = e.detail.value
    },
    sureComment () {
      if (!checkIsLogin(1, 1)) return
      if (!this.commentValue) {
        error('评论内容不能为空')
        return
      }
      const data = {
        touserid: this.commentItem.User_ID,
        commit_id: this.commentItem.Item_ID,
        content: this.commentValue,
      }
      if (this.commentItem.groupid) {
        data.groupid = this.commentItem.groupid
      }
      commentReply(data).then(res => {
        toast('评论成功')
        this.commentValue = ''
        this.$closePop('commentModal')
      }).catch(e => {
        error(e.msg || '评论失败')
        this.$closePop('commentModal')
      })
    },
    clickComment (item) {
      this.commentItem = item
      this.$refs.commentModal.show()
      this.commentItem.groupid = ''
    },
    clickCommentSend (item, goupId, userId) {
      this.commentItem = item
      this.commentItem.groupid = goupId
      this.commentItem.User_ID = userId
      this.$refs.commentModal.show()
    },
    toShare () {
      const url = '/pages/share/go?prod_id=' + this.prod_id
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
      this.productInfo.minPrice = this.productInfo.pintuan_pricex
      this.$refs.mySku.show()
    },
    async submitSure (sku) {
      try {
        console.log('derail')
        showLoading()
        const postData = {
          prod_id: this.prod_id, // 产品ID  在 onLoad中赋值
          attr_id: sku.id, // 选择属性id
          // count: sku.count, // 选择属性的库存
          qty: sku.qty, // 购买数量
          cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          // productDetail_price: sku.price
        }
        if (this.postData.active) {
          postData.active = this.postData.active
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
        attr_id: sku.id,
      }
      updateCart(data).then(res => {
        toast('加入购物车成功')
      }).catch(e => {
        error(e.msg || '加入购物车失败')
      })
    },
    buyNow () {
      if (!checkIsLogin(1, 1)) return
      if (this.totalPrice > 0 && this.totalPrice > this.bizInfo.city_express_config.limit_config.start_send_money) {
        this.$linkTo('/pages/order/OrderBooking?cart_key=waimai&biz_id=' + this.productInfo.biz_id)
      } else {
        modal('未达到配送价')
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
      const _self = this
      const path = 'pagesA/delivery/detail?prod_id=' + this.prod_id
      const front_url = this.initData.front_url
      const shareObj = {
        title: this.productInfo.Products_Name,
        desc: this.productInfo.Products_BriefDescription,
        imageUrl: getProductThumb(this.productInfo.ImgPath),
        path: buildSharePath(path),
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
            },
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
            },
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
              webUrl: 'http://uniapp.dcloud.io',
            },
            success: ret => {
            },
          })
          break
        case 'pic':
          // this.$toast('comming soon')
          const res = await getProductSharePic({ product_id: this.prod_id }, {
            tip: '努力加载中',
            mask: true,
          })
          Storage.set('temp_sharepic_info', res.data)
          const sharePic = res.data.img_url
          if (!sharePic) {
            error('获取分享参数失败')
            return
          }
          setTimeout(function () {
            uni.navigateTo({
              url: '/pagesA/product/SharePic/SharePic',
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
        current: index,
      })
    },
    stampFunc () {
      const data = getCountdownFunc({
        start_timeStamp: this.activeInfo.start_time,
        end_timeStamp: this.activeInfo.end_time,
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
        
        // 获取优惠券
        this.page = 1
        const data = {
          prod_id: this.prod_id,
        }
        
        const productInfo = await getProductDetail(data, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品详情失败')
        })
        Object.assign(this.productInfo, productInfo)
        
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
          biz_id: this.productInfo.biz_id,
        }
        
        this.couponList = await getCouponList(couponParam, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取优惠券失败')
        })
        
        this.comments = await getCommitList({
          Products_ID: this.productInfo.Products_ID,
          pageSize: 999,
          page: 1,
        }, {
          onlyData: true,
        }).catch((e) => {
          throw Error('获取评论数据失败')
        })
        
        this.store = await getBizInfo({ biz_id: this.productInfo.biz_id }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取店铺信息失败')
        })
        
        this.bizInfo = this.store[0]
        
        this.storeList = await getStoreList({ biz_id: this.productInfo.biz_id }, {
          onlyData: true,
        }).catch(e => {
          throw Error(e.msg || '获取店铺列表失败')
        })
        
        const res = await getActiveInfo({
          biz_id: this.productInfo.biz_id,
          type: 'manjian',
        }, { onlyData: true }).catch(e => {
        })
        if (res !== null && res.active_info) {
          this.active = res.active_info
        }
        
        hideLoading()
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
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
    const { mode = 'waimai', prod_id } = options
    if (!options.bid) {
      modal('店铺id缺失')
      return
    }
    this.bid = options.bid
    if (!prod_id) {
      modal('产品id必传')
      setTimeout(() => {
        this.$back()
      }, 1000)
    }
    this.prod_id = prod_id
    if (mode) this.mode = mode
    
    this._init_func(options)
  },
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pagesA/delivery/detail?prod_id=' + this.prod_id
    const shareObj = {
      title: this.productInfo.Products_Name,
      desc: this.productInfo.Products_BriefDescription,
      imageUrl: this.productInfo.ImgPath,
      path: buildSharePath(path),
    }
    return shareObj
  },
}
</script>
