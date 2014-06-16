app.view('header', ['$el'], function ($el) {
    "use strict";
    var windowheight = $(window).height();
    $el.height(windowheight);
});
