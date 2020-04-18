<style scoped lang="scss">

</style>
<template>
  <div class="panel">
    <slot name="cover"></slot>
    <slot name="title"></slot>
    <slot name="sellingPrice"></slot>
    <slot name="marketPrice"></slot>
    <slot name="actions"></slot>
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
    
    }
  },
  methods: {
  
  }
}
</script>
