<template>
  <div class="free">
    <div class="free-top">
        <image class="img-full" src="/static/active/bg.png"></image>
        <div class="free-top-title">免单专区</div>
        <div class="free-top-time fz-12">
          活动时间：2020.04.11-2020.04.30
        </div>
        <div class="free-top-active">
            <div class="flex flex-vertical-c fz-14 c3  fz-b m-b-13">
              <layout-icon type="iconshuji" size="17" color="#ff2f32" class="m-r-8"></layout-icon>
              活动须知
            </div>
            <div class="free-top-active-content fz-11 c8">
              <div>
                1、八折优惠，显示会员价的所有商品均可享受八折优惠所有商品
              </div>
              <div>
                2、八折优惠，显示会员价的所有商品均可享受八折优惠所有商品
              </div>
              <div>
                2、八折优惠，显示会员价的所有商品均可享受八折优惠所有商品
              </div>
              <div>
                2、八折优惠，显示会员价的所有商品均可享受八折优惠所有商品
              </div>
            </div>
        </div>
    </div>

    <div class="free-title m-b-18">
      <div class="free-line"></div>
      <span class="fz-16 c3 m-l-10 m-r-10">推荐商品</span>
      <div class="free-line"></div>
    </div>

    <scroll-view class="scroll-view_H  " scroll-x="true" @scroll="scroll" scroll-left="120"  >
      <div  class=" uni-bg-red m-r-10" v-for="(pro,ind) of prod" :key="ind">
        <div class="img-div">
          <image :src="pro.ImgPath" class="img-full"></image>
        </div>
        <div class="pro-title c3 m-t-10 m-b-8">
          {{pro.Products_Name}}
        </div>
        <div class="price flex flex-vertical-c">
            <div class="fz-12">
              ¥ <span class="fz-14 m-l-2">{{pro.Products_PriceX}}</span>
            </div>
            <div class="fz-11 c9 m-l-10">
              ¥{{pro.Products_PriceY}}
            </div>
        </div>
      </div>

    </scroll-view>


    <div class="free-title m-b-18">
      <div class="free-line"></div>
      <span class="fz-16 c3 m-l-10 m-r-10">全部商品</span>
      <div class="free-line"></div>
    </div>


    <div class="free-list flex ">
      <div class="free-list-item " v-for="(item,index) of prodData" :key="index">
        <div class="free-list-item-img m-b-9">
          <image :src="item.ImgPath" class="img-full"></image>
        </div>
        <div class="fz-13 c3 free-list-item-title m-b-10">
          {{item.Products_Name}}
        </div>
        <div class="free-list-item-price flex flex-vertical-c">
          <div class="fz-11">
            ¥ <span class="fz-15 m-l-2">{{item.Products_PriceX}}</span>
          </div>
          <div class="fz-12 c9 m-l-10">
            ¥{{item.Products_PriceY}}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import {getActiveInfo,getProd} from  '@/api/common'

export default {
  name: 'OrderFree',
  components:{LayoutIcon},
  mixins: [BaseMixin],
  data(){
    return {
      prod:[],
      page:1,
      pageSize: 4,
      totalCount:0,
      prodData:[],
    }
  },
  methods:{
    async getList(item){
      let data={
        free_order:1,
        page:this.page,
        pageSize:this.pageSize
      }
      let arr=await getProd(data,{tip:'加载中'}).catch(e=>{throw  Error(e.msg||'获取推荐商品失败')})
      this.totalCount=arr.totalCount
      if(item===1){
        arr.data.map(item=>{
          this.prodData.push(item)
        })
      }else{
        this.prodData=arr.data
      }

    },
    async init(){
      try {
        let active =await getActiveInfo({type:"freeorder"},{onlyData:true,tip:'加载中'}).catch(e=>{throw  Error(e.msg||'获取活动失败')})
        this.prod =await getProd({free_order_recommend:1,page:1,pageSize:999},{onlyData:true,tip:'加载中'}).catch(e=>{throw  Error(e.msg||'获取推荐商品失败')})
        this.getList()
      }catch (e) {

      }
    }
  },
  onShow(){
    this.page=1
    this.init()
  },
  onReachBottom(){
      if(this.prodData.length<this.totalCount){
        this.page++
        this.getList(1)
      }
  }
}
</script>

<style scoped lang="scss">
  .free{
    width: 750rpx;
    overflow-x: hidden;
  }
  .free-top{
    width: 750rpx;
    height: 370rpx;
    position: relative;
    margin-bottom: 196rpx;
    &-title{
      font-size: 21px;
      color: #FFFFFF;
      font-weight: bold;
      position: absolute;
      top:40rpx;
      left: 292rpx;
    }
    &-time{
      width:458rpx;
      height:60rpx;
      line-height: 60rpx;
      border:1px solid rgba(255,255,255,1);
      opacity:0.9;
      text-align: center;
      position: absolute;
      top:120rpx;
      left: 146rpx;
      color: #FFFFFF;
    }
    &-active{
      width:710rpx;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 24rpx 0px rgba(0, 0, 0, 0.23);
      border-radius:14rpx;
      padding: 30rpx;
      box-sizing: border-box;
      position: absolute;
      top:220rpx;
      left: 20rpx;
      &-content{
        line-height: 40rpx;
      }
    }
  }
  .free-title{
    height: 30rpx;
    line-height: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .free-line{
      width:46rpx;
      height:4rpx;
      background:rgba(255,0,0,1);
    }
  }

  .scroll-view_H{
    width: 750rpx;
    height: 330rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    margin-bottom: 70rpx;
    white-space: nowrap;
    .uni-bg-red{
      width: 240rpx;
      height: 330rpx;
      display: inline-block;
      .img-div{
        width: 240rpx;
        height: 240rpx;
      }
      .pro-title{
        width: 240rpx;
        height: 24rpx;
        line-height: 24rpx;
        font-size: 24rpx;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .price{
        color: #f00;
        .fz-11{
          text-decoration:line-through;
        }
      }

    }
  }

  .free-list{
    width: 750rpx;
    padding-left: 20rpx;
    flex-wrap: wrap;
    &-item{
      width: 344rpx;
      margin-right: 20rpx;
      margin-bottom: 40rpx;
      &-img{
        width: 344rpx;
        height: 344rpx;
      }
      &-title{
        width: 344rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        height: 56rpx;
        line-height: 28rpx;
      }
      &-price{
        color: #f00;
        .c9{
          text-decoration: line-through;
        }
      }
    }

  }


</style>
