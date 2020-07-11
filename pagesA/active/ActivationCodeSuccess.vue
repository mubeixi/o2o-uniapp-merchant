<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <img   :src="$getDomain('/static/client/active/paySuccess.png')"  class="pay-success-img">
    <div class="pay-success-title m-b-20">
      恭喜你成功抢到
      <span class="c-66B5FF">及贝商家自营配送小程序</span>
    </div>

    <div class="pay-success-text">
      识别下方二维码
    </div>
    <div  class="pay-success-text">
      关注“及贝”官方公众号激活小程序
    </div>
    <img  :src="$getDomain('/static/client/active/jiantou.png')" class="jiantou-img">

    <div class="block-div"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/block.png')+')'}" @click="yulan" >
<!--      <img   :src="$getDomain('/static/client/active/block.png')" class="block-img full-img">-->
      <img :src="initCode" v-if="initCode"  class="init-code">
    </div>
    <div class="tips-text">
      手机扫描二维码立即关注
    </div>

    <div  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/activeStep.png')+')'}"   class="active-step">
      <div class="active-step-title">
        激活步骤
      </div>
      <div class="active-step-shibie active-step-text">
        识别二维码，跳转至微信
      </div>
      <div class="active-step-guanzhu active-step-text">
        关注公众号激活小程序开始使用
      </div>

    </div>

    <div  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/xitong.png')+')'}"   class="active-system">
      系统亮点
    </div>

    <div class="active-peisong m-t-5">
      专注商家自营配送，为配送而生
    </div>

    <div class="flex flex-vertical-c flex-justify-around m-b-25">
      <div  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system1.png')+')'}"    class="system-item">

        <div class="system-item-text">
          <div>
            1分钟搭建出
          </div>
          <div>
            自己的配送平台
          </div>
        </div>

      </div>
      <div  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system2.png')+')'}"   class="system-item">

        <div class="system-item-text">
          <div>
            "0"抽成"0"手续
          </div>
          <div>
            费，让利消费者
          </div>
        </div>

      </div>
      <div :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system3.png')+')'}"   class="system-item">

        <div class="system-item-text">
          <div>
            数字化配送
          </div>
          <div>
            为增加商家营收
          </div>
        </div>

      </div>

    </div>
    <div class="flex flex-vertical-c flex-justify-around">
      <div :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system4.png')+')'}"  class="system-item">

        <div class="system-item-text">
          <div>
            无需小程序认证
          </div>
          <div>
            省掉300元
          </div>
        </div>

      </div>
      <div :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system5.png')+')'}"  class="system-item">

        <div class="system-item-text">
          <div>
            自主配送/同城配送
          </div>
          <div>
            快递收单系统
          </div>
        </div>

      </div>
      <div :style="{backgroundImage: 'url('+$getDomain('/static/client/active/system6.png')+')'}"  class="system-item">

        <div class="system-item-text">
          <div>
            直播导购场景搭建
          </div>
          <div>
            快速流量变现
          </div>
        </div>

      </div>

    </div>

    <div  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/ativeSystemNote.png')+')'}"  class="system-note">

      <div class="system-note-title">
        系统须知
      </div>
      <div class="jihuo">
        如何激活？
      </div>
      <div class="jihuo-text">
        添加公众号激活系统后，就可以开始使用小程序了！小程序使用时间为1个月，如何想继续使用，在商家后台直接续费即可，首月19.8远，后面半年活1年为一个购买阶梯，半年费用380元，全年费用680元。
      </div>
      <div class="jihuo" style="margin-top: 90rpx">
        如何使用？
      </div>
      <div class="jihuo-text">
        请不用担心，XX是一款手机端即可完成商城，商品，订单，发货，财务等功能的小程序，操作是非常的简单的！如果您购买后遇到不会使用的情况，可以关注公众号：xx，里面有详细的使用教程，同时进入系统后也可以根据系统的引导完成相关的设置。
      </div>

    </div>

  </div>
</template>
<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import { getCodeQrcode } from '@/api/order'
import { error } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip
  },
  data () {
    return {
      order_id: '',
      initCode: ''
    }
  },
  methods: {
    yulan () {
      uni.previewImage({
        urls: [this.initCode]
      })
    },
    async init () {
      await getCodeQrcode({ order_id: this.order_id }, { tip: '加载中' }).then(res => {
        this.initCode = res.data
      }).catch(e => {
        error(e.msg || '获取二维码错误')
        const _self = this
        setTimeout(function () {
          uni.redirectTo({
            url: '/pagesA/active/ActivationCode'
          })
        }, 1500)
      })
    }
  },
  onLoad (options) {
    if (options.order_id) {
      this.order_id = options.order_id
      this.init()
    }
  }

}
</script>
<style lang="scss" scoped>
  .page-wrap {
    min-height: 100vh;
    box-sizing: border-box;
    background-color: #170130;
    padding-top: 66rpx;
    padding-bottom: 64rpx;
  }
  .full-img{
    width: 100%;
    height: 100%;
  }
  .pay-success-img{
    width: 128rpx;
    height: 140rpx;
    display: block;
    margin: 0rpx auto 50rpx;
  }
  .c-66B5FF{
    color: #66B5FF !important;
  }
  .pay-success-title{
    width: 750rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 34rpx;
    color: #FFFFff;
    text-align: center;
  }
  .pay-success-text{
    width: 750rpx;
    height: 44rpx;
    line-height: 44rpx;
    font-size: 24rpx;
    color: #FFFFff;
    text-align: center;
  }
  .jiantou-img{
    display: block;
    width: 162rpx;
    height: 106rpx;
    margin-left: 240rpx;
  }
  .block-div{
    width: 280rpx;
    height: 280rpx;
    margin: 0 auto;
    position: relative;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tips-text{
    width: 750rpx;
    height: 22rpx;
    line-height: 22rpx;
    font-size: 22rpx;
    color: #9C92AD;
    text-align: center;
    margin-top: 12rpx;
  }
  .flex-justify-around{
    justify-content: space-around;
  }

  .active-step{
    width: 710rpx;
    height: 380rpx;
    margin: 84rpx auto 78rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    .active-step-title{
      height: 32rpx;
      font-size: 34rpx;
      line-height: 32rpx;
      color: #FFFFff;
      position: absolute;
      top: 34rpx;
      left: 290rpx;
    }
    .active-step-text{
      height: 26rpx;
      line-height: 26rpx;
      font-size: 26rpx;
      color: #333333;
    }
    .active-step-shibie{
      position: absolute;
      top: 170rpx;
      left: 170rpx;
    }
    .active-step-guanzhu{
      position: absolute;
      top: 270rpx;
      left: 170rpx;
    }
  }
  .active-system{
    width: 402rpx;
    height: 102rpx;
    line-height: 102rpx;
    text-align: center;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    font-size: 34rpx;
    margin: 0 auto;
    color: #FFFFff;
  }
  .active-peisong{
    width: 750rpx;
    text-align: center;
    height: 26rpx;
    line-height: 26rpx;
    font-size: 26rpx;
    color: #FFFFff;
    margin-bottom: 36rpx;
  }
  .system-item{
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    width: 224rpx;
    height: 326rpx;
  }
  .system-item-text{
    width: 224rpx;
    height: 76rpx;
    position: absolute;
    top: 220rpx;
    left: 0rpx;
    line-height: 38rpx;
    text-align: center;
    font-size: 22rpx;
  }

  .system-note{
    width: 710rpx;
    margin: 84rpx auto 0rpx;
    height: 732rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding-top: 34rpx;
  }
  .system-note-title{
    height: 34rpx;
    line-height: 34rpx;
    text-align: center;
    color: #ffffff;
    font-size: 34rpx;
  }
  .jihuo{
    width: 710rpx;
    margin-top: 90rpx;
    height: 30rpx;
    line-height: 30rpx;
    font-size: 32rpx;
    color: #6324E8;
    padding-left: 44rpx;
    box-sizing: border-box;
  }
  .jihuo-text{
    margin-top: 30rpx;
    width: 604rpx;
    padding-left: 46rpx;
    font-size: 22rpx;
    color: #333333;
    line-height: 36rpx;

  }

  .init-code{
    width: 230rpx;
    height: 230rpx;
  }
</style>
