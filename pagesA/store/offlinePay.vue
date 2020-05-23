<template>
  <div class="page-wrap">
    <div class="input-box">
      <input class="input" confirm-type="done" placeholder="请输入消费券码" type="digit" v-model="payMoney" />
    </div>
    <button @click="subFn" class="sub" type="warn">核销</button>
  </div>
</template>

<script>
import { offlinePay } from '@/api/order'
import { error } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import { Exception } from '@/common/Exception'
const floatNumber = /^[0-9]+.?[0-9]*$/ // 大于等于0的浮点数或者数字字符串
const intNumber = /^[0-9]+$/ // 大于等于0的浮点数或者数字字符串
export default {
  mixins: [BaseMixin],
  data () {
    return {
      biz_id: '',
      payMoney: ''
    }
  },
  onload (options) {
    if (!options.hasOwnProperty('biz_id') || !options.biz_id) {
      error('biz_id参数必传')
      return
    }

    this.biz_id = options.biz_id
  },
  methods: {
    async subFn () {
      try {
        const payMoney = this.payMoney

        if (!payMoney) throw Error('金额必填')
        if (!payMoney.match(floatNumber) && !payMoney.match(intNumber)) throw Error('请输入最多两位小数的正数')

        const oRderInfo = await offlinePay({ pay_money: payMoney, biz_id: this.biz_id }).catch(err => { throw Error(err.msg || '下单失败') })
        console.log(oRderInfo)
      } catch (e) {
        Exception.handle(e)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
  .page-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    padding: 40rpx 20rpx;

    .input-box {
      height: 180rpx;

      box-sizing: border-box;
      border: 1px solid $fun-primary-color;
      border-radius: 10rpx;

      .input {
        margin: 39rpx 0;
        padding: 20rpx;
        font-size: 50rpx;
        line-height: 60rpx;
        height: 60rpx;
        font-weight: 300;
        color: #555;

        &::placeholder {
          color: #CAC8C8;
        }
      }

    }

    .sub {
      border-radius: 0;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 750rpx;
      z-index: 3;
    }
  }
</style>
