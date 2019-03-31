## 多人社区案例

## 1 目录结构

```
app.js
controllers
models
node_modules
package.json
package-lock.json
public
README.md
routers
views
```



## 2 路由设计

| 路径      | 方法 | get参数 | post参数              | 是否需要登陆 | 备注         |
| --------- | ---- | ------- | --------------------- | ------------ | ------------ |
| /         | GET  |         |                       |              | 渲染         |
| /register | GET  |         |                       |              | 渲染注册页面 |
| /register | POST |         | email、name、password |              | 处理注册请求 |
| /login    | GET  |         |                       |              | 渲染登录页面 |
| /login    | POST |         | email、password       |              | 处理登录请求 |
| /logout   | GET  |         |                       |              | 处理退出请求 |

## 3 在express获取表单POST请求数据

在express中没有内置的获取post请求的api，这里采用第三方包body-parser

```shell
npm install --save body-parser
```

配置：

```shell
var express = require('express')

var bodyParser = require('body-parser')

var app =express()
//配置body-parser
//只要加入这个配置，则在req请求对象上会多出来一个属性：body
//也就是说你就可以直接通过req.body来获取别表单post请求体数据
app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
```

## 4 mongodb安装

### 下载（可视化工具mongobooster）

<https://www.mongodb.com/download-center#community> 

### 安装配置环境变量

windows：

此电脑--属性--高级系统设置-环境变量-新建环境变量（把文件bin目录的文件路径复制过来）

### 启动与运行

```shell
启动 mongod
```

在根目录创建data文件夹，在data中创建子文件夹db,否则文件无法启动，会报如下错误

![1552830663726](C:\Users\哈哈\AppData\Local\Temp\1552830663726.png)

如果想要修改默认的数据存储路径，可以：

```shell
mongod --dbpath=数据存储目录路径
```

停止：

```
在开启的数据库ctrl+c即可停止，或者关闭开启服务的控制台
```

连接数据库

```
该命令默认连接本机的mongodb服务
mongo
```

退出：

```
在连接状态输入exit 
```

### 基本命令

`show dbs`

查看所有数据库列表

`db`

查看当前操作的数据库

`use`数据库名字

切换到指定的数据库，如果没有则会创建

**查看数据库数据**

```javascript
db.数据库名字.find()
```

**插入数据**

```
db.COLLECTION_NAME.insert(document)
```

**查询数据**

```
db.collection.find(query, projection)
```

## 5 nodejs操作mongodb

使用第三方包mongoose操作mongodb

安装mongoose`npm install mongoose`

```javascript
var mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/test',{useMongoClient:truue})
mongose.Promise=global.Promise
//设计数据模型
var cat = mongoose.model('cat',{name:String});
//实例化一个数据
var kitty = new cat({name:'Zildjian'});
//持久化保存数据
kitty.save(function(err)){
           if(err){
    console.log(err);
}else{
    console.log('hah')
}
           }
```



## 6 express-session

### 1 安装 npm

### 2 引入app.js文件

### 3 使用session

```javascript
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: true  //无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}));
```

### 4 使用session记录登录状态











### 谷歌浏览器插件

editthiscookie