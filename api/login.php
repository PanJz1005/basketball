<?php
    $username = $_POST['username'];
    $password = $_POST['password'];
    // 密码加密，用于在用户列表查找相同的密码
    // $passwordCryp = password_hash($password,PASSWORD_DEFAULT);
    
    $con = mysqli_connect('localhost','root','123456','basketball_db');

    $selSql = "SELECT `password` FROM `userlist` WHERE `username`='$username' OR `phone`='$username'";
    $selRes = mysqli_query($con,$selSql);
    if(!$selRes){
        die('数据库错误'.mysqli_error($con));
    }
    $selRow = mysqli_fetch_assoc($selRes);
    // 如果用户名或密码错误
    if(!$selRow||!password_verify($password,$selRow['password'])){
        print_r(json_encode(array('code'=>false,'msg'=>'用户名或密码错误'),JSON_UNESCAPED_UNICODE));
    }else if(password_verify($password,$selRow['password'])){
        $sql = "SELECT * FROM `userlist` WHERE `username`='$username' OR `phone`='$username'";
        $res = mysqli_query($con,$sql);
        if(!$res){
            die('数据库错误'.mysqli_error($con));
        }
        $row = mysqli_fetch_assoc($res);
        // 用户名存在且密码正确
        print_r(json_encode(array('code'=>true,'info'=>$row,'msg'=>'登录成功'),JSON_UNESCAPED_UNICODE));
    }
    
?>