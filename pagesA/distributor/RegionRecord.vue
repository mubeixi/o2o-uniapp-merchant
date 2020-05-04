<template>
  <view class="all">
    <div class="defaults" v-if="data.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view class="main" v-for="(item,ind) of data" :key="ind">
      <block v-if="index==1">
        <view class="fir">
          <view class="left">
            申请区域：
          </view>
          <view class="right">
            {{item.Area_Concat}}
          </view>
        </view>
        <view class="fir">
          <view class="left">
            状态：
          </view>
          <view class="rights">
            {{item.Order_Status_desc}}
          </view>
          <view class="rightt">
            {{item.Refuse_Be}}
          </view>
        </view>
      </block>
      <block v-else>
        <view class="fir">
          <view class="left">
            申请{{commi_rename.commi}}等级名称：
          </view>
          <view class="right">
            {{item.Level_Name}}
          </view>
        </view>
        <view class="fir">
          <view class="left">
            申请股东名称：
          </view>
          <view class="right">
            {{item.sha_level_name}}
          </view>
        </view>
        <view class="fir">
          <view class="left">
            状态：
          </view>
          <view class="rights">
            {{item.Order_Status_desc}}
          </view>
          <view class="rightt">
            {{item.Refuse_Be}}
          </view>
        </view>
      </block>
      <view class="fir">
        <view class="left">
          时间：
        </view>
        <view class="right">
          {{item.Order_CreateTime}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>

import { getAgentApply, getShaApply } from '@/api/customer'
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
      index: 1,
    }
  },
  onLoad (options) {
    const that = this
    that.index = options.index
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
  computed: {
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
  methods: {
    // 获取提现记录
    getWithdrawRecordList () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
      }
      if (this.index === 1) {
        getAgentApply(data).then(res => {
          this.totalCount = res.totalCount
          for (const item of res.data) {
            this.data.push(item)
          }
        }).catch(e => {
        
        })
      } else {
        getShaApply(data).then(res => {
          this.totalCount = res.totalCount
          for (const item of res.data) {
            this.data.push(item)
          }
        }).catch(e => {
        
        })
      }
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
