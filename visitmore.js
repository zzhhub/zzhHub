$(function() {



    $("#valicodeImg").click(function(){
        var time = new Date().getTime();
        $("#valicodeImg").attr("src","./code.htm?t="+time);

    });

    $("#verifyCode").blur(function(){
      //  checkCode();

    });
    var Request = new Object();
    Request = GetRequest();
   // $("#url").val(Request['url']);

    $("#subtton").click(function(){


        checkCode(Request['url']);



    });



});
//校验图形验证码
function checkCode(url){
    var verifyCode = $.trim($("#verifyCode").val());

    if(verifyCode==""){
        errorTip("#verifyCode","请输入验证码!");

        return false;
    }
    if(4 > verifyCode.length){

        errorTip("#verifyCode","请输入正确的验证码!");
        return false;
    }
    var flag = false;
    $.ajax({
        type : "POST",
        url : "/checkVisitcode.htm",
        data : {
            "identifyCode":verifyCode
        },
        dataType: "json",
        async : true,
        success : function(data) {
            if(data.status=="0"){
                sub(verifyCode,url);
                flag = true;
            }else{

            errorTip("#verifyCode","验证码错误!");

                flag = false;
            }
        },
        error:function(){


        }
    });
    return flag;
}

function errorTip(obj,msg){
    $(obj).tips({
        side:1,  //1,2,3,4 分别代表 上右下左
        msg:msg,//tips的文本内容
        color:'#FFF',//文字颜色，默认为白色
        bg:'#ff5a6d',//背景色，默认为红色
        time:2//默认为2 自动关闭时间 单位为秒 0为不关闭 （点击提示也可以关闭）
    })
}


function sub(code,url)
{

    $.ajax({
        type : "POST",
        url : "/checkVisit.htm",
        data : {
            "code":code

        },
        dataType: "json",
        async : true,
        success : function(data) {
            if(data.status=="0"){


               window.location.href=url;
            }else{

                errorTip("#verifyCode","验证码错误!");


            }
        },
        error:function(){


        }
    });




}

function GetRequest() {
    var url = location.search;

    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);

        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
