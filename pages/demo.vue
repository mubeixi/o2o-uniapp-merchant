<style lang="scss" scoped>
  .tag {
  
  }
</style>

<template>
  <div class="tag">
    <product-sku ref="mySku" @sureSku="save" :proList="list"></product-sku>
    <div @click="open">
      我的规格
    </div>
    <wzw-goods-action>
      <span slot="leftText">单买¥</span>
      <span slot="leftPrice">100.00</span>
      <span slot="rightText">拼团购¥</span>
      <span slot="rightPrice">100.00</span>
    </wzw-goods-action>
    <!--  <user-addrss @up="updateAddress" ref="address"><span @click="$openPop('address')">选择地址</span></user-addrss>
   -->
  </div>
</template>

<script>
// import address from '@/componets/form-address/form-address'
import productSku from '@/componets/product-sku/product-sku'
import { getProdDetail } from '@/api/common.js'
import WzwGoodsAction from '@/componets/wzw-goods-action/wzw-goods-action'
import BaseMixin from '@/mixins/BaseMixin'
// import UserAddrss from '@/componets/form-address/form-address'

export default {
  name: 'Demo',
  mixins: [BaseMixin],
  components: {
    // UserAddrss,
    productSku,
    WzwGoodsAction,
  },
  data () {
    return {
      list: {},
    }
  },
  methods: {
    save (data) {
      console.log(data, 'ss')
    },
    updateAddress (d) {
      console.log(d)
    },
    open () {
      console.log(this)
      this.$refs.mySku.show()
    },
  },
  onShow () {
    getProdDetail({ prod_id: 1613 }).then(res => {
      const product = res.data
      this.list = product
    })
  },
}
</script>
