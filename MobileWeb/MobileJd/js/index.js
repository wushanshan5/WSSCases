window.onload = function() {
//    使用原生态编写移动端js

// jd-header 部分start
    //滑动页面时，导航栏的透明度改变
    var jdHeader = document.querySelector('.jd-header');
    var mainContentTop = document.querySelector('.main-content1').offsetTop;
    window.onscroll = function () {
        //兼容写法
        var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
        var percent = scrollTop/mainContentTop;
        jdHeader.style.backgroundColor = 'rgba(201, 21, 35,'+percent+')';
        if(percent>=1) {
            percent = 1;
        }
    }
// jd-header 部分end

// jd-banner 部分start
    //轮播图部分
    var startX=0,moveX=0,distanceX=0;
    var carouselTimer = null;
    var jdBanner = document.querySelector('.jd-banner');
    var jdBannerPic = jdBanner.querySelector('.jd-banner-pic');
    carousel(jdBannerPic);
// jd-banner 部分end

// 秒杀时间倒计时
    var mainTime = document.querySelector('.main-content-time');
    //设置时间（秒为单位）
    var cutTime = 3*60*60;//3个小时----3*60分钟----3*60*60秒
    //使用倒计时函数
    countDown(cutTime,mainTime);


//jd-banner的轮播图函数
    function carousel (ele) {
        //利用CSS3 的过渡来写
        var liArr = ele.querySelectorAll('li');
        var dotArr = document.querySelector(".jd-banner-dot").querySelectorAll("li");
        //获取li的长度
        var liWidth = ele.offsetWidth/10;
        // 设置索引值
        var liIndex = 1;
        carouselTimer = setInterval(function () {
            //(不管有没有越界，先设置过渡)
            ele.style.transition = 'all 0.5s';
            liIndex++;
            ele.style.transform = 'translateX('+liIndex*liWidth*-1+'px)';
            distanceX = liIndex*liWidth*-1;
            // console.log(distanceX)
            //利用for循环，将对应的dot加上current类
            for(var i=0;i<dotArr.length;i++) {
                dotArr[i].className = '';
            }
            if(liIndex>8) {
                dotArr[0].className = 'current';
            }else {
                dotArr[liIndex-1].className = 'current';
            }
            //transitionEnd事件，在每一次过渡完成都会调用
            // 过渡完成后再判断有没有越界，这样不影响轮播效果
            ele.addEventListener('webkitTransitionEnd',function () {
                if(liIndex>=9) {
                    ele.style.transition = '';
                    liIndex = 1;
                    ele.style.transform = 'translateX('+liIndex*liWidth*-1+'px)';
                }
            });
        },1000);

        //手指滑动函数
            //touchstart，touchend事件都会有一个event事件
            //其中event参数中有一个touches参数，
            //touches[0]内有以下参数
            /*
            *   clientX：100-----手指点击位置距离页面顶部距离
                clientY：54-----手指点击位置距离页面最左边距离
                force：1
                identifier：0
                pageX：100
                pageY: 54
                radiusX :13.529411315917969
                radiusY :13.529411315917969
                rotationAngle :0
                screenX :372-----手指点击位置距离屏幕顶部距离
                screenY :204-----手指点击位置距离屏幕最左边距离
            * */
            //touchstart事件和touchmove事件中，都有event.touches[0]参数
            //里面有clientX，clientY，screenX，screenY等
            //而touchend事件中没有
        jdBannerPic.addEventListener('touchstart',function (event) {
                clearInterval(carouselTimer);
            jdBannerPic.style.transition = '';
                //记录手指点击的位置，再记录手指移动的位置，两个的差值即使手指滑过的距离
                startX = event.touches[0].clientX;
                // var startY = event.touches[0].clientY;
            });
            jdBannerPic.addEventListener('touchmove',function (event) {
                //记录移动的距离
                moveX = event.touches[0].clientX-startX;
                // var moveY = event.touches[0].clientY;
                //要将原来的值加上，利用distanceX记录
            jdBannerPic.style.transform = 'translateX('+(moveX+liWidth*-1*liIndex)+'px)';

            });
            jdBannerPic.addEventListener('touchend',function () {
                jdBannerPic.style.transition = 'all 0.5s';
                if(moveX>0.5*liWidth) {
                    liIndex--;
                }else if(moveX<-0.5*liWidth) {
                    liIndex++;
                }
                ele.style.transform = 'translateX('+liIndex*liWidth*-1+'px)';
                //利用for循环，将对应的dot加上current类
                for(var i=0;i<dotArr.length;i++) {
                    dotArr[i].className = '';
                }
                if(liIndex>8) {
                    dotArr[0].className = 'current';
                }else {
                    dotArr[liIndex-1].className = 'current';
                }
                //开启定时器
                carouselTimer = setInterval(function () {
                    //(不管有没有越界，先设置过渡)
                    ele.style.transition = 'all 0.5s';
                    liIndex++;
                    ele.style.transform = 'translateX('+liIndex*liWidth*-1+'px)';
                    distanceX = liIndex*liWidth*-1;
                    // console.log(distanceX)
                    //利用for循环，将对应的dot加上current类
                    for(var i=0;i<dotArr.length;i++) {
                        dotArr[i].className = '';
                    }
                    if(liIndex>8) {
                        dotArr[0].className = 'current';
                    }else {
                        dotArr[liIndex-1].className = 'current';
                    }
                    //transitionEnd事件，在每一次过渡完成都会调用
                    // 过渡完成后再判断有没有越界，这样不影响轮播效果
                    ele.addEventListener('webkitTransitionEnd',function () {
                        if(liIndex>=9) {
                            ele.style.transition = '';
                            liIndex = 1;
                            ele.style.transform = 'translateX('+liIndex*liWidth*-1+'px)';
                        }
                    });
                },1000);
            });

    }


//倒计时函数
    function countDown(time,ele) {
        //获取li元素数组
        var eleArr = ele.querySelectorAll('li');
        //设置小时的十分位
        var tenHour = eleArr[0];
        //设置小时的个位
        var perHour = eleArr[1];
        //设置分钟的十分位
        var tenMinute = eleArr[3];
        //设置分钟的个位
        var perMinute = eleArr[4];
        //设置秒钟的十分位
        var tenSecond = eleArr[6];
        //设置秒钟的个位
        var perSecond = eleArr[7];

        var cutTimer = setInterval(function () {
            if(time<=0) {
                clearInterval(this);
                return;
            }
            time--;
            //为每个位置设置值
            var hour = Math.floor(time/(60*60));
            var minute = Math.floor(time/60-hour*60);
            var second = time%60;
            tenHour.innerHTML = Math.floor(hour/10);
            perHour.innerHTML = hour%10;
            tenMinute.innerHTML = Math.floor(minute/10);
            perMinute.innerHTML = minute%10;
            tenSecond.innerHTML = Math.floor(second/10);
            perSecond.innerHTML = second%10;
        },1000);
    }


}