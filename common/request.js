import * as ENV from './env.js';
import {ls} from "./helper.js";

import {hexMD5} from "./tool/md5";
import Base64 from './tool/base64.js'
import {isWeiXin} from "./helper";
import {error} from "./init/fun";

export const GET_ENV = () => {
    // #ifdef APP-PLUS
    return 'app'
    // #endif
    // #ifdef MP-WEIXIN
    return 'wx_lp'
    // #endif
    // #ifdef MP-TOUTIAO
    return 'tt_lp'
    // #endif
    // #ifdef MP-ALIPAY
    return 'ali_lp'
    // #endif
    // #ifdef H5
    //需要考虑是不是普通浏览器
    if (isWeiXin()) {
        return 'wx_mp'
    } else {
        return 'wap'
    }
    // #endif
}
export const GET_ACCESS_TOKEN = () => ls.get('access_token')

/**
 *
 * @param url
 * @param method
 * @param data
 * @param options
 * @return {Promise<unknown>}
 */
import store from '../store'

export const ajax = (url, method, data, options) => {

    if (!options) options = {}
    if (!data) data = {}


    let {tip = '', mask = false, timelen = 2000, timeout = 2000, errtip = true} = options;

    if (tip) {
        uni.showLoading({
            title: tip,
            mask: mask
        })
    }

    let token
    var header = {

        'Authorization': 'Bearer ' + token,
        "content-type": "application/x-www-form-urlencoded"
    };

    // #ifdef MP-TOUTIAO || APP-PLUS
    // console.log(data)
    // #endif

    let URL = ''
    // #ifdef H5
    URL = url; //直接用绝对目录,这样就可以随便部署在任意域名下,会默认读取host/api/xxx接口
    // #endif

    // #ifndef H5
    URL = ENV.apiBaseUrl + url;
    // #endif


    const hookErrorCode = [0, 88001, 66001];

    return new Promise((resolve, reject) => {

        uni.request({
            header,
            url: URL,
            method,
            data,
            success: (ret) => {

                if (ret.statusCode !== 200 || typeof ret.data != 'object') {
                    error('服务器去旅行了')
                }
                let res = ret.data;

                // #ifdef MP-TOUTIAO || APP-PLUS
                // console.log(res)
                // #endif

                if (res.hasOwnProperty('errorCode') && hookErrorCode.indexOf(res.errorCode) != -1) {
                    if (res.errorCode === 66001) {
                        error(res.msg)

                        //重置用户信息

                        let users_id = ls.get('users_id');
                        ls.clear();
                        ls.set('users_id', users_id);
                        // #ifdef H5
                        sessionStorage.removeItem('is_send_usrlog')
                        // #endif
                        store.dispatch('user/SET_STATE', {})
                        store.dispatch('settings/SET_STORES_ID', null)

                        setTimeout(() => {
                            uni.navigateTo({
                                url: '/pages/login/login'
                            })
                        }, 1000)
                        return;
                    }
                    resolve(res)
                } else {
                    if (res.hasOwnProperty('errorCode') && res.msg) {
                        if (errtip) error(res.msg)
                    } else {
                        error('请求未成功')
                    }

                    reject(res)
                }


            },
            fail: (e) => {
                reject(e)
            },
            complete: () => {
                // console.log(res)
                if (tip) {
                    setTimeout(function () {
                        uni.hideLoading()
                    }, 500)

                }


            }
        })

    })

}

export const post = (url, data, options) => {
    return ajax(url, 'post', data, options)
}


export const get = (url, data, options) => {
    return ajax(url, 'get', data, options)
}


function get_Appid() {
    return 'xhh';
}

export const get_Users_ID = () => ls.get('users_id');

export const get_User_ID = () => ls.get('user_id') ? ls.get('user_id') : 'null';

export const createToken = function (object) {
    object = ObjectToArr(object);
    var signString = ObjectToString(object);
    signString = signString.slice(0, -1);
    var timestamp = parseInt(new Date().getTime() / 1000).toString();
    var key = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';
    var dataStr = signString + key + timestamp;
    // console.log(Base64)
    var sign = hexMD5(Base64.toBase64(dataStr)).toUpperCase();
    object['timestamp'] = timestamp;
    object['sign'] = sign;
    object['sortToken'] = 1;
    return object;
}

//对象转数组，并排序
function ObjectToArr(object, addkey) {
    addkey = addkey || '';
    var arrs = {};
    for (var i in object) {
        var newkey = addkey + (addkey === '' ? i : '[' + i + ']');
        if (typeof object[i] !== 'object') {
            if (object[i] !== '') {
                if (i !== 'timestamp' && i !== 'sign' && i !== 'sortToken') {
                    arrs[newkey] = object[i];
                }
            }
        } else {
            ObjectToArr(object[i], newkey);
        }
    }
    var newkey_1 = Object.keys(arrs).sort();
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对

    // 此处不能使用for..in
    newkey_1.forEach(function (val) {
        newObj[val] = arrs[val];//向新创建的对象中按照排好的顺序依次增加键值对
    });
    return newObj;
}

//对象转字符串
function ObjectToString(object, arrs) {
    arrs = arrs || '';
    for (var i in object) {
        if (typeof object[i] !== 'object') {
            if (object[i] !== '') {
                if (i !== 'timestamp' && i !== 'sign') {
                    arrs += object[i] + ',';
                }
            }
        } else {
            arrs += this.ObjectToString(object[i], arrs);
        }
    }
    return arrs;
}

const fetch = function (act, param, options = false, url = '/api/little_program/shopconfig.php', method = 'post') {

    if (!act) {
        uni.showToast({
            title: 'act参数必传',
            mask: true,
            duration: 2000
        });
        return;
    }
    ;
    const d = new Date();

    if (options.hasOwnProperty('is_tap') && options.is_tap) {

        let temp_act_info = ls.get('temp_act_info')
        if (temp_act_info && temp_act_info.hasOwnProperty('act') && temp_act_info.hasOwnProperty('time') && temp_act_info.act && temp_act_info.time) {
            //同一个请求，不能在0.5s内连点两次

            console.log(temp_act_info.time + 500 - d.getTime())
            if (act == temp_act_info.act && d.getTime() < (temp_act_info.time + 500)) {
                error('请求过快')
                return new Promise((resolve, reject) => {
                    reject(false)
                })
            }
        }
    }

    ls.set('temp_act_info', {act, time: d.getTime()})

    if (!param) param = {}

    param.act = act;
    param.User_ID = get_User_ID();

    if (!param.hasOwnProperty('access_token')) {
        param.access_token = GET_ACCESS_TOKEN()
    }

    if (options && options.noUid) delete param.User_ID

    param.Users_ID = get_Users_ID();   //Users_ID  写死
    // param.appid = get_Appid();
    param.env = GET_ENV();
    // param.User_ID = 3;
    // param.Users_ID = 'wkbq6nc2kc';

    // 数据加密
    let data = createToken(param);

    return ajax(url, method, data, options);

};



export default fetch
