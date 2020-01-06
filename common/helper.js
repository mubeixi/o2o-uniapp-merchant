import {error, toast} from "./index";
import {apiBaseUrl} from './env.js';
import store from "../store";

export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 *
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str, name) => {

    //获取？号出现几次
    var tempArr = str.split('?');
    // console.log(tempArr)
    // //如果大于1
    if (tempArr.length - 1 > 1) {
        var rt = null;
        for (var i in tempArr) {
            var s = tempArr[i]
            var reg1 = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r1 = s.match(reg1); //匹配目标参数
            if (r1 != null) {
                rt = decodeURIComponent(r1[2]);//一直覆盖，要最后的就行了
            }
        }

        return rt
    }

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    if (!str.split("?")[1]) return null;
    var r = str.split("?")[1].match(reg); //匹配目标参数
    // console.log(r)
    if (r != null) {
        return decodeURIComponent(r[2]);

    }
    return null; //返回参数值

}

export const ls = {
    set(key, val, cover) {

        if (!cover && !val && (val != 0 || val != false)) return false;

        return uni.setStorageSync(key, val)
    },

    get(key) {
        var val = uni.getStorageSync(key);
        return val;
        // if(!val) return '';
        // try{
        //   return JSON.parse(val)
        // }catch (e) {
        //   return '';
        // }

    },
    remove(key) {
        return uni.removeStorageSync(key)
    },
    clear() {
        return uni.clearStorageSync()
    }
};

export const goBack = function () {
    uni.navigateBack({
        delta: 1
    });
}

/**
 * 数组排序（值为number型）
 * arr 需要排序的数组
 * order_by   desc: 降续排列  asc: 升续排列
 * 默认为asc
 */
export const numberSort = function (arr, order_by) {
    if (typeof order_by != 'undefined' && order_by == 'desc') { //desc
        return arr.sort(function (v1, v2) {
            return v2 - v1;
        });
    } else {  //asc
        return arr.sort(function (v1, v2) {
            return v1 - v2;
        });
    }
}


// 会修改模板对象，将他没有的属性加上
function addFun(object, newobj) {
    for (const key in object) {
        if (!object.hasOwnProperty(key)) continue;

        if (typeof object[key] === 'object') {
            if (!newobj) continue;
            addFun(object[key], newobj[key]);
        } else if (typeof object[key] === 'function') {
            continue;
        } else {

            if (!newobj || !newobj[key]) continue;
            object[key] = newobj[key]
        }
    }
}


export function deepCopyStrict(currentObj, newObject) {
    addFun(currentObj, newObject);
    return currentObj;
}


export const arrayUnique = (arr) => {
    var res = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        for (var j = 0, jlen = res.length; j < jlen; j++) {
            if (res[j] === obj) break;
        }
        if (jlen === j) res.push(obj);
    }
    return res;
}

/**
 * 对象=>字符串=>对象
 * 一般用于console.log立即显示（有时候虽然在前面打印，但是会由于引用的问题，打印的不是即时结果)
 * 同时可以用于简单粗暴的避免引用传递的对象copy，但是注意这种写法只保留值，会丢失方法
 * @param obj
 */
export const objTranslate = obj => JSON.parse(JSON.stringify(obj))

export function mixinStyle(defaultStyle, style) {


    if (!defaultStyle) defaultStyle = {};
    if (!style) style = {};

    let rt = objTranslate(defaultStyle)
    // console.log(rt)
    for (var i in style) {
        if (!style.hasOwnProperty(i)) continue;
        rt[i] = style[i]

    }

    return rt;
}

export function isWeiXin() {
    // #ifdef H5
    var ua = window.navigator.userAgent.toLowerCase();
    if (
        ua.match(/MicroMessenger/i) == 'micromessenger'
        && ua.match(/miniProgram/i)
        && ua.match(/miniProgram/i)[0] == 'miniprogram'
    ) {
        return 'xcx'
    }
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
    // #endif
    // #ifndef H5
    return false
    // #endif

}

export const chooseImageByPromise = ({count = 1, sizeType = ['original', 'compressed']}) => {
    return new Promise((resolve, reject) => {

        uni.chooseImage({
            count,
            // #ifndef MP-TOUTIAO
            sizeType, //可以指定是原图还是压缩图，默认二者都有
            // #endif
            success(res) {
                resolve(res.tempFiles)
            },
            fail(e) {
                reject(false)
            }
        })

    })
}


/**
 * 头条上传图片
 * @param fileData
 * @return {Promise<unknown>}
 */
export const uploadByPromiseForBase64 = ({fileData})=>{
    return new Promise((resolve, reject) => {
        uploadImage({'image':fileData}).then(result=>{
            resolve(result.data.path)
        }).catch(e=>{
            resolve(false)
            // let msg=JSON.parse(res.data);
            toast('文件上传失败')
        })
    })
}
/**
 * 通用图片上传
 * @param url
 * @param filePath
 * @param name
 * @param formData
 * @return {Promise<unknown>}
 */
export const uploadByPromise = ({url, filePath, name = 'image', formData}) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url,
            filePath,
            name,
            formData,
            success: (res) => {

                let {data = {}} = res
                if (typeof data === 'string' && data) {
                    let body = JSON.parse(data)

                    data = body.data
                }
                if (data.path) {
                    resolve(data.path)
                } else {
                    resolve(false)

                    // let msg=JSON.parse(res.data);
                    toast('文件上传失败')
                }

            },
            fail: (err) => {
                reject(false)
            },
            complete: (rt) => {
                console.log(rt)
            }
        })
    })
}


/**
 * 批量上传图片
 * @param formData
 * @param imgs
 * @return {Promise<unknown>}
 */
export const uploadImages = (formData, imgs) => {

    let taskList = []
    for (let i = 0; i < imgs.length; i++) {

        let taskItem = null

        //头条需要转base64
        // #ifdef MP-TOUTIAO
        let fileCTX = tt.getFileSystemManager()
        fileCTX.readFile({
        	filePath:imgs[i],
        	encoding:'base64',
        	success(ret) {
        		let imgs='data:image/jpeg;base64,'+ret.data;
                taskItem = uploadByPromiseForBase64({fileData:imgs})
        	},
        	fail(ret) {
        	  console.log('头条读取文件失败');
        	}
        })
        // #endif

        // #ifndef MP-TOUTIAO
        taskItem = uploadByPromise({
            url: apiBaseUrl + '/api/little_program/shopconfig.php',
            filePath: imgs[i],
            name: 'image',
            formData: formData
        })

        // #endif

        taskList.push(taskItem)
    }

    return new Promise((resolve, reject) => {
        Promise.all(taskList).then((urls) => {
            console.log(urls)
            resolve(urls)
        }).catch((error) => {
            reject(false)
            console.log(error)
        })
    })

}

export const urlencode = (str) => {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

//构造分享事件
/**
 *
 * @param path 这个里面无需传owenr_id和users_id
 * @return {string}
 */
export const buildSharePath = (path) => {

    let users_ID = ls.get('users_id');
    let userInfo = store.state.userInfo || ls.get('userInfo');
    const User_ID = ls.get('user_id')


    console.log(User_ID,userInfo,users_ID)
    let search = '';

    if (path.indexOf('users_id') === -1) {
        search += (users_ID ? ('users_id=' + users_ID) : '')
    }


    if (path.indexOf('owner_id') === -1) {

        let owner_id = 0;
        if (userInfo.User_ID && userInfo.Is_Distribute === 1) {
            owner_id = userInfo.User_ID
        }
        search += ('&owner_id=' + owner_id)
    }


    let ret = ''
    if (path.indexOf('?') != -1) {
        ret = path + (search ? '&' : '') + search
    } else {
        ret = path + (search ? '?' : '') + search
    }


    console.log(ret)
    if (ret.indexOf('users_id') === -1) {
        error('组建分享参数失败');
        throw "必须有users_id"
    }

    return ret
}



/**
 *pintuan_start_time
 * @param current 开始的时间，如果不传入，则用现在的时间
 * @param end_timeStamp
 */
export const getGroupCountdown = ({end_timeStamp = 1571221631, current = (new Date()).getTime()} = {}) => {

    let {d = 0, h = 0, m = 0, s = 0} = {};
    //时间戳格式转换
    current = parseInt(current / 1000)

    // console.log(end_timeStamp,current)
    let countTime = end_timeStamp - current
    if (countTime < 0) {
        console.log('已经结束')
        return false
    }
    ;

    d = parseInt(countTime / (60 * 60 * 24))
    h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))
    m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
    s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

    return {d, h, m, s}

}


export const getCountdownFunc = ({start_timeStamp, end_timeStamp, current = (new Date()).getTime()} = {}) => {

    let {d = 0, h = 0, m = 0, s = 0} = {};

    //时间戳格式转换
    current = parseInt(current / 1000)

    // console.log(end_timeStamp,current)
    let countTime = 0, is_start = false,is_end=false;


    //还没开始
    if (start_timeStamp > current && end_timeStamp > current) {
        //console.log('还没开始')
        countTime = start_timeStamp - current;

    } else if (end_timeStamp > current && start_timeStamp < current) {
        //还在进行中
        //console.log('还在进行中')
        is_start = true;
        countTime = end_timeStamp - current;
    } else {
        is_end = true
        //console.warn('活动信息无效');
        // throw "活动信息无效";
    }

    d = parseInt(countTime / (60 * 60 * 24))
    h = parseInt((countTime - d * 60 * 60 * 24) / (60 * 60))
    m = parseInt((countTime - d * 60 * 60 * 24 - h * 60 * 60) / 60)
    s = countTime - d * 60 * 60 * 24 - h * 60 * 60 - m * 60

    return {d, h, m, s, is_start,is_end}
}




/**
 * 查看对象1中的所有属性在obj2中都有
 * @param obj1
 * @param obj2
 */
export const compare_obj = (obj1, obj2) => {
    for (var i in obj1) {
        if (!obj1.hasOwnProperty(i)) continue;
        if (!obj2.hasOwnProperty(i) || obj1[i] != obj2[i]) {
            return false
        }
    }
    return true

}

/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param arr
 * @param key
 * @param val
 * @param full 是否返回值和下标，默认只返回下标
 */
export const findArrayIdx = (arr, key_val_arr, full) => {

    for (var i in arr) {
        if (typeof arr[i] != 'object') continue
        //用来比较对象
        if (compare_obj(key_val_arr, arr[i])) {
            if (!full) return parseInt(i);
            return {val: arr[i], idx: parseInt(i)}
        }

    }
    return false
}

export const emptyObject = (obj, strice,tip) => {
    for (var prop in obj) {
        if (obj[prop] === '' || obj[prop] === undefined || obj[prop] === null || obj[prop] === 'null' || obj[prop] === 'undefined') {
            if (strice) {
                tip && error('参数' + prop + '不能为空');
                console.log('参数' + prop + '不能为空');
                return false;
            }
            delete obj[prop];
        }
    }
    return obj;
};

/**
 * 批量创建数组
 */
export const createTmplArray = (item, len) => {
    let rt = []
    for (var i = 0; i < len; i++) {
        rt.push(objTranslate(item))
    }
    return rt
}


//时间戳转换为日期
export function date_format(Timestamp, Spacer, time) {
    let date = new Date(Timestamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    Spacer = Spacer ? Spacer : '-';

    if (time && time == 1) {
        let h = date.getHours();
        let min = date.getMinutes();
        let s = date.getSeconds();
        return y + Spacer + m + Spacer + d + ' ' + h + ':' + min + ':' + s;
    } else {
        return y + Spacer + m + Spacer + d;
    }
}

/**
 * 格式化时间
 */
export function format_time(format_str, mtime) {
    if (!mtime) {
        var mtime = new Date();
    } else {
        var mtime = new Date(parseInt(mtime) * 1000);
    }
    var timeObject = {
        "M+": mtime.getMonth() + 1,                   //月份
        "d+": mtime.getDate(),                        //日
        "h+": mtime.getHours(),                       //小时
        "m+": mtime.getMinutes() < 10 ? '0' + mtime.getMinutes() : mtime.getMinutes(),                     //分
        "s+": mtime.getSeconds() < 10 ? '0' + mtime.getSeconds() : mtime.getSeconds(),                     //秒
        "q+": Math.floor((mtime.getMonth() + 3) / 3), //季度
        "S": mtime.getMilliseconds()                  //毫秒
    };
    if (/(y+)/.test(format_str)) {
        format_str = format_str.replace(RegExp.$1, (mtime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in timeObject) {
        if (new RegExp("(" + k + ")").test(format_str)) {
            format_str = format_str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeObject[k]) : (("00" + timeObject[k]).substr(("" + timeObject[k]).length)));
        }
    }
    return format_str;
}


//创建随机字符串
export function makeRandStr(len=30) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



//验证手机号码
export function check_mobile(mobile) {
    if (!(/^1[3-9]\d{9}$/.test(mobile))) {
        return false;
    } else {
        return true;
    }
}

//验证金额格式
export function check_money(money) {
    if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(String(money)))) {
        return false;
    } else {
        return true;
    }
}

//验证人名
export function check_name(name) {
    /**
     *  可验证少数民族 /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
     */
    if (!(/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,10}$/.test(name))) {
        return false;
    } else {
        return true;
    }
}

/**
 * 格式化金额
 */
export function format_money(money, len = 2) {
    money = parseFloat(money);
    if (!money) {
        return false;
    }
    var len_str = '1';
    for (var i = 0; i < len; i++) {
        len_str = len_str + '0';
    }
    var len_num = parseInt(len_str);
    return parseInt(money * len_num) / len_num;
}

/**
 * 格式化金额 小数部分补足2位
 * mtype = 0 整体返回，保留两位小数
 * mtype = 1 只返回整数部分
 * mtype = 2 只返回小数部分，保留两位小数
 * 注意小数部分最多两位
 */
export function format_money_string(money, mtype = 0) {
    money = Math.round(money * 100) / 100;
    var strs = [];
    strs = String(money).split('.');
    var length = strs.length;
    var str = '';
    if (mtype == 1) {
        str = strs[0];
    } else if (mtype == 2) {
        if (length > 1) {
            switch (strs[1].length) {
                case 1:
                    str = strs[1] + '0';
                    break;
                case 2:
                    str = strs[1];
                    break;
                default:
                    str = String(Math.round(strs[1] / 100)).substring(0, 2);
            }
        } else {
            str = '00';
        }
    } else {
        str = strs[0] + '.' + format_money_string(money, 2);
    }
    return str;
}

//输入金额时时验证
export function check_money_in(money) {
    if (!(/(^[1-9]([0-9]+)?(\.[0-9]{0,2})?$)|(^(0){1}$)|(^[0-9]\.([0-9]){0,2}?$)/.test(money))) {
        console.log('false')
        return false;
    } else {
        console.log('true')
        return true;
    }
}
