import Storage from '@/common/Storage'
import { modal } from '@/common/fun'
import { getSystemConf } from '@/api/common'

const state = {
  initData: false
}

const mutations = {
  SET_INIT_DATA (state, value) {
    state.initData = value
    Storage.set('initData', value, 1)

    // app分享小程序的时候有用到
    if (value && value.login_methods) {
      const login_methods = value.login_methods
      for (var i in login_methods) {
        if (i !== 'component_appid' && login_methods[i].type === 'wx_lp' && login_methods[i].authorizer_user_name) {
          Storage.set('WX_MINI_ORIGIN_ID', login_methods[i].authorizer_user_name)
        }
      }
    }
  }
}

const actions = {
  // async 相当于 隐式的promise
  async loadInitData ({ commit, state }, opts) {
    try {
      let initData = state.initData
      if (!initData) {
        initData = await getSystemConf({}, { onlyData: 1 }).catch(({ msg = '' }) => { throw Error(msg || '获取全局配置失败') })
      }
      commit('SET_INIT_DATA', initData)
      return initData
    } catch (e) {
      modal(e.message)
    } finally {

    }
  }
}

const getters = {
  initData: (state) => state.initData || Storage.get('initData')
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
