<template>
  <div @click="commonClick" class="bd">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    
    <div class="top">
      <icon class="search_icon" size="34rpx" type="search" />
      <input @click="goSearch" class="searchs" disabled type="text" v-model="inputValue" />
      <div class="clear" v-if="inputValue">
        <icon @click="close" class="clears" size="37rpx" type="clear"></icon>
      </div>
    </div>
    <div class="tabs">
      <div :class="[active === 0 ? 'checked' : '','tab']" @click="getActive(0)">默认
        <div class="line"></div>
      </div>
      <div :class="[active === 1 ? 'checked' : '','tab']" @click="getActive(1)">销量
        <div class="line"></div>
      </div>
      <div :class="[active === 2 ? 'checked' : '','tab']" @click="getActive(2)" class="pricebox"><span
        class="padding4-c">价格</span>
        <view class="xiangshang">
          <image :src="'/static/client/result/tops.png'|domain" class="image" v-if="isSheng==1"></image>
          <image :src="'/static/client/result/top.png'|domain" class="image" v-else></image>
          
          <image :src="'/static/client/result/bottoms.png'|domain" class="image" style="bottom: 0rpx;"
                 v-if="isSheng==2"></image>
          <image :src="'/static/client/result/bottom.png'|domain" class="image" style="bottom: 0rpx;" v-else></image>
        </view>
        <div class="line">
        </div>
      </div>
      
      <div :class="[active === 3 ? 'checked' : '','tab']" class="filterbox">
        <div :style="{color:showShai?'#F43131':''}" @click.stop="change" class="filter">筛选</div>
        <template v-show="!showShai">
          <image :src="'/static/client/result/jx1.png'|domain" @click="changeCate" class="imgm sorttype"
                 v-if="cate==2"></image>
          <image :src="'/static/client/result/jx.png'|domain" @click="changeCate" class="imgm sorttype" v-else></image>
        </template>
        
        <div class="line"></div>
      </div>
      <!--position: absolute;top: 25rpx;right: 28rpx;position: absolute;top: 0rpx;right: 0rpx;-->
    
    </div>
    <div @click.stop catchtouchmove="false" class="shaixuan" v-if="showShai">
      <view class="priceInterval">价格区间(元)</view>
      <view class="inputPrice">
        <input placeholder="最低价" placeholder-style="color:#999999;font-size:26rpx;" type="number" v-model="minPrice">
        <view class="view">—</view>
        <input placeholder="最高价" placeholder-style="color:#999999;font-size:26rpx;" type="number" v-model="maxPrice">
      </view>
      <view class="priceInterval">是否包邮</view>
      <view class="isShipping">
        <span :class="isShipping==1?'checked':''" @click="shipping(0)" class="span">是</span>
        <span :class="isShipping==2?'checked':''" @click="shipping(1)" class="span">否</span>
      </view>
      <view class="submit">
        <view @click="reset" class="view reset">重置</view>
        <view @click="sureSearch" class="view sure">确定</view>
      </view>
      <view @click="closeShow" catchtouchmove="false" class="zhao">
      
      </view>
    </div>
    
    <view style="width: 100%;height: 210rpx;background: white;">
    
    </view>
    <div v-if="cate==1">
      <div class="cate1">
        <div :key="i" @click="$toGoodsDetail(item)" class="pro" v-for="(item,i) of pro">
          <image :src="item.ImgPath" class="pro-img"></image>
          <div class="pro_desc">
            <div class="title"><wzw-live-tag :room_id="item.room_id" :product-info="item" />{{item.Products_Name}}</div>
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
    <div v-else>
      <div class="cate2">
        <div :key="i" @click="$toGoodsDetail(item)" class="pro" v-for="(item,i) of pro">
          <image :src="item.ImgPath" alt="" class="pro-img"></image>
          <div class="pro_desc">
            <div class="title">{{item.Products_Name}}</div>
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
    
    <layout-modal :autoClose="false" ref="commentModal">
      <div class="refuseApplyDialog">
        <div class="c3 fz-14 modal-title">
          是否开启定位
        </div>
        <div class="fz-12 m-b-20 m-t-10 c9">
          很抱歉，该功能必须基于地理位置提供商品检索，您需开启地理位置授权才可以使用该功能
        </div>
        <div class="control">
          <button @click="backSetting" class="action-btn btn-cancel">取消</button>
          <button bindopensetting="openSetting" class="btn-sub action-btn" open-type='openSetting'>确定</button>
        </div>
      </div>
    </layout-modal>
  </div>
</template>

<script>
import { getProductList } from '@/api/product'
import BaseMixin from '@/mixins/BaseMixin'
import Storage from '@/common/Storage'
import { getLocation } from '@/common/tool/location'
import { LayoutModal } from '@/componets/layout-modal/layout-modal'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
import WzwLiveTag from '@/componets/wzw-live-tag/wzw-live-tag'

export default {
  mixins: [BaseMixin],
  name: 'SearchResult',
  components: {
    WzwLiveTag,
    WzwImTip,
    LayoutModal,
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
      biz_ids: '',
    }
  },
  onLoad (option) {
    const { refer = '', oneHourSend = 0 } = option
    this.refer = refer
    // 是否是一小时达
    this.oneHourSend = Number(oneHourSend)
    this.inputValue = option.inputValue
    if (option.pid) {
      this.Products_ID = option.pid
    }
    if (option.biz_id) {
      this.biz_ids = option.biz_id
    }
    this.Cate_ID = option.Cate_ID
    this.searchAll = Storage.get('searchAll')
    // this.getProd()
  },
  onPullDownRefresh () {
    this.active = 0
    this.cate = 2
    this.pro = []
    this.page = 1
    this.getProd(this.orderby)
  },
  onShow () {
    this.$refs.commentModal.close()
    this.pro = []
    this.page = 1
    this.init()
  },
  onReachBottom () {
    if (this.pro.length < this.count) {
      this.page++
      this.getProd(this.orderby)
    }
  },
  methods: {
    backSetting () {
      this.$refs.commentModal.close()
      this.$back()
    },
    openSetting () {
      this.$refs.commentModal.close()
      // #ifdef H5
      uni.openSetting({
        success (res) {
          if (res.authSetting['scope.userLocation']) {
            this.init()
          } else {
            this.$back()
          }
        },
      })
      // #endif
    },
    init () {
      if (this.oneHourSend === 1) {
        const that = this
        getLocation(that).then(res => {
          if (res.code === 0) {
            const localInfo = res.data
            
            this.lat = localInfo.latitude
            this.lng = localInfo.longitude
          }
          this.getProd()
        }).catch(err => {
          this.$refs.commentModal.show()
        })
      } else {
        this.getProd()
      }
    },
    // 跳转搜索页
    goSearch () {
      if (this.refer === 'searchPage') {
        this.$back()
        return
      }
      uni.navigateTo({
        url: '/pages/classify/search',
      })
    },
    shipping (i) {
      if (i) {
        this.isShipping = 2
      } else {
        this.isShipping = 1
      }
    },
    reset () {
      this.minPrice = ''
      this.maxPrice = ''
      this.isShipping = 0
    },
    sureSearch () {
      if (isNaN(this.minPrice) || isNaN(this.maxPrice)) {
        uni.showToast({
          title: '价格为数字',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      if (this.minPrice && this.maxPrice && this.minPrice > this.maxPrice) {
        uni.showToast({
          title: '最低价不能大于最高价',
          icon: 'none',
          duration: 2000,
        })
      }
      this.pro = []
      this.page = 1
      // this.orderby="search";
      const item = 'search'
      this.getProd(item)
      this.showShai = false
    },
    closeShow () {
      this.showShai = false
    },
    getActive (item) {
      this.pro = []
      this.page = 1
      if (item === 0) {
        this.isSheng = 0
        this.active = 0
        this.orderby = ''
        this.getProd()
      } else if (item === 1) {
        this.isSheng = 0
        this.active = 1
        this.orderby = 'sales'
        this.getProd(this.orderby)
      } else {
        if (this.isSheng === 1) {
          this.isSheng = 2
        } else {
          this.isSheng = 1
        }
        this.active = 2
        this.orderby = 'price'
        this.getProd(this.orderby)
      }
    },
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
          data: than.searchAll,
        })
      }
    },
    getProd (item) {
      let data
      if (this.inputValue) {
        data = {
          
          Products_Name: this.inputValue,
          page: this.page,
          pageSize: this.pageSize,
        }
      } else if (this.Cate_ID) {
        data = {
          
          Cate_ID: this.Cate_ID,
          page: this.page,
          pageSize: this.pageSize,
        }
      } else {
        data = {
          
          page: this.page,
          pageSize: this.pageSize,
        }
      }
      if (item === 'sales') {
        data.order_by = item
      } else if (item === 'price') {
        data.order_by = item
        if (this.isSheng === 1) {
          data.order_by_direction = 'asc'
        } else if (this.isSheng === 2) {
          data.order_by_direction = 'desc'
        }
      } else if (item === 'search') {
        data.min_price = this.minPrice
        data.max_price = this.maxPrice
        data.order_by = this.orderby
        if (this.isSheng === 1) {
          data.order_by_direction = 'asc'
        } else if (this.isSheng === 2) {
          data.order_by_direction = 'desc'
        }
        if (this.isShipping === 1) {
          data.free_shipping = 1
        } else if (this.isShipping === 2) {
          data.free_shipping = 0
        }
      }
      if (this.Products_ID) {
        data.Products_ID = this.Products_ID
      }
      if (this.oneHourSend === 1) {
        data.one_hour_send = 1
        data.lat = this.lat
        data.lng = this.lng
      }
      if (this.biz_ids) {
        data.biz_ids = this.biz_ids
      }
      getProductList(data).then(res => {
        for (var item of res.data) {
          this.pro.push(item)
        }
        // this.pro=res.data;
        this.count = res.totalCount
      }).catch(e => {
      })
    },
    close () {
      this.inputValue = ''
      this.pro = []
      this.page = 1
      this.active = 0
      this.orderby = ''
      this.getProd()
    },
    changeCate () {
      this.cate = this.cate === 1 ? 2 : 1
    },
    change () {
      // this.active = 3;
      if (this.showShai) {
        this.showShai = false
        return
      }
      this.showShai = true
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
