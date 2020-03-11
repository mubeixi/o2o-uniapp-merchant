import menuConf from '../../router/menuConf';
const state = {
  menuFirstIndex:0,
  menuSecondIndex:0,
  menuThirdIndex:0
};

const mutations = {
  menuIndex:(state:any, value:{name:string,idx:number}) => {
    console.log(value)
    state[value.name] = value.idx;
  },
  tabData:(state: { menuThirdList: any; },list: any) =>{
    state.menuThirdList = list
  }
};


const actions = {
  // @ts-ignore
  setMenuActiveIndex:({ commit }, data) => {
    commit('menuIndex', data);
  },
  // @ts-ignore
  setThirdMenuData:({ commit }, data) => {
    commit('tabData', data);
  }
};

const getters  = {
  menuThirdList(state, getters, rootState){

    try {
      // @ts-ignore
      return menuConf[0].children[state.menuFirstIndex].children[state.menuSecondIndex].children
    }catch (e) {
      return []
    }
  },
  menuFirstData(state:any){
    // @ts-ignore
    return menuConf[0].children;
  },
  menuSecondData(state:any){
    try {
      // @ts-ignore
      return menuConf[0].children[state.menuFirstIndex].children;
    }catch (e) {
      return []
    }

  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
