<template>
    <div class="tab-menu">
        <ul>
            <template v-for="(item,idx) in tabData">
                <template v-if="!item.hide">
                    <li
                        @mouseover="overNav(idx,item)"
                        @mouseout="outNav(idx,item)"
                        :class="{active:activeIndex===idx}"
                    >{{item.meta.title}}</li>
                </template>
            </template>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LayoutTabComponent extends Vue {

        // computed
        get tabData() {
            return this.$store.state.menu.menuThirdList
        }

        get activeIndex() {
            return this.$store.state.menu.menuThirdIndex
        }


        overNav(idx) {
          // this.menuIndex = idx;
        }

        outNav() {

        }


}
</script>
<style lang="less" scoped>
.tab-menu{
    height: 56px;
    background: #f4f4f4;
    overflow: hidden;
    text-align: center;
    font-size: 14px;
    ul{
        display: flex;
        li{
            width: 110px;
            height: 44px;
            line-height: 44px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;
            &:hover{
                opacity: 0.8;
            }
            &:after{
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 24px;
                height: 2px;
                background: #428CF7;
                content: ' ';
                visibility: hidden;
            }
            &.active{
                color: #428CF7;
                &:after{
                    visibility: visible;
                }
            }
        }
    }

}
</style>
