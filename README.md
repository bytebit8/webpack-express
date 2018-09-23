# webpack-express

## 说明
这是一个基于 Webpack 和 Express 架构的简易前后端通用的项目模版。

## 使用

### 安装依赖
```
npm install
```

### 开发模式

```
npm run dev
```
* 该模式会同时执行 `express` 服务，进行 `webpack`打包监控。当改变了 `server` 目录下后端代码 `nodemon` 会重启 `express`，修改了 `assets` 目录下前端资源，`webpack` 监控自动打包编译。

* 执行完成后，可以访问 `http://127.0.0.1:prot/yourproject` 看到页面。

* 该模式支持热更新。

### 本地模式

```
npm run local
```
* 该模式与开发模式相同，只是将前端的资源打包到本地磁盘。

### 生产模式

```
npm run rel
```
* 该模式用于编译生产环境需要用到的代码。

### 服务模式

```
npm run app
```

* 该模式用于单独启动 `Express` 服务。

## 目录说明

整体目录结构：

```
YourProject

    - assets
        - public
        - view
    - build
    - config
    - dist
        - static
        - root
        - favicon.ico
    - server
        - controllers
        - routers.js

```

**assets**

前端资源存放目录，其中 `view` 目录里面存放了每个具体的页面，而 `public` 目录则是所有目录公用资源存放的位置。

**build**

存放 node服务的启动文件，这里目前存放了 `webpack`的启动文件以及 `express`的启动文件。

**config**

存放 node服务的配置文件，这里目前存放了 `webpack`的配置文件以及 `express`的配置文件和一个日志输出的配置文件。

**dist**

`webpack`打包编译后的前端资源输出目录。
其中　`static` 目录表示存放不打包的前端资源，`root` 保存的登陆回调页面。

**server**

该目录存放后端代码的目录。其中 `controllers` 保存每个功能模块（或者页面模块）的目录。


## 版本说明

> 2018/09/23
> version:v1.0.4
> 1) 优化与调整代码
> 2) 增加了打包完成后在命令行中提示项目的链接（按照 Alt 键并点击连接可直接浏览器打开项目）

> 2018/04/22
> version:v1.0.2
> 1) 设置 webpack-dev-middleware `index:false` 使开发模式访问页面地址必须加上文件名。
> 2) 添加了favicon图标。

> 2018/04/21
> version:v1.0.0
> 1) 将html模版的生成放在了 `dist` 目录中的 `views`。
> 2) 放弃了 `supervisor` 转而采用了 `nodemon`
> 3) 添加了 `express.config.js` 文件，将所有关于`express`的配置都放入其中。
> 3) 添加了 `webpack.config.js` 文件，将所有关于 `webpack`的配置都放入其中。

> 2018/04/20
> version:v0.9
> 1) 通过 `if(moudle.hot){require('index.html')}` 解决了html文件热更新问题。

> 2018/04/18
> version:v0.8
> 1) 使用 `webpack-hot-middleware`进行模块热更新

> 2018/04/15
> version:v0.7
> 1) 通过 `webpack-dev-middleware` 将 `webpack` 作为 `express` 中间件调用。
> 2) 移除了 `concurrently`。

> 2018/04/12
> version:v0.7
> 1) 使用 `concurrently` 同时执行 `express` 与 `webpack`打包服务。

> 2018/04/11
> version:v0.6
> 1) 通过 `__webpack__require.p` 获取资源路径

> 2018/04/10
> version:v0.5
> 1)  将 `static` 目录从 `assets`目录移动到 `dist`目录中，减少webpack的编译时间。
> 2)  使用 `supervisor` 监控并重启 `express` 服务。

> 2018/04/01
> version:v0.4
> 1) 实现`webpack`多页面支持。
> 2) 规范`webpack`的打包提示

> 2018/03/22
> version:v0.3
> 1) 将静态不参与打包的文件放在 `static` 目录中。
> 2) 打包性能优化 resolve,noParse,module-include。

> 2018/03/21
> version:v0.2
> 1) 支持sass,ejs,font,media等文件类型
> 2) 图片或者是字体文件过小的时候直接base64内联到样式中。
> 3) 区分了 dev（开发模式） 与 build（生产模式）。
> 4) css,js 在生产环境下进行压缩混淆。
> 5) 提取公用代码到 vendors中。

> 2018/03/20
> version:v0.1
> 1) 创建项目。
> 2) 添加了`webpack`配置。
> 3) 加入了`express`框架。


## 下个计划

> version:v1.1
> 1) 加入reaact框架。
> 2) 集成脚手架生成，并且定制是否需要react
