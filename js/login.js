$(function () {
    // 验证码
    let gV = new GVerify({
        id: 'verify',
    });

    // 表单验证
    $('#login').validate({
        rules: {
            username: {
                required: true,
            },
            password: {
                required: true,
            },
            vercode: {
                required: true,
            }
        },
        messages: {
            username: {
                required: '请输入用户名',
            },
            password: {
                required: '请输入密码',
            },
            vercode: {
                required: '请输入验证码',
            }
        },
        // 表单验证成功时执行
        submitHandler: function () {
            let username = $('#username').val();
            let password = $('#password').val();

            // 验证验证码是否正确
            if (!gV.validate($('#vercode').val())) {
                // 验证码错误提示信息
                $('.fail-toast').css({
                    color: 'red',
                    borderColor: 'red',
                    background: `#ffffff url(../images/failed_toast.png) no-repeat 10px center`
                }).html('验证码错误').fadeIn();
                setTimeout(`$('.fail-toast').fadeOut()`, 2000);
                return;
            }

            // 发送请求
            pAjax({
                url: '../api/login.php',
                type: 'post',
                data: {
                    username,
                    password
                }
            }).then(res => { //请求成功后返回的结果
                console.log(res);
                if (res.code) {
                    // 登录成功，提示信息
                    $('.fail-toast').css({
                        color: 'lightgreen',
                        borderColor: 'lightgreen',
                        background: `#ffffff url(../images/success.png) no-repeat 10px center`
                    }).html(res.msg).fadeIn();
                    // 登录成功跳转页面
                    setTimeout(function () {
                        // 如果在首页点击登录时，登录成功跳转到首页
                        if (!localStorage.url) {
                            $(location).attr('href', '../html/index.html');
                        } else {
                            // 在其他页面操作需要登录时，登录成功会跳转到当前操作页面
                            $(location).attr('href', localStorage.url);
                            // 移除本地存储
                            localStorage.removeItem('url');
                        }
                    }, 1000)
                    // 设置cookie
                    setCookie({
                        'login': res.info.username
                    });
                } else {
                    // 用户名或密码错误提示信息
                    $('.fail-toast').css({
                        color: 'red',
                        borderColor: 'red',
                        background: `#ffffff url(../images/failed_toast.png) no-repeat 10px center`
                    }).html(res.msg).fadeIn();
                    // 两秒后隐藏提示信息
                    setTimeout(`$('.fail-toast').fadeOut()`, 2000);
                }
            })

        }
    })

    // 忘记密码
    $('#forget').on('click', function () {
        location.href = '../html/findpwd.html';
    })

})