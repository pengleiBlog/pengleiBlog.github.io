const myNav = require('./nav.js')
const mySidebar = require('./sidebar.js')

module.exports = {
    title: '笨鸟先飞',
    titleTemplate: "临川慕容吹雪的博客",
    description: '临川慕容吹雪自我成长路',
    lastUpdated: true, //开启上次更新时间
    lang: 'zh-CN',
    head:[
      ["link", { rel: "icon", href: "/stupidBird.png" }],//设置标签页图标
      ["meta", { property: "og:title", content: "临川慕容吹雪博客" }],
      ["meta", { property: "og:site_name", content: "临川慕容吹雪博客" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:description", content: "临川慕容吹雪博客" }],
      ["meta", { property: "og:url", content: "https://gitee.com/pengleiUser" }]
    ],
    markdown: {
      lineNumbers: true
    },
    //自定义主题
    themeConfig: {
    siteTitle: "小彭自我成长之路",
    logo: "/stupidBird.png",
    outline:'deep',
    outlineTitle: '快速导航',
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
   //导航栏
    nav:myNav,
    //侧边栏
    sidebar:mySidebar,
    socialLinks: [
      { icon: "github", link: "https://gitee.com/pengleiUser" },
    ],
     //页脚
     footer: {
      copyright: "Copyright © 2022-present 小彭",
    },
  }
  }