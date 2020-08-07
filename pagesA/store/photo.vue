<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="head" id="stickyTab">
      <div class="tab-box">
        <div :class="{active:headTabIndex === idx}" :key="idx" @click="setActive(idx)" class="tab-item"
             v-for="(imgs,idx) in photoList">
          {{imgs.cate_name}}
          <span class="underline" v-if="headTabIndex === idx"></span>
        </div>
      </div>
    </div>
    <!--  占位-->

    <div class="photo-section" v-if="photoList.length>0 && photoList[headTabIndex].photo">
      <div class="photo-list">
        <block :key="idx2" v-for="(img,idx2) in photoList[headTabIndex].photo">
          <image :src="img.photo_img" @click="priviewFn(photoList[headTabIndex],idx2)" class="photo-item"></image>
        </block>
      </div>
    </div>
    <div class="defaults" v-else>
      <image :src="'/static/client/empty.png'|domain"></image>
    </div>

  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { hideLoading, modal, showLoading } from '@/common/fun'
import { getAlbumList, getPhotoList } from '@/api/store'
import { getArrColumn } from '@/common/helper'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'

export default {
  name: 'StorePhoto',
  components: { WzwImTip },
  mixins: [BaseMixin],
  computed: {},
  data () {
    return {
      childSwiperHeight: 'auto',
      bid: null,
      pageSize: 1000,
      headTabIndex: 0,
      photoList: []
    }
  },
  methods: {
    priviewFn (imgs, current) {
      const urls = getArrColumn(imgs.photo, 'photo_img')
      uni.previewImage({
        urls,
        current
      })
    },
    setActive (idx) {
      this.headTabIndex = idx
    },
    indexChangeEvent (event) {
      const { current } = event.detail
      this.headTabIndex = current
    },
    loadMore () {
      // 第一页数据已经初始化了
      const { page = 1, id: cate_id } = this.photoList[this.headTabIndex]
      getPhotoList({
        page,
        pageSize: this.pageSize,
        cate_id,
        biz_id: this.bid
      }).then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          this.$set(this.photoList[this.headTabIndex], 'page', page + 1)
          this.photoList[this.pageSize] = this.photoList[this.pageSize].concat[res.data]
        }
      }).catch(e => {
      })
    },
    async _init_func () {
      try {
        showLoading('加载中')

        const base = { biz_id: this.bid }

        this.photoList = await getAlbumList({
          ...base,
          get_photo: this.pageSize
        }, { onlyData: 1 }).catch(e => {
          throw Error(e.msg || '获取相册信息失败')
        })

        if (this.photoList.length <= 0) {
          hideLoading()
          return
        }
        this.loadMore()

        hideLoading()
      } catch (e) {
        hideLoading()
        modal(e.message)
      }
    }
  },
  onReachBottom () {

  },
  onShow () {

  },
  onLoad (options) {
    if (!options.bid) {
      modal('店铺id缺失')
      return
    }
    this.bid = options.bid
    if (options.tab) {
      this.headTabIndex = Number(options.tab)
    }
    this._init_func()
  },
  created () {

  },
  onReady () {

  }
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    background: #f2f2f2;
    min-height: 100vh;
  }

  .photo-section {
    padding: 20rpx 20rpx 40rpx;

    .php-section-title {
      .label {
        width: 6rpx;
        height: 30rpx;
        background: #26C78D;
        margin-right: 8px;
      }

      .text {
        font-size: 15px;
        font-weight: bold;
      }
    }

    .photo-list {
      display: flex;
      flex-wrap: wrap;
    }

    .photo-item {
      width: 350rpx;
      height: 350rpx;
      margin-bottom: 10rpx;
      margin-right: 10rpx;
      @include cover-img();

      &:nth-child(even) {
        margin-right: 0;
      }
    }
  }

  .tab-container {
    background: #fff;
    position: fixed;
    top: 50px;
    bottom: 0px;
    width: 750rpx;
    height: auto;

    .tab-page-wrap {
      position: absolute;
      width: 750rpx;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;

    }

  }

  .head {
    position: sticky;
    z-index: 999;
    top: 0;
    width: 750rpx;
    box-sizing: border-box;
    background: white;
    padding: 10px 50rpx;
    align-items: center;
    color: #333;

    .tab-box {

      display: block;
      overflow-y: hidden;
      overflow-x: scroll;

      .tab-item {
        display: inline-block;
        text-align: center;
        margin-right: 40rpx;
        padding-bottom: 8px;
        position: relative;

        &:last-child {
          margin-right: 0;
        }

        .underline {
          visibility: hidden;
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          width: 18px;
          background: $fun-green-color;
        }

        &.active {
          color: $fun-green-color;

          .underline {
            visibility: visible;
          }
        }
      }
    }

  }

  .defaults {
    margin: 0 auto;
    width: 640rpx;
    height: 480rpx;
    margin-top: 100rpx;
  }
</style>
