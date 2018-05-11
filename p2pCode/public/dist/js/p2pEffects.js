$(function () {  
    //微信提示框
    $(function(){
        $("#weixinTips").tooltip();
    })

    //判断是否处于登录状态
    $.get('users/checklogin',function(data){
        //当用户处于登录状态，显示对应内容
        if(data.isSuccess){
            $(".loginhide").hide();
            $(".loginshow").show();
            $(".username_value").html(data.username);
            //设置用户借款表单的申请人为当前登录用户
            $("#borrowPerson").val(data.username);
        }
        else {
            $(".loginhide").show();
            $(".loginshow").hide();
        }
    })

    //切换导航的展开和隐藏
    $("#toggleBtn").on("click",function(){
        $("#memberMain").toggleClass("active");
        //判断当前状态时展开还是隐藏，切换文字内容
        var isActive= $("#memberMain").hasClass("active");
        if(isActive){
            $(this).text("展开")
        }
        else {
            $(this).text("收起")
        }
    })

    //手机端的切换效果
    var x1=0;
    var x2=0;
    $(document).on("touchstart",function(e){
        x1=e.changedTouches[0].clientX;
    });
    $(document).on("touchend",function(e){
        x2=e.changedTouches[0].clientX;
        var distance=Math.abs(x2-x1);
        if(distance>50){
            $("#toggleBtn").trigger("click");
        }
    });
    
    //提交借款表单发送AJAX请求
    // $("#submitBtn").on("click",function(e){
    //     e.preventDefault();
    //     var formData=$("#borrowForm").serialize();
    //     // console.log("前台获取表单数据",formData);
    //     $.post("/borrow/add",formData,function(result){
    //         // console.log(result);
    //         // 处理业务逻辑
    //         if(result.isSuccess){
    //             alert("借款信息提交成功！");
    //             location.href="invest.html";
    //         }
    //     })
    // });
});  