<template>
  <view @click="commonClick" class="wrap">
      <wzw-im-tip ref="wzwImTip"></wzw-im-tip>

    <div class="wrap-item" @click.stop="goVipList(item)"    :style="{backgroundImage: 'url('+$getDomain('/static/client/storeVipListBg.png')+')'}"  v-for="(item,index) of userVipList" :key="index">

      <div class="money-btn"  :class="item.arr.length<=0?'lastPos':''" @click.stop="goBanlance(item.biz_id,item.biz_user_money)" v-if="initData.cash_from==2">
        查看资金流水
      </div>

      <div class="wrap-item-info flex flex-vertical-c">
        <img :src="item.biz_logo" class="wrap-item-info-img"/>
        <span class="m-l-7">{{item.biz_shop_name}}</span>
        <div class="level-name">
          <img src="/static/storeVipIcon.png" class="vip-icon">
          <span>{{item.level_name}}</span>
        </div>
      </div>

      <div class="wrap-item-money flex flex-vertical-c m-b-15"  v-if="initData.cash_from==2">
          <div class="m-r-15">
            <span class="fz-13">余额：</span>
            <span class="fz-11">¥</span>
            <span class="fz-18">{{item.biz_user_money}}</span>
          </div>
          <div class="wrap-item-money-btn" @click.stop="chongzhiFn(item.biz_id,item.biz_user_money)">
            充值
          </div>
      </div>

      <div class="flex wrap-item-content" v-if="item.arr.length>0">
        <div class="fz-12">
          权益：
        </div>
        <div class="fz-10"  >
         <block v-for="(it,ind) of item.arr" :key="ind">
           <div v-if="it.name=='消费折扣'">
             {{ind+1}}. 享受全店商品{{it.value}}折优惠
           </div>
           <div  v-if="it.name=='包邮'&&it.value==1">
             {{ind+1}}. 所有商品一件包邮
           </div>
           <div  v-if="it.name=='赠送余额'">
             {{ind+1}}. 该会员卡赠送余额{{item.value}}元
           </div>
         </block>
        </div>

      </div>

    </div>

	<div class="defaults" v-if="userVipList.length<=0">
	  <image :src="'/static/client/empty.png'|domain"></image>
	</div>

  </view>
</template>

<script>
import { getBizUserList } from '@/api/customer'
import LayoutIcon from '@/components/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import { error } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip
  },
  data () {
    return {
      page: 1,
      pageSize: 6,
      totalCount: 0,
      userVipList: []
    }
  },
  onShow () {
    this.page = 1
    this.userVipList = []
    this.initFn()
  },
  computed: {
    initData () {
      return this.$store.state.system.initData
    }
  },
  methods: {
    goVipList (item) {
      this.$linkTo('/pagesA/user/VipList?bid=' + item.biz_id)
    },
    chongzhiFn (bid, money) {
      this.$linkTo('/pagesA/user/BalanceRecharge?biz_id=' + bid + '&bizMoney=' + money)
    },
    goBanlance (bid, money) {
      this.$linkTo('/pagesA/user/StoreBalanceCenter?biz_id=' + bid + '&bizMoney=' + money)
    },
    async initFn () {
      const postData = {

      }
      const vipList = await getBizUserList(postData, { tip: '加载中' }).catch(e => {
        error(e.msg || '获取会员列表失败')
      })
      this.totalCount = vipList.totalCount
      vipList.data.map(item => {
        const arr = []
        for (const it in item.basic_rights) {
          if (item.basic_rights[it].value > 0) {
            arr.push(item.basic_rights[it])
          }
        }
        item.arr = arr
        this.userVipList.push(item)
      })
    }

  },
  onReachBottom () {
    if (this.totalCount > this.userVipList.length) {
      this.page++
      this.initFn()
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap{
    background-color: #FFFFff;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: 40rpx;
    color: #FFFFff;
  }
  .wrap-item{
    width: 700rpx;
    height: 360rpx;
    margin: 0 auto 30rpx;
    border-radius: 20rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    padding: 26rpx 38rpx  20rpx 50rpx;
    position: relative;

    &-info{
      height: 70rpx;
      width: 100%;
      overflow-x: hidden;
      margin-bottom: 26rpx;
      .m-l-7{
        font-size:32rpx;
        width: 240rpx;
      }
      &-img{
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
      }
    }

    &-money{
      width: 100%;
      overflow-x: hidden;
      height: 48rpx;
      &-btn{
        width: 80rpx;
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        color: #181B1B;
        font-size: 24rpx;
        background:rgba(255,251,238,1);
        box-shadow:0px 4rpx 8rpx 0px rgba(217,167,53,0.33);
        border-radius:6rpx;
      }
    }

    &-content{
      width: 430rpx;
      .fz-12{
        /*width: 120rpx;*/
      }
      .fz-10{
        width: 310rpx;
        line-height: 36rpx;
      }

    }

  }
  .money-btn{
    width:170rpx;
    height:50rpx;
    border:1px solid rgba(255,255,255,1);
    border-radius:26rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 22rpx;
    position: absolute;
    top: 182rpx;
    right: 38rpx;
  }

  .vip-icon{
    width: 30rpx;
    height: 30rpx;
    display: inline-block;
    margin-right: 5px;
  }
  .level-name{
    margin-left: auto;
    width: 280rpx;
    overflow-x: hidden;
    color: #C1A272;
    font-size: 12px;
    text-align:right;
  }
  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
  .lastPos{
    top: 220rpx !important;
    left: 60rpx !important;
  }
</style>
