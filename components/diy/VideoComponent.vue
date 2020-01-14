<template>
    <view class="video" style="z-index: 1;position: relative;">
        <!-- @error="videoErrorCall back" -->
        <video  x5-video-player-type="h5-page" @error="videoErrorCallback" ref="video1" class="myVideo" id="myVideo1" :src="video.config.src"
               :poster="video.config.cover|domain" controls></video>
        <!--    <img v-if="video.config.cover" :src="video.config.cover|domain"/>-->
        <!--    <div v-else>-->
        <!--      <video width="100%" height="100%" controls="controls">-->
        <!--        您的浏览器不支持 video 标签。-->
        <!--      </video>-->
        <!--    </div>-->
    </view>
</template>
<script>
	import {isDev} from '../../common/env.js';
    export default {
        props: {

            index: {
                required: true,
            },
            confData: {
                type: Object,
                default: () => ({}),
            },
        },
        data() {
            return {
                videoContext: null,
                video: {
                    config: {}
                },
            };
        },

        onHide() {

        },
        computed: {},
        watch: {},
        components: {},
        methods: {
            pauseFn() {
                console.log('暂停视频', this.videoContext)
                if (this.videoContext) {
                    this.videoContext.pause()
                }

            },
            videoErrorCallback(e) {

				if(!isDev)return;
                let msg = '视频播放错误:' + JSON.stringify(e)
                uni.showModal({
                    content: msg,
                    showCancel: false
                })
            },
            // ...mapActions(),
        },
        mounted() {
            let _self = this

            this.$nextTick().then(() => {
                let videoContext = uni.createVideoContext('myVideo1', _self)
                _self.videoContext = videoContext
                //添加到这里
                //getApp().globalData.videoInstance.push(videoContext)
            })


        },
        created() {

            this.video = this.confData
            // console.log(this.video)
        }
    }
</script>


<style scoped lang="stylus">
    .video
        width 100%
        height 0
        padding-top 55.6%
        position relative

        // img
        //   position absolute
        //   width 100%
        //   height 100%
        //   top 0
        //   vertical-align top

        .myVideo
            position absolute
            width 100%
            top 0
            bottom 0
            height auto
            vertical-align: top

</style>
