<template>
  <div class="card-item">
    <div class="time"></div>
    <div class="content-wrap" :class="{reverse:message.direction==='to'}">
      <div class="content-label">
        <div v-if="message.direction==='to'" class="content-arrow">
<!--          <layout-icon class="arrow-icon" size="16"  color="#9de94d" display="inline" type="iconright"></layout-icon>-->
          <image mode="heightFix" class="arrow-icon" src="/static/im/chat-arrow-left.png"></image>
        </div>
        <div class="headimg" :style="{backgroundImage:'url('+headimg+')'}"></div>
        <div v-if="message.direction!=='to'" class="content-arrow">
          <image mode="heightFix" class="arrow-icon" src="/static/im/chat-arrow-right.png"></image>
<!--          <layout-icon class="arrow-icon" size="16" color="#ffffff" display="inline" type="iconleft-copy"></layout-icon>-->
        </div>

      </div>
      <div class="content-box">
        <div class="content-text" v-if="message.type==='text'">{{message.content}}</div>
        <image @click="previewImg" v-if="message.type==='image'" class="content-img" :src="message.content" mode="widthFix"></image>
      </div>
    </div>
  </div>
</template>

<script>
// 消息卡片组件
import LayoutIcon from '@/componets/layout-icon/layout-icon'
export default {
  name: 'wzw-im-card',
  components: { LayoutIcon },
  props: {
    headimg: {
      type: String,
      default: 'https://newo2o.bafangka.com/uploadfiles/wkbq6nc2kc/image/202005120942194787.jpg'
    },
    message: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    previewImg () {
      const urls = [this.message.content]
      uni.previewImage({
        urls: urls
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.card-item{
  padding: 20rpx;
  .content-wrap{
    display: flex;
    flex-direction: row;

    .content-label{
      display: flex;
      align-items: center;
      .headimg{
        width: 84rpx;
        height: 84rpx;
        border-radius: 4rpx;
      }
      .content-arrow{
        position: relative;
        width: 16px;
        height: 16px;
        .arrow-icon{
          height: 16px;
          position: absolute;
          left: 0;
          top: 0;
          transform: translateY(-50%);
        }

      }
    }

    .content-box{
      max-width: 440rpx;
      overflow: hidden;
      .content-text{
        border-radius: 10rpx;
        word-break: break-all;
        color: #333333;
        font-size: 14px;
        padding: 10px 15px;
        background: #fff;
        border:1px solid rgba(224, 224, 224, 1);
      }
      .content-img{
        max-width: 200rpx;
        max-height: 500rpx;
      }
    }

  }

  .content-wrap.reverse{
    flex-direction: row-reverse;
    .content-text{
      background: #9de94d;
    }
    .content-label{

      .content-arrow{

        .arrow-icon{

        }
      }
    }
  }

}
</style>
