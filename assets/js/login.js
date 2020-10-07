$(function () {


    // 1切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();

    })

    var form = layui.form;
    form.verify({
        pwd: [

            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {

            var pwd = $(".reg-box input[name=password]").val();
            if (value !== pwd) {
                return "两次密码输入不一致";
            }

        }
    });

    // 3
    var layer = layui.layer;
    $('#form_reg').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),

            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layui.msg('恭喜注册成功');
                $("#link_login").click();
                $("#form_reg")[0].reset();
            }

        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',

            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                // console.log(res.token);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })

})