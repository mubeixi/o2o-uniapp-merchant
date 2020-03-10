import {Notification} from "element-ui";

export const fun =  {
  success: ({msg = '操作成功', title = '成功'}) => Notification({
    title,
    message: msg,
    type: 'success',
  }),
  warning: ({msg = '', title = '警告'}) => Notification({
    title,
    message: msg,
    type: 'warning',
  }),
  info: ({msg = '', title = '提示'}) => Notification({
    title,
    message: msg,
    type: 'info',
  }),
  error: ({msg = '错误', title = '错误'}) => Notification({
    title,
    message: msg,
    type: 'error',
  }),
  // Loading:({text = 'loading',fullscreen = false,lock = true,spinner = 'el-icon-loading',mask = false}) =>{
  //   window.funLoading = Loading.service({text,fullscreen,lock,spinner,background:mask?'rgba(0, 0, 0, 0.1)':null})
  //
  // },
  // close:()=>{window.funLoading.close()}

};
