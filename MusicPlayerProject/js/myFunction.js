


//定义变量，来装播放的当前时间(秒为单位)，和歌词时间
    var playingTi = 0;
    var playingLyricsTi = 0;
    
//设置定时器来实现暂停，播放时的时间，和歌词时间
    var playingTimer = null;
    var playingLyricsTimer = null;

//ajax的封装
    function getAjax(url,type,datatype,success) {
        $.ajax({
            url: url,
            type: type,
            dataType: datatype,
            success: success
        });
    }
    
//添加历史记录的方法
    function addHis() {
        if(($(".nav-searching>input")[0].value!=undefined) && $(".nav-searching>input")[0].value.trim()!="") {
            //当重复点击，需要去除
            $(".nav-searching-his>ul>li").each(function (index,ele) {
                if($(".nav-searching>input")[0].value == $(ele).find("a").html()) {
                    $(ele).remove();
                }
            });
            //添加li元素，并且接入ul中(js中利用document.createElement创建元素)
            var newHis = document.createElement("li");
            newHis.innerHTML = "<a href=''#'>"+$(".nav-searching>input")[0].value+"</a><span class='history-delete'>×</span>";
            $(".nav-searching-his>ul").prepend(newHis);
            //(绑定点击事件)点击关闭按钮，删除当前的li
            $(".nav-searching-his>ul>li>span").on("click",function () {
                $(this).parent().remove();
            });

            //利用ajax查询到相应的歌曲

        }
    }
    
//产生随机数的方法  num为产生几个随机数，max表示产生0~max-1的随机数
    function randomNum (num,max) {
        //定义一个装随机数的数组
        var randomNumArr = [];
        //定义一个装有可以产生的随机数的所有可能的数组
        var ranArr = [];
        //对随机数数组进行赋值
        for(var i=0;i<max;i++) {
            ranArr[i] = i;
        }
        //利用for循环来产生随机数
        for(var ran=0;ran<num;ran++) {
            //定义一个索引值
            var ranLen = Math.floor(Math.random()*max);
            //将随机数数组对应的索引值的value进栈
            randomNumArr.push(ranArr[ranLen]);
            //将能产生随机数的范围减一
            max--;
            //将入栈的值从随机数数组中删除，这样就避免了重复使用同一个值
            ranArr.splice(ranLen,1);
        }
        return randomNumArr;
    }

//为li集合绑定点击事件，播放音乐
//ele为要点击的li的集合
//origin为将音乐文件放入的标签
    function bindMusic (ele,origin,contents,url) {
        $(ele).each(function(index, el) {
            $(el).get(0).onclick = function () {
                clearInterval(playingTimer);
                clearInterval(playingLyricsTimer);
                playingTi = 0;
                playingLyricsTi = 0;
                var songId = $(this).attr("data-songId");
                var songPic = $(this).attr("data-pic");
                var songTitle = $(this).attr("data-title");
                var songAuthor = $(this).attr("data-author");
                var songLyrics = $(this).attr("data-lyrics");
                var songLi = "";
                var songIndex = "";
                if($(this).attr("data-list-class")) {
                    songLi = $(this).attr("data-list-class");
                }
                if($(this).attr("data-index")) {
                    songIndex = $(this).attr("data-index");
                }
                playingMusicOnline(origin,url,contents,songAuthor,songTitle,songPic,songLyrics,songLi,songId,songIndex);
            }
        });
    }

//音乐的事件以及控制
//ele1和ele2 分别是音频的当前时间和音频的总时间
    function playMusic (ori,ele1,ele2,current,songLyrics) {
        $(".playing-pic").css({"animation":"rot 4s infinite linear"});
        //点击li播放音乐
        ori.play();
        //设置两个时间值
        playingTime(ele1,ele2,ori,current);
        playingLyricsTimer = playingLyricsInterval(songLyrics);
        playingTimer = playingInterval();
    }
//设置时间事件
    function playingTime (ele1,ele2,ori,current) {
        $(ele1).html(controlTime(Math.ceil(current)));
        $(ele2).html(controlTime(Math.ceil($(ori)[0].duration)));
    }
//控制时间格式的方法 wholeSec为总秒数，ele为要设置格式的标签
    function controlTime (wholeSec) {
        //00:00:00
        var minTen,minPer,secTen,secPer;
        minTen = Math.floor(wholeSec/60/10);
        minPer = Math.floor(wholeSec/60)%10;
        secTen = Math.floor((wholeSec-(minTen*60*10+minPer*60))/10);
        secPer = wholeSec%10;
        return ""+minTen+minPer+":"+secTen+secPer;
    }
//设置定时器来跟踪音乐播放时间
    function playingInterval() {
        var ti = setInterval(function () {
            playingTi++;
            if(playingTi >= getAudio($(".playing-audio iframe")).duration) {
                playingTi = Math.ceil(getAudio($(".playing-audio iframe")).duration);
            }
            playingTime($(".playing-progress>span:first-of-type"),$(".playing-progress>span:last-of-type"),$(getAudio($(".playing-audio iframe"))),playingTi);
            //设置进度条的宽度
            var timePercent = playingTi/getAudio($(".playing-audio iframe")).duration;
            $(".current-progress-bar").css('width', timePercent*100+"%");
        },1000);
        return ti;
    }
    function playingLyricsInterval(songLyrics) {
        //开启歌词的时间定时器
        getAjax(
            songLyrics,
            "get",
            "text",
            function (data) {
                playingLyricsTimer = setInterval(function () {
                    playingLyricsTi+=60;
                    var mt = Math.floor(playingLyricsTi/60/60/10);
                    var mp = Math.floor(playingLyricsTi/60/60)%10;
                    var st = Math.floor(((playingLyricsTi-(mt*60*60*10+mp*60*60))/60)/10);
                    var sp = Math.floor(((playingLyricsTi-(mt*60*60*10+mp*60*60))/60)%10);
                    var lt = Math.floor(playingLyricsTi%60/10);
                    var lp = Math.floor(playingLyricsTi%10);
                    if(Math.floor(playingLyricsTi/60) >= getAudio($(".playing-audio iframe")).duration) {
                        playingLyricsTi = Math.floor(getAudio($(".playing-audio iframe")).duration);
                    }
                    $(".lyrics-time").html(mt+""+mp+":"+st+""+sp+":"+lt+""+lp);
                    handleLyrics(data,$(".lyrics-time").html());
                },1000);
            }
        );
    }
    function isPlaying(ele,btn) {
        if($(ele)[0].paused) {
            $(".playing-pic").css({"animation":""})
            $(btn).addClass('fa-play').removeClass("fa-pause");
        } else {
            $(btn).addClass('fa-pause').removeClass('fa-play');
        }
    }
//获取声量方法
    function getVolumn(ele) {
        return $(ele).width();
    }
//获取鼠标在某元素上的长度
    function getMouseLength(ele,event) {
        //鼠标距离某元素的最左端的长度=鼠标在body上的坐标-该元素在body上的坐标
        //即mouseLength = event.pageX-ele.pageX
        //鼠标在body上的坐标 = event.pageX || scroll().left+event.clientYX;
        event = event || window.event;
        var mouseX = event.pageX || scroll().left+event.clientX;
        //返回len为鼠标距离ele左侧的距离，wholeLen表示ele的总长度
        return {"len":mouseX-$(ele).offset().left,"wholeLen":$(ele).width()};
    }
//处理歌词的方法
    function handleLyrics(str,time) {

        if(typeof binlyric != 'object') {binlyric = {};}
        binlyric = {
            edition:"1.1",
            obj:"",
            lyricCSS:new Object(),
            txt:"",
            index:0,
            time:new Array(),
            lyric:new Array(),
            sort:function(){ // 冒泡排序（从小到大）
                var third;
                //对歌词事件进行排序
                for(var j=0;j<this.index-1;j++)
                {
                    for(var i=0;i<this.index-1;i++)
                    {
                        if(this.time[i]>this.time[i+1])
                        {
                            //互换时间
                            third = this.time[i];
                            this.time[i] = this.time[i+1];
                            this.time[i+1] = third;
                            //互换歌词
                            third = this.lyric[i];
                            this.lyric[i] = this.lyric[i+1];
                            this.lyric[i+1] = third;
                        }
                    }
                }
            },
            createPanel:function(){ // 创建歌词面板
                var i=0;
                $(this.obj).html("");
                for(i=0;i<this.index;i++)
                {
                    $(this.obj).append("<div>"+this.lyric[i]+"</div>");
                }
                for(i in this.lyricCSS)
                {
                    $(this.obj).find("div").css(this.lyricCSS,this.lyricCSS[i]);
                }
            },
            findTags:function(index,strArray,number){ // 查找标签（包括任何扩展的标签）
                // 此方法能匹配所有格式的标签
                // 因为此方法是在后面写的，所以时间标签并没有使用此方法
                number = number || this.txt.length;
                number = (number>this.txt.length) ? this.txt.length:number;
                var i,j,complete=0,value;
                var obj = new Object();
                obj.booble = false;
                obj.value = "[";
                for(i=index;i<number;i++)
                {
                    if(this.txt.substr(i,1)==strArray[complete].s)
                    {
                        complete+=1;
                        if(complete>1)
                        {
                            if(complete<strArray.length)
                            {
                                obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"},';
                            }
                            else
                            {
                                obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"}]';
                            }
                        }
                        if(complete==strArray.length)
                        {
                            obj.txt = this.txt.substr(index,i-index+1);
                            obj.value = eval('('+obj.value+')');
                            obj.index = i+1;
                            obj.booble = true;
                            break
                        }
                        value = i;
                    }
                    else if(this.txt.substr(i,1)=="\n")
                    {
                        obj.booble = false;
                        return obj;
                    }
                    else if(this.txt.substr(i,1)==strArray[0].s && complete>0) // 遇到2次开始标志就退出
                    {
                        obj.booble = false;
                        return obj;
                    }
                }
                return obj;
            },
            findlyric:function(index){ // 查找歌词： 有则返回 歌词、继续查找的位置， 否则只返回继续查找的位置
                var obj = {};
                var str = this.txt;
                var i;
                for(i=index;i<str.length;i++)
                {
                    if(str.charAt(i)=="[")
                    {
                        var _obj = this.findTags(i,[{s:"["},{s:":"},{s:"]"}]);
                        if(_obj.booble)
                        {
                            obj.index = i;//i + _obj.txt.length;
                            obj.lyric = str.substr(index,i-index);
                            return obj;
                        }
                    }
                    else if(str.charAt(i)=="\n")
                    {
                        obj.index = i+1;
                        obj.lyric = str.substr(index,i-index);
                        return obj
                    }
                }
                if(i==str.length) // 专处理最后一句歌词（最后一句歌词比较特殊）
                {
                    obj.index = i+1;
                    obj.lyric = str.substr(index,i-index);
                    return obj;
                }
                obj.index = i;
                return obj;
            },
            findTime:function(index){ // 查找时间 ： 有则返回 时间、继续查找的位置， 否则只返回继续查找的位置
                // 此功能可以用 findTags 方法实现，更简单、更强大、代码更少
                // findTags方法 是在后面写的，所以这里就不改了，具体可参考 findID方法里的使用实例
                var obj = {};
                var thisobj = this;
                var str = this.txt;
                obj.index = index;
                function recursion()
                {
                    var _obj = thisobj.findTime(obj.index);
                    if(_obj.time)
                    {
                        obj.time += _obj.time;
                        obj.index = _obj.index;
                    }
                }
                // --------------- 可以在这里 扩展 其它功能 ---------------
                // lrc歌词只能精确到每句歌词，可以通过扩展lrc 精确 到 每个字
                if(/\[\d{1,2}\:\d{1,2}\.\d{1,2}\]/.test(str.substr(index,10))) // [mm:ss.ff]
                {
                    obj.time = str.substr(index+1,8) + "|";
                    obj.index = index+9+1;
                    recursion();
                }
                else if(/\[\d{1,2}\:\d{1,2}\]/.test(str.substr(index,7))) // [mm:ss]
                {
                    obj.time = str.substr(index+1,5) + ".00" + "|";
                    obj.index = index+6+1;
                    recursion();
                }
                // 以下标签均属于合法标签，但很少被使用，请根据需要进行扩展
                // [mm:ss.f] [mm:s.ff] [mm:s.f] [m:ss.ff] [m:s.ff] [m:s.f]
                // [mm:s] [m:ss] [s:s]
                return obj;
            },
            findID:function(index){ // 查找预定义标识
                //[ar:艺人名]
                //[ti:曲名]
                //[al:专辑名]
                //[by:编者（指编辑LRC歌词的人）]
                //[offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。（很少被使用）
                // 注：本程序也不支持 offset 功能（但是能取值），如需要 请自行在 sort 方法添加此功能
                // 此处功能 使用 findTags方法 实现
                var obj;
                obj = this.findTags(index,[{s:"["},{s:":"},{s:"]"}]);
                if(obj.booble)
                {
                    if(obj.value[0].value=="ar")
                    {
                        this.ar = obj.value[1].value;
                    }
                    else if(obj.value[0].value=="ti")
                    {
                        this.ti = obj.value[1].value;
                    }
                    else if(obj.value[0].value=="al")
                    {
                        this.al = obj.value[1].value;
                    }
                    else if(obj.value[0].value=="by")
                    {
                        this.by = obj.value[1].value;
                    }
                    else if(obj.value[0].value=="offset") // 这里是 offset 的值
                    {
                        this.offset = obj.value[1].value;
                    }
                }
            },
            analysis:function(){ // 解析
                if(this.txt=="") return false;
                var str = this.txt;
                this.index = 0;
                for(var i=0;i<str.length;i++)
                {
                    if(str.charAt(i)=="[")
                    {
                        var time = this.findTime(i);
                        if(time.time) // 时间标签
                        {
                            var lyric = this.findlyric(time.index);
                            if(lyric.lyric!="\n" && lyric.lyric!="") // 去掉无意义歌词
                            {
                                var timeArray = time.time.split("|");
                                for(var j=0;j<timeArray.length;j++)
                                {
                                    if(timeArray[j])
                                    {
                                        this.time[this.index] = timeArray[j];
                                        this.lyric[this.index] = lyric.lyric;
                                        this.index+=1;
                                    }
                                }
                            }
                            i = time.index;
                        }
                        else // 预定义标签
                        {
                            this.findID(i);
                        }
                    }
                }
                this.sort();
                this.createPanel();
            },
            play:function(position,CSS){ // 定位指定时间的歌词
                var time;
                var obj = this;
                function set(index)
                {
                    var height = parseInt($(obj.obj).find("div").css("height"));
                    var top = parseInt($(obj.obj).find("div").css("margin-top"));
                    // $(obj.obj).animate({
                    //     scrollTop:(index*height+index*top-parseInt($(obj.obj).css("height"))/2+height/2)
                    // },300);
                    if(index != undefined) {
                        if((index*height-80)>0) {
                            $(obj.obj).css({"transform":"translateY("+(index*height-100)*-1+"px)","transition":"transform 0.5s"});
                        }
                    }
                    for(var i in CSS)
                    {
                        $(obj.obj).find("div").eq(index).css(CSS,CSS[i]);
                    }
                }
                for(var i=0;i<this.index;i++)
                {
                    if(position==this.time[i])
                    {
                        set(i);
                        return;
                    }
                    else if(position>this.time[i])
                    {
                        time = i;
                    }
                }
                set(time);// 没找到匹配时间 则就近最小选择
            }
        };

        binlyric.txt = str;
        binlyric.obj = ".lyrics-content";
        binlyric.lyricCSS = {"font-size":"16px","height":"40px","line-height":"40px","text-align":"center"};
        binlyric.analysis();
        binlyric.play(time,{
            color:"yellow"
        });
    }

//异步获取数据返回到页面上的方法
//根据数据填充列表
//srcArr是一个数组
    function fillList(srcArr,ele) {
        for(var i=0;i<srcArr.length;i++) {
            var songPic = "";
            if(srcArr[i].pic_small != undefined) {
                songPic = srcArr[i].pic_small;
            } else if(srcArr[i].pic_big != undefined) {
                songPic = srcArr[i].pic_big;
            }
            else if(srcArr[i].pic_radio != undefined) {
                songPic = srcArr[i].pic_radio;
            }
            else if(srcArr[i].pic_s500 != undefined) {
                songPic = srcArr[i].pic_s500;
            }
            else if(srcArr[i].pic_premium != undefined) {
                songPic = srcArr[i].pic_premium;
            }
            else if(srcArr[i].album_500_500 != undefined) {
                songPic = srcArr[i].album_500_500;
            }
            else if(srcArr[i].album_800_800 != undefined) {
                songPic = srcArr[i].album_800_800;
            }
            else if(srcArr[i].album_1000_1000 != undefined) {
                songPic = srcArr[i].album_1000_1000;
            }
            else {
                songPic = srcArr[i].pic_huge;
            }
            $(ele).eq(i).find("img").get(0).src = songPic;
            $(ele).eq(i).find(".list-song-singer").html(srcArr[i].artist_name);
            $(ele).eq(i).find(".list-song-title").html(srcArr[i].album_title);
            $(ele).eq(i).attr({"data-songid":srcArr[i].song_id,"data-lyrics":srcArr[i].lrclink,"data-title":srcArr[i].title,"data-author":srcArr[i].author,"data-pic":songPic,"data-list-class":$(ele).parent().get(0).className});
        }
    }

//播放音乐方法
    function listenMusic(contents,songAuthor,songTitle,songPic,songLyrics) {
        //设置标题作者
        $(contents).find('.playing-author-name').html(songAuthor);
        $(contents).find('.playing-author-title').html(songTitle);
        //设置当前列表
        $(contents)[0].querySelector(".playing-pic>img").src = songPic;

    }

//破解防盗链  利用iframe，实现在线听音乐
    function playMusicIframe(origin,url,songId) {
        var frameid = 'frameaudio';
        window.img = '<audio id="audio" src="'+url+songId+'" ></audio>';
        $(origin).get(0).id=frameid;
        $(origin).get(0).src="javascript:parent.img;";
        $(origin).get(0).frameBorder="0";
        $(origin).get(0).scrolling="no";
        $(origin).get(0).width="100%";
    }
    function playingMusicOnline(origin,url,contents,songAuthor,songTitle,songPic,songLyrics,songLi,songId,songIndex) {
        var audioEle = origin.get(0);
        $.ajax({
            dataType: "jsonp",
            url: url+songId,
            type: "get",
            success: function (data) {
                audioEle.src = data.bitrate.show_link;
                $(".playing-download").attr("data-src", data.bitrate.show_link);
                audioEle.setAttribute("data-listname", songLi);
                audioEle.setAttribute("data-songId", songId);
                audioEle.setAttribute("data-li-index", songIndex);
                audioEle.setAttribute("data-title", songTitle);
                audioEle.setAttribute("data-author", songAuthor);
                audioEle.setAttribute("data-pic", songPic);
                audioEle.setAttribute("data-lyrics", songLyrics);
                playMusic(audioEle, $(".playing .playing-progress:first-of-type"), $(".playing .playing-progress:last-of-type"), controlTime(playingTi), songLyrics);
                isPlaying(audioEle, $(".playing .playing-pause"));
                listenMusic(contents, songAuthor, songTitle, songPic, songLyrics);

                //判断是否有音乐正在播放，如果有，异步获取到对应的列表
                if ($(getAudio($(".playing-audio iframe"))).attr("src") != "") {
                    //取出正在播放的歌曲的list的data-typenum，填充到list-song里面
                    var currentListName = $(getAudio($(".playing-audio iframe"))).attr("data-listname");
                    //获取到对应list的ul
                    var listSong = $(".ranking-" + currentListName).find("ul").find("li");
                    var wholeStr = "";
                    $(".list>.list-songs>ul").html("");
                    //歌曲序号重置
                    sortIndex = 0;
                    for (var i = 0; i < listSong.length; i++) {
                        wholeStr += '<li class="clearfix" data-pic="' + $(listSong[i]).attr("data-pic") + '" data-author="' + $(listSong[i]).attr("data-author") + '" data-title="' + $(listSong[i]).attr("data-title") + '" data-lyrics="' + $(listSong[i]).attr("data-lyrics") + '" data-list-class="' + $(listSong[i]).attr("data-list-class") + '" data-songid="' + $(listSong[i]).attr("data-songid") + '" data-index="' + sortIndex + '">\n' +
                            '                    <div class="list-song-pic f-l">\n' +
                            '                    <img src="' + $(listSong[i]).attr("data-pic") + '" alt="">\n' +
                            '                </div>\n' +
                            '                    <div class="list-song-info f-l">\n' +
                            '                        <span class="list-song-singer">' + $(listSong[i]).attr("data-author") + '</span><br>\n' +
                            '                        <span class="list-song-title">' + $(listSong[i]).attr("data-title") + '</span>\n' +
                            '                    </div>\n' +
                            '                </li>';
                        sortIndex++;
                    }
                    $(".list>.list-songs>ul").append(wholeStr);
                }

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
                                bindMusic($(".list>.list-songs>ul>li"),$(getAudio($(".playing-audio>iframe"))),$(".playing"),"http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid=");
                            }
                        );
                    }
                );
            }
        });

    }

//获取iframe中的audio标签
    function getAudio(ele) {
        return ele.get(0).contentWindow.document.querySelector("audio");
    }

//音频播放完毕执行的函数
    function playNextSong() {
        clearInterval(playingTimer);
        clearInterval(playingLyricsTimer);
        //当前时间归0
        playingTi = 0;
        playingLyricsTi = 0;
        //如果该标签的data-listname 有值就进行判断
        if($(getAudio($(".playing-audio iframe"))).attr("data-listname") != "") {

            //获取当前播放的歌曲的序号
            var songIndex = $(getAudio($(".playing-audio iframe"))).attr("data-li-index");
            var nextLi,songId,songAuthor,songTitle,songLyrics,songPic,songListname = "";
            //判断循环按钮的类型，播放下一首歌曲
            // 顺序播放 &#xe671;
            // 随机播放 &#xe622;
            // 单曲循环 &#xe607;
            if($(".playing-loop").attr("data-type") == 0) {
                //顺序播放
                songIndex++;
                if(songIndex>$(".list-songs>ul>li").length-1) {
                    songIndex = 0;
                }
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");

            } else if ($(".playing-loop").attr("data-type") == 1) {
                //随机播放
                songIndex = randomNum(1,10);
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            } else {
                //单曲循环
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            }
        } else {
            $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
            alert("歌曲播放完毕！");
            return;
        }
        $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
        var audioEle = $(".playing-audio iframe").get(0).contentWindow.document.querySelector("audio");
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid="+songId,
            "get",
            "jsonp",
            function (data) {
                audioEle.src = data.bitrate.show_link;
                audioEle.setAttribute("data-listname",songListname);
                audioEle.setAttribute("data-songId",songId);
                audioEle.setAttribute("data-li-index",songIndex);
                audioEle.setAttribute("data-title",songTitle);
                audioEle.setAttribute("data-author",songAuthor);
                audioEle.setAttribute("data-lyrics",songLyrics);
                audioEle.setAttribute("data-pic",songPic);
                playMusic(audioEle,$(".playing .playing-progress:first-of-type"),$(".playing .playing-progress:last-of-type"),controlTime(playingTi));
                isPlaying(audioEle,$(".playing .playing-pause"));
                listenMusic($(".playing"),songAuthor,songTitle,songPic,songLyrics);
            }
            );
    }
    
//点击前一首按钮执行的函数
    function btnPlayingPrevSong() {
        clearInterval(playingTimer);
        clearInterval(playingLyricsTimer);
        //当前时间归0
        playingTi = 0;
        playingLyricsTi = 0;
        //如果该标签的data-listname 有值就进行判断
        if($(getAudio($(".playing-audio iframe"))).attr("data-listname") != "") {

            //获取当前播放的歌曲的序号
            var songIndex = $(getAudio($(".playing-audio iframe"))).attr("data-li-index");
            var nextLi,songId,songAuthor,songTitle,songLyrics,songPic,songListname = "";
            //判断循环按钮的类型，播放下一首歌曲
            // 顺序播放 &#xe671;
            // 随机播放 &#xe622;
            // 单曲循环 &#xe607;
            if($(".playing-loop").attr("data-type") == 0) {
                //顺序播放
                songIndex--;
                console.log(songIndex)
                if(songIndex < 0) {
                    songIndex = $(".list-songs>ul>li").length-1;
                }
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");

            } else if ($(".playing-loop").attr("data-type") == 1) {
                //随机播放
                songIndex = randomNum(1,10);
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            } else {
                //单曲循环
                songIndex--;
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            }
        } else {
            $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
            alert("歌曲播放完毕！");
            return;
        }
        $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
        var audioEle = $(".playing-audio iframe").get(0).contentWindow.document.querySelector("audio");
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid="+songId,
            "get",
            "jsonp",
            function (data) {
                audioEle.src = data.bitrate.show_link;
                audioEle.setAttribute("data-listname",songListname);
                audioEle.setAttribute("data-songId",songId);
                audioEle.setAttribute("data-li-index",songIndex);
                audioEle.setAttribute("data-title",songTitle);
                audioEle.setAttribute("data-author",songAuthor);
                audioEle.setAttribute("data-lyrics",songLyrics);
                audioEle.setAttribute("data-pic",songPic);
                playMusic(audioEle,$(".playing .playing-progress:first-of-type"),$(".playing .playing-progress:last-of-type"),controlTime(playingTi));
                isPlaying(audioEle,$(".playing .playing-pause"));
                listenMusic($(".playing"),songAuthor,songTitle,songPic,songLyrics);
            }
        );
    }

//点击后一首按钮执行的函数
    function btnPlayingNextSong() {
        clearInterval(playingTimer);
        clearInterval(playingLyricsTimer);
        //当前时间归0
        playingTi = 0;
        playingLyricsTi = 0;
        //如果该标签的data-listname 有值就进行判断
        if($(getAudio($(".playing-audio iframe"))).attr("data-listname") != "") {
            //获取当前列表类型号
            var songListType = $(getAudio($(".playing-audio iframe"))).attr("data-listname");
            //获取当前播放的歌曲的序号
            var songIndex = $(getAudio($(".playing-audio iframe"))).attr("data-li-index");
            var nextLi,songId,songAuthor,songTitle,songLyrics,songPic,songListname = "";
            //判断循环按钮的类型，播放下一首歌曲
            // 顺序播放 &#xe671;
            // 随机播放 &#xe622;
            // 单曲循环 &#xe607;
            if($(".playing-loop").attr("data-type") == 0) {
                //顺序播放
                songIndex++;
                if(songIndex>$(".list-songs>ul>li").length-1) {
                    songIndex = 0;
                }
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");

            } else if ($(".playing-loop").attr("data-type") == 1) {
                //随机播放
                songIndex = randomNum(1,$(".list-songs>ul>li").length);
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            } else {
                //单曲循环
                songIndex++;
                nextLi = $(".list-songs>ul>li").eq(songIndex);
                songId = nextLi.attr("data-songid");
                songAuthor = nextLi.attr("data-author");
                songTitle = nextLi.attr("data-title");
                songLyrics = nextLi.attr("data-lyrics");
                songPic = nextLi.attr("data-pic");
                songListname = nextLi.attr("data-list-class");
            }
        } else {
            $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
            alert("歌曲播放完毕！");
            return;
        }
        $(".playing .playing-pause").removeClass("fa-pause").addClass("fa-play");
        var audioEle = $(".playing-audio iframe").get(0).contentWindow.document.querySelector("audio");
        getAjax(
            "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.playAAC&songid="+songId,
            "get",
            "jsonp",
            function (data) {
                console.log(data)
                audioEle.src = data.bitrate.show_link;
                audioEle.setAttribute("data-listname",songListname);
                audioEle.setAttribute("data-songId",songId);
                audioEle.setAttribute("data-li-index",songIndex);
                audioEle.setAttribute("data-title",songTitle);
                audioEle.setAttribute("data-author",songAuthor);
                audioEle.setAttribute("data-lyrics",songLyrics);
                audioEle.setAttribute("data-pic",songPic);
                playMusic(audioEle,$(".playing .playing-progress:first-of-type"),$(".playing .playing-progress:last-of-type"),controlTime(playingTi));
                isPlaying(audioEle,$(".playing .playing-pause"));
                listenMusic($(".playing"),songAuthor,songTitle,songPic,songLyrics);
            }
        );
    }
    
//定义一个鼠标滚动事件，滚动到最底下，触发事事件
//whole为要滚动的总长度，scroll为滚轮滚动的长度，height为可视长度
    function mouseScroll(ele,func) {
        $(ele).on("scroll",function () {
            var whole = $(ele).find("ul").get(0).offsetHeight;
            var height = $(ele).get(0).offsetHeight;
            var scroll = $(ele).get(0).scrollTop;
            if(scroll >= (whole-height)) {
                func();
        }
    });
}


//封装scroll()方法,返回json对象
function scroll() {
    if(window.pageXOffset !== undefined){
        return {"top":window.pageYOffset,//x和y相对应的不能写错了
            "left":window.pageXOffset};
    }else if(document.compatMode === "CSS1Compat"){
        return {"top":document.documentElement.top,
            "left":document.documentElement.left};
    }else {
        return {"top":document.body.scrollTop,
            "left":document.body.scrollLeft};
    }
}

//body缓慢滚动函数
var timer = null;
function scrollSlow(target,now) {
    var step = 0;
    clearInterval(timer);
    timer = setInterval(function () {
    step = (target-now)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        document.body.scrollTo(0,step+now);
        now = now+step;
        if(Math.abs(target-now) <= Math.abs(step)){
            document.body.scrollTo(0,target);
            clearInterval(timer);
        }
    },20);
}





