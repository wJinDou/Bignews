$(function () {
  // 获取登录状态
  $.ajax({
    url: BigNew.user_info,
    success: (info) => {
      $(".user_info>span>i").text(info.data.nickname);
      $(".user_info>img").attr("src", info.data.userPic);
      $(".user_center_link>img").attr("src", info.data.userPic);
    },
  });

  //点击退出登录
  $(".logout").click(function () {
    $("#myModal").modal("show");
    $("#sureExitBtn").click(function () {
      localStorage.removeItem("token");
      location.href = "./login.html";
    });
  });
});
