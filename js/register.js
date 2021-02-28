$(function () {
    // 由2~12位非空格字符组成
    let usernameReg = /^([\S]){2,12}$/;
    // 第一位必须是1，第二位是3456789其中一位，最后是九位数字
    let phoneReg = /^1[3456789][0-9]{9}$/;
    // 由6~16由数字、字母和下划线组成
    let passwordReg = /^[\w]{6,16}$/;
    validator({
        'testName': usernameReg,
        'testPhone': phoneReg,
        'testPassword': passwordReg,
    });
    $('#register').validate({
        // 设定表单提交规则
        // debug:true,
        rules: {
            username: {
                required: true,
                testName: true,
            },
            phone: {
                required: true,
                testPhone: true,
            },
            password: {
                required: true,
                testPassword: true,
            },
            repassword: {
                required: true,
                equalTo: '#password',
            },
            checkbox: {
                required: true
            }
        },
        // 表单提交错误提示信息
        messages: {
            username: {
                required: '用户名不能为空',
                testName: '用户名由2~12位非空格字符组成',
            },
            phone: {
                required: '手机号不能为空',
                testPhone: '手机号格式不正确',
            },
            password: {
                required: '密码不能为空',
                testPassword: '由6~16位数字、字母和下划线组成',
            },
            repassword: {
                required: '密码不能为空',
                equalTo: '密码不一致',
            },
            checkbox: {
                required: '请同意协议和条款后再进行注册'
            }
        },
        submitHandler: function () {
            let label = $('<label></label>');
            let username = $('#username').val();
            let phone = $('#phone').val();
            let password = $('#password').val();
            pAjax({
                url: '../api/register.php',
                type: 'post',
                data: {
                    username,
                    phone,
                    password
                },
            }).then(res => {
                // 用户名或手机号已存在
                if (!res.code) {
                    if (res.msg == '用户名已存在') {
                        label.appendTo($('.username'));
                        label.html(res.msg);
                        $('#username').focus(function () {
                            label.remove();
                        })
                    } else {
                        label.appendTo($('.phone'));
                        label.html(res.msg);
                        $('#phone').focus(function () {
                            label.remove();
                        })
                    }
                } else {
                    // 提示注册成功，fadeIn()元素过渡显示
                    $('.pop-up').fadeIn();
                    // 注册成功延迟跳转到登录页面
                    setTimeout(`$(location).attr('href','../html/login.html')`, 1000);
                }
            })
        }
    })
})