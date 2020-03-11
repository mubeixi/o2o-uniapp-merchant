const state = {
  menuFirstIndex:0,
  menuSecondIndex:0,
  menuThirdIndex:0,
  menuThirdList:[]
};

const mutations = {
  menuIndex:(state:any, value:{name:string,idx:number}) => {
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

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
