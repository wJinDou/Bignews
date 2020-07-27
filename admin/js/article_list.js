
//查询所有的文章列表
function select() {
    $.ajax({
        url: BigNew.category_list,
        success: info => {
            // console.log(info);
            if (info.code === 200) {
                var htmlstr = template("tplList", info);
                $("#selCategory").html(htmlstr)
            }
        }
    });
}
select();

// 查询所有文章列表
function getList(page, callback) {
    $.ajax({
        url: BigNew.article_query,
        data: {
            type: $("#selCategory").val(),
            state: $("#selStatus").val(),
            page: page ? page : 1,
            perpage: 3,
        },
        success: info => {
            // console.log(info);
            if (info.code === 200) {
                var htmlstr = template("tplarticle", info);
                $("tbody").html(htmlstr);
                // 设置分页
                setPage(info);
                // console.log(info);
                // console.log(currentPage, info.data.data.length);
                if (info.data.data.length) {
                    callback && callback(info.data.totalPage)
                    $("#pagination").show().next().hide()
                } else if (currentPage != 0 && !info.data.data.length) {
                    currentPage--;
                    callback(info.data.totalPage, currentPage)
                } else {
                    $("#pagination").hide().next().show();
                }


            }
        }
    })
}
getList();

$("#btnSearch").click(function (e) {
    e.preventDefault();
    getList(1, function (page) {
        $("#pagination").twbsPagination("changeTotalPages", page, 1);
    });
});



// 删除内容
var Delid;
var currentPage;
$("#delModal").on("show.bs.modal", function (e) {
    Delid = $(e.relatedTarget).data("id");
})

$("#sureDel").click(function () {
    $.ajax({
        url: BigNew.article_delete,
        type: "post",
        data: {
            id: Delid
        },
        success: info => {
            // console.log(info);
            $("#delModal").modal("hide");
            if (info.code === 204) {
                getList(currentPage, function (page) {
                    $("#pagination").twbsPagination("changeTotalPages", page, currentPage);
                });
            }
        }
    })
})

function setPage(backdata) {
    // 配置分页器
    $("#pagination").twbsPagination({
        totalPages: backdata.data.totalPage,
        visiblePages: 10,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        onPageClick: function (event, page) {
            getList(page);
            currentPage = page;
        }
    })
}

