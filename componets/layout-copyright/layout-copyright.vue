<style lang="scss" scoped>
  .wrap {
    text-align: center;
    padding: 20rpx;

    .logo {
      margin-bottom: 20 rx;
      width: 76rpx;
      height: 30rpx;
    }

    .text {
      font-size: 24rpx;
      color: #999;
    }
  }
</style>
<template>
  <div class="wrap">
    <img class="logo" :src="'/static/client/copyright.png'|domain" />
    <p class="text">真产品聚划算就在网中网</p>
  </div>
</template>
<script>
export default {
  name: 'LayoutCopyright'
}
</script>
