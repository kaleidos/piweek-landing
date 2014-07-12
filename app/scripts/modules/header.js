app.view('header', ['$el'], function ($el) {
    "use strict";

    //Vars
    var siblingSection = $el.next();
    var learnMore = $el.find('.learn-more');
    var participate = $el.find('.participate');
    var participateGoal = $el.siblings('.participation');
    var knowMore = $el.find('.lightbox .know-more');

    //Events
    $(window).on('resize',function() {
        changeWindowSize();
    });

    learnMore.on('click' ,function(event) {
        event.preventDefault();
        scrollSection();
    });

    participate.on('click' ,function(event) {
        event.preventDefault();
        participateOn();
    });

    knowMore.on('click' ,function(event) {
        event.preventDefault();
        hideLightbox();
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

    function participateOn() {
        var participateGoalPos = participateGoal.offset().top;
        $( 'html, body' ).stop().animate({
            'scrollTop': participateGoalPos
        }, 900, 'swing');
    }

    function start () {
        $el.find('.lightbox').addClass('active');
    }

    function hideLightbox() {
        $el.find('.lightbox').removeClass('active');
    }

    //Load Functions
    setTimeout(function() {
        start();
    }, 1000);

});
