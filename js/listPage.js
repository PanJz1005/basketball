$(function () {
    init();

    function init() {
        // 导入头部
        $('.header').load('../html/header.html', function () {
            // 获取地址栏的参数
            let a = location.search.substring(location.search.indexOf('=') + 1);
            $('.nav-list li').each(function (index, item) {
                if ($(item).prop('class') == a) {
                    // 点击对应导航栏高光
                    $(item).addClass('active').siblings().removeClass('active');
                    render($(item).html());
                    $('title').text($(item).html());
                }
            })
        });
        // 导入尾部
        $('#footer').load('../html/footer.html');

        titleClick();
    }


    function render(txt) {
        let list = $('.content-list ul');
        let h3 = $('.content-list h3');
        h3.html(txt + '专区');
        // 请求数据
        pAjax({
            url: '../api/getData.php'
        }).then(res => {
            let str = '';

            $.each(res, function (index, items) {
                if (txt == items.topic) {
                    str += `<li>
                    <div class="issue-title fl">
                        <a href="#" idx=${items.id}>${items.title}</a>
                        <span><i>${items.like_number}</i>点赞</span>
                        <span><i>${items.comment_number}</i>评论</span>
                    </div>
                    <div class="issue-time fr">
                        <span>${items.issue_time}</span>
                    </div>
                </li>`;


                }
            })
            list.html(str);
        })
    }

    // 标题点击事件
    function titleClick() {
        $('.content-list ul').on('click', 'a', function () {
            let idx = $(this).attr('idx')
            $(this).attr({
                'target': '_blank',
                'href': `../html/detail.html?id=${idx}`
            });
        })
    }
})