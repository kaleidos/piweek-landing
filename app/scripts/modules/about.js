app.view('about', ['$el'], function ($el) {
    "use strict";

    //Vars
    var images = $el.find('figure');

    //Events
    $(window).on('scroll',function() {
        isVisible();
    });

    // Functions
    function isVisible() {
        $.each(images, function( index, value ) {
            var visibility = isScrolledIntoView(value);
            if(visibility) {
                $(this).addClass('display');
            }
        });
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
});
