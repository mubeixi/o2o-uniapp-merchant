<template>
  <div :style="extStyle">
    <!--状态栏-->
    <div class="status-bar" :style="{height:menuButtonInfo.top+'px',backgroundColor:statusBgColor}"></div>
    <!--导航栏-->
    <div class="navigation-bar" :style="{height:menuButtonInfo.height+'px',backgroundColor:menuButtonBgColor}">
      <layout-icon v-if="showLeftIcon" @click="bindBack" class="left-icon" :color="letfIconColor" :size="letfIconSize" type="iconicon-arrow-left"></layout-icon>
      <div class="title" :style="{lineHeight:menuButtonInfo.height+'px'}">{{pageTitle}}</div>
    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/components/layout-icon/layout-icon'
import { backFunc } from '@/common/fun'
import { componetMixin } from '@/mixins/BaseMixin'

export default {
  name: 'layoutPageTitle',
  mixins: [componetMixin],
  components: { LayoutIcon },
  props: {
    showLeftIcon: {
      type: Boolean,
      default: true
    },
    extStyle: {
      type: String,
      default: ''
    },
    statusBgColor: {
      type: String,
      default: '#ffffff'
    },
    menuButtonBgColor: {
      type: String,
      default: '#ffffff'
    },
    pageTitle: {
      type: String,
      default: ''
    },
    letfIconSize: {
      type: Number,
      default: 22
    },
    letfIconColor: {
      type: String,
      default: '#666666'
    },
    // 代表是否emit左侧被点击事件
    letfFn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    bindBack () {
      if (this.letfFn) this.$emit('clickLeft')
      if (!this.letfFn) backFunc()
    }
  },
  onReady () {

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
