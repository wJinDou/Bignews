
//查询所有的文章列表
function select() {
    $.ajax({
        url: BigNew.category_list,
        success: info => {
            console.log(info);
            if (info.code === 200) {
                var htmlstr = template("tplList", info);
                $(".category").html(htmlstr);
            }
        }
    });
}
select();


//上传图片预览
$("#inputCover").change(function () {
    var url = URL.createObjectURL(this.files[0]);
    // console.log(url);
    $(".article_cover").attr("src", url)
});


//日期插件
jeDate("#testico", {
    format: "YYYY-MM-DD",
    isinitVal: true,
    zIndex: 29999,
    onClose: false,
    donefun: function (obj) {
        // 每次改变时间时触发
        console.log(obj);
    }
})


//富文本编辑器 初始化三个步骤
var E = window.wangEditor
var editor = new E('#editor')
editor.create();


// 点击发布文章
$(".btn-release").click(function (e) {
    e.preventDefault();
    add("已发布")
})
// 点击存为草稿文章
$(".btn-draft").click(function (e) {
    e.preventDefault();
    add();
})


function add(state) {
    var formData = new FormData($("#form")[0])
    // 文章内容
    formData.append("content", editor.txt.html());
    // 文章状态
    formData.append("state", state ? state : "");
    $.ajax({
        url: BigNew.article_publish,
        type: "post",
        contentType: false,
        processData: false,
        data: formData,
        success: info => {
            // console.log(info);
            $("#myModal").modal("show").find(".modal-body p").text(info.msg + ",即将跳转至文章列表");
            setTimeout(() => {
                parent.$(".level02 li").eq(0).click();
                location.href = "./article_list.html";
            }, 2000)
        },
        error: err => {
            // console.log(err);
            $("#myModal").modal("show").find(".modal-body p").text(err.responseJSON.msg);
        }
    })
}

