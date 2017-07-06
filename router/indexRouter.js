var express=require('express');
var router=express.Router();

//引入控制器
var indexCtrl=require('../controller/indexCtrl.js');
router.get('/',indexCtrl.showIndexPage)
    .get('/testpage', (req, res)=>{
    res.render('fetch')
  })
  .get('/testjson', (req, res) => {
    res.json({
      name: 'zs',
      age: 22,
      gender: '男',
      hobby: ['撸代码']
    })
  });


module.exports=router;