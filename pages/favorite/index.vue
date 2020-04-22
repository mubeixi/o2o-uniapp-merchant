<template>
  <div class="page-wrap">
    <div
      class="flex flex-vertical-c navigator"
      :style="{paddingTop:menuButtonInfo.top+'px',paddingBottom:10+'px',height:menuButtonInfo.height+'px'}"
      style="background: #F8F8F8;">
      <layout-icon class="p-l-10 p-r-15" type="iconicon-arrow-left"></layout-icon>
      <span @click="openMuliti">管理</span>
      <span class="title">收藏</span>
    </div>
    <div class="bg-white" :style="{height:menuButtonInfo.top+10+menuButtonInfo.height+50+'px'}"></div>
    <div class="tab bg-white" :style="{top:menuButtonInfo.top+10+menuButtonInfo.height+'px'}">
      <div class="tab-item" :class="{active:activeIndex===0}" @click="activeIndex=0">收藏商品</div>
      <div class="tab-item" :class="{active:activeIndex===1}" @click="activeIndex=1">收藏店铺</div>
    </div>
    <div class="bg-white container">
      <div class="list" v-show="activeIndex===0">
        <label class="item" v-for="(goods,idx) in goodsFavoriteList" :key="idx">
          <div class="p-r-10" v-if="multiGoods">
            <radio class="checkbox" style="transform: scale(0.8)"></radio>
          </div>
          <image class="cover" :src="goods.ImgPath"></image>
          <div class="info">
            <div class="title">{{goods.Products_Name}}</div>
            <div class="c8 m-t-15">{{goods.Products_Sales}}人收藏</div>
            <div class="bottom">
              <div class="price-selling"><span class="fz-12">￥</span><span
                class="fz-14">{{goods.Products_PriceX}}</span></div>
              <div class="gobuy">立即购买</div>
            </div>
          </div>
        </label>
      </div>
      <div v-show="activeIndex===1" class="storeList">
        <div class="store-item" v-for="(store,idx) in storeFavoriteList" :key="idx">
          <div class="p-r-10" v-if="multiStore">
            <radio class="checkbox" style="transform: scale(0.8)"></radio>
          </div>
          <div class="flex1 box">
            <div class="top flex flex-vertical-c flex-justify-between">
              <div class="flex flex-vertical-c">
                <image class="logo"
                       src="https://newo2o.bafangka.com/static/member/images/login/loginWeixin.png"></image>
                <div class="p-l-10 c3">海的故事咖啡店</div>
              </div>
              <layout-icon type="iconicon-arrow-right"></layout-icon>
            </div>
            <div class="content p-10 c8">
              <div class="fz-14 ">电话：0371-8888888
                <layout-icon size="18" class="p-l-10" weight="bold" color="#26C78D" display="inline"
                             type="iconicon-phone"></layout-icon>
              </div>
              <div class="m-t-18 fz-14 ">地址：河南省郑州市金水区文化路东风路交叉口向南 500米路西硅谷商务广场A座2208室
                <layout-icon size="18" class="p-l-10" weight="bold" type="iconicon-address" display="inline"
                             color="#26C78D"></layout-icon>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="handle-box" v-if="multiGoods||multiStore">
      <div @click="taggleAllCheck">
        <radio style="transform: scale(0.8)" :checked="allCheck"></radio>
        <span class="p-l-8">切换全选</span>
      </div>
      <div class="btn-list">
        <div class="btn">删除({{selectes.length}})</div>
      </div>
    </div>

  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import { getProductList } from '@/api/product'
import { modal } from '@/common/fun'

export default {
  name: 'FavoriteIndex',
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      selectes: [],
      allCheck: false,
      multiGoods: false,
      multiStore: false,
      activeIndex: 0,
      goodsFavoriteList: [],
      storeFavoriteList: []
    }
  },
  methods: {
    taggleAllCheck () {

    },
    openMuliti () {
      if (this.activeIndex === 0) {
        this.multiStore = false
        this.multiGoods = !this.multiGoods
      }
      if (this.activeIndex === 1) {
        this.multiGoods = false
        this.multiStore = !this.multiStore
      }
    },
    async _init_func () {
      try {
        this.goodsFavoriteList = await getProductList({}, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取收藏列表失败')
        })
        this.storeFavoriteList = await getProductList({}, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商家列表失败')
        })
      } catch (e) {
        modal(e.message)
      }
    }
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #fff;
    min-height: 100vh;
  }

  .navigator {
    position: fixed;
    top: 0;
    width: 750rpx;
    z-index: 3;

    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tab {
    position: fixed;
    z-index: 3;
    width: 750rpx;
    height: 50px;
    background: white;
    display: flex;
    justify-content: center;
    //box-shadow: rgba(155,155,155,.1) 0 10px 10px;
    .tab-item {
      width: 130rpx;
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

  .container {
    padding-bottom: 90rpx;
  }

  .list {
    margin: 40rpx 20rpx;

    .item {
      display: flex;
      margin-bottom: 30rpx;
      align-items: center;

      .cover {
        width: 280rpx;
        height: 280rpx;
        background: #f2f2f2;
      }

      .info {
        position: relative;
        height: 280rpx;
        margin-left: 20rpx;
        flex: 1;

        .title {
          line-height: 42rpx;
          color: #333;
        }

        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .gobuy {
            background: #FF0000;
            color: #fff;
            text-align: center;
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 30rpx;
            font-size: 14px;
          }
        }
      }

    }
  }

  .storeList {
    padding: 40rpx 20rpx;
  }

  .store-item {
    display: flex;
    align-items: center;

    .box {
      height: 300rpx;
      width: 710rpx;
      background: white;
      border-radius: 10rpx;
      margin-bottom: 18px;
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);

      .top {
        padding: 25rpx;
        border-bottom: 1px solid #e7e7e7;

        .logo {
          width: 80rpx;
          height: 80rpx;
        }
      }

      .content {

      }
    }

  }

  /* 底部的操作栏start */
  .handle-box {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 90rpx;
    width: 750rpx;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.16);
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20rpx;
    box-sizing: border-box;

    .btn-list {
      display: flex;
      align-items: center;

      .btn {
        display: block;
        width: 96rpx;
        height: 54rpx;
        line-height: 54rpx;
        font-size: 14px;
        text-align: center;
        border-radius: 10rpx;
        border: 1px solid $fun-red-color;
        color: $fun-red-color;
        background: white;
        margin-left: 20rpx;

        &.btn-up {
          color: white;
          background: $fun-red-color;
        }
      }
    }
  }

  /*底部操作栏 end*/
</style>
