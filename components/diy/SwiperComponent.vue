<template>
    <view class="swiper wrap fun-preview-swiper">
        <!--      :class="{single:swiper.value.list.length<2}"-->
        <!-- style="height:375rpx" -->
        <!--      @load="HandleImgLoad"-->
        <!--      :style="[getSingleStyle()]"-->
        <div v-if="swiper.value.list.length==1" @click="go(swiper.value.list[0])" class="single" style="display: flex;">
            <image mode="widthFix" style="width: 750rpx;vertical-align: top;"
                   :src="domainFunc(swiper.value.list[0].img_src)"/>
            <!-- <div class="cover-full" :style="{backgroundImage:'url('+domainFunc(swiper.value.list[0].img_src)+')'}"></div> -->
        </div>
        <!-- style="height:375rpx" -->
        <swiper v-else class="swiper-box" @change="changeHeightFn" style="width:750rpx;" :style="{height:swipwerH}"
                indicator-color="rgba(255, 255, 255, .3)"
                indicator-active-color="rgba(255, 255, 255, .7)"
                :indicator-dots="swiper.value.list.length>1" :autoplay="swiper.config.autoplay" circular="true"
                :interval="swiper.config.interval|str2num" :duration="500">
            <swiper-item @click="go(item)" v-for="(item,idx) in swiper.value.list" :key="idx">
                <image @load="imgLoad" mode="widthFix" :id="'js-swiper-item'+idx" class="swiper-item "
                       style="width: 750rpx;vertical-align: top;height: 100%;" :src="domainFunc(item.img_src)"></image>
                <!-- <view class="swiper-item" :style="{backgroundImage:'url('+domainFunc(item.img_src)+')'}"></view> -->
            </swiper-item>
        </swiper>

    </view>
</template>
<script>
    import {domainFn} from "../../common/filter";

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
                singleW: null,
                singleH: null,
                swipwerH: '150px',
                fullWidth: null,
                height_list: [],
                swiper: {
                    config: {},
                    value: {
                        list: []
                    }
                },
            };
        },
        computed: {
            style() {
                // return deepCopyStrict(this.coupon.styleDefault, this.coupon.style);
            },
        },
        filters: {
            //保存的是秒
            str2num(val) {
                return parseInt(val) * 1000
            }
        },
        watch: {},
        components: {},
        methods: {
            //用第一张图片做初始化高度
            imgLoad(e) {
                //只有第一个的时候才改
                if (e.currentTarget.id = 'js-swiper-item0') {
                    this.swipwerH = e.detail.height + 'rpx'
                }
                this.height_list.push(e.detail.height + 'rpx')
                //console.log(e)
            },
            //滚动的时候灵活设置个高度
            changeHeightFn(e) {
                let _self = this
                let idx = e.detail.current;
                _self.swipwerH = this.height_list[idx]
                // const query = uni.createSelectorQuery().in(this);
                // query.select(`#js-swiper-item${idx}`).boundingClientRect(style => {
                //     _self.swipwerH = style.height + 'px'
                //     // console.log("得到布局位置信息" + JSON.stringify(data));
                //     // console.log("节点离页面顶部的距离为" + data.top);
                //     console.log("图片高度" + style.height);
                // }).exec();

            },
            getSingleStyle() {

                console.log(this.singleH, this.singleW)
                if (this.singleH && this.singleW) {
                    let h = this.fullWidth * this.singleH / this.singleW;
                    let w = this.fullWidth;
                    console.log({height: h + 'px', width: w + 'px'})
                    return {height: h + 'px', width: w + 'px'}
                }
                return {}
            },
            HandleImgLoad(e) {
                console.log(e)
                this.singleW = e.detail.width;
                this.singleH = e.detail.height;

            },
            go(item) {
                this.$fun.linkTo(item)
            },
            domainFunc(url) {
                return domainFn(url)
            },

            // ...mapActions(),
        },
        mounted() {

            let idx = 0, _self = this;


            // this.$nextTick().then(()=>{
            //
            //     const query = uni.createSelectorQuery().in(_self);
            //     query.select(`#js-swiper-item${idx}`).boundingClientRect(style => {
            //         console.log("得到布局位置信息" + JSON.stringify(style));
            //         // _self.swipwerH = style.height+'px'
            //         // console.log("得到布局位置信息" + JSON.stringify(data));
            //         // console.log("节点离页面顶部的距离为" + data.top);
            //         console.log("图片高度" + style.height);
            //     }).exec();
            // })

        },
        created() {

            const res = uni.getSystemInfoSync();
            this.fullWidth = res.screenWidth;

            this.swiper = this.confData;
        }
    }
</script>


<style scoped lang="less">
    @import "app.less";

    .single {
        image {
            // width: auto !important;
            //height: auto;
            // position: absolute;
        }
    }

    .swiper-box {
        .swiper-item {
            width: 750rpx;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: #f8f8f8;
            background-position: center;
        }
    }


    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .cover-full {
        .cover-full-bg(cover, 0);
        /*height: 100%;*/
    }


    /*swiper {*/
    /*    height: 100%;*/
    /*}*/

</style>
