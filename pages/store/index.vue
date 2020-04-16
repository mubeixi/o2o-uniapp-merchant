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
        justify-content: space-between;

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
        width: 40rpx;
        height: auto;
        padding: 0 40rpx;
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
        background: red;
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
    .tab-page {
      .tab-page-wrap {
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
        margin-right: 30rpx;
        height: 30px;
        line-height: 30px;
        display: inline-block;
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
        width: 690rpx;
        height: 170rpx;
        padding: 10px 0 10px 10px;
        margin-bottom: 20rpx;
        font-size: 14px;
        /*border-bottom: 1px dashed #eee;*/
        display: flex;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
          /*border-bottom: none;*/
        }
        .cover {
          width: 220rpx;
          height: 170rpx;
          @include cover-img()
        }

        .right {
          flex: 1;
          padding-left: 25rpx;
          font-size: 12px;
          .title {
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: bold;
            color: #333;
            line-height: 20px;
            height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .desc {
            color: #888;
            margin-bottom: 6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .price-box {
            display: flex;
            /*margin-bottom: 6px;*/
            .selling-price {
              color: $fun-red-color;
              .num {
                font-size: 14px;
              }
            }
          }

          .action {
            padding-right: 4px;
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
  }

  .comment-box {

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

<template>
  <div class="page-wrap">
    <div class="store-info">
      <div class="base">
        <div class="logo"
             :style="{backgroundImage:'url('+'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg'+')'}"></div>
        <div class="title">海的故事咖啡屋（文化路店）</div>
      </div>
      <div class="actions">
        <image mode="widthFix" class="action-item" src="/static/store/address.png"></image>
        <image mode="widthFix" class="action-item" src="/static/store/phone.png"></image>
        <image mode="widthFix" class="action-item" src="/static/store/favorite.png"></image>
        <image mode="widthFix" class="action-item" src="/static/store/timeline.png"></image>
        <image mode="widthFix" class="action-item" src="/static/store/share.png"></image>
      </div>
    </div>
    <!--占位-->
    <div style="height:15px;border-top-right-radius: 15px;border-top-left-radius: 15px;background: white;"></div>
    <div class="head" id="stickyTab" :class="{isStickly:headTabSticky}">
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
    <div></div>

    <swiper
      :current="headTabIndex"
      @change="indexChangeEvent"
      class="tab-container"
      :style="{height:(systemInfo.windowHeight+'px')}">
      <swiper-item class="tab-page">
        <!-- @scroll="bindscrollFn1" scroll-y :style="{height:(systemInfo.windowHeight+'px')}"-->
        <scroll-view class="tab-page-wrap" scroll-y :style="{height:(systemInfo.windowHeight+'px')}">

          <!--          <scroll-view class="coupon-section" scroll-x>-->
          <!--            <div class="coupon-item" v-for="(coupon,idx) in couponList">-->
          <!--              <div class="containier">-->
          <!--                <div class="price">-->
          <!--                  <div class="sign">{{coupon.num?'￥':'折'}}</div>-->
          <!--                  <div class="num">{{coupon.num?coupon.num:coupon.discount}}</div>-->
          <!--                </div>-->
          <!--                <div class="info">-->
          <!--                  <span class="condition">满{{coupon.condition}}使用</span>-->
          <!--                  <span class="use-end-item">有效期至{{coupon.use_end_time}}</span>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </scroll-view>-->

          <div class="activity-list">
            <div class="activity-item" v-for="(item,idx) in activityList">{{item}}</div>
          </div>

          <div class="feature-list">
            <image mode="scaleToFill" class="feature-item" src="/static/store/send.png"></image>
            <image mode="scaleToFill" class="feature-item" src="/static/store/pay.png"></image>
            <image mode="scaleToFill" class="feature-item" src="/static/store/join.png"></image>
            <image mode="scaleToFill" class="feature-item" src="/static/store/member.png"></image>
          </div>

          <!--优惠券产品-->
          <div class="block coupon-goods-list">
            <div class="block-title">
              <div class="block-title-text">到店券</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="goods-list">
                <div class="goods-item" v-for="(item,idx) in goodsList" :key="idx">
                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.thumb+')'}"></div>
                  </div>
                  <div class="right">
                    <h5 class="title"><span>{{item.title}}</span></h5>
                    <div class="flex flex-justify-between flex-vertical-center">
                      <div class="flex1">
                        <div class="tags" v-if="item.tags">
                          <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                        </div>
                        <div class="price-box">
                          <div class="selling-price">
                            <span class="sign">￥</span><span class="num">{{item.selling_price}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="action">
                        <image class="img" src="/static/store/cart.png"></image>
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
              <li class="nav-item" @click="goodsNavIndex=0" :class="{active:goodsNavIndex === 0}">推荐产品</li>
              <li class="nav-item" @click="goodsNavIndex=1" :class="{active:goodsNavIndex === 1}">产品分类</li>
              <li class="nav-item" @click="goodsNavIndex=2" :class="{active:goodsNavIndex === 2}">全部产品</li>
            </ul>
            <div class="block-content">
              <swiper
                :current="goodsNavIndex"
                style="height:670rpx"
                class="tab-container">
                <swiper-item class="tab-page">
                  <scroll-view class="tab-page-wrap" scroll-y>
                    <div class="goods-list">
                      <div class="goods-item" v-for="(item,idx) in recommends" :key="idx">
                        <div class="cover" :style="{backgroundImage:'url('+item.thumb+')'}"></div>
                        <div class="right">
                          <h5 class="title"><span>{{item.title}}</span></h5>
                          <h5 class="desc"><span>{{item.description}}</span></h5>
                          <div class="flex flex-justify-between flex-vertical-center">
                            <div class="price-box">
                              <div class="selling-price">
                                <span class="sign">￥</span><span class="num">{{item.selling_price}}</span>
                              </div>
                            </div>
                            <div class="action">
                              <div class="btn">购买</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </scroll-view>
                </swiper-item>
                <swiper-item class="tab-page">
                  <scroll-view class="tab-page-wrap" scroll-y>
                    分类
                  </scroll-view>
                </swiper-item>
                <swiper-item class="tab-page">
                  <scroll-view class="tab-page-wrap" scroll-y>
                    全部产品
                  </scroll-view>
                </swiper-item>
              </swiper>

            </div>
          </div>

          <!--评论列表-->
          <div class="block comment-box">

            <div class="block-title">
              <div class="block-title-text">留言评论</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="comment-list">
                <div
                  v-for="(item,idx) in comments"
                  :key="idx"
                >
                  <comment-item :comment="item"></comment-item>
                </div>

              </div>
            </div>
          </div>

          <!--发布评论-->
          <view class="commtent-add section">
            <textarea class="textarea" @blur="bindTextAreaBlur" auto-height placeholder="发表你的评论..." />
          </view>

          <copyright></copyright>

        </scroll-view>
      </swiper-item>

      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" @scroll="bindscrollFn2" scroll-y
                     :style="{height:(systemInfo.windowHeight+'px')}">
          介绍
        </scroll-view>
      </swiper-item>
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" @scroll="bindscrollFn3" scroll-y
                     :style="{height:(systemInfo.windowHeight+'px')}">
          相册
        </scroll-view>
      </swiper-item>
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" @scroll="bindscrollFn4" scroll-y
                     :style="{height:(systemInfo.windowHeight+'px')}">
          门店
        </scroll-view>
      </swiper-item>
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" @scroll="bindscrollFn5" scroll-y
                     :style="{height:(systemInfo.windowHeight+'px')}">
          点评
        </scroll-view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'

export default {
  name: 'StoreIndex',
  mixins:[BaseMixin],
  data () {
    return {
      couponList: [
        {
          id: 1,
          title: 'xx优惠券',
          num: 50,
          discount: 0,
          use_end_time: '2020.3.31',
          condition: '199'
        },
        {
          id: 1,
          title: 'xx优惠券',
          num: 50,
          discount: 0,
          use_end_time: '2020.3.31',
          condition: '199'
        },
        {
          id: 1,
          title: 'xx优惠券',
          num: 0,
          discount: 2.5,
          use_end_time: '2020.3.31',
          condition: '199'
        },
        {
          id: 1,
          title: 'xx优惠券',
          num: 50,
          discount: 0,
          use_end_time: '2020.3.31',
          condition: '199'
        },
        {
          id: 1,
          title: 'xx优惠券',
          num: 0,
          discount: 6,
          use_end_time: '2020.3.31',
          condition: '199'
        },
        {
          id: 1,
          title: 'xx优惠券',
          num: 50,
          discount: 0,
          use_end_time: '2020.3.31',
          condition: '199'
        }
      ],
      activityList: ['首单减13', '满50减10', '满100减25'],
      comments: [
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        },
        {
          id: 11,
          content: '挺好的，我们很喜欢，甜点不腻好吃，鱼柳也好吃，牛排也很不错南瓜汤也很赞，饮品一般吧！满意，还会去',
          nickname: '芷云青霜',
          headimg: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231610328297.jpg',
          create_at: '2020-03-11',
          hits: 444
        }
      ],
      liveNav: [{
        title: '全部',
        cid: 0
      }, {
        title: '小吃',
        cid: 0
      }, {
        title: '美食',
        cid: 0
      }, {
        title: '住宿',
        cid: 0
      }, {
        title: '日常',
        cid: 0
      }, {
        title: '旅游',
        cid: 0
      }],
      liveNavIndex: 0,
      liveList: [
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        },
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        },
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        },
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        },
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        },
        {
          id: 1,
          title: '王师傅单人份早餐美味营养回头客多单人份早餐美味营养...',
          selling_price: 158.00,
          market_price: 666.00,
          sale_count: 4343,
          tags: ['营养', '卫生干净'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231121596330.png'
        }
      ],
      goodsNavIndex: 0,
      recommends: [
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        },
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          description: '精选上等原材料，用心做好每一个蛋糕',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231532516317.png',
          discount: 2.5
        }
      ],
      goodsList: [
        {
          id: 1,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 2.5
        },
        {
          id: 2,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 0
        },
        {
          id: 3,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 0
        },
        {
          id: 4,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 0
        },
        {
          id: 5,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 5.6
        },
        {
          id: 6,
          title: '北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪半熟芝士糕点礼盒柔滑芝士慕斯',
          selling_price: 158.00,
          tags: ['现做', '美味可口'],
          thumb: 'https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003231501506251.png',
          discount: 0
        }
      ],
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
      pageScrollTop: 0,
      headTabTop: 0,
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
    bindTextAreaBlur (e) {
      const { value } = e.$wx.detail
      console.log(value)
    },
    bindPageScroll (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      console.log(scrollTop)
      this.pageScrollTop = scrollTop
    },
    bindscrollFn1 (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      this.scrollList[0].scrollTop = scrollTop
    },
    bindscrollFn2 (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      this.scrollList[1].scrollTop = scrollTop
    },
    bindscrollFn3 (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      this.scrollList[2].scrollTop = scrollTop
    },
    bindscrollFn4 (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      this.scrollList[3].scrollTop = scrollTop
    },
    bindscrollFn5 (e) {
      const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.$wx.detail
      this.scrollList[4].scrollTop = scrollTop
    },
    indexChangeEvent (event) {
      const { current, source } = event.$wx.detail
      this.headTabIndex = current
    },
    changeLiveNav (idx) {
      this.liveNavIndex = idx
    }
  },
  onPageScroll (e) {
    const { scrollTop } = e
    this.pageScrollTop = scrollTop
    this.headTabSticky = scrollTop > this.headTabTop
  },
  onShow () {

  },
  onReady () {
    const query = wx.createSelectorQuery()
    query.select('#stickyTab').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      this.headTabTop = res[0].top
    })
  }
}
</script>
