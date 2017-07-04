var express=require('express');
var router=express.Router();

//用户的逻辑代码 控制器
var userCtrl=require('../controller/userCtrl.js');

router
  .get('/register',userCtrl.getRegisterPage)//访问注册页面
  .get('/login',userCtrl.getLoginPage) //访问登录页面
  .post('/register',userCtrl.registerNewUser) //注册用户
  .post('/login',userCtrl.login)  //用户登录
  .get('/logout',userCtrl.logout) //注销登录

module.exports=router;