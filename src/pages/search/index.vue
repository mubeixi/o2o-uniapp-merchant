<template>
  <div @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <form action="/">
      <div class="search-wrap">
        <icon class="search_icon" size="34rpx" type="search"  @click="success" />
        <input @confirm="success" autofocus="autofocus" class="search-input" confirm-type='search' focus="focus"
               name="search" type="text" v-model="inputValue">
        <span @click="close" class="span">取消</span>
      </div>
    </form>
    <div class="history" v-if="searchAll.length>0">
      <div class="title">
        <div>搜索历史</div>
        <div @click="clear" class="dels">
          <image :src="'/static/client/del.png'|domain" class="img" />
        </div>
      </div>
      <div class="h_content">
        <span :key='i' @click="goSearch(item)" class="span" v-for="(item,i) of searchAll">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import { linkToEasy } from '@/common/fun'

export default {
  mixins: [BaseMixin],
  name: 'SearchIndex',
  data () {
    return {
      biz_id: '',
      inputValue: '',
      searchAll: []
    }
  },
  components: { WzwImTip },
  onLoad (options) {
    if (options.keyword) {
      this.inputValue = options.keyword
    }

    if (options.biz_id) {
      this.biz_id = options.biz_id
    }
  },
  onShow () {
    const than = this // 注意this的指向
    uni.getStorage({
      key: 'searchAll',
      success (res) {
        than.searchAll = res.data
      }
    })
  },
  methods: {
    goSearch (item) {
      var url = '/pages/search/result?inputValue=' + item
      if (this.biz_id)url += '&biz_id=' + this.biz_id
      linkToEasy(url)
    },
    success () {
      var url = '/pages/search/result?refer=searchPage&inputValue=' + this.inputValue
      this.inputValue = ''
      if (this.inputValue !== '') { // 输入框的值不为空时
        const than = this
        for (var item of this.searchAll) {
          if (item === this.inputValue) {
            uni.navigateTo({
              url
            })
            return
          }
        }
        this.searchAll.push(this.inputValue) // 将输入框的值添加到搜索记录数组中存储
        uni.setStorage({
          key: 'searchAll',
          data: than.searchAll
        })
      }

      if (this.biz_id)url += '&biz_id=' + this.biz_id
      uni.navigateTo({
        url
      })
    },
    clear () {
      this.searchAll = []
      uni.setStorage({
        key: 'searchAll',
        data: []
      })
    },
    close () {
      this.inputValue = ''
      this.$back()
    }
  }
}
</script>

<style lang="scss" scoped>
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
      width: 600rpx;
      height: 65rpx;
      line-height: 65rpx;
      border-radius: 10rpx;
      background: #F4F4F4;
      font-size: 26rpx;
      color: #ADADAD;
      padding-left: 91rpx;
      box-sizing: border-box;
    }

    .search_icon {
      position: absolute;
      top: 46rpx;
      left: 61rpx;
    }

    .span {
      font-size: 30rpx;
      color: #333333;
    }
  }

  .history {
    padding: 0 20rpx;
  }

  .title {
    display: flex;
    justify-content: space-between;
    height: 40rpx;
    align-items: center;
  }

  .title {
    font-size: 28rpx;
    color: #333;
    font-weight: 500;
    height: 40rpx;

    line-height: 40rpx;

    .img {
      width: 40rpx;
      height: 40rpx;
      /*width: 100%;*/
      /*height: 100%;*/
    }
  }

  .dels {
    width: 40rpx;
  }

  .h_content .span {
    float: left;
    background: rgba(245, 245, 245, 1);
    border-radius: 10px;
    color: #777;
    font-size: 12px;
    text-align: center;
    padding: 16rpx 24rpx;
    margin: 30rpx 20rpx 0 0;
  }
</style>
