$(function () {
    init();

    function init() {
        // 导入头部
        $('#header').load('../html/header.html', function () {
            $($('.nav-list li')[0]).removeClass('active');
        });
        // 导入尾部
        $('#footer').load('../html/footer.html');
        render();
        clickHandler();
    }

    function render() {
        let sRes = location.search.substring(location.search.indexOf('=') + 1);
        // 解码，因为获取url地址栏上的参数是中文时是加密过的，所以需要进行解密
        let value = decodeURI(sRes);
        // 设置title
        $('title').text(`${value}-帖子搜索`);
        // 搜索关键词
        $('.search-word').text(value);
        pAjax({
            url: '../api/search.php',
            type: 'get',
            data: {
                value,
            }
        }).then(res => {
            let str = '';
            if (res.length != 0) {
                res.forEach(function (item) {
                    if (item.topic == "NBA") {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="nba topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }
                    if (item.topic == 'CBA') {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="cba topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }
                    if (item.topic == '街头篮球') {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="street topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }
                    if (item.topic == '灌篮高手') {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="dunk topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }
                    if (item.topic == '篮球技术') {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="tech topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }
                    if (item.topic == '篮球装备') {
                        str += `<li>
                                <p><a href="" class="title" idx="${item.id}">${item.title}</a></p>
                                <p><a href="" class="equip topic">${item.topic}</a></p>
                                <p>${item.username}</p>
                                <p>${item.issue_time}</p>
                                <p>${item.comment_number}</p>
                                <p>${item.like_number}</p>
                            </li>`;
                    }

                })
                $('.show-res').html(str);
            } else {
                let noStr = `<div class="not-search">
                                <p>找不到和您查询"
                                <span style="color:red">${value}</span>
                                "的相关内容或信息</p>
                                <p>
                                建议：</br>
                                &emsp;&emsp;请检查输入字词有无错误。</br>
                                &emsp;&emsp;请尝试其他查询词。</br>
                                &emsp;&emsp;请改用较常见的字词。</br>
                                &emsp;&emsp;请减少查询字词的数量。</p>
                                <div class="magnify">
                                <img src="../images/search_res.png" />
                                </div>
                            </div>`;
                $('.show-post').html(noStr);
            }
        })
    }

    function clickHandler() {
        $('.show-res').on('click','.title,.topic', function () {
            if ($(this).hasClass('title')) {
                $(this).attr({
                    'href': `../html/detail.html?id=${$(this).attr('idx')}`,
                    'target': '_blank',
                })
            }
            if ($(this).hasClass('topic')) {
                let c = $(this).attr('class').substring($(this).attr('class').indexOf('=')+1,$(this).attr('class').indexOf(' '));
                $(this).attr({
                    'href': `../html/listPage.html?class=${c}`,
                })
            }
        })
    }
})