import Vue from 'vue';
import _ from 'underscore';
import { fun } from './func';
import { staticUrl } from './env';

/**
 * 获取指定的样式值
 * @param el
 * @param name
 */
export const getStyle = function (el:any, name:string) {
  // @ts-ignore
  return window.getComputedStyle(el, null)[name];
};

/**
 * 给相对路径的图片加上前缀
 * @param url
 */
export const domain = (url:string, style = '') => {
  if (!url) return '';
  if (url.indexOf('http') == -1) return staticUrl + url;
  return url + style;
};

// export const sortBy = props => function (a, b) {
//   return a[props] - b[props];
// };
//
// export const notSortBy = props => function (a, b) {
//   return b[props] - a[props];
// };

/**
 *从指定字符串str中获取name=val的val值
 * 一般用于从location.href查找指定的参数
 * @param {*} str
 * @param {*} name
 */
export const GetQueryByString = (str:string, name:string) => {
  // 获取？号出现几次
  const tempArr = str.split('?');
  // console.log(tempArr)
  // //如果大于1
  if (tempArr.length - 1 > 1) {
    let rt = null;
    for (const i in tempArr) {
      const s = tempArr[i];
      const reg1 = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
      const r1 = s.match(reg1); // 匹配目标参数
      if (r1 != null) {
        rt = decodeURIComponent(r1[2]);// 一直覆盖，要最后的就行了
      }
    }

    return rt;
  }

  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
  if (!str.split('?')[1]) return null;
  const r = str.split('?')[1].match(reg); // 匹配目标参数
  // console.log(r)
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return ''; // 返回参数值
};

/**
 * 对象=>字符串=>对象
 * 一般用于console.log立即显示（有时候虽然在前面打印，但是会由于引用的问题，打印的不是即时结果)
 * 同时可以用于简单粗暴的避免引用传递的对象copy，但是注意这种写法只保留值，会丢失方法
 * @param obj
 */
export const objTranslate = (obj:any) => JSON.parse(JSON.stringify(obj));


/**
 * 限定覆盖指定的值
 * @param targetObj
 * @param tmplObj
 */
export const mergeObject = function (targetObj:object, tmplObj:object) {
  for (const key in tmplObj) {
    if (!tmplObj.hasOwnProperty(key)) continue;
    // 只覆盖着和么多
    if (['value', 'style', 'config'].indexOf(key) != -1) {
      // @ts-ignore
      Vue.set(targetObj, key, objTranslate(tmplObj[key]));
    }
  }
};

/**
 * 深拷贝，解决引用的问题。
 * @param currentObj
 * @param newObject
 * 不过很奇怪之前的人为什么要复制两遍
 */
export function deepCopy(currentObj:object, newObject:object) {
  mergeObject(currentObj, newObject);// 方法则是保留本地的新建实例  new Search()这样
  return currentObj;
}

/**
 * 混合样式
 * @param defaultStyle
 * @param style
 */
export function mixinStyle(defaultStyle:object, style:object) {
  if (!defaultStyle)defaultStyle = {};
  if (!style)style = {};

  const rt = objTranslate(defaultStyle);
  for (const i in style) {
    if (!style.hasOwnProperty(i)) continue;
    // @ts-ignore
    rt[i] = style[i];
  }
  return rt;
}


/**
 * 比较两个对象，并且将模板对象上的值覆盖目标对象
 * @param currentObj
 * @param newObject
 */
export function deepCopyStrict(currentObj:object, newObject:object) {
  addFun_base(currentObj, newObject);
  mergeDate_base(currentObj, newObject);
  return currentObj;
}

// 会修改原数据
function addFun_base(object:any, newobj:any) {
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] === 'object') {
      if (!newobj) continue;
      addFun_base(object[key], newobj[key]);
    } else if (typeof object[key] === 'function') {
      continue;
    } else {
      if (!newobj || !newobj[key]) continue;
      Vue.set(object, key, newobj[key]);
    }
  }
}

// 会修改原数据 浅拷贝对象。。
function mergeDate_base(current:any, newObj:any) {
  for (const key in newObj) {
    if (!newObj.hasOwnProperty(key)) continue;

    if (typeof newObj[key] === 'object') {
      if (!current[key]) {
        Vue.set(current, key, newObj[key]);
        continue;
      }
      mergeDate_base(current[key], newObj[key]);
    } else {
      if (!current) {
        current = newObj;
        continue;
      }
      if (!current[key]) {
        Vue.set(current, key, newObj[key]);
        continue;
      }
      Vue.set(current, key, newObj[key]);
    }
  }
}


/**
 * 去除数组中的相同元素
 * @param arr
 */
export const arrayUnique = (arr:any[]) => {
  const res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    const obj = arr[i];
    for (var j = 0, jlen = res.length; j < jlen; j++) {
      if (res[j] === obj) break;
    }
    if (jlen === j)res.push(obj);
  }
  return res;
};

/**
 * 请求数组拼接成字符串
 * 可以用在post请求转get,或者拼接url
 * @param obj
 */
export const serialize = (obj:any) => {
  const ary = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && (obj[p] || obj[p] == 0 || obj[p] == '')) {
      ary.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return ary.join('&');
};

/**
 * 多维数组的笛卡尔乘积
 * @param array
 */
export const calcDescartes = (array:any[]) => {
  // console.log(array)
  if (array.length < 1) return [];
  if (array.length < 2) {
    // if(array[0].length) return []
    return [array[0]];
  }
  // @ts-ignore
  return [].reduce.call(array, (col:any[], set:any[], currentIndex) => {
    const res:any[] = [];
    col.forEach((c:any) => {
      set.forEach((s:any) => {
        const concatVal:any = Array.isArray(c) ? c : [c];
        const t = [].concat(concatVal);
        // @ts-ignore
        t.push(s);
        res.push(t);
      });
    });
    console.log(res);
    return res;
  });
};

/**
 * 从元素是对象的一维数组中，获取指定的键名对应的值组成的简单值一维数组
 * arr = [{name:'wwww',age:2332,'city':'shanghai'},{name:'wwww2',age:2332,'city':'shanghai'}，{name:'wwww3',age:2332,'city':'shanghai'}]
 * get_arr_column(arr,'name')
 * ====>['wwww'，'wwww2'，'wwww3']
 * @param arr
 * @param column
 */
export const get_arr_column = (arr:any[], column:string) => {
  if (!_.isArray(arr)) {
    throw new Error('数据必传');
  }
  if (typeof column !== 'string') {
    throw new Error('键名为字符串');
  }
  if (!column) {
    throw new Error('键名必传');
  }
  const rt = [];
  for (const k in arr) {
    if (typeof arr[k] !== 'object') {
      throw new Error('获取的数值为简单值');
    }
    rt.push(arr[k][column]);
  }
  return rt;
};

/**
 * 指定key，铺平二维数组，一般用于将树状的菜单、分类（数据结构一致，但是利用child这种来标识上下级)
 * 使平铺城1维数组
 */

export const plainArray = (arr:any[], key:string, newArr:any[]) => {
  if (!arr || !key) return false;

  for (const item of arr) {
    const tempObj = objTranslate(item);
    if (tempObj.hasOwnProperty(key)) {
      tempObj[key] = null;
    }
    newArr.push(tempObj);

    if (item && item[key] && _.isArray(item[key])) {
      plainArray(item[key], key, newArr);
    }
  }
};

/**
 *
 * @param arr
 * @param key
 * @param newArr pid标识
 * @param field
 */
// export const buildArrayTree = (arr,key,newArr,field)=>{
//
//   if(!arr || !key)return false;
//
//   for(var item of arr){
//     if(item && item[key] && _.isArray(item[key])){
//       plainArray(item[key],key,newArr);
//       continue;
//     }
//     newArr.push(item)
//   }
//
// }


/**
 * 获取二维数组（一维数组的元素也是数组)的指定位置开始到最后的长度叠加成绩
 * @param arr
 * @param startIdx
 */
export const getArrayMulite = (arr:any[], startIdx:number) => {
  let rt = 1;

  for (let i = startIdx + 1; i < arr.length; i++) {
    rt *= arr[i].length;
  }

  // console.log(rt)
  return rt;
};

/**
 * 批量创建数组
 */
export const createTmplArray = (item:any, len:number) => {
  const rt = [];
  for (let i = 0; i < len; i++) {
    rt.push(objTranslate(item));
  }
  return rt;
};


/**
 * 从指定的数组(对象组成的数组)，根据键值和值找到下标
 * @param arr
 * @param key
 * @param val
 * @param full 是否返回值和下标，默认只返回下标
 */
export const findArrayIdx = (arr:any[], key_val_arr:object, full:boolean = false) => {
  for (const i in arr) {
    if (typeof arr[i] !== 'object') continue;

    // 用来比较对象
    if (compare_obj(key_val_arr, arr[i])) {
      if (!full) return i;
      return { val: arr[i], idx: i };
    }
  }
  return false;
};


/**
 * 数组排序（值为number型）
 * arr 需要排序的数组
 * order_by   desc: 降续排列  asc: 升续排列
 * 默认为asc
 */
export const numberSort = function (arr:any[], order_by:string) {
  if (typeof order_by !== 'undefined' && order_by == 'desc') { // desc
    return arr.sort((v1, v2) => v2 - v1);
  } // asc
  return arr.sort((v1, v2) => v1 - v2);
};


/**
 * 查看对象1中的所有属性在obj2中都有
 * @param obj1
 * @param obj2
 */
export const compare_obj = (obj1:object, obj2:object) => {
  for (const i in obj1) {
    if (!obj1.hasOwnProperty(i)) continue;
    // @ts-ignore
    if (!obj2.hasOwnProperty(i) || obj1[i] != obj2[i]) {
      return false;
    }
  }
  return true;
};


// ------------ 收货地址函数 -------------
// 数组转化
export const array_change = function (arr:any[]) {
  const array = [];
  // console.log('utls')
  // console.log(arr)
  for (const i in arr) {
    array.push({ id: i, name: arr[i] });
  }
  return array;
};

// 获取数组下标  用于收货地址选择的显示
export const get_arr_index = function (arr:any[], id:number|string) {
  for (const i in arr) {
    if (arr[i].id == id) {
      return i;
    }
  }
};

export const emptyObject = (obj:object, strice:boolean) => {
  for (const prop in obj) {
    // @ts-ignore
    if (obj[prop] === '' || obj[prop] === undefined || obj[prop] === null || obj[prop] === 'null' || obj[prop] === 'undefined') {
      if (strice) {
        fun.error({ msg: `参数${prop}不能为空` });
        console.log(`参数${prop}不能为空`);
        return false;
      }
      // @ts-ignore
      delete obj[prop];
    }
  }
  return obj;
};

/**
 * 判断某个值是否为非
 * @param val
 */
export const emptyValue = (val:any) => {
  if (val === '' || val === undefined || val === null || val === 'null' || val === 'undefined') {
    return true;
  }

  return false;
};

/**
 * 兼容原来的kindeditor文档
 */
export const formatRichTextByKindEditor = (html:string) => {
  if (!html) return;

  const newContent = html.replace(/<embed[^>]*>/gi, (match, capture) => {
    match = match.replace(/embed/gi, 'oembed');
    match = match.replace(/src/gi, 'url');

    // 闭合标签
    match = match.replace(/\/>/gi, '></oembed>');
    return match;
  });

  return newContent;
};

export function trim(str:string) {
  return str ? str.replace(/^\s*|\s*$/g, '') : '';
}
