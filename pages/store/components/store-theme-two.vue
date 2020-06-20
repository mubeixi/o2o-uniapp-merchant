<template>

</template>

<script>
import { componetMixin } from '@/mixins/BaseMixin'

export default {
  name: 'store-theme-two',
  mixins: [componetMixin],
  props: {
    bid: {
      required: true,
      type: Number
    }
  },
  data () {
    return {}
  },
  watch: {
    bid: {
      immediate: true,
      handler (nval) {
        if (nval) this._init_func()
      }
    }
  },
  methods: {
    async _init_func () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
