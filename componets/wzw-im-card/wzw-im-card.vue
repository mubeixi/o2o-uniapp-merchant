<template>
  <div class="card-item">
    <div class="time"></div>
    <div class="content-wrap">
      <div class="content-label">
        <div class="headimg" :style="{backgroundImage:'url('+headimg+')'}"></div>
        <layout-icon color="content-arrow" type="iconright"></layout-icon>
      </div>
      <div class="content-text">{{message.content}}</div>
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
  }
}
</script>
<style lang="scss" scoped>
.from{
  background:rgba(255,255,255,1);
  border:1px solid rgba(224, 224, 224, 1);
}
.to{
  background:rgba(157,233,77,1);
  border:1px solid rgba(224, 224, 224, 1);
}
.card-item{
  .content-wrap{
    display: flex;
    .content-label{
      display: flex;
      align-items: center;
      .headimg{
        width: 84rpx;
        height: 84rpx;
        border-radius: 4rpx;
      }
      .content-arrow{
      
      }
    }

    .content-text{
      color: #333333;
      font-size: 14px;
      padding: 14px 18px;
    }

  }
}
</style>
