<template>
  <div v-if="ifshow">
    <div  @tap="ableClose" @touchmove.stop.prevent class="popup-layer" :style="{backgroundColor:bgColor}"></div>
    <div @touchmove.stop.prevent :class="[positions]" :style="{backgroundColor:mainBgColor,borderRadius:radius?radius:''}" ref="popRef" class="popup-content" @tap.stop="stopEvent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutLayer',
  props: {
    bgColor: {
      type: String,
      default: 'rgba(0,0,0,.5)'
    },
    mainBgColor: {
      type: String,
      default: '#fff'
    },
    positions: {
      type: String,
      default: 'bottom'
    },
    showPop: {
      type: Boolean,
      default: false
    },
    radius: {
      type: String,
      default: '0px'
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      ifshow: false
    }
  },
  mounted () {
    if (this.showPop) {
      this.show()
    }
  },
  watch: {
    positions (newVal) {
    },
    showPop (value) {
      if (value) {
        this.show()
      } else {
        this.close()
      }
    }
  },
  methods: {
    show () {
      this.ifshow = true
    },
    close () {
      this.ifshow = false
    },
    ableClose () {
      if (this.autoClose) {
        this.close()
      }
    },
    stopEvent (event) {},
  }
}
</script>
<style lang="scss" scoped>
  .popup-layer {
    position: fixed;
    z-index: 99;
    background-color: rgba(0, 0, 0, .5);
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
  }

  .popup-content {
    position: fixed;
    z-index: 100;
    overflow: hidden;
  }
  .center {
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
  }
  .top-center {
    top: 20%;
    left:50%;
    transform: translate(-50%);
  }

  .top {
    top: 10%;
    left:50%;
    transform: translate(-50%);
  }
  .bottom{
    bottom: 0;
  }
</style>
