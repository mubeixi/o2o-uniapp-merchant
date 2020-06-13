<template>
  <div class="commtent-item" :style="{borderBottom:isLast?'none':''}" @click="tap">
    <div class="info">
      <div class="userInfo">
        <image class="headimg" :src="comment.User_HeadImg"></image>
        <div class="nickname">{{comment.User_NickName}}</div>
      </div>
      <span class="create_at">{{comment.CreateTime|formatTime('YYYY-MM-DD')}}</span>
    </div>
    <div class="content">{{comment.Note}}</div>
    <div class="actions" @click.stop="commentMethod">
      <image class="icon" :src="'/static/client/comment.png'|domain"></image>
      <span>{{comment.child.length}}</span>
    </div>


  </div>
</template>
<script>

export default {
  name: 'LayoutComment',
  components:{},
  props: {
    isLast: {
      type: Boolean,
      default: false
    },
    comment: {}
  },
  methods: {
    commentMethod(){
      console.log(this.comment,"sss")
      this.$emit('comment', this.comment)
    },
    tap () {
      console.log(this.comment)
      this.$emit('click', this.comment)
    }
  }
}
</script>
<style lang="scss" scoped>
  .commtent-item {
    padding: 30rpx 0;
    /*border-bottom: 1px solid #eee;*/

    .info {
      padding-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .userInfo {
        display: flex;
        align-items: center;

        .headimg {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20rpx;
        }
      }

      .create_at {
        color: #777;
      }
    }

    .content {
      font-size: 14px;
      color: #333;
      line-height: 1.6;
    }

    .actions {
      padding-top: 20rpx;
      text-align: right;
      color: #999;
      font-size: 12px;

      .icon {
        width: 30rpx;
        height: 26rpx;
        margin-right: 4px;
      }

    }
  }
</style>
