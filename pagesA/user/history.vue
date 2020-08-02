<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="tab bg-white">
      <div :class="{active:activeIndex===0}" @click="changeActive(0)" class="tab-item">浏览过</div>
      <div :class="{active:activeIndex===1}" @click="changeActive(1)" class="tab-item">购买过</div>
    </div>
    <swiper class="container" @change="changeIndicatorDots" :current="activeIndex">
      <swiper-item class="cintainer-item-wrap">
        <div v-for="(merchant,idx) in viewList" :key="idx" @click="$linkTo('/pages/store/index?biz_id='+merchant.biz_id)" class="store-top-item">
          <div class="store-info flex flex-vertical-c flex-justify-between">
            <div class="p-l-10 p-r-10 flex flex-vertical-c">
              <image :src="merchant.biz_logo" class="logo"></image>
              <div class="p-l-10 c3">
                <div class="name fz-15 m-b-5"> {{merchant.biz_shop_name}}</div>
                <div class="activity" v-if="merchant.manjian_active_info && merchant.manjian_active_info.length>0">
                  满{{merchant.manjian_active_info[0].reach}}减{{merchant.manjian_active_info[0].award}}
                </div>
              </div>
            </div>
            <div class="flex flex-vertical-c p-r-6">
              <span class="p-r-4 fz-14 c6">进入商家</span>
              <layout-icon color="#999" type="iconicon-arrow-right"></layout-icon>
            </div>
          </div>
          <div class="store-goods-list">
            <block :key="idx2" v-for="(goods,idx2) in merchant.prod_list">
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
      </swiper-item>
      <swiper-item class="cintainer-item-wrap">
        <div v-for="(merchant,idx) in buyList" :key="idx" @click="$linkTo('/pages/store/index?biz_id='+merchant.biz_id)" class="store-top-item">
          <div class="store-info flex flex-vertical-c flex-justify-between">
            <div class="p-l-10 p-r-10 flex flex-vertical-c">
              <image :src="merchant.biz_logo" class="logo"></image>
              <div class="p-l-10 c3">
                <div class="name fz-15 m-b-5"> {{merchant.biz_shop_name}}</div>
                <div class="activity" v-if="merchant.manjian_active_info && merchant.manjian_active_info.length>0">
                  满{{merchant.manjian_active_info[0].reach}}减{{merchant.manjian_active_info[0].award}}
                </div>
              </div>
            </div>
            <div class="flex flex-vertical-c p-r-6">
              <span class="p-r-4 fz-14 c6">进入商家</span>
              <layout-icon color="#999" type="iconicon-arrow-right"></layout-icon>
            </div>
          </div>
          <div class="store-goods-list">
            <block :key="idx2" v-for="(goods,idx2) in merchant.prod_list">
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
        <div class="h20"></div>
      </swiper-item>
    </swiper>
    

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import { userBizView } from '@/api/customer'
import { Exception } from '@/common/Exception'

export default {
  name: 'liveList',
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      activeIndex: 0,
      viewList: [],
      buyList: [],
      paginate: {
        load: false,
        page: 1,
        page_size: 999,
        totalCount: 0
      }
    }
  },
  methods: {
    changeIndicatorDots (e) {
      const { current, source } = e.detail
      this.changeActive(current)
    },
    changeActive (idx) {
      this.activeIndex = idx
    },
    async _init_func () {
      this.viewList = await userBizView({ type: 1 }).then(res => res.data).catch(err => { Exception.handle(Error(err.msg)) })
      this.buyList = await userBizView({ type: 2 }).then(res => res.data).catch(err => { Exception.handle(Error(err.msg)) })
    }
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap{
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .container{
    flex:1;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .cintainer-item-wrap{
    overflow-y: scroll;
  }

  .tab {
    width: 750rpx;
    height: 50px;
    padding-bottom: 4px;
    background: white;
    display: flex;
    justify-content: center;
    .tab-item {
      width: 200rpx;
      text-align: center;
      padding: 24rpx 0;
      box-sizing: border-box;

      &.active {
        color: $fun-primary-color;
        border-bottom: 2px solid $fun-primary-color;
      }

      &:first-child {
        margin-right: 30rpx;
      }
    }
  }
  .store-top-item {
    width: 710rpx;
    overflow: hidden;
    margin: 30rpx 20rpx 0;
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
