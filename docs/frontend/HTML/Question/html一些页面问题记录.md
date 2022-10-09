# 踩坑记录
## input text和div不对齐
`input`是一个行内替换元素，行内元素其默认的对其方式为`baseline`
 `div`是一个块级别元素,默认的display属性值为block
 设置`div`的`display`属性值为`inline-block`,那么这个元素将以行内元素的方式显示，将和其左右兄弟行内元素节点或display:inline-block的块级元素显示在一行中
`display:inline-block`的块级元素的`baseline`的位置为`div`元素的底部外边距
`input`元素的`baseline`为其中文字的`baseline`而不是整个`input`元素的`baseline`,和`display:inline-block`的div元素以`baseline`的方式在垂直方向上对齐`
 

参考:
[input text和div不对齐](https://segmentfault.com/q/1010000007643948?_ea=1442926)


## flex布局踩坑小记

**flex-basis属性之0px与0%的差异.可能会导致页面不能滚动。当时测试给我反馈说iOS页面不能滚动，安卓端是好的，我排查了好久。**

如果一个元素的 `flex-basis`属性 的值为百分数，且它父级元素（flex容器）
    在主轴方向上的尺寸没有被显式设置，
    此时 `flex-basis` 的值会被解析为 `content`。
    即此种情况下，0% 呈现的结果会与 0px 不同。
    `content` 值会根据flex子项的内容
    （指flex子项的子元素尺寸）来计算实际尺寸，
    多数情况下效果与 `max-content` 值一致，
    就是说`flex`子项的子元素
    有多长其主轴初始值就有多长。
    尽量不要写`flex：1`

>元素 .menu-container（它是flex子项）的样式 flex: 1 是个简写，对应的完整值为 flex: 1 1 0%，即它其中的 flex-basis 为 0%，又因为父元素 .main-container（它是flex容器）没有设置 height 属性，所以 0% 这个百分比数值被解析为了 content，导致（在主轴方向上）.menu-container 里的子元素有多长，它就会被撑开多长。
修复的方式是再往 .menu-container 上设置 flex-basis: 0px（或者将 flex 属性重写为 flex: 1 1 0px;）。使其主轴方向上的初始尺寸变为固定的 0px。此时 .main-container flex容器内若还有未分配的剩余空间，再加上 flex-grow: 1 (flex: 1 1 0% 中的第一个值)这个条件， 那它最终的实际尺寸就是：.main-container 的尺寸 - 100px（.logo的flex-basis: 100px）后得到的剩余空间。此时内部菜单项再怎么增多变长也不会把 .menu-container 的肚子撑大。

更详细可参考 [CSS flex布局踩坑小记：flex-basis属性之0px与0%的差异](https://blog.csdn.net/u010951953/article/details/124145786)

## 日期隐式转换问题

这种写法在iOS端和火狐浏览器上测试过是不行的。至于为啥要写上面一大串，我也很疑惑当初写一行代码的问题

```js
new Date(new Date(new Date().toLocaleDateString()) + 24 * 60 * 60 * 1000)
```
可以这样写,并且注意兼容性日期格式也需要将`yyyy-MM-dd hh:mm:ss` 转换成 `yyyy/MM/dd hh:mm:ss`

```js
new Date(new Date().toLocaleDateString().getTime() + 24 * 60 * 60 * 1000)
```