<style scoped lang="scss">

</style>
<template>
  <div class="panel">
    <slot name="title">
      Title
    </slot>
    <slot>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'GoodsItem',
  props: {
    attr: {
      required: true,
      type: Object
    },
    mode: {
      type: [String, Number],
      mode: 1
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    indexChangeEvent (event) {
      console.log(event)
      const { current, source } = event.$wx.detail
      console.log(current, source)
      this.current = current
    }
  }
}
</script>
