<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="input-box">
      <input @confirm="subFn" class="input" confirm-type="done" placeholder="请输入消费金额" type="digit" v-model="payMoney" />
    </div>
    <div class="action">
      <button @click="subFn" class="sub" type="warn">立即支付</button>
    </div>

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

    <layout-modal ref="loginModal">
      <div class="login-modal-wrap">
        <div class="login-modal-title">一键登录</div>
        <div class="login-modal-desc">为了给您提供更优质的服务，本操作需要先登录</div>
        <div class="login-modal-btns">
          <button @click="cancelLogin" class="login-modal-btn login-modal-cancel" >暂不登录</button>
          <button class="login-modal-btn login-modal-confirm" open-type="getUserInfo" @getuserinfo="weixinlogin">立即登录</button>
        </div>
      </div>
    </layout-modal>

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
import { checkIsLogin } from '@/common/helper'
import LayoutModal from '@/componets/layout-modal/layout-modal'
import { userLogin } from '@/api/customer'
import Storage from '@/common/Storage'
import IM from '@/common/Im/Im'
import eventHub from '@/common/eventHub'

const floatNumber = /^[0-9]+.?[0-9]*$/ // 大于等于0的浮点数或者数字字符串
const intNumber = /^[0-9]+$/ // 大于等于0的浮点数或者数字字符串

export default {
  components: {
    LayoutModal,
    WzwImTip,
    LayoutLayer
  },
  mixins: [BaseMixin],
  data () {
    return {
      doLogin: false,
      payLoding: false,
      password_input: false,
      user_pay_password: '',
      biz_id: '',
      pay_type: '',
      payMoney: ''
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  onLoad (options) {
    if (!options.biz_id) {
      error('biz_id参数必传')
      return
    }
    this.biz_id = options.biz_id
  },
  methods: {
    /**
     * 这里是否需要开启im还需要思考，毕竟这里大部分都是直接扫码进来的。
     **/
    async loginCall (userData) {
      const { access_token, User_ID: user_id } = userData
      Storage.set('access_token', access_token)
      Storage.set('user_id', user_id)

      this.$store.commit('user/SET_USER_INFO', userData)

      // 新增全局监听
      if (!Storage.get('listenStatus')) {
        // IM全局
        const imInstance = new IM()
        // 设置本地用户信息
        imInstance.setSendInfo({
          type: 'user',
          id: user_id,
          name: userData.User_NickName,
          avatar: userData.User_HeadImg
        })
        await imInstance.start() // 等拿token

        imInstance.openListen()
        eventHub.imInstance = imInstance // 全局用一个句柄
      }
    },
    async weixinlogin (e) {
      try {
        if (this.doLogin) return
        this.doLogin = true
        // 获取code
        const wxLoginRt = await Promisify('login').catch(() => {
          throw Error('微信login错误')
        })
        const { code: lp_code } = wxLoginRt

        const checkSeting = await Promisify('getSetting').catch(() => {
          throw Error('获取配置失败')
        })
        // 未获得用户信息权限,需要让用户授权
        if (!checkSeting.authSetting['scope.userInfo']) {
          await Promisify('authorize', { scope: 'scope.userInfo' }).catch(() => {
            throw Error('请授权登录')
          })
        }
        const wxUserInfo = await Promisify('getUserInfo', { lang: 'zh_CN' }).catch(() => {
          throw Error('获取用户信息失败')
        })

        const { encryptedData, rawData, signature, userInfo, iv } = wxUserInfo
        if (!rawData) throw Error('请允许授权')
        const lp_raw_data = JSON.stringify({
          encryptedData,
          rawData: JSON.parse(rawData),
          signature,
          userInfo,
          rawData1: rawData,
          iv
        })

        const { errorCode, data } = await userLogin({
          login_method: 'wx_lp',
          code: lp_code,
          lp_raw_data
        }).catch((err) => {
          throw Error(err.msg || '第三方登录请求错误')
        })

        if (errorCode !== 0) {
          throw Error('登录返回数据异常')
        }

        this.$openPop('payChannelList')
        this.cancelLogin()
        this.loginCall(data)
      } catch (e) {
        Exception.handle(e)
      } finally {
        this.doLogin = false
      }
    },
    payFailCall (err) {
      this.payLoding = false
      const msg = err.msg || err.errMsg || '支付失败'
      if (msg === 'requestPayment:fail cancel') {
        error('取消支付')
      } else {
        error(msg)
      }

      // this.payMoney = ''
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
            cancelText: '暂不设置'
          }).then(res => {
            this.$linkTo('/pagesA/user/UpdateUserPsw?type=1&is_back=1')
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
          pay_type: this.pay_type
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
    cancelLogin () {
      this.$closePop('loginModal')
    },
    async subFn () {
      if (this.payLoding) {
        error('操作过快')
        return
      }
      try {
        const payMoney = this.payMoney
        if (!payMoney) throw Error('金额必填')
        if (!payMoney.match(floatNumber) && !payMoney.match(intNumber)) throw Error('请输入最多两位小数的正数')

        // 未登录
        if (!checkIsLogin(0, 0)) {
          this.$openPop('loginModal')
          throw Error('nocare')
        }

        this.$openPop('payChannelList')
      } catch (e) {
        Exception.handle(e)
      }
    }

  }
}
</script>

<style lang="scss" scoped>

  .login-modal{
    &-wrap{
      width: 500rpx;
      padding: 15px;
    }
    &-title{
      text-align: center;
    }
    &-desc{
      color: #666;
      line-height: 1.6;
      font-size: 14px;
      margin: 20px 0;
    }
    &-btns{
      display: flex;
      justify-content: center;
    }
    &-btn{
      line-height: 2.2;
      font-size: 16px;
      &::after{
        border:none;
      }
    }
    &-cancel{

      margin-right: 20px;
      color: #666;
    }
    &-confirm{

      background: $fun-primary-color;
      color: #fff;

    }
  }
  .pay-channel-list {
    width: 750rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
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

  }

  .action{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    z-index: 3;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .sub {
    border-radius: 0;
  }
</style>
