<template>
  <div class="page-wrap">
    <layout-loading v-if="paginate.load"></layout-loading>
    <div class="container live-list" v-else>
      <div class="live-item" v-for="(live,idx) in liveList" :key="idx" :style="{marginRight:idx%2===0?'20rpx':'0rpx'}">
        <div class="live-item-cover" :style="{backgroundImage:'url('+live.start_live_img+')'}">
          <div class="mask"></div>
          <div class="live-status-bar">
            <div>直播预告</div>
            <div>7月8日14:14开播</div>
          </div>
        </div>
        <div class="live-item-info">{{live.anchor_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getLiveList } from '@/api/live'
import LayoutLoading from '@/componets/layout-loading/layout-loading'
import { getDomain } from '@/common/helper'

export default {
  name: 'liveList',
  components: { LayoutLoading },
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
    async _init_func () {
      try {
        this.paginate.load = true
        const { data:list, totalCount } = await getLiveList({ ...this.paginate }).catch(err => { throw Error(err.msg) })
        console.log(list, totalCount)
        this.liveList = list.map(row => {
          return { ...row, start_live_img: getDomain(row.start_live_img) }
        })
        this.paginate.totalCount = totalCount
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
.live-list{
  display: flex;
  padding:30rpx;
  .live-item{
    width: 335rpx;
  }
}

</style>
