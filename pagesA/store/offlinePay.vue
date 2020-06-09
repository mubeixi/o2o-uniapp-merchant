<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="input-box">
      <input @confirm="subFn" class="input" confirm-type="done" placeholder="请输入消费金额" type="digit" v-model="payMoney" />
    </div>
    <button @click="subFn" class="sub" type="warn">支付</button>
    
    <div class="zhezhao" v-if="password_input">
      <div class="input-wrap">
        <div>请输入余额支付密码</div>
        <input @input="user_password" class="input" placeholder="请输入密码" type="password">
        <div class="btns">
          <div @click="cancelInput" class="btn">取消</div>
          <div @click="confirmInput" class="btn">确定</div>
        </div>
      </div>
    </div>
    
    <layout-layer ref="payChannelList">
      <div class="pay-channel-list bg-white fz-14">
        <block :key="index" v-for="(item,index) in initData.pay_arr">
          <div @click="chooseType(index)" class="pay-channel-item c5 flex flex-vertical-c flex-justify-c">
            <span class="pay-channel-name">{{item}}</span>
            <span class="pay-price price-selling">￥{{payMoney}}</span>
          </div>
        </block>
      </div>
    </layout-layer>
  </div>
</template>

<script>
import { offlinePay } from '@/api/order'
import { confirm, error, hideLoading, showLoading, toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import { Exception } from '@/common/Exception'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import Pay from '@/common/Pay'
import Promisify from '@/common/Promisify'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

const floatNumber = /^[0-9]+.?[0-9]*$/ // 大于等于0的浮点数或者数字字符串
const intNumber = /^[0-9]+$/ // 大于等于0的浮点数或者数字字符串

export default {
  components: {
    WzwImTip,
    LayoutLayer,
  },
  mixins: [BaseMixin],
  data () {
    return {
      payLoding: false,
      password_input: false,
      user_pay_password: '',
      biz_id: '',
      pay_type: '',
      payMoney: '',
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  onLoad (options) {
    if (!options.biz_id) {
      error('biz_id参数必传')
      return
    }
    
    this.biz_id = options.biz_id
  },
  methods: {
    payFailCall (err) {
      this.payLoding = false
      error(err.msg || err.errMsg || '支付失败')
      this.payMoney = ''
    },
    paySuccessCall () {
      this.payLoding = false
      toast('支付成功')
      this.payMoney = ''
      setTimeout(() => {
        this.$linkTo('/pages/store/index?biz_id=' + this.biz_id)
      }, 1500)
    },
    // 获取用户支付方式
    chooseType (name) {
      this.payLoding = true
      this.pay_type = name
      this.$closePop('payChannelList')
      if (name === 'remainder_pay') {
        if (this.userInfo.hasOwnProperty('User_PayPassword') && !this.userInfo.User_PayPassword) {
          confirm({
            title: '提示',
            content: '该操作需要设置支付密码,是否前往设置?',
            confirmText: '去设置',
            cancelText: '暂不设置',
          }).then(res => {
            uni.navigateTo({
              url: '/pagesA/user/UpdateUserPsw?type=1&is_back=1',
            })
          }).catch(() => {
            error('请选择其他支付方式')
          })
          return
        }
        this.password_input = true// 弹出密码输入框
      } else {
        this.payFn()
      }
    },
    // 取消输入支付密码
    cancelInput () {
      this.payLoding = false
      this.password_input = false
    },
    // 用户输入密码完毕
    user_password (e) {
      this.user_pay_password = e.detail.value
    },
    // 确定输入支付密码
    confirmInput (e) {
      this.password_input = false
      this.payFn()
    },
    /**
     * 发起支付
     */
    async payFn () {
      try {
        showLoading()
        const payMoney = this.payMoney
        if (!payMoney) throw Error('金额必填')
        if (!payMoney.match(floatNumber) && !payMoney.match(intNumber)) throw Error('请输入最多两位小数的正数')
        
        const postData = {
          pay_money: this.payMoney,
          biz_id: this.biz_id,
          pay_type: this.pay_type,
        }
        if (this.pay_type === 'remainder_pay') {
          if (!this.user_pay_password) throw Error('余额支付必须输入密码')
          postData.user_pay_password = this.user_pay_password
          await offlinePay(postData).catch(err => {
            throw Error(err.msg || '下单失败')
          })
          this.paySuccessCall()
        } else {
          if (this.pay_type === 'wx_lp') {
            postData.code = await Promisify('login').then(loginRes => loginRes.code).catch(err => {
              throw Error(err.errMsg || '获取code失败')
            })
          }
          const oRderInfo = await offlinePay(postData).catch(err => {
            throw Error(err.msg || '下单失败')
          })
          console.log(oRderInfo)
          
          Pay(this, this.pay_type, oRderInfo)
        }
      } catch (e) {
        Exception.handle(e)
        this.payLoding = false
      } finally {
        hideLoading()
      }
    },
    async subFn () {
      if (this.payLoding) {
        error('重复操作')
        return
      }
      try {
        const payMoney = this.payMoney
        if (!payMoney) throw Error('金额必填')
        if (!payMoney.match(floatNumber) && !payMoney.match(intNumber)) throw Error('请输入最多两位小数的正数')
        this.$openPop('payChannelList')
      } catch (e) {
        Exception.handle(e)
      }
    },
    
  },
}
</script>

<style lang="scss" scoped>
  .pay-channel-list {
    width: 750rpx;
    
    .pay-channel-item {
      height: 44px;
      border-bottom: 1px solid $fun-border-color;
      
      &:last-child {
        border-bottom: none;
      }
      
      .pay-channel-name {
      
      }
      
      .pay-price {
      
      }
    }
  }
  
  .zhezhao {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    
    .input-wrap {
      background: #fff;
      color: #000;
      text-align: center;
      width: 90%;
      margin: 400rpx auto;
      padding: 40rpx 50rpx 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx;
      
      .input {
        margin: 40rpx 0;
        border: 1px solid #efefef;
        height: 80rpx;
        line-height: 80rpx;
      }
      
      .btns {
        display: flex;
        justify-content: space-around;
        height: 60rpx;
        line-height: 60rpx;
        
        .btn {
          flex: 1;
        }
      }
    }
  }
  
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
