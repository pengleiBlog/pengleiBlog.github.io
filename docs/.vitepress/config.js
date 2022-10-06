module.exports = {
    title: '笨鸟先飞',
    titleTemplate: "临川慕容吹雪的博客",
    description: '临川慕容吹雪自我成长路',
    lastUpdated: true, //开启上次更新时间
    
    head:[
      ["link", { rel: "icon", href: "/stupidBird.png" }],//设置标签页图标
      ["meta", { property: "og:title", content: "临川慕容吹雪博客" }],
      ["meta", { property: "og:site_name", content: "临川慕容吹雪博客" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:description", content: "前端教程" }],
      ["meta", { property: "og:url", content: "https://gitee.com/pengleiUser" }]
    ],
    //自定义主题
    themeConfig: {
    siteTitle: "小彭自我成长之路",
    logo: "/stupidBird.png",
  
    markdown: {
      theme: "nord",
    },
   
    nav: [
      {
        text: "前端",
        items: [
          { text: "HTML", link: "/frontend/HTML/" },
          { text: "CSS", link: "/frontend/CSS/" },
          { text: "JavaScript", link: "/frontend/JavaScript/" },
          { text: "TypeScript", link: "/frontend/TypeScript/" },
          { text: "前端框架", link: "/frontend/Frame/" },
        ],
      },
      { text: "后端相关", link: "/backEnd/" },
      { text: "其他学习", link: "/other/" },
    ],
    //侧边栏
    sidebar: {
      "/frontend/HTML": [
        {
          text: "HTML",
          // collapsible: true,
          items: [
            { text: "test", link: "/frontend/HTML/" },
            { text: "test", link: "/frontend/HTML/" },
          ],
        },
        {
          text: "HTML5",
          // collapsible: true,
          items: [
            {
              text: "HTML5test",
              link: "/frontend/HTML/",
            },
          ],
        }
      ],
      "/frontend/CSS": [
        {
          text: "CSS",
          // collapsible: true,
          items: [
            { text: "test", link: "/frontend/CSS/" },
            { text: "test", link: "/frontend/CSS/" },
          ],
        },
        {
          text: "CSS",
          // collapsible: true,
          items: [
            {
              text: "TypeScript test",
              link: "/frontend/CSS/",
            },
          ],
        }
      ],
      "/frontend/JavaScript": [
        {
          text: "JavaScript",
          // collapsible: true,
          items: [
            { text: "test", link: "/frontend/JavaScript/" },
            { text: "test", link: "/frontend/JavaScript/" },
          ],
        },
        {
          text: "JavaScript",
          // collapsible: true,
          items: [
            {
              text: "JavaScript test",
              link: "/frontend/JavaScript/",
            },
          ],
        }
      ],
      "/frontend/TypeScript": [
        {
          text: "TypeScript",
          // collapsible: true,
          items: [
            { text: "test", link: "/frontend/TypeScript/" },
            { text: "test", link: "/frontend/TypeScript/" },
          ],
        },
        {
          text: "TypeScript",
          // collapsible: true,
          items: [
            {
              text: "TypeScript test",
              link: "/frontend/TypeScript/",
            },
          ],
        }
      ],
      "/frontend/Frame": [
        {
          text: "Frame",
          // collapsible: true,
          items: [
            { text: "test", link: "/frontend/Frame/" },
            { text: "test", link: "/frontend/Frame/" },
          ],
        },
        {
          text: "Frame",
          // collapsible: true,
          items: [
            {
              text: "Frame test",
              link: "/frontend/Frame/",
            },
          ],
        }
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://gitee.com/pengleiUser" },
    ],
     //页脚
     footer: {
      copyright: "Copyright © 2022-present 小彭",
    },
  }
  }