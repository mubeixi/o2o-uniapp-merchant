
import {
  uploadImgByBase64,
} from '../../api/pub';
import { domain } from '../../common/utils';
import { isDev } from '../../common/env';

// 上传适配插件所有的操作都在这里面完成
export class myUploadLoader {
  constructor(loader:any) {
    this.loader = loader;
  }
  loader:any



  upload() {
    return this.loader.file.then((file:any) => new Promise((resolve, reject) => {
      // 方法一：
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        // 阿里云
        uploadImgByBase64({ image: reader.result }).then((res:any) => {
          console.log(res.data.path);
          resolve({
            default: isDev ? domain(res.data.path) : res.data.path,
            // default:domain(res.data.path)
          });
        }).catch((e) => {});
      }, false);
      reader.readAsDataURL(file);
    }));
  }

  abort() {}
}
