<template>
  <div class="free"  @click="commonClick">
    <div class="top-box" :style="{height:menuButtonInfo.height+menuButtonInfo.top+'px',backgroundImage:'url('+$getDomain('/static/client/active/bg.png')+')'}">
      <div :style="{paddingTop:menuButtonInfo.top+'px'}"></div>
      <div class="flex flex-vertical-c" :style="{height:menuButtonInfo.height+'px'}" style="position: relative">
        <layoutIcon style="position: relative;z-index: 3" @click="$back" class="m-l-15" color="#fff" type="iconicon-arrow-left"></layoutIcon>
        <div class="title fz-b">免单专区</div>
      </div>
    </div>
    <scroll-view scroll-y class="container-wrap" :style="{top:0+'px'}">
      <image class="free-top-bg" mode="widthFix" :src="'/static/client/active/bg.png'|domain"></image>
      <div :style="{height:menuButtonInfo.height+menuButtonInfo.top+10+30+'px'}"></div>
      <div class="free-top-time fz-12">
        活动时间：{{start_time}}-{{end_time}}
      </div>
      <div class="free-top-active">
        <div class="flex flex-vertical-c fz-14 c3  fz-b m-b-13">
          <layout-icon type="iconshuji" size="17" color="#ff2f32" class="m-r-8"></layout-icon>
          活动须知
        </div>
        <div class="free-top-active-content fz-12 c8">
          {{activeInfo.descr||'暂无填写'}}
        </div>
      </div>

      <div class="free-title m-b-18">
        <div class="free-line"></div>
        <span class="fz-16 c3 m-l-10 m-r-10">推荐商品</span>
        <div class="free-line"></div>
      </div>

      <scroll-view class="scroll-view_H  " scroll-x="true" scroll-left="120">
        <div class=" uni-bg-red m-r-10" v-for="(pro,ind) of recommendProdList" :key="ind"  @click="$toGoodsDetail(pro)">
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
        <div class="free-list-item " v-for="(item,index) of prodList" :key="index" @click="$toGoodsDetail(item)">
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

    </scroll-view>
  </div>
</template>

<script>

import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import { getActiveInfo } from '@/api/common'
import {
  getProductList
} from '@/api/product'
import { getBizInfo } from '@/api/store'
import { error, hideLoading, modal, showLoading, toast } from '@/common/fun'
import { Exception } from '@/common/Exception'

export default {
  name: 'OrderFree',
  components: { LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {
      biz_id: null,
      // bizInfo: {},
      postData: {
        page: 1,
        pageSize: 999
      },
      activeId: null,
      start_time: '',
      end_time: '',
      activeInfo: {},
      recommendProdList: [],
      page: 1,
      pageSize: 4,
      totalCount: 0,
      prodList: []
    }
  },
  methods: {
    async getList (item) {
      const data = {
        free_order: 1,
        page: this.page,
        pageSize: this.pageSize
      }
      const arr = await getProductList(data, { tip: '加载中' }).catch(e => {
        throw Error(e.msg || '获取推荐商品失败')
      })
      this.totalCount = arr.totalCount
      if (item === 1) {
        arr.data.map(item => {
          this.prodData.push(item)
        })
      } else {
        this.prodData = arr.data
      }
    },
    async init () {
      try {
        showLoading()
        // this.bizInfo = await getBizInfo({ biz_id: this.biz_id }).then(res=>{
        //   return res.data[0]
        // }).catch(e => {
        //   throw Error(e.msg || '获取商家信息错误')
        // })

        this.activeInfo = await getActiveInfo({ type: 'freeorder', ...this.postData }, {
          onlyData: true
        }).catch(e => {
          throw Error(e.msg || '获取活动失败')
        })

        // php时间戳
        this.start_time = uni.$moment(this.activeInfo.start_time * 1000).format('YYYY.MM.DD')
        this.end_time = uni.$moment(this.activeInfo.end_time * 1000).format('YYYY.MM.DD')

        this.recommendProdList = await getProductList({
          Products_ID: this.activeInfo.active_info.recommend_prod_id
        }, {
          onlyData: true
        }).catch(e => {
          throw Error(e.msg || '获取推荐商品失败')
        })

        this.prodList = await getProductList({
          Products_ID: this.activeInfo.active_info.prod_id
        }, {
          onlyData: true
        }).catch(e => {
          throw Error(e.msg || '获取推荐商品失败')
        })
      } catch (e) {
        error(e.message)
        // 回退一下
        setTimeout(() => {
          this.$back()
        }, 1000)
      } finally {
        hideLoading()
      }
    }
  },
  onLoad (options) {
    const { activeId, biz_id } = options
    // 免单专区不分商家  商家所有的免单产品都在这里面
    // if (!activeId) {
    //   modal('活动id缺失')
    //   return
    // }
    // if (!biz_id) {
    //   modal('商家id缺失')
    //   return
    // }
    this.activeId = activeId
    this.biz_id = biz_id
    this.postData.biz_id = biz_id
  },
  onShow () {
    // this.page = 1
    this.init()
  },
  onReachBottom () {
    // if (this.prodData.length < this.totalCount) {
    //   this.page++
    //   this.getList(1)
    // }
  }
}
</script>

<style scoped lang="scss">
  .free {
    width: 750rpx;
    overflow-x: hidden;
  }

  .top-box {
    z-index: 1;
    width: 750rpx;
    position: fixed;
    top: 0;
    color: #fff;
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding-bottom: 10px;
    .title{
      font-size: 40rpx;
      width: 750rpx;
      position: absolute;
      top: 50%;
      text-align: center;
      transform: translateY(-50%);
    }
  }

  .free-top {

    &-bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 750rpx;
    }

    &-title {
      font-size: 21px;
      color: #FFFFFF;
      font-weight: bold;
      position: absolute;
      top: 40rpx;
      left: 292rpx;
    }

    &-time {
      width: 458rpx;
      height: 60rpx;
      line-height: 60rpx;
      border: 1px solid rgba(255, 255, 255, 1);
      opacity: 0.9;
      text-align: center;
      margin: 0 auto;
      color: #FFFFFF;
    }

    &-active {
      width: 710rpx;
      position: relative;
      z-index: 4;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 24rpx 0px rgba(0, 0, 0, 0.23);
      border-radius: 14rpx;
      padding: 30rpx;
      box-sizing: border-box;
      margin: 40rpx 20rpx;

      &-content {
        line-height: 40rpx;
        word-break: break-all;
      }
    }
  }

  .container-wrap{
    position: fixed;
    width: 750rpx;
    bottom: 0;
  }

  .free-title {
    height: 30rpx;
    line-height: 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .free-line {
      width: 46rpx;
      height: 4rpx;
      background: rgba(255, 0, 0, 1);
    }
  }

  .scroll-view_H {
    width: 750rpx;
    height: 330rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    margin-bottom: 70rpx;
    white-space: nowrap;

    .uni-bg-red {
      width: 240rpx;
      height: 330rpx;
      display: inline-block;

      .img-div {
        width: 240rpx;
        height: 240rpx;
      }

      .pro-title {
        width: 240rpx;
        height: 24rpx;
        line-height: 24rpx;
        font-size: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .price {
        color: #f00;

        .fz-11 {
          text-decoration: line-through;
        }
      }

    }
  }

  .free-list {
    width: 750rpx;
    padding-left: 20rpx;
    flex-wrap: wrap;

    &-item {
      width: 344rpx;
      margin-right: 20rpx;
      margin-bottom: 40rpx;

      &-img {
        width: 344rpx;
        height: 344rpx;
      }

      &-title {
        width: 344rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        height: 56rpx;
        line-height: 28rpx;
      }

      &-price {
        color: #f00;

        .c9 {
          text-decoration: line-through;
        }
      }
    }

  }

</style>
