<template>
  <div  @click="commonClick">
    <form action="/">
      <div class="search-wrap">
        <icon type="search" size="34rpx" class="search_icon" />
        <input type="text" class="search-input" name="search" v-model="inputValue" @confirm="success"
               confirm-type='search' focus="focus" autofocus="autofocus">
        <span @click="close" class="span">取消</span>
      </div>
    </form>
    <div class="history" v-if="searchAll.length>0">
      <div class="title">
        <div>搜索历史</div>
        <div @click="clear" class="dels">
          <image class="img" :src="'/static/client/del.png'|domain" />
        </div>
      </div>
      <div class="h_content">
        <span class="span" v-for="(item,i) of searchAll" :key='i' @click="goSearch(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'

export default {
  mixins: [BaseMixin],
  name: 'SearchIndex',
  data () {
    return {
      inputValue: '',
      searchAll: [],
    }
  },
  components: {},
  onLoad (options) {
    if (options.keyword) {
      this.inputValue = options.keyword
    }
  },
  onShow () {
    const than = this // 注意this的指向
    uni.getStorage({
      key: 'searchAll',
      success (res) {
        than.searchAll = res.data
      },
    })
  },
  methods: {
    goSearch (item) {
      uni.navigateTo({
        url: '/pages/search/result?inputValue=' + item,
      })
    },
    success () {
      const url = '/pages/search/result?refer=searchPage&inputValue=' + this.inputValue
      this.inputValue = ''
      if (this.inputValue !== '') { // 输入框的值不为空时
        const than = this
        for (var item of this.searchAll) {
          if (item === this.inputValue) {
            uni.navigateTo({
              url,
            })
            return
          }
        }
        this.searchAll.push(this.inputValue) // 将输入框的值添加到搜索记录数组中存储
        uni.setStorage({
          key: 'searchAll',
          data: than.searchAll,
        })
      }
      uni.navigateTo({
        url,
      })
    },
    clear () {
      this.searchAll = []
      uni.setStorage({
        key: 'searchAll',
        data: [],
      })
    },
    close () {
      this.inputValue = ''
      this.$back()
    },
  },
}
</script>

<style scoped lang="scss">
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
