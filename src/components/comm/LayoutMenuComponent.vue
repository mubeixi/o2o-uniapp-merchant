<template>
    <div class="left-menu">
        <div class="menu-vertical-first">
            <img />
            <ul>
                <template v-for="(first,idx) in firstMenuData">
                    <template v-if="!first.hide">
                        <li
                            @mouseover="overNav(idx,first)"
                            @mouseout="outNav(idx,first)"
                        >{{first.meta.title}}</li>
                    </template>
                </template>
            </ul>
        </div>
        <div class="menu-vertical-second">
            <ul>
                <template v-for="(second,idx) in secondMenuData">
                    <template v-if="!second.hide">
                        <li >{{second.meta.title}}</li>
                    </template>
                </template>
            </ul>
        </div>
        <!--<el-menu-->
                <!--:collapse="isCollapse"-->
                <!--@close="handleClose"-->
                <!--@open="handleOpen"-->
                <!--class="menu-vertical-first"-->
                <!--default-active="2">-->
            <!--<el-submenu index="1">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-location"></i>-->
                    <!--<span>导航一</span>-->
                <!--</template>-->
                <!--<el-menu-item-group>-->
                    <!--<template slot="title">分组一</template>-->
                    <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group title="分组2">-->
                    <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-submenu index="1-4">-->
                    <!--<template slot="title">选项4</template>-->
                    <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                <!--</el-submenu>-->
            <!--</el-submenu>-->
            <!--<el-menu-item index="2">-->
                <!--<i class="el-icon-menu"></i>-->
                <!--<span slot="title">导航二</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item disabled index="3">-->
                <!--<i class="el-icon-document"></i>-->
                <!--<span slot="title">导航三</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="4">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--<span slot="title">导航四</span>-->
            <!--</el-menu-item>-->
        <!--</el-menu>-->
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import menuConf from '../../router/menuConf';

    @Component
    export default class LayoutMenuComponent extends Vue {

        isCollapse = false
        menuIndex = 0

        //computed
        get firstMenuData(){
            return menuConf[0].children;
        }

        get secondMenuData(){
            return menuConf[0].children[this.menuIndex].children;
        }

        overNav(idx){
            this.menuIndex = idx;
        }

        outNav(){

        }

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        }

        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
</script>
<style lang="less" scoped>
.left-menu{
    width: 280px;
    height: 100vh;
    overflow: hidden;
    display: flex;
    .menu-vertical-first{
        flex:1;
        width: 140px;
        height: 100vh;
        padding: 0 15px;
        background: #397FDC;
        color: #fff;
        font-size: 14px;
        box-sizing: border-box;
        text-align: center;
        ul{
            li{
                width: 110px;
                height: 44px;
                line-height: 44px;
                margin-bottom: 10px;
                &.active{
                    background: #316CBC;
                    border-radius: 50%;
                }
            }
        }
    }
    .menu-vertical-second{
        flex:1;
        width: 140px;
        height: 100vh;
        background: #fff;
        color: #777;
    }

}
</style>
