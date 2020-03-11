<template>
    <div class="left-menu">
        <div class="menu-vertical-first">

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
                        <li @click="changeMenu(idx)">{{second.meta.title}}</li>
                    </template>
                </template>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
    Action,
    State,
} from 'vuex-class';
import menuConf from '../../router/menuConf';

@Component
export default class LayoutMenuComponent extends Vue {
    //isCollapse = false

    menuIndex = 3

    @Action('menu/setThirdMenuData') setThirdMenuData

    changeMenu(idx){
        //设置第三级菜单
        if(Array.isArray(this.secondMenuData[idx].children)){
            this.setThirdMenuData(this.secondMenuData[idx].children)
        }
    }

    // computed
    get firstMenuData() {
      return menuConf[0].children;
    }

    get secondMenuData() {
      return menuConf[0].children[this.menuIndex].children;
    }

    overNav(idx) {
      // this.menuIndex = idx;
    }

    outNav() {

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
    height: 100%;
    overflow: hidden;
    display: flex;
    font-size: 14px;
    .menu-vertical-first{
        width: 140px;
        height: 100%;
        padding: 0 15px;
        background: #397FDC;
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        ul{
            li{
                width: 110px;
                height: 44px;
                line-height: 44px;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover{
                    opacity: 0.8;
                }
                &.active{
                    background: #316CBC;
                    border-radius: 50%;
                }
            }
        }
    }
    .menu-vertical-second{
        width: 140px;
        height: 100%;
        background: #fff;
        color: #777;
        text-align: center;
        cursor: pointer;
        ul{
            li{
                line-height: 54px;
                position: relative;
                &:hover{
                    color: #428CF7;
                    /*&:after{*/
                        /*visibility: visible;*/
                    /*}*/
                }
                &:active{
                    &:after{
                        visibility: visible;
                    }
                }
                &:after{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 18px;
                    width: 6px;
                    height: 8px;
                    content: ' ';
                    visibility: hidden;
                    background-image: url("~@/assets/img/nav_arrow_rihgt.png");
                }
            }
        }
    }

}
</style>
