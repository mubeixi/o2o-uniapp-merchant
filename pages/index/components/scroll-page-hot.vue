<template>
  <div>
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
    <div class="block kill-box">
      <div class="block-title flex-ver-c">
        <div class="block-title-text">今日秒杀</div>
        <div class="block-title-more flex flex-ver-c c9 fz-12">
          <!--<span>查看全部</span>
          <layout-icon type="iconicon-arrow-right" size="14" color="#999"></layout-icon>-->
        </div>
      </div>
      <div class="block-content">
        <div class="goods-list">
          <div class="goods-item" v-for="(item,idx) in killList" :key="idx" @click="$toGoodsDetail(item)">
            <block v-if="idx<6">
              <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}">
                <!--<div class="tip" style="background: #185e44;">同城配送</div>-->
              </div>
              <h5 class="title">{{item.Products_Name}}</h5>
              <div class="price-box">
                <div>
                  <span class="sign">￥</span><span class="num">{{item.price}}</span>
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
    <div class="block live-box">
      <div class="block-title">
        <div class="block-title-text">钜惠推荐</div>
        <div class="block-title-more flex flex-vertical-center c9 fz-12">
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
            <div class="live-item" v-if="idx<3" @click="$toGoodsDetail(item)">
              <div class="left">
                <div class="cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
              </div>
              <div class="right">
                <div class="title">
                      <span class="live-status"><layout-icon display="inline" type="iconicon-count" color="#fff" size="14"></layout-icon>直播中</span>
                  <span class="text">{{item.Products_Name}}</span>
                </div>
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
              </div>
            </div>
          </block>
        </div>
      </div>
    </div>
    <layout-copyright></layout-copyright>
    <div class="h20"></div>
  </div>
</template>

<script>
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
import DiyNav from '@/componets/diy-nav/diy-nav'

import LayoutAd from '@/componets/layout-ad/layout-ad'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import { toGoodsDetail } from '@/common/helper'
import { hideLoading, showLoading } from '@/common/fun'
import { getFlashsaleList, getProductCategory, getProductList } from '@/api/product'
import { Exception } from '@/common/Exception'
import { getSkinConfig } from '@/api/common'
import { componetMixin } from '@/mixins/BaseMixin'

export default {
  name: 'scroll-page-hot',
  mixins: [componetMixin],
  components: {
    DiyNav,
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
    LayoutCopyright
  },
  data () {
    return {
      templateList: [],
      templateData: [],
      tagIndex: 0,
      liveNavIndex: 0,
      liveNav: [],
      killList: [],
      liveGoodsList: []
    }
  },
  watch: {
    liveNavIndex: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) this.loadLiveGoodsList(idx)
      }
    }
  },
  methods: {
    changeLiveNav (idx) {
      this.liveNavIndex = idx
    },
    async get_tmpl_data () {
      try {
        const { Home_Json: resultData } = await getSkinConfig({}, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取首页模板失败')
        })

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
    async loadLiveGoodsList (idx) {
      const cateId = this.liveNav[idx].Category_ID

      this.liveGoodsList = await getProductList({
        Cate_ID: cateId,
        pageSize: 3
      }, { onlyData: true }).catch(e => {
        throw Error(e.msg || '刷新直播商品列表失败')
      })
    },
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
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
    $toGoodsDetail: toGoodsDetail
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>

.live-box {
  padding: 0 25rpx;

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

    .live-item {
      background: white;
      width: 700rpx;
      margin: 0 0 30rpx;
      font-size: 14px;
      display: flex;
      border-radius: 20rpx;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }

      .left {
        width: 300rpx;

        .cover {
          width: 300rpx;
          height: 300rpx;
          @include cover-img(cover);
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

          .bgimg {
            position: absolute;
            width: 370rpx;
            height: 68rpx;
            left: 0;
            top: 0;
            z-index: 1;
          }

          .price-box {
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

.kill-box {
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
</style>
