<template>
  <div>
<!--    <layout-ad code="index_top" paddingStr="20px 0 20px 0"></layout-ad>-->
    <layout-loading v-if="loadingByTmpl"></layout-loading>
    <view class="home-diy-wrap" v-else>
      <section
        :class="[item]"
        :data-name="item"
        :key="index"
        class="section"
        v-for="(item, index) in templateList[tagIndex]">
        <diy-base
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('base') !== -1"></diy-base>
        <diy-swiper
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('swiper') !== -1"></diy-swiper>
        <diy-nav
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('nav') !== -1"></diy-nav>
        <diy-video
          :confData="templateData[tagIndex][index]"
          :index="index"
          ref="video"
          v-if="item.indexOf('video') !== -1"></diy-video>
        <diy-hr
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('hr') !== -1"></diy-hr>
        <diy-space
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('space') !== -1"></diy-space>
        <diy-title
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('title') !== -1"></diy-title>
        <diy-text
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('text') !== -1"></diy-text>
        <diy-search
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('search') !== -1"></diy-search>
        <diy-notice
          :confData="templateData[tagIndex][index]"
          :index="index"
          ref="notice"
          v-if="item.indexOf('notice') !== -1"></diy-notice>
        <diy-coupon
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('coupon') !== -1"></diy-coupon>
        <diy-goods
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('goods') !== -1"></diy-goods>
        <diy-cube
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('cube') !== -1"></diy-cube>
        <diy-tab
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('tab') !== -1"></diy-tab>
        <diy-group
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('group') !== -1"></diy-group>
        <diy-flash
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('flash') !== -1"></diy-flash>
        <diy-kill
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('kill') !== -1"></diy-kill>
      </section>
    </view>
    <div class="block kill-box">
      <div class="block-title flex-vertical-c">
        <div class="block-title-text">今日秒杀</div>
        <div @click="$linkTo('/pagesA/active/SeckillByBiz')" class="block-title-more flex flex-ver-c c9 fz-12">
          <span>查看全部</span>
          <layout-icon color="#999" display="inline" size="14" type="iconicon-arrow-right"></layout-icon>
        </div>
      </div>
      <div class="block-content">
        <layout-loading v-if="loadingByKillList"></layout-loading>
        <div class="goods-list" v-else>
          <div :key="idx" @click="$toGoodsDetail(item)" class="goods-item" v-for="(item,idx) in killList">
            <block v-if="idx<6">
              <div :style="{backgroundImage:'url('+item.ImgPath+')'}" class="cover">
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
          <li :class="{active:liveNavIndex === idx}"
              :key="idx"
              @click="changeLiveNav(idx)"
              class="nav-item"
              v-for="(nav,idx) in liveNav"
          >{{nav.Category_Name}}
          </li>
        </ul>
      </div>
      <div class="block-content">
        <div class="live-list">
          <block :key="idx" v-for="(item,idx) in liveNav[liveNavIndex].goodsList">
            <div @click="$toGoodsDetail(item)" class="live-item">
              <div class="left">
                <div :style="{backgroundImage:'url('+item.ImgPath+')'}" class="cover"></div>
              </div>
              <div class="right">
                <div class="title">
                  <wzw-live-tag :room_id="item.room_id" :product-info="item"></wzw-live-tag>
                  <span class="text">{{item.Products_Name}}</span>
                </div>
                <div class="tags" v-if="item.tags">
                  <span :key="idx" class="tag" v-for="(tag,idx) in item.tags">{{tag}}</span>
                </div>
                <div class="action">
                  <image :src="'/static/client/home/capsule.png'|domain" class="bgimg"></image>
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
          <layout-loading v-if="loadingByLiveList"></layout-loading>
        </div>
      </div>
    </div>
    <layout-copyright></layout-copyright>
    <div class="h20"></div>
    <div class="safearea-box"></div>
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
import DiyNav from '@/componets/diy-nav/diy-nav'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import { objTranslate, toGoodsDetail } from '@/common/helper'
import { hideLoading, showLoading } from '@/common/fun'
import { getFlashsaleList, getProductCategory, getProductList } from '@/api/product'
import { Exception } from '@/common/Exception'
import { getSkinConfig } from '@/api/common'
import { componetMixin } from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import WzwLiveTag from '@/componets/wzw-live-tag/wzw-live-tag'
import LayoutAd from '@/componets/layout-ad/layout-ad'
import LayoutLoading from '@/componets/layout-loading/layout-loading'

export default {
  name: 'scroll-page-hot',
  mixins: [componetMixin],
  components: {
    LayoutLoading,
    LayoutAd,
    WzwLiveTag,
    LayoutIcon,
    DiyNav,
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
    LayoutCopyright
  },
  data () {
    return {
      loadingByTmpl: false, // 标记是否请求完结
      templateList: [],
      templateData: [],
      tagIndex: 0,

      loadingByLiveList: false, // 标记是否请求完结
      liveNavIndex: 0,
      liveNav: [],
      loadingByKillList: false, // 标记是否请求完结
      killList: []
      // livePaginate: {
      //   pageSize: 10,
      //   page: 1
      // }
    }
  },
  watch: {
    liveNavIndex: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          // this.livePaginate.page = 1
          this.loadLiveGoodsList(idx)
        }
      }
    }
  },
  methods: {

    bindReachBottom () {
      console.log('emit bindReachBottom event',objTranslate(this.liveNav),this.liveNavIndex)
      this.loadLiveGoodsList(this.liveNavIndex)
    },
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
      if (this.liveNav[idx].goodsList.length >= this.liveNav[idx].totalCount) {
        // toast('已经到底了', 'none')
        return
      }
      if (this.liveNav[idx].isAjax) return// 防止请求和到底的一起生效
      
      this.liveNav[idx].isAjax = true
      this.loadingByLiveList = true
      
      const cateId = this.liveNav[idx].Category_ID

      const { data: liveGoodsList, totalCount } = await getProductList({
        Cate_ID: cateId,
        page: this.liveNav[idx].page,
        pageSize: this.liveNav[idx].pageSize
      }).catch(e => {
        throw Error(e.msg || '刷新直播商品列表失败')
      })

      this.$set(this.liveNav[idx], 'goodsList', this.liveNav[idx].goodsList.concat(liveGoodsList))
      this.$set(this.liveNav[idx], 'totalCount', totalCount)
      this.$set(this.liveNav[idx], 'page', this.liveNav[idx].page+1)
      this.$set(this.liveNav[idx], 'isAjax', false)
     
      this.loadingByLiveList = false

    },
    async _init_func () {
      this.loadingByKillList = true
      // showLoading('初始化数据')
      try {
        this.loadingByTmpl = true
        const handleRT = await this.get_tmpl_data()
        this.loadingByTmpl = false
        if (handleRT !== true) throw handleRT // hanldeRT不是true就是一个Error实例，直接抛出

        this.killList = await getFlashsaleList({}, { onlyData: true }).catch(err => {
          throw Error(err.msg || '初始化秒杀商品失败')
        })

        if (this.killList.length > 0) {
          this.killList.map(item => {
            item.discount = (item.price / item.Products_PriceX * 10).toFixed(1)
          })
        }
        this.loadingByKillList = false

        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => {
          throw Error('获取商品分类失败')
        })

        this.liveNav = this.firstCateList.map(row => {
          row.goodsList = []
          row.totalCount = 999
          row.pageSize = 10
          row.page = 1
          row.isAjax = false
          return objTranslate(row)
        }) // 也是一级分类

        this.loadLiveGoodsList(0) // 加载第一个分类的商品
      } catch (e) {
        Exception.handle(e)
      } finally {
        // hideLoading()
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
              padding: 0 4px;
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
      padding: 15px 0 15px 0;

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
