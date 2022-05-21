
$(function () {
    getuserInfo()
    // 设置退出登录
    const layer = layui.layer
    $('#btnLoginout').click(() => {

        layer.confirm(
            "确定退出登录？",

            { icon: 3, title: "" },
            function (index) {
                // 清空本地存储里面的 token
                localStorage.removeItem('token')
                // localStorage.removeItem("token");
                // 重新跳转到登录页面
                location.href = '/login.html'
                // location.href = "/login.html";
            }
        );
    })
})
const layer = layui.layer
function getuserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: (res) => {
            // console.log(res);
            // console.log(res.data);
            if (res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            console.log(res.data);
            randerAvatar(res.data)

        },

    })
}
const randerAvatar = (user) => {
    const name = user.nickname || user.username
    console.log(name);
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        const firstName = name[0].toUpperCase()
        $('.text-avatar').html(firstName).show()
    }
}