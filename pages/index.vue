<template>
  <div class="page-wrap">
    <div class="head-box" :style="{height:diyHeadHeight+'px',backgroundColor:primaryColor}">
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

    <div class="main tab-container" :style="{top:diyHeadHeight+'px',height:(systemInfo.windowHeight-diyHeadHeight+'px')}">
      <scroll-view class="tab-page-wrap"  scroll-y  v-show="headTabIndex===0" >
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
              <div class="goods-item" v-for="(item,idx) in goodsList" :key="idx" @click="$toGoodsDetail(item.Products_ID)">
                <block v-if="idx<6">
                  <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}">
<!--                    <div class="tip" style="background: #185e44;">同城配送</div>-->
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
              >{{nav.Category_Name}}
              </li>
            </ul>
          </div>
          <div class="block-content">
            <div class="live-list">
              <block v-for="(item,idx) in liveGoodsList" :key="idx">
                <div class="live-item" v-if="idx<3"  @click="$toGoodsDetail(item.Products_ID)">

                  <div class="left">
                    <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
                  </div>
                  <div class="right">
                    <div class="title">
                      <span class="live-status"><layout-icon display="inline" type="iconicon-count" color="#fff" size="14"></layout-icon>直播中</span>
                      <span class="text">{{item.Products_Name}}</span>
                    </div>
                    <!--                    <div class="sale-count">已抢{{item.sale_count}}份</div>-->
                    <div class="tags" v-if="item.tags">
                      <span class="tag" v-for="(tag,idx) in item.tags" :key="idx">{{tag}}</span>
                    </div>
                    <div class="action">
                      <image class="bgimg" :src="'/static/client/home/capsule.png'|domain"></image>
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
              </block>
            </div>
          </div>
        </div>
        <layout-copyright></layout-copyright>
        <div class="h20"></div>
      </scroll-view>
      <scroll-view class="tab-page-wrap" scroll-y v-show="headTabIndex===1" >

        <div class="section scroll-box first-cate-list  bg-white" :style="{top:diyHeadHeight+'px'}" @touchmove.stop.prevent="$noop">
          <li class="scroll-item fz-15 c3" @click="changeQuickCateNav(idx)" v-for="(cate,idx) in firstCateList" :key="idx">
            {{cate.Category_Name}}
            <span class="underline" v-show="quickFirstCateIdx === idx"></span>
          </li>
        </div>

        <swiper
          :current="quickFirstCateIdx"
          @change="quickCateIndexChange"
          :style="{top:diyHeadHeight+firstCateHeight+'px',height:(cateViewHeight+'px')}"
          class="quick-cate-swiper"
        >
          <swiper-item class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList" :key="idx1">

            <scroll-view class="bg-white scroll-view-wrap" scroll-y >

              <div class="grid-box">
                <div
                  style="width: 150rpx;box-sizing: border-box;"
                  class="grid-item p-t-10 p-b-10"
                  @click="go(item)"
                  v-for="(item,idx2) in first.child"
                  :key="idx2"
                >
                  <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix" :src="item.Category_Img"></image>
                  <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}</div>
                </div>
              </div>
              <div class="hr h10"></div>

              <div class="bg-white">
                <layout-ad :lazy-load="true" :ready="quickFirstCateIdx===idx1" paddingStr="20px 0 20px 0" code="hotcity" :cate-id="first.Category_ID" position="city" ></layout-ad>
              </div>

              <div class="page-section-title">
                <span class="before" :style="{backgroundColor: primaryColor}"></span>
                <span class="text">钜惠推荐</span>
                <span class="after"  :style="{backgroundColor: primaryColor}"></span>
              </div>

              <div class="fun-goods-list bg-white b-radius-5 m-t-10" style="width: 710rpx;margin-left: 20rpx;" >
                <div class="fun-goods-col" style="padding: 0 15rpx 0 30rpx">
                  <block v-for="(goods,idx) in quickGoodsList" :key="idx">
                    <goods-item v-if="idx%2===0"  :marketPrice="true" coverRadius="8rpx" :vo="goods" mode="top-bottom"></goods-item>
                  </block>
                </div>
                <div class="fun-goods-col" style="padding: 0 30rpx 0 15rpx">
                  <block v-for="(goods,idx) in quickGoodsList" :key="idx">
                    <goods-item v-if="idx%2===1"  :marketPrice="true" coverRadius="8rpx" :vo="goods" mode="top-bottom"></goods-item>
                  </block>
                </div>
              </div>

              <div class="h20"></div>

            </scroll-view>
          </swiper-item>
        </swiper>

      </scroll-view>

      <scroll-view class="tab-page-wrap" scroll-y v-show="headTabIndex===2">

        <div class="section scroll-box first-cate-list  bg-white" :style="{top:diyHeadHeight+'px'}" @touchmove.stop.prevent="$noop">
          <li class="scroll-item fz-15 c3" @click="changeStoreCateNav(idx)" v-for="(cate,idx) in firstCateList" :key="idx">
            {{cate.Category_Name}}
            <span class="underline" v-show="storeFirstCateIdx === idx"></span>
          </li>
        </div>

        <swiper
          :current="storeFirstCateIdx"
          @change="storeCateIndexChange"
          :style="{top:diyHeadHeight+firstCateHeight+'px',height:(cateViewHeight+'px')}"
          class="quick-cate-swiper"
        >
          <swiper-item class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList" :key="idx1">

            <scroll-view class="bg-white scroll-view-wrap" scroll-y >

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
              <div class="hr h10"></div>
              <div class="bg-white">
                <layout-ad :lazy-load="true" :ready="storeFirstCateIdx===idx1" paddingStr="20px 0 20px 0" code="hotcity" :cate-id="first.Category_ID" position="hot" ></layout-ad>
              </div>

              <div style="background: #f8f8f8" class="p-b-15 p-t-15">
                <div class="page-section-title">
                  <span class="before" :style="{backgroundColor: primaryColor}"></span>
                  <span class="text">人气商家</span>
                  <span class="after" :style="{backgroundColor: primaryColor}"></span>
                </div>

                <div class="store-top-item"  v-for="(merchant,idx) in merchantList" :key="idx" @click="$linkTo('/pages/store/index?bid='+merchant.id)">
                  <div class="store-info flex flex-vertical-c flex-justify-between">
                    <div class="p-l-10 p-r-10 flex flex-vertical-c">
                      <image class="logo" :src="merchant.biz_logo"></image>
                      <div class="p-l-10 c3">
                        <div class="name fz-15 m-b-5"> {{merchant.biz_shop_name}}</div>
                        <div class="activity" v-if="merchant.active && merchant.active.length>0">满{{merchant.active[0].reach}}减{{merchant.active[0].award}}</div>
                      </div>
                    </div>
                    <div class="flex flex-vertical-c p-r-6">
                      <span class="p-r-4 fz-14 c6">进入商家</span>
                      <layout-icon color="#999" type="iconicon-arrow-right"></layout-icon>
                    </div>
                  </div>
                  <div class="store-goods-list">
                    <block v-for="(goods,idx) in merchant.prod" :key="idx">
                      <div class="store-goods-item" v-if="idx<3"  @click.stop="$toGoodsDetail(goods.Products_ID)">

                        <image :style="{backgroundImage:'url('+goods.ImgPath+')'}" class="cover" />
                        <div class="title fz-12 c3 p-t-7 p-b-7">{{goods.Products_Name}}</div>
                        <div class="fz-10 c9 flex flex-vertical-b">
                          <span class="price-selling">￥</span><span class="fz-12 price-selling">{{goods.Products_PriceX}}</span>
                          <span class="text-through m-l-4">￥</span><span class="text-through">{{goods.Products_PriceY}}</span>
                        </div>

                      </div>
                    </block>
                  </div>
                </div>

              </div>

            </scroll-view>
          </swiper-item>
        </swiper>

      </scroll-view>
    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductCategory, getProductList, getFlashsaleList
} from '@/api/product'
import {
  getSkinConfig
} from '@/api/common'
import {
  getBizInfo
} from '@/api/store'
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
import GoodsItem from '@/componets/good-item/good-item'
import { hideLoading, showLoading } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  components: {
    GoodsItem,
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
    cateViewHeight () {
      try {
        return this.systemInfo.windowHeight - this.diyHeadHeight - this.firstCateHeight
      } catch (e) {
        return 'auto'
      }
    },
    ...mapGetters({
      primaryColor: 'theme/pimaryColor'
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
      firstCateHeight: 44,
      tagIndex: 0,
      firstCateList: [], // 一级菜单
      quickFirstCateIdx: 0, // 同城闪送
      quickGoodsList: [], // 钜惠推荐商品
      storeFirstCateIdx: 0, // 好店
      merchantList: [], // 人气商家
      liveNavIndex: 0,
      headTabIndex: 0,
      liveNav: [],
      liveGoodsList: [],
      killList: [],
      goodsList: [],
      templateList: [],
      templateData: []

    }
  },
  watch: {
    headTabIndex: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          if (idx === 1) {
            if (this.quickGoodsList.length < 1) this.loadQuickGoodsList(0)
          }
          if (idx === 2) {

          }
        }
      }
    },
    quickFirstCateIdx: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          if (idx === 1) {
            this.loadQuickGoodsList(idx)
          }
          if (idx === 2) {

          }
        }
      }
    },
    liveNavIndex: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) this.loadLiveGoodsList(idx)
      }
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
      showLoading('初始化数据')
      try {
        const handleRT = await this.get_tmpl_data()
        if (handleRT !== true) throw handleRT // hanldeRT不是true就是一个Error实例，直接抛出

        this.killList = await getFlashsaleList({}, { onlyData: true }).catch(err => {
          throw Error(err.msg || '初始化秒杀商品失败')
        })

        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => {
          throw Error('获取商品分类失败')
        })

        this.liveNav = this.firstCateList.concat([]) // 也是一级分类

        this.loadLiveGoodsList(0) // 加载第一个分类的商品

        // this.$toast('加载成功','none')
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
    async loadMerchantList (idx) {
      // const cateId = this.liveNav[idx].Category_ID

      // 商家无法利用一级分类获取到
      this.merchantList = await getBizInfo({
        get_prod: 3,
        with_prod: 1,
        get_active: 1
      }, { onlyData: true }).catch((e) => {
        throw Error('获取人气商家列表失败')
      })
    },
    /**
     * 根据条件获取商品，并且赋值给指定的对象
     * @param postData
     * @param obj
     * @returns {Promise<void>}
     */
    async loadGoodsList (postData, obj) {
      if (!obj)obj = []
      obj = await getProductList({ ...postData }, { onlyData: true }).catch(e => { throw Error(e.msg || '获取商品列表失败') })
      // console.log(obj)
      return obj.concat([])
    },
    async loadQuickGoodsList (idx) {
      const cateId = this.firstCateList[idx].Category_ID
      if (!cateId) return
      // 需要刷新页面
      this.quickGoodsList = await this.loadGoodsList({ Cate_ID: cateId })
    },
    async loadLiveGoodsList (idx) {
      const cateId = this.liveNav[idx].Category_ID

      this.liveGoodsList = await getProductList({ Cate_ID: cateId, pageSize: 3 }, { onlyData: true }).catch(e => { throw Error(e.msg || '刷新直播商品列表失败') })
    },
    async get_tmpl_data () {
      try {
        const { Home_Json: resultData } = await getSkinConfig({}, { onlyData: true }).catch(e => { throw Error(e.msg || '获取首页模板失败') })

        const mixinData = typeof resultData === 'string' ? JSON.parse(resultData) : resultData

        const { plugin: templateData, system } = mixinData

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
        return true
      } catch (e) {
        return e
      }
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

  .first-cate-list{
    position: fixed;
    width: 750rpx;
    height: 44px;
    padding: 2px 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .scroll-item{
      position: relative;
      line-height: 40px;
      padding: 0 8px;
      .underline{
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 24rpx;
        height: 4rpx;
        background-color: $fun-primary-color;
      }
    }
  }

  .quick-cate-swiper {
    position: fixed;
    width: 750rpx;
    overflow: hidden;
    .quick-cate-swiper-item{
      .scroll-view-wrap{
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
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
            @include cover-img(contain);
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
    margin:0 20rpx 30rpx;
    background: white;
    border-radius: 20rpx;
    padding: 20rpx 0;

    .store-info {
      .logo {
        width: 86rpx;
        height: 86rpx;
        border-radius: 50%;
        background: #f2f2f2;
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
