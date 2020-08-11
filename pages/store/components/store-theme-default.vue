<template>
  <div>
    <layout-page-title :extStyle="'padding-bottom:10px;background:none;'" status-bg-color="none" menu-button-bg-color="none" ></layout-page-title>
    <div class="store-comp-wrap" :style="{top:menuButtonInfo.bottom+10+'px'}">
      <scroll-view class="store-comp-scroll" scroll-y>
        <div class="store-info">
          <div class="base">
            <div :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}"
                 class="logo"
                 v-if="storeInfo.biz_logo"></div>
            <div class="title">{{storeInfo.biz_shop_name}}</div>
          </div>
          <div class="actions">
            <div @click="$openLocation(storeInfo.biz_lat_gd,storeInfo.biz_lon_gd,storeInfo.biz_shop_name,storeInfo.biz_address)"
                 class="action-item">
              <layout-icon :img-icon="true" color="#26C78D" size="26" type="/static/store/theme-default/address.png"></layout-icon>
            </div>
            <div @click.stop="$cellPhone(storeInfo.biz_mobile)" class="action-item">
              <layout-icon :img-icon="true" color="#26C78D" size="26" type="/static/store/theme-default/phone.png"></layout-icon>
            </div>
            <div @click="taggleFavorite" class="action-item">
              <layout-icon :img-icon="true" :color="isFavourite?'#F53636':'#26C78D'" size="26" :type="isFavourite?'/static/store/theme-default/favorite-a.png':'/static/store/theme-default/favorite.png'"></layout-icon>
            </div>
            <div @click="toShare" class="action-item">
              <layout-icon :img-icon="true" color="#26C78D" size="26" type="/static/store/theme-default/timeline.png"></layout-icon>
            </div>
            <button class="action-item share-btn" open-type="share">
              <layout-icon :img-icon="true" color="#26C78D" size="26" type="/static/store/theme-default/share.png"></layout-icon>
            </button>
            <!--        <image mode="widthFix" class="action-item" src="/static/store/address.png"></image>-->
            <!--        <image mode="widthFix" class="action-item" src="/static/store/phone.png"></image>-->
            <!--        <image mode="widthFix" class="action-item" src="/static/store/favorite.png"></image>-->
            <!--        <image mode="widthFix" class="action-item" src="/static/store/timeline.png"></image>-->
            <!--        <image mode="widthFix" class="action-item" src="/static/store/share.png"></image>-->
          </div>
        </div>
        <!--占位-->
        <div style="height:15px;border-top-right-radius: 15px;border-top-left-radius: 15px;background: white;"></div>
        <div :class="{isStickly:headTabSticky}" class="head" id="stickyTab">
          <ul class="tab-box sticky">
            <li :class="{active:headTabIndex === 0}" @click="headTabIndex=0" class="tab-item">首页<span
              class="underline" v-if="headTabIndex === 0"></span></li>
            <li :class="{active:headTabIndex === 1}" @click="headTabIndex=1" class="tab-item">介绍<span
              class="underline" v-if="headTabIndex === 1"></span></li>
            <li :class="{active:headTabIndex === 2}" @click="headTabIndex=2" class="tab-item">相册<span
              class="underline" v-if="headTabIndex === 2"></span></li>
            <li :class="{active:headTabIndex === 3}" @click="headTabIndex=3" class="tab-item">门店<span
              class="underline" v-if="headTabIndex === 3"></span></li>
            <li :class="{active:headTabIndex === 4}" @click="headTabIndex=4" class="tab-item">点评<span
              class="underline" v-if="headTabIndex === 4"></span></li>
          </ul>
        </div>
        <!--  占位-->
        <!--    <div class="h50 bg-white" v-if="headTabSticky"></div>-->

        <swiper
          :current="headTabIndex"
          :style="{height:childSwiperHeight}"

          @change="indexChangeEvent"
          class="tab-container">
          <swiper-item class="tab-page">
            <div class="tab-page-wrap" id="scrollView1">

              <!--优惠券-->
              <scroll-view scroll-x class="coupon-section flex flex-justify-c" @touchmove.stop  v-if="couponList.length>0">
                <div :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item" v-for="(coupon,idx) in couponList">
                  <div class="containier">
                    <div class="price">
                      <div class="sign">{{coupon.Coupon_UseType?'￥':'折'}}</div>
                      <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
                    </div>
                    <div class="info">
                      <span class="condition">满{{coupon.Coupon_Condition}}元可使用</span>
                      <span class="use-end-item">有效期至{{coupon.Coupon_EndTime|formatTime('YYYY.MM.DD')}}</span>
                    </div>
                  </div>
                </div>
              </scroll-view>

              <!--满减活动-->
              <div class="activity-list  flex flex-justify-c" v-if="manjianList.length>0">
                <div :key="idx"  class="activity-item" v-for="(item,idx) in manjianList">满{{item.reach}}减{{item.award}}</div>
              </div>

              <!--便捷操作-->
              <div class="feature-list">
                <!--$linkTo()-->
                <!--              <image :src="'/static/client/store/send.png'|domain" @click="toDelivery" class="feature-item"-->
                <!--                     mode="scaleToFill"></image>-->
                <image :src="'/static/client/store/pay.png'|domain" @click="toOffinePay" class="feature-item" mode="scaleToFill"></image>
                <image :src="'/static/client/store/join.png'|domain" @click="$linkTo('/pages/product/apply?bid='+bid)" class="feature-item" mode="scaleToFill"></image>
                <image :src="'/static/client/store/member.png'|domain" @click="toVip" class="feature-item" mode="scaleToFill"></image>
              </div>

              <!--虚拟产品-->
              <div class="block coupon-goods-list" v-if="virtualGoodsLsit.length>0">
                <div class="block-title">
                  <div class="block-title-text">到店券</div>
                  <div class="block-title-more flex flex-vertical-center c9 fz-12" @click="$linkTo('/pagesA/store/virtualGoods?biz_id='+bid)">
                    <span>查看全部</span>
                    <layout-icon class="iconright" color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                  </div>
                </div>
                <div class="block-content">
                  <div class="goods-list">
                    <div :key="idx" @click="$toGoodsDetail(item)" class="goods-item" v-for="(item,idx) in virtualGoodsLsit">
                      <div class="left">
                        <div :style="{backgroundImage:'url('+getPreviewThumb(item.ImgPath)+')'}" class="cover"></div>
                      </div>
                      <div class="right">
                        <h5 class="title"><span>{{item.Products_Name}}</span></h5>
                        <div class="flex flex-justify-between flex-vertical-center">
                          <div class="flex1">
                            <div class="tags" v-if="item.tags && item.tags.length>0">
                              <span :key="idx" class="tag" v-for="(tag,idx) in item.tags">{{tag}}</span>
                            </div>
                            <div class="price-box">
                              <div class="selling-price">
                                <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                              </div>
                            </div>
                          </div>
                          <div class="action">
                            <!--<image class="img" :src="'/static/client/store/cart.png'|domain"></image>-->
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!--产品专区-->
              <div class="block goods-box">
                <ul class="nav-list">
                  <li :class="{active:goodsNavIndex === 0}" @click="goodsNavIndex=0" class="nav-item">推荐产品<span
              class="underline" v-if="goodsNavIndex === 0"></span></li>
                  <li :class="{active:goodsNavIndex === 1}" @click="goodsNavIndex=1" class="nav-item">产品分类<span
              class="underline" v-if="goodsNavIndex === 1"></span></li>
                  <li :class="{active:goodsNavIndex === 2}" @click="goodsNavIndex=2" class="nav-item">全部产品<span
              class="underline" v-if="goodsNavIndex === 2"></span></li>
                </ul>
                <!-- style="height: 540rpx;overflow-y: hidden"      :style="{height:systemInfo.windowHeight+'px'}"       :style="{height:systemInfo.windowHeight+'px'}"-->
                <swiper
                  :current="goodsNavIndex"
                  @change="prodIndexChangeEvent"
                  style="height: 300px">
                  <swiper-item style="overflow-y: scroll">
                    <div class="goods-list">
                      <div :key="idx" @click="$toGoodsDetail(item)"
                           class="goods-item" style="margin-bottom: 18rpx;" v-for="(item,idx) in recommends">
                        <div :style="{backgroundImage:'url('+getPreviewThumb(item.ImgPath)+')'}" class="goods-item-cover recommend-goods-cover">
                          <!--<div class="discount-text">折扣</div>-->
                          <image mode="widthFix" class="discount-img" src="/static/store/theme-default/discount-tag.png"></image>
                        </div>
                        <div class="goods-item-right" style="display: flex;flex-direction: column;">
                          <div class="title">{{item.Products_Name}}</div>
                          <div class="c8" style="line-height: 16px;max-height: 32px;overflow: hidden;">
                            {{item.Products_BriefDescription}}
                          </div>
                          <div style="flex:1;"></div>
                          <div class="flex flex-justify-between flex-vertical-t m-t-10">
                            <div class="selling-price p-b-10">
                              <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                            </div>
                            <div class="btn">购买</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="recommends.length>0" @click="$linkTo('/pages/search/result?biz_id='+bid)"
                         class="flex flex-vertical-c flex-justify-c look-more">
                      <span class="c9 fz-12">查看更多</span>
                      <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                    </div>
                  </swiper-item>
                  <swiper-item class="tab-page" style="overflow-y: scroll">
                    <div class="p-t-20 p-l-15 p-b-20 p-r-15"
                         style="width: 700rpx;background: #F7F7F7;box-sizing: border-box;">
                      <block :key="idx1" v-for="(row,idx1) in bizCateList">
                        <div class="row p-b-15" >
                          <div class="fz-14 c3 ">{{row.cate_name}}</div>
                          <block v-if="row.child">
                            <span :key="idx2" class="column fz-12 c6 p-9 m-r-10 m-t-10"
                                  @click="toSearchByCate(column)"
                                  style="background: #FFFFFF;display: inline-block;" v-for="(column,idx2) in row.child">{{column.cate_name}}</span>
                          </block>

                        </div>
                      </block>
                    </div>
                  </swiper-item>
                  <swiper-item class="tab-page" style="overflow-y: scroll">
                    <div class="flex" style="flex-wrap: wrap;width: 710rpx;">
                      <div
                        :key="idx"
                        :style="{marginRight:idx%2===0?'20rpx':'0rpx'}"
                        @click="$toGoodsDetail(item)" style="width: 345rpx;border-radius: 8rpx;overflow: hidden;height: 450rpx;margin-bottom: 20rpx;"
                        v-for="(item,idx) in goodsList">
                        <div :style="{backgroundImage:'url('+getPreviewThumb(item.ImgPath,'-r400')+')'}" class="img-cover" style="width: 345rpx;height: 345rpx"></div>
                        <div class="c3 fz-13" style="line-height: 36rpx;height: 72rpx;overflow-x: hidden">{{item.Products_Name}}</div>
                        <div class="flex flex-vertical-c" style="height: 32rpx;">
                          <div class="price-selling"><span class="fz-12">￥</span><span class="fz-17">{{item.Products_PriceX}}</span>
                          </div>
                          <div class="p-l-10 text-through price-market"><span class="fz-12">￥</span><span class="fz-12">{{item.Products_PriceY}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div @click="$linkTo('/pages/search/result?biz_id='+bid)"
                         class="flex flex-vertical-c flex-justify-c look-more">
                      <span class="c9 fz-12">查看更多</span>
                      <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                    </div>
                  </swiper-item>
                </swiper>

              </div>

              <!--评论列表-->
              <div class="block comment-box" v-if="comments.length>0">

                <div class="block-title">
                  <div class="block-title-text">留言评论</div>
                  <div @click="headTabIndex=4" class="block-title-more flex flex-vertical-center c9 fz-12">
                    <span>查看全部</span>
                    <layout-icon class="iconright" color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                  </div>
                </div>
                <div class="block-content">
                  <div class="comment-list">
                    <div :key="idx" v-for="(item,idx) in comments" class='p-t-15 p-b-15'>
                      <layout-comment :comment="item" :isLast="comments.length-1===idx"
                                      @comment="clickComment"></layout-comment>
                      <div class="comment-send" v-if="item.child.length>0">
                        <block :key="ind" v-for="(com,ind) of item.child">
                          <block :key="indx" v-for="(co,indx) of com">

                            <block v-if="co.touserid==item.User_ID">
                              <div @click.stop="clickCommentSend(item,co.groupid,co.userid)"
                                   class="fz-12 c3 comment-send-item">
                                <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                              </div>
                            </block>
                            <block v-else>
                              <div @click.stop="clickCommentSend(item,co.groupid,co.userid)"
                                   class="fz-12 c3 comment-send-item p-l-10">
                                <span class="color-comment p-r-2">{{co.user_nickname}}</span>回复<span
                                class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                              </div>
                            </block>

                          </block>

                        </block>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <!--发布评论-->
              <!--          <view class="commtent-add section">-->
              <!--            <textarea class="textarea" @blur="bindTextAreaBlur" auto-height placeholder="发表你的评论..." />-->
              <!--          </view>-->

              <layout-copyright></layout-copyright>

            </div>
          </swiper-item>
          <swiper-item class="tab-page">
            <div style="box-sizing: border-box;" class="tab-page-wrap p-t-15 p-l-10 p-r-10" id="scrollView2">
              <div class="p-t-10 p-b-10 bor-b c9">地址:<span @click="$openLocation(storeInfo.biz_lat,storeInfo.biz_lon)" class="p-l-10 c3">{{storeInfo.biz_address}}</span></div>
              <div class="p-t-10 p-b-10 bor-b c9">电话:<span class="p-l-10 c3" @click="$cellPhone(storeInfo.biz_mobile)">{{storeInfo.biz_mobile}}</span></div>
              <div class="p-t-10 p-b-10 bor-b c9">简介:<span class="p-l-10 fz-14 c3">{{storeInfo.intro||'暂无简介'}}</span></div>
            </div>
          </swiper-item>
          <swiper-item class="tab-page">
            <div class="tab-page-wrap p-b-15" id="scrollView3">

              <!--只显示有照片的相册 v-if="imgs.photo && imgs.photo.length>0"-->
              <div :key="idx1" class="photo-section" v-for="(imgs,idx1) in photoList">
                <div class="php-section-title m-b-10 flex flex-vertical-c">
                  <div class="label"></div>
                  <div class="text flex1 c3">{{imgs.cate_name}}</div>
                  <div @click="$linkTo('/pagesA/store/photo?bid='+bid+'&tab='+idx1)" class="flex flex-vertical-c">
                    <span class="c9 fz-12">查看更多（{{imgs.photo_total}}）</span>
                    <layout-icon color="#999" size="14" type="iconicon-arrow-right"></layout-icon>
                  </div>
                </div>
                <div class="photo-list">
                  <div :key="idx2" :style="{backgroundImage:'url('+img.photo_img+')'}" @click="priviewFn(imgs,idx2)" class="photo-item"
                       v-for="(img,idx2) in imgs.photo"></div>
                </div>
              </div>

            </div>
          </swiper-item>
          <swiper-item class="tab-page">
            <div class="tab-page-wrap" id="scrollView4">
              <div class="over store-section">
                <div class="store-list">
                  <div class="flex flex-justify-between">
                    <div class="store-list-top fz-15" style="color: #333333;font-weight: bold">
                      <span class="block-div"></span>
                      门店列表
                    </div>
                    <!--                    <div class="store-list-top">-->
                    <!--                      {{storeList.length}}家-->
                    <!--                    </div>-->
                  </div>

                  <div :key="ind" class="store-list-item" v-for="(st,ind) of storeList">
                    <div @click.stop="goStore(st.biz_id)" class="store-list-title"  >
                      {{st.store_name}}
                    </div>

                    <div @click="$cellPhone(st.store_mobile)" class="store-vip-call m-b-10">
                      电话：{{st.store_mobile}}
                      <layout-icon color="#26c78d" class="m-l-15" size="20" type="icondianhua"></layout-icon>
                    </div>
                    <div @click="$openLocation(st.store_lat,st.store_lon,st.biz_shop_name)" class="store-vip-address m-b-10">
                      地址：{{st.area_address}}{{st.store_address}}
                      <layout-icon color="#26c78d" class="m-l-15" style="display: inline-block" size="20" type="icondizhi1"></layout-icon>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </swiper-item>
          <swiper-item class="tab-page">
            <div class="tab-page-wrap comment-section" id="scrollView5">
              <!--评论列表-->

              <div class="block-content">
                <div class="comment-list" v-if="comments.length>0">
                  <div :key="idx" class="comment-item p-t-15 p-b-15" v-for="(item,idx) in comments">
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

                <div class="fz-12 text-center "  style="color: #D2D2D2;padding-bottom: 68rpx;padding-top: 44rpx;" v-else>
                  该商品暂无相关评论
                </div>
              </div>
            </div>
          </swiper-item>
        </swiper>

      </scroll-view>
    </div>

    <layout-modal ref="commentModal">
      <div class="refuseApplyModal">
        <textarea :disabled="!commentModalShow" :value="commentValue" @input="bingReasonInput" auto-height class="reason" placeholder="请输入评价" placeholder-style="color:#999" />
        <div class="control">
          <div @click="cancelComent" class="action-btn btn-cancel">取消</div>
          <div @click="sureComment" class="btn-sub action-btn">确定</div>
        </div>

      </div>
    </layout-modal>

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
          <div :key="idx" class="carts-item" v-for="(row,idx) in showCarts">
            <div class="check-item flex flex-vertical-c" @click="selectItem(row)">
              <layout-icon color="#E64239" size="20" type="iconicon-check" v-if="row.checked"></layout-icon>
              <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
            </div>
            <div :style="{backgroundImage:'url('+row.pic+')'}" class="carts-item-cover"></div>
            <div class="carts-item-info">
              <div class="title">{{row.name}}</div>
              <div class="attr-text" v-if="row.attr_text">{{row.attr_text||''}}</div>
              <div class="actions">
                <div class="price-box fz-10 flex1">
                  <span class="price-selling">￥</span><span class="price-selling fz-15">{{row.price_selling}}</span>
                  <span class="p-l-7 price-market text-through">￥{{row.price_market}}</span>
                </div>
                <div class="action flex flex-vertical-c">
                  <layout-icon v-if="row.num>0" @click.stop="attrNumMinus(row)" color="#B2B1B1" size="24"
                               type="iconicon-minus"></layout-icon>
                  <input style="width: 54rpx;" v-model="row.num" @focus="getQty(row.num)"
                         @blur="changeAttrNum($event,idx,row)" class="input-num text-center fz-13" />
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
import LayoutModal from '@/components/layout-modal/layout-modal'
import LayoutCopyright from '@/components/layout-copyright/layout-copyright'
import LayoutComment from '@/components/layout-comment/layout-comment'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import { componetMixin } from '@/mixins/BaseMixin'
import { checkIsLogin, getArrColumn, getDomain, getPreviewThumb } from '@/common/helper'
import { error, hideLoading, modal, showLoading, toast, checkIsExpire, confirm, linkToEasy } from '@/common/fun'
import {
  addFavourite,
  cancelFavourite,
  CartList as getCartList,
  checkFavourite,
  commentReply,
  getUserCoupon
} from '@/api/customer'
import { Exception } from '@/common/Exception'
import { getActiveInfo, getCommitList, getCouponList } from '@/api/common'
import { getAlbumList, getBizInfo, getBizSpikeList, getStoreList } from '@/api/store'
import { getBizProdCateList, getProductList } from '@/api/product'
import LayoutPageTitle from '@/components/layout-page-title/layout-page-title'
import LayoutLayer from '@/components/layout-layer/layout-layer'

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
  name: 'store-theme-default',
  mixins: [componetMixin],
  components: {
    LayoutLayer,
    LayoutPageTitle,
    LayoutModal,
    LayoutCopyright,
    LayoutComment,
    LayoutIcon
  },
  props: {
    bid: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
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

      commentModalShow: false,

      commentItem: {},
      commentValue: '',
      childSwiperHeight: 'auto',
      isFavourite: false,

      scrollHeightS: [0, 0, 0, 0],
      storeList: [],
      liveStatus: 0,
      storeInfo: {},
      couponList: [],
      activityList: [],
      manjianList: [],
      comments: [],
      goodsNavIndex: 0,
      recommends: [],
      bizCateList: [],
      virtualGoodsLsit: [],
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
      ],
      showCarts:[]
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
    carts: {
      immediate: true,
      deep: true,
      handler (nval) {
        console.log('carts value change,current value is', nval)
        var showCarts = this.$store.getters['cart/getCartList'](this.bid)
        this.$set(this, 'showCarts', showCarts)
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
    getPreviewThumb,
    toSearchByCate (cateInfo) {
      console.log(cateInfo)
      const url = `/pages/search/result?biz_cate_id=${cateInfo.id}&biz_id=${this.bid}`
      console.log(url)
      linkToEasy(url)
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
    toRoom () {
      // const roomId = this.storeInfo.room_id // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
      // const customParams = encodeURIComponent(JSON.stringify({
      //   path: 'pages/store/index?biz_id=' + this.bid,
      //   owner_id: this.$store.getters['user/getUserId']()// 公共参数
      // }))
      // // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，
      // // 详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
      // wx.navigateTo({
      //   url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
      // })
    },
    toShare () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo(`/pagesA/store/shareQrcode?biz_id=${this.bid}`)
      }
    },
    toVip () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pagesA/user/VipList?bid=' + this.bid)
      }
    },
    toDelivery () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pages/delivery/desktop?bid=' + this.bid)
      }
    },
    toOffinePay () {
      this.$linkTo(`/pagesA/store/offlinePay?biz_id=${this.bid}`)
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
    bingReasonInput (e) {
      this.commentValue = e.detail.value
    },
    cancelComent () {
      this.commentItem = {}
      this.commentValue = ''
      this.$closePop('commentModal')
      this.commentModalShow = false
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
        this.$closePop('commentModal')
        this.commentModalShow = false
      }).catch(e => {
        error(e.msg || '评论失败')
        this.commentItem = {}
        this.commentValue = ''
        this.$closePop('commentModal')
        this.commentModalShow = false
      })
    },
    getCoupon (coupon, idx) {
      if (!checkIsLogin(1, 1)) return
      console.log(coupon)
      getUserCoupon({ coupon_id: coupon.Coupon_ID }).then(() => {
        toast('领取成功')
        this.couponList.splice(idx, 1)
      }).catch((err) => {
        error(err.msg)
      })
    },
    clickComment (item) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = Object.assign({}, item)
      this.$refs.commentModal.show()
      this.commentModalShow = true
      this.commentItem.groupid = ''
    },
    clickCommentSend (item, goupId, userId) {
      if (!checkIsLogin(1, 1)) return
      this.commentItem = Object.assign({}, item)
      this.commentItem.groupid = goupId
      this.commentItem.User_ID = userId
      this.$refs.commentModal.show()
      this.commentModalShow = true
    },
    priviewFn (imgs, current) {
      const urls = getArrColumn(imgs.photo, 'photo_img')
      uni.previewImage({
        urls,
        current
      })
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
        checkIsExpire(this.storeInfo.biz_expires)

        this.$emit('upStoreInfo', this.storeInfo)

        const base = { biz_ids: this.bid }
        this.recommends = await getProductList({
          pageSize: 2,
          Is_Recommend: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })

        this.goodsList = await getProductList({ pageSize: 2, ...base }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })
        // 虚拟商品
        this.virtualGoodsLsit = await getProductList({
          pageSize: 3,
          prod_order_type: 1,
          ...base
        }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取虚拟商品列表错误')
        })

        this.bizCateList = await getBizProdCateList({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        // 不要赠送的优惠券
        this.couponList = await getCouponList({
          biz_id: this.bid,
          front_show: 1,
          status: 3
        }, {
          onlyData: true
        }).catch((e) => {
          throw Error('获取优惠券失败')
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

        this.photoList = await getAlbumList({
          biz_id: this.bid,
          get_photo: 4
        }, { onlyData: 1 }).catch(e => {
          throw Error(e.msg || '获取相册信息失败')
        })

        this.activityList = await getBizSpikeList({ biz_id: this.bid, status: 1 }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        this.manjianList = await getActiveInfo({ type: 'manjian', biz_id: this.bid }).then(res => res.data.active_info).catch(err => { throw Error(err.msg) })
        console.log('manjianList is', this.manjianList)

        if (checkIsLogin(0, 0)) {
          const { is_favourite = 0 } = await checkFavourite({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
            throw e
          })
          this.isFavourite = is_favourite
        }

        this.$nextTick().then(() => {
          const query = uni.createSelectorQuery().in(this)
          query.select('#scrollView1').boundingClientRect(data => {
            console.log(data)
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

        // 这个就不要等了吧
        if (!checkIsLogin(0, 0)) {
          throw Error('nocare')
        }

        this.refreshInfoByIsLogin()
      } catch (e) {
        Exception(e)
      } finally {
        hideLoading()
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
  created () {

  },
  onReady () {
    const query = uni.createSelectorQuery().in(this)
    query.select('#stickyTab').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.headTabTop = res[0].top
    })

    this.isUserLogin = checkIsLogin(0, 0)
    console.log('isUserLogin is ', this.isUserLogin)
  }
}
</script>
<style lang="scss" scoped>
  page{
    background: #f5f5f5;
  }
  .default-bg-color{
    background: #f5f5f5;
  }
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
      padding: 0rpx 20rpx 60rpx 0;
      width: 750rpx;
      box-sizing: border-box;
    }

    &-item {
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
        padding: 40rpx 0rpx 30rpx;
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
          height: 20px;
          line-height: 20px;
          padding: 0 8px;
          border-radius: 4px;
          color: #666;
          background: $fun-tag-color;
          margin-top: 20rpx;
          display: inline-block;
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

  .store-comp-wrap{
    position: fixed;
    width: 750rpx;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .store-comp-scroll{
    width: 100%;
    height: 100%;
  }
  .refuseApplyModal {
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

  .comment-section {

    padding: 30rpx 25rpx;
    box-sizing: border-box;
    background: white;

  }

  .color-comment {
    color: #476DB9;
    line-height: 50rpx;
  }

  .comment-item {
    border-bottom: 1rpx solid #E8E8E8;
    padding-bottom: 30rpx;
    &:last-child{
      border-bottom: none;
    }
  }

  .block-title {
    padding: 20px 0;

    .block-title-text {
      font-weight: bold;
    }
  }

  .comment-list {

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

  .store-section {

    .store-su {
      width: 1px;
      height: 34rpx;
      background-color: #EBEBEB;
      margin: 0px 24rpx;
      display: inline-block;
    }

    .store-base-info {
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

    .store-list {
      width: 690rpx;
      padding: 0 30rpx;

      .store-vip-call{
        height: 40rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #999999;
      }
      .store-vip-address{
        lin-height: 40rpx;
        font-size: 28rpx;
        color: #999999;
      }
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
    width: 690rpx;
    padding: 30rpx 0rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #EEEEEE;
    &:last-child{
      border-bottom: 0rpx;
    }
  }

  .store-list-title {
    width: 600rpx;
    height: 30px;
    font-size: 30rpx;
    color:#333333;
    font-weight: bold;
    line-height: 30px;
    margin-bottom: 16rpx;
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

  .coupon-section {
    width: 750rpx;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
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
      overflow-y: hidden;
      overflow-x: scroll;
      width: 750rpx;
      box-sizing: border-box;
      padding: 0 20rpx 10rpx 20rpx;
      white-space: nowrap;
    }

    &-item {
      display: inline-block;
      margin-right: 6px;
      height: 16px;
      line-height: 16px;
      border-radius: 4px;
      padding: 0 4px;
      font-size: 10px;
      color: $fun-red-color;
      border: 1px solid #FF9090;

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
        height: 26px;
        /*width: 40rpx;*/
        /*height: auto;*/
        //padding: 0 40rpx;
        &.share-btn {
          background: none;
          line-height: inherit;
          padding-left:0;
          padding-right: 0;
          &::after {
            border: none;
            width: auto;
            height: auto;
          }
        }
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
        @include cover-img();
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

    .tab-page-wrap {

      width: 750rpx;
    }

  }

  .photo-section {
    margin: 10rpx 10rpx 40rpx;

    .php-section-title {
      .label {
        width: 6rpx;
        height: 30rpx;
        background: #26C78D;
        margin-right: 8px;
      }

      .text {
        font-size: 15px;
        font-weight: bold;
      }
    }

    .photo-list {
      display: flex;
      flex-wrap: wrap;
    }

    .photo-item {
      width: 350rpx;
      height: 350rpx;
      margin-bottom: 10rpx;
      margin-right: 10rpx;
      @include cover-img();

      &:nth-child(even) {
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

              .sign{
                font-size: 24rpx;
              }
              .num {
                font-size: 34rpx;
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
        position: relative;
        font-weight: bold;
        padding: 0;
        margin-right: 40rpx;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        color: #333;

        .underline {
          visibility: hidden;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          width: 18px;
          background: #FFC000;
        }

        &.active {
          /*color: #FFC000;*/

          .underline {
            visibility: visible;
          }
        }

      }
    }

    .block-title {
      padding: 25px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .recommend-goods-cover{
      position: relative;

      .discount-img{
        position: absolute;
        left: 0rpx;
        top: 0rpx;
        width: 60rpx;
        height: 60rpx;
      }
      .discount-text{
        position: absolute;
        left: 0rpx;
        top: 50rpx;
        background: #FFE300;
        color: #333;
        font-size: 20rpx;
        width: 100rpx;
        text-align: center;
        height: 28rpx;
        line-height: 28rpx;
        transform: rotate(-45deg);
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

            .sign{
              font-size: 24rpx;
            }

            .num {
              font-size: 34rpx;
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
    border-top: 20rpx solid #f5f5f5;
    /*border-bottom: 20rpx solid #f5f5f5;*/
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
    z-index: 3;
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
          background: #FFC000;
        }

        &.active {
          /*color: #FFC000;*/

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

  .look-more {
    height: 60rpx;
    line-height: 60rpx;
  }
  .comment-send-item{
    overflow-x: hidden;
  }
</style>
