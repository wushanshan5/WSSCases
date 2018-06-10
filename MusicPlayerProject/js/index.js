
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

// banner部分start
    //随机从api中得到四首歌曲，点击相应li，切换歌曲
    //利用jsonp获取到百度音乐的内容，异步返回到html页面中
    getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=1&size=50&offset=0",
            "get",
            "jsonp",
            function (data) {
                var songList = data.song_list;
                // 1. 随机获取四首歌放置在对应的轮播图片中
                bannerFill(songList);
                var bannerInterval = setInterval(function () {
                    bannerFill(songList);
                },1000*60*2);
            }
        );
    //轮播填充数据方法
    function bannerFill(songList) {
        //使用定时器，每两分钟更换一次轮播内容
        var randomSong = randomNum(4,50);
        //利用循环将轮播图片替换
        for(var song=0;song<4;song++) {
            //歌曲图片的兼容
            var songSrc = "";
            if(songList[randomSong[song]].pic_huge != "") {
                songSrc = songList[randomSong[song]].pic_huge;
            } else if(songList[randomSong[song]].album_1000_1000 != "") {
                songSrc = songList[randomSong[song]].album_500_500;
            } else if(songList[randomSong[song]].pic_premium != "") {
                songSrc = songList[randomSong[song]].pic_premium;
            } else if(songList[randomSong[song]].pic_s500 != "") {
                songSrc = songList[randomSong[song]].pic_s500;
            } else {
                songSrc = songList[randomSong[song]].pic_radio;
            }

            //第0个和第四个设置相同的内容
            if(song == 0) {
                $(".banner>ul img")[4].src = songSrc;
                $(".banner>ul>li")[4].setAttribute("data-songId",songList[randomSong[song]].song_id);
                $(".banner>ul>li")[4].setAttribute("data-tingId",songList[randomSong[song]].ting_uid);
                $(".banner>ul>li")[4].setAttribute("data-lyrics",songList[randomSong[song]].lrclink);
                //获取图片信息
                var littlePic = "";
                if(songList[randomSong[song]].pic_small != "") {
                    littlePic = songList[randomSong[song]].pic_small;
                } else if(songList[randomSong[song]].pic_big != "") {
                    littlePic = songList[randomSong[song]].pic_big;
                } else {
                    littlePic = songList[randomSong[song]].pic_radio;
                }

                $(".banner>ul>li")[4].setAttribute("data-pic",littlePic);
                $(".banner>ul>li")[4].setAttribute("data-title",songList[randomSong[song]].title);
                $(".banner>ul>li")[4].setAttribute("data-author",songList[randomSong[song]].author);
            }
            //获取歌曲id
            $(".banner>ul>li")[song].setAttribute("data-songId",songList[randomSong[song]].song_id);
            //获取歌手信息
            $(".banner>ul>li")[song].setAttribute("data-tingId",songList[randomSong[song]].ting_uid);
            //获取歌词信息
            $(".banner>ul>li")[song].setAttribute("data-lyrics",songList[randomSong[song]].lrclink);
            //获取图片信息
            var littlePic = "";
            if(songList[randomSong[song]].pic_small != "") {
                littlePic = songList[randomSong[song]].pic_small;
            } else if(songList[randomSong[song]].pic_big != "") {
                littlePic = songList[randomSong[song]].pic_big;
            } else {
                littlePic = songList[randomSong[song]].pic_radio;
            }

            $(".banner>ul>li")[song].setAttribute("data-pic",littlePic);
            $(".banner>ul>li")[song].setAttribute("data-title",songList[randomSong[song]].title);
            $(".banner>ul>li")[song].setAttribute("data-author",songList[randomSong[song]].author);

            //获取歌词信息
            $(".banner>ul>li")[song].setAttribute("data-lyrics",songList[randomSong[song]].lrclink);
            $(".banner>ul img")[song].src = songSrc;

        }
        $(".banner>ul>li").each(function (index,ele) {
            $(ele).get(0).onclick = function () {
                window.sessionStorage.setItem("songId",$(ele).attr("data-songid"));
                window.open("playing.html");
            }
        });


    }
    //轮播图部分
        //设置一个定时器用于自动播放
        var bannerTimer = null;
        var turnLeft = $(".banner span:nth-of-type(1)");//左滑箭头
        var turnRight = $(".banner span:nth-of-type(2)");//右滑箭头
        var bannerPicArr = $(".banner li");
        var bannerInd = 0;
        //获取banner中li的长度
        var bannerWid = $(".banner")[0].offsetWidth;

        //自动播放事件
        bannerAutoPlay($(".banner ul"));

        //左切换事件
        turnLeft.click(function () {
                bannerInd--;
                if(bannerInd<0) {
                    bannerInd = bannerPicArr.length-1;
                    $(".banner ul").css({"left":bannerWid*bannerInd*-1});
                    bannerInd--;
                }
                $(".banner ul").animate({"left":bannerWid*bannerInd*-1});
            });

        //右切换事件
        turnRight.click(function () {
            bannerInd++;
            if(bannerInd>bannerPicArr.length-1) {
                bannerInd = 0;
                $(".banner ul").css({"left":bannerWid*bannerInd*-1});
                bannerInd++;
            }
            $(".banner ul").animate({"left":bannerWid*bannerInd*-1});
        });

        //鼠标放在banner上清除定时器
        $(".banner").on("mouseenter",function () {
            clearInterval(bannerTimer);
        });

        //鼠标移开banner，再重新设置定时器
        $(".banner").on("mouseleave",function () {
            bannerAutoPlay($(".banner ul"));
        });

        //页面失焦时，清除定时器，轮播停止自动播放
        window.onblur = function () {
            console.log("失焦了！")
            clearInterval(bannerTimer);
        }

        //（响应式）当调整了浏览器的页面大小时，需要重新计算banner内的宽度
        window.onresize = function () {
            bannerWid = $(".banner")[0].offsetWidth;
        }

    //自动轮播的方法
    function bannerAutoPlay () {
        bannerTimer = setInterval(function () {
            bannerInd++;
            if(bannerInd>bannerPicArr.length-1) {
                bannerInd = 0;
                $(".banner ul").css({"left":bannerWid*bannerInd*-1});
                bannerInd++;
            }
            $(".banner ul").animate({"left":bannerWid*bannerInd*-1});
        },3500);
    }
// banner部分end

// list部分start
    var sortIndex = 0;
    //鼠标滚动事件
    var ajaxIndex = 0;
    mouseScroll(
        $(".list-songs"),
        function () {
            ajaxIndex++;
            getAjax(
                "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+$(".list-songs>ul>li").eq(0).attr("data-list-class")+"&size=10&offset="+ajaxIndex*10,
                "get",
                "jsonp",
                function (data) {
                    var listSong = data.song_list;
                    var wholeStr = "";
                    if(listSong == null) {
                        return;
                    } else {
                        for(var i=0;i<listSong.length;i++) {
                            wholeStr += '<li class="clearfix" data-pic="'+listSong[i].pic_small+'" data-author="'+listSong[i].author+'" data-title="'+listSong[i].title+'" data-lyrics="'+listSong[i].lrclink+'" data-list-class="'+$(".list-songs>ul>li").eq(0).attr("data-list-class")+'" data-songid="'+listSong[i].song_id+'" data-index="'+sortIndex+'">\n' +
                                '                    <div class="list-song-pic f-l">\n' +
                                '                    <img src="'+listSong[i].pic_small+'" alt="">\n' +
                                '                </div>\n' +
                                '                    <div class="list-song-info f-l">\n' +
                                '                        <span class="list-song-singer">'+listSong[i].author+'</span><br>\n' +
                                '                        <span class="list-song-title">'+listSong[i].title+'</span>\n' +
                                '                    </div>\n' +
                                '                </li>';
                            sortIndex++;
                        }
                    }
                    $(".list>.list-songs>ul").append(wholeStr);
                    bindMusic ($(".list>.list-songs>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
                }
            );
        }
    );

    //.list-close的关闭事件
    $(".list-close").click(function () {
        $(".list").animate({"height":"0px","opacity":"0"},500);
    });

// list部分end

// playing部分start
    //在iframe标签内设置audio标签
    playMusicIframe($(".playing-audio iframe"),"","");

    //为playing的按钮绑定事件
        //播放按钮
        $(".playing .playing-pause").on("click",function () {
                if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
                    alert("没有歌曲哦！");
                    return;
                }
                if(getAudio($(".playing-audio iframe")).paused) {
                    console.log(1)
                    $(".playing-pic").css("animation","rot 4s linear infinite");
                    getAudio($(".playing-audio iframe")).play();
                    //处理时间
                    playingTimer = playingInterval();
                    playingLyricsTimer = playingLyricsInterval($(this).attr("data-lyrics"));
                } else {
                    $(".playing-pic").css("animation","");
                    getAudio($(".playing-audio iframe")).pause();
                    clearInterval(playingTimer);
                    clearInterval(playingLyricsTimer);
                }
                isPlaying($(getAudio($(".playing-audio iframe"))),$(".playing .playing-pause"));
            });

        //后一首按钮
        $(".playing .playing-for").on("click",function () {
                if($(getAudio($(".playing-audio iframe"))).attr("src") == "" || $(getAudio($(".playing-audio iframe"))).attr("data-listname") == "") {
                    alert("没有下一首！");
                    return;
                }
                btnPlayingNextSong();
            });

        //前一首按钮
        $(".playing .playing-back").on("click",function () {
                if($(getAudio($(".playing-audio iframe"))).attr("src") == "" || $(getAudio($(".playing-audio iframe"))).attr("data-listname") == "") {
                    alert("没有上一首！");
                    return;
                }
            btnPlayingPrevSong();
        });

        //点击图片跳转到播放页面
        $(".playing-pic").click(function () {
            if($(".playing-audio>iframe").get(0).contentWindow.document.querySelector("audio").getAttribute("data-songid") == null) {
                alert("没有播放音乐哦！");
            } else {
                window.sessionStorage.setItem("songId",$(".playing-audio>iframe").get(0).contentWindow.document.querySelector("audio").getAttribute("data-songid"));
                window.sessionStorage.setItem("currentPlayTime",playingTi);
                window.open("playing.html","_self");
            }
        });

        //歌曲进度条
        $(".playing-progress-bar").click(function(event) {
            if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
                alert("没有歌曲哦！");
                return;
            }
            //定义一个变量得到鼠标到进度条最开始位置的距离
            var playLen = getMouseLength($(this),event);
            //设置当前歌曲进度条
            $(this).find('.current-progress-bar').css('width',playLen.len/playLen.wholeLen*100+"%");
            //设置audio的时间与进度条同步（比例*总时长）
            getAudio($(".playing-audio iframe")).currentTime = Math.ceil(playLen.len/playLen.wholeLen*getAudio($(".playing-audio iframe")).duration);
            playingTi = getAudio($(".playing-audio iframe")).currentTime;
            playingLyricsTi = getAudio($(".playing-audio iframe")).currentTime*60;
            //设置时间
            playingTime($(".playing-progress>span:first-of-type"),$(".playing-progress>span:last-of-type"),getAudio($(".playing-audio iframe")),getAudio($(".playing-audio iframe")).currentTime);

        });

        //声音按钮
        var volumnLen = getVolumn($(".playing-muted .current-volumn"));
        $(".playing-muted>button").click(function () {
            console.log(volumnLen)
            if(!getAudio($(".playing-audio iframe")).muted) {

                $(this).addClass('fa-volume-off').removeClass('fa-volume-up');
                getAudio($(".playing-audio iframe")).muted = true;
                $(".playing-muted .current-volumn").css('width', 0);
            } else {
                getAudio($(".playing-audio iframe")).muted = false;
                $(this).addClass('fa-volume-up').removeClass('fa-volume-off');
                $(".playing-muted .current-volumn").css('width', volumnLen);
            }
        });

        //声音进度条
        $(".playing-volumn-progress").click(function(event) {
            //定义一个变量得到鼠标的位置
            var mouseLeft = getMouseLength($(this),event);
            //设置当前音量进度条
            $(this).find('.current-volumn').css('width',mouseLeft.len/mouseLeft.wholeLen*100+"%");
            //设置audio的音量与进度条同步
            getAudio($(".playing-audio iframe")).volume = mouseLeft.len/mouseLeft.wholeLen;
            volumnLen = getVolumn($(".playing-muted .current-volumn"));
        });

        //循环按钮
        var loopingNum = 0;
        $(".playing-loop").click(function() {
            // 顺序播放 &#xe671;
            // 随机播放 &#xe622;
            // 单曲循环 &#xe607;
            var loop = ["&#xe671;","&#xe622;","&#xe607;"];
            loopingNum++;
            if(loopingNum > loop.length-1) {
                loopingNum = 0;
            }
            $(".playing-loop").html(loop[loopingNum]).attr("data-type",loopingNum);
        });

        //列表按钮
        $(".playing-list").click(function () {
            if($(".list").get(0).style.height == "0px" || $(".list").get(0).style.height == "") {
                $(".list").animate({"height":"400px","opacity":"1"},500);
            } else {
                $(".list").animate({"height":"0px","opacity":"0"},500);
            }

            //判断是否有音乐正在播放，如果有，异步获取到对应的列表
            if($(getAudio($(".playing-audio iframe"))).attr("src") != "") {
                //取出正在播放的歌曲的list的data-typenum，填充到list-song里面
                var currentListName = $(getAudio($(".playing-audio iframe"))).attr("data-listname");
                //获取到对应list的ul
                var listSong = $(".ranking-"+currentListName).find("ul").find("li");
                var wholeStr = "";
                $(".list>.list-songs>ul").html("");
                for(var i=0;i<listSong.length;i++) {
                   wholeStr += '<li class="clearfix" data-pic="'+$(listSong[i]).attr("data-pic")+'" data-author="'+$(listSong[i]).attr("data-author")+'" data-title="'+$(listSong[i]).attr("data-title")+'" data-lyrics="'+$(listSong[i]).attr("data-lyrics")+'" data-list-class="'+$(listSong[i]).attr("data-list-class")+'" data-songid="'+$(listSong[i]).attr("data-songid")+'" data-index="'+sortIndex+'">\n' +
                       '                    <div class="list-song-pic f-l">\n' +
                       '                    <img src="'+$(listSong[i]).attr("data-pic")+'" alt="">\n' +
                       '                </div>\n' +
                       '                    <div class="list-song-info f-l">\n' +
                       '                        <span class="list-song-singer">'+$(listSong[i]).attr("data-author")+'</span><br>\n' +
                       '                        <span class="list-song-title">'+$(listSong[i]).attr("data-title")+'</span>\n' +
                       '                    </div>\n' +
                       '                </li>';
                    sortIndex++;
                }
                $(".list>.list-songs>ul").append(wholeStr);
                bindMusic ($(".list>.list-songs>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        });

        //监听音乐播放完毕事件
        getAudio($(".playing-audio iframe")).addEventListener("ended",function () {
            playNextSong();
        });
    
// playing部分end




// ranking 部分start
    //遍历每个榜单，异步获取数据
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-1"),data.song_list);
                bindMusic ($(".ranking-1>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=2&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-2"),data.song_list);
                bindMusic ($(".ranking-2>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=11&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-11"),data.song_list);
                bindMusic ($(".ranking-11>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=12&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-12"),data.song_list);
                bindMusic ($(".ranking-12>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=21&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-21"),data.song_list);
                bindMusic ($(".ranking-21>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=22&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-22"),data.song_list);
                bindMusic ($(".ranking-22>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=23&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-23"),data.song_list);
                bindMusic ($(".ranking-23>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=24&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-24"),data.song_list);
                bindMusic ($(".ranking-24>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=25&size=10&offset=0",
            "get",
            "jsonp",
            function (data) {
                fillSongLi($(".ranking-25"),data.song_list);
                bindMusic ($(".ranking-25>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
            }
        );


    //填充榜单歌曲内容方法
        function fillSongLi(ele,data) {
            var str = "";
            for(var songNum=0;songNum<data.length;songNum++) {
                str += '<li data-title="'+data[songNum].title+'" data-index="'+songNum+'" data-list-class="'+$(ele).attr("data-typenum")+'" data-lyrics="'+data[songNum].lrclink+'" data-author="'+data[songNum].author+'" data-pic="'+data[songNum].pic_big+'" data-songid="'+data[songNum].song_id+'"><i>'+(songNum+1)+'. </i><span class="ranking-title">'+data[songNum].title+'</span><span class="ranking-author f-r">'+data[songNum].author+'</span></li>';
            }
            $(ele).find("ul").append(str);
        }


// ranking 部分end









