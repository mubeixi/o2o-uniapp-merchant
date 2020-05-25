<template>
  <view class="all" @click="commonClick">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background: #fff"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    <page-title title="我的提现方式" :rightHidden="false" bgcolor="#ffffff" :right="isShow ? '取消' : '管理'"
                @rightHandle="handle"></page-title>
    <view class="content">
      <block v-for="(item,index) of data " :key="index">
        <view class="cardInfo" @click="change(item)" v-if="item.Method_Type=='bank_card'||item.Method_Type=='alipay'">
          {{item.Method_Name}} （{{item.Account_Val}}）
          <image class="image" :src="'/static/client/distributor/xuanzhong.png'|domain"
                 v-if="User_Method_ID==item.User_Method_ID&&!isShow"></image>
          <image class="image del" src="/static/red-del.png" v-else-if="isShow" @click="del(item)"></image>
        </view>
        <view class="cardInfo" @click="change(item)" v-else>
          {{item.Method_Name}}
          <image class="image" :src="'/static/client/distributor/xuanzhong.png'|domain"
                 v-if="User_Method_ID==item.User_Method_ID&&!isShow"></image>
          <image class="image del" src="/static/red-del.png" v-else-if="isShow" @click="del(item)"></image>
        </view>
      </block>
    </view>
    <view class="addMethod" @click="addMethod">
      + 添加提现方式
    </view>
  </view>
</template>

<script>
import Storage from '@/common/Storage'
import { delUserWithdrawMethod, getUserWithdrawMethod } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

import PageTitle from '@/componets/page-title/page-title'

export default {
  components: { PageTitle },
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      data: [], // 用户提现方式
      User_Method_ID: -1, // 传过来选中的提现方式
      isShow: false, // 是否显示删除
      withdraw_from: 1,
    }
  },
  onLoad (options) {
    const that = this
    this.withdraw_from = options.from
    if (that.User_Method_ID) {
      that.User_Method_ID = options.User_Method_ID
    }
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
  },
  onShow () {
    this.$vm.$on('fir', (data) => {
      this.User_Method_ID = data
    })
    this.getUserWithdrawMethod()
  },
  methods: {
    // 删除提现方式
    del (item) {
      const that = this
      const data = {
        User_Method_ID: item.User_Method_ID,
      }
      uni.showModal({
        title: '确定要删除吗？',
        content: ' ',
        success: function (res) {
          if (res.confirm) {
            delUserWithdrawMethod(data).then(res => {
              uni.showToast({
                title: res.msg,
              })
              that.getUserWithdrawMethod()
            }).catch(e => {
            })
          }
        },
      })
    },
    // 管理切换选中 删除
    handle () {
      this.isShow = !this.isShow
    },
    // 选中提现方式
    change (item) {
      if (this.isShow) {
        this.del(item)
        return
      }
      this.User_Method_ID = item.User_Method_ID
      Storage.set('myMethod', this.User_Method_ID)

      // 返回上一页
      uni.navigateBack({
        delta: 1,
      })
    },
    // 获取用户提现方式
    getUserWithdrawMethod () {
      getUserWithdrawMethod().then(res => {
        this.data = res.data.list
      }).catch(() => {
      })
    },
    // 添加提现方式
    addMethod () {
      uni.navigateTo({
        url: '/pagesA/distributor/AddWithdrawal?form=' + this.withdraw_from,
      })
    },
  },
}
</script>

<style scoped lang="scss">
  .all {
    background-color: #f8f8f8;
    box-sizing: border-box;
    min-height: 100vh;
  }

  .content {
    margin: 0 auto;
    margin-top: 40rpx;
    width: 710rpx;

    .cardInfo {
      box-sizing: border-box;
      width: 710rpx;
      height: 75rpx;
      line-height: 75rpx;
      margin-bottom: 20rpx;
      background-color: #FFFFFF;
      border-radius: 5rpx;
      padding-left: 30rpx;
      position: relative;
      font-size: 28rpx;
      color: #333333;

      &:last-child {
        margin-bottom: 0rpx;
      }

      .image {
        width: 32rpx;
        height: 23rpx;
        position: absolute;
        top: 26rpx;
        right: 35rpx;
      }
    }

  }

  .del {
    width: 25rpx !important;
    height: 30rpx !important;
  }

  .addMethod {
    width: 460rpx;
    height: 76rpx;
    line-height: 76rpx;
    background: #F43131;
    border-radius: 10rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 30rpx;
    color: #FFFFFF;
    margin-top: 128rpx;
    margin-bottom: 100rpx;
  }
</style>
