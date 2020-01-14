<template>
    <div class="plugin-wrap">
        <div class="box" :class="[previewSize]">
            <div @click="delImg(idx)" class="img-item item" v-for="(pre,idx) in previews" :style="{backgroundImage:'url('+pre+')'}"></div>
            <image @click="openUpload" v-if="previews.length<limit" src="/static/upload_icon.png" class="upload-icon item"></image>
        </div>
    </div>
</template>
<script>
    import {uploadImages} from "../../common/helper";
    import {
        error,
        confirm
    } from "../../common/init/fun";
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
        previewSize:{
          type:String,
          default:'default' //'large是九宫格'
        },
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
        delImg(idx){
          confirm({title:'移除图片',content:'将删除该图片,是否确认?'}).then(res=>{
              this.previews.splice(idx,1)
              this.imgs.splice(idx,1)
              this._$emit(this.imgs)
          }).catch(()=>{})
        },
        chooseImg(){
            return new Promise((resolve, reject) => {
                uni.chooseImage({
                    count: this.limit-this.imgs.length,
                    success: function (res) {
                        resolve(res.tempFilePaths)
                    },
                    fail:function(e){
                        reject(false)
                    }
                })
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

            this.chooseImg().then(tempFilePaths=>{

                console.log(tempFilePaths)
                this.previews = this.previews.concat(tempFilePaths)
                uni.showLoading({
                    title: '文件上传中',
                    mask: true
                })
                //批量上传
                uploadImages(formData,tempFilePaths).then(urls=>{

                    this.imgs = this.imgs.concat(urls)
                    this._$emit(this.imgs)
                    setTimeout(()=>{
                        uni.hideLoading()
                    },500)

                }).catch(e=>{
                    error('选择图片失败')
                })

            })

        },
        _$emit(urls) {
            this.$emit('onUpSuccess',urls)
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
        width: 140rpx;
        height: 140rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        &.img-item{
            background-repeat: no-repeat;
            background-size: contain;
            background-color: #f8f8f8;
            background-position: center;
        }

    }

    &.large{
        .item{
            width: 200rpx;
            height: 200rpx;
            margin-right: 10rpx;
            margin-bottom: 10rpx;

            &:nth-child(3n+3){
                margin-right: 0;
            }
        }

    }

}
</style>
