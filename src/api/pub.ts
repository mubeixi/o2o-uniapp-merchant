import {fetch} from "../common/fetch";

export const uploadImgByBase64 = (data:object={},options:any=false) => fetch('upload_image', data, options);

export const uploadFileFn = (data:object={},options:any=false) => fetch('upload_image', data, options);

export const getUsersInfo = (data:object={},options:any=false) => fetch('get_users_info', data, options)

export const getCommonConfig = (data:object={},options:any=false)=> fetch('shopconfig', data, options)
