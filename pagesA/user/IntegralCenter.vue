<template>
  <view  class="boxSizing">
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
import { userIntegralRecord, transferIntegral, getUserInfo } from '@/api/customer'
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
    width: 750rpx;
    overflow: hidden;
    min-height: 100vh;
    background-color: #FFFFFF !important;
  }

  .top {
    width: 750rpx;
    height: 537rpx;
    position: relative;
    background-color: #FFFFFF;

    .bgImg {
      margin-top: -50rpx;
      width: 114%;
      height: 100%;
    }

    .bottoms {
      width: 690rpx;
      height: 133rpx;
      background-color: #fff;
      position: absolute;
      box-shadow: 0px 8px 64px 0px rgba(4, 0, 0, 0.14);
      border-radius: 132px;
      bottom: 68rpx;
      left: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 38rpx 97rpx 37rpx 41rpx;

      .image {
        width: 58rpx;
        height: 58rpx;
      }

      .line {
        width: 2rpx;
        height: 50rpx;
        background: rgba(240, 239, 240, 1);
      }

      .qwe {
        // width: 278rpx;
        height: 58rpx;
        line-height: 58rpx;
        font-size: 34rpx;
        color: #4C4C4C;
        display: flex;
        align-items: center;

        .image {
          width: 58rpx;
          height: 58rpx;
        }

        text {
          margin-left: 21rpx;
        }
      }

    }

    .back {
      width: 21rpx;
      height: 38rpx;
      position: absolute;
      left: 24rpx;
      top: 25rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }

    .titleq {
      font-size: 36rpx;
      height: 34rpx;
      line-height: 34rpx;
      color: #FFFFFF;
      position: absolute;
      left: 70rpx;
      top: 25rpx;
      /* #ifdef APP-PLUS */
      margin-top: var(--status-bar-height);
      /* #endif */
    }

    .dangqian {
      font-size: 28rpx;
      color: #FFFFFF;
      height: 28rpx;
      line-height: 28rpx;
      position: absolute;
      left: 39rpx;
      top: 162rpx;
    }

    .momo {
      width: 27rpx;
      height: 28rpx;
      position: absolute;
      left: 53rpx;
      top: 130rpx;
    }

    .prices {
      font-size: 80rpx;
      font-weight: 400;
      height: 61rpx;
      line-height: 61rpx;
      position: absolute;
      left: 97rpx;
      top: 100rpx;
      color: #FFFFFF;
    }

    .duihuan {
      font-size: 24rpx;
      height: 24rpx;
      line-height: 24rpx;
      position: absolute;
      top: 240rpx;
      left: 53rpx;
      font-weight: 300;
      color: #FFFFFF;
      opacity: 0.69;
    }

    .zhuanchu {
      width: 170rpx;
      height: 74rpx;
      line-height: 74rpx;
      text-align: center;
      font-size: 30rpx;
      color: #FFFFFF;
      font-weight: bold;
      background-color: #ff9175;
      border-radius: 16rpx;
      position: absolute;
      top: 130rpx;
      right: 24rpx;
    }


  }

  .selects {
    height: 30rpx;
    width: 750rpx;
    display: flex;
    align-items: center;
    margin-top: 48rpx;
    margin-bottom: 40rpx;
    justify-content: center;

    .image {
      width: 20rpx;
      height: 20rpx;
    }

    .vies {
      margin-left: 20rpx;
      margin-right: 20rpx;
      font-size: 32rpx;
      color: #FF5C33;
      font-weight: bold;
      line-height: 32rpx;
    }

  }

  .contents {
    width: 750rpx;
    padding: 17rpx 26rpx 32rpx 24rpx;

    .mingxi {
      height: 115rpx;
      width: 700rpx;
      border-bottom: 1rpx solid #EAEAEA;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28rpx;
      color: #333333;

      .times {
        color: #999999;
        font-size: 20rpx;
        height: 15rpx;
        line-height: 15rpx;
        margin-top: 15rpx;
        margin-left: 3rpx;
      }
    }
  }

  .norecord {
    text-align: center;
    color: #999;
    font-size: 28rpx;
  }

  .zhezhao {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0rpx;
    left: 0rpx;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: .3);

    .zhezhaoView {
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      width: 503rpx;
      height: 564rpx;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 123rpx;
    }

    .closeZ {
      width: 47rpx;
      height: 47rpx;
      position: absolute;
      bottom: -100rpx;
      transform: translateX(-50%);
      left: 50%;
    }

    .zhezhaoYue {
      height: 157rpx;
      width: 503rpx;
      font-size: 32rpx;
      color: #333333;
      text-align: center;
      line-height: 157rpx;
    }

    .zhezhaoCenter {
      width: 100%;
      margin-top: 13rpx;
      padding: 0rpx 52rpx;

      .views {
        height: 90rpx;
        display: flex;
        align-items: center;

        .inputs {
          border-bottom: 1rpx solid #F4F4F4;
          font-size: 24rpx;
          margin-left: 16rpx;
        }
      }

      .imgs {
        width: 25rpx;
        height: 37rpx;
      }
    }

    .zheButton {
      width: 400rpx;
      height: 76rpx;
      line-height: 76rpx;
      background: rgba(255, 92, 51, 1);
      border-radius: 60rpx;
      text-align: center;
      margin-top: 40rpx;
      margin-left: 52rpx;
      font-size: 30rpx;
      color: #FFFFFF;
    }
  }
</style>
