<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div
      :style="{paddingTop:menuButtonInfo.top+'px',paddingBottom:10+'px',height:menuButtonInfo.height+'px'}"
      class="flex flex-vertical-c navigator"
      style="background: #F8F8F8;">
      <layout-icon @click="$back()" class="p-l-10 p-r-15" type="iconicon-arrow-left"></layout-icon>
      <span @click="openMuliti">管理</span>
      <span class="title">收藏</span>
    </div>
    <div :style="{height:menuButtonInfo.top+10+menuButtonInfo.height+50+'px'}" class="bg-white"></div>
    <div :style="{top:menuButtonInfo.top+10+menuButtonInfo.height+'px'}" class="tab bg-white">
      <div :class="{active:activeIndex===0}" @click="changeActive(0)" class="tab-item">收藏商品</div>
      <div :class="{active:activeIndex===1}" @click="changeActive(1)" class="tab-item">收藏店铺</div>
    </div>
    <div class="bg-white container">
      <div class="list" v-show="activeIndex===0">
        <label :key="idx" class="item" v-for="(goods,idx) in goodsFavoriteList">
          <div class="p-r-10" v-if="multiGoods">
            <LayoutIcon :color="goods.is_check ? '#25C790' : '#999'" :type="goods.is_check ? 'iconicon-check' :'iconradio'"
                        @click="changeState(goods)" size="20"></LayoutIcon>
            <!--            <radio class="checkbox" style="transform: scale(0.8)" :value="goods.prod_id"></radio>-->
          </div>
          <image :src="goods.ImgPath" class="cover"></image>
          <div class="info">
            <div class="title">{{goods.Products_Name}}</div>
            <div class="c8 m-t-15">{{goods.favourite_count}}人收藏</div>
            <div class="bottom">
              <div class="price-selling"><span class="fz-12">￥</span><span
                class="fz-14">{{goods.Products_PriceX}}</span></div>
              <div @click="$toGoodsDetail(goods)" class="gobuy">立即购买</div>
            </div>
          </div>
        </label>
      </div>
      <div class="storeList" v-show="activeIndex===1">
        <div :key="idx" class="store-item" v-for="(store,idx) in storeFavoriteList">
          <div class="p-r-10" v-if="multiStore">
            <LayoutIcon :color="store.is_check ? '#25C790' : '#999'" :type="store.is_check ? 'iconicon-check' :'iconradio'"
                        @click="changeState(store)" size="20"></LayoutIcon>
            <!--              <radio class="checkbox" style="transform: scale(0.8)" :value="store.id"></radio>-->
          </div>
          <div class="flex1 box">
            <div @click="goStore(store.biz_id)" class="top flex flex-vertical-c flex-justify-between">
              <div class="flex flex-vertical-c">
                <image :src="(store.biz_logo) | domain"
                       class="logo"></image>
                <div class="p-l-10 c3">{{store.biz_shop_name}}</div>
              </div>
              <layout-icon type="iconicon-arrow-right"></layout-icon>
            </div>
            <div class="content p-10 c8">
              <div class="fz-14 ">电话：{{store.biz_mobile}}
                <layout-icon @click="call(store.biz_mobile)" class="p-l-10" color="#26C78D" display="inline" size="18"
                             type="iconicon-phone" weight="bold"></layout-icon>
              </div>
              <div class="m-t-18 fz-14 ">地址：{{store.biz_address}}
                <layout-icon @click="openMap(store)" class="p-l-10" color="#26C78D" display="inline" size="18"
                             type="iconicon-address" weight="bold"></layout-icon>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
    
    <div class="handle-box" v-if="multiGoods||multiStore">
      <div @click="taggleAllCheck">
        <radio :checked="allCheck" style="transform: scale(0.8)"></radio>
        <span class="p-l-8">切换全选</span>
      </div>
      <div @click="cancel" class="btn-list">
        <div class="btn">删除({{selectes.length}})</div>
      </div>
    </div>
  
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import BaseMixin from '@/mixins/BaseMixin'
import { linkToEasy, modal, toast } from '@/common/fun'
import { cancelFavourite, getFavouriteProdList } from '@/api/customer'
import Storage from '@/common/Storage'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  name: 'FavoriteIndex',
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    LayoutIcon,
  },
  watch: {
    allCheck: function (val) {
      if (val) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
  },
  computed: {
    selectes () {
      if (this.activeIndex === 0) {
        //  产品
        return this.goodsFavoriteList.filter(item => item.is_check)
      } else {
        //  商家
        return this.storeFavoriteList.filter(item => item.is_check)
      }
    },
    allCheck () {
      if (this.activeIndex === 0) {
        return this.goodsFavoriteList && this.goodsFavoriteList.filter(item => item.is_check).length === this.goodsFavoriteList.length || false
      } else {
        return this.storeFavoriteList && this.storeFavoriteList.filter(item => item.is_check).length === this.storeFavoriteList.length || false
      }
    },
  },
  data () {
    return {
      multiGoods: false,
      multiStore: false,
      activeIndex: 0, // 0是产品 1是商家
      goodsFavoriteList: [],
      storeFavoriteList: [],
      pageSize: 10,
      pro_page: 1,
      biz_page: 1,
      param: {
        type: 1,
        pageSize: 4,
        page: 1,
      },
      isSelectAll: false,
      is_biz_more: true, // 是否还有更多商家
      is_pro_more: true, // 是否还有更多产品
      store_total: 0,
      pro_total: 0,
    }
  },
  methods: {
    goStore (bid) {
      linkToEasy('/pages/store/index?biz_id=' + bid)
    },
    
    changeActive (index) {
      this.activeIndex = index
      this.multiStore = false
      this.multiGoods = false
    },
    changeState (item) {
      item.is_check = !item.is_check
    },
    call (phone) {
      uni.makePhoneCall({
        phoneNumber: phone,
      })
    },
    openMap (store) {
      uni.openLocation({
        latitude: store.biz_lat,
        longitude: store.biz_lon,
        name: store.biz_shop_name,
        success: function () {
          console.log('success')
        },
      })
    },
    // 取消收藏
    cancel () {
      const arr = []
      let list = []
      if (this.activeIndex === 0) {
        list = this.goodsFavoriteList.filter(item => item.is_check)
        list.forEach(item => arr.push(item.prod_id))
      } else {
        list = this.storeFavoriteList.filter(item => item.is_check)
        list.forEach(item => arr.push(item.id))
      }
      const param = {}
      if (this.activeIndex === 0) {
        param.prod_id = JSON.stringify(arr)
      } else {
        param.biz_id = JSON.stringify(arr)
      }
      cancelFavourite(param).then(res => {
        toast(res.msg)
        this._init_func()
      }).catch(err => modal(err.msg))
    },
    radioChange (e) {
      console.log(e)
    },
    taggleAllCheck () {
      this.isSelectAll = !this.isSelectAll
      if (this.isSelectAll) {
        if (this.activeIndex === 0) {
          this.goodsFavoriteList.map(item => item.is_check = true)
        } else {
          this.storeFavoriteList.map(item => item.is_check = true)
        }
      } else {
        if (this.activeIndex === 0) {
          this.goodsFavoriteList.map(item => item.is_check = false)
        } else {
          this.storeFavoriteList.map(item => item.is_check = false)
        }
      }
    },
    openMuliti () {
      if (this.activeIndex === 0) {
        this.pro_page = 1
        this.multiStore = false
        this.multiGoods = !this.multiGoods
      }
      if (this.activeIndex === 1) {
        this.biz_page = 1
        this.multiGoods = false
        this.multiStore = !this.multiStore
      }
    },
    getProList () {
      return new Promise((resolve, reject) => {
        this.param.page = this.pro_page
        this.param.type = 1
        getFavouriteProdList(this.param).then(res => {
          this.pro_total = res.totalCount
          if (Number(res.totalCount) <= this.goodsFavoriteList.length) {
            this.is_pro_more = false
            return
          }
          this.pro_page++
          if (res.data.length > 0) {
            res.data.map(item => {
              item.is_check = false
            })
          }
          
          resolve(this.goodsFavoriteList.concat(res.data))
        }).catch(err => {
          reject(err)
        })
      })
    },
    getStoreList () {
      return new Promise((resolve, reject) => {
        this.param.page = this.biz_page
        this.param.type = 2
        getFavouriteProdList(this.param).then(res => {
          this.store_total = res.totalCount
          if (Number(res.totalCount) < this.storeFavoriteList.length) {
            this.is_biz_more = false
            return
          }
          this.biz_page++
          if (res.data.length > 0) {
            res.data.map(item => {
              item.is_check = false
            })
          }
          
          resolve(this.storeFavoriteList.concat(res.data))
        }).catch(err => {
          reject(err)
        })
      })
    },
    async _init_func () {
      try {
        this.storeFavoriteList = await this.getStoreList().catch(e => {
          throw Error(e.msg || '获取商家列表失败')
        })
        
        this.goodsFavoriteList = await this.getProList().catch(e => {
          throw Error(e.msg || '获取收藏列表失败')
        })
      } catch (e) {
        modal(e.message)
      }
    },
  },
  created () {
    this.param.User_ID = Storage.get('User_ID')
    this._init_func()
  },
  onReachBottom () {
    if (this.activeIndex === 0 && this.is_pro_more) {
      //  商品
      this.getProList().then(res => {
        this.goodsFavoriteList = res
      }).catch(e => {
        throw Error(e.msg || '获取收藏列表失败')
      })
    } else if (this.activeIndex === 1 && this.is_biz_more) {
      this.getStoreList().then(res => {
        this.storeFavoriteList = res
      }).catch(e => {
        throw Error(e.msg || '获取商家列表失败')
      })
    }
  },
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #fff;
    min-height: 100vh;
  }
  
  .navigator {
    position: fixed;
    top: 0;
    width: 750rpx;
    z-index: 3;
    
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  
  .tab {
    position: fixed;
    z-index: 3;
    width: 750rpx;
    height: 50px;
    background: white;
    display: flex;
    justify-content: center;
    //box-shadow: rgba(155,155,155,.1) 0 10px 10px;
    .tab-item {
      width: 200rpx;
      text-align: center;
      padding: 24rpx 0;
      box-sizing: border-box;
      
      &.active {
        color: $fun-primary-color;
        border-bottom: 2px solid $fun-primary-color;
      }
      
      &:first-child {
        margin-right: 30rpx;
      }
    }
  }
  
  .container {
    padding-bottom: 90rpx;
  }
  
  .list {
    margin: 40rpx 20rpx;
    
    .item {
      display: flex;
      margin-bottom: 30rpx;
      align-items: center;
      
      .cover {
        width: 280rpx;
        height: 280rpx;
        background: #f2f2f2;
      }
      
      .info {
        position: relative;
        height: 280rpx;
        margin-left: 20rpx;
        flex: 1;
        
        .title {
          line-height: 42rpx;
          color: #333;
        }
        
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          
          .gobuy {
            background: #FF0000;
            color: #fff;
            text-align: center;
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 30rpx;
            font-size: 14px;
          }
        }
      }
      
    }
  }
  
  .storeList {
    padding: 40rpx 20rpx;
  }
  
  .store-item {
    display: flex;
    align-items: center;
    
    .box {
      height: 300rpx;
      width: 710rpx;
      background: white;
      border-radius: 10rpx;
      margin-bottom: 18px;
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.1);
      
      .top {
        padding: 25rpx;
        border-bottom: 1px solid #e7e7e7;
        
        .logo {
          width: 80rpx;
          height: 80rpx;
        }
      }
      
      .content {
      
      }
    }
    
  }
  
  /* 底部的操作栏start */
  .handle-box {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 90rpx;
    width: 750rpx;
    box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.16);
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20rpx;
    box-sizing: border-box;
    
    .btn-list {
      display: flex;
      align-items: center;
      
      .btn {
        display: block;
        height: 54rpx;
        line-height: 54rpx;
        font-size: 14px;
        text-align: center;
        border-radius: 10rpx;
        border: 1px solid $fun-red-color;
        color: $fun-red-color;
        background: white;
        margin-left: 20rpx;
        
        &.btn-up {
          color: white;
          background: $fun-red-color;
        }
      }
    }
  }
  
  /*底部操作栏 end*/
</style>
