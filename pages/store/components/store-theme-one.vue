<template>
  <div class="fixed-wrap">
    <!--超级占位，把上面这些全干掉了-->
    <div class="sticky-space" :style="{backgroundImage: 'url('+$getDomain('/static/client/store/theme_one/top-bg-large.jpg')+')',height:menuButtonInfo.bottom+10+'px',zIndex:headTabSticky?3:-4}"></div>
    <div :class="{isStickly:headTabSticky}" :style="{top:menuButtonInfo.bottom+10+'px',zIndex:headTabSticky?3:-5}" class="head-tab fixed" id="stickyTab">
      <ul class="tab-box sticky">
        <li :class="{active:headTabIndex === 0}" @click="bindHeadTabClick(0,'section-virtual')" class="tab-item">到店券<span class="underline" v-if="headTabIndex === 0"></span></li>
        <li :class="{active:headTabIndex === 1}" @click="bindHeadTabClick(1,'section-sale')" class="tab-item">在售({{storeGoodsTotal}})<span class="underline" v-if="headTabIndex === 1"></span></li>
        <li :class="{active:headTabIndex === 2}" @click="bindHeadTabClick(2,'section-store')" class="tab-item">门店<span class="underline" v-if="headTabIndex === 2"></span></li>
        <li :class="{active:headTabIndex === 3}" @click="bindHeadTabClick(3,'section-comment')" class="tab-item">点评<span class="underline" v-if="headTabIndex === 3"></span></li>
      </ul>
    </div>
    <div class="top-bg" :style="{zIndex:headTabSticky?-2:-4,height:(menuButtonInfo.bottom+10+15+75+15)*2+'px',backgroundImage: 'url('+$getDomain('/static/client/store/theme_one/top-bg-large.jpg')+')'}"></div>
<!--    <div class="top-bg" :style="{zIndex:headTabSticky?-2:-4,top:menuButtonInfo.bottom+10+15+75+15+'px',height:menuButtonInfo.bottom+10+15+75+15+'px',backgroundImage: 'url('+$getDomain('/static/client/store/theme_one/top-bg.png')+')'}"></div>-->
    <div :style="{height:menuButtonInfo.height+'px',top:menuButtonInfo.top+'px'}" class="navigator-bar">
      <layout-icon @click="$back" class="m-l-10" :color="headTabSticky?'#fff':'#fff'" size="20" weight="500" type="iconicon-arrow-left"></layout-icon>
    </div>
    <!--menuButtonInfo.bottom+10+34-->
    <scroll-view
      :style="{top:headTabSticky?(0+'px'):'0px'}"
      :scroll-into-view="toViewIdx"
      @scrolltolower="bindScrolltolower"
      @scroll="bindScroll"
      class="store-comp-wrap"
      scroll-y>

      <div class="store-info-space" :style="{height: menuButtonInfo.bottom+10+'px'}"></div>
      <div class="store-info flex flex-vertical-c m-b-15" v-if="storeInfo.biz_logo">
        <div @click="toPicture" :style="{backgroundImage:'url('+storeInfo.biz_logo+')'}" class="base-logo">
          <div class="thumbCount" v-if="storePhotoTotal>0">{{storePhotoTotal}}张照片</div>
        </div>
        <div class="info-box">
          <div class="store-name fz-15 m-b-8">{{storeInfo.biz_shop_name}}</div>
          <div class="store-activity-list m-b-8" v-if="flashActivityList.length>0">
            <div class="store-activity-item fz-10" v-for="(item,idx) in flashActivityList" :key="idx" @click="toActivity(item.id)">{{item.name}}</div>
          </div>
          <div class="like fz-11">{{storeInfo.follow}}人关注</div>
        </div>
        <div class="actions">
          <div @click="taggleFavorite" class="action-item">
            <layout-icon :color="isFavourite?'#F53636':'#fff'" size="22" type="iconicon-favorite"></layout-icon>
          </div>
          <div class="action-item-space"></div>
          <div @click="goTo" class="action-item">
            <layout-icon color="#fff" size="22" type="iconicon-address"></layout-icon>
          </div>
          <div class="action-item-space"></div>
          <div @click.stop="$cellPhone(storeInfo.biz_mobile)" class="action-item">
            <layout-icon color="#fff" size="22" type="iconicon-phone"></layout-icon>
          </div>

        </div>
      </div>
      <!--占位-->

      <div class="head-tab">
        <ul class="tab-box sticky">
          <li :class="{active:headTabIndex === 0}" @click="bindHeadTabClick(0,'section-virtual')" class="tab-item">到店券<span class="underline" v-if="headTabIndex === 0"></span></li>
          <li :class="{active:headTabIndex === 1}" @click="bindHeadTabClick(1,'section-sale')" class="tab-item">在售({{storeGoodsTotal}})<span class="underline" v-if="headTabIndex === 1"></span></li>
          <li :class="{active:headTabIndex === 2}" @click="bindHeadTabClick(2,'section-store')" class="tab-item">门店<span class="underline" v-if="headTabIndex === 2"></span></li>
          <li :class="{active:headTabIndex === 3}" @click="bindHeadTabClick(3,'section-comment')" class="tab-item">点评<span class="underline" v-if="headTabIndex === 3"></span></li>
        </ul>
      </div>

      <div class="section-item coupon-list" :class="couponClassName">
        <block v-if="couponList.length>2">
          <div v-for="(coupon,idx) in couponList" :key="idx" @click="getCoupon(coupon,idx)" class="coupon-item">
            <image style="width: 282rpx;height: 120rpx;" class="coupon-item-bg" :src="$getDomain('/static/client/store/theme_one/coupon-s.png')"></image>
            <div class="coupon-item-info">
              <div class="flex flex-vertical-b">
                <div class="sign m-b-4">
                  <span class="sign-text">{{coupon.Coupon_UseType?'￥':'折'}}</span>
                </div>
                <div class="num">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
              </div>
              <div class="info m-t-2">
                <!--<div class="name">{{coupon.Coupon_Subject}}</div>-->
                <div class="condition">满{{coupon.Coupon_Condition}}元可使用</div>
              </div>
            </div>
          </div>
        </block>
        <block v-if="couponList.length===2">
          <div v-for="(coupon,idx) in couponList" @click="getCoupon(coupon,idx)" :key="idx" :style="{marginRight:idx===0?'26rpx':'0rpx'}" class="coupon-item">
            <image style="width: 342rpx;height: 120rpx;" class="coupon-item-bg" :src="$getDomain('/static/client/store/theme_one/coupon-m.png')"></image>
            <div class="coupon-item-info flex" style="left: 22rpx;bottom: 26rpx;top: 33rpx;">
              <div class="price flex flex-vertical-b">
                <div class="sign m-b-8" style="width:20rpx;height:20rpx;background:linear-gradient(0deg,rgba(254,85,70,1),rgba(240,20,23,1));border-radius:50%;color: #fff;position: relative;">
                  <span style="font-size: 18rpx;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">{{coupon.Coupon_UseType?'￥':'折'}}</span>
                </div>
                <div class="num" style="font-size: 72rpx;color: red;">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}2</div>
              </div>
              <div class="info" style="padding-left: 8rpx;max-width: 100rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">
                <div class="name" style="font-size: 16rpx;color: #5B5B5B;margin-bottom: 10rpx;">{{coupon.Coupon_Subject}}</div>
                <div class="condition" style="font-size: 16rpx;color: #5B5B5B;">满{{coupon.Coupon_Condition}}元可使用</div>
              </div>
            </div>
          </div>
        </block>
        <block v-if="couponList.length===1">
          <div v-for="(coupon,idx) in couponList" @click="getCoupon(coupon,idx)" :key="idx" class="coupon-item">
            <image style="width: 588rpx;height: 132rpx;" class="coupon-item-bg" :src="$getDomain('/static/client/store/theme_one/coupon-l.png')"></image>
            <div class="coupon-item-info">
              <div class="info">
                <span class="condition"  style="position:absolute;left: 60rpx;top: 14rpx;color: #FCEDD0;font-size: 22rpx;">满{{coupon.Coupon_Condition}}元可使用</span>
                <span class="go" style="position:absolute;left: 78rpx;top: 59rpx;color: #C41200;font-size:24rpx;height: 24rpx;line-height: 24rpx;">立即领取</span>
                <span class="use-end-item" style="position:absolute;left: 60rpx;top: 101rpx;color: #FCEDD0;font-size: 16rpx;">有效期至{{coupon.Coupon_EndTime|formatTime('YYYY-MM-DD')}}</span>
              </div>
              <div class="price flex flex-vertical-b"  style="position:absolute;left: 328rpx;top: 18rpx;">
                <div class="sign" style="margin-bottom: 8rpx;font-size: 24rpx;color: #C41200;">{{coupon.Coupon_UseType?'￥':'折'}}</div>
                <div class="num" style="margin-left: 10rpx;font-size: 90rpx;height:90rpx;line-height:90rpx;color: #C41200;">{{coupon.Coupon_UseType?coupon.Coupon_Cash:coupon.Coupon_Discount}}</div>
              </div>

            </div>
          </div>
        </block>
      </div>

      <!--便捷操作-->
      <div class="section-item feature-list">
<!--        <div class="feature-item"  @click="toDelivery">-->
<!--          <image :src="$getDomain('/static/client/store/theme_one/delivery.png')" class="feature-item-img" mode="scaleToFill"></image>-->
<!--          <div class="feature-item-title c3 fz-15">外卖</div>-->
<!--        </div>-->
        <div class="feature-item" @click="toOffinePay">
          <image :src="$getDomain('/static/client/store/theme_one/pay.png')" class="feature-item-img" mode="scaleToFill"></image>
          <div class="feature-item-title c3 fz-15">买单</div>
        </div>
        <div class="feature-item" @click="toApply">
          <image :src="$getDomain('/static/client/store/theme_one/join.png')" class="feature-item-img" mode="scaleToFill"></image>
          <div class="feature-item-title c3 fz-15">报名</div>
        </div>
        <div class="feature-item" @click="toVip">
          <image :src="$getDomain('/static/client/store/theme_one/member.png')" class="feature-item-img" mode="scaleToFill"></image>
          <div class="feature-item-title c3 fz-15">会员卡</div>
        </div>
      </div>
      <!--秒杀-->
      <div class="section-item kill-box"  v-if="killList.length>0">
        <div class="title p-15" style="background: #F6F6F6;text-align: center;"  >
          <image style="width: 432rpx;height: 37rpx;" :src="$getDomain('/static/client/store/theme_one/kill.png')"></image>
        </div>
        <div class="kill-list">
          <div :key="ind" @click="$toGoodsDetail(pro)" class="kill-list-item" v-for="(pro,ind) of killList">
            <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
            <div class="pro-title c3 m-t-6 m-b-10">
              <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
              {{pro.Products_Name}}
            </div>
            <div class="kill-countdown">
              <block v-if="!pro.countdown.is_end">

                <span class="c3 fz-12">距{{pro.countdown.is_start?'结束':'开始'}}</span>
                <span class="countdown-tag">{{pro.countdown.h}}</span>
                <span class="countdown-delimiter">时</span>
                <span class="countdown-tag">{{pro.countdown.m}}</span>
                <span class="countdown-delimiter">分</span>
                <span class="countdown-tag">{{pro.countdown.s}}</span>
                <span class="countdown-delimiter">秒</span>
              </block>
            </div>
            <div class="price-discount m-t-10">
              <div class="price-box price-selling">
                <span class="sign">￥</span><span class="num">{{pro.price}}</span>
              </div>
              <div class="m-l-6 fz-10 price-market text-through">
                <span class="sign">￥</span><span class="num">{{pro.Products_PriceX}}</span>
              </div>
              <!--<span class="discount" v-if="pro.discount">{{pro.discount}}折</span>-->
            </div>
          </div>
        </div>
      </div>
      <!--限时抢购-->
      <div class="section-item flash-box"  v-if="flashActivityList.length>0">
        <div class="title p-15" style="background: #F6F6F6;text-align: center;">
          <image style="width: 432rpx;height: 37rpx;" :src="$getDomain('/static/client/store/theme_one/flash-sale.png')"></image>
        </div>
        <div class="flash-act-list">
          <div class="flash-act-item" v-for="(activity,idx1) in flashActivityList" :key="idx1">
            <div class="flash-act-title fz-15 fz-b c3 m-b-15">{{activity.name}}</div>
            <div class="flash-act-countdown">
              <block v-if="!activity.countdown.is_end">
                <image :src="$getDomain('/static/client/store/theme_one/time.png')" mode="widthFix" style="width: 22rpx;height: 25rpx;margin-right: 14rpx;"></image>
                <span class="c3 fz-12">距{{activity.countdown.is_start?'结束':'开始'}}还有：</span>
                <span class="countdown-tag">{{activity.countdown.d}}</span>
                <span class="countdown-delimiter">:</span>
                <span class="countdown-tag">{{activity.countdown.h}}</span>
                <span class="countdown-delimiter">:</span>
                <span class="countdown-tag">{{activity.countdown.m}}</span>
                <span class="countdown-delimiter">:</span>
                <span class="countdown-tag">{{activity.countdown.s}}</span>
              </block>
            </div>
            <div class="act-goods-list">
              <div class="act-goods-item" v-for="(pro,idx) in activity.spike_goods" :key="idx" @click="toGoodsDetailFn(pro,activity)">
                <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
                <div class="fz-12 c3 m-t-15 m-b-8" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                  <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
                  {{pro.Products_Name}}
                </div>
                <div class="flex flex-vertical-b">
                  <div class="price-box price-selling fz-12">
                    <span class="sign">￥</span><span class="num">{{pro.price}}</span>
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
      <!--到店券-虚拟商品-->
      <div class="section-item virtual-box"  v-if="virtualGoodsLsit.length>0">
        <div id="section-virtual" class="section-anchor" :style="{top:anchorTop+'px'}"></div>
        <div class="title p-15" style="text-align: center;">
          <image style="width: 359rpx;height: 39rpx;" :src="$getDomain('/static/client/store/theme_one/virtual.png')"></image>
        </div>
        <div class="virtual-list">
          <div class="virtual-item flex" v-for="(pro,idx) in virtualGoodsLsit" :key="idx" @click="$toGoodsDetail(pro)">
            <div :style="{backgroundImage:'url('+pro.ImgPath+')'}" class="item-cover"></div>
            <div class="flex1 flex flex-column flex-justify-between">
              <div class="c3 product-title">
                <wzw-live-tag :room_id="pro.room_id" :product-info="pro" />
                {{pro.Products_Name}}
              </div>
              <div class="flex flex-vertical-c flex-justify-between">
                <div class="price-box price-selling">
                  <span class="sign fz-12">￥</span><span class="num  fz-17">{{pro.Products_PriceX}}</span>
                </div>
                <div class="btn-buy">立即购买</div>
              </div>
            </div>
          </div>

          <layout-loading v-if="virtualPaginate.load"></layout-loading>
          <div v-if="!virtualPaginate.finish" @click="getMoreByVirtual" class="get-more flex flex-justify-c flex-vertical-c">
            <span class="c9 fz-13 m-r-4">查看更多</span>
            <layout-icon type="iconright1" color="#999" size="12"></layout-icon>
          </div>
        </div>
      </div>
      <div class="h15" style="background: #f8f8f8"></div>
      <div id="cate-box" class="section-item cate-box" >
        <div id="section-sale" class="section-anchor" :style="{top:anchorTop+'px'}"></div>
        <div class="title p-t-20 p-b-0" style="text-align: center;">
          <image style="width: 254rpx;height: 63rpx;" :src="$getDomain('/static/client/store/theme_one/sale-list.png')"></image>
        </div>
        <ul class="cate-nav">
          <block  v-for="(cate,idx) in bizCateList"
			    :key="idx">
			  <li
			   v-if="cate.prod_count>0"
			    :class="{active:bizCateNavIndex === idx}"
			    @click="changeCateIdx(idx)"
			    class="cate-nav-item">
			    {{cate.cate_name}}
			    <div class="sale-underline" v-if="bizCateNavIndex===idx"></div>
			  </li>
		  </block>
        </ul>
        <div class="cate-goods-list">
          <div class="fun-goods-col" style="padding: 0 9rpx 0 0rpx">
            <block v-for="(pro,idx) in bizCateList[bizCateNavIndex].productList" :key="idx">
              <goods-item price-num-size="34rpx" price-sign-size="24rpx" cover-radius="8rpx" margin-bottom="20px" cover-width="345rpx" mode="top-bottom" :vo="pro" v-if="idx%2===0" ></goods-item>
            </block>
          </div>
          <div class="fun-goods-col" style="padding: 0 0rpx 0 9rpx">
            <block v-for="(pro,idx) in bizCateList[bizCateNavIndex].productList" :key="idx">
              <goods-item price-num-size="34rpx" price-sign-size="24rpx" cover-radius="8rpx" margin-bottom="20px" cover-width="345rpx" mode="top-bottom" :vo="pro" v-if="idx%2===1" ></goods-item>
            </block>
          </div>
        </div>
        <layout-loading v-if="bizCateList[bizCateNavIndex].load"></layout-loading>
        <div @click="getCateGoodsList" class="get-more flex flex-justify-c flex-vertical-c" v-if="!bizCateList[bizCateNavIndex].finish">
          <span class="c9 fz-13 m-r-4">查看更多</span>
          <layout-icon type="iconright1" color="#999" size="12"></layout-icon>
        </div>
        <div class="h10"></div>
      </div>
      <div class="h15" style="background: #f8f8f8"></div>
      <div id="store-box" class="section-item store-box">
        <div id="section-store" class="section-anchor" :style="{top:anchorTop+'px'}"></div>
        <div class="title p-15" style="text-align: center;">
          <image style="width: 254rpx;height: 63rpx;" :src="$getDomain('/static/client/store/theme_one/store-list.png')"></image>
        </div>
        <div class="store-list">

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
      <div class="h15" style="background: #f8f8f8"></div>
      <!--评论列表-->
      <div id="comment-box" class="section-item comment-box">
        <div id="section-comment" class="section-anchor" :style="{top:anchorTop+'px'}"></div>
        <div class="block-title">
          留言评论
        </div>
        <div class="comment-list">
          <block v-if="comments.length>0">
            <div class="comment-item" :key="idx" v-for="(item,idx) in comments">
              <layout-comment :comment="item" :isLast="comments.length-1===idx" @comment="clickComment"></layout-comment>
              <div class="comment-send" v-if="item.child.length>0">
                <block :key="ind" v-for="(com,ind) of item.child">
                  <block :key="indx" v-for="(co,indx) of com">
                    <block v-if="co.touserid==item.User_ID">
                      <div @click.stop="clickCommentSend(item,co.groupid,co.userid,co)"
                           class="fz-12 c3 comment-send-item">
                        <span class="color-comment p-r-5">{{co.user_nickname}}:</span> {{co.content}}
                      </div>
                    </block>
                    <block v-else>
                      <div class="fz-12 c3 comment-send-item p-l-10">
                        <span @click.stop="clickCommentSend(item,co.groupid,co.userid,co)" class="color-comment p-r-2">{{co.user_nickname}}</span>
                        <span class="p-l-3 p-r-3">回复</span>
                        <!--同一行记录里面，点击不同的人名，可以分别回复两个人-->
                        <span @click.stop="clickCommentSend(item,co.groupid,co.touserid,co,true)"
                              class="color-comment p-r-5">{{co.to_user_nickname}}</span>{{co.content}}
                      </div>
                    </block>
        
                  </block>
      
                </block>
              </div>
            </div>
          </block>

          <div class="fz-12 text-center "  style="color: #D2D2D2;padding-bottom: 68rpx;padding-top: 44rpx;" v-else>
            该商品暂无相关评论
          </div>
        </div>
        <layout-loading v-if="commentPaginate.load"></layout-loading>
      </div>

      <layout-modal ref="commentModal" @maskClicked="cancelComent">
        <div class="replay-comment-wrap">
        <textarea :disabled="!commentModalShow" :value="commentValue" @input="bindReplyInput" auto-height class="reason" :placeholder="commentModalPlaceholder" placeholder-style="color:#999" />
          <div class="control">
            <div @click="cancelComent" class="action-btn btn-cancel">取消</div>
            <div @click="sureComment" class="btn-sub action-btn">确定</div>
          </div>

        </div>
      </layout-modal>

    </scroll-view>

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
import { getAlbumList, getBizInfo, getBizSpikeList, getStoreList } from '@/api/store'
import { getBizProdCateList, getFlashsaleList, getProductList } from '@/api/product'
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
import GoodsItem from '@/components/good-item/good-item'
import LayoutComment from '@/components/layout-comment/layout-comment'
import LayoutModal from '@/components/layout-modal/layout-modal'
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
  name: 'store-theme-one',
  components: { LayoutLayer, LayoutModal, LayoutComment, GoodsItem, LayoutLoading, WzwLiveTag, LayoutIcon },
  mixins: [componetMixin],
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
      commentModalPlaceholder: '请输入内容',
      anchorTop: 0,
      commentModalShow: false,
      bizCateList: [],
      bizCateNavIndex: -1,
      scrollTopNum: 0,
      toViewIdx: '',
      headTabTop: 100,
      pageScrollTop: 0,
      headTabIndex: 0,
      handChangeTab:false,
      isFavourite: false,
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
      spikeList: [],
      scrollHeightS: [0, 0, 0]
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
  methods: {
    bindScroll (e) {
      const { scrollTop } = e.detail
      this.pageScrollTop = scrollTop
      this.headTabSticky = scrollTop >= this.headTabTop

      if(!this.handChangeTab){
        if (scrollTop >= this.scrollHeightS[2]) {
          this.headTabIndex = 3
          return
        }
  
        if (scrollTop >= this.scrollHeightS[1]) {
          this.headTabIndex = 2
          return
        }
  
        if (scrollTop >= this.scrollHeightS[0]) {
          this.headTabIndex = 1
          return
        }
        if (scrollTop < this.scrollHeightS[0]) {
          this.headTabIndex = 0
        }
      }
      
    },
    // 更新尺寸
    upSectionBoxHeight () {
      const query = uni.createSelectorQuery().in(this)
      query.select('#cate-box').boundingClientRect(data => {
        console.log(data)
        this.scrollHeightS[0] = data.top
      })
      query.select('#store-box').boundingClientRect(data => {
        this.scrollHeightS[1] = data.top
      })
      query.select('#comment-box').boundingClientRect(data => {
        this.scrollHeightS[2] = data.top
      })
      query.exec()
    },
    bindHeadTabClick (idx, viewId) {
      this.headTabIndex = idx
      this.handChangeTab = true
      this.setViewIdx(viewId)
    
      setTimeout(()=>{
        this.handChangeTab = false
      },1000)
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

        getProductList({ ...base, pageSize: 1 }).then(({ totalCount }) => {
          this.storeGoodsTotal = totalCount
        }).catch((err) => { throw Error(err.msg) })

        const flashActivitys = await getBizSpikeList({ biz_id: this.bid, status: 1 }, { onlyData: true }).catch((e) => {
          throw Error('获取限时抢购数据失败')
        })

        this.flashActivityList = flashActivitys.map(row => {
          // 句柄也加上
          return { ...row, countdown: { ...countdownTpml } }
        })
        // 启动限时抢购倒计时，牛逼啊霸哥
        countdownInstanceByFlash = setInterval(this.stampFuncByFlash, 1000)

        // this.goodsList = await getProductList({ pageSize: 2, ...base }, { onlyData: true }).catch(e => {
        //   throw Error(e.msg || '获取商品列表错误')
        // })
        // 虚拟商品
        this.virtualPaginate.load = true
        this.virtualGoodsLsit = await getProductList({
          pageSize: this.virtualPaginate.page,
          page: this.virtualPaginate.page,
          prod_order_type: 1,
          ...base
        }).then(res => {
          this.virtualPaginate.total = res.totalCount
          this.virtualPaginate.page++
          this.virtualPaginate.load = false

          this.virtualPaginate.finish = (this.virtualGoodsLsit.length + res.data.length) >= res.totalCount
          return res.data
        }).catch(e => {
          this.virtualPaginate.load = false
          throw Error(e.msg || '获取虚拟商品列表错误')
        })
        console.log(this.virtualGoodsLsit, this.virtualPaginate)

        const killList = await getFlashsaleList({ biz_id: this.bid }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取秒杀列表失败')
        })

        this.killList = killList.map(row => {
          // 句柄也加上
          return { ...row, countdown: { ...countdownTpml } }
        })

        // 启动倒计时，牛逼啊霸哥
        countdownInstance = setInterval(this.stampFuncByKill, 1000)

        const bizCateList = await getBizProdCateList({ biz_id: this.bid, prod_count: 1 }, { onlyData: true }).catch((e) => {
          throw Error('获取商家自定义分类失败')
        })

        this.bizCateList = bizCateList.map(row => {
          return {
            ...row,
            load: false,
            page: 1,
            pageSize: 6,
            total: 0,
            finish: false,
            productList: [] // 商品列表
          }
        })
        console.log(this.bizCateList)

        this.bizCateList.unshift({
          cate_name: '所有',
          id: 0,
          load: false,
          page: 1,
          pageSize: 6,
          total: 0,
          prod_count: 99,
          finish: false,
          productList: [] // 商品列表
        })

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
        this.couponClassName = this.couponList.length > 2 ? 'iswrap' : 'isflex'
        console.log(this.couponList)

        const { data: commentList, totalCount: commentTotal } = await getCommitList({
          biz_id: this.bid,
          page: this.commentPaginate.page,
          pageSize: this.commentPaginate.pageSize
        }).catch((e) => {
          throw Error('获取评论数据失败')
        })

        this.comments = commentList
        this.commentPaginate.page++
        this.commentPaginate.total = this.comments
        this.commentPaginate.finish = this.comments.length >= commentTotal

        this.storeList = await getStoreList({
          biz_id: this.bid,
          pageSize: 999
        }, { onlyData: true }).catch((e) => {
          throw Error('获取门店列表数据失败')
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

        if (checkIsLogin(0, 0)) {
          const { is_favourite = 0 } = await checkFavourite({ biz_id: this.bid }, { onlyData: true }).catch((e) => {
            throw e
          })
          this.isFavourite = is_favourite
        }
        hideLoading()

        this.$nextTick().then(() => {
          this.upSectionBoxHeight()
        }).catch(() => {})
        // 这个就不要等了吧
        if (!checkIsLogin(0, 0)) {
          throw Error('nocare')
        }

        this.refreshInfoByIsLogin()
      } catch (e) {
        hideLoading()
        Exception(e)
      }
    },
    toGoodsDetailFn (pro, activity) {
      this.$linkTo(`/pages/product/detail?prod_id=${pro.Products_ID}&mode=spike&spike_good_id=${pro.id}`)
    },
    toDelivery () {
      error('common soon')
      return
      this.$linkTo(`/pages/delivery/desktop?bid=${this.bid}`)
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
    toVip () {
      if (checkIsLogin(1, 1)) {
        this.$linkTo('/pagesA/user/VipList?bid=' + this.bid)
      }
    },
    toApply () {
      this.$linkTo('/pages/product/apply?bid=' + this.bid)
    },

    async getCateGoodsList () {
      // 牛逼啊
      this.changeCateIdx(this.bizCateNavIndex, true)
    },
    async getCommentList () {
      if (this.commentPaginate.finish) {
        // toast('没有更多啦', 'none')
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

      this.getCommentList()
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
      if (!more) {
        if (idx === this.bizCateNavIndex) return// 重复点击不要了
        this.bizCateNavIndex = idx
      }

      if (this.bizCateList[this.bizCateNavIndex].finish) return // 到底了
      const base = { biz_ids: this.bid }
      try {
        const biz_cate = this.bizCateList[this.bizCateNavIndex]
        this.bizCateList[this.bizCateNavIndex].load = true
        const postData = {
          ...base,
          page: biz_cate.page,
          pageSize: biz_cate.pageSize
        }
        if (biz_cate.id) {
          postData.biz_cate_id = biz_cate.id
        }
        const { data: newList, totalCount } = await getProductList(postData).catch(err => { throw Error(err.msg) })

        this.bizCateList[this.bizCateNavIndex].page++
        this.bizCateList[this.bizCateNavIndex].productList = biz_cate.productList.concat(newList)

        this.bizCateList[this.bizCateNavIndex].finish = this.bizCateList[this.bizCateNavIndex].productList.length >= totalCount
        console.log(this.bizCateList[this.bizCateNavIndex])
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.bizCateList[this.bizCateNavIndex].load = false
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
        this.storeInfo.follow += this.isFavourite ? 1 : -1

        toast(res.msg)
      }).catch((e) => {
        Exception.handle(e)
      })
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
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#eeeeee'
    })
    this.headTabTop = this.menuButtonInfo.bottom + 10
    // 锚点要向上偏移的距离
    this.anchorTop = (this.menuButtonInfo.bottom + 10 + 55) * -1

    this.isUserLogin = checkIsLogin(0, 0)
  }
}
</script>
<style lang="scss" scoped>

  .fixed-wrap{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow: hidden;
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

.section-item{
  position: relative;
  .section-anchor{
    position: absolute;
    z-index: -6;
    visibility: hidden;
    width: 1px;
    height: 1px;
  }
}
.store-comp-wrap{
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}
.top-bg{
  position: fixed;
  left: 0;
  top: 0;
  width: 750rpx;
  /*height: 314rpx;*/
  /*z-index: -3;*/
  @include cover-img();

}
.navigator-bar{
  position: fixed;
  z-index: 9;
  width: 750rpx;
  left: 0;
  display: flex;
  align-items: center;
}
.store-info {
  height: 65px;
  padding: 5px 10px;
  color: #fff;
  .base-logo{
    position: relative;
    width: 65px;
    height: 65px;
    background: #f2f2f2;
    border-radius: 6rpx;
    overflow: hidden;
    @include cover-img();
    .thumbCount{
      position: absolute;
      bottom: 0;
      width: 65px;
      height: 16px;
      text-align: center;
      line-height: 16px;
      font-size: 10px;
      background: rgba(0,0,0,.6);
    }
  }
  .info-box {
    padding: 0 20rpx;
    flex:1;

    .store-name {

    }
    .store-activity-list{
      display: flex;
      align-items: center;
      width: 360rpx;
      overflow: hidden;
    }
    .store-activity-item{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      margin-right: 6px;
      height: 18px;
      line-height: 18px;
      padding: 0px 6px;
      border-radius: 4px;
      border: 1px solid #fff;
    }

  }
  .actions {
    display: flex;
    align-items: center;
    .action-item-space{
      width: 2px;
      background: #fff;
      margin: 0 16rpx;
    }
    .action-item {
      flex: 1;
      text-align: center;
      /*width: 40rpx;*/
      /*height: auto;*/
      //padding: 0 40rpx;
      &.share-btn {
        background: none;

        &::after {
          border: none;
        }
      }
    }
  }
}
.sticky-space{
  position: fixed;
  width: 750rpx;
  top: 0;
  z-index: 3;
  background: #fff;
  //@include cover-img();
}
.head-tab {
  position: relative;
  top: 0;
  width: 750rpx;
  box-sizing: border-box;
  background: white;
  align-items: center;
  color: #333;
  padding-top: 20px;
  padding-bottom: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  overflow: hidden;
  &.fixed{
    z-index: 4;
    position: fixed;
  }
  &.isStickly {
    border-radius: 0;
    position: fixed;
    border-bottom: 1px solid #eee;
  }

  .tab-box {
    height: 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .tab-item {
      text-align: center;
      margin-right: 20rpx;
      width: 140rpx;
      height: 16px;
      line-height: 16px;
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
        width: 140rpx;
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
.coupon-list{
  width: 750rpx;
  background: #fff;
  &.isflex{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.iswrap{
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    .coupon-item{
      display: inline-block;
      margin-left: 20rpx;
      &:last-child{
        margin-right: 20rpx;
      }

      .coupon-item-info{
        bottom:33rpx;
        left: 40rpx;
        top: 14rpx;
        .sign{
          width:16rpx;
          height:16rpx;
          background:linear-gradient(0deg,rgba(254,85,70,1),rgba(240,20,23,1));
          border-radius:50%;
          color: #fff;
          position: relative;
          .sign-text{
            font-size: 12rpx;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
          }
        }
        .num{
          font-size:68rpx;
          height: 68rpx;
          line-height: 68rpx;
          color: red;
        }
        .info{
          padding-left: 8rpx;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .name{
            font-size: 16rpx;
            color: #5B5B5B;
            margin-bottom: 10rpx;
          }
          .condition{
            font-size: 16rpx;
            color: #5B5B5B;
          }
        }

      }

    }
  }
  .coupon-item{
    position: relative;
    .coupon-item-bg{
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .coupon-item-info{
      position: absolute;
      left: 0;
      top: 0;
      botttom:0;
      right: 0;
      z-index: 2;
    }
  }
}
.feature-list {
  background: #fff;
  display: flex;
  padding: 35rpx 0 40rpx 0;
  justify-content: center;

  .feature-item {
    flex: 1;
    text-align: center;
    .feature-item-img{
      width: 139rpx;
      height: 98rpx;
      vertical-align: top;
    }
    .feature-item-title{

    }
    &:last-child {
      margin-right: 0;
    }
  }

}
.kill-list{
  padding: 30rpx 0;
  width: 750rpx;
  background: #fff;
  white-space: nowrap;
  overflow-y: hidden;
  overflow-x: scroll;
  .kill-list-item{
    display: inline-block;
    width: 260rpx;
    margin-left: 20rpx;
    font-size: 24rpx;
    &:last-child{
      margin-right: 20rpx;
    }
    .item-cover{
      width: 260rpx;
      height: 260rpx;
      @include cover-img();
    }
    .kill-countdown{
      .countdown-tag{
        background: $fun-primary-color;
        color: #fff;
        font-size: 20rpx;
        padding: 6rpx;
        border-radius: 6rpx;
      }
      .countdown-delimiter{
        font-size: 20rpx;
        color: #666;
        padding: 0 2rpx;
      }
    }
    .price-discount{
      display: flex;
      align-items: flex-end;
      .price-box{
        .sign{
          font-size: 18rpx;
        }
        .num{
          font-size: 24rpx;
        }
      }
      .discount{
        background: $fun-red-color;
        color: #fff;
      }
    }
  }
}
.flash-box{
  background: #f8f8f8;
  .flash-act-list{
    padding-bottom: 20rpx;
  }
  .flash-act-item{
    width: 710rpx;
    box-sizing: border-box;
    margin: 0 auto 20rpx;
    border-radius: 15rpx;
    padding: 30rpx 20rpx;
    background: #fff;
    &:last-child{
      margin-bottom: 0;
    }
    .flash-act-title{
    }
    .flash-act-countdown{
      width: 658rpx;
      height: 70rpx;
      margin: 0rpx auto 40rpx;
      background:#ECFFF8;
      display: flex;
      align-items: center;
      justify-content: center;
      .countdown-tag{
        background:#26C78D;
        color: #fff;
        font-size: 24rpx;
        padding: 6rpx;
        border-radius: 6rpx;
        text-align: center;
      }
      .countdown-delimiter{
        text-align: center;
        font-size: 24rpx;
        color: #26C78D;
        padding: 0 2rpx;
      }
    }
  }
  .act-goods-list{
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
  }
  .act-goods-item{
    display: inline-block;
    width: 200rpx;
    margin-right: 20rpx;
    .item-cover{
      margin: 0 auto;
      width: 154rpx;
      height: 154rpx;
      @include cover-img();
    }
  }
}
.virtual-box{
  background: #fff;
  .virtual-list{
    padding: 20rpx;
    width: 710rpx;
    .virtual-item{
      margin-bottom: 30rpx;
      height: 160rpx;
      .item-cover{
        width: 160rpx;
        height: 160rpx;
        margin-right: 25rpx;
        @include cover-img();
      }
      .product-title{
        font-size: 26rpx;
        line-height: 30rpx;
        max-height: 60rpx;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .btn-buy{
        font-size: 28rpx;
        width:140rpx;
        height:58rpx;
        background:rgba(245,54,54,1);
        border-radius:5rpx;
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
      width: 690rpx;
      padding: 0 30rpx;
      margin: 0 auto;
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
  }
.cate-box{
  background: #fff;
  .cate-goods-list{
    padding: 20rpx;
    display: flex;
    .fun-goods-col{
      width: 355rpx;
      box-sizing: border-box;
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
      &:first-child{
        margin-left: 40rpx;
      }
      &.active{
        color: $fun-green-color;
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

.comment-box{
  background: #fff;
  .block-title {
    padding: 20px;
    font-weight: bold;
  }
  .comment-list{
    width: 710rpx;
    padding:0rpx 20rpx;
    .comment-item{
      padding: 30rpx 0;
      border-bottom: 1px solid #e8e8e8;
      &:last-child{
        border-bottom: none;
      }
    }
    .comment-send-item{
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
.pro-title{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
}
</style>
