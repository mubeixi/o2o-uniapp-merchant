import { fetch } from '@/common/request'
import Storage from '@/common/Storage'

export const getSmsCode = (param, options) => fetch({
  act: 'login_sms',
  param,
  options
})

//退出登录
export const bindUserClientId = (param, options) => fetch({
  act: 'user_uuid_set',
  param,
  options
})

//修改登录密码
export const updateUserLoginPsw = (param, options) => fetch({
  act: 'update_user_login_psw',
  param,
  options
})
//修改支付密码
export const updateUserPayPsw = (param, options) => fetch({
  act: 'update_user_pay_psw',
  param,
  options
})

// 更新用户手机号  获取验证码
export const updateMobileSms = (param, options) => fetch({
  act: 'update_mobile_sms',
  param,
  options
})

// 更新用户手机号
export const updateUserMobile = (param, options) => fetch({
  act: 'update_user_mobile',
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
export const transferIntegral = (param, options) => fetch({
  act: 'transfer_integral',
  param,
  options
})
export const userIntegralRecord = (param, options) => fetch({
  act: 'user_integral_record',
  param,
  options
})


export const updateUserInfo = (param, options) => fetch({
  act: 'update_user_info',
  param,
  options
})

//用户获取系统消息
export const getUserMessage = (param, options) => fetch({ act: 'get_user_message', param, options })
//用户已读系统消息
export const readUserMessage = (param, options) => fetch({ act: 'read_user_message', param, options })

export const getAddressList = (param, options) => fetch({ act: 'get_address', param, options })
export const delAddress = (param, options) => fetch({ act: 'del_address', param, options })
export const addAddress = (param, options) => fetch({ act: 'add_address', param, options })
export const editAddress = (param, options) => fetch({ act: 'edit_address', param, options })
// 用户领取优惠券
export const getUserCoupon = (param, options) => fetch({ act: 'receiveCoupon', param, options })

// 获取收藏列表
export const getFavouriteProdList = (param, options) => fetch({ act: 'get_favourite_prod_list', param, options })

// 用户购物车产品数量
export const CartList = (param, options) => fetch({ act: 'get_cart', param, options })

// 用户购物车产品数量
export const DelCart = (param, options) => fetch({ act: 'del_cart', param, options })

// 获取签到页信息
export const getSignin = (param, options) => fetch({ act: 'get_signin', param, options })
// 签到
export const userSignin = (param, options) => fetch({ act: 'signin', param, options })

// 评论回复
export const commentReply = (param, options) => fetch({ act: 'commentReply', param, options })

export const getRightsCard = (param, options) => fetch({ act: 'getRightsCard', param, options })

// 检测商品或者商家是否收藏
export const checkFavourite = (param, options) => fetch({ act: 'check_prod_favourite', param, options })

// 新增收藏
export const addFavourite = (param, options) => fetch({ act: 'add_favourite_prod', param, options })

// 取消收藏
export const cancelFavourite = (param, options) => fetch({ act: 'cancel_favourite_prod', param, options })

// 创建权益卡订单
export const createRightsCardOrder = (param, options) => fetch({ act: 'createRightsCardOrder', param, options })

// 支付权益卡订单
export const rightsCardPay = (param, options) => fetch({ act: 'rightsCardPay', param, options })


// 支付权益卡订单
export const getTaskCenter = (param, options) => fetch({ act: 'get_task_center', param, options })
