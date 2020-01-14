<template>
    <div class="page-wrap">
        <form class="form" @submit="formSubmit" @reset="formReset">

            <div class="form-panel">
                <div class="form-title">
                    <div class="form-title__place"></div>
                    <div class="form-title__text">基本信息</div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">商家行业</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请选择商家行业" />
                        </div>
                        <div class="form-cell-item__right">
                            <span class="wzwicon iconright font16" style="color: #666"></span>
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">公司名称</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入门店名称" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">公司主体</div>
                        <div class="form-cell-item__content">

                        </div>
                        <div class="form-cell-item__right">
                            <span class="wzwicon iconright font16" style="color: #666"></span>
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">公司固话</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="格式如021-12345678" />
                        </div>
                    </div>
                    <div class="form-cell-item" @click="openAddressChoose">
                        <div class="form-cell-item__label">企业所在地</div>
                        <div class="form-cell-item__content">
                           <div class="__placeholder">请选择企业所在地</div>
                        </div>
                        <div class="form-cell-item__right">
                            <span class="wzwicon iconright font16" style="color: #666"></span>
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">详细地址</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入详细地址" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">主营商品</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入主营商品，多个商品间用逗号隔开" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">联系人</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入联系人姓名" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">手机</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入手机号" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">邮箱地址</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入邮箱地址" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-panel">
                <div class="form-title">
                    <div class="form-title__place"></div>
                    <div class="form-title__text">资质信息</div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-item">
                        <div class="form-cell-item__label"></div>
                        <div class="form-cell-item__content"></div>
                        <div class="form-cell-item__right">
                            <span class="wzwicon iconright font16" style="color: #666"></span>
                        </div>
                    </div>
                </div>
            </div>

            <button class="actions-subbtn">提交</button>

        </form>

        <div style="height: 50px"></div>

        <simple-address
            ref="simpleAddress"
            :show="showAddress"
            :pickerValueDefault="cityPickerValueDefault"
            @onConfirm="handleAddressConfirm"
            themeColor='#007AFF'
        >
        </simple-address>


    </div>

</template>

<script>
    import {pageMixin} from "../../common/mixin";
    import simpleAddress from '../../components/simple-address/simple-address.nvue'

    export default {
        name: "companyCertification",
        components:{simpleAddress},
        mixins:[pageMixin],
        data(){
            return {
                showAddress:false,
                cityPickerValueDefault: [0,0,0]
            }
        },
        computed:{

        },
        created(){

        },
        mounted(){

        },
        methods:{
            openAddressChoose(){
                this.showAddress = true
            },
            handleAddressConfirm(address){
                console.log(address)
            },
            formSubmit(e){
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容：' + JSON.stringify(formdata),
                    showCancel: false
                });
            },
            formReset(){

            }
        }
    }
</script>

<style lang="scss" scoped>
.form{

    &-panel{
        margin: 10px;
    }
    &-title{
        display: flex;
        align-items: center;
        padding: 10px 0;
        &__place{
            background: $wzw-bg-primary;
            width: 4px;
            height: 16px;
            margin: 0 10px;
            border-radius: 2px;
        }
        &__text{
            color: $wzw-color-title;
            font-weight: bold;
        }
    }

    &-cell{
        background: white;
        &-item{
            display: flex;
            align-items: center;
            padding: 10px 0;
            &__label{
                width: 80px;
                padding: 0 10px;
            }
            &__content{
                flex: 1;
                height: 32px;
                line-height: 32px;
                display: flex;
                align-items: center;
                .input{
                    flex: 1;
                    color: $wzw-color-input;
                    &::placeholder{
                        color: $wzw-color-placeholder;
                    }
                }

                .__placeholder{
                    color: $wzw-color-placeholder;
                }

            }
            &__right{
                width: 32px;
                text-align: center;
            }

        }
    }

}
.actions{

    &-subbtn{
        position: fixed;
        bottom: 0;
        width: 750rpx;
        border-radius: 0;
        background: $wzw-bg-primary;
        color: #fff;
        border: none;
    }
}
</style>
