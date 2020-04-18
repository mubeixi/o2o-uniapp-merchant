import {
  fetch
} from '@/common/request'

export const getBizInfo = (param, options) => fetch({ act: 'getBizInfo', param, options })

export const getBizSpikeList = (param, options) => fetch({ act: 'bizSpikeList', param, options })
