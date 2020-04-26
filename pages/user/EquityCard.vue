<template>
	<div>
			<div class="equity-card">
					<div class="equity-card-bg">

					</div>
			</div>

	</div>
</template>

<script>

import BaseMixin from '@/mixins/BaseMixin'
	export default {
		mixins:{BaseMixin},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
.equity-card{
	background-color: #3A3731;
	height: 566rpx;
	width: 750rpx;
	&-bg{
		width:690rpx;
		height:392rpx;
		background:linear-gradient(90deg,rgba(254,241,198,1),rgba(242,217,161,1));
		box-shadow:0px 2rpx 6rpx 0px rgba(255,255,255,0.79);
		border-radius:22rpx;
	}

}
</style>
