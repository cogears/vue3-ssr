# @cogears/vue3-ssr
vue3项目模板，支持服务端渲染

### 目录结构
```
- public                        独立静态资源目录
- src
  |-- api                       业务接口目录
  |-- common                    公共库目录
  |-- store                     数据模块目录
  |-- views                     视图模块目录
  |     |-- components          UI通用组件目录
  |     |-- layouts             页面布局结构目录
  |     |-- routes              页面路由目录
  |     |     |-- home          首页
  |     |     |-- about         关于我们
  |     |-- styles              公共样式表
  |     |-- Root.vue            视图根节点
  |-- Application.ts            应用渲染基础类
  |-- config.ts                 配置
  |-- entry-client.ts           客户端渲染入口
  |-- entry_server.ts           服务端渲染入口
- server.js                     服务端启动文件
```