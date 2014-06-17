app.view('header', ['$el'], function ($el) {
    "use strict";

    //Vars
    var siblingSection = $el.next();
    var learnMore = $el.find('.learn-more');

    //Events
    $(window).on('resize',function() {
        changeWindowSize();
    });

    learnMore.on('click' ,function(event) {
        event.preventDefault();
        scrollSection();
    });

    //Functions
    function changeWindowSize() {
        setTimeout(function() {
            var windowheight = $(window).height();
            $el.height(windowheight);
        },200);
    }

    function scrollSection() {
        var nextPosition = siblingSection.offset().top;
        $( 'html, body' ).stop().animate({
            'scrollTop': nextPosition
        }, 900, 'swing');
    }

    // init on start
    changeWindowSize();

});
