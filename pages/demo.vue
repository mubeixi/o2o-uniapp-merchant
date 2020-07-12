<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="page-wrap-index"></div>
    <div class="page-wrap-bg"></div>
    <div :style="{marginTop:menuButtonInfo.top+'px',height:menuButtonInfo.bottom-menuButtonInfo.top+'px',linHeight:menuButtonInfo.bottom-menuButtonInfo.top+'px'}"    class="index-title m-b-15">
      及贝
    </div>

    <div class="index-item" v-for="(item,index) of storeList" :key="index">
      <div class="index-item-top flex m-b-20">
            <div class="m-r-14">
              <image :src="item.biz_logo" class="index-item-userAvatar"></image>
            </div>
            <div class="flex1 index-item-info">
                <div  class="info-status flex flex-vertical-c m-b-8" @click="$linkTo('/pages/store/index?biz_id='+item.id)">
                  <div class="fz-18 c1 fz-b info-text m-r-9">
                    {{item.biz_shop_name}}
                  </div>
                  <div class="info-status-img" v-if="item.business_status==1" style="background-color: #26C78D">
                      营业中
                  </div>
                  <div class="info-status-img" v-else>
                      已打烊
                  </div>
                  <div class="flex flex-vertical-c go-store fz-14 c3" >
                    进入
                    <LayoutIcon color="#333333" class="m-l-8" display="inline-block" size="12" type="iconicon-arrow-right"></LayoutIcon>
                  </div>
                </div>
                <div  class="info-coupon  m-b-8" v-if="item.coupon_list&&item.coupon_list.length>0">
                    <div class="info-coupon-item flex m-r-5" v-for="(coupon,couponIndex) of item.coupon_list" :key="couponIndex" @click="getCoupon(coupon,couponIndex,index)">
                      <div class="coupon-money fz-10">
                          {{coupon.Coupon_Cash}}元
                      </div>
                      <div class="coupon-get fz-10">
                          领取
                      </div>
                    </div>
                </div>
                <div  class="manjian" v-if="item.active&&item.active.length>0">
                    <div class="manjian-item m-r-5" v-for="(it,ind) of item.active" :key="ind">
                      满{{it.reach}}减{{it.award}}
                    </div>
                </div>

            </div>
      </div>
      <div class="l-h-80">
          <div class="flex-vertical-c flex" @click="$cellPhone(item.biz_mobile)">
            电话 :{{item.biz_mobile}}
            <LayoutIcon color="#26C78D" class="m-l-8" display="inline-block" size="24" type="icondianhua"></LayoutIcon>
          </div>
          <div class="flex-vertical-c flex" @click="$openLocation(item.biz_lat_gd,item.biz_lon_gd,item.biz_shop_name)">
            <span class="address-span">地址 : {{item.area_address}}{{item.biz_address}}</span>
            <LayoutIcon color="#26C78D" class="m-l-8" display="inline-block" size="24" type="icondizhi"></LayoutIcon>
          </div>
      </div>
      <div class="pro-list flex flex-vertical-c flex-justify-between">
        <div class="pro-list-item">
          <block v-for="(prod,prodIndex) of item.prod" :key="prodIndex">
            <img :src="prod.ImgPath" class="pro-list-item-img"  @click="$toGoodsDetail(prod)">
          </block>
        </div>
        <div class="pro-list-user-info flex flex-vertical-c flex-justify-between">
          <div class="pro-list-user-btn" v-if="item.buy_count>0">
            购买过
          </div>
          <div class="pro-list-user-btn no-border" v-else>
          </div>
          <div class="pro-list-user-btn" v-if="item.view_count>0">
            浏览过
          </div>
          <div class="pro-list-user-btn no-border" v-else>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { getBizInfo } from '@/api/store'
import { error, toast } from '@/common/fun'
import { getUserCoupon } from '@/api/customer'
import { checkIsLogin } from '@/common/helper'
import Promisify from '@/common/Promisify'
export default {
  name: 'liveList',
  components: { WzwImTip, LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {
      storeList: [],
      page: 1,
      pageSize: 6,
      totalCount: 0
    }
  },
  methods: {
    getCoupon (coupon, idx, index) {
      if (!checkIsLogin(1, 1)) return
      console.log(coupon)
      getUserCoupon({ coupon_id: coupon.Coupon_ID }).then(() => {
        toast('领取成功')
        this.storeList[index].coupon_list.splice(idx, 1)
      }).catch((err) => {
        error(err.msg)
      })
    },
    async _init_func () {
      const postData = {
        page: this.page,
        pageSize: this.pageSize,
        get_prod: 4,
        get_active: 1,
        get_coupon: 1,
        view_buy: 1
      }
      const bizList = await getBizInfo(postData, { tip: '加载中' }).catch(e => {
        error(e.msg || '获取列表失败')
      })
      this.totalCount = bizList.totalCount
      if (bizList.data.length < 1) return
      bizList.data.map(item => {
        this.storeList.push(item)
      })
    },
    getUserLocation () {
      uni.getLocation({
        type: 'wgs84',
        success: (res) => {
          console.log('当前位置的经度：' + res.longitude)
          console.log('当前位置的纬度：' + res.latitude)
        }
      })
    }
  },
  onLoad () {
    this._init_func()
  },
  onShow () {
    // 获取定位
    // Promisify('authorize', { scope: 'scope.userLocation' }).then(() => {
    //   this.getUserLocation()
    // }).catch(() => {
    // })
  },
  onReachBottom () {
    if (this.totalCount > this.storeList.length) {
      this.page++
      this._init_func()
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-wrap{
    //background-color: #f7f7f7;
  }
.page-wrap-index{
  width: 1700rpx;
  height: 1500rpx;
  background-color: #1DCA8B;
  border-radius: 50%;
  position: absolute;
  top: -1080rpx;
  left: -640rpx;
  z-index: -1;
}
.page-wrap-bg{
  width: 750rpx;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
  background-color: #f7f7f7;
}
  .index-title{
    width: 750rpx;
    text-align: center;
    font-size: 36rpx;
    color: #FFFFff;
  }
  .index-item{
    width:710rpx;
    //height:448rpx;
    background:rgba(255,255,255,1);
    border-radius:10rpx;
    margin: 0 auto 30rpx;
    box-sizing: border-box;
    padding: 20rpx 20rpx 30rpx 20rpx;

    &-top{
      width: 670rpx;
      padding-left: 4rpx;
    }

    &-userAvatar{
      display: inline-block;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    &-info{
      padding-top: 2rpx;
      box-sizing: border-box;
    }

  }
  .info-status{
    height: 36rpx;
  }
  .info-text{
    max-height: 300rpx;
    overflow-x: hidden;
  }
  .info-status-img{
    width:64rpx;
    height:24rpx;
    line-height: 24rpx;
    font-size: 16rpx;
    text-align: center;
    color: #FFFFff;
    background:rgba(213,213,213,1);
    border-radius:20rpx 0px 20rpx 0px;
  }
  .go-store{
    height: 36rpx;
    line-height: 36rpx;
    margin-left: auto;
  }

  .info-coupon{
    height: 34rpx;
    overflow-x: scroll;
    display: flex;
    width: 540rpx;
    &-item{
      //display: inline-block;
      //width: auto;
      min-width: 140rpx;
    }
    .coupon-get{
      height: 34rpx;
      width: 66rpx;
      line-height: 34rpx;
      background-image: url("/static/jibeiCoupon.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-sizing: border-box;
      padding-left: 20rpx;
      color: #FFFFff;
      display: inline-block;
    }
    .coupon-money{
      padding: 0rpx 12rpx;
      color: #FFFFff;
      background-color: #FF7F78;
      text-align: center;
      height: 34rpx;
      display: inline-block;
      line-height: 34rpx;
      border-radius: 6rpx;
    }
  }

  .manjian{
    width: 100%;
    height: 30rpx;
    display: flex;
    overflow-x: scroll;
    &-item{
      //display: inline-block;
      //width: auto;
      //width: 110rpx;
      text-align: center;
      box-sizing: border-box;
      padding: 0rpx 10rpx;
      font-size: 18rpx;
      color: #FF3000;
      height: 30rpx;
      border-radius: 6rpx;
      border: 1px solid #FF3000;
    }
  }
  .l-h-80{
    line-height: 80rpx;
  }
  .address-span{
    max-width: 600rpx;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }

  .pro-list{
    height: 90rpx;
    width:670rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pro-list-item{
    width: 410rpx;
    display: flex;
    //justify-content: space-around;
  }
  .pro-list-item-img{
    width: 90rpx;
    height: 90rpx;
    display: inline-block;
    margin-right: 20rpx;
    &:last-child{
      margin-right: 0rpx;
    }
  }

  .pro-list-user-info{
        height: 90rpx;
        width: 206rpx;
  }
  .pro-list-user-btn{
    width:100rpx;
    height:42rpx;
    background:rgba(255,242,238,1);
    border-radius:20rpx;
    line-height: 42rpx;
    text-align: center;
    font-size: 24rpx;
    color: #DA2627;
  }
  .no-border{
    border: 0px !important;
    background-color: #FFFFff;
  }
</style>
