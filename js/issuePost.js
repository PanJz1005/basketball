$(function () {
    // 导入头部
    $('#header').load('../html/header.html', function () {
        $($('.nav-list li')[0]).removeClass('active');
    });
    // 导入尾部
    $('#footer').load('../html/footer.html');

    issueClick();

    function issueClick() {
        // 点击发表
        $('.issue button').on('click', function () {
            let title = $('#topic-title').val();
            let topic = $('#topic').val();
            let txt = $('#edit-txt').val();
            let issueTime = getDate();
            let username = getCookie('login');
            if (title && topic && txt) {
                pAjax({
                    url: '../api/issue.php',
                    type: 'post',
                    data: {
                        title,
                        topic,
                        txt,
                        issueTime,
                        username
                    }
                }).then(res => {
                    $('.issue-success').fadeIn();
                    setTimeout(`$(location).attr('href','../html/index.html')`, 2000)
                })
            } else {
                alert('请输入内容');
            }

        })
    }

})