$(function () {
    headEvent();
    // 头部事件函数
    function headEvent() {
        let str = '.my-focus,.my-enshrines,.my-messages,.my-issue';
        $('.wel-login-register').on('click', str, function () {
            // 点击我要发帖
            if ($(this).prop('class') == 'my-issue') {
                $(location).attr('href', '../html/issuePost.html');
            }
            // 点击我的收藏
            if ($(this).prop('class') == 'my-enshrines') {
                $(location).attr('href', '../html/myEnshrine.html');
            }
        })

        // 搜索
        $('.search button').on('click', function () {
            let sVal = $('.search input').val();
            // 匹配空格
            let reg = /\s+/;
            // 当搜索框没有内容是，不能进行搜索
            if (reg.test(sVal)||sVal=='') {
                alert('请输入内容！！！');
                return;
            } else {
                $(location).attr('href', `../html/search.html?q=${sVal}`);
            }
        })

        // 我的帖子
        $('.my-post span').on('click',function(){
            $(location).attr('href', '../html/myPost.html');
        })
    }
})