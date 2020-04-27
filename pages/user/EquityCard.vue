<template>
	<div>
			<div class="equity-card">
				<swiper class="center" :indicator-dots="false" :autoplay="false" :duration="1000" :current="inds"
								@change="change">
					<swiper-item class="vipFir"  v-for="(item,index) of rightCard" :key="index">
						<image src="/static/rightCard.png" class="img-full"></image>
						<div>
							{{item.card_name}}
						</div>
					</swiper-item>
				</swiper>
			</div>

	</div>
</template>

<script>
import  {getRightsCard} from  '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
	export default {
		mixins:{BaseMixin},
		data() {
			return {
				inds:0,
				rightCard:[]
			};
		},
		methods:{
			change (e) {
				this.inds = e.mp.detail.current
			},
			async init(){
				let arr=await getRightsCard({status:1},{onlyData:true,tip:'加载中'}).catch(e=>{error(e.msg||'获取权益卡错误')})
				this.rightCard=arr
			}
		},
		onLoad(){
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.equity-card{
	background-color: #3A3731;
	height: 566rpx;
	width: 750rpx;
	padding-top: 50rpx;
	box-sizing: border-box;
}
.center {
	width: 700rpx;
	height: 400rpx;
	margin: 0 auto;
	white-space: nowrap;

	.vipFir {
		width:700rpx !important;
		height: 400rpx !important;
		display: inline-block;
		position: relative;
	}
}
</style>
