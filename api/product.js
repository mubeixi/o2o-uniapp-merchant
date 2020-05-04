import {
  fetch
} from '@/common/request'

// 获取产品列表
export const getProductList = (param, options) => {
  if (param.hasOwnProperty('biz_id'))param.biz_ids = param.biz_id // hack biz_id参数变更
  return fetch({ act: 'get_prod', param, options })
}

export const getFlashsaleList = (param, options) => fetch({
  act: 'get_flashsale',
  param,
  options
})

// 获取产品分类
export const getProductCategory = (param, options) => fetch({
  act: 'pro_cate',
  param,
  options
})

// 获取商家自定义分类
export const getBizProdCateList = (param, options) => fetch({
  act: 'bizProdCateList',
  param,
  options
})

// 获取产品详情
export const getProductDetail = (param, options) => fetch({
  act: 'prod_detail',
  param,
  options
})

// 获取活动详情
export const getActiveInfo = (param, options) => fetch({
  act: 'getActiveInfo',
  param,
  options
})

// 获取商家列表
export const getStoreList = (param, options) => fetch({
  act: 'getStoreList',
  param,
  options
})

export const getSpikeProd = (param, options) => fetch({
  act: 'get_spike_prod',
  param,
  options
})

// 获取限时抢购列表
export const bizSpikeList = (param, options) => fetch({
  act: 'bizSpikeList',
  param,
  options
})

export const bizFlashsaleList = (param, options) => fetch({
  act: 'bizFlashsaleList',
  param,
  options
})

// 获取商品海报
export const getProductSharePic = (param, options) => fetch({
  act: 'shareProduct',
  param,
  options
})

// 获取赠品列表
export const getGiftList = (param, options) => fetch({
  act: 'get_gift_list',
  param,
  options
})

// 获取赠品详情
export const judgeReceiveGift = (param, options) => fetch({
  act: 'judge_receive_gift',
  param,
  options
})
