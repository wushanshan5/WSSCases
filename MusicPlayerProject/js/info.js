
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

// infomation部分start

    //打开页面，异步获取该歌手的相关信息
    getAjax(
        //由sessionstorage获取歌手的信息url
        "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getInfo&tinguid="+window.sessionStorage.getItem("tingUid"),
        "get",
        "jsonp",
        function (data) {
            $(".information-pic>img").get(0).src = data.avatar_s180;
            $(".information-name").html(data.name);
            $(".information-intro").html(data.intro);
            $(".introduction-name>i").html(data.name);
            $(".introduction-nickname>i").html(data.nickname);
            $(".introduction-country>i").html(data.country);
            $(".introduction-weight>i").html(data.weight);
            $(".introduction-height>i").html(data.stature);
            $(".introduction-birth>i").html(data.birth);
            $(".introduction-constellation>i").html(data.constellation);
            $(".introduction-company>i").html(data.company);
            $(".introduction-totalSongs>i").html(data.songs_total);
            $(".introduction-totalMVs>i").html(data.mv_total);
        }
    );
    var informationMoreContent = ["点击展开","点击收起"];
    $(".information-more").click(function () {
        if($(this).html() == informationMoreContent[0]) {
            $(".information-intro").css({"height":"auto"});
            $(this).html(informationMoreContent[1]);
        } else {
            $(".information-intro").css({"height":"150"});
            $(this).html(informationMoreContent[0]);
        }
    });



    //点击singer-songs按钮，异步获取音乐列表，个人简介页面取消
    $(".singer-songs").click(function () {
        $(".introduction").hide();
        $(".songlist").show();
        $(".current-tab").animate({"left":"100px"},100);
        getSingerSong(window.sessionStorage.getItem("tingUid"),0);
    });
    $(".singer-info").click(function () {
        $(".current-tab").animate({"left":"0"},100);
        $(".introduction").show();
        $(".songlist").hide();
    });

// infomation部分end

//songlist 部分start





    //滑到底部的次数
    var infobottomIndex = 0;
    //滑到底部请求新的数据
    document.body.onmousewheel = function () {
        if(document.body.scrollHeight-window.innerHeight != 0) {
            var textnum = 0;
            //获取scrollTop值，body高度要为100%
            // console.log("body总高度"+document.body.scrollHeight+"被卷去的body高度"+document.body.scrollTop+"浏览器的高度"+window.innerHeight)
            if (document.body.scrollTop >= (document.body.scrollHeight - window.innerHeight)) {
                textnum = ++infobottomIndex;
                $(".waiting").css("display", "block");
            }
            if (textnum != 0) {
                getSingerSong(window.sessionStorage.getItem("tingUid"),infobottomIndex);
                return;
            }
        }
    }

    //获取歌手的歌曲列表
    function getSingerSong(tingid,offset) {
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.artist.getSongList&tinguid="+tingid+"&limits=10&use_cluster=1&order=2&offset="+offset*10,
            "get",
            "jsonp",
            function (data) {
                var dataSongs = data.songlist;
                if(data.songlist == null) {
                    return;
                } else {
                    var songLen = dataSongs.length;
                    var songStr = "";
                    for(var i=0;i<songLen;i++) {
                        songStr += ' <li data-songid="'+dataSongs[i].song_id+'">\n' +
                            '                <span class="song-title">'+dataSongs[i].title+'</span>\n' +
                            '                <span class="song-author">'+dataSongs[i].author+'</span>\n' +
                            '                <span class="song-album">'+dataSongs[i].album_title+'</span>\n' +
                            '                <a href="playing.html" class="fa fa-play-circle-o" target="_self"></a>\n' +
                            '            </li>';
                    }
                    $(".songlist>ul").append(songStr);

                    //为每一个songlist内的li绑定点击播放事件
                    $(".songlist>ul>li").each(function (index,ele) {
                        $(ele).find("a").get(0).onclick = function () {
                            window.sessionStorage.setItem("songId",$(this).parent().attr("data-songid"));
                            window.open("playing.html","_self");
                        }
                    });
                }
            }
        );
    }
//songlist 部分end

