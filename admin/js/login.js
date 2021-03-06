$(function () {
  // 1-给表单注册事件
  var $from = $(".login_form");
  var $myModal = $("#myModal");
  var $input_txt = $(".input_txt");
  var $input_pass = $(".input_pass");

  //点击确定按钮隐藏窗口
  $myModal.find("#sureBtn").click(function () {
    $myModal.modal("hide");
  });

  $from.on("submit", function (e) {
    //如果时使用submit的方式注册事件，一定要先记得阻止以下默认行为
    // 目的时为了防止默认提交
    e.preventDefault();

    if (
      $input_txt.val().trim().length <= 0 ||
      $input_pass.val().trim().length <= 0
    ) {
      $myModal.modal("show");
      $myModal.find("#modal_text").text("账号或者密码不能为空");
      return;
    }
    $.ajax({
      url: BigNew.user_login,
      type: "post",
      data: $(this).serialize(),
      success: (info) => {
        $myModal.modal("show");
        $myModal.find("#modal_text").text(info.msg);
        if (info.code === 200) {
          $myModal.on("hide.bs.modal", function () {
            localStorage.setItem("token", info.token);
            location.href = "./index.html";
          });
        }
      },
    });
  });
});
