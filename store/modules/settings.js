import {get_user_info, getSystemConf} from "../../common/fetch";

const state = {
    initData:{},
    STORES_ID:''

}

const mutations = {
    SET_STORES_ID:(state,STORES_ID)=>{
        state.STORES_ID = STORES_ID
    },
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    loadInitData({ commit}){
        return new Promise((resolve, reject) => {
            getSystemConf().then(response => {
                const { data } = response
                if (!data) {
                    reject('加载配置失败.')
                }
                //console.log(data)
                commit('CHANGE_SETTING', {initData:data})
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

