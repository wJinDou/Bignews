$(function () {

    // 1-给表单注册事件
    var $from = $('.login_form');
    var $myModal = $('#myModal');

    //点击确定按钮隐藏窗口
    $myModal.find("#sureBtn").click(function () {
      $myModal.modal('hide');
    })
    
    $from.on('submit', function (e) {
      //如果时使用submit的方式注册事件，一定要先记得阻止以下默认行为
      // 目的时为了防止默认提交
      e.preventDefault();
      $.ajax({
        url: "http://localhost:8080/api/v1/admin/user/login",
        type: 'post',
        data: $(this).serialize(),
        success: info => {
          $myModal.modal('show');
          $myModal.find('#modal_text').text(info.msg);
          if (info.code === 200) {

            $myModal.on('hide.bs.modal', function () {
              location.href = "../index.html";
            })
          }
        }
      })
    })

  })