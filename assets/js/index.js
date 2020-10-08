// 入口函数
$(function () {
    getUserInof();
});
// 退出
var layer = layui.layer;
$('#btnLogout').on('click', function () {
    // 框架提供的询问框
    layer.confirm('是否确认退出？', { icon: 3, title: '提示' }, function (index) {
        // 清空本地token
        localStorage.removeItem('token');
        // 页面跳转
        location.href = '/login.html';
        // 关闭询问框
        layer.close(index);
    })
})
// 获取用户的基本信息
// 注意：位置写到入口函数外边 后面代码中要使用这个方法 但是要求这个方法是一个全局函数
function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 配置请求头信息 headers
        // headers: {
        //     //重新登陆 因为token过期事件12小时
        //     Authorization: localStorage.getItem
        //         ("token") || ""
        // },
        success: function (res) {
            console.log(res);
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功 渲染用户头像信息
            renderAvatar(res.data);
        },
        // 无论成功或者失败 都是触发complete方法
        // complete: function (res) {
        //     console.log(res);
        //     // 判断 如果是身份认证失败 跳转回登录页面
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 删除本地token
        //         localStorage.removeItem('token');
        //         // 页面跳转
        //         location.href = '/login.html';
        //     }
        // }
    });
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    // 1.用户名（昵称优先 没有用 username）
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 2.用户头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.user-avatar').hide();
    } else {
        // 没头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user - avatar').show().html(text);
    }
}