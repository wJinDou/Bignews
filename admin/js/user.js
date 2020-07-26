$(function () {
    var form = $("#form");
    // 获取用户信息
    $.ajax({
        url: BigNew.user_detail,
        success: info => {
            //console.log(info);
            if (info.code === 200) {
                // console.log();
                for (const key in info.data) {
                    // 遍历绑定所有的信息
                    // console.log(key);
                    $(`.${key}`).val(info.data[key]);
                }
                $(".user_pic").attr("src", info.data.userPic);
            }
        }
    });


    //头像更换
    $("#exampleInputFile").change(function () {
        // console.log();
        //设置一个url路径信息并赋值
        var url = URL.createObjectURL(this.files[0]);
        $(".user_pic").attr("src", url);
    })

    $(".btn-edit").click(function (e) {
        e.preventDefault();
        var formData = new FormData(form[0]);
        $.ajax({
            url: BigNew.user_edit,
            type: "post",
            data: formData,
            contentType: false,
            processData: false,
            success: info => {
                // console.log(info);
                if (info.code === 200) {
                    parent.$("#modal_text").text(info.msg);
                    parent.$("#tipModal").modal("show");
                    //更新主页面的信息
                    $.ajax({
                        url: BigNew.user_info,
                        success: (info) => {
                            parent.$(".user_info>span>i").text(info.data.nickname);
                            parent.$(".user_info>img").attr("src", info.data.userPic);
                            parent.$(".user_center_link>img").attr("src", info.data.userPic);
                        },
                    });
                }
            }
        })
    })
    
    
})