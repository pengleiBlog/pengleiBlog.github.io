---
layout: doc
---


# ECMAScript 介绍



## 关于ECMAScript

- `ECMAScript` 和 `JavaScript` 的关系是，前者是后者的规范制定，后者是前者的一种实现
- `ES6` 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）,`ES6` 的地方，一般是指 `ES2015` 标准
> `ES6` 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。[ES2015官方说明](https://262.ecma-international.org/6.0/)

## 其他一些名称解释

- [TC39](https://tc39.es/):全称 **「Technical Committee 39」** 译为 **「第39号技术委员会」**，是 `Ecma` 组织架构中的一部分。是负责迭代和发展 `ECMAScript` 语言规范的委员会。

- [ECMA-262](https://tc39.es/ecma262/):`ECMA-262` 就是 `ECMA 262` 号标准，具体就是指 `ECMAScript` 遵照的标准.

- [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/):`ECMAScript®国际化API`规范。

- [ECMA-414](https://www.ecma-international.org/publications-and-standards/standards/ecma-414/):定义了一组ES规范套件的标准.

- [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/):定义了JSON数据交换的语法；

更多可参考官方 [TC39](https://www.ecma-international.org/technical-committees/tc39/)

## ECMAScript 2022(ES13)

1. 声明类的字段：类字段可以在类的顶层被定义和初始化

以前字段定义和初始化在构造函数中进行，现在不用了
```js
class Point {
   name;
   title;
   test = 1;
}
```
2. 私有方法和字段：用`#`前缀来定义类的私有方法和字段

```js
class Person {
   myName;
   #age=1;
   get age(){
       return #age;
   }
  #initValue(){
      this.myName = "liming";
      this.#age = "18";
  }
 }

```
```js
new Person().age //1
```
如果 `getAge` 去掉
```js
new Person().age //undefined
```

3. 类的静态公共方法和字段：增加了静态公共字段、静态私有方法和静态私有字段的特性

```js
class Enum {
  static collectStaticFields() {
    // Static methods are not enumerable and thus ignored
    this.enumKeys = Object.keys(this);
  }
}
class ColorEnum extends Enum {
  static red = Symbol('red');
  static green = Symbol('green');
  static blue = Symbol('blue');
  static _ = this.collectStaticFields(); // (A)

  static logColors() {
    for (const enumKey of this.enumKeys) { // (B)
      console.log(enumKey);
    }
  }
}
ColorEnum.logColors();//输出结果red  green blue

class ColorFinder {
  static #red = "#ff0000";
  static #green = "#00ff00";
  static #blue = "#0000ff";
  
  static colorName(name) {
    switch (name) {
      case "red": return ColorFinder.#red;
      case "blue": return ColorFinder.#blue;
      case "green": return ColorFinder.#green;
      default: throw new RangeError("unknown color");
    }
  }
  
  // Somehow use colorName
}
```

4. `ECMScript` 类静态初始化块：在类声明/定义期间评估静态初始化代码块，可以访问类的私有字段

该规范就提供了一种在类声明/定义期间评估静态初始化代码块的优雅方法，可以访问类的私有字段。
比如 我需要在初始化期间使用 `try…catch`来捕获异
```js
class ColorFinder {
    static #red = "#ff0000";
    static #green = "#00ff00";
    static #blue = "#0000ff";
    try {

    } catch {

    } 
    
} 
//这样写浏览器会报Uncaught SyntaxError: Unexpected token '{'
```
我们可以使用 `static`包裹一下
```js
class ColorFinder {
    static #red = "#ff0000";
    static #green = "#00ff00";
    static #blue = "#0000ff";
    static {
        try {

    } catch {

    } 
    }
} 
```
类静态块提供对词法范围的私有字段和方法的特权访问。这里需要在具有实例私有字段的类和同一范围内的函数之间共享信息的情况下很有用。

``` js
let getData; 
class Person {
    #x 
    constructor(x) {
        this.#x = { data: x };
    }
    static {
        getData = (obj) => obj.#x;
    }
    } 
    function readPrivateData(obj){
        return getData(obj).data; 
     } 
     const john = new Person([2,4,6,8]);
     readPrivateData(john); // Array(4) [ 2, 4, 6, 8 ]
```

5. 检测私有字段：可以使用`in`操作符，如果指定的属性/字段在指定的对象/类中，则返回真，能判断私有字段

```js
class Person {
    #age;
   static hasAge(person){
      return #age in person;
    }
 }
 Person.hasAge(new Person())//20:12:58.492 true
 Person.hasAge( Person)// false
```
6. 正则匹配索引：该提案提供了一个新的`/d`flag，以获得关于输入字符串中每个匹配的开始和索引位置结束的额外信息

由于 `/d` 标识的存在，`matchDict`还有一个属性`.indices`，它用来记录捕获的每个值的编号组
```js
const matchDict = /(t+)(b+)/d.exec('tttbb');
console.log(matchDict) //打印结果['tttbb', 'ttt', 'bb', index: 0, input: 'tttbb', groups: undefined, indices: Array(3)]
//indices的值为: [[0, 5],[0, 3],[3, 5]]
```
7. 在所有内置的可索引数据上新增`.at()`方法
`at()` 是一个数组方法，用于通过给定索引来获取数组元素。当给定索引为正时，这种新方法与使用括号表示法访问具有相同的行为。当给出负整数索引时，就会从数组的最后一项开始检索.同时也可检索字符串。
``` js
const  ary = [1,2,3,4,5]
const str = "12345"
console.log(ary.at(0),str.at(0))
console.log(ary.at(-1),str.at(-1))
//打印结果： 1 '1' 5 '5'
```
8. `Object.hasOwn(object, property)`：使用 `Object.hasOwn` 替误的原因代 `Object.prototype.hasOwnProperty.call`
```js
const person = {name: 'xiaoming'}
console.log(Object.prototype.hasOwnProperty.call(person, 'name')) // true

console.log(Object.hasOwn(person, 'name')) // true
```
9. `Error Cause`：为了便捷的传递导致错
新的规范中 `new Error`可以指定错误信息了
```js
function readTest(test) {
    return filePaths.map((filePath) => {
        try {
            // ···
        } catch (error) {
            throw new Error(`While  ${test}`,{cause: error});
            }
        }); 
    } 

```
10. 顶层Await

在`ES2017`中，引入了`async` 函数和 `await` 关键字，以简化 `Promise` 的使用，但是 await 关键字只能在 async 函数内部使用。尝试在异步函数之外使用 await 就会报错：`SyntaxError - SyntaxError: await is only valid in async function。`

顶层 `await` 允许我们在 `async` 函数外面使用 `await` 关键字。它允许模块充当大型异步函数，通过顶层 `await`，这些 `ECMAScript `模块可以等待资源加载。这样其他导入这些模块的模块在执行代码之前要等待资源加载完再去执行。
可以用来动态加载模块，资源初始化。我们现在可以像下面这样写：

```
const setting = await import(``); 
```

## ECMAScript 2021(ES12)

1. 新增 [String.prototype.replaceAll](https://262.ecma-international.org/12.0/#sec-string.prototype.replaceall)
调用此方法 将会返回新的字符串，所有符合匹配规则的字符都将被替换掉
```js
const test = '12312'
test.replaceAll('1','') //'232'
```
2. [Promise.any()](https://262.ecma-international.org/12.0/#sec-promise.any)
`Promise.any(`) 接收一个Promise可迭代对象，只要其中的一个 `promise`请求 成功，就返回那个已经成功的 `promise` 。如果没有一个 promise 成功就返回一个失败的 promise.这里就不做代码演示了

3. 新增逻辑赋值操作符： `??=`、`&&=`、 `||=`
```js
// 等同于 a = a || b
a ||= b;
// 等同于 a = a && b
a &&= b;
// 等同于 a = a ?? b
a ??= b;
```
4. [WeakRef](https://262.ecma-international.org/12.0/#sec-weak-ref-objects) 创建一个弱引用对象

```js
// anyObject 不会因为 被ref 引用了这个对象，而不会被垃圾回收
let ref = new WeakRef(anyObject);
// 如果obj获取引用的对象 ，则 obj 就会是 undefined
let obj = ref.deref();

```
5. 下划线 (_) 分隔符
```js
const x = 1_0000_0000//等价于 100000000
```
6. Intl.ListFormat
`Intl.ListFormat` 是一个构造函数，用来处理和多语言相关的对象格式化操作
```js
const list = ['Apple', 'Orange', 'Banana']
new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);
// 结果为 "Apple, Orange and Banana"
new Intl.ListFormat('zh-cn', { style: 'short', type: 'conjunction' }).format(list);
//  结果为 "Apple、Orange和Banana"
```
7. `Intl.DateTimeFormat API` 中的 新增`dateStyle` 和 `timeStyle` 的配置项
```js
let a = new Intl.DateTimeFormat("en" , {
  timeStyle: "short"
});
console.log('a = ', a.format(Date.now())); 
let b = new Intl.DateTimeFormat("en" , {
  dateStyle: "short"
});
console.log('b = ', b.format(Date.now())); 
// 可以通过同时传入 timeStyle 和 dateStyle 这两个参数来获取更完整的格式化时间的字符串
let c = new Intl.DateTimeFormat("en" , {
  timeStyle: "medium",
  dateStyle: "short"
});
console.log('c = ', c.format(Date.now())); 
//结果为：a =  10:27 PM  b =  10/8/22 c =  10/8/22, 10:27:23 
```

## ECMAScript 2020(ES11)
1. 动态 `import ()`：按需导入
2. 空值合并运算符`：`表达式在 `??` 的左侧 运算符求值为`undefined`或`null`，返回其右侧
3. 可选链接：`?.`用户检测不确定的中间节点
4. `BigInt：`新基本数据类型，表示任意精度的整数
5. `globalThis`：浏览器：window、worker：self、node：global
6. `Promise.allSettled`：返回一个在所有给定的promise已被决议或被拒绝后决议的`promise`，并带有一个对象数组，每个对象表示对应的promise结果
7. `for-in` 结构：用于规范`for-in`语句的遍历顺序

**对`ES11`感兴趣的话 可参考[具体实例代码](https://zhuanlan.zhihu.com/p/427112259**)**

## ECMAScript 2019(ES10)
1. `Array.flat(`)和`Array.flatMap()`：数组展平
2. `String.trimStart()`和`String.trimEnd()`：去掉开头结尾空格文本
3. `String.prototype.matchAll`：为所有匹配的匹配对象返回一个迭代器
4. `Symbol.prototype.description`：只读属性，回 Symbol 对象的可选描述的字符串
5. `Object.fromEntries()`：返回一个给定对象自身可枚举属性的键值对数组
6. 可选` Catch`
7. `JSON Superset` 超集
8. `超集JSON.stringify()` 加强格式转化
9. `Array.prototype.sort()` 更加稳定
10. `Function.prototype.toString()` 重新修订

**对`ES10`感兴趣的话 可参考[具体实例代码](https://zhuanlan.zhihu.com/p/427753233)**



## ECMAScript 2018(ES9)
1. 异步迭代：`await`可以和`for...of`循环一起使用以串行的方式运行异步操作
2. `Promise.finally()`：逻辑只可以放在一个地方
3. `Rest/Spread 属性`允许我们将一个剩余参数表示为一个数组
4. 正则表达式命名捕获组：允许命名捕获组使用符号`?<name`>`
5. 正则表达式反向断言(lookbehind)
6. 正则表达式`dotAll`模式：正则表达式中点.匹配除回车外的任何单字符，标记s改变这种行为，允许行终止符的出现
7. 正则表达式 `Unicode` 转义:`Unicode` 属性转义形式为`\p{...}`和`\P{...} `

**对`ES9`感兴趣的话 可参考[具体实例代码](https://zhuanlan.zhihu.com/p/427844745)**

## ECMAScript 2017(ES8)
1. `async/await`: 异步终极解决方案
2. `Object.values()`
3. `Object.entries()`
4. `String padding`：`String.prototype.padStart`、`String.prototype.padEnd`
5. 函数参数列表结尾允许逗号
6. `Object.getOwnPropertyDescriptors()`: 获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象
7. `SharedArrayBuffe`r 对象：用来表示一个通用的，固定长度的原始二进制数据缓冲区Atomics 对象：提供了一组静态方法用来对` SharedArrayBuffer` 对象进行原子操作

**对`ES8`感兴趣的话 可参考[具体实例代码](https://zhuanlan.zhihu.com/p/427869322)**

## ECMAScript 2016(ES7)
1. Array.prototype.includes()
```js
[1,2].includes(1)//true
```
2. 指数操作符 **
```
2**10 //1024
```

## ECMAScript 2015(ES6)
1. `let`和`const`
2. 类（class）
3. 模块化(ES Module)
4. 箭头（Arrow）函数
5. 函数参数默认值
6. 模板字符串
7. 解构赋值
8. 延展操作符 ... 
9. 对象属性简写
10. Promise

更多详情强烈建议参考啊:[ECMAScript 6 入门](https://es6.ruanyifeng.com/)

## 官方地址导航

- [ECMAScript® Language Specification – ECMAScript 最新正式版（已发布的最新文档）](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- [ECMAScript® Language Specification – ECMAScript 最新修订版（当年准备发布的文档）](https://tc39.es/ecma262/)
- [2016年开始已经完成的提案,官方github地址](https://github.com/tc39/proposals/blob/main/finished-proposals.md)
-  [当前所有ECMAScript提案相关](https://github.com/tc39/ecma262)
- [TC39官方说明](https://www.ecma-international.org/technical-committees/tc39/)

## 其他推荐
- [ECMAScript 浏览器兼容性在线查询](http://kangax.github.io/compat-table/es6/)