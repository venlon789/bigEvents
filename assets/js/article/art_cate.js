$(function () {
    const layer = layui.layer
    const form = layui.form
    const initArtCateList = () => {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取列表失败')
                layer.msg('获取列表成功')
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    // 添加类别弹窗
    initArtCateList()
    let indexAdd = null
    $('#btnAddCate').click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-add').html()
        });
    })
    // 添加类别内容
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加内容失败')
                layer.msg('添加内容成功')
                initArtCateList();
                layer.close(indexAdd)
            }
        })
    })
    // 修改类别弹窗
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $('#dialog-edit').html()
        });
        // 修改弹窗的内容
        $.ajax({
            type: 'get',
            url: "/my/article/cates/" + $(this).attr('data-id'),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取该条内容失败')
                layer.msg('获取该条内容成功')
                console.log(res.data);
                form.val('form-edit', res.data)
            }
        })
    })
    //   //* 通过代理方式，为 btn-edit 按钮绑定点击事件
    //   let indexEdit = null;
    //   $('tbody').on('click', '.btn-edit', function () {
    //       //* 弹出修改文章分类的弹窗
    //       indexEdit = layer.open({
    //           type: 1,
    //           area: ["500px", "250px"],
    //           title: "修改文章分类",
    //           content: $("#dialog-edit").html(),
    //       });

    //       const id = $(this).attr("data-id");
    //       $.ajax({
    //           type: "GET",
    //           url: "/my/article/cates/" + id,
    //           success: (res) => {
    //               if (res.status !== 0) return layer.msg('获取文章分类失败')
    //               layer.msg('获取文章分类成功')
    //               form.val('form-edit', res.data)
    //           }

    //       })
    //   })
    // 更新文章
    $("body").on('submit', 'form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res)
                if (res.status !== 0) return layer.msg('更新该条内容失败')
                layer.msg('更新该条内容成功');
                layer.close(indexEdit);
                initArtCateList()
            }
        })
    })
    // 删除指定的内容
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    console.log(res)
                    if (res.status !== 0) return layer.msg('删除该条内容失败')
                    layer.msg('删除该条内容成功');
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    })

})