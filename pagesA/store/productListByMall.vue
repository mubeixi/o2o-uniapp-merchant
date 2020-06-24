<template>
  <div class="page-wrap">

  </div>
</template>
<script>
import BaseMixin from '@/mixins/BaseMixin'
import { modal } from '@/common/fun'
export default {
  mixins: [BaseMixin],
  data () {
    return {
      bid: ''
    }
  },
  methods: {
    async _init_func () {

    }
  },
  onLoad (options) {
    if (!options.biz_id) {
      modal('店铺id缺失')
      return
    }
    this.bid = parseInt(options.biz_id)
    this._init_func()
  },
  created () {

  }
}
</script>
<style lang="scss" scoped>

</style>
