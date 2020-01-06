<template>
	<view @click="commonClick" style="position: relative;">
		<!-- #ifdef APP-PLUS -->
		<!-- 这里是状态栏 -->
		<view class="status_bar" style="position: fixed;background-color: white;top:0;left:0;z-index: 99;"></view>
		<!-- #endif -->
		<view class="home-wrap"  :style="{background:system.bgcolor}">

			<section :ref="item" v-for="(item, index) in templateList[tagIndex]" :key="index" class="section" :class="[item]"  :data-name="item" >
				<base-component v-if="item.indexOf('base') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<swiper-component v-if="item.indexOf('swiper') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<nav-component v-if="item.indexOf('nav') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<video-component ref="video" v-if="item.indexOf('video') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<hr-component v-if="item.indexOf('hr') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<space-component v-if="item.indexOf('space') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<title-component v-if="item.indexOf('title') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<text-component v-if="item.indexOf('text') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<search-component v-if="item.indexOf('search') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<notice-component v-if="item.indexOf('notice') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<coupon-component v-if="item.indexOf('coupon') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<goods-component v-if="item.indexOf('goods') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<cube-component v-if="item.indexOf('cube') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<tab-component v-if="item.indexOf('tab') !== -1" :confData="templateData[tagIndex][index]" :index="index" />
				<group-component v-if="item.indexOf('group') !== -1" :confData="templateData[tagIndex][index]" :index="index"  />
				<flash-component v-if="item.indexOf('flash') !== -1" :confData="templateData[tagIndex][index]" :index="index"  />
				<kill-component v-if="item.indexOf('kill') !== -1" :confData="templateData[tagIndex][index]" :index="index"  />
			</section>
		</view>
	</view>

</template>

<script>
	import BaseComponent from "../../components/diy/BaseComponent.vue";
	import SwiperComponent from "../../components/diy/SwiperComponent.vue";
	import NavComponent from "../../components/diy/NavComponent.vue";
	import VideoComponent from "../../components/diy/VideoComponent.vue";
	import HrComponent from "../../components/diy/HrComponent.vue";
	import SpaceComponent from "../../components/diy/SpaceComponent.vue";
	import TitleComponent from "../../components/diy/TitleComponent.vue";
	import TextComponent from "../../components/diy/TextComponent.vue";
	import SearchComponent from "../../components/diy/SearchComponent.vue";
	import NoticeComponent from "../../components/diy/NoticeComponent.vue";
	import CouponComponent from "../../components/diy/CouponComponent.vue";
	import GoodsComponent from "../../components/diy/GoodsComponent.vue";
	import CubeComponent from "../../components/diy/CubeComponent.vue";
	import TabComponent from "../../components/diy/TabComponent.vue";
	import GroupComponent from "../../components/diy/GroupComponent";
	import FlashComponent from "../../components/diy/FlashComponent";

	import {getSkinPreData} from "../../common/fetch";

	import {GetQueryByString} from "../../common/helper";

	import {pageMixin} from "../../common/mixin";

	export default {
		mixins:[pageMixin],
		data() {
			return {
				templateList:[],
				templateData:[],
				tagIndex:0,
				system:{}
			}
		},
		components:{
			BaseComponent,SwiperComponent,NavComponent,VideoComponent,HrComponent,SpaceComponent,
			TitleComponent,TextComponent,SearchComponent,NoticeComponent,CouponComponent,
			GoodsComponent,CubeComponent,TabComponent,FlashComponent,GroupComponent
		},

		onHide(){

			//暂停播放
			if(this.$refs.video){
				this.$refs.video.map(item=>{
					item.pauseFn()
				})
			}


		},
		methods: {

		},
		onLoad() {

			let _self = this;

			let Skin_ID = GetQueryByString(location.href,'Skin_ID'),Home_ID = GetQueryByString(location.href,'Home_ID');

			if(!Skin_ID && !Home_ID){
				this.$error('预览参数错误');
			}


			new Promise((resolve,reject) => {


				//Skin_ID,
				getSkinPreData({Home_ID}).then(res => {

					if(res.data.Home_Json){
						resolve(JSON.parse(res.data.Home_Json))
					}else{
						reject(false)
					}

				}).catch(e=>{
					console.log('获取首页模板信息失败')
					console.log(e)
				})

			})
					.then(mixinData => {

						let templateData = mixinData.plugin;
						this.system = mixinData.system;

						//存储页面数据
						this.templateData = [] //页面数据的二维数组。
						this.templateList = [] //页面组件的二维数组。
						// console.log(templateData)

						if (templateData && Array.isArray(templateData[0])) {
							//多个页面，每个页面是一个数组
							templateData.map(item => {
								this.templateData.push(item)
								this.templateList.push([])
							})
						} else if (
								templateData &&
								!Array.isArray(templateData[0]) &&
								templateData.length > 0
						) {
							//单纯是一个对象的时候？？
							this.templateData = [templateData]
							this.templateList = [[]]
						} else {
							this.templateData = [[]]
							this.templateList = [[]]
						}
						// this.templateData = templateData
						//存储页面组件templateList
						for (let i = 0; i < this.templateData.length; i++) {
							if (
									this.templateData[i] &&
									this.templateData[i] !== []
							) {
								this.templateData[i].map(m => {
									this.templateList[i].push(m.tag)
								})
							}
						}


					},err=>{})
					.catch(err => {
						console.log(err)
					})

		},
	}
</script>

<style lang="less" scope="scope">
	.home-wrap{
		width: 750upx;
		/*overflow-x: hidden;*/
		background: #f2f2f2;
		position: relative;
		min-height: 100vh;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		.section{
			position: relative;
			//搜索框特殊
			&.search{
				position:static;
			}
		}
	}
	/*.content {*/
	/*	display: flex;*/
	/*	flex-direction: column;*/
	/*	align-items: center;*/
	/*	justify-content: center;*/
	/*}*/

	/*.logo {*/
	/*	height: 200rpx;*/
	/*	width: 200rpx;*/
	/*	margin-top: 200rpx;*/
	/*	margin-left: auto;*/
	/*	margin-right: auto;*/
	/*	margin-bottom: 50rpx;*/
	/*}*/

	/*.text-area {*/
	/*	display: flex;*/
	/*	justify-content: center;*/
	/*}*/

	/*.title {*/
	/*	font-size: 36rpx;*/
	/*	color: #8f8f94;*/
	/*}*/
</style>
