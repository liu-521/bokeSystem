var express=require('express');
var router=express.Router();

//引入控制器
var indexCtrl=require('../controller/indexCtrl.js');
router.get('/',indexCtrl.showIndexPage);


module.exports=router;