<template>
    <view class="tabbar">
        <block v-for="(item,index) in tabList" :key="index">
            <view class="tabbar-item" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(item,index)">
                <view class="icon">
                    <text class="funicon" :class="item.icon"
                          :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
                    <!--                    <text v-if="item.badge" class="uni_badge">{{item.badge}}</text>-->
                    <!--                    <text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>-->
                </view>
                <view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">
                    {{item.text}}
                </view>
            </view>
        </block>
    </view>
</template>

<script>
    import {ls} from "../common/helper";

    export default {
        name: "TabbarComponents",
        data() {
            return {
                tabList: [
                    {
                        icon: 'icon-fanhui',
                        text: '首页',
                        badge: 1,
                        url: 'pages/index/index'
                    },
                    {
                        icon: 'icon-gonggao',
                        text: '分类',
                        badge: 1,
                        url: 'pages/classify/classify'
                    },
                    {
                        icon: 'icon-gonggao',
                        text: '发现',
                        badge: 1,
                        url: 'pages/fenxiao/fenxiao'
                    },
                    {
                        icon: 'icon-paixu',
                        text: '购物车',
                        badgeDot: true,
                        badge: 1,
                        url: 'pages/order/cart'
                    },
                    {
                        icon: 'icon-paixu',
                        text: '我的',
                        badgeDot: true,
                        badge: 1,
                        url: 'pages/person/person'
                    }
                ],
                currentTabIndex: 0
            }
        },
        created() {
            if (ls.get('currentTabIndex') >= 0) {
                this.currentTabIndex = ls.get('currentTabIndex')
            }
        },
        props: {
            //current: { type: [Number, String], default: 0 },
            backgroundColor: {type: String, default: '#fbfbfb'},
            color: {type: String, default: '#999'},
            tintColor: {type: String, default: '#42b983'}
        },
        methods: {
            switchTab(item, index) {
                //this.currentTabIndex = index

                ls.set('currentTabIndex', index)
                //this.$emit('click', index)
                uni.navigateTo({
                    url: '/' + item.url,
                    animationType: 'none'
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .tabbar {
        display: flex;
        height: 50px;
        position: fixed;
        border-top: 1px solid #eee;
        box-sizing: border-box;
        bottom: constant(safe-area-inset-bottom);
        bottom: env(safe-area-inset-bottom);
        width: 750 upx;
        background: white;

        .tabbar-item {
            flex: 1;
            text-align: center;

        }
    }
</style>
