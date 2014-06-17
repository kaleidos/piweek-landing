app.view('header', ['$el'], function ($el) {
    "use strict";

    $(window).on('resize',function() {
        changeWindowSize();
    });

    function changeWindowSize() {
        setTimeout(function() {
            var windowheight = $(window).height();
            $el.height(windowheight);
        },200);
    }
    // init on start
    changeWindowSize();

});
