//缓动框架，可操作多个属性，利用json来传值
function animate(ele,json,fn) {
    //可以利用回调函数，使得进行下一个事件，这样会有更好的用户体验效果
    //多种属性的缓动方法需要利用开闭原则来清除定时器
    // 因为必须每一个键值对都被达到了，才能够清除定时器，否则将继续
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var bool = true;
        for(var i in json) {
            //attr==i     target==json[i]
            //leader要使用兼容性写法，用于兼容透明度
            var leader = parseInt(getStyle(ele, i)) || 0;
            var step = (json[i] - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            ele.style[i] = leader + "px";
            if (Math.abs(json[i]-leader) > Math.abs(step)) {
                bool = false;
            }
        }
        if(bool){
            for(var i in json){
                ele.style[i] = json[i];
            }
            clearInterval(ele.timer);
            //要所有程序执行完毕了，再执行这个回调函数
            // 如果没有完毕，就会将原来的覆盖
            if(fn){
                fn();
            }
        }

    },20);

}




//兼容方法获取元素样式
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}