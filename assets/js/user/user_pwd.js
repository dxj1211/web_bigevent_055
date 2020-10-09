// 入口函数
$(function () {
    // 1.定义验证规则
    var form = layui.form;
    form.verify({
        // 所有的密码验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //   新旧密码不能相同
        samePwd: function (value) {
            var v2 = $("[name=oldPwd]").val();
            if (value === v2) {
                return '新旧密码不能相同！'
            }
        },
        // 新旧密码必须相同
        rePwd: function (value) {
            // value是再次输入的新密码 新密码需要重新获取
            if (value !== $("[name=newPwd]").val()) {
                return '两次新密码输入不一致！';
            }
        },
    });
    // 2.表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})