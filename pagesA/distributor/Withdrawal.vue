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
    width: 750 rpx;
    min-height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .content {
    background-color: #FFFFFF;
    width: 710 rpx;
    margin: 40 rpx 20 rpx 0 rpx 20 rpx;
    padding-bottom: 85 rpx;
    border-radius: 10 rpx;
    
    .bank {
      width: 710 rpx;
      background-color: #EEEEEE;
      height: 100 rpx;
      padding: 0 rpx 30 rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      
      .bankCard {
        width: 50 rpx;
        height: 50 rpx;
        margin-right: 18 rpx;
      }
      
      .bankName {
        font-size: 28 rpx;
        color: #333333;
      }
      
      .right {
        width: 18 rpx;
        height: 27 rpx;
        margin-left: auto;
      }
    }
    
    .guanli {
      font-size: 28 rpx;
      color: #5E9BFF;
      line-height: 100 rpx;
      display: block;
      text-align: center;
    }
    
    .tiMoney {
      width: 710 rpx;
      height: 25 rpx;
      line-height: 25 rpx;
      margin: 68 rpx 0 rpx 68 rpx 30 rpx;
      font-size: 26 rpx;
      color: #333333;
    }
    
    .inputMoney {
      width: 650 rpx;
      height: 66 rpx;
      margin-left: 30 rpx;
      margin-right: 30 rpx;
      border-bottom: 1 rpx solid #ECE8E8;
      display: flex;
      font-size: 48 rpx;
      color: #333333;
      padding-bottom: 30 rpx;
      
      .input-money-inner {
        height: 35 rpx;
        line-height: 35 rpx;
        display: flex;
        align-items: center;
        
        .input-money-input {
          margin-left: 20 rpx;
          height: 35 rpx;
          width: 600 rpx;
        }
      }
    }
    
    .canTi {
      width: 670 rpx;
      height: 76 rpx;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      .canTiMoney {
        font-size: 22 rpx;
        color: #999999;
      }
      
      .allTi {
        font-size: 22 rpx;
        color: #69A1FF;
      }
    }
    
    .kong {
      background-color: #F8F8F8;
      width: 690 rpx;
      margin: 0 auto;
      height: 20 rpx;
    }
    
    .tishi {
      margin-top: 27 rpx;
      margin-left: 32 rpx;
      margin-right: 33 rpx;
      width: 645 rpx;
      display: flex;
      
      .tishi-image {
        width: 22 rpx;
        height: 22 rpx;
        margin-right: 10 rpx;
        margin-top: 5 rpx;
      }
      
      .tishi-view {
        width: 613 rpx;
        font-size: 20 rpx;
        color: #999999;
      }
    }
    
    .liji {
      margin-top: 98 rpx;
      width: 620 rpx;
      height: 80 rpx;
      line-height: 80 rpx;
      background: #F43131;
      border-radius: 10 rpx;
      margin-left: 50 rpx;
      margin-right: 40 rpx;
      text-align: center;
      font-size: 34 rpx;
      color: #FFFFFF;
    }
    
    .lishi {
      height: 21 rpx;
      // width: 106rpx;
      margin-top: 25 rpx;
      margin-left: 565 rpx;
      font-size: 22 rpx;
      color: #999999;
      display: flex;
      align-items: center;
      
      .lishi-image {
        width: 12 rpx;
        height: 20 rpx;
        margin-left: 6 rpx;
      }
    }
  }
</style>
