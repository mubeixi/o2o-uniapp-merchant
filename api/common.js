import {
  fetch
} from '@/common/request'

// 优惠券列表
export const getCouponList = (param, options) => fetch({ act: 'getCouponList', param, options })

// 获取评论
export const getCommitList = (param, options) => fetch({ act: 'get_commit', param, options })


// 获取活动详情
export const getActiveInfo = (param, options) => fetch({ act: 'getActiveInfo', param, options })


// 获取商品列表
export const getProd = (param, options) => fetch({ act: 'get_prod', param, options })

// 获取广告
export const getAdvertList = (param, options) => fetch({ act: 'getAdvertList', param, options })

// 获取分享海报
export const getBizShare = (param, options) => fetch({ act: 'getBizShare', param, options })
