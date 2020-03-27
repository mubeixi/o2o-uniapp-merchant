import T from '../common/i18n'

export default {

  data: {
    menuButtonInfo: {},
    systemInfo: {statusBarHeight: 0},
    diyHeadHeight: 0,
    diyHeadRight: 0,
    TT:{}
    // mixin: 'PageMin'
  },

  methods: {
    // 批量注册变量名称
    $restLangueAssign(arr) {
      for (var name of arr) {
        this[name] = wx.T._(name)
      }
    },
    // 语言
    $t(line, data) {
      return wx.T._(line, data)
    },
    // 切换语种
    $setLocale(code) {
      wx.T.setLocale(code)
    },
    mixintap () {
      this.mixin = 'MixinText' + (Math.random() + '').substring(3, 7)
      // console.log('mixin method tap')
    },
    tap () {
      // console.log('tap in mixin')
    }
  },
  created () {

    // console.log('created in mixin')
  },
  onLoad() {
    this.menuButtonInfo = wx.getMenuButtonBoundingClientRect()
    this.systemInfo = wx.getSystemInfoSync()
    const {height, top, left} = this.menuButtonInfo
    // this.diyHeadHeight = top + height

    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left

    // 可以自己根据配置，来注册语言包
    if (this.langues && Array.isArray(this.langues) && this.langues.length>0) {
      console.log(this.langues)
      this.$restLangueAssign(this.langues)
    }

    const locale = T.locale
    const locales = T.locales
    this.TT = locales[locale]

  }
}
