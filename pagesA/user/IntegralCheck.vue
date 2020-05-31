<template>
  <view v-if="loading" @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <!--  <pagetitle title="提交订单"></pagetitle> -->
    <view @click="goAddressList" class="address" v-if="giftInfo.Gift_Shipping== 1">
      <image :src="'/static/client/location.png'|domain" alt="" class="loc_icon"></image>
      <view class="add_msg" v-if="addressinfo.Address_Name">
        <view class="name">收货人：{{addressinfo.Address_Name}} <span>{{addressinfo.Address_Mobile | formatphone}}</span>
        </view>
        <view class="location">
          收货地址：{{addressinfo.Address_Province_name}}{{addressinfo.Address_City_name}}{{addressinfo.Address_Area_name}}{{addressinfo.Address_Town_name}}
        </view>
      </view>
      <view class="add_msg" v-else>
        <view>暂无收货地址，去添加</view>
      </view>
      <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
    </view>
    <view class="order_msg">
      <img :src="giftInfo.Gift_ImgPath" alt="" class="pro-img">
      <view class="pro-msg">
        <view class="pro-name">{{giftInfo.Gift_Name}}</view>
        <view class="pro-price">{{giftInfo.Gift_Integral}} 积分</view>
      </view>
    </view>
    <view class="other" v-if="giftInfo.Gift_Shipping == 1">
      <view class="bd">
        <view @click="changeShip" class="o_title">
          <span>运费选择</span>
          <span style="text-align:right; color: #888;">
						<span>{{shipping_name?(shipping_name + ' ' + (shipping_price > 0 ? shipping_price : '免运费')):'请选择物流'}}</span>
                        <image :src="'/static/client/right.png'|domain" alt="" class="right"></image>
                    </span>
        </view>
      </view>
    </view>

    <popup-layer :direction="'top'" ref="popMethod">
      <view class="iMbx">
        <view :key="index" @click="chooseType(index)" class="c_method" v-for="(item,index) in pay_arr">
          {{item}}
          <text>￥{{shipping_price}}</text>
        </view>
      </view>
    </popup-layer>

    <view class="remind-wrap" v-if="remindAddress">
      <view class="remind-add">
        <view class="text-align-center mb20">新建收货地址</view>
        <view class="remind_desc">
          您还没有收货地址，请先添加一个新的收货地址
        </view>
        <view class="remind_btns text-align-center">
          <view @click="goback" class="text-align-center fl1">返回</view>
          <view @click="goEditAdd" class="text-align-center fl1 confirm">
            新建
          </view>
        </view>
      </view>
    </view>
    <view class="pwd-wrap" v-if="psdInput">
      <view class="input-box">
        <input class="input-psw" placeholder="请输入支付密码" type="password" v-model="password" />
        <view class="btns">
          <view @click="cancelPsw" class="cancel btn">取消</view>
          <view @click="pswConfirm" class="confirm btn">确定</view>
        </view>
      </view>
    </view>

    <popup-layer :direction="'top'" ref="popupRef">
      <view class="bMbx" v-if="type=='shipping'">
        <view class="fMbx">请选择物流公司</view>
        <view :key="shipid" class="iMbx" v-for="(ship,shipid) in shipping_company">
          <view>
            {{ship}}
          </view>
          <radio-group @change="ShipRadioChange">
            <radio :checked="shipid==ship_current" :value="shipid" color="#F43131" style="float:right;" />
          </radio-group>
        </view>
      </view>
      <view @click="closeMethod" class="sure">
        确定
      </view>
    </popup-layer>

    <view class="order_total">
      <view @click="form_submit" class="submit">立即兑换</view>
    </view>

  </view>
</template>

<script>
import popupLayer from '@/componets/layout-popup/layout-popup'
import {
  getAddressList,
  getShipping,
  jifenProdDetail,
  jifenProdDuihuan,
  jifenProdPay,
  jifenProdShippingPrice
} from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import { mapActions, mapGetters } from 'vuex'
import Pay from '@/common/Pay'
import { GetQueryByString, isWeiXin,  urlencode } from '@/common/helper'
import { backFunc } from '@/common/fun'
import {Storage} from '@/common/Storage'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'


export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    popupLayer
  },
  data () {
    return {
      show: false, // 遮罩层
      addressinfo: {}, // 收货地址信息
      orderInfo: {},
      type: 'shipping',
      current: '',
      shipping_id: '',
      ship_current: 0,
      shipping_name: '', // 物流信息描述
      addressLoading: false, // 收货地址信息是否加载完
      giftLoading: false,
      submited: false, // 是否已经提交过，防止重复提交
      back_address_id: 0,
      giftInfo: {}, // 积分兑换产品，产品信息
      shipping_company: [],
      psdInput: false,
      password: '',
      address_id: 0,
      shipping_price: 0, // 运费
      pay_arr: [],
      //initData: {}
    }
  },
  filters: {
    formatphone: function (value) {
      if (value) {
        var len = value.length
        var xx = value.substring(3, len - 4)
        var values = value.replace(xx, '****')
        return values
      }
    }
  },
  async onShow () {
    this.getAddressList()
    //this.getShipping()
    const initData = this.initData//await this.getInitData()
    console.log(initData,"s")
    this.pay_arr = initData.pay_arr
	
	
	jifenProdShippingPrice({
	  Gift_ID: this.gift_id,
	  Address_ID: this.address_id,
	  Shipping_ID: this.shipping_id
	}).then(res => {
	  this.shipping_company = res.data.shipping_company_dropdown
	})
  },
  async created () {
    const userInfo = this.getUserInfo(true)
    // #ifdef H5
    if (isWeiXin()) {
      this.code = GetQueryByString(location.href, 'code')

      if (this.code) {
        this.pay_type = 'wx_mp'// 需要手动设置一下

        this.pay(1)
      }
    }
    // #endif
  },
  onLoad (options) {
    this.gift_id = options.gift_id

    this.jifenProdDetail()
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    loading: function () {
      return this.addressLoading && this.giftLoading
    },
    remindAddress: function () {
      return this.giftInfo.Gift_Shipping == 1 && !this.addressinfo.Address_Name
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    ...mapActions(['getUserInfo', 'getInitData']),
    // 物流信息列表
    getShipping () {
      getShipping().then(res => {
        this.shipping_company = res.data
      })
    },
    // 改变支付方式
    chooseType (index) {
      this.pay_type = index
      this.pay()
    },
    // 获取运费
    jifenProdShippingPrice () {
      jifenProdShippingPrice({
        Gift_ID: this.gift_id,
        Address_ID: this.address_id,
        Shipping_ID: this.shipping_id
      }).then(res => {
        this.shipping_price = res.data.shipping_price
      })
    },
    // 积分兑换商品详情
    jifenProdDetail () {
      jifenProdDetail({
        Gift_ID: this.gift_id
      }).then(res => {
        this.giftLoading = true
        this.giftInfo = res.data
      }).catch(() => {
      })
    },
    goback () {
      backFunc()
    },
    // 跳转地址列表页
    goAddressList () {
      uni.navigateTo({
        url: '/pages/addressList/addressList?from=checkout&addressid=' + this.address_id
      })
    },
    // 跳转新增地址页面
    goEditAdd () {
      uni.navigateTo({
        url: '/pagesA/editAddress/editAddress?from=checkout'
      })
    },
    cancelPsw () {
      this.password = ''
      this.psdInput = false
    },
    pswConfirm () {
      if (!this.password) {
        return
      }
      jifenProdDuihuan({
        Gift_ID: this.gift_id,
        password: this.password,
        Address_ID: this.address_id,
        Shipping_ID: this.shipping_id
      }).then(res => {
        this.psdInput = false
        this.Order_ID = res.data.Orders_ID
        // 判断是否是待支付状态
        if (res.data.Order_Status == 1) {
          this.$refs.popMethod.show()
        } else if (res.data.Order_Status == 2) {
          this.paySuccessCall()
        }
      }, err => {
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
        this.password = ''
      })
    },
    // 提交订单
    form_submit () {
      if (this.giftInfo.Gift_Shipping == 1) {
        if (!this.shipping_id) {
          uni.showToast({
            title: '请选择物流',
            icon: 'none'
          })

          return
        }
      }
      if (!this.address_id) {
        uni.showToast({
          title: '收货地址错误',
          icon: 'none'
        })
        return
      }
      this.psdInput = true
    },

    // 物流改变
    ShipRadioChange (e) {
      for (var i in this.shipping_company) {
        if (i == e.target.value) {
          this.ship_current = i
          break
        }
      }

      this.shipping_id = e.target.value
    },
    // 选择运费
    changeShip () {
      this.type = 'shipping'
      this.ship_current = this.shipping_id

      this.$refs.popupRef.show()
    },
    closeMethod () {
      // 重新计算运费
      this.jifenProdShippingPrice()
      for (var i in this.shipping_company) {
        if (i == this.shipping_id) {
          this.shipping_name = `${this.shipping_company[i]}`
        }
      }

      this.$refs.popupRef.close()
    },
    async getAddressList () {
      uni.$on('fire', (data) => {
        this.back_address_id = data
      })

      var Address_ID
      if (this.back_address_id) { // 添加、选择收获地址返回
        Address_ID = this.back_address_id
      } else if (this.addressinfo.Address_ID) { // 有收获地址，则更新（防止收获地址编辑后返回）
        Address_ID = this.addressinfo.Address_ID
      }

      await getAddressList({ Address_ID: Address_ID || 0 }).then(res => {
        for (const i in res.data) {
          for (const j in res.data[i]) {
            if (j == 'Address_Is_Default') {
              res.data[i][j] == 1
              this.addressinfo = res.data[i]
            }
          }
        }
        this.address_id = this.addressinfo.Address_ID
        this.back_address_id = 0

        // 获取用户收货地址，获取订单信息，后台判断运费信息
      }).catch(() => {
        uni.showModal({
          title: '错误',
          content: '收货地址获取失败',
          showCancel: false
        })
        return false
      })

      this.addressLoading = true
    },
    // 统一支付
    async pay (is_forward) {
      const _self = this
      let payConf = {}

      // 不是跳转的
      if (!is_forward) {
        if (this.need_invoice == 1 && this.invoice_info == '') {
          uni.showToast({
            title: '发票信息不能为空',
            icon: 'none'
          })
          return
        }

        payConf = {
          Order_ID: this.Order_ID,
          pay_type: this.pay_type,
          user_pay_password: this.password // 余额支付密码
        }
        // 用户选择余额支付
        if (this.pay_type == 'remainder_pay') {
          jifenProdPay(payConf, { errtip: false }).then(res => {
            this.paySuccessCall()
          }).catch(err => {
            uni.showModal({
              title: '提示',
              content: err.msg,
              showCancel: false
            })
          })
          return
        }
      }

      if (this.pay_type === 'unionpay') {
        error('即将上线')
        return
      }

      if (this.pay_type === 'ali_app') {

      }

      // 下面都是微信

      // 需要格外有一个code

      // #ifdef H5

      // 微信h5
      if (this.pay_type === 'wx_h5') {
        payConf.pay_type = 'wx_h5'
      }

      // 阿里h5
      if (this.pay_type === 'alipay') {
        payConf.pay_type = 'alipay'
      }

      // 公众号需要code
      if (this.pay_type === 'wx_mp') {
        if (!isWeiXin()) {
          this.$error('请在微信内打开')
          return
        }
        const isHasCode = this.code || GetQueryByString('code')

        if (isHasCode) {
          // payConf.code = isHasCode;
          // 拿到之前的配置
          payConf = {
            ...Storage.get('temp_order_info'),
            code: isHasCode,
            pay_type: 'wx_mp'
          }
        } else {
          // 存上临时的数据
          Storage.set('temp_order_info', payConf)
          // 去掉转吧
          this.$_init_wxpay_env()
          return
        }
      }

      // #endif

      // #ifdef MP-TOUTIAO

      // #endif

      // #ifdef MP-WEIXIN

      payConf.pay_type = 'wx_lp'

      await new Promise((resolve) => {
        uni.login({
          success: function (loginRes) {
            payConf.code = loginRes.code
            resolve()
          }
        })
      })
      // #endif

      jifenProdPay(payConf, {
        tip: '正在加载中',
        mask: true
      }).then(res => {
        Pay(this, this.pay_type, res)
        return
        // #ifdef APP-PLUS

        if (this.pay_type === 'ali_app') {
          const provider = 'alipay'
          const orderInfo = res.data.arg

          uni.requestPayment({
            provider,
            orderInfo, // 微信、支付宝订单数据
            success: function (res) {
              _self.paySuccessCall(res)
            },
            fail: function (err) {
              uni.showModal({
                title: '支付错误',
                content: JSON.stringify(err)
              })
            }
          })

          return
        }
        // #endif

        // #ifdef H5

        // 微信h5
        if (this.pay_type === 'wx_h5') {
          const redirect_url = res.data.mweb_url + '&redirect_url=' + urlencode(location.origin + '/fre/pages/order/order?index=2')
          location.href = redirect_url
          return
        }

        // 阿里h5
        if (this.pay_type === 'alipay') {
          // 公众号麻烦一点
          if (isWeiXin()) {
            const users_id = Storage.get('users_id')

            let fromurl = res.data.arg// encodeURIComponent(res.data.arg);
            const origin = location.origin

            fromurl = fromurl.replace(/openapi.alipay.com/, 'wangjing666')

            const str = origin + `/fre/pages/pay/wx/wx?users_id=${users_id}&formurl=` + encodeURIComponent(fromurl)
            const url = str

            uni.navigateTo({
              url: `/pages/pay/wx/wx?users_id=${users_id}&formurl=` + encodeURIComponent(fromurl)
            })

            // 这样就避免了users_id瞎跳的机制
            // location.href = url;
          } else {
            document.write(res.data.arg)
            document.getElementById('alipaysubmit').submit()
          }

          return
        }

        const {
          timestamp,
          nonceStr,
          signType,
          paySign
        } = res.data

        // 直接支付
        _self.WX_JSSDK_INIT(_self).then((wxEnv) => {
          // 关键字？？package
          wxEnv.chooseWXPay({
            timestamp,
            nonceStr,
            package: res.data.package,
            signType,
            paySign,
            success: function (res) {
              // 支付成功后的回调函数
              _self.paySuccessCall(res)
            }
          })
        }).catch((e) => {
        })

        return

        // #endif

        let provider = 'wxpay'
        let orderInfo = {}

        // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY

        // #endif

        // #ifdef MP-TOUTIAO

        provider = 'wxpay'
        orderInfo = res.data
        orderInfo.out_order_no = (orderInfo.Order_ID + '')
        orderInfo.timestamp += ''// string
        orderInfo.uid += ''
        orderInfo.trade_time += ''
        orderInfo.valid_time += ''

        //
        // orderInfo.risk_info = JSON.stringify({ip: '127.0.0.1', device_id: '485737374363263'});
        //
        //
        // orderInfo.params = ''
        // orderInfo.pay_type = ''
        // orderInfo.pay_channel = ''
        // orderInfo.method = ''
        // orderInfo.trade_no = ''

        delete orderInfo.Order_ID

        // 固定值：1（拉起小程序收银台）开发者如果不希望使用头条小程序收银台，service设置为3/4时，可以直接拉起微信/支付宝进行支付：service=3： 微信API支付，不拉起小程序收银台；service=4： 支付宝API支付，不拉起小程序收银台。其中service=3、4，仅在1.35.0.1+基础库(头条743+)支持

        uni.requestPayment({
          provider,

          service: 1, //
          orderInfo, // 微信、支付宝订单数据
          success: function (res) {
            _self.paySuccessCall(res)
          },
          fail: function (err) {
            uni.showModal({
              title: '支付错误',
              content: JSON.stringify(err)
            })
          }
        })
        // #endif

        // #ifdef MP-WEIXIN

        provider = 'wxpay'
        orderInfo = res.data
        delete orderInfo.timestamp

        const prepay_id = orderInfo.package.split('=')[1]
        uni.requestPayment({
          ...orderInfo,
          provider,
          success: function (res) {
            _self.paySuccessCall(res)
          },
          fail: function (err) {
            _self.payFailCall(err)
          }
        })
        // #endif

        // #ifdef APP-PLUS
        provider = 'wxpay'
        orderInfo = res.data

        uni.requestPayment({
          provider,
          orderInfo, // 微信、支付宝订单数据
          success: function (res) {
            _self.paySuccessCall(res)
          },
          fail: function (err) {
            _self.payFailCall(err)
          }
        })
        // #endif
      }, err => {
        uni.showModal({
          title: '提示',
          content: '获取支付参数失败:' + err.msg
        })
      }).catch(e => {

      })
    },
    async $_init_wxpay_env () {
      const initData =this.initData// await this.getInitData()

      const login_methods = initData.login_methods
      const component_appid = login_methods.component_appid

      let channel = null

      // 根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
      // 而且状态可以灵活控制 state为1
      for (var i in login_methods) {
        // && login_methods[i].state ??状态呢？
        if (i != 'component_appid' && login_methods[i].state) {
          channel = ['wx_mp'].indexOf(login_methods[i].type) === -1 ? {
            ...login_methods[i]
          } : {
            ...login_methods[i],
            component_appid
          }
          break
        }
      }

      if (!channel) {
        this.$error('未开通公众号支付')
        return false
      }

      // 如果url有code去掉
      let {
        origin,
        pathname,
        search,
        hash
      } = window.location
      const strArr = []
      if (search.indexOf('code') != -1) {
        const tempArr = search.split('&')
        for (var i in tempArr) {
          if (i.indexOf('code') === -1) {
            strArr.push(tempArr[i])
          }
        }
        let newSearchStr = strArr.join('&')
        if (newSearchStr.indexOf('?') === -1) {
          newSearchStr = '?' + newSearchStr
        }

        search = newSearchStr
      }

      const REDIRECT_URI = urlencode(origin + pathname + search + hash)

      let wxAuthUrl = null

      if (channel.component_appid) {
        // 服务商模式登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`
      } else {
        // 公众号自己的appid用于登录
        wxAuthUrl =
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      }

      window.location.href = wxAuthUrl
    },
    payFailCall () {
      uni.showToast({
        title: '支付失败',
        icon: 'none',
        duration: 2000
      })
    },
    paySuccessCall () {
      const _self = this
      uni.showToast({
        title: '支付成功'
      })
      uni.redirectTo({
        url: '/pagesA/user/MyRedemption'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    background: #fff;
  }

  /* 收货地址 start */
  .address {
    /* margin: 15px 0 10px; */
    display: flex;
    align-items: center;
    padding: 44rpx 38rpx 45rpx;
    // border-top: 30rpx solid #F3F3F3;
    border-bottom: 20rpx solid #F3F3F3;

    .add_msg {
      flex: 1;
      font-size: 28rpx;
    }

    .right {
      width: 18rpx;
      height: 27rpx;
      margin-left: 34rpx;
    }
  }

  .loc_icon {
    width: 41rpx;
    height: 51rpx;
    margin-right: 31rpx;
  }

  .name {
    margin-bottom: 30rpx;
    font-size: 28rpx;
    color: #333;
    line-height: 22rpx;
  }

  .name > span {
    margin-left: 10rpx;
  }

  .location {
    font-size: 24rpx;
    color: #333;
    line-height: 32rpx;
  }

  /* 收货地址 end */
  /* 订单信息 start */
  .order_msg {
    display: flex;
    padding: 30rpx 40rpx 30rpx 30rpx;
  }

  .pro {
    display: flex;
    margin-bottom: 50rpx;
  }

  .order_msg .pro:last-child {
    margin-bottom: 17rpx
  }

  .pro-img {
    width: 200rpx;
    height: 200rpx;
    margin-right: 28rpx;
  }

  .pro-name {
    font-size: 30rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-height: 60rpx;
  }

  .pro-msg {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pro-price {
    color: #F43131;
    font-size: 36rpx;

    span {
      font-size: 24rpx;
      font-style: normal;
    }
  }

  /* 订单信息 end */
  /* 订单其他信息 start */
  .other {
    padding: 30rpx 40rpx 0 30rpx;
    font-size: 22rpx;

    .right {
      margin-left: 18rpx;
      width: 15rpx;
      height: 23rpx;
    }
  }

  .other .bd {
    padding-bottom: 30rpx;
    border-bottom: 2rpx solid #eee;
  }

  .o_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;

    input {
      font-size: 24rpx;
    }
  }

  .o_title .van-switch {
    float: right;
  }

  .o_desc,
  .o_de {
    font-size: 22rpx;
    margin-top: 10rpx;

    text {
      color: #F43131;
    }
  }

  .o_de {
    color: #999;
  }

  .words {
    justify-content: flex-start;
  }

  .words input {
    border: 0;
    margin-left: 20rpx;
    flex: 1;
  }

  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 40rpx 0;
    font-size: 24rpx;
    padding-right: 30rpx;
  }

  .total .money {
    font-size: 30rpx;
    color: #F43131;
  }

  /* 订单其他信息 end */
  /* 提交订单 */
  .order_total {
    height: 100rpx;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    /*z-index: 100;*/
  }

  .submit {
    width: 100%;
    background: #F43131;
    text-align: center;
    color: #fff;
    line-height: 100rpx;
    font-size: 34rpx;
  }

  .totalinfo {
    flex: 1;
    padding-left: 93rpx;
    line-height: 30rpx;
  }

  .info {
    font-size: 24rpx;

    .money {
      color: #F43131;
      font-size: 30rpx;

      .m_icon {
        font-size: 24rpx;
      }
    }
  }

  .tips {
    font-size: 20rpx;
    color: #979797;
  }

  .bMbx {
    padding: 0rpx 20rpx;

    .fMbx {
      font-size: 32rpx;
      height: 30rpx;
      line-height: 30rpx;
      text-align: center;
      padding: 36rpx 0rpx;
    }

    .iMbx {
      display: flex;
      justify-content: space-between;
      height: 104rpx;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      align-items: center;
      font-size: 28rpx;
    }
  }

  .sure {
    height: 90rpx;
    width: 100%;
    background-color: #F43131;
    color: #fff;
    font-size: 32rpx;
    margin-top: 96rpx;
    line-height: 90rpx;
    text-align: center;
  }

  // 提醒用户添加收货地址信息
  .remind-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .remind-add {
      background: #fff;
      width: 90%;
      padding: 50rpx 0 0;
      border-radius: 20rpx;
      overflow: hidden;

      .text-align-center {
        text-align: center;
      }

      .mb20 {
        margin-bottom: 20rpx;
      }

      .remind_desc {
        padding: 0 20rpx;
        font-size: 30rpx;
        margin: 40rpx 0;
        color: #666;
      }

      .remind_btns {
        display: flex;
        border-top: 1rpx solid #efefef;
        line-height: 90rpx;

        .fl1 {
          flex: 1;
        }

        .confirm {
          background: #F43131;
          color: #fff;
        }
      }
    }
  }

  .iMbx {
    text-align: center;
    padding: 0 20rpx;
    font-size: 28rpx;
    color: #333;

    .c_method {
      padding: 37rpx 0;
      border-bottom: 2rpx solid #E6E6E6;
    }

    & .c_method:first-child {
      color: #F43131;
    }

    & .c_method:nth-last-child(1) {
      border: none;
    }

    .confirm-method {
      color: #fff;
      font-size: 30rpx;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      background: #F43131;
    }
  }

  .pwd-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .3);
    z-index: 9999;

    .input-box {
      position: absolute;
      top: 35%;
      left: 50%;
      width: 90%;
      transform: translateX(-50%);
      text-align: center;
      padding: 70rpx 0 20rpx;
      font-size: 30rpx;
      background: #fff;

      .btns {
        display: flex;
        justify-content: space-around;
        line-height: 60rpx;

        .btn {
          flex: 1;
        }
      }

      .input-psw {
        border: 1px solid #efefef;
        width: 80%;
        margin: 0 auto 40rpx;
        height: 20px;
        line-height: 20px;
        padding: 10px 0px;
      }
    }
  }
</style>
