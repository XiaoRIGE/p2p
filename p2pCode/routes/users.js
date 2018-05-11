var express = require('express');
var router = express.Router();
//引入mongoose模块
var mongoose=require('mongoose');

//连接数据库(存在就直接使用，不存在会创建)
mongoose.connect("mongodb://localhost:27017/p2p",function(err){
  if(err){
    console.error("数据库连接失败"+err.message);
  }
  else {
    console.log("数据库链接成功！")
  }
});

//创建用户骨架
var userSchema=new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  isActive:Boolean,
  mobile:String,
  createdate:Date
});

//创建模型
var userModel=mongoose.model('users',userSchema,'users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//定义注册账户的路由
router.post('/register', function(req, res, next) {
  //接收传过来的值
  var username=req.body.username;
  var password=req.body.password;
  var email=req.body.email;
  
  var now=new Date().toLocaleString();
  //写入数据库
  //实例化模型
  var userInstance=new userModel({
    username:username,
    password:password,
    email:email,
    isActive:true,
    mobile:'',
    createdate:now
  })

  //保存到数据库
  userInstance.save(function(err){
    if(err){
      console.log("注册信息写入数据库失败");
      res.json({
        "isSuccess":false,
        "msssage":"注册失败",
        "reason":err.message
      })
    }
    else {
      console.log("注册信息写入数据库成功");
      res.json({
        "isSuccess":true,
        "msssage":"注册成功"
      })
    }
  })
});

//定义验证用户登录的路由
router.post('/login', function(req, res, next) {
  //接收传过来的值
  var username=req.body.username;
  var password=req.body.password;

  var json={"username":username,"password":password};
  // 在数据库查找是否存在对应的用户名和密码
  userModel.find(json,function(err,data){
    if(err){
      console.log(err);
    }
    else {
      // res.send(data);
      if(data.length>0){
        
        //写入cookie
        res.cookie("username",username);
        res.cookie("userid",data[0]._id);
        //成功时返回数据
        res.json({
          "isSuccess":true,
          "message":"登录成功"
        })
      }
      else{
        //失败时返回数据
        res.json({
          "isSuccess":false,
          "message":"登录失败"
        })
      }
    }
  })
});

//验证用户身份
router.get('/checklogin', function(req, res, next) {
  var username = req.cookies.username;
  var userid = req.cookies.userid;
  if(userid && username){
    res.json({"isSuccess":true,"username":username});
  }
  else {
    res.json({"isSuccess":false});
  }
});

//清除cookie
router.get('/logout', function(req, res, next) {
  res.clearCookie("username");
  res.clearCookie("userid");

  res.redirect("/login.html");
});
module.exports = router;
