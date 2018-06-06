
    //提前声明变量，设置introduction的高度
    var banner = document.querySelector(".banner");
    $(".introduction").css({"height":(banner.offsetHeight)});
    //获取第一个p，第二个p，span，i的offsetWidth，滑动到对应位置展示出对应的内容
    var firstPTop = $(".introduction p:first-of-type").offset().top;
    var secondPTop = $(".introduction p:nth-of-type(2)").offset().top;
    var iTop = $(".introduction i").offset().top;
    var spanTop = $(".introduction span").offset().top;
    var windHeight = $(window).height();

    //获取product部分的第一行和第二行的offset高度，滑动到对应位置，展示对应的内容
    var firstPro = $(".product .container-fluid>div:first-child").offset().top;
    var secondPro = $(".product .container-fluid>div:nth-child(3)").offset().top;

    //获取exclusive部分的offset高度，滚动到对应高度，展示对应的内容
    var chamTop = $(".champagne-content").offset().top;
    //获取exclusive部分的news的offset高度，滚动到对应高度，展示对应的内容
    var newsTop = $(".exclutive .news-content").offset().top;

    //fixed 部分start
        //点击对应的a标签，滑动跳转对应的内容界面
        var navTop = $(".nav").offset().top;
        var introTop = $(".introduction").offset().top;
        var produTop = $(".product").offset().top;
        var champagneTop = $(".champagne").offset().top;
        var lastyNewsTop = $(".news").offset().top;
        var contactTop = $(".footer").offset().top;
        var topArr = [navTop,introTop,produTop,champagneTop,lastyNewsTop,contactTop];
        $(".fixed .container-fluid>div").each(function (ind,ele) {
            $(ele).get(0).dataset["index"] = ind;
            // $(ele).data("index",ind);
            $(ele).click(function () {
                //获取自定义的属性的值，利用ele.dataset.index得到
                console.log($(ele).get(0).dataset.index)
                jumpTo(topArr[$(ele).get(0).dataset.index],window);
            });
        });

    //封装一个方法实现楼层跳跃
    var jumper = null;
    function jumpTo(target,ele) {
        clearInterval(jumper);
        jumper = setInterval(function () {
            var step = (target-scrollHeight)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            ele.scrollTo(0,step+scrollHeight);
            if(Math.abs(target-scrollHeight)<=step){
                ele.scrollTo(0,target);
                clearInterval(jumper);
            }
        },10);
    }
    //fixed 部分end


    //fixed 部分start
        //当页面滑动了一定的高度，fixed出现
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollHeight>300) {
            $('.fixed').slideDown(500);
        } else {
            $(".fixed").slideUp(500);
        }
        window.onscroll = function () {
            $(".introduction").css({"height":(banner.offsetHeight)});
            scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollHeight>400) {
                $('.fixed').show(500);
            } else if(scrollHeight<300) {
                $(".fixed").hide(500);
            }
            //对introduction内的元素进行判断
            introductionJustify();
            //对product内的元素进行判断
            productAnimate();
            //对exclusive内的元素进行判断
            exclusiveAnimate();
            //对news-content内的元素进行判断
            newsAnimate();
        }
        //点击fixed的对应部分，滑动到对应的界面
    //fixed 部分end

    //banner 部分 start
        //获取当前浏览器可视区域的宽度
        var bannerLiArr = banner.querySelectorAll('ul>li');
        var bannerLiLength = banner.offsetWidth;
        var banIndex = 0;//设置图片的索引值
        //定义定时器
        var bannerTimer = null;
        //动态获取宽度，当调节浏览器屏幕时，自动适应轮播
        window.onresize = function () {
            bannerLiLength = banner.offsetWidth;
            //在这里动态确定introduction内元素在页面的位置
            firstPTop = $(".introduction p:first-of-type").offset().top;
            secondPTop = $(".introduction p:nth-of-type(2)").offset().top;
            iTop = $(".introduction i").offset().top;
            spanTop = $(".introduction span").offset().top;
            //利用jquery中的$(window).height()可以获取到浏览器当前窗口可视区域高度
            windHeight = $(window).height();
            //由于会调整浏览器的尺寸，因此要重新获取各个部分的offsetTop值
             navTop = $(".nav").offset().top;
             introTop = $(".introduction").offset().top;
             produTop = $(".product").offset().top;
             champagneTop = $(".champagne").offset().top;
             lastyNewsTop = $(".news").offset().top;
             contactTop = $(".footer").offset().top;
             topArr = [navTop,introTop,produTop,champagneTop,lastyNewsTop,contactTop];
        }

    //banner轮播图
        //获取左箭头和右箭头，实现点击事件
        $(".banner-left").click(function () {
            banIndex--;
            //轮播判断，当小于0时，要立即跳转到最后一个
            if(banIndex<0) {
                banIndex = bannerLiArr.length-1;
                document.querySelector('.banner>ul').style.left = (banIndex*bannerLiLength*-1)+"px";
                banIndex--;
            }
            $(".banner>ul").animate({"left":(banIndex*bannerLiLength*-1)},500);
            //为dot内对应的i，添加active类
            $(".banner .dot>i").each(function (index,ele) {
              $(ele).removeClass('active');
            }).eq(banIndex).addClass('active');
        });
        $(".banner-right").click(function () {
            banIndex++;
            $(".banner>ul").animate({"left":(banIndex*bannerLiLength*-1)},500,function () {
                //进行判断，当索引值大于了长度-1，需要跳回到0
                if(banIndex>=bannerLiArr.length-1) {
                    banIndex = 0;
                    $(".banner>ul").css({"left": (banIndex*bannerLiLength*-1)});
                }
            });
            //由于索引值分别是1 2 3 ，因此添加active类时，需要进行判断
            if(banIndex>=bannerLiArr.length-1) {
                $(".banner .dot>i").each(function (index,ele) {
                    $(ele).removeClass('active');
                }).eq(0).addClass('active');
            }else {
                $(".banner .dot>i").each(function (index,ele) {
                    $(ele).removeClass('active');
                }).eq(banIndex).addClass('active');
            }
        });
        //点击对应的i，跳转对应的图片
        $(".banner .dot>i").each(function (index,ele) {
            $(ele).get(0).dataset['index'] = index;
            $(ele).click(function () {
                banIndex = $(this).get(0).dataset['index'];
                $(".banner .dot>i").each(function (index,ele) {
                    $(ele).removeClass('active');
                }).eq(banIndex).addClass('active');
                $(".banner>ul").animate({"left":(banIndex*bannerLiLength*-1)},500);
            });
        });
        //自动轮播----代码和向右滑动一模一样
        bannerTimer = setInterval(function () {
            carouselRight();
        },1500);
        //鼠标放在banner上，需要清除定时器，鼠标移开，需要再设置定时器
        $(".banner").on("mouseenter",function () {
            clearInterval(bannerTimer);
        }).on('mouseleave',function () {
            bannerTimer = setInterval(function () {
                carouselRight();
            },1500);
        });
        //封装一个向右滑动的方法，减少代码量
        function carouselRight () {
            banIndex++;
            $(".banner>ul").animate({"left":(banIndex*bannerLiLength*-1)},500,function () {
                if(banIndex>=bannerLiArr.length-1) {
                    banIndex = 0;
                    $(".banner>ul").css({"left": (banIndex*bannerLiLength*-1)});
                }
            });
            if(banIndex>=bannerLiArr.length-1) {
                $(".banner .dot>i").each(function (index,ele) {
                    $(ele).removeClass('active');
                }).eq(0).addClass('active');
            }else {
                $(".banner .dot>i").each(function (index,ele) {
                    $(ele).removeClass('active');
                }).eq(banIndex).addClass('active');
            }
        }
    //banner 部分 end

    //introduction 部分start
        //在这里对可视高度与introduction内的元素的top值作比较
        introductionJustify();
        function introductionJustify () {
                if(scrollHeight>=(firstPTop-windHeight)) {
                    $(".introduction p:first-of-type").css({"opacity":1}).delay(1000).css({"transform":"translateY(20px)","transition":"all 0.5s"}).delay(500);
                } else {
                    $(".introduction p:first-of-type").css({"opacity":0});
                }
                if(scrollHeight>=(secondPTop-windHeight)) {
                    $(".introduction p:nth-of-type(2)").css({"opacity":1}).delay(1000).css({"transform":"translateY(20px)","transition":"all 0.5s"}).delay(500);
                }
                if(scrollHeight>=(iTop-windHeight)) {
                    $(".introduction i").css({"opacity":1}).delay(1000).css({"transform":"translateY(20px)","transition":"all 1s"});
                }
                if(scrollHeight>=(spanTop-windHeight)) {
                    $(".introduction span").animate({"opacity":1},1000).delay(1000).css({"transform":"translateY(20px)","transition":"all 1s"});
                }
        }
    //introduction 部分end

    //product 部分start
        productAnimate();
        function productAnimate () {
            if(scrollHeight>=(firstPro-windHeight)) {
                $(".product .container-fluid>div:nth-child(1)").addClass("bounceIn");
                $(".product .container-fluid>div:nth-child(2)").addClass("bounceIn");
            }
            if(scrollHeight>=(secondPro-windHeight)) {
                $(".product .container-fluid>div:nth-child(3)").addClass("bounceIn");
                $(".product .container-fluid>div:nth-child(4)").addClass("bounceIn");
            }
        }
    //product 部分end

    //exclusive 部分start
        //champagne部分
        exclusiveAnimate();
        function exclusiveAnimate () {
            if(scrollHeight>=(chamTop-windHeight)) {
                $(".champagne-content>.container-fluid").css({"transform":"translateX(0px)","transition":"all 1s"});
            }
        }
        //news部分
        newsAnimate();
        function newsAnimate () {
            if(scrollHeight>=(newsTop-windHeight)) {
                $(".exclutive .news-content .container>div").each(function (index,ele) {
                        $(ele).animate({"opacity":1},500).delay(500);
                        $(ele).css({"transform":"translateX(0px)","transition":"all 1s"});
                })
            }
        }
    //exclusive 部分end



