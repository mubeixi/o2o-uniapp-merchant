<template>
	<view>
		<view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer" >

		</view>
<!--		-->
		<view ref="popRef" v-show="ifshow"  class="popup-content"   @tap.stop="stopEvent" :style="_location">
			<slot></slot>
			<div class="safearea-box2"></div>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'popup-layer',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			showPop:{
				type:Boolean,
				default:false,
			},
			direction: {
				type: String,
				default: 'bottom', // 方向  top，bottom，left，right
			},
			autoClose: {
				type: Boolean,
				default: true,
			},
			bottomHeight: {
				type: Number || string,
				default: 0
			}
		},
		data() {
			return {
				ifshow: false, // 是否展示,
				translateValue: -100, // 位移距离
				timer: null,
				iftoggle: false,

			};
		},
		computed: {
			_translate() {
				const transformObj = {
					'top': `transform:translateY(${-this.translateValue}%)`,
					'bottom': `transform:translateY(${this.translateValue}%)`,
					'left': `transform:translateX(${-this.translateValue}%)`,
					'right': `transform:translateX(${this.translateValue}%)`
				};
				return transformObj[this.direction]
			},
			_location() {
				const positionValue = {
					'top': `bottom:${this.bottomHeight}px;width:100%;`,
					'bottom': 'top:0px;width:100%;',
					'left': 'right:0px;height:100%;',
					'right': 'left:0px;height:100%;',
				};
				return positionValue[this.direction] + this._translate;
			}
		},
		mounted(){
			if(this.showPop){
				console.log(22222222222222222);
				this.show();
			}
		},
		watch:{
			showPop(value){
				console.log(value)
				if(value){
					this.show();
				}else{
					this.close();
				}
			}
		},
		methods: {
			stopMove(event){
				console.log(11);
				console.log(event);
				return;
			},
			show(events) {
				console.log('show popup')
				this.ifshow = true;

				let _open = setTimeout(() => {
					this.translateValue = 0;
					_open = null;
				}, 100)
				let _toggle = setTimeout(() => {
					this.iftoggle = true;
					_toggle = null;
				}, 300);
			},
			close() {
				console.log('close popup')
				if (this.timer !== null || !this.iftoggle) {
					return;
				}
				this.translateValue = -100;
				this.timer = setTimeout(() => {
					this.ifshow = false;
					this.timer = null;
					this.iftoggle = false;
					this.$emit('closeCallBack', null);
					this.$emit('change',false)
				}, 100);
			},
			ableClose() {
				if (this.autoClose) {
					this.close();
				}
				this.$emit('maskClicked',true);
			},
			stopEvent(event) {},
			doSome(){
				console.log(111222111111111);
			}

		}
	}
</script>

<style scoped lang="scss">
	.popup-layer {
		position: fixed;
		z-index: 999999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
		overflow: hidden;
		transition: all .3s ease;
	}

	.popup-content {
		position: fixed;
		left: 0;
		z-index: 1000000;
		background: #FFFFFF;
		transition: all .3s ease;
		overflow: hidden;
		// border:1px solid red;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

	}
	.safearea-box2{
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
		width: 100%;
		background: white;
	}
</style>
