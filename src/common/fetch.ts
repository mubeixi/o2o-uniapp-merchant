import Vue from 'vue';
import {baseApiUrl} from './env';
import {hexMD5} from "@/common/tool/md5";
import {Loading} from "element-ui";
import {ls} from "@/common/tool/ls";
import qs from 'qs'

import Cookie from 'js-cookie';

import './tool/base64'

import request from './request'


export const GET_ACCESS_TOKEN = ()=>Cookie.get('access_token');
export const get_User_ID = () => Cookie.get('Stores_Bind_User_ID');
export const get_Users_ID = () => Cookie.get('Users_ID');
export const get_Stores_ID = () => Cookie.get('Stores_ID');

//对象转数组，并排序
function ObjectToArr(object, addkey='') {

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
function ObjectToString(object, arrs='') {
  for (var i in object) {

    if (typeof object[i] !== 'object') {
      if (object[i] !== '') {
        if (i !== 'timestamp' && i !== 'sign') {
          arrs += object[i] + ',';
        }
      }
    } else {
      arrs += ObjectToString(object[i], arrs);
    }
  }
  return arrs;
}

export const createToken = function (object) {
  object = ObjectToArr(object);
  var signString = ObjectToString(object);
  signString = signString.slice(0, -1);
  var timestamp = parseInt(new Date().getTime() / 1000).toString();
  var key = '458f_$#@$*!fdjisdJDFHUk4%%653154%^@#(FSD#$@0-T';
  var dataStr = signString + key + timestamp;
  // console.log(dataStr)
  var sign = hexMD5(window.Base64.toBase64(dataStr)).toUpperCase();
  object['timestamp'] = timestamp;
  object['sign'] = sign;
  object['sortToken'] = 1;
  return object;
}


export const fetch = function (act: string, param: object = {}, options = {}, url: string = '/api/little_program/shopconfig.php', method: string = 'post') {

  // @ts-ignore
  param.act = act;
  // @ts-ignore
  param.env = 'system';

  if(!param.hasOwnProperty('access_token')){
    // @ts-ignore
    param.access_token = GET_ACCESS_TOKEN()
  }

  // @ts-ignore
  if(!param.Users_ID){
    // @ts-ignore
    param.Users_ID = get_Users_ID();
  }
  // @ts-ignore
  if(!param.hasOwnProperty('User_ID')){
    // @ts-ignore
    param.User_ID = get_User_ID();
  }
  // @ts-ignore
  if(!param.hasOwnProperty('store_id')){
    // @ts-ignore
    param.store_id = get_Stores_ID();
  }

  // 数据加密
  let data = createToken(param);

  url = (process.env.NODE_ENV === 'production' ? baseApiUrl : '') + url;

  return new Promise(((resolve, reject) => {

    request[method](url,qs.stringify(data),options).then(res=>{
      resolve(res)
      // if(res.data.errorCode === 0){
      //   resolve(res.data)
      // }else{
      //   reject(new Error(res))
      // }
    },error=>{
      reject(error)
    })

  }));

};

