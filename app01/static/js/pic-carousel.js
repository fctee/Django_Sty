// carousel-control.js

(function($) {
    "use strict";

    $(document).ready(function() {
        // 初始化所有的轮播图
        $('.carousel').carousel({
            interval: 5000 // 设置轮播间隔为 5 秒
        });

        // 可选：添加自定义控制

        // 暂停轮播当鼠标悬停在轮播图上
        $('.carousel').hover(function() {
            $(this).carousel('pause');
        }, function() {
            $(this).carousel('cycle');
        });

        // 可选：添加键盘控制
        $(document).on('keydown', function(e) {
            if (e.keyCode == 37) { // 左箭头键
                $('.carousel').carousel('prev');
            }
            if (e.keyCode == 39) { // 右箭头键
                $('.carousel').carousel('next');
            }
        });

        // 可选：添加滑动控制（需要 hammer.js 库）
        // 如果你想添加触摸滑动支持，取消注释下面的代码，并确保引入了 hammer.js
        /*
        $('.carousel').each(function() {
            var hammer = new Hammer(this);
            hammer.on('swipeleft', function() {
                $(this).carousel('next');
            });
            hammer.on('swiperight', function() {
                $(this).carousel('prev');
            });
        });
        */
    });

})(jQuery);