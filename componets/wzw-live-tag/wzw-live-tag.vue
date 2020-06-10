<template>
  <div class="live-status" @click="bindToRoom" v-if="liveStatus ==101 || liveStatus ==102 || liveStatus ==105">
    <layout-icon color="#fff" display="inline" size="14" type="iconicon-count"></layout-icon>
    <block v-if="liveStatus ==101 || liveStatus ==105">
      直播
    </block>
    <block v-else>
      直播预告
    </block>
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
import moment from 'moment'
const livePlayer = requirePlugin('live-player-plugin')
export default {
  name: 'wzw-live-tag',
  components: { LayoutIcon },
  props: {
    productInfo: {
      required: true,
      type: Object
    },
    room_id: {
      required: true,
      type: [Number, String]
    }
  },
  watch: {
    room_id: {
      immediate: true,
      handler (roomId) {
        console.log('room_id value change', roomId)
        if (!roomId) return

        this.refreshLiveStatus(roomId)
      }
    }
  },
  data () {
    return {
      intervalInstance: null,
      liveStatus: 0
    }
  },
  methods: {
    async refreshLiveStatus (roomId) {
      console.log('roomid is ' + roomId)
      if (!livePlayer) {
        throw Error('直播的运行换件创建失败')
      }

      const { live_end_time, live_start_time } = this.productInfo
      const nowTimeStamp = moment().unix()
      console.log(nowTimeStamp)
      if (live_end_time && live_start_time) {
        if (nowTimeStamp > live_start_time && nowTimeStamp < live_end_time) {
          this.liveStatus = 101
        }

        if (nowTimeStamp < live_start_time) {
          this.liveStatus = 102
        }
      }

      //如果有结果就覆盖
      livePlayer.getLiveStatus({ room_id: roomId })
        .then(res => {
          // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
          this.liveStatus = res.liveStatus
          console.log('get live status', res.liveStatus)
        })
        .catch(err => {
          console.log('get live status', err)
        })

      // 往后间隔1分钟或更慢的频率去轮询获取直播状态
      // this.intervalInstance = setInterval(() => {
      //   console.log('check live status：@room_id '+roomId)
      //   livePlayer.getLiveStatus({ room_id: roomId })
      //     .then(res => {
      //       // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
      //       this.liveStatus = res.liveStatus
      //       console.log('get live status', res.liveStatus)
      //     })
      //     .catch(err => {
      //       console.log('get live status', err)
      //     })
      // }, 70000)

      // const { liveStatus } = await livePlayer.getLiveStatus({ room_id: roomId })
      //   .catch(err => {
      //     console.log('get live status fail', err)
      //     return -1
      //   })
      // // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
      // this.liveStatus = liveStatus
      // console.log('get live status success', liveStatus)
    },
    bindToRoom () {
      this.$toRoom(this.room_id)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalInstance)
  }
}
</script>
<style lang="scss" scoped>
  .live-status {
    display: inline-block;
    margin-right: 4px;
    background: linear-gradient(#F53636, #FF5539);
    color: #fff;
    font-size: 10px;
    padding: 0 4px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
</style>
