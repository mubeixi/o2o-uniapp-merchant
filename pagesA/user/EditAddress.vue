<template>
  <view @click="commonClick" class="myall">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <form report-submit="true">
      <view class='xinxi'>
        <text class="text">收货人</text>
        <input class="input" maxlength='20' name="Address_Name" placeholder="请输入收货人姓名" type="text"
               v-model="MyAddress.Address_Name" />
      </view>
      <view class='xinxi'>
        <text class="text">联系电话</text>
        <input class="input" maxlength="11" name="Address_Mobile" placeholder="请输入联系电话" type="number"
               v-model="MyAddress.Address_Mobile" />
      </view>
      <view @click="$openPop('address')" class="area-item">
        <text class="area-label">地址</text>
        <div class="area-text">
          {{selectArea?selectArea:'请选择地址'}}
        </div>
      </view>
      <view class='xinxi'>
        <text class="text">详细地址</text>
        <input class="input" maxlength='30' name="Address_Detailed" placeholder="请输入详细地址" type="text"
               v-model="MyAddress.Address_Detailed" />
      </view>
      
      <wzw-address :area="selectAreaId[2]" :city="selectAreaId[1]" :province="selectAreaId[0]" :town="selectAreaId[3]"
                   @up="updateAddress" class="address m-l-10 flex flex-vertical-center" ref="address">
      </wzw-address>
      
      <view class='xinxi set_default'>
        <checkbox-group @change="changeCheck" name="Address_Is_Default">
          <label class="checkbox label">
            <checkbox :checked="MyAddress.Address_Is_Default === 1" class="checkbox" value="1" />
            设置默认地址
          </label>
        </checkbox-group>
      </view>
      
      <button @click="formSubmit" class="tianjia-btn">确定</button>
    </form>
  </view>
</template>

<script>

import BaseMixin from '@/mixins/BaseMixin'
import { addAddress, editAddress, getAddressList } from '@/api/customer'
import WzwAddress from '@/componets/wzw-address/wzw-address'
import { regPhone } from '@/common/Regs'
import { error, toast } from '@/common/fun'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  mixins: [BaseMixin],
  components: {
    WzwImTip,
    WzwAddress,
  },
  data () {
    return {
      Address_ID: '',//是否是编辑还是新增
      is_first_add: false,   //是否为该用户要添加的第一条收货地址
      MyAddress: {},
      selectArea: '',
      selectAreaId: [],
    }
  },
  methods: {
    changeCheck (e) {
      let values = e.detail.value
      console.log(values, 'ss')
      if (values.length > 0) {
        this.is_first_add = true
        return
      }
      this.is_first_add = false
    },
    async formSubmit () {
      
      if (!this.MyAddress.Address_Name) {
        uni.showToast({
          title: '请输入收货人名称',
          icon: 'none',
        })
        return false
      }
      if (!this.MyAddress.Address_Mobile) {
        uni.showToast({
          title: '请输入收货人电话',
          icon: 'none',
        })
        return
      } else if (!regPhone.test(this.MyAddress.Address_Mobile)) {
        uni.showModal({
          title: '提示',
          content: '请输入正确的电话号码',
          showCancel: false,
        })
        return
      }
      
      if (!this.MyAddress.Address_Detailed) {
        uni.showToast({
          title: '请填写详细的地址',
          icon: 'none',
        })
        return
      }
      if (this.selectAreaId.length < 1) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none',
        })
        return
      }
      let data = {
        Address_Name: this.MyAddress.Address_Name,
        Address_Mobile: this.MyAddress.Address_Mobile,
        Address_Detailed: this.MyAddress.Address_Detailed,
        Address_Province: this.selectAreaId[0],
        Address_City: this.selectAreaId[1],
        Address_Area: this.selectAreaId[2],
        Address_Town: this.selectAreaId[3],
      }
      if (this.is_first_add) {
        data.Address_Is_Default = 1
      }
      
      let that = this
      if (this.Address_ID) {
        data.Address_ID = this.Address_ID
        let edit = await editAddress(data, { tip: '修改中' }).catch(e => {
          throw error(e.msg || '修改失败')
        })
        toast('修改成功')
        setTimeout(function () {
          that.$back()
        }, 1000)
      } else {
        let edit = await addAddress(data, { tip: '修改中' }).catch(e => {
          throw error(e.msg || '修改失败')
        })
        toast('新增成功')
        setTimeout(function () {
          that.$back()
        }, 1000)
      }
      
    },
    updateAddress (data) {
      this.selectArea = data.str
      this.selectAreaId = data.id
    },
    async load () {
      let arr = await getAddressList({ Address_ID: this.Address_ID }, {
        onlyData: true,
        tip: '加载中',
      }).catch(e => {
        throw  error(e.msg || '获取收货地址失败')
      })
      this.MyAddress = arr[0]
      this.selectArea = this.MyAddress.Address_Province_name + this.MyAddress.Address_City_name + this.MyAddress.Address_Area_name + this.MyAddress.Address_Town_name
      this.selectAreaId.push(Number(this.MyAddress.Address_Province))
      this.selectAreaId.push(Number(this.MyAddress.Address_City))
      this.selectAreaId.push(Number(this.MyAddress.Address_Area))
      this.selectAreaId.push(Number(this.MyAddress.Address_Town))
      this.MyAddress.Address_Is_Default === 1 ? this.is_first_add = true : ''
    },
  },
  onLoad: function (options) {
    //设置标题
    uni.setNavigationBarTitle({
      title: options.addressid ? '编辑收货地址' : '新增收货地址',
    })
    //有addressid 地址编辑
    if (options.addressid) {
      this.Address_ID = options.addressid
      this.load()
    }
    
  },
  
}
</script>

<style lang="scss" scoped>
  .myall {
    background-color: #FFFFFF !important;
    min-height: 100vh;
  }
  
  div, view {
    box-sizing: content-box;
  }
  
  .xinxi {
    width: 710rpx;
    padding: 0 20rpx;
    border-bottom: 1px #f4f4f4 solid;
    overflow: hidden;
    margin-bottom: 20rpx;
  }
  
  .xinxi .text {
    float: left;
    width: 140rpx;
    font-size: 28rpx;
    line-height: 90rpx;
  }
  
  .xinxi .input {
    width: 570rpx;
    float: left;
    font-size: 28rpx;
    line-height: 90rpx;
    height: 90rpx;
  }
  
  .tianjia-btn {
    width: 710rpx;
    margin: 50rpx 20rpx 20rpx;
    color: #fff;
    background: #F43131;
    border-radius: 8rpx;
  }
  
  .dizhi {
    width: 710rpx;
    padding: 0 20rpx;
    border-bottom: 1px #f4f4f4 solid;
    overflow: hidden;
    margin-bottom: 20rpx;
  }
  
  .dizhi, .xiangzhen {
    width: 710rpx;
    padding: 0 20rpx;
    border-bottom: 1px #f4f4f4 solid;
    overflow: hidden;
    margin-bottom: 20rpx;
  }
  
  .xiangzhen .text {
    float: left;
    width: 140rpx;
    font-size: 28rpx;
    line-height: 90rpx;
  }
  
  .dizhi .text {
    float: left;
    width: 140rpx;
    font-size: 28rpx;
    line-height: 90rpx;
  }
  
  .dizhi .input {
    width: 180rpx;
    float: left;
    font-size: 28rpx;
    line-height: 90rpx;
    height: 90rpx;
    margin-right: 10rpx;
  }
  
  .picker .view {
    width: 180rpx;
    float: left;
    font-size: 28rpx;
    line-height: 90rpx;
    height: 90rpx;
    margin-right: 10rpx;
  }
  
  
  .set_default {
    border-bottom: none;
  }
  
  .set_default .label {
    font-size: 28rpx;
  }
  
  .set_default .label .checkbox {
    transform: scale(.7);
    position: relative;
    top: -2px;
  }
  
  .area-item {
    display: flex;
    align-items: center;
    padding: 30rpx 20rpx;
    border-bottom: 1px solid #f4f4f4;
    font-size: 28rpx;
    
    .area-label {
      display: inline-block;
      width: 140rpx;
      margin-right: 10rpx;
    }
  }
  
  .area-text {
    width: 600rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
