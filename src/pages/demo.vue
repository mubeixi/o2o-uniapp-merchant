<template>
  <div @click="commonClick" class="page-wrap">

    <div>
      {{$t('t_comm_Time')}}
    </div>
    <div @click="clickFn">
      切换
    </div>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import WzwImTip from '@/components/wzw-im-tip/wzw-im-tip'
import LayoutIcon from '@/components/layout-icon/layout-icon'

export default {
  name: 'liveList',
  components: { WzwImTip, LayoutIcon },
  mixins: [BaseMixin],
  data () {
    return {

    }
  },
  methods: {
    clickFn(){
      this.$setLocale('en')
    }
  },
  onLoad () {

  },
  onReachBottom () {

  }
}
</script>
<style lang="scss" scoped>
  .page-wrap{
    //background-color: #f7f7f7;
  }

</style>
