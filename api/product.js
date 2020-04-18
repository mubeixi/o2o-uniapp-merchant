import {
  fetch
} from '@/common/request'

// 获取产品列表
export const getProductList = (param, options) => fetch({ act: 'get_prod', param, options })

// 获取产品分类
export const getProductCategory = (param, options) => fetch({ act: 'pro_cate', param, options })


// 获取产品详情
export const getProductDetail = (param, options) => fetch({ act: 'prod_detail', param, options })


//获取活动详情
export const getActiveInfo = (param, options) => fetch({ act: 'getActiveInfo', param, options })

//获取商家详情和入驻信息
export const getBizInfo = (param, options) => fetch({ act: 'getBizInfo', param, options })

//获取商家列表
export const getStoreList = (param, options) => fetch({ act: 'getStoreList', param, options })
