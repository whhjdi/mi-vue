# shop-vue

## 前端

基于 vue 全家桶实现的移动端商城，使用 Easy-mock 生成模拟数据

使用 vue 插件（axios）,全部使用 async/await 语法

本项目包括首页，分类页，购物车，地址管理，订单管理，用户中心，登录注册等页面

## 后端

[koa2-login](https://github.com/whhjdi/koa2-login)
使用 koa2 实现登录注册的逻辑，其中前端使用 MD5 加密，后端使用 bcrypt 进行加盐加密

由于 heroku 使用 mlab（mongodb） 需要绑定信用卡，所以后端未部署，登录注册暂时使用模拟数据

### 使用

```node
node index.js

//前端部分需要更改现在的登录逻辑（src/views/Login.vue中的login函数），把[//模拟的登录注册]
之下的注释掉，把[//使用自己写的登录注册]取消注释
```

## Project setup

```
yarn install
yarn run serve
yarn run build
yarn run test
yarn run lint
```

See [Configuration Reference](https://cli.vuejs.org/config/).
