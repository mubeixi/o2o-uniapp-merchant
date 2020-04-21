<template>
  <div v-if="isShow">
    <div @tap="ableClose" @touchmove.stop.prevent id="mask" class="popup-layer" v-if="showMask"></div>
    <div :animation="animationData" id="wrap" class="popup-wrap" @tap.stop="noop"
         :style="{height:full?'100%':'auto','top':topStr?topStr:'auto',backgroundColor:mainBgColor}">
      <div @touchmove.stop.prevent v-if="title" class="pupup-title">{{title}}</div>
      <slot></slot>
      <div @touchmove.stop.prevent class="safearea-box2"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutPopup',
  props: {
    showMask: {
      type: Boolean,
      default: true
    },
    topStr: {
      type: String
    },
    showPop: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '' // 方向  top，bottom，left，right
    },
    direction: {
      type: String,
      default: 'bottom' // 方向  top，bottom，left，right
    },
    // 是否铺满
    full: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    mainBgColor: {
      type: String,
      default: '#fff'
    },
    bottomHeight: {
      type: Number || String,
      default: 0
    }
  },
  data () {
    return {
      isShow: false,
      domInfo: {},
      animationData: {},
      menuButtonInfo: {},
      systemInfo: {
        statusBarHeight: 0,
        windowHeight: 0
      }
    }
  },
  mounted () {
    if (this.showPop) {
      this.show()
    }

    this.systemInfo = uni.getSystemInfoSync()
    // #ifdef MP-WEIXIN
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left } = this.menuButtonInfo
    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif
  },
  methods: {
    noop () {
    },
    show: function () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    },
    ableClose () {
      if (this.autoClose) {
        this.close()
      }
      this.$emit('maskClicked', true)
    }
  }
}
</script>
<style lang="scss" scoped>

  .popup-layer {
    position: fixed;
    z-index: 99;
    background: rgba(0, 0, 0, .6);
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0;
    //transform: translateY(100%);
  }

  .popup-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    //transform:translateY(100%);
    z-index: 100;
    background: #FFFFFF;
    overflow: hidden;

    .pupup-title {
      padding: 30rpx 0 60rpx;
      font-size: 16px;
      text-align: center;
      color: #333;
    }
  }

  .safearea-box2 {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
    width: 100%;
  }
</style>
