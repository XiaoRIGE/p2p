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
var borrowSchema=new mongoose.Schema({
  borrowMoney :Number,
  borrowRate :Number,
  borrowTerm :Number,
  repayment :String,
  minMoney :Number,
  maxMoney :Number,
  borrowBonus :Number,
  borrowDays :Number,
  borrowType :Number,
  borrowTitle :String,
  borrowDetails:String,
  borrowPerson:String,
  isPass : Boolean,
  passDatetime : Date,
  investMoney : Number,
  isComplated : Boolean
});

//创建模型
var borrowrModel=mongoose.model('borrows',borrowSchema,'borrows');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//定义添加借款路由
router.post('/add', function(req, res, next) {
  //获取前台传值
  var borrowMoney =req.body.borrowMoney;
  var borrowRate =req.body.borrowRate;
  var borrowTerm  =req.body.borrowTerm;
  var repayment  =req.body.repayment;
  var minMoney =req.body.minMoney;
  var maxMoney  =req.body.maxMoney;
  var borrowBonus =req.body.borrowBonus;
  var borrowDays  =req.body.borrowDays;
  var borrowType  =req.body.borrowType;
  var borrowTitle  =req.body.borrowTitle;
  var borrowDetails =req.body.borrowDetails;
  var borrowPerson =req.body.borrowPerson;
  
  var isPass = false;
  var passDatetime = passDatetime;
  var investMoney = 0;
  var isComplated  = false;

  var passDatetime = new Date();

  //实例化
  var borrowInstance = new borrowrModel({
    "borrowMoney" : borrowMoney,
    "borrowRate" : borrowRate,
    "borrowTerm" : borrowTerm,
    "repayment" : repayment,
    "minMoney" : minMoney,
    "maxMoney" : maxMoney,
    "borrowBonus" : borrowBonus,
    "borrowDays" : borrowDays,
    "borrowType" : borrowType,    
    "borrowTitle" : borrowTitle,
    "borrowDetails" : borrowDetails,
    "borrowPerson" : borrowPerson,
    
    "isPass" : isPass,
    "passDatetime" : passDatetime,
    "investMoney" : investMoney,
    "isComplated" : isComplated
  }) 
  //save保存
  borrowInstance.save(function(err){
    if(err){
      res.json({
        "isSuccess":false,
        "msssage":"借款信息提交失败",
        "reason":err.message
      })
    }
    else {
      res.json({
        "isSuccess":true,
        "msssage":"借款信息提交成功"
      })
    }
  })
});

//定义查询我要投资列表路由
router.get("/investList",function(req,res){
  borrowrModel.find({},function(err,data){
    if(!err){
      //将获取到的数据发送到前端
      //res.json({"isSuccess":true,"list":data});
      //将总的记录数记下来
      var listJson={
        "total": data.length,//总的记录数
        "list": []
      };
      //接收传过来当前页、每页条数
      var pageIndex=req.query.pageIndex;
      var pageSize=parseInt(req.query.pageSize);
      //计算开始位置
      var start=pageIndex*pageSize;

      //console.log(pageIndex,pageSize,start);

      //再次执行对应查询
      borrowrModel.find({},function(err,pagerData){
        if(!err){
          listJson.list=pagerData;
          // console.log("这里后台返回的数据",listJson);
          res.send(listJson);
        }
        else {
          throw err;
          res.send(null);
        }
      }).skip(start).limit(pageSize);
    }
    else{
      throw err;
      res.send(null);
    }
  });
})

//定义获取报表数据的路由
router.get('/getecharts',function(req,res){
  borrowrModel.find({},function(err,data){
    
    if(!err){
      // console.log("查询到结果",data);
      var x=y=z=0;
        // 遍历数组相加金额
        for(var i of data){
           //在三种情况下计算各自的金额总量
          
          if(i.borrowType==0){
              x+=i.borrowMoney;
              // onsole.log("信用贷总额为",x);
          }
          else if(i.borrowType==1){
            y+=i.borrowMoney;
            // onsole.log("信用贷总额为",y);
          }
          else {
            z+=i.borrowMoney;
            // onsole.log("信用贷总额为",y);
          }
      }
      // console.log("三种贷款金额",x,y,z);
      //将计算得出的值写成需要的格式返回前端
      /*需要的数据格式
          data:[
                      {value:335, name:'信用贷款'},
                      {value:310, name:'汽车抵押贷款'},
                      {value:234, name:'房屋抵押贷款'}
                  ]
      */
     var dataJson=[
      {value:x, name:'信用贷款'},
      {value:y, name:'汽车抵押贷款'},
      {value:z, name:'房屋抵押贷款'}
     ];
     //返回前端
     res.json(dataJson);

    }
    else{
      console.log(err);
    }
  })
})

module.exports = router;
