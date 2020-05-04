<template>
  <view class="myall">
    <view class="centers" v-for="(item,index) of pro " :key="index">
      <view class="imgs">
        <image class="image" :src="item.User_HeadImg"></image>
      </view>
      <view class="titles">
        <view class="msg">
          <view class="tops">
            {{item.User_NickName}}
            <text>{{item.User_Mobile}}</text>
          </view>
          <view class="rights">
            {{item.User_CreateTime}}
          </view>
        </view>
        <view class="bots">
          会员号：{{item.User_No}}
        </view>
      </view>
    </view>
    <div class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
  </view>
</template>
<script>
import { getDisUserList } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      page: 1,
      pageSize: 10,
      pro: [],
      totalCount: 0
    }
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getDisTeamList()
    }
  },
  onShow () {
    this.pro = []
    this.page = 1
    this.getDisTeamList()
  },
  methods: {
    getDisTeamList () {
      const data = {
        pgae: this.page,
        pageSize: this.pageSize
      }
      getDisUserList(data).then(res => {
        for (const item of res.data) {
          this.pro.push(item)
        }
        this.totalCount = res.totalCount
      })
        .catch(e => {

        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }

  .centers {
    width: 710rpx;
    margin: 0 auto;
    box-sizing: border-box;
    height: 138rpx;
    border-bottom: 1px solid #ECE8E8;
    display: flex;
    align-items: center;
    padding: 20rpx 0rpx;

    .imgs {
      width: 98rpx;
      height: 98rpx;
      border-radius: 50%;
      overflow: hidden;

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .titles {
      margin-left: 19rpx;
      width: 100%;
      height: 98rpx;

      .bots {
        margin-top: 15rpx;
        height: 23rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
      }

      .msg {
        margin-top: 12rpx;
        font-size: 30rpx;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 29rpx;

        .tops {
          height: 29rpx;
          line-height: 29rpx;
          width: 360rpx;
          overflow: hidden;

          text {
            font-size: 28rpx;
            margin-left: 10rpx;
          }
        }

        .rights {
          font-size: 24rpx;
          color: #888888;
        }
      }
    }
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
  }
</style>
