//获取商城的配置
import {fetch} from "../common/fetch";

export const getSkinConfig = (data:object={}, options:any=false) => fetch('get_skin_data', data, options)

export const getDiySkinConfig = (data:object={},options:any=false) => fetch('get_makeup_home_data', data, options)

//更新商城的配置
export const setSkinConfig = (data:object={},options:any=false) => fetch('save_skin_date', data, options)

//更新diy页面数据
export const setDiySkinConfig = (data:object={},options:any=false) => fetch('save_makeup_home_data', data, options)

//获取diy url列表
export const getDiyUrl = (data:object={},options:any=false) => fetch('system_diy_url', data, options)

//获取自定义页面的列表
export const getDiyPageList = (data:object={},options:any=false) => fetch('get_makeup_home', data, options)

//获取系统url列表
export const getSystemUrl = (data:object={},options:any=false) => fetch('system_url', data, options)

//获取文章列表url
export const systemArticleUrl = (data:object={},options:any=false) => fetch('system_article_url', data, options);

