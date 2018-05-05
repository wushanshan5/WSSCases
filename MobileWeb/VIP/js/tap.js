function tap (ele,callback) {
    //带一个回调函数为参数

    //定义一个延迟时间
    var delay = 2000;
    //定义一个执行事件开始时间
    var startTime = 0;
    //定义一个用来判断touchmove事件是否执行
    var isMove = false;
    ele.addEventListener('touchstart',function (e) {
        //获取手指触摸开始时间
        startTime = Date.now();
        isMove = false;
    });
    ele.addEventListener('touchmove',function (e) {
        isMove = true;
    });
    ele.addEventListener('touchend',function (e) {
        if((Date.now()-startTime)>delay) {
            //触摸开始和触摸结束之间的时间相差过大，则点击失效
            return;
        } else if(isMove) {
            //手指移动事件一旦触发，点击事件失效，返回
            return;
        } else {
            //将e传入回调函数
            callback(e);
        }
    });
}