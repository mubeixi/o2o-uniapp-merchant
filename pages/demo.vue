<style lang="scss" scoped>
  .tag {

  }
</style>

<template>
  <div class="tag">
	  <product-sku  ref="mySku" :proList="list" ></product-sku>
	  <div @click="open">
		  我的规格
	  </div>
	 <!-- <address @up="updateAddress" ref="address"><span @click="open">选择地址</span></address> -->
  </div>
</template>

<script>
import address from '@/componets/layout-address/layout-address.vue'
import productSku from '@/componets/product-sku/product-sku.vue'
import { getProdDetail } from '@/api/common.js'
export default {
  name: 'Demo',
  components: { productSku },
  data () {
	  return {
      list: {}
    }
  },
  methods: {
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
