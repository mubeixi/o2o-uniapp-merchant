import fetch from '../common/request'


//获取全局配置
export const getSystemConf = (data, options) => fetch('shopconfig', data, options)
