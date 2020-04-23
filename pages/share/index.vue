<template>
  <div class="page-wrap">
    <div class="head" :style="{'background-image': url('/static/client/share/share_top.png'|domain)}">
      <div class="userInfo">
        <image class="avatar" src="https://newo2o.bafangka.com/static/member/images/login/loginWeixin.png"></image>
        <div class="nickname fz-16">function</div>
      </div>
      <div class="count">
        <div class="total text-center"><span class="fz-24 price-selling" style="font-weight: bold">7684.00</span><span
          class="c9 p-l-10">累计赚(元)</span></div>
        <div class="flex" style="height: 44px;">
          <div class="bor-r flex1 text-center flex flex-column flex-justify-between">
            <div class="num price-selling"><span class="fz-18">100</span><span class="fz-12">.00</span></div>
            <div class="c9">今日赚(元)</div>
          </div>
          <div class="bor-r flex1 text-center flex flex-column flex-justify-between">
            <div class="num fz-18 price-selling">333</div>
            <div class="c9">累计浏览(次)</div>
          </div>
          <div class="flex1 text-center flex flex-column flex-justify-between">
            <div class="num fz-18 price-selling">222</div>
            <div class="c9">今日浏览(次)</div>
          </div>
        </div>
      </div>
      <div class="notify">恭喜小苹果分享***商品赚30.00元</div>
    </div>
    <!--code="indexTop" :imgs="adData"-->
    <layout-ad code="indexTop"></layout-ad>
    <div class="goods-list">
      <div class="goods-item" v-for="(item,idx) in goodsList" :key="idx"
           @click="$linkTo('/pages/share/go?prod_id='+item.Products_ID)">
        <div class="goods-item-cover" :style="{backgroundImage:'url('+item.ImgPath+')'}"></div>
        <div class="goods-item-info">
          <div class="title">{{item.Products_Name}}</div>
          <div class="sale">已售{{item.Products_Sales}}件</div>
          <div class="price-box fz-12">
            <span class="c6">拼购价</span>
            <span>￥</span>
            <span class="fz-14">{{item.Products_PriceX}}</span>
            <span style="color: #ccc;font-style: italic" class="text-underline p-l-15">￥{{item.Products_PriceY}}</span>
          </div>
          <div class="actions">
            <div class="share flex flex-vertical-c"
                 style="color: white;background-image: url('/static/share/share_action_btn.png')">
              <layout-icon color="#fff" type="iconicon-share"></layout-icon>
              <div class="flex1 p-l-6">
                <div class="fz-12">分享赚</div>
                <div class="fz-10 m-t-2">￥95.0</div>
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
import { hideLoading, modal, showLoading } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  name: 'ShareIndex',
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    LayoutAd
  },
  data () {
    return {
      goodsList: [],
      adData: ['https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191033295234.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191039274962.png', 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202004191044146586.jpg']
    }
  },
  methods: {
    async _init_func () {
      try {
        showLoading()
        this.goodsList = await getProductList({ pageSize: 999 }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取商品列表错误')
        })
        hideLoading()
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
    background: #f8f8f8;
    min-height: 100vh;
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
    top: 44rpx;
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
      margin-bottom: 30rpx;
      align-items: center;

      .goods-item-cover {
        width: 300rpx;
        height: 300rpx;
        background: #f2f2f2;
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
