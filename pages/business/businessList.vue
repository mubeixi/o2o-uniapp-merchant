<template>
	<div :class="filterShow?'hidden-mbx':''">
		<div class="business-nav-div">
			<div class="business-nav-search flex flex-vertical-center flex-between">
				<text class="wzwicon iconleft" style="font-size: 30px"></text>
				<div class="search">
					 <image src="/static/icon/searchIcon.png" class="search-icon"></image>
					<input type="text" class="search-input" name="search" placeholder="请输入商品关键词" placeholder-style="font-size:26rpx;color:#ADADAD;">
				</div>
			</div>
			<div class="business-filter flex flex-vertical-center">
					<div class="business-filter-div" @click="filterShow=true">
						<text>综合排序</text>
						<text class="wzwicon icons-arrow-bottom" style="font-size: 17px"></text>
<!--						<text class="wzwicon iconsarrowtop" style="font-size: 17px;color: #E41515"></text>-->
					</div>

					<div class="business-filter-div" @click="filterShow=true">
						<text>智能排序</text>
						<text class="wzwicon icons-arrow-bottom" style="font-size: 17px"></text>
						<!--						<text class="wzwicon iconsarrowtop" style="font-size: 17px;color: #E41515"></text>-->
					</div>

					<div class="business-filter-div" @click="filterShow=true">
						<text>附近</text>
						<text class="wzwicon icons-arrow-bottom" style="font-size: 17px"></text>
						<!--						<text class="wzwicon iconsarrowtop" style="font-size: 17px;color: #E41515"></text>-->
					</div>
			</div>
		</div>
		<div class="business-nav-div-mask"></div>

		<div class="filter-all" v-if="filterShow">
			<div class="filter-top">
				<div class="filter-top-top">
					商圈
				</div>
			</div>
			<div class="filter-center flex">
				<div class="filter-left">
					<div class="filter-font filter-active">附近</div>
					<div class="filter-font">全城</div>
				</div>
				<div class="filter-right">
					<div class="filter-font">
						郑东新区CBD(150)
					</div>
					<div class="filter-font">
						省电视台(152)
					</div>
					<div class="filter-font">
						省电视台(152)
					</div>
					<div class="filter-font">
						省电视台(152)
					</div>
				</div>
			</div>

			<div class="filter-mask"  catchtouchmove="false"  @click="filterShow=false">

			</div>

		</div>



		<div class="group-list flex ">
			<div class="group-left">
				<image src="/static/canDel/top.png" class="imgFull"></image>
			</div>
			<div class="group-right font14">
				<div class="nearby-list flex flex-between flex-vertical-center font14">
					<div class="nearby-title">
						马路边边串串香
					</div>
					<div>
						1.5km
					</div>
				</div>
				<div class="rate x-font-14 font12 flex flex-vertical-center  nearby-rate">
					<uni-rate value="4" max="5" active-color="#E41515" size='14' disabled="false"  margin="2"></uni-rate>
					<text class="font12 margin-3">4.0评分</text>
					<text>人均￥80</text>
				</div>
				<div class="nearby-value">
					89元双人餐
				</div>
			</div>
		</div>




	</div>
</template>

<script>
	import uniRate from "../../components/uni-rate/uni-rate.vue"
	import {pageMixin} from "../../common/mixin";
	export default {
		mixins:[pageMixin],
		components: {uniRate},
		data() {
			return {
				filterShow:false
			};
		}
	}
</script>

<style lang="scss" scoped>
	.hidden-mbx{
		overflow-y: hidden;
	}
	.business-nav-div-mask{
		width: 750rpx;
		height: 103px;
	}
	.business-nav-div{
		position: fixed;
		top: 0px;
		left: 0px;
		height: 103px;
		width: 750rpx;
	}
	.business-nav-search{
		height: 60px;
		width: 750rpx;
		box-sizing: border-box;
		padding: 15px 16px 15px 0px;
		background-color: #ffffff;
	}
	.business-nav-left-img{
		width: 10px;
		height: 16px;
	}
	.search{
		position: relative;
		width: 640rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.search-input {
		float: left;
		width: 640rpx;
		height: 60rpx;
		padding-left: 91rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		font-size: 26rpx;
		color: #ADADAD;
		background: #F4F4F4;
		box-sizing: border-box;
	}
	.search-icon {
		width: 17px;
		height: 17px;
		position: absolute;
		top: 7px;
		left: 20px;
	}
	.business-filter{
		width: 750rpx;
		height: 43px;
		box-sizing: border-box;
		padding-left: 20px;
		padding-right: 33px;
		font-size: 14px;
		color: #333333;
		justify-content: space-around;
	}
	.business-filter-div{
		height: 43px;
		line-height: 43px;
		flex: 1;
		text-align: center;
	}

	.group-list{width: 710rpx;padding: 10px;margin: 0 auto;box-sizing: border-box;background-color: #ffffff;margin-bottom: 10px;}
	.group-left{width: 150rpx;height: 150rpx;margin-right: 13px}
	.group-right{flex: 1;}
	.group-right-title{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 484rpx;
		padding-top: 6px;
		height: 15px;
		line-height: 15px;
		color: #333333;font-weight: bold;}
	.group-sale{
		line-height: 13px;
		height: 13px;
		color: #999999;
		margin-bottom: 12px;
	}
	.group-price{
		height: 13px;
	}
	.price-q{color: $wzw-color-price-selling;font-size: 16px;font-weight: bold;}
	.price-w{font-size: 14px;font-weight: 500;}
	.price-e{text-decoration:line-through;color: $wzw-color-price-market;font-size: 13px;margin-left: 10px;}
	.nearby-list{
		height: 14px;
		width: 484rpx;
		margin-top: 5px;
		box-sizing: border-box;
		font-size: 14px;
		border-radius:5px;
	}
	.nearby-title{
		flex: 1;
		height: 14px;
		line-height: 14px;
		margin-right: 10px;
		font-size: 15px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.nearby-rate{margin-top: 12px;margin-bottom: 0px !important;color: #666666}
	.nearby-cate{
		height: 18px;
		margin-top: 8px;
		margin-bottom: 8px;
	}
	.nearby-value{
		color: #666666;
		font-size: 10px;
		height: 10px;
		line-height: 10px;
		margin-top: 13px;
	}
	.nearby-cate-value{
		background-color: #FFF2F2;
		border-radius: 3px;
		height: 18px;
		line-height: 18px;
		text-align: center;
		padding-left: 6px;
		padding-right: 5px;
		font-size: 10px;
		color: #E41515;
		width: fit-content;
		margin-right: 5px;
	}
	.margin-3{margin-left: 3px;margin-right: 9px}


	.filter-all{z-index: 999;position: absolute;top: 103px;}

	.filter-top{
		height: 40px;
		line-height: 40px;
		width: 750rpx;
		padding-left: 20px;
		padding-right: 10px;
		box-sizing: border-box;
		background-color: #ffffff;
	}
	.filter-top-top{
		box-sizing: border-box;
		border-bottom: 1px solid #E8E8E8;
		width: 100%;
		color: #333333;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
	}

	.filter-center{
		width: 750rpx;
		padding-left:20px;
		padding-right: 20px;
		box-sizing: border-box;
		background-color: #ffffff;
	}

	.filter-left{
		width: 90px;
		margin-right: 50px;
	}
	.filter-font{
		font-size: 13px;
		color: #333333;
		line-height: 43px;
	}
	.filter-active{
		color: #E41515;
	}
	.filter-mask{
		height: 600px;
		width: 750rpx;
		opacity: 0.6;
		z-index: 99;
		background-color: #000;
	}


</style>
