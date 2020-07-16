<template>
  <div class="page-wrap">
    <layout-loading v-if="loadingByTmpl"></layout-loading>
    <view class="home-diy-wrap" v-else>
      <section
        :class="[item]"
        :data-name="item"
        :key="index"
        class="section"
        v-for="(item, index) in templateList[tagIndex]">
        <diy-base
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('base') !== -1"></diy-base>
        <diy-swiper
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('swiper') !== -1"></diy-swiper>
        <diy-nav
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('nav') !== -1"></diy-nav>
        <diy-video
          :confData="templateData[tagIndex][index]"
          :index="index"
          ref="video"
          v-if="item.indexOf('video') !== -1"></diy-video>
        <diy-hr
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('hr') !== -1"></diy-hr>
        <diy-space
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('space') !== -1"></diy-space>
        <diy-title
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('title') !== -1"></diy-title>
        <diy-text
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('text') !== -1"></diy-text>
        <diy-search
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('search') !== -1"></diy-search>
        <diy-notice
          :confData="templateData[tagIndex][index]"
          :index="index"
          ref="notice"
          v-if="item.indexOf('notice') !== -1"></diy-notice>
        <diy-coupon
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('coupon') !== -1"></diy-coupon>
        <diy-goods
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('goods') !== -1"></diy-goods>
        <diy-cube
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('cube') !== -1"></diy-cube>
        <diy-tab
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('tab') !== -1"></diy-tab>
        <diy-group
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('group') !== -1"></diy-group>
        <diy-flash
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('flash') !== -1"></diy-flash>
        <diy-kill
          :confData="templateData[tagIndex][index]"
          :index="index"
          v-if="item.indexOf('kill') !== -1"></diy-kill>
      </section>
    </view>
<!--    <layout-copyright></layout-copyright>-->

  </div>
</template>

<script>
import LayoutLoading from '@/componets/layout-loading/layout-loading'
import DiyNav from '@/componets/diy-nav/diy-nav'
import DiyFlash from '@/componets/diy-flash/diy-flash'
import DiyGroup from '@/componets/diy-group/diy-group'
import DiyTab from '@/componets/diy-tab/diy-tab'
import DiyCube from '@/componets/diy-cube/diy-cube'
import DiyCoupon from '@/componets/diy-coupon/diy-coupon'
import DiyNotice from '@/componets/diy-notice/diy-notice'
import DiySearch from '@/componets/diy-search/diy-search'
import DiySpace from '@/componets/diy-space/diy-space'
import DiyHr from '@/componets/diy-hr/diy-hr'
import DiyVideo from '@/componets/diy-video/diy-video'
import DiySwiper from '@/componets/diy-swiper/diy-swiper'
import DiyBase from '@/componets/diy-base/diy-base'
import DiyGoods from '@/componets/diy-goods/diy-goods'
import LayoutCopyright from '@/componets/layout-copyright/layout-copyright'
import { getSkinPreData, getDiySkinConfig } from '@/api/common'
import { Exception } from '@/common/Exception'
import { error, modal } from '@/common/fun'
import DiyKill from '@/componets/diy-kill/diy-kill'
import DiyTitle from '@/componets/diy-title/diy-title'
import DiyText from '@/componets/diy-text/diy-text'
import { setNavigationBarTitle } from '@/common/helper'

export default {
  name: 'pre',
  components: {
    DiyText,
    DiyTitle,
    DiyKill,
    DiyGoods,
    LayoutLoading,
    DiyNav,
    DiyFlash,
    DiyGroup,
    DiyTab,
    DiyCube,
    DiyCoupon,
    DiyNotice,
    DiySearch,
    DiySpace,
    DiyHr,
    DiyVideo,
    DiySwiper,
    DiyBase,
    LayoutCopyright
  },
  data () {
    return {
      loadingByTmpl: false, // 标记是否请求完结
      templateList: [],
      templateData: [],
      tagIndex: 0,
      Home_ID: 0
    }
  },
  methods: {
    async get_tmpl_data () {
      try {
        const getTmplAction = this.mode === 'home' ? getSkinPreData : getDiySkinConfig

        const { Home_Json: resultData } = await getTmplAction({ Home_ID: this.Home_ID }, { onlyData: true }).catch(e => {
          throw Error(e.msg || '获取首页模板失败')
        })

        const mixinData = typeof resultData === 'string' ? JSON.parse(resultData) : resultData

        const { plugin: templateData, system } = mixinData

        setNavigationBarTitle(system.title)
        console.log(templateData)
        // 存储页面数据
        this.templateData = [] // 页面数据的二维数组。
        this.templateList = [] // 页面组件的二维数组。
        if (templateData && Array.isArray(templateData[0])) {
          // 多个页面，每个页面是一个数组
          templateData.map(item => {
            this.templateData.push(item)
            this.templateList.push([])
          })
        } else if (
          templateData && !Array.isArray(templateData[0]) && templateData.length > 0
        ) {
          // 单纯是一个对象的时候？？
          this.templateData = [templateData]
          this.templateList = [[]]
        } else {
          this.templateData = [[]]
          this.templateList = [[]]
        }
        // this.templateData = templateData
        // 存储页面组件templateList
        for (let i = 0; i < this.templateData.length; i++) {
          if (
            this.templateData[i] &&
            this.templateData[i] !== []
          ) {
            this.templateData[i].map(m => {
              this.templateList[i].push(m.tag)
            })
          }
        }

        return true
      } catch (e) {
        return e
      }
    },
    async _init_func () {
      // showLoading('初始化数据')
      try {
        this.loadingByTmpl = true
        const handleRT = await this.get_tmpl_data()
        this.loadingByTmpl = false
        if (handleRT !== true) throw handleRT // hanldeRT不是true就是一个Error实例，直接抛出
      } catch (e) {
        Exception.handle(e)
      } finally {
        // hideLoading()
      }
    }
  },
  onLoad (options) {
    const { Skin_ID, Home_ID, mode } = options

    if ((!Skin_ID && !Home_ID) || !mode) {
      error('参数错误')
      return
    }
    this.mode = mode
    this.Home_ID = Home_ID
    this._init_func()
  },
  onShow () {
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.restartAn()
      })
    }
  },
  onHide () {
    // 暂停notice组件的定时器任务
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.pauseAn()
      })
    }

    // 暂停播放
    if (this.$refs.video) {
      this.$refs.video.map(item => {
        item.pauseFn()
      })
    }
  },
  created () {

  }
}
</script>
<style scoped>

</style>
