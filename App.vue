<script>
    import {ls} from "./common/helper";
    import {getSystemConf} from "./common/fetch";

    import {isDev} from "./common/env";
    // #ifdef APP-PLUS || MP-TOUTIAO
	import {APP_USERS_ID} from "./common/env";
	// #endif

    // #ifdef APP-PLUS
    import Push from './common/push';
    // #endif

	// #ifndef H5
	import {upUserLog} from "./common/fetch";
    import {checkIsLogin} from "./common";
    // #endif
    import {sendAnalysisData} from "./common/fetch";

    export default {
		globalData: {
			videoInstance:[]
		},
        //目前只有app和小程序用到了应用的全局onLaunch，h5环境下这里不执行的
		onLaunch: function(option) {

            // console.log('App Launch')

			// #ifndef H5
			if(checkIsLogin()){
				upUserLog({},{errtip:false}).then(res=>{
				    console.log('success',res)
				},err=>{console.log('error',err)}).catch(e=>{console.log('catch',e)})
			}
			// #endif

            // #ifdef MP-WEIXIN
            //小程序需要拿这个，都拿一下覆盖吧
            let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
            //console.log('extConfig info is',extConfig);
            let users_id = extConfig.users_id;
            //切换的时候清空资料
            if(ls.get('users_id') && users_id != ls.get('users_id')){
                ls.set('userInfo',{})
                ls.set('user_id','',1)
            }

            ls.set('users_id',users_id);
            // #endif


            //头条的需要写入一下
            // #ifdef MP-TOUTIAO || APP-PLUS

            //清空一下
            if(ls.get('users_id') && APP_USERS_ID != ls.get('users_id')){
                // ls.set('userInfo',{})
                // ls.set('user_id','',1)
            }
            ls.set('users_id',APP_USERS_ID);
            // #endif

			// #ifdef APP-PLUS


            // 获取客户端标识信息绑定设备
            var info = plus.push.getClientInfo();
            let interval = null;
            if(info){
                if(info.clientid){
                    // console.log('device plus info ',info);
                    ls.set('user_client_id',info.clientid)
                }else{
                    interval = setInterval(function(){
                        // console.log('获取cid ing')
                        info = plus.push.getClientInfo();
                        if(info.clientid){
                            // console.log('获取cid success',info)
                            ls.set('user_client_id',info.clientid)
                            clearInterval(interval);
                        }
                    },50)
                }
                //监听
                Push.pushListener();
            }

            Push.cancelPushClear()
			// #endif


            //每次加载都清空全站配置
            ls.remove('initData');
            getSystemConf().then(res => {
                ls.set('initData',res.data)
            },err=>{}).catch(error=>{})

		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
        //后期可以接自定义的错误上报
        onError:function(err){

			let msg = err?JSON.stringify(err):'程序错误'

			if(isDev && msg && msg!='{}'){
				uni.showModal({
				    title:'错误',
				    content:msg
				})
			}
        }
	}
</script>
<style lang="scss">
    /* #ifndef APP-NVUE */
    @import "./static/css/common.scss";
    /* #endif */
</style>
<style lang="less">
/* #ifndef APP-NVUE */
@import "./static/css/icon.css";
@import "./components/gaoyia-parse/parse.css";
/* #endif */
</style>

