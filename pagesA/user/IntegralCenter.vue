<template>
  <view class="boxSizing">
    <view class="zhezhao" v-if="isShow">
      <view class="zhezhaoView">
        <image :src="'/static/client/check/close.png'|domain" class="closeZ" @click="isShow=false"></image>
        <view class="zhezhaoYue">
          积分互转
        </view>
        <view class="zhezhaoCenter">
          <view class="views">
            <layout-icon type="iconphone1" class="imgs" size="20" color="#ff5e36"></layout-icon>
            <input class="inputs" type="text" placeholder="请输入对方会员号" v-model="user_no">
          </view>
        </view>
        <view class="zhezhaoCenter">
          <view class="views">
            <layout-icon type="iconjifen1" class="imgs" size="16" color="#ff5e36"></layout-icon>
            <input class="inputs" type="text" placeholder="请输入转出积分" v-model="integral">
          </view>
        </view>
        <view class="zheButton" @click="confirm">
          确认转出
        </view>
      </view>
    </view>
    
    <view class="top">
      <image class="bgImg" :src="'/static/client/jifen.jpg'|domain"></image>
      <layout-icon type="iconjifen1" class="momo" size="16" color="#fff"></layout-icon>
      
      <view class="prices">
        {{intergatal}}
      </view>
      <view class="duihuan">
        积分可在积分商城里兑换产品
      </view>
      <view class="zhuanchu" @click="isShow=true">
        转出
      </view>
      <view class="bottoms">
        <view class="lefts qwe" @click="gotojifen">
          <image class="image" :src="'/static/client/check/t3.png'|domain"></image>
          <text>积分商城</text>
        </view>
        <view class="line">
        </view>
        <view class="rights qwe" style="padding-left: 66rpx;" @click="gotoMyExchange">
          <image class="image" :src="'/static/client/check/t4.png'|domain"></image>
          <text>我的兑换</text>
        </view>
      </view>
    </view>
    
    <view class="selects">
      <image class="image" :src="'/static/client/check/qw.png'|domain"></image>
      <view class="vies">
        积分明细
      </view>
      <image class="image" :src="'/static/client/check/er.png'|domain"></image>
    </view>
    
    <view class="contents">
      <template v-if="recordList.length > 0">
        <view class="mingxi" v-for="(item,index) in recordList">
          <view>
            <view>
              {{item.Record_Description}}
            </view>
            <view class="times">
              {{item.Record_CreateTime}}
            </view>
          </view>
          <view>
            {{item.Record_Integral}}
          </view>
        </view>
      </template>
      <template v-else>
        <view class="norecord">暂无记录</view>
      </template>
    </view>
  
  </view>
</template>

<script>
import { getUserInfo, transferIntegral, userIntegralRecord } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      isShow: false,
      page: 1,
      pageSize: 10,
      recordList: [],
      hasMore: false,
      user_no: '',
      integral: '',
      info: {},
      isClicked: false, // 是否已经点击过
      U_intergatal: 0,
      user_intergatal: 0, // 积分，用于监听
    }
  },
  computed: {
    intergatal: function () {
      return parseInt(this.U_intergatal)
    },
  },
  watch: {
    user_intergatal: function (newVal, oldVal) {
      TweenLite.to(this.$data, 0.5, { U_intergatal: newVal })
    },
  },
  onShow () {
    
    this.reset()
    this.userIntegralRecord()
  },
  created () {
    
    //this.getUserInfo(true)
    getUserInfo().then(res => {
      this.info = res.data
      this.user_intergatal = res.data.User_Integral
    }).catch()
  },
  // 下拉加载
  onReachBottom () {
    if (this.hasMore) {
      this.page += 1
      this.userIntegralRecord()
    }
  },
  methods: {
    // 确认转出
    confirm () {
      
      if (this.isClicked) return
      this.isClicked = true
      if (!this.integral || this.integral < 0 || isNaN(this.integral)) {
        uni.showToast({
          title: '您输入的积分有误',
          icon: 'none',
        })
        this.isClicked = false
        return
      }
      if (!this.user_no) {
        uni.showToast({
          title: '请确认转出账号',
          icon: 'none',
        })
        this.isClicked = false
        return
      }
      transferIntegral({
        integral: this.integral,
        user_no: this.user_no,
      }).then(res => {
        
        uni.showToast({
          title: res.msg,
          duration: 1500,
        })
        setTimeout(() => {
          this.isClicked = false
          
          //this.setUserInfo({});
          get_user_info().then(res => {
            this.info = res.data
            this.user_intergatal = res.data.User_Integral
            this.setUserInfo(this.info)
          }, err => {
          }).catch()
        }, 1500)
      }, err => {
        this.isClicked = false
        uni.showToast({
          title: err.msg,
          icon: 'none',
        })
      })
      this.isShow = false
    },
    // 重置，防止重复
    reset () {
      //this.recordList = [];
      this.page = 1
      this.hasMore = false
    },
    // 去积分商城
    gotojifen () {
      uni.navigateTo({
        url: '/pagesA/person/jifenExchange',
      })
    },
    // 去我的兑换列表
    gotoMyExchange () {
      uni.navigateTo({
        url: '/pagesA/person/myRedemption',
      })
    },
    goBack () {
      uni.navigateBack(1)
    },
    userIntegralRecord () {
      userIntegralRecord({
        page: this.page,
        pageSize: this.pageSize,
      }, { errtip: false }).then(res => {
        if (this.page != 1) {
          let oldlist = this.recordList
          this.recordList = oldlist.concat(res.data)
        } else {
          this.recordList = res.data
        }
        if (res.totalCount > this.recordList.length) {
          this.hasMore = true
        }
      }).catch(e => {
      
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  view {
    box-sizing: border-box;
  }
  
  .boxSizing {
    background-color: #FFFFFF;
    width: 750 rpx;
    overflow: hidden;
    min-height: 100vh;
    background-color: #FFFFFF !important;
  }
  
  .top {
    width: 750 rpx;
    height: 537 rpx;
    position: relative;
    background-color: #FFFFFF;
    
    .bgImg {
      margin-top: -50rpx;
      width: 114%;
      height: 100%;
    }
    
    .bottoms {
      width: 690 rpx;
      height: 133 rpx;
      background-color: #fff;
      position: absolute;
      box-shadow: 0px 8px 64px 0px rgba(4, 0, 0, 0.14);
      border-radius: 132px;
      bottom: 68 rpx;
      left: 30 rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 38 rpx 97 rpx 37 rpx 41 rpx;
      
      .image {
        width: 58 rpx;
        height: 58 rpx;
      }
      
      .line {
        width: 2 rpx;
        height: 50 rpx;
        background: rgba(240, 239, 240, 1);
      }
      
      .qwe {
        // width: 278rpx;
        height: 58 rpx;
        line-height: 58 rpx;
        font-size: 34 rpx;
        color: #4C4C4C;
        display: flex;
        align-items: center;
        
        .image {
          width: 58 rpx;
          height: 58 rpx;
        }
        
        text {
          margin-left: 21 rpx;
        }
      }
      
    }
    
    .back {
      width: 21 rpx;
      height: 38 rpx;
      position: absolute;
      left: 24 rpx;
      top: 25 rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .titleq {
      font-size: 36 rpx;
      height: 34 rpx;
      line-height: 34 rpx;
      color: #FFFFFF;
      position: absolute;
      left: 70 rpx;
      top: 25 rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }
    
    .dangqian {
      font-size: 28 rpx;
      color: #FFFFFF;
      height: 28 rpx;
      line-height: 28 rpx;
      position: absolute;
      left: 39 rpx;
      top: 162 rpx;
    }
    
    .momo {
      width: 27 rpx;
      height: 28 rpx;
      position: absolute;
      left: 53 rpx;
      top: 130 rpx;
    }
    
    .prices {
      font-size: 80 rpx;
      font-weight: 400;
      height: 61 rpx;
      line-height: 61 rpx;
      position: absolute;
      left: 97 rpx;
      top: 100 rpx;
      color: #FFFFFF;
    }
    
    .duihuan {
      font-size: 24 rpx;
      height: 24 rpx;
      line-height: 24 rpx;
      position: absolute;
      top: 240 rpx;
      left: 53 rpx;
      font-weight: 300;
      color: #FFFFFF;
      opacity: 0.69;
    }
    
    .zhuanchu {
      width: 170 rpx;
      height: 74 rpx;
      line-height: 74 rpx;
      text-align: center;
      font-size: 30 rpx;
      color: #FFFFFF;
      font-weight: bold;
      background-color: #ff9175;
      border-radius: 16 rpx;
      position: absolute;
      top: 130 rpx;
      right: 24 rpx;
    }
    
    
  }
  
  .selects {
    height: 30 rpx;
    width: 750 rpx;
    display: flex;
    align-items: center;
    margin-top: 48 rpx;
    margin-bottom: 40 rpx;
    justify-content: center;
    
    .image {
      width: 20 rpx;
      height: 20 rpx;
    }
    
    .vies {
      margin-left: 20 rpx;
      margin-right: 20 rpx;
      font-size: 32 rpx;
      color: #FF5C33;
      font-weight: bold;
      line-height: 32 rpx;
    }
    
  }
  
  .contents {
    width: 750 rpx;
    padding: 17 rpx 26 rpx 32 rpx 24 rpx;
    
    .mingxi {
      height: 115 rpx;
      width: 700 rpx;
      border-bottom: 1 rpx solid #EAEAEA;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28 rpx;
      color: #333333;
      
      .times {
        color: #999999;
        font-size: 20 rpx;
        height: 15 rpx;
        line-height: 15 rpx;
        margin-top: 15 rpx;
        margin-left: 3 rpx;
      }
    }
  }
  
  .norecord {
    text-align: center;
    color: #999;
    font-size: 28 rpx;
  }
  
  .zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0 rpx;
    left: 0 rpx;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: .3);
    
    .zhezhaoView {
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      width: 503 rpx;
      height: 564 rpx;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 123 rpx;
    }
    
    .closeZ {
      width: 47 rpx;
      height: 47 rpx;
      position: absolute;
      bottom: -100rpx;
      transform: translateX(-50%);
      left: 50%;
    }
    
    .zhezhaoYue {
      height: 157 rpx;
      width: 503 rpx;
      font-size: 32 rpx;
      color: #333333;
      text-align: center;
      line-height: 157 rpx;
    }
    
    .zhezhaoCenter {
      width: 100%;
      margin-top: 13 rpx;
      padding: 0 rpx 52 rpx;
      
      .views {
        height: 90 rpx;
        display: flex;
        align-items: center;
        
        .inputs {
          border-bottom: 1 rpx solid #F4F4F4;
          font-size: 24 rpx;
          margin-left: 16 rpx;
        }
      }
      
      .imgs {
        width: 25 rpx;
        height: 37 rpx;
      }
    }
    
    .zheButton {
      width: 400 rpx;
      height: 76 rpx;
      line-height: 76 rpx;
      background: rgba(255, 92, 51, 1);
      border-radius: 60 rpx;
      text-align: center;
      margin-top: 40 rpx;
      margin-left: 52 rpx;
      font-size: 30 rpx;
      color: #FFFFFF;
    }
  }
</style>
