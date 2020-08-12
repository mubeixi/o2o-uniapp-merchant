<template>
  <view @click="commonClick" class="all">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background-color: rgb(248, 248, 248);"><!-- 这里是状态栏 --></view>
    <!-- #endif -->
    <view class="top">
      <view class="first">
        <view class="circleQ">
          <view></view>
        </view>
        <view :class="isNext?'lineW':''" class="lineQ">
        
        </view>
        <view :class="isNext?'':'circleW'" class="circleQ">
          <view></view>
        </view>
        <view :class="isLast?'lineW':''" class="lineQ">
        
        </view>
        <view :class="isLast?'':'circleW'" class="circleQ">
          <view></view>
        </view>
      </view>
      <view class="second">
        <view class="secondQ">
          填写信息
        </view>
        <view :class="isNext?'secondQ':''" class="secondW">
          选择区域
        </view>
        <view :class="isLast?'secondQ':''" class="secondE">
          提交审核
        </view>
      </view>
    </view>
    <block v-if="!isNext">
      <view class="three">
        <view class="haha">
          姓名
        </view>
        <input class="inputs" placeholder="请输入您的姓名" placeholder-class="place" type="text" v-model="arr.apply_name">
      </view>
      <view class="three">
        <view class="haha">
          电话
        </view>
        <input @blur="isTell" class="inputs" placeholder="请输入您的电话" placeholder-class="place" type="number"
               v-model="arr.apply_mobile">
      </view>
      <view class="three">
        <view class="haha">
          级别
        </view>
        <radio-group @change="radioChange" class="myRadio">
          <view :key="item.value" class="myRadioQ" v-for="(item, index) in items">
            <view>
              <radio :checked="index === currents" :value="item.value" class="radio" />
            </view>
            <view class="mbx">{{item.name}}</view>
          </view>
        </radio-group>
      
      </view>
    </block>
    <block v-else>
      
      <view @click="$openPop('address')" class="three">
        <view class="haha" style="width: 140rpx;margin-right: 0px">
          选择地址
        </view>
        <wzw-address :visiable="currents" @up="updateAddress" class="address  " ref="address">
          {{selectArea?selectArea:'选择地址'}}
        </wzw-address>
      </view>
    
    </block>
    
    <block v-if="isLast">
      <view class="four">
        信息审核中
      </view>
    </block>
    <block v-else>
      <view @click="nextStep" class="four">
        {{isNext?'提交申请':'下一步'}}
      </view>
      <view @click="lookJilu" class="five">
        {{isNext?'返回修改':'查看申请记录'}}
        <image :src="'/static/client/distributor/chakan.png'|domain" class="image"></image>
      </view>
    </block>
  </view>
</template>

<script>

import WzwAddress from '@/components/wzw-address/wzw-address'
import { agentApply } from '@/api/customer'
import { error } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'

export default {
  components: {
    WzwImTip,
    WzwAddress,
  },
  mixins: [BaseMixin],
  data () {
    return {
      isNext: false,
      items: [],
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
        apply_mobile: '',
      },
      isAgr: false,
      selectArea: '',
      selectAreaId: [],
    }
  },
  onShow () {
  
  },
  onLoad (options) {
    this.items = []
    if (Number(options.pro) === 1) {
      this.items.push({
        name: '省级',
        value: 'pro',
      })
    }
    if (Number(options.cit) === 1) {
      this.items.push({
        name: '市级',
        value: 'cit',
      })
    }
    if (Number(options.cou) === 1) {
      this.items.push({
        name: '县/区',
        value: 'cou',
      })
    }
    if (Number(options.tow) === 1) {
      this.items.push({
        name: '镇',
        value: 'tow',
      })
    }
  },
  methods: {
    updateAddress (data) {
      console.log(data, 'sss')
      this.selectArea = data.str
      this.selectAreaId = data.id
    },
    isTell () {
      if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
        uni.showToast({
          title: '手机号输入错误，请重新输入',
          icon: 'none',
        })
      }
    },
    lookJilu () {
      if (this.isNext) {
        this.isNext = false
      } else {
        uni.navigateTo({
          url: '/pagesA/distributor/RegionRecord?index=1',
        })
      }
    },
    nextStep () {
      if (this.isNext) {
        if (this.isAgr) {
          return
        }
        this.isAgr = true
        if (this.selectAreaId.length < 1) {
          uni.showToast({
            title: '请选择地区信息',
            icon: 'none',
          })
          this.isAgr = false
        } else {
          const info = {}
          info.apply_name = this.arr.apply_name
          info.apply_mobile = this.arr.apply_mobile
          info.pro_id = this.selectAreaId[0]
          info.apply_area = 'pro'
          if (this.currents > 0) {
            info.city_id = this.selectAreaId[1]
            info.apply_area = 'cit'
          }
          if (this.currents > 1) {
            info.area_id = this.selectAreaId[2]
            info.apply_area = 'cou'
          }
          if (this.currents > 2) {
            info.town_id = this.selectAreaId[3]
            info.apply_area = 'tow'
          }
          
          agentApply(info).then(res => {
            this.isLast = true
            this.isAgr = false
            uni.showToast({
              title: res.msg,
            })
            setTimeout(function () {
              uni.navigateTo({
                url: '/pagesA/distributor/Region',
              })
            }, 1000)
          }).catch(e => {
            error(e.msg)
            this.isAgr = false
          })
        }
      } else {
        if (!this.arr.apply_name) {
          uni.showToast({
            title: '请输入姓名',
            icon: 'none',
          })
          return
        } else if (!(/^1[3456789]\d{9}$/.test(this.arr.apply_mobile))) {
          uni.showToast({
            title: '手机号输入错误，请重新输入',
            icon: 'none',
          })
          return
        }
        this.selectArea = ''
        this.selectAreaId = []
        this.isNext = true
      }
    },
    radioChange: function (evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.target.value) {
          this.currents = i
          break
        }
      }
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
    width: 750rpx;
    padding: 50rpx 83rpx;
    
    .first {
      padding-left: 33rpx;
      padding-right: 41rpx;
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
  
  .address {
    width: 570rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
