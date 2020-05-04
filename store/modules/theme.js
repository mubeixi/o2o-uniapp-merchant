import { modal } from '@/common/fun'

const colorGreen = '#26C78D'
const colorYellow = '#FFE300'

const getThemeData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('green')
    }, 1000)
  })
}

const state = {
  // 主题
  seletedTheme: 'yellow',
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
  SET_THEME (state, { themeName }) {
    state.seletedTheme = themeName
  }
}

const actions = {
  async refreshTheme ({ commit, state }, opts) {
    try {
      const themeName = await getThemeData().catch(({ msg = '' }) => {
        throw Error(msg || '加载主题失败')
      })
      commit('SET_THEME', { themeName })
    } catch (e) {
      modal(e.message)
    } finally {

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
