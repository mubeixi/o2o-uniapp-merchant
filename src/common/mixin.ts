// import {login,getUsersInfo} from "@/common/fetch";
import Cookies from 'js-cookie';
import { login, getUsersInfo } from '../api/user';
import { ss } from '@/common/tool/storage';
import { GetQueryByString } from '@/common/utils';
import { isDev } from './env';
import { fun } from './func';


/**
 * 很多接口都需要user_id,先全局mixin下
 */
export const doLoginMixin = {

  async created() {
    if (isDev && !Cookies.get('access_token')) {
      Cookies.set('Users_ID', 'wkbq6nc2kc');

      await login({ Account: 'admin', Password: '123456' }).then((res:any) => {
        // storage.set('Users_ID', res.data.Users_ID);
        // // storage.set('Users_Account', res.data.Users_Account)
        //
        // storage.set('Shop_Info', {
        //   ShopName: res.data.ShopName,
        //   ShopLogo: res.data.ShopLogo,
        //   description: res.data.description
        // })
        Cookies.set('Stores_Bind_User_ID', '48');// 为了区分其他的user_id，所以弄了这个代表店铺的user_id
        Cookies.set('Stores_ID', '10');
        Cookies.set('access_token', 'VdOlnsfMfWIJmqjBmO8qA8Z0VjCGPc3z');// 手动写hack
      }).catch();
    }

    if (!Cookies.get('Users_ID')) {
      fun.error({ msg: '需要登录' });
      // setTimeout(()=>{
      //   location.href = '/member/login.php';
      // },1000)
    }
  },

};

// export const ckeditorMixin = {
//
//   async created() {
//
//     window.vmobj = this
//
//   }
//
// }


export const tmplDiyMixin = {

  async created() {
    // 保存一下两个可能存在的参数
    console.log('设置Skin_ID和Home_ID');
    ss.set('Skin_ID', GetQueryByString(location.href, 'Skin_ID'), true);
    if (GetQueryByString(location.href, 'Skin_ID')) {

    }

    // 强制覆盖
    ss.set('Home_ID', GetQueryByString(location.href, 'Home_ID'), true);
    if (GetQueryByString(location.href, 'Home_ID')) {
    }


    // 走ss这样会每次重新打开页面，就会获取数据
    if (!ss.get('Shop_Info')) {
      await getUsersInfo({}, {}).then((res:any) => {
        ss.set('Shop_Info', {
          ShopName: res.data.ShopName,
          ShopLogo: res.data.ShopLogo,
          description: res.data.description,
          prod_total: res.data.prod_total,
          prod_isnew_total: res.data.prod_isnew_total,
        });
      }).catch();
    }

    // 先模拟登录一下
    // await login({Account: 'admin', Password: '123456'}).then(res => {
    //   // storage.set('Users_ID', res.data.Users_ID);
    //   // // storage.set('Users_Account', res.data.Users_Account)
    //   //
    //   // storage.set('Shop_Info', {
    //   //   ShopName: res.data.ShopName,
    //   //   ShopLogo: res.data.ShopLogo,
    //   //   description: res.data.description
    //   // })
    // }).catch()
    //
    // return;


    // if (storage.get('Users_ID') && storage.get('Users_Account')) return;

    // storage.set('Users_ID', Cookies.get('Users_ID'));
    // storage.set('Users_Account', Cookies.get('Users_Account'));
  },

};

export default {
  data(){
    return {}
  }
}
