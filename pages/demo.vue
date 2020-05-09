<style lang="scss" scoped>

</style>

<template>
  <div class="">

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { setNavigationBarTitle } from '@/common/helper'
import Im from '@/common/Im/Im'
let ImInstance = null
export default {
  name: 'Demo',
  mixins: [BaseMixin],
  components: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
  onLoad (options) {
    const { productId, orderId, origin, ...extConf } = options
    setNavigationBarTitle('Im')
    ImInstance = new Im(productId, orderId, origin, extConf)
  },
  onShow () {

  }
}
</script>
