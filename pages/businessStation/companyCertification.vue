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
                            <div class="__placeholder" v-if="!trade.label">请选择企业所在地</div>
                            <div v-if="trade.label">{{trade.label}}</div>
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
                            <div class="__placeholder" v-if="!addressInfo.label">请选择企业所在地</div>
                            <div v-if="addressInfo.label">{{addressInfo.label}}</div>
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
                        <div class="form-cell-item__label">企业类型</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请选择企业类型" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">企业住所</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入企业住所" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">注册资金</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入注册资金" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">营业执照注册号或统一社会信用代码</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">法人姓名</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入法人姓名" />
                        </div>
                    </div>
                    <div class="form-upload-item">
                        <div class="form-upload-item__label">法人身份证正面扫描件</div>
                        <div class="form-upload-item__content">
                            <upload-image
                            :limit="1"
                            @onUpSuccess="idcardUploadSuccess"
                            ></upload-image>
                        </div>
                    </div>
                    <div class="form-upload-item">
                        <div class="form-upload-item__label">法人身份证反面扫描件</div>
                        <div class="form-upload-item__content">
                            <upload-image
                                    :limit="1"
                                    @onUpSuccess="idcardBackUploadSuccess"
                            ></upload-image>
                        </div>
                    </div>
                    <div class="form-upload-item">
                        <div class="form-upload-item__label">营业执照影印件</div>
                        <div class="form-upload-item__content">
                            <upload-image
                                    :limit="1"
                                    @onUpSuccess="businessLicenseUploadSuccess"
                            ></upload-image>
                        </div>
                    </div>
                    <div class="form-upload-item">
                        <div class="form-upload-item__label">税务登记证扫描件</div>
                        <div class="form-upload-item__content">
                            <upload-image
                                    :limit="1"
                                    @onUpSuccess="taxUploadSuccess"
                            ></upload-image>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-panel">
                <div class="form-title">
                    <div class="form-title__place"></div>
                    <div class="form-title__text">账户信息</div>
                </div>
                <div class="form-cell">
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">提现方式</div>
                        <div class="form-cell-item__content">
                            <div class="__placeholder">请选择提现方式</div>
<!--                            <div v-if="trade.label">{{trade.label}}</div>-->
                        </div>
                        <div class="form-cell-item__right">
                            <span class="wzwicon iconright font16" style="color: #666"></span>
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">开户城市</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入开户城市" />
                        </div>
                    </div>

                    <div class="form-cell-item">
                        <div class="form-cell-item__label">开户银行</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入开户银行" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">开户姓名</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入开户姓名" />
                        </div>
                    </div>
                    <div class="form-cell-item">
                        <div class="form-cell-item__label">银行卡号</div>
                        <div class="form-cell-item__content">
                            <input placeholder-class="__placeholder" class="input" placeholder="请输入银行卡号" />
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
    import UploadImage from "../../components/common/UploadImage";

    export default {
        name: "companyCertification",
        components:{simpleAddress,UploadImage},
        mixins:[pageMixin],
        data(){
            return {
                trade:{
                  label:'',
                  list:[]
                },
                addressInfo:{
                    areaCode: "",
                    cityCode: "",
                    label: "",
                    provinceCode: "",
                },
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
            taxUploadSuccess(urls){
                console.log(urls)
            },
            businessLicenseUploadSuccess(urls){
                console.log(urls)
            },
            idcardBackUploadSuccess(urls){
                console.log(urls)
            },
            idcardUploadSuccess(urls){
                console.log(urls)
            },
            openAddressChoose(){
                this.showAddress = true
            },
            handleAddressConfirm(address){

                let {areaCode, cityCode, label, provinceCode} = address
                Object.assign(this.addressInfo,address)
                // this.addressInfo.areaCode = areaCode
                // this.addressInfo.cityCode = cityCode
                // this.addressInfo.label = label
                // this.addressInfo.provinceCode = provinceCode
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
    &-upload{

        &-item{
            display: block;
            padding: 10px;

            &__label{
                color: $x-color-666;
            }
            &__content{
                padding: 10px;
            }

        }

    }
    &-cell{
        background: white;
        border-radius: 4px;
        overflow: hidden;
        font-size: 14px;

        &-item{
            display: flex;
            align-items: center;
            padding: 10px 0;

            &__label{
                width: 80px;
                padding: 0 10px;
                color: $x-color-666;

                line-height: 1.3;
            }
            &__content{
                flex: 1;
                height: 32px;
                line-height: 32px;
                display: flex;
                align-items: center;
                .input{
                    font-size: 14px;
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
