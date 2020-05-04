<template>
  <view class="all">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    
    <div class="zhezhao" v-if="password_input">
      <div class="input-wrap">
        <div>请输入余额支付密码</div>
        <input type="password" class="input" placeholder="请输入密码" v-model="user_pay_password" @blur="user_password">
        <div class="btns">
          <div @click="cancelInput" class="btn">取消</div>
          <div @click="confirmInput" class="btn">确定</div>
        </div>
      </div>
    </div>
    <view class="top">
      <view class="first">
        <view class="circleQ">
          <view></view>
        </view>
        <view class="lineQ">
        
        </view>
        <view class="circleQ">
          <view></view>
        </view>
        <view class="lineQ">
        
        </view>
        <view class="circleQ">
          <view></view>
        </view>
      </view>
      <view class="second">
        <view class="secondQ">
          填写信息
        </view>
        <view class="secondW">
          选择区域
        </view>
        <view class="secondE">
          提交审核
        </view>
      </view>
    </view>
    
    <block v-if="proData.Applyfor_Name">
      <view class="three">
        <view class="haha">
          申请区域
        </view>
        {{proData.Area_Concat}}
      </view>
      <view class="three">
        <view class="haha">
          申请人
        </view>
        {{proData.Applyfor_Name}}
      </view>
      <view class="three">
        <view class="haha">
          联系电话
        </view>
        {{proData.Applyfor_Mobile}}
      </view>
      <view class="three">
        <view class="haha">
          申请时间
        </view>
        {{proData.Order_CreateTime}}
      </view>
      <view class="three">
        <view class="haha">
          支付费用
        </view>
        {{proData.Order_TotalPrice}}元
      </view>
    </block>
    
    <view class="four" @click="showPay">
      立即支付
    </view>
    <view class="five" @click="cancelAge">
      取消申请
      <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
    </view>
    
    <layout-layer ref="popupLayer" :direction="'top'">
      <div class="iMbx">
        <div class="c_method" v-for="(item,index) in initData.pay_arr" @click="chooseType(index)" :key="index">
          {{item}}
          <text>￥{{proData.Order_TotalPrice}}</text>
        </div>
      </div>
    </layout-layer>
  </view>
</template>

<script>

import { agentApplyPay, cancelAgentApply, getAgentApply } from '@/api/customer'
import Pay from '@/common/Pay'

import { confirm, error, toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutLayer from '@/componets/layout-layer/layout-layer'

export default {
  mixins: [BaseMixin],
  components: {
    LayoutLayer,
    
  },
  data () {
    return {
      Order_ID: '',
      proData: [],
      pay_type: '',
      password_input: false,
      user_pay_password: '',// 用户输入的密码
    }
  },
  onShow () {
  
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
    this.Order_ID = options.id
    // 获取支付方式
    this.getAgentApply()
  },
  methods: {
    cancelAge () {
      cancelAgentApply({ Order_ID: this.Order_ID }).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pagesA/distributor/Region',
          })
        }, 1000)
      }).catch(e => {
      
      })
    },
    payFailCall () {
    
    },
    payMoney () {
      const data = {
        Order_ID: this.Order_ID,
        pay_type: this.pay_type,
      }
      agentApplyPay(data, {
        tip: '正在加载中',
        mask: true,
      }).then(res => {
        Pay(this, this.pay_type, res)
      }).catch(err => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
      })
    },
    // 选择支付方式
    chooseType (index) {
      this.pay_type = index
      
      if (index === 'remainder_pay') {
        if (this.userInfo.hasOwnProperty('User_PayPassword') && !this.userInfo.User_PayPassword) {
          confirm({
            title: '提示',
            content: '该操作需要设置支付密码,是否前往设置?',
            confirmText: '去设置',
            cancelText: '暂不设置',
          }).then(res => {
            uni.navigateTo({
              url: '/pagesA/person/updateUserPsw?type=1&is_back=1',
            })
          }).catch(err => {
            error('请选择其他支付方式')
          })
          return
        }
        this.$refs.popupLayer.close()
        this.password_input = true// 弹出密码输入框
      }
      
      this.payMoney()
    },
    showPay () {
      this.$refs.popupLayer.show()
    },
    paySuccessCall (res) {
      var _that = this
      
      if (res && res.code && res.code === 2) {
        return
      }
      
      if (res && res.code && res.code === 1) {
        toast('用户取消支付', 'none')
        return
      }
      if (res && res.code && res.code === 9) {
        uni.showModal({
          title: '提示',
          content: '是否完成支付',
          cancelText: '未完成',
          confirmText: '已支付',
          success: function (res) {
            if (res.confirm) {
              toast('支付成功')
              uni.navigateTo({
                url: '/pages/distributor/Main',
              })
            } else if (res.cancel) {
            
            }
          },
        })
        return
      }
      // 0：支付成功 1：支付超时 2：支付失败 3：支付关闭 4：支付取消 9：订单状态开发者自行获取
      if (res && res.code && res.code === 4) {
        toast('用户取消支付', 'none')
        return
      }
      
      toast('支付成功')
      uni.navigateTo({
        url: '/pages/distributor/Main',
      })
    },
    payNow () {
      const data = {
        Order_ID: this.Order_ID,
        pay_type: this.pay_type,
      }
      if (this.pay_type === 'remainder_pay') {
        data.user_pay_password = this.user_pay_password
      }
      agentApplyPay(data).then(res => {
        uni.showToast({
          title: res.msg,
          icon: 'none',
        })
        setTimeout(function () {
          uni.navigateTo({
            url: '/pages/distributor/Main',
          })
        }, 1000)
      }).catch(e => {
      
      })
    },
    getAgentApply () {
      getAgentApply({ Order_ID: this.Order_ID }).then(res => {
        this.proData = res.data[0]
      }).catch(e => {
      })
    },
    // 取消输入支付密码
    cancelInput () {
      this.password_input = false
    },
    // 用户输入密码完毕
    user_password (e) {
      this.user_pay_password = e.detail.value
    },
    // 确定输入支付密码
    confirmInput (e) {
      this.password_input = false
      // 提交信息
      this.payNow()
    },
    
  },
}
</script>

<style lang="scss" scoped>
  .all {
    overflow-x: hidden;
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  .top {
    width: 750 rpx;
    padding: 50 rpx 83 rpx;
    
    .first {
      padding-left: 33 rpx;
      padding-right: 41 rpxd;
      height: 30 rpx;
      display: flex;
      align-items: center;
      
      .circleQ {
        width: 30 rpx;
        height: 30 rpx;
        border: 1px solid #F43131;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        view {
          width: 15 rpx;
          height: 15 rpx;
          background-color: #F43131;
          border-radius: 50%;
        }
      }
      
      .circleW {
        border: 1px solid #999999;
        
        view {
          background-color: #999999;
        }
      }
      
      .lineQ {
        width: 210 rpx;
        height: 4 rpx;
        background-color: #F43131;
      }
    }
    
    .second {
      margin-top: 21 rpx;
      height: 25 rpx;
      line-height: 25 rpx;
      font-size: 26 rpx;
      color: #999999;
      display: flex;
      
      .secondQ {
        color: #F43131;
      }
      
      .secondW {
        margin-left: 137 rpx;
        color: #F43131;
      }
      
      .secondE {
        margin-left: 135 rpx;
        color: #F43131;
      }
    }
  }
  
  .three {
    //height: 88rpx;
    line-height: 88 rpx;
    width: 710 rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
    
    .haha {
      font-size: 30 rpx;
      color: #333333;
      margin-right: 20 rpx;
      width: 100px;
      box-sizing: border-box;
      padding-left: 10px;
    }
    
    .inputs {
      height: 88 rpx;
      line-height: 88 rpx;
      font-size: 28 rpx;
      color: #333333;
    }
    
    .place {
      font-size: 28 rpx;
      color: #CAC8C8;
    }
    
    .myRadio {
      height: 88 rpx;
      display: flex;
      
      .myRadioQ {
        height: 88 rpx;
        display: flex;
        margin-right: 17 rpx;
        
        .radio {
          transform: scale(0.7);
        }
        
        .mbx {
          font-size: 28 rpx;
          color: #777777;
          margin-left: 13 rpx;
        }
      }
    }
    
  }
  
  .four {
    width: 490 rpx;
    height: 75 rpx;
    line-height: 75 rpx;
    text-align: center;
    background: rgba(244, 49, 49, 1);
    border-radius: 10 rpx;
    margin: 0 auto;
    margin-top: 110 rpx;
    font-size: 30 rpx;
    color: #FFFFFF;
  }
  
  .five {
    height: 23 rpx;
    line-height: 23 rpx;
    width: 174 rpx;
    margin: 0 auto;
    margin-top: 21 rpx;
    font-size: 24 rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    
    .image {
      width: 12 rpx;
      height: 20 rpx;
      margin-left: 10 rpx;
    }
  }
  
  .threes {
    height: 88 rpx;
    line-height: 88 rpx;
    width: 710 rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .haha {
      font-size: 30 rpx;
      color: #333333;
      //margin-right: 42rpx;
    }
    
    .images {
      width: 16 rpx;
      height: 88 rpx;
      line-height: 88 rpx;
      
      .image {
        width: 16 rpx;
        height: 25 rpx;
      }
    }
    
  }
  
  .picker view {
    width: 180 rpx;
    font-size: 28 rpx;
    line-height: 90 rpx;
    height: 90 rpx;
    margin-right: 10 rpx;
  }
  
  .picker {
    display: flex;
    
    .quyu {
      width: 120 rpx;
    }
  }
  
  .lineW {
    background-color: #F43131 !important;
  }
  
  .iMbx {
    text-align: center;
    padding: 0 20 upx;
    font-size: 28 upx;
    color: #333;
    
    .c_method {
      padding: 37 upx 0;
      border-bottom: 2 upx solid #E6E6E6;
    }
    
    & .c_method:first-child {
      color: #F43131;
    }
    
    & .c_method:nth-last-child(1) {
      border: none;
    }
  }
  
  .zhezhao {
    left: 0;
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 1000;
    
    .input-wrap {
      background: #fff;
      color: #000;
      text-align: center;
      width: 90%;
      margin: 400 rpx auto;
      padding: 40 rpx 50 rpx 30 rpx;
      box-sizing: border-box;
      font-size: 28 rpx;
      border-radius: 10 rpx;
      
      .input {
        margin: 40 rpx 0;
        border: 1px solid #efefef;
        height: 20px;
        line-height: 20px;
        padding: 10px 0px;
      }
      
      .btns {
        display: flex;
        justify-content: space-around;
        height: 60 rpx;
        line-height: 60 rpx;
        
        .btn {
          flex: 1;
        }
      }
    }
  }

</style>
