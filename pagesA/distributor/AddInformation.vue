<template>
  <view class="all">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    <view class="top">
      <view class="first">
        <view class="circleQ">
          <view></view>
        </view>
        <view class="lineQ" :class="isNext?'lineW':''">

        </view>
        <view class="circleQ" :class="isNext?'':'circleW'">
          <view></view>
        </view>
        <view class="lineQ" :class="isLast?'lineW':''">

        </view>
        <view class="circleQ" :class="isLast?'':'circleW'">
          <view></view>
        </view>
      </view>
      <view class="second">
        <view class="secondQ">
          填写信息
        </view>
        <view class="secondW" :class="isNext?'secondQ':''">
          选择区域
        </view>
        <view class="secondE" :class="isLast?'secondQ':''">
          提交审核
        </view>
      </view>
    </view>
    <block v-if="!isNext">
      <view class="three">
        <view class="haha">
          姓名
        </view>
        <input class="inputs" type="text" placeholder="请输入您的姓名" placeholder-class="place" v-model="arr.apply_name">
      </view>
      <view class="three">
        <view class="haha">
          电话
        </view>
        <input class="inputs" type="number" placeholder="请输入您的电话" placeholder-class="place" v-model="arr.apply_mobile"
               @blur="isTell">
      </view>
      <view class="three">
        <view class="haha">
          级别
        </view>
        <radio-group @change="radioChange" class="myRadio">
          <view v-for="(item, index) in items" :key="item.value" class="myRadioQ">
            <view>
              <radio class="radio" :value="item.value" :checked="index === currents" />
            </view>
            <view class="mbx">{{item.name}}</view>
          </view>
        </radio-group>

      </view>
    </block>
    <block v-else>
      <view class="threes">
        <view class="haha" style="flex: 1;">
          <!-- 选择区域 -->
          <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange"
                  :value="change_multiIndex" :range="change_objectMultiArray" range-key="name">
            <view style="display: flex;justify-content: space-between;">
              <view class="picker">
                <view class="quyu">选择区域</view>
                <view v-if="!address_info.Address_Province">选择省份</view>
                <view v-else style="overflow: hidden;">{{objectMultiArray[0][multiIndex[0]]['name']}}</view>
                <block v-if="current>0">
                  <view v-if="!address_info.Address_City">选择城市</view>
                  <view v-else style="overflow: hidden;">{{objectMultiArray[1][multiIndex[1]]['name']}}</view>
                </block>
                <block v-if="current>1">
                  <view v-if="!address_info.Address_Area">选择地区</view>
                  <view v-else style="overflow: hidden;">{{objectMultiArray[2][multiIndex[2]]['name']}}</view>
                </block>
              </view>
              <view class="images">
                <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
              </view>
            </view>
          </picker>
        </view>

      </view>
      <view class="threes" v-if="current==3">
        <view class="haha">
          <picker mode="selector" @change="t_pickerChange" :range="t_arr" range-key="name" :value="t_index">
            <view class="picker">
              <text style="font-size: 28rpx;">街道地址</text>
              <view v-if="!address_info.Address_Town" style="margin-left: 20rpx;width: 300rpx;">选择街道</view>
              <view v-else style="margin-left: 20rpx;width: 300rpx;">{{t_arr[t_index]['name']}}</view>
            </view>
          </picker>
        </view>
        <view class="images">
          <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
        </view>
      </view>
    </block>

    <block v-if="isLast">
      <view class="four">
        信息审核中
      </view>
    </block>
    <block v-else>
      <view class="four" @click="nextStep">
        {{isNext?'提交申请':'下一步'}}
      </view>
      <view class="five" @click="lookJilu">
        {{isNext?'返回修改':'查看申请记录'}}
        <image class="image" :src="'/static/client/distributor/chakan.png'|domain"></image>
      </view>
    </block>
  </view>
</template>

<script>

import area from '@/common/area'
import { array_change } from '@/common/helper'

import { agentApply } from '@/api/customer'
import { getTown } from '@/api/common'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      isNext: false,
      items: [
        // {
        // 	name:'省级',
        // 	value:'pro'
        // },{
        // 	name:'市级',
        // 	value:'cit'
        // },
        // {
        // 	name:'县/区',
        // 	value:'cou'
        // },
        // {
        // 	name:'镇',
        // 	value:'tow'
        // }
      ],
      isLast: false,
      objectMultiArray: [], // 展示数据
      multiIndex: [0, 0, 0], // 选择数据

      // 用于收货地址选择用
      change_objectMultiArray: [], // 选择数据
      change_multiIndex: [0, 0, 0], // 改变的收货地址对应列的下标
      address_info: {},
      current: 0,
      currents: 0,
      // 街道信息
      t_arr: [],
      t_index: 0,
      arr: {
        apply_name: '',
        apply_mobile: ''
      },
      isAgr: false
    }
  },
  onShow () {

  },
  onLoad (options) {
    this.items = []
    if (options.pro === 1) {
      this.items.push({
        name: '省级',
        value: 'pro'
      })
    }
    if (options.cit === 1) {
      this.items.push({
        name: '市级',
        value: 'cit'
      })
    }
    if (options.cou === 1) {
      this.items.push({
        name: '县/区',
        value: 'cou'
      })
    }
    if (options.tow === 1) {
      this.items.push({
        name: '镇',
        value: 'tow'
      })
    }
  },
  methods: {
    isTell () {
      if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
        uni.showToast({
          title: '手机号输入错误，请重新输入',
          icon: 'none'
        })
      }
    },
    lookJilu () {
      if (this.isNext) {
        this.isNext = false
      } else {
        uni.navigateTo({
          url: '/pagesA/distributor/RegionRecord?index=1'
        })
      }
    },
    nextStep () {
      if (this.isNext) {
        if (this.isAgr) {
          return
        }
        this.isAgr = true
        if (JSON.stringify(this.address_info) === '{}') {
          uni.showToast({
            title: '请选择地区信息',
            icon: 'none'
          })
        } else {
          const info = {}
          info.apply_name = this.arr.apply_name
          info.apply_mobile = this.arr.apply_mobile
          if (this.current === 0) {
            info.apply_area = 'pro'
            info.pro_id = this.address_info.Address_Province
          } else if (this.current === 1) {
            info.apply_area = 'cit'
            info.pro_id = this.address_info.Address_Province
            info.city_id = this.address_info.Address_City
          } else if (this.current === 2) {
            info.apply_area = 'cou'
            info.pro_id = this.address_info.Address_Province
            info.city_id = this.address_info.Address_City
            info.area_id = this.address_info.Address_Area
          } else if (this.current === 3) {
            if (this.address_info.Address_Town === 0) {
              uni.showToast({
                title: '请选择街道信息',
                icon: 'none'
              })
              return
            }
            info.apply_area = 'tow'
            info.pro_id = this.address_info.Address_Province
            info.city_id = this.address_info.Address_City
            info.area_id = this.address_info.Address_Area
            info.town_id = this.address_info.Address_Town
          }

          agentApply(info).then(res => {
            this.isLast = true
            this.isAgr = false
            uni.showToast({
              title: res.msg
            })
            setTimeout(function () {
              uni.navigateTo({
                url: '/pagesA/distributor/Region'
              })
            }, 1000)
          }).catch(e => {
            this.isAgr = false
          })
        }
      } else {
        if (!this.arr.apply_name) {
          uni.showToast({
            title: '请输入姓名',
            icon: 'none'
          })
          return
        } else if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
          uni.showToast({
            title: '手机号输入错误，请重新输入',
            icon: 'none'
          })
          return
        }
        this.isNext = true
        this.multiIndex = [0, 0, 0]
        this.change_multiIndex = [0, 0, 0]
        if (this.items[this.currents].value === 'pro') {
          this.current = 0
        }
        if (this.items[this.currents].value === 'cit') {
          this.current = 1
        }
        if (this.items[this.currents].value === 'cou') {
          this.current = 2
        }
        if (this.items[this.currents].value === 'tow') {
          this.current = 3
        }

        if (this.current === 3) {
          this.objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1']),
            array_change(area[0]['0,1,35'])
          ]
          this.change_objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1']),
            array_change(area[0]['0,1,35'])
          ]
        } else if (this.current === 2) {
          this.objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1']),
            array_change(area[0]['0,1,35'])
          ]
          this.change_objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1']),
            array_change(area[0]['0,1,35'])
          ]
        } else if (this.current === 1) {
          this.objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1'])
          ]
          this.change_objectMultiArray = [
            array_change(area[0]['0']),
            array_change(area[0]['0,1'])
          ]
        } else {
          this.objectMultiArray = [
            array_change(area[0]['0'])
          ]
          this.change_objectMultiArray = [
            array_change(area[0]['0'])
          ]
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
              name: res.data[i][j]
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
      var c_arr, c_id, a_arr
      if (this.current > 0) {
        c_arr = array_change(area[0][0 + ',' + p_id])
        c_id = c_arr[columnValue[1]].id
      }
      if (this.current > 1) {
        var a_arr = array_change(area[0][0 + ',' + p_id + ',' + c_id])
      }
      if (this.current === 0) {
        this.change_objectMultiArray = [
          p_arr
        ]
      } else if (this.current === 1) {
        this.change_objectMultiArray = [
          p_arr,
          c_arr
        ]
      } else {
        this.change_objectMultiArray = [
          p_arr,
          c_arr,
          a_arr
        ]
      }

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
        column === 0 || column === 1 ? 0 : index
      ]
      this.addressChange(columnValue)
    },
    // 选择收获地址三级联动后确定按钮动作
    bindMultiPickerChange: function (e) {
      this.addressChange(e.detail.value)
      this.objectMultiArray = this.change_objectMultiArray
      this.multiIndex = e.detail.value
      this.address_info.Address_Province = this.objectMultiArray[0][this.multiIndex[0]].id
      if (this.current > 0) {
        this.address_info.Address_City = this.objectMultiArray[1][this.multiIndex[1]].id
      }
      if (this.current > 1) {
        this.address_info.Address_Area = this.objectMultiArray[2][this.multiIndex[2]].id
      }
      if (this.current > 2) {
        this.address_info.Address_Town = 0
      }
      this.t_arr = []
      this.t_index = 0
      // 处理街道信息
      if (this.current > 2) {
        this.address_town()
      }
    },
    radioChange: function (evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.currents = i
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .all {
    overflow-x: hidden;
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .top {
    width: 750rpx;
    padding: 50rpx 83rpx;

    .first {
      padding-left: 33rpx;
      padding-right: 41rpxd;
      height: 30rpx;
      display: flex;
      align-items: center;

      .circleQ {
        width: 30rpx;
        height: 30rpx;
        border: 1px solid #F43131;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        view {
          width: 15rpx;
          height: 15rpx;
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
        width: 210rpx;
        height: 4rpx;
        background-color: #999999;
      }
    }

    .second {
      margin-top: 21rpx;
      height: 25rpx;
      line-height: 25rpx;
      font-size: 26rpx;
      color: #999999;
      display: flex;

      .secondQ {
        color: #F43131;
      }

      .secondW {
        margin-left: 137rpx;
      }

      .secondE {
        margin-left: 135rpx;
      }
    }
  }

  .three {
    height: 88rpx;
    line-height: 88rpx;
    width: 710rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;

    .haha {
      font-size: 30rpx;
      color: #333333;
      margin-right: 42rpx;
    }

    .inputs {
      height: 88rpx;
      line-height: 88rpx;
      font-size: 28rpx;
      color: #333333;
    }

    .place {
      font-size: 28rpx;
      color: #CAC8C8;
    }

    .myRadio {
      height: 88rpx;
      display: flex;

      .myRadioQ {
        height: 88rpx;
        display: flex;
        margin-right: 17rpx;

        .radio {
          transform: scale(0.7);
        }

        .mbx {
          font-size: 28rpx;
          color: #777777;
          margin-left: 13rpx;
        }
      }
    }

  }

  .four {
    width: 490rpx;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
    background: rgba(244, 49, 49, 1);
    border-radius: 10rpx;
    margin: 0 auto;
    margin-top: 110rpx;
    font-size: 30rpx;
    color: #FFFFFF;
  }

  .five {
    height: 23rpx;
    line-height: 23rpx;
    width: 174rpx;
    margin: 0 auto;
    margin-top: 21rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);

    .image {
      width: 12rpx;
      height: 20rpx;
      margin-left: 10rpx;
    }
  }

  .threes {
    height: 88rpx;
    line-height: 88rpx;
    width: 710rpx;
    margin: 0 auto;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .haha {
      font-size: 30rpx;
      color: #333333;
      //margin-right: 42rpx;
    }

    .images {
      width: 16rpx;
      height: 88rpx;
      line-height: 88rpx;

      .image {
        width: 16rpx;
        height: 25rpx;
      }
    }

  }

  .picker view {
    width: 180rpx;
    font-size: 28rpx;
    line-height: 90rpx;
    height: 90rpx;
    margin-right: 10rpx;
  }

  .picker {
    display: flex;

    .quyu {
      width: 120rpx;
    }
  }

  .lineW {
    background-color: #F43131 !important;
  }
</style>
