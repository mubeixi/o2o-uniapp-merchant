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
  .section2 {
    padding: 30rpx 20rpx;
    font-size: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-bottom: 20rpx solid #f8f8f8;
  }
  .section2 .btn {
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
  .right .img{
    width: 20rpx;
    height: 26rpx;
    margin-left: 20rpx;
  }
  /* 领券 end */
  .ticks{
    max-height: 1050rpx;
    position: relative;
    padding-top: 0rpx !important;
    // overflow: scroll;
  }
  .t_title {
    font-size: 30rpx;
    color: #333;
    text-align:center;
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
    color:  #F43131 ;
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
  .t_left .t_left_b{
    margin-top: 6rpx;
  }
  .t_left .t_left_t i {
    font-size: 22rpx;
    font-style: normal;
  }
  .t_left .t_left_c,.t_left .t_left_b{
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

</style>

<template>
  <div class="page-wrap">
    <layout-icon type="iconback" size="24" color="#999" class="back-icon" @click="$back()"></layout-icon>
    <swiper style="height:750rpx;width: 750rpx;" indicator-dots="true" indicator-active-color="#26C78D"
            indicator-color="#ffffff" autoplay="true" interval="3000" duration="500" circular="true">
      <swiper-item v-for="(item,index) of imgs" :key="index">
        <image v-if="item" :src="item" class="full-img" @click="previewImg(index)"/>
      </swiper-item>
    </swiper>
    <!--    <div class="end-time">-->
    <!--      距结束还有：<span class="end-time-day">1天</span><span class="end-time-block">01</span>：<span-->
    <!--      class="end-time-block">01</span>：<span class="end-time-block">01</span>-->
    <!--    </div>-->
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
    <!-- 领券 -->
    <div class="section2"  @click="$openPop('couponModal')">
      <div class="btn">领券</div>
      <div class="right" >
        店铺优惠券
        <layout-icon type="iconicon-arrow-right" size="20"></layout-icon>
      </div>
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

      <div class="vip-img" @click="goVipList">
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
    <ul class="store flex flex-vertical-center " id="tabs" :class="{isStickly:headTabSticky}">
      <li class="li-item" :class="{'color-store':tabIndex===0}" @click="tabIndex=0">
        介绍
        <span class="active" v-if="tabIndex==0"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===1}" @click="tabIndex=1">
        评价
        <span class="active" v-if="tabIndex==1"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===2}" @click="tabIndex=2">
        门店
        <span class="active" v-if="tabIndex==2"></span>
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
          <u-parse :content="detailData.Products_Description"></u-parse>
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
              <div v-for="(item,idx) in comments" :key="idx" class="comment-item">
                <layout-comment :isLast="comments.length-1===idx" :comment="item"
                                @comment="clickComment"></layout-comment>
                <div class="comment-send" v-if="item.child.length>0">
                  <block v-for="(com,ind) of item.child" :key="ind">
                    <block v-for="(co,indx) of com" :key="indx">
                      <div class="fz-12 c3 comment-send-item" @click.stop="clickCommentSend(item,co.groupid,co.userid)">
                        <block v-if="co.touserid==item.User_ID">
                          <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                        </block>
                        <block v-else>
                          <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                          class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                        </block>
                      </div>
                    </block>

                  </block>
                </div>
              </div>

            </div>
          </div>
        </div>
      </swiper-item>
      <swiper-item class="tab-pages">
        <div :style="{height:(systemInfo.windowHeight+'px')}" class="over">
          <div class="store-info flex">
            <div style="width: 96rpx;height: 96rpx;margin-right: 28rpx">
              <image :src="store[0].biz_logo" class="full-img" v-if="store[0].biz_logo"></image>
            </div>
            <div v-if="store[0].biz_shop_name">
              <div class="store-info-title">
                {{store[0].biz_shop_name}}
              </div>
              <div class="store-info-call m-b-10" @click="$cellPhone(store[0].biz_account)">
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
              <div class="store-list-title"  @click.stop="goStore(st.biz_id)">
                {{st.store_name}}
              </div>
              <div class="flex flex-justify-between store-list-address">
                <div class="store-list-font" @click="$openLocation(st.store_lat,st.store_lon,st.store_name)">
                  {{st.area_address}}
                </div>
                <div class="flex flex-vertical-center">
                  <layout-icon type="iconicon-address" size="17" color="#26C78D"
                               @click="$openLocation(st.store_lat,st.store_lon,st.store_name)"></layout-icon>
                  <span class="store-su"></span>
                  <layout-icon type="iconicon-phone" size="17" color="#26C78D"
                               @click.stop="$cellPhone(st.store_mobile)"></layout-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <product-sku ref="mySku" @sureSku="save" :hasCart="hasCart" @submitSure="submitSure" @updaCart="updaCart" @buyNow="buyNow"
                 :proList="detailData"></product-sku>
    <wzw-goods-action class="wzw-goods-action" @goStore="goStore(detailData.biz_id)" @goShare="toBooking" @myPay="myPay"
                      @allPay="allPay">
      <span slot="leftText">单买¥</span>
      <span slot="leftPrice">100.00</span>
      <span slot="rightText">拼团购¥</span>
      <span slot="rightPrice">100.00</span>
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

    <layout-modal ref="commentModal">
      <div class="refuseApplyDialog">
        <textarea class="reason" @input="bingReasonInput" :value="commentValue" placeholder-style="color:#999"
                  placeholder="请输入评论" auto-height/>
        <div class="control">
          <div @click="$closePop('commentModal')" class="action-btn btn-cancel">取消</div>
          <div @click="sureComment" class="btn-sub action-btn">确定</div>
        </div>
      </div>
    </layout-modal>

    <layout-popup ref="couponModal">
      <view style="max-height: 1050rpx;" >
        <div class="t_title ">
          领券
          <layout-icon type="icondel" size="14" class="delIcon"  color="#999" @click="$closePop('couponModal')" ></layout-icon>
        </div>
        <scroll-view class="ticks" v-if="type=='ticks'" scroll-y=true  @scrolltolower="goNextPage">
          <div class="t_content" v-for="(item,i) of couponList" :key="i">
            <div class="t_left">
              <div class="t_left_t"><span>￥</span><span class="money">{{item.Coupon_Cash}}</span><span>店铺优惠券<text v-if="item.Coupon_UseArea==0">(实体店)</text></span></div>
              <div class="t_left_c">{{item.Coupon_Subject}}</div>
              <div class="t_left_b">有效期{{item.Coupon_StartTime}}-{{item.Coupon_EndTime}}</div>
            </div>
            <div class="t_right" @click="getMyCoupon(item.Coupon_ID,i)">立即领取</div>
          </div>
        </scroll-view>
      </view>
    </layout-popup>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getProductDetail, getActiveInfo, getStoreList, getProductSharePic } from '@/api/product'
import { getBizInfo } from '@/api/store'
import { getCommitList, getCouponList } from '@/api/common'
import { commentReply } from '@/api/customer'
import ProductSku from '@/componets/product-sku/product-sku'
import { updateCart } from '@/api/order'
import { formatRichTextByUparseFn } from '@/common/filter'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutComment from '@/componets/layout-comment/layout-comment'
import WzwGoodsAction from '@/componets/wzw-goods-action/wzw-goods-action'
import LayoutPopup from '@/componets/layout-popup/layout-popup'

import {
  showLoading, hideLoading, error, toast
} from '@/common/fun'
import { checkIsLogin, buildSharePath, getProductThumb } from '@/common/helper'
import uParse from '@/componets/gaoyia-parse/parse'
import Storage from '@/common/Storage'
import LayoutModal from '@/componets/layout-modal/layout-modal'
export default {
  name: 'ProductDetail',
  mixins: [BaseMixin],
  components: {
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
      hasCart: false, // 是否有购物车
      tabIndex: 0,
      headTabSticky: false,
      prod_id: '', // 商品id
      detailData: {
        Products_Name: '',
        Products_PriceX: '0',
        Products_PriceY: '0',
        Products_JSON: {},
        Products_Description: '',
        Products_Promise: []
      }, // 商品数据
      active: [], // 满减活动列表
      store: [{ biz_go: '' }], // 门店
      storeList: [],
      comments: [],
      commentValue: '',
      pageSize: 5, // 评论的分页
      page: 1, // 评论的分页
      couponList: [],
      totalCount: 0,
      commentItem: {}// 要评论的对象
    }
  },
  onPageScroll (e) {
    const { scrollTop } = e
    this.headTabSticky = (scrollTop > this.headTabTop)
  },
  methods: {
    getCoupon () {
      const data = {
        pageSize: this.pageSize,
        page: this.page,
        status: 3,
        front_show: 1,
        biz_id: this.detailData.biz_id
      }
      getCouponList(data).then(res => {
        for (const i of res.data) {
          this.couponList.push(i)
        }
        this.totalCount = res.totalCount
      }).catch(e => {
      })
    },
    goVipList () {
      const url = '/pages/user/VipList?bid=' + this.detailData.biz_id
      this.$linkTo(url)
    },
    goStore (bid) {
      const url = '/pages/store/index?bid=' + bid
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
        content: this.commentValue
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
    async shareFunc (channel) {
      const _self = this
      const path = 'pages/product/detail?prod_id=' + this.prod_id
      const front_url = this.initData.front_url
      const shareObj = {
        title: this.detailData.Products_Name,
        desc: this.detailData.Products_BriefDescription,
        imageUrl: getProductThumb(this.detailData.ImgPath),
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
          const res = await getProductSharePic({ product_id: this.prod_id }, { tip: '努力加载中', mask: true })
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
    toBooking () {
      const url = '/pages/share/go?prod_id=' + this.prod_id
      this.$linkTo(url)
    },
    myPay () {
      if (!checkIsLogin(1, 1)) return
      this.hasCart = true
      if (this.detailData.order_temp_id || this.detailData.Products_IsVirtual == 1) {
        this.hasCart = false
      }
      this.$refs.mySku.show()
    },
    allPay () {
      if (!checkIsLogin(1, 1)) return
      this.hasCart = false
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
          cart_key: 'DirectBuy' // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          // productDetail_price: sku.price
        }
        await updateCart(postData).catch(e => {
          throw Error(e.msg || '下单失败')
        })
        const url = '/pages/order/OrderBooking?cart_key=DirectBuy&order_temp_id=' + this.detailData.order_temp_id + '&biz_id=' + this.detailData.biz_id
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
        prod_id: this.detailData.Products_ID,
        qty: sku.qty,
        attr_id: sku.id
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
          prod_id: this.prod_id, // 产品ID  在 onLoad中赋值
          attr_id: sku.id, // 选择属性id
          count: sku.count, // 选择属性的库存
          qty: sku.qty, // 购买数量
          cart_key: 'DirectBuy', // 购物车类型   CartList（加入购物车）、DirectBuy（立即购买）、PTCartList（不能加入购物车）
          productDetail_price: sku.price
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
    async getProductDetail () {
      try {
        showLoading()

        // 获取优惠券
        this.page = 1
        this.couponList = []
        this.getCoupon()

        const data = {
          prod_id: this.prod_id
        }
        this.detailData = await getProductDetail(data, { onlyData: true }).catch(e => { throw Error(e.msg || '获取商品详情失败') })
        this.detailData.Products_Description = formatRichTextByUparseFn(this.detailData.Products_Description)

        this.store = await getBizInfo({ biz_id: this.detailData.biz_id }, { onlyData: true }).catch(e => { throw Error(e.msg || '获取店铺信息失败') })

        this.comments = await getCommitList({
          Products_ID: this.detailData.Products_ID,
          pageSize: 999,
          page: 1
        }, {
          onlyData: true
        }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.storeList = await getStoreList({ biz_id: this.detailData.biz_id }, {
          onlyData: true
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
      } finally {
        hideLoading()
      }
    },
    changeTabIndex (event) {
      const { current, source } = event.detail
      this.tabIndex = current
    }
  },
  computed: {
    imgs () {
      try {
        return this.detailData.Products_JSON.ImgPath
      } catch (e) {
        return []
      }
    },
    initData () {
      return this.$store.state.system.initData
    }
  },
  onLoad (options) {
    this.prod_id = options.prod_id
    this.getProductDetail()
  },
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
  // 自定义小程序分享
  onShareAppMessage () {
    const path = '/pages/product/detail?prod_id=' + this.prod_id
    const shareObj = {
      title: this.detailData.Products_Name,
      desc: this.detailData.Products_BriefDescription,
      imageUrl: this.detailData.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  }
  // #endif
}
</script>
