<style>

</style>
<template>
  <div>
    <image src="/static/logo.png" />
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductList
} from '@/api/product'
import { Exception } from '@/common/Exception'

export default {
  mixins: [BaseMixin],
  components: {},
  data () {
    return {
      productList: []
    }
  },
  onLoad () {

  },
  async created () {
    try {
      this.productList = await getProductList({}, { onlyData: true }).catch(() => {})
      this.$toast('加载成功')
    } catch (e) {
      Exception.handle(e)
    }
  },
  methods: {

  }
}
</script>
