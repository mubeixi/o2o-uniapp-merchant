<template>
  <view class="myall" @click="commonClick">

    <view class="center">
      <view class="left">
        提现方式
      </view>
      <view class="right">
        <!-- 中国银行 <image :src="'/static/client/right.png'|domain"></image> -->
        <picker @change="bindPickerChange" :value="index" :range="array" range-key="Method_Name">
          <view class="uni-input">{{array[index].Method_Name}}</view>
        </picker>
        <layout-icon type="iconicon-arrow-right"></layout-icon>
      </view>
    </view>

    <form report-submit @submit="addInfo">

      <block v-if="data.Method_Type=='bank_card'">
        <view class="centers">
          <view class="left">
            户名
          </view>
          <input class="inputs" type="text" placeholder="请输入您的户名" placeholder-style="places"
                 v-model="data.Account_Name">
        </view>
        <view class="centers">
          <view class="left">
            账号
          </view>
          <input class="inputs" type="text" placeholder="请输入您的银行卡卡号" placeholder-style="places"
                 v-model="data.Account_Val">
        </view>
        <!-- <view class="centers">
          <view class="left">
            开户行
          </view>
          <input type="text" placeholder="请输入您的开户行" placeholder-style="places" v-model="data.Bank_Position">
        </view> -->
      </block>
      <block v-else-if="data.Method_Type=='alipay'">
        <view class="centers">
          <view class="left">
            昵称
          </view>
          <input class="inputs" type="text" placeholder="请输入您的昵称" placeholder-style="places"
                 v-model="data.Account_Name">
        </view>
        <view class="centers">
          <view class="left">
            账号
          </view>
          <input class="inputs" type="text" placeholder="请输入您的支付宝账号" placeholder-style="places"
                 v-model="data.Account_Val">
        </view>
      </block>
      <button formType="submit" class="addInfo">
        添加
      </button>
    </form>
  </view>
</template>

<script>

import { addUserWithdrawMethod, getShopWithdrawMethod } from '@/api/customer'
import { mapActions, mapGetters } from 'vuex'
import BaseMixin from '@/mixins/BaseMixin'
import { backFunc } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  components: { LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {
      array: [],
      index: 0, // 选择提现方式下表
      data: {
        Method_ID: '',
        Method_Type: '', // 提现方式类型
        Method_Name: '', // 提现方式名称
        Account_Name: '', // 户名
        Account_Val: '', // 账号
        Bank_Position: ''// 开户行
      },
      withdraw_from: 1

    }
  },
  onLoad (options) {
    this.withdraw_from = options.form
  },
  onShow () {
    // 获取商城提现方式
    this.getShopWithdrawMethod()
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    ...mapActions(['getInitData', 'setUserInfo']),
    // 新增提现方式
    async addInfo (e) {
      let data = {}
      if (this.data.Method_Type === 'bank_card') {
        data = {
          Method_ID: this.data.Method_ID, // 提现方式类型
          // Method_Name:this.data.Method_Name,//提现方式名称
          Account_Name: this.data.Account_Name, // 户名
          Account_Val: this.data.Account_Val, // 账号
          Bank_Position: this.data.Bank_Position // 开户行
        }
      } else if (this.data.Method_Type === 'alipay') {
        data = {
          Method_ID: this.data.Method_ID, // 提现方式类型
          // Method_Name:this.data.Method_Name,//提现方式名称
          Account_Name: this.data.Account_Name, // 户名
          Account_Val: this.data.Account_Val// 账号
        }
      } else {
        data = {
          Method_ID: this.data.Method_ID// 提现方式类型
          // Method_Name:this.data.Method_Name//提现方式名称
        }
      }
      const that = this
      addUserWithdrawMethod(data).then(res => {
        const User_Method_ID = res.data.User_Method_ID
        uni.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(function () {
          uni.$emit('fir', User_Method_ID)
          // 返回上一页
          backFunc()
        }, 1000)
      }).catch(e => {

      })
    },
    // 获取商城提现方式
    getShopWithdrawMethod () {
      getShopWithdrawMethod().then(res => {
        this.array = res.data
        // 初始化第一个提现类型默认选择的
        this.data.Method_Type = this.array[0].Method_Type
        this.data.Method_Name = this.array[0].Method_Name
        this.data.Method_ID = this.array[0].Method_ID
      }).catch(err => {

      })
    },
    bindPickerChange (e) {
      this.index = e.target.value
      this.data.Method_Type = this.array[this.index].Method_Type
      this.data.Method_Name = this.array[this.index].Method_Name
      this.data.Method_ID = this.array[this.index].Method_ID
    }
  }
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .center {
    margin-top: 19rpx;
    width: 710rpx;
    height: 88rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #E3E3E3;
    justify-content: space-between;

    .left {
      font-size: 28rpx;
      color: #333333;
      width: 125rpx;
    }

    .right {
      font-size: 26rpx;
      color: #888888;
      display: flex;
      align-items: center;

      .image {
        width: 15rpx;
        height: 23rpx;
        margin-left: 14rpx;
      }
    }
  }

  .centers {
    margin-top: 19rpx;
    width: 710rpx;
    height: 88rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    border-bottom: 1rpx solid #E3E3E3;
    position: relative;

    .left {
      width: 125rpx;
      font-size: 28rpx;
      color: #333333;
    }

    .inputs {
      width: 570rpx;
      color: #333333;
      font-size: 24rpx;
    }
  }

  .places {
    color: #B8B8B8;
    font-size: 24rpx;
  }

  .addInfo {
    width: 580rpx;
    height: 76rpx;
    line-height: 76rpx;
    margin: 0 auto;
    background: rgba(244, 49, 49, 1);
    border-radius: 10rpx;
    margin-top: 124rpx;
    font-size: 32rpx;
    color: #FFFFFF;
    text-align: center;
  }
</style>
