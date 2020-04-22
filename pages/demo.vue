<style lang="scss" scoped>
  .tag {

  }
</style>

<template>
  <div class="tag">
<!--    <product-sku ref="mySku" :proList="list"></product-sku>-->
<!--    <div @click="open">-->
<!--      我的规格-->
<!--    </div>-->
    <user-addrss @up="updateAddress" ref="address"><span @click="$openPop('address')">选择地址</span></user-addrss>

  </div>
</template>

<script>
import address from '@/componets/form-address/form-address'
import productSku from '@/componets/product-sku/product-sku.vue'
import { getProdDetail } from '@/api/common.js'
import UserAddrss from '@/componets/layout-address/layout-address'

export default {
  name: 'Demo',
  mixins: [BaseMixin],
  components: {
    UserAddrss,
    productSku
  },
  data () {
    return {
      list: {}
    }
  },
  methods: {
    updateAddress (d) {
      console.log(d)
    },
    open () {
      console.log(this)
      this.$refs.mySku.show()
    }
  },
  onShow () {
    getProdDetail({ prod_id: 1613 }).then(res => {
      const product = res.data
      this.product = res.data
      if (res.data.skujosn) {
        const skujosn = res.data.skujosn
        const skujosn_new = []
        for (const i in res.data.skujosn) {
          skujosn_new.push({
            sku: i,
            val: skujosn[i]
          })
        }

        this.product.skujosn_new = skujosn_new
        this.product.skuvaljosn = res.data.skuvaljosn
      }

      this.list = product
    })
  }
}
</script>
