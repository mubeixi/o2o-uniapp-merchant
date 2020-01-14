<template>
    <div class="plugin-wrap">
        <div class="box">
            <div class="img-item item" v-for="(pre,idx) in previews" :style="{backgroundImage:'url('+pre+')'}"></div>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
            <image @click="openUpload" src="/static/upload_icon.png" class="upload-icon item"></image>
        </div>
    </div>
</template>
<script>
    import {uploadImages} from "../../common/helper";
    import {error} from "../../common/init/fun";
    import {
        get_User_ID,
        GET_ACCESS_TOKEN,
        GET_ENV,
        get_Users_ID,
        createToken
    } from "../../common/request";

    export default {
    name:'UploadImage',
    props:{
        limit:{
            type:Number,
            default:9
        },
        has:{
            type:Array,
            default: ()=>[]
        }
    },
    data(){
      return {
          imgs:[],
          in_upload:false,
          previews:[]
      }
    },
    methods:{

        async chooseImg(){
            uni.chooseImage({
                count: this.limit-this.imgs.length,
                success: function (res) {
                    return res.tempFilePaths
                }
            })
        },
        async openUpload(){
            if(this.limit<=this.imgs.length){
                error(`最多只能上传${this.limit}个文件`)
                return;
            }
            if(this.in_upload){
                error('操作过于频繁')
                return;
            }

            let param = {act:'upload_image'};
            param.User_ID = get_User_ID();
            param.Users_ID = get_Users_ID();
            param.env = GET_ENV();

            if(!param.hasOwnProperty('access_token')){
                param.access_token = GET_ACCESS_TOKEN()
            }

            let formData = createToken(param);

            let tempFilePaths = await this.chooseImg()

            //批量上传
            uploadImages(formData,tempFilePaths).then(urls=>{
                this.imgs = this.imgs.concat(urls)
            })

            this.$emit('onUpSuccess',this.imgs)
        },
        _$emit(emitName) {

        },
    }
}
</script>
<style scoped lang="scss">
.box{
    width: 100%;
    margin: 0 auto;
    //text-align: center;
    display: flex;
    flex-wrap: wrap;
    //justify-content: center;
    .item{
        display: inline-block;
        width: 200rpx;
        height: 200rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        &:nth-child(3n+3){
            margin-right: 0;
        }
    }

}
</style>
