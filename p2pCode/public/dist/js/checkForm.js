$(function(){
    //验证注册表单
    $('#regForm')
        .bootstrapValidator({
        　　　　 message: 'This value is not valid',
                feedbackIcons: {
    　　　　　　　　valid: 'glyphicon glyphicon-ok',
    　　　　　　　　invalid: 'glyphicon glyphicon-remove',
    　　　　　　　　validating: 'glyphicon glyphicon-refresh'
    　　　　　　 },
                fields: {
                    username: {
                        message: '用户名验证失败',
                        validators: {
                            notEmpty: {
                                message: '用户名不能为空'
                            },
                            stringLength: { 
                                min: 6,  
                                max: 10,  
                                message: '用户名长度长度必须在6-10之间'  
                            },
                            regexp: {
                                regexp: /^[a-zA-Z0-9_\.]+$/,  
                                message: '所输入的字符不符要求'  
                            }
                        }
                    },
                    password: {
                        message: '密码验证失败',
                        validators: {
                            notEmpty: {
                                message: '密码不能为空'
                            },
                            stringLength: {
                                min: 6,  
                                max: 15,  
                                message: '密码长度长度必须在6-15之间'  
                            }
                        }
                        
                    },
                    password2: {
                        message: '确认密码验证失败',
                        validators: {
                            notEmpty: {
                                message: '确认密码不能为空'
                            },
                            identical: {
                                field: 'password',
                                message: '*两次输入密码不一致'
                            }
                        } 
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: '邮箱地址不能为空'
                            },
                            emailAddress: {
                                message: '邮箱地址格式有误'
                            }
                        }
                    }
                }
                
            })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            // 获取表单示例
            var $form = $(e.target);
            // 获取验证插件的示例
            //var bv = $form.data('bootstrapValidator');
            
            // 发起AJAX请求提交数据到后台
            var regUrl="/users/register"; //提交的网址
            var postData=$form.serialize(); //批量接收表单的值并完成拼接
            //因为有密码，从安全角度考虑使用post请求
            $.post(regUrl, postData, function(result) {
                //console.log("接收到的数据",result);
                //根据后台传过来的值做逻辑判定
                if(result.isSuccess){
                    //alert("注册用户成功");
                    //location.href='login.html';
                    //创建定时器
                    var num=10;
                    //先显示一次
                    var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>注册成功,<span class="djsNum">'+num+'</span>秒后跳转到登录界面</span>';
                    $("#tipsJoin .modal-body").html(htmlStr);
                    // 再通过定时器倒计时
                    var time1=setInterval(function(){
                        num--; 
                        var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>注册成功,<span class="djsNum">'+num+'</span>秒后跳转到登录界面</span>';
                        $("#tipsJoin .modal-body").html(htmlStr);
                        if (num == 0){
                            location.href='login.html';
                        }
                    },1000)
                }
                else{
                    // alert("注册用户失败,错误原因：",result.reason);
                    var htmlStr='<span class="glyphicon glyphicon-remove"></span>'+result.message;
                    $("#tipsJoin .modal-body").html(htmlStr);
                }
                //不管成功还是失败都要通过js显示模态框
                $('#regModal').modal('show');
                
                //不管成功还是失败都要通过js显示模态框
	            $('#tipsJoin').modal('show');


            }, 'json');

        });


    //验证登录表单
    $('#loginForm')
    .bootstrapValidator({
    　　　　 message: 'This value is not valid',
            feedbackIcons: {
　　　　　　　　valid: 'glyphicon glyphicon-ok',
　　　　　　　　invalid: 'glyphicon glyphicon-remove',
　　　　　　　　validating: 'glyphicon glyphicon-refresh'
　　　　　　 },
            fields: {
                username: {
                    message: '用户名验证失败',
                    validators: {
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        stringLength: { 
                            min: 6,  
                            max: 10,  
                            message: '用户名长度长度必须在6-10之间'  
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,  
                            message: '所输入的字符不符要求'  
                        }
                    }
                },
                password: {
                    message: '密码验证失败',
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,  
                            max: 15,  
                            message: '密码长度长度必须在6-15之间'  
                        }
                    }
                    
                }
            }
            
        })
    .on('success.form.bv', function(e) {
        e.preventDefault();
        // 获取表单示例
        var $form = $(e.target);
        
        // 发起AJAX请求提交数据到后台
        var regUrl="/users/login"; //提交的网址
        var postData=$form.serialize(); //批量接收表单的值并完成拼接
        console.log(postData);
        //因为有密码，从安全角度考虑使用post请求
        $.post(regUrl, postData, function(result) {
            console.log("接收到的数据",result);
            //根据后台传过来的值做逻辑判定
            if(result.isSuccess){
                //alert("登录用户成功");
                //location.href='login.html';
                //创建定时器
                var num=5;
                //先显示一次
                var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>登录成功,<span class="djsNum">'+num+'</span>秒后跳转到会员中心界面</span>';
                $("#tipsLogin .modal-body").html(htmlStr);
                // 再通过定时器倒计时
                var time1=setInterval(function(){
                    num--; 
                    var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>登录成功,<span class="djsNum">'+num+'</span>秒后跳转到会员中心界面</span>';
                    $("#tipsLogin .modal-body").html(htmlStr);
                    if (num == 0){
                        location.href='memberCenter.html';
                    }
                },1000)
            }
            else{
                // alert("登录用户失败,错误原因：",result.reason);
                var htmlStr='<span class="glyphicon glyphicon-remove"></span>'+result.message;
                $("#tipsLogin .modal-body").html(htmlStr);
            }
            //不管成功还是失败都要通过js显示模态框
            // $('#regModal').modal('show');
            
            //不管成功还是失败都要通过js显示模态框
            $('#tipsLogin').modal('show');


        }, 'json');

    });

    $('#borrowForm')
        .bootstrapValidator({
        　　　　 message: 'This value is not valid',
                feedbackIcons: {
    　　　　　　　　valid: 'glyphicon glyphicon-ok',
    　　　　　　　　invalid: 'glyphicon glyphicon-remove',
    　　　　　　　　validating: 'glyphicon glyphicon-refresh'
    　　　　　　 },
                fields: {
                    borrowMoney: {
                        message: '借款金额验证失败',
                        validators: {
                            notEmpty: {
                                message: '借款金额不能为空'
                            },
                            digits: {
                                message: '借款金额只能包含数字。'
                            }
                        }
                    },
                    borrowRate: {
                        message: '借款利息验证失败',
                        validators: {
                            notEmpty: {
                                message: '借款利息不能为空'
                            },
                            digits: {
                                message: '借款金额只能包含数字。'
                            }
                        }
                        
                    },
                    repayment: {
                        message: '还款方式验证失败',
                        validators: {
                            notEmpty: {
                                message: '还款方式必须选择一项'
                            }
                        }
                        
                    },
                    minMoney: {
                        message: '最小投标验证失败',
                        validators: {
                            notEmpty: {
                                message: '最小投标不能为空'
                            },
                            digits: {
                                message: '借款金额只能包含数字。'
                            }
                        }
                        
                    },
                    maxMoney: {
                        message: '最大投标验证失败',
                        validators: {
                            notEmpty: {
                                message: '最大投标不能为空'
                            },
                            digits: {
                                message: '借款金额只能包含数字。'
                            }
                        }
                        
                    },
                    borrowBonus: {
                        message: '投标奖金验证失败',
                        validators: {
                            notEmpty: {
                                message: '投标奖金不能为空'
                            }
                        }
                        
                    },
                    borrowTitle: {
                        message: '借款标题验证失败',
                        validators: {
                            notEmpty: {
                                message: '借款标题不能为空'
                            }
                        }
                        
                    },
                }
                
            })
            .on('success.form.bv', function(e) {
                e.preventDefault();
                // 获取表单示例
                var $form = $(e.target);
                
                // 发起AJAX请求提交数据到后台
               // console.log(postData);
                //因为有密码，从安全角度考虑使用post请求

                var formData=$("#borrowForm").serialize();
                // console.log("前台获取表单数据",formData);
                $.post("/borrow/add",formData,function(result){
                    // console.log(result);
                    // 处理业务逻辑
                    if(result.isSuccess){

                        // alert("借款信息提交成功！");
                        // location.href="invest.html";

                        //创建定时器
                        var num=5;
                        //先显示一次
                        var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>提交借款信息成功,<span class="djsNum">'+num+'</span>秒后跳转到我要投资界面</span>';
                        $("#tipsModal .modal-body").html(htmlStr);
                        // 再通过定时器倒计时
                        var time1=setInterval(function(){
                            num--; 
                            var htmlStr='<span class="glyphicon glyphicon-ok"></span><span>计较借款信息成功,<span class="djsNum">'+num+'</span>秒后跳转到我要投资界面</span>';
                            $("#tipsModal .modal-body").html(htmlStr);
                            if (num == 0){
                                location.href='invest.html';
                            }
                        },1000)
                    }
                    else{
                        // alert("登录用户失败,错误原因：",result.reason);
                        var htmlStr='<span class="glyphicon glyphicon-remove"></span>'+result.message;
                        $("#tipsLogin .modal-body").html(htmlStr);
                    }
                    //不管成功还是失败都要显示模态框
                    $('#tipsModal').modal('show');
                })
            });
})