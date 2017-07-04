//项目入口文件
var fs=require('fs');
var path=require('path');
//导入express模块
var express=require('express');
//创建express的服务器实例
var app=express();

//导入session中间件
var session=require('express-session');
//注册中间件
app.use(session({
    secret:'12345*&……%￥#@',//加密session时候追加加密字符串
    resave:false,//是否允许session重新设置
    saveUninitialized:true  //是否设置session在存储器中可以修改
}))

//导入语解析post表单数据的 中间件
var bodyParser=require('body-parser');
//注册解析表单post数据的中间件
app.use(bodyParser.urlencoded({extended:false}));

//托管静态资源文件
app.use('/node_modules',express.static('node_modules'));
//设置模板引擎
app.set('view engine','ejs');
//模板页面的存放路径
app.set('views','./views');

//解决方案：自己注册/router文件夹下面的所有路由模块
fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    if(err) throw err;
    filenames.forEach(filename=>{
      //这个routerPath就是每个路由模块对应的require时的path
      var routerPath=path.join(__dirname,'./router',filename);
      //根据每个路由模块的路径，自动require路由模块
      var routerModule=require(routerPath);
      //根据自动require进来的路由模块，自动去注册这个路由模块
      app.use(routerModule);
    })
})
//调用app.listen方法，指定端口号并启动web服务器
app.listen(3006,()=>{
    console.log('http://127.0.0.1:3006');
})