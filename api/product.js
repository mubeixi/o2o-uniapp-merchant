import {
  fetch
} from '@/common/request'

// 获取产品列表
export const getProductList = (param, options) => fetch({ act: 'get_prod', param, options })

// 获取产品分类
export const getProductCategory = (param, options) => fetch({ act: 'pro_cate', param, options })
