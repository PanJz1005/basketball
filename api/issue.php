<?php
    $title = $_POST['title'];
    $topic = $_POST['topic'];
    $txt = $_POST['txt'];
    $issueTime = $_POST['issueTime'];
    $username = $_POST['username'];
    $con = mysqli_connect('localhost','root','123456','basketball_db');

    $sql = "INSERT INTO `data` VALUES (null,'$username','$title','$txt',0,0,'$issueTime','$topic',null)";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }
    print_r(json_encode(array('code'=>true,'msg'=>'发送成功'),JSON_UNESCAPED_UNICODE));

?>