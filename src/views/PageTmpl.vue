<template>
    <div>
        <layout-menu-component></layout-menu-component>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';
import LayoutMenuComponent from "../components/comm/LayoutMenuComponent.vue";

@Component({
    "components": {LayoutMenuComponent},
})
export default class LayoutPage extends Vue {

}
</script>
<style lang="stylus" scoped>
</style>
