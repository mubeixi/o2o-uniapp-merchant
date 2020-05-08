<template>
  <view class="all">
    <view class="nav">
      <view class="ins" :class="checked==0?'checked':''" @click="change(0)">
        未领取
      </view>
      <view class="ins" :class="checked==1?'checked':''" @click="change(1)">
        已领取
      </view>
      <view class="ins" :class="checked==2?'checked':''" @click="change(2)">
        已过期
      </view>
    </view>
    <view style="height: 102rpx;width: 100%;">
    
    </view>
    <view class="center" v-for="(item,index) of data" :key="index" @click="handleClick(item)">
      <view class="tops">
        {{item.gift_name}}
      </view>
      <view class="bottoms">
        <view class="tupian">
          <image class="image" :src="item.img_url"></image>
        </view>
        <view class="neirong">
          <view class="titles">
            {{item.product_name}}
          </view>
          <view class="button">
            <view class="sku">{{item.attr_txt}}</view>
            <view class="chakan" v-if="checked==0">立即申请</view>
            <view class="chakan" v-else-if="checked==1">查看订单</view>
          </view>
          <view class="youxiao" v-if="checked!==1">{{item.valid_scope}}</view>
        </view>
      </view>
    </view>
    <view class="defaults" v-if="data.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </view>
  </view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getGiftList } from '@/api/product'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      checked: 0, // 选中
      data: [], // 数据
      page: 1,
      pageSize: 4,
      totalCount: 0,// 一共多少条数据
    }
  },
  onLoad (options) {
    const that = this
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
    if (options.checked) {
      this.checked = options.checked
    }
  },
  onShow () {
    // 重置
    this.data = []
    this.page = 1
    this.getGiftList()
  },
  onReachBottom () {
    if (this.totalCount > this.data.length) {
      this.page++
      this.getGiftList()
    }
  },
  methods: {
    handleClick (item) {
      if (this.checked === 0) {
        this.$linkTo('/pages/product/detail?mode=gift&gift=' + item.id + '&prod_id=' + item.product_id)
      }
      if (this.checked === 1) {
        this.$linkTo('/pagesA/order/OrderDetail?Order_ID=' + item.order_id)
      }
    },
    // 获取列表
    getGiftList () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
        status: this.checked,
      }
      getGiftList(data).then(res => {
        for (const item of res.data) {
          this.data.push(item)
        }
        this.totalCount = res.totalCount
      }).catch(e => {
      })
    },
    change (item) {
      if (item === this.checked) return
      this.checked = item
      this.data = []
      this.page = 1
      this.getGiftList()
    },
  },
}
</script>

<style lang="scss" scoped>
  .all {
    background-color: #ffffff !important;
    min-height: 100vh;
  }
  
  view {
    box-sizing: border-box;
  }
  
  .titless {
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 100%;
    z-index: 999;
  }
  
  .nav {
    z-index: 999;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    width: 750rpx;
    margin: 0 auto;
    padding: 20rpx 0rpx;
    height: 102rpx;
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333333;
    background: #f8f8f8;
    
    .ins {
      width: 236rpx;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      position: relative;
      
      &.checked {
        color: #F43131;
        
        &:after {
          content: '';
          display: flex;
          width: 135rpx;
          height: 4rpx;
          background-color: #F43131;
          position: absolute;
          bottom: 0rpx;
          left: 50rpx;
        }
      }
    }
  }
  
  .center {
    margin: 0 auto;
    margin-bottom: 25rpx;
    width: 710rpx;
    height: 288rpx;
    background-color: #FFFFFF;
    
    .tops {
      width: 710rpx;
      height: 64rpx;
      line-height: 64rpx;
      padding-left: 20rpx;
      font-size: 26rpx;
      color: #333333;
      border-bottom: 1rpx solid #ECE8E8;
    }
    
    .bottoms {
      height: 224rpx;
      width: 710rpx;
      padding: 20rpx;
      display: flex;
      
      .tupian {
        width: 184rpx;
        height: 184rpx;
        
        .image {
          width: 100%;
          height: 100%;
        }
      }
      
      .neirong {
        margin-left: 23rpx;
        height: 184rpx;
        width: 463rpx;
        position: relative;
        
        .titles {
          font-size: 26rpx;
          color: #333333;
          width: 451rpx;
          height: 71rpx;
          line-height: 36rpx;
          margin-top: 18rpx;
          margin-left: 2rpx;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        
        .button {
          width: 463rpx;
          margin-top: 15rpx;
          height: 55rpx;
          display: flex;
          
          .sku {
            font-size: 24rpx;
            color: #888888;
            height: 23rpx;
            line-height: 23rpx;
          }
          
          .chakan {
            width: 155rpx;
            height: 55rpx;
            line-height: 55rpx;
            text-align: center;
            background: rgba(244, 49, 49, 1);
            border-radius: 28rpx;
            margin-left: auto;
            font-size: 26rpx;
            color: #FFFFFF;
          }
        }
      }
    }
  }
  
  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
  
  .youxiao {
    font-size: 20rpx;
    color: #888888;
    position: absolute;
    bottom: 0rpx;
  }
</style>
