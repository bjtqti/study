# 使用koa+react实现同构的例子

## 安装 
  使用yarn 或 npm 安装
  ```sh
	 npm install 或 yarn install
  ```

## 使用

  ```sh
	npm run release 构建服务端的代码
	npm run dist 构建客户端代码
	npm start 启动
  ```
  http://localhost:3000/index 

## 说明
  node 环境基于v8.10.0, webpack基于v3.x.x
  本实例重点在于演示服务器端和客户端的同构原理,对于热替换，单向数据流等则需要自行扩展。
  在基于接口开发的前后端分离过程中，同构可以有效的解决SEO的问题，以及优化首屏渲染的速度。