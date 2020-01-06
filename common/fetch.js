import fetch from './request';

//获取全局配置
export const getSystemConf = (data, options) => fetch('shopconfig', data, options)

export const login = (data, options) => {
    //获取推荐人id
    // let owner_id = ls.get("owner_id")
    // if (!owner_id) {
    //     owner_id = 0;
    // }
    // data = {...data, owner_id}
    return fetch('user_login', data, options)
}

//大转盘初始化
export const rotateInit = (data, options) => fetch('initTurn', data, options)

//大转盘开始
export const rotateBegin = (data, options) => fetch('beginTurn', data, options)

//获取中奖记录
export const getRotateRecord = (data, options) => fetch('getPrizeRecord', data, options)

//分销累计利润接口
export const getBalanceDetail = (data, options) => fetch('getBalanceDetail', data, options)


export const sendAnalysisData = (data, options) => fetch('clickRecord', data, options)

export const getCouponList = (data, options) => fetch('get_unaccalimed_coupon', data, options)

export const getProductList = (data, options) => fetch('get_prod', data, options)

export const getShopSkinList = (data, options) => fetch('get_shopskin', data, options)

export const chooseShopSkin = (data, options) => fetch('choose_shopskin', data, options)

//获取商城的配置
export const getSkinConfig = (data, options) => fetch('get_shophome', data, options)

export const getSkinPreData = (data, options) => fetch('get_skin_data', data, options)

export const getDiySkinConfig = (data, options) => fetch('get_makeup_home_data', data, options)

//更新商城的配置
export const setSkinConfig = (data, options) => fetch('update_shophome', data, options)
//获取商品列表
export const getProductCategory = (data, options) => fetch('pro_cate', data, options)


//获取团队销售额来源
export const getTeamSalesList = (data, options) => fetch('getTeamSalesList', data, options)

//获取详情页
export const getProductDetail = (data, options) => fetch('prod_detail', data, options)
//获取秒杀详情页
export const flashsaleDetail = (data, options) => fetch('flashsale_detail', data, options)
//获取秒杀详情页
export const spikeProdDetail = (data, options) => fetch('spike_prod_detail', data, options)

//秒杀预约
export const flashsaleReserve = (data, options) => fetch('flashsale_reserve', data, options)


//获取评论详情
export const getCommit = (data, options) => fetch('get_commit', data, options)
//获取搜索结果

// 获取购物车信息
export const getCart = (data, options) => fetch('get_cart', data, options)
// 获取普通产品
export const getProd = (data, options) => fetch('get_prod', data, options)
// 获取收货地址
export const getAddress = (data, options) => fetch('get_address', data, options)
// 更新购物车
export const updateCart = (data, options) => fetch('update_cart', data, options)
// 获取订单操作
export const createOrderCheck = (data, options) => fetch('create_order_check', data, options)
// 获取用户信息（临时）
export const get_user_info = (data, options) => fetch('get_user_info', data, options)
// 获取评论
export const getComments = (data, options) => fetch('get_commit', data, options)
// 获取收藏列表
export const getFavouritePro = (data, options) => fetch('get_favourite_prod_list', data, options);
// 添加收藏产品
export const addCollection = (data, options) => fetch('add_favourite_prod', data, options);
// 取消收藏
export const cancelCollection = (data, options) => fetch('cancel_favourite_prod', data, options);
// 获取订单列表
export const getOrder = (data, options) => fetch('get_order', data, options);
// 删除订单
export const delOrder = (data, options) => fetch('del_order', data, options);
// 删除购物车产品
export const delCart = (data, options) => fetch('del_cart', data, options)

export const getStoreList = (data, options) => fetch('get_store_list', data, options)

// 获取可领取的优惠券
export const getCoupon = (data, options) => fetch('get_unaccalimed_coupon', data, options);
// 用户领取优惠券
export const getUserCoupon = (data, options) => fetch('user_receive_coupon', data, options);
// 获取用户已领取的优惠券
export const getUserReceivedCoupon = (data, options) => fetch('get_user_coupon', data, options);
// 获取用户已失效的优惠券
export const getExpiredCoupon = (data, options) => fetch('get_expired_coupon', data, options);
// 提交订单
export const createOrder = (data, options) => fetch('create_order', data, options);

// 提交订单
export const getWithdrawConfig = (data, options) => fetch('get_withdraw_config', data, options);
// 获取结算详情
export const settlement = (data, options) => fetch('settlement', data, options);
// 获取结算列表
export const getSettlements = (data, options) => fetch('get_settlements', data, options);

// 上传图片
export const uploadImage = (data, options) => fetch('upload_image', data, options);
// 获取订单详情
export const getOrderDetail = (data, options) => fetch('get_order_detail', data, options);

// 取消订单
export const cancelOrder = (data, options) => fetch('cancel_order', data, options);
// 获取订单状态角标数
export const getOrderNum = (data, options) => fetch('get_order_num', data, options);
// 获取申请退货退款
export const getRefund = (data, options) => fetch('get_refund_info', data, options);
// 取消申请退款
export const cancelRefund = (data, options) => fetch('cancel_refund', data, options);
// 获取退款单详情
export const getBackOrderDetail = (data, options) => fetch('get_back_order_detail', data, options);
// 用户退款发货
export const refundSend = (data, options) => fetch('refund_send', data, options);
// 获取商品规格库存
export const getProductAtts = (data, options) => fetch('get_product_atts', data, options);

// 支付订单
export const orderPay = (data, options) => fetch('order_pay', data, options);

// 检查产品是否已收藏
export const checkProdCollected = (data, options) => fetch('check_prod_favourite', data, options);

// 获取乡镇
export const getTown = (data, options) => fetch('get_town', data, options);
// 编辑收货地址
export const editAddress = (data, options) => fetch('edit_address', data, options);
// 添加收货地址
export const addAddress = (data, options) => fetch('add_address', data, options);
// 删除收货地址
export const delAddress = (data, options) => fetch('del_address', data, options);

// 获取用户提现方式
export const getUserWithdrawMethod = (data, options) => fetch('get_user_withdraw_method', data, options);
// 用户新增提现方式
export const addUserWithdrawMethod = (data, options) => fetch('add_user_withdraw_method', data, options);
// 获取商城提现方式
export const getShopWithdrawMethod = (data, options) => fetch('get_shop_withdraw_method', data, options);
// 申请提现
export const withdrawApply = (data, options) => fetch('withdraw_apply', data, options);
// 获取申请提现记录
export const getWithdrawRecordList = (data, options) => fetch('get_withdraw_record_list', data, options);
// 删除提现方式
export const delUserWithdrawMethod = (data, options) => fetch('del_user_withdraw_method', data, options);
// 提交评论
export const comment = (data, options) => fetch('comment', data, options);
// 订单确认收货
export const confirmOrder = (data, options) => fetch('confirm_order', data, options);

//短信验证码
export const getSmsCode = (data, options) => fetch('login_sms', data, options);


// 退款
export const orderRefund = (data, options) => fetch('order_refund', data, options);


export const getSpikeProd = (data, options) => fetch('get_spike_prod', data, options)

//获取个人中心签到状态
export const signin = (data, options) => fetch('signin', data, options);
//获取签到页信息
export const getSignin = (data, options) => fetch('get_signin', data, options);
// 分销佣金 管理列表
export const getManageRecordList = (data, options) => fetch('getManageRecordList', data, options);

//获取订单物流追踪
export const getOrderExpress = (data, options) => fetch('get_order_express', data, options);
//获取任务中心数据
export const getTaskCenter = (data, options) => fetch('get_task_center', data, options);


//jssdk签名
export const getJsSign = (data, options) => fetch('share_config', data, options);

export const getProductCountInfo = (data, options) => fetch('get_users_info', data, options);

export const getBalanceRank = (data, options) => fetch('get_balance_rank', data, options);

//获取商品的海报
export const getProductSharePic = (data, options) => fetch('get_product_tgqrcode', data, options);

// 推广小助手 添加文章
export const addPromotionArticle = (data, options) => fetch('add_promotion_article', data, options);

//增加产品的浏览次数
export const addProductViews = (data, options) => fetch('prod_views', data, options);

//获取拼团的团队
export const getPintuanTeam = (data, options) => fetch('get_pintuan_team', data, options);

//更新用户信息
export const upDateUserInfo = (data, options) => fetch('update_user_info', data, options);

// 修改登录密码
export const updateUserLoginPsw = (data, options) => fetch('update_user_login_psw', data, options);

// 修改支付密码
export const updateUserPayPsw = (data, options) => fetch('update_user_pay_psw', data, options);

// 更新用户手机号  获取验证码
export const updateMobileSms = (data, options) => fetch('update_mobile_sms', data, options);

// 更新用户手机号
export const updateUserMobile = (data, options) => fetch('update_user_mobile', data, options);
// 获取会员等级信息
export const getLevelCenter = (data, options) => fetch('get_level_center', data, options);

// 积分记录
export const userIntegralRecord = (data, options) => fetch('user_integral_record', data, options);
// 积分兑换产品列表
export const getJifenProd = (data, options) => fetch('get_jifen_prod', data, options);
// 我的积分兑换列表
export const jifenProdOrder = (data, options) => fetch('jifen_prod_order', data, options);
// 取消积分兑换订单
export const cancelJifenProdOrder = (data, options) => fetch('cancel_jifen_prod_order', data, options);
// 确定兑换订单
export const confirmJifenProdOrder = (data, options) => fetch('confirm_jifen_prod_order', data, options);

// 积分支付
export const jifenProdDuihuan = (data, options) => fetch('jifen_prod_duihuan', data, options);

// 获取退款单列表
export const getBackOrder = (data, options) => fetch('get_back_order', data, options);

// 获取物流
export const getShipping = (data, options) => fetch('get_shipping', data, options);

//获取用户资金变动记录
export const getUserMoneyRecord = (data, options) => fetch('user_money_record', data, options);

//获取用户的余额记录
export const getUserChargeRecord = (data, options) => fetch('user_charge_record', data, options);

// 余额充值
export const depositBalance = (data, options) => fetch('deposit_balance', data, options);


export const saveTempData = (data, options) => fetch('save_redis_data', data, options);
export const getTempData = (data, options) => fetch('get_redis_data', data, options);
// 长链接转换短链接
export const traslateShorten = saveTempData

// 获取礼品物流信息
export const get_ship_gift = (data, options) => fetch('get_ship_gift', data, options);

export const bindUserClientId = (data, options) => fetch('user_uuid_set', data, options);

export const confirmOrderPayStatus = (data, options) => fetch('judge_ispay', data, options);

//秒杀列表
export const getFlashSaleList = (data, options) => fetch('get_flashsale', data, options);

//写入用户日志
export const upUserLog = (data, options) => {
    console.log('上报用户信息', data, options)
    return fetch('write_user_log', data, options)
}





