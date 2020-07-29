$(function () {
  //查询所有的文章列表
  function select() {
    $.ajax({
      url: BigNew.category_list,
      success: (info) => {
        // console.log(info);
        if (info.code === 200) {
          var htmlstr = template("tplList", info);
          $("#selCategory").html(htmlstr);
        }
      },
    });
  }
  select();
  //上传图片预览
  $("#inputCover").change(function () {
    var url = URL.createObjectURL(this.files[0]);
    // console.log(url);
    $(".article_cover").attr("src", url);
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
    },
  });

  //富文本编辑器 初始化三个步骤
  var E = window.wangEditor;
  var editor = new E("#editor");
  editor.customConfig.zIndex = 100;
  editor.create();

  // 根据ID获取文章内容
  var articleId = location.search.split("=")[1];
  if (articleId) {
    $.ajax({
      url: BigNew.article_search,
      data: {
        id: articleId,
      },
      success: (info) => {
        // console.log(info);
        if (info.code === 200) {
          $("#inputTitle").val(info.data.title);
          $("#selCategory").val(info.data.categoryId);
          $("#testico").val(info.data.date);
          // 富文本设置内容
          editor.txt.html(info.data.content);
          $(".article_cover").attr("src", info.data.cover);
        }
      },
      error: (err) => {
        // console.log(err);
        $("#myModal")
          .modal("show")
          .find(".modal-body p")
          .text(err.responseJSON.msg);
        $("#myModal").on("hide.bs.modal", function () {
          location.href = "./article_list.html";
        });
      },
    });
  }
  $(".btn-edit").click(function (e) {
    e.preventDefault();
    editArticle("已发布");
  });
  $(".btn-draft").click(function (e) {
    e.preventDefault();
    editArticle();
  });

  function editArticle(state) {
    var formData = new FormData($("#form")[0]);
    formData.append("id", articleId);
    formData.append("content", editor.txt.html());
    formData.append("state", state ? state : "");
    $.ajax({
      url: BigNew.article_edit,
      type: "post",
      data: formData,
      contentType: false,
      processData: false,
      success: (info) => {
        // console.log(info);
        if (info.code === 200) {
          $("#myModal").modal("show").find(".modal-body p").text(info.msg);
          $("#myModal").on("hide.bs.modal", function () {
            location.href = "./article_list.html";
          });
        } else {
          $("#myModal").modal("show").find(".modal-body p").text(info.msg);
        }
      },
      error: (err) => {
        // console.log(err);
        $("#myModal")
          .modal("show")
          .find(".modal-body p")
          .text(err.responseJSON.msg);
      },
    });
  }


  
});
