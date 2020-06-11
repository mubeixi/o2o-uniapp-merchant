<template>
  <div class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div @touchmove.stop.prevent :style="{height:menuButtonInfo.height+'px',width:menuButtonInfo.height+'px',paddingLeft:menuButtonInfo.height/2+'px',paddingRight:menuButtonInfo.height/3+'px',top:menuButtonInfo.top+menuButtonInfo.height/3+'px',right:diyHeadRight+10+'px'}" @click="$linkTo('/pages/search/index')" class="search-box">
      <layout-icon display="inline" class="iconsearch" color="#fff" size="18" weight="bold" type="iconicon-search"></layout-icon>
    </div>
    <div @touchmove.stop.prevent :style="{backgroundColor:primaryColor,paddingTop:menuButtonInfo.top+'px'}" class="head-box" style="height: 50px;">
      <div style="height: 36px;" :style="{marginRight:diyHeadRight+menuButtonInfo.height+'px'}" class="head">
        <ul class="tab-box">
          <li :class="[headTabIndex === 0?'active':'']" @click="setHeadTabIndex(0)" class="tab-item" id="headTabItem0">
            <div :animation="tabAnimationData[0]">特价</div>
            <div class="tab-item-tip" id="tabItemTip0"></div>
          </li>
          <li :class="[headTabIndex === 1?'active':'']" @click="setHeadTabIndex(1)" class="tab-item" id="headTabItem1">
            <div :animation="tabAnimationData[1]">同城闪送</div>
            <div class="tab-item-tip" id="tabItemTip1"></div>
          </li>
          <li :class="[headTabIndex === 2?'active':'']" @click="setHeadTabIndex(2)" class="tab-item" id="headTabItem2">
            <div :animation="tabAnimationData[2]">好店</div>
            <div class="tab-item-tip" id="tabItemTip2"></div>
          </li>
          <span :animation="tabUnderlineAnimationData" :style="{marginLeft:defaultUnderlineLeft+'px'}" class="page-tab-underline"
                v-show="showUnderLine"></span>
        </ul>
        
      </div>
    </div>
    <!--占位-->
    <div @touchmove.stop.prevent :style="{height:menuButtonInfo.top+50+'px'}" style="background-color: #26C78D"></div>
    <div :style="{top:menuButtonInfo.top+50+'px'}" class="main tab-container">
      <scroll-view @scrolltolower="bindGetMore(0)" class="tab-page-wrap" lower-threshold="1" scroll-y
                   v-show="headTabIndex===0">
        <scroll-page-hot ref="page0"></scroll-page-hot>
      </scroll-view>
      <scroll-view @scrolltolower="bindGetMore(1)" class="tab-page-wrap" lower-threshold="1" scroll-y
                   v-show="headTabIndex===1">
        <scroll-page-local ref="page1"></scroll-page-local>
      </scroll-view>
      <scroll-view @scrolltolower="bindGetMore(2)" class="tab-page-wrap" lower-threshold="1" scroll-y
                   v-show="headTabIndex===2">
        <scroll-page-merchat ref="page2"></scroll-page-merchat>
      </scroll-view>
    </div>
    <div @click="toMerchant" class="publish-btn">
      <layout-icon color="#fff" display="inline" size="18" type="iconfabu"></layout-icon>
      <div class="fz-10 color-white">发布活动</div>
    </div>
  
  
    <div @click="toLiveList" class="live-btn">
      <layout-icon class="m-t-6" color="#fff" display="inline" size="20" type="icon15"></layout-icon>
      <div class="fz-10 color-white">直播</div>
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
          <button bindopensetting="bindOpenSetting" class="btn-sub action-btn" open-type='openSetting' size="mini">确定
          </button>
        </div>
      </div>
    </layout-modal>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { modal } from '@/common/fun'
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import ScrollPageHot from '@/pages/index/components/scroll-page-hot'
import ScrollPageLocal from '@/pages/index/components/scroll-page-local'
import ScrollPageMerchat from '@/pages/index/components/scroll-page-merchat'
import Promisify from '@/common/Promisify'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import Storage from '@/common/Storage'
import eventHub from '@/common/eventHub'

export default {
  mixins: [BaseMixin, tabbarMixin],
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
    toLiveList(){
      this.$linkTo('/pagesA/live/liveList')
    },
    toMerchant () {
      const users_id = Storage.get('users_id')||''
	  let url=''
	  if(users_id){
		  url='pages/product/form?origin_type=client'
	  }else{
		  url='pages/product/form?origin_type=client&users_id=' + users_id
	  }
      uni.navigateToMiniProgram({
        appId: 'wx3d24c565489e305b',
        path: url,
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
    this.setTabBarIndex(0)

    // 底部tabbar
    this.$store.dispatch('system/setTabActiveIdx', 0)
    this.refreshTabTag()

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
    height: 100vh;
    position: fixed;
    width: 750rpx;
    left: 0;
    top: 0;
  }
  .live-btn{
    position: fixed;
    bottom: 256rpx;
    margin-bottom: env(safe-area-inset-bottom);
    right: 30rpx;
    z-index: 99;
    box-sizing: border-box;
    padding-top: 8rpx;
    width: 98rpx;
    height: 98rpx;
    background: rgba(38, 199, 141, 1);
    box-shadow: 0rpx 2rpx 12rpx 0rpx rgba(35, 183, 130, 0.4);
    border-radius: 50%;
    text-align: center;
  }

  .publish-btn {
    position: fixed;
    bottom: 128rpx;
    margin-bottom: env(safe-area-inset-bottom);
    right: 30rpx;
    z-index: 99;
    box-sizing: border-box;
    padding-top: 8rpx;
    width: 98rpx;
    height: 98rpx;
    background: rgba(38, 199, 141, 1);
    box-shadow: 0rpx 2rpx 12rpx 0rpx rgba(35, 183, 130, 0.4);
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
    padding-left: 10px;
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
        margin-right: 15px;
        position: relative;
        font-size: 18px;
        //animation: all 0.4s ease;
        &:last-child {
          margin-right: 0;
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
    transform: translateY(-50%);
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
