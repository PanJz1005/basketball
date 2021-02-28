<?php
    $username = $_POST['username'];
    $arr = $_POST['arr'];
    $con = mysqli_connect('localhost','root','123456','basketball_db');
    if($arr){
        for($i=0;$i<count($arr);$i++){
            $sql = "DELETE FROM `enshrine` WHERE `username`='$username' AND `id`='$arr[$i]'";
            $res = mysqli_query($con,$sql);
            if(!$res){
                die('数据库错误'.mysqli_error($con));
            }
        }

        $selSql = "SELECT * FROM `enshrine` WHERE `username`='$username'";
        $selRes = mysqli_query($con,$selSql);
        if(!$selRes){
            die('数据库错误'.mysqli_error($con));
        }
        $selArr = array();
        $selRow = mysqli_fetch_assoc($selRes);
        while($selRow){
            array_push($selArr,$selRow);
            $selRow = mysqli_fetch_assoc($selRes);
        }
        print_r(json_encode(array('code'=>true,'msg'=>'删除成功','data'=>$selArr),JSON_UNESCAPED_UNICODE));
    }else{
        print_r(json_encode(array('code'=>false,'msg'=>'没有可删除数据'),JSON_UNESCAPED_UNICODE));
    }
?>