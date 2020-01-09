## O2O项目
[项目需求](/doc/coding.md "项目需求")
[编码规范](链接网址 "标题")
[模板装修机制说明](链接网址 "标题")
### 项目需求
---


### 约定
---
1.组件名应该始终是多个单词的，根组件 App 以及 <transition>、<component> 之类的 Vue 内置组件除外。
2.组件文件名始终是大驼峰，不管是单文件（及单个的vue文件的组件)还是利用render渲染的js组件
3.和父组件紧密耦合的子组件应该以父组件名作为前缀命名
```$javascript
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```
4.组件/实例的选项应该有统一的顺序
```text
1.副作用 (触发组件外的影响)
el
2.全局感知 (要求组件以外的知识)
name
parent
3.组件类型 (更改组件的类型)
functional
4.模板修改器 (改变模板的编译方式)
delimiters
comments
5.模板依赖 (模板内使用的资源)
components
directives
filters
6.组合 (向选项里合并属性)
extends
mixins
7.接口 (组件的接口)
inheritAttrs
model
props/propsData
8.本地状态 (本地的响应式属性)
data
computed
9.事件 (通过响应式事件触发的回调)
watch
10.生命周期钩子 (按照它们被调用的顺序)
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
activated
deactivated
beforeDestroy
destroyed
11.非响应式的属性 (不依赖响应系统的实例属性)
methods
12.渲染 (组件输出的声明式描述)
template/render
renderError
```
5.总是用 key 配合 v-for。
6.避免 v-if 和 v-for 用在一起
7.为组件样式设置作用域 <style scope lang="xx"></style>
8.组件中自定义私有属性使用 $_ 前缀
9.dom中组件都使用kebab-case。
```javascript
<my-component></my-component>
```
10.组件名应该倾向于完整单词而不是缩写
反例
```javascript
components/
|- SdSettings.vue
|- UProfOpts.vue
```
好例子
```javascript
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```
11.prop 的定义应该尽量详细，至少需要指定其类型。在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。
```javascript
props: {
  greetingText: String
}
```
```html
<WelcomeMessage greeting-text="hi"/>
```
12.多个特性的元素应该分多行撰写，每个特性一行。
反例
```javascript
<MyComponent foo="a" bar="b" baz="c"/>
```
好例子
```javascript
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```
13.组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
```html
<div class="">
{{
    fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
}}
</div>
```
好例子
```html
<!-- 在模板中 -->
{{ normalizedFullName }}
```
```javascript
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```
14.应该把复杂计算属性分割为尽可能多的更简单的属性。
反例
```javascript
computed: {
  price: function () {
    var basePrice = this.manufactureCost / (1 - this.profitMargin)
    return (
      basePrice -
      basePrice * (this.discountPercent || 0)
    )
  }
}
```
好例子
```javascript
computed: {
  basePrice: function () {
    return this.manufactureCost / (1 - this.profitMargin)
  },
  discount: function () {
    return this.basePrice * (this.discountPercent || 0)
  },
  finalPrice: function () {
    return this.basePrice - this.discount
  }
}
```
15.元素特征的推荐顺序
```text
定义 (提供组件的选项)
is
列表渲染 (创建多个变化的相同元素)
v-for
条件渲染 (元素是否渲染/显示)
v-if
v-else-if
v-else
v-show
v-cloak
渲染方式 (改变元素的渲染方式)
v-pre
v-once
全局感知 (需要超越组件的知识)
id
唯一的特性 (需要唯一值的特性)
ref
key
双向绑定 (把绑定和事件结合起来)
v-model
其它特性 (所有普通的绑定或未绑定的特性)
事件 (组件事件监听器)
v-on
内容 (覆写元素的内容)
v-html
v-text
```
16.CSS书写顺序
```text
1.位置属性(position, top, right, z-index, display, float等)
2.大小(width, height, padding, margin)
3.文字系列(font, line-height, letter-spacing, color- text-align等)
4.背景(background, border等)
5.其他(animation, transition等)
```

### 技术更新
---
1.停用已经不在维护的vue-resource,改用axios(所有接口调用方式不变)
2.fetch统一放在api文件夹下，按文件区分（避免单个fetch文件太长太乱)
3.权限校验 && 菜单
4.菜单






### 模板装修机制说明
---
#### 数据跨组件共享同步机制梳理 2019.9.29

Common.class.js
```
//activeIndex 来记录页面

//tabs组件如果选择在顶部和左边，样式会不一样
//组件类的基类指向了vue根实例，并且绑定好了$store到vuex实例。
Search.prototype.vm = Vue; 
```

SearchComponents
```
//实例的this.可以便捷调用组件中的data和方法以及ref
Search.prototype.funvm = this;


//1.这里的this.data是ajax获取的之前保存的数据或者拖拽组件用Search类生成的默认数据
//2.另外data是通过深拷贝给searchObj,所以后面data就没用用了。
//3.这里的searchObj和this.search的指向是相同的，所以改一个另一个会改动，但是searchObj在其他地方没有使用过了。

let searchObj = new Search();
this.search = deepCopy(searchObj, this.data);

//Plugins组件被拖拽进Preview的时候，会自动点击一下这个wrap,导致触发setData方法，利用vuex改变activeAttr，同时右侧setAttr组件所有行为都于active.attrData关联，达到了组件拖拽好右侧就自动显示该组件的配置相关内容。

<div @click.stop="setData({}, 0)" class="search wrap"></div>
setData(item, index) {
    //用vuex跨组件
    this.$store.commit('activeAttr', this.search);
    this.$store.commit('tabIndex', this.index);
}
```


Preview
```
//数据流程一致，即可以从setAttr->vuex->preview(templateData)。
//到preview不是为了改变样式，而是为了数据同步而已，提交直接从vuex中读取tmplData。
```

Search.js
```
//因为数据从Preview利用:data传递到各个预览组件中，但是只有在created的时候用了一下props的data组件外，其他地方就没用过了。

//所以需要修改任何东西，都只能在Search.js里面来搞定了(另外setAttr里面的change方法也直接操作Vuex中的数据)。


//因为写在Search.js里面的改动，就等于是SearchComponents.vue组件中的this.search变量在变动


//比如this.config.style =2 即在SearchComponents.vue组件中的this.search.config = 2(其实就是this.search是Search.js的一个实例)



//优点是逻辑集中维护，不用小心意料之外的东西
//缺点是Search.js需要维护的逻辑有点多
```




备注
```
1.如果发现组件的简单值样式没有生效，是组件的config或者value属性里面没有申明属性，导致vue无法感知到数据变化（而简单值无需走editCB这种妖艳的操作)

```

cube组件额外说明
```
1.数据保存后，再重新渲染
2.修改属性后，页面上下边距不动，只动左右间距
3.(划重点)setAttr页面的currentData这个变量，如果在拖拽组件没有修改的情况下，会导致依赖组件.js中依赖this的方法，会有错误的this指向。
```



