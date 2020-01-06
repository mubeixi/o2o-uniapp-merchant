<template>
	<div @click="commonClick" class="loginSign font16">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" ></view>
		<!-- #endif -->
		<ul>
			<li class="codeContent" v-if="status == 1">
				<h1 class="topTitle">
					<view @click="goBack" class="funicon icon icon-fanhui inline-block"></view>
					登陆 / 注册
				</h1>
				<div class="codeLogin">
					<label class="inputLable flex line20">

						<span>+{{ telNum }}</span>
						<input type="number" placeholder="请输入手机号" v-model="mobile" />
					</label>
					<button type="primary" class="submitBtn sendCode" @click="codeSendVerification(4)" :disabled="isCodeDisabled">发送验证码</button>
					<div class="passwordLogin" @click="(status = 2), (loginStatus = 2)">
						使用密码登陆
					</div>
				</div>

				<!-- #ifdef H5 -->
				<div class="otherLogin" v-show="isShowWeiXin==1">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels">
							<i v-if="channel.type=='wx_mp'" @click="weixinlogin(channel)" class="funicon icon-weixin"></i>
							<i v-if="channel.type=='qq'" @click="qqlogin(channel)" style="color: #2eb1f1;font-size: 32px;margin-top: 2px" class="funicon icon-QQ1"></i>
						</div>

					</div>
				</div>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<div class="otherLogin mp-weixin">
					<div class="box" style="margin: 0 30px;">

						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels">

<!--							<button v-if="channel.type=='wx_lp'" size="mini" type="primary" class="text-center" open-type="getUserInfo"  @getuserinfo="weixinlogin">登录</button>-->
							 <i v-if="channel.type=='wx_lp'" @click="openLoginDialog" class="funicon icon-weixin font24" ></i>
							<!-- <i v-if="channel.type=='wx_mp'" @click="weixinlogin(channel)" class="funicon icon-weixin"></i>
							<i v-if="channel.type=='qq'" @click="qqlogin(channel)" style="color: #2eb1f1;font-size: 32px;margin-top: 2px" class="funicon icon-QQ1"></i> -->
						</div>

					</div>
				</div>
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->
				<div class="otherLogin">
					<div class="flex box" style="width: 100px;text-align: center;margin: 0 auto;">
						<div class="inline-block flex1 text-center" v-for="(channel,idx) in channels">

<!--							<button  size="mini" type="primary" class="text-center" open-type="getUserInfo"  @getuserinfo="weixinlogin">登录</button>-->
							<!-- <i v-if="channel.type=='wx_lp'" @click="weixinlogin" class="funicon icon-weixin font24" ></i> -->
							<!-- <i v-if="channel.type=='wx_mp'" @click="weixinlogin(channel)" class="funicon icon-weixin"></i>
							<i v-if="channel.type=='qq'" @click="qqlogin(channel)" style="color: #2eb1f1;font-size: 32px;margin-top: 2px" class="funicon icon-QQ1"></i> -->
							<div v-if="channel.type=='wx_app'" class="inline-block flex1 text-center" @click="weixinlogin"><i class="funicon icon-weixin"></i></div>
						</div>


					</div>
				</div>
				<!-- #endif -->

			</li>
			<li class="phoneContent" v-else-if="status == 2">
				<div class="title">
					<view @click="(status = 1), (loginStatus = 1)" class="funicon icon icon-fanhui inline-block prebBtn"></view>
					手机账号登陆
				</div>
				<div class="content">

					<label class="inputLable flex line20">

						<span>+{{ telNum }}</span>
						<input placeholder="请输入手机号" v-model="mobile" maxlength="11" />
					</label>
					<label class="inputLable  flex">
						<span style="width: 50px;">密码</span>
						<input type="password" placeholder="请输入密码" v-model="phone.password" />

					</label>
					<div class="searchPass" @click="(status = 3), (loginStatus = 3)">
						找回密码？
					</div>
					<button @click="login" type="primary" class="submitBtn sendCode" :disabled="isPhoneDisabled">登录</button>
				</div>
			</li>
			<li class="searchPassword" v-else-if="status == 3">
				<div class="title">

					<view @click="(status = 2), (loginStatus = 2)" class="funicon icon icon-fanhui inline-block prebBtn"></view>
					找回密码
				</div>
				<div class="content">
					<label class="inputLable flex ">
						<!-- <span @click="tel.show = true">+{{ telNum }}</span> -->
						<span>+{{ telNum }}</span>
						<input type="number" placeholder="请输入手机号" v-model="mobile" maxlength="11" />
					</label>

					<button @click="codeSendVerification(4)" type="primary" class="submitBtn" :disabled="isCodeDisabled">发送验证码</button>
				</div>
			</li>
			<li class="fillCode" v-else-if="status == 4">
				<div class="title">请输入验证码</div>
				<p class="description">
					验证码已发送至手机 {{ mobile }}
					<span :class="{ disabled: countdownStatus }" @click="againSendCode">重新发送{{ countdownStr }}</span>
				</p>
				<input type="number" v-if="loginStatus !== 3 && loginStatus !== 4" :value="verificationCode" class="code" @input="fillCode" />

				<div class="searchNewPass editSearchPassword" v-if="loginStatus === 3">
					<label class="inputLable flex line20">
						<span>验证码</span>
						<input class="ins" type="text" placeholder="请输入验证码" :value="verificationCode" @input="substr" />
					</label>
					<label class="inputLable flex">
						<span>新密码</span>
						<input class="ins" type="password" placeholder="请输入新密码" v-model="newPassword" />

					</label>

					<button @click="setNewPassOk" type="primary" class="submitBtn" :disabled="isNewPassDisabled">完成</button>
				</div>
			</li>
			<li class="setNewPass" v-else-if="status == 5">
				<div class="title">
					<view @click="setStatusFunc" class="funicon icon icon-fanhui inline-block prebBtn"></view>
					设置新密码
				</div>
				<div class="content">
					<label class="inputLable flex lin20">
						<span>密码</span>
						<input type="password" placeholder="请输入新密码" v-model="newPassword" />
					</label>
					<button @click="setNewPassOk" type="primary" class="submitBtn sendCode" :disabled="isNewPassDisabled">完成</button>
				</div>
			</li>
		</ul>

		<wzw-dialog ref="refLogin" positions="center" bgColor="rgba(0,0,0,.7)" mainBgColor="none">
			<div class="joinForm">
				<div class="line15">
				登录提示
				</div>
				<div class="line10 graytext">
				为了更好的为您服务，需要获取您的资料
				</div>
				<div class="line10">
					<button type="primary" open-type="getUserInfo"  @getuserinfo="weixinlogin">立即登录</button>
				</div>
				<div>
					<button @click="cancelLoginDialog">暂不登录</button>
				</div>
			</div>
		</wzw-dialog>

		<!--    <popup v-model="tel.show" class="telContent">-->
		<!--      <popup-header title="选择国际电话区号"></popup-header>-->
		<!--      <group gutter="0" class="content">-->
		<!--        <radio-->
		<!--          v-model="tel.model"-->
		<!--          :options="telData"-->
		<!--          @on-change="tel.show = false"-->
		<!--        ></radio>-->
		<!--      </group>-->
		<!--    </popup>-->

	</div>
</template>

<script>
	import telData from "../../common/tool/tel";

	// #ifdef H5
	import wx from "weixin-js-sdk";
	// #endif

	import {
		GetQueryByString
	} from "../../common/helper";

	// #ifdef APP-PLUS
	import {bindUserClientId} from "../../common/fetch";
	// #endif
	import {upUserLog} from "../../common/fetch";

	// import {
	//   login,
	//   // resetPwd,
	//   // loginSign,

	//   // weixinAuthUrl,
	//   // editPassword,
	//   // logout
	// } from "@/assets/js/fetch/index";

	import {
		login,getSmsCode
	} from "../../common/fetch";

	import {ls} from "../../common/helper";

	import {
		toast,
		confirm,
		error
	} from "../../common";

	import {
		mapGetters,
		mapActions,
		Store
	} from "vuex";

	import {
		isWeiXin,
		urlencode
	} from "../../common/helper";
	import {
		pageMixin
	} from "../../common/mixin";


	export default {
		mixins: [pageMixin],
		data() {
			return {
				refreshInit:false,
				channels:[],
				froms: '', //跳转过来的路由
				status: 1, // 页面状态 1: 登录注册； 2：密码登陆； 3： 找回密码； 4：输入验证码； 5：设置新密码； 6:修改密码
				loginStatus: 1, // 1: 短信登陆； 2: 手机号登陆； 3: 找回密码； 4：修改密码
				verificationCode: "", //用户填写的验证码都会在这里
				mobile: "", // 手机号，不管在哪个状态
				newPassword: "",
				fromId: 0, //推荐人的ID 没有推荐人为0，有推荐人传推荐人ID
				phone: {
					password: "",
					inputType: false
				},
				countdownNum: 60, //倒计时数字
				countdownStatus: false,
				tel: {
					show: false,
					data: telData,
					model: "中国 86"
				},
				editPass: {
					oldPassShow: false,
					newPassShow: false,
					okNewPassShow: false,

					oldPass: "",
					newPass: "",
					okNewPass: ""
				},
				isShowWeiXin: 0
			};
		},
		computed: {
			...mapGetters([
				'userInfo'
			]),
			hasVisibleIcon() {
				return this.phone.inputType ? "iconyanjing" : "iconyanjing1";
			},
			telNum() {
				return this.tel.model.split(" ")[1];
			},
			telData() {
				return this.tel.data.map(v => {
					return `${v.name} ${v.tel}`;
				});
			},
			countdownStr() {
				if (this.countdownStatus) {
					return `(${this.countdownNum})`;
				}
				return "";
			},
			isCodeDisabled() {
				return !/^1(3|5|6|7|8|9)[0-9]{9}$/.test(this.mobile);
			},
			isEditNewPassDisabled() {
				let old = /^.{6,30}$/.test(this.editPass.oldPass);
				let newPass = /^.{6,30}$/.test(this.editPass.newPass);
				let okNewPass = /^.{6,30}$/.test(this.editPass.okNewPass);
				return old && newPass && okNewPass;
			},
			isNewPassDisabled() {
				let verifi = this.verificationCode.length != 6;
				let password = !/^.{6,30}$/.test(this.newPassword);
				return verifi && password;
			},
			isPhoneDisabled() {
				let mobile = this.mobile;
				let password = this.phone.password;
				let isOkPhone = /^1(3|5|6|7|8|9)[0-9]{9}$/.test(mobile);

				return !(isOkPhone && password !== "");
			}
		},
		methods: {
			openLoginDialog(){
				this.$refs.refLogin.show()
			},
			cancelLoginDialog(){
				this.$refs.refLogin.close()
				// uni.navigateBack()
			},

			goBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			setStatusFunc(){
				this.status = 3
				this.loginStatus = 3
			},
			toHome() {
				this.$fun.linkTo({
					link: '/pages/index/index',
					linkType: 'default'
				})
			},
			setData(from) {
				this.froms = from;
				//console.log(this.froms);
			},
			setNewPasswordOk() {
				let old = this.editPass.oldPass;
				let newPass = this.editPass.newPass;
				let okNewPass = this.editPass.okNewPass;
				if (newPass !== okNewPass) return toast("新密码和确认密码不一致");
				editPassword(old, newPass, okNewPass).then(() => {});
			},

			sendCode() {
				let mobile = this.mobile;
				if (mobile == "" || !mobile)
					return error("请先填入手机号");
				let event = undefined;
				if(this.countdownStatus)return;
				//this.countdownStatus=true;
				return getSmsCode({mobile})
					.then(() => toast("发送短信成功",'success'))
					.then(() => this.startCountdown());
			},
			async codeSendVerification(status) {
				// 发送验证码并设置 status（更新页面）
				if (!status) throw "请传入 status";
				await this.sendCode();
				//只有发送验证码成功了，才是
				if(this.countdownStatus)this.status = status;

			},
			againSendCode() {
				if (!this.countdownStatus) this.sendCode();
			},
			substr(event) {
				this.verificationCode = event.target.value;
			},
			fillCode(event) {
				let _self = this;
				//填写验证码
				//this.substr();
				this.verificationCode = event.target.value


				if (this.verificationCode.length == 4){
					this.login(null,function () {
						_self.verificationCode = ''
					});
				}
			},
			/**
			 * 可以加两个回调
			 * @param scall
			 * @param ecall
			 * @return {Promise<void>}
			 */
			async login(scall,ecall) {

				//登录 - 多个地方用了
				//console.log(this.fromId, "这是fromId");
				if (this.loginStatus === 1) {
				  // 短信登录
				  await login({mobile:this.mobile, captcha:this.verificationCode,login_method:'sms_login'}).then(res =>
				  {
				  	if(res.errorCode === 0){
				  		//么有自定义回调，就默认的额
						!scall && this.loginCall(res.data)
						scall && scall()
					}else{
						ecall && ecall()
					}

				  }).catch(e=>{ecall && ecall()})

				} else if (this.loginStatus === 2) {

				  // 账号密码登录
				  await login({mobile:this.mobile,passwd:this.phone.password,login_method:'mobile_login'}).then(res =>
				     {
						 if(res.errorCode === 0) {
							 this.loginCall(res.data)
						 }
				     }
				  );

				} else if (this.loginStatus === 3) {
				  // 找回密码
				  // await login({mobile:this.mobile, captcha:this.verificationCode,login_method:'sms_login'})
				}

			},
			setNewPassOk() {
				let data = {
					mobile: this.mobile,
					code: this.verificationCode,
					newpwd: this.newPassword
				};
				resetPwd(data).then(res => {
					toast(res.msg);
					confirm({
						content: "密码设置成功，是否直接登录？",
						confirmText: "直接登录",
						cancelText: "暂不登录"
					}).then(() => this.login());
				});
			},
			startCountdown() {
				//倒计时
				this.countdownStatus = true;
				const countdownInterval = setInterval(() => {
					if (this.countdownNum > 0) this.countdownNum--;
					else {
						clearInterval(countdownInterval);
						this.countdownNum = 60;
						this.countdownStatus = false;
					}
				}, 1000);
			},
			async weixinlogin(data) {

				let _self = this;

				// #ifdef H5
				let channel = data;

				let REDIRECT_URI = urlencode(location.href);
				console.log(REDIRECT_URI)


				let wxAuthUrl = null;

				let scope = 'snsapi_userinfo';//snsapi_userinfo //snsapi_base
				if(channel.type=='wx_mp' && channel.component_appid){
					//服务商模式登录
					wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE&component_appid=${channel.component_appid}#wechat_redirect`;
				}else{

					//公众号自己的appid用于登录
					wxAuthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${channel.appid}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&connect_redirect=1&state=STATE#wechat_redirect`
				}
				console.log(wxAuthUrl)

				window.location.href = wxAuthUrl;



				// #endif

				// #ifdef MP-WEIXIN

				uni.login({

					success: function (loginRes) {
						console.log(loginRes);
						let CODE = loginRes.code

						login({code:CODE,login_method:'wx_lp'},{tip:'登录中'}).then(result=>{

							if(result.errorCode === 0){
								_self.loginCall(result.data)
							}

							if(result.errorCode === 88001){

								// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
								wx.getSetting({
									success(res) {
										if (!res.authSetting['scope.userInfo']) {
											wx.authorize({
												scope: 'scope.userInfo',
												success (res) {
													console.log(res)



													let userInfoData = null;

													wx.getUserInfo({
														lang:'zh_CN',
														success:function (val) {
															console.log(val	)
															userInfoData = val;

															const lp_raw_data = {...userInfoData.userInfo,...result.data}
															console.log(lp_raw_data)

															login({code:CODE,login_method:'wx_lp',lp_raw_data:JSON.stringify(lp_raw_data)},{tip:'更新用户信息'}).then(ret=>{
																_self.loginCall(ret.data)
															}).catch(err=>{})
														}
													})

												},
												fail(err){
													console.log(err)
													error('请点击授权登录1')
												}
											})
										}else{

											let userInfoData = null;

											wx.getUserInfo({
												lang:'zh_CN',
												success:function (val) {
													console.log(val	)
													userInfoData = val;

													const lp_raw_data = {...userInfoData.userInfo,...result.data}
													console.log(lp_raw_data)

													login({code:CODE,login_method:'wx_lp',lp_raw_data:JSON.stringify(lp_raw_data)},{tip:'更新用户信息'}).then(ret=>{
														_self.loginCall(ret.data)
													}).catch(err=>{})
												}
											})
											//console.log(res)
											//error('请点击授权登录2')
										}
									}
								})
							}

						}).catch(e=>{})
					}
				});
				// #endif

				// #ifdef APP-PLUS
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {

				  	login({login_method:'wx_app',...loginRes.authResult}).then(res=>{
				  		console.log('wx app login result is ',JSON.stringify(res))
						_self.loginCall(res.data)
					}).catch(e=>{

					})
					  // uni.showModal({
					  // 	titile:'微信登录信息',
						// content:JSON.stringify(loginRes.authResult)
					  // })
				    console.log(JSON.stringify(loginRes.authResult));
				  }
				});
				// #endif


			},
			async initDataFn() {

				// #ifdef H5
				this.isShowWeiXin = isWeiXin()
				// #endif

				let initData = await this.getInitData(1)

				let login_methods = initData.login_methods;
				let component_appid = login_methods.component_appid

				this.channels = []
				//根据服务器返回配置设置channels,只有微信公众号和小程序会用到component_appid
				//而且状态可以灵活控制 state为1
				for(var i in login_methods){
					// && login_methods[i].state ??状态呢？
					if(i!='component_appid' && login_methods[i].state){
						this.channels.push(['wx_mp','wx_lp'].indexOf(login_methods[i].type)===-1?{...login_methods[i]}:{...login_methods[i],component_appid})
					}
				}

				console.log('login channels is',this.channels)


			},
			async loginCall(userData){
				console.log('userDatauserDatauserDatauserData',userData)
				this.setUserInfo(userData);
				ls.set("access_token",userData.access_token,1);

				// #ifdef APP-PLUS
				//注册设备
				let clientid = ls.get('user_client_id')
				if(clientid){
					console.log("注册设备",clientid,userData)
					await bindUserClientId({uuid:clientid,action:'save'},{errtip:false}).then(res=>{console.log('注册设备成功')},err=>{}).catch(error=>{})
				}
				// #endif



				//手动绑定一下
				await upUserLog({},{errtip:false}).then(res=>{
					// #ifdef H5
					sessionStorage.setItem('is_send_usrlog',1)
					// #endif
				},err=>{console.log('error',err)}).catch(e=>{console.log('catch',e)})





				//toast('登录成功', 'success')
				// #ifdef H5
				//微信登录才这么走

				let login_farward_url = ls.get('login_farward_url');

				if(login_farward_url){
					ls.remove('login_farward_url');
					//location.replace(login_farward_url);
					// uni.navigateBack({
					// 	delta: 2
					// });
					// history.go(-2);
					location.href = login_farward_url
					return;
				}else{
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}

				// if(GetQueryByString(location.href,'code')){
				// 	uni.reLaunch({
				// 		url: '/pages/index/index'
				// 	})
				// }else{

				// 	//不是微信登录
				// 	if(history.length>1){
				// 		history.back();
				// 	}else{
				// 		uni.reLaunch({
				// 			url: '/pages/index/index'
				// 		})
				// 	}
				// }
				// location.href = ls.get('login_farward_url');//没办法
				// //alert(history.length);
				// //hack navigateBack无效
				// if(history.length>1){
				// 	history.back();
				//
				// }else{
				// 	uni.switchTab({
				// 		url: '/pages/index/index'
				// 	})
				// }

				return;

				// #endif


				var pages = getCurrentPages();
				console.log('pages is',pages)
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面

				//只有登陆页的话
				if(pages.length<2){
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// })
					// return;
				}

				uni.navigateBack()

				// uni.switchTab({
				// 	url: '/pages/index/index'
				// })
			},
			...mapActions(["getInitData", "setUserInfo"]),

		},
		//  beforeRouteEnter(to, from, next) {
		//  next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
		//    // console.log(from)
		//     vm.setData(from);
		//   })
		// },
		onShow(){

			let uid = ls.get('user_id'),access_token = ls.get('access_token')
			console.log(uid,access_token,666666666666)
			if(uid && access_token){
				history.go(1)
				return;
			}

			//

			// #ifdef H5
			if (isWeiXin()) {


				let code = GetQueryByString(location.href, 'code');
				if (code && !access_token) {
					this.setUserInfo({});
					console.log('code is'+code)
					login({
						login_method: 'wx_mp',
						code: code
					}).then(res => {
						console.log(JSON.stringify(res))
						if(res.errorCode === 0){
							this.loginCall(res.data)
						}
					})
					return;
				}
			}
			// #endif

			// #ifndef H5
			this.setUserInfo({});
			// #endif

			this.initDataFn();

		},
		created() {


		}
	};
</script>

<style scoped lang="scss">
	@import "../../static/css/scssConfig";

	.joinForm{
		background: white;
		width: 500rpx;
		padding: 30rpx;
		text-align: center;
		border-radius: 4px;

	}

	.icon-fanhui {
		padding-right: 10px;
		color: #999;
	}

	.telContent .content {
		height: 400px;
		overflow: auto;
	}

	.editSearchPassword {

		input[type="text"],
		input[type="password"] {
			padding-left: 30%;
			width: 70%;
		}
	}

	.loginSign {
		background: #fff;
		height: 100vh;
		overflow: hidden;
		width: 100vw;

		.topTitle {
			font-size: 27px;
			line-height: 1;
			font-weight: 400;
			margin: 36px 0 0 20px;
		}

		.title {
			position: relative;
			font-size: 16px;
			font-weight: bold;
			line-height: 1;
			text-align: center;
		}

		.prebBtn {
			position: absolute;
			color: #999;
			font-size: 16px;
			left: 0;
			padding: 15px;
			top: 50%;
			transform: translate(-20px, -50%);
		}

		.fillCode {
			.title {
				margin-top: 34px;
			}

			.description {
				color: #999;
				font-size: 14px;
				margin-top: 12px;
				text-align: center;

				span {
					color: $mainColor;
				}
			}

			.code {
				border-bottom: 1px solid #e6e6e6;
				display: block;
				font-size: 30px;
				height: 60px;
				letter-spacing: 10px;
				margin: 0 auto;
				margin-top: 46px;
				padding: 10px 0;
				text-align: center;
				width: 50%;
			}

			.searchNewPass {
				margin: 20px 0px 0;
			}
		}

		.setNewPass {
			margin: 0 20px;

			.title {
				margin-top: 34px;
			}

			.content {
				margin-top: 50px;

				.sendCode {
					margin-top: 32px;
				}
			}
		}

		.searchPassword {
			margin: 0 20px;

			.title {
				margin-top: 34px;
			}

			.content {
				margin-top: 54px;
				overflow: hidden;

				.submitBtn {
					margin-top: 30px;
				}

				.inputLable {
					span {
						color: $mainColor;
						width: 50px;

						// &:after {
						//   @include triangle(3px, 5px, $mainColor, top);
						//   position: absolute;
						//   content: "";
						//   right: 0;
						//   top: 50%;
						//   transform: translateY(-25%);
						// }
					}

					input {
						/*padding-left: 22%;*/
					}
				}
			}
		}

		.phoneContent {
			margin: 0 20px;

			.title {
				margin-top: 34px;
			}

			.content {
				margin-top: 54px;
				overflow: hidden;

				.inputLable {
					span {
						/*padding:10px 0;*/
					}

					input {
						/*padding-left: 22%;*/
					}
				}

				.inputLable:first-child {
					span {
						color: $mainColor;
						width: 50px;

						// &:after {
						//   @include triangle(3px, 5px, $mainColor, top);
						//   position: absolute;
						//   content: "";
						//   right: 0;
						//   top: 50%;
						//   transform: translateY(-25%);
						// }
					}
				}

				.sendCode {
					margin-top: 66px;
				}

				.searchPass {
					color: $mainColor;
					float: right;
					font-size: 12px;
					margin-top: 10px;
				}
			}
		}

		.codeLogin {
			margin: 55px 20px 0;
			overflow: hidden;

			.passwordLogin {
				color: $mainColor;
				float: right;
				font-size: 12px;
				line-height: 50px;
				padding-left: 10px;
			}

			.inputLable {
				span {
					color: $mainColor;
					width: 50px;

					// &:after {
					//   @include triangle(3px, 5px, $mainColor, top);
					//   position: absolute;
					//   content: "";
					//   right: 0;
					//   top: 50%;
					//   transform: translateY(-25%);
					// }
				}

				input {
					/*padding-left: 22%;*/
				}
			}
		}

		.protocol {
			color: #999;
			font-size: 12px;
			margin-top: 20px;
			text-align: center;

			span {
				color: $mainColor;
			}

			p {
				margin-bottom: 0.05rem;
			}
		}

		.otherLogin {
			position: fixed;
			bottom: 60px;
			left: 0;
			text-align: center;
			width: 100%;

			&.mp-weixin {

				.box {

					&:after,
					&:before {
						display: none;
					}
				}

			}

			.box {
				position: relative;
				/*display: inline-block;*/
				/*padding: 0 0.6rem;*/



				&:after,
				&:before {
					position: absolute;
					content: "";
					display: block;
					height: 1px;

					top: 50%;


				}

				&:before {
					background-color: #e6e6e6;
					width: 20%;
					left: -20%;
				}

				&:after {
					background-color: #e6e6e6;
					width: 20%;
					left: 100%;
				}
			}

			.funicon {
				background-color: white;
				color: $weixinColor;
				font-size: 72upx;
				vertical-align: top;
				display: inline-block;
			}
			/* #ifdef APP-PLUS */
			.icon-weixin{
				font-size: 88upx;
			}
			/* #endif */

		}
	}
</style>
