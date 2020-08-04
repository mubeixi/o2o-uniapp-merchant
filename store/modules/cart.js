import Storage from '@/common/Storage'
import { findArrayIdx } from '@/common/helper'
import { Exception } from '@/common/Exception'
import { updateCart } from '@/api/order'
import { DelCart } from '@/api/customer'

const filterPrice = (price) => {
  if (isNaN(price)) return 0
  if (!price) return 0
  return parseInt(Number(price) * 100) / 100
}

/**
 * 异步更新库存
 * @param prod_id
 * @param attr_id
 * @param qty
 * @param bizId
 * @returns {Promise<void>}
 */
const updateCartFn = ({ prod_id, attr_id, qty, bizId }) => {
  const data = {
    cart_key: 'CartList',
    prod_id,
    attr_id,
    qty
  }

  return new Promise((resolve, reject) => {
    updateCart(data, { tip: '加载中' })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(Error(err.msg))
      })
  })
}

const deletedCartFn = ({ prod_attr }) => {
  const data = {
    cart_key: 'CartList',
    prod_attr
  }

  return new Promise((resolve, reject) => {
    DelCart(data, { tip: '加载中' })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(Error(err.msg))
      })
  })
}

const state = {
  cartList: [],
  bizList: {}
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
  SET_BIZLIST (state, data) {
    state.bizList = Object.assign({}, data)
  },
  /* async data */
  ASYNC_DATA (state, data) {
    state.cartList = data
    Storage.set('shopCartList', data)
  },
  // 加入或者新增数量
  ADD_GOODS (state, { product, num = 1 }) {
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []
    // console.log(product)
    // biz_id: Number(this.bid),
    //   checked: false,
    //   pic: ImgPath,
    //   name: Products_Name,
    //   price_selling: Number(Products_PriceX),
    //   price_market: Number(Products_PriceY)
    const { biz_id, prod_id, attr_id, checked, price_selling, price_market, name, pic,attr_text='' } = product
    const idx = findArrayIdx(cartList, { attr_id, prod_id })
    // 首次加入购物车
    if (idx === false) {
      console.log(product)
      cartList.push({ biz_id, prod_id, attr_id, num, checked, price_selling, price_market, name, pic,attr_text })
    } else {
      cartList[idx].num += num
    }

    this.commit('cart/ASYNC_DATA', cartList)
  },
  MINUS_GOODS (state, { product, num = 1 }) {
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    const { attr_id, prod_id } = product

    const idx = findArrayIdx(cartList, { attr_id, prod_id })
    // 首次加入购物车
    if (idx !== false) {
      cartList[idx].num = Number(cartList[idx].num) + Number(num)
      // 要先同步，才能继续走

      /* async data */
      this.commit('cart/ASYNC_DATA', cartList)

      // 才能继续删除
      // 不需要删除
      // if (cartList[idx].num === 0) {
      //   this.commit('cart/REMOVE_GOODS', attr_id)
      // }
    }
  },
  SET_GOODS_NUM (state, { product, num }) {
    // 直接修改指定attr_id的num

    if (!num && num !== 0) {
      return
    }
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    const { attr_id, prod_id } = product

    const idx = findArrayIdx(cartList, { attr_id: attr_id })
    // 并非首次加入购物车
    if (idx !== false) {
      cartList[idx].num = num
      // 要先同步，才能继续走

      /* async data */
      this.commit('cart/ASYNC_DATA', cartList)

      // 才能继续删除
      if (cartList[idx].num === 0) {
        this.commit('cart/REMOVE_GOODS', { attr_id, prod_id })
      }
    }
  },
  // 移除指定id商品，不传id就是清空
  REMOVE_GOODS (state, { attr_id, prod_id }) {
    console.log('remove prod_info is', { attr_id, prod_id })
    // 不怕页面刷新的获取购物车
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    if (!attr_id && attr_id !== 0) {
      cartList = []
    } else {
      const idx = findArrayIdx(cartList, { attr_id, prod_id })
      cartList.splice(idx, 1)
    }

    this.commit('cart/ASYNC_DATA', cartList)
  },

  // 移除指定商户下的商品
  REMOVE_GOODS_BY_BIZ (state, biz_id) {
    console.log('remove biz_id is', biz_id)
    // 不怕页面刷新的获取购物车
    const cartListData = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    const cartList = cartListData.filter(item => Number(item.biz_id) !== Number(biz_id))

    this.commit('cart/ASYNC_DATA', cartList)
  }
}

const actions = {
  updateRowPrice({ commit, state }, { prod_id, attr_id, price_selling}){
    console.log(prod_id, attr_id, price_selling)
    if(isNaN(price_selling)||price_selling<0){
      return false
    }
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    const idx = findArrayIdx(cartList, { attr_id, prod_id })
    if (idx !== false){
      cartList[idx].price_selling = price_selling
      this.commit('cart/ASYNC_DATA', cartList)
      return true
    }

    return false
  },
  async addNum ({ commit, state }, { product, num = 1 }) {
    try {
      const { biz_id, prod_id, attr_id } = product
      const cartNewData = await updateCartFn({ prod_id, attr_id, biz_id, qty: num }).catch(errObj => { throw errObj })
      if (num > 0) {
        commit('ADD_GOODS', { product, num: Number(num) })
      } else {
        commit('MINUS_GOODS', { product, num: Number(num) })
      }

      return cartNewData
    } catch (e) {
      // 显示错误原因就好了，比如库存不足
      Exception.handle(e)
      return false
    }
  },
  /**
   * 切换选择状态
   * 啥也不传，直接全局
   * @param attr_id 传这个和prod_id切换单行记录
   * @param prod_id
   * @param biz_id // 只传这个，切换商家的
   * @returns {boolean|*}
   */
  taggleCheckStatus ({ commit, state }, { attr_id, prod_id, biz_id } = {}) {
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    // 切换一行
    if (attr_id >= 0 && prod_id) {
      const idx = findArrayIdx(cartList, { attr_id, prod_id })
      if (idx !== false) {
        cartList[idx].checked = !cartList[idx].checked
        this.commit('cart/ASYNC_DATA', cartList)
        return cartList[idx].checked
      }
    }

    // 某个商家
    if (biz_id) {
      const bizCheckStatus = !this.getters['cart/getListCheckStatus'](biz_id)
      console.log(bizCheckStatus)
      for (const row of cartList) {
        if (Number(row.biz_id) === Number(biz_id))row.checked = bizCheckStatus
      }
      this.commit('cart/ASYNC_DATA', cartList)
      return bizCheckStatus
    }

    // 所有
    if (!biz_id && !attr_id && !prod_id) {
      const allCheckStatus = !this.getters['cart/getListCheckStatus']()
      for (const row of cartList) {
        row.checked = allCheckStatus
      }
      this.commit('cart/ASYNC_DATA', cartList)
      return allCheckStatus
    }

    return false
  },
  async removeGoods ({ commit, state }, { biz_id, attr_id, prod_id }) {
    // 第一次是在内存里
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    if (!cartList || !Array.isArray(cartList)) throw Error('获取外卖购物车失败')
    var delList = []
    // 指定商家
    if (biz_id) {
      delList = cartList.filter(item => item.biz_id === biz_id)
    } else if (attr_id >= 0 && prod_id) {
      delList = cartList.filter(item => item.prod_id === prod_id && item.attr_id === attr_id)
    } else {
      delList = cartList
    }
    console.log(delList)
    const obj = {}
    // 删除
    for (const row of delList) {
      const { biz_id, prod_id, attr_id } = row
      // 如果是删除商品的情况下，那么不需要考虑是否check
      if (attr_id >= 0 && prod_id) {
        // 有需需要才创建
        if (!obj.hasOwnProperty(biz_id))obj[biz_id] = {}
        if (!obj[biz_id].hasOwnProperty(prod_id))obj[biz_id][prod_id] = []
        obj[biz_id][prod_id].push(attr_id)
      } else if (row.checked) {
        // 有需需要才创建
        if (!obj.hasOwnProperty(biz_id))obj[biz_id] = {}
        if (!obj[biz_id].hasOwnProperty(prod_id))obj[biz_id][prod_id] = []
        obj[biz_id][prod_id].push(attr_id)
      }
    }

    const handleRT = await deletedCartFn({ prod_attr: JSON.stringify(obj) })

    if (handleRT) {
      if (attr_id >= 0 && prod_id) {
        commit('REMOVE_GOODS', { attr_id, prod_id })
      } else {
        commit('REMOVE_GOODS_BY_BIZ', biz_id)
      }

      return true
    } else {
      return false
    }
  }
}

const getters = {
  // 获取指定的记录，看是否存在
  getRow: (state) => ({ attr_id, prod_id }) => {
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []

    const row = findArrayIdx(cartList, { attr_id, prod_id }, true)
    if (row !== false) return row.val

    return false
  },
  // 检测是否被选中指定列表，biz_id不传则表示检测是否需要全选
  getListCheckStatus: (state) => (biz_id) => {
    try {
      // 第一次是在内存里
      let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!cartList) cartList = []

      if (!cartList || !Array.isArray(cartList)) throw Error('获取外卖购物车失败')
      // 指定商家
      if (biz_id) {
        const bizCartList = cartList.filter(item => item.biz_id === biz_id)
        const checkLen = bizCartList.filter(row => row.checked === true).length // 获取的长度

        return bizCartList.length === checkLen && checkLen > 0
      } else {
        // 全选呀
        const checkLen = cartList.filter(row => row.checked === true).length // 获取的长度
        return cartList.length === checkLen
      }
    } catch (e) {
      return false
    }
  },
  getRowCheckStatus: (state) => ({ attr_id, prod_id }) => {
    let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
    if (!cartList) cartList = []
    const idx = findArrayIdx(cartList, { attr_id, prod_id })
    if (idx !== false) {
      return cartList[idx].checked === true
    }
    return false
  },
  getTotalNum: (state) => (bid, checked = true) => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!Array.isArray(cartList)) throw Error('获取价格失败')
      let count = 0

      for (var row of cartList) {
        if (checked) {
          if (Number(row.biz_id) === Number(bid) && row.checked) {
            count += row.num
          }
        } else {
          if (Number(row.biz_id) === Number(bid)) {
            count += row.num
          }
        }
      }

      return count
    } catch (e) {
      return 0
    }
  },
  getTotalMoney: (state) => (bid, checked = true) => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!Array.isArray(cartList)) throw Error('获取价格失败')
      let count = 0

      for (var row of cartList) {
        if (checked) {
          if (Number(row.biz_id) === Number(bid) && row.checked) {
            count += row.num * row.price_selling
          }
        } else {
          if (Number(row.biz_id) === Number(bid)) {
            count += row.num * row.price_selling
          }
        }
      }

      return filterPrice(count)
    } catch (e) {
      return 0
    }
  },
  getTotalMoneyByMarket: (state) => (bid,checked=true) => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!Array.isArray(cartList)) throw Error('获取价格失败')
      let count = 0
      for (var row of cartList) {
        if(checked){
          if (Number(row.biz_id) === Number(bid) && row.checked) {
            count += row.num * row.price_market
          }
        }else{
          if (Number(row.biz_id) === Number(bid)) {
            count += row.num * row.price_market
          }
        }

      }
      return count
    } catch (e) {
      return 0
    }
  },
  // 获取某个商品的所有数量
  getGoodsTotalById: (state) => (Products_ID) => {
    try {
      const cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!Array.isArray(cartList)) throw Error('获取数量失败')
      let count = 0
      for (var row of cartList) {
        if (Number(row.Products_ID) === Number(Products_ID)) {
          count += row.num
        }
      }
      return count
    } catch (e) {
      return 0
    }
  },
  // 利用方法的方式去获取
  getCartList: (state) => (bid) => {
    try {
      // 第一次是在内存里
      let cartList = state.cartList.length > 0 ? state.cartList : Storage.get('shopCartList')
      if (!cartList) cartList = []

      if (!cartList || !Array.isArray(cartList)) throw Error('获取外卖购物车失败')

      if (bid) {
        return cartList.filter(item => Number(item.biz_id) === Number(bid))
      } else {
        return cartList
      }
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
