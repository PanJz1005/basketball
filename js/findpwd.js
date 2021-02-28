$(function () {
    // 验证码
    let gV = new GVerify({
        id: 'verify',
    });
    // 6-16位非空格字符
    let passwordReg = /^[\w]{6,16}$/;
    // 扩展的表单验证
    validator({
        'testPassword': passwordReg
    })
    $('#findpwd').validate({
        rules: {
            phone: {
                required: true,
            },
            vercode: {
                required: true,
            },
            password: {
                required: true,
                testPassword: true,
            },
            repassword: {
                required: true,
                equalTo: '#password',
            },
        },
        messages: {
            phone: {
                required: '手机号不能为空',
            },
            vercode: {
                required: '验证码不能为空',
            },
            password: {
                required: '密码不能为空',
                testPassword: '由6~16位数字、字母和下划线组成',
            },
            repassword: {
                required: '密码不能为空',
                equalTo: '密码不一致',
            }
        },
        submitHandler: function () {
            // 获取输入的值
            let phone = $('#phone').val();
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
            // 请求数据
            pAjax({
                url:'../api/findpwd.php',
                type:'post',
                data:{
                    phone,
                    password
                }
            }).then(res=>{
                if(res.code){
                    // 成功找回密码
                    $('.fail-toast').css({
                        color: 'lightgreen',
                        borderColor: 'lightgreen',
                        background: `#ffffff url(../images/success.png) no-repeat 10px center`
                    }).html(res.msg).fadeIn();
                    // 跳转到登录页面
                    setTimeout(`$(location).attr('href','../html/login.html')`, 1000);
                }else{
                    // 填写信息错误提示信息
                    $('.fail-toast').css({
                        color: 'red',
                        borderColor: 'red',
                        background: `#ffffff url(../images/failed_toast.png) no-repeat 10px center`
                    }).html(res.msg).fadeIn();
                    setTimeout(`$('.fail-toast').fadeOut()`, 2000);
                }
            })
        }
    })
})