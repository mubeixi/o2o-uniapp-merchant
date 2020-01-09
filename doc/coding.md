### 编码规范
---
1. 组件名应该始终是多个单词的，根组件 App 以及 <transition>、<component> 之类的 Vue 内置组件除外。
2. 组件文件名始终是大驼峰，不管是单文件（及单个的vue文件的组件)还是利用render渲染的js组件
3. 和父组件紧密耦合的子组件应该以父组件名作为前缀命名
``` javascript
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```
4. 组件/实例的选项应该有统一的顺序<br/>  
```
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
5. 总是用 key 配合 v-for。
6. 避免 v-if 和 v-for 用在一起
7. 为组件样式设置作用域 <style scope lang="xx"></style>
8. 组件中自定义私有属性使用 $_ 前缀
9. dom中组件都使用kebab-case。<br/>
``` javascript
<my-component></my-component>
```
10. 组件名应该倾向于完整单词而不是缩写
反例<br/>
```javascript
components/
|- SdSettings.vue
|- UProfOpts.vue
```
好例子
``` javascript
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```
11. prop 的定义应该尽量详细，至少需要指定其类型。在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。
```javascript
props: {
  greetingText: String
}
```
```html
<WelcomeMessage greeting-text="hi"/>
```
12. 多个特性的元素应该分多行撰写，每个特性一行。
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
13. 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。  
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
14. 应该把复杂计算属性分割为尽可能多的更简单的属性。
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
15. 元素特征的推荐顺序
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
16. CSS书写顺序
```text
1.位置属性(position, top, right, z-index, display, float等)
2.大小(width, height, padding, margin)
3.文字系列(font, line-height, letter-spacing, color- text-align等)
4.背景(background, border等)
5.其他(animation, transition等)
```



