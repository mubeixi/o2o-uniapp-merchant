<template>
  <div class="wrap">
    <div :style="{height:systemInfo.statusBarHeight+'px'}"></div>
    <div class="header">
      <div class="left-icon-box">
        <LayoutIcon type="iconshezhi" size="24" color="#333"></LayoutIcon>
        <LayoutIcon class="p-l-10" type="iconicon" size="24" color="#333"
                    @click="$linkTo('/pages/person/DailyCheck')"></LayoutIcon>
      </div>
      <div class="user-msg" v-if="userInfo.Users_ID" @click="$linkTo('/pagesA/user/PersonalMsg')">
        <image :src="userInfo.User_HeadImg" class="avatar"></image>
        <div class="name">{{userInfo.User_NickName}}</div>
      </div>
      <div class="user-msg" v-else @click="$linkTo('/pages/user/login')">
        <image src="/static/home/xianshi.png" class="avatar"></image>
        <div class="name">点击登录</div>
      </div>

    </div>
    <div class="orders flex align-items-center">
      <div class="order-item" @click="goOrder(1)">
        <LayoutIcon type="icondaifukuan" color="#9CA2F9" size="26"></LayoutIcon>
        <div class="order-desc">待付款</div>
      </div>
      <div class="order-item" @click="goOrder(2)">
        <LayoutIcon type="iconfahuotixing" color="#88C79A" size="26"></LayoutIcon>
        <div class="order-desc">待发货</div>
      </div>
      <div class="order-item" @click="goOrder(3)">
        <LayoutIcon type="icondaishouhuo" color="#FDBB59" size="26"></LayoutIcon>
        <div class="order-desc">待收货</div>
      </div>
      <div class="order-item" @click="goOrder(4)">
        <LayoutIcon type="iconpingjia" color="#7DCAF7" size="26"></LayoutIcon>
        <div class="order-desc">待评价</div>
      </div>
    </div>
    <div class="quanyi" @click="$linkTo('/pages/user/EquityCard')">
      <LayoutIcon type="iconquanyi" color="#DA8E4B" size="26" class="v-icon"></LayoutIcon>
      <div class="quanyi-title">超值权益卡</div>
      <div class="quanyi-ad">海量积分赠送·满立减优惠券</div>
      <div class="detail">
        <span>查看详情</span>
        <LayoutIcon type="iconicon-arrow-right" size="12" color="#DA8E4B" display="inline-block"></LayoutIcon>
      </div>
    </div>
    <div class="functions flex flex-justify-between">
      <block v-for="(item,index) of  iconList" :key="index">
        <LayoutFun width="150rpx" :type="item.className" @openNext="openNext" :index="index" :name="item.name"
                   :color="item.color"></LayoutFun>
      </block>
    </div>
    <div class="intro">为你推荐</div>
    <div class="product-list flex">

      <pro-tag
        v-for="(item,idx) in proList"
        :key="idx"
        :pro_src="item.ImgPath"
        :pro_name="item.Products_Name"
        :pro_price="item.Products_PriceX"
        :pro_price_old="item.Products_PriceY"
      />

    </div>
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import LayoutFun from '@/componets/layout-fun/layout-fun'
import ProTag from '@/componets/pro-tag/pro-tag'
import BaseMixin from '@/mixins/BaseMixin'
import {
  getProductList,
} from '@/api/product'
import { getUserInfo } from '@/api/customer'
import {
  mapActions, mapGetters,
} from 'vuex'

export default {
  mixins: [BaseMixin],
  components: {
    LayoutIcon,
    LayoutFun,
    ProTag,
  },
  data () {
    return {
      iconList: [
        {
          className: 'iconpintuan',
          name: '拼团订单',
          color: '#FE7602',
        },
        {
          className: 'iconxianshiqianggou',
          name: '限时折扣单',
          color: '#ADCF81',
        },
        {
          className: 'iconmiaosha',
          name: '秒杀订单',
          color: '#54AEED',
        },
        {
          className: 'iconzengpin',
          name: '我的赠品',
          color: '#E8779F',
        },
        {
          className: 'iconyue',
          name: '余额',
          color: '#69C276',
        },
        {
          className: 'iconjifen',
          name: '积分',
          color: '#52CCCD',
        },
        {
          className: 'iconshoucang18-copy',
          name: '收藏',
          color: '#FF7F79',
        },
        {
          className: 'iconyouhuiquan',
          name: '优惠券',
          color: '#D1BE71',
        },
        {
          className: 'iconrenwu',
          name: '任务中心',
          color: '#54AEED',
        },
        {
          className: 'icondizhi',
          name: '地址管理',
          color: '#E8779F',
        },
        {
          className: 'icontuikuan',
          name: '退款/售后',
          color: '#FE7602',
        },
        {
          className: 'iconfenxiao',
          name: '分销中心',
          color: '#69C276',
        },
      ],
      proList: [],
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters['user/getUserInfo']()
    },
  },
  methods: {
    openNext (index) {
      switch (index) {
        case 6:
          this.$linkTo('/pages/favorite/index')
          break
        case 7:
          this.$linkTo('/pages/user/Coupon')
          break
        case 9:
          this.$linkTo('/pagesA/user/AddressList')
          break
        case 10:
          this.$linkTo('/pagesA/order/RefundList')
          break
      }
    },
    goOrder (index) {
      let url = '/pages/order/OrderList?type=shop&&index=' + index
      this.$linkTo(url)
    },
    async _init_func () {
      this.proList = await getProductList({}, { onlyData: true }).catch(e => {
        throw Error(e.msg || '获取推荐商品信息失败')
      })
    },
    ...mapActions({
      setUserInfo: 'user/setUserInfo',
    }),
  },
  onShow () {
    getUserInfo().then(res => {
      this.setUserInfo(res.data)
    }).catch(err => {
    })
  },
  created () {
    this._init_func()
  },
}
</script>
<style lang="scss" scoped>
  .wrap {
    padding: 30rpx 30rpx 0 30rpx;
    background: #EDF0F5;
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
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
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
    justify-content: space-around;
  }
</style>
