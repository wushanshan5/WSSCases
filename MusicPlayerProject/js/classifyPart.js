// nav部分start
    //实现搜索，转到searching页面
    $(".nav-searching>button").click(function () {
        if($(".nav-searching>input").val().trim() != "") {
            //先清空之前的
            window.sessionStorage.setItem("songTitle",$(".nav-searching>input").val().trim());
            window.open("searching.html");
        } else {
            alert("请输入要搜索的歌曲名称！");
        }
        //搜索框的点击事件来储存记录
        addHis();
    });

    //为nav-searching中的input绑定回车事件
    $(".nav-searching").on("keydown",function (event) {
        event = event || window.event;
        if((event.keyCode || event.which) == 13) {
            if($(".nav-searching>input").val().trim() != "") {
                //先清空之前的
                window.sessionStorage.setItem("songTitle",$(".nav-searching>input").val().trim());
                window.open("searching.html");
            } else {
                alert("请输入要搜索的歌曲名称！");
            }
            //搜索框的点击事件来储存记录
            addHis();
        }
    });

    //搜索历史列表展示
    $(".searching-history").click(function () {
        if($(".nav-searching-his>ul").get(0).style.width == "" || $(".nav-searching-his>ul").get(0).style.width == "0px") {
            $(".nav-searching-his>ul").animate({"width":"250px","opacity":1},500);
        } else {
            $(".nav-searching-his>ul").animate({"width":"0px","opacity":0},500);
        }
    });

    //搜索框关闭事件
    $(".nav-searching-his>ul>button").click(function () {
        $(".nav-searching-his>ul").hide(500);
        $(".nav-searching-his>ul").css({"transform":"translateX(100%)"});
    });

    //点击清除记录，ul中的li清空
    $(".nav-searching-his>ul>h2").click(function () {
        $(".nav-searching-his>ul>li").each(function (index,ele) {
            $(ele).remove();
        })
    });

// nav部分end
