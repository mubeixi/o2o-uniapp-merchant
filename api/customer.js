import { fetch } from '@/common/request'
import Storage from '@/common/Storage'

export const getSmsCode = (param, options) => fetch({
  act: 'login_sms',
  param,
  options
})

export const userLogin = (data, options) => {
  // 获取推荐人id
  let owner_id = Storage.get('owner_id')
  if (!owner_id) {
    owner_id = 0
  }
  const param = {
    ...data,
    owner_id
  }
  return fetch({
    act: 'user_login',
    param,
    options
  })
}
// 获取可领取的优惠券
export const getCoupon = (param, options) => fetch({
  act: 'get_unaccalimed_coupon',
  param,
  options
})

export const getUserInfo = (param, options) => fetch({
  act: 'get_user_info',
  param,
  options
})

export const getAddressList = (param, options) => fetch({ act: 'get_address', param, options })

// 用户领取优惠券
export const getUserCoupon = (param, options) => fetch({ act: 'user_receive_coupon', param, options })

// 获取收藏列表
export const getFavouriteProdList = (param,options) => fetch({act:'get_favourite_prod_list', param,options})
// 取消收藏
export const cancelFavouriteProd = (param, options) => fetch({act: 'cancel_favourite_prod', param, options})
// 用户购物车产品数量
export const CartList = (param, options) => fetch({ act: 'get_cart', param, options })

// 用户购物车产品数量
export const DelCart = (param, options) => fetch({ act: 'del_cart', param, options })


// 获取签到页信息
export const getSignin = (param, options) => fetch({ act: 'get_signin', param, options })
// 签到
export const userSignin = (param, options) => fetch({ act: 'signin', param, options })
