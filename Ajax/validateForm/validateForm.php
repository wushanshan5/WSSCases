<?php
/**
 * @Author: Marte
 * @Date:   2018-03-20 20:56:48
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-03-20 23:38:20
 */
    header("content-type:text/html;charset=utf-8");
    $TF = "true";
    //得到json字符串
    $info = file_get_contents('info.json');
    //把json字符串转化成php对象
    $infoArr = json_decode($info);
    //在php中校验username是否重复
    // get_object_vars($infoArr)方法
    // 用来将对象转化为数组
    for($i = 0;$i < count($infoArr);$i++) {
        //先把每一个对象转化为数组
        $objArr = get_object_vars($infoArr[$i]);
        //再用数组名['key']得到的值进行比对
        if($_POST['username'] == $objArr['name']) {
            //定义一个$TF变量，如果有相同的名字，则返回false，反之返回true
            //只要找到相等的就跳出循环
            $TF = "false";
            break;
        }
    }
    //在最后判断$TF的值，如果为true，则表示名字没有被占用
    if($TF == "true") {
        echo "用户名未被占用！";
    }else {
        echo "用户名已被占用！请重新输入！";
    }

?>