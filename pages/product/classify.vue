<template>
  <div class="wrap">
    <view class="search-wrap" @click="goSearch">
      <icon type="search" size="34rpx" class="search_icon" />
      <input type="text" class="search-input" name="search" placeholder="请输入商品关键词"
             placeholder-style="font-size:26rpx;color:#ADADAD;">
    </view>
    <view class="page-body" :style="'height:'+height+'px'">
      <scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'" :scroll-top="scrollLeftTop"
                   scroll-with-animation>
        <view class="nav-left-item" @click="categoryClickMain(index)" :key="index"
              :class="index==categoryActive?'active':''"
              v-for="(item,index) in classifyData">
          <view class="leftBac" style="position: absolute;"></view>
          {{item.Category_Name}}
        </view>
      </scroll-view>
      <scroll-view v-if="is_has_child" class="nav-right" scroll-y :style="'height:'+height+'px'" scroll-with-animation>
        <view v-for="(first,index) in classifyData" :key="index" class="box">
          <block v-if="categoryActive == index">
            <block v-for="(second,j) in first.child" :key="j">

              <!--<block v-if="is_has_child(classifyData)">-->
              <block v-if="j==0">
                <view v-if="first.Category_Img" class="imgTop">
                  <img class="imgs" :src="first.Category_Img">
                </view>
              </block>
              <view class="titles">
                <view class="titleSum">{{second.Category_Name}}</view>
                <!-- 	<view class="gengduo">查看更多></view> -->
              </view>
              <view :id="i==0?'first':''" class="nav-right-item" v-for="(item,i) in second.child" :key="i"
                    @click="cart(item)">
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
      <scroll-view v-if="!is_has_child" class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll"
                   :style="'height:'+height+'px'" scroll-with-animation>
        <view v-for="(foods,index) in classifyData" :key="index" class="box">
          <view class="titles">
            <view class="titleSum">{{classifyData[index].Category_Name}}</view>
            <!-- 	<view class="gengduo">查看更多></view> -->
          </view>
          <view v-if="foods.Category_Img" class="imgTop">
            <img class="imgs" :src="foods.Category_Img">
          </view>
          <view :id="i==0?'first':''" class="nav-right-item" v-for="(item,i) in foods.child" :key="i"
                @click="cart(item)">
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
import {
  getProductCategory
} from '@/api/product'

export default {
  name: 'ProductClassify',
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
      tabBarHeight: 50// 如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
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
        if (cate.level == 2) {
          rt = true
          break
        }
      }

      return rt
    }
  },
  methods: {
    goSearch () {
      uni.navigateTo({
        url: '/pages/product/search'
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
      this.scrollTop == this.arr[index] ? this.scrollTop = this.scrollTop + 1 : this.scrollTop = this.arr[index]// 防止两次相等造成点击不触发滚动时间
    },
    cart (item) {
      uni.navigateTo({
        url: '/pages/classify/result?Cate_ID=' + item.Category_ID
      })
    }
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
  }
}
</script>
<style scoped>

</style>
