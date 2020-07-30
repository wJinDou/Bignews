    // 获取评论信息
    function getList(page,callback) {
      $.ajax({
        url: BigNew.comment_list,
        data: {
          page: page,
          perpage: 7
        },
        success: info => {
          console.log(info);
          var htmlstr = template("temp", info.data);
          $("tbody").html(htmlstr);
          setPage(info);
          if (info.data.data.length) {
            $("#pagination").show().next().hide();
            callback && callback(info.data.totalPage);
          } else if (info.data.totalPage != 0 && info.data.data.length == 0) {
            currePage--;
            callback && callback(info.data.totalPage);
          } else {
            $("#pagination").hide().next().show();

          }
        },
        error: err => {
          console.log(err);
        }
      });
    };
    getList(1);



    var currePage = 1;
    function setPage(backdata) {
      // 配置分页器
      $("#pagination").twbsPagination({
        totalPages: backdata.data.totalPage,
        visiblePages: 7,
        first: "首页",
        prev: "上一页",
        next: "下一页",
        last: "尾页",
        onPageClick: function (event, page) {
          getList(page);
          currePage = page;
        },
      });
    }



    // 批准通过评论
    $("tbody").on("click", ".pizhun", function () {
      $.ajax({
        url: BigNew.comment_pass,
        type: "post",
        data: {
          id: $(this).data("id")
        },
        success: info => {
          // console.log(info);
          if (info.code === 200) {
            $(this).attr("class", "btn btn-warning btn-xs jujue").text("拒绝");
            $(this).parent().prev().text("已通过");
          }
        },
        error: err => {
          console.log(err);
        }
      })
    })



    // 拒绝通过评论
    $("tbody").on("click", ".jujue", function () {
      $.ajax({
        url: BigNew.comment_reject,
        type: "post",
        data: {
          id: $(this).data("id")
        },
        success: info => {
          // console.log(info);
          if (info.code === 200) {
            $(this).parent().prev().text("已拒绝");
            $(this).remove();
          }

        },
        error: err => {
          console.log(err);
        }
      })
    });



    // 删除评论
    $("tbody").on("click", ".delete", function () {
      $.ajax({
        url: BigNew.comment_delete,
        type: "post",
        data: {
          id: $(this).data("id")
        },
        success: info => {
          // console.log(info);
          if (info.code === 200) {
            getList(currePage, function (page) {
              $("#pagination").twbsPagination("changeTotalPages", page, currePage);
            });
          }

        },
        error: err => {
          console.log(err);
        }
      })
    })