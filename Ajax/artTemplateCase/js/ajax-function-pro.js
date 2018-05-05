/*
* @Author: Marte
* @Date:   2018-03-18 12:38:56
* @Last Modified by:   Marte
* @Last Modified time: 2018-03-18 12:47:58
*/

// 封装方法来实现ajax的异步处理（顶配版）
// 利用一个对象作为参数
function ajaxFunctionPro (option) {
    /*
       option：是一个对象，其中有许多的属性
       如：
       data： 数据
       method： 方法
       url：路径
       success：回调函数
     */
    //创建异步对象
    var ajax = new XMLHttpRequest();
    //首先，先要判断，method方法（post/get）,设置url和method
    if(option.method == 'get') {
        if(option.data) {
            option.url += '?';
            option.url += option.data;
        }
        //设置url和method
        ajax.open(option.method,option.url);
        //发送请求
        ajax.send();
    }else {
        ajax.open(option.method,option.url);
        //设置请求报文
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        if(option.data) {
            ajax.send(option.data);
        }else {
            ajax.send();
        }
    }
    //注册对象
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4 && ajax.status == 200) {
            option.success(ajax.responseText);
        }
    }
}