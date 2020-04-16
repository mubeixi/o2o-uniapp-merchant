<template>
  <div class="page-wrap">
    <div class="head-box" :style="{height:diyHeadHeight+'px'}">
      <div class="head"
           :style="{height:menuButtonInfo.height+'px',paddingRight:diyHeadRight+'px',marginTop:menuButtonInfo.top+'px'}">
        <ul class="tab-box">
          <li @click="headTabIndex=0" class="tab-item" :class="[headTabIndex === 0?'active':'']">特价<span
            v-if="headTabIndex === 0" class="underline"></span></li>
          <li @click="headTabIndex=1" class="tab-item" :class="[headTabIndex === 1?'active':'']">同城闪送<span
            v-if="headTabIndex === 1" class="underline"></span></li>
          <li @click="headTabIndex=2" class="tab-item" :class="[headTabIndex === 2?'active':'']">好店<span
            v-if="headTabIndex === 2" class="underline"></span></li>
        </ul>
        <div class="search-box"
             :style="{borderRadius: menuButtonInfo.height/2+'px',height:menuButtonInfo.height+'px',}">
          <layout-icon class="iconsearch" type="iconicon-search" size="16" color="#fff"></layout-icon>
        </div>
      </div>
    </div>
    <!--  占位-->
    <div :style="{height:diyHeadHeight+'px'}"></div>

    <swiper
      :current="headTabIndex"
      @change="indexChangeEvent"
      class="tab-container"
      :style="{top:diyHeadHeight+'px',height:(systemInfo.windowHeight-diyHeadHeight+'px')}">
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" scroll-y :style="{height:(systemInfo.windowHeight-diyHeadHeight+'px')}">
          <div class="nav">
            <ul class="nav-list" :style="{display:navs.length<6?'flex':'block'}">
              <li @click="go(item)" v-for="(item,idx) in navs" :key="idx" class="nav-item"
                  :style="{flex:navs.length<6?'1':''}">
                <image mode="heightFix" class="icon-img" :src="item.src"></image>
                <h4 class="title">{{item.title}}</h4>
              </li>
            </ul>
          </div>
          <layout-ad
            style="background: white"
            :imgs="slide.imgs"
            indicatorDots="line"
            dotsColor="#C5C5C5"
            dotsActiveColor="#26C78D"
            itemwidth="655rpx"
            itemheight="144rpx"
          ></layout-ad>
          <div class="block kill">
            <div class="block-title">
              <div class="block-title-text">今日秒杀</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <span>查看全部</span>
                <icon class="iconright" type="iconright" size="14" color="#999"></icon>
              </div>
            </div>
            <div class="block-content">
              <div class="goods-list">
                <div class="goods-item" v-for="(item,idx) in goodsList" :key="idx">
                  <div class="cover" :style="{backgroundImage:'url('+item.thumb+')'}">
                    <div class="tip" style="background: #185e44;">同城配送</div>
                  </div>
                  <h5 class="title">{{item.title}}</h5>
                  <div class="price-box">
                    <div>
                      <span class="sign">￥</span><span class="num">{{item.selling_price}}</span>
                    </div>
                    <div class="tags">
                      <span class="tag" v-if="item.discount">{{item.discount}}折</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="block live">

            <div class="block-title">
              <div class="block-title-text">钜惠推荐</div>
              <div class="block-title-more flex flex-vertical-center c9 fz-12">
                <!--          <span>查看全部</span>-->
                <!--          <icon class="iconright" type="iconright" size="14" color="#999"></icon>-->
              </div>
            </div>
            <div class="nav-box">
              <ul class="nav-list">
                <li class="nav-item"
                    @click="changeLiveNav(idx)"
                    v-for="(nav,idx) in liveNav"
                    :key="idx"
                    :class="{active:liveNavIndex === idx}"
                >{{nav.title}}
                </li>
              </ul>
            </div>
            <div class="block-content">
              <div class="live-list">
                <div class="live-item" v-for="(item,idx) in liveList" :key="idx">
                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.thumb+')'}"></div>
                    <!---->
                    <div class="title">
                      <span class="live-status"><layout-icon display="inline" type="iconicon-count" color="#fff" size="14"></layout-icon>直播中</span>
                      <span class="text">{{item.title}}</span>
                    </div>
                  </div>
                  <div class="right">
                    <div class="price-box">
                      <div class="selling-price">
                        <span class="sign">￥</span><span class="num">{{item.selling_price}}</span>
                      </div>
                      <div class="market-price m-l-6">
                        <span class="sign">￥</span><span class="num">{{item.market_price}}</span>
                      </div>
                    </div>
                    <div class="sale-count">已抢{{item.sale_count}}份</div>
                    <div class="tags" v-if="item.tags">
                      <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                    </div>
                    <div class="action">
                      <div class="btn">抢</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <copyright></copyright>
        </scroll-view>
      </swiper-item>

      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" scroll-y :style="{height:(systemInfo.windowHeight-diyHeadHeight+'px')}">

          <div class="section scroll-box  p-t-10 p-b-20 bg-white" @touchmove.stop.prevent="$noop">
            <li class="scroll-item m-l-15 p-b-5 fz-15 c3"
                @click="changeQuickCateNav(idx)"
                v-for="(cate,idx) in firstCateList"
                :key="idx"
                :class="{active:quickFirstCateIdx === idx}"
            >{{cate.Category_Name}}
            </li>
          </div>

          <div class="section grid-box bg-white">
            <swiper
              :current="quickFirstCateIdx"
              @change="quickCateIndexChange"
              class="quick-cate-swiper"
            >
              <swiper-item class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList" :key="idx1">
                <div class="grid-box">
                  <div
                    style="width: 150rpx;box-sizing: border-box;"
                    class="grid-item p-t-10 p-b-10"
                    @click="go(item)"
                    v-for="(item,idx) in first.child"
                    :key="idx"
                  >
                    <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix" :src="item.Category_Img"></image>
                    <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}</div>
                  </div>
                </div>
              </swiper-item>
            </swiper>

          </div>

          <copyright></copyright>
        </scroll-view>
      </swiper-item>
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" scroll-y :style="{height:(systemInfo.windowHeight-diyHeadHeight+'px')}">

          <div class="section scroll-box  p-t-10 p-b-20 bg-white" @touchmove.stop.prevent="$noop">
            <li class="scroll-item m-l-15 p-b-5 fz-15 c3"
                @click="changeStoreCateNav(idx)"
                v-for="(cate,idx) in firstCateList"
                :key="idx"
                :class="{active:storeFirstCateIdx === idx}"
            >{{cate.Category_Name}}
            </li>
          </div>

          <div class="section grid-box bg-white">
            <swiper
              :current="storeFirstCateIdx"
              @change="storeCateIndexChange"
              class="quick-cate-swiper"
            >
              <swiper-item class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList" :key="idx1">
                <div class="grid-box">
                  <div
                    style="width: 150rpx;box-sizing: border-box;"
                    class="grid-item p-t-10 p-b-10"
                    @click="go(item)"
                    v-for="(item,idx) in first.child"
                    :key="idx"
                  >
                    <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix" :src="item.Category_Img"></image>
                    <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}</div>
                  </div>
                </div>
              </swiper-item>
            </swiper>

          </div>
          <copyright></copyright>
        </scroll-view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductCategory
} from '@/api/product'
import { Exception } from '@/common/Exception'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import Mock from '@/dev/Mock'
export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  computed: {
    // quickNavs () {
    //   try {
    //     return this.firstCateList[this.quickFirstCateIdx].child
    //   } catch (e) {
    //     return []
    //   }
    // }
  },
  data () {
    return {
      firstCateList: [], // 一级菜单
      quickFirstCateIdx: 0, // 同城闪送
      storeFirstCateIdx: 0, // 好店
      liveNavIndex: 0,
      headTabIndex: 0,
      liveNav: [],
      liveList: [],
      goodsList: [],
      slide: [],
      navs: []

    }
  },
  onLoad () {

  },
  async created () {
    try {
      this.liveNav = await Mock.getDataByRequest('liveNav',100)

      this.liveList = await Mock.getDataByRequest('liveList',100)

      this.goodsList = await Mock.getDataByRequest('goodsList',100)

      this.slide = await Mock.getDataByRequest('slide',100)

      this.navs = await Mock.getDataByRequest('navs',100)

      this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => { throw Error('获取商品分类失败') })
      // this.$toast('加载成功','none')
    } catch (e) {
      Exception.handle(e)
    }
  },
  methods: {
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
    },
    quickCateIndexChange (event) {
      const { current } = event.detail
      this.quickFirstCateIdx = current
    },
    changeQuickCateNav (idx) {
      this.quickFirstCateIdx = idx
    },
    storeCateIndexChange (event) {
      const { current } = event.detail
      this.storeFirstCateIdx = current
    },
    changeStoreCateNav (idx) {
      this.storeFirstCateIdx = idx
    },
    changeLiveNav (idx) {
      this.liveNavIndex = idx
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #f8f8f8;
  }

  .quick-cate-swiper{
    height: 174px;
    width: 750rpx;
    overflow: hidden;
  }

  .live {
    padding: 0 25rpx;
    background: white;

    .block-title {
      padding: 20px 0 10px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .nav-box {
      color: #666666;
      margin-bottom: 10px;

      .nav-list {
        overflow-y: hidden;
        overflow-x: scroll;

        &::-webkit-scrollbar {
          display: none;
        }

        .nav-item {
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
    }

    .live-list {
      display: flex;
      flex-wrap: wrap;

      .live-item {
        width: 700rpx;
        padding: 0 0 10px 0;
        margin-bottom: 20rpx;
        font-size: 14px;
        border-bottom: 1px dashed #eee;
        display: flex;

        &:last-child {
          margin-bottom: 0;
          border-bottom: none;
        }

        .left {
          width: 460rpx;

          .cover {
            width: 460rpx;
            height: 230rpx;
            @include cover-img()
          }

          .title {
            font-size: 13px;
            max-height: 36px;
            line-height: 18px;
            margin-top: 10px;
            color: #333;
            
            .text{
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-right: 3px;
            }
            .live-status {
              display: inline-block;
              margin-right: 4px;
              background: linear-gradient(#F53636,#FF5539);
              color: #fff;
              font-size: 10px;
              height: 10px;
              line-height: 10px;
              padding: 4px;
              border-top-right-radius: 8px;
              border-bottom-right-radius: 8px;
            }
          }
        }

        .right {
          margin-left: 34rpx;
          font-size: 12px;

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
              text-align: center;
              background: #FFEBEB;
              color: $fun-red-color;
              padding: 0 6px;
              font-size: 10px;
              height: 16px;
              line-height: 16px;

            }
          }

          .action {
            display: flex;
            justify-content: center;

            .btn {
              width: 78rpx;
              height: 78rpx;
              text-align: center;
              line-height: 78rpx;
              border-radius: 50%;
              background: $fun-red-color;
              color: white;
              border: 12rpx solid #FFE7E7;
            }
          }
        }
      }
    }
  }

  .kill {
    padding: 0 25rpx;
    background: white;

    .block-title {
      padding: 20px 0 10px 0;

      .block-title-text {
        font-weight: bold;
      }
    }

    .goods-list {
      display: flex;
      flex-wrap: wrap;

      .goods-item {
        width: 220rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        font-size: 12px;

        &:nth-child(3n+0) {
          margin-right: 0;
        }

        .cover {
          width: 220rpx;
          height: 220rpx;
          @include cover-img();
          position: relative;
          .tip{
            position: absolute;
            left: 0;
            top:0;
            color: #fff;
            font-size: 10px;
            height: 17px;
            line-height: 17px;
            width: 50px;
            text-align: center;
            background: rgba(30,146,104,.6);
          }
        }

        .title {
          margin: 4px 0;
          color: #333;
          line-height: 16px;
          height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .price-box {
          display: flex;

          .sign {
            color: $fun-red-color;
          }

          .num {
            color: $fun-red-color;
            font-size: 14px;
          }
        }

        .tags {
          .tag {
            display: inline-block;
            margin-left: 4px;
            text-align: center;
            background: $fun-red-color;
            color: #fff;
            font-size: 10px;
            height: 14px;
            line-height: 14px;
            width: 34px;
            border-top-right-radius: 7px;
            border-bottom-right-radius: 7px;
          }
        }
      }
    }
  }

  .nav {
    background: white;

    &-item {
      padding: 25px 0 10px;
      text-align: center;

      .icon-img {
        height: 60rpx;
        width: 60rpx;
        vertical-align: top;
      }

      .title {
        margin-top: 4px;
        font-size: 14px;
        color: #444;
      }
    }
  }

  .head-box {
    position: fixed;
    top: 0;
    width: 750rpx;
    box-sizing: border-box;

    z-index: 2;
    background: $fun-green-color;
  }

  .head {
    padding-left: 20rpx;
    display: flex;
    align-items: center;
    color: white;

    .tab-box {
      flex: 1;
      display: flex;
      align-items: flex-end;

      .tab-item {
        margin-right: 40rpx;
        padding-bottom: 8px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        .underline {
          visibility: hidden;
          position: absolute;
          bottom: 0;
          height: 2px;
          width: 18px;
          background: #fff;
          left: 50%;
          transform: translateX(-50%);
        }

        &.active {
          font-size: 40rpx;

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
