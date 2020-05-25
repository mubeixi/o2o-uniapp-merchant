<template>
  <view class="wrap" :style="{height: height + 'px', background:bgcolor}">

    <block v-if="type != 3">
      <form report-submit @submit="save">
        <view v-if="type === 0" class="content">
          <input type="password" class="item" v-model="curr_psw" placeholder="请输入原始登录密码,如未设置请留空">
          <input type="password" class="item" v-model="new_psw" placeholder="请输入新的登录密码">
          <input type="password" class="item" v-model="check_psw" placeholder="请再次输入新密码">
        </view>
        <view v-if="type === 1" class="content">
          <input type="password" class="item" v-model="curr_psw" placeholder="请输入原始支付密码,如未设置请留空">
          <input type="password" class="item" v-model="new_psw" placeholder="请输入新的支付密码">
          <input type="password" class="item" v-model="check_psw" placeholder="请再次输入新密码">
        </view>
        <button formType="submit" class="save">保存</button>
      </form>

    </block>
    <block v-else>
      <form report-submit @submit="confirm">
        <view class="other">
          <view class="other-item">
            您现在的手机号是： {{userInfo.User_Mobile}}
          </view>
          <view class="other-item">
            手机号
            <input type="text" v-model="mobile" maxlength="11" class="input phone" placeholder="请输入手机号" />
          </view>
          <view class="other-item">
            验证码
            <input type="text" v-model="code" class="input code" placeholder="请输入验证码" />
            <view class="get-msg" @click="getCode">{{countdownStatus?(countdownNum + '秒'):'获取验证码'}}</view>
          </view>
          <button formType="submit" class="confirm">确认修改</button>
        </view>
      </form>
    </block>
  </view>
</template>

<script>
import { updateUserLoginPsw, updateUserPayPsw, updateMobileSms, updateUserMobile, getUserInfo } from '@/api/customer'

import { mapActions } from 'vuex'

import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      type: 0,
      is_back: false,
      curr_psw: '',
      new_psw: '',
      check_psw: '',
      height: 0,
      canSubmit: true, // 用户是否可以提交
      bgcolor: '#efefef',
      mobile: '',
      code: '',
      countdownStatus: false, // 是否开启倒计时了
      countdownNum: 60
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: 'user/setUserInfo'
    }),
    // 返回上一页
    goBack () {
      setTimeout(() => {
        this.$back()
      }, 1000)
    },
    confirm (e) {
      // add_template_code({
      // 	code: e.detail.formId,
      // 	times: 1
      // })
      if (!(/^1[3456789]\d{9}$/.test(this.mobile))) {
        uni.showToast({
          title: '手机号输入错误，请重新输入',
          icon: 'none'
        })
        return
      }
      if (!this.code) {
        uni.showToast({
          title: '验证码不能为空',
          icon: 'none'
        })
        return
      }
      updateUserMobile({
        mobile: this.mobile,
        code: this.code
      }).then(res => {
        uni.showToast({
          title: res.msg
        })

        getUserInfo({}, {
          tip: '',
          errtip: false
        }).then(res => {
          this.setUserInfo(res.data)
          this.goBack()
        }).catch(e => {
        })
      }).catch(err => {
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
      })
    },
    toast (title, icon = 'none') {
      uni.showToast({
        title: title,
        icon: icon
      })
    },
    startCountdown () {
      // 倒计时
      this.countdownStatus = true
      const countdownInterval = setInterval(() => {
        if (this.countdownNum > 0) {
          this.countdownNum--
        } else {
          clearInterval(countdownInterval)
          this.countdownNum = 60
          this.countdownStatus = false
        }
      }, 1000)
    },
    // 获取验证码
    getCode () {
      if (this.countdownStatus) {
        return
      }
      const isMobileOK = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.mobile)
      if (!isMobileOK) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        return
      }
      updateMobileSms({
        mobile: this.mobile
      }).then(res => {
        uni.showToast({
          title: '验证码已发送',
          icon: 'success'
        })
        this.startCountdown()
      })
    },
    save (e) {
     
      const arg = {
        curr_psw: this.curr_psw,
        new_psw: this.new_psw,
        check_psw: this.check_psw
      }
      if (this.type === 1) {
        // 原始密码默认为空
        if ((arg.curr_psw && arg.curr_psw.length < 6) || arg.new_psw.length < 6 || arg.check_psw.length < 6) {
          this.toast('密码最少6位')
          return
        }
        // if(arg.curr_psw === '') {
        // 	this.toast('原始密码不能为空')
        // 	return;
        // }
      } else {
        if ((arg.curr_psw && arg.curr_psw.length < 6) || arg.new_psw.length < 6 || arg.check_psw.length < 6) {
          this.toast('密码最少6位')
          return
        }
        // if(arg.curr_psw === '') {
        // 	this.toast('原始密码不能为空')
        // 	return;
        // }
      }

      if (arg.new_psw === '') {
        this.toast('新密码不能为空')
        return
      }
      if (arg.check_psw === '') {
        this.toast('确认密码不能为空')
        return
      }
      if (arg.new_psw !== arg.check_psw) {
        this.toast('两次密码不同')
        return
      }
      if (this.type == 0) {
        updateUserLoginPsw(arg).then(res => {
          this.toast('修改成功', 'success')
          this.goBack()
        }, err => {
          this.toast(err.msg)
        })
      } else if (this.type === 1) {
        updateUserPayPsw(arg).then(res => {
          this.toast('修改成功', 'success')
          // 如果成功就返回
          if (this.is_back) {
            // 更新信息
            getUserInfo({}, {
              tip: '',
              errtip: false
            }).then(res => {
              this.setUserInfo(res.data)
              setTimeout(() => {
                this.$back()
              }, 100)
            }).catch(e => {
            })
          }
        }, err => {
          this.toast(err.msg)
        })
      }
    }
  },
  onLoad (options) {
    if (options.type == 0) {
      this.title = '修改登录密码'
      this.type = 0
    } else if (options.type == 1) {
      this.title = '修改支付密码'
      this.type = 1
      if (options.hasOwnProperty('is_back') && options.is_back) {
        this.is_back = true
      }
    } else if (options.type == 3) {
      this.title = '修改手机号码'
      this.type = 3
      this.bgcolor = '#fff'
    }
    uni.setNavigationBarTitle({
      title: this.title
    })
    uni.getSystemInfo({
      success: res => {
        this.height = res.screenHeight
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    width: 100%;
    background: #efefef;
  }

  .content {
    padding: 20rpx 0;

    .item {
      background: #fff;
      padding-left: 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin-bottom: 20rpx;
      font-size: 30rpx;
    }
  }

  .save {
    width: 90%;
    background: #F43131;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
  }

  .other {
    padding: 14rpx 20rpx 0;

    .other-item {
      display: flex;
      align-items: center;
      line-height: 98rpx;
      font-size: 28rpx;
      border-bottom: 1px solid #E3E3E3;

      .input {
        flex: 1;
        font-size: 24rpx;
        margin-left: 42rpx;
      }

      .get-msg {
        height: 50rpx;
        line-height: 50rpx;
        width: 140rpx;
        border: 1px solid #F43131;
        color: #F43131;
        font-size: 24rpx;
        text-align: center;
        border-radius: 5rpx;
      }
    }

    .confirm {
      height: 76rpx;
      line-height: 76rpx;
      width: 580rpx;
      color: #fff;
      background: #F43131;
      text-align: center;
      margin: 157rpx auto 0;
    }
  }
</style>
