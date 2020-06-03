<template>
  <div class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="head-box" :style="{height:diyHeadHeight+'px',backgroundColor:primaryColor}">
      <div class="head" :style="{height:menuButtonInfo.height+'px',paddingRight:diyHeadRight+'px',marginTop:menuButtonInfo.top+'px'}">
        <ul class="tab-box">
          <li @click="setHeadTabIndex(0)" id="headTabItem0" class="tab-item" :class="[headTabIndex === 0?'active':'']">
            <div :animation="tabAnimationData[0]">特价</div>
            <div id="tabItemTip0" class="tab-item-tip"></div>
          </li>
          <li @click="setHeadTabIndex(1)" id="headTabItem1" class="tab-item" :class="[headTabIndex === 1?'active':'']">
            <div :animation="tabAnimationData[1]">同城闪送</div>
            <div id="tabItemTip1" class="tab-item-tip"></div>
          </li>
          <li @click="setHeadTabIndex(2)" id="headTabItem2" class="tab-item" :class="[headTabIndex === 2?'active':'']">
            <div :animation="tabAnimationData[2]">好店</div>
            <div id="tabItemTip2" class="tab-item-tip"></div>
          </li>
          <span v-show="showUnderLine" class="page-tab-underline" :style="{marginLeft:defaultUnderlineLeft+'px'}" :animation="tabUnderlineAnimationData"></span>
        </ul>
        <div class="search-box" @click="$linkTo('/pages/search/index')" :style="{borderRadius: menuButtonInfo.height/2+'px',height:menuButtonInfo.height+'px',}">
          <layout-icon class="iconsearch" type="iconicon-search" size="16" color="#fff"></layout-icon>
        </div>
      </div>
    </div>
    <!--占位-->
    <div :style="{height:diyHeadHeight+'px'}"></div>
    <div class="main tab-container" :style="{top:diyHeadHeight+'px'}">
      <scroll-view lower-threshold="1" @scrolltolower="bindGetMore(0)" class="tab-page-wrap" scroll-y v-show="headTabIndex===0">
        <scroll-page-hot ref="page0"></scroll-page-hot>
      </scroll-view>
      <scroll-view lower-threshold="1" @scrolltolower="bindGetMore(1)" class="tab-page-wrap" scroll-y v-show="headTabIndex===1">
        <scroll-page-local ref="page1"></scroll-page-local>
      </scroll-view>
      <scroll-view lower-threshold="1" @scrolltolower="bindGetMore(2)" class="tab-page-wrap" scroll-y v-show="headTabIndex===2">
        <scroll-page-merchat ref="page2"></scroll-page-merchat>
      </scroll-view>
    </div>
    <div class="publish-btn" @click="toMerchant">
      <layout-icon size="18" display="inline" color="#fff" type="iconfabu"></layout-icon>
      <div class="fz-10 color-white">发布活动</div>
    </div>

    <layout-modal ref="openLocalSettingModal" :autoClose="false">
      <div class="refuseApplyDialog">
        <div class="c3 fz-16 modal-title">
          是否开启定位
        </div>
        <div class="fz-14 m-b-20 m-t-10 c9">
          很抱歉，该功能必须基于地理位置提供商品检索，您需开启地理位置授权才可以使用该功能
        </div>
        <div class="control flex flex-justify-between flex-justify-c">
          <button size="mini" @click="$closePop('openLocalSettingModal')" class="action-btn btn-cancel">取消</button>
          <button size="mini" open-type='openSetting' bindopensetting="bindOpenSetting" class="btn-sub action-btn">确定</button>
        </div>
      </div>
    </layout-modal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { modal } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import ScrollPageHot from '@/pages/index/components/scroll-page-hot'
import ScrollPageLocal from '@/pages/index/components/scroll-page-local'
import ScrollPageMerchat from '@/pages/index/components/scroll-page-merchat'
import Promisify from '@/common/Promisify'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutModal,
    ScrollPageMerchat,
    ScrollPageLocal,
    ScrollPageHot,
    LayoutIcon
  },
  computed: {
    userAddressInfo () {
      return this.$store.getters['user/getUserAddressInfo']()
    },
    ...mapGetters({
      primaryColor: 'theme/pimaryColor'
    })
  },
  data () {
    return {
      /** 疯狂hack **/
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
    toMerchant () {
      uni.navigateToMiniProgram({
        appId: 'wx3d24c565489e305b',
        path: 'pages/product/form?origin_type=client',
        extraData: {
          origin: 'client'
        },
        envVersion: 'release',
        fail (err) {
          modal(`跳转失败${err.errMsg}`)
        },
        success (res) {
          // 打开成功
        }
      })
    },
    bindOpenSetting () {
      uni.openSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation']) {
            this.getUserLocation()
          }
        }
      })
    },
    setHeadTabIndex (idx) {
      this.defaultUnderlineLeft = 0 // 没有左边距了
      this.headTabIndex = idx
      if (idx > 0 && (!this.userAddressInfo || JSON.stringify(this.userAddressInfo === '{}'))) {
        Promisify('authorize', { scope: 'scope.userLocation' }).then(() => {
          this.getUserLocation()
        }).catch(() => {
          this.$refs.openLocalSettingModal.show()
        })
      }
    },
    getUserLocation () {
      uni.getLocation({
        type: 'wgs84',
        success: (res) => {
          console.log('当前位置的经度：' + res.longitude)
          console.log('当前位置的纬度：' + res.latitude)

          this.setUserAddressInfo(res)

          // 另外两个组件，刷新数据
          if (this.headTabIndex === 1) {
            this.$refs.page1.refreshByLocal()
          }
          if (this.headTabIndex === 2) {
            this.$refs.page2.refreshByLocal()
          }
        }
      })
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
    },
    async _init_func () {

    },
    bindGetMore (idx) {
      console.log(idx)
      this.$refs[`page${idx}`].bindReachBottom()
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
  onLoad () {
    console.log(this.$store.getters['theme/pimaryColor'])
  },
  onShow () {
    this.$refs.openLocalSettingModal.close()
    if (this.headTabIndex > 0) {
      Promisify('authorize', { scope: 'scope.userLocation' }).then(() => {
        this.getUserLocation()
      }).catch(() => {
        this.$refs.openLocalSettingModal.show()
      })
    }
  },
  onReady () {
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
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #f8f8f8;
  }
  .publish-btn{
    position: fixed;
    bottom: 30rpx;
    right: 30rpx;
    z-index: 99;
    box-sizing: border-box;
    padding-top: 8rpx;
    width:98rpx;
    height:98rpx;
    background:rgba(38,199,141,1);
    box-shadow:0rpx 2rpx 12rpx 0rpx rgba(35,183,130,0.4);
    border-radius:50%;
    text-align: center;
  }

  .tab-container {
    position: absolute;
    bottom: 0;
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
    box-sizing: border-box;
    z-index: 22;
  }

  .head {
    padding-left: 10px;
    display: flex;
    align-items: center;
    color: white;
    justify-content: space-between;
    .tab-box {
      position: relative;
      display: flex;
      align-items: flex-end;
      padding-bottom: 8px;
      .page-tab-underline {
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 8px;
        background: #fff;
        left: 0;
      }
      .tab-item {
        margin-right: 15px;
        position: relative;
        //animation: all 0.4s ease;
        &:last-child {
          margin-right: 0;
        }

        .tab-item-tip{
          position: absolute;
          width: 1px;
          height: 1px;
          visibility: hidden;
          left: 50%;
          transform: translateX(-50%);
        }

        &.active {
          font-size: 40rpx;
        }
      }
    }
    .search-box {
      position: relative;
      margin-right: 20rpx;
      width: 120rpx;
      text-align: right;
      background: rgba(255, 255, 255, .5);

      .iconsearch {
        color: white;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .refuseApplyDialog{
    width: 400rpx;
    box-sizing: border-box;
    padding-left: 30rpx;
    padding-right: 30rpx;
    .modal-title{
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-weight: bold;
    }
    .btn-sub{
      color: #1aac19;
    }

  }

</style>
