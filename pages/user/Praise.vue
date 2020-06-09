<template>
  <div @click="commonClick" class="praise page-wrap">
    <wzw-im-tip></wzw-im-tip>
    <div :key="index" class="praise-item" v-for="(item,index) of praise">
      <div class="praise-item-title flex flex-vertical-c">
        <image :src="item.User_HeadImg" class="user-img m-r-8"></image>
        <div class="user-name fz-15 c3 fz-b">
          {{item.User_NickName}}
        </div>
      </div>
      <div class="user-content fz-12 c3 m-b-14">
        {{item.Note}}
      </div>
      <div class="flex flex-wrap">
        <block :key="ind" v-for="(it,ind) of item.ImgPath">
          <image :src="it" class="coment-img"></image>
        </block>
      
      </div>
      <div @click="toDetail(item)" class="pro-comment flex flex-vertical-c">
        <image :src="item.Prod_ImgPath" class="m-r-8 pro-img"></image>
        <div>
          <div class="pro-title">
            {{item.Products_Name}}
          </div>
          <div class="pro-price">
            <span class="fz-10 color-r m-r-2">¥</span>
            <span class="fz-12 color-r m-r-7">{{item.Products_PriceX}}</span>
            <span class="fz-10 linethrow m-r-2">¥</span>
            <span class="fz-11 linethrow">{{item.Products_PriceY}}</span>
          </div>
        
        </div>
        <layout-icon color="#999" size="16" style="margin-left: auto;margin-right: 20rpx;"
                     type="iconicon-arrow-right"></layout-icon>
      
      </div>
    
    </div>
  
  </div>
</template>

<script>
import BaseMixin, { tabbarMixin } from '@/mixins/BaseMixin'
import { getCommitList } from '@/api/common'
import { error } from '@/common/fun'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

import eventHub from '@/common/eventHub'

export default {
  mixins: [BaseMixin, tabbarMixin],
  components: {
    WzwImTip,
    LayoutIcon,
  },
  data () {
    return {
      praise: [],
      postData: {
        page: 1,
        pageSize: 6,
        has_img: 1,
      },
      totalCount: 0,
    }
  },
  methods: {
    toDetail (item) {
      this.$linkTo('/pages/product/detail?prod_id=' + item.Product_ID)
    },
    async init (item) {
      const list = await getCommitList(this.postData, { tip: '加载中' }).catch(e => {
        error(e.msg || '获取评论列表失败')
      })
      if (item === 'isInit') {
        this.praise = list.data
      } else {
        list.data.map(item => {
          this.praise.push(item)
        })
      }
      this.totalCount = list.totalCount
    },
  },
  onReachBottom () {
    if (this.totalCount > this.praise.length) {
      this.postData.page++
      this.init()
    }
  },
  onShow () {
    this.setTabBarIndex(2)
    this.$store.dispatch('system/setTabActiveIdx', 2)
    this.refreshTabTag()
  },
  onLoad () {
    this.init('isInit')
  },
}
</script>

<style lang="scss" scoped>
  
  .page-wrap {
  
  }
  
  .praise {
    padding-top: 30rpx;
  }
  
  .praise-item {
    margin: 0 auto 20rpx;
    width: 710rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    padding: 20rpx;
    border-radius: 20rpx;
    overflow: hidden;
  }
  
  .praise-item-title {
    height: 64rpx;
    margin-bottom: 18rpx;
    width: 100%;
    line-height: 64rpx;
    overflow: hidden;
    
    .user-img {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    
    .user-name {
      height: 64rpx;
      line-height: 64rpx;
    }
    
    
  }
  
  .user-content {
    width: 670rpx;
    padding-left: 6rpx;
    padding-right: 4px;
    line-height: 36rpx;
  }
  
  .coment-img {
    width: 220rpx;
    height: 220rpx;
    margin-right: 4rpx;
    margin-bottom: 8rpx;
    border-radius: 6rpx;
    overflow: hidden;
    border-radius: 6rpx;
    overflow: hidden;
  }
  
  .pro-comment {
    margin-left: 4rpx;
    width: 672rpx;
    height: 84rpx;
    background: #F6F6F6;
    border-radius: 10rpx;
    overflow: hidden;
  }
  
  .pro-img {
    width: 84rpx;
    height: 84rpx;
  }
  
  .pro-title {
    height: 24rpx;
    line-height: 24rpx;
    font-size: 24rpx;
    width: 480rpx;
    color: #777777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    margin-bottom: 19rpx;
  }
  
  .pro-price {
    height: 20rpx;
    line-height: 20rpx;
    color: #B1B1B1;
    
    .color-r {
      color: #F53636;
    }
    
    .linethrow {
      text-decoration: line-through;
    }
  }
</style>
