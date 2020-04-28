import Storage from '@/common/Storage'
import { findArrayIdx } from '@/common/helper'
import { Exception } from '@/common/Exception'

const state = {
  cartList: []
}

/**
 *
 * product的数据格式
 * biz_id 商家id
 * store_id 门店id
 * prod_id 产品id
 * attr_id 规则
 * ImgPath 如果没有规格图片，就是产品图片
 * num 数量
 * stock 库存
 * Product_Name 产品名称
 * Products_PriceX
 * Products_PriceY
 * Products_Sales
 *
 */

const mutations = {
  /* async data */
  ASYNC_DATA (state, data) {
    state.cartList = data
    Storage.set('deliveryCartList', data)
  },
  // 加入或者新增数量
  ADD_GOODS (state, { product, num = 1 }) {
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
    if (!cartList) cartList = []
    console.log(product)
    const { Products_PriceX, Products_PriceY, biz_id, Products_ID, ImgPath, Products_Name, attr_id, attr_text } = product
    const idx = findArrayIdx(cartList, { attr_id })
    // 首次加入购物车
    if (idx === false) {
      cartList.push({ Products_PriceX, Products_PriceY, biz_id, Products_ID, ImgPath, Products_Name, attr_id, attr_text, num })
    } else {
      cartList[idx].num += num
    }

    this.commit('delivery/ASYNC_DATA', cartList)
  },
  MINUS_GOODS (state, { product, num = 1 }) {
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
    if (!cartList) cartList = []

    const { attr_id } = product

    const idx = findArrayIdx(cartList, { attr_id: attr_id })
    // 首次加入购物车
    if (idx !== false) {
      cartList[idx].num -= num
      // 要先同步，才能继续走

      /* async data */
      this.commit('delivery/ASYNC_DATA', cartList)

      // 才能继续删除
      if (cartList[idx].num === 0) {
        this.commit('delivery/REMOVE_GOODS', attr_id)
      }
    }
  },
  SET_GOODS_NUM (state, { product, num }) {
    // 直接修改指定attr_id的num

    if (!num && num !== 0) {
      return
    }
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
    if (!cartList) cartList = []

    const { attr_id } = product

    const idx = findArrayIdx(cartList, { attr_id: attr_id })
    // 并非首次加入购物车
    if (idx !== false) {
      cartList[idx].num = num
      // 要先同步，才能继续走

      /* async data */
      this.commit('delivery/ASYNC_DATA', cartList)

      // 才能继续删除
      if (cartList[idx].num === 0) {
        this.commit('delivery/REMOVE_GOODS', attr_id)
      }
    }
    
    
  },
  // 移除指定id商品，不传id就是清空
  REMOVE_GOODS (state, attr_id) {
    console.log('remove attr_id is', attr_id)
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
    if (!cartList) cartList = []

    if (!attr_id && attr_id !== 0) {
      cartList = []
    } else {
      const idx = findArrayIdx(cartList, { attr_id: attr_id })
      cartList.splice(idx, 1)
    }

    this.commit('delivery/ASYNC_DATA', cartList)
  }
}

const actions = {
  // 所有操作后面都要同步的

}

const getters = {
  // 获取指定的记录，看是否存在
  getRow: (state) => (attr_id) => {
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
    if (!cartList) cartList = []

    const row = findArrayIdx(cartList, { attr_id: attr_id }, true)
    if (row !== false) return row.val

    return false
  },
  getTotalNum: (state) => () => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
      if (!Array.isArray(cartList)) throw Error('获取价格失败')
      let count = 0
      for (var row of cartList) {
        count += row.num
      }
      return count
    } catch (e) {
      return 0
    }
  },
  getTotalMoney: (state) => () => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
      if (!Array.isArray(cartList)) throw Error('获取价格失败')
      let count = 0
      for (var row of cartList) {
        count += row.num * row.Products_PriceX
      }
      return count
    } catch (e) {
      return 0
    }
  },
  // 利用方法的方式去获取
  getCartList: (state) => () => {
    try {
      // 第一次是在内存里
      let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('deliveryCartList')
      if (!cartList) cartList = []
      if (!cartList || !Array.isArray(cartList)) throw Error('获取外卖购物车失败')
      return cartList
    } catch (e) {
      Exception.handle(e)
      return []
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
