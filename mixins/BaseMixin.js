import {
  toast, linkTo, error, modal
} from '@/common/fun'
import T from '../common/langue/i18n'

export default {
  data () {
    return {
      menuButtonInfo: {},
      systemInfo: { statusBarHeight: 0 },
      diyHeadHeight: 0,
      diyHeadRight: 0,
      TT: {}
    }
  },
  methods: {
    $noop: () => {},
    $toast: toast,
    $error: error,
    $modal: modal,
    $linkTo: linkTo,
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
    }
  },
  onLoad () {
	  // #ifdef MP-WEIXIN
	   this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	  // #endif
    this.systemInfo = uni.getSystemInfoSync()
    //const { height, top, left } = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    //this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    //this.diyHeadRight = this.systemInfo.windowWidth - left

    // 可以自己根据配置，来注册语言包
    if (this.langues && Array.isArray(this.langues) && this.langues.length > 0) {
      console.log(this.langues)
      this.$restLangueAssign(this.langues)
    }

    const locale = T.locale
    const locales = T.locales
    this.TT = locales[locale]
  }
}
