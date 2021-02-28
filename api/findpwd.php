<?php
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $passwordCryp = password_hash($password,PASSWORD_DEFAULT);
    $con = mysqli_connect('localhost','root','123456','basketball_db');
    
    $sql = "SELECT * FROM `userlist` WHERE `phone`='$phone'";

    $res = mysqli_query($con,$sql);
    
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }

    $row = mysqli_fetch_assoc($res);
    if($row){
        $updateSql = "UPDATE `userlist` SET `password`='$passwordCryp' WHERE `phone`='$phone'";
        $updateRes = mysqli_query($con,$updateSql);
        print_r(json_encode(array('code'=>true,'msg'=>'找回密码成功'),JSON_UNESCAPED_UNICODE));
    }else{
        print_r(json_encode(array('code'=>false,'msg'=>'手机号未注册'),JSON_UNESCAPED_UNICODE));
    }

?>