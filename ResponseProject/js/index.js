/*
* @Author: Marte
* @Date:   2018-03-30 11:12:32
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-30 11:12:37
*/

//nav 部分开始
    $("#my-navigation>li").each(function (index,ele) {
        $(ele).click(function () {
            console.log(1)
            // $(.nav)
            $("#my-navigation .active").removeClass("active");
            $(this).addClass("active");
        });
    });
//nav 部分结束