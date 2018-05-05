window.onload = function () {
    //手指滑动main-info和main-kinds会跟着手指一起滑动
    var mainInfo = document.querySelector('.main-info');
    //main-info 部分
    //获取mainInfo的长度，和main的长度，手指滑动的距离不能超过改长度，否则，mianinfo不跟着手指滑动
    var listHeight = document.querySelector('.list').offsetHeight;
    var listHeaderHeight = document.querySelector('.list-header').offsetHeight;
    var mainHeight = listHeight-listHeaderHeight;
    var mainInfoUlHeight = document.querySelector('.main-info-content').offsetHeight;
    var mainKindsUlHeight = document.querySelector('.main-kinds ul').offsetHeight;
    //得到可滑动的距离（滑动距离有一定限制）
    var maxInfowholeHeight = mainHeight-mainInfoUlHeight;//为负值
    var minInfowholeHeight = 0;
    //设置一个吸附距离(假设为100)
    var temDistance = 100;
    var maxkindWholeHeight = mainHeight-mainKindsUlHeight;//为负值
    var minkindWholeHeight = 0;
    var distanceY=0,startY=0,moveY=0;
    mainInfo.addEventListener('touchstart',function (event) {
        endTransition(mainInfo);
        startY = event.touches[0].clientY;
    });
    mainInfo.addEventListener('touchmove',function (event) {
        moveY = event.touches[0].clientY-startY;
        //对滑动的距离进行判断
        if((moveY+distanceY)>(minInfowholeHeight+temDistance)) {
            moveY = 0;
            distanceY = minInfowholeHeight+temDistance;
        }else if((moveY+distanceY)<(maxInfowholeHeight-temDistance)) {
            moveY = 0;
            distanceY = maxInfowholeHeight-temDistance;
        }
        setTransformY(mainInfo,(moveY+distanceY));
    });
    mainInfo.addEventListener('touchend',function () {
        distanceY += moveY;
        if(distanceY>minInfowholeHeight) {
            distanceY = minInfowholeHeight;
        }else if(distanceY<maxInfowholeHeight) {
            distanceY = maxInfowholeHeight;
        }
        setTransition(mainInfo);
        setTransformY(mainInfo,distanceY);
    });
    //main-kinds部分
    var mainKinds = document.querySelector('.main-kinds');
    var kinddistanceY=0,kindstartY=0,kindmoveY=0;
    mainKinds.addEventListener('touchstart',function (event) {
        endTransition(mainKinds);
        kindstartY = event.touches[0].clientY;
    });
    mainKinds.addEventListener('touchmove',function (event) {
        kindmoveY = event.touches[0].clientY-kindstartY;
        //对滑动的距离进行判断
        if((kindmoveY+kinddistanceY)>minkindWholeHeight+temDistance) {
            kindmoveY = 0;
            kinddistanceY = minkindWholeHeight+temDistance;
        }else if((kindmoveY+kinddistanceY)<maxkindWholeHeight-temDistance) {
            kindmoveY = 0;
            kinddistanceY = maxkindWholeHeight-temDistance;
        }
        setTransformY(mainKinds,(kindmoveY+kinddistanceY));
    });
    mainKinds.addEventListener('touchend',function () {
        kinddistanceY += kindmoveY;
        if((kinddistanceY+kindmoveY)>(minkindWholeHeight)) {
            kinddistanceY = minInfowholeHeight;
        }else if((kinddistanceY+kindmoveY)<(maxkindWholeHeight)) {
            kinddistanceY = maxkindWholeHeight;
        }
        setTransition(mainKinds);
        setTransformY(mainKinds,kinddistanceY);
    });
    //简化代码(封装)
    function setTransition(ele) {
        ele.style.transition = 'all 0.3s';
    }
    function endTransition(ele) {
        ele.style.transition = '';
    }
    function setTransformY(ele,distance) {
        ele.style.transform = 'translateY('+distance+'px)';
    }

    //点击main-kinds部分的li，将当前li跳到第一个，并添加target类
    //切换target类
    var kindLiArr = mainKinds.querySelectorAll('li');
    //获取一个li的高度
    var kindLiHeight = kindLiArr[0].offsetHeight;
    for(var i=0;i<kindLiArr.length;i++) {
        //为每一个li添加一个data-index属性（自定义属性）
        //利用ele.dataset['key']来设置属性
        // 当元素中没有该自定义属性，则为创建属性
        // 当元素中有该自定义属性，则为赋值
        kindLiArr[i].dataset['index'] = i;
    }
    //利用自己封装好的tap事件，来模拟main-kinds的li的点击事件

    tap(mainKinds,function (event) {
    //event中有一个target属性，用于得到被点击的元素
    //     console.log(event.target);
        //将被点击的a标签的父元素li标签加上target类
        var kindLiArr = mainKinds.querySelectorAll('li');
        for(var i=0;i<kindLiArr.length;i++) {
            kindLiArr[i].className = '';
        }
        event.target.parentNode.className = 'target';
        var currentIndex = event.target.parentNode.dataset['index'];
        kinddistanceY = -kindLiHeight*currentIndex;
        // kindmoveY = 0;
        if(kinddistanceY>minkindWholeHeight) {
            kinddistanceY = minkindWholeHeight;
        } else if(kinddistanceY<maxkindWholeHeight) {
            kinddistanceY = maxkindWholeHeight;
        }
        setTransition(mainKinds);
        setTransformY(mainKinds,kinddistanceY);
    });
}
