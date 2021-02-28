<?php
    $username = $_POST['username'];
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    // 密码加密
    $passwordCryp = password_hash($password, PASSWORD_DEFAULT);
    $con = mysqli_connect('localhost','root','123456','basketball_db');
    // 查找数据库中用户列表是否存在该用户，若存在就不能注册
    $selSql = "SELECT * FROM `userlist` WHERE `username`='$username' OR `phone`='$phone'";
    $selRes = mysqli_query($con,$selSql);
    if(!$selRes){
        die('数据库错误'.mysqli_error($con));
    }
    
    $selRow = mysqli_fetch_assoc($selRes);
    if(!$selRow){
        $inSql = "INSERT INTO `userlist` VALUES(null,'$username','$passwordCryp','$phone',null,null,null,null,null,null)";
        $inRes = mysqli_query($con,$inSql);
        if(!$inRes){
            die('数据库错误'.mysqli_error($con));
        }
        print_r(json_encode(array('code'=>true,'msg'=>'注册成功'),JSON_UNESCAPED_UNICODE));
    }else if($username==$selRow['username']){
        print_r(json_encode(array('code'=>false,'msg'=>'用户名已存在'),JSON_UNESCAPED_UNICODE));
    }else if($phone==$selRow['phone']){
        print_r(json_encode(array('code'=>false,'msg'=>'手机号已注册'),JSON_UNESCAPED_UNICODE));
    }
    
?>