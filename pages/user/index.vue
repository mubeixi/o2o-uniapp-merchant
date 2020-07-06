<template>
  <div @click="commonClick" class="wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div :style="{height:systemInfo.statusBarHeight+'px'}"></div>
    <div :style="{height:diyHeadHeight+'px',opacity:activeHeadOpacity}" class="bg-white" style="position: fixed;z-index: 2;width: 750rpx;left:0;top:0"
         v-if="activeHeadOpacity">
      <div :style="{height:systemInfo.statusBarHeight+'px'}"></div>
      <div :style="{height:menuButtonInfo.height+'px',lineHeight:menuButtonInfo.height+'px'}" class="c3 text-center">
        个人中心
      </div>
    </div>

    <div class="header">
      <div :style="{top:menuButtonInfo.top+'px',height:menuButtonInfo.height+'px'}" class="left-icon-box">
        <!--:plain="false" :wrap-bg="activeHeadOpacity===1?'#f2f2f2':'none'" wrap-padding="6px"-->
        <layout-icon @click="goSetting" color="#333" size="24" type="iconshezhi"></layout-icon>
        <layout-icon @click="goDailyCheck" class="p-l-10" color="#333" size="24" type="iconicon"></layout-icon>
      </div>
      <div @click="$linkTo('/pagesA/user/PersonalMsg')" class="user-msg" v-if="userInfo.Users_ID">
        <image :src="userInfo.User_HeadImg" class="avatar"></image>
        <div class="name">{{userInfo.User_NickName}}</div>
      </div>
      <div @click="$linkTo('/pages/user/login')" class="user-msg" v-else>
        <image :src="'/static/client/home/xianshi.png'|domain" class="avatar"></image>
        <div class="name">点击登录</div>
      </div>
    </div>
    <div class="orders flex align-items-center">
      <div @click="goOrder(1)" class="order-item">
        <LayoutIcon color="#9CA2F9" size="26" type="icondaifukuan"></LayoutIcon>
        <div class="order-desc">待付款</div>
        <div class="jiaobiao" v-if="userInfo.Users_ID && orderNum.waitpay">{{orderNum.waitpay}}</div>
      </div>
      <div @click="goOrder(2)" class="order-item">
        <LayoutIcon color="#88C79A" size="26" type="iconfahuotixing"></LayoutIcon>
        <div class="order-desc">待发货</div>
        <div class="jiaobiao" v-if="userInfo.Users_ID && orderNum.waitsend">{{orderNum.waitsend}}</div>
      </div>
      <div @click="goOrder(3)" class="order-item">
        <LayoutIcon color="#FDBB59" size="26" type="icondaishouhuo"></LayoutIcon>
        <div class="order-desc">待收货</div>
        <div class="jiaobiao" v-if="userInfo.Users_ID && orderNum.waitconfirm">{{orderNum.waitconfirm}}</div>
      </div>
      <div @click="goOrder(4)" class="order-item">
        <LayoutIcon color="#7DCAF7" size="26" type="iconpingjia"></LayoutIcon>
        <div class="order-desc">待评价</div>
        <div class="jiaobiao" v-if="userInfo.Users_ID && orderNum.waitcomment">{{orderNum.waitcomment}}</div>
      </div>
    </div>
    <div @click="$linkTo('/pagesA/user/EquityCard')" class="quanyi" v-if="cardList.length>0">
      <LayoutIcon class="v-icon" color="#DA8E4B" size="26" type="iconquanyi"></LayoutIcon>
      <div class="quanyi-title">超值权益卡</div>
      <div class="quanyi-ad">海量积分赠送·满立减优惠券</div>
      <div class="detail">
        <span>查看详情</span>
        <LayoutIcon color="#DA8E4B" display="inline-block" size="12" type="iconicon-arrow-right"></LayoutIcon>
      </div>
    </div>
    <div class="functions flex">
      <block :key="index" v-for="(item,index) of  iconList">
        <LayoutFun :color="item.color" :index="index" :name="item.name" :type="item.className" @openNext="openNext"
                   width="150rpx"></LayoutFun>
      </block>
    </div>
    <div class="intro">为你推荐</div>
    <div class="product-list flex">

      <pro-tag
        :index="idx"
        :key="idx"
        :product-info="item"
        :pro_name="item.Products_Name"
        :pro_price="item.Products_PriceX"
        :pro_price_old="item.Products_PriceY"
        :pro_src="item.ImgPath"
        :prod_id="item.Products_ID"
        v-for="(item,idx) in proList"
      />

    </div>

    <div class="safearea-box"></div>

  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutFun from '@/componets/layout-fun/layout-fun'
import ProTag from '@/componets/pro-tag/pro-tag'
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import { checkIsLogin } from '@/common/helper'
import { getProductList } from '@/api/product'
import { getOrderNum } from '@/api/order'
import { getRightsCard, getUserInfo } from '@/api/customer'
import { mapActions } from 'vuex'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import eventHub from '@/common/eventHub'
import { error } from '@/common/fun'

export default {
  mixins: [BaseMixin, tabbarMixin],
  components: {

    WzwImTip,
    LayoutIcon,
    LayoutFun,
    ProTag
  },
  data () {
    return {
      cardList: [],
      activeHeadOpacity: 0,
      orderNum: {},
      productTotal: 0,
      page: 1,
      iconList: [
        {
          className: 'iconpintuan',
          name: '拼团订单',
          color: '#FE7602',
          link: '/pages/order/OrderList?type=pintuan'
        },
        {
          className: 'iconxianshiqianggou',
          name: '限时折扣单',
          color: '#ADCF81',
          link: '/pages/order/OrderList?type=spike'
        },
        {
          className: 'iconmiaosha',
          name: '秒杀订单',
          color: '#54AEED',
          link: '/pages/order/OrderList?type=flashsale'
        },
        // {
        //   className: 'iconwaimai',
        //   name: '外卖订单',
        //   color: '#f4ea2a',
        //   link: '/pages/order/OrderList?type=waimai'
        // },
        {
          className: 'iconzengpin',
          name: '我的赠品',
          color: '#E8779F',
          link: '/pagesA/user/MyGift'
        },
        {
          className: 'iconyue',
          name: '余额',
          color: '#69C276',
          link: '/pagesA/user/BalanceCenter'
        },
        {
          className: 'iconjifen',
          name: '积分',
          color: '#52CCCD',
          link: '/pagesA/user/IntegralCenter'
        },
        {
          className: 'iconshoucang18-copy',
          name: '收藏',
          color: '#FF7F79',
          link: '/pages/favorite/index'
        },
        {
          className: 'iconyouhuiquan',
          name: '优惠券',
          color: '#D1BE71',
          link: '/pagesA/user/Coupon'
        },
        {
          className: 'iconrenwu',
          name: '任务中心',
          color: '#54AEED',
          link: '/pagesA/user/TaskCenter'
        },
        {
          className: 'icondizhi',
          name: '地址管理',
          color: '#E8779F',
          link: '/pagesA/user/AddressList'
        },
        {
          className: 'icontuikuan',
          name: '退款/售后',
          color: '#FE7602',
          link: '/pagesA/order/RefundList'
        },
        {
          className: 'iconfenxiao',
          name: '分销中心',
          color: '#69C276',
          link: '/pagesA/distributor/Main'
        },
        {
          className: 'iconguiji',
          name: '轨迹',
          color: '#69C276',
          link: '/pagesA/user/history'
        },
        {
          className: 'iconhuiyuanka',
          name: '会员卡',
          color: '#54AEED',
          link: '/pagesA/user/history'
        }
      ],
      proList: []
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    }
  },
  methods: {
    async init () {
      const arr = await getRightsCard({ status: 1 }, {
        onlyData: true,
        tip: '加载中'
      }).catch(e => {
        error(e.msg || '获取权益卡错误')
      })
      this.cardList = arr
    },
    goDailyCheck () {
      if (!checkIsLogin(1, 1)) return
      this.$linkTo('/pagesA/user/DailyCheck')
    },
    goSetting () {
      if (!checkIsLogin(1, 1)) return
      this.$linkTo('/pagesA/user/EditAccount')
    },
    openNext (index) {
      if (!checkIsLogin(1, 1)) return
      this.$linkTo(this.iconList[index].link)
    },
    goOrder (index) {
      if (!checkIsLogin(1, 1)) return
      const url = '/pages/order/OrderList?type=shop&&index=' + index
      this.$linkTo(url)
    },
    async _init_func () {
      const { data, totalCount } = await getProductList({}).catch(e => {
        throw Error(e.msg || '获取推荐商品信息失败')
      })

      this.proList = data
      this.productTotal = totalCount
      this.page++
    },
    // 获取订单角标数
    getOrderNum () {
      getOrderNum({ Order_Type: 'shop' }).then(res => {
        this.orderNum = res.data
      }).catch(e => {
      })
    },
    ...mapActions({
      setUserInfo: 'user/setUserInfo'
    })
  },
  onPageScroll (e) {
    const { scrollTop } = e
    const h = this.diyHeadHeight + 20 // 滑到这里的时候,就透明度为1
    const opacity = scrollTop / h
    this.activeHeadOpacity = opacity > 1 ? 1 : opacity
  },
  onShow () {
    this.setTabBarIndex(4)
    this.$store.dispatch('system/setTabActiveIdx', 4)
    this.refreshTabTag()

    this.init()
    if (this.userInfo.Users_ID) {
      getUserInfo().then(res => {
        this.setUserInfo(res.data)
      }).catch(err => {
      })
      this.getOrderNum()
    }
  },
  async onReachBottom () {
    if (this.proList.length >= this.productTotal) {
      // error('到底了')
      return
    }
    const proList = await getProductList({ page: this.page }, { onlyData: true }).catch(e => {
      throw Error(e.msg || '获取推荐商品信息失败')
    })

    this.page++
    this.proList = this.proList.concat(proList)
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 0rpx 30rpx 48px 30rpx;
    background: #EDF0F5;
    width: 750rpx;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  .flex {
    display: flex;
  }

  .align-items-center {
    align-items: center;
  }

  .header {
    position: relative;

    .left-icon-box {
      position: fixed;
      left: 30rpx;
      display: flex;
      align-items: center;
      z-index: 3;
    }

    .user-msg {
      text-align: center;

      .avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
      }

      .name {
        font-size: 32rpx;
        color: #333;
        font-weight: 700;
      }
    }
  }

  .orders {
    width: 690rpx;
    height: 210rpx;
    background: #fff;
    margin-top: 40rpx;
    border-radius: 10rpx;
    justify-content: space-around;

    .order-item {
      text-align: center;
      font-size: 28rpx;
      color: #333;
      position: relative;

      .order-desc {
        margin-top: 22rpx;
      }
    }
  }

  .quanyi {
    position: relative;
    width: 690rpx;
    height: 130rpx;
    margin-top: 40rpx;
    border-radius: 10rpx;
    background: #000;

    .v-icon {
      position: absolute;
      top: 23rpx;
      left: 38rpx;
    }

    .quanyi-title {
      position: absolute;
      left: 101rpx;
      top: 29rpx;
      font-size: 32rpx;
      color: #DA8E4B;
    }

    .quanyi-ad {
      position: absolute;
      top: 79rpx;
      left: 100rpx;
      color: #fff;
      font-size: 22rpx;
    }

    .detail {
      position: absolute;
      top: 39rpx;
      right: 27rpx;
      border: 1px solid #DA8E4B;
      border-radius: 23rpx;
      color: #DA8E4B;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 46rpx;
      padding: 0 10rpx;
    }
  }

  .functions {
    background-color: #fff;
    flex-wrap: wrap;
    padding: 60rpx 40rpx 0;
    margin-top: 40rpx;
  }

  .intro {
    text-align: center;
    margin: 60rpx 0 32rpx;
    font-size: 34rpx;
  }

  .product-list {
    flex-wrap: wrap;
    margin: 0 10rpx;
  }

  .jiaobiao {
    position: absolute;
    top: 0rpx;
    right: 10rpx;
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
    background-color: #FFFFFF;
    border: 1px solid #F43131;
    font-size: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F43131;
  }
</style>
