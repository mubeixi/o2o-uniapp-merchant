<template>
    <div class="left-menu">
        <div class="menu-vertical-first">
            <ul>
                <template v-for="(first,idx) in firstMenuData">
                    <template v-if="!first.hide">
                        <li
                            @click="bindFirstEvent(idx)"
                            @mouseover="overNav(idx,first)"
                            @mouseout="outNav(idx,first)"
                            :class="{active:firstIndex===idx}"
                        >{{first.meta.title}}</li>
                    </template>
                </template>
            </ul>
        </div>
        <div class="menu-vertical-second" v-if="secondMenuData.length>0">
            <ul>
                <template v-for="(second,idx) in secondMenuData">
                    <template v-if="!second.hide">
                        <li
                            @click="changeMenu(idx,second)"
                            :class="{active:secondIndex===idx}"
                        >{{second.meta.title}}</li>
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

    // computed
    get firstMenuData() {
        return menuConf[0].children;
    }

    get secondMenuData() {
        if(this.firstMenuData[this.firstIndex].hasOwnProperty('children')){
            return this.firstMenuData[this.firstIndex].children;
        }
        return []
    }

    get firstIndex(){
        return this.$store.state.menu.menuFirstIndex
    }

    get secondIndex(){
        return this.$store.state.menu.menuSecondIndex
    }

    @Action('menu/setMenuActiveIndex') setMenuActiveIndex
    @Action('menu/setThirdMenuData') setThirdMenuData

    bindFirstEvent(idx){
        this.setMenuActiveIndex({name:'menuFirstIndex',idx})

        //设置二级菜单
        this.setMenuActiveIndex({name:'menuSecondIndex',idx:0})
        //设置第三级菜单
        this.setMenuActiveIndex({name:'menuThirdIndex',idx:0})

        if(this.secondMenuData && this.secondMenuData[0] && this.secondMenuData[0].hasOwnProperty('children') && Array.isArray(this.secondMenuData[0].children) && this.secondMenuData[0].children.length>0){
            this.setThirdMenuData(this.secondMenuData[0].children)
        }else{
            this.setThirdMenuData([])
        }

    }

    changeMenu(idx,item){
        //设置二级菜单的下标
        this.setMenuActiveIndex({name:'menuSecondIndex',idx})
        this.setMenuActiveIndex({name:'menuThirdIndex',idx:0})

        //设置第三级菜单
        if(Array.isArray(this.secondMenuData[idx].children) && this.secondMenuData[idx].children.length>0){
            this.setThirdMenuData(this.secondMenuData[idx].children)
        }else{
            this.setThirdMenuData([])
        }

        //路由跳转
        item.name && this.$router.push({name:item.name})
    }



    overNav(idx) {
      // this.firstIndex = idx;
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
                    border-radius: 22px;
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
                &.active{
                    color: #428CF7;
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
