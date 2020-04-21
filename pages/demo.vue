<style lang="scss" scoped>
.tag{

}
</style>

<template>
  <div class="tag">
  </div>
</template>

<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
export default {
  name: 'Demo',
  components: { LayoutIcon },
  props: {
	  text: {
	    required: true,
      type: String
    },
    fontSize:12,
    plain:{
	    default:false,
      type:Boolean
    },
    mode:{
	    default:'cube'//round
    }
  },
  data () {
	  return {

    }
  }
}
</script>
