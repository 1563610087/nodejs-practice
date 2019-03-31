const express = require('express');
const router = express.Router();
const User = require('./model/user.js');
//数据库的加密
const md5 = require('blueimp-md5');

router.get('/', function (req, res) {

    res.render('index.html',{
        user:req.session.user
    })
});
router.get('/login', function (req, res) {
    res.render('login.html');
});
router.post('/login', function (req, res) {
    //1 获取表单数据
    //2 查询数据库用户名密码是否正确
    //3 发送响应数据
    var body = req.body;
    User.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function(err,user){
        if (err){
            return res.status(500).json({
                err_code:500,
                message:err.message
            })
        }

        if (!user) {
            return res.status(200).json({
                err_code:0,
                message:'email or password is invalid'
            })
        }
        //用户存在，登录成功，通过session记录登录状态
        req.session.user=user;
        res.status(200).json({
            err_code:0,
            message:'ok'
        })
    })
});
router.get('/register', function (req, res) {
    res.render('register.html')
});
router.post('/register', function (req, res) {
    // 1. 获取表单提交的数据
    //    req.body
    // 2. 操作数据库
    //    判断改用户是否存在
    //    如果已存在，不允许注册
    //    如果不存在，注册新建用户
    // 3. 发送响应
    let body = req.body;
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            //express提供了一个响应方法：json
            //该方法接受一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
        //账号已存在
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者密码已存在'
            })
        }

        //对密码进行MD5重复加密
        body.password = md5(md5(body.password));
        //账号不存在，则保存数据
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: '服务端错误'
                })
            }
            //注册成功，使用session记录用户的登录状态
            req.session.user=user;


            res.status(200).json({
                err_code: 0,
                message: 'ok'
            });
            // 服务端重定向只针对同步请求才有效，异步请求无效
            // res.redirect('/');

        })
    });

});
router.get('/logout', function (req, res) {
    //清除登录状态
    req.session.user=null;
    //重定向到登陆页
    res.redirect('/login')
});
module.exports = router;