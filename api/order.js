import { fetch } from '@/common/request'
import Storage from '@/common/Storage'

// 获取订单操作
export const createOrderCheck = (param, options) => fetch({
  act: 'create_order_check',
  param,
  options
})

// 提交订单
export const createOrder = (param, options) => {
  // 获取推荐人id
  let owner_id = Storage.get('owner_id')
  if (!owner_id) {
    owner_id = 0
  }
  const _param = {
    ...param,
    owner_id
  }

  return fetch({
    act: 'create_order',
    param:_param,
    options
  })
}

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

// 获取订单详情
export const getOrderDetail = (param, options) => fetch({
  act: 'get_order_detail',
  param,
  options
})

// 订单支付
export const orderPay = (param, options) => fetch({
  act: 'order_pay',
  param,
  options
})

export const confirmOrderPayStatus = (param, options) => fetch({
  act: 'judge_ispay',
  param,
  options
})