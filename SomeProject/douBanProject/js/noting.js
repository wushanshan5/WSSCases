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

    //noting-part 部分start
    $(".noting-part-whole p").eq(2).click(function () {
        $(".noting-part-whole").hide();
        $(".noting-part-usual").show();
    });

    //开启对应的模态框
    $(".noting-part-choice>a").each(function (index,ele) {
        $(ele).click(function () {
            $(".noting-part-choices").eq(index).show();
        });
    });
    //关闭模态框
    $(".noting-part-choice1>i").click(function () {
        $(".noting-part-choice1").hide();
    });
    $(".noting-part-choice2>i").click(function () {
        $(".noting-part-choice2").hide();
    });
    $(".noting-part-choice3>i").click(function () {
        $(".noting-part-choice3").hide();
    });
    //noting-part 部分end
})