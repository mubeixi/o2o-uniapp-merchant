<template>
  <div>
    <div :style="{top:menuButtonInfo.top+50+'px'}" @touchmove.stop.prevent="$noop"
         class="section scroll-box first-cate-list  bg-white">
      <li :key="idx" @click="changeQuickCateNav(idx)" class="scroll-item fz-15 c3" v-for="(cate,idx) in firstCateList">
        {{cate.Category_Name}}
        <span class="underline" v-show="quickFirstCateIdx === idx"></span>
      </li>
    </div>

    <swiper
      :current="quickFirstCateIdx"
      :style="{top:menuButtonInfo.top+50+firstCateHeight+'px',height:(cateViewHeight+'px')}"
      @change="quickCateIndexChange"
      class="quick-cate-swiper"
      duration="300"
    >
      <swiper-item :key="idx1" class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList">
        <scroll-view class="bg-white scroll-view-wrap" scroll-y>

          <div class="grid-box">
            <div
              :key="idx2"
              @click="bindCateClick(item)"
              class="grid-item p-t-10 p-b-10"
              style="width: 150rpx;box-sizing: border-box;"
              v-for="(item,idx2) in first.child"
            >
              <image :src="item.Category_Img" class="icon-img b-radius-aircle w44 h44"
                     style="vertical-align: top"></image>
              <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}
              </div>
            </div>
          </div>
          <div class="hr h10"></div>

          <div class="bg-white">

            <layout-ad :cate-id="first.Category_ID" :lazy-load="true" :ready="quickFirstCateIdx===idx1"
                       code="city_under_nav" paddingStr="20px 0 20px 0" position="city"></layout-ad>
          </div>

          <div v-if="areaLoading">
            <layout-loading></layout-loading>
          </div>

          <div class="page-section-title" v-if="quickGoodsList.length>0">
            <span :style="{backgroundColor: primaryColor}" class="before"></span>
            <span class="text">钜惠推荐</span>
            <span :style="{backgroundColor: primaryColor}" class="after"></span>
          </div>

          <div class="fun-goods-list bg-white b-radius-5 m-t-10" style="width: 710rpx;margin-left: 20rpx;"
               v-if="quickGoodsList.length>0">
            <div class="fun-goods-col" style="padding: 0 15rpx 48px 30rpx">
              <block :key="idx" v-for="(goods,idx) in quickGoodsList">
                <goods-item :marketPrice="true" :vo="goods" coverRadius="8rpx" mode="top-bottom"
                            v-if="idx%2===0"></goods-item>
              </block>
            </div>
            <div class="fun-goods-col" style="padding: 0 30rpx 0 15rpx">
              <block :key="idx" v-for="(goods,idx) in quickGoodsList">
                <goods-item :marketPrice="true" :vo="goods" coverRadius="8rpx" mode="top-bottom"
                            v-if="idx%2===1"></goods-item>

              </block>
            </div>
          </div>

          <div class="h20"></div>

          <div class="safearea-box"></div>

        </scroll-view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import { hideLoading, showLoading } from '@/common/fun'
import { getProductCategory, getProductList } from '@/api/product'
import { Exception } from '@/common/Exception'
import { componetMixin } from '@/mixins/BaseMixin'
import GoodsItem from '@/componets/good-item/good-item'
import { mapGetters } from 'vuex'
import LayoutLoading from '@/componets/layout-loading/layout-loading'
import LayoutAd from '@/componets/layout-ad/layout-ad'

export default {
  name: 'scroll-page-local',
  components: {
    LayoutAd,
    LayoutLoading,
    GoodsItem
  },
  mixins: [componetMixin],
  data () {
    return {
      areaLoading:false,
      firstCateHeight: 44,
      firstCateList: [],
      quickFirstCateIdx: 0, // 同城闪送
      quickGoodsList: [] // 钜惠推荐商品
    }
  },
  computed: {
    ...mapGetters({
      primaryColor: 'theme/pimaryColor'
    }),
    cateViewHeight () {
      try {
        return this.systemInfo.windowHeight - this.firstCateHeight - (this.menuButtonInfo.top+50)
      } catch (e) {
        return 'auto'
      }
    }
  },
  watch: {
    quickFirstCateIdx: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          this.loadQuickGoodsList(idx)
        }
      }
    }
  },
  methods: {
    refreshByLocal () {
      this.loadQuickGoodsList(this.quickFirstCateIdx)
    },
    bindCateClick (cate) {
      console.log(cate)
      this.$linkTo(`/pages/search/result?Cate_ID=${cate.Category_ID}`)
    },
    quickCateIndexChange (event) {
      const { current } = event.detail
      this.quickFirstCateIdx = current
    },
    changeQuickCateNav (idx) {
      this.quickFirstCateIdx = idx
    },
    async _init_func () {
      // showLoading('初始化数据')
      try {
        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => {
          throw Error('获取商品分类失败')
        })
        if (!this.firstCateList) this.firstCateList = []
        this.loadQuickGoodsList(0)
      } catch (e) {
        Exception.handle(e)
      } finally {
        // hideLoading()
      }
    },
    /**
     * 根据条件获取商品，并且赋值给指定的对象
     */
    async loadGoodsList (postData, obj) {
      if (!obj) obj = []
      obj = await getProductList({ ...postData }, { onlyData: true }).catch(e => {
        throw Error(e.msg || '获取商品列表失败')
      })
      return obj.concat([])
    },
    async loadQuickGoodsList (idx) {
      try {
        this.quickGoodsList = []
        // showLoading()
        const cateId = this.firstCateList[idx].Category_ID
        if (!cateId) return

        this.areaLoading = true
        var postData = { Cate_ID: cateId }
        this.userAddressInfo = this.$store.getters['user/getUserAddressInfo']()
        if (this.userAddressInfo && this.userAddressInfo.hasOwnProperty('latitude') && this.userAddressInfo.hasOwnProperty('longitude')) {
          Object.assign(postData, {
            lat: this.userAddressInfo.latitude,
            lng: this.userAddressInfo.longitude
          })
        }
        // 需要刷新页面
        const list = await this.loadGoodsList(postData)
        this.quickGoodsList = list
      } catch (e) {

      } finally {
        this.areaLoading = false
        // hideLoading()
      }
    }
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .first-cate-list {
    position: fixed;
    width: 750rpx;
    height: 44px;
    padding: 2px 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;

    .scroll-item {
      position: relative;
      line-height: 40px;
      padding: 0 8px;

      .underline {
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

    .quick-cate-swiper-item {
      .scroll-view-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
