<template>
    <div class="vip-all">
      <div class="top">
        <image src="/static/vip/vip-bg.png" class="img-full"></image>
        <swiper class="center" :indicator-dots="false" :autoplay="false"  :duration="1000" :current="inds" @change="change">
          <swiper-item class="vipFir"  :style="vipData.length==1?'margin-left:42rpx;':''">
            <image src="/static/vip/vip.png" class="img-full"></image>
            <div class="vip-title">
              豪华金卡会员
            </div>
          </swiper-item>
        </swiper>
      </div>

      <div class="vip-has">
          <div class="vip-has-title fz-17 c3">
            会员享特权
          </div>
          <div class="vip-has-content flex ">
              <div class="vip-has-item">
                <image src="/static/vip/bao.png" class="vip-has-content-img"></image>
                <div class="fz-12 c3 m-t-5">
                  包邮
                </div>
              </div>
              <div class="vip-has-item">
                <image src="/static/vip/xiao.png" class="vip-has-content-img"></image>
                <div class="fz-12 c3 m-t-5">
                  消费折扣
                </div>
              </div>
              <div class="vip-has-item">
                <image src="/static/vip/fan.png" class="vip-has-content-img"></image>
                <div class="fz-12 c3 m-t-5">
                  返现
                </div>
              </div>
              <div class="vip-has-item">
                <image src="/static/vip/zhuan.png" class="vip-has-content-img"></image>
                <div class="fz-12 c3 m-t-5">
                  专享价
                </div>
              </div>
          </div>
      </div>


      <div class="vip-pro">
          <div class="vip-pro-title fz-17 c3">
            赠送商品
          </div>
          <div class="vip-pro-list">
              <div class="vip-pro-item">
                <div class="vip-pro-item-img">
                  <image src="/static/vip/vip.png" class="img-full"></image>
                </div>
                <div class="vip-pro-item-title fz-13 c3 m-t-11 m-b-10">
                  北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪慕斯北海道玫瑰味双层芝士礼盒送礼蛋糕乳酪慕斯
                </div>
                <div class=" flex flex-vertical-c">
                  <div class="fz-12 cr">
                    ¥ <span class="fz-17 m-l-5">100</span>
                  </div>
                  <div class="fz-12 priceY  m-l-10">
                    ¥200
                  </div>
                </div>
              </div>
          </div>
      </div>

      <div style="width: 750rpx;height: 100rpx"></div>
      <div class="fz-12 submit">
        ¥<span class="fz-16">299.00直接购买</span>
      </div>

    </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
export default {
  name: 'VipList',
  mixins:[BaseMixin],
  data() {
    return {
        vipData:[{1:1}],
    };
  },
}
</script>

<style scoped lang="scss">
  .vip-all{background-color: #f1f1f1;min-height: 100vh;}
  .top{
    width:750rpx;
    height:454rpx;
    position: relative;
    .goBack{
      width: 20rpx;
      height: 30rpx;
      position: absolute;
      top: 29rpx;
      left: 20rpx;
    }
    .titles{
      color: #FFFFFF;
      font-size: 32rpx;
      position: absolute;
      top: 28rpx;
      left: 310rpx;
      height: 31rpx;
      line-height: 31rpx;
    }
    .center{
      position: absolute;
      top: 60rpx;
      left: 3rpx;
      width: 750rpx;
      height: 332rpx;
      white-space: nowrap;
      .vipFir{
        width: 662rpx !important;
        height: 332rpx !important;
        display: inline-block;
        position: relative;
        padding-right: 30rpx;
      }
    }
  }
  .vip-title{
    height: 46rpx;
    line-height: 46rpx;
    font-weight: bold;
    color: #f1f1f1;
    text-shadow:0px 6rpx 0px rgba(77,60,28,0.6);
    position: absolute;
    top: 90rpx;
    left: 340rpx;
  }
  .vip-has{
    width: 710rpx;
    height: 290rpx;
    border-right: 10rpx;
    margin: 50rpx auto 0;
    background-color: #FFFFFF;
    &-title{
      width: 100%;
      height: 114rpx;
      line-height: 32rpx;
      text-align: center;
      padding:32rpx 0rpx 50rpx 0rpx ;
      box-sizing: border-box;
    }
    &-content{
        width: 710rpx;
        padding: 0rpx 50rpx;
      box-sizing: border-box;
      &-img{
        width: 88rpx;
        height: 88rpx;
      }
    }
  }
  .vip-has-item{
    text-align: center;
    margin-right: 86rpx;
    &:last-child{
      margin-right: 0rpx;
    }
  }

  .vip-pro{
    width: 710rpx;
    border-radius: 10rpx;
    background-color: #FFFFFF;
    margin: 30rpx auto;
    &-title{
        width: 710rpx;
        height: 102rpx;
        line-height: 32rpx;
        text-align: center;
        padding: 30rpx 0rpx 40rpx 0rpx;
        box-sizing: border-box;
    }
  }
  .vip-pro-list{
    width: 710rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    flex-wrap: wrap;
    display: flex;
  }
  .vip-pro-item{
    width: 310rpx;
    margin-right: 32rpx;
    margin-bottom: 48rpx;
    &-img{
      width: 310rpx;
      height: 310rpx;
    }
    &-title{
      width: 310rpx;
      overflow: hidden;
      height: 60rpx;
      line-height: 30rpx;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    .cr{color: #f00;}
    .priceY{
      color: #afafaf;
      text-decoration: line-through;
    }
  }
  .submit{
    width: 750rpx;
    text-align: center;
    height: 86rpx;
    line-height: 86rpx;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #26C78D;
    color: #FFFFFF;
  }

</style>
