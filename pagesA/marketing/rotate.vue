<template>
  <view @click="commonClick" class="wrap" v-if="ready">
    <image :src="'/static/client/marketing/rotate-bg.jpg'|domain" class="bgimg" />
    <div class="rotate-box" v-if="itemList.length>3">
      <div class="item">
        <div :style="{backgroundColor:getStyle(0)}" class="goods">
          <div class="picbox">
            <image :src="itemList[0].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==0}" class="name">{{itemList[0].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(0,1)}" class="mask"></div>
      </div>
      <div class="item">
        <div :style="{backgroundColor:getStyle(1)}" class="goods">
          <div class="picbox">
            <image :src="itemList[1].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==1}" class="name">{{itemList[1].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(1,1)}" class="mask"></div>
      </div>
      <div class="item" style="margin-right: 0">
        <div :style="{backgroundColor:getStyle(2)}" class="goods">
          <div class="picbox">
            <image :src="itemList[2].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==2}" class="name">{{itemList[2].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(2,1)}" class="mask"></div>
      </div>
      <div class="item">
        <div :style="{backgroundColor:getStyle(7)}" class="goods">
          <div class="picbox">
            <image :src="itemList[7].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==7}" class="name">{{itemList[7].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(7,1)}" class="mask"></div>
      </div>
      <div @click="startFn" class="item">
        <div class="goods start-btn">
          {{getStartTip}}

        </div>
        <div class="mask start-btn-mask"></div>
      </div>

      <div class="item" style="margin-right: 0">
        <div :style="{backgroundColor:getStyle(3)}" class="goods">
          <div class="picbox">
            <image :src="itemList[3].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==3}" class="name">{{itemList[3].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(3,1)}" class="mask"></div>
      </div>
      <div class="item">
        <div :style="{backgroundColor:getStyle(6)}" class="goods">
          <div class="picbox">
            <image :src="itemList[6].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==6}" class="name">{{itemList[6].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(6,1)}" class="mask"></div>
      </div>
      <div class="item">
        <div :style="{backgroundColor:getStyle(5)}" class="goods">
          <div class="picbox">
            <image :src="itemList[5].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==5}" class="name">{{itemList[5].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(5,1)}" class="mask"></div>
      </div>
      <div class="item" style="margin-right: 0">
        <div :style="{backgroundColor:getStyle(4)}" class="goods">
          <div class="picbox">
            <image :src="itemList[4].img|domain" class="pic" mode="widthFix" />
          </div>
          <div :class="{active:activeIdx==4}" class="name">{{itemList[4].name}}</div>
        </div>
        <div :style="{backgroundColor:getStyle(4,1)}" class="mask"></div>
      </div>

    </div>

    <div class="num-count">
      <image :src="'/static/client/marketing/num_count.png'|domain" class="num-count-img" />
      <div class="text fz-14">今日剩余抽奖次数<span class="fz-16 color-red" style="">{{day_count}}</span>次,总剩余抽奖次数<span
        class="fz-16 danger-color" style="">{{total_count}}</span>次
      </div>
    </div>

    <div class="reward-list">
      <span @click="showRewardList">我的中奖记录</span>
      <span @click="goPerson" style="margin-left: 10px;">个人中心</span>
    </div>

    <div class="tip-box">
      <div class="title">抽奖规则</div>
      <div style="color: white">
        <text style="font-size: 14px;line-height: 1.6;">
          {{tipText}}
        </text>
      </div>
    </div>

    <layout-modal bgColor="rgba(0,0,0,.7)" mainBgColor="none" positions="top" ref="record">
      <div class="record-container">
        <div class="top">
          <image :src="'/static/client/marketing/records_bg.png'|domain" class="record-bg" />
          <div class="record-box">
            <div class="title">我的中奖记录</div>
            <scroll-view class="table" scroll-y>
              <div class="tr">
                <div class="th time">时间</div>
                <div class="th prize">奖品</div>
              </div>
              <div class="tr" v-for="(item,idx) in record_list" :key="idx">
                <div class="td time">{{item.time}}</div>
                <div class="td prize">{{item.prize}}</div>
              </div>
            </scroll-view>
          </div>

        </div>
        <div @click="cancelRecordDialog" class="btn-box">
          <image :src="'/static/client/marketing/close-btn.png'|domain" class="close" />
        </div>
      </div>
    </layout-modal>

    <layout-modal bgColor="rgba(0,0,0,.7)" mainBgColor="none" ref="result">
      <div @click="cancelDialog" class="result-container">
        <div class="top">
          <image :src="'/static/client/marketing/result.png'|domain" class="result-bg" />
          <div class="text">
            <div class="text-row line6">恭喜您</div>
            <div class="text-row reward">{{result_tip}}</div>
          </div>
        </div>

        <div @click="cancelDialog" class="btn-box">
          <image :src="'/static/client/marketing/close-btn.png'|domain" class="close" />
        </div>
      </div>
    </layout-modal>

  </view>
</template>

<script>
import { getRotateRecord, rotateBegin, rotateInit } from '@/api/common'
import { Rotate } from '@/common/luck'
import { checkIsLogin, findArrayIdx } from '@/common/helper'
import { backFunc, confirm, error, hideLoading, linkTo, showLoading, toast } from '@/common/fun'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutPopup from '@/componets/layout-popup/layout-popup'
import LayoutModal from '@/componets/layout-modal/layout-modal'

const rotateInstance = new Rotate()

export default {
  name: 'Rotate',
  mixins: [BaseMixin],
  components: {
    LayoutModal,
    LayoutPopup,

  },
  data () {
    return {
      ready: false,
      start_num: 0,
      total_count: 0,
      day_count: 0,
      activity_id: null,
      rotateObj: null,
      itemList: [],
      tipText: '',
      img_url: '',
      result_tip: '',
      record_list: []
    }
  },

  methods: {

    goPerson () {
      linkTo('/pages/user/index')
    },
    async showRewardList () {
      this.$refs.record.show()
      getRotateRecord({
        id: this.activity_id,
        pageSize: 999
      }, { tip: '获取中' }).then(res => {
        this.record_list = res.data
      })
    },
    async init_func () {
      try {
        showLoading()
        const res = await rotateInit({ id: this.activity_id }).then(res => {
          return res
        }).catch(e => {
          throw Error(e.msg || '转盘信息加载失败')
        })

        if (res.data.prizes && Array.isArray(res.data.prizes)) {
          this.total_count = res.data.total_count
          this.day_count = res.data.day_count
          this.tipText = res.data.describe
          rotateInstance.setList(res.data.prizes)
          this.itemList = rotateInstance.getItemList()
          this.ready = true
        } else {
          throw Error('转盘信息初始化失败')
        }
      } catch (error) {
        confirm({
          title: '提示',
          content: error.message,
          showCancel: false
        }).then(() => {
          backFunc()
        }).catch(() => {
        })
      } finally {
        hideLoading()
      }
    },
    cancelRecordDialog () {
      this.$refs.record.close()
    },
    cancelDialog () {
      this.$refs.result.close()
    },
    async startFn () {
      if (!checkIsLogin(1)) return

      if (rotateInstance.is_start) {
        return // 已经启动过程中无法再触发
      }

      if (this.day_count < 1) {
        toast('今日次数已用完，明天再来吧')
        return
      }

      if (this.total_count < 1) {
        toast('您的抽奖总次数用完啦')
        return
      }
      this.total_count--
      this.day_count--

      // 记录点了几次开奖，这个暂时用不到
      this.start_num++

      rotateInstance.start(999, 10)
      await rotateBegin({ id: this.activity_id }).then(res => {
        // desc: "很遗憾，未中奖"
        // id: 2
        // prize: 0
        const { desc, id, prize } = res.data
        // 获取中奖的下标
        const idx = findArrayIdx(this.itemList, { id: id })
        console.log(idx)
        // //修改限制圈数
        rotateInstance.setRotateNum(rotateInstance.rotate_count + 5)
        // 设置跳转的方块
        rotateInstance.setLuckNum(Number(idx) + 1)
        // 这是提示
        rotateInstance.setReward(res.data)

        rotateInstance.setCallFn(this.showResult)
      }).catch(e => {

      })
    },
    showResult (idx, name) {
      // uni.showModal({
      //     title:"中奖提示",
      //     content:'恭喜中奖，中奖id:'+idx+'中奖内容为'+name
      // })

      if (rotateInstance.reward.prize) {
        this.result_tip = rotateInstance.reward.desc// `${name}`
        this.$refs.result.show()
      } else {
        error(rotateInstance.reward.desc || '没有中奖哦，再试一次吧')
      }
    },
    getStyle (idx, is_mask) {
      try {
        if (this.activeIdx >= 0) {
          if ((idx != this.activeIdx) && !is_mask) return '#FFEBEB'
          if ((idx != this.activeIdx) && is_mask) return '#FFC2C8'
        }

        // if((idx!=this.activeIdx || !rotateInstance.isStart()) && !is_mask)return '#FFEBEB'
        // if((idx!=this.activeIdx || !rotateInstance.isStart()) && is_mask)return '#FFC2C8'
        const bgColor = '#FFD800'// rotateInstance.getBgColor(idx)
        return bgColor // `background-color:${bgColor}`
      } catch (e) {
        const bgColor = '#FFD800'// rotateInstance.getBgColor(idx)
        return bgColor // `background-color:${bgColor}`
      }
    },

    getTextStyle (idx) {
      if (idx == this.activeIdx) return '#fff'
    }
  },
  computed: {
    getStartTip () {
      // if(this.start_num>0 && this.total_count>0){
      //     return '再来一次'
      // }
      return '立即抽奖'
    },
    activeIdx () {
      try {
        return rotateInstance.getIdx()
      } catch (e) {
        return -1
      }
    }
  },
  filters: {},
  onLoad (options) {
    const { activity_id = 0 } = options
    this.activity_id = activity_id
  },
  mounted () {
    // this.$nextTick().then(res=>{
    //     this.showRewardList()
    // })
  },

  onShow () {
    this.init_func()
  },
  created () {
    // this.$fun.checkIsLogin(1)
    this.rotateObj = rotateInstance
    // rotateInstance.setCallFn(this.showResult)
    // this.itemList = rotateInstance.getItemList()
    // rotateInstance.start()
  }

}
</script>

<style lang="scss" scoped>
  .record-container {

    .top {
      position: relative;
      text-align: center;
      width: 656rpx;
      height: 902rpx;
      margin: 0 auto;

      .record-bg {
        position: absolute;
        width: 656rpx;
        height: 902rpx;
        top: 0;
        left: 0;
        z-index: 1;
      }

      .record-box {
        position: relative;
        z-index: 4;
        padding: 130rpx 30rpx;
      }

      .title {
        margin: 30rpx 0;
        color: #e84428;
        position: relative;
        z-index: 4;
      }

      .table {
        font-size: 14px;
        height: 540rpx;
        overflow-y: scroll;
        overflow-x: hidden;

        .tr {
          height: 60rpx;
          line-height: 60rpx;
          display: flex;

          .td {
            text-align: center;
          }

          .th {
            text-align: center;
            background: #fff1ee;
            color: #333333;
          }

          .time {
            width: 200rpx;
            color: #666;
          }

          .prize {
            color: #666;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

    }

    .btn-box {
      text-align: center;
      margin-top: 30rpx;

      .close {
        width: 70rpx;
        height: 70rpx;
        margin: 0 auto;
      }
    }

  }

  .reward-list {
    right: 70rpx;
    text-align: right;
    position: absolute;
    top: 1273rpx;
    width: 750rpx;
    font-size: 14px;
    text-decoration: underline;
    color: white;
  }

  .tip-box {
    width: 650rpx;
    position: absolute;
    top: 1330rpx;
    left: 50rpx;
    overflow: hidden;
    padding-bottom: 30px;

    .title {
      color: #FFD800;
      margin-bottom: 10px;
    }
  }

  .num-count {
    width: 660rpx;
    height: 90rpx;
    position: absolute;
    top: 1163rpx;
    left: 45rpx;

    .text {
      position: absolute;
      width: 660rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      z-index: 3;
      color: #925507;
    }

    .num-count-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 660rpx;
      height: 90rpx;

    }
  }

  .result-container {

    .top {
      position: relative;
      text-align: center;
      width: 750rpx;
      padding-top: 580rpx;

      .result-bg {
        position: absolute;
        width: 750rpx;
        height: 580rpx;
        left: 0;
        top: 0;
        z-index: 1;
      }

      .text {
        position: absolute;
        z-index: 3;
        width: 750rpx;
        text-align: center;
        top: 240rpx;
        left: 0;

        .text-row {
          color: #FF0000;
          /*width: 228rpx;*/
          /*margin: 0 auto;*/
          text-align: center;
          line-height: 1.4;

          &.reward {
            width: 260rpx;
            margin: 0 auto;
            height: 120rpx;
            font-size: 12px;
            line-height: 12px;
            text-overflow: ellipsis;
            overflow: hidden;
            word-wrap: break-word;
          }

        }
      }

    }

    .btn-box {
      text-align: center;
      margin-top: 60rpx;

      .close {
        width: 70rpx;
        height: 70rpx;
        margin: 0 auto;
      }
    }

  }

  .wrap {

    background: #ef1828;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
    width: 750rpx;
  }

  .bgimg {
    width: 750rpx;
    height: 1434rpx;
  }

  .rotate-box {
    width: 460rpx;
    height: 460rpx;
    /*background: white;*/
    position: absolute;
    left: 50%;
    top: 565rpx;
    transform: translate(-50%);
    /*padding: 20rpx;*/
    z-index: 32;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    overflow: hidden;
    padding: 10rpx;
    box-sizing: border-box;

    .item {
      width: 140rpx;
      height: 140rpx;
      text-align: center;
      box-sizing: border-box;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
      position: relative;

      .start-btn {
        height: 130rpx;
        line-height: 130rpx;
        padding: 0 !important;
        font-size: 14px;
        background: #FFD800 !important;
        color: #AB6102;
      }

      .start-btn-mask {
        background: #FFB001 !important;
      }

      .goods {
        z-index: 3;
        position: absolute;
        width: 140rpx;
        height: 130rpx;
        padding: 10rpx 0;
        box-sizing: border-box;
        background: #FFEBEB;
        border-radius: 10rpx;
      }

      .mask {
        z-index: 2;
        width: 140rpx;
        position: absolute;
        top: 10rpx;
        height: 130rpx;
        padding: 10rpx 0;
        box-sizing: border-box;
        background: #FFC2C8;
        border-radius: 10rpx;
      }

      .picbox {
        width: 70rpx;
        height: 70rpx;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
      }

      .pic {
        position: absolute;
        width: 70rpx;
        max-height: 70rpx;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .name {
        margin: 10rpx auto 0;
        height: 40rpx;
        width: 140rpx;
        color: #2f2f2f;
        text-align: center;
        line-height: 40rpx;
        font-size: 20rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.active {
          color: #AB6102;
        }
      }
    }
  }
</style>
