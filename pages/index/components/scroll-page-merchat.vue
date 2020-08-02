<template>
  <div>
    <div :style="{top:menuButtonInfo.top+50+'px'}"
         class="section scroll-box first-cate-list  bg-white">
      <li :key="idx" @click="changeStoreCateNav(idx)" class="scroll-item fz-15 c3"
          v-for="(cate,idx) in firstCateList">
        {{cate.Category_Name}}
        <span class="underline" v-show="storeFirstCateIdx === idx"></span>
      </li>
    </div>
    <swiper
      :current="storeFirstCateIdx"
      :style="{top:menuButtonInfo.top+50+firstCateHeight+'px',height:(cateViewHeight+'px')}"
      @change="storeCateIndexChange"
      class="quick-cate-swiper"
      duration="300"
    >
      <swiper-item :key="idx1" class="quick-cate-swiper-item" v-for="(first,idx1) in firstCateList">

        <scroll-view class="bg-white scroll-view-wrap" scroll-y>

          <div class="grid-box">
            <div
              :key="idx"
              @click="bindCateClick(item)"
              class="grid-item p-t-10 p-b-10"
              style="width: 150rpx;box-sizing: border-box;"
              v-for="(item,idx) in first.child"
            >
              <image :src="item.Category_Img" class="icon-img b-radius-aircle w44 h44"
                     style="vertical-align: top"></image>
              <div class="title m-t-9 h14 fz-14 c3 text-nowrap" style="line-height: 14px">{{item.Category_Name}}
              </div>
            </div>
          </div>
          <div class="hr h10"></div>
          <div class="bg-white">
            <layout-ad :cate-id="first.Category_ID" :lazy-load="true" :ready="storeFirstCateIdx===idx1"
                       code="good_shop_under_nav" paddingStr="20px 0 20px 0" position="hot"></layout-ad>
          </div>

          <div v-if="areaLoading">
            <layout-loading></layout-loading>
          </div>

          <div class="p-b-15 p-t-15" style="background: #f8f8f8" v-if="merchantList.length>0">
            <div class="page-section-title">
              <span :style="{backgroundColor: primaryColor}" class="before"></span>
              <span class="text">人气商家</span>
              <span :style="{backgroundColor: primaryColor}" class="after"></span>
            </div>

            <div :key="idx" @click="$linkTo('/pages/store/index?biz_id='+merchant.id)" class="store-top-item"
                 v-for="(merchant,idx) in merchantList">
              <div class="store-info flex flex-vertical-c flex-justify-between">
                <div class="p-l-10 p-r-10 flex flex-vertical-c">
                  <image :src="merchant.biz_logo" class="logo"></image>
                  <div class="p-l-10 c3">
                    <div class="name fz-15 m-b-5"> {{merchant.biz_shop_name}}</div>
                    <div class="activity" v-if="merchant.active && merchant.active.length>0">
                      满{{merchant.active[0].reach}}减{{merchant.active[0].award}}
                    </div>
                  </div>
                </div>
                <div class="flex flex-vertical-c p-r-6">
                  <span class="p-r-4 fz-14 c6">进入商家</span>
                  <layout-icon color="#999" type="iconicon-arrow-right"></layout-icon>
                </div>
              </div>
              <div class="store-goods-list">
                <block :key="idx2" v-for="(goods,idx2) in merchant.prod">
                  <div @click.stop="$toGoodsDetail(goods)" class="store-goods-item" v-if="idx2<3">

                    <image :style="{backgroundImage:'url('+goods.ImgPath+')'}" class="cover" />
                    <div class="title fz-12 c3 p-t-7 p-b-7">{{goods.Products_Name}}</div>
                    <div class="fz-10 c9 flex flex-vertical-b">
                      <span class="price-selling">￥</span><span
                      class="fz-12 price-selling">{{goods.Products_PriceX}}</span>
                      <span class="text-through m-l-4">￥</span><span
                      class="text-through">{{goods.Products_PriceY}}</span>
                    </div>

                  </div>
                </block>
              </div>
            </div>

          </div>

          <div class="h20" v-if="merchantList.length>0" style="background: #f8f8f8;"></div>
          <div class="safearea-box" v-if="merchantList.length>0" style="background: #f8f8f8;"></div>

        </scroll-view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import { hideLoading, showLoading } from '@/common/fun'
import { getProductCategory } from '@/api/product'
import { Exception } from '@/common/Exception'
import { componetMixin } from '@/mixins/BaseMixin'
import { getBizInfo } from '@/api/store'
import { mapGetters } from 'vuex'
import LayoutLoading from '@/components/layout-loading/layout-loading'
import LayoutAd from '@/components/layout-ad/layout-ad'

export default {
  name: 'scroll-page-merchat',
  components: { LayoutAd, LayoutLoading },
  mixins: [componetMixin],
  data () {
    return {
      areaLoading: false,
      firstCateHeight: 44,
      storeFirstCateIdx: 0, // 好店
      firstCateList: [],
      merchantList: [] // 人气商家
    }
  },
  computed: {
    cateViewHeight () {
      try {
        return this.systemInfo.windowHeight - this.firstCateHeight - (this.menuButtonInfo.top + 50)
      } catch (e) {
        return 'auto'
      }
    },
    ...mapGetters({
      primaryColor: 'theme/pimaryColor'
    })
  },
  watch: {
    storeFirstCateIdx: {
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          this.loadMerchantList(idx)
        }
      }
    }
  },
  methods: {
    refreshByLocal () {
      this.loadMerchantList(this.storeFirstCateIdx)
    },
    storeCateIndexChange (event) {
      const { current } = event.detail
      this.storeFirstCateIdx = current
    },
    changeStoreCateNav (idx) {
      this.storeFirstCateIdx = idx
    },
    bindCateClick (cate) {
      console.log(cate)
      this.$linkTo(`/pages/search/result?Cate_ID=${cate.Category_ID}`)
    },
    async _init_func () {
      // showLoading('初始化数据')
      try {
        this.firstCateList = await getProductCategory({}, { onlyData: true }).catch(() => {
          throw Error('获取商品分类失败')
        })
        if (!this.firstCateList) this.firstCateList = []
        this.firstCateList.unshift({ Category_Name: '所有', Category_ID: '-1' })
        this.loadMerchantList(0)
      } catch (e) {
        Exception.handle(e)
      } finally {
        // hideLoading()
      }
    },
    async loadMerchantList (idx) {
      if(this.firstCateList.length<1)return;
      try {
        this.merchantList = []
        // showLoading()
        const cateId = this.firstCateList[idx].Category_ID
        if (!cateId) return
        var postData = {
          get_prod: 3,
          with_prod: 1,
          get_active: 1,
          pageSize: 999
        }
        if (cateId != -1) {
          postData.cate_id = cateId
        }
        this.areaLoading = true
        this.userAddressInfo = this.$store.getters['user/getUserAddressInfo']()
        if (this.userAddressInfo && this.userAddressInfo.hasOwnProperty('latitude') && this.userAddressInfo.hasOwnProperty('longitude')) {
          Object.assign(postData, {
            lat: this.userAddressInfo.latitude,
            lng: this.userAddressInfo.longitude
          })
        }
        // 商家无法利用一级分类获取到
        this.merchantList = await getBizInfo(postData, { onlyData: true }).catch((e) => {
          throw Error('获取人气商家列表失败')
        })
      } catch (e) {
        Exception.handle(e)
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
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;
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
