<template>
  <view class="team" @click="commonClick">

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
      margin: 30rpx 0rpx 30rpx 20rpx;
      margin-top: 0rpx;
      display: flex;

      .teamImg {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        overflow: hidden;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .teamInfo {
        margin-left: 18rpx;
        padding-top: 11rpx;
        padding-bottom: 18rpx;

        .nickName {
          height: 28rpx;
          font-size: 30rpx;
          line-height: 28rpx;
          color: #333333;
        }

        .tuijianren {
          height: 23rpx;
          line-height: 23rpx;
          color: #777777;
          font-size: 24rpx;
          margin-top: 15rpx;
        }
      }
    }

    .teamContent {
      width: 710rpx;
      margin: 0 auto;
      background-color: #FFFFFF;

      .teamNumber {
        height: 93rpx;
        padding-left: 23rpx;
        display: flex;
        align-items: center;

        .image {
          width: 35rpx;
          height: 33rpx;
        }

        .viewq {
          margin-left: 16rpx;
          font-size: 28rpx;
          color: #333333;
          font-weight: bold;
        }
      }

      .teamGrade {
        width: 690rpx;
        margin-left: 10rpx;
        margin-right: 10rpx;
        height: 87rpx;
        border-bottom: 1rpx solid #ECE8E8;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .img {
          width: 15rpx;
          height: 23rpx;
          margin-right: 8rpx;
          margin-left: 16rpx;
        }

        .views {
          font-size: 26rpx;
          color: #666666;
          margin-left: 19rpx;
        }

      }

      & view.teamGrade:last-child {
        border-bottom: 0rpx;
      }
    }
  }

</style>
