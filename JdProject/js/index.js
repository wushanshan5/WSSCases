$(function () {
    //fixed-nav 部分start
    var jumper = null;
    var jumpArr = [ $(".quality").offset().top,
        $(".live-computer").offset().top,
        $(".live-play").offset().top,
        $(".eat").offset().top,
        $(".live2").offset().top,
        $(".live2-li-title3").offset().top,
        $(".live2-li-title5").offset().top,
        $(".live2-li-title7").offset().top,
        $(".more-shopping").offset().top,
    ];


    var nowScroll = $(window).scrollTop();
    if(nowScroll >= 700) {
        $(".fixed-nav").slideDown(500);
        if(nowScroll >= jumpArr[0]-180){
            $(".side-left").show();
            scrollJump(0);
        }else {
            $(".side-left").hide();
        }
    }else {
        $(".fixed-nav").slideUp(500);
    }
    $(window).scroll(function () {
        nowScroll = $(window).scrollTop();
        if(nowScroll >= 1000) {
            $(".fixed-nav").slideDown(500);
            if(nowScroll >= jumpArr[0]-180){
                $(".side-left").show();
                scrollJump(0);
                scrollJump(1);
                scrollJump(2);
                scrollJump(3);
                scrollJump(4);
                scrollJump(5);
                scrollJump(6);
                scrollJump(7);
                scrollJump(8);
            }else {
                $(".side-left").hide();
            }
        }else {
            $(".side-left").hide();
            $(".fixed-nav").slideUp(500);
        }
    });
// 封装一个方法 使得滑动页面时，跳到不同的模块
    function scrollJump(a) {
        if(nowScroll >= jumpArr[a]-180){
            $(".side-left>i").each(function (index2,ele2) {
                $(ele2).removeClass("side-left-i-current");
            });
            $(".side-left>i").eq(a).addClass("side-left-i-current");
        }
    }
    //side-left 部分start
    $(".side-left>i").each(function (index1,ele1) {
        $(ele1).click(function () {
            $(".side-left>i").each(function (index2,ele2) {
                $(ele2).removeClass("side-left-i-current");
            });
            $(this).addClass("side-left-i-current");
            jumpTo(jumpArr[index1]-80,window);
        });
    });
    $(".side-left>span").click(function () {
        jumpTo(0,window);
    });

    //封装一个方法实现楼层跳跃
    function jumpTo(target,ele) {
        clearInterval(jumper);
        jumper = setInterval(function () {
            var step = (target-nowScroll)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            ele.scrollTo(0,step+nowScroll);
            if(Math.abs(target-nowScroll)<=step){
                ele.scrollTo(0,target);
                clearInterval(jumper);
            }
        },10);
    }


    //side-right 部分start
    $(".side-right i").each(function (ind,ele) {
        $(ele).on("mouseenter",function () {
                $(this).animate({"width":95},200).find("em").show();
        });
        $(ele).on("mouseleave",function () {
            $(this).animate({"width":35},200).find("em").hide();
        });
    });
    $(".side-right-i7").click(function () {
        $(window).get(0).scrollTo(0,0);
    });

    //top-banner部分start
    $(".top-banner .close").click(function () {
        $(".top-banner").hide();
    });

    //nav部分 start
   $(".nav-area").on("mouseover",function () {
        $(".nav-area-places").show();
    });
    $(".nav-area").on("mouseout",function () {
        $(".nav-area-places").hide();
    });
    var placeA = $(".nav-area-places a");
    placeA.each(function (index,ele) {
        $(ele).click(function () {
            placeA.each(function (ind,element) {
                $(element).removeClass("place-bg");
            })
            $(".nav-area>span").text(this.innerHTML);
            $(this).addClass("place-bg");
        });
    });
    $(".list-myjd").on("mouseover",function () {
        $(".list-myjd-info").show();
    });
    $(".list-myjd").on("mouseout",function () {
        $(".list-myjd-info").hide();
    });
//同上，客户服务
   $(".list-customerservice").on("mouseover",function () {
        $(".service-info").show();
    });
    $(".list-customerservice").on("mouseout",function () {
        $(".service-info").hide();
    });

//同上，网页导航部分
    $(".list-guide").on("mouseenter",function () {
        $(".list-guide-info").show();
    });
    $(".list-guide").on("mouseleave",function () {
        $(".list-guide-info").hide();
    });
//手机京东部分
    $(".phonejd").on("mouseover",function () {
        $(".twoCode-info").show();
    });
    $(".phonejd").on("mouseout",function () {
        $(".twoCode-info").hide();
    });
//购物车部分
    $(".car-box").on("mouseenter",function () {
        $(".car-info").show();
        $(".car").css({"padding-bottom":"2px","border-bottom":0});
    });
    $(".car-box").on("mouseleave",function () {
        $(".car-info").hide();
        $(".car").css({"padding-bottom":0,"border":"1px solid #E3E4E5"});
    });
//slider部分
    //slide-left-info部分和slide-right部分
    var slider = document.getElementsByClassName("slider")[0];
    $(".slide-left li").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            $(".slide-right").hide();
            $(".slide-left-info").each(function (ind,element) {
                $(element).hide();
            });
            $(ele).children(".slide-left-info").show();
        });
        $(ele).on("mouseout",function () {
            $(".slide-right").show();
            $(".slide-left-info").each(function (ind,element) {
                $(element).hide();
            });
        });
    });
    var slide = slider.getElementsByClassName("slide")[0];
    var slideImg = slide.getElementsByTagName("img")[0];
    var number2 = slide.getElementsByClassName("number2")[0];
    var iArr = number2.children;
    //（1）.定义一个json来放将要换的picture
    var slideJson = {"1":"pic1.jpg","2":"pic2.jpg","3":"pic3.jpg","4":"pic4.jpg","5":"pic5.jpg","6":"pic6.jpg","7":"pic5.jpg","8":"pic5.jpg"};
    //求出slideJson中的最大值和最小值，便于之后的切换
    var max = 1;
    var min = 1;
    for(var i in slideJson){
        if(i>max){
            max = i;
        }
        if(i<min){
            min = i;
        }
    }
    var num = 1;//定时器非常重要，值不能随意的更改
    var timer1 = null;
    timer1 = setInterval(scroll,1000);
//不能用scroll(slideImg),直接放函数名，否则onmouseover，out方法将出现问题
    $(".slide-part1").on("mouseover",function () {
        $(".slide-part1-left").show();
        $(".slide-part1-right").show();
        clearInterval(timer1);
    });
    $(".slide-part1").on("mouseout",function () {
        $(".slide-part1-left").hide();
        $(".slide-part1-right").hide();
        timer1 = setInterval(scroll,1000);
    });
    function scroll() {
        num++;
        if(num>max){
            num = min;
        }
        slideImg.src = "images/"+slideJson[num];
        relaToNumber(iArr);
    }
    $(".slide-part1-left").click(function () {
        scrollLeft(slideImg,iArr);
        relaToNumber(iArr);
    });
    $(".slide-part1-right").click(function () {
        scrollRight(slideImg,iArr);
        relaToNumber(iArr);
    });
    function scrollLeft(ele) {
        num--;
        if(num<min){
            num = max;
        }
        ele.src = "images/"+slideJson[num];
    }
    function scrollRight(ele) {
        num++;
        if(num>max){
            num = min;
        }
        ele.src = "images/"+slideJson[num];
        relaToNumber(iArr);
    }
    for(var i=0;i<iArr.length;i++){
        iArr[i].onmouseover = function () {
            num = parseInt(this.id);
            slideByNumber(slideImg,num);
            relaToNumber(iArr);
        }
    }
    function slideByNumber(ele,target) {
        ele.src = "images/"+slideJson[target];
    }
    function relaToNumber(ele) {
        for(var k=0;k<ele.length;k++){
            ele[k].className = "";
            if(num == ele[k].id){
                ele[k].className = "i-hover";
            }
        }
    }

//welcome 部分
    $(".welcome .a1").on("mouseover",function () {
        $(this).addClass("tab-hover");
        $(".welcome .a2").removeClass("tab-hover");
        $(".welcome .content1").show();
        $(".welcome .content2").hide();
    });
    $(".welcome .a2").on("mouseover",function () {
        $(this).addClass("tab-hover");
        $(".welcome .a1").removeClass("tab-hover");
        $(".welcome .content1").hide();
        $(".welcome .content2").show();
    });
    $(".icon-info-tab>i").each(function (index,element) {
        element.index = index;
        $(element).on("mouseover",function () {
            $(".activity").each(function (ind,el) {
                $(el).hide();
            });
            $(".icon-info-tab>i").each(function (index,element) {
                $(element).removeClass("tab-i-hover");
            });
            $(element).addClass("tab-i-hover");
            $(".activity:eq("+element.index+")").show();
        });
    });
    $(".icon .li-info").each(function (index,element) {
        element.index = index;
        $(element).click(function () {
            $(".icon-info").show();
            $(".icon ul").hide();
            $(".icon-info-tab i").each(function (num1,ele1) {
                $(ele1).removeClass("tab-i-hover");
            });
            $(".icon-info-tab i").eq(element.index).addClass("tab-i-hover");
            $(".activity").each(function (num2,ele2) {
                $(ele2).hide();
            });
            $(".activity").eq(element.index).slideDown();
        });
    });
//close-info 点击x，将回到ul界面
    $(".close-info").click(function () {
        $(".icon .icon-info").hide();
        $(".icon ul").show();
    });
    $(".activity").each(function (index1,ele1) {
        ele1.index = index1;
        $(ele1).children(".a-choice").each(function (index2,ele2) {
            ele2.index = index2;
            $(ele2).on("mouseover",function () {
                $(ele1).children(".a-info").each(function (num0,ele0) {
                    $(ele0).hide();
                });
                $(ele1).children(".a-info").eq(ele2.index).show();
                $(ele1).children(".a-choice").each(function (num,ele) {
                    $(ele).removeClass("activity-a-hover");
                });
                $(ele2).addClass("activity-a-hover");
            });
        });
    });
//jd-kill-product部分
    var proNum = 0;
    $(".jd-kill-product-list").on("mouseenter",function () {
        $(".kill-left").show();
        $(".kill-right").show();
    });
    $(".jd-kill-product-list").on("mouseleave",function () {
        $(".kill-left").hide();
        $(".kill-right").hide();
    });
    //  无缝轮播
    //求出li的长度
    var liWidth = $(".jd-kill-product-list li").width();
    var newPro = $(".jd-kill-product-list li:eq(0)").get(0).cloneNode(true);
    $(".jd-kill-product-list ul").get(0).appendChild(newPro);
    $(".kill-left").click(function () {
        proNum--;
        if(proNum < 0){
            proNum = $(".jd-kill-product-list li").length-2;
            $(".jd-kill-product-list ul").css("left",-(proNum+1)*liWidth);
        }
        proAnimate($(".jd-kill-product-list ul"),-liWidth*proNum);
    });
    $(".kill-right").click(function () {
        proNum++;
        if(proNum > $(".jd-kill-product-list li").length-1){
            proNum = 1;
            $(".jd-kill-product-list ul").css("left",0);
        }
        proAnimate($(".jd-kill-product-list ul"),-liWidth*proNum);
    });
    //要封装一个无缝滚动方法
    function proAnimate(ele,target){
        ele.animate({"left":target},800);
    }
    //通过更改jd-kill-goods 内的img来达到切换的效果 
        //需求1:设置定时器，让图片自动切换
        var goodsTimer = setInterval(function () {
            goodsNum = (goodsNum===1?2:1);
            changeDotColor();
            $(".jd-kill-goods img").get(0).src = "images/jd-kill-goods-pic"+goodsNum+".jpg";
        },1500);
        var goodsNum = 1;
        $(".jd-kill-goods").on("mouseenter",function () {
            clearInterval(goodsTimer);
        });
        $(".jd-kill-goods").on("mouseleave",function () {
            goodsTimer = setInterval(function () {
                goodsNum = (goodsNum===1?2:1);
                changeDotColor();
                $(".jd-kill-goods img").get(0).src = "images/jd-kill-goods-pic"+goodsNum+".jpg";
            },1500);
        });
        //需求2：鼠标放在dot，进行切换
        $(".jd-kill-goods-dot span").each(function (index,ele) {
            $(ele).on("mouseover",function () {
                    goodsNum = index+1;
                    $(".jd-kill-goods img").get(0).src = "images/jd-kill-goods-pic"+goodsNum+".jpg";
                    changeDotColor($(".jd-kill-goods-dot span"),goodsNum-1,"jd-kill-goods-currentDot");
                })
        });
    //当鼠标放在商品上，图片向上滑动几像素
    $(".jd-kill-pro").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(this).find("img").animate({"padding-top":0},200);
        });
        $(ele).on("mouseleave",function () {
            $(this).find("img").animate({"padding-top":5},200);
        });
    });
    //find部分
    //将索引值是奇数的设置右边框
    $(".finding-goods li:even").css("border-right","1px solid #E7E7E7");
    //将索引值大于1的元素设置上边框
    $(".finding-goods li:gt(1)").css("border-top","1px solid #E7E7E7");
    //1.鼠标放在finding-goods的li上时，图片向左滑动了几像素
    $(".finding-goods li").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(ele).find(".finding-goods-pic").animate({"padding-left":0},200);
        });
        $(ele).on("mouseleave",function () {
            $(ele).find(".finding-goods-pic").animate({"padding-left":5},200);
        });
    });
    //2.放入显示，移开隐藏
    $(".find-more").on("mouseenter",function () {
        $(".find-more-left").show();
        $(".find-more-right").show();
    });
    $(".find-more").on("mouseleave",function () {
        $(".find-more-left").hide();
        $(".find-more-right").hide();
    });
    var findMoreNum = 0;
    $(".find-more-right").click(function () {
        findMoreNum++;
        if(findMoreNum>$(".find-more-goods").length-1){
            findMoreNum = 0;
        }
        $(".find-more-goods").each(function (index,ele) {
            $(ele).fadeOut(200);
        });
        $(".find-more-goods").eq(findMoreNum).fadeIn(200);
        changeDotColor($(".find-more-dot i"),findMoreNum,"find-more-currentDot");
    });
    $(".find-more-left").click(function () {
        findMoreNum--;
        if(findMoreNum<0){
            findMoreNum = $(".find-more-goods").length-1;
        }
        $(".find-more-goods").each(function (index,ele) {
            $(ele).fadeOut(200);
        });
        $(".find-more-goods").eq(findMoreNum).fadeIn(200);
        changeDotColor($(".find-more-dot i"),findMoreNum,"find-more-currentDot");
    });
    $(".find-more-dot i").each(function (index,ele) {
        // $(".find-more-dot i").index = this.index;
        $(ele).on("mouseover",function () {
            findMoreNum = index;
            //在这里不能用this，因为传递的参数是一个元素集合
            changeDotColor($(".find-more-dot i"),index,"find-more-currentDot");
            $(".find-more-goods").each(function (ind,element) {
                $(element).fadeOut(200);
            });
            $(".find-more-goods").eq(index).fadeIn(200);
        });

    });
    //封装一个方法，让小圆点变换
    function changeDotColor(ele,num,className) {
        $(ele).each(function (index,element) {
            $(element).removeClass(className);
        });
        $(ele).eq(num).addClass(className);
    }
    //find-ranking部分
    $(".find-ranking-content li:eq(5)").css("border-right",0);
    $(".find-ranking-content li:eq(2)").css("border-right",0);
    $(".find-ranking-content li:gt(2)").css("border-bottom",0);
    $(".find-ranking-tab a").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            $(".find-ranking-tab-current").animate({"left":index*($(this).width()+8)},300);
            $(".find-ranking-content>div").each(function (index1,ele1) {
                $(ele1).hide();
            });
            $(".find-ranking-content>div").eq(index).show();
        })
    });
    //get 部分
    $(".get-coupon-pro").on("mouseenter",function () {
        $(this).find("img").animate({"left":60},500);
    });
    $(".get-coupon-pro").on("mouseleave",function () {
        $(this).find("img").animate({"left":50},500);
    });
    $(".get-lookingme").on("mouseenter",function () {
        $(".get-lookingme-left").show();
        $(".get-lookingme-right").show();
    });
    $(".get-lookingme").on("mouseleave",function () {
        $(".get-lookingme-left").hide();
        $(".get-lookingme-right").hide();
    });
    var getLookingmeNum = 0
    $(".get-lookingme-left").click(function () {
        getLookingmeNum--;
        if(getLookingmeNum < 0){
            getLookingmeNum = $(".get-lookingme-dot i").length-1;
        }
        changeDotColor($(".get-lookingme-dot i"),getLookingmeNum,"get-lookingme-currentDot");
        $(".get-lookingme-pro-info").each(function (index,ele) {
            $(ele).hide();
        });
        $(".get-lookingme-pro-info").eq(getLookingmeNum).fadeIn();
    });
    $(".get-lookingme-right").click(function () {
        getLookingmeNum++;
        if(getLookingmeNum > $(".get-lookingme-dot i").length-1){
            getLookingmeNum = 0;
        }
        changeDotColor($(".get-lookingme-dot i"),getLookingmeNum,"get-lookingme-currentDot");
        $(".get-lookingme-pro-info").each(function (index,ele) {
            $(ele).hide();
        });
        $(".get-lookingme-pro-info").eq(getLookingmeNum).fadeIn();
    });
    //quality部分
    $(".quality-part1 li").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            $(ele).find("img").animate({"left":-5},500);
        });
        $(ele).on("mouseout",function () {
            $(ele).find("img").animate({"left":0},500);
        });
    });
    var qualityPart2Num = 0;
    $(".quality-part2-left").click(function () {
        qualityPart2Num--;
        if(qualityPart2Num < 0){
            qualityPart2Num = $(".get-lookingme-dot i").length-1;
        }
        changeDotColor($(".quality-part2-dot i"),qualityPart2Num,"quality-part2-currentDot");
        $(".quality-part2-mv img").each(function (index,ele) {
            $(ele).fadeOut(200);
        });
        $(".quality-part2-mv img").eq(qualityPart2Num).fadeIn(200);
    });
    $(".quality-part2-right").click(function () {
        qualityPart2Num++;
        if(qualityPart2Num > $(".get-lookingme-dot i").length-1){
            qualityPart2Num = 0;
        }
        changeDotColor($(".quality-part2-dot i"),qualityPart2Num,"quality-part2-currentDot");
        $(".quality-part2-mv img").each(function (index,ele) {
            $(ele).fadeOut(200);
        });
        $(".quality-part2-mv img").eq(qualityPart2Num).fadeIn(200);
    });
    $(".quality-part2-dot i").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            qualityPart2Num = index;
            changeDotColor($(".quality-part2-dot i"),qualityPart2Num,"quality-part2-currentDot");
            $(".quality-part2-mv img").each(function (index,ele) {
                $(ele).fadeOut(200);
            });
            $(".quality-part2-mv img").eq(qualityPart2Num).fadeIn(200);
        });
    });
    $(".quality-part2-pro>div").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(ele).find("img").animate({"left":-10},500);
        });
        $(ele).on("mouseleave",function () {
            $(ele).find("img").animate({"left":0},500);
        });
    });
    //live 部分
    $(".live .center>ul>li:even").css("margin-right",10);
    $(".live-li-title>span").each(function (index,ele) {
        $(ele).on("mouseover",function () {
            $(this).children("span").show();
        });
        $(ele).on("mouseout",function () {
            $(this).children("span").hide();
        });
    });
    $(".live-li-smallpic-li").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(ele).find("img").animate({"right":5},200);
        });
        $(ele).on("mouseleave",function () {
            $(ele).find("img").animate({"right":0},200);
        });
    });
    $(".live-li-bigpic").on("mouseenter",function () {
        $(this).find("img").animate({"left":-5},200);

    });
    $(".live-li-bigpic").on("mouseleave",function () {
        $(this).find("img").animate({"left":0},200);
    });
    $(".live-li-bottom-pic").on("mouseenter",function () {
        $(this).find("img").animate({"left":-8},200);
    });
    $(".live-li-bottom-pic").on("mouseleave",function () {
        $(this).find("img").animate({"left":0},200);
    });
    //live-li-trademark 轮播效果
    var liveTrademarkNum1 = 0;
    var liveTrademarkNum2 = 0;
    var liveTrademarkNum3 = 0;
    var liveTrademarkNum4 = 0;
    var liveTrademarkNum5 = 0;
    var liveTrademarkNum6 = 0;
    var liveTrademarkNum7 = 0;
    var liveTrademarkNum8 = 0;
    var liveTrademarkWidth = $(".live-li-trademark li").width();
    $(".live-li-trademark-left1").click(function () {
        liveTrademarkNum1 = liveTrademarkLeftAnimate(liveTrademarkNum1,".live-li-trademark1>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-right1").click(function () {
        liveTrademarkNum1 = liveTrademarkRightAnimate(liveTrademarkNum1,".live-li-trademark1>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-left2").click(function () {
        liveTrademarkNum2 = liveTrademarkLeftAnimate(liveTrademarkNum2,".live-li-trademark2>ul>li",liveTrademarkWidth);

    });
    $(".live-li-trademark-right2").click(function () {
        liveTrademarkNum2 = liveTrademarkRightAnimate(liveTrademarkNum2,".live-li-trademark2>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-left3").click(function () {
        liveTrademarkNum3 = liveTrademarkLeftAnimate(liveTrademarkNum3,".live-li-trademark3>ul>li",liveTrademarkWidth);

    });
    $(".live-li-trademark-right3").click(function () {
        liveTrademarkNum3 = liveTrademarkRightAnimate(liveTrademarkNum3,".live-li-trademark3>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-left4").click(function () {
        liveTrademarkNum4 = liveTrademarkLeftAnimate(liveTrademarkNum4,".live-li-trademark4>ul>li",liveTrademarkWidth);

    });
    $(".live-li-trademark-right4").click(function () {
        liveTrademarkNum4 = liveTrademarkRightAnimate(liveTrademarkNum4,".live-li-trademark4>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-left6").click(function () {
        liveTrademarkNum6 = liveTrademarkLeftAnimate(liveTrademarkNum6,".live-li-trademark6>ul>li",liveTrademarkWidth);

    });
    $(".live-li-trademark-right6").click(function () {
        liveTrademarkNum6 = liveTrademarkRightAnimate(liveTrademarkNum6,".live-li-trademark6>ul>li",liveTrademarkWidth);
    });
    $(".live-li-trademark-left7").click(function () {
        liveTrademarkNum7 = liveTrademarkLeftAnimate(liveTrademarkNum7,".live-li-trademark7>ul>li",liveTrademarkWidth);

    });
    $(".live-li-trademark-right7").click(function () {
        liveTrademarkNum7 = liveTrademarkRightAnimate(liveTrademarkNum7,".live-li-trademark7>ul>li",liveTrademarkWidth);
    });

    $(".live-li-trademark-left8").click(function () {
        liveTrademarkNum8 = liveTrademarkLeftAnimate(liveTrademarkNum8,".eat-info-trademark>ul>li",liveComputerTrademarkWidth);
    });
    $(".live-li-trademark-right8").click(function () {
        liveTrademarkNum8 = liveTrademarkRightAnimate(liveTrademarkNum8,".eat-info-trademark>ul>li",liveComputerTrademarkWidth);
    });
    function liveTrademarkLeftAnimate(num1,ele1,width) {
        num1--;
        if(num1 < 0){
            num1 = $(ele1).length-2;
            $(ele1).parent().css("left",-(num1+1)*width);
        }
        proAnimate($(ele1).parent(),-width*num1);
        return num1;
    };
    function liveTrademarkRightAnimate(num2,ele2,width) {
        num2++;
        if(num2 > $(ele2).length-1){
            num2 = 1;
            $(ele2).parent().css("left",0);
        }
        proAnimate($(ele2).parent(),-width*num2);
        return num2;
    };
    //为前两个li设置下边距
    $(".live .center>ul>li:lt(2)").css("margin-bottom",30);
    var liveComputerTrademarkWidth = $(".live-computer-trademark li").width();
    $(".live-li-trademark-left5").click(function () {
        liveTrademarkNum5 = liveTrademarkLeftAnimate(liveTrademarkNum5,".live-computer-trademark5>ul>li",liveComputerTrademarkWidth);
    });
    $(".live-li-trademark-right5").click(function () {
        liveTrademarkNum5 = liveTrademarkRightAnimate(liveTrademarkNum5,".live-computer-trademark5>ul>li",liveComputerTrademarkWidth);
    });


    $(".live-li-trademark").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(ele).children("i").show();
        });
        $(ele).on("mouseleave",function () {
            $(ele).children("i").hide();
        });
    });
    $(".live-computer-trademark").on("mouseenter",function () {
        $(this).children("i").show();
    });
    $(".live-computer-trademark").on("mouseleave",function () {
        $(this).children("i").hide();
    });

//    live2部分
    var live2TrademarkNum1 = 0;
    var live2TrademarkNum2 = 0;
    var live2TrademarkNum3 = 0;
    var live2TrademarkNum4 = 0;
    var live2TrademarkNum5 = 0;
    var live2TrademarkNum6 = 0;
    var live2TrademarkNum7 = 0;
    var live2TrademarkNum8 = 0;
    $(".live2-li-trademark-left1").click(function () {
        live2TrademarkNum1 = liveTrademarkLeftAnimate(live2TrademarkNum1,".live2-li-trademark1>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-right1").click(function () {
        live2TrademarkNum1 = liveTrademarkRightAnimate(live2TrademarkNum1,".live2-li-trademark1>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left2").click(function () {
        live2TrademarkNum2 = liveTrademarkLeftAnimate(live2TrademarkNum2,".live2-li-trademark2>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-right2").click(function () {
        live2TrademarkNum2 = liveTrademarkRightAnimate(live2TrademarkNum2,".live2-li-trademark2>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left3").click(function () {
        live2TrademarkNum3 = liveTrademarkLeftAnimate(live2TrademarkNum3,".live2-li-trademark3>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-right3").click(function () {
        live2TrademarkNum3 = liveTrademarkRightAnimate(live2TrademarkNum3,".live2-li-trademark3>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left4").click(function () {
        live2TrademarkNum4 = liveTrademarkLeftAnimate(live2TrademarkNum4,".live2-li-trademark4>ul>li",liveTrademarkWidth);

    });
    $(".live2-li-trademark-right4").click(function () {
        live2TrademarkNum4 = liveTrademarkRightAnimate(live2TrademarkNum4,".live2-li-trademark4>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left5").click(function () {
        live2TrademarkNum5 = liveTrademarkLeftAnimate(live2TrademarkNum5,".live2-li-trademark5>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-right5").click(function () {
        live2TrademarkNum5 = liveTrademarkRightAnimate(live2TrademarkNum5,".live2-li-trademark5>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left6").click(function () {
        live2TrademarkNum6 = liveTrademarkLeftAnimate(live2TrademarkNum6,".live2-li-trademark6>ul>li",liveTrademarkWidth);

    });
    $(".live2-li-trademark-right6").click(function () {
        live2TrademarkNum6 = liveTrademarkRightAnimate(live2TrademarkNum6,".live2-li-trademark6>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-left7").click(function () {
        live2TrademarkNum7 = liveTrademarkLeftAnimate(live2TrademarkNum7,".live2-li-trademark7>ul>li",liveTrademarkWidth);

    });
    $(".live2-li-trademark-right7").click(function () {
        live2TrademarkNum7 = liveTrademarkRightAnimate(live2TrademarkNum7,".live2-li-trademark7>ul>li",liveTrademarkWidth);
    });

    $(".live2-li-trademark-left8").click(function () {
        live2TrademarkNum8 = liveTrademarkLeftAnimate(live2TrademarkNum8,".live2-li-trademark8>ul>li",liveTrademarkWidth);
    });
    $(".live2-li-trademark-right8").click(function () {
        live2TrademarkNum8 = liveTrademarkRightAnimate(live2TrademarkNum8,".live2-li-trademark8>ul>li",liveTrademarkWidth);
    });


    //more-shopping 部分
    $(".more-shopping ul>li").each(function (index,ele) {
        $(ele).on("mouseenter",function () {
            $(this).css("border","1px solid #F10214").find(".more-shopping-pro>p").addClass("more-shopping-p-color");
        });
        $(ele).on("mouseleave",function () {
            $(this).css("border","1px solid #fff").find(".more-shopping-pro>p").removeClass("more-shopping-p-color");
        });
    });
})
