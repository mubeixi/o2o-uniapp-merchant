<template>
  <view @click="commonClick" class="myall">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view :key="index" class="centers" v-for="(item,index) of pro ">
      <view class="imgs">
        <image :src="item.User_HeadImg" class="image"></image>
      </view>
      <view class="titles">
        <view class="msg">
          <view class="tops">
            {{item.Shop_Name}}
            <text>{{item.User_Mobile}}</text>
          </view>
          <view class="rights">
            {{item.Account_CreateTime}}
          </view>
        </view>
        <view class="bots">
          会员号：{{item.User_No}}
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { getDisTeamList } from '@/api/customer'
import { toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      index: 0,
      page: 1,
      pageSize: 15,
      pro: [],
      totalCount: 0,
    }
  },
  onLoad (options) {
    this.index = options.index
  },
  onReachBottom () {
    if (this.totalCount > this.pro.length) {
      this.page++
      this.getDisTeamList()
    } else {
      toast('到底啦', 'none')
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
        level: this.index,
        page: this.page,
        pageSize: this.pageSize,
      }
      
      getDisTeamList(data, {
        errtip: false,
        tip: '加载中',
      }).then(res => {
        this.pro = this.pro.concat(res.data)
        this.totalCount = res.totalCount
      })
        .catch(e => {
        
        })
    },
  },
  
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
    padding-top: 100rpx;
  }
</style>
