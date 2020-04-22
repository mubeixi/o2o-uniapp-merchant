import { fetch } from '@/common/request'

// 获取订单操作
export const createOrderCheck = (param, options) => fetch({
  act: 'create_order_check',
  param,
  options
})

// 提交订单
export const createOrder = (param, options) => fetch({
  act: 'create_order',
  param,
  options
})

// 获取购物车信息
export const getCart = (param, options) => fetch({
  act: 'get_cart',
  param,
  options
})

// 获取购物车信息
export const updateCart = (param, options) => fetch({
  act: 'update_cart',
  param,
  options
})
