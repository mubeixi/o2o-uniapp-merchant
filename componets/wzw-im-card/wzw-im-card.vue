<template>
  <div class="card-item" :id="msgId">
    <div class="time"></div>
    <div class="content-wrap" :class="{reverse:message.direction==='to'}">
      <div class="content-label">
        <div class="flex flex-vertical-c">

          <div v-if="message.direction==='to'" class="content-arrow">
            <block v-if="message.type==='text'">
              <image mode="widthFix" class="arrow-icon" src="/static/im/chat-arrow-right.png"></image>
            </block>
            <block v-else>
              <div class="arrow-icon"></div>
            </block>
          </div>
          <div class="headimg" :style="{backgroundImage:'url('+headimg+')'}"></div>
          <div v-if="message.type==='text' && message.direction!=='to'" class="content-arrow">
            <block v-if="message.type==='text'">
              <image mode="widthFix" class="arrow-icon" src="/static/im/chat-arrow-let.png"></image>
            </block>
            <block v-else>
              <div class="arrow-icon"></div>
            </block>
          </div>
        </div>
      </div>
      <div class="content-box">
        <div class="content-text" v-if="message.type==='text'">{{message.content}}</div>
        <div v-if="message.type==='image'" class="content-img-wrap">
          <block v-if="message.tempPath">
            <image @click="previewImg" :style="{width:message.styleObj.width+'px',height:message.styleObj.height+'px'}"  class="content-img" :src="message.tempPath||message.content" ></image>
          </block>
          <block v-else>
            <image mode="widthFix" @click="previewImg" class="content-img" :src="message.content" ></image>
          </block>

          <div class="progress-box" v-if="message.taskList[0].progress<100">
            <div class="loading-box text-center">
              <image src="/static/loading.gif" class="loading-img"></image>
            </div>
            <!--<progress :percent="message.taskList[0].progress" stroke-width="2" />-->
            <div class="fz-12 color-white text-center">{{message.taskList[0].progress||0}}%</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 消息卡片组件
import LayoutLoading from '@/componets/layout-loading/layout-loading'
export default {
  name: 'wzw-im-card',
  components: { LayoutLoading },
  props: {
    msgId: {
      type: Number
    },
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
      //display: flex;
      //align-items: center;
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
          width: 8px;
          position: absolute;
          left: 0;
          top: 0;
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

      }

      .content-img-wrap{
        position: relative;
        .content-img{
          max-width: 240rpx;
          max-height: 320rpx;
          vertical-align: top;
        }
        .progree-title{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
        
        .progress-box{
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          top:0;
          z-index: 3;
          background: rgba(0,0,0,.6);
          display: flex;
          flex-direction: column;
          justify-content: center;
          
          .loading-img{
            width: 14px;
            height: 14px;
          }
        }
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
