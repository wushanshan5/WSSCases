$(function () {
    //设置audio标签
    playMusicIframe($(".playing-audio iframe"),"","");


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

    // playing-music部分 start
        // 页面加载时，采用异步请求将数据填充到页面中
        var songPic,songPic,songAuthor,songTitle,songLyrics = "";
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid="+window.sessionStorage.getItem("songId"),
            "get",
            "jsonp",
            function (data) {
                var songlink = data.bitrate.show_link;
                songPic = data.songinfo.pic_big;
                songAuthor = data.songinfo.author;
                songTitle = data.songinfo.title;
                songLyrics = data.songinfo.lrclink;
                if(window.sessionStorage.getItem("currentPlayTime")) {
                    playingTi = window.sessionStorage.getItem("currentPlayTime");
                    playingLyricsTi = window.sessionStorage.getItem("currentPlayTime");
                } else {
                    playingTi = 0;
                    playingLyricsTi = 0;
                }
                //将音乐url放入iframe中
                $(".playing-music .playing-audio>iframe").get(0).contentWindow.document.querySelector("audio").src = songlink;
                $(getAudio($(".playing-audio iframe"))).get(0).currentTime = playingTi;

               playingSong();
            }
        );


        //监听音乐播放完毕事件
        getAudio($(".playing-audio iframe")).addEventListener("ended",function () {
            playingTi = playingLyricsTi =  getAudio($(".playing-audio iframe")).duration;
            clearInterval(playingLyricsTimer);
            clearInterval(playingTimer);
            $(".playing-pic").css("animation","");
            $(".playing-controls>button").removeClass("fa-pause").addClass("fa-play");
        });

        //播放按钮
        $(".playing-music .playing-pause").on("click",function () {
            if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
                alert("没有歌曲哦！");
                return;
            }
            if(getAudio($(".playing-audio iframe")).paused) {
                if(getAudio($(".playing-audio iframe")).currentTime == getAudio($(".playing-audio iframe")).duration) {
                    playingTi = 0;
                    playingLyricsTi = 0;
                    getAudio($(".playing-audio iframe")).play();
                    playingTimer = playingInterval();
                    playingLyricsTimer = playingLyricsInterval(songLyrics);
                } else {
                    playingTimer = playingInterval();
                    playingLyricsTimer = playingLyricsInterval();
                    getAudio($(".playing-audio iframe")).play();
                }
                $(".playing-pause").addClass('fa-pause').removeClass("fa-play");
                $(".playing-pic").css({"animation":"rot 4s infinite linear"})
            } else {
                getAudio($(".playing-audio iframe")).pause();
                clearInterval(playingTimer);
                clearInterval(playingLyricsTimer);
                $(".playing-pause").addClass('fa-play').removeClass("fa-pause");
                $(".playing-pic").css({"animation":""})
            }
        });


        function playingSong() {
            if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
                alert("没有歌曲哦！");
                return;
            }
            $(".playing-pause").removeClass("fa-play").addClass("fa-pause");
            listenMusic($(".playing-music"),songAuthor,songTitle,songPic,songLyrics);
            playMusic (getAudio($(".playing-audio iframe")),$(".playing-progress>span:first-of-type"),$(".playing-progress>span:last-of-type"),playingTi,songLyrics);
           }
    // playing-music部分 end

    //歌曲进度条
    $(".playing-progress-bar").click(function(event) {
        if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
            alert("没有歌曲哦！");
            return;
        } else {
            if(getAudio($(".playing-audio iframe")).paused) {
                alert("音乐已经播放完毕，可以点击播放按钮再次播放歌曲！");
            } else {
                //定义一个变量得到鼠标的位置
                var playLen = getMouseLength($(this),event);
                //设置当前歌曲进度条
                $(this).find('.current-progress-bar').css('width',playLen.len/playLen.wholeLen*100+"%");
                //设置audio的时间与进度条同步
                //比例*总时长
                getAudio($(".playing-audio iframe")).currentTime = Math.ceil(playLen.len/playLen.wholeLen*getAudio($(".playing-audio iframe")).duration);
                playingTi = getAudio($(".playing-audio iframe")).currentTime;
                playingLyricsTi = getAudio($(".playing-audio iframe")).currentTime*60;
                //设置时间
                playingTime($(".playing-progress>span:first-of-type"),$(".playing-progress>span:last-of-type"),getAudio($(".playing-audio iframe")),getAudio($(".playing-audio iframe")).currentTime);

            }
        }

       });
});