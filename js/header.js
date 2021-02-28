$(function () {
    init();

    function init() {
        render();
        clickHandler();
    }



    // 鼠标移入用户，显示用户相关信息
    $('.nickname').on('mouseover', function () {
        $('.person-info-alter').css('display', 'block');
    });
    $('.nickname').on('mouseout', function () {
        $('.person-info-alter').css('display', 'none');
    });
    $('.person-info-alter').on('mouseover', function () {
        $('.person-info-alter').css('display', 'block');
    });
    $('.person-info-alter').on('mouseout', function () {
        $('.person-info-alter').css('display', 'none');
    });

    function render() {
        let user = $('.wel-login-register');
        // 如果用户已登录，获取用户名
        let login = getCookie('login');
        // 已登录显示的信息
        let alreadyLogin = `<div class="person-info">
            你好，
            <p class="nickname fr">${login}</p>
            <div class="person-info-alter">
                <div class="head-portrait fl">
                    <img src="../images/p1.jpg" />
                </div>
                <div class="account-manage fr">
                    <div class="a-m-top">
                        <p class="quit">退出</p>
                    </div>
                    <div class="my-post">
                        <span>我的帖子</span>
                        <i class="m-p-count">0</i>
                    </div>
                </div>
            </div>
        </div>
        <i>|</i>
        <div class="my-enshrines">我的收藏</div>
        <i>|</i>
        <div class="my-issue">我要发帖</div>`;
        // 未登录显示的信息
        let notLogin = `<div class="wel">
        欢迎来到篮球社区，请先<a href="../html/login.html">登录</a>或者<a href="../html/register.html">注册</a>
        </div>`;
        // 登录之后头部显示的内容
        if (login) {
            user.html(alreadyLogin);
            pAjax({
                url: '../api/getData.php',
                type: 'post',
            }).then(res => {
                let a = res.filter(item => {
                    return item.username == login;
                })
                // 统计我的帖子的数量
                $('.m-p-count').text(`${a.length}`);
            })
        } else {
            // 未登录时头部显示的内容
            user.html(notLogin);
        }
    }

    function clickHandler() {
        let login = getCookie('login');
        // 点击退出登录
        $(".quit").on('click', function () {
            // 删除cookie
            setCookie({
                'login': login
            }, -1);
            // 刷新页面
            location.reload();
        });

        // 点击导航栏
        $('.nav-list li').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            if ($(this)[0].innerHTML == '首页') {
                // 跳转到首页
                $(location).attr('href', '../html/index.html');
            } else {
                // 跳转到列表页
                let a = $(this).prop('class').substring(0, $(this).prop('class').indexOf(' '));
                $(location).attr('href', `../html/listPage.html?class=${a}`);
            }
        })
    }

})