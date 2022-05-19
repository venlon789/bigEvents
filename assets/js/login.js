$(function () {
    $(function () {
        // 点击去注册账号让 登录框隐藏，注册框显示
        $("#link_reg").click(() => {
            $(".login-box").hide();
            $(".reg-box").show();
        });
        // 点击去登录让 注册框隐藏，登录框显示
        $("#link_login").click(() => {
            $(".login-box").show();
            $(".reg-box").hide();
        });
    });
    //   密码验证
    const form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: (value) => {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return "两次密码不一致"
        }
    })
    // 注册接口对接
    // const baseURL = 'http://www.liulongbin.top:3007'
    const layer = layui.layer

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: "/api/reguser",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg('注册失败')
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })
    })
    // 登录接口的对接
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg("登录成功")
                console.log($(this).serialize());
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })

})