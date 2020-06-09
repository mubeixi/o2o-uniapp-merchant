<template>
  <div @click="commonClick" class="wrap">
    <wzw-im-tip ref="wzwImTip"></wzw-im-tip>
    <view @click="goSearch" class="search-wrap">
      <icon class="search_icon" size="34rpx" type="search" />
      <input class="search-input" name="search" placeholder="请输入商品关键词" placeholder-style="font-size:26rpx;color:#ADADAD;"
             type="text">
    </view>
    <view :style="'height:'+height+'px'" class="page-body">
      <scroll-view :scroll-top="scrollLeftTop" :style="'height:'+height+'px'" class="nav-left" scroll-with-animation
                   scroll-y>
        <view :class="index==categoryActive?'active':''" :key="index" @click="categoryClickMain(index)"
              class="nav-left-item"
              v-for="(item,index) in classifyData">
          <view class="leftBac" style="position: absolute;"></view>
          {{item.Category_Name}}
        </view>
      </scroll-view>
      <scroll-view :style="'height:'+height+'px'" class="nav-right" scroll-with-animation scroll-y v-if="is_has_child">
        <view :key="index" class="box" v-for="(first,index) in classifyData">
          <block v-if="categoryActive === index">
            <block :key="j" v-for="(second,j) in first.child">
              
              <!--<block v-if="is_has_child(classifyData)">-->
              <block v-if="j==0">
                <view class="imgTop" v-if="first.Category_Img">
                  <img :src="first.Category_Img" class="imgs">
                </view>
              </block>
              <view class="titles">
                <view class="titleSum">{{second.Category_Name}}</view>
                <!-- 	<view class="gengduo">查看更多></view> -->
              </view>
              <view :id="i==0?'first':''" :key="i" @click="cart(item)" class="nav-right-item"
                    v-for="(item,i) in second.child">
                <image :src="item.Category_Img" />
                <view class="nav-right-txt">{{item.Category_Name}}</view>
              </view>
              
              <!--</block>-->
              
              <!--<block v-else>-->
              
              <!--<block v-if="j==0">-->
              <!--<view class="titles">-->
              <!--<view class="titleSum">{{first.Category_Name}}</view>-->
              <!--&lt;!&ndash; 	<view class="gengduo">查看更多></view> &ndash;&gt;-->
              <!--</view>-->
              <!--<view v-if="first.Category_Img" class="imgTop">-->
              <!--<img  class="imgs" :src="first.Category_Img">-->
              <!--</view>-->
              <!--</block>-->
              
              <!--<view :id="j==0?'first':''" class="nav-right-item"  @click="cart(second)">-->
              <!--<image :src="second.Category_Img" />-->
              <!--<view class="nav-right-txt">{{second.Category_Name}}</view>-->
              <!--</view>-->
              <!--</block>-->
            
            </block>
            
            <!--<view class="bottomBorder">-->
            
            <!--</view>-->
          </block>
        
        </view>
      </scroll-view>
      <scroll-view :scroll-top="scrollTop" :style="'height:'+height+'px'" @scroll="scroll" class="nav-right" scroll-with-animation
                   scroll-y v-if="!is_has_child">
        <view :key="index" class="box" v-for="(foods,index) in classifyData">
          <view class="titles">
            <view class="titleSum">{{classifyData[index].Category_Name}}</view>
            <!-- 	<view class="gengduo">查看更多></view> -->
          </view>
          <view class="imgTop" v-if="foods.Category_Img">
            <img :src="foods.Category_Img" class="imgs">
          </view>
          <view :id="i==0?'first':''" :key="i" @click="cart(item)" class="nav-right-item"
                v-for="(item,i) in foods.child">
            <image :src="item.Category_Img" />
            <view class="nav-right-txt">{{item.Category_Name}}</view>
          </view>
          <view class="bottomBorder">
          </view>
        </view>
      </scroll-view>
    </view>
  </div>
</template>

<script>
import BaseMixin from '@/mixins/BaseMixin'
import { getProductCategory } from '@/api/product'
import WzwImTip from '@/componets/wzw-im-tip/wzw-im-tip'

export default {
  name: 'ProductClassify',
  components: { WzwImTip },
  mixins: [BaseMixin],
  data () {
    return {
      name: 'wkiwi',
      height: 0,
      categoryActive: 0,
      scrollTop: 0,
      scrollLeftTop: 0,
      scrollHeight: 0,
      classifyData: '',
      arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672, 7017], // 初始值，后边计算会根据手机适配覆盖
      leftItemHeight: 51, // 49行会计算出新值进行覆盖
      navLeftHeight: 0, // 左边scroll-view 内层nav的总高度
      diff: 0, // 左边scroll-view 内层nav的总高度与视口之差
      tabBarHeight: 50,// 如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
    }
  },
  computed: {
    easy_list () {
      var arr = []
      if (_.isArray(this.classifyData) && this.classifyData.length > 0) {
        plainArray(this.classifyData, 'child', arr)
      }
      return arr
    },
    is_has_child () {
      let rt = false
      for (const cate of this.easy_list) {
        if (cate.level === 2) {
          rt = true
          break
        }
      }
      
      return rt
    },
  },
  methods: {
    goSearch () {
      uni.navigateTo({
        url: '/pages/product/search',
      })
    },
    getList () {
      getProductCategory().then(res => {
        this.classifyData = res.data
        this.$nextTick(() => {
          this.getHeightList()
        })
      }).catch(e => {
      })
    },
    getHeightList () {
      const _this = this
      const selectorQuery = uni.createSelectorQuery()
      selectorQuery.selectAll('.nav-left-item').boundingClientRect(function (rects) {
        if (rects.length > 0) {
          _this.leftItemHeight = rects[0].height
        }
        // _this.leftItemHeight  =  rects[0].height;
        _this.navLeftHeight = _this.leftItemHeight * _this.classifyData.length
        _this.diff = _this.navLeftHeight - _this.height
      })
      selectorQuery.selectAll('.box').boundingClientRect(function (rects) {
        const arr = [0]
        let top = 0
        rects.forEach(function (rect) {
          top += rect.height
          arr.push(top)
        })
        _this.arr = arr
      }).exec()
    },
    scroll (e) {
      const _this = this
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = setTimeout(function () { // 节流
        _this.scrollHeight = e.detail.scrollTop + 1// + _this.height/2;//+ _this.height/2;
        // +1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
        // 若想使切换参考线为屏幕顶部请删除 _this.height/2
        for (let i = 0; i < _this.arr.length; i++) {
          const height1 = _this.arr[i]
          const height2 = _this.arr[i + 1]
          if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
            _this.categoryActive = i;
            (_this.diff > 0) && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff) / (_this.classifyData.length - 1)))
            return false
          }
        }
        _this.categoryActive = 0
        _this.timeoutId = undefined
      }, 10)
    },
    categoryClickMain (index) {
      this.categoryActive = index
      // this.scrollTop = 0;
      this.scrollTop === this.arr[index] ? this.scrollTop = this.scrollTop + 1 : this.scrollTop = this.arr[index]// 防止两次相等造成点击不触发滚动时间
    },
    cart (item) {
      uni.navigateTo({
        url: '/pages/classify/result?Cate_ID=' + item.Category_ID,
      })
    },
  },
  onLoad: function () {
    this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight
  },
  onReady () {
    this.getHeightList()
  },
  created () {
    // 如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中
    // this.$nextTick(()=>{
    // 	this.getHeightList();
    // })
    this.getList()
  },
}
</script>
<style scoped>

</style>
