<template>
  <div class="page-wrap">
    <div class="head-box" :style="{height:diyHeadHeight+'px',backgroundColor:topBgColor}">
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
      <!--特价-->
      <swiper-item class="tab-page">
        <scroll-view class="tab-page-wrap" scroll-y :style="{height:(systemInfo.windowHeight-diyHeadHeight+'px')}">
          <!--<div class="nav">
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
          ></layout-ad>-->

          <view class="home-diy-wrap">
            <section
              v-for="(item, index) in templateList[tagIndex]"
              :key="index"
              class="section"
              :class="[item]"
              :data-name="item">
              <diy-base
                v-if="item.indexOf('base') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-base>
              <diy-swiper
                v-if="item.indexOf('swiper') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-swiper>
              <diy-nav
                v-if="item.indexOf('nav') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-nav>
              <diy-video
                ref="video"
                v-if="item.indexOf('video') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-video>
              <diy-hr
                v-if="item.indexOf('hr') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-hr>
              <diy-space
                v-if="item.indexOf('space') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-space>
              <diy-title
                v-if="item.indexOf('title') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-title>
              <diy-text
                v-if="item.indexOf('text') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-text>
              <diy-search
                v-if="item.indexOf('search') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-search>
              <diy-notice
                ref="notice"
                v-if="item.indexOf('notice') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-notice>
              <diy-coupon
                v-if="item.indexOf('coupon') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-coupon>
              <diy-goods
                v-if="item.indexOf('goods') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-goods>
              <diy-cube
                v-if="item.indexOf('cube') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-cube>
              <diy-tab
                v-if="item.indexOf('tab') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-tab>
              <diy-group
                v-if="item.indexOf('group') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-group>
              <diy-flash
                v-if="item.indexOf('flash') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-flash>
              <diy-kill
                v-if="item.indexOf('kill') !== -1"
                :confData="templateData[tagIndex][index]"
                :index="index"></diy-kill>
            </section>
          </view>

          <div class="block kill">
            <div class="block-title flex-ver-c">
              <div class="block-title-text">今日秒杀</div>
              <div class="block-title-more flex flex-ver-c c9 fz-12">
                <span>查看全部</span>
                <layout-icon type="iconicon-arrow-right" size="14" color="#999"></layout-icon>
              </div>
            </div>
            <div class="block-content">
              <div class="goods-list">
                <div class="goods-item" v-for="(item,idx) in goodsList" :key="idx">
                  <block v-if="idx<6">
                    <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}">
                      <div class="tip" style="background: #185e44;">同城配送</div>
                    </div>
                    <h5 class="title">{{item.Products_Name}}</h5>
                    <div class="price-box">
                      <div>
                        <span class="sign">￥</span><span class="num">{{item.Products_PriceX}}</span>
                      </div>
                      <div class="tags">
                        <span class="tag" v-if="item.discount">{{item.discount}}折</span>
                      </div>
                    </div>
                  </block>
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
                <div class="live-item" v-for="(item,idx) in goodsList" :key="idx">
                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                    <!---->

                  </div>
                  <div class="right">
                    <div class="title">
                      <span class="live-status"><layout-icon display="inline" type="iconicon-count" color="#fff" size="14"></layout-icon>直播中</span>
                      <span class="text">{{item.title}}</span>
                    </div>
<!--                    <div class="sale-count">已抢{{item.sale_count}}份</div>-->
                    <div class="tags" v-if="item.tags">
                      <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                    </div>
                    <div class="action">
                      <image class="bgimg" src="/static/home/capsule.png"></image>
                      <div class="fz-12 color-white price-box">
                        <span style="color: #754827;">爆抢{{item.Products_Sales}}件</span>
                        <div class="flex fz-10 flex-vertical-b">
                          <span>￥</span><span class="fz-12">{{item.Products_PriceX}}</span>
                          <span class="text-through p-l-4">￥{{item.Products_PriceY}}</span>
                        </div>
                      </div>
                    </div>
<!--                    <div class="action">-->
<!--                      <div class="btn">抢</div>-->
<!--                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <copyright></copyright>
        </scroll-view>
      </swiper-item>
      <!--同城闪送-->
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
                    <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix"
                           :src="item.Category_Img"></image>
                    <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}
                    </div>
                  </div>
                </div>
              </swiper-item>
            </swiper>

          </div>

          <div class="hr h10"></div>

          <div class="p-t-20 p-b-20 bg-white">
            <layout-ad code="indexTop"></layout-ad>
          </div>

          <div class="page-section-title">
            <span class="before"></span>
            <span class="text">人气商家</span>
            <span class="after"></span>
          </div>

          <div class="store-top-item" v-for="(num,idx) in [1,2,3]" :key="idx">
            <div class="store-info flex flex-vertical-c flex-justify-between">
              <div class="p-l-10 p-r-10 flex flex-vertical-c">
                <image class="logo"
                       src="https://newo2o.bafangka.com/static/member/images/login/loginWeixin.png"></image>
                <div class="p-l-10 c3">
                  <div class="name fz-15 m-b-5"> 海的故事咖啡店</div>
                  <div class="activity">全场满300包邮，1300封顶</div>
                </div>
              </div>
              <div class="flex flex-vertical-c">
                <span class="p-r-8 fz-14 c6">进入商家</span>
                <layout-icon color="#999" type="iconicon-arrow-right"></layout-icon>
              </div>
            </div>
            <div class="store-goods-list">
              <block v-for="(goods,idx) in goodsList" :key="idx">
                <div class="store-goods-item" v-if="idx<3" >

                  <image :style="{backgroundImage:'url('+goods.ImgPath+')'}" class="cover" />
                  <div class="title fz-12 c3 p-t-7 p-b-7">{{goods.Products_Name}}</div>
                  <div class="fz-10 c9 flex flex-vertical-b">
                    <span class="price-selling">￥</span><span
                    class="fz-12 price-selling">{{goods.Products_PriceX}}</span>
                    <span class="text-through m-l-2">￥</span><span class="text-through">{{goods.Products_PriceY}}</span>
                  </div>

                </div>
              </block>
            </div>
          </div>

          <layout-copyright></layout-copyright>
        </scroll-view>
      </swiper-item>
      <!--好店-->
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
                    <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix"
                           :src="item.Category_Img"></image>
                    <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}
                    </div>
                  </div>
                </div>
              </swiper-item>
            </swiper>

          </div>
          <layout-copyright></layout-copyright>
        </scroll-view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductCategory, getProductList
} from '@/api/product'
import {
  getSkinConfig
} from '@/api/common'
import { Exception } from '@/common/Exception'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import Mock from '@/dev/Mock'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import LayoutAd from '@/componets/layout-ad/layout-ad'
import {
  mapGetters
} from 'vuex'

/**
 * 自定义组件
 */
import DiyBase from '@/componets/diy-base/diy-base'
import DiySwiper from '@/componets/diy-swiper/diy-swiper'
import DiyVideo from '@/componets/diy-video/diy-video'
import DiyHr from '@/componets/diy-hr/diy-hr'
import DiySpace from '@/componets/diy-space/diy-space'
import DiySearch from '@/componets/diy-search/diy-search'
import DiyNotice from '@/componets/diy-notice/diy-notice'
import DiyCoupon from '@/componets/diy-coupon/diy-coupon'
import DiyCube from '@/componets/diy-cube/diy-cube'
import DiyTab from '@/componets/diy-tab/diy-tab'
import DiyGroup from '@/componets/diy-group/diy-group'
import DiyFlash from '@/componets/diy-flash/diy-flash'

export default {
  mixins: [BaseMixin],
  components: {
    DiyFlash,
    DiyGroup,
    DiyTab,
    DiyCube,
    DiyCoupon,
    DiyNotice,
    DiySearch,
    DiySpace,
    DiyHr,
    DiyVideo,
    DiySwiper,
    DiyBase,
    LayoutAd,
    LayoutCopyright,
    LayoutIcon
  },
  computed: {
    ...mapGetters({
      topBgColor: 'theme/pimaryColor'
    })
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
      tagIndex: 0,
      firstCateList: [], // 一级菜单
      quickFirstCateIdx: 0, // 同城闪送
      storeFirstCateIdx: 0, // 好店
      liveNavIndex: 0,
      headTabIndex: 0,
      liveNav: [],
      liveList: [],
      goodsList: [],
      slide: [],
      navs: [],
      templateList: [],
      templateData: []

    }
  },
  onLoad () {
    console.log(this.$store.getters['theme/pimaryColor'])
  },
  created () {
    // var socketOpen = false;
    // var socketMsgQueue = [];
    //
    // uni.connectSocket({
    //   url: 'wss://newjdtravel.bafangka.com/cus/'
    // });
    //
    // uni.onSocketOpen(function (res) {
    //   socketOpen = true;
    //   for (var i = 0; i < socketMsgQueue.length; i++) {
    //     sendSocketMessage(socketMsgQueue[i]);
    //   }
    //   socketMsgQueue = [];
    // });
    //
    // function sendSocketMessage(msg) {
    //   if (socketOpen) {
    //     uni.sendSocketMessage({
    //       data: msg
    //     });
    //   } else {
    //     socketMsgQueue.push(msg);
    //   }
    // }

    this._init_func()
  },
  methods: {
    async _init_func () {
      try {
        this.liveNav = await Mock.getDataByRequest('liveNav', 100)

        this.liveList = await Mock.getDataByRequest('liveList', 100)

        this.goodsList = await getProductList({}, { onlyData: true }).catch(err => {
          throw Error(err.msg || '初始化商品失败')
        })

        this.slide = await Mock.getDataByRequest('slide', 100)

        this.navs = await Mock.getDataByRequest('navs', 100)

        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => {
          throw Error('获取商品分类失败')
        })

        const mixinData = await this.get_tmpl_data()
        if (mixinData === false) return
        const templateData = mixinData.plugin
        this.system = mixinData.system

        // 存储页面数据
        this.templateData = [] // 页面数据的二维数组。
        this.templateList = [] // 页面组件的二维数组。
        if (templateData && Array.isArray(templateData[0])) {
          // 多个页面，每个页面是一个数组
          templateData.map(item => {
            this.templateData.push(item)
            this.templateList.push([])
          })
        } else if (
          templateData && !Array.isArray(templateData[0]) && templateData.length > 0
        ) {
          // 单纯是一个对象的时候？？
          this.templateData = [templateData]
          this.templateList = [[]]
        } else {
          this.templateData = [[]]
          this.templateList = [[]]
        }
        // this.templateData = templateData
        // 存储页面组件templateList
        for (let i = 0; i < this.templateData.length; i++) {
          if (
            this.templateData[i] &&
            this.templateData[i] !== []
          ) {
            this.templateData[i].map(m => {
              this.templateList[i].push(m.tag)
            })
          }
        }

        // this.$toast('加载成功','none')
      } catch (e) {
        Exception.handle(e)
      }
    },
    get_tmpl_data () {
      let rt = {}
      return new Promise((resolve, reject) => {
        getSkinConfig().then(res => {
          if (res.data.Home_Json) {
            rt = JSON.parse(res.data.Home_Json)
            resolve(rt)
          } else {
            reject(false)
          }
        }).catch(e => {
          reject(false)
        })
      })
    },
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

  .quick-cate-swiper {
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
          width: 300rpx;

          .cover {
            width: 300rpx;
            height: 300rpx;
            @include cover-img();
            border-top-left-radius: 10rpx;
            border-bottom-left-radius: 10rpx;
            overflow: hidden;
          }

        }

        .right {
          margin-left: 10px;
          padding-top: 10px;
          font-size: 12px;

          .title {
            font-size: 13px;
            max-height: 36px;
            line-height: 18px;
            margin-top: 10px;
            color: #333;
            overflow: hidden;

            .text {
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-right: 3px;
            }

            .live-status {
              display: inline-block;
              margin-right: 4px;
              background: linear-gradient(#F53636, #FF5539);
              color: #fff;
              font-size: 10px;
              height: 10px;
              line-height: 10px;
              padding: 4px;
              border-top-right-radius: 8px;
              border-bottom-right-radius: 8px;
            }
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
            margin-top: 44rpx;
            position: relative;
            width: 370rpx;
            height: 68rpx;

            .bgimg{
              position: absolute;
              width: 370rpx;
              height: 68rpx;
              left: 0;
              top: 0;
              z-index: 1;
            }
            .price-box{
              height: 68rpx;
              padding: 0 10rpx 0 16rpx;
              position: relative;
              z-index: 3;
              display: flex;
              align-items: center;
              justify-content: space-between;
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

          .tip {
            position: absolute;
            left: 0;
            top: 0;
            color: #fff;
            font-size: 10px;
            height: 17px;
            line-height: 17px;
            width: 50px;
            text-align: center;
            background: rgba(30, 146, 104, .6);
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
    //background: $fun-green-color;
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

  .store-top-item {
    width: 710rpx;
    overflow: hidden;
    margin: 0 20rpx 30rpx;
    background: white;
    border-radius: 20rpx;
    padding: 20rpx 0;

    .store-info {
      .logo {
        width: 86rpx;
        height: 86rpx;
        border-radius: 50%;
      }

      .name {

      }

      .activity {
        padding: 2px 6px;
        font-size: 10px;
        color: #F1A43A;
        border: 1px solid #F1A43A;
        border-radius: 5rpx;
      }
    }

    .store-goods-list {
      display: flex;
      padding: 30rpx 10rpx;
    }

    .store-goods-item {
      width: 215rpx;
      overflow: hidden;
      margin-right: 14rpx;

      &:last-child {
        margin-right: 0;
      }

      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cover {
        width: 215rpx;
        height: 215rpx;
        @include cover-img();
      }
    }

  }

</style>
