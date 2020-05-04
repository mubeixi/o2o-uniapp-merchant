<template>
  <view class="team">
    
    <view style="width: 100%;height: 20rpx;"></view>
    <view class="teamName" v-if="pro.disInfo">
      <view class="teamImg">
        <image class="image" :src="pro.disInfo.Shop_Logo"></image>
      </view>
      <view class="teamInfo">
        <view class="nickName">
          {{pro.disInfo.Shop_Name}}
        </view>
        <view class="tuijianren">
          推荐人：{{pro.disInfo.Parent_NickName}}
        </view>
      </view>
    </view>
    <view class="teamContent">
      <view class="teamNumber">
        <image class="image" src="/static/red-people.png"></image>
        <view class="viewq">团队总人数</view>
      </view>
      <view class="teamGrade" v-for="(item,index) of pro.team_level_count" :key="index" @click="goMyNumber(index)">
        <view class="views">
          {{item.title}}
        </view>
        <view class="views">
          <text>{{item.count}}</text>
          <image class="img" :src="'/static/client/distributor/right.png'|domain"></image>
        </view>
      </view>
    
    </view>
  </view>
</template>

<script>
import { getDisTeamCount } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      height: 1000, // 获取手机屏幕高度
      pro: [],
    }
  },
  onLoad () {
    const that = this
    uni.getSystemInfo({
      success: function (res) {
        that.height = res.screenHeight - 68
      },
    })
    this.getDisTeamCount()
  },
  onShow () {
  
  },
  methods: {
    goMyNumber (item) {
      const items = item + 1
      uni.navigateTo({
        url: '/pagesA/distributor/MyTeamList?index=' + items,
      })
    },
    getDisTeamCount () {
      getDisTeamCount().then(res => {
        this.pro = res.data
      }).catch(e => {
      
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .team {
    background-color: #F8F8F8;
    min-height: 100vh;
    box-sizing: border-box;
    
    .teamName {
      margin: 30 rpx 0 rpx 30 rpx 20 rpx;
      margin-top: 0 rpx;
      display: flex;
      
      .teamImg {
        width: 90 rpx;
        height: 90 rpx;
        border-radius: 50%;
        overflow: hidden;
        
        .image {
          width: 100%;
          height: 100%;
        }
      }
      
      .teamInfo {
        margin-left: 18 rpx;
        padding-top: 11 rpx;
        padding-bottom: 18 rpx;
        
        .nickName {
          height: 28 rpx;
          font-size: 30 rpx;
          line-height: 28 rpx;
          color: #333333;
        }
        
        .tuijianren {
          height: 23 rpx;
          line-height: 23 rpx;
          color: #777777;
          font-size: 24 rpx;
          margin-top: 15 rpx;
        }
      }
    }
    
    .teamContent {
      width: 710 rpx;
      margin: 0 auto;
      background-color: #FFFFFF;
      
      .teamNumber {
        height: 93 rpx;
        padding-left: 23 rpx;
        display: flex;
        align-items: center;
        
        .image {
          width: 35 rpx;
          height: 33 rpx;
        }
        
        .viewq {
          margin-left: 16 rpx;
          font-size: 28 rpx;
          color: #333333;
          font-weight: bold;
        }
      }
      
      .teamGrade {
        width: 690 rpx;
        margin-left: 10 rpx;
        margin-right: 10 rpx;
        height: 87 rpx;
        border-bottom: 1 rpx solid #ECE8E8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .img {
          width: 15 rpx;
          height: 23 rpx;
          margin-right: 8 rpx;
          margin-left: 16 rpx;
        }
        
        .views {
          font-size: 26 rpx;
          color: #666666;
          margin-left: 19 rpx;
        }
        
      }
      
      & view.teamGrade:last-child {
        border-bottom: 0 rpx;
      }
    }
  }

</style>
