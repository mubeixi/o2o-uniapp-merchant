<template>
  <div>
    <!--状态栏-->
    <div class="status-bar" :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}"></div>
    <!--导航栏-->
    <div class="navigation-bar" :style="{height:menuButtonInfo.height+'px',backgroundColor:menuButtonBgColor}">
      <layout-icon @click="bindBack" class="left-icon" size="22" type="iconicon-arrow-left"></layout-icon>
      <div class="title" :style="{lineHeight:menuButtonInfo.height+'px'}">{{title}}</div>
    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  name: 'layoutPageTitle',
  components: { LayoutIcon },
  props: {
    props: {
      statusBgColor: {
        type: String,
        default: '#fff'
      },
      menuButtonBgColor: {
        type: String,
        default: '#fff'
      },
      title: {
        type: String,
        default: '标题'
      },
      // 代表是否emit左侧被点击事件
      letfFn: {
        type: Boolean,
        default: false
      }
    }
  },
  data () {
    return {
      menuButtonInfo: {},
      systemInfo: {
        statusBarHeight: 0,
        windowHeight: 0
      }
    }
  },
  methods: {
    bindBack () {
      if (this.letfFn) this.$emit('clickLeft')
      if (!this.letfFn) this.backFunc()
    }
  },
  mounted () {
    this.systemInfo = uni.getSystemInfoSync()
    // #ifdef MP-WEIXIN
    this.menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    const { height, top, left } = this.menuButtonInfo
    this.diyHeadHeight = top + height + (top - this.systemInfo.statusBarHeight) + 10
    this.diyHeadRight = this.systemInfo.windowWidth - left
    // #endif
  }
}
</script>
<style lang="scss" scoped>
  .navigation-bar {
    position: relative;

    .left-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
    }

    .title {
      text-align: center;
      font-size: 16px;
      color: #333;
    }
  }
</style>
