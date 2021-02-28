<?php
    $username = $_POST['login'];
    $essayId = $_POST['essayId'];
    $con = mysqli_connect('localhost','root','123456','basketball_db');

    $sql = "SELECT * FROM `tags` WHERE `username`='$username' AND `essay_id`='$essayId'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        $inSql = "INSERT INTO `tags` VALUES (null,'$username','$essayId')";
        $inRes = mysqli_query($con,$inSql);
        if(!$inRes){
            die('数据库错误'.mysqli_error($con));
        }
        
        // 统计点赞数量
        $countSql = "SELECT * FROM `tags` WHERE `essay_id`='$essayId'";
        $countRes = mysqli_query($con,$countSql);
        if(!$countRes){
            die('数据库错误'.mysqli_error($con));
        }
        $countArr = array();
        $countRow = mysqli_fetch_assoc($countRes);
        while($countRow){
            array_push($countArr,$countRow);
            $countRow = mysqli_fetch_assoc($countRes);
        }
        // 更新点赞数
        $likeCount = count($countArr);
        $upSql = "UPDATE `data` SET `like_number`='$likeCount' WHERE `id`='$essayId'";
        $upRes = mysqli_query($con,$upSql);
        if(!$upRes){
            die('数据库错误'.mysqli_error($con));
        }
        print_r(json_encode(array('code'=>true,'msg'=>'点赞成功'),JSON_UNESCAPED_UNICODE));
    }else{
        $delSql = "DELETE FROM `tags` WHERE `username`='$username' AND `essay_id`='$essayId'";
        $delRes = mysqli_query($con,$delSql);
        if(!$delRes){
            die('数据库错误'.mysqli_error($con));
        }

        // 统计点赞数量
        $countSql = "SELECT * FROM `tags` WHERE `essay_id`='$essayId'";
        $countRes = mysqli_query($con,$countSql);
        if(!$countRes){
            die('数据库错误'.mysqli_error($con));
        }
        $countArr = array();
        $countRow = mysqli_fetch_assoc($countRes);
        while($countRow){
            array_push($countArr,$countRow);
            $countRow = mysqli_fetch_assoc($countRes);
        }
        // 更新点赞数
        $likeCount = count($countArr);
        $upSql = "UPDATE `data` SET `like_number`='$likeCount' WHERE `id`='$essayId'";
        $upRes = mysqli_query($con,$upSql);
        if(!$upRes){
            die('数据库错误'.mysqli_error($con));
        }
        print_r(json_encode(array('code'=>false,'msg'=>'取消点赞'),JSON_UNESCAPED_UNICODE));
    }
    
?>