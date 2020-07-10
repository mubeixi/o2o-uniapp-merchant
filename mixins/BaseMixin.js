import { backFunc, cellPhone, error, linkToEasy, modal, openLocation, toast } from '@/common/fun'
import T from '../common/langue/i18n'
import Storage from '@/common/Storage'
import { checkIsLogin, getDomain, toGoodsDetail, emptyObject } from '@/common/helper'
import eventHub from '@/common/eventHub'
// #ifdef H5
import { WX_JSSDK_INIT } from '@/common/env'
// #endif
import { sendAnalysisData } from '@/api/common'

const Analysis = {
  data () {
    return {
      currentPageName: '',
      analysisExt: {}// 额外参数，每个页面自己可以随便添加，会上传的
    }
  },
  onLoad (options) {
    this.analysisExt.options = options// JSON.stringify(options)
  },
  onShow () {
    // #ifdef H5
    // let events = []
    //
    // rrweb.record({
    //   emit (event) {
    //     // 将 event 存入 events 数组中
    //     // events.push(event)
    //   }
    // })
    //
    // // save 函数用于将 events 发送至后端存入，并重置 events 数组
    // function save () {
    //   const body = JSON.stringify(events)
    //
    //   events = []
    //   const postData = { func: body }
    //   postData.User_ID = get_User_ID()
    //   postData.Users_ID = get_Users_ID() // Users_ID  写死
    //   postData.env = GET_ENV()
    //
    //   uni.request({
    //     header: { 'content-type': 'application/x-www-form-urlencoded' },
    //     url: '/node/debug',
    //     method: 'post',
    //     data: emptyObject(postData),
    //     success: (res) => {
    //     }
    //
    //   })
    // }
    //
    // save()
    // // /每 10 秒调用一次 save 方法，避免请求过多
    // setInterval(save, 10 * 1000)
    // #endif
  },
  // onTabItemTap (onTabItemTap) {
  //   const { pagePath, index, text } = onTabItemTap
  //
  //   const res = uni.getSystemInfoSync()
  //   const fullWidth = res.screenWidth
  //   const fullHeight = res.screenHeight
  //
  //   const x = fullWidth / 5 * (index + 1.5)// 这样坐标就是正中间了
  //   const y = fullHeight - 25// 正好50px底部
  //
  //   // 合并内容
  //   // Object.assign(this.analysisExt,{onTabItemTap})
  //   this.analysisExt.onTabItemTap = JSON.stringify(onTabItemTap)
  //
  //   this.currentPageName = ls.get('temp_tab_url')
  //   this.commonClick({
  //     target: {
  //       x,
  //       y,
  //       view_type: 'tap'
  //     }
  //   })
  //
  //   ls.set('temp_tab_url', pagePath)
  // },
  methods: {
    commonClick (evt) {
      // 坐标
      const { x, y, view_type = 'tap' } = evt.target

      const d = new Date()
      //,
      const postData = {
        view_type,
        router: this.currentPageName,
        y_coordinate: y,
        x_coordinate: x,
        _timeStamp: parseInt(d.getTime() / 1000)
      }

      if (!emptyObject(postData, 1)) return// 距离和坐标是肯定要有的

      Object.assign(postData, this.analysisExt.options)
      const owner_id = Storage.get('owner_id')
      if (owner_id) {
        postData.owner_id = owner_id
      }

      let history = Storage.get('analysis')
      if (!history) history = []
      history.push(postData)
      Storage.set('analysis', history)

      sendAnalysisData(postData).then(res => {}).catch(e => {})
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      const currentPageInstance = getCurrentPages()
      const currentPageName = currentPageInstance[currentPageInstance.length - 1].route
      if (!currentPageName) return
      this.currentPageName = currentPageName

      // 进入页面
      this.commonClick({
        target: {
          x: 0,
          y: 0,
          view_type: 'enter'
        }
      })
    }).catch(() => {})
  }
}
export default {
  mixins: [Analysis], // 启用统计
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
    $filterPrice: (price) => {
      if (isNaN(price)) return 0
      if (!price) return 0
      return parseInt(Number(price) * 100) / 100
    },
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
    getCurrentPageRoute () {
      const pageInstanceList = getCurrentPages()
      const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
      return currentPagePath
    },
    // #ifdef H5
    WX_JSSDK_INIT
    // #endif
  },
  onShow () {
    // 这个机制还是要onShow 兼容返回的情况
    Storage.set('currentPagePath', this.getCurrentPageRoute())// 标记当前的页面，这样就不会每个事件都响应了
    this.currentPagePath = this.getCurrentPageRoute()
  },
  onReady () {
    uni.$on('IM_EVENT', (res) => {
      // console.log(res)
    })

    uni.$on('IM_TAKE_MSG', async (res) => {
      // 只有当前页面响应
      console.log(Storage.get('currentPagePath'), this.currentPagePath)
      if (Storage.get('currentPagePath') === this.currentPagePath) {
        // console.log(res, this.$refs, this.$refs.hasOwnProperty('wzwImTip'))
        if (this.$refs.hasOwnProperty('wzwImTip')) this.$refs.wzwImTip.show(res)

        if (typeof this.refreshTabTag === 'function') this.refreshTabTag()
      }
    })
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

/**
 * tabbar页面专用
 * @type {{methods: {setTabBarIndex(*=): void}}}
 */
export const tabbarMixin = {
  methods: {
    async refreshTabTag () {
      // console.log(this.$mp)
      if (!eventHub.imInstance) return
      const count = await eventHub.imInstance.getNoReadMsgCount()
      if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
        // console.log('更新IM下标数量' + count)
        this.$mp.page.getTabBar().setData({
          tags: [0, count, 0, 0, 0]
        })
      }
    },
    setTabBarIndex (index) {
      if (typeof this.$mp.page.getTabBar === 'function' && this.$mp.page.getTabBar()) {
        this.$mp.page.getTabBar().setData({
          selected: index
        })
      }
    }
  }
}

export const componetMixin = {
  data () {
    return {
      menuButtonInfo: {},
      systemInfo: {
        statusBarHeight: 0,
        windowHeight: 0
      },
      diyHeadHeight: 0,
      diyHeadRight: 0
    }
  },
  methods: {
    $getDomain: getDomain,
    $openLocation: openLocation,
    $cellPhone: cellPhone,
    $back: backFunc,
    $filterPrice: (price) => {
      if (isNaN(price)) return 0
      if (!price) return 0
      return parseInt(Number(price) * 100) / 100
    },
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
    }
  },
  onReady () {
    this.systemInfo = uni.getSystemInfoSync()

    // #ifdef MP-WEIXIN
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left } = this.menuButtonInfo
    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif
  }
}
