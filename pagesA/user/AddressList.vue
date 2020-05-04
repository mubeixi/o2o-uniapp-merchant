<template>
  
  <view class="myall">
    <radio-group @change="radioChange" class="radio-group">
      <label :class="!check_flag ? 'no-redio' : ''" :key="idx" class="radio-item" v-for="(item,idx) in addresslist">
        <radio style="transform: scale(0.8)" class="radio-ele" :checked="item.Address_ID === check_address_id"
               :disabled="!check_flag" :value="idx" color="#F43131" v-if="check_flag" />
        <view class="flex-main fz-12">
          <view class='flex-top'>
            <view class='name'>收货人：{{item.Address_Name}}</view>
            <view class='pho'>{{item.Address_Mobile}}</view>
          </view>
          <view class='flex-add'>收货地址：{{item.Address_Province_name}} {{item.Address_City_name}}
            {{item.Address_Area_name}}
            <block v-if="item.Address_Town_name">{{item.Address_Town_name}}</block>
            {{item.Address_Detailed}}
          </view>
          <view class='flex-add default' v-if="item.Address_Is_Default === 1">默认地址</view>
        </view>
        <view class="flex-action">
          <layout-icon @click="deladdress(item.Address_ID)" class="m-b-6" size="20" color="#999"
                       type="iconshanchu"></layout-icon>
          <layout-icon @click="addressAddEdit(item.Address_ID)" size="20" color="#999" type="iconbianji"></layout-icon>
        </view>
      </label>
    </radio-group>
    
    <view style='height:82rpx;'></view>
    <view @click="addressAddEdit('a')" class='tianjia flex flex-vertical-c'>
      <view class='jia_img'>
        <layout-icon color="#f43131" size="18" type="iconadd"></layout-icon>
      </view>
      <text>新增个人地址</text>
      <view class='go_img'>
        <layout-icon size="16" type="iconicon-arrow-right"></layout-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { delAddress, getAddressList } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import LayoutIcon from '@/componets/layout-icon/layout-icon'

export default {
  mixins: [BaseMixin],
  components: { LayoutIcon },
  data () {
    return {
      addresslist: [],
      del_address_id: 0, // 存储删除收货地址id
      check_address_id: 0, // 选择的ID
      check_flag: false, // 选则框是否展示  来自会员中心->收货地址 则不展示  来自提交订单->选择收货地址 则显示
      from_page: '', // 来源页面  checkout(需设置checkout页面的back_address_id)、会员中心(不需操作)
    }
  },
  methods: {
    // 选择地址
    radioChange: function (e) {
      const idx = e.detail.value // 选择的地址ID
      const addressInfo = this.addresslist[idx]
      
      // 其他地方有用到的地方，就自己{address_id}，一样用的。。
      uni.$emit('bind_select_address', addressInfo)
      // 返回上一页
      uni.navigateBack({
        delta: 1,
      })
      // return
      // if (this.from_page === 'checkout') {
      //   var pages = getCurrentPages() // 获取页面堆栈
      //   var prevPage = pages[pages.length - 2] // 上一页
      //   prevPage.setData({
      //     back_address_id: address_id
      //   })
      //   // #ifdef APP-PLUS
      //   prevPage.$getAppWebview().back_address_id = address_id
      //   // #endif
      // }
      // if (this.from_page === 'jifen') {
      //   var pages = getCurrentPages() // 获取页面堆栈
      //   var prevPage = pages[pages.length - 2] // 上一页
      //   prevPage.setData({
      //     address_id: address_id
      //   })
      // }
    },
    
    // 删除收获地址
    deladdress: function (id) {
      const that = this
      let del_address_id = id
      uni.showModal({
        title: '提示',
        content: '确定要删除此收货地址吗？',
        success: function (res) {
          if (res.confirm) {
            if (del_address_id) {
              delAddress({ Address_ID: del_address_id }).then(res => {
                // 更新收货地址列表
                const addresslist = that.addresslist
                for (const i in addresslist) {
                  if (addresslist[i].Address_ID === del_address_id) {
                    addresslist.splice(i, 1)
                  }
                }
                // 重置删除收货地址id
                that.addresslist = addresslist
                del_address_id = 0
                
                uni.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000,
                })
              })
            } else {
              uni.showModal({
                title: '错误',
                content: '收货地址id获取失败',
                showCancel: false,
              })
            }
          }
        },
      })
    },
    
    // 添加收货地址
    addressAddEdit: function (id) {
      // 判断是添加还是编辑
      let address_id
      if (id !== 'a') {
        address_id = id
      }
      
      uni.navigateTo({
        url: '/pagesA/user/EditAddress?from=addresslist' + (address_id ? '&addressid=' + address_id : ''),
      })
    },
    
    // 获取收货地址列表
    getAddressList: function () {
      getAddressList({}).then(res => {
        const addresslist = res.data
        this.addresslist = addresslist
      }).catch(() => {
      })
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 有addressid 地址选择  来自订单提交->选择收货地址
    if (options.addressid) {
      this.check_address_id = options.addressid
      this.check_flag = true
    }
    // 页面来源
    if (options.from) {
      this.from_page = options.from
      if (options.from === 'jifen') {
        this.check_flag = true
      }
    }
  },
  onShow () {
    this.getAddressList()
  },
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  .radio-item {
    width: 750 rpx;
    padding: 20 rpx 0;
    overflow: hidden;
    display: flex;
    flex-flow: row;
    align-items: center;
    border-bottom: 15 rpx #f4f4f4 solid;
  }
  
  .radio-item .radio-ele {
    width: 80 rpx;
    text-align: center;
  }
  
  .flex-main {
    flex: 1;
    color: #666;
    line-height: 36 rpx;
    display: flex;
    flex-flow: column;
  }
  
  .flex-main .flex-top {
    display: flex;
    flex-flow: row;
    margin-bottom: 10 rpx;
  }
  
  .flex-main .flex-top .name {
    width: 65%;
  }
  
  .flex-main .flex-top .pho {
    width: 35%;
    text-align: right;
  }
  
  .flex-main .flex-add {
    width: 100%;
    line-height: 36 rpx;
    overflow: hidden;
  }
  
  .flex-main .flex-add.default {
    color: #ff0000;
    margin-top: 10 rpx;
  }
  
  .flex-action {
    padding: 0 30 rpx;
    display: flex;
    flex-flow: column;
    text-align: center;
  }
  
  .flex-action image {
    width: 46 rpx;
    height: 46 rpx;
    margin-left: 37 rpx;
  }
  
  .flex-action image:nth-child(1) {
    margin-bottom: 20 rpx;
  }
  
  /* 没有选择框样式 */
  .radio.no-redio .flex-main {
    width: 86%;
    padding: 0 3%;
  }
  
  .tianjia {
    color: #666;
    line-height: 40 rpx;
    font-size: 28 rpx;
    width: 710 rpx;
    position: fixed;
    bottom: 0;
    z-index: 5;
    padding: 20 rpx;
    border-top: 1px #f4f4f4 solid;
    background: #fff;
  }
  
  .tianjia view.jia_img image {
    width: 40 rpx;
    height: 40 rpx;
  }
  
  .tianjia view.go_img image {
    width: 40 rpx;
    height: 40 rpx;
  }
  
  .go_img {
    margin-left: auto;
  }
  
  .tianjia text {
    width: 200 rpx;
    float: left;
    margin-left: 10 rpx;
  }
</style>
