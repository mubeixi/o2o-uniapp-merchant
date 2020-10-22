<template>
  <view class="articleAll">
    <view class="articleTitle">
      {{articleData.Article_Title}}
    </view>
    <view class="articleTime">
      <text style="margin-right: 10px;">{{articleData.Article_Editor}}</text>
      <text>{{articleData.Article_CreateTime}}</text>
    </view>
    <view class="ArticleBriefDescription" v-if="articleData.Article_BriefDescription">
      {{articleData.Article_BriefDescription}}
    </view>
    <view>
      <!-- #ifdef H5 -->
      <div class="fun-rich-text" v-html="articleData.Article_Content"></div>
      <!-- #endif -->
      <!-- #ifndef H5 -->
      <u-parse :content="articleData.Article_Content|formatRichTextByUparse"></u-parse>
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getArticle } from '@/api/common.js'
import uParse from '@/components/gaoyia-parse/parse.vue'

import T from '@/common/langue/i18n'
export default {
  mixins: [BaseMixin],
  components: { uParse },
  data () {
    return {
      article_id: '',
      articleData: {}
    }
  },
  onLoad (options) {
    this.article_id = options.Article_ID
  },
  onShow () {
    this.loadInfo()
  },
  methods: {
    loadInfo () {
      getArticle({ article_id: this.article_id }).then(res => {
        this.articleData = res.data
        uni.setNavigationBarTitle({
          title: this.articleData.Article_Title
        })
      })
    }
  }
}
</script>

<style lang="scss">
  .articleAll {
    padding: 20px 16px 12px;
    background-color: #FFFFFF;
    min-height: 100vh;
  }

  .articleTitle {
    font-size: 22px;
    line-height: 1.4;
    margin-bottom: 14px;
  }

  .articleTime {
    margin-bottom: 22px;
    line-height: 20px;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.3);
    word-wrap: break-word;
    word-break: break-all;
  }

  .ArticleBriefDescription {
    border-radius: 10px;
    background-color: #f8f8f8;
    padding: 10px;
    font-size: 15px;
  }
</style>
