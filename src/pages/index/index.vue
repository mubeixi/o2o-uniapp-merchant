<template>
  <div class="page-wrap" @click="bindFullClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <layout-page-loading :show="isShowFullLoading"></layout-page-loading>
    <block v-if="topTheme==='default'">
      <div @touchmove.stop.prevent
           :style="{height:menuButtonInfo.height+'px',width:menuButtonInfo.height+'px',paddingLeft:menuButtonInfo.height/2+'px',paddingRight:menuButtonInfo.height/3+'px',top:menuButtonInfo.top+'px',right:diyHeadRight+10+'px'}"
           @click="$linkTo('/pages/search/index')" class="search-box">
        <layout-icon display="inline" class="iconsearch" color="#fff" size="18" weight="bold" type="iconicon-search"></layout-icon>
      </div>
      <div @touchmove.stop.prevent :style="{backgroundColor:primaryColor,paddingTop:menuButtonInfo.top+'px'}" class="head-box" style="height: 50px;">
        <div style="height: 36px;" :style="{marginRight:diyHeadRight+menuButtonInfo.height+'px'}" class="head">
          <ul class="tab-box">
            <li :class="[headTabIndex === 0?'active':'']" @click="setHeadTabIndex(0)" class="tab-item" id="headTabItem0">
              <div class="tab-item-text" :animation="tabAnimationData[0]">特价</div>
              <div class="tab-item-tip" id="tabItemTip0"></div>
            </li>
            <li :class="[headTabIndex === 1?'active':'']" @click="setHeadTabIndex(1)" class="tab-item" id="headTabItem1">
              <div class="tab-item-text" :animation="tabAnimationData[1]">同城闪送</div>
              <div class="tab-item-tip" id="tabItemTip1"></div>
            </li>
            <li :class="[headTabIndex === 2?'active':'']" @click="setHeadTabIndex(2)" class="tab-item" id="headTabItem2">
              <div class="tab-item-text" :animation="tabAnimationData[2]">好店</div>
              <div class="tab-item-tip" id="tabItemTip2"></div>
            </li>
            <span :animation="tabUnderlineAnimationData" :style="{marginLeft:defaultUnderlineLeft+'px'}"
                  class="page-tab-underline" v-show="showUnderLine"></span>
          </ul>

        </div>
      </div>
      <!--占位-->
      <!--<div @touchmove.stop.prevent :style="{height:menuButtonInfo.top+50+'px'}" style="background-color: #26C78D"></div>-->
      <div :style="{top:menuButtonInfo.top+50+'px'}" class="main tab-container">
        <scroll-view @scrolltolower="bindGetMore(0)" class="tab-page-wrap" lower-threshold="1" scroll-y v-show="headTabIndex===0">
          <scroll-page-hot ref="page0" @hotLoadDone="hotLoadDoneFn" ></scroll-page-hot>
        </scroll-view>
        <scroll-view @scrolltolower="bindGetMore(1)" class="tab-page-wrap" lower-threshold="1" scroll-y v-show="headTabIndex===1">
          <scroll-page-local ref="page1"  @hotLoadDone="hotLoadDoneFn"></scroll-page-local>
        </scroll-view>
        <scroll-view @scrolltolower="bindGetMore(2)" class="tab-page-wrap" lower-threshold="1" scroll-y v-show="headTabIndex===2">
          <scroll-page-merchat ref="page2"  @hotLoadDone="hotLoadDoneFn"></scroll-page-merchat>
        </scroll-view>
      </div>

      <layout-modal :autoClose="false" ref="openLocalSettingModal">
        <div class="refuseApplyDialog">
          <div class="c3 fz-16 modal-title">
            是否开启定位
          </div>
          <div class="fz-14 m-b-20 m-t-10 c9">
            很抱歉，该功能必须基于地理位置提供商品检索，您需开启地理位置授权才可以使用该功能
          </div>
          <div class="control flex flex-justify-between flex-justify-c">
            <button @click="$closePop('openLocalSettingModal')" class="action-btn btn-cancel" size="mini">取消</button>
            <button @opensetting="bindOpenSetting" class="btn-sub action-btn" open-type='openSetting' size="mini">确定
            </button>
          </div>
        </div>
      </layout-modal>
    </block>

    <block v-if="topTheme==='none'">
      <layout-page-title :show-left-icon="false" :extStyle="'padding-bottom:10px;background:#fff;'" :page-title="diyTitle"></layout-page-title>
      <!--@scrolltolower="bindGetMore(0)"-->
      <scroll-view class="full-diy-wrap" lower-threshold="1" scroll-y :style="{top:menuButtonInfo.bottom+10+'px'}">
        <scroll-page-hot @hotLoadDone="hotLoadDoneFn" ref="pagenone" :full-diy="true"></scroll-page-hot>
      </scroll-view>
    </block>

<!--    <div class="location-btn-box">-->
<!--      <div class="location-btn-wrap">-->
<!--        <image src="/static/home/local-btn-preview.png" :animation="localAnimateByPreview" @click="toMerchant" class="fun-location-btn location-btn-preview" v-if="initData.switch_location"></image>-->
<!--        <div :animation="localAnimateByPreview" @click="toMerchant" class="fun-location-btn location-btn-preview" v-if="initData.switch_location">-->
<!--          <layout-icon color="#fff" display="inline" size="20" type="iconicon-address"></layout-icon>-->
<!--          <div class="fz-8 color-white">查看位置</div>-->
<!--        </div>-->

<!--        <image src="/static/home/local-btn-local.png" :animation="localAnimateByLocal" @click="toMerchant" class="fun-location-btn location-btn-local" v-if="initData.switch_location"></image>-->
<!--        <div :animation="localAnimateByLocal" @click="toMerchant" class="fun-location-btn location-btn-local" v-if="initData.switch_location">-->
<!--          <layout-icon color="#fff" display="inline" size="20" type="iconicon-address"></layout-icon>-->
<!--          <div class="fz-8 color-white">当前位置</div>-->
<!--        </div>-->
<!--        <image src="/static/home/local-btn-change.png" :animation="localAnimateByChange" @click="handleSetLocation" class="fun-location-btn location-btn-change" v-if="initData.switch_location"></image>-->
<!--        <div :animation="localAnimateByChange" @click="handleSetLocation" class="fun-location-btn location-btn-change" v-if="initData.switch_location">-->
<!--          <layout-icon color="#fff" display="inline" size="20" type="iconicon-address"></layout-icon>-->
<!--          <div class="fz-8 color-white">修改位置</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div @click="taggleOpenLocationComp" :animation="localAnimate" class="location-btn" v-if="initData.switch_location">-->
<!--      <layout-icon color="#fff" display="inline" size="24" type="iconicon-address"></layout-icon>-->
<!--      &lt;!&ndash;<div class="fz-10 color-white">发布活动</div>&ndash;&gt;-->
<!--    </div>-->
    <image src="/static/home/local-btn.png" @click="handleSetLocation" :animation="localAnimate" class="location-btn" v-if="initData.switch_location"></image>
    <div class="location-tooltip-wrap" v-if="showFormattedAddress && initData.switch_location && formatted_address">
      <div class="location-tooltip-conent">当前位置：{{formatted_address}} <span class="text-underline p-l-4">点此切换</span>
        <!--<layout-icon color="rgba(0,0,0,.7)" display="inline" class="iconright" type="iconright"></layout-icon>-->
<!--        <image src="/static/home/local-arrow-right.png" class="iconright"></image>-->
        <image src="/static/home/local-arrow-down.png" class="iconbottom"></image>
      </div>

    </div>
    <div @click="toMerchant" class="publish-btn">
      <layout-icon color="#fff" display="inline" size="18" type="iconfabu"></layout-icon>
      <div class="fz-10 color-white">发布活动</div>
    </div>

<!--    <div @click="toLiveList" class="live-btn" v-if="initData.live_flag">-->
<!--      <div class="live-icon">-->
<!--        <layout-icon color="#fff" display="inline" size="20" type="icon15"></layout-icon>-->
<!--      </div>-->
<!--      <div class="fz-10 color-white">直播</div>-->
<!--    </div>-->

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { error, hideLoading, modal, showLoading } from '@/common/fun'
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import ScrollPageHot from '@/pages/index/components/scroll-page-hot'
import ScrollPageLocal from '@/pages/index/components/scroll-page-local'
import ScrollPageMerchat from '@/pages/index/components/scroll-page-merchat'
import Promisify from '@/common/Promisify'
import LayoutModal from '@/components/layout-modal/layout-modal'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import Storage from '@/common/Storage'
import { getLocationByCoordinate, getSkinConfig } from '@/api/common'
import LayoutLoading from '@/components/layout-loading/layout-loading'
import LayoutPageTitle from '@/components/layout-page-title/layout-page-title'
import { Exception } from '@/common/Exception'
import { emptyObject } from '@/common/helper'
import LayoutPageLoading from '@/components/layout-page-loading/layout-page-loading'

// 动画时间
const locationBtnAnimationDuration = 300
/**
 * 定位按钮创建动画工具函数
 * @param x
 * @param y
 * @param opacity
 * @param duration
 * @param timingFunction
 * @returns {*}
 */
function createdLocationBtnAnimation ({ x, y, rotate = 0, opacity, duration, timingFunction = 'ease-in-out' }) {
  var animation = uni.createAnimation({
    duration,
    timingFunction
  })
  animation.translateX(x).translateY(y).rotate(rotate).opacity(opacity).step()
  return animation.export()
}

export default {
  mixins: [BaseMixin, tabbarMixin],
  components: {
    LayoutPageLoading,
    LayoutPageTitle,
    LayoutLoading,
    WzwImTip,
    LayoutModal,
    ScrollPageMerchat,
    ScrollPageLocal,
    ScrollPageHot,
    LayoutIcon
  },
  computed: {
    // initData () {
    //   return this.$store.getters['system/initData']
    // },
    userAddressInfo () {
      return this.$store.getters['user/getUserAddressInfo']()
    },
    ...mapGetters({
      primaryColor: 'theme/pimaryColor'
    })
  },
  data () {
    return {
      navIndex:0,//开始加载 同城 闪送  好店
      isShowFullLoading: false,
      showFormattedAddress: false,
      formatted_address: '',
      localAnimate: {},
      localAnimateByPreview: {},
      localAnimateByLocal: {},
      localAnimateByChange: {},
      init_location_ing: false,
      initData: {},
      loadingByTmpl: false, // 标记是否请求完结
      templateList: [],
      templateData: [],
      tagIndex: 0,
      topTheme: '',
      diyTitle: '',
      locationCompExpandIng: false, // 在动画期间，不允许点击
      locationCompExpand: false, // 默认不展开

      /** 疯狂hack **/
      getLocationDone: false,
      showUnderLine: false,
      defaultUnderlineLeft: 0,
      tabDom: [{}, {}, {}],
      tabUnderlineAnimationData: {},
      tabAnimationData: [{}, {}, {}],
      /** 疯狂hack **/
      headTabIndex: 0
    }
  },
  watch: {
    headTabIndex: {
      immediate: true,
      handler (idx, oldIdx) {
        if (idx !== oldIdx) {
          if (oldIdx === undefined) return
          var underlineAnimation = uni.createAnimation({
            duration: 300,
            timingFunction: 'ease'
          })

          setTimeout(() => {
            const query = uni.createSelectorQuery()
            query.select(`#tabItemTip${idx}`).boundingClientRect(data => {
              // 正下方
              underlineAnimation.width('18px').left(data.left - 10 - 4).step()
              underlineAnimation.width('8px').step()
              this.tabUnderlineAnimationData = underlineAnimation.export()
            }).exec()
          }, 0)
        }
      }
    }
  },
  methods: {
    bindFullClick () {
      if (this.locationCompExpand) this.taggleOpenLocationComp()
    },
    taggleOpenLocationComp () {
      const rate = 0.8
      if (this.locationCompExpandIng) return
      if (this.locationCompExpand) {
        this.localAnimateByPreview = createdLocationBtnAnimation({ x: 0, y: 0, duration: locationBtnAnimationDuration, opacity: 0 })
        this.localAnimateByChange = createdLocationBtnAnimation({ x: 0, y: 0, duration: locationBtnAnimationDuration, opacity: 0 })
        this.localAnimateByLocal = createdLocationBtnAnimation({ x: 0, y: 0, duration: locationBtnAnimationDuration, opacity: 0 })
        this.localAnimate = createdLocationBtnAnimation({ rotate: 0, duration: locationBtnAnimationDuration, opacity: 1 })
        setTimeout(() => {
          this.locationCompExpand = false
          this.locationCompExpandIng = false
        }, locationBtnAnimationDuration)
      }

      if (!this.locationCompExpand) {
        this.localAnimateByPreview = createdLocationBtnAnimation({ x: -49 * 2 * rate, y: 0, duration: locationBtnAnimationDuration, opacity: 1 })
        this.localAnimateByChange = createdLocationBtnAnimation({ x: 0, y: -49 * 2 * rate, duration: locationBtnAnimationDuration, opacity: 1 })
        var distanceX = Math.sqrt(2) / 2 * 49 * 2
        this.localAnimateByLocal = createdLocationBtnAnimation({ x: -distanceX * rate, y: -distanceX * rate, duration: locationBtnAnimationDuration, opacity: 1 })
        this.localAnimate = createdLocationBtnAnimation({ rotate: 360, duration: locationBtnAnimationDuration, opacity: 1 })

        setTimeout(() => {
          this.locationCompExpand = true
          this.locationCompExpandIng = false
        }, locationBtnAnimationDuration)
      }
    },
    toLiveList () {
      this.$linkTo('/pagesA/live/liveList')
    },
    toMerchant () {
      const users_id = Storage.get('users_id') || ''
      let url = ''
      if (!users_id) {
        error('缺少users_id')
        return
      } else {
        url = 'pages/product/form?origin_type=client&users_id=' + users_id
      }
      if (!this.initData.merchant_appid) {
        error('缺少参数merchant_appid')
        return
      }
      uni.navigateToMiniProgram({
        appId: this.initData.merchant_appid,
        path: url,
        extraData: {
          origin: 'client'
        },
        envVersion: 'release',
        fail (err) {
          console.log(`跳转失败${err.errMsg}`)
        },
        success (res) {
          // 打开成功
        }
      })
    },
    bindOpenSetting () {
      uni.getSetting({
        success: (res) => {
          console.log('bindOpenSetting susscess', res)
          if (res.authSetting['scope.userLocation']) {
            this._init_location().then(() => {
              this.$refs.openLocalSettingModal.close()

              // 这个地方，只有后两个tab才会出现这个问题，所以可以直接用这样写

              this.$refs.page1.manualFlashLocation()
              this.$refs.page2.manualFlashLocation()

              if (this.headTabIndex === 0) {
                this.isShowFullLoading = true
              }
              if (this.topTheme === 'default') this.$refs.page0.manualFlashLocation()
              if (this.topTheme === 'none') this.$refs.pagenone.manualFlashLocation()
            }).catch(() => {})

            // if (!Storage.get('location_id') && !this.init_location_ing) {
            //
            // }
          }
        }
      })
    },
    async setHeadTabIndex (idx) {
      this.defaultUnderlineLeft = 0 // 没有左边距了
      this.headTabIndex = idx

      console.log(Storage.get('location_id'), Storage.get('current_lat'), Storage.get('current_lng'))
      // 有位置的前提下
      if (Storage.get('location_id') && Storage.get('current_lat') && Storage.get('current_lng')) {
        if (idx === 1) this.$refs.page1.manualInitFunc()
        if (idx === 2) this.$refs.page2.manualInitFunc()
        if (idx === 0) {
          if (this.topTheme === 'default') this.$refs.page0.manualInitFunc()
          if (this.topTheme === 'none') this.$refs.pagenone.manualInitFunc()
        }
      } else {
        // 首屏不给面子没问题
        if (idx === 0) {
          if (this.topTheme === 'default') this.$refs.page0.manualInitFunc()
          if (this.topTheme === 'none') this.$refs.pagenone.manualInitFunc()
          return
        }
        // 拿一次设备
        await this._init_location().then(res => {
          if (res !== false) {
            if (idx === 1) this.$refs.page1.manualInitFunc()
            if (idx === 2) this.$refs.page2.manualInitFunc()
            // if (idx === 0) {
            //
            // }
          }
          // 错了就弹出这个，不管三七二十一
          if (res === false) {
            this.$refs.openLocalSettingModal.show()
          }
        }).catch(err => {
          // 获取位置错了
        })
      }

      // if (idx > 0 && (!this.userAddressInfo || JSON.stringify(this.userAddressInfo === '{}'))) {
      //
      // }
    },
    getUserLocation () {
      uni.getLocation({
        type: 'wgs84',
        success: (res) => {
          console.log('当前位置的经度：' + res.longitude)
          console.log('当前位置的纬度：' + res.latitude)

          this.setUserAddressInfo(res)
          this.getLocationDone = true
          const isRefresh = Storage.get('isRefresh')
          if (isRefresh) return
          Storage.set('isRefresh', true)
          if (this.headTabIndex === 1) {
            this.$refs.page1.refreshByLocal()
          }
          if (this.headTabIndex === 2) {
            this.$refs.page2.refreshByLocal()
          }

          // if (this.getLocationDone) return
          // 另外两个组件，刷新数据
        }
      })
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
    },
    async get_tmpl_data () {
      try {
        const { Home_Json: resultData } = await getSkinConfig({}, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取首页模板失败')
        })

        const mixinData = typeof resultData === 'string' ? JSON.parse(resultData) : resultData

        console.log(mixinData,"mixinData")
        const { plugin: templateData, system } = mixinData

        const { topTheme = 'default', title = '' } = system

        this.topTheme = topTheme
        this.diyTitle = title

        // 默认皮肤顶部可以为白
        if (this.topTheme === 'default') {
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#eeeeee'
          })
        }

        return true
      } catch (e) {
        return e
      }
    },
    async _init_func () {
      // this.loadingByTmpl = true
      await this.get_tmpl_data()
      // this.loadingByTmpl = false
    },
    bindGetMore (idx) {
      console.log(idx)
      this.$refs[`page${idx}`].bindReachBottom()
    },
    /**
     * 手动获取位置
     * @returns {Promise<void>}
     * @private
     */
    async handleSetLocation () {
      try {
        var conf = { latitude: Storage.get('current_lat'), longitude: Storage.get('current_lng') }
        emptyObject(conf)
        console.log('conf is', conf)

        await Promisify('authorize', { scope: 'scope.userLocation' }).catch((err) => {
          this.$refs.openLocalSettingModal.show()
          console.log(err)
          throw Error('nocare')
        })

        // wx.openLocation({
        //   ...conf
        // })
        const { latitude: lat, longitude: lng } = await Promisify('chooseLocation', conf).catch(err => {
          if (err.errMsg === 'chooseLocation:fail cancel') throw Error('nocare')
          throw err
        })
        console.log(lat, lng)
        Storage.set('current_lat', lat)
        Storage.set('current_lng', lng)
        if (this.headTabIndex === 0) {
          this.isShowFullLoading = true
        }
        const { location_id, formatted_address, area_name } = await getLocationByCoordinate({ lat, lng, provider: 1 }).then(res => res.data).catch(err => Exception.handle(err))
        // 全部存起来
        Storage.set('location_id', location_id)
        Storage.set('formatted_address', formatted_address)
        this.formatted_address = formatted_address
        this.showFormattedAddress = true
        setTimeout(() => {
          this.showFormattedAddress = false
        }, 10000)
        Storage.set('area_name', area_name)

        this.$refs.page1.manualFlashLocation()
        this.$refs.page2.manualFlashLocation()

        if (this.topTheme === 'default') {
          this.$refs.page0.manualFlashLocation()
        }
        if (this.topTheme === 'none') {
          this.$refs.pagenone.manualFlashLocation()
        }

        return { location_id, lat, lng, formatted_address, area_name }
      } catch (e) {
        console.log(e)
        Exception.handle(e)
      }
    },

    /**
     * 打开获取定位才开始弄
     * @returns {Promise<void>}
     * @private
     */
    async _init_location ({ openDialog = false } = {}) {
      try {
        if (this.init_location_ing) {
          console.log('已经阻止重复启动_init_location')
          return
        }
        // 标记，不要和onshow里面重复调用
        this.init_location_ing = true

        await Promisify('authorize', { scope: 'scope.userLocation' }).catch((err) => {
          if (openDialog) this.$refs.openLocalSettingModal.show()
          console.log(err)
          throw Error('nocare')
        })

        const { latitude: lat, longitude: lng } = await Promisify('getLocation', { type: 'gcj02' }).catch(err => {
          console.log(err)
          throw Error('nocare')
        })
        console.log(lat, lng)
        // showLoading('更新位置', true)
        const { location_id, formatted_address, area_name } = await getLocationByCoordinate({ lat, lng, provider: 1 }).then(res => res.data).catch(err => Exception.handle(err))
        // 全部存起来
        Storage.set('current_lat', lat)
        Storage.set('current_lng', lng)
        Storage.set('location_id', location_id)
        Storage.set('formatted_address', formatted_address)
        this.formatted_address = formatted_address
		    this.showFormattedAddress = true
        setTimeout(() => {
          this.showFormattedAddress = false
        }, 10000)
        Storage.set('area_name', area_name)

        this.init_location_ing = false

        // hideLoading()
        return { location_id, lat, lng, formatted_address, area_name }
      } catch (e) {
        // hideLoading()
        this.$set(this, 'init_location_ing', false)
        console.log(this.init_location_ing)
        console.log(e)
        Exception.handle(e)
        return false
      }
    },
    hotLoadDoneFn () {
      this.isShowFullLoading = false
      // setTimeout(()=>{
      //
      // },5000)
    },
    ...mapActions({
      setUserAddressInfo: 'user/setUserAddressInfo'
    })
  },
  // onReachBottom () {
  //   if (this.headTabIndex === 0) this.$refs.page0.bindReachBottom()
  //   if (this.headTabIndex === 1) this.$refs.page1.bindReachBottom()
  //   if (this.headTabIndex === 2) this.$refs.page2.bindReachBottom()
  // },
  onLoad (options) {
      console.log(options,"optionsoptionsoptionsoptionsoptionsoptionsoptionsoptionsoptions")
    if(options.navIndex){
      this.navIndex=Number(options.navIndex)
    }
  },
  onHide () {
    if (this.topTheme === 'default') {
      this.$refs.page0.hookOnHide()
    }
    if (this.topTheme === 'none') {
      this.$refs.pagenone.hookOnHide()
    }
  },
  onShow () {
    this.setTabBarIndex(0)
    // 底部tabbar
    this.$store.dispatch('system/setTabActiveIdx', 0)
    this.refreshTabTag()

    if (this.topTheme === 'default') {
      this.$refs.page0.hookOnShow()
      // this.$refs.openLocalSettingModal.close()
      // if (this.headTabIndex > 0) {
      //   Promisify('authorize', { scope: 'scope.userLocation' }).then(() => {
      //     this.getUserLocation()
      //   }).catch(() => {
      //     this.$refs.openLocalSettingModal.show()
      //   })
      // }
    }

    if (this.topTheme === 'none') {
      this.$refs.pagenone.hookOnShow()
      // this.$refs.openLocalSettingModal.close()
      // if (this.headTabIndex > 0) {
      //   Promisify('authorize', { scope: 'scope.userLocation' }).then(() => {
      //     this.getUserLocation()
      //   }).catch(() => {
      //     this.$refs.openLocalSettingModal.show()
      //   })
      // }
    }
  },
  onReady () {
    if (this.topTheme === 'default') {
      const query = uni.createSelectorQuery()
      query.select('#tabItemTip0').boundingClientRect(data => {
        this.tabDom[0] = data
        this.defaultUnderlineLeft = data.left - 10 - 4
        this.showUnderLine = true
      }).exec()
      query.select('#tabItemTip1').boundingClientRect(data => {
        this.tabDom[1] = data
      }).exec()
      query.select('#tabItemTip2').boundingClientRect(data => {
        this.tabDom[2] = data
      }).exec()
    }
  },
  async created () {
    try {
      this.isShowFullLoading = true
      this.getLocationDone = false
      Storage.set('isRefresh', false)

      if (Storage.get('formatted_address')) {
        this.formatted_address = Storage.get('formatted_address')
        this.showFormattedAddress = true
        setTimeout(() => {
          this.showFormattedAddress = false
        }, 10000)
      }
      // 强制重新读取
      const initData = await this.$store.dispatch('system/loadInitData',{ isOnline: true }).catch(() => {})

      this.initData = initData
      console.log('this.initData is ', this.initData)
      if (this.initData.switch_location && !Storage.get('location_id')) {
        const rt = await this._init_location().catch(() => {})
        console.log(rt)
      }
      await this._init_func()
      this.getLocationDone = true
      await this.setHeadTabIndex(this.navIndex)
    } catch (e) {
      console.log(e)
      await this._init_func()
      this.getLocationDone = true
      await this.setHeadTabIndex(this.navIndex)
    }
  }
}
</script>
<style lang="scss" scoped>

  .live-icon {
    animation: zy 2.5s .15s linear infinite;
  }

  .page-wrap {
    background: #f8f8f8;
    height: 100vh;
    position: fixed;
    width: 750rpx;
    left: 0;
    top: 0;
  }

  .full-diy-wrap{
    position: absolute;
    width: 750rpx;
    left: 0;
    bottom: 48px;
  }

  .live-btn {
    position: fixed;
    bottom: 256rpx;
    margin-bottom: env(safe-area-inset-bottom);
    right: 30rpx;
    z-index: 99;
    box-sizing: border-box;
    padding-top: 8rpx;
    width: 98rpx;
    height: 98rpx;
    background: $fun-orange-color;
    box-shadow: 0rpx 2rpx 12rpx 0rpx rgba(255, 120, 0, 0.4);
    border-radius: 50%;
    text-align: center;
  }

  .location-btn-box {
    position: fixed;
    bottom: 133px;
    margin-bottom: env(safe-area-inset-bottom);
    right: 15px;
    z-index: 98;
    .location-btn-wrap{
      width: 147px;
      height: 147px;

      position: relative;
      .location-btn-preview{
        position: absolute;
        right: 0;
        bottom:0;
        opacity: 0;
      }
      .location-btn-local{
        position: absolute;
        right: 0;
        bottom:0;
        opacity: 0;
      }
      .location-btn-change{
        position: absolute;
        right: 0;
        bottom:0;
        opacity: 0;
      }
    }
  }

  .fun-location-btn{
    /*box-sizing: border-box;*/
    /*padding-top: 4px;*/
    width: 49px;
    height: 49px;
    /*background: rgba(38, 199, 141, 1);*/
    /*box-shadow: 0rpx 1px 6px 0rpx rgba(35, 183, 130, 0.4);*/
    /*border-radius: 50%;*/
    /*text-align: center;*/
  }

  .location-tooltip-wrap{
    position: fixed;
    bottom: 192px;
    margin-bottom: env(safe-area-inset-bottom);
    right: 39px;
    z-index: 99;
    display: flex;
    align-items: flex-start;
    .location-tooltip-conent{
      padding: 6px;
      width: 380rpx;
      font-size: 12px;
      line-height: 20px;
      background: rgba(0,0,0,.5);
      color: #fff;
      position: relative;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    .iconbottom{
      width: 10px;
      height: 10px;
      position: absolute;
      right: 0px;
      bottom: 0px;
      transform: translate(0,100%);
      opacity: 0.5;
    }
    .iconright{
      width: 16px;
      height: 16px;
      position: absolute;
      right: 0px;
      bottom: 0;
      transform: translateX(100%);
      opacity: 0.5;
    }

  }

  .location-btn {
    position: fixed;
    bottom: 133px;
    margin-bottom: env(safe-area-inset-bottom);
    right: 15px;
    z-index: 99;
    /*box-sizing: border-box;*/
    width: 49px;
    height: 49px;
    /*background: rgba(38, 199, 141, 1);*/
    /*box-shadow: 0rpx 1px 6px 0rpx rgba(35, 183, 130, 0.4);*/
    /*border-radius: 50%;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }

  .publish-btn {
    position: fixed;
    bottom: 64px;
    margin-bottom: env(safe-area-inset-bottom);
    right: 15px;
    z-index: 99;
    box-sizing: border-box;
    padding-top: 4px;
    width: 49px;
    height: 49px;
    background: rgba(38, 199, 141, 1);
    box-shadow: 0rpx 1px 6px 0rpx rgba(35, 183, 130, 0.4);
    border-radius: 50%;
    text-align: center;
  }

  .tab-container {
    position: absolute;
    bottom: 48px;
    width: 750rpx;

    .tab-page-wrap {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .head-box {
    position: fixed;
    top: 0;
    width: 750rpx;
    z-index: 22;
  }

  .head {
    padding-left: 2px;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;

    .tab-box {
      position: relative;
      display: flex;
      align-items: flex-end;
      height: 36px;

      .page-tab-underline {
        position: absolute;
        bottom: -6px;
        height: 2px;
        width: 8px;
        background: #fff;
        left: 0;
      }

      .tab-item {
        height: 36px;
        padding: 0 8px;
        position: relative;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        &:last-child {
          margin-right: 0;
        }

        .tab-item-text {

        }

        .tab-item-tip {
          position: absolute;
          width: 1px;
          height: 1px;
          visibility: hidden;
          left: 50%;
          transform: translateX(-50%);
        }

        &.active {
          font-size: 25px;
        }
      }
    }

  }

  .search-box {
    position: absolute;
    /*margin-right: 20rpx;*/
    /*width: 120rpx;*/
    border-radius: 13px;
    text-align: right;
    z-index: 33;

    background: rgba(255, 255, 255, .5);
    display: flex;
    align-items: center;
    /*justify-content: center;*/
    justify-content: flex-end;

    .iconsearch {

    }
  }

  .refuseApplyDialog {
    width: 400rpx;
    box-sizing: border-box;
    padding-left: 30rpx;
    padding-right: 30rpx;

    .modal-title {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-weight: bold;
    }

    .btn-sub {
      color: #1aac19;
    }

  }

</style>
