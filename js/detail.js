$(function () {
    init();

    function init() {
        // 获取URL地址栏的id参数值
        let id = location.search.substring(location.search.indexOf('=') + 1);
        render(id);
        operaClick(id);

    }

    function render(id) {
        let topic = $('.header-content');
        let mainCon = $('.main-content');
        let allComment = $('.all-comment');
        let username = getCookie('login');
        pAjax({
            url: '../api/detail.php',
            type: 'post',
            data: {
                id,
                username,
            }
        }).then(res => {
            // 设置浏览器窗口标题
            $('title').text(res.essay.title);
            // 文章标题
            let topicStr = `<h2>${res.essay.title}</h2>
            <div class="author-info">
                <div class="head-pic">
                    <a href="#">
                        <img src="../images/p1.jpg" />
                    </a>
                </div>
                <div class="name-time">
                    <div class="username">
                        <a href="#">${res.essay.username}</a>
                    </div>
                    <div class="issue-time">
                        <i>发布时间</i>
                        <span>${res.essay.issue_time}</span>
                    </div>
                </div>
            </div>`;

            // 文章内容
            let mainStr = '';
            if (res.tags && res.enshrine == null) {
                mainStr = `<div class="essay">
                    ${res.essay.content}
                </div>
                <div class="main-opera f14">
                    <div class="like" style="background-image:url(../images/like_hover.png);color:#C01E2F">点赞<span>(${res.essay.like_number})</span></div>
                    <div class="enshrine">收藏</div>
                    <div class="comment">评论<span>(${res.comment_count})</span></div>
                    <div class="share">转发</div>
                </div>`;
            } else if (res.tags == null && res.enshrine) {
                mainStr = `<div class="essay">
                ${res.essay.content}
                </div>
                <div class="main-opera f14">
                    <div class="like">点赞<span>(${res.essay.like_number})</span></div>
                    <div class="enshrine" style="background-image:url(../images/enshrine_hover.png);color:#C01E2F">收藏</div>
                    <div class="comment">评论<span>(${res.comment_count})</span></div>
                    <div class="share">转发</div>
                </div>`;
            } else if (res.tags && res.enshrine) {
                mainStr = `<div class="essay">
                    ${res.essay.content}
                </div>
                <div class="main-opera f14">
                    <div class="like" style="background-image:url(../images/like_hover.png);color:#C01E2F">点赞<span>(${res.essay.like_number})</span></div>
                    <div class="enshrine" style="background-image:url(../images/enshrine_hover.png);color:#C01E2F">收藏</div>
                    <div class="comment">评论<span>(${res.comment_count})</span></div>
                    <div class="share">转发</div>
                </div>`;
            } else {
                mainStr = `<div class="essay">
                    ${res.essay.content}
                </div>
                <div class="main-opera f14">
                    <div class="like">点赞<span>(${res.essay.like_number})</span></div>
                    <div class="enshrine">收藏</div>
                    <div class="comment">评论<span>(${res.comment_count})</span></div>
                    <div class="share">转发</div>
                </div>`;
            }

            // 评论区
            let comAreaStr = `<h3><span>评论</span>(${res.comment_count})</h3>
                                <div class="comment-list">`;
            if (res.comment_count == 0) {
                // 没有评论时
                comAreaStr += '<p>快来占领沙发吧</p>';
            } else {
                // 有评论
                res.comment.forEach(item => {
                    comAreaStr += `<div class="comment-item">
                    <div class="comment-item-info">
                        <div class="author-pic">
                            <img src="../images/p1.jpg" />
                        </div>
                        <div class="comment-detail">
                            <div class="comment-title">
                                <span class="comment-name">${item.username}</span>
                                <span class="comment-time">${item.comment_time}</span>
                            </div>
                            <div class="comment-text">
                                ${item.comment_txt}
                            </div>
                        </div>
                    </div>
                </div>`;
                })
            }
            comAreaStr += `</div>`;

            topic.html(topicStr);
            mainCon.html(mainStr);
            allComment.html(comAreaStr);
        });
    }

    // 事件函数
    function operaClick(essayId) {
        // （点赞，收藏，评论，转发）
        let str = '.like,.enshrine,.comment,.share';

        let login = getCookie('login');
        // 事件委托
        $('.main-content').on('click', str, function () {
            // 判断是否有登录,没有登录就跳转登录
            if (!login) {
                // 设置本地存储，记录当前页面
                localStorage.setItem('url', location.href);
                $(location).attr('href', '../html/login.html');
                return;
            }

            // 点赞
            if ($(this).prop('class') == 'like') {
                pAjax({
                    url: '../api/tags.php',
                    type: 'post',
                    data: {
                        login,
                        essayId
                    }
                }).then(res => {
                    render(essayId);
                })
            }

            // 收藏
            if ($(this).prop('class') == 'enshrine') {
                let title = $('h2').text()
                let time = getDate();
                let author = $('.username a').text();
                pAjax({
                    url: '../api/enshrine.php',
                    type: 'post',
                    data: {
                        essayId,
                        author,
                        login,
                        title,
                        time,
                    }
                }).then(res => {
                    render(essayId)
                })
            }

            // 点击评论，动态将评论区显示
            if ($(this).prop('class') == 'comment') {
                $('.add-comment').slideToggle();
            }

        })

        // 点击回复
        $('.reply-btn button').on('click', function () {
            let username = getCookie('login');
            let txt = $('#comment-txt').val();
            let time = getDate();
            // 只输入空格的时候不能回复
            if ($('#comment-txt').val() == false) {
                alert('请输入内容');
                return;
            } else {
                // 输入了内容，点击回复，发送请求
                pAjax({
                    url: '../api/addComment.php',
                    type: 'post',
                    data: {
                        username,
                        essayId,
                        txt,
                        time,
                    }
                }).then(res => {
                    render(essayId);
                })
                // 回复后清空输入框
                $('#comment-txt').val('');
            }
        })

        // 初始回复按钮的状态
        if ($('.reply-btn button').attr('disabled')) {
            $('.reply-btn button').attr('disabled', true)
                .css({
                    'opacity': 0.5,
                    'cursor': 'not-allowed'
                });
        }

        // 评论区输入框事件
        // 获取焦点时触发
        $('#comment-txt').focus(function () {
            $('.in-txt').css('border-color', '#C01E2F')
            // 失去焦点时触发
        }).blur(function () {
            $('.in-txt').css('border-color', '#666666')
            // 输入框内容发送改变即触发
        }).bind("input propertychange change", function () {
            $('.txt-num i').text($(this).val().length);
            // 检测输入框是否有内容
            if ($('#comment-txt').val() == '') {
                $('.reply-btn button').attr('disabled', true)
                    .css({
                        'opacity': 0.5,
                        'cursor': 'not-allowed'
                    });
            } else {
                $('.reply-btn button').attr('disabled', false)
                    .css({
                        'opacity': 1,
                        'cursor': 'pointer'
                    });
            }
        })
    }

})