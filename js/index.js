$(function () {
    // 引入头部
    $('.header').load('../html/header.html');
    // 引入尾部
    $('#footer').load('../html/footer.html');
    init();

    function init() {
        render();
        titleClick();
    }

    // 渲染页面
    function render() {
        // 获取元素
        let nba = $('.bbs-left-box .nba ul');
        let cba = $('.bbs-left-box .cba ul');
        let streetball = $('.bbs-left-box .streetball ul');
        let dunk = $('.bbs-left-box .dunk ul');
        let technique = $('.bbs-left-box .technique ul');
        let equip = $('.bbs-left-box .equip ul');
        let hot = $('.hot-list');
        pAjax({
            url: '../api/getData.php',
        }).then(res => {
            let nbaStr = '';
            let cbaStr = '';
            let streetballStr = '';
            let dunkStr = '';
            let techStr = '';
            let equipStr = '';
            let hotStr = '';
            let str = '';
            $.each(res, function (index, item) {
                str = `<li>
                    <div class="post-title fl">
                        <a href="#" idx=${item.id}>${item.title}</a>
                        <span><i>${item.like_number}</i>点赞</span>
                        <span><i>${item.comment_number}</i>评论</span>
                    </div>
                    <div class="post-time fr">
                        <span>${item.issue_time}</span>
                    </div>
                </li>`;
                // 各个专区数据渲染
                if (item.topic == 'NBA') {
                    nbaStr += str;
                }
                if (item.topic == 'CBA') {
                    cbaStr += str;
                }
                if (item.topic == '街头篮球') {
                    streetballStr += str;
                }
                if (item.topic == '灌篮高手') {
                    dunkStr += str;
                }
                if (item.topic == '篮球技术') {
                    techStr += str;
                }
                if (item.topic == '篮球装备') {
                    equipStr += str;
                }
            })

            // 按照点赞数降序排序
            res.sort(function (a, b) {
                return b.like_number - a.like_number;
            });
            $.each(res, function (index, item) {
                // 热门帖子，点赞数最高的十条帖子
                if (index < 20) {
                    if (index < 3) {
                        hotStr += `<li>
                                <i></i>
                                    <a href="#" idx=${item.id}>${item.title}</a>
                                </li>`;
                    } else {
                        hotStr += `<li>
                                    <i>${index+1}</i>
                                    <a href="#" idx=${item.id}>${item.title}</a>
                                </li>`;
                    }
                }
            })

            nba.html(nbaStr);
            cba.html(cbaStr);
            streetball.html(streetballStr);
            dunk.html(dunkStr);
            technique.html(techStr);
            equip.html(equipStr);
            hot.html(hotStr);

            // 如果该专区没有帖子的时候，移除该专区
            if (!nbaStr) {
                nba.parent().parent().remove();
            }
            if (!cbaStr) {
                cba.parent().parent().remove();
            }
            if (!streetballStr) {
                streetball.parent().parent().remove();
            }
            if (!dunkStr) {
                dunk.parent().parent().remove();
            }
            if (!techStr) {
                technique.parent().parent().remove();
            }
            if (!equipStr) {
                equip.parent().parent().remove();
            }
        })
    }

    // 点击标题跳转详情页
    function titleClick() {
        // 点击文章标题
        $('.bbs-box ul').on('click', 'a', function () {
            // 获取点击元素的idx属性值
            let idx = $(this).attr("idx");
            // 新窗口打开链接
            $(this).attr({
                'target': '_blank',
                'href': `../html/detail.html?id=${idx}`
            });
        });

        // 点击更多
        $('.bbs-content h3').on('click', 'a', function () {
            // 获取点击元素的class属性值
            let c = $(this).prop("class");
            // 新窗口打开链接
            $(this).attr({
                'target': '_blank',
                'href': `../html/listPage.html?id=${c}`
            });
        })
    }
})