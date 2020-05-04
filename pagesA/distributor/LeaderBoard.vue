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
    padding-top: 95 rpx;
    background: white !important;
    min-height: 100vh;
  }
  
  .all {
    height: 95 rpx;
    width: 750 rpx;
    padding-left: 133 rpx;
    padding-right: 133 rpx;
    display: flex;
    justify-content: space-between;
    border-bottom: 1 rpx solid #ECE8E8;
    position: fixed;
    top: 0 rpx;
    left: 0 rpx;
    background-color: #FFFFFF;
    z-index: 999;
    
    .hahas {
      width: 202 rpx;
      height: 95 rpx;
      line-height: 95 rpx;
      position: relative;
      text-align: center;
      font-size: 30 rpx;
      color: #333333;
    }
    
    .checked {
      color: #F43131 !important;
    }
    
    .checked:after {
      content: '';
      position: absolute;
      bottom: 0 rpx;
      left: 0 rpx;
      width: 202 rpx;
      height: 4 rpx;
      background-color: #F43131;
    }
  }
  
  .mains {
    width: 710 rpx;
    margin: 0 auto;
    margin-top: 40 rpx;
    box-shadow: 0px 0px 18 rpx 0px rgba(0, 0, 0, 0.18);
    border-radius: 10 rpx;
    
    .paiming {
      padding-top: 38 rpx;
      padding-bottom: 38 rpx;
      padding-left: 33 rpx;
      display: flex;
      
      .pai1, .pai2, .pai3 {
        font-size: 28 rpx;
        height: 26 rpx;
        line-height: 26 rpx;
        color: #333333;
      }
      
      .pai1 {
        width: 320 rpx;
      }
      
      .pai2 {
        width: 150 rpx;
      }
      
      .pai3 {
        width: 207 rpx;
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
      width: 690 rpx;
      height: 103 rpx;
      margin-left: 10 rpx;
      margin-right: 10 rpx;
      border-bottom: 1 rpx solid #ECE8E8;
      display: flex;
      align-items: center;
      
      .contentLeft {
        width: 326 rpx;
        margin-left: 17 rpx;
        display: flex;
        align-items: center;
        
        .ming {
          width: 41 rpx;
          height: 56 rpx;
          line-height: 56 rpx;
          margin-right: 24 rpx;
          text-align: center;
          color: #777777;
          font-size: 32 rpx;
          
          .image {
            width: 100%;
            height: 100%;
          }
        }
        
        .info {
          width: 53 rpx;
          height: 53 rpx;
          border-radius: 50%;
          margin-right: 14 rpx;
          overflow: hidden;
          
          .image {
            width: 100%;
            height: 100%;
          }
        }
        
        .nickName {
          height: 53 rpx;
          width: 180 rpx;
          overflow: hidden;
          line-height: 53 rpx;
          font-size: 24 rpx;
          color: #777777;
        }
      }
      
      .contentCenter {
        width: 150 rpx;
        font-size: 24 rpx;
        color: #777777;
      }
      
      .contentRight {
        width: 207 rpx;
        text-align: center;
        font-size: 22 rpx;
        color: #F43131;
        
        text {
          font-size: 26 rpx;
        }
      }
    }
  }
</style>
