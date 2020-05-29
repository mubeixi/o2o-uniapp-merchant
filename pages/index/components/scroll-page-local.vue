<template>
<div>
  <div class="section scroll-box first-cate-list  bg-white" :style="{top:diyHeadHeight+'px'}" @touchmove.stop.prevent="$noop">
    <li class="scroll-item fz-15 c3" @click="changeQuickCateNav(idx)" v-for="(cate,idx) in firstCateList" :key="idx">
      {{cate.Category_Name}}
      <span class="underline" v-show="quickFirstCateIdx === idx"></span>
    </li>
  </div>

  <swiper
    :current="quickFirstCateIdx"
    @change="quickCateIndexChange"
    duration="100"
    :style="{top:diyHeadHeight+firstCateHeight+'px',height:(cateViewHeight+'px')}"
    class="quick-cate-swiper"
  >
    <swiper-item class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList" :key="idx1">
      <scroll-view class="bg-white scroll-view-wrap" scroll-y>

        <div class="grid-box">
          <div
            style="width: 150rpx;box-sizing: border-box;"
            class="grid-item p-t-10 p-b-10"
            @click="bindCateClick(item)"
            v-for="(item,idx2) in first.child"
            :key="idx2"
          >
            <image style="vertical-align: top" class="icon-img b-radius-aircle w44 h44" mode="heightFix" :src="item.Category_Img"></image>
            <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}
            </div>
          </div>
        </div>
        <div class="hr h10"></div>

        <div class="bg-white">
          <layout-ad :lazy-load="true" :ready="quickFirstCateIdx===idx1" paddingStr="20px 0 20px 0" code="city_under_nav" :cate-id="first.Category_ID" position="city"></layout-ad>
        </div>

        <div class="page-section-title" v-show="quickGoodsList.length>0">
          <span class="before" :style="{backgroundColor: primaryColor}"></span>
          <span class="text">钜惠推荐</span>
          <span class="after" :style="{backgroundColor: primaryColor}"></span>
        </div>

        <div class="fun-goods-list bg-white b-radius-5 m-t-10" style="width: 710rpx;margin-left: 20rpx;" v-show="quickGoodsList.length>0">
          <div class="fun-goods-col" style="padding: 0 15rpx 0 30rpx">
            <block v-for="(goods,idx) in quickGoodsList" :key="idx">
              <goods-item v-if="idx%2===0" :marketPrice="true" coverRadius="8rpx" :vo="goods" mode="top-bottom"></goods-item>
            </block>
          </div>
          <div class="fun-goods-col" style="padding: 0 30rpx 0 15rpx">
            <block v-for="(goods,idx) in quickGoodsList" :key="idx">
              <goods-item v-if="idx%2===1" :marketPrice="true" coverRadius="8rpx" :vo="goods" mode="top-bottom"></goods-item>

            </block>
          </div>
        </div>

        <div class="h20"></div>

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

export default {
  name: 'scroll-page-local',
  components: { GoodsItem },
  mixins: [componetMixin],
  data () {
    return {
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
        return this.systemInfo.windowHeight - this.diyHeadHeight - this.firstCateHeight
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
      showLoading('初始化数据')
      try {
        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => { throw Error('获取商品分类失败') })
        this.loadQuickGoodsList(0)
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
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
      const cateId = this.firstCateList[idx].Category_ID
      if (!cateId) return

      var postData = { Cate_ID: cateId }
      this.userAddressInfo = this.$store.getters['user/getUserAddressInfo']()
      if (this.userAddressInfo && this.userAddressInfo.hasOwnProperty('latitude') && this.userAddressInfo.hasOwnProperty('longitude')) {
        Object.assign(postData, { lat: this.userAddressInfo.latitude, lng: this.userAddressInfo.longitude })
      }
      // 需要刷新页面
      const list = await this.loadGoodsList(postData)
      this.quickGoodsList = list
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
