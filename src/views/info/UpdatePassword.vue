<template>
    <div class="all-update">
        <el-form ref="form" label-width="140px">
            <el-form-item label="原密码：">
                <el-input v-model="formq" style="width: 204px"></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
                <el-input v-model="formq" style="width: 204px"></el-input>
            </el-form-item>
            <el-form-item label="确认原密码：">
                <el-input v-model="formq" style="width: 204px"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  Prop,
} from 'vue-property-decorator';

export default class UpdatePassword extends Vue {
        formq = 'store'
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
