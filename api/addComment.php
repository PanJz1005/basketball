<?php
    $username = $_POST['username'];
    $essayId = $_POST['essayId'];
    $txt = $_POST['txt'];
    $time = $_POST['time'];
    $con = mysqli_connect('localhost','root','123456','basketball_db');

    $sql = "INSERT INTO `comment` VALUES (null,'$username','$essayId','$txt','$time')";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }
    print_r(json_encode(array('code'=>$res,'msg'=>'评论成功'),JSON_UNESCAPED_UNICODE));
?>