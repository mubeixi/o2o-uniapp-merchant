import store from "../../store";
import {ls} from "../helper";

/**
 * 成功提示
 * @param title
 * @param icon
 * @param image
 * @param duration
 */
export const toast = (title, icon, image, duration) => {
    uni.showToast({
        title,
        duration: duration || 2000,
        icon,
        image
    })
}

/**
 * 根据长度会自动切换模式，优先保障显示所有文字
 * @param title
 * @param icon
 * @param duration
 */
export const error = (title, icon, duration) => {
    if (!title) return;
    if (title.length > 6) {
        //显示所有的问题
        toast(title, 'none', '', duration)
    } else {
        toast(title, 'none', '/static/icon_http_error.png', duration)
    }

}

/**
 * 操作确认
 * @param options
 * @return {Promise<unknown>}
 */
export const confirm = (options) => {

    return new Promise(function (resolve, reject) {

        uni.showModal({
            ...options,
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击111');
                    resolve(res)
                } else if (res.cancel) {
                    console.log('用户点击取消');
                    reject(res)
                }
            },
            fail: function (res) {
                reject(res)
            }
        });

    })
}

/**
 * 检测是否登录
 * @param redirect
 * @return {boolean}
 */
export const checkIsLogin = (redirect, tip) => {
    let userInfo = store.state.userInfo || ls.get('userInfo')

    if (!userInfo || JSON.stringify(userInfo) === '{}') {
        if (redirect) {

            if (!tip) {

                // #ifdef H5
                ls.set('login_farward_url', location.href);
                // location.replace('/fre/pages/login/login')
                // return;
                // #endif
                uni.navigateTo({
                    url: '/pages/login/login'
                })
                return;
            }
            confirm({title: '提示', content: '该操作需要登录,请问是否登录?', confirmText: '去登录', cancelText: '暂不登录'}).then(() => {
                // #ifdef H5
                ls.set('login_farward_url', location.href);
                // location.replace('/fre/pages/login/login')
                // return;
                // #endif
                uni.navigateTo({
                    url: '/pages/login/login'
                })

            }).catch(() => {

            })
        }
        return false;
    }

    return true;
}

/**
 * 检测是否是分销商
 * @param redirect
 * @return {boolean}
 */
export const checkIsDistribute = (redirect, tip) => {

    //需要先确认是否已经登录了。。。。。

    let userInfo = store.state.userInfo || ls.get('userInfo')
    console.log(userInfo)
    if (userInfo.Is_Distribute != 1) {
        if (redirect) {
            if (!tip) {
                uni.navigateTo({
                    url: '/pages/fenxiao/distributorCenter'
                })
                return;
            }
            confirm({title: '提示', content: '该操作需要是分销商,请问是否成为分销商?', confirmText: '确定', cancelText: '暂不成为'}).then(() => {
                uni.navigateTo({
                    url: '/pages/fenxiao/distributorCenter'
                })

            }).catch(() => {

            })
        }
        return false;
    }

    return true;
}


/**
 * 公共跳转方法
 * @param linkObj
 */
const tabbarRouter = ['/pages/index/index', '/pages/classify/classify', '/pages/detail/groupSuccess', '/pages/order/cart', '/pages/person/person', '/pages/fenxiao/fenxiao'];
const isHasTabbarRouter = (link) => {
    for (var item of tabbarRouter) {
        console.log(item, link, item.indexOf(link));
        //反的了。。
        if (item.indexOf(link) != -1 || link.indexOf(item) != -1) {
            console.log('has');
            return true;
        }
    }
    return false;
}
export const linkTo =  (linkObj) => {

    let {link, linkType, ext = {}} = linkObj;
    if (!link) {
        //error('跳转地址为空')
        return;
    }

    console.log('跳转link:' + link + '===type:' + linkType)

    //跳转到小程序
    if (linkType === 'mini') {

        let {url, appid, origin_id} = ext
        console.log(link, url, appid, origin_id)
        // #ifdef APP-PLUS
        if (!origin_id) {
            error('origin_id_缺失')
            return;
        }
        plus.share.getServices(function (s) {
            var shares = null;
            var sweixin = null;

            shares = {};
            for (var i in s) {
                var t = s[i];
                shares[t.id] = t;
            }
            sweixin = shares['weixin'];

            sweixin ? sweixin.launchMiniProgram({
                id: origin_id,
                path: link,
                webUrl: ext.url
            }) : toast('跳转小程序参数错误');

        }, function (e) {
            console.log("获取分享服务列表失败：" + e.message);
            if (ext.url) {

            }
        });
        return;
        // #endif


        // #ifdef MP
        if (appid && link) {
            uni.navigateToMiniProgram({
                appId: appid,
                path: link,
                success(res) {
                    console.log(res)
                    // 打开成功
                },
                fail(err) {
                    console.log(err)
                }
            })
            return;
        } else {
            error('小程序跳转参数错误')
        }
        return;
        // #endif

        // #ifdef H5
        if (url) {
            location.href = ext.url
        } else {
            error('小程序备用地址为空')
        }
        return;

        // #endif

        return;
    }


    //第三方链接
    if (linkType === 'third' || link.indexOf('http') !== -1) {

        // #ifndef H5
        console.log('/pages/common/webview?url=' + link)
        uni.navigateTo({
            url: '/pages/common/webview?encode=1&url=' + encodeURIComponent(link)
        })
        // #endif


        // #ifdef H5
        location.href = link
        // #endif

        return;
    }

    if (link[0] != '/') {
        link = '/' + link;
    }
    //除了这些页面之外，其他都走普通跳转
    if (isHasTabbarRouter(link)) {

        uni.switchTab({
            url: link
        });

    } else {

        uni.navigateTo({
            url: link
        });

    }
}

/**
 * 打开客服
 */
export const contact = ()=>{
    let initData = store.state.initData || ls.get('initData');
    if(initData.kf_url){
        linkTo({linkType:'third',link:initData.kf_url})
    }else{
        error('暂未设置客服功能')
    }
}

export const back = () => {uni.navigateBack()}

export default {
    toast,error,linkTo
}
