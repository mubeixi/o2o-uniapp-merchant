<template>
    <div class="layout-html">
        <div class="layout-head">
            <div class="logobox">
                <img class="logo" src="@/assets/logo.png" />
            </div>
            <div class="layout-head-container">

                <div class="control">
                    <span class="logout">[退出登录]</span>
                </div>
                <div class="nickanme">时尚衣橱</div>
            </div>
        </div>
        <div class="layout-first-wrap">
            <layout-menu-component></layout-menu-component>
            <div class="layout-container" >
                <!--第二层路由-->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import LayoutMenuComponent from '../../components/comm/LayoutMenuComponent';

@Component({
  components: { LayoutMenuComponent },
})
export default class FirstTmpl extends Vue {

}
</script>
<style lang="less" scoped>
.layout-html{
    height: 100vh;
    overflow: hidden;
}
.layout-head{
    height: 55px;
    background: #142945;
    display: flex;
    font-size: 14px;
    .logobox{
        width: 140px;
        height: 55px;
        background: #397FDC;
        position: relative;
        .logo{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 111px;
            height: 29px;
        }
    }
    .layout-head-container{
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        color: #fff;
        .control{
            margin: 0 28px 0 15px;
            .logout{
                cursor: pointer;
            }
        }
        .nickanme{
            cursor: pointer;
        }

    }
}
.layout-first-wrap{
    width: 100%;
    height: calc(100% - 55px);
    background: #f4f4f4;
    display: flex;
    .layout-container{
        flex: 1;
        margin: 0 20px;
        background: #fff;
    }
}
</style>
