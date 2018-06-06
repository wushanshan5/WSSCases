$(function () {
    //nav 部分start
    $(".nav-kinds a").eq(10).focus(function () {
        $(".nav-kinds-more").show();
    })
    $(".nav-kinds a").eq(10).blur(function () {
        $(".nav-kinds-more").hide();
    })
    $(".nav-login-firsta").on("mouseenter",function () {
        $(".nav-doubanApp").css({"display":"block"});
    });
    $(".nav-login-firsta").on("mouseleave",function () {
        $(".nav-doubanApp").css({"display":"none"});
    });
    $(".nav-my").focus(function () {
        $(this).find("ul").show()
    });
    $(".nav-my").blur(function () {
        $(this).find("ul").hide()
    });
    //nav 部分end

    //page 部分start
    $(".page-share-life>input").click(function () {
        $(this).hide();
        $(".page-share-life1").css({"display":"block"});
        $(".page-share-life1 textarea").focus();
    });
    $(".page-share-life textarea").each(function (index,ele) {
        $(ele).blur(function () {
            if($(".page-share-life textarea").val() == "") {
                $(".page-share-life-sign").show();
            }
    });
    });
    $(".page-share-life textarea").each(function (index,ele) {
        $(ele).focus(function () {
            $(".page-share-life-sign").hide();
        });
    });
    //点击a链接转到对应的page-share-life
    $(".page-share-i+a").each(function (index,ele) {
        if(index<3){
            $(ele).click(function () {
                $(".page-share-life").each(function (index,ele) {
                    $(ele).hide();
                });
                $(".page-share-life").eq(index+1).show();
                $(".page-share-life").eq(index+1).find("textarea").focus();
                //要加return false 否则页面被刷新
                return false;
            });
        }
    });
    //page 部分end
});
