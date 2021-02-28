<?php
    $id = $_POST['id'];
    $username = $_POST['username'];

    $con = mysqli_connect('localhost','root','123456','basketball_db');
    $arr = array();
    // 查找文章
    $sql = "SELECT * FROM `data` WHERE `id`='$id'";
    $res = mysqli_query($con,$sql);
    if(!$res){
        die('数据库错误'.mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);

    // 查找评论
    $comSql = "SELECT * FROM `comment` WHERE `essay_id`='$id' ORDER BY `id` DESC";
    $comRes = mysqli_query($con,$comSql);
    if(!$comRes){
        die('数据库错误'.mysqli_error($con));
    }
    $comArr = array();
    $comRow = mysqli_fetch_assoc($comRes);
    while($comRow){
        array_push($comArr,$comRow);
        $comRow = mysqli_fetch_assoc($comRes);
    }
    $comment_num = count($comArr);

    // 更改文章的评论总数
    $upSql = "UPDATE `data` SET `comment_number`='$comment_num' WHERE `id`='$id'";
    $upRes = mysqli_query($con,$upSql);
    if(!$upRes){
        die('数据库错误'.mysqli_error($con));
    }

    // 查找点赞
    $tagsSql = "SELECT * FROM `tags` WHERE `username`='$username' AND `essay_id`='$id'";
    $tagsRes = mysqli_query($con,$tagsSql);
    if(!$tagsRes){
        die('数据库错误'.mysqli_error($con));
    }
    $tagsRow = mysqli_fetch_assoc($tagsRes);

    // 查找收藏
    $enshrineSql = "SELECT * FROM `enshrine` WHERE `username`='$username' AND `essay_id`='$id'";
    $enshrineRes = mysqli_query($con,$enshrineSql);
    if(!$enshrineRes){
        die('数据库错误'.mysqli_query($con));
    }
    $enshrineRow = mysqli_fetch_assoc($enshrineRes);

    $arr['essay'] = $row;
    $arr['comment'] = $comArr;
    $arr['comment_count'] = $comment_num;
    $arr['tags'] = $tagsRow;
    $arr['enshrine'] = $enshrineRow;
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>