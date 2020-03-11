<template>
    <div class="layout-empty-wrap">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';

@Component({
  components: { },
})
export default class EmptyTmpl extends Vue {

}
</script>
<style lang="less" scoped>

</style>
