var md5=require('blueimp-md5');
var common=require('../common.js');

var UserModel=require('../model/userModel.js')

module.exports={
    getRegisterPage(req,res){//访问注册页面
      res.render('./user/register');
    },
    getLoginPage(req,res){ //访问登录页面
      res.render('./user/login');
    },
    registerNewUser(req,res){//注册新用户
      var newuser=req.body;
      UserModel.sync()
        .then(()=>{
          return UserModel.count({
            where:{
              username:newuser.username
            }
          })
        })
        .then((count)=>{
          if(count===0){
            //加盐加密
            newuser.password=md5(newuser.password,common.pwdSalt);
            //可以注册了
            return UserModel.create(newuser);
          }
          return null;
        })
        .then((result)=>{
          if(result===null){
            res.json({
              err_code:1,
              msg:'此用户已被注册，请更换用户名'
            });
          }else{//注册成功
            res.json({
              err_code:0
            })
          }
        })
    },
    login(req,res){//用户登录
      var loginUser=req.body;
      // 由于 MD5有一个特点，只要加密之前的字符串一致，那么加密的结果也是一致的
      loginUser.password=md5(loginUser.password,common.pwdSalt);

      UserModel.sync()
        .then(()=>{//第一个then的作用指定的用户名和密码，查找对应的用户数据
          return UserModel.findOne({
            where:{
              username:loginUser.username,
              password:loginUser.password
            }
          })
        })
        .then((result)=>{//如果findOne找到了对应的数据则返回一个数据对象，否则没找到，返回null
           if(result===null){
             res.json({//登录失败
               err_code:1,
               msg:'用户名或密码错误'
             });
           }else{//登录成功
             //将登录成功的状态保存到req.session上
              req.session.islogin=true;
              //将登录人的信息对象，保存到req.session上
              req.session.user=result;

              console.log(req.session);
              //返回给客户端的登录信息
              res.json({
                err_code:0
              })
           }
        })
    },
    logout(req,res){//注销登录
       //手动清空保存的登录信息
       req.session.destroy((err)=>{
         if(err) throw err;
         //使用服务器端的重定向，传递跳转到url地址即可
         res.redirect('/');
       })
    }
}