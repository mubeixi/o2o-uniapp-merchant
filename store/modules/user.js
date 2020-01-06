import {login as loginFn,get_user_info} from "../../common/fetch";

//这里的有默认信息，就不会出现空白的问题了
const getDefaultState = () => {
    return {
        User_NickName:'',
        User_No:'',
        User_Mobile:'',
        User_ID:''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_STATE: (state,userInfo) => {
        Object.assign(state, userInfo)
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.User_NickName = name
    },
    SET_AVATAR: (state, avatar) => {
        state.User_NickName = avatar
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            loginFn({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            get_user_info(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                commit('SET_STATE', data)

                const { name, User_HeadImg } = data

                commit('SET_NAME', name)
                commit('SET_AVATAR', User_HeadImg)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

