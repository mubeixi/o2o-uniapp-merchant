<template>
  <view class="bgColor-white">
    
    <input class="v_input" placeholder="修改用户名" type="text" v-if="type === 0" v-model="userInfo.User_Name" />
    <input class="v_input" placeholder="修改昵称" type="text" v-if="type === 1" v-model="userInfo.User_NickName" />
    <block v-if="type === 2">
      <view class="area-item">
        <text class="area-label">请选择生日</text>
        <picker @change="bindDateChange" mode="date">
          <view class="uni-input" v-if="dateValue">{{dateValue}}</view>
          <view class="uni-input" v-if="!dateValue">请选择出生时间</view>
        </picker>
      </view>
    </block>
    <input class="v_input" placeholder="修改邮箱" type="text" v-if="type === 3" v-model="userInfo.User_Email" />
    <block v-if="type === 4">
      
      
      <wzw-address :area="selectAreaId[2]" :city="selectAreaId[1]" :province="selectAreaId[0]" :town="selectAreaId[3]"
                   @up="updateAddress" class="address m-l-10 flex flex-vertical-center" ref="address">
      </wzw-address>
      <view @click="$openPop('address')" class="area-item">
        <text class="area-label">地址</text>
        <div class="area-text">
          {{selectArea?selectArea:'请选择地址'}}
        </div>
      </view>
      <view class="area-item">
        <text class="area-label">详细地址</text>
        <input placeholder="请输入详细地址" type="text" v-model="User_Address" />
      </view>
    </block>
    <view @click="save" class="save">保存</view>
  </view>
</template>

<script>
import { getUserInfo, updateUserInfo } from '@/api/customer'
import BaseMixin from '@/mixins/BaseMixin'
import { mapActions } from 'vuex'
import { error } from '@/common/fun'
import WzwAddress from '@/componets/wzw-address/wzw-address'

export default {
  mixins: [BaseMixin],
  components: { WzwAddress },
  data () {
    return {
      dateValue: '',
      type: 0,
      userInfo: {},
      selectArea: '',//选择的地址
      User_Address: '',
      selectAreaId: [],
    }
  },
  computed: {},
  methods: {
    ...mapActions({
      setUserInfo: 'user/setUserInfo',
    }),
    updateAddress (data) {
      //data.str  data.id []
      this.selectArea = data.str
      this.selectAreaId = data.id
    },
    bindDateChange (e) {
      this.dateValue = e.target.value
    },
    saveAddress () {
      if (this.selectAreaId.length <= 1) {
        uni.showToast({
          title: '请选择地址',
          icon: 'none',
        })
        return
      }
      updateUserInfo({
        User_Province: this.selectAreaId[0],
        User_City: this.selectAreaId[1],
        User_Area: this.selectAreaId[2],
        User_Tow: this.selectAreaId[3],
        User_Address: this.User_Address,
      }).then(res => {
        this.userInfo.User_Province = res.data.User_Province
        this.userInfo.User_City = res.data.User_City
        this.userInfo.User_Area = res.data.User_Area
        this.userInfo.User_Tow = res.data.User_Tow
        this.userInfo.User_Address = res.data.User_Address
        uni.showToast({
          title: '修改成功',
        })
        this.setUserInfo(this.userInfo)
        setTimeout(() => {
          this.$back()
        }, 1500)
      }).catch(e => {
        error(e.msg)
        this.loading = false
      })
    },
    save () {
      if (this.type === 4) {
        this.saveAddress()
        return
      }
      
      if (this.loading) return
      if (this.type === 0) {
        if (!this.userInfo.User_Name) {
          uni.showToast({
            title: '请输入用户名',
            icon: 'none',
          })
          return
        }
      }
      if (this.type === 1) {
        if (!this.userInfo.User_NickName) {
          uni.showToast({
            title: '请输入昵称',
            icon: 'none',
          })
          return
        }
      }
      if (this.type === 3) {
        if (!this.userInfo.User_Email) {
          uni.showToast({
            title: '请输入邮箱',
            icon: 'none',
          })
          return
        }
      }
      if (this.type === 2) {
        if (!this.dateValue) {
          uni.showToast({
            title: '请填写生日',
            icon: 'none',
          })
          return
        }
        
        let that = this
        uni.showModal({
          title: '提示',
          content: '生日信息一旦修改，不可再次更改',
          success: function (res) {
            if (res.confirm) {
              that.loading = true
              updateUserInfo({
                User_Name: that.userInfo.User_Name,
                User_NickName: that.userInfo.User_NickName,
                User_Email: that.userInfo.User_Email,
                User_Birthday: that.dateValue,
              }).then(res => {
                that.userInfo.User_Name = res.data.User_Name
                that.userInfo.User_NickName = res.data.User_NickName
                that.userInfo.User_Email = res.data.User_Email
                that.userInfo.User_Birthday = res.data.User_Birthday
                that.dateValue = res.data.User_Birthday
                uni.showToast({
                  title: '修改成功',
                })
                that.setUserInfo(that.userInfo)
                setTimeout(() => {
                  this.$back()
                }, 1500)
              }).catch(e => {
                error(e.msg)
                that.loading = false
              })
              
            } else if (res.cancel) {
              return
            }
          },
        })
        return
      }
      this.loading = true
      updateUserInfo({
        User_Name: this.userInfo.User_Name,
        User_NickName: this.userInfo.User_NickName,
        User_Email: this.userInfo.User_Email,
      }).then(res => {
        this.userInfo.User_Name = res.data.User_Name
        this.userInfo.User_NickName = res.data.User_NickName
        this.userInfo.User_Email = res.data.User_Email
        this.dateValue = res.data.User_Birthday
        uni.showToast({
          title: '修改成功',
        })
        this.setUserInfo(this.userInfo)
        setTimeout(() => {
          this.$back()
        }, 1500)
      }).catch(e => {
        error(e.msg)
        this.loading = false
      })
      
    },
    //修改名字
    getTitle () {
      switch (this.type) {
        case '0' :
          this.title = '修改用户名'
          break
        case '1' :
          this.title = '修改昵称'
          break
        case '3' :
          this.title = '修改邮箱'
          break
        case '4' :
          this.title = '修改地址'
          break
      }
      
      uni.setNavigationBarTitle({
        title: this.title,
      })
    },
    async init () {
      this.userInfo = await getUserInfo({}, {
        onlyData: true,
        tip: '加载中',
      }).catch(e => {
        error(e.msg || '获取信息失败')
      })
      
      this.dateValue = this.userInfo.User_Birthday
      this.User_Address = this.userInfo.User_Address
      this.selectArea = this.userInfo.User_Province_name + this.userInfo.User_City_name + this.userInfo.User_Area_name + this.userInfo.User_Tow_name
      if (this.userInfo.User_Province) {
        this.selectAreaId.push(Number(this.userInfo.User_Province))
        this.selectAreaId.push(Number(this.userInfo.User_City))
        this.selectAreaId.push(Number(this.userInfo.User_Area))
        this.selectAreaId.push(Number(this.userInfo.User_Tow))
      }
      
    },
  },
  onLoad (option) {
    if (option.type) {
      this.type = parseInt(option.type)
      this.getTitle()
    } else {
      this.$back()
    }
  },
  onShow () {
    this.init()
  },
  
}
</script>

<style lang="scss" scoped>
  .bgColor-white {
    height: 100vh;
    padding-top: 20px;
    box-sizing: border-box;
  }
  
  .v_input {
    border: 1px solid #efefef;
    width: 90%;
    margin: 0 auto;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 30rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
  }
  
  .save {
    height: 80rpx;
    width: 90%;
    line-height: 80rpx;
    color: #fff;
    background: #F43131;
    margin: 40rpx auto;
    text-align: center;
    border-radius: 10rpx;
  }
  
  .area-item {
    display: flex;
    align-items: center;
    padding: 30rpx 20rpx;
    border-bottom: 1px solid #e3e3e3;
    font-size: 28rpx;
    
    .area-label {
      display: inline-block;
      width: 180rpx;
      margin-right: 10rpx;
    }
  }
  
  .picker {
    display: flex;
    
    .p_item {
      flex: 1;
      // text-align: center;
    }
  }
  
  .area-text {
    width: 600rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
