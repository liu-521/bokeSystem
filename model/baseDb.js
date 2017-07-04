var Sequelize=require('sequelize');

var connection=new Sequelize('bokesystem','root','123',{
    host:'127.0.0.1',
    dialect:'mysql'
})
module.exports=connection;