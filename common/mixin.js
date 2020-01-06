import {getJsSign, getSystemConf, upUserLog} from "./fetch";
import {buildSharePath, emptyObject, GetQueryByString, isWeiXin, ls} from "./helper";
import {domainFn} from "./filter";
import {mapActions} from "vuex";
import {checkIsLogin,error} from "./init/fun";

// #ifdef H5
import wx from 'weixin-js-sdk';
// #endif

/**
 * 代替原型链操作
 *
 */
export const baseMixin = {

}



// #ifdef H5
/**
 * 微信公众号签名
 * @param vm
 * @param jsApiListList
 * @return {Promise<unknown>}
 * @constructor
 */
export const WX_JSSDK_INIT = (vm, jsApiListList) => new Promise((resolve, reject) => {

	function setWxConfig(config) {
		console.log('wx seting', config)
		wx.config(config);
	}
	if (!isWeiXin()) reject(false);

	if (vm.JSSDK_READY) {
		console.log('wx env already ready')
		resolve(wx);
		return;
	}

	getJsSign({
		url: location.href.split('#')[0],
		//debug : process.env.NODE_ENV === 'production' ? false : true
	}, {errtip: false}).then((res) => {
		if (res.errorCode === 0) {

			let config = res.data;
			//线上环境，听服务器的，本地的一律调试
			let debug = false;//process.env.NODE_ENV === 'production'?config.debug?true:false:true
			let jsApiList = jsApiListList ? jsApiListList : ['onMenuShareAppMessage', 'onMenuShareTimeline', 'openLocation', 'getLocation', 'scanQRCode'];
			// ['chooseImage', 'previewImage', 'uploadImage', 'openLocation','getLocation', 'chooseWXPay', 'getSystemInfo', 'onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'];
			let {noncestr, timestamp, appId, signature} = config;

			setWxConfig({debug, appId, timestamp, nonceStr: noncestr, signature, jsApiList});

			wx.ready(function () {

				vm.JSSDK_READY = true;
				console.log('wx ready')
				//将微信这个变量传进去，所以在页面就不需要传了
				resolve(wx);
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			});


		} else {
			reject(false)
		}

	}).catch(res => {
		reject(false)
	})

})
// #endif

/**
 * 统计的混合类
 */
import {sendAnalysisData} from "./fetch";
// #ifdef H5
//目前只支持h5环境下录屏
// var rrweb = require('rrweb')
// console.log(rrweb)
// #endif
export const Analysis = {
	data(){
		return {
			currentPageName:'',
			analysisExt:{}//额外参数，每个页面自己可以随便添加，会上传的
		}
	},
	onLoad(options){
		this.analysisExt.options = JSON.stringify(options)
	},
	onShow(){
		// #ifdef H5
		// let events = [];
		//
		// rrweb.record({
		//   emit(event) {
		// 	// 将 event 存入 events 数组中
		// 	events.push(event);
		//   },
		// });
		//
		// //save 函数用于将 events 发送至后端存入，并重置 events 数组
		// function save() {
		//   const body = JSON.stringify(events);
		//
		//   events = [];
		//   console.log('发送一次')
		//   let postData = {func:body};
		//   postData.User_ID = get_User_ID();
		//   postData.Users_ID = get_Users_ID();   //Users_ID  写死
		//   postData.env = GET_ENV();
		//
		//   uni.request({
		//      header:{ "content-type": "application/x-www-form-urlencoded"},
		//       url: '/node/debug',
		//       method:'post',
		//       data:emptyObject(postData),
		// 	  success: (res) => {
		// 	  	console.log(res)
		// 	  }
		//
		//   })
		//
		// }
		// //
		// save()
		// //setTimeout(()=>{save()},1000)
		// // // 每 10 秒调用一次 save 方法，避免请求过多
		// setInterval(save, 10 * 1000);
		// #endif

	},
	onTabItemTap(onTabItemTap){

		// let {pagePath,index,text} = onTabItemTap
		//
		// const res = uni.getSystemInfoSync();
		// const fullWidth = res.screenWidth;
		// const fullHeight = res.screenHeight
		//
		// let x = fullWidth/5*(index+1.5);//这样坐标就是正中间了
		// let y = fullHeight-25;//正好50px底部
		//
		// //合并内容
		// //Object.assign(this.analysisExt,{onTabItemTap})
		// this.analysisExt.onTabItemTap = JSON.stringify(onTabItemTap)
		//
		// this.currentPageName = ls.get('temp_tab_url')
		// this.commonClick({target:{x,y,view_type:'tap'}})
		//
		// ls.set('temp_tab_url',pagePath)

	},
	methods:{
		commonClick(evt){

			//坐标
			let {x,y,view_type='tap'} = evt.target

			const d = new Date()
			//,
			let postData = {view_type,router:this.currentPageName,y_coordinate:y,x_coordinate:x,_timeStamp:parseInt(d.getTime()/1000)}

			if(!emptyObject(postData,1))return;//距离和坐标是肯定要有的
			Object.assign(postData,this.analysisExt);

			let history = ls.get('analysis')
			if(!history)history=[]
			history.push(postData)
			ls.set('analysis',history)
			//console.log(JSON.stringify(postData))

			sendAnalysisData(postData).then(res=>{}).catch(e=>{})
		},
	},
	mounted() {

		// this.$nextTick().then(() => {
		// 	let currentPageInstance = getCurrentPages()
		// 	const currentPageName = currentPageInstance[currentPageInstance.length - 1].route
		// 	if (!currentPageName) return;
		// 	this.currentPageName = currentPageName
		//
		// 	//进入页面
		// 	this.commonClick({target:{x:0,y:0,view_type:'enter'}})
		//
		// })
	}
}

/**
 *所有类都需要引用的混合类
 * @type {{methods, onLoad(*): (undefined), mounted(): void}}
 */
export const pageMixin = {
	mixins:[Analysis],//启用统计
	data: function () {
		return {
			//是否需要刷新配置，可以实现页面级配置
			refreshInit: false,
			// #ifdef H5
			JSSDK_READY: false,
			JSSDK_INIT: true,//是否需要微信签名
			// #endif

		}
	},
	//option为object类型，会序列化上个页面传递的参数
	//页面的初始化
	onLoad(option) {


		let owner_id = null, users_id = null
		// #ifdef H5

		/*商户id机制*/
		users_id = GetQueryByString(location.href, 'users_id')
		//如果连接里面已经有了，就不需要搞事
		if (users_id) {

			//比较新旧users_id
			//只有h5有这个问题，app和小程序都是有单独分配的
			let old_users_id = ls.get('users_id')

			ls.set('users_id', users_id);

			if (old_users_id && old_users_id != users_id) {
				console.log('清空本地配置和登录信息')
				this.setUserInfo({})
				this.setInitData(null)
				getSystemConf({}).then(res => {
					this.setInitData(res.data)
				})

			}

		} else {
			users_id = ls.get('users_id');
		}

		if (users_id) {

			if (!GetQueryByString(location.href, 'users_id')) {

				let { href, protocol, host, search, hash,pathname } = window.location;
				//console.log(protocol, host, search, hash)

				if (search.indexOf('?') === -1) {
					search += '?users_id=' + users_id
				} else {
					search = search.replace(/\?/, '?users_id=' + users_id + '&')
				}
				//console.log(search)

				const newHref = `${protocol}//${host}${pathname}${search}${hash}`;
				//console.log(newHref)
				 if (newHref !== href) {
				   window.location.replace(newHref);
				 }
			}

		} else {
			uni.showModal({
				title: '提示',
				content: '缺少商户id',
				success: function (res) {
				}
			});
		}

		/*owner_id 机制*/
		owner_id = GetQueryByString(location.href, 'owner_id')
		//console.log(owner_id)
		// #endif

		// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO

		/*users_id*/
		users_id = option.users_id
		//如果连接里面已经有了，就不需要搞事
		if (users_id) {
			ls.set('users_id', users_id);
		} else {
			users_id = ls.get('users_id');
		}

		if (!users_id) {
			uni.showModal({
				title: '提示',
				content: '缺少商户id',
				success: function (res) {
				}
			});
		}

		/*owner_id 机制*/
		owner_id = option.owner_id
		// #endif

		//如果连接里面已经有了，就不需要搞事
		if (owner_id || owner_id == 0) {
			ls.set('owner_id', owner_id);
			console.log('this page owner_id is ' + owner_id)
		}


	},
	onShow() {
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord();
		// #endif

	},
	async created() {

		//根据配置决定是否刷新配置
		let initData = await this.getInitData(this.refreshInit)

		// #ifdef H5
		//上报用户信息
		if (checkIsLogin() && !sessionStorage.getItem('is_send_usrlog')) {
			upUserLog({}, {errtip: false}).then(res => {
				sessionStorage.setItem('is_send_usrlog', 1)
			}, err => {
				console.log('error', err)
			}).catch(e => {
				console.log('catch', e)
			})
		}

		//微信里面强制刷新
		this.refreshInit = true

		//页面默认全都是分享出去是首页的
		if (isWeiXin() && this.JSSDK_INIT) {

			await this.WX_JSSDK_INIT(this).then((env) => {

				this.$wx.onMenuShareTimeline({
					title: initData.ShopName, // 分享标题
					link: buildSharePath(initData.front_url), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domainFn(initData.ShareLogo), // 分享图标
					success: function () {
						// 用户点击了分享后执行的回调函数
					}
				});

				//两种方式都可以
				this.$wx.onMenuShareAppMessage({
					title: initData.ShopName, // 分享标题
					link: buildSharePath(initData.front_url), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: domainFn(initData.ShareLogo), // 分享图标
					desc: initData.ShareIntro,
					type: 'link', // 分享类型,music、video或link，不填默认为link
					// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function () {
						// 用户点击了分享后执行的回调函数
					}
				});

			})
		}
		// #endif

	},
	mounted() {


	},
	methods: {
		// #ifdef H5
		WX_JSSDK_INIT,
		// #endif
		...mapActions({getInitData:'settings/loadInitData'}),
		...mapActions([ 'setUserInfo', 'getUserInfo', 'setInitData'])
	},
	// #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
	onShareAppMessage() {

		let initData = this.getInitData()
		let path = '/pages/index/index';
		let shareObj = {
			title: initData.ShopName,
			desc: initData.ShareIntro,
			imageUrl: domainFn(initData.ShareLogo),
			path: buildSharePath(path)
		};
		return shareObj
	},
	// #endif
}

/**
 * 支付的混合类
 * @type {{}}
 */
export const payMixin = {
	methods: {},
	created() {

	},
}

/**
 * 扫描二维码
 */
// #ifdef APP-PLUS
import permision from "./permission";
export const scanMixin = {
	data() {
		return {
			originData: ''//扫码得到的原始数据，格式  act##dataString 其中dataString可能是单独的值或者 name::val;;name::val;;name::val;;name::val这样的键值对
		}
	},
	methods: {
		async checkPermission(code) {
			let status = permision.isIOS ? await permision.requestIOS('camera') : await permision.requestAndroid('android.permission.CAMERA');

			if (status === null || status === 1) {
				status = 1;
			} else {
				uni.showModal({
					content: "需要相机权限",
					confirmText: "设置",
					success: function (res) {
						if (res.confirm) {
							permision.gotoAppSetting();
						}
					}
				})
			}
			return status;
		},
		/**
		 *唤起不同终端的二维码，并且返回返回内容
		 * @param needResult 是由微信处理还是自定义业务 微信wap专用
		 * @param onlyFromCamera 是否只允许摄像头扫描 微信wap之外可以用
		 * @param barCode  支持条码扫描 微信wap专用
		 * @param qrCode 支持二维码 微信wap专用
		 * @return {Promise<unknown>}
		 */
		async openScanFn(needResult, onlyFromCamera, barCode, qrCode) {

			// #ifdef APP-PLUS
			let status = await this.checkPermission();
			if (status !== 1) {
				return;
			}
			// #endif

			return new Promise((resolve, reject) => {

				// #ifdef H5
				if (!isWeiXin()) {
					reject('请在微信中打开此页面')
				}

				let scanType = []
				if (barCode) scanType.push('barCode')
				if (qrCode) scanType.push('qrCode')

				WX_JSSDK_INIT(this).then(wxEnv => {
					wxEnv.scanQRCode({
						needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType, // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
							resolve(result)
						},
						fail: function (err) {
							reject(err)
						}
					});
				})
				// #endif


				// #ifndef H5
				console.log('手机扫码')
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera,
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						resolve(res.result)
					},
					fail: function (err) {
						reject(err)
					}
				});
				// #endif


			})
		},
		translateQrData(origin) {
			if (!origin) {
				error('信息为空');
				return;
			}

			const dataArr = origin.split('##')
			if (dataArr.length < 2) {
				error('信息有误');
				return;
			}
			let act = dataArr[0];
			const valArr = dataArr[1].split(';;')

			let valObj = {}
			for (var valStr of valArr) {
				let tempArr = valStr.split('::')
				valObj[tempArr[0]] = tempArr[1]
			}
			return {act, params: valObj}
		}
	}
}
// #endif
