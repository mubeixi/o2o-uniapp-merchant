 <template>
	<div>
		<div class="vip-center-top">
			<image src="/static/person/vipTopBg.png" class="imgFull"></image>

			<swiper class="center" :indicator-dots="false" :autoplay="false"  :duration="1000" :current="inds" @change="change">
				<swiper-item class="vipFir"  >
					<!-- v-for="(item,index) of pro.levels" :key="index"  :style="pro.levels.length==1?'margin-left:43rpx;':''"-->

				</swiper-item>
			</swiper>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
.vip-center-top{
	width: 750rpx;
	height: 232px;
	position: relative;
}


</style>
