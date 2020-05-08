<template>
  <div class="bd">
    <div class="cate1">
      <div class="pro" @click="$toGoodsDetail(item)" v-for="(item,i) of pro" :key="i">
        <image :src="item.ImgPath" class="pro-img"></image>
        <div class="pro_desc">
          <div class="title">{{item.Products_Name}}</div>
          <div class="price">
            <span class="n_price"><text>￥</text>{{item.Products_PriceX}}</span>
            <span class="o_price" v-if="item.Products_PriceY!==item.Products_PriceX"><text>￥</text>{{item.Products_PriceY}}</span>
          </div>
          <div class="sold">已售{{item.Products_Sales}}件</div>
        </div>
      </div>
      <div class="defaults" v-if="pro.length<=0">
        <image :src="'/static/client/defaultImg.png'|domain"></image>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api/product'
import BaseMixin from '@/mixins/BaseMixin'
import { modal } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  name: 'ProductApply',
  data () {
    return {
      pro: [],
      bid: null,
      page: 1,
      pageSize: 6,
    }
  },
  onLoad: function (options) {
    if (!options.bid) {
      modal('店铺id缺失')
      return
    }
    this.bid = options.bid
    
    this.getProd()
  },
  onShow () {
  
  },
  onReachBottom () {
    if (this.pro.length < this.count) {
      this.page++
      this.getProd(this.orderby)
    }
  },
  
  created () {
  
  },
  methods: {
    async getProd (item) {
      const postData = {
        page: this.page,
        biz_id: this.bid,
        order_temp: 1, // 下单模板商品
        pageSize: this.pageSize,
      }
      getProductList(postData).then(res => {
        this.pro = this.pro.concat(res.data)
        // this.pro=res.data;
        this.count = res.totalCount
      }).catch(e => {
      })
    },
    
  },
}
</script>
<style lang="scss" scoped>
  .bd {
    min-height: 100vh;
    width: 750rpx;
    overflow: hidden;
    background: white;
  }
  
  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
  
  .cate1 {
    .pro {
      display: flex;
      padding: 0 20rpx;
      margin-bottom: 20rpx;
      
      .pro-img {
        margin-right: 20rpx;
        width: 270rpx;
        height: 270rpx;
      }
      
      .pro_desc {
        flex: 1;
        padding-top: 29rpx;
        text-align: left;
        
        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 24rpx;
          line-height: 30rpx;
          height: 60rpx;
        }
        
        .price {
          margin-top: 21rpx;
        }
        
        .price .text {
          font-size: 24rpx;
          font-style: normal;
        }
        
        .n_price {
          color: #F43131;
          font-size: 36rpx;
          margin-right: 10rpx;
        }
        
        .o_price {
          color: #afafaf;
          font-size: 28rpx;
          text-decoration: line-through;
        }
        
        .sold {
          color: #666;
          font-size: 19rpx;
          margin-top: 40rpx;
        }
      }
    }
  }
  
  .imgm {
    width: 36rpx;
    height: 34rpx;
  }

</style>
