$(function () {
    init();

    function init() {
        // 导入头部
        $('#header').load('../html/header.html', function () {
            $($('.nav-list li')[0]).removeClass('active');
        });
        // 导入尾部
        $('#footer').load('../html/footer.html');

        let username = getCookie('login');

        getData();
        async function getData() {
            let data = await pAjax({
                url: '../api/myEnshrine.php',
                type: 'post',
                data: {
                    username,
                }
            });
            render(data);
            selectClick(username);
        }
    }

    function render(data) {
        // 收藏的数量
        $('.count').text(`(${data.length})`);
        let str = '';
        data.forEach(item => {
            str += `<li>
                        <div class="post-item fl">
                            <input type="checkbox" idx="${item.id}">
                        <a href="" idx="${item.essay_id}">${item.title}</a>
                        </div>
                        <div class="author fr">
                            <span>作者：${item.author_name}</span>
                            <span>收藏时间：${item.enshrine_time}</span>
                        </div>
                    </li>`;
        })
        $('.post-list').html(str);
    }

    function selectClick(username) {

        // 点击全选
        $('#all-select').on('click', function () {
            $('.post-list input').prop('checked', $(this).prop('checked'));
        })

        // 点击删除
        $('.delete button').on('click', function () {
            // 用于存放已选中的idx
            let arr = [];
            $('.post-list input').each(function (index, item) {
                // 表示选中
                if ($(item).prop('checked')) {
                    arr.push($(item).attr('idx'));
                }
            });
            pAjax({
                url: '../api/delEnshrine.php',
                type: 'post',
                data: {
                    username,
                    arr
                }
            }).then(res => {
                if (!res.code) {
                    alert(res.msg);
                } else {
                    alert(res.msg)
                    render(res.data);
                }
            })
        })

        // 点击标题
        $('.post-item').on('click','a',function(){
            $(this).attr({
                'href':`../html/detail.html?id=${$(this).attr('idx')}`,
                'target':'_blank',
            })
        })
    }

})