<template>
  <!--  <textarea name="content" id="editor"></textarea>-->
  <div>
    <input @change="fileFn($event)" :multiple="multiple" :id="elIdName" :name="elIdName" :accept="acceptStr" type="file" class="input-comp-file" />
    <div class="btnbox"  @click="selectFile">
      <slot name="btn">
        <button >上传文件</button>
      </slot>
    </div>
    <slot name="preview" :previews.sync="previews" >
      <div class="previews">
        <div class="item" v-for="(file,idx) in previews" :key="idx">
          <img :src="file.url" :title="file.name" width="60px" />
        </div>
      </div>
    </slot>


  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';


import _ from 'underscore';
import {
  getAliyunOssSign,
} from '../../api/pub';


import {
  uploadService,
} from '../../common/request';


import {
  fun,
} from '../../common/func';
import { get_Users_ID, GET_ACCESS_TOKEN, createToken } from '../../common/fetch';

const defaultAllowFileType = ['jpeg', 'png', 'gif', 'bmp'];

function returnFileSize(number) {
  if (number < 1024) {
    return `${number}bytes`;
  } if (number > 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)}KB`;
  } if (number > 1048576) {
    return `${(number / 1048576).toFixed(1)}MB`;
  }
  return 0;
}


function random_string(len = 32) {
  const lenNum = len;
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < lenNum; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function get_suffix(filename) {
  const pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

const formatNumber = (n) => {
  const s = n.toString();
  return s[1] ? s : `0${s}`;
};

const formatTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('') + [hour, minute, second].map(formatNumber).join('');
};

// 阿里云直传
const upFileFnByAliyunOss = async ({
  file = { name: '' }, current_path, name = 'file', idx, list = [], progress,
}) => {
  let aliyunOssSign = null;

  const users_id = get_Users_ID();
  const appendStr = '';// `/uploadfiles/${users_id}/`

  await getAliyunOssSign({ full_path: current_path }).then((res) => {
    console.log(res);
    const {
      accessid, callback, dir, expire, host, policy, signature,
    } = res.data;
    aliyunOssSign = {
      accessid, callback, dir, expire, host, policy, signature,
    };
  });


  console.log(file, name);

  const formdata = new FormData();
  // eslint-disable-next-line
  const get_suffix_val = get_suffix(file.name);

  const new_multipart_params = {
    key: aliyunOssSign.dir + formatTime() + random_string(4) + get_suffix_val,
    policy: aliyunOssSign.policy,
    OSSAccessKeyId: aliyunOssSign.accessid,
    success_action_status: '200', // 让服务端返回200,不然，默认会返回204
    callback: aliyunOssSign.callback,
    signature: aliyunOssSign.signature,
  };

  // eslint-disable-next-line
  for (const key in new_multipart_params) {
    formdata.append(key, new_multipart_params[key]);
  }
  formdata.append('act', 'up_file_oss');
  // eslint-disable-next-line
  formdata.append(name, file);


  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', aliyunOssSign.host, true);
    // 监听进度事件
    xhr.upload.addEventListener('progress', (evt:any) => {
      console.log(evt);
      if (evt.lengthComputable) {
        const percentComplete = parseInt(evt.loaded / evt.total * 100 * 100, 10) / 100;
        // eslint-disable-next-line
        list[idx].percent = percentComplete;
      }
      if (progress) {
        progress();
      }
    });

    xhr.onload = function () {
      // 请求结束后,在此处写处理代码
      resolve('');
    };
    xhr.addEventListener('error', (e) => {
      reject(e);
    });
    xhr.send(formdata);
  }).catch((e) => {
    console.log(e);
    fun.error({ msg: `文件上传失败${JSON.stringify(e)}` });
  });
};

// 上传到服务器
const upFileFnByLocal = async ({
  file = new Blob(), current_path, name = 'image', idx, list = [], progress, extParam = {},
}) => new Promise((resolve, reject) => {
  const formdata = new FormData();

  const act = 'uploadFile';// this.type==='video'?'upload_video':'upload_image'
  const param = {
    Users_ID: get_Users_ID(),
    act,
    env: 'wx_mp',
    access_token: GET_ACCESS_TOKEN(),
    full_path: current_path,
    ...extParam,
  };
  const ajaxData = createToken(param);


  const new_multipart_params = {
    ...ajaxData,
  };

  // eslint-disable-next-line
  for (const key in new_multipart_params) {
    formdata.append(key, new_multipart_params[key]);
  }


  formdata.append(name, file);

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    // 上传到服务器上
    uploadService.post('/api/little_program/shopconfig.php', formdata, {

      onUploadProgress(event:object) {
        const percent = parseInt(event.loaded / event.total * 100, 10);
        console.log(`upload task upload :${idx}==>${percent}`);
        if (percent < 100) {
          // eslint-disable-next-line
          list[idx].percent = percent;
          if (progress) {
            progress();
          }
        } else {
          // eslint-disable-next-line
          list[idx].percent = percent;
          // list.splice(idx,1);//去掉
          if (progress) {
            progress();
          }
        }
      },

    }).then((ret) => {
      const res = ret.data;

      if (res.errorCode !== 0) {
        reject(res.msg);
      } else {
        resolve(true);
      }
    }).catch((e) => {});
  });
  reader.readAsDataURL(file);
}).catch((msg) => { fun.error({ msg: `文件上传失败:${msg}` }); });

function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); let n = bstr.length; const
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}


function blobToDataURL(blob, callback) {
  const a = new FileReader();
  a.onload = function (e) { callback(e.target.result); };
  a.readAsDataURL(blob);
}


    @Component({

    })
export default class WzwFileButton extends Vue {
        previews = [] // 预览的，加载快Bolb

        file_list = [] // 线上地址

        get acceptStr() {
          if (_.isArray(this.accept)) {
            return this.accept.join(',');
          }
          return this.accept;
        }

        @Prop({
          type: String,
          default: '',
        })
        current_path

        @Prop({
          type: Boolean,
          default: false,
        })
        multiple

        @Prop({
          type: Number,
          default: 1,
        })
        limit

        @Prop({
          type: String,
          default: 'input-comp-file',
        })
        elIdName

        @Prop({
          type: [Array, String],
          default: () => defaultAllowFileType,
        })
        accept // 默认上传图片

        @Prop({
          type: String,
          default: 'local',
        })
        storage_type // 储存模式，可以是aliyun || local 不要用oss，万一后面有其他的呢

        @Prop({
          type: Number,
          default: 1024 * 8, // 默认8m
        })
        maxSize // 上传文件限制，只有local模式才有

        @Prop({
          type: Object,
          default: () => {},
        })
        extParam // 额外参数，无脑直接和放在服务器上传模式下，参数拼接

        validFileType = (file, fileTypes) => fileTypes.includes(file)

        selectFile() {
          document.getElementById(this.elIdName).click();
        }

        fileFn(e) {
          console.log('native upload event', e);

          while (this.previews.length > 0) {
            this.previews = [];
          }
          const curFiles = e.target.files;
          if (curFiles.length === 0) {
            console.log('No files currently selected for upload');
            return;
          }

          if (curFiles.length > this.limit) {
            fun.error({ msg: `限制一次性最多上传${this.limit}个` });
            return;
          }

          const promiseList = [];


          const { storage_type } = this;
          const { maxSize } = this;


          for (let i = 0; i < curFiles.length; i++) {
            const curFileSize = parseInt(curFiles[i].size / 1024 * 100, 10) / 100;

            // 1.服务器模式 2.不是视频类型 才限制大小
            if (storage_type === 'local' && this.acceptStr.indexOf('mp4') === -1 && curFileSize > maxSize) {
              fun.error({ msg: `文件${curFiles[i].name}大小${curFileSize}kb超出上传限制${maxSize}kb` });
            } else {
              const { URL } = window;
              this.previews.push({
                size: returnFileSize(curFiles[i].size),
                name: curFiles[i].name,
                // eslint-disable-next-line
                url: URL.createObjectURL(curFiles[i]),
                percent: 0,
              });

              if (storage_type === 'aliyun') {
                promiseList.push(upFileFnByAliyunOss({
                  file: curFiles[i],
                  current_path: this.current_path,
                  idx: i,
                  list: this.previews,
                  progress: () => {
                    this.progress(this.previews);
                  },
                }));
              } else {
                promiseList.push(upFileFnByLocal({
                  file: curFiles[i],
                  current_path: this.current_path,
                  name: 'image',
                  idx: i,
                  list: this.previews,
                  extParam: this.extParam,
                  progress: () => {
                    this.progress(this.previews);
                  },
                }));
              }
            }
          }

          // input无法点击多次
          const EL:any = document.getElementById(this.elIdName);
          EL.value = null;
          // this.progress(curFiles)

          this.preview(this.previews);

          Promise.all(promiseList).then((urls) => {
            // this.file_list = urls
            //
            this.previews = [];
            this.preview([]);
            this.success();
          }).catch((msg) => {
            fun.error({ msg: `上传失败：${msg}` });

            // console.log('上传失败',err)
          });
        }


        progress(files) {
          this.$emit('progress', files);
        }

        preview(arr) {
          this.$emit('preview', arr);
        }

        success() {
          this.$emit('done', this.file_list);
        }
}


</script>

<style lang="less" scoped>
  .input-comp-file{
    position: absolute;z-index: -999;left: -999px;visibility: hidden
  }
</style>
