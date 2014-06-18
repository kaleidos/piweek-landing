app.view('media', ['$el'], function ($el) {
    "use strict";

    //Vars
    var video = $el.find('video');

    //Events
    $(window).on('scroll',function() {
        isVisible();
    });

    // Functions
    function isVisible() {
        var visibility = isScrolledIntoView(video);
        if(visibility) {
            video[0].play();
        } else {
            video[0].pause();
        }
    }

    function isScrolledIntoView(elem) {
        return $(elem).is_on_screen();
    }

    $.fn.is_on_screen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };


//     $.fn.is_on_screen = function(){
//         var win = $(window);
//         var top = win.scrollTop();
//         var blur = 200;
//         var bottom = top + win.height();
//         var bounds = this.offset();

//         return (!(bottom < bounds.top || top > bounds.bottom));
//     };

});
