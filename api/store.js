import {
  fetch
} from '@/common/request'

// 获取商家信息
export const getBizInfo = (param, options) => fetch({ act: 'getBizInfo', param, options })

// 获取限时抢购
export const getBizSpikeList = (param, options) => fetch({ act: 'bizSpikeList', param, options })

// 获取门店信息
export const getStoreList = (param, options) => fetch({ act: 'getStoreList', param, options })
