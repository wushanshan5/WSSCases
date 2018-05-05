//一定要写window.onload事件，否则由于页面没有加载完全而报错
window.onload = function () {
    var jsonArr = [
        //1
        {   "opacity": 30,
            "zIndex": 1,
            "top": 80,
            "left": 80,
            "width": 400,
            "height": 300
        },
        //2
        {   "opacity": 80,
            "zIndex": 2,
            "top": 140,
            "left": 0,
            "width": 650,
            "height": 400
        },
        //3
        {   "opacity": 100,
            "zIndex": 3,
            "top": 110,
            "left": 250,
            "width": 800,
            "height": 500
        },
        //4
        {   "opacity": 80,
            "zIndex": 2,
            "top": 140,
            "left": 640,
            "width": 650,
            "height": 400
        },
        //5
        {   "opacity": 30,
            "zIndex": 1,
            "top": 80,
            "left": 830,
            "width": 400,
            "height": 300
        }
    ];
    var box = document.getElementsByClassName("box")[0];
    var ul = box.children[0];
    var liArr = ul.children;
    var left = box.getElementsByClassName("left")[0];
    var right = box.getElementsByClassName("right")[0];
    var flag = true;
//定义一个开闭原则变量，当animate执行完后，flag=true，这样就不会出现多次点击，导致混乱
//需求：点击左右按钮转换图片
    //步骤1.鼠标进入box内，左右箭头出现，且opacity逐渐变为1
    box.onmouseenter = function () {
        animate(left,{"opacity":100});
        animate(right,{"opacity":100});
    }
    box.onmouseleave = function () {
        animate(left,{"opacity":0});
        animate(right,{"opacity":0});
    }
    //步骤2.页面加载开始，就要执行一次move，使其放在应该的位置
    move();
    //复习数组的方法
    //1.pop() 删除最后面的元素
    //2.push() 在最后面添加元素
    //3.shift() 删除最前面的元素
    //4.unshift() 在最前面添加元素
    //步骤3.点击左侧按钮，图片逆时针旋转，jsonArr最后一个元素放在最开头
    left.onclick = function () {
        if(flag){
            //一发生点击事件，就让flag为false
            // 当animate方法执行完毕，执行了回调函数，下一次点击才会有效，这样可以避免恶意点击
            flag = false;
            move(false);
        }
    }
    //步骤4.点击右侧按钮，图片顺时针旋转，jsonArr第一个元素放在最末尾
    right.onclick = function () {
        if(flag){
            flag = false;
            move(true);
        }
    }

//封装一个move方法，完善旋转轮播图
    //当bool为true时，为点击右箭头，否则就为左箭头
    function move(bool) {
        //在执行第一次move时，并不需要传递bool值
        // 所以当bool不是undefined时，再进行判断即可
        if(bool !== undefined){
            if(bool){
                var first = jsonArr.shift();
                jsonArr.push(first);
            }else {
                var last = jsonArr.pop();
                jsonArr.unshift(last);
            }
        }
        for(var i=0;i<liArr.length;i++){
            animate(liArr[i],jsonArr[i],function () {
                flag = true;
            });
        }
    }

//重新封装animate方法  解决某些兼容性问题如：opacity，zIndex等兼容性问题
    function animate(ele,json,fn) {
        clearInterval(ele.timer);
        ele.timer = setInterval(function () {
            //利用开闭原则，判断所有属性是否一定全部到位，全部到位就清除定时器，否则将继续
            var bool = true;
            for(var i in json){
                //parseInt(getStyle(ele,i)) || 0
                //由于getStyle函数返回的类型不是number类型，所以要用进行转为number类型
                // || 0 是为了避免出现某些属性没有定义而导致报错
                var leader;
                if(i == "opacity"){
                    leader = getStyle(ele,i)*100 || 1;
                    //用getStyle(ele,i)得到的opacity值时小数制，所以要乘以100
                }else {
                    leader = parseInt(getStyle(ele,i)) || 0;
                }
                var step = (json[i]-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader+step;
                //要进行特殊情况的判断，当属性是zIndex，opacity，不能加单位
                if(i == "zIndex"){
                    //层级问题不能用缓动动画做，否则会一闪一闪的
                    ele.style[i] = json[i];
                } else if(i == "opacity"){
                    ele.style[i] = leader/100;
                    ele.style.filter = "alpha(opacity="+leader+")";
                } else{
                    ele.style[i] = leader+"px";
                }
                //判断属性是否到位(不考虑有小数的情况)
                if(json[i] !== leader){
                    bool = false;
                }

            }
            console.log(1)
            if(bool){
                clearInterval(ele.timer);
                if(fn){
                    fn();
                }
            }
        },20);

    }
//兼容性写法获取样式值
    function getStyle(ele,attr) {
        if(window.getComputedStyle){
            return window.getComputedStyle(ele,null)[attr];
        }
        return ele.currentStyle[attr];
    }
}
