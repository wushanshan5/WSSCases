
//aside 部分start
    //点击对应标题，滑出对应内容
    $(".aside h2").each(function (index,ele) {
        $(ele).click(function () {
            //初始化所有tbody的高度，唯一
            $(".aside .kinds-content").each(function (ind,el) {
                $(el).animate({"height":0},200);
            });
            $(this).parent().find(".kinds-content").animate({"height":150},500);
        });
    });

    //为每个tbody内的a绑定点击事件，异步获取新的内容
    $(".aside tbody a").each(function (index,ele) {
        $(ele).click(function () {
            getAjax(
                "http://114.67.144.118:6589/tag/songs/"+handleTagUrl(currentTag)+"/0",
                "demo1.json",
                "get",
                "json",
                function (data) {
                    var songList = data.data.songItems;
                    //获取数据的总长度，得到页数
                    dealPages(data);
                    var str = "";
                    for(var i=0;i<songList.length;i++) {
                        str += '<li title="'+songList[i].sname+'" data-songid="'+songList[i].sid+'">\n' +
                            '                    <span class="content-song-order">'+(i+1)+'.</span>\n' +
                            '                    <span class="content-song-title">'+songList[i].sname+'</span>\n' +
                            '                    <span class="content-song-author">'+songList[i].author+'</span>\n' +
                            '                    <span class="content-song-album">'+songList[i].album+'</span>\n' +
                            '                </li>';
                    }
                    $(".content-songs>ul").html("").append(str);
                    //为每个li绑定点击事件--播放音乐
                    $(".content-songs>ul>li").each(function (index,ele) {
                        $(ele).get(0).onclick = function () {
                            window.sessionStorage.setItem("songId",$(ele).attr("data-songId"));
                            window.open("playing.html");
                        }
                    });
                }
            );
        });
    });
//aside 部分end

//content-songs 部分start

    //获取页面url
    var currentTag = document.URL;

    //获取传来的数据(tag)的方法
    function handleTagUrl(url) {
        var index1 = url.lastIndexOf("=");

        //decodeURI()解码参数
        return decodeURI(url.substring(index1+1));
    }
    //获取传来的title的方法
    function handleTitleUrl(url) {
        var index2 = url.indexOf("=");
        var index3 = url.indexOf("&");
        if(index3 < 0) {
            return null
        } else {
            var tmpStr = decodeURI(url.substring((index2+1),(index3)));
            return tmpStr;
        }
    }

    //加载对应参数的数据
    getAjax(
        "http://114.67.144.118:6589/tag/songs/"+handleTagUrl(currentTag)+"/"+0,
        "get",
        "json",
        function (data) {
            //把当前的栏目显示出来，并把对应的内容高亮显示
            var kindsContentArr = $(".kinds-content a");
            console.log((handleTitleUrl(currentTag)),(handleTagUrl(currentTag)));
            for(var a=0;a<kindsContentArr.length;a++) {
                if((handleTitleUrl(currentTag)) != null && (kindsContentArr[a].getAttribute("title") == handleTagUrl(currentTag))) {
                    console.log(kindsContentArr[a])
                    $(kindsContentArr[a]).addClass("aside-kinds-current").parent().parent().animate({"height":"150px"},200);
                    break;
                } else if((kindsContentArr[a].getAttribute("title") == handleTagUrl(currentTag)) && (handleTitleUrl(currentTag) == null)){
                    for(var c=0;c<kindsContentArr.length;c++) {
                        $(kindsContentArr[c]).parent().parent().animate({"height":"0px"},0);
                    }

                    $(kindsContentArr[a]).addClass("aside-kinds-current").parent().parent().animate({"height":"150px"},200);
                }
            }

            var songList = data.data.songItems;
            dealPages(data);
            var str = "";
            for(var i=0;i<songList.length;i++) {
                str += '<li title="'+songList[i].sname+'" data-songid="'+songList[i].sid+'">\n' +
                    '                    <span class="content-song-order">'+(i+1)+'.</span>\n' +
                    '                    <span class="content-song-title">'+songList[i].sname+'</span>\n' +
                    '                    <span class="content-song-author">'+songList[i].author+'</span>\n' +
                    '                    <span class="content-song-album">'+songList[i].album+'</span>\n' +
                    '                </li>';
            }
            //清空ul之前的内容，再追加其他内容
            $(".content-songs>ul").html("");
            $(".content-songs>ul").append(str);
            //为每个li绑定点击事件--播放音乐
            $(".content-songs>ul>li").each(function (index,ele) {
                $(ele).get(0).onclick = function () {
                    window.sessionStorage.setItem("songId",$(ele).attr("data-songId"));
                    window.open("playing.html");
                }
            });
        }
    );

    //页数按钮点击事件----获取数据填充到页面上
    function getAjaxSongList(title,offset) {
        getAjax(
            "http://114.67.144.118:6589/tag/songs/"+title+"/"+(offset-1)*20,
            "get",
            "json",
            function (data) {
                //把当前的栏目显示出来，并把对应的内容高亮显示
                var kindsContentArr = $(".kinds-content a");
                var currentAindex = 0;
                for(var a=0;a<kindsContentArr.length;a++) {
                    if(kindsContentArr[a].getAttribute("title") == handleTagUrl(currentTag)) {
                        //找到第一个就跳出循环
                        currentAindex = a;
                        break;
                    }
                }
                $(kindsContentArr[currentAindex]).addClass("aside-kinds-current").parent().parent().animate({"height":150},200);
                var songList = data.data.songItems;
                dealPages(data);
                var str = "";
                for(var i=0;i<songList.length;i++) {
                    str += '<li title="'+songList[i].sname+'" data-songid="'+songList[i].sid+'">\n' +
                        '                    <span class="content-song-order">'+(i+1)+'.</span>\n' +
                        '                    <span class="content-song-title">'+songList[i].sname+'</span>\n' +
                        '                    <span class="content-song-author">'+songList[i].author+'</span>\n' +
                        '                    <span class="content-song-album">'+songList[i].album+'</span>\n' +
                        '                </li>';
                }
                //清空ul之前的内容，再追加其他内容
                $(".content-songs>ul").html("");
                $(".content-songs>ul").append(str);
                //为每个li绑定点击事件--播放音乐
                $(".content-songs>ul>li").each(function (index,ele) {
                    $(ele).get(0).onclick = function () {
                        window.sessionStorage.setItem("songId",$(ele).attr("data-songId"));
                        window.open("playing.html");
                    }
                });
            }
        );
    }

    //处理页数
        //定义当前页数计数器
        var pageNum = 1;
        //定义总页数
        var wholePages = 1;
    function dealPages(data) {
        //获取数据的总长度，得到页数
        var dataNums = data.data.nums;
        wholePages = Math.ceil(dataNums/20);//总页数
        if(wholePages >= 7) {
            //重置按钮盒子内的内容
            $(".btns").html('<button class="page-num" type="button" data-offset="1">1</button>\n' +
                '                <button class="page-num" type="button" data-offset="2">2</button>\n' +
                '                <button class="page-num" type="button" data-offset="3">3</button>\n' +
                '                <button type="button" title="更多" class="other-btns">···</button>');
            var btnStr = '<button class="page-num" data-offset="'+(wholePages-2)+'" type="button">'+(wholePages-2)+'</button>' +
                         '<button class="page-num" data-offset="'+(wholePages-1)+'" type="button">'+(wholePages-1)+'</button>' +
                         '<button class="page-num" data-offset="'+(wholePages)+'" type="button">'+(wholePages)+'</button>';
            $(".btns").append(btnStr);

            //处理剩下的页数(3 ~ dataPages-2)
            var otherBtnStr = "";
            for(var i=3;i<wholePages-2;i++) {
                otherBtnStr += '<button class="page-num" data-offset="'+(i+1)+'" type="button">'+(i+1)+'</button>';
            }
            $(".other-btns").append("<div>"+otherBtnStr+"</div>");

            //设置内部的按钮绝对定位，未聚焦时diaplay：none，聚焦后出现
            $(".other-btns").click(function () {
                $(this).find("div").toggleClass("show");
            });

            //为每个页数绑定点击事件，获取相应的数据，并填充到content-song的ul内
            $(".btns button").click(function () {
                //判断按钮是否有偏移值，避免点击更多按钮时，出错
                if($(this).attr("data-offset")) {
                    pageNum = $(this).attr("data-offset");
                    getAjaxSongList(handleTagUrl(currentTag),$(this).attr("data-offset"));
                }
            });

        } else {
            $(".btns").html("");
            for(var j=0;j<wholePages;j++) {
                var btnStr = '<button class="page-num" data-offset="'+(j+1)+'" type="button">'+(j+1)+'</button>';
                $(".btns").append(btnStr);
            }
        }
    }


    //上下页按钮点击事件

    //上一页按钮
    $(".previous-page").click(function () {
        if(($(".page-num").length <= 1) || (pageNum == 1)) {
            alert("没有上一页面！");
        } else {
            pageNum--;
            getAjaxSongList(handleTagUrl(currentTag),pageNum);
        }
    });

    //下一页按钮
    $(".next-page").click(function () {
        console.log($(".page-num").get(0))
        if(($(".page-num").length <= 1) || (pageNum == wholePages)) {
            alert("没有下一页面！");
        } else {
            pageNum++;
            getAjaxSongList(handleTagUrl(currentTag),pageNum);
        }
    });

//content-songs 部分end

