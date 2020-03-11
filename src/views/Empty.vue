<template>
  <div class="empty-wrap">
    {{$route.path}}
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
} from 'vue-property-decorator';
@Component({
  components: {},
})
export default class Empty extends Vue {

}
</script>
<style lang="stylus" scoped>
</style>
