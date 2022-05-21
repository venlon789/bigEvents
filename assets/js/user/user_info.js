$(function () {
    const form = layui.form;
    const layer = layui.layer
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        }
    })
    const initUserinfo = () => {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                layer.msg('获取用户信息成功')
                // form.val("formUserInfo", res.data);
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserinfo()
    $('#btnReset').click((e) => {
        e.preventDefault();
        initUserinfo()
    })
    // 更改用户信息
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('更新用户失败')
                layer.msg('更新用户成功');
                window.parent.getuserInfo()
            }
        })

    })
})