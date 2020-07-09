<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="page-wrap-index"></div>
    <div :style="{marginTop:menuButtonInfo.top+'px',height:menuButtonInfo.bottom-menuButtonInfo.top+'px',linHeight:menuButtonInfo.bottom-menuButtonInfo.top+'px'}"    class="index-title m-b-15">
      及贝
    </div>

    <div class="index-item">
      <div class="index-item-top flex m-b-20">
            <div class="m-r-14">
              <image src="/static/rightCardCoupon.png" class="index-item-userAvatar"></image>
            </div>
            <div class="flex1 index-item-info">
                <div  class="info-status flex flex-vertical-c m-b-8">
                  <div class="fz-18 c1 fz-b info-text m-r-9">
                    留夏甜品店
                  </div>
                  <div class="info-status-img">
                      营业中
                  </div>
                  <div class="flex flex-vertical-c go-store fz-14 c3" >
                    进入
                    <LayoutIcon color="#333333" class="m-l-8" display="inline-block" size="12" type="iconicon-arrow-right"></LayoutIcon>
                  </div>
                </div>
                <div class="info-coupon  m-b-8">
                    <div class="info-coupon-item flex m-r-5">
                      <div class="coupon-money fz-10">
                          20元
                      </div>
                      <div class="coupon-get fz-10">
                          领取
                      </div>
                    </div>
                    <div class="info-coupon-item flex m-r-5">
                      <div class="coupon-money fz-10">
                        20元
                      </div>
                      <div class="coupon-get fz-10">
                        领取
                      </div>
                    </div>
                </div>
                <div class="manjian">
                    <div class="manjian-item m-r-5">
                      满50减10
                    </div>
                </div>



            </div>
      </div>
      <div class="l-h-80">
          <div class="flex-vertical-c flex">
            电话 :15503952956
            <LayoutIcon color="#26C78D" class="m-l-8" display="inline-block" size="24" type="icondianhua"></LayoutIcon>
          </div>
          <div class="flex-vertical-c flex">
            地址 : 郑州市金水区文化路硅谷广场a座2208室
            <LayoutIcon color="#26C78D" class="m-l-8" display="inline-block" size="24" type="icondizhi"></LayoutIcon>
          </div>
      </div>
      <div class="pro-list">

      </div>

    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  name: 'liveList',
  components: { WzwImTip,LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {

    }
  },
  methods: {
    _init_func () {

    }
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap{
    //background-color: #f7f7f7;
  }
.page-wrap-index{
  width: 1700rpx;
  height: 1500rpx;
  background-color: #1DCA8B;
  border-radius: 50%;
  position: absolute;
  top: -1080rpx;
  left: -640rpx;
  z-index: -1;
}
  .index-title{
    width: 750rpx;
    text-align: center;
    font-size: 36rpx;
    color: #FFFFff;
  }
  .index-item{
    width:710rpx;
    height:448rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
    margin: 0 auto 30rpx;
    box-sizing: border-box;
    padding: 20rpx;

    &-top{
      width: 670rpx;
      padding-left: 4rpx;
    }

    &-userAvatar{
      display: inline-block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    &-info{
      padding-top: 2rpx;
      box-sizing: border-box;
    }

  }
  .info-status{
    height: 36rpx;
  }
  .info-text{
    max-height: 300rpx;
    overflow-x: hidden;
  }
  .info-status-img{
    width:64rpx;
    height:24rpx;
    line-height: 24rpx;
    font-size: 16rpx;
    text-align: center;
    color: #FFFFff;
    background:rgba(213,213,213,1);
    border-radius:20rpx 0px 20rpx 0px;
  }
  .go-store{
    height: 36rpx;
    line-height: 36rpx;
    margin-left: auto;
  }

  .info-coupon{
    height: 34rpx;
    &-item{
      display: inline-block;
      width: auto;
    }
    .coupon-get{
      height: 34rpx;
      width: 66rpx;
      line-height: 34rpx;
      background-image: url("/static/jibeiCoupon.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      padding-left: 20rpx;
      color: #FFFFff;
      display: inline-block;
    }
    .coupon-money{
      padding: 0rpx 12rpx;
      color: #FFFFff;
      background-color: #FF7F78;
      text-align: center;
      height: 34rpx;
      display: inline-block;
      line-height: 34rpx;
      border-radius: 6rpx;
    }
  }

  .manjian{
    width: 100%;
    height: 30rpx;
    &-item{
      display: inline-block;
      width: auto;
      box-sizing: border-box;
      padding: 0rpx 10rpx;
      font-size: 18rpx;
      color: #FF3000;
      height: 30rpx;
      border-radius: 6rpx;
      border: 1px solid #FF3000;
    }
  }
  .l-h-80{
    line-height: 80rpx;
  }

  .pro-list{
    height: 90rpx;
    width:670rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
