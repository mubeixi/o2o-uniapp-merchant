<template>
  <div class="page-wrap" @click="commonClick">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <layout-loading v-if="paginate.load"></layout-loading>
    <div class="container live-list" v-else>
      <div class="live-item" @click="toRoomFn(live.room_id)" v-for="(live,idx) in liveList" :key="idx" :style="{marginRight:idx%2===0?'20rpx':'0rpx'}">
        <div class="live-item-cover" :style="{backgroundImage:'url('+live.biz_logo+')'}">
          <div class="mask"></div>
          <div class="live-status-bar">
            <div class="live-status">
              <div class="live-icon"><layout-icon size="12" color="#fff" type="icon15"></layout-icon></div>
              <span class="p-l-3">{{live.is_start?'直播中':'直播预告'}}</span>
            </div>
            <div class="live-time">{{live.start_time_real}}开播</div>
          </div>
        </div>
        <div class="live-item-info">
          <div class="live-name fz-16 c3 fz-b m-b-10">{{live.live_name}}</div>
          <div class="live-biz">
            <image class="live-biz-logo" :src="live.biz_logo"></image>
            <div class="live-biz-name fz-12 c7 m-l-6">{{live.biz_shop_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getLiveList } from '@/api/live'
import LayoutLoading from '@/componets/layout-loading/layout-loading'
import { getDomain, objTranslate } from '@/common/helper'
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'
const livePlayer = requirePlugin('live-player-plugin')
export default {
  name: 'liveList',
  components: { WzwImTip, LayoutIcon, LayoutLoading },
  mixins: [BaseMixin],
  data () {
    return {
      liveList: [],
      paginate: {
        load: false,
        page: 1,
        page_size: 999,
        totalCount: 0
      }
    }
  },
  methods: {
    toRoomFn (room_id) {
      this.$toRoom(room_id)
    },
    callFn (idx, liveStatus) {
      console.log(idx,liveStatus,this.liveList[idx],this.liveList[idx].is_start)
      // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
      if (liveStatus === 101 || liveStatus === 105) {
        this.$set(this.liveList[idx], 'is_start', true)
      }
    },
    async _init_func () {
      try {
        const nowTimeStamp = uni.$moment().unix()
        this.paginate.load = true
        const { data: list, totalCount } = await getLiveList({ ...this.paginate }).catch(err => { throw Error(err.msg) })
        console.log(list, totalCount)
        const liveList = list.map(row => {
          return { ...row, start_live_img: getDomain(row.start_live_img), is_start: nowTimeStamp > row.start_time }
        })

        this.liveList = objTranslate(liveList)
        this.paginate.totalCount = totalCount
        await new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 100)
        })

        const _that = this
        for (var ii = 0; ii < this.liveList.length; ii++) {
          console.log(ii)
          // 如果有结果就覆盖
          livePlayer.getLiveStatus({ room_id: this.liveList[ii].room_id })
            .then(res => {
              console.log('success:get live status', res.liveStatus)
              _that.callFn(ii, res.liveStatus)
            })
            .catch(err => {
              console.log('fail:get live status', err)
            })
        }
      } catch (e) {

      } finally {
        this.paginate.load = false
      }
    }
  },
  onReachBottom () {
    // if (this.chatList.length < this.totalCount) {
    //   getChatList({
    //     page: this.paginate.page,
    //     page_size: this.paginate.page_size,
    //     out_uid: this.out_uid
    //   }).then(res => {
    //     this.paginate.page++
    //     // const _list = res.data.map(chat => {
    //     //   chat.timeText = uni.$moment(chat.created_at * 1000).startOf('day').fromNow()
    //     //   return chat
    //     // })
    //
    //     this.chatList = this.chatList.concat(res.data)
    //     this.paginate.totalCount = res.totalCount
    //   }).catch(err => {
    //     modal(err.msg || '获取消息列表失败')
    //   })
    // }
  },
  created () {
    this._init_func()
  }
}
</script>
<style lang="scss" scoped>
  .live-icon{
    animation: zy 2.5s .15s linear infinite;
  }
  .live-list{
    display: flex;
    flex-wrap: wrap;
    padding:30rpx;
    .live-item{
      position: relative;
      width: 335rpx;
      height: 420rpx;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      .live-item-info{
        position: absolute;
        width: 335rpx;
        box-sizing: border-box;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        overflow: hidden;
        padding: 10px;
        background: #fff;
        bottom: 0;
        left: 0;
        .live-name{

        }
        .live-biz{
          display: flex;
          align-items: center;
          .live-biz-logo{
            width: 16px;
            height: 16px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
      }
      .live-item-cover{
        position: relative;
        width: 335rpx;
        height: 420rpx;
        @include cover-img();
        .live-status-bar{
          position: relative;
          z-index: 3;
          padding: 6px 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          color: #fff;
          .live-status{
            display: flex;
            height: 14px;
            align-items: center;
            padding: 2px 7px;
            border-radius: 8px;
            background: $fun-red-color;
          }
        }
        .mask{
          position: absolute;
          z-index: 2;
          top: 0;
          width: 335rpx;
          height: 130rpx;
          background: linear-gradient(180deg, rgba(0,0,0,.6) , rgba(0,0,0,0));
        }
      }
    }
  }

</style>
