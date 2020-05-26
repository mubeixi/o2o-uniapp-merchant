<template>
  <view class="myall"  @click="commonClick">
    <view style="height: 10px;width: 100%;"></view>
    <view class="three">
      <view class="haha">
        姓名
      </view>
      <input class="inputs" type="text" placeholder="请输入您的姓名" placeholder-class="place" v-model="arr.apply_name">
    </view>
    <view class="three">
      <view class="haha">
        电话
      </view>
      <input class="inputs" type="number" placeholder="请输入您的电话" placeholder-class="place" v-model="arr.apply_mobile"
             @blur="isTell">
    </view>
    <view class="four" @click="submit">
      提交申请
    </view>
    <view class="five" @click="goRecord">
      查看申请记录
      <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
    </view>
  </view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { shaApply } from '@/api/customer'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      arr: {
        apply_name: '',
        apply_mobile: '',
      },
    }
  },
  methods: {
    goRecord () {
      uni.navigateTo({
        url: '/pagesA/distributor/RegionRecord?index=2',
      })
    },
    submit () {
      if (!this.arr.apply_name) {
        uni.showToast({
          title: '请输入姓名',
          icon: 'none',
        })
        return
      } else if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
        uni.showToast({
          title: '手机号输入错误，请重新输入',
          icon: 'none',
        })
        return
      }
      const info = {}
      info.apply_name = this.arr.apply_name
      info.apply_mobile = this.arr.apply_mobile
      shaApply(info).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pagesA/Distributor/Shareholder',
          })
        }, 1000)
      }).catch(e => {

      })
    },
    isTell () {
      if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
        uni.showToast({
          title: '手机号输入错误，请重新输入',
          icon: 'none',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .three {
    height: 88rpx;
    line-height: 88rpx;
    width: 710rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;

    .haha {
      font-size: 30rpx;
      color: #333333;
      margin-right: 42rpx;
    }

    .inputs {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 28rpx;
      color: #333333;
    }

    .place {
      font-size: 28rpx;
      color: #CAC8C8;
    }

    .myRadio {
      height: 88rpx;
      display: flex;

      .myRadioQ {
        height: 88rpx;
        display: flex;
        margin-right: 17rpx;

        .radio {
          transform: scale(0.7);
        }

        .mbx {
          font-size: 28rpx;
          color: #777777;
          margin-left: 13rpx;
        }
      }
    }

  }

  .four {
    width: 490rpx;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
    background: rgba(244, 49, 49, 1);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 70rpx;
    font-size: 30rpx;
    color: #FFFFFF;
  }

  .five {
    height: 23rpx;
    line-height: 23rpx;
    width: 174rpx;
    margin: 0 auto;
    margin-top: 21rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);

    .image {
      width: 12rpx;
      height: 20rpx;
      margin-left: 10rpx;
    }
  }

</style>
