// @ts-ignore
export const setActiveAttr = ({ commit }, data) => {
  // 这里除了修改之外，还需要去修改templDate的对应数据
  console.log('activeAttr data is change', data);
  commit('activeAttr', data);
};
// @ts-ignore
export const setTemplateEditIndex = ({ commit }, data) => {
  commit('templateEditIndex', data);
};
// @ts-ignore
export const setInitData = ({ commit }, data) => {
  commit('SET_INIT_DATA', data);
};

// @ts-ignore
export const setTmplData = ({ commit }, data) => {
  commit('tmplData', data);
};
// @ts-ignore
export const setEditStatus = ({ commit }, data) => {
  commit('editStatus', data);
};


// @ts-ignore
export const setComponentTitle = ({ commit }, data) => {
  commit('componentTitle', data);
};
// @ts-ignore
export const setMode = ({ commit }, data) => {
  commit('mode', data);
};
// @ts-ignore
export const setSystem = ({ commit }, data) => {
  commit('system', data);
};
