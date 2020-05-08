<style lang="scss" scoped>
  @import "../../assets/icon.scss";

  .inline {
    display: inline;
  }

  .icon {

  }

  .wrap{
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    .icon{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>

<template>
  <!--  ,height:size + 'px',lineHeight:size+'px' ,transform:'rotate('+rotate+')'-->

  <i v-if="plain" class="iconfont icon"
     :class="[type,display]"
     :style="{ color: color, 'font-size': size + 'px',fontWeight:weight}"
     @click="_onClick"
  ></i>
  <div v-else class="wrap" :style="{padding:wrapPadding,width:size + 'px',height:size + 'px',backgroundColor:wrapBg}">
    <i class="iconfont icon"
       :class="[type,display]"
       :style="{ color: color, 'font-size': size + 'px',fontWeight:weight}"
       @click="_onClick"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'layoutIcon',
  props: {
    // 如果只有这个，那么不要背景色
    plain: {
      type: Boolean,
      default: true
    },
    wrapPadding: {
      type: String,
      default: '0rpx'
    },
    wrapBg: {
      type: String,
      default: '#8f8f8f'
    },
    rotate: {
      type: String,
      default: '0deg'
    },
    type: {
      require: true,
      type: String,
      default: ''
    },
    weight: {
      type: String,
      default: 'normal'
    },
    display: {
      type: String,
      default: 'block'
    },
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  methods: {
    _onClick () {
      this.$emit('click')
    }
  }
}
</script>
