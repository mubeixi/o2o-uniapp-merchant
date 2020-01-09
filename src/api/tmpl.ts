//获取商城的配置
import {fetch} from "../common/fetch";

export const getSkinConfig = (data:object={}, options:any=false) => fetch('get_skin_data', data, options)

export const getDiySkinConfig = (data:object={},options:any=false) => fetch('get_makeup_home_data', data, options)

//更新商城的配置
export const setSkinConfig = (data:object={},options:any=false) => fetch('save_skin_date', data, options)

export const setDiySkinConfig = (data:object={},options:any=false) => fetch('save_makeup_home_data', data, options)

//获取diy url列表
export const getDiyUrl = (data:object={},options:any=false) => fetch('system_diy_url', data, options)
