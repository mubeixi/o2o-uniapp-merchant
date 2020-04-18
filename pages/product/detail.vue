<style lang="scss" scoped>
  .page-wrap{
    background-color: #ffffff;
  }
  .flex-vertical-center{
    align-items: center;
  }
  .end-time{
    width: 750rpx;
    height: 58rpx;
    line-height: 58rpx;
    padding-left: 22rpx;
    box-sizing: border-box;
    font-size: 22rpx;
    background-color: #F2FFFA;
  }

  .end-time-block{
    width:36rpx;
    height:36rpx;
    background:rgba(68,68,68,1);
    border-radius:6rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 36rpx;
    display: inline-block;
    color: #ffffff;
    margin: 0px 4rpx;
  }
  .end-time-day{
    margin: 0px 4rpx;
  }
  .product-price{
    background-color: #ffffff;
    display: flex;
    height: 108rpx;
    width: 750rpx;
    box-sizing: border-box;
    padding-left: 20rpx;
    align-items: center;
    justify-content: space-between;
    color: #ABABAB;
  }
  .product-price-red{
    font-size: 20px;
    color: #F53636;
  }
  .product-price-right{
    width: 168rpx;
    height: 70rpx;
    position: relative;
  }
  .product-share{
    height:20rpx;
    font-size:11px;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:20rpx;
    position: absolute;
    top: 12rpx;
    left: 84rpx;
  }
  .product-title{
    width: 698rpx;
    line-height: 40rpx;
    height: 80rpx;
    padding: 0rpx 30rpx 0rpx 22rpx;
    background-color: #ffffff;
    color: #333333;
    font-size: 14px;
    font-weight:bold;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .over{
    overflow-x: hidden;overflow-y: scroll;
  }
  .line-f8{
    width:750rpx;
    height:20rpx;
    background:rgba(248,248,248,1);
  }
  .full-img{
    width: 100% !important;
    height: 100% !important;
  }
  .product-price-share{
    font-size: 13px;
    height: 20rpx;
    line-height: 20rpx;
    font-weight:500;
    color:rgba(255,255,255,1);
    position: absolute;
    bottom: 12rpx;
    left: 74rpx;
    .price-q{
      font-size: 10px;
    }
  }
  .product-activity{
    width: 750rpx;
    padding: 30rpx 20rpx 0rpx 20rpx;
    box-sizing: border-box;
  }
  .product-activity-title{
    width: 134rpx;
    height: 34rpx;
    font-size:14px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:30rpx;
  }
  .activity-item{
    width: 104rpx;
    height: 34rpx;
    line-height: 34rpx;
    text-align: center;
    font-size: 9px;
    color: #21B37E;
    margin-right: 20rpx;
    position: relative;
  }
  .activity-img{position: absolute;top: 0;left: 0;width: 104rpx;height: 34rpx}
  .activity-second{
    margin-top: 20rpx;
    .color-first{
      color: #1CA272;
      height:32rpx;
      line-height: 32rpx;
      text-align: center;
      padding: 8rpx;
      background:rgba(235,255,248,1);
      border-radius:3px;
      margin-right: 16rpx;
      font-size: 10px;
    }
    .color-second{
      color: #333333;
      height:22rpx;
      font-size:22rpx;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:22rpx;
    }
  }
  .vip-img{
    width: 710rpx;
    margin: 0 auto;
    height: 96rpx;
  }
  .shouhou{
    width: 750rpx;
    box-sizing: border-box;
    height: 86rpx;
    padding: 30rpx 20rpx;
  }
  .shouhou-item{
    display: flex;
    height: 28rpx;
    align-items: center;
    color: #333333;
    font-size: 12px;
    line-height: 28rpx;
    margin-right: 36rpx;
  }
  .shouhou-img{width: 28rpx;height: 28rpx;margin-right: 10rpx}
  .store{
    position: sticky;
    z-index: 999;
    top: 0;
    width: 750rpx;
    background-color: #ffffff;
    height: 82rpx;
    box-sizing: border-box;
    padding: 26rpx 72rpx;
    justify-content: space-between;
    .li-item{
      width: 60rpx;
      height: 32rpx;
      line-height: 32rpx;
      font-size: 16px;
      color: #333333;
      font-weight:bold;
      position: relative;
    }
    .color-store{
      color: #26C78D;
    }
    .active{
      width:36rpx;
      height:6rpx;
      background:#26C78D;
      border-radius:3px;
      position: absolute;
      left: 12rpx;
      bottom: -24rpx;
    }
  }
  .tab-containers{
    border-top: 1px solid #f1f1f1;
  }
  .store-info{
    width: 750rpx;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 52rpx 20rpx 20rpx 30rpx;
  }
  .store-info-title{
    width:540rpx;
    height:30rpx;
    overflow: hidden;
    line-height: 30rpx;
    font-size:30rpx;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:30rpx;
    margin-bottom: 24rpx;
  }
  .store-info-call{
    height: 28rpx;
    line-height: 28rpx;
    display: flex;
    font-size: 13px;
    color: #999999;
  }
  .store-list{
    width: 710rpx;
    margin: 0 auto;
    padding-top: 30rpx;
    padding-bottom: 10rpx;
  }
  .store-list-top{
    height: 32rpx;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
  }
  .block-div{
    background-color: #26C78D;
    width: 8rpx;
    height: 32rpx;
    margin-right: 16rpx;
    display: inline-block;
  }
  .store-list-item{
    width: 710rpx;
    padding: 30rpx 24rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #EBEBEB;
  }
  .store-list-title{
    width:600rpx;
    height:28px;
    font-size:14px;
    color:rgba(51,51,51,1);
    line-height:28px;
    margin-bottom: 10rpx;
  }
  .isStickly{
    border-bottom: 1px solid #eee;
  }
  .store-list-address{
    width: 100%;
    box-sizing: border-box;
    padding-left: 2rpx;
    height: 34rpx;
    line-height: 34rpx;
    align-items: center;
  }
  .store-list-font{
    color: #999999;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
  }
  .store-su{
    width: 1px;
    height: 34rpx;
    background-color: #EBEBEB;
    margin: 0px 24rpx;
    display: inline-block;
  }
  ul li{
    list-style: none;
  }


</style>

<template>
  <div class="page-wrap">
    <swiper style="height:750rpx;width: 750rpx;" indicator-dots="true"  indicator-active-color="#26C78D" indicator-color="#ffffff" autoplay="true" interval="3000" duration="500" circular="true" >
      <swiper-item v-for="(item,index) of detailData.Products_JSON.ImgPath">
        <image :src="item" class="full-img"/>
      </swiper-item>
    </swiper>
    <div class="end-time">
      距结束还有：<span class="end-time-day">1天</span><span class="end-time-block">01</span>：<span class="end-time-block">01</span>：<span class="end-time-block">01</span>
    </div>
    <div class="product-price fz-14">
      <div class="product-price-left">
            <span class="product-price-red">
              <span class="fz-13">¥</span>{{detailData.Products_PriceX}}
            </span>
        <span style="text-decoration:line-through;" class="m-l-5">
              ¥{{detailData.Products_PriceY}}
            </span>
      </div>
      <div class="product-price-right">
        <image src="/static/product/product_share.png" class="full-img" style="width: 130% !important;"></image>
        <div class="product-share">
          分享赚
        </div>
        <div class="product-price-share">
          <span class="price-q">¥</span>
          28.90
        </div>
      </div>
    </div>
    <div class="product-title">
      {{detailData.Products_Name}}
    </div>
    <div class="line-f8" style="margin-top: 30rpx"></div>
    <div class="product-activity"  v-if="active">
      <div class="flex" style="padding-bottom: 30rpx">
        <div class="product-activity-title">
          优惠活动
        </div>
        <div class="flex1">
          <div class="flex">
            <div class="activity-item"  v-for="(item,index) of active" :key="index">
              <image src="/static/product/activity.png" class="activity-img" ></image>
              满{{item.reach}}减{{item.award}}
            </div>
          </div>
<!--          <div class="flex flex-vertical-center  activity-second">-->
<!--            <div class="color-first">-->
<!--              多买优惠-->
<!--            </div>-->
<!--            <div class="color-second">-->
<!--              满2件打8.8折-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="flex flex-vertical-center  activity-second">-->
<!--            <div class="color-first">-->
<!--              多买优惠-->
<!--            </div>-->
<!--            <div class="color-second">-->
<!--              满2件打8.8折-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>

      <div class="vip-img">
        <image src="/static/product/vip.png" class="full-img"></image>
      </div>

    </div>

    <!-- 服务保障   -->
    <div class="shouhou flex flex-vertical-center" v-if="detailData.Products_Promise.length>0">
      <div class="shouhou-item"  v-for="(item,index) in detailData.Products_Promise" v-if="item.name" :key="index">
        <image src="/static/product/checked.png" class="shouhou-img"></image>
        {{item.name}}
      </div>

    </div>
    <div class="line-f8"></div>
    <!--  店铺信息  -->
    <ul class="store flex flex-vertical-center"  id="tabs"  :class="{isStickly:headTabSticky}">
      <li class="li-item" :class="{'color-store':tabIndex===0}" @click="tabIndex=0">
        介绍
        <span class="active" v-if="tabIndex==0"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===1}" @click="tabIndex=1">
        评价
        <span class="active" v-if="tabIndex==1"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===2}" @click="tabIndex=2">
        须知
        <span class="active" v-if="tabIndex==2"></span>
      </li>
      <li class="li-item" :class="{'color-store':tabIndex===3}" @click="tabIndex=3">
        门店
        <span class="active" v-if="tabIndex==3"></span>
      </li>
    </ul>
    <swiper
      :current="tabIndex"
      :style="{height:(systemInfo.windowHeight+'px')}"
      @change="changeTabIndex"
      class="tab-containers"
    >
      <swiper-item class="tab-pages" >
        <div :style="{height:(systemInfo.windowHeight+'px')}" class="over">
          <u-parse :content="detailData.Products_Description"></u-parse>
        </div>
      </swiper-item>
      <swiper-item class="tab-pages" >
        评价
      </swiper-item>
      <swiper-item class="tab-pages" >
        须知
      </swiper-item>
      <swiper-item class="tab-pages" >
        <div :style="{height:(systemInfo.windowHeight+'px')}" class="over">
          <div class="store-info flex" >
            <div style="width: 96rpx;height: 96rpx;margin-right: 28rpx">
              <image src="https://new401t.bafangka.com/uploadfiles/wkbq6nc2kc/image/202003221654033886.png" class="full-img"></image>
            </div>
            <div>
              <div class="store-info-title">
                肖战甜品屋（文化路店）
              </div>
              <div class="store-info-call m-b-10">
                <icon type="icontime" size="14" color="#999" ></icon>
                <span style="margin: 0rpx 26rpx 0rpx 16rpx">0371-8888888</span>
                <icon type="iconcall" size="14" color="#26C78D"></icon>
              </div>
              <div class="store-info-call">
                <icon type="iconaddress" size="14" color="#999" ></icon>
                <span style="margin: 0rpx 20rpx 0rpx 16rpx">郑州市金水区文化路东风路硅谷广场a座</span>
                <icon type="iconaddress" size="14" color="#26C78D"></icon>
              </div>
            </div>
          </div>
          <div class="line-f8" style="height: 10rpx !important;"></div>
          <div class="store-list">
            <div class="flex flex-justify-between">
              <div class="store-list-top fz-15" style="color: #333333;font-weight: bold">
                <span class="block-div"></span>
                其他门店
              </div>
              <div class="store-list-top">
                12家
                <icon  type="iconright" size="15" color="#999"></icon>
              </div>
            </div>
            <div class="store-list-item">
              <div class="store-list-title">
                肖战甜品屋（东风路店）
              </div>
              <div class="flex flex-justify-between store-list-address">
                <div class="store-list-font">
                  郑州市金水区文化路东风路硅谷广场a座
                </div>
                <div class="flex flex-vertical-center">
                  <icon  type="iconaddress" size="17" color="#26C78D"></icon>
                  <span class="store-su"></span>
                  <icon  type="iconcall" size="17" color="#26C78D"></icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>

    <bottombuy></bottombuy>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import  {getProductDetail,getActiveInfo} from '../../api/product'
import {formatRichTextByUparseFn} from  '../../common/filter'

export default {
  name: 'ProductDetail',
  mixins: [BaseMixin],
  data () {
    return {
      tabIndex: 3,
      headTabSticky: false,
      prod_id:'1613',//商品id
      detailData:{},//商品数据
      active:[],//满减活动列表
    }
  },
  onPageScroll (e) {
    const { scrollTop } = e
    this.headTabSticky = scrollTop > this.headTabTop
  },
  methods: {
    async getProductDetail(){
      let data={
        prod_id:this.prod_id
      }
     this.detailData=await getProductDetail(data,{onlyData: true}).catch(e=>{})
      this.detailData.Products_Description=formatRichTextByUparseFn(this.detailData.Products_Description)

     let res=await  getActiveInfo({biz_id:this.detailData.biz_id,type:'manjian'},{onlyData:true}).catch(e=>{})
      this.active=res.active_info
    },
    changeTabIndex (event) {
      const { current, source } = event.$wx.detail
      this.tabIndex = current
    }
  },
  onShow() {
    this.getProductDetail()
  },
  onLoad(options){
    //this.prod_id=options.prod_id
  },
  onReady () {
    const query = uni.createSelectorQuery().in(this)

    query.select('#tabs').boundingClientRect(data => {
      console.log(data,"sss")
      this.headTabTop = data.top
    }).exec();
  }
}
</script>
