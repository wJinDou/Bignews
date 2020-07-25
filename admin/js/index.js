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

      //左侧导航
      var menu = $(".menu");
      var list = menu.children('.level02').children();
      //左侧导航栏
      menu.children('.level01').click(function () {
          $(this).addClass("active").siblings(".level01").removeClass('active');
          if ($(this).index() === 1) {
              $(this).find("b").toggleClass('rotate0');
              menu.children(".level02").slideToggle();
          }
      })
 
      list.click(function(){
          $(this).addClass("active").siblings().removeClass("active");
      })
});
