$(function(){
    $.get("users/checklogin",function(data){
        if(!data.isSuccess){
            location.href="/login.html";
        }
    })
})