<template>
  <div class="">
    <div class="im-bottom-action">
      <div class="input-box">
        <input class="input-ele"  v-model="tempText" />
      </div>
      <div class="submit-btn" @click="sendMsg">发送</div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { setNavigationBarTitle } from '@/common/helper'
import Im from '@/common/Im/Im'
let imInstance = null

export default {
  mixins: [BaseMixin],
  components: {

  },
  data () {
    return {

      tempText: ''
    }
  },

  onLoad (options) {
    this._init_func(options)
  },
  onShow () {

  },
  methods: {
    async _init_func (options) {
      const { productId, orderId, origin, ...extConf } = options
      setNavigationBarTitle('Im')
      imInstance = new Im(productId, orderId, origin, extConf)
      await imInstance.start() // 等拿token
      imInstance.sendMessage('我爱你中国')
    },
    sendMsg () {
      imInstance.sendMessage(this.tempText)
      this.tempText = ''
    },
    bindInputChange (e) {
      this.tempText = e.detail.value
    }
  }
}
</script>
<style lang="scss" scoped>
  .im-bottom-action{
    position: fixed;
    width: 750rpx;
    height: 44px;
    bottom: 0;
    background: #fff;
    display: flex;
    align-items: center;
    .input-box{
      width: 630rpx;
      display: flex;
      align-items: center;
      .input-ele{
        flex: 1;
        margin: 0 10px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 2px;
        height: 32px;
        line-height: 32px;
        padding: 0 6px;
        font-size: 14px;
      }
    }
    .submit-btn{
      width: 120rpx;
      text-align: center;
      line-height: 44px;
      background: $fun-primary-color;
      color: #fff;
      font-size: 14px;
    }
  }
</style>
