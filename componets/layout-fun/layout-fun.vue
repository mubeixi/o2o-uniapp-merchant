<template>
	<div class="item" :style="{width}">
		<LayoutIcon :rotate="rotate" :type="type" :weight="weight" :display="display" :color="color" :size="size"></LayoutIcon>
		<div class="icon-name">{{name}}</div>
	</div>
</template>
<script>
import LayoutIcon from '@/componets/layout-icon/layout-icon'
export default {
  components: {
    LayoutIcon
  },
	props: {
  	width:{
		  type: String,
		  default: '80rpx'
	  },
    rotate: {
      type: String,
      default: '0deg'
    },
    type: {
      require: true,
      type: String,
      default: ''
    },
    weight: {
      type: String,
      default: 'normal'
    },
    display: {
      type: String,
      default: 'block'
    },
    color: {
      type: String,
      default: '#666'
    },
    size: {
      type: [Number, String],
      default: 28
    },
		name: {
      type: String,
			default: ''
		}
	}
}

</script>
<style lang="scss" scoped>
	.item {

		text-align: center;
		font-size: 24rpx;
		color: #333;
		margin-bottom: 67rpx;
	}
	.icon-name {
		text-align: center;
	}
</style>
