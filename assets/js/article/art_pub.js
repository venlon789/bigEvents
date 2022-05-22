$(function () {
    const layer = layui.layer;
    const form = layui.form;
    // 获取文章的分类
    const initCate = () => {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取分类失败')
                layer.msg('获取分类成功');
                var htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr);
                form.render("select")
            }
        })
    }
    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 选择图片页面更换
    $('#coverFile').change(function (e) {
        const files = e.target.files;
        if (files.length == 0) return;
        // 根据文件，创建对应的 URL 地址
        const newImgUrl = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgUrl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 发布内容的状态
    let art_state = '已发布'
    // 点击草稿后状态
    $('art_state').click(() => {
        art_state = '草稿'
    })
    // 监听form表单提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        const fd = new FormData($(this)[0])
        fd.append('state', art_state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })
    // 发布内容的ajax函数
    function publishArticle(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) return layer.msg('发布文章失败')
                layer.msg('发布文章成功');
                location.href = '/article/art_list.html'
                window.parent.change()

            }
        })
    }
})