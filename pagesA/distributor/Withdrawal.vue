<template>
  <view class="all">
    <view class="content">
      <view class="bank" v-if="isShow" @click="goMethod">
        <image :src="initData.ShopLogo|domain" class="bankCard"></image>
        <view class="bankName" v-if="data.Method_Type=='bank_card'||data.Method_Type=='alipay'">
          {{data.Method_Name}}({{data.Account_Val}})
        </view>
        <view class="bankName" v-else>
          {{data.Method_Name}}
        </view>
        <image :src="'/static/client/distributor/right.png'|domain" class="right"></image>
      </view>
      <view class="bank guanli" @click="guanWithdrawal" v-else>
        + 管理提现方式
      </view>
      <view class="tiMoney">
        提现金额
      </view>
      <view class="inputMoney">
        <view class="input-money-inner">
          ¥ <input class="input-money-input" type="number" v-model="price">
        </view>
      </view>
      <view class="canTi">
        <view class="canTiMoney">
          可提现金额：{{balance}}元
        </view>
        <view class="allTi" @click="allTi">
          全部提现
        </view>
      </view>
      <view class="kong">
      
      </view>
      <view class="tishi">
        <image class="tishi-image" :src="'/static/client/distributor/tishi.png'|domain"></image>
        <view class="tishi-view">
          申请提现后，系统会自动扣除您提现的{{init.Poundage_Ratio}}%的手续费
          <block v-if="withdraw_from==1">
            ，{{init.Balance_Ratio}}%转入您的会员余额，{{100-init.Poundage_Ratio-init.Balance_Ratio}}%店主会将钱打入您的账号；若全部转入余额则不扣除手续费。
          </block>
        </view>
      </view>
      <view class="liji" @click="withdrawApply">
        立即提现
      </view>
      <view class="lishi" @click="goRecord">
        历史提现
        <image class="lishi-image" :src="'/static/client/distributor/right.png'|domain"></image>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import Storage from '@/common/Storage'
import { getUserWithdrawMethod, getWithdrawConfig, withdrawApply } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      isShow: false, // 可删除控制显示银行卡 还是管理
      data: {},
      balance: 0, // 可提现金额
      User_Method_ID: 0, // 传过来选中的提现方式
      price: '', // 提现金额
      isQing: false, // 是否发起提现
      init: {},
      withdraw_from: 1,
    }
  },
  onLoad (options) {
    const that = this
    if (options.form === 1) {
      this.withdraw_from = 1
    }
    if (options.form === 2) {
      this.withdraw_from = 2
    }
    if (options.User_Method_ID) {
      that.User_Method_ID = options.User_Method_ID
    }
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
    getWithdrawConfig().then(res => {
      this.init = res.data
    })
  },
  computed: {
    ...mapGetters(['initData']),
  },
  onShow () {
    // 获取我的提现方式
    this.getUserWithdrawMethod()
  },
  methods: {
    // 申请记录
    goRecord () {
      uni.navigateTo({
        url: '/pagesA/distributor/Record',
      })
    },
    // 申请提现
    withdrawApply () {
      const that = this
      if (that.isQing) {
        return
      }
      that.isQing = true
      if (isNaN(this.price)) {
        uni.showToast({
          title: '输入金额有误,请重新输入',
          icon: 'none',
        })
        this.price = ''
        that.isQing = false
        return
      }
      
      if (this.price === '') {
        uni.showToast({
          title: '未输入金额',
          icon: 'none',
        })
        this.price = ''
        that.isQing = false
        return
      }
      if (this.User_Method_ID <= 0) {
        this.$error('请添加提现方式')
        this.isQing = false
        setTimeout(function () {
          uni.navigateTo({
            url: '/pagesA/distributor/AddWithdrawal?form=' + this.withdraw_from,
          })
        }, 1000)
        return
      }
      const data = {
        User_Method_ID: this.User_Method_ID,
        money: this.price,
        withdraw_from: this.withdraw_from,
      }
      withdrawApply(data).then(res => {
        setTimeout(() => {
          that.isQing = false
        }, 4000)
        this.getUserWithdrawMethod()
        
        // 提现成功清除金额
        that.price = ''
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
      }).catch(e => {
        that.isQing = false
      })
    },
    // 全部提现
    allTi () {
      this.price = this.balance
    },
    getUserWithdrawMethod () {
      getUserWithdrawMethod().then(res => {
        if (this.withdraw_from === 1) {
          this.balance = res.data.balance
        }
        if (this.withdraw_from === 2) {
          this.balance = res.data.user_money
        }
        
        this.User_Method_ID = Storage.get('myMethod')
        Storage.remove('myMethod')
        if (res.data.list.length > 0) {
          this.isShow = true
        } else {
          this.isShow = false
          this.User_Method_ID = 0
        }
        if (this.User_Method_ID) {
          for (const item of res.data.list) {
            if (item.User_Method_ID === this.User_Method_ID) {
              this.data = item
            }
          }
        } else {
          this.data = res.data.list[0]
          this.User_Method_ID = res.data.list[0].User_Method_ID
        }
      }).catch(err => {
      
      })
    },
    // 我的提现方式
    goMethod () {
      uni.navigateTo({
        url: '/pagesA/distributor/WithdrawalMethod?User_Method_ID=' + this.data.User_Method_ID + '&from=' + this.withdraw_from,
      })
    },
    // 管理提现方式
    guanWithdrawal () {
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
    width: 750rpx;
    min-height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .content {
    background-color: #FFFFFF;
    width: 710rpx;
    margin: 40rpx 20rpx 0rpx 20rpx;
    padding-bottom: 85rpx;
    border-radius: 10rpx;
    
    .bank {
      width: 710rpx;
      background-color: #EEEEEE;
      height: 100rpx;
      padding: 0rpx 30rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      
      .bankCard {
        width: 50rpx;
        height: 50rpx;
        margin-right: 18rpx;
      }
      
      .bankName {
        font-size: 28rpx;
        color: #333333;
      }
      
      .right {
        width: 18rpx;
        height: 27rpx;
        margin-left: auto;
      }
    }
    
    .guanli {
      font-size: 28rpx;
      color: #5E9BFF;
      line-height: 100rpx;
      display: block;
      text-align: center;
    }
    
    .tiMoney {
      width: 710rpx;
      height: 25rpx;
      line-height: 25rpx;
      margin: 68rpx 0rpx 68rpx 30rpx;
      font-size: 26rpx;
      color: #333333;
    }
    
    .inputMoney {
      width: 650rpx;
      height: 66rpx;
      margin-left: 30rpx;
      margin-right: 30rpx;
      border-bottom: 1rpx solid #ECE8E8;
      display: flex;
      font-size: 48rpx;
      color: #333333;
      padding-bottom: 30rpx;
      
      .input-money-inner {
        height: 35rpx;
        line-height: 35rpx;
        display: flex;
        align-items: center;
        
        .input-money-input {
          margin-left: 20rpx;
          height: 35rpx;
          width: 600rpx;
        }
      }
    }
    
    .canTi {
      width: 670rpx;
      height: 76rpx;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .canTiMoney {
        font-size: 22rpx;
        color: #999999;
      }
      
      .allTi {
        font-size: 22rpx;
        color: #69A1FF;
      }
    }
    
    .kong {
      background-color: #F8F8F8;
      width: 690rpx;
      margin: 0 auto;
      height: 20rpx;
    }
    
    .tishi {
      margin-top: 27rpx;
      margin-left: 32rpx;
      margin-right: 33rpx;
      width: 645rpx;
      display: flex;
      
      .tishi-image {
        width: 22rpx;
        height: 22rpx;
        margin-right: 10rpx;
        margin-top: 5rpx;
      }
      
      .tishi-view {
        width: 613rpx;
        font-size: 20rpx;
        color: #999999;
      }
    }
    
    .liji {
      margin-top: 98rpx;
      width: 620rpx;
      height: 80rpx;
      line-height: 80rpx;
      background: #F43131;
      border-radius: 10rpx;
      margin-left: 50rpx;
      margin-right: 40rpx;
      text-align: center;
      font-size: 34rpx;
      color: #FFFFFF;
    }
    
    .lishi {
      height: 21rpx;
      // width: 106rpx;
      margin-top: 25rpx;
      margin-left: 565rpx;
      font-size: 22rpx;
      color: #999999;
      display: flex;
      align-items: center;
      
      .lishi-image {
        width: 12rpx;
        height: 20rpx;
        margin-left: 6rpx;
      }
    }
  }
</style>
