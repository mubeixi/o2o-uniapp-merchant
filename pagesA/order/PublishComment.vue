<template>
	<view @click="commonClick" class="all">
		<!-- <page-title title="发表评论" rightHidden="true" bgcolor="#ffffff"></page-title> -->
		<view style="height: 40rpx;width: 100%;">

		</view>
		<view class="rate">
			<view class="rates">整体评价</view>
			<uni-rate value="5" active-color="#F43131" size='20' @change="show" margin="2"></uni-rate>
			<view class="score">
				{{Score}}
			</view>
		</view>
		<textarea style="border: 0rpx;" class="edit"  contenteditable="true" placeholder="宝贝是否满足了你的期待？说说你的使用心得，分享给其他想购买的朋友吧。" placeholder-style="place" v-model="Note">

		</textarea>

		<view class="niming">
			<view>
				匿名评价
			</view>
			<view>
				<switch checked @change="switchChange"  />
			</view>
		</view>
		<view class="shangH">
			<div class="item noborder">上传照片(最多9张)</div>
			<div class="imgs">
				<view class="shangchuans" v-for="(item,index) of imgs" :key="index"  >
					<image class="image" :src="item.path"  @click="yulan(index)"></image>
					<image :src="'/static/client/delimg.png'|domain" class="del image" @click="delImg(index)"></image>
				</view>
				<view class="shangchuan" @click="addImg"  v-if="arr.length<9">
					<view class="heng"></view>
					<view class="shu"></view>
				</view>
			</div>
		</view>
		<view class="submit" @click="submit">
			提交
		</view>
	</view>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'

import uniRate from "@/componets/uni-rate/uni-rate"

import {comment,getOrderDetail} from '@/api/order'
import { chooseImageByPromise, uploadImages, getArrColumn } from '@/common/helper'

export default {
	mixins:[BaseMixin],
	components: {uniRate},
	data() {
		return {
			productList:[],
			Note:'',
			imgs:[],//上传图片预览
			arr:[],//评价上传图片
			isSubmit:true,//是否可以提交
			Order_ID:0,//订单id
			Score:5,//评价分数
			isAnonymous:1,//是否匿名评价
			isLoadong:false
		};
	},
	onLoad(options) {
		this.Order_ID=options.Order_ID;
	},
	methods:{
		//是否匿名评价
		switchChange(e){
			if(e.target.value){
				this.isAnonymous=1;
			}else{
				this.isAnonymous=0;
			}
		},
		//评价分数
		show(value){
			this.Score=value.value;
		},
		//图片预览
		yulan(index){
			let arr=[]
			for(let item of this.imgs){
				arr.push(item.path)
			}
			uni.previewImage({
				urls: arr,
				indicator:'default',
				current:index
			});
		},
		//提交
		submit(){
			if(this.isLoadong)return
			this.isLoadong=true
			let arr=[];
			for(let item of this.arr){
				arr.push(item);
			}
			arr=JSON.stringify(arr);
			if(this.isSubmit){
				if(this.Note){
					//提交评论
					let data={
						Order_ID:this.Order_ID,
						Score:this.Score,
						Note:this.Note,
						is_anonymous:this.isAnonymous,
						image_path:arr
					}
					comment(data).then(res=>{
						uni.showToast({
							title:res.msg,
							icon:''
						})
						setTimeout(function(){
							uni.redirectTo({
								url:"/pages/order/order?index=4"
							})
						},2000)
						this.isLoadong=false
					}).catch(e=>{
						this.isLoadong=false
					})
				}else{
					uni.showToast({
						title:'您还未填写评价哦',
						icon:'none'
					})
				}
			}else{
				uni.showToast({
					title:'图片还没上传完成',
					icon:'none'
				})
			}
			this.isLoadong=false
		},
		//删除某张预览图片
		delImg(index){
			this.imgs.splice(index, 1);
			this.arr.splice(index, 1);
		},
		async addImg(){

		},
		async init(){
			let arr=await getOrderDetail({Order_ID:this.Order_ID},{onlyData:true}).catch(e=>{error(e.msg||'获取订单失败')})
			this.productList=arr.prod_list
		}
	},
	onShow(){
		this.init()
	}
}
</script>

<style lang="scss" scoped>
	.all{
		background-color: #F8F8F8;
		box-sizing: border-box;
	}
	.edit{
		box-sizing: border-box;
		width: 710rpx;
		height: 338rpx;
		border:1px solid rgba(233,233,233,1);
		border-radius:10px;
		margin: 0 auto;
		margin-top: 20rpx;
		padding-top: 23rpx;
		padding-left: 27rpx;
		padding-right: 40rpx;
		font-size: 28rpx;
		color: #333333;
		background-color: #FFFFFF;
	}
	.place{
		color: #CBCBCB !important;
		font-size: 24rpx !important;
	}
	.submit{
		width: 690rpx;
		height: 80rpx;
		margin: 0 auto;
		background-color: #F43131;
		line-height: 80rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 10rpx;
		text-align: center;
		margin-top: 65rpx;
	}

	.niming{
		width: 710rpx;
		height: 75rpx;
		margin: 0 auto;
		padding-left: 26rpx;
		padding-right: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
	}

	.item {
		display: flex;
		height: 50px;
		margin-left: 23rpx;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		border-bottom: 1px solid #E3E3E3;
	}
	.spe {
		justify-content: flex-start;
	}
	.item-left {
		margin-right: 10px;
		font-size: 28rpx;
	}
	.item-right {
		color: #888;
		font-size: 24rpx;
	}
	.noborder {
		border: none;
	}
	.item-right img {
		width: 15rpx;
		height: 23rpx;
		margin-left: 25rpx;
	}
	/* 上传图像 */
	.imgs {
		display: flex;
		padding-right: 0rpx;
		flex-wrap: wrap;
		padding-left: 20rpx;
	}
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 86rpx;
		line-height: 86rpx;
		font-size: 32rpx;
		color: #fff;
		text-align: center;
		background: #F43131;
		z-index: 9999;
	}
	/* 退款 */
	.methods,
	.reason {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 101;
		background: #fff;
		padding-top: 20px;
	}
	.m-title {
		text-align: center;
		margin-bottom: 10px;
	}
	.confirm-method {
		background: #F43131;
		color: #fff;
		text-align: center;
		line-height: 50px;
		width: 100%;
		margin-top: 20px;
	}
	.bMbx{
		padding: 0rpx 20rpx;
		.fMbx{
			font-size: 32rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			padding: 36rpx 0rpx;
		}
		.iMbx{
			display: flex;
			justify-content: space-between;
			height: 104rpx;
			border-bottom:1px solid rgba(230,230,230,1);
			align-items: center;
			font-size: 28rpx;
		}
	}
	.sure{
		height: 90rpx;
		width: 100%;
		background-color: #F43131;
		color: #fff;
		font-size: 32rpx;
		margin-top: 96rpx;
		line-height: 90rpx;
		text-align: center;
	}
	.shangchuans{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
		position: relative;
		margin-right: 20rpx;
		margin-bottom: 28rpx;
		.image{
			width: 100%;
			height: 100%;
		}
		.del{
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			top: -19rpx;
			right: -19rpx;
			z-index: 9999;
		}
	}
	.shangchuan{
		width:146rpx;
		height:146rpx;
		border:1px solid rgba(186,186,186,1);
		position: relative;
		margin-bottom: 28rpx;
		.heng{
			width: 76rpx;
			height: 3rpx;
			background-color: #BABABA;
			position: absolute;
			top: 72rpx;
			left: 35rpx;
		}
		.shu{
			width: 3rpx;
			height: 76rpx;
			background-color: #BABABA;
			position: absolute;
			top: 35rpx;
			left: 72rpx;

		}
	}
	.shangH{
		background-color: #FFFFFF;
		width: 710rpx;
		margin: 0 auto;
	}

	.rate{
		margin: 0 auto;
		width: 710rpx;
		height: 75rpx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		padding: 25rpx 0rpx;
		.rates{
			font-size: 26rpx;
			color: #333333;
			margin-left: 25rpx;
			margin-right: 22rpx;
		}
		.score{
			padding-top: 5rpx;
			font-size:26rpx;
			font-weight:500;
			color: #F43131;
			margin-left: 15rpx;
		}
	}
</style>
