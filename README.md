### Use Dva to build netease-music simply
### 使用Dva快速构建一个网易云音乐

感谢 @lilongllong 的网易云项目
https://github.com/lilongllong/netease-music-react
> 基于重构该项目来完成此项目

### 技术
- Dva
- Roadhog
- React
- Redux

项目根目录下执行`npm start` 启动项目后会自动打开窗口`localhost:8000`

修改端口
```
set PORT=3000 && npm start
```
详细的项目配置和管理请看`roadhog`官方文档`

### Dockerfile
拥有Dockerfile可将项目部署到云平台，例如DaoCloud，或其他云平台  
该项目线上地址：
http://suncg-dva-netease-music.daoapp.io

### 主要设计
最主要的设计是`src/models`下的文件，`player.js, search.js, user.js`，它们的model,
构成store的结构。在Redux devtool中能详细查看









