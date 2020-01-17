<template>
	<view  class="wrap">
		<business-popularity></business-popularity>
	</view>
</template>

<script>
	 import {pageMixin} from "../../common/mixin";
	 import BusinessPopularity from "../../components/BusinessPopularity";
	export default {
		name:'Empty',
		components:{
			BusinessPopularity
		},
		mixins:[pageMixin],
		data() {
			return {

			}
		},
		computed:{

		},
		methods:{

		},
		created(){

		}

	}
</script>

<style lang="scss" scoped>

</style>
