<template>
  <view  @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <!-- <view class="zhezhao" v-if="password_input">
      <view class="input-wrap">
        <view>请输入余额支付密码</view>
        <input class="inputpass" type="password" placeholder="请输入密码" v-model="user_pay_password" @blur="user_password">
        <view class="btns">
          <view @click="cancelInput" class="btn">取消</view>
          <view @click="confirmInput" class="btn">确定</view>
        </view>
      </view>
    </view> -->
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
    <view class="titleImg">
      <image class="image" :src="'/static/client/distributor/bedistributor.jpg'|domain" mode=""></image>
    </view>

    <!--  申请逻辑 -->
    <block v-if="type=='edit'">
      <block>
        <block v-if="select_lists.length>0">
          <view class="center" v-for="(itm,idx2) of select_lists" :key="idx2">
            <view class="mbx">
              {{itm.name}}
            </view>
            <view class="haha  disMy">
              <picker :value="itm.index" mode="selector" :range="itm.options" @change="selectS(idx2,$event)"
                      style="width: 90%;">
                <view class="picker">
                  {{itm.options[itm.index]}}
                </view>
              </picker>
              <image class="disMyImg" :src="'/static/client/person/right.png' | domain"></image>
            </view>
          </view>
        </block>
        <block v-if="text_lists.length>0">
          <view class="center" v-for="(m,n) of text_lists" :key="n">
            <view class="mbx">
              {{m.Name}}
            </view>
            <input class="inputa" type="text" v-model="m.Value">
          </view>
        </block>
        <view class="center" v-if="isShowAddress">
          <view class="mbx">
            区域选择
          </view>
          <view class="haha">
            <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
                    :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
              <view class="picker" style="text-align: center;">
                <view v-if="!address_info.Address_Province">选择省份</view>
                <view v-else>{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
                <view v-if="!address_info.Address_City">选择城市</view>
                <view v-else>{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
                <view v-if="!address_info.Address_Area">选择地区</view>
                <view v-else>{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
              </view>
            </picker>
          </view>
        </view>
        <view class="center" v-if="isShowAddress">
          <view class="mbx">
            选择街道
          </view>
          <view class="haha">
            <picker mode="selector" @change="t_pickerChange" :range="t_arr" range-key="name" :value="t_index">
              <view class="picker">
                <view v-if="!address_info.Address_Town" style="margin-left: 20upx;width: 300upx;">选择街道</view>
                <view v-else style="margin-left: 20upx;width: 300upx;">{{t_arr[t_index]['name']}}</view>
              </view>
            </picker>
          </view>
        </view>
      </block>

      <view class="checks m-t-15" v-if="pro.dis_config.Distribute_AgreementOpen">
        <radio @click="changes" :checked="isAgree" style="transform:scale(0.7)" />
        <text @click="goDistributeAgreement">同意
          <text class="checkq">{{pro.dis_config.Distribute_AgreementTitle}}</text>
        </text>
      </view>

      <view class="submits" @click="application">
        {{textShen}}
        <!--				立即申请成为分销商-->
      </view>
    </block>

    <block v-else>
      <block v-if="pro.dis_config.Level_Form">
        <view class="center" v-if="pro.dis_config.Reserve_DisplayName==1">
          <view class="mbx">
            姓名
          </view>
          <input class="inputa" type="text" placeholder="请输入您的姓名" placeholder-style="color: #CAC8C8;"
                 v-model="shenArr.DisplayName">
        </view>
        <view class="center" v-if="pro.dis_config.Reserve_DisplayTelephone==1">
          <view class="mbx">
            电话
          </view>
          <input class="inputa" type="text" placeholder="请输入您的电话" placeholder-style="color: #CAC8C8;"
                 v-model="shenArr.DisplayTelephone" @blur="isTell">
        </view>
        <view class="center" v-for="(itm,idx) of select_lists" :key="idx">
          <view class="mbx">
            {{itm.name}}
          </view>
          <view class="haha">
            <picker :value="itm.index" mode="selector" :range="itm.options" @change="selectS(idx,$event)">
              <view class="picker">
                {{itm.options[itm.index]}}
              </view>
            </picker>
          </view>
        </view>
        <view class="center" v-for="(m,n1) of text_lists" :key="n1">
          <view class="mbx">
            {{m.Name}}
          </view>
          <input class="inputa" type="text" v-model="m.Value" :placeholder="'请输入'+m.Name">
        </view>
      </block>
      <view class="disHaihong" v-if="disData.Level_Name">
        {{disData.Level_Name}}({{disData.level_rules_edit.direct_buy.value.money}}元)
      </view>
      <view class="checks" v-if="pro.dis_config.Distribute_AgreementOpen">
        <radio @click="changes" :checked="isAgree" style="transform:scale(0.7)" />
        <text @click="goDistributeAgreement">同意
          <text class="checkq">{{pro.dis_config.Distribute_AgreementTitle}}</text>
        </text>
      </view>
      <view class="submits" @click="becomeFenxiao">
        立即购买成为{{commi_rename.commi}}
      </view>
    </block>

    <layout-layer ref="popupLayer" :direction="'top'">
      <div class="iMbx">
        <div class="c_method" v-for="(item,index) in initData.pay_arr" @click="chooseType(index)" :key="index">
          {{item}}
          <text>￥{{pay_money}}</text>
        </div>
      </div>
    </layout-layer>
  </view>
</template>

<script>

import { disApply, disApplyInit, disBuy } from '@/api/customer'
import { getTown } from '@/api/common'
import area from '@/common/area'
import { array_change, get_arr_index, GetQueryByString, isWeiXin, urlencode } from '@/common/helper'

import { mapActions } from 'vuex'
import Pay from '@/common/Pay'
import Storage from '@/common/Storage'
import { confirm, error, toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutLayer from '@/componets/layout-layer/layout-layer'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutLayer,

  },
  data () {
    return {
      disData: {},
      addressArr: {},
      isShowAddress: false,
      type: '', // 是申请还是购买

      isXu: false, // 是否弹出购买须知
      isAgree: false, // 是否同意
      pro: {
        dis_level: [{}],
        dis_config: {},
        Dis_Agreement_btn: {},
      },
      change_objectMultiArray: [], // 选择数据
      address_info: {},
      objectMultiArray: [], // 展示数据
      multiIndex: [0, 0, 0], // 选择数据
      change_multiIndex: [0, 0, 0], // 改变的收货地址对应列的下标
      current: 0,
      // 街道信息
      t_arr: [],
      t_index: 0,
      shenArr: {
        DisplayName: '',
        DisplayTelephone: '',
      },
      forIndex: 0,
      select_lists: '', // 填写下拉选
      disLevelInfo: '',
      text_lists: '', // 填写文本框
      submitM: false,
      pay_arr: [], // 支付方式
      password_input: false, // 弹出密码输入框
      user_pay_password: '', // 用户输入的密码
      code: '', // code
      JSSDK_INIT: false,
      pay_type: '', // 支付方式
      pay_money: 0, // 支付金额
      level_id: '',
      textShen:"",
    }
  },
  computed: {
    // textShen () {
    //   if (this.commi_rename) {
    //     return '立即申请成为' + this.commi_rename.commi
    //   }
    //   return ''
    // },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
    initData () {
      return this.$store.state.system.initData
    },
    commi_rename () {
      try {
        return this.initData.commi_rename
      } catch (e) {
        return {}
      }
    },
  },
  onLoad (options) {
    this.level_id = parseInt(options.id)
    this.type = options.type
    const that = this

    this.disApplyInit()
    this.objectMultiArray = [
      array_change(area[0]['0']),
      array_change(area[0]['0,1']),
      array_change(area[0]['0,1,35']),
    ]
    this.change_objectMultiArray = [
      array_change(area[0]['0']),
      array_change(area[0]['0,1']),
      array_change(area[0]['0,1,35']),
    ]
    // 获取支付方式
    const initData = this.getInitData()
    this.pay_arr = initData.pay_arr
  },
  methods: {
    ...mapActions({
      getInitData: 'system/loadInitData',
    }),
    payFailCall (err) {
      uni.showToast({
        title: err.msg ? err.msg : '支付失败',
        icon: 'none',
        duration: 2000,
      })
    },
    // 查看须知
    goDistributeAgreement () {
      uni.navigateTo({
        url: '/pagesA/distributor/DistributeAgreement',
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
      // this.self_orderPay();
      this.password_input = false
      // 提交信息
      this.disBuy()
    },
    payFenId (index) {
      this.current = index
      this.pay_money = this.pro.dis_level[index].Level_LimitValue
    },
    // 选择支付方式
    chooseType (index) {
      this.pay_type = index
      if (index === 'remainder_pay') {
        this.$refs.popupLayer.close()

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
          }).catch(err => {
            error('请选择其他支付方式')
          })
          return
        }
        this.password_input = true// 弹出密码输入框
        return
      }

      this.disBuy()
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
              toast('成为经销商')
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

      // 微信小程序下需要模板消息
      // #ifdef MP-WEIXIN
      // const initData = this.initData
      // if(initData.hasOwnProperty('lp_template') && initData.lp_template){
      // 	let lp_template = initData.lp_template
      // 	let tmplIds = lp_template.dis_buy
      // 	//调就是了，是否成功都可以
      // 	wx.requestSubscribeMessage({tmplIds})
      // }
      // #endif
      toast('成为经销商')
      uni.navigateTo({
        url: '/pages/distributor/Main',
      })
    },
    // 购买提交信息
    async disBuy () {
      let data = {
        buy_info: {},
      }
      data.pay_type = this.pay_type
      if (this.pro.dis_config.Level_Form) {
        if (this.pro.dis_config.Reserve_DisplayName === 1) {
          data.buy_info.Reserve_DisplayName = this.shenArr.DisplayName
        }
        if (this.pro.dis_config.Reserve_DisplayTelephone === 1) {
          data.buy_info.Reserve_DisplayTelephone = this.shenArr.DisplayTelephone
        }
        if (this.select_lists.length > 0) {
          for (const item of this.select_lists) {
            const arr = {}
            arr[item.name] = item.options[item.index]
            data.buy_info[item.arrs] = arr
          }
        }
        if (this.text_lists.length > 0) {
          for (const item of this.text_lists) {
            const arr = {}
            arr[item.Name] = item.Value
            data.buy_info[item.arrs] = arr
          }
        }
      }
      if (this.pro.dis_config.Distribute_AgreementOpen) {
        if (this.isAgree) {
          data.agent_promise = 1
        }
      }
      data.buy_level_id = this.level_id
      data.buy_info = JSON.stringify(data.buy_info)
      const _that = this
      // #ifdef MP-WEIXIN
      if (!this.userInfo.openid) {
        await new Promise(resolve => {
          uni.login({
            success: function (loginRes) {
              _that.code = loginRes.code
              resolve()
            },
          })
        })
      }
      // #endif
      // #ifdef H5

      // 微信h5
      if (this.pay_type === 'wx_h5') {
        data.pay_type = 'wx_h5'
      }

      // 阿里h5
      if (this.pay_type === 'alipay') {
        data.pay_type = 'alipay'
      }

      // 公众号需要code
      if (this.pay_type === 'wx_mp') {
        if (!isWeiXin()) {
          error('请在微信内打开')
          return
        }

        const isHasCode = this.code || GetQueryByString('code')
        if (isHasCode) {
          // 拿到之前的配置
          data = {
            ...Storage.get('temp_order_info'),
            code: isHasCode,
            pay_type: 'wx_mp',
          }
        } else {
          // 存上临时的数据
          Storage.set('temp_order_info', data)
          // 去掉转吧
          this.$_init_wxpay_env()
          return
        }
      }

      // #endif

      if (this.pay_type === 'remainder_pay') {
        data.user_pay_password = this.user_pay_password
      } else {
        if (!this.userInfo.openid) {
          data.code = this.code
        }
      }

      if (this.pay_type === 'remainder_pay') {
        disBuy(data).then(res => {
          this.paySuccessCall(res)
        }, err => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/distributor/Main',
            })
          }, 2000)
        }).catch(e => {
        })
      } else {
        disBuy(data, {
          tip: '正在加载中',
          mask: true,
        }).then(res => {
          Pay(this, this.pay_type, res)
        }, err => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
        }).catch(e => {
        })
      }

      // }else if(this.pay_type=='ali_app'){
      // 		disBuy(data).then(res=>{
      // 			let provider = 'alipay';
      // 			let orderInfo = res.data.arg;
      // 			uni.requestPayment({
      // 			    provider,
      // 			    orderInfo, //微信、支付宝订单数据
      // 			    success: function (res) {
      // 			        _self.paySuccessCall(res)
      // 			    },
      // 			    fail: function (err) {
      // 			        uni.showModal({
      // 			            title:'支付错误',
      // 			            content:JSON.stringify(err)
      // 			        })
      // 			    }
      // 			});
      // 			return;
      // 		},err=>{
      // 			uni.showToast({
      // 				title:res.msg,
      // 				icon:'none'
      // 			})
      // 		}).catch(e=>{
      // 		})
      // }else{
      // 	//不用余额调微信支付
      // 	this.wechatPay(data);
      // }
    },
    becomeFenxiao () {
      let arr = true
      if (this.pro.dis_config.Level_Form) {
        if (this.pro.dis_config.Reserve_DisplayName === 1 && this.shenArr.DisplayName === '') {
          uni.showToast({
            title: '姓名不能为空',
            icon: 'none',
          })
          arr = false
          return
        } else {
          if (this.pro.dis_configReserve_DisplayTelephone === 1 && this.shenArr.DisplayTelephone === '') {
            uni.showToast({
              title: '电话不能为空',
              icon: 'none',
            })
            arr = false
            return
          } else if (this.pro.dis_config.Reserve_DisplayTelephone === 1 && !(/^1[3456789]\d{9}$/.test(this.shenArr.DisplayTelephone))) {
            uni.showToast({
              title: '手机号输入错误，请重新输入',
              icon: 'none',
            })
            arr = false
            return
          } else {
            // 循环判断输入框
            if (this.text_lists.length > 0) {
              for (const item of this.text_lists) {
                if (item.Value === '') {
                  uni.showToast({
                    title: item.Name + '不能为空',
                    icon: 'none',
                  })
                  arr = false
                  return
                }
              }
            }
          }
        }
      }
      if (this.pro.dis_config.Distribute_AgreementOpen) {
        if (!this.isAgree) {
          uni.showToast({
            title: '未同意须知',
            icon: 'none',
          })
          return
        }
      }
      if (arr) {
        this.$refs.popupLayer.show()
      }
    },
    // 跳转商品详情
    goDetail (item) {
      uni.navigateTo({
        url: '/pages/detail/detail?Products_ID=' + item,
      })
    },
    // 跳转去列表页
    goResult () {
      uni.navigateTo({
        url: '/paegs/classify/result',
      })
    },
    application () {
      if (this.submitM) {
        uni.showToast({
          title: '当前不可申请',
          icon: 'none',
        })
        return
      }

      let arr = true

      // 循环判断输入框
      if (this.text_lists.length > 0) {
        for (const item of this.text_lists) {
          if (item.Value === '') {
            uni.showToast({
              title: item.Name + '不能为空',
              icon: 'none',
            })
            arr = false
            return
          }
        }
      }
      // 判断地址
      if (this.isShowAddress && arr) {
        if (JSON.stringify(this.address_info) === '{}') {
          uni.showToast({
            title: '地址不能为空',
            icon: 'none',
          })
          arr = false
          return
        }
      }

      if (this.pro.dis_config.Distribute_AgreementOpen) {
        if (!this.isAgree) {
          uni.showToast({
            title: '未同意须知',
            icon: 'none',
          })
          arr = false
          return
        }
      }
      // 是否同意购买须知
      if (arr) {
        const apply_info = {}

        if (this.isShowAddress) {
          const DisplayLocaltion = this.addressArr.name
          apply_info[DisplayLocaltion] = {}
          apply_info[DisplayLocaltion].pro_id = this.address_info.Address_Province
          apply_info[DisplayLocaltion].city_id = this.address_info.Address_City
          apply_info[DisplayLocaltion].area_id = this.address_info.Address_Area
          apply_info[DisplayLocaltion].town_id = this.address_info.Address_Town
        }
        if (this.select_lists.length > 0) {
          for (const item of this.select_lists) {
            const arr = {}
            apply_info[item.name] = item.options[item.index]
          }
        }
        if (this.text_lists.length > 0) {
          for (const item of this.text_lists) {
            const arr = {}
            apply_info[item.Name] = item.Value
          }
        }

        disApply({
          apply_info: JSON.stringify(apply_info),
          apply_level_id: this.level_id,
        }).then(res => {
          uni.showToast({
            title: res.msg,
            icon: 'none',
          })
          this.submitM = true
          setTimeout(() => {
           this.$back()
          }, 1000)

          this.textShen = res.msg
        }).catch(res => {
          this.textShen = res.msg
        })
      } else if (arr) {
        this.isXu = true
        uni.showToast({
          title: '请勾选同意购买须知',
          icon: 'none',
        })
      }
    },
    selectS (idx, e) {
      this.select_lists[idx].index = e.detail.value
    },
    // 是否是手机号
    isTell () {
      if (this.pro.dis_config.Reserve_DisplayTelephone === 1) {
        if (!(/^1[3456789]\d{9}$/.test(this.shenArr.DisplayTelephone))) {
          uni.showToast({
            title: '手机号输入错误，请重新输入',
            icon: 'none',
          })
        }
      }
    },
    // 乡镇地址 点击确定
    t_pickerChange: function (e) {
      this.t_index = e.detail.value
      this.address_info.Address_Town = this.t_arr[e.detail.value].id
    },
    address_town: function () {
      getTown({ a_id: this.address_info.Address_Area }).then(res => {
        var t_arr = []
        var t_index = 0
        var idx = 0
        for (var i in res.data) {
          for (var j in res.data[i]) {
            t_arr.push({
              id: j,
              name: res.data[i][j],
            })
            if (j === this.address_info.Address_Town) {
              t_index = idx
            }
            idx++
          }
        }
        this.t_arr = t_arr
        this.t_index = t_index
      }).catch(() => {
      })
    },
    // 处理省市区联动信息
    addressChange: function (columnValue) {
      var p_arr = this.change_objectMultiArray[0]
      var p_id = p_arr[columnValue[0]].id
      var c_arr = array_change(area[0][0 + ',' + p_id])
      var c_id = c_arr[columnValue[1]].id
      var a_arr = array_change(area[0][0 + ',' + p_id + ',' + c_id])
      this.change_objectMultiArray = [
        p_arr,
        c_arr,
        a_arr,
      ]
      this.change_multiIndex = columnValue
    },
    // 选择收货地址
    bindMultiPickerColumnChange: function (e) {
      var column = e.detail.column // 修改的列
      var index = e.detail.value // 选择列的下标（从0开始）
      var change_multiIndex = 'change_multiIndex[' + column + ']'

      var columnValue = [
        column === 0 ? index : this.change_multiIndex[0],
        column === 0 ? 0 : (column === 1 ? index : this.change_multiIndex[1]),
        column === 0 || column === 1 ? 0 : index,
      ]
      this.addressChange(columnValue)
    },
    // 选择收获地址三级联动后确定按钮动作
    bindMultiPickerChange: function (e) {
      this.addressChange(e.detail.value)
      this.objectMultiArray = this.change_objectMultiArray
      this.multiIndex = e.detail.value
      this.address_info.Address_Province = this.objectMultiArray[0][this.multiIndex[0]].id
      this.address_info.Address_City = this.objectMultiArray[1][this.multiIndex[1]].id
      this.address_info.Address_Area = this.objectMultiArray[2][this.multiIndex[2]].id
      this.address_info.Address_Town = 0
      this.t_arr = []
      this.t_index = 0
      // 处理街道信息
      this.address_town()
    },
    async $_init_wxpay_env () {
      const initData = await this.getInitData()

      const login_methods = initData.login_methods
      const component_appid = login_methods.component_appid

      let channel = null

      // 根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
      // 而且状态可以灵活控制 state为1
      for (var i in login_methods) {
        // && login_methods[i].state ??状态呢？
        if (i !== 'component_appid' && login_methods[i].state) {
          channel = ['wx_mp'].indexOf(login_methods[i].type) === -1 ? {
            ...login_methods[i],
          } : {
            ...login_methods[i],
            component_appid,
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
        hash,
      } = window.location
      const strArr = []
      if (search.indexOf('code') !== -1) {
        const tempArr = search.split('&')
        for (var i of tempArr) {
          // 过滤多余的参数
          if (i.indexOf('code') === -1 && i.indexOf('state') === -1 && i.indexOf('appid') === -1) {
            strArr.push(i)
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
    async self_orderPay (is_forward) {
      const _self = this
      let payConf = {}

      // 不是跳转的
      if (!is_forward) {
        return
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
          error('请在微信内打开')
          return
        }

        const isHasCode = this.code || GetQueryByString('code')
        // 已经用过的code不再用
        if (isHasCode && isHasCode !== Storage.get('isUseCode')) {
          // 拿到之前的配置
          payConf = {
            ...Storage.get('temp_order_info'),
            code: isHasCode,
            pay_type: 'wx_mp',
          }

          Storage.set('isUseCode', isHasCode)
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
          },
        })
      })
      // #endif
      this.disBuy()
    },
    disApplyInit () {
      let _self=this
      disApplyInit().then(res => {
        this.pro = res.data
        if (this.type === 'edit') {
          // 处理自定义  select  和text
          let dislist = []
          for (const item of this.pro.dis_level) {
            if (item.Level_ID === this.level_id) {
              dislist = item
            }
          }
          console.log(dislist,this.pro)
          dislist.manual_rules = typeof dislist.manual_rules !== 'object' ? JSON.parse(dislist.manual_rules) : dislist.manual_rules
          console.log(dislist.manual_rules)
          var select_arrays = []
          var text_arrays = []
          for (var fi in dislist.manual_rules) {
            console.log(fi)
            if (dislist.manual_rules[fi].type === 'select') {
              dislist.manual_rules[fi].name + '|' + dislist.manual_rules[fi].place
              var select_array = dislist.manual_rules[fi].place.split('|')
              dislist.manual_rules[fi].place = select_array
              var temp = new Object()
              temp.index = 0
              temp.name = dislist.manual_rules[fi].name
              temp.options = select_array
              temp.arrs = fi
              select_arrays.push(temp)
            } else if (dislist.manual_rules[fi].type === 'input') {
              var temp = new Object()
              temp.Name = dislist.manual_rules[fi].name
              temp.Type = dislist.manual_rules[fi].type
              temp.Value = dislist.manual_rules[fi].place
              temp.arrs = fi
              text_arrays.push(temp)
            }
          }
          this.select_lists = select_arrays
          this.text_lists = text_arrays
          this.disLevelInfo = dislist.manual_rules
          for (const item of this.disLevelInfo) {
            if (item.type === 'address') {
              this.isShowAddress = true
              this.addressArr = item
            }
          }
          // 如果用户之前提交过
          if (!dislist.apply_order) return
          if (!((JSON.stringify(dislist.apply_order) === '{}'))) {
            const myInfo = JSON.parse(dislist.apply_order.manual_form)


            console.log( dislist.apply_order,"ss")
            if (dislist.apply_order.status === 3) {
              _self.textShen = dislist.apply_order.status_desc + '(' + dislist.apply_order.reason + ')'
            }
            if (dislist.apply_order.status === 1) {
              _self.submitM = true
              _self.textShen = dislist.apply_order.status_desc
            }
            if (dislist.apply_order.status === 2) {
              _self.textShen = dislist.apply_order.status_desc
            }
            for (const item in myInfo) {
              if (myInfo[item].type === 'address') {
                this.address_info.Address_Province = myInfo[item].pro_id
                this.address_info.Address_City = myInfo[item].city_id
                this.address_info.Address_Area = myInfo[item].area_id
                this.address_info.Address_Town = myInfo[item].town_id
                this.address_town()
                const objectMultiArray = [
                  array_change(area[0]['0']),
                  array_change(area[0]['0,' + myInfo[item].pro_id]),
                  array_change(area[0]['0,' + myInfo[item].pro_id + ',' + myInfo[item].city_id]),
                  array_change(area[0]['0,' + myInfo[item].pro_id + ',' + myInfo[item].city_id] + ',' + myInfo[item].town_id),
                ]
                // 设置初始显示列
                const multiIndex = [
                  get_arr_index(objectMultiArray[0], myInfo[item].pro_id),
                  get_arr_index(objectMultiArray[1], myInfo[item].city_id),
                  get_arr_index(objectMultiArray[2], myInfo[item].area_id),
                  get_arr_index(objectMultiArray[3], myInfo[item].town_id),
                ]
                this.objectMultiArray = objectMultiArray
                this.multiIndex = multiIndex
              }
            }

            for (const ite in myInfo) {
              for (const text in this.text_lists) {
                if (this.text_lists[text].Name === ite) {
                  this.text_lists[text].Value = myInfo[ite]
                }
              }
              for (const select in this.select_lists) {
                if (this.select_lists[select].name === ite) {
                  for (let i = 0; i < this.select_lists[select].options.length; i++) {
                    if (this.select_lists[select].options[i] === myInfo[ite]) {
                      this.select_lists[select].index = i
                    }
                  }
                }
              }
            }
          }
        } else {
          // 获取第一个分销商的金额
          for (const item of this.pro.dis_level) {
            if (item.Level_ID === this.level_id) {
              this.disData = item
              this.pay_money = item.level_rules_edit.direct_buy.value.money
            }
          }
          // 处理自定义  select  和text
          const dislist = this.pro.dis_config
          dislist.Distribute_Form = typeof dislist.Distribute_Form !== 'object' ? JSON.parse(dislist.Distribute_Form) : dislist.Distribute_Form
          var select_arrays = []
          var text_arrays = []
          for (var fi in dislist.Distribute_Form) {
            console.log(fi)
            if (dislist.Distribute_Form[fi].Type === 'select') {
              dislist.Distribute_Form[fi].Name + '|' + dislist.Distribute_Form[fi].Value
              var select_array = dislist.Distribute_Form[fi].Value.split('|')
              dislist.Distribute_Form[fi].Value = select_array
              var temp = new Object()
              temp.index = 0
              temp.name = dislist.Distribute_Form[fi].Name
              temp.options = select_array
              temp.arrs = fi
              select_arrays.push(temp)
            } else if (dislist.Distribute_Form[fi].Type === 'text') {
              var temp = new Object()
              temp.Name = dislist.Distribute_Form[fi].Name
              temp.Type = dislist.Distribute_Form[fi].Type
              temp.Value = dislist.Distribute_Form[fi].Value
              temp.arrs = fi
              text_arrays.push(temp)
            }
          }
          this.select_lists = select_arrays
          this.text_lists = text_arrays
          this.disLevelInfo = dislist.Distribute_Form
        }
      }).catch(e => {
      })
    },
    changes () {
      this.isAgree = !this.isAgree
    },
  },
  async created () {
    // #ifdef H5
    if (isWeiXin()) {
      this.code = GetQueryByString(location.href, 'code')
      if (this.code) {
        this.pay_type = 'wx_mp'// 需要手动设置一下
        // ls.set('code',this.code)
        this.self_orderPay(1)
      }
    }
    // #endif

    const initData = await this.getInitData()
    uni.setNavigationBarTitle({
      title: initData.commi_rename.commi + '信息',
    })
    this.textShen='立即申请成为' + this.commi_rename.commi
   
  },
}
</script>

<style lang="scss" scoped>
  view {
    box-sizing: border-box;
  }

  .titleImg {
    width: 750upx;
    height: 330upx;
    margin-bottom: 25upx;

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .fenxiao {
    margin-top: 30upx;
    margin-left: 20upx;
    font-size: 30upx;

    .textq {
      font-size: 24upx;
      color: #666666;

      .textw {
        font-size: 28upx;
        color: #F43131;
      }
    }
  }

  .isFenxiao {
    width: 620upx;
    height: 80upx;
    background: rgba(244, 49, 49, 1);
    border-radius: 20upx;
    margin: 0 auto;
    margin-top: 50upx;
    font-size: 34upx;
    color: #FFFFFF;
    line-height: 80upx;
    text-align: center;
  }

  .line {
    width: 750upx;
    height: 20upx;
    background: rgba(248, 248, 248, 1);
    margin-top: 30upx;
  }

  .pro {
    width: 750upx;
    padding: 30upx 20upx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 50upx;
    padding-top: 0upx;
    padding-bottom: 0upx;

    .forOf {
      width: 345upx;

      .imgs {
        width: 345upx;
        height: 345upx;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        margin: 17upx 15upx 20upx 11upx;
        width: 319upx;
        height: 60upx;
        line-height: 30upx;
        font-size: 24upx;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .prices {
    color: #F43131;
    font-size: 24upx;
    margin-left: 15upx;
    margin-bottom: 37upx;

    text {
      font-size: 34upx;
      font-weight: bold;
    }
  }

  .titleImg {
    width: 750upx;
    height: 330upx;
    margin-bottom: 25upx;

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .center {
    height: 98upx;
    width: 710upx;
    margin: 0 auto;
    border-bottom: 1upx solid #E7E7E7;
    display: flex;
    align-items: center;

    .mbx {
      width: 140upx;
      font-size: 30upx;
      color: #333333;
    }

    .inputa {
      width: 600upx;
      font-size: 28upx;
    }
  }

  .checks {
    font-size: 20upx;
    color: #333333;
    display: flex;
    align-items: center;
    margin-left: 4upx;
  }

  .disHaihong {
    font-size: 30rpx;
    height: 60rpx;
    line-height: 60rpx;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .checkq {
    color: #69A1FF;
    margin-left: 10upx;
  }

  .submits {
    width: 620upx;
    height: 80upx;
    line-height: 80upx;
    background: rgba(244, 49, 49, 1);
    border-radius: 20upx;
    margin: 0 auto;
    font-size: 34upx;
    color: #FFFFFF;
    text-align: center;
    margin-top: 40upx;
    margin-bottom: 120upx;
  }

  .qwe {
    width: 750upx;
    height: 100upx;
    position: fixed;
    bottom: 0upx;
    left: 0upx;
    background: rgba(64, 61, 61, 1);
    display: flex;
    align-items: center;
    padding-left: 20upx;
    padding-right: 24upx;

    .imgs {
      width: 68upx;
      height: 68upx;
      border-radius: 50%;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .nickName {
      font-size: 30upx;
      color: #FFFFFF;
      margin-left: 16upx;
    }

    .liji {
      margin-left: 113upx;
      font-size: 22upx;
      color: #FFFFFF;
    }

    .hahas {
      width: 140upx;
      height: 50upx;
      background: rgba(244, 49, 49, 1);
      border-radius: 10upx;
      position: absolute;
      top: 25upx;
      right: 20upx;
      font-size: 26upx;
      color: #FFFFFF;
      text-align: center;
      line-height: 50upx;
    }
  }

  .picker view {
    width: 160upx;
    font-size: 28upx;
    line-height: 90upx;
    height: 90upx;
    margin-right: 10upx;
    overflow: hidden;
  }

  .picker {
    display: flex;

    .quyu {
      width: 120upx;
    }
  }

  view.haha {
    font-size: 30upx;
    color: #333333;
    margin-right: 42upx;
  }

  .disConfig {
    padding-bottom: 50upx;
  }

  .uni-list-cell {
    display: flex;
    align-items: center;
    font-size: 25upx;
    color: #333333;
    height: 25upx;
    padding-top: 38upx;
    margin-left: 20upx;
    width: 710upx;

    &:last-child {
      padding-bottom: 30upx;
      border-bottom: 1upx solid #E7E7E7;
    }
  }

  .iMbx {
    text-align: center;
    padding: 0 20upx;
    font-size: 28upx;
    color: #333;

    .c_method {
      padding: 37upx 0;
      border-bottom: 2upx solid #E6E6E6;
    }

    & .c_method:first-child {
      color: #F43131;
    }

    & .c_method:nth-last-child(1) {
      border: none;
    }
  }

  // .zhezhao {
  // 		position: fixed;
  // 		width: 100%;
  // 		height: 100%;
  // 		background: rgba($color: #000000, $alpha: 0.3);
  // 		z-index: 1000;

  // 		.input-wrap {
  // 			background: #fff;
  // 			color: #000;
  // 			text-align: center;
  // 			width: 90%;
  // 			margin: 400upx auto;
  // 			padding: 40px 50upx;
  // 			box-sizing: border-box;
  // 			font-size: 28upx;

  // 			.inputpass {
  // 				margin: 40upx 0;
  // 				border: 1px solid #efefef;
  // 			}

  // 			.btns {
  // 				display: flex;
  // 				justify-content: space-around;

  // 				.btn {
  // 					flex: 1;
  // 				}
  // 			}
  // 		}
  // 	}

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
      margin: 400rpx auto;
      padding: 40rpx 50rpx 30rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      border-radius: 10rpx;

      .input {
        margin: 40rpx 0;
        border: 1px solid #efefef;
        height: 20px;
        line-height: 20px;
        padding: 10px 0px;
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

  .disMy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-right: 0px !important;
  }

  .disMyImg {
    width: 9px;
    height: 14px;
  }
</style>
