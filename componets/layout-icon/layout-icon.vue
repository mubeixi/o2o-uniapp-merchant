<style lang="scss" scoped>
  @import "../../assets/icon.scss";

  .inline {
    display: inline;
  }

  .icon {
  
  }
</style>

<template>
  <!--  ,height:size + 'px',lineHeight:size+'px' ,transform:'rotate('+rotate+')'-->
  <i class="iconfont icon"
     :class="[type,display]"
     :style="{ color: color, 'font-size': size + 'px',fontWeight:weight}"
     @click="_onClick"
  ></i>
</template>

<script>
export default {
  name: 'layoutIcon',
  props: {
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
