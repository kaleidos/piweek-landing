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
            video.prop("volume", 0.2);
            video[0].play();
        } else {
            video[0].pause();
        }
    }

    function isScrolledIntoView(elem) {
        return $(elem).is_on_screen();
    }
});
