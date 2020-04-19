<template>
  <div class="page-wrap">
    <div
      class="flex flex-vertical-c navigator"
      :style="{paddingTop:menuButtonInfo.top+'px',paddingBottom:10+'px',height:menuButtonInfo.height+'px'}"
      style="background: #F8F8F8;">
      <layout-icon class="p-l-10 p-r-15" type="iconicon-arrow-left"></layout-icon>
      <span>管理</span>
      <span class="title">收藏</span>
    </div>
    <div class="bg-white" :style="{height:menuButtonInfo.top+10+menuButtonInfo.height+50+'px'}"></div>
    <div class="tab bg-white" :style="{top:menuButtonInfo.top+10+menuButtonInfo.height+'px'}">
      <div class="tab-item" :class="{active:activeIndex===0}" @click="activeIndex=0">收藏商品</div>
      <div class="tab-item" :class="{active:activeIndex===1}" @click="activeIndex=1">收藏店铺</div>
    </div>
    <div class="bg-white">
      <div class="list" v-show="activeIndex===0">
        <div class="item" v-for="(goods,idx) in goodsFavoriteList" :key="idx">
          <image class="cover" :src="goods.ImgPath"></image>
          <div class="info">
            <div class="title">{{goods.Products_Name}}</div>
            <div class="c8 m-t-15">{{goods.Products_Sales}}人收藏</div>
            <div class="bottom">
              <div class="price-selling"><span class="fz-12">￥</span><span class="fz-14">{{goods.Products_PriceX}}</span></div>
              <div class="gobuy">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeIndex===1" class="storeList">
        门店列表
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
      activeIndex:0,
      goodsFavoriteList: [],
      storeFavoriteList: []
    }
  },
  methods: {
    async _init_func () {
      try {
        this.goodsFavoriteList = await getProductList({}, { onlyData: true }).catch(e => { throw Error(e.msg || '获取收藏列表失败') })
        this.storeFavoriteList = await getProductList({}, { onlyData: true }).catch(e => { throw Error(e.msg || '获取商家列表失败') })
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
.page-wrap{
  background: #fff;
  min-height: 100vh;
}
.navigator{
  position: fixed;
  top: 0;
  width: 750rpx;
  z-index: 3;
  .title{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.tab{
  position: fixed;
  z-index: 3;
  width: 750rpx;
  height: 50px;
  background: white;
  display: flex;
  justify-content: center;
  //box-shadow: rgba(155,155,155,.1) 0 10px 10px;
  .tab-item{
    width: 130rpx;
    text-align: center;
    padding: 24rpx 0;
    box-sizing: border-box;
    &.active{
      color: $fun-primary-color;
      border-bottom: 2px solid $fun-primary-color;
    }
    &:first-child{
      margin-right: 30rpx;
    }
  }
}

.list{
  margin: 20rpx;
  .item{
    display: flex;
    margin-bottom: 30rpx;
    .cover{
      width: 280rpx;
      height: 280rpx;
    }
    .info{
      position: relative;
      height: 280rpx;
      margin-left: 20rpx;
      flex: 1;
      .title{
        line-height: 42rpx;
        color: #333;
      }
      .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .gobuy{
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
</style>
