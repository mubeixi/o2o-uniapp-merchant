<template>
  <view @click="commonClick" style="position: relative;" v-show="system.title">
    <view :style="{background:system.bgcolor}" class="home-wrap">

      <section :class="[item]" :data-name="item" :key="index" :ref="item" class="section"
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
  </view>

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
import DiyKill from '@/componets/diy-kill/diy-kill'
import DiyTitle from '@/componets/diy-title/diy-title'
import DiyText from '@/componets/diy-text/diy-text'
import { getSkinConfig, getSkinPreData, getDiySkinConfig } from '@/api/common'
import { Exception } from '@/common/Exception'
import { error, modal } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      selfObj: null,
      templateList: [],
      templateData: [],
      tagIndex: 0,
      system: {}
    }
  },
  components: {
    DiyText,
    DiyTitle,
    DiyKill,
    DiyGoods,
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
    DiyBase
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

  },
  methods: {},
  onShow () {
    if (this.$refs.notice) {
      this.$refs.notice.map(item => {
        item.restartAn()
      })
    }
  },
  onLoad (options) {
    const Home_ID = options.Home_ID

    // #ifdef H5
    // if (!Home_ID && GetQueryByString(location.href, 'Home_ID')) {
    //   Home_ID = GetQueryByString(location.href, 'Home_ID')
    // }
    // #endif

    if (!Home_ID) {
      this.$error('Home_ID参数错误')
    }

    new Promise((resolve, reject) => {
      // Skin_ID,
      getDiySkinConfig({ Home_ID }, {
        tip: 'loading',
        mask: true
      }).then(res => {
        if (res.data.Home_Json) {
          resolve(JSON.parse(res.data.Home_Json))
        } else {
          reject(Error('获取模板数据失败'))
        }
      }).catch(e => {

      })
    })
      .then(mixinData => {
        const templateData = mixinData.plugin
        this.system = mixinData.system

        uni.setNavigationBarTitle({
          title: mixinData.system.title
        })

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
          templateData &&
          !Array.isArray(templateData[0]) &&
          templateData.length > 0
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
      })
      .catch(err => {
        modal(err.msg || '初始化模板信息错误')
      })
  }
}
</script>

<style lang="less" scope="scope">
  .home-wrap {
    width: 750rpx;
    overflow-x: hidden;
    background: #f2f2f2;
    position: relative;
    min-height: 100vh;
    /* #ifdef APP-PLUS */
    /*padding-top: var(--status-bar-height);*/
    /* #endif */

    .section {
      position: relative;
      //搜索框特殊
      &.search {
        position: static;
      }
    }
  }
</style>
