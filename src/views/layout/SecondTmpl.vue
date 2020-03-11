<template>
    <div class="layout-second-wrap">
        <!--顶部的菜单-->
        <layout-tab-component></layout-tab-component>
        <!--如果顶部有tab则需要顶部的margin-->
        <div :style="{marginTop:menuThirdList.length===0?'20px':'0px'}">
            <router-view></router-view>
        </div>
    </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
import LayoutTabComponent from "../../components/comm/LayoutTabComponent.vue";

@Component({
  components: {LayoutTabComponent },
})
export default class SecondTmpl extends Vue {
    get menuThirdList(){
        return this.$store.getters['menu/menuThirdList']
    }

    created(){
        console.log(this.$store)
    }
}
</script>
<style lang="less" scoped>
.layout-html{
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-flow: column;
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
.layout-wrap{
    flex: 1;
    background: #f4f4f4;
    display: flex;
    .layout-container{
        flex: 1;
        margin: 0 20px;
        background: #fff;
    }
}
</style>
