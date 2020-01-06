<template>
	<web-view @click="commonClick" v-if="url" :src="url"></web-view>
</template>

<script>
	export default {
		data(){
			return {
				url:''
			}
		},
		onLoad(options){

			if(options.hasOwnProperty('encode') && options.encode){
				this.url = decodeURIComponent(options.url)
			}else{
				this.url = options.url
			}


			console.log('url is',this.url)
		}
	}
</script>

<style>
</style>
