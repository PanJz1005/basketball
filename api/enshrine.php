<?php
    $author = $_POST['author'];
    $username = $_POST['login'];
    $essayId = $_POST['essayId'];
    $title = $_POST['title'];
    $enshrineTime = $_POST['time'];
    

    $con = mysqli_connect('localhost','root','123456','basketball_db');
    $sql = "SELECT * FROM `enshrine` WHERE `username`='$username' AND `essay_id`='$essayId'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        $inSql = "INSERT INTO `enshrine` VALUES (null,'$author','$username','$essayId','$title','$enshrineTime')";
        $inRes = mysqli_query($con,$inSql);
        if(!$inRes){
            die('数据库错误'.mysqli_error($con));
        }
        print_r(json_encode(array('code'=>true,'msg'=>'收藏成功'),JSON_UNESCAPED_UNICODE));
    }else{
        $delSql = "DELETE FROM `enshrine` WHERE `username`='$username' AND `essay_id`='$essayId'";
        $delRes = mysqli_query($con,$delSql);
        if(!$delRes){
            die('数据库错误'.mysqli_error($con));
        }
        print_r(json_encode(array('code'=>false,'msg'=>'取消收藏'),JSON_UNESCAPED_UNICODE));
    }
?>