<template>
	<view  class="myall">
		<!-- #ifdef APP-PLUS -->
				<view class="status_bar" style="background:#2e323c;"></view>
		<!-- #endif -->
		<view class="top">
			<image class="widthTen" src="/static/taskCenter.png" ></image>
      <layout-icon class="goBack" @click="goBack"  type="iconicon-arrow-left" size="20"></layout-icon>

			<view class="titles">任务中心</view>
			<view class="center">
				<!-- <image class="widthTen" :src="'/static/client/task/center.png" ></image> -->
				<image class="widthTen" :src="pro.img_url" ></image>
				<view class="info">
					<image :src="pro.avatar" class="widthTen" ></image>
				</view>
				<view class="nickName" v-if="pro.nickname">
					{{pro.nickname}}
				</view>
				<view class="vip" v-if="pro.level_name">
					{{pro.level_name}}
					<image class="image" :src="'/static/client/task/right.png'|domain"></image>
				</view>
				<view class="zhangValue">
					<view class="view" :style="{width:(pro.growth_value/pro.upper_growth)*100+'%'}">

					</view>
				</view>
				<view class="myValue" v-if="pro.growth_value">
					{{pro.growth_value}}/{{pro.upper_growth}}
				</view>
				<view class="shengji" v-if="pro.need_growth>0">
					升级
				</view>
				<view class="numberValue" v-if="pro.growth_value">
					{{pro.growth_value}}
				</view>
				<view class="valueM">
					成长值
					<image class="image" :src="'/static/client/task/sanjiao.png'|domain"></image>
				</view>
			</view>
		</view>
		<view style="height: 60rpx;"></view>
		<circleTitle title="我的特权"></circleTitle>
		<view class="myPrivilege">
			<view class="view" v-for="(i,j) of pro.basic" :key="j">
				{{j+1}}、{{i.name}}
			</view>
		</view>
		<view style="height: 20rpx;width: 100%;background-color: #F8F8F8;">

		</view>
		<circleTitle title="如何升级"></circleTitle>

		<view class="ruhe">
			<view class="td" v-for="(it,ind) of pro.obtain" :key="ind">
				<image class="image" :src="it.img_url"></image>
				<view class="mbx">
					<view class="tops">
						{{it.name}}
					</view>
					<view class="bottoms">
						{{it.desc}}
					</view>
				</view>

				<view class="submit" @click="yulan(it)"  v-if="it.done==0&&ind=='focus'">
					去完成
				</view>
				<view class="submit" @click="goJump(it)"  v-else-if="it.done==0">
					去完成
				</view>
				<view class="submit submitMbx"   v-if="it.done==1">
					已完成
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	import circleTitle from '@/componets/circleTitle/circleTitle'
  import LayoutIcon from '@/componets/layout-icon/layout-icon'
	import BaseMixin from '@/mixins/BaseMixin'
	import {getTaskCenter} from '@/api/customer'
	export default {
		mixins:[BaseMixin],
		data() {
			return {
				pro:[],
			};
		},
		components:{
			circleTitle,LayoutIcon
		},
		computed:{
			initData () {
				return this.$store.state.system.initData
			},
		},
		onShow() {
			this.getTaskCenter();
		},
		methods:{
			yulan(index){
				if(this.initData.SubscribeQrcode){
					let arr=[]
					arr.push(this.initData.SubscribeQrcode)
					uni.previewImage({
						urls:arr,
						indicator:'default',
						current:1
					});
				}else{
					this.goJump(item)
				}

			},
			getTaskCenter(){
				getTaskCenter().then(res=>{
					this.pro=res.data;
				}).catch(e=>{
				})
			},
			goJump(item){
				if(item.cu){
					uni.switchTab({
						url:item.jump_url
					})
				}else{
					uni.navigateTo({
						url:item.jump_url
					})
				}

			},
			goBack(){
				this.$back()
			}
		}
	}
</script>

<style lang="scss" scoped>
.myall{
	min-height: 100vh;
	background-color: #FFFFFF !important;
}
.top{
	width: 750rpx;
	height: 404rpx;
	position: relative;
	.widthTen{
		width: 100%;
		height: 100%;
	}
	.goBack{
		width: 20rpx;
		height: 30rpx;

		position: absolute;
		top: 30rpx;
		left: 20rpx;
	}
	.titles{

		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		top: 29rpx;
		left: 312rpx;
		height: 31rpx;
		line-height: 31rpx;
	}
	.center{
		width: 727rpx;
		height: 344rpx;
		position: absolute;
		left: 12rpx;
		top: 110rpx;
		.info{
			width: 93rpx;
			height: 92rpx;
			overflow: hidden;
			position: absolute;
			left: 57rpx;
			top: 64rpx;
			border-radius: 50%;
		}
		.nickName{
			height:29rpx;
			line-height: 29rpx;
			font-size:30rpx;
			font-weight:bold;
			color:#5B412D;
			position: absolute;
			top: 74rpx;
			left: 165rpx;
		}
		.vip{
			width:121rpx;
			height:35rpx;
			line-height: 35rpx;
			background:rgba(226,188,146,1);
			border-radius:18rpx;
			position: absolute;
			top: 116rpx;
			left: 164rpx;
			font-size: 20rpx;
			color: #FFFFFF;
			text-align: center;
			.image{
				width: 10rpx;
				height: 17rpx;
				margin-left: 6rpx;
			}
		}
		.zhangValue{
			width:138rpx;
			height:10rpx;
			background:rgba(133,99,72,1);
			border-radius:5rpx;
			position: absolute;
			top: 115rpx;
			left: 302rpx;
			.view{
				background-color: #FFFFFF;
				height: 10rpx;
			}
		}
		.myValue{
			height:17rpx;
			line-height: 17rpx;
			font-size:18rpx;
			font-weight:500;
			color:rgba(102,70,48,1);
			position: absolute;
			top: 134rpx;
			left: 304rpx;
		}
		.shengji{
			//width:38rpx;
			height:22rpx;
			font-size: 10px;
			color: #FFFFFF;
			line-height: 22rpx;
			background:rgba(133,99,72,1);
			border-radius:3rpx;
			position: absolute;
			top: 132rpx;
			left: 399rpx;
			text-align: center;
			padding-left: 4px;
			padding-right: 4px;
		}
		.numberValue{
			height:32rpx;
			font-size:42rpx;
			font-weight:bold;
			color:rgba(91,65,45,1);
			line-height:32rpx;
			position: absolute;
			top: 196rpx;
			left: 63rpx;
		}
		.valueM{
			height:20rpx;
			font-size:20rpx;
			font-weight:500;
			color:rgba(91,65,45,1);
			line-height:20rpx;
			position: absolute;
			top: 240rpx;
			left: 61rpx;
			.image{
				width: 8rpx;
				height: 12rpx;
				margin-left: 8rpx;
			}
		}
	}
}
.myPrivilege{
	margin: 0 auto;
	width: 710rpx;
	margin-bottom: 30rpx;
	.view{
		font-size: 24rpx;
		color: #666666;
		height: 50rpx;
		line-height: 50rpx;
	}
}
.ruhe{
	width:710rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 12rpx 0px rgba(0, 0, 0, 0.25);
	border-radius:10rpx;
	margin: 0 auto;
	margin-top: 10rpx;
	.td{
		width: 690rpx;
		margin: 0 auto;
		height: 124rpx;
		border-bottom: 1rpx solid #ECE8E8;
		display: flex;
		align-items: center;
		&:last-child{
			border-bottom: 0rpx;
		}
		.image{
			width: 65rpx;
			height: 65rpx;
			margin-left: 21rpx;
		}
		.mbx{
			height: 65rpx;
			margin-left: 24rpx;
			.tops{
				height:27rpx;
				line-height: 27rpx;
				color: #333333;
				font-weight: bold;
				font-size: 28rpx;
			}
			.bottoms{
				margin-top: 15rpx;
				height:23rpx;
				line-height: 23rpx;
				font-size:24rpx;
				color: #999999;
			}
		}
		.submit{
			width:110rpx;
			height:45rpx;
			line-height: 45rpx;
			background:rgba(244,49,49,1);
			border-radius:8rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			text-align: center;
			margin-left: auto;
			margin-right: 20rpx;
		}
		.submitMbx{
			background-color: #dedede !important;
		}
	}
}

</style>
