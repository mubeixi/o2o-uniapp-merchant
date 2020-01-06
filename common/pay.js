import {WX_JSSDK_INIT} from "./mixin";

import {isWeiXin, ls, urlencode} from "./helper";
import {confirmOrderPayStatus, traslateShorten} from "./fetch";


/**
 *
 * @param vm 传this
 * @param pay_type 支付类型
 * @param payRequestData orderPay的res
 *
 *
 *
 */

// 示例
//
// do something 下单和余额支付的逻辑自己维护，这里只管拿到了支付参数之后的。
// 如果在页面中的话，必须设置payScuessCall和payFailCall
//
// orderPay(payConf).then(res => {
//     unipayFunc(_self,_self.pay_type,res);
// },err=>{
//     uni.showModal({
//         title:'提示',
//         content:'获取支付参数失败:'+err.msg
//     })
// }).catch(e=>{
//
// })
//

export const unipayFunc = (vm, pay_type, payRequestData) => {


    let _self = vm, res = payRequestData


    let provider = 'wxpay';
    let orderInfo = {}


    //头条的支付  会有微信和支付宝
    // #ifdef MP-TOUTIAO

    let service = 1;

    // if(pay_type === 'ali_app'){
    //     provider = 'alipay';
    //     service = 4;
    // }
    //
    // if(pay_type === 'wx_h5'){
    //     provider = 'wxpay';
    //     service = 3;
    // }

    orderInfo = res.data

    delete orderInfo.Order_ID

    let conf = {
        provider,
        service,
        orderInfo
    };
    console.log(conf)

    //固定值：1（拉起小程序收银台）开发者如果不希望使用头条小程序收银台，service设置为3/4时，可以直接拉起微信/支付宝进行支付：service=3： 微信API支付，不拉起小程序收银台；service=4： 支付宝API支付，不拉起小程序收银台。其中service=3、4，仅在1.35.0.1+基础库(头条743+)支持
    uni.requestPayment({
        provider,
        _debug: 1,
        service,
        orderInfo, //微信、支付宝订单数据
        getOrderStatus(res) {
            let {out_order_no} = res;
            console.log('out_order_no is ' + out_order_no);
            return new Promise(function (resolve, reject) {
                // 商户前端根据 out_order_no 请求商户后端查询微信支付订单状态


                confirmOrderPayStatus({order_no: out_order_no}).then(res => {
                    if (res.data) {
                        resolve({code: 0});
                    } else {
                        resolve({code: 2});
                    }

                }, err => {
                })
                // setTimeout(function(){
                //
                // },500)

            });
        },
        success: function (res) {
            console.log('success:' + JSON.stringify(res));
            console.log(_self.paySuccessCall)
            _self.paySuccessCall(res)

        },
        complete: function (res) {
            console.log('complete:' + JSON.stringify(res));
            console.log(_self.paySuccessCall)
        },
        fail: function (err) {
            console.log('fail:' + JSON.stringify(err));

            _self.payFailCall(res)
            // uni.showModal({
            //     title:'支付错误',
            //     content:JSON.stringify(err)
            // })
        }
    });
    return;
    // #endif


    // #ifdef H5

    // 微信h5
    if (pay_type === 'wx_h5') {
        let redirect_url = res.data.mweb_url + '&redirect_url=' + urlencode(location.origin + '/fre/pages/order/order?index=2');
        location.href = redirect_url;
        return;
    }

    //阿里h5
    if (pay_type === 'alipay') {

        //公众号麻烦一点
        if (isWeiXin()) {

            let users_id = ls.get('users_id');

            let fromurl = res.data.arg;//encodeURIComponent(res.data.arg);

            //字符串
            let nocestr = ''
            traslateShorten({data: fromurl}).then(res => {

                nocestr = res.data.key;
                // uni.navigateTo({
                //     url:`/pages/pay/wx/wx?users_id=${users_id}&nocestr=`+nocestr
                // })

                let str = `/fre/pages/pay/wx/wx?users_id=${users_id}&nocestr=` + nocestr

                let url = location.origin + str;

                //强制页面刷新
                location.href = url;

            }, err => {
                // error('获取支付宝支付参数失败');
            })
            //let origin = location.origin;

            // fromurl = fromurl.replace(/openapi.alipay.com/,'wangjing666')
            //
            //
            // let str = `/fre/pages/pay/wx/wx?users_id=${users_id}&formurl=`+encodeURIComponent(fromurl);
            // let url = location.origin + str;
            // console.log(url)
            //
            // this.aliPayUrl = url;
            //location.href = url;

            // uni.navigateTo({
            //     url:`/pages/pay/wx/wx?users_id=${users_id}&formurl=`+encodeURIComponent(fromurl)
            // })
        } else {
            document.write(res.data.arg)
            document.getElementById('alipaysubmit').submit()
        }

        return;

    }


    //下面只能是微信公众号的
    if (!isWeiXin()) return;
    let {timestamp, nonceStr, signType, paySign} = res.data;

    //直接支付
    WX_JSSDK_INIT(_self).then((wxEnv) => {

        //关键字？？package
        wxEnv.chooseWXPay({
            timestamp,
            nonceStr,
            package: res.data.package,
            signType,
            paySign,
            success: function (res) {
                // 支付成功后的回调函数
                _self.paySuccessCall(res)
            }
        });

    }).catch((e) => {
        console.log('支付失败')
    })
    return;

    // #endif


    // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY

    // #endif

    // #ifdef MP-WEIXIN

    provider = 'wxpay';
    orderInfo = res.data
    delete orderInfo.timestamp

    console.log(provider, orderInfo, '支付数据222222222222222222');
    let prepay_id = orderInfo.package.split('=')[1];
    uni.requestPayment({
        ...orderInfo,
        provider,
        success: function (res) {
            // add_template_code({
            //     code: prepay_id,
            //     times: 3
            // })
            console.log('success:' + JSON.stringify(res));
            _self.paySuccessCall(res)
        },
        fail: function (err) {
            console.log('fail:' + JSON.stringify(err));
            _self.payFailCall(err);
        }
    });
    return;
    // #endif

    //app支付，有微信有支付宝


    // #ifdef APP-PLUS

    if (pay_type === 'ali_app') {

        let provider = 'alipay';
        let orderInfo = res.data.arg;
        console.log('支付宝参数', orderInfo)

        uni.requestPayment({
            provider,
            orderInfo, //微信、支付宝订单数据
            success: function (res) {
                _self.paySuccessCall(res)
                console.log('success:' + JSON.stringify(res));
            },
            fail: function (err) {
                console.log('fail:' + JSON.stringify(err));
                // uni.showModal({
                //     title:'支付错误',
                //     content:JSON.stringify(err)
                // })
            }
        });

        return;

    }

    //app微信
    if (pay_type === 'wx_app') {

        provider = 'wxpay';
        orderInfo = res.data
        uni.requestPayment({
            provider,
            orderInfo, //微信、支付宝订单数据
            success: function (res) {
                _self.paySuccessCall(res)
                console.log('success:' + JSON.stringify(res));
            },
            fail: function (err) {
                console.log('fail:' + JSON.stringify(err));
                _self.payFailCall(err);
            }
        });
        return;
    }
    // #endif


}
