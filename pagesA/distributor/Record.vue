<template>
  <view class="all">
    <view class="main" v-for="(item,index) of data" :key="index">
      <view class="fir">
        <view class="left">
          申请方式：
        </view>
        <view class="right">
          {{item.Method_Name}}
        </view>
      </view>
      <view class="fir">
        <view class="left">
          提现来源：
        </view>
        <view class="right">
          {{item.Record_From}}
        </view>
      </view>
      <view class="fir">
        <view class="left">
          提现金额：
        </view>
        <view class="right">
          {{item.Record_Total}}
        </view>
      </view>
      <view class="fir">
        <view class="left">
          状态：
        </view>
        <view class="rights">
          {{item.Record_Status_desc}}
        </view>
        <view class="rightt">
          {{item.No_Record_Desc}}
        </view>
      </view>
      <view class="fir">
        <view class="left">
          时间：
        </view>
        <view class="right">
          {{item.Record_CreateTime}}
        </view>
      </view>
    </view>
    
    <div class="defaults" v-if="data.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
  </view>
</template>

<script>

import { getWithdrawRecordList } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      page: 1,
      pageSize: 10,
      data: [],
      totalCount: 0,
    }
  },
  onLoad () {
    const that = this
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
  },
  onShow () {
    this.data = []
    this.page = 1
    // 获取申请记录
    this.getWithdrawRecordList()
  },
  onReachBottom () {
    if (this.totalCount > this.data.length) {
      this.page++
      this.getWithdrawRecordList()
    }
  },
  methods: {
    // 获取提现记录
    getWithdrawRecordList () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
      }
      getWithdrawRecordList(data).then(res => {
        this.totalCount = res.totalCount
        for (const item of res.data) {
          this.data.push(item)
        }
      }).catch(e => {
      
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #f8f8f8;
    min-height: 100vh;
  }
  
  .main {
    width: 710 rpx;
    margin: 0 auto;
    margin-top: 40 rpx;
    background-color: #FFFFFF;
    box-sizing: border-box;
    padding: 28 rpx 0 rpx 32 rpx 27 rpx;
    
    .fir {
      height: 48 rpx;
      display: flex;
      font-size: 26 rpx;
      align-items: center;
      
      .left {
        color: #333333;
        margin-right: 20 rpx;
      }
      
      .right {
        color: #888888;
      }
      
      .rightt {
        color: #888888;
        margin-left: 20 rpx;
      }
      
      .rights {
        color: #F43131;
      }
    }
  }
  
  .defaults {
    margin: 0 auto;
    width: 640 rpx;
    height: 480 rpx;
    margin-top: 100 rpx;
  }
</style>
