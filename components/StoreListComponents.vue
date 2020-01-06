<template>
    <div class="bgwhite wrap">
        <view v-show="ifshow" @tap="ableClose" @touchmove.stop.prevent class="popup-layer">

        </view>
        <view ref="popRef" v-show="ifshow" class="popup-content" @tap.stop="stopEvent" :style="_location">
            <div class="text-center component-title">
                选择门店
            </div>
            <div class="label-title">
                <div class="line"></div>
                筛选条件
            </div>
            <div class="row">
                <div class="row-label graytext">地区:</div>
                <div class="row-content">
                    <div class="filter filter-pick">
                        <div class="filter-item">
                            <picker @change="bindProvinceChange" range-key="name" :range="province_list">
                                <div class="uni-input-box">
                                    <view class="uni-input" :class="{has:province.name}">{{province.name||'选择省份'}}
                                    </view>
                                    <view class="funicon icon-xia icon"></view>
                                </div>
                            </picker>
                        </div>
                        <div class="filter-item">

                            <picker @change="bindCityChange" range-key="name" :range="city_list">
                                <div class="uni-input-box">
                                    <view class="uni-input" :class="{has:city.name}">{{city.name||'选择城市'}}</view>
                                    <view class="funicon icon-xia icon"></view>
                                </div>
                            </picker>
                        </div>
                        <div class="filter-item">
                            <picker @change="bindAreaChange" range-key="name" :range="area_list">
                                <div class="uni-input-box">
                                    <view class="uni-input" :class="{has:area.name}">{{area.name||'选择区/县'}}</view>
                                    <view class="funicon icon-xia icon"></view>
                                </div>

                            </picker>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="row-label graytext">门店:</div>
                <div class="row-content">
                    <div style="border: 1px solid #D2D2D2;width:537rpx;height: 50rpx;">
                        <input placeholder="请输入门店名称" v-model="stores_name" class="inputs"/>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <div class="search" @click="loadInfo">搜索</div>
            </div>
            <div class="space-box"></div>
            <div class="label-title" style="justify-content: space-between;">
                <div class="line"></div>
                <div>门店列表</div>
                <div @click="get_user_location" class="graytext font14 flex1 text-right padding10-c"><span
                        class="funicon icon-dingwei font14"></span>离我最近
                </div>
            </div>
            <div class="lists">
                <scroll-view scroll-y="true" class="scroll-Y">
                    <block v-if="stores.length>0">
                        <radio-group @change="radioChange">
                            <label class="item padding10" v-for="(store,idx) in stores" :key="idx">
                                <view class="checkbox">
                                    <radio :value="idx" :checked="index==idx" />
                                </view>
                                <image class="logo" :src="store.Stores_ImgPath|domain"/>
                                <view class="info">
                                    <div class="line10 flex flex-between">
                                        <div class="font14">{{store.Stores_Name}} [{{store.Stores_ID}}]</div>
                                        <div class="distance font12 graytext" v-if="store.distance">
                                            {{store.distance|distanceFn}}km
                                        </div>
                                    </div>
                                    <div class="font12 graytext">
                                        {{store.Stores_Province_name}}{{store.Stores_City_name}}{{store.Stores_Area_name}}{{store.Stores_Address}}
                                    </div>
                                </view>
                            </label>
                        </radio-group>
                    </block>

                    <block v-if="stores.length==0">
                        <div class="graytext padding15 text-center font14">
                            暂时没有合适的店铺
                        </div>
                    </block>


                    <div>

                    </div>
                </scroll-view>
            </div>
            <button size="large" class="subbtn" @click="subFn">确定</button>
            <div style="height: 46px;background: white;"></div>
            <div class="safearea-box2"></div>
        </view>
    </div>
</template>

<script>
    import {getStoreList} from "../common/fetch";
    import {City} from "../common/city";
    import {emptyObject} from "../common/helper";
    import {getLocation} from "../common/tool/location";
    import {error} from "../common";

    export default {
        name: "StoreListComponents",
        data() {
            return {
				index:-1,
                timer: null,
                prod_ids: [],//根据商品筛选门店
                lat: null,
                lng: null,
                select_info: null,
                iftoggle: false,
                stores_name: '',
                province: {},
                province_idx: '',
                city: {},
                city_idx: '',
                area: {},
                area_idx: '',
                province_list: [],
                city_list: [],
                area_list: [],
                stores: [],
                ifshow: false, // 是否展示,
                translateValue: -100, // 位移距离
            }
        },
        props: {
            pageEl: {
                type: Object,
                require: true
            },
            showPop: {
                type: Boolean,
                default: false,
            },
            direction: {
                type: String,
                default: 'bottom', // 方向  top，bottom，left，right
            },
            autoClose: {
                type: Boolean,
                default: true,
            }
        },
        computed: {
            _translate() {
                const transformObj = {
                    'top': `transform:translateY(${-this.translateValue}%)`,
                    'bottom': `transform:translateY(${this.translateValue}%)`,
                    'left': `transform:translateX(${-this.translateValue}%)`,
                    'right': `transform:translateX(${this.translateValue}%)`
                };
                return transformObj[this.direction]
            },
            _location() {
                const positionValue = {
                    'top': 'bottom:0px;width:100%;',
                    'bottom': 'top:0px;width:100%;',
                    'left': 'right:0px;height:100%;',
                    'right': 'left:0px;height:100%;',
                };
                return positionValue[this.direction] + this._translate;
            }
        },
        filters: {
            distanceFn: function (val) {
                if (val) {
                    return parseInt(val * 100 / 1000) / 100
                }

                return val
            }
        },
        methods: {
            radioChange(e) {
                console.log(e)
				this.index=e.detail.value
                this.select_info = this.stores[e.detail.value]
            },
            subFn() {
                if (!this.select_info) {
                    error('门店必选')
                    return;
                }
                this.$emit('callFn', this.select_info)
            },
            async get_user_location() {
                // console.log('让你等就等')
                // await new Promise((resolve, reject) => {
                //     setTimeout(function () {
                //         console.log('等到了')
                //         resolve(false)
                //     },2000)
                // })
                //
                // console.log('没等到就跑了')
                //真实环境不跑下面逻辑，供参考
                //return;
                let localInfo = null;


                let rt = false
                await getLocation(this.pageEl).then(res => {
                    if (res.code === 0) {
                        localInfo = res.data
                        rt = true
                    }
                }).catch(err => {
                    console.log(err)
                    error('获取位置信息失败:' + err.msg)
                })

                console.log('获取到的位置信息', localInfo)

                if (!rt) return;
                this.lat = localInfo.latitude
                this.lng = localInfo.longitude

                this.loadInfo()

            },
            loadInfo(storeId) {
                let postData = {
                    pageSize: 10000,
                    page: 1,
                    province: this.province.id,
                    city: this.city.id,
                    area: this.area.id,
                    stores_name: this.stores_name,
                }


                postData.prod_json = JSON.stringify(this.prod_ids)


                if (this.lat && this.lng) {
                    postData.lat = this.lat
                    postData.lng = this.lng
                }
                getStoreList(emptyObject(postData), {tip: '搜索中', mask: true}).then(res => {

                    this.stores = res.data;
					if(storeId){
						for(let it=0;it<this.stores.length;it++){
							if(this.stores[it].Stores_ID==storeId){
								this.select_info=this.stores[it]
								this.index=it
							}
						}
					}else{
						this.index=-1
						this.select_info={}
					}
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                    // this.stores = this.stores.concat(res.data)
                })
            },
            bindProvinceChange(e) {
                this.province_idx = e.detail.value
                this.province = this.province_list[e.detail.value]

            },
            bindCityChange(e) {
                console.log(e.detail.value)
                this.city_idx = e.detail.value
                this.city = this.city_list[e.detail.value]
            },
            bindAreaChange(e) {
                this.area_idx = e.detail.value
                this.area = this.area_list[e.detail.value]
            },
            stopMove(event) {
                console.log(11);
                console.log(event);
                return;
            },
            show(prod_ids,storeId) {

                if (prod_ids) {
                    this.prod_ids = prod_ids
                } else {
                    this.prod_ids = []
                }

				if(storeId){
					this.loadInfo(storeId)
				}else{
					this.loadInfo()
				}


                console.log('show popup')
                this.ifshow = true;

                let _open = setTimeout(() => {
                    this.translateValue = 0;
                    _open = null;
                }, 100)
                let _toggle = setTimeout(() => {
                    this.iftoggle = true;
                    _toggle = null;
                }, 300);
            },
            close() {
                console.log('close popup')
                if (this.timer !== null || !this.iftoggle) {
                    return;
                }
                this.translateValue = -100;
                this.timer = setTimeout(() => {
                    this.ifshow = false;
                    this.timer = null;
                    this.iftoggle = false;
                    this.$emit('closeCallBack', null);
                    this.$emit('change', false)
                }, 100);
            },
            ableClose() {
                console.log(this.autoClose)
                if (this.autoClose) {
                    this.close();
                }
            },
            stopEvent(event) {
            },
            doSome() {
                console.log(111222111111111);
            }

        },
        watch: {
            getLocationFn() {

            },
            province: {
                handler(val) {
                    this.city_list = City.getCityList(this.province.id)
                    this.city = {};
                    // this.loadInfo()
                }
            },
            city: {
                handler(val) {
                    this.area_list = City.getAreaList(this.province.id, this.city.id)
                    this.area = {};
                    // this.loadInfo()
                }
            },
            area: {
                handler(val) {
                    // this.loadInfo()
                }
            }
        },
        created() {
            this.province_list = City.getProvinceList()

        }
    }
</script>

<style lang="scss" scoped>
    .wrap {
        width: 750rpx;
        background: white;
        overflow-x: hidden;
    }

    .lists {
        .item {
            display: flex;
            align-items: center;

            .logo {
                height: 44px;
                width: 44px;
                border-radius: 50%;
                background-color: #f2f2f2;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;

            }

            .info {
                flex: 1;
                margin-left: 6px;
            }
        }
    }

    .subbtn {
        border-radius: 0;
        height: 46px;
        position: fixed;
        z-index: 3;
        bottom: 0;
        background: #F43131;
        color: white;
        line-height: 46px;
        width: 100%;
    }

    .component-title {
        font-size: 16px;
        padding: 15px 0 5px;
    }

    .label-title {
        padding: 34rpx 0;
        font-size: 14px;
        line-height: 14px;
        display: flex;
        align-items: center;

        .line {
            margin: 0px 10px;
            width: 2px;
            height: 14px;
            background: #F43131;
        }
    }

    .row {
        display: flex;
        align-items: center;
        padding: 0 10px;
        height: 40px;

        .row-label {
            font-size: 14px;
            padding: 0 10px 0 10px;
        }

        .row-content {

            flex: 1;
        }
    }

    .filter {
        display: flex;

        .filter-item {
            flex: 1;
            text-align: center;
        }
    }

    .space-box {
        height: 10px;
        background: #f8f8f8f8;
    }


    .popup-layer {
        position: fixed;
        z-index: 888888;
        background: rgba(0, 0, 0, .5);
        height: 100%;
        width: 100%;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }

    .popup-content {
        position: fixed;
        z-index: 888888;
        background: #FFFFFF;
        transition: all .3s ease;
        overflow: hidden;
        width: 750rpx;
        top: 15%;
        /*border-top-left-radius: 20rpx;*/
        /*border-top-right-radius: 20rpx;*/

    }

    .safearea-box2 {
        height: constant(safe-area-inset-bottom);
        height: env(safe-area-inset-bottom);
        width: 100%;
        background: white;
    }

    .scroll-Y {
        height: 322px;
        padding-bottom: 92px;
        box-sizing: border-box;
    }

    .search {

        padding: 6px 30px;
        display: inline-block;
        text-align: center;
        background: rgba(244, 49, 49, 1);
        color: #FFFFFF;
        font-size: 14px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 32rpx;
        margin-bottom: 30rpx;
    }

    .inputs {
        height: 50rpx;
        line-height: 50rpx;
        font-size: 12px;
        text-align: left;
        padding-left: 10px;
    }

    .filter-pick {
        .filter-item {
            margin-right: 15rpx;
        }
    }

    .uni-input-box {
        border: 1px solid #D2D2D2;
        padding: 0px 18rpx;
        height: 50rpx;
        line-height: 50rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 144rpx;


    }

    .uni-input {
        font-size: 12px;
        color: #BDBDBD;

        &.has {
            color: #666;
        }
    }

    .icon-xia {
        font-size: 14px;
        color: #444;
        margin-left: 2px;
    }
</style>
