<template>
  <div class="bd" @click="commonClick">
    <div class="search-wrap">
      <icon type="search" size="34rpx" class="search_icon" @click="search"/>
      <input type="text" class="search-input" name="search" v-model="inputValue" @confirm="success"
             confirm-type='search' focus="focus" autofocus="autofocus">
    </div>
    <div class="cate1">
      <block v-for="(item,i) of pro" :key="i">
        <div class="flex flex-vertical-c">
          <div style="width: 80rpx;height: 270rpx;margin-bottom: 20rpx" class="flex flex-justify-c flex-vertical-c" @click="selectItem(item)">
            <layout-icon color="#F43131" size="20" type="iconicon-check" v-if="selectId===item.Products_ID"></layout-icon>
            <layout-icon color="#ccc" size="20" type="iconradio" v-else></layout-icon>
          </div>
          <div class="pro" @click="$toGoodsDetail(item)">
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
        </div>
      </block>

      <div class="defaults" v-if="pro.length<=0">
        <image :src="'/static/client/defaultImg.png'|domain"></image>
      </div>
    </div>

    <div class="submit">
      下一步
    </div>

  </div>
</template>

<script>
import { getProductList } from '@/api/product'
import BaseMixin from '@/mixins/BaseMixin'
import { modal } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
export default {
  mixins: [BaseMixin],
  name: 'ProductApply',
  components: {
    LayoutIcon
  },
  data () {
    return {
      pro: [],
      bid: null,
      page: 1,
      pageSize: 6,
      inputValue: '',
      selectId: '', // 选择的产品id
      selectValue: {}// 选择的产品属性
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
    selectItem (item) {
      this.selectId = item.Products_ID
      this.selectValue = item
    },
    search () {
      this.page = 1
      this.pro = []
      this.getProd()
    },
    async getProd (item) {
      const postData = {
        page: this.page,
        biz_id: this.bid,
        order_temp: 1, // 下单模板商品
        pageSize: this.pageSize,
        Products_Name: this.inputValue
      }
      getProductList(postData).then(res => {
        this.pro = this.pro.concat(res.data)
        // this.pro=res.data;
        this.count = res.totalCount
      }).catch(e => {
      })
    }

  }
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
      //padding: 0 20rpx;
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

  .search-wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30rpx;
    padding: 30rpx 22rpx 46rpx 20rpx;
    box-sizing: border-box;

    .search-input {
      float: left;
      width: 710rpx;
      height: 65rpx;
      line-height: 65rpx;
      border-radius: 10rpx;
      background: #F4F4F4;
      font-size: 26rpx;
      color: #ADADAD;
      padding-left: 40rpx;
      box-sizing: border-box;
    }

    .search_icon {
      position: absolute;
      top: 46rpx;
      right: 61rpx;
    }

    .span {
      font-size: 30rpx;
      color: #333333;
    }
  }
  .submit{
    width: 750rpx;
    height: 86rpx;
    line-height: 86rpx;
    text-align: center;
    line-height: 86rpx;
    background-color: #00A8FF;
    font-size: 36rpx;
    color: #FFFFFF;
    position: fixed;
    left: 0px;
    bottom: 0px;
  }

</style>
