<style lang="scss" scoped>

</style>

<template>
  <i class="iconfont {{type}}"
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
