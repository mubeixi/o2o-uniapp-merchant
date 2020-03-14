import { Notification } from 'element-ui';

const success = ({ msg = '操作成功', title = '成功' }) => Notification({
  title,
  message: msg,
  type: 'success',
});
const warning = ({ msg = '', title = '警告' }) => Notification({
  title,
  message: msg,
  type: 'warning',
});
const info = ({ msg = '', title = '提示' }) => Notification({
  title,
  message: msg,
  type: 'info',
});
const error = ({ msg = '错误', title = '错误' }) => Notification({
  title,
  message: msg,
  type: 'error',
});

export const fun = {
  success,
  warning,
  info,
  error,

  // Loading:({text = 'loading',fullscreen = false,lock = true,spinner = 'el-icon-loading',mask = false}) =>{
  //   window.funLoading = Loading.service({text,fullscreen,lock,spinner,background:mask?'rgba(0, 0, 0, 0.1)':null})
  //
  // },
  // close:()=>{window.funLoading.close()}

};

export default {
  success,
  warning,
  info,
  error,
};
