<template>
  <view class="myall">
    <view class="top">
      <image class="back" :src="'/static/client/distributor/top.png'|domain"></image>
      <!-- #ifdef H5 -->
      <layout-icon class="go" color="#fff" size="18" type="iconicon-arrow-left"></layout-icon>
      <!-- #endif -->
      
      <view class="person">
        <image class="headimg" :src="disInfo.Shop_Logo||disInfo.User_HeadImg"></image>
        <view class="nickName">
          {{disInfo.Shop_Name}}
        </view>
      </view>
      
      <view class="putong">
        {{disInfo.Level_Name}}
      </view>
    </view>
    <div class="line15"></div>
    
    <view class="last">
      <view class="first">
        <block v-for="(item,index) of funcModules.child" :key="index">
          <view class="left" @click="spreadQr(0,0)" v-if="item.field=='erweima_weixin'">
            <image class="image" :src="item.img|domain"></image>
            <view class="haha">{{item.name}}</view>
          </view>
          <view class="right" @click="spreadQr(1,0)" v-if="item.field=='erweima_tuiguang'">
            <image class="image" :src="item.img|domain"></image>
            <view class="haha">{{item.name}}</view>
          </view>
        </block>
      
      </view>
      <view style="width: 100%;height: 1rpx;background-color: #F3F3F3;"></view>
    
    </view>
  </view>
</template>
<script>

import { mapActions } from 'vuex'
import { getDisInit, getDistributeWxQrcode, getFuncModule } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  components: { LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {
      // userInfo:{},
      disInfo: {},
      info: {
        dis_config: {},
        total_sales: '',
        total_income: '',
        balance: '',
      }, //
      funcModules: {},
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  onShow () {
    getDisInit({}, { errtip: false }).then(res => {
      this.info = res.data
      this.userInfo.Is_Distribute = 1
      this.disInfo = res.data.disInfo
    }).catch(err => {
    })
    this.getFuncModule()
    // this.userInfo = this.getUserInfo()
  },
  methods: {
    ...mapActions(['getUserInfo']),
    spreadQr (type, again) {
      // this.showQr(type,again)
      // return;
      uni.navigateTo({
        url: `/pagesA/distributor/ShareQrcode?type=${type}&again=${again}`,
      })
    },
    showQr (type, again) {
      getDistributeWxQrcode({
        type,
        again,
        owner_id: this.userInfo.User_ID,
      }, { tip: '生成中' }).then(res => {
        uni.previewImage({
          urls: [res.data.img_url],
        })
      })
    },
    // 获取功能模块
    getFuncModule () {
      getFuncModule({
        type: 1,
        field: 'erweima',
      }).then(res => {
        this.funcModules = res.data[0]
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
  
  .top {
    width: 750 rpx;
    height: 233 rpx;
    overflow: hidden;
    position: relative;
    
    image.back {
      width: 100%;
    }
    
    .msg {
      width: 45 rpx;
      height: 45 rpx;
      position: absolute;
      top: 25 rpx;
      right: 21 rpx;
    }
    
    .go {
      position: absolute;
      top: 33 rpx;
      left: 19 rpx;
    }
    
    .person {
      width: 550 rpx;
      height: 92 rpx;
      overflow: hidden;
      position: absolute;
      top: 103 rpx;
      left: 21 rpx;
      display: flex;
      
      .headimg {
        height: 92 rpx;
        width: 92 rpx;
        border-radius: 50%;
      }
      
      .nickName {
        
        line-height: 92 rpx;
        font-size: 30 rpx;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 10px;
        
      }
    }
    
    .ziliao {
      height: 30 rpx;
      font-size: 22 rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      position: absolute;
      top: 159 rpx;
      left: 136 rpx;
      
      .edit {
        width: 19 rpx;
        height: 19 rpx;
        margin-left: 18 rpx;
      }
    }
    
    .putong {
      width: 152 rpx;
      height: 50 rpx;
      line-height: 50 rpx;
      text-align: center;
      background-color: #FFFFFF;
      font-size: 24 rpx;
      color: #333333;
      position: absolute;
      top: 124 rpx;
      right: 0 rpx;
      border-radius: 152 rpx 0px 0px 152 rpx;
    }
    
  }
  
  .tuiguang {
    height: 182 rpx;
    width: 750 rpx;
    padding: 50 rpx 21 rpx 22 rpx 20 rpx;
    box-sizing: border-box;
    
    .title {
      height: 27 rpx;
      font-size: 28 rpx;
      color: #333333;
      font-weight: 500;
    }
    
    .inputSec {
      margin-top: 28 rpx;
      height: 55 rpx;
      display: flex;
      
      .inputw {
        width: 580 rpx;
        height: 55 rpx;
        border: 1px solid #B3B3B3;
        color: #999999;
        font-size: 26 rpx;
        padding-left: 18 rpx;
        box-sizing: border-box;
      }
      
      .textw {
        width: 100 rpx;
        height: 55 rpx;
        line-height: 55 rpx;
        font-size: 28 rpx;
        color: #FFFFFF;
        background-color: #F43131;
        text-align: center;
        margin-left: 29 rpx;
      }
    }
  }
  
  .last {
    width: 710 rpx;
    /*height: 433rpx;*/
    margin: 0 auto;
    margin-top: 28 rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0 rpx 15 rpx 0px rgba(0, 0, 0, 0.18);
    
    .first, .second {
      width: 710 rpx;
      height: 216 rpx;
      display: flex;
      position: relative;
      
      .left, .right {
        width: 50%;
        text-align: center;
        position: relative;
        
        .image {
          width: 79 rpx;
          height: 79 rpx;
        }
        
        .haha {
          font-size: 28 rpx;
          color: #333333;
        }
      }
      
      .left:after {
        content: '';
        position: absolute;
        top: 68 rpx;
        right: 0;
        height: 81 rpx;
        width: 1 rpx;
        background-color: #E8E8E8;
      }
    }
    
    view.first .image {
      margin-top: 46 rpx;
    }
    
    view.second .image {
      margin-top: 38 rpx;
    }
  }
</style>
