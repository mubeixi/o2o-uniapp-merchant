<template>
  <div @click="commonClick" class="bd">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="cate2">
      <div :key="i" @click="$toGoodsDetail(item)" class="pro" v-for="(item,i) of pro">
        <image :src="item.ImgPath" alt="" class="pro-img"></image>
        <div class="pro_desc">
          <div class="title"><wzw-live-tag :room_id="item.room_id" :product-info="item"></wzw-live-tag>{{item.Products_Name}}</div>
          <div class="price">
            <span class="n_price"><text class="text">￥</text>{{item.Products_PriceX}}</span>
            <span class="o_price"><text class="text" v-if="item.Products_PriceY!==item.Products_PriceX">￥</text>{{item.Products_PriceY}}</span>
          </div>
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
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import WzwLiveTag from '@/components/wzw-live-tag/wzw-live-tag'
import { error } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  name: 'SearchResult',
  components: {
    WzwLiveTag,
    WzwImTip
  },
  data () {
    return {
      active: 0,
      cate: 2,
      inputValue: '',
      pro: [],
      page: 1,
      pageSize: 6,
      orderby: '',
      searchAll: [], // 搜索历史
      showShai: false,
      maxPrice: '', // 筛选最高价
      minPrice: '', // 筛选最低价
      isShipping: 0, // 是否包邮
      Cate_ID: 0, // 列表id
      isSheng: 0, // 是否升序
      Products_ID: '',
      refer: '', // 来源
      oneHourSend: 0,
      lat: '',
      lng: '',
      biz_ids: ''
    }
  },
  onLoad (option) {
    if (option.biz_id) {
      this.biz_ids = option.biz_id
    } else {
      error('店铺id必传')
    }
  },
  onPullDownRefresh () {
    this.active = 0
    this.cate = 2
    this.pro = []
    this.page = 1
    this.getProd(this.orderby)
  },
  onShow () {
    if (this.biz_ids) {
      this.pro = []
      this.page = 1
      this.getProd()
    }
  },
  onReachBottom () {
    if (this.pro.length < this.count) {
      this.page++
      this.getProd(this.orderby)
    }
  },
  methods: {
    goBack () {
      this.$back()
    },
    success () {
      this.pro = []
      this.page = 1
      this.getProd(this.orderby)
      if (this.inputValue !== '') { // 输入框的值不为空时
        const than = this
        for (var item of this.searchAll) {
          if (item === this.inputValue) return
        }
        this.searchAll.push(this.inputValue) // 将输入框的值添加到搜索记录数组中存储
        uni.setStorage({
          key: 'searchAll',
          data: than.searchAll
        })
      }
    },
    getProd (item) {
      const data = {
        prod_order_type: 1,
        page: this.page,
        pageSize: this.pageSize
      }

      if (this.biz_ids) {
        data.biz_ids = this.biz_ids
      }
      getProductList(data).then(res => {
        for (var item of res.data) {
          this.pro.push(item)
        }
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

  .top {
    position: relative;
    display: flex;
    align-items: center;
    padding: 30rpx 20rpx 0;
    box-sizing: border-box;
    position: fixed;
    left: 0rpx;
    top: 0rpx;
    background-color: #FFFFFF;
    z-index: 99;

    .search_icon {
      position: absolute;
      top: 46rpx;
      left: 61rpx;
    }

    .back {
      width: 23rpx;
      height: 37rpx;
    }

    .search {
      width: 645rpx;
      height: 65rpx;
      line-height: 65rpx;
      background: #F4F4F4;
      padding-left: 39rpx;
      font-size: 26rpx;
      color: #333;
      margin-left: 41rpx;
      box-sizing: border-box;
    }

    .searchs {
      width: 710rpx;
      height: 65rpx;
      line-height: 65rpx;
      background: #F4F4F4;
      padding-left: 80rpx;
      font-size: 26rpx;
      color: #333;
      box-sizing: border-box;
    }

    .clear {
      position: absolute;
      top: 43rpx;
      right: 48rpx;
      width: 37rpx;
      height: 37rpx;
      z-index: 9999;
    }

    .clears {
      width: 37rpx;
      height: 37rpx;
    }
  }

  .tabs {
    display: flex;
    font-size: 30rpx;
    // justify-content: space-around;
    padding: 0 20rpx;
    padding-top: 25rpx;
    color: #333;
    position: relative;
    height: 115rpx;
    align-content: center;
    position: fixed;
    top: 94rpx;
    left: 0rpx;
    background-color: #FFFFFF;
    z-index: 99;
    width: 100%;
    box-sizing: border-box;
  }

  .tab.checked {
    color: #F43131;
  }

  .tab.checked .line {
    background: #F43131;
  }

  .tab {
    flex: 1;
    //width: 180rpx;
    /*width: 180rpx;*/
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    margin-bottom: 20rpx;
    position: relative;

    .line {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    &.pricebox {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &.filterbox {
      display: flex;
      align-items: center;
      justify-content: center;

      .filter {
        display: block;
        line-height: 60rpx;
        //padding-right: 6px;
        margin-right: 20px;
      }

    }

  }

  .tab .sorttype {

    height: 34rpx;
    width: 40rpx;
    //margin-left: 10rpx;
    //vertical-align: middle;
  }

  .tab .line {
    width: 100rpx;
    height: 4rpx;
    bottom: -20rpx;
    //margin: 20rpx auto 0 ;
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

  .cate2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    flex-wrap: wrap;

    .pro {
      width: 345rpx;

      .pro-img {
        width: 100%;
        height: 345rpx;
      }

      .pro_desc {
        padding: 17rpx 15rpx 34rpx 11rpx;
        color: #333;
        font-size: 24rpx;

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
          font-size: 20rpx;
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
          font-size: 20rpx;
          margin-top: 40rpx;
        }
      }
    }

  }

  .imgm {
    width: 36rpx;
    height: 34rpx;
  }

  .shaixuan {
    box-sizing: border-box;
    position: absolute;
    top: 210rpx;
    width: 750rpx;
    background-color: #FFFFFF;
    z-index: 999;
    padding-top: 20rpx;
    left: 0rpx;

    view {
      padding-left: 20rpx;
      padding-right: 20rpx;
    }

    .priceInterval {
      font-size: 26rpx;
      color: #999999;
      margin-bottom: 24rpx;
      height: 27rpx;
      line-height: 27rpx;
    }

    .inputPrice {
      display: flex;
      margin-bottom: 50rpx;

      .view {
        width: 29rpx;
        height: 55rpx;
        line-height: 55rpx;
        font-weight: bold;
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin: 0 20rpx;
      }

      input {
        width: 192rpx;
        height: 55rpx;
        background: rgba(245, 245, 245, 1);
        border-radius: 28rpx;
        text-align: center;
      }
    }

    .isShipping {
      display: flex;
      margin-bottom: 100rpx;

      .span {
        width: 110rpx;
        height: 55rpx;
        background: #D6D6D6;
        border-radius: 28rpx;
        display: block;
        line-height: 55rpx;
        text-align: center;
        font-size: 26rpx;
        color: #FFFFFF;
        margin-right: 27rpx;
      }

      .checked {
        background-color: #F43131 !important;
      }
    }

    .submit {
      display: flex;
      width: 100%;
      height: 80rpx;
      padding-left: 0rpx;
      padding-right: 0rpx;

      .view {
        width: 50%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        color: #FFFFFF;
        font-size: 30rpx;
      }

      .reset {
        background-color: #B9B9B9;
      }

      .sure {
        background-color: #F43131;
      }
    }
  }

  .zhao {
    height: 800rpx;
    width: 100%;
    padding-left: 0rpx;
    padding-right: 0rpx;
    //background: rgba(0, 0, 0, .3);
    //position: fixed;
    z-index: 998;
    position: absolute;
    background-color: #000;
    opacity: 0.6;
  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }

  .xiangshang {
    width: 7px;
    height: 12px;

    .image {
      width: 7px;
      height: 4px;
      display: block;

      &:last-child {
        margin-top: 2px;
      }
    }
  }

  .control {
    display: flex;
    width: 100%;
    align-items: center;

    .action-btn {
      flex: 1;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 16px;
      background-color: #FFFFFF;
      border: 0px;
    }

    button::after {
      width: 0;
      height: 0;
    }
  }

  .refuseApplyDialog {
    width: 560rpx;
    box-sizing: border-box;
    padding-left: 40rpx;
    padding-right: 40rpx;

    .modal-title {
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-weight: bold;
    }

    .btn-sub {
      color: #1aac19;
    }

  }
</style>
