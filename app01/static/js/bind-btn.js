var DELETE_ID
// 绑定删除按钮事件
function bindBtnDeleteEvent() {
    $(".btn-delete").click(function () {
        // alert("点击了删除");
        // 显示删除对话框
        $("#deleteModal").modal('show');

        // 获取当前行的ID并赋值给全部变量。
        DELETE_ID = $(this).attr("uid");
    });
}

// 绑定确认删除事件
function bindBtnConfirmDeleteEvent() {
    $("#btnConfirmDelete").click(function () {
        $.ajax({
            url: "/bill/delete/",  //    => /bill/delete/?uid=123
            type: "GET",
            data: {
                uid: DELETE_ID
            },
            dataType: "JSON",
            success: function (res) {
                if (res.status === 200) {
                    // 隐藏删除框
                    // $("#deleteModal").modal('hide');
                    // 在页面上将当前一行数据删除（js）
                    // $("tr[uid='" + DELETE_ID + "']").remove();
                    // 要删除的ID制空
                    // DELETE_ID = 0;
                    // 简单的思路：
                    location.reload();
                } else {
                    // 删除失败
                    alert(res.error);
                }
            }
        })
    });
}