// 封装一个扩展validate函数
function validator(option) {
    for (let key in option) {
        jQuery.validator.addMethod(key, function (value) {
            let r = option[key];
            if (r.test(value)) {
                return true;
            }
            return false;
        })
    }
}

// 封装ajax请求
function pAjax(obj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: obj.type,
            url: obj.url,
            data: obj.data,
            async: obj.async,
            dataType: obj.dataType || 'json',
            success: function (res) {
                resolve(res);
            },
            error: function (err) {
                reject(err);
            }
        })
    })
}

// 封装一个设置cookie的函数
function setCookie(cookie, expires) {
    for (let prop in cookie) {
        if (expires) {
            let date = new Date();
            let time = date.getTime();
            time = time - 8 * 60 * 60 * 1000;
            time = time + expires * 1000;
            date.setTime(time);
            document.cookie = `${prop}=${cookie[prop]};expires=${date}`;
        } else {
            document.cookie = `${prop}=${cookie[prop]}`;
        }
    }
}

// 封装一个获取cookie某个属性值的函数
function getCookie(key) {
    let cookies = document.cookie;
    let cookieArr = cookies.split('; ');
    let value;
    cookieArr.forEach((item) => {
        let arr = item.split('=');
        if (arr[0] == key) {
            value = arr[1];
        }
    });
    return value;
}

// 封装一个获取时间的函数
function getDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
}