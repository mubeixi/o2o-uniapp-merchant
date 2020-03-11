<template>
  <div class="all-update">
    <!--<el-form ref="form" label-width="140px" size="small">-->
      <!--<el-form-item label="所在地：">-->
        <!--<el-select v-model="forms" placeholder="请选择省" style="width: 155px;margin-right: 10px">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--<el-select v-model="forms" placeholder="请选择市" style="width: 155px;margin-right: 10px">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--<el-select v-model="forms" placeholder="请选择区" style="width: 155px;margin-right: 10px">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="详细地址：">-->
        <!--<el-input v-model="forms" style="width: 485px"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="收货人：">-->
        <!--<el-input v-model="forms" style="width: 204px"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="收货人电话：">-->
        <!--<el-input v-model="forms" style="width: 204px"></el-input>-->
      <!--</el-form-item>-->


    <!--</el-form>-->
  </div>
</template>

<script lang="ts">
    import {
        Vue,
        Component,
        Watch,
        Prop,
    } from 'vue-property-decorator';

    export default class ShippingAddress extends Vue {
        //forms=''
    }
</script>

<style scoped lang="less">
  .all-update {
    width: 1591px;
    box-sizing: border-box;
    padding: 40px 54px;
    background-color: #ffffff;
  }

</style>
