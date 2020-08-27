<template>
  <div @click="commonClick" class="start">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <!-- 商品详情部分 -->
    <div class="first">
      <div class="left">
        <img :src="product.ImgPath" class="img" />
      </div>
      <div class="right">
        <div class="top">{{product.Products_Name}}</div>
        <div class="bottom">
          <div class="price">
            ¥<span class="prices">{{product.pintuan_pricex}}</span><span>拼团省￥{{ (product.Products_PriceX*100-product.pintuan_pricex*100)/100}}</span>
          </div>
          <div class="tuan">
            {{product.pintuan_people}}人团 • 已团{{product.teamnum}}件
          </div>
        </div>
      </div>
    </div>
    <!-- 商品保证 -->
    <ul class="second" v-if="product.Products_Promise">
      <block :key="index" v-for="(item,index) in product.Products_Promise">
        <li class="lis" v-if="item.name">
          <layout-icon class="p-r-4" color="#26C78D" display="inline" type="iconradio-check"></layout-icon>
          <span>{{item.name}}</span>
        </li>
      </block>
    </ul>
    <!-- 团长 -->
    <div class="three">
      <div class="paySuc">
        <image :src="'/static/client/tuan/paySuc.png'|domain" class="img" />
        支付成功
      </div>
      <ul class="lyl">
        <li :key="idx" class="liq" v-for="(user,idx) in join_team_list">
          <image :src="user.User_HeadImg" class="img" />
          <image :src="'/static/client/tuan/tuanzhang.png'|domain" class=" img tuanzhang" v-if="user.team_head" />
          <span class="tuanzhang" v-if="user.team_head">团长</span>
        </li>
      </ul>
    </div>
    <!-- 倒计时 -->
    <div class="how" v-if="product.teamstatus!=1">
      <image :src="'/static/client/tuan/time.png'|domain" class="img" />
      <span class="my">拼团中，还差<span class="spans">{{product.pintuan_people-product.teamnum}}</span>人</span>
    </div>
    <!--    <div class="times" v-if="product.teamstatus!=1">-->
    <!--      <div class="line"></div>-->
    <!--      <div class="text">-->
    <!--        剩余-->
    <!--        <div class="myTime">-->
    <!--          <span class="num">{{countdown.h}}</span>-->
    <!--          <span class="lines">:</span>-->
    <!--          <span class="num">{{countdown.m}}</span>-->
    <!--          <span class="lines">:</span>-->
    <!--          <span class="num">{{countdown.s}}</span>-->
    <!--        </div>-->
    <!--        结束-->
    <!--      </div>-->
    <!--      <div class="line"></div>-->
    <!--    </div>-->
    <!--查看订单 -->
    <div class="dingdan" v-if="product.teamstatus!=1">
      <button @click="goOrderDetail" class="vanButton">查看订单</button>
      <!-- #ifdef MP -->
      <button class="vanButton invi" open-type="share">邀请好友</button>
      <!-- #endif -->

      <!-- #ifdef H5 || APP-PLUS -->
      <span @click="inviteFunc" class="vanButton invi">邀请好友</span>
      <!-- #endif -->
    </div>
    <div class="dingdan" v-if="product.teamstatus==1">
      <button @click="goOrderDetail" class="vanButton" style="margin-left: 125rpx;">查看订单</button>
    </div>
    <!--        <div class="liji">-->
    <!--            <div class="vanButton">立即参团</div>-->
    <!--        </div>-->

    <!-- 间隙 -->
    <div class="mbxline"></div>
    <!-- 拼团规则 -->
    <div class="guize">
      <div class="top">拼团规则</div>
      <div class="xiang">
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span class="spana">开团或者参加别人的团</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span class="spana">在规定的时间内，邀请好友参团</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span class="spana">达到拼团人数，分别给团长和团员发货</span>
        </div>
        <div class="hang">
          <image :src="'/static/client/tuan/ju.png'|domain" class="img" />
          <span class="spana">未达到拼团人数，货款将自动原路返还</span>
        </div>
      </div>
    </div>
    <!-- 更多 -->
    <div class="dianzhang">拼团推荐</div>
    <div class="prolist">
      <div :key="index" @click="$toGoodsDetail(item)" class="pro-item" v-for="(item,index) in prodList">
        <img :src="item.ImgPath" alt="" class="img">
        <div class="item-name"><wzw-live-tag  :room_id="item.room_id" :product-info="item" />{{item.Products_Name}}</div>
        <div class="price">
          <span class="n_price"><span class="pricem">￥</span>{{item.Products_PriceX}}</span>
          <span class="o_price">已团{{item.Products_Sales}}件</span>
        </div>
      </div>
    </div>

    <layout-layer :direction="'top'" ref="popupLayer">
      <div class="shareinfo" v-if="type=='share'">
        <div class="s_top">
          <div @click="shareFunc('wx')" class="flex1">
            <img :src="'/static/client/detail/share1.png'|domain" alt="">
            <div>发送好友</div>
          </div>
          <div @click="shareFunc('wxtimeline')" class="flex1">
            <img :src="'/static/client/detail/sahre3.png'|domain" alt="">
            <div>朋友圈</div>
          </div>
          <!--只有配置了这个参数的app，才有分享到小程序选项-->
          <div @click="shareFunc('wxmini')" class="flex1" v-if="wxMiniOriginId">
            <img :src="'/static/client/detail/share4.png'|domain" alt="">
            <div>微信小程序</div>
          </div>
        </div>
        <div @click="cancel" class="s_bottom">取消</div>
      </div>
    </layout-layer>

    <!--分享引导框开始-->
    <div @click="isShowGuide=false" class="hide guide_box" v-show="isShowGuide">
      <div class="mask"></div>
      <div>
        <image :src="'/static/client/share/guide_point.png'|domain" class="guide_point" />
      </div>
      <div>
        <image :src="'/static/client/share/guide_btn.png'|domain" class="guide_btn" />
      </div>
    </div>
    <!--分享引导框结束-->

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'

import { getProductDetail, getProductList, getProductSharePicByWap } from '@/api/product'
import { getOrderDetail } from '@/api/order'
// import { getGroupCountdown, buildSharePath, getProductThumb, ls } from '../../common/tool'
import { buildSharePath, checkIsLogin, getProductThumb } from '@/common/helper'
import Storage from '@/common/Storage'

import { error, hideLoading, showLoading } from '@/common/fun'
import LayoutLayer from '@/components/layout-layer/layout-layer'
import { Exception } from '@/common/Exception'
import { mapActions } from 'vuex'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'

const groupStam = null
const getGroupCountdown = ({ end_timeStamp = 1571221631, current = (new Date()).getTime() } = {}) => {
  let { d = 0, h = 0, m = 0, s = 0 } = {}
  // 时间戳格式转换
  current = parseInt(current / 1000)

  const countTime = end_timeStamp - current
  if (countTime < 0) {
    return false
  }

  d = parseInt(countTime / (60 * 60 * 24))
  h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))
  m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
  s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

  return {
    d,
    h,
    m,
    s
  }
}

export default {
  components: {
    WzwLiveTag,
    WzwImTip,
    LayoutLayer
  },
  mixins: [BaseMixin],
  data () {
    return {
      isShowGuide: false,
      // #ifdef APP-PLUS
      wxMiniOriginId: '',
      // #endif
      JSSDK_INIT: false, // 自己有分享的业务
      type: '',
      join_team_list: [],
      Team_ID: null,
      orderInfo: {},
      product: {},
      teamList: [],
      Prod_ID: null,
      prodList: [],
      Order_ID: null,
      countdown: {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      },
      msg: '开团成功', // 立即参团
      prod_arg: {
        page: 1,
        pintuan_flag: 1,
        pageSize: 999
      },
      hasMore: true // 是否还有产品
    }
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    },
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    showTick (type, e) {
      this.type = type
      this.$refs.popupLayer.show()
    },
    close () {
      this.$refs.popupLayer.close()
    },
    cancel () {
      this.$refs.popupLayer.close()
    },
    inviteFunc () {
      // #ifdef H5
      this.isShowGuide = true
      // #endif

      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

      // #endif

      // #ifdef APP-PLUS
      this.showTick('share')
      // #endif
    },
    goOrderDetail () {
      // 这里应该需要跳转到订单详情页
      this.$linkTo(`/pages/order/OrderDetail?Order_ID=${this.orderInfo.Order_ID}`)
      // uni.navigateTo({
      //   url: '/pages/order/OrderList?type=pintuan&index=' + 2
      // })
    },
    async _init_func () {
      try {
        showLoading()
        // 这里要设置Prod_ID
        const orderInfo = await getOrderDetail({ Order_ID: this.Order_ID }, { onlyData: 1 }).catch((e) => {
          throw Error(e.msg || '获取订单详情失败')
        })

        for (var i in orderInfo) {
          if (i === 'Order_Shipping' && typeof orderInfo[i] === 'string') {
            orderInfo[i] = JSON.parse(orderInfo[i])
          }
          if (i === 'prod_list') {
            for (var j in orderInfo[i]) {
              for (var k in orderInfo[i][j]) {
                if (k === 'attr_info' && typeof orderInfo[i][j][k] === 'string') {
                  orderInfo[i][j][k] = orderInfo[i][j][k] && JSON.parse(orderInfo[i][j][k])
                }
              }
            }
          }
        }

        this.orderInfo = orderInfo
        this.Prod_ID = orderInfo.prod_list[0].prod_id
        this.Team_ID = orderInfo.teamid

        const productInfo = await getProductDetail({
          prod_id: this.Prod_ID,
          teamid: this.Team_ID
        }, { onlyData: 1 }).catch((e) => {
          throw Error(e.msg || '获取产品详情失败')
        })
        this.product = productInfo
        this.join_team_list = productInfo.join_team_list
        // 获取开团的时间
        for (var team of this.join_team_list) {
          if (team.team_head) {
            this.addtime = team.addtime
            break
          }
        }
        if (productInfo.skujosn) {
          this.product.skujosn = typeof productInfo.skujosn === 'string' ? JSON.parse(productInfo.skujosn) : productInfo.skujosn
          this.product.skuvaljosn = typeof productInfo.skuvaljosn === 'string' ? JSON.parse(productInfo.skuvaljosn)
            : productInfo.skuvaljosn
        }

        // this.stampCount()
        // 开发时候一直倒计时太乱了
        // 浩华说没有倒计时，青春结束了
        // groupStam = setInterval(this.stampFunc, 1000)

        this.prodList = await getProductList({ ...this.prod_arg }, { onlyData: 1 }).catch(e => {
          throw Error(e.msg || '获取产品推荐列表失败')
        })
      } catch (e) {
        Exception.handle(e)
      } finally {
        hideLoading()
      }
    },
    stampFunc () {
      let rt = {}
      if (this.product && this.product.pintuan_end_time) {
        // 24小时内
        // 所以这个时候d一定是0
        const computedStamp = getGroupCountdown({ end_timeStamp: parseInt(this.addtime) + 24 * 60 * 60 })
        if (computedStamp) {
          rt = computedStamp
        } else {
          // 如果不对，就清空
          clearInterval(groupStam)
        }
      }

      this.countdown = rt
    },
    async shareFunc (channel) {
      const _self = this
      const path = 'pagesA/active/GroupJoin?Team_ID=' + this.Team_ID + '&Products_ID=' + this.Prod_ID
      const front_url = this.initData.front_url

      const shareObj = {
        title: this.product.Products_Name,
        desc: this.product.Products_BriefDescription,
        imageUrl: getProductThumb(this.product.ImgPath),
        path: buildSharePath(path)
      }

      switch (channel) {
        case 'wx':
          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl
          })
          break
        case 'wxtimeline':
          uni.share({
            provider: 'weixin',
            scene: 'WXSenceTimeline',
            type: 0,
            href: front_url + shareObj.path,
            title: shareObj.title,
            summary: shareObj.desc,
            imageUrl: shareObj.imageUrl
          })
          break
        case 'wxmini':

          uni.share({
            provider: 'weixin',
            scene: 'WXSceneSession',
            type: 5,
            imageUrl: shareObj.imageUrl,
            title: shareObj.title,
            miniProgram: {
              id: _self.wxMiniOriginId,
              path: '/' + shareObj.path,
              type: 0,
              webUrl: 'http://uniapp.dcloud.io'
            }
          })
          break
        case 'pic':
          var sharePic = await getProductSharePicByWap({
            product_id: this.Prod_ID
          }).then(res => {
            Storage.set('temp_sharepic_info', res.data)
            return res.data.img_url
          }).catch((err) => {
            Exception.handle(err)
          })

          if (!sharePic) {
            error('获取分享参数失败')
            return
          }

          setTimeout(function () {
            uni.navigateTo({
              url: '/pagesA/product/SharePic/SharePic'
            })
          }, 200)
          break
      }
    },
    ...mapActions({
      getInitData: 'system/loadInitData'
    })
  },
  async created () {
    const initData = await this.getInitData()

    let WX_MINI_ORIGIN_ID = Storage.get('WX_MINI_ORIGIN_ID')
    if (!WX_MINI_ORIGIN_ID) {
      const login_methods = initData.login_methods
      for (var i in login_methods) {
        if (i !== 'component_appid' && login_methods[i].authorizer_user_name) {
          WX_MINI_ORIGIN_ID = login_methods[i].authorizer_user_name
          break
        }
      }
    }

    this.wxMiniOriginId = WX_MINI_ORIGIN_ID
  },
  onLoad (options) {
    if (!checkIsLogin(1)) return

    if (options.OrderId) {
      this.Order_ID = options.OrderId
    }
  },
  onShow () {
    this._init_func()
  },
  // 自定义小程序分享
  // 我为啥要给他注释？？多一个函数而已。。
  onShareAppMessage () {
    // 分享的是Team_ID
    const path = 'pagesA/active/GroupJoin?Team_ID=' + this.Team_ID + '&Products_ID=' + this.Prod_ID
    const shareObj = {
      title: this.product.Products_Name,
      desc: this.product.Products_BriefDescription,
      imageUrl: this.product.ImgPath,
      path: buildSharePath(path)
    }
    return shareObj
  }

}
</script>

<style lang="scss" scoped>
  .guide_box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    text-align: right;

    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .7);

    }

    .guide_point {
      width: 375rpx;
      height: 475rpx;
      /*margin-right: 10px;*/
    }

    .guide_btn {
      width: 189rpx;
      height: 63rpx;
      margin-right: 20px;
    }
  }

  .shareinfo {
    padding: 30rpx 0 0;
    color: #333;
    font-size: 12px;
  }

  .shareinfo > div {
    text-align: center;
  }

  .s_top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .s_top img {
    width: 38px;
    height: 38px;
    display: block;
    margin: 0 auto 5px;
  }

  .s_top > div:nth-child(1) {
    /*margin-right: 60px;*/
  }

  .s_bottom {
    position: relative;
    bottom: 0;
    width: 100%;
    background: #e8e8e8;
    color: #666;
    font-size: 13px;
    text-align: center;
    line-height: 30px;
    margin-top: 25px;
  }

  .start {
    overflow-x: hidden;
    background-color: #fff !important;

    .nav-title {
      background: #fafafa !important;
    }

    .first {
      padding: 10px 0px;
      display: flex;

      .left {
        width: 290rpx;
        height: 290rpx;
        margin-left: 10px;

        .img {
          width: 290rpx;
          height: 290rpx;
        }
      }

      .right {
        width: 460rpx;
        margin-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 12px;
        position: relative;

        .top {
          width: 100%;
          font-size: 26rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }

        .bottom {
          margin-top: 40rpx;

          @media screen and (max-width: 371px) {
            margin-top: 0;
          }

          .price {
            font-size: 24rpx;
            color: #F43131;

            span {
              margin-left: 14px;
              color: #999999;
            }

            .prices {
              color: #F43131;
              font-size: 40rpx;
              margin-left: 5px;
            }
          }

          .tuan {
            margin-top: 3px;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
    }

    .second {
      display: flex;
      width: 100%;
      height: 40px;
      padding: 14px 0px;
      background-color: #FAFAFA;
      box-sizing: border-box;
      font-size: 22rpx;
      color: #333;
      justify-content: space-around;
      padding-left: 16px;
      padding-right: 16px;

      @media screen and (max-width: 371px) {
        padding: 14px 0px;
      }

      .img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
      }

      .lis {
        display: flex;
        align-items: center;
      }
    }

    .three {
      .paySuc {
        padding: 82rpx 241rpx;
        padding-bottom: 75rpx;
        display: flex;
        align-items: center;
        font-size: 46rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(244, 49, 49, 1);
        line-height: 38px;

        .img {
          width: 34px;
          height: 31px;
        }
      }

      .lyl {
        display: flex;
        margin: 0 auto;
        padding-left: 220rpx;
        padding-right: 205rpx;
        list-style: none;

        .img {
          width: 95rpx;
          height: 95rpx;
          border-radius: 50%;
        }

        .liq {
          margin-right: 11px;
          width: 95rpx;
          height: 95rpx;
          border-radius: 50%;
          position: relative;

          .tuanzhang {
            width: 26px;
            height: 19px;
            border-radius: 0;
            position: absolute;
            left: -11px;
          }

          .tuanzhang {
            width: 26px;
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            left: -9px;
          }
        }
      }
    }

    .how {
      width: 167px;
      margin-top: 28px;
      margin-bottom: 13px;
      padding-left: 231rpx;
      display: flex;
      align-items: center;

      .img {
        width: 18px;
        height: 18px;
      }

      .my {
        font-size: 30rpx;
        color: #333;
        margin-left: 8px;

        .spans {
          color: #F43131;
          margin: 0 5px;
        }
      }
    }

    .times {
      display: flex;
      // width: 344px;
      padding-left: 77rpx;
      padding-right: 76rpx;
      margin: 0 auto;
      align-items: center;
      justify-content: center;

      .line {
        width: 123rpx;
        height: 1px;
        background-color: #DEDDDD;
      }

      .text {
        width: 350rpx;
        margin: 0 12rpx;
        display: flex;
        align-items: center;
        font-size: 24rpx;

        .myTime {
          margin: 0 28rpx;
          font-size: 30rpx;
        }

        .num {
          background-color: #484848;
          border-radius: 2px;
          display: inline-block;
          width: 48rpx;
          height: 48rpx;
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #fff;
          text-align: center;
        }

        .lines {
          //width: 6px;
          padding: 0 4rpx;
          display: inline-block;
          height: 24px;
          text-align: center;
        }
      }
    }

    .dingdan {
      margin-top: 18px;
      font-size: 0;
      margin-bottom: 15px;
      padding: 0rpx 110rpx;
      height: 74rpx;

      // @media screen and (max-width: 370px) {
      //     margin-left: 15px;
      //     margin-right: 0;
      //     margin-top:18px;
      //     font-size: 0;
      //     margin-bottom: 15px;
      // }
      // @media screen and (min-width: 371px) and (max-width: 380px) {
      //     margin: 0 4px;
      //     margin-top: 18px;
      //     font-size: 0;
      //     margin-bottom: 15px;
      // }
      .vanButton {
        width: 250rpx;
        height: 74rpx;
        background: rgba(250, 107, 39, 1);
        border-radius: 6px;
        font-size: 32rpx;
        color: #fff;
        display: inline-block;
        line-height: 74rpx;
        text-align: center;
      }

      .invi {
        margin-left: 30rpx;
        font-size: 34rpx;
        background-color: #F43131;
      }
    }

    .liji {
      margin-top: 18px;
      font-size: 0;
      margin: 0 auto;
      display: flex;
      margin-bottom: 15px;
      height: 74rpx;
      line-height: 74rpx;

      .vanButton {
        font-size: 34rpx;
        width: 690rpx;
        margin: 0 auto;
        border-radius: 10px;
        color: #fff;
        text-align: center;
        background-color: #F43131;
      }
    }

    .mbxline {
      width: 100%;
      height: 11px;
      background-color: #f2f2f2;
    }

    .guize {
      .top {
        font-size: 30rpx;
        color: #333333;
        margin-top: 17px;
        margin-left: 18px;
        margin-bottom: 17px;
      }

      .xiang {
        margin-left: 30px;

        .hang {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .img {
            width: 6px;
            height: 11px;
          }

          .spana {
            margin-left: 8px;
            font-size: 24rpx;
            color: #333333;
          }
        }
      }
    }

    .dianzhang {
      font-size: 30rpx;
      color: #333333;
      background-color: #f2f2f2;
      padding: 17px;
    }
  }

  // 查看更多
  .prolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 11px;
    background-color: #f2f2f2;
  }

  .pro-item {
    width: 345rpx;
    margin-bottom: 15px;
    background: #fff;
  }

  .pro-item .img {
    width: 100%;
    height: 345rpx;
  }

  .item-name {
    font-size: 24rpx;
    line-height: 30rpx;
    height: 60rpx;

    padding-left: 11rpx;
    padding-right: 15rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .red {
    color: #F43131;
    font-weight: 700;
  }

  .price {
    margin-top: 10px;
    padding: 0 5px 10px;
  }

  .pricem {
    font-size: 24rpx;
    font-style: normal;
  }

  .n_price {
    color: #ff0000;
    font-size: 34rpx;
  }

  .o_price {
    color: #afafaf;
    font-size: 12px;
    margin-left: 22rpx;
  }
</style>
