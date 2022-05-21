// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter((option) => {
    option.url='http://www.liulongbin.top:3007'+option.url

    // alert(option)
    // 请求之前给有权限的接口注入token
    if(option.url.includes('/my/')){
        option.headers={
            Authorization: localStorage.getItem('token')
        }
    }
     // 无论成功还是失败，最终都会调用complete
    option.complete=(res) => {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})