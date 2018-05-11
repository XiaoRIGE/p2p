$(function(){
    //发起请求获取投资数据
    $.get('/borrow/investList',function(data){
        console.log("后台传过来的值",data.list);
        //通过获取到的值渲染模板(使用模板引擎渲染模板)
        var investHtml=template("investlist",data);
        //console.log(investHtml);
        // 将渲染后的HTML添加到页面
        $("#inveselist").html(investHtml);
    })
});