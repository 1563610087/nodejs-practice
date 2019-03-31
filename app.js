const express = require('express');
const path = require('path');
const app = express();
const router = require('./router.js');
const bodyParser = require('body-parser');
const session = require('express-session');


app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));
app.engine('html', require('express-art-template'));
//配置模板引擎渲染的目录，默认的是./views
app.set('views', path.join(__dirname, './views/'));

//配置解析post请求体，一定要在挂载路由之前
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: true  //无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}));


// 把router挂载到app中
app.use(router);


app.listen(3000, function () {
    console.log('running')
});