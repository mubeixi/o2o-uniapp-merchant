<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    
    <div :style="{height:diyHeadHeight+'px',opacity:activeHeadOpacity}" class="bg-white" style="position: fixed;z-index: 9;width: 750rpx;left:0;top:0"
         v-if="activeHeadOpacity">
      <div :style="{height:systemInfo.statusBarHeight+'px'}"></div>
      <div class="c3 text-center" style="position: relative">
        <layout-icon
          @click="$back"
          color="#777"
          display="inline" size="18" style="position: absolute;top: 50%;transform: translateY(-50%);left: 15px" type="iconicon-arrow-left"></layout-icon>
        <div :style="{height:menuButtonInfo.height+'px',lineHeight:menuButtonInfo.height+'px'}">分享赚</div>
      </div>
    </div>
    
    <layout-icon
      :color="immersed?'#666':'#fff'"
      :style="{top:menuButtonInfo.top+'px',opacity:1-activeHeadOpacity}" @click="$back" class="left-icon" size="18"
      type="iconicon-arrow-left"></layout-icon>
    <div :style="{backgroundImage: 'url('+$getDomain('/static/client/share/share_top.png')+')'}" class="head">
      <div :style="{top:menuButtonInfo.top+'px'}" class="userInfo">
        <image :src="userInfo.User_HeadImg" class="avatar"></image>
        <div class="nickname fz-16">{{userInfo.User_NickName}}</div>
      </div>
      <div class="count">
        <div class="total text-center"><span class="fz-24 price-selling"
                                             style="font-weight: bold">{{info.shareAmount}}</span><span
          class="c9 p-l-10">累计赚(元)</span></div>
        <div class="flex" style="height: 44px;">
          <div class="bor-r flex1 text-center flex flex-column flex-justify-between">
            <div class="num price-selling"><span class="fz-18">{{info.todayShareAmount|formatPirce(0)}}</span><span
              class="fz-12">{{info.todayShareAmount|formatPirce(1)}}</span></div>
            <div class="c9">今日赚(元)</div>
          </div>
          <div class="bor-r flex1 text-center flex flex-column flex-justify-between">
            <div class="num fz-18 price-selling">{{info.viewTotal}}</div>
            <div class="c9">累计浏览(次)</div>
          </div>
          <div class="flex1 text-center flex flex-column flex-justify-between">
            <div class="num fz-18 price-selling">{{info.todayViewTotal}}</div>
            <div class="c9">今日浏览(次)</div>
          </div>
        </div>
      </div>
      <!--<div class="notify">恭喜小苹果分享***商品赚30.00元</div>-->
    </div>
    <!--code="indexTop" :imgs="adData"-->
    <layout-ad code="share_commi_top_goods"></layout-ad>
    <div class="goods-list">
      <div :key="idx" @click="$toGoodsDetail(item)" class="goods-item" v-for="(item,idx) in goodsList">
        <div :style="{backgroundImage:'url('+item.ImgPath+')'}" class="goods-item-cover"></div>
        <div class="goods-item-info">
          <div class="title">{{item.Products_Name}}</div>
          <div class="sale">已售{{item.Products_Sales}}件</div>
          <div class="price-box fz-12">
            <span class="c6">拼购价</span>
            <span>￥</span>
            <span class="fz-14">{{item.Products_PriceX}}</span>
            <span class="text-underline p-l-15" style="color: #ccc;font-style: italic">￥{{item.Products_PriceY}}</span>
          </div>
          <div @click.stop="$linkTo('/pages/share/go?prod_id='+item.Products_ID)" class="actions">
            <div :style="{backgroundImage: 'url('+$getDomain('/static/client/share/share_action_btn.png')+')'}"
                 class="share flex flex-vertical-c color-white">
              <layout-icon color="#fff" type="iconicon-share"></layout-icon>
              <div class="flex1 p-l-6">
                <div class="fz-12">分享赚</div>
                <div class="fz-10 m-t-2">￥{{item.share_commission}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutAd from '@/componets/layout-ad/layout-ad'
import { getProductList } from '@/api/product'
import { getShareView } from '@/api/customer'
import { checkIsLogin } from '@/common/helper'
import { error, hideLoading, showLoading } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  name: 'ShareIndex',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutIcon,
    LayoutAd,
  },
  data () {
    return {
      activeHeadOpacity: 0,
      immersed: false,
      info: {},
      goodsList: [],
      adData: ['https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191033295234.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191039274962.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191044146586.jpg'],
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  onShow () {
    if (!checkIsLogin(1, 1, 1)) return
    this._init_func()
  },
  onPageScroll (e) {
    const { scrollTop } = e
    this.immersed = scrollTop > 240
    const h = this.diyHeadHeight + 20 // 滑到这里的时候,就透明度为1
    const opacity = scrollTop / h
    this.activeHeadOpacity = opacity > 1 ? 1 : opacity
  },
  methods: {
    async _init_func () {
      try {
        showLoading()
        const list = await getProductList({ pageSize: 999 }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })
        
        this.goodsList = list.filter(row => row.share_commission > 0)
        if (this.userInfo.User_ID) {
          this.info = await getShareView({ user_id: this.userInfo.User_ID }).then(res => {
            return res.data
          }).catch(e => {
            throw Error('获取分享赚概览信息错误')
          })
        }
        
        hideLoading()
      } catch (e) {
        error(e.message)
        // 回退一下
        // setTimeout(() => {
        //   this.$back()
        // }, 1000)
      } finally {
        hideLoading()
      }
    },
  },
  created () {
  
  },
}
</script>
<style lang="scss" scoped>
  
  .page-wrap {
    background: #f8f8f8;
    min-height: 100vh;
  }
  
  .left-icon {
    position: fixed;
    z-index: 11;
    left: 15px;
  }
  
  .head {
    width: 750rpx;
    height: 436rpx;
    margin-bottom: 164rpx;
    position: relative;
    font-size: 12px;
    background-size: 100% 100%;
    background-position: center;
  }
  
  .head-bg {
    width: 750rpx;
    height: 436rpx;
  }
  
  .userInfo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    
    .avatar {
      width: 84rpx;
      height: 84rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .nickname {
      /*background: rgba(255,255,255,.3);*/
      color: #fff;
      padding: 6px 9px;
    }
  }
  
  .count {
    z-index: 2;
    position: absolute;
    width: 700rpx;
    height: 280rpx;
    box-sizing: border-box;
    overflow: hidden;
    left: 25rpx;
    bottom: -72px;
    background: #fff;
    border-radius: 14rpx;
    padding: 60rpx 0 40rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .price-selling {
      color: red !important;
    }
  }
  
  .notify {
    position: absolute;
    bottom: 54rpx;
    height: 54rpx;
    line-height: 54rpx;
    padding-left: 28rpx;
    padding-right: 27rpx;
    border-top-right-radius: 27rpx;
    border-bottom-right-radius: 27rpx;
    background: rgba(0, 0, 0, .4);
    color: #fff;
    font-size: 12px;
    z-index: 3;
  }
  
  .goods-list {
    padding: 25rpx;
    
    .goods-item {
      display: flex;
      margin-bottom: 40rpx;
      align-items: center;
      
      .goods-item-cover {
        width: 300rpx;
        height: 300rpx;
        background: #f2f2f2;
        @include cover-img();
      }
      
      .goods-item-info {
        flex: 1;
        height: 300rpx;
        padding-left: 20rpx;
        position: relative;
        
        .title {
          line-height: 20px;
          font-size: 14px;
          color: #333;
        }
        
        .sale {
          margin: 40rpx 0 30rpx;
          color: #666;
          font-size: 12px;
        }
        
        .actions {
          
          .share {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 170rpx;
            height: 76rpx;
            box-sizing: border-box;
            padding-left: 38rpx;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
