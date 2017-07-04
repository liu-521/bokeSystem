module.exports={
    showIndexPage(req,res){//显示首页页面
       res.render('index',{
           //如果保存登录状态，则通过req，session.islogin获取到的登录状态为true,如果没有保存登录状态，则获取到是一个undefined
           islogin:req.session.islogin,
           user:req.session.user  //将登录人的信息，渲染到页面
       });
    }
}