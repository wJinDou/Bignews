        //查询所有的文章列表
        function select() {
            $.ajax({
                url: BigNew.category_list,
                success: info => {
                    // console.log(info);
                    if (info.code === 200) {
                        var htmlstr = template("tpl", info);
                        $("tbody").html(htmlstr)
                    }
                }
            });
        }
        select();


        //添加文章列表
        var categoryName = $("#categoryName");
        var categorySlug = $("#categorySlug");

        $("#sureAdd").click(function (e) {
            if (categoryName.val().trim() === "" || categorySlug.val().trim() === "") {
                return alert('不能为空');
            }
            $.ajax({
                url: $("#userID").val() ? BigNew.category_edit : BigNew.category_add,
                type: 'post',
                data: $("#Modalform").serialize(),
                success: info => {
                    console.log(info);
                    if (info.code === 201 || info.code === 200) {
                        $("#addModal").modal("hide");
                        select();
                    }
                },
                error: err => {
                    // console.log(err);
                    // console.log($("#Modalform").serialize());
                    alert(err.responseJSON.msg)
                }
            })
        });


        // 删除内容
        let Delid;
        $("tbody").on("click", ".delBtn", function () {
            $("#tipDelModal").modal("show");
            Delid = $(this).data("id");
        })

        $("#sureDel").click(function () {
            $.ajax({
                url: BigNew.category_delete,
                type: "post",
                data: {
                    id: Delid
                },
                success: info => {
                    // console.log(info);
                    $("#tipDelModal").modal("hide");
                    if (info.code === 204) {
                        select();
                    }
                }
            })
        })


        //更新文章内容-获取内容


        $('#addModal').on("shown.bs.modal", function (e) {
            // console.log(;
            if (e.relatedTarget.id === "xinzengfenlei") {
                $("#addModal").find(".modal-title").text("添加文章内容");
                categoryName.val("").attr("placeholder", "请输入文章类别").prop("disabled", false);
                categorySlug.val("").attr("placeholder", "请输入文章别名").prop("disabled", false);
                $("#userID").val("");
            } else {
                $("#addModal").find(".modal-title").text("更新文章内容");
                categoryName.val("").attr("placeholder", "获取中…………").prop("disabled", true);
                categorySlug.val("").attr("placeholder", "获取中…………").prop("disabled", true);


                $.ajax({
                    url: BigNew.category_search,
                    data: {
                        id: $(e.relatedTarget).data("id")
                    },
                    success: info => {
                        // console.log(info);
                        if (info.code === 200) {
                            categoryName.val(info.data[0].name).attr("placeholder", "请输入文章类别").prop("disabled", false);
                            categorySlug.val(info.data[0].slug).attr("placeholder", "请输入文章别名").prop("disabled", false);
                            $("#userID").val(info.data[0].id);
                        }
                    },
                    error: err => {
                        // console.log(err);
                        alert(err.responseJSON.msg);
                        $("#addModal").modal("hide");

                    },


                })
            }
        })
