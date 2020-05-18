<template>
  <scroll-view scroll-y class='comment-wrap'>
    <div class="navs">
      <div class="nav" :class="index == 0 ? 'active' : ''" @click="getComment(0,1)">全部</div>
      <div class="nav" :class="index == 1 ? 'active' : ''" @click="getComment(1,1)">有图</div>
    </div>
    <block v-for="(item,index) of comment_list" :key="item">
      <div class="c_content" v-if="!item.ImgPath">
        <div class="c_content_title">
          <img :src="item.User_HeadImg" alt="">
          <span class="user_name">{{item.User_NickName}}</span>
          <span class="c_time">{{item.CreateTime}}</span>
        </div>
        <div class="c_content_msg">{{item.Note}}</div>
        <div class="c_content_img"></div>
      </div>
      <div class="c_content" v-else>
        <div class="c_content_title">
          <img :src="item.User_HeadImg" alt="">
          <span class="user_name">{{item.User_NickName}}</span>
          <span class="c_time">{{item.CreateTime}}</span>
        </div>
        <div class="c_content_msg">{{item.Note}}</div>
        <div class="c_content_img">
          <block v-for="(i,j) of item.ImgPath" :key="i">
            <img :src="i"  @click="yulan(index,j)">
          </block>
        </div>
      </div>
    </block>

  </scroll-view>
</template>

<script>

import { getCommitList } from '@/api/common'

export default {
  props: {
    Products_ID: {
      requred: true
    }
  },
  data () {
    return {
      index: 0,
      commentArgs: {
        Products_ID: '', // 查询指定产品的评论
        page: 1,
        pageSize: 9999
      },
      totalCount: 0, // 评论个数
      comment_list: [] // 评论列表
    }
  },
  created () {
    this.commentArgs.Products_ID = this.Products_ID
    this.getComment(this.index)
  },
  onReachBottom () {
    if (this.comment_list.length < this.totalCount) {
      this.commentArgs.page++
      this.getComment(this.index)
    }
  },
  methods: {
    async _init_func () {
      this.comment_list = await getCommitList({
        Products_ID: this.Products_ID,
        pageSize: 999,
        page: 1
      }, {
        onlyData: true
      }).catch((e) => {
        throw Error('获取评论数据失败')
      })
    },
    yulan (index, i) {
      const imgPath = this.comment_list[index].ImgPath
      for (var k in imgPath) {
        imgPath[k] = imgPath[k].replace(/n\d\//, '')
      }
      uni.previewImage({
        urls: imgPath,
        indicator: 'default',
        current: i
      })
    },
    getComment (i, j) {
      if (j === 1) {
        this.commentArgs.page = 1
        this.comment_list = []
      }
      this.index = i
      this.commentArgs.has_img = i

      this.getComments()
    },
    getComments () {
      getCommitList(this.commentArgs, { errtip: false }).then(res => {
        for (const i of res.data) {
          this.comment_list.push(i)
        }
        this.totalCount = res.totalCount
      }).catch(err => {
        uni.showToast({
          title: err.msg,
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-wrap{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .navs {
    margin: 40rpx 0 36rpx;
    padding-left: 20rpx;
    display: flex;
  }
  .nav {
    width: 110rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 28rpx;
    border: 2rpx solid #999;
    border-radius: 40rpx;
    color: #999;
  }
  .navs .nav:nth-child(1) {
    margin-right: 30rpx;
  }
  .nav.active {
    background: #F43131;
    color: #fff;
    border-color: #F43131;
  }
  /* 内容 */
  /* 评价 start */
  .c_content {
    margin-top: 30rpx;
    padding: 0 20rpx 0;
    border-bottom: 2rpx solid #FFECE8E8;
  }
  .c_content_title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333;
  }
  .c_content_title>img {
    width: 70rpx;
    height: 70rpx;
    margin-right: 20rpx;
  }
  .user_name {
    flex: 1;
  }
  .c_time {
    font-size: 26rpx;
    color: #777;
  }
  .c_content_msg {
    font-size: 24rpx;
    color: #333;
    line-height: 36rpx;
    padding-top: 18rpx;
    padding-bottom: 29rpx;
    text-align: left;
  }
  .c_content_img{
    display: flex;
    flex-wrap: wrap;
  }
  .c_content_img img {
    width: 142rpx;
    height: 142rpx;
    margin-right: 20rpx;
    margin-bottom: 30rpx;
  }
  /* 内容 end */
  .cartSku{
    padding: 0rpx 10rpx;
    .cartTop{
      position: relative;
      display: flex;
      padding-top: 20rpx;
      .image{
        width: 220rpx;
        height: 220rpx;
      }
      .cartTitle{
        margin-left: 20rpx;
        font-size: 32rpx;
        width: 420rpx;
        .cartTitles{
          height: 80rpx;
          overflow: hidden;
          margin-top: 20rpx;
          line-height: 40rpx;
        }
        .addInfo{
          width: 450rpx;
          margin-top: 70rpx;
          display: flex;
          flex-flow: row;
          justify-content: space-between;
          align-items: flex-end;
          .addPrice{
            font-size: 42rpx;
            color: #ff4200;
          }
          .proSale{
            font-size: 24rpx;
            color: #999;
            justify-content: flex-end;
          }
        }
      }
    }
    .cartCenter{
      margin-top: 20rpx;
      .cartAttr{
        display: flex;
        padding: 15rpx 0rpx;
        .sku{
          font-size: 28rpx;
          height: 70rpx;
          line-height: 70rpx;
          width: 140rpx;
        }
        .skuValue{
          display: flex;
          flex:1;
          flex-wrap: wrap;
          .skuview{
            margin-bottom: 10px;
            height: 70rpx;
            line-height: 70rpx;
            font-size: 14px;
            border-radius: 10rpx;
            color: #000;
            background-color: #fff;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 20rpx;
            border: 1px solid #ccc;
          }
          .unablechoose {
            background: #ddd;
          }
        }
      }
    }
    .numBer{
      margin-top: 20rpx;
      display: flex;
      padding: 15rpx 0rpx;
      justify-content: space-between;
      .numBers{
        font-size: 28rpx;
        height: 70rpx;
        line-height: 70rpx;
        width: 140rpx;
      }
      .inputNumber{
        border: 1px solid #ccc;
        border-radius: 6rpx;
        height: 50rpx;
        margin-right: 50rpx;
        display: flex;
        .inputq{
          color: black;
          margin: 0 auto;
          width: 80rpx;
          height: 50rpx;
          text-align: center;
          font-size: 24rpx;
          border-left: 2rpx solid #ccc;
          border-right: 2rpx solid #ccc;
        }
        .clicks{
          height: 50rpx;
          line-height: 50rpx;
          width: 60rpx;
          text-align: center;
        }
      }
    }
  }
  .cartSub{
    width: 100%;
    height: 90rpx;
    background-color: #F43131;
    font-size:20px;
    line-height: 90rpx;
    text-align: center;
    color: #FFFFFF;
    margin-top: 30rpx;
    &.disabled {
      background: #999;
    }
  }
  .skuCheck{
    color: #fff !important;
    background-color: #ff4200 !important;
  }
</style>
