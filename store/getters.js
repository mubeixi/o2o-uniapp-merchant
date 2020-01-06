
// import {ls} from "../common/tool";
//
// export const Stores_ID = function (state, value) {
//     if(!state.Stores_ID){
//         if(ls.get('Stores_ID'))return ls.get('Stores_ID')
//         //error('用户信息为空')
//         return null;
//     }
//     return state.Stores_ID;
// };
//
// export const userInfo = function (state, value) {
//     if(!state.userInfo){
//         if(ls.get('userInfo'))return ls.get('userInfo')
//         //error('用户信息为空')
//         return {};
//     }
//     return state.userInfo;
// };
//
// export const initData = function (state, value) {
//     if(!state.initData){
//         if(ls.get('initData'))return ls.get('initData')
//         return {};
//     }
//     return state.initData;
// };

const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    userInfo:state => state.user,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    initData:state => state.settings.initData,
}
export default getters
