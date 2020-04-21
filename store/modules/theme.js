import { hideLoading, modal, showLoading } from '@/common/fun'

const colorGreen = '#26C78D'
const colorYellow = '#FFE300'

const getThemeData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('yellow')
    }, 1000)
  })
}

const state = {
  // 主题
  seletedTheme: 'green',
  themeList: {
    green: {
      name: 'green',
      primaryColor: colorGreen
    },
    yellow: {
      name: 'yellow',
      primaryColor: colorYellow
    }
  }
}

const mutations = {
  setTheme (state, { themeName }) {
    state.seletedTheme = themeName
  }
}

const actions = {
  async refreshTheme ({ commit, state }, opts) {
    try {
      showLoading('加载主题')
      const themeName = await getThemeData().catch(({ msg = '' }) => {
        throw Error(msg || '加载主题失败')
      })
      commit('setTheme', { themeName })
    } catch (e) {
      modal(e.message)
    } finally {
      hideLoading()
    }
  }
}

const getters = {
  pimaryColor (state) {
    try {
      return state.themeList[state.seletedTheme].primaryColor
    } catch (e) {
      return colorGreen
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