import { backFunc, cellPhone, error, linkToEasy, modal, openLocation, toast} from '@/common/fun'
import T from '../common/langue/i18n'

import { checkIsLogin, getDomain,toGoodsDetail } from '@/common/helper'
// #ifdef H5
import { WX_JSSDK_INIT } from '@/common/env'
// #endif

export default {
  data () {
    return {
      menuButtonInfo: {},
      systemInfo: {
        statusBarHeight: 0,
        windowHeight: 0
      },
      diyHeadHeight: 0,
      diyHeadRight: 0,
      TT: {}
    }
  },
  computed: {
  },
  methods: {
    $getDomain: getDomain,
    $openLocation: openLocation,
    $cellPhone: cellPhone,
    $back: backFunc,
    $noop: () => {},
    $toast: toast,
    $error: error,
    $modal: modal,
    $linkTo: linkToEasy,
    $toGoodsDetail: toGoodsDetail,
    $checkIsLogin: checkIsLogin,
    $openPop (name) {
      this.$refs[name].show()
    },
    $closePop (name) {
      this.$refs[name].close()
    },
    // 批量注册变量名称
    $restLangueAssign (arr) {
      for (var name of arr) {
        this[name] = uni.T._(name)
      }
    },
    // 语言
    $t (line, data) {
      return uni.T._(line, data)
    },
    // 切换语种
    $setLocale (code) {
      uni.T.setLocale(code)
    },
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap () {
      // console.log('tap in mixin')
    },
    // #ifdef H5
    WX_JSSDK_INIT
    // #endif
  },
  onLoad () {

  },
  created () {
    this.systemInfo = uni.getSystemInfoSync()
    // #ifdef MP-WEIXIN
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left } = this.menuButtonInfo
    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif

    // 可以自己根据配置，来注册语言包
    if (this.langues && Array.isArray(this.langues) && this.langues.length > 0) {
      console.log(this.langues)
      this.$restLangueAssign(this.langues)
    }
    const locale = T.locale
    const locales = T.locales
    this.TT = locales[locale]
  },
  // 自定义小程序分享
  onShareAppMessage () {

  }
}
