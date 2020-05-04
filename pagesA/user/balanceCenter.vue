<template>
  <view class="boxSizing">
    <view class="zhezhao" v-if="isShow">
      <view class="zhezhaoView">
        <image :src="'/static/client/check/close.png'|domain" class="closeZ" @click="isShow=false"></image>
        <view class="zhezhaoYue">
          余额互转
        </view>
        <form report-submit @submit="confirm">
          <view class="zhezhaoCenter">
            <view class="views">
              <image mode="widthFix" class="imgs" :src="'/static/client/check/phone.png'|domain"></image>
              <input class="inputs" type="text" placeholder="请输入对方会员号" v-model="user_no">
            </view>
          </view>
          <view class="zhezhaoCenter">
            <view class="views">
              <image mode="widthFix" class="imgs" :src="'/static/client/check/money.png'|domain"></image>
              <input class="inputs" type="text" placeholder="请输入转出金额" v-model="money">
            </view>
          </view>
          <view class="zhezhaoCenter">
            <view class="views">
              <image mode="widthFix" class="imgs" src="/static/pay-paasword.png"></image>
              <input class="inputs" type="password" placeholder="请输入支付密码" v-model="user_pay_password"
                     @blur="user_password">
            </view>
          </view>
          <button formType="submit" class="zheButton">
            确认转出
          </button>
        </form>
      
      </view>
    
    </view>
    
    <view class="top" catchtouchmove>
      
      <image class="bgImg" :src="'/static/client/blance/bg.jpg'|domain"></image>
      <!-- <image class="back" @click="goBack" :src="'/static/client/check/left.png'|domain"></image>
      <view class="titleq">
        余额中心
      </view> -->
      
      <view class="dangqian">
        当前余额（元）
      </view>
      <view class="prices">
        {{Money}}
      </view>
      <view class="zhuanchu" @click="goWithdraw" v-if="initData.remainder_withdraw==1">
        提现
      </view>
      <view class="bottoms">
        <view class="lefts qwe" @click="goRecharge">
          <image class="image" :src="'/static/client/check/t1.png'|domain"></image>
          <text>余额充值</text>
        </view>
        <view class="line">
        </view>
        <view class="rights qwe" @click="goFacePay">
          <image class="image" :src="'/static/client/check/t2.png'|domain"></image>
          <text>余额转出</text>
        </view>
      </view>
    </view>
    
    <view class="selects">
      <view class="qwes" @click="changeCurrent('charge')" :class="{checked:current=='charge'}">
        收入
        <image class="imgQ" src="/static/moneySort.png"></image>
      </view>
      <view class="qwes" @click="changeCurrent('money')" :class="{checked:current=='money'}">
        支出
        <image class="imgQ" src="/static/moneySort.png"></image>
      </view>
      <view class="showCeng" v-if="showSure">
        <view class="priceInterval">时间区间</view>
        <view style="display: flex;align-content: center;padding-left: 10px;">
          <picker mode="date" @change="bindDateChange" class="picker">
            <view class="uni-input" v-if="beginTime">{{beginTime}}</view>
            <view class="uni-input" v-if="!beginTime">开始时间</view>
          </picker>
          <view class="centerPicker">
            —
          </view>
          <picker mode="date" @change="bindDateChanges" class="picker">
            <view class="uni-input" v-if="endTime">{{endTime}}</view>
            <view class="uni-input" v-if="!endTime">结束时间</view>
          </picker>
        </view>
        <view class="submit">
          <view class="view reset" @click="resets">重置</view>
          <view class="view sure" @click="sureSearch">确定</view>
        </view>
        <view class="zhao" @click="showSure=false" catchtouchmove>
        
        </view>
      </view>
    </view>
    
    <view class="contents" v-show="current=='charge'">
      <view class="mingxi  mingxiPlus">
        <view>
          总收入:{{records.total_get}}元
        </view>
        <view>
          总支出:{{records.total_pay}}元
        </view>
      </view>
      <view class="mingxi" v-for="(item,idx) in records.list" :key="idx">
        <view class="note">
          <view class="leftNote">{{item.Note}}</view>
          <view class="rightNote">{{'+'}}{{item.Amount}}元</view>
        </view>
        <view class="times">
          {{item.CreateTime}}
        </view>
      </view>
    </view>
    <view class="contents" v-show="current=='money'">
      
      <view class="mingxi  mingxiPlus">
        <view>
          总收入:{{records.total_get}}元
        </view>
        <view>
          总支出:{{records.total_pay}}元
        </view>
      </view>
      <view class="mingxi" v-for="(item,idx) in records.list" :key="idx">
        <view class="note">
          <view class="leftNote">{{item.Note}}</view>
          <view class="rightNote">{{item.Amount}}元</view>
        </view>
        <view class="times">
          {{item.CreateTime}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import '@/common/tool/TweenMax.min'
import BaseMixin from '@/mixins/BaseMixin'
import { getUserChargeRecord, getUserInfo, getUserMoneyRecord, transferBalance } from '@/api/customer'

import { mapActions } from 'vuex'
import { confirm, error } from '@/common/fun'
import { checkIsLogin } from '@/common/helper'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      showSure: false,
      endTime: '',
      beginTime: '',
      isShow: false,
      info: {},
      current: 'charge',
      charge_records: [],
      records: {
        list: [],
        total_get: '',
        total_pay: '',
      },
      user_no: '', // 会员号
      user_pay_password: '',
      money: '', // 转出金额
      chargePage: 1, // 充值记录分页
      moneyPage: 1, // 资金流水分页
      pageSize: 10,
      moneyMore: false, // 资金流水是否还有更多
      chargeMore: false, // 充值记录是否还有更多
      Umoney: 0,
      s_money: 0,
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
    Money: function () {
      return Number(this.Umoney).toFixed(2)
    },
  },
  watch: {
    s_money: function (newVal, oldVal) {
      var newValue = parseFloat(newVal)
      // eslint-disable-next-line no-undef
      TweenLite.to(this.$data, 0.5, { Umoney: newValue })
    },
  },
  onReachBottom () {
    if (this.current === 'charge') {
      // 充值记录
      if (this.moneyMore) {
        this.moneyPage++
        this.get_user_money_record(1)
      }
    } else if (this.current === 'money') {
      // 资金流水
      if (this.moneyMore) {
        this.moneyPage++
        this.get_user_money_record(2)
      }
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: 'user/setUserInfo',
    }),
    // 用户输入密码完毕
    user_password (e) {
      this.user_pay_password = e.detail.value
    },
    sureSearch () {
      if (this.beginTime && this.endTime) {
        var startTmp = this.beginTime.split('-')
        var endTmp = this.endTime.split('-')
        var sd = new Date(startTmp[0], startTmp[1], startTmp[2])
        var ed = new Date(endTmp[0], endTmp[1], endTmp[2])
        if (sd.getTime() > ed.getTime()) {
          uni.showToast({
            title: '开始时间不得大于结束时间',
            icon: 'none',
          })
          return
        }
      }
      
      if (this.current === 'charge') {
        this.get_user_money_record(1)
      } else {
        this.get_user_money_record(2)
      }
      this.showSure = false
    },
    resets () {
      this.beginTime = ''
      this.endTime = ''
    },
    bindDateChange (e) {
      this.beginTime = e.target.value
    },
    bindDateChanges (e) {
      this.endTime = e.target.value
    },
    changeCurrent (value) {
      if (this.current === value) {
        this.showSure = !this.showSure
        return
      }
      this.showSure = false
      this.beginTime = ''
      this.endTime = ''
      this.current = value
      this.chargePage = 1
      this.moneyPage = 1
      this.charge_records = []
      
      this.moneyMore = false
      this.chargeMore = false
      if (this.current === 'charge') {
        this.get_user_money_record(1)
      } else {
        this.get_user_money_record(2)
      }
    },
    goWithdraw () {
      uni.navigateTo({
        url: '/pagesA/distributor/Withdrawal?form=2',
      })
    },
    goFacePay () {
      // 改成需要密码
      if (this.userInfo.hasOwnProperty('User_PayPassword') && !this.userInfo.User_PayPassword) {
        confirm({
          title: '提示',
          content: '该操作需要设置支付密码,是否前往设置?',
          confirmText: '去设置',
          cancelText: '暂不设置',
        }).then(res => {
          uni.navigateTo({
            url: '/pagesA/user/updateUserPsw?type=1&is_back=1',
          })
        }).catch(err => {
          error('请选择其他支付方式')
        })
        return
      }
      
      this.isShow = true
      // uni.navigateTo({
      // 	url:'/pages/storePay/storePay'
      // })
    },
    goBack () {
      uni.navigateBack(1)
    },
    goRecharge () {
      uni.navigateTo({
        url: '/pagesA/user/BalanceRecharge',
      })
    },
    confirm (e) {
      const _self = this
      
      if (this.money === '' || isNaN(this.money) || (this.money < 0)) {
        uni.showToast({
          title: '输入金额有误',
          icon: 'none',
        })
        return
      }
      if (this.user_no === '') {
        uni.showToast({
          title: '转出会员号不能为空',
          icon: 'none',
        })
        return
      }
      
      if (!this.user_pay_password) {
        error('请输入支付密码')
        return
      }
      
      transferBalance({
        money: this.money,
        pay_passwd: this.user_pay_password,
        user_no: this.user_no,
      }).then(res => {
        _self.money = ''
        _self.user_no = ''
        _self.user_pay_password = ''
        uni.showToast({
          title: res.msg,
          duration: 1500,
        })
        // this.setUserInfo({});
        setTimeout(() => {
          // 重新获取积分信息
          getUserInfo().then(res => {
            this.info = res.data
            this.s_money = res.data.User_Money
            // 更新用户信息
            this.setUserInfo(res.data)
          })
        }, 1500)
      }, err => {
        _self.money = ''
        _self.user_no = ''
        _self.user_pay_password = ''
        uni.showToast({
          title: err.msg,
          icon: 'none',
        })
      })
      this.isShow = false
    },
    get_user_money_record (item) {
      const data = {
        page: this.moneyPage,
        pageSize: this.pageSize,
        begin_time: this.beginTime,
        end_time: this.endTime,
      }
      if (item === 1) {
        data.money_type = 1
      } else {
        data.money_type = 2
      }
      
      getUserMoneyRecord(data).then(res => {
        
        this.records = []
        if (this.moneyPage !== 1) {
          const old = this.records.list
          this.records = res.data
          this.records.list = old.concat(res.data.list)
        } else {
          this.records = res.data
        }
        if (this.records.list.length < res.totalCount) {
          this.moneyMore = true
        } else {
          this.moneyMore = false
        }
      }).catch()
    },
    get_user_charge_record () {
      getUserChargeRecord({
        page: this.chargePage,
        pageSize: this.pageSize,
      }).then(res => {
        if (this.chargePage !== 1) {
          const old = this.charge_records
          this.charge_records = old.concat(res.data)
        } else {
          this.charge_records = res.data
        }
        if (this.charge_records.length < res.totalCount) {
          this.chargeMore = true
        } else {
          this.chargeMore = false
        }
      }).catch()
    },
    // 重置
    reset () {
      this.chargePage = 1
      this.moneyPage = 1
      // this.charge_records = [];
      // this.records = [];
      this.moneyMore = false
      this.chargeMore = false
    },
  },
  onLoad () {
    checkIsLogin(1)
  },
  onShow () {
    this.user_no = ''
    this.money = ''
    this.reset()
    getUserInfo().then(res => {
      this.info = res.data
      this.s_money = res.data.User_Money
    }, err => {
    }).catch()
    this.get_user_money_record(1)
  },
}
</script>

<style lang="scss" scoped>
  view {
    box-sizing: border-box;
  }
  
  .boxSizing {
    /*background-color: #FFFFFF;*/
    background: #F8F8F8;
    width: 750 rpx;
    overflow-x: hidden;
    height: 100vh;
  }
  
  .top {
    width: 750 rpx;
    height: 537 rpx;
    position: relative;
    background-color: #FFFFFF;
    
    .bgImg {
      margin-top: -50rpx;
      width: 114%;
      height: 100%;
    }
    
    .bottoms {
      width: 690 rpx;
      height: 133 rpx;
      background-color: #fff;
      position: absolute;
      box-shadow: 0px 8px 64px 0px rgba(4, 0, 0, 0.14);
      border-radius: 132px;
      bottom: 68 rpx;
      left: 30 rpx;
      display: flex;
      align-items: center;
      padding: 38 rpx 40 rpx 37 rpx 40 rpx;
      
      .image {
        width: 58 rpx;
        height: 58 rpx;
      }
      
      .line {
        width: 2 rpx;
        height: 50 rpx;
        /*background: red;*/
        margin: 0 20 rpx;
        /*flex: 1;*/
        background: rgba(240, 239, 240, 1);
      }
      
      .qwe {
        
        flex: 1;
        text-align: left;
        height: 58 rpx;
        line-height: 58 rpx;
        font-size: 34 rpx;
        color: #4C4C4C;
        display: flex;
        align-items: center;
        
        .image {
          width: 58 rpx;
          height: 58 rpx;
        }
        
        &.lefts {
        
        }
        
        text {
          margin-left: 20 rpx;
        }
      }
      
    }
    
    .back {
      width: 21 rpx;
      height: 38 rpx;
      position: absolute;
      left: 24 rpx;
      top: 25 rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .titleq {
      font-size: 36 rpx;
      height: 34 rpx;
      line-height: 34 rpx;
      color: #FFFFFF;
      position: absolute;
      left: 70 rpx;
      top: 25 rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .dangqian {
      font-size: 28 rpx;
      color: #FFFFFF;
      height: 28 rpx;
      line-height: 28 rpx;
      position: absolute;
      left: 39 rpx;
      top: 110 rpx;
      /* #ifdef APP-PLUS */
      // margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .prices {
      font-family: Arial;
      font-size: 80 rpx;
      height: 61 rpx;
      line-height: 61 rpx;
      position: absolute;
      left: 39 rpx;
      top: 175 rpx;
      color: #FFFFFF;
      font-weight: 200;
      /* #ifdef APP-PLUS */
      // margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .zhuanchu {
      width: 170 rpx;
      height: 74 rpx;
      line-height: 74 rpx;
      text-align: center;
      font-size: 30 rpx;
      color: #FFFFFF;
      font-weight: bold;
      background-color: #ff9175;
      border-radius: 16 rpx;
      position: absolute;
      top: 130 rpx;
      right: 24 rpx;
    }
    
  }
  
  .selects {
    height: 110 rpx;
    width: 750 rpx;
    background-color: #FFFFFF;
    display: flex;
    position: relative;
    
    .qwes {
      width: 375 rpx;
      height: 110 rpx;
      line-height: 110 rpx;
      text-align: center;
      font-size: 32 rpx;
      color: #666666;
      position: relative;
      
      .imgQ {
        width: 35px;
        height: 35px;
        position: absolute;
        top: 12px;
        right: 35px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
    
    .checked {
      color: #FF5C33;
      
      &:after {
        content: '';
        display: block;
        width: 145 rpx;
        height: 4 rpx;
        background-color: #FF5C33;
        position: absolute;
        bottom: 0 rpx;
        left: 50%;
        margin-left: -73rpx;
      }
    }
  }
  
  .contents {
    width: 750 rpx;
    padding: 17 rpx 0 rpx 32 rpx 0 rpx;
    background-color: #F8F8F8;
    
    .mingxi {
      /*height: 115rpx;*/
      width: 700 rpx;
      padding: 20 rpx 0;
      border-bottom: 1 rpx solid #EAEAEA;
      /*display: flex;*/
      /*justify-content: space-between;*/
      align-items: center;
      font-size: 28 rpx;
      color: #333333;
      margin-left: 24 rpx;
      margin-right: 26 rpx;
      box-sizing: border-box;
      
      &:first-child {
        padding-top: 0;
      }
      
      .note {
        color: #555;
        display: flex;
        justify-content: space-between;
        
        .rightNote {
          width: 200 rpx;
          text-align: right;
        }
        
        .leftNote {
          width: 500 rpx;
        }
      }
      
      .times {
        color: #999999;
        font-size: 20 rpx;
        height: 20 rpx;
        line-height: 24 rpx;
        margin-top: 8 rpx;
        margin-left: 4 rpx;
      }
    }
  }
  
  .zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0 rpx;
    left: 0 rpx;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: .3);
    
    .zhezhaoView {
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      width: 503 rpx;
      /*height: 564rpx;*/
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 123 rpx;
      padding-bottom: 15px;
    }
    
    .closeZ {
      width: 47 rpx;
      height: 47 rpx;
      position: absolute;
      bottom: -100rpx;
      transform: translateX(-50%);
      left: 50%;
    }
    
    .zhezhaoYue {
      height: 157 rpx;
      width: 503 rpx;
      font-size: 32 rpx;
      color: #333333;
      text-align: center;
      line-height: 157 rpx;
    }
    
    .zhezhaoCenter {
      width: 100%;
      margin-top: 13 rpx;
      padding: 0 rpx 52 rpx;
      
      .views {
        height: 90 rpx;
        display: flex;
        align-items: center;
        
        .inputs {
          border-bottom: 1 rpx solid #F4F4F4;
          font-size: 24 rpx;
          margin-left: 16 rpx;
        }
      }
      
      .imgs {
        width: 26 rpx;
        height: 38 rpx;
        
      }
    }
    
    .zheButton {
      width: 400 rpx;
      height: 76 rpx;
      line-height: 76 rpx;
      background: rgba(255, 92, 51, 1);
      border-radius: 60 rpx;
      text-align: center;
      margin-top: 40 rpx;
      margin-left: 52 rpx;
      font-size: 30 rpx;
      color: #FFFFFF;
    }
  }
  
  .mingxiPlus {
    display: flex;
    width: 750 rpx !important;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    margin: 0px !important;
    padding-left: 26 rpx !important;
    padding-right: 40px !important;
  }
  
  .showCeng {
    background-color: #FFFFFF;
    position: absolute;
    width: 750 rpx;
    z-index: 999;
    top: 60px;
    box-sizing: border-box;
    padding-top: 20px;
    
    .picker {
      background: whitesmoke;
      border-radius: 15px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: rgb(153, 153, 153);
      text-align: center;
      width: 150px;
    }
    
    .centerPicker {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: rgb(153, 153, 153);
      margin-left: 10px;
      margin-right: 10px;
    }
    
    .submit {
      display: flex;
      width: 100%;
      height: 80 rpx;
      padding-left: 0 rpx;
      padding-right: 0 rpx;
      margin-top: 30px;
      
      .view {
        width: 50%;
        height: 80 rpx;
        line-height: 80 rpx;
        text-align: center;
        color: #FFFFFF;
        font-size: 30 rpx;
      }
      
      .reset {
        background-color: #B9B9B9;
      }
      
      .sure {
        background-color: #F43131;
      }
    }
    
    .zhao {
      height: 230px;
      width: 100%;
      padding-left: 0 rpx;
      padding-right: 0 rpx;
      //background: rgba(0, 0, 0, .3);
      //position: fixed;
      z-index: 998;
      position: absolute;
      background-color: #000;
      opacity: 0.6;
    }
    
    .priceInterval {
      font-size: 26 rpx;
      color: #999999;
      margin-bottom: 20px;
      height: 27 rpx;
      line-height: 27 rpx;
      padding-left: 10px;
    }
  }

</style>
