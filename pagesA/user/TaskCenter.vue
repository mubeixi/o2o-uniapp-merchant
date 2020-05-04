<template>
  <view class="myall">
    <!-- #ifdef APP-PLUS -->
    <view class="status_bar" style="background:#2e323c;"></view>
    <!-- #endif -->
    <view class="top">
      <image class="widthTen" :src="'/static/client/taskCenter.png'|domain"></image>
      <layout-icon class="goBack" @click="goBack" type="iconicon-arrow-left" size="20"></layout-icon>
      
      <view class="titles">任务中心</view>
      <view class="center">
        <!-- <image class="widthTen" :src="'/static/client/task/center.png" ></image> -->
        <image class="widthTen" :src="pro.img_url"></image>
        <view class="info">
          <image :src="pro.avatar" class="widthTen"></image>
        </view>
        <view class="nickName" v-if="pro.nickname">
          {{pro.nickname}}
        </view>
        <view class="vip" v-if="pro.level_name">
          {{pro.level_name}}
          <image class="image" :src="'/static/client/task/right.png'|domain"></image>
        </view>
        <view class="zhangValue">
          <view class="view" :style="{width:(pro.growth_value/pro.upper_growth)*100+'%'}">
          
          </view>
        </view>
        <view class="myValue" v-if="pro.growth_value">
          {{pro.growth_value}}/{{pro.upper_growth}}
        </view>
        <view class="shengji" v-if="pro.need_growth>0">
          升级
        </view>
        <view class="numberValue" v-if="pro.growth_value">
          {{pro.growth_value}}
        </view>
        <view class="valueM">
          成长值
          <image class="image" :src="'/static/client/task/sanjiao.png'|domain"></image>
        </view>
      </view>
    </view>
    <view style="height: 60rpx;"></view>
    <circle-title title="我的特权"></circle-title>
    <view class="myPrivilege">
      <view class="view" v-for="(i,j) of pro.basic" :key="j">
        {{j+1}}、{{i.name}}
      </view>
    </view>
    <view style="height: 20rpx;width: 100%;background-color: #F8F8F8;">
    
    </view>
    <circle-title title="如何升级"></circle-title>
    
    <view class="ruhe">
      <view class="td" v-for="(it,ind) of pro.obtain" :key="ind">
        <image class="image" :src="it.img_url"></image>
        <view class="mbx">
          <view class="tops">
            {{it.name}}
          </view>
          <view class="bottoms">
            {{it.desc}}
          </view>
        </view>
        
        <view class="submit" @click="yulan(it)" v-if="it.done==0&&ind=='focus'">
          去完成
        </view>
        <view class="submit" @click="goJump(it)" v-else-if="it.done==0">
          去完成
        </view>
        <view class="submit submitMbx" v-if="it.done==1">
          已完成
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import { getTaskCenter } from '@/api/customer'
import CircleTitle from '@/componets/circle-title/circle-title'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      pro: [],
    }
  },
  components: {
    CircleTitle,
    
    LayoutIcon,
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
  },
  onShow () {
    this.getTaskCenter()
  },
  methods: {
    yulan (index) {
      if (this.initData.SubscribeQrcode) {
        let arr = []
        arr.push(this.initData.SubscribeQrcode)
        uni.previewImage({
          urls: arr,
          indicator: 'default',
          current: 1,
        })
      } else {
        this.goJump(item)
      }
      
    },
    getTaskCenter () {
      getTaskCenter().then(res => {
        this.pro = res.data
      }).catch(e => {
      })
    },
    goJump (item) {
      this.$linkTo(item.jump_url)
      // if (item.cu) {
      //   uni.switchTab({
      //     url: item.jump_url,
      //   })
      // } else {
      //   uni.navigateTo({
      //     url: item.jump_url,
      //   })
      // }
      
    },
    goBack () {
      this.$back()
    },
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    min-height: 100vh;
    background-color: #FFFFFF !important;
  }
  
  .top {
    width: 750 rpx;
    height: 404 rpx;
    position: relative;
    
    .widthTen {
      width: 100%;
      height: 100%;
    }
    
    .goBack {
      width: 20 rpx;
      height: 30 rpx;
      
      position: absolute;
      top: 30 rpx;
      left: 20 rpx;
    }
    
    .titles {
      
      color: #FFFFFF;
      font-size: 32 rpx;
      position: absolute;
      top: 29 rpx;
      left: 312 rpx;
      height: 31 rpx;
      line-height: 31 rpx;
    }
    
    .center {
      width: 727 rpx;
      height: 344 rpx;
      position: absolute;
      left: 12 rpx;
      top: 110 rpx;
      
      .info {
        width: 93 rpx;
        height: 92 rpx;
        overflow: hidden;
        position: absolute;
        left: 57 rpx;
        top: 64 rpx;
        border-radius: 50%;
      }
      
      .nickName {
        height: 29 rpx;
        line-height: 29 rpx;
        font-size: 30 rpx;
        font-weight: bold;
        color: #5B412D;
        position: absolute;
        top: 74 rpx;
        left: 165 rpx;
      }
      
      .vip {
        width: 121 rpx;
        height: 35 rpx;
        line-height: 35 rpx;
        background: rgba(226, 188, 146, 1);
        border-radius: 18 rpx;
        position: absolute;
        top: 116 rpx;
        left: 164 rpx;
        font-size: 20 rpx;
        color: #FFFFFF;
        text-align: center;
        
        .image {
          width: 10 rpx;
          height: 17 rpx;
          margin-left: 6 rpx;
        }
      }
      
      .zhangValue {
        width: 138 rpx;
        height: 10 rpx;
        background: rgba(133, 99, 72, 1);
        border-radius: 5 rpx;
        position: absolute;
        top: 115 rpx;
        left: 302 rpx;
        
        .view {
          background-color: #FFFFFF;
          height: 10 rpx;
        }
      }
      
      .myValue {
        height: 17 rpx;
        line-height: 17 rpx;
        font-size: 18 rpx;
        font-weight: 500;
        color: rgba(102, 70, 48, 1);
        position: absolute;
        top: 134 rpx;
        left: 304 rpx;
      }
      
      .shengji {
        //width:38rpx;
        height: 22 rpx;
        font-size: 10px;
        color: #FFFFFF;
        line-height: 22 rpx;
        background: rgba(133, 99, 72, 1);
        border-radius: 3 rpx;
        position: absolute;
        top: 132 rpx;
        left: 399 rpx;
        text-align: center;
        padding-left: 4px;
        padding-right: 4px;
      }
      
      .numberValue {
        height: 32 rpx;
        font-size: 42 rpx;
        font-weight: bold;
        color: rgba(91, 65, 45, 1);
        line-height: 32 rpx;
        position: absolute;
        top: 196 rpx;
        left: 63 rpx;
      }
      
      .valueM {
        height: 20 rpx;
        font-size: 20 rpx;
        font-weight: 500;
        color: rgba(91, 65, 45, 1);
        line-height: 20 rpx;
        position: absolute;
        top: 240 rpx;
        left: 61 rpx;
        
        .image {
          width: 8 rpx;
          height: 12 rpx;
          margin-left: 8 rpx;
        }
      }
    }
  }
  
  .myPrivilege {
    margin: 0 auto;
    width: 710 rpx;
    margin-bottom: 30 rpx;
    
    .view {
      font-size: 24 rpx;
      color: #666666;
      height: 50 rpx;
      line-height: 50 rpx;
    }
  }
  
  .ruhe {
    width: 710 rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12 rpx 0px rgba(0, 0, 0, 0.25);
    border-radius: 10 rpx;
    margin: 0 auto;
    margin-top: 10 rpx;
    
    .td {
      width: 690 rpx;
      margin: 0 auto;
      height: 124 rpx;
      border-bottom: 1 rpx solid #ECE8E8;
      display: flex;
      align-items: center;
      
      &:last-child {
        border-bottom: 0 rpx;
      }
      
      .image {
        width: 65 rpx;
        height: 65 rpx;
        margin-left: 21 rpx;
      }
      
      .mbx {
        height: 65 rpx;
        margin-left: 24 rpx;
        
        .tops {
          height: 27 rpx;
          line-height: 27 rpx;
          color: #333333;
          font-weight: bold;
          font-size: 28 rpx;
        }
        
        .bottoms {
          margin-top: 15 rpx;
          height: 23 rpx;
          line-height: 23 rpx;
          font-size: 24 rpx;
          color: #999999;
        }
      }
      
      .submit {
        width: 110 rpx;
        height: 45 rpx;
        line-height: 45 rpx;
        background: rgba(244, 49, 49, 1);
        border-radius: 8 rpx;
        font-size: 24 rpx;
        color: #FFFFFF;
        text-align: center;
        margin-left: auto;
        margin-right: 20 rpx;
      }
      
      .submitMbx {
        background-color: #dedede !important;
      }
    }
  }

</style>
