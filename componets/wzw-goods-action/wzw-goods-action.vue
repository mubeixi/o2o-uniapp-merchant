<template>
  <div>
    <div class="bottom-last flex flex-justify-between">
      <div class="left-bottom">
        <div class="bottom-q" style="margin-right: 60rpx" @click="goStore">
          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">
            <layout-icon type="iconicon-home" size="17" color="#666666"></layout-icon>
          </div>
          <div>
            进店
          </div>
        </div>
        <div class="bottom-q" @click="goShare">
          <div style="display: flex;justify-content: center;margin-bottom: 6rpx">
            <layout-icon type="iconicon-share" size="17" color="#666666"></layout-icon>
          </div>
          <div>
            分享
          </div>
        </div>
      </div>
      <div class="bottom-btn">
        <div class="dandu" @click="myPay" :style="{backgroundColor:leftColor}">
          <span class="price-q"><slot name="leftText"></slot></span>
          <span class="price-w"><slot name="leftPrice"></slot></span>
        </div>
        <div class="pin" @click="allPay" :style="{backgroundColor:rightColor}">
          <span class="price-e"><slot name="rightText"></slot></span>
          <span class="price-r"><slot name="rightPrice"></slot></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon.vue'

export default {
  components: { LayoutIcon },
  props: {
    leftColor: {
      type: String,
      default: '#85D4B8'
    },
    rightColor: {
      type: String,
      default: '#26C78D'
    }
  },
  data () {
    return {}
  },
  methods: {
    myPay () {
      this.$emit('myPay')
    },
    allPay () {
      this.$emit('allPay')
    },
    goStore () {
      this.$emit('goStore')
    },
    goShare () {
      this.$emit('goShare')
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottom-last {
    width: 750rpx;
    height: 106rpx;
    padding: 10rpx;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-sizing: border-box;
    align-items: center;
  }

  .left-bottom {
    height: 86rpx;
    display: flex;
    align-items: center;
    padding-left: 54rpx;
  }

  .bottom-q {
    width: 50rpx;
    font-size: 13px;
    color: #666666
  }

  .dandu {
    width: 198rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    border-radius: 42rpx;
  }

  .pin {
    margin-left: 10rpx;
    width: 240rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    border-radius: 42rpx;
  }

  .bottom-btn {
    display: flex;
    align-items: center;
  }

  .price-q {
    font-size: 12px;
    color: #ffffff;
  }

  .price-w {
    font-size: 15px;
    color: #ffffff;
  }

  .price-e {
    font-size: 13px;
    color: #ffffff;
  }

  .price-r {
    font-size: 17px;
    color: #ffffff;
  }

</style>
