<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="active-fixed flex flex-vertical-c" :style="{paddingTop:menuButtonInfo.top+'px'}">
      <img class="img-logo m-r-5" :src="$getDomain('/static/images/jbay/logo/100_zi.png')"/>
      <div class="fz-12">
        专业的自营配送小程序
      </div>
    </div>

    <div class="propa-banner">
      <image  :src="$getDomain('/static/client/active/propaBanner.png')" class="full-img"></image>
    </div>

    <div class="propa-bg"  :style="{backgroundImage: 'url('+$getDomain('/static/client/active/propaBg.png')+')'}" >

      <div class="propa-tradition">
        <image   :src="$getDomain('/static/client/active/propaTradition.png')"  class="full-img"></image>
      </div>
      <div class="propa-settlement">
        <image  :src="$getDomain('/static/client/active/propaSettlement.png')" class="full-img"></image>
      </div>

      <div class="propa-propaTitle">
        <image   :src="$getDomain('/static/client/active/propaTitle.png')" class="full-img"></image>
      </div>

      <div class="propa-live">
        1、<span class="c-0032BA fz-bold">直播带货：</span> 毋庸置疑，直播带货是今年最火的销售方式，没有之一，及贝直播带货，打造购物下单闭环，稳定提升销量，打造店铺爆品
      </div>
      <div class="propa-live-img">
        <image :src="$getDomain('/static/client/active/propaLive.png')" class="full-img"></image>
      </div>

      <div class="propa-live">
        2、<span class="c-0032BA fz-bold">营销功能强大：</span> 会员卡储值、秒杀、拼团、预约配送、自动打印小票等几百项实用集引流、转化、复购等功能
      </div>
      <div class="propa-Marketing-img">
        <image  :src="$getDomain('/static/client/active/propaMarketing.png')" class="full-img"></image>
      </div>

      <div class="propa-live" style="margin-bottom: 38rpx">
        3、<span class="c-0032BA fz-bold">客户沉淀：</span> 客户咨询或购买会员卡，都会沉淀到店铺里，可随时进行信息推送，进行二次转化
      </div>

      <div class="propa-Kehu">
        <image  :src="$getDomain('/static/client/active/propaKehu.png')" class="full-img"></image>
      </div>

      <div class="propa-live" style="margin-bottom: 60rpx">
        4、 <span class="c-0032BA">零抽成、零手续费，赚的钱都是你的</span>
      </div>
      <div class="propa-live" style="margin-bottom: 70rpx">
        5、<span class="c-0032BA fz-bold">微信生态：</span> 依托于微信强大的生态，海量的用户，便捷的分享渠道，都是提升营业额的不二法宝
      </div>

      <div class="propa-youshi">
        <image  :src="$getDomain('/static/client/active/propaYoushi.png')" class="full-img"></image>
      </div>
      <div class="propa-active">
        <image  :src="$getDomain('/static/client/active/propaActive.png')" class="full-img"></image>
      </div>

    </div>
    <img class="img-logo-bottom " :src="$getDomain('/static/images/jbay/logo/100_nocolor_zi.png')"/>
    <div class="logo-text">
      专注商家自营配送平台
    </div>

    <div style="height: 140rpx;width: 750rpx;"></div>
    <div class="active-last-fixed">
      <div class="active-bottom-fixed flex flex-vertical-c flex-justify-between">

        <div class="fz-14 c3" style="line-height: 60rpx">
            <span>
              首月特惠<span class="c-FF0101 m-l-2 m-r-2">¥</span>
            </span>
          <span class="c-FF0101 fz-18">
              19.8
            </span>
          <span class="m-l-12">
              续费<span class="c-FF0101  m-l-2 m-r-2">¥</span>
            </span>
          <span class="c-FF0101 fz-18">
              56.6
            </span>
          <span>
              /月
            </span>
        </div>
        <div class="last-btn" @click="buyActiveCodeFn(0)">
          立即激活
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import layoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import { buyActiveCode } from '@/api/order'
import Pay from '@/common/Pay'
import { error, toast, showLoading, hideLoading } from '@/common/fun'
import Promisify from '@/common/Promisify'
import { isWeiXin, urlencode, GetQueryByString } from '@/common/helper'
import Storage from '@/common/Storage'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip
  },
  data () {
    return {
      order_id: '',
      code: ''
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    }
  },
  methods: {
    paySuccessCall () {
      // #ifdef H5
      this.code = ''
      // #endif
      toast('支付成功')
      const _self = this
      const url = '/pagesA/active/ActivationCodeSuccess?order_id=' + this.order_id
      setTimeout(function () {
        _self.$linkTo(url)
      }, 1000)
    },
    payFailCall (err) {
      // #ifdef H5
      this.code = ''
      // #endif

      const { msg, errMsg } = err
      if (errMsg === 'requestPayment:fail cancel') {
        error('用户取消支付')
        return
      }

      error(msg || '支付失败')
    },
    async $_init_wxpay_env () {
      const initData = this.initData

      const login_methods = initData.login_methods
      const component_appid = login_methods.component_appid

      let channel = null

      // 根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
      // 而且状态可以灵活控制 state为1
      for (var i in login_methods) {
        // && login_methods[i].state ??状态呢？
        if (i !== 'component_appid' && login_methods[i].state) {
          channel = ['wx_mp'].indexOf(login_methods[i].type) === -1 ? {
            ...login_methods[i]
          } : {
            ...login_methods[i],
            component_appid
          }
          break
        }
      }

      if (!channel) {
        this.$error('未开通公众号支付')
        return false
      }

      // 如果url有code去掉
      let {
        origin,
        pathname,
        search,
        hash
      } = window.location
      const strArr = []
      if (search.indexOf('code') !== -1) {
        const tempArr = search.split('&')
        for (var j of tempArr) {
          // 过滤多余的参数
          if (j.indexOf('code') === -1 && j.indexOf('state') === -1 && j.indexOf('appid') === -1) {
            strArr.push(j)
          }
        }
        let newSearchStr = strArr.join('&')
        if (newSearchStr.indexOf('?') === -1) {
          newSearchStr = '?' + newSearchStr
        }

        search = newSearchStr
      }

      const REDIRECT_URI = urlencode(origin + pathname + search + hash)

      let wxAuthUrl = null

      if (channel.component_appid) {
        // 服务商模式登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`
      } else {
        // 公众号自己的appid用于登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      }

      window.location.href = wxAuthUrl
    },
    async buyActiveCodeFn (codeFn) {
      try {
        const _self = this
        const data = {}
        let pay_type = 'wx_lp'
        // #ifdef H5

        if (!isWeiXin()) {
          pay_type = 'wx_h5'
        } else {
          // const isHasCode = this.code
          // if (!isHasCode) {
          if (codeFn != 1) {
            this.code = ''
            this.$_init_wxpay_env()
            return
          }
          data.code = this.code
          Storage.set('codePay', this.code)

          pay_type = 'wx_mp'
        }
        showLoading()
        await buyActiveCode(data).then(res => {
          hideLoading()
          this.order_id = res.data.order_id
          Pay(_self, pay_type, res)
        }).catch(e => {
          error(e.msg || '获取code错误')
          setTimeout(function () {
            hideLoading()
          }, 2000)
        })
        // #endif
        // #ifdef MP-WEIXIN
        // 获取code

        const wxLoginRt = await Promisify('login').catch(() => {
          throw Error('微信login错误')
        })
        const { code } = wxLoginRt
        await buyActiveCode({ code }, { tip: '加载中' }).then(res => {
          this.order_id = res.data.order_id
          Pay(_self, pay_type, res)
        }).catch(e => {
          error(e.msg || '获取code错误')
        })
        // #endif
      } catch (e) {
        console.log(e)
        error(e.message)
      }
    }
  },
  created () {
    // #ifdef H5
    if (isWeiXin()) {
      this.code = GetQueryByString(location.href, 'code')
      const code = Storage.get('codePay')

      if (this.code && this.code != code) {
        this.buyActiveCodeFn(1)
      } else {
        this.code = ''
      }
    }
    // #endif
  }

}
</script>
<style lang="scss" scoped>
  .page-wrap {
    height: 100vh;
    box-sizing: border-box;
    background-color: #3271f7;
    padding-top: 84rpx;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .c-F7D81B {
    color: #f7d81b !important;
  }

  .c-0032BA {
    color: #0032BA !important;
  }
  .c-FF0101 {
    color: #FF0101 !important;
  }
  .fz-bold{
    font-width: bold;
  }
  .propa-banner{
    width: 750rpx;
    height: 488rpx;
    margin-bottom: 50rpx;
  }
  .propa-bg{
    width: 710rpx;
    height: 4100rpx;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 74rpx;
  }
  .propa-tradition{
    width: 676rpx;
    height: 398rpx;
    margin-left: -12rpx;
    margin-bottom: 70rpx;
  }
  .propa-settlement{
    width: 678rpx;
    height: 526rpx;
    margin-left: -12rpx;
    margin-bottom: 70rpx;
  }
  .propa-propaTitle{
    width: 750rpx;
    height: 84rpx;
    margin-left: -20rpx;
    margin-bottom: 40rpx;
  }

  .propa-live{
    width: 610rpx;
    margin: 0 auto 30rpx;
    font-size: 26rpx;
    color: #111111;
    line-height: 40rpx;
  }
  .propa-live-img{
    width: 658rpx;
    height: 326rpx;
    margin-left: 22rpx;
    margin-bottom: 68rpx;
  }

  .propa-Marketing{

  }
  .propa-Marketing-img{
    width: 658rpx;
    height: 326rpx;
    margin-left: 22rpx;
    margin-bottom: 70rpx;
  }
  .propa-Kehu{
    width: 182rpx;
    height: 310rpx;
    margin: 0 auto 60rpx;
  }
  .propa-youshi{
    width: 696rpx;
    height: 508rpx;
    margin-left: -12rpx;
    margin-bottom: 70rpx;
  }
  .propa-active{
    width: 582rpx;
    height: 402rpx;
  }

  .full-img{
    width: 100%;
    height: 100%;
  }
  .active-fixed {
    height: 84rpx;
    width: 724rpx;
    padding-left: 26rpx;
    // box-sizing: border-box;
    background-color: #FFFFff;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;

    .img-logo {
      width: 100rpx;
      height: 50rpx;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    &-title {
      height: 50rpx;
      line-height: 50rpx;
      font-size: 26rpx;
      font-family: MF YueYuan Noncommercial;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }

  .last-text {
    width: 650rpx;
    margin: 0 auto 74rpx;
    font-size: 26rpx;
    line-height: 48rpx;
    color: #FFFFff;
  }

  .active-last-fixed {
    z-index: 9;
    width: 750rpx;
    height: 106rpx;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0rpx;
    bottom: 40rpx;
    // bottom: constant(safe-area-inset-bottom);
    // bottom: env(safe-area-inset-bottom);
  }

  .active-bottom-fixed {
    width: 700rpx;
    height: 106rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 24rpx 0px rgba(0, 0, 0, 0.5);
    border-radius: 50rpx;
    box-sizing: border-box;
    padding-left: 28rpx;
    padding-right: 36rpx;

  }

  .last-btn {
    width: 150rpx;
    height: 58rpx;
    line-height: 58rpx;
    text-align: center;
    font-size: 26rpx;
    color: #FFFFff;
    background: #3171F5;
    border-radius: 6rpx;
  }
  .img-logo-bottom{
    display: block;
    width: 68rpx;
    height: 38rpx;
    margin: 66rpx  auto 10rpx;
  }
  .logo-text{
    height: 24rpx;
    line-height: 24rpx;
    font-size: 24rpx;
    color: #FFFFff;
    margin-bottom: 36rpx;
    width: 750rpx;
    text-align: center;
  }

</style>
