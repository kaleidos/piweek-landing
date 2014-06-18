app.view('projects', ['$el'], function ($el) {
    "use strict";
    // Vars
    var prev = $el.find('.prev-project');
    var next = $el.find('.next-project');

    // Events
    prev.on('click', prevProject);
    next.on('click', nextProject);

    // Function
    function prevProject (event) {
        event.preventDefault();
        var currentProject = $el.find('.active');
        console.log(currentProject);
        if (currentProject.is('.project:first')) {
            $el.find('.project:last').addClass('active');
        } else {
            currentProject.prev('article').addClass('active');
        }
        currentProject.removeClass('active');
        backgroundEffect();
    }

    function nextProject (event) {
        event.preventDefault();
        var currentProject = $el.find('.active');

        if (currentProject.is('.project:last')) {
            $el.find('.project:first').addClass('active');
        } else {
            currentProject.next('article').addClass('active');
        }

        currentProject.removeClass('active');
         backgroundEffect(currentProject);
    }

     function backgroundEffect(currentProject) {
         var currentProjectName = $el.find('.active').data('project');
         $el.removeClass().addClass('projects').addClass(currentProjectName).addClass('ready');
     }

});
