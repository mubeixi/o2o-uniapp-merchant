import { backFunc, cellPhone, error, linkToEasy, modal, openLocation, toast } from '@/common/fun'
import T from '../common/langue/i18n'
import Storage from '@/common/Storage'
import { checkIsLogin, getDomain, toGoodsDetail } from '@/common/helper'
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
    async default_init_func (options) {
      let owner_id = null; let users_id = null
      owner_id = options.owner_id
      if (owner_id >= 0) {
        Storage.set('owner_id', owner_id)
      }

      users_id = options.users_id || Storage.get('users_id')

      if (!users_id) {
        uni.showModal({
          title: '提示',
          content: '缺少商户id'
        })
        return
      }

      // 如果连接里面已经有了，就不需要搞事
      if (users_id) {
        // 不管ls有没有，都存一次
        Storage.set('users_id', users_id)
      }
    },
    // #ifdef H5
    WX_JSSDK_INIT
    // #endif
  },
  onLoad (options) {
    const opt = { ...options }
    // 这样简洁多了
    this.default_init_func(opt)
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
