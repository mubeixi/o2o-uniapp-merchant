<template>
  <view @click="commonClick" class="wrap">

  </view>
</template>

<script>

export default {
  name: 'Empty',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {

  }

}
</script>

<style lang="scss" scoped>
  .wrap {
    background: #f2f2f2;
    height: 100vh;
    padding: 10px;
  }

  .rotate-box {
    width: 660rpx;
    height: 660rpx;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*padding: 20rpx;*/
    z-index: 32;
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 220rpx;
      height: 220rpx;
      text-align: center;
      box-sizing: border-box;
      padding: 30rpx;
      overflow: hidden;

      .start-btn {
        height: 160rpx;
        line-height: 160rpx;
        background: #F43131;
        color: white;
      }

      .pic {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
      }

      .name {
        margin: 20rpx 0 0;
        height: 30rpx;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
