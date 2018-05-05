$(function () {
    //页面初始化开始
        //当跳转searching.html时，根据本地存储的歌名获取到相关信息，并放置在该页面中
        var songTitle = window.sessionStorage.getItem("songTitle");
        console.log(songTitle)
        //跳转到该页面时，把搜索的文字放入搜索框中
        $(".nav-searching>input").val(songTitle);
        //并添加一条原来的记录
        //添加li元素，并且接入ul中(js中利用document.createElement创建元素)
        var newHis = document.createElement("li");
        newHis.innerHTML = "<a href=''#'>"+$(".nav-searching>input")[0].value+"</a><span class='history-delete'>×</span>";
        $(".nav-searching-his>ul").prepend(newHis);
        //(绑定点击事件)点击关闭按钮，删除当前的li
        $(".nav-searching-his>ul>li>span").on("click",function () {
            $(this).parent().remove();
        });
        $.ajax({
            dataType : "jsonp",
            data : songTitle,
            type : "get",
            url : "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+songTitle,
            success : function (data) {
               fillContent(data);
            }
        });
    //页面初始化结束

    // nav部分start

        //为nav-searching中的input绑定回车事件
        $(".nav-searching").on("keydown",function (event) {
            event = event || window.event;
            if((event.keyCode || event.which) == 13) {
                if($(".nav-searching>input").val().trim() != "") {
                    window.sessionStorage.setItem("songTitle",$(".nav-searching>input").val());
                    $.ajax({
                        dataType : "jsonp",
                        url : "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+ $(".nav-searching>input").val().trim(),
                        type : "get",
                        success : function (data) {
                            fillContent(data);
                        }
                    });
                    addHis();
                } else {
                    alert("请输入要搜索的歌曲名称！");
                }
            }
        });

        //搜索框搜索，异步获取数据
        $(".nav-searching>button").click(function () {
            if($(".nav-searching>input").val().trim() != "") {
                window.sessionStorage.setItem("songTitle",$(".nav-searching>input").val());
                $.ajax({
                    dataType : "jsonp",
                    url : "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+ $(".nav-searching>input").val().trim(),
                    type : "get",
                    success : function (data) {
                        fillContent(data);
                        addHis();
                    }
                });
            } else {
                alert("请输入要搜索的歌曲名称！");
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
        //搜索框记录事件
        //判断搜索框的点击事件来储存记录

        //点击清除记录，ul中的li清空
        $(".nav-searching-his>ul>h2").click(function () {
            $(".nav-searching-his>ul>li").each(function (index,ele) {
                $(ele).remove();
            })
        });

    // nav部分end

    function fillContent(data) {
    var songList = data.song;
    if(songList == undefined) {
        alert("没有该歌曲，请重新输入歌名！");
    } else {
        var songNumber = songList.length;
        var liStr = "";
        //通过for循环，得到对应的li的个数
        for(var i=0;i<songNumber;i++) {
            liStr += '<li data-songid="'+songList[i].songid+'" title="'+songList[i].songname+'"><a href="javascript:void(0)">\n' +
                '                    <img src="" alt=""><br>\n' +
                '                    <span class="result-title">'+songList[i].songname+'</span><br>\n' +
                '                    <span class="result-author">'+songList[i].artistname+'</span><br>\n' +
                '                </a></li>';
        }
        $(".result>ul").html(liStr);

        //利用递归依次执行ajax
        var currentIndex=0;//退出递归的条件变量
        function requestAjax(ele){
            if(currentIndex >= songNumber){ //infos是存放主机名称的数组
                return;
            }
            var currEle = $(ele).eq(currentIndex);
            $.ajax({
                dataType : "jsonp",
                url : "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid="+$(currEle).attr("data-songid"),
                type : "get",
                success :function(data){
                    currentIndex++;
                    //得到歌曲的详细信息
                    var dataInfo = data.songinfo;
                    //得到歌曲的播放url
                    var datalink = data.bitrate.show_link;
                    currEle.attr({
                        "data-pic": dataInfo.pic_big,
                        "data-title": dataInfo.title,
                        "data-lyrics": dataInfo.lrclink,
                        "data-author": dataInfo.author,
                        "data-songlink": datalink
                    });
                    currEle.find("img").get(0).src = $(currEle).attr("data-pic");
                    requestAjax(ele);
                }
            });
        }
        requestAjax($(".result>ul>li"));

        //为每个li绑定点击事件(播放音乐)
        bindMusic ($(".result>ul>li"),$(getAudio($(".playing-audio iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
    }

}


    // playing部分start
        //设置audio标签
        playMusicIframe($(".playing-audio iframe"),"","");

        //为音乐的按钮绑定事件
        //播放按钮
            $(".playing .playing-pause").on("click",function () {
        if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
            alert("没有歌曲哦！");
            return;
        }
        if(getAudio($(".playing-audio iframe")).paused) {
            getAudio($(".playing-audio iframe")).play();
            //处理时间
            playingTimer = playingInterval();
        } else {
            getAudio($(".playing-audio iframe")).pause();
            clearInterval(playingTimer);
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
        btnPlayingNextSong();
    });
        //歌曲进度条
            $(".playing-progress-bar").click(function(event) {
        // console.log(getAudio($(".playing-audio iframe")).src)
        if($(getAudio($(".playing-audio iframe"))).attr("src") == "") {
            alert("没有歌曲哦！");
            return;
        }
        //定义一个变量得到鼠标的位置
        var playLen = getMouseLength($(this),event);
        //设置当前歌曲进度条
        $(this).find('.current-progress-bar').css('width',playLen.len/playLen.wholeLen*100+"%");
        //设置audio的时间与进度条同步
        //比例*总时长
        getAudio($(".playing-audio iframe")).currentTime = Math.ceil(playLen.len/playLen.wholeLen*getAudio($(".playing-audio iframe")).duration);
        playingTi = getAudio($(".playing-audio iframe")).currentTime;
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
            $(".list").css({"transform":"translateX(0)","transition":"all 0.5s linear"});
            var currentType = $(".list-nav").find(".list-current").attr("data-type");
            //点击列表按钮，异步请求数据，得到歌曲
            $.ajax({
                dataType : "jsonp",
                url : "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+currentType+"&size=10&offset=0",
                type : 'get',
                success : function (data) {
                    var songsArr = data.song_list;
                    fillList(songsArr, $(".list-songs>li"));
                }
            });

        });
        //显示歌词按钮
            $(".playing-tools>button").click(function() {
        if($(".lyrics").hasClass('hide')) {
            $(this).css({"border":"1px solid #fff","color":"#fff"}).html("隐藏歌词");
        } else {
            $(this).css({"border":"1px solid rgba(212,60,51,0.9)","color":"rgba(212,60,51,0.9)"}).html("显示歌词");
        }
        $(".lyrics").toggleClass('hide');
    });
        //设置进度条的时间问题

        //监听音乐播放完毕事件
        // console.log(getAudio($(".playing-audio iframe")).get(0))
        getAudio($(".playing-audio iframe")).addEventListener("ended",function () {
            playNextSong();
        });
    // playing部分end
});