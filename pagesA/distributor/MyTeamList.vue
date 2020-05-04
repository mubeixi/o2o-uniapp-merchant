<template>
  <view class="myall">
    <div class="defaults" v-if="pro.length<=0">
      <image :src="'/static/client/defaultImg.png'|domain"></image>
    </div>
    <view class="centers" v-for="(item,index) of pro " :key="index">
      <view class="imgs">
        <image class="image" :src="item.User_HeadImg"></image>
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

export default {
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
    width: 710 rpx;
    margin: 0 auto;
    box-sizing: border-box;
    height: 138 rpx;
    border-bottom: 1px solid #ECE8E8;
    display: flex;
    align-items: center;
    padding: 20 rpx 0 rpx;
    
    .imgs {
      width: 98 rpx;
      height: 98 rpx;
      border-radius: 50%;
      overflow: hidden;
      
      .image {
        width: 100%;
        height: 100%;
      }
    }
    
    .titles {
      margin-left: 19 rpx;
      width: 100%;
      height: 98 rpx;
      
      .bots {
        margin-top: 15 rpx;
        height: 23 rpx;
        font-size: 24 rpx;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
      }
      
      .msg {
        margin-top: 12 rpx;
        font-size: 30 rpx;
        color: #333333;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 29 rpx;
        
        .tops {
          height: 29 rpx;
          line-height: 29 rpx;
          width: 360 rpx;
          overflow: hidden;
          
          text {
            font-size: 28 rpx;
            margin-left: 10 rpx;
          }
        }
        
        .rights {
          font-size: 24 rpx;
          color: #888888;
        }
      }
    }
  }
  
  .defaults {
    margin: 0 auto;
    width: 640 rpx;
    height: 480 rpx;
    padding-top: 100 rpx;
  }
</style>
