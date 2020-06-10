<template>
  <div class="live-status" @click="bindToRoom" v-if="liveStatus ===101 || liveStatus ===102 || liveStatus ===105">
    <layout-icon color="#fff" display="inline" size="14" type="iconicon-count"></layout-icon>
    <block v-if="liveStatus ==101 || liveStatus ==105">
      直播
    </block>
    <block v-else>
      直播
    </block>
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
const livePlayer = requirePlugin('live-player-plugin')
export default {
  name: 'wzw-live-tag',
  components: { LayoutIcon },
  props: {
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
        if (!livePlayer) {
          throw Error('直播的运行换件创建失败')
        }
        console.log('roomid is ' + roomId)
        livePlayer.getLiveStatus({ room_id: roomId })
          .then(res => {
            // 101: 直播中, 102: 未开始, 103: 已结束, 104: 禁播, 105: 暂停中, 106: 异常，107：已过期
            this.liveStatus = res.liveStatus
            console.log('get live status success', res.liveStatus)
          })
          .catch(err => {
            console.log('get live status fail', err)
          }).finally(ee => {
            console.log(ee)
          })
      }
    }
  },
  data () {
    return {
      liveStatus: 0
    }
  },
  methods: {
    bindToRoom () {
      this.$toRoom(this.room_id)
    }
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
