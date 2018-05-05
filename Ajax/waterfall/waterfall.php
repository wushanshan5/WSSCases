<?php
/**
 * @Author: Marte
 * @Date:   2018-03-21 17:41:09
 * @Last Modified by:   Marte
 * @Last Modified time: 2018-03-21 19:37:58
 */
    header("content-type:text/html;charset=utf-8");
    //读取json文件
    $jsonContent = file_get_contents('info/data.json');
    //将json字符串转化为php数组
    $jsonArr = json_decode($jsonContent);
    //利用随机函数 array_rand()函数，随机取出十个元素,得到一个数组
    $keyArr = array_rand($jsonArr,10);
    //先要定义一个数组来装十个值
    $jsonContent = array();
    //利用循环和count函数将得到的十个key所对应的值，转化为json字符串
    for($i=0;$i<count($keyArr);$i++) {
        $jsonContent[$i] = $jsonArr[$keyArr[$i]];
    }
    echo json_encode($jsonContent);
?>