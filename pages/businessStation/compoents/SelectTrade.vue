<template>
    <div v-show="showTree" @touchmove.prevent.stop="noop">
        <div class="mask" @click="close" :style="{opacity:maskOpacity}"></div>
        <div class="wrap" :style="_location">
            <div class="text-center padding10-r">选择行业</div>
            <ly-tree
                :tree-data="treeData"
                :props="propsConf"
                :showCheckbox="true"
                :checkOnlyLeaf="true"
                node-key="label"
                @node-expand="handleNodeExpand"
                @node-click="handleNodeClick">
            </ly-tree>
            <div class="btn">提交</div>
        </div>
    </div>
</template>
<script>
    import LyTree from '../../../components/ly-tree/ly-tree.vue'
    const mockData = [
        {
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                children: [{
                    label: '三级 1-1-1'
                }]
            }]
        }, {
            label: '一级 2',
            children: [{
                label: '二级 2-1',
                children: [{
                    label: '三级 2-1-1'
                }]
            }, {
                label: '二级 2-2',
                children: [{
                    label: '三级 2-2-1'
                }]
            }]
        }, {
            label: '一级 3',
            children: [{
                label: '二级 3-1',
                children: [{
                    label: '三级 3-1-1'
                }]
            }, {
                label: '二级 3-2',
                children: [{
                    label: '三级 3-2-1'
                }]
            }]
        }];
    import {checkIcon} from "./icon";

    export default {
        name: "SelectTrade",
        components: {LyTree},
        props: {
            show:{
                type:Boolean,
                default:false
            },
            bottomHeight: {
                type: Number || String,
                default: 0
            },
            direction: {
                type: String,
                default: 'top', // 方向  top，bottom，left，right
            },
        },
        data() {
            return {

                showTree:false,
                timer: null,
                iftoggle: false,
                translateValue: -100, // 位移距离
                treeData: [],
                maskOpacity:0,
                propsConf:{
                    icon:'iconname',
                    children: 'children', // 指定子树为节点对象的某个属性值
                    label: 'label', // 指定节点标签为节点对象的某个属性值
                    disabled: 'disabled' //	指定节点选择框是否禁用为节点对象的某个属性值
                }
            }
        },
        computed:{
            _translate() {
                const transformObj = {
                    'top': `transform:translateY(${-this.translateValue}%)`,
                    'bottom': `transform:translateY(${this.translateValue}%)`,
                    'left': `transform:translateX(${-this.translateValue}%)`,
                    'right': `transform:translateX(${this.translateValue}%)`
                };
                return transformObj[this.direction]
            },
            _location() {
                const positionValue = {
                    'top': `bottom:${this.bottomHeight}px;width:100%;`,
                    'bottom': 'top:0px;width:100%;',
                    'left': 'right:0px;height:100%;',
                    'right': 'left:0px;height:100%;',
                };
                return positionValue[this.direction] + this._translate;
            }
        },
        watch:{
            show:{
                handler(val){
                    val && this.open()
                    !val && this.close()
                }
            }
        },
        created(){
            this.treeData = mockData
        },
        onLoad(){

        },
        methods: {
            noop(){
                return ;
            },
            close(){

                if (this.timer !== null || !this.iftoggle) {
                    return;
                }
                this.translateValue = -100;
                setTimeout(() => {
                    this.showTree = false;
                    this.timer = null;
                    this.iftoggle = false;
                    this.$emit('closeCallBack', null);
                    this.$emit('change',false)
                    this.$emit('close')
                }, 100);


            },
            open(){

                this.showTree = true
                let _open = setTimeout(() => {
                    this.translateValue = 0;
                    this.maskOpacity = 0.5;
                    _open = null;
                }, 100)
                let _toggle = setTimeout(() => {
                    this.iftoggle = true;
                    _toggle = null;
                }, 300);


            },
            // uni-app中emit触发的方法只能接受一个参数
            handleNodeClick(obj) {
                console.log('handleNodeClick', JSON.stringify(obj));
            },
            handleNodeExpand(obj) {
                console.log('handleNodeExpand', JSON.stringify(obj));
            }
        }
    }
</script>
<style lang="scss" scoped>
.mask{
    position: fixed;
    z-index: 99;
    background: rgb(0, 0, 0);
    opacity: 0;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    overflow: hidden;
    transition: all 1s ease;
}
.wrap{
    position: fixed;
    left: 0;
    z-index: 100;
    background: #FFFFFF;
    transition: all .3s ease;
    overflow: hidden;
}
.btn{
    height: 44px;
    width: 100%;
    background: $wzw-bg-primary;
    color: white;
    line-height: 44px;
    text-align: center;
}
</style>
