<style lang="scss" scoped>
@import "../../assets/icon.scss";
.inline{
  display: inline;
}
</style>

<template>
  <i class="iconfont icon"
     :class="[type,display]"
     :style="{ color: color, 'font-size': size + 'px' }"
     @click="_onClick"
  ></i>
</template>

<script>
export default {
  name: 'layoutIcon',
  props: {
    type: {
      require: true,
      type: String,
      default: ''
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
