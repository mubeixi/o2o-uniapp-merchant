import Storage from '@/common/Storage'

const state = {
  userInfo: false,
  addressInfo: null
}

const mutations = {
  SET_USER_ADDRESS (state, value) {
    //state.userInfo = value
    Storage.set('userAddressInfo', value, 1)
  },
  SET_USER_INFO (state, value) {
    state.userInfo = value

    if (value && value.bind_stores && value.bind_stores.Stores_ID) {
      state.Stores_ID = value.bind_stores.Stores_ID
      Storage.set('Stores_ID', state.Stores_ID)
    } else {
      Storage.set('Stores_ID', null, 1)
    }
    Storage.set('userInfo', value)
    // 要覆盖，不然有时候user_id删不掉
    Storage.set('user_id', value.User_ID, 1)
    // 跟着清空access_token
    if (!value.hasOwnProperty('User_ID') || !value.User_ID) {
      Storage.remove('access_token')
    }
  }
}

const actions = {
  setUserInfo: ({ commit }, data) => {
    commit('SET_USER_INFO', data)
  },
  setUserAddressInfo: ({ commit }, data) => {
    commit('SET_USER_ADDRESS', data)
  }
}

const getters = {
  getUserAddressInfo: (state) => () => {
    try {
      // 第一次是在内存里
      const data = state.addressInfo || Storage.get('userAddressInfo')
      if (!data || typeof data !== 'object') throw Error('获取用户信息失败')
      return data
    } catch (e) {
      return {}
    }
  },
  addressInfo: (state) => state.addressInfo || Storage.get('userAddressInfo'),
  userInfo: (state) => state.userInfo || Storage.get('userInfo'),
  // 利用方法的方式去获取
  getUserInfo: (state) => () => {
    try {
      // 第一次是在内存里
      const data = state.userInfo || Storage.get('userInfo')
      if (!data || typeof data !== 'object') throw Error('获取用户信息失败')
      return data
    } catch (e) {
      return {}
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
