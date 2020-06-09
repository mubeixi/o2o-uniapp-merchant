<template>
  <div @click="commonClick" class="page-wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <div class="message-list">
      <div class="list-item flex" v-for="item in 6">
        <div style="position: relative">
          <image class="user-avatar" src="/static/cat.png"></image>
          <div class="num">3</div>
        </div>
        <div class="message-content">
          <div class="nick-name flex flex-justify-between">
            <div class="user-name">尖果儿</div>
            <div class="message-time">20:10</div>
          </div>
          <div class="message">你周末要干嘛</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  components: { WzwImTip },
}
</script>
<style lang="scss" scoped>
  .page-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  
  .message-list {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #fff;
    padding: 46rpx 0 0 30rpx;
  }
  
  .user-avatar {
    width: 95rpx;
    height: 95rpx;
    border-radius: 10rpx;
    margin-right: 36rpx;
  }
  
  .num {
    position: absolute;
    right: 20rpx;
    top: -17rpx;
    color: #fff;
    font-size: 24rpx;
    width: 34rpx;
    height: 34rpx;
    border-radius: 50%;
    text-align: center;
    line-height: 34rpx;
    background-color: #ff0000;
  }
  
  .message-content {
    flex: 1;
    max-width: 590rpx;
    border-bottom: 1px solid #ECECEC;
  }
  
  .nick-name {
    align-items: center;
    margin-top: 6rpx;
    
    .user-name {
      font-size: 34rpx;
      max-width: 500rpx;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .message-time {
      font-size: 26rpx;
      color: #999;
      margin-right: 32rpx;
    }
  }
  
  .message {
    width: 100%;
    color: #999;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 24rpx;
    margin-bottom: 30rpx;
    margin-top: 10rpx;
  }
  
  .list-item {
    margin-bottom: 20rpx;
  }
</style>
