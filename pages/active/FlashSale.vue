<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div :style="{height:menuButtonInfo.top+'px'}" style="background: none"></div>
    <div :style="{height:menuButtonInfo.height+'px'}" class="top flex flex-vertical-c">
      <layoutIcon @click="$back" class="m-l-15" color="#fff" style="position: relative;z-index: 3"
                  type="iconicon-arrow-left"></layoutIcon>
      <div class="title">限时抢购</div>
    </div>
    <div class="background-img">
      <image class="image" mode="widthFix" src="/static/flashsale-bg.jpg"></image>
    </div>
    <div :style="{top:diyHeadHeight+43+'px'}" class="container-wrap">
      <scroll-view class="content" scroll-y>
        <div class="content-top flex flex-justify-between">
          <block :key="idx" v-for="(goods,idx) in productList">
            <div @click="$toGoodsDetail(goods)" class="pro" v-if="idx<4">
              <div :style="{backgroundImage:'url('+goods.ImgPath+')'}" class="pro-img"></div>
              <div class="pro-name">{{goods.Products_Name}}</div>
              <div class="pro-price">￥{{goods.Products_PriceX}}</div>
            </div>
          
          </block>
        
        </div>
        <div class="content-ad">
          <layout-ad :boxDidth="670" code="spike_under_recommend"></layout-ad>
          <!--          <image class="ad-image" src="https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202005041732322108.png"></image>-->
        </div>
        <div class="content-list">
          <block :key="idx" v-for="(goods,idx) in productList">
            <div @click="$toGoodsDetail(goods)" class="flex pro-item" v-if="idx>=0">
              <div :style="{backgroundImage:'url('+goods.ImgPath+')'}" class="p-item-image"></div>
              
              <div class="p-msg">
                <div class="p-item-name">{{goods.Products_Name}}</div>
                <!--              <div class="tags flex">-->
                <!--                <div class="tag">先做</div>-->
                <!--                <div class="tag">美味可口</div>-->
                <!--                <div class="tag">美味可口</div>-->
                <!--              </div>-->
                <div class="progress">
                  <image class="progress-img" src=""></image>
                </div>
                <div class="p-item-price flex">
                  <div class="p-item-new-price">
                    <div class="icon">￥</div>
                    {{goods.spike_price}}
                  </div>
                  <div class="p-item-old-price">
                    <div class="icon">￥</div>
                    {{goods.Products_PriceX}}
                  </div>
                </div>
                <div class="flash">
                  <div class="flash-font">抢</div>
                </div>
              </div>
            </div>
          </block>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import { getProductList } from '@/api/product'
import layoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutAd from '@/componets/layout-ad/layout-ad'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutAd,
    layoutIcon,
  },
  data () {
    return {
      productList: [],
      spikeList: [],
    }
  },
  methods: {},
  async created () {
    this.productList = await getProductList({
      spike_goods: 1,
      pageSize: 999,
    }).then(res => {
      return res.data
    }).catch(e => {
      throw Error(e.msg || '获取参与显示抢购的商品列表错误')
    })
    // this.spikeList = await bizSpikeList({ pageSize: 999}, { onlyData: true }).catch(e => error(e.msg))
  },
}
</script>
<style lang="scss" scoped>
  
  .page-wrap {
    min-height: 100vh;
  }
  
  .top {
    z-index: 2;
    position: relative;
    background: none;
    color: #fff;
    
    .title {
      font-size: 40rpx;
      width: 750rpx;
      position: absolute;
      top: 50%;
      text-align: center;
      transform: translateY(-50%);
    }
  }
  
  .background-img {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    
    .image {
      width: 100%;
      height: 100%;
    }
  }
  
  .container-wrap {
    position: fixed;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    width: 750rpx;
    z-index: 3;
    overflow-y: scroll;
  }
  
  .content {
    position: absolute;
    bottom: 0;
    top: 0;
    margin: 0rpx 20rpx 60rpx;
    width: 710rpx;
    padding: 50rpx 20rpx 40rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
    background-color: #fff;
    
    .pro {
      flex: 1;
      text-align: center;
      
      .pro-img {
        width: 134rpx;
        height: 134rpx;
        @include cover-img();
        margin: 0 auto;
      }
      
      .pro-name {
        font-size: 22rpx;
        color: #333;
        line-height: 30rpx;
      }
      
      .pro-price {
        font-size: 24rpx;
        color: #ff0000;
      }
    }
  }
  
  .content-ad {
    margin: 35rpx auto;
    
    .ad-image {
      width: 650rpx;
      height: 180rpx;
    }
  }
  
  .content-list {
    width: 670rpx;
    
    padding-bottom: 30rpx;
  }
  
  .pro-item {
    margin-bottom: 30rpx;
    height: 290rpx;
    
    .p-item-image {
      width: 290rpx;
      height: 290rpx;
      @include cover-img();
    }
    
    .p-msg {
      position: relative;
      width: 380rpx;
      padding: 20rpx 20rpx 0;
      box-sizing: border-box;
      background-color: #FEE2C9;
      border: 3px solid rgba(254, 226, 201, 1);
      border-left: 0;
    }
    
    .p-item-name {
      width: 100%;
      overflow: hidden;
      font-size: 28rpx;
      font-weight: 700;
      line-height: 42rpx;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .tags {
      margin-top: 28rpx;
      margin-bottom: 15rpx;
    }
    
    .tag {
      font-size: 18rpx;
      color: #F53636;
      padding: 8rpx;
      box-sizing: border-box;
      margin-right: 12rpx;
      border: 1px solid #F53636;
    }
    
    .progress {
      width: 100%;
    }
    
    .progress-img {
      width: 100%;
      height: 62rpx;
    }
    
    .p-item-price {
      align-items: center;
      
      .icon {
        font-size: 24rpx;
      }
      
      .p-item-new-price {
        color: #F53636;
        margin-right: 10rpx;
      }
      
      .p-item-old-price {
        color: #999999;
        font-size: 24rpx;
        text-decoration: line-through;
      }
      
      .icon {
        display: inline;
      }
    }
    
    .flash {
      position: absolute;
      right: 20rpx;
      bottom: 0;
      width: 80rpx;
      height: 80rpx;
      background: #FFDBBA;
      color: #fff;
      padding: 6rpx;
      box-sizing: border-box;
      border-radius: 50%;
      
      .flash-font {
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        line-height: 68rpx;
        background: #EA2021;
        text-align: center;
      }
    }
  }
</style>
