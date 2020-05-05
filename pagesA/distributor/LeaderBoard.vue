<template>
  <view class="wrap">
    
    <view class="all">
      <view class="hahas" :class="index==0?'checked':''" @click="change(0)">
        总部{{commi_rename.commi}}
      </view>
      <view class="hahas" :class="index==1?'checked':''" @click="change(1)">
        我的好友
      </view>
    </view>
    <!--		<view style="height: 95rpx;">-->
    
    <!--		</view>-->
    <view class="mains">
      <view class="paiming">
        <view class="pai1">
          排名
        </view>
        <view class="pai2">
          爵位
        </view>
        <view class="pai3">
          佣金
        </view>
      </view>
      <view class="content" v-for="(item,index) of pro " :key="index" v-if="index==0">
        <view class="contentLeft">
          <view class="ming">
            <image class='image' :src="'/static/client/distributor/first.png'|domain"></image>
          </view>
          <view class="info">
            <image class="image" :src="item.Shop_Logo"></image>
          </view>
          <view class="nickName">
            {{item.Shop_Name}}
          </view>
        </view>
        <view class="contentCenter">
          {{item.pro_title_name}}
        </view>
        <view class="contentRight">
          ¥
          <text>{{item.Total_Income}}</text>
        </view>
      </view>
      <view class="content" v-else-if="index==1">
        <view class="contentLeft">
          <view class="ming">
            <image class='image' :src="'/static/client/distributor/second.png'|domain"></image>
          </view>
          <view class="info">
            <image :src="item.Shop_Logo"></image>
          </view>
          <view class="nickName">
            {{item.Shop_Name}}
          </view>
        </view>
        <view class="contentCenter">
          {{item.pro_title_name}}
        </view>
        <view class="contentRight">
          ¥
          <text>{{item.Total_Income}}</text>
        </view>
      </view>
      <view class="content" v-else-if="index==2">
        <view class="contentLeft">
          <view class="ming">
            <image class='image' :src="'/static/client/distributor/three.png'|domain"></image>
          </view>
          <view class="info">
            <image :src="item.Shop_Logo"></image>
          </view>
          <view class="nickName">
            {{item.Shop_Name}}
          </view>
        </view>
        <view class="contentCenter">
          {{item.pro_title_name}}
        </view>
        <view class="contentRight">
          ¥
          <text>{{item.Total_Income}}</text>
        </view>
      </view>
      <view class="content" v-else>
        <view class="contentLeft">
          <view class="ming">
            {{index+1}}
          </view>
          <view class="info">
            <image :src="item.Shop_Logo"></image>
          </view>
          <view class="nickName">
            {{item.Shop_Name}}
          </view>
        </view>
        <view class="contentCenter">
          {{item.pro_title_name}}
        </view>
        <view class="contentRight">
          ¥
          <text>{{item.Total_Income}}</text>
        </view>
      </view>
      
      <view class="contents" v-if="rank_config==0&&index==0">总部排行未公开</view>
    </view>
  </view>
</template>

<script>
import { getBalanceRank } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  data () {
    return {
      index: 0,
      page: 1,
      pageSize: 15,
      isFriend: 0,
      pro: [],
      myInfo: '',
      totalCount: 0,
      rank_config: 0,
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
  onShow () {
    this.page = 1
    this.pro = []
    this.getPro()
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getPro()
    }
  },
  methods: {
    change (item) {
      this.index = item
      if (item === 1) {
        this.isFriend = 1
      } else {
        this.isFriend = 0
      }
      this.pro = []
      this.page = 1
      this.getPro()
    },
    getPro () {
      const data = {
        page: this.page,
        pageSize: this.pageSize,
      }
      if (this.isFriend) {
        data.is_my_friend = 1
      }
      getBalanceRank(data).then(res => {
        for (const item of res.data.list) {
          this.pro.push(item)
        }
        this.totalCount = res.totalCount
        this.myInfo = res.data.my_rank
        this.rank_config = res.data.rank_config.HIncomelist_Open
      }).catch(e => {
      
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  view, div {
    box-sizing: border-box;
  }
  
  .wrap {
    padding-top: 95rpx;
    background: white !important;
    min-height: 100vh;
  }
  
  .all {
    height: 95rpx;
    width: 750rpx;
    padding-left: 133rpx;
    padding-right: 133rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid #ECE8E8;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    background-color: #FFFFFF;
    z-index: 999;
    
    .hahas {
      width: 202rpx;
      height: 95rpx;
      line-height: 95rpx;
      position: relative;
      text-align: center;
      font-size: 30rpx;
      color: #333333;
    }
    
    .checked {
      color: #F43131 !important;
    }
    
    .checked:after {
      content: '';
      position: absolute;
      bottom: 0rpx;
      left: 0rpx;
      width: 202rpx;
      height: 4rpx;
      background-color: #F43131;
    }
  }
  
  .mains {
    width: 710rpx;
    margin: 0 auto;
    margin-top: 40rpx;
    box-shadow: 0px 0px 18rpx 0px rgba(0, 0, 0, 0.18);
    border-radius: 10rpx;
    
    .paiming {
      padding-top: 38rpx;
      padding-bottom: 38rpx;
      padding-left: 33rpx;
      display: flex;
      
      .pai1, .pai2, .pai3 {
        font-size: 28rpx;
        height: 26rpx;
        line-height: 26rpx;
        color: #333333;
      }
      
      .pai1 {
        width: 320rpx;
      }
      
      .pai2 {
        width: 150rpx;
      }
      
      .pai3 {
        width: 207rpx;
        text-align: center;
      }
    }
    
    .contents {
      height: 52px;
      line-height: 52px;
      font-size: 16px;
      text-align: center;
    }
    
    .content {
      width: 690rpx;
      height: 103rpx;
      margin-left: 10rpx;
      margin-right: 10rpx;
      border-bottom: 1rpx solid #ECE8E8;
      display: flex;
      align-items: center;
      
      .contentLeft {
        width: 326rpx;
        margin-left: 17rpx;
        display: flex;
        align-items: center;
        
        .ming {
          width: 41rpx;
          height: 56rpx;
          line-height: 56rpx;
          margin-right: 24rpx;
          text-align: center;
          color: #777777;
          font-size: 32rpx;
          
          .image {
            width: 100%;
            height: 100%;
          }
        }
        
        .info {
          width: 53rpx;
          height: 53rpx;
          border-radius: 50%;
          margin-right: 14rpx;
          overflow: hidden;
          
          .image {
            width: 100%;
            height: 100%;
          }
        }
        
        .nickName {
          height: 53rpx;
          width: 180rpx;
          overflow: hidden;
          line-height: 53rpx;
          font-size: 24rpx;
          color: #777777;
        }
      }
      
      .contentCenter {
        width: 150rpx;
        font-size: 24rpx;
        color: #777777;
      }
      
      .contentRight {
        width: 207rpx;
        text-align: center;
        font-size: 22rpx;
        color: #F43131;
        
        text {
          font-size: 26rpx;
        }
      }
    }
  }
</style>
