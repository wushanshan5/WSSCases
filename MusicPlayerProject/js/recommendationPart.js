
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

// recommendation部分start

    //异步获取推荐歌曲
    getAjax(
        "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=18&num=15&offset=0",
        "get",
        "jsonp",
        function (data) {
            if(data.result.list.length > 0) {
                var songList = data.result.list;
                var dataStr = "";
                for(var i=0;i<songList.length;i++) {
                    dataStr += '<li title="'+songList[i].title+'" data-songid="'+songList[i].song_id+'" data-tingid="'+songList[i].ting_uid+' ">\n' +
                        '                    <a href="javascript:void(0)">\n' +
                        '                        <img src="'+songList[i].pic_big+'" alt="">\n' +
                        '                        <div class="recommendation-title">'+songList[i].title+'</div>\n' +
                        '                        <div class="recommendation-author">'+songList[i].author+'</div>\n' +
                        '                        <div class="recommendation-publish">发布时间：<i>'+songList[i].publishtime+'</i></div>\n' +
                        '                        <div class="recommendation-lan">语言：<i>'+songList[i].language+'</i></div>\n' +
                        '                        <div class="recommendation-album">专辑名：<i>'+songList[i].album_title+'</i></div>\n' +
                        '                        <div class="li-cover">' +
                        '                              <button class="li-playing">播放音乐</button><br>' +
                        '                              <button class="li-info">歌手介绍</button>' +
                        '                        </div>' +
                        '                     </a>\n' +
                        '                </li>';
                }
                $(".recommendation>ul").append(dataStr);

                //为li绑定点击事件
                bindClick($(".recommendation>ul>li"));
            }
        }
    );

// recommendation部分end


    //绑定数据
    function bindData(offset) {
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.getRecommandSongList&song_id=18&num=15&offset="+offset,
            "get",
            "jsonp",
            function (data) {
                if(data.result.list.length <= 0) {
                    alert("没有更多数据了！！");
                    return;
                } else {
                    console.log(data.result.list.length)
                    //当获取到数据，waiting消失
                    $(".waiting").css("display","none");
                    var songList = data.result.list;
                    var dataStr = "";
                    for (var i = 0; i < songList.length; i++) {
                        dataStr += '<li title="' + songList[i].title + '" data-songid="' + songList[i].song_id + '" data-tingid="' + songList[i].ting_uid + ' ">\n' +
                            '                    <a href="javascript:void(0)">\n' +
                            '                        <img src="' + songList[i].pic_big + '" alt="">\n' +
                            '                        <div class="recommendation-title">' + songList[i].title + '</div>\n' +
                            '                        <div class="recommendation-author">' + songList[i].author + '</div>\n' +
                            '                        <div class="recommendation-publish">发布时间：<i>' + songList[i].publishtime + '</i></div>\n' +
                            '                        <div class="recommendation-lan">语言：<i>' + songList[i].language + '</i></div>\n' +
                            '                        <div class="recommendation-album">专辑名：<i>' + songList[i].album_title + '</i></div>\n' +
                            '                        <div class="li-cover">' +
                            '                              <button class="li-playing">播放音乐</button><br>' +
                            '                              <button class="li-info">歌手介绍</button>' +
                            '                        </div>' +
                            '                     </a>\n' +
                            '                </li>';
                    }
                    $(".recommendation>ul").append(dataStr);
                    //为li绑定点击事件
                    bindClick($(".recommendation>ul>li"));
                }
            }
        );
    }
    function bindClick(el) {
       $(el).each(function (index,ele) {
            $(ele).find(".li-playing").get(0).onclick = function() {
                window.sessionStorage.setItem("songId",$(this).parent().parent().parent().attr("data-songid"));
                window.open("playing.html");
            }
            $(ele).find(".li-info").get(0).onclick = function () {
                window.sessionStorage.setItem("tingUid",$(this).parent().parent().parent().attr("data-tingid"));
                window.open("info.html");
            }
        });
    }


//滑到底部的次数
var recombottomIndex = 0;
//滑到底部请求数据
document.body.onmousewheel = function () {
    if(document.body.scrollHeight-window.innerHeight != 0) {
        var textnum = 0;
        //获取scrollTop值，body高度要为100%
        // console.log("body总高度"+document.body.scrollHeight+"被卷去的body高度"+document.body.scrollTop+"浏览器的高度"+window.innerHeight)
        if (document.body.scrollTop >= (document.body.scrollHeight - window.innerHeight)) {
            textnum = ++recombottomIndex;
            $(".waiting").css("display", "block");
        }
        if (textnum != 0) {
            bindData(recombottomIndex * 15);
            return;
        }
    }
}

